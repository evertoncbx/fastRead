import { UserProfile, ExerciseResult, DailyProgress } from '../types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const USER_KEY = 'fastread_user_profile';
const RESULTS_KEY = 'fastread_exercise_results';
const DAILY_KEY = 'fastread_daily_progress';
const CLOUD_SYNC_API = 'https://api.restful-api.dev/objects';

// Safe environment variable getter (Vite no browser, Node nos testes)
const getEnvVar = (name: string): string | undefined => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any)?.env) {
      return (import.meta as any).env[name];
    }
  } catch {}
  try {
    const globalProcess = (globalThis as any).process;
    if (globalProcess?.env) {
      return globalProcess.env[name];
    }
  } catch {}
  return undefined;
};

// Safe storage wrapper (localStorage no browser, Map em memória nos testes)
const memoryStorage = new Map<string, string>();
const safeStorage = {
  getItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      try { return localStorage.getItem(key); } catch { return null; }
    }
    return memoryStorage.get(key) ?? null;
  },
  setItem(key: string, val: string): void {
    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem(key, val); return; } catch {}
    }
    memoryStorage.set(key, val);
  },
  removeItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      try { localStorage.removeItem(key); return; } catch {}
    }
    memoryStorage.delete(key);
  }
};

// Supabase client instance (opcional)
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.warn('Supabase initialization failed, falling back to local storage', e);
  }
}

export const getSupabaseClient = () => supabase;

export interface RemoteSyncResult {
  profile: UserProfile | null;
  results: ExerciseResult[];
  source: 'supabase' | 'cloud' | 'local' | null;
}

export const storage = {
  // === USER PROFILE ===
  getUser(): UserProfile | null {
    try {
      const data = safeStorage.getItem(USER_KEY);
      if (!data) return null;
      const user = JSON.parse(data) as UserProfile;

      // Se o usuário ficou inativo por mais de 1 dia, reseta a sequência honestamente
      if (user.lastActiveDate) {
        const todayStr = this.getTodayDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (user.lastActiveDate !== todayStr && user.lastActiveDate !== yesterdayStr) {
          if (user.streakDays > 0) {
            user.streakDays = 0;
            safeStorage.setItem(USER_KEY, JSON.stringify(user));
          }
        }
      }

      return user;
    } catch {
      return null;
    }
  },

  saveUser(profile: UserProfile): void {
    try {
      safeStorage.setItem(USER_KEY, JSON.stringify(profile));

      // Sincronização remota em segundo plano
      void this.syncToRemote(profile, this.getResults());
    } catch (e) {
      console.error('Failed to save user', e);
    }
  },

  updateUserProfile(updates: Partial<UserProfile>): UserProfile | null {
    const current = this.getUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    this.saveUser(updated);
    return updated;
  },

  // === EXERCISE RESULTS ===
  getResults(): ExerciseResult[] {
    try {
      const data = safeStorage.getItem(RESULTS_KEY);
      if (!data) return [];
      return JSON.parse(data) as ExerciseResult[];
    } catch {
      return [];
    }
  },

  addResult(result: Omit<ExerciseResult, 'id' | 'date'>): ExerciseResult {
    const results = this.getResults();
    const newResult: ExerciseResult = {
      ...result,
      id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      date: new Date().toISOString()
    };

    results.unshift(newResult);
    // Armazena os últimos 100 resultados localmente
    const trimmed = results.slice(0, 100);
    safeStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));

    // Atualiza estatísticas agregadas do perfil
    const user = this.getUser();
    if (user) {
      const addMinutes = Math.max(1, Math.round(result.durationSeconds / 60));
      const totalMinutes = user.totalMinutesTrained + addMinutes;
      let currentWpm = user.currentWpm;
      let bestWpm = user.bestWpm;
      let testsCompleted = user.testsCompleted;
      let avgComp = user.averageComprehension;

      if (result.wpm && result.wpm > 0) {
        currentWpm = result.wpm;
        if (result.wpm > bestWpm) {
          bestWpm = result.wpm;
        }
      }

      if (result.comprehensionScore !== undefined) {
        testsCompleted += 1;
        avgComp = Math.round((avgComp * (testsCompleted - 1) + result.comprehensionScore) / testsCompleted);
      }

      const updatedUser = {
        ...user,
        currentWpm,
        bestWpm,
        totalMinutesTrained: totalMinutes,
        testsCompleted,
        averageComprehension: avgComp
      };
      safeStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

      // Sincronização remota
      void this.syncToRemote(updatedUser, trimmed);
    }

    return newResult;
  },

  // === DAILY PROGRESS ===
  getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  },

  getDailyProgress(): DailyProgress {
    const todayStr = this.getTodayDateString();
    try {
      const raw = safeStorage.getItem(DAILY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DailyProgress;
        if (parsed.date === todayStr) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }

    const fresh: DailyProgress = {
      date: todayStr,
      completedSteps: [],
      totalMinutes: 0,
      allDone: false
    };
    safeStorage.setItem(DAILY_KEY, JSON.stringify(fresh));
    return fresh;
  },

  markDailyStepComplete(stepId: number, durationMinutes: number): DailyProgress {
    const progress = this.getDailyProgress();
    if (!progress.completedSteps.includes(stepId)) {
      progress.completedSteps.push(stepId);
      progress.totalMinutes += durationMinutes;
      if (progress.completedSteps.length >= 5) {
        progress.allDone = true;
      }
      safeStorage.setItem(DAILY_KEY, JSON.stringify(progress));

      const user = this.getUser();
      if (user) {
        const todayStr = this.getTodayDateString();
        let streak = user.streakDays;

        if (user.lastActiveDate !== todayStr) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (user.lastActiveDate === yesterdayStr) {
            streak += 1;
          } else if (!user.lastActiveDate) {
            streak = 1;
          } else {
            streak = 1;
          }

          this.updateUserProfile({
            streakDays: streak,
            lastActiveDate: todayStr
          });
        }
      }
    }
    return progress;
  },

  // === CROSS-DEVICE SYNC & REMOTE LOOKUP ===

  /**
   * Busca perfil existente pelo e-mail em Supabase e na Nuvem de Backup.
   * Permite que ao abrir o Leitox no celular com o mesmo e-mail,
   * os dados de baseline, target, streak e histórico sejam completamente restaurados.
   */
  async fetchRemoteProfile(email: string): Promise<RemoteSyncResult> {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { profile: null, results: [], source: null };
    }

    // 1. Tentar Supabase se configurado
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .ilike('email', cleanEmail)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          const restoredProfile: UserProfile = {
            id: data.id || 'usr_' + Date.now(),
            name: data.name || cleanEmail.split('@')[0],
            email: cleanEmail,
            baselineWpm: data.baseline_wpm || 0,
            targetWpm: data.target_wpm || Math.round((data.baseline_wpm || 0) * 1.5),
            currentWpm: data.current_wpm || data.baseline_wpm || 0,
            bestWpm: data.best_wpm || data.baseline_wpm || 0,
            averageComprehension: data.avg_comprehension || 0,
            streakDays: data.streak_days || 1,
            lastActiveDate: data.updated_at ? data.updated_at.split('T')[0] : this.getTodayDateString(),
            totalMinutesTrained: data.total_minutes || 0,
            testsCompleted: data.tests_completed || 0,
            initialTestCompleted: data.initial_test_completed ?? (data.baseline_wpm > 0),
            createdAt: data.updated_at || new Date().toISOString()
          };

          // Buscar histórico de exercícios
          let resultsList: ExerciseResult[] = [];
          try {
            const { data: resData } = await supabase
              .from('exercise_results')
              .select('*')
              .eq('user_id', data.id)
              .order('created_at', { ascending: false })
              .limit(50);

            if (resData && Array.isArray(resData)) {
              resultsList = resData.map(r => ({
                id: r.id,
                userId: r.user_id,
                exerciseType: r.exercise_type,
                title: r.title,
                wpm: r.wpm ?? undefined,
                comprehensionScore: r.comprehension_score ?? undefined,
                durationSeconds: r.duration_seconds || 0,
                score: r.score ?? undefined,
                date: r.created_at
              }));
            }
          } catch {
            // Falha não crítica nos resultados
          }

          // Salvar localmente
          safeStorage.setItem(USER_KEY, JSON.stringify(restoredProfile));
          if (resultsList.length > 0) {
            safeStorage.setItem(RESULTS_KEY, JSON.stringify(resultsList));
          }

          return {
            profile: restoredProfile,
            results: resultsList,
            source: 'supabase'
          };
        }
      } catch (err) {
        console.warn('Supabase fetchProfileByEmail error:', err);
      }
    }

    // 2. Tentar Cloud KV Sync (fallback quando Supabase não estiver configurado)
    try {
      const cloudObj = await this.fetchFromCloudKV(cleanEmail);
      if (cloudObj && cloudObj.profile) {
        safeStorage.setItem(USER_KEY, JSON.stringify(cloudObj.profile));
        if (cloudObj.results && cloudObj.results.length > 0) {
          safeStorage.setItem(RESULTS_KEY, JSON.stringify(cloudObj.results));
        }
        return {
          profile: cloudObj.profile,
          results: cloudObj.results || [],
          source: 'cloud'
        };
      }
    } catch (err) {
      console.warn('Cloud KV fetch failed:', err);
    }

    return { profile: null, results: [], source: null };
  },

  /**
   * Sincroniza o perfil atual e os resultados para o Supabase e Cloud KV.
   */
  async syncToRemote(profile: UserProfile, results: ExerciseResult[]): Promise<boolean> {
    let synced = false;

    // 1. Supabase
    if (supabase) {
      try {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: profile.id,
            name: profile.name,
            email: profile.email.toLowerCase().trim(),
            baseline_wpm: profile.baselineWpm,
            target_wpm: profile.targetWpm,
            current_wpm: profile.currentWpm,
            best_wpm: profile.bestWpm,
            avg_comprehension: profile.averageComprehension,
            streak_days: profile.streakDays,
            total_minutes: profile.totalMinutesTrained,
            tests_completed: profile.testsCompleted,
            initial_test_completed: profile.initialTestCompleted,
            updated_at: new Date().toISOString()
          });

        if (!error) synced = true;
      } catch (err) {
        console.warn('Supabase sync error:', err);
      }
    }

    // 2. Cloud KV Backup
    try {
      await this.saveToCloudKV(profile, results.slice(0, 30));
      synced = true;
    } catch (err) {
      console.warn('Cloud KV backup error:', err);
    }

    return synced;
  },

  // Helper para Cloud KV
  async saveToCloudKV(profile: UserProfile, results: ExerciseResult[]): Promise<void> {
    try {
      const cleanEmail = profile.email.toLowerCase().trim();
      const payload = {
        name: `fastread_${cleanEmail}`,
        data: {
          profile,
          results,
          syncedAt: new Date().toISOString()
        }
      };

      if (typeof fetch !== 'undefined') {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        await fetch(CLOUD_SYNC_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        }).catch(() => null);

        clearTimeout(timeoutId);
      }
    } catch {
      // Ignorar erros de rede em modo offline
    }
  },

  async fetchFromCloudKV(email: string): Promise<{ profile: UserProfile; results: ExerciseResult[] } | null> {
    try {
      if (typeof fetch === 'undefined') return null;

      const cleanEmail = email.toLowerCase().trim();
      const targetName = `fastread_${cleanEmail}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`${CLOUD_SYNC_API}?name=${encodeURIComponent(targetName)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) return null;
      const list = await res.json();
      if (Array.isArray(list) && list.length > 0) {
        const item = list[list.length - 1];
        if (item && item.data && item.data.profile) {
          return {
            profile: item.data.profile,
            results: item.data.results || []
          };
        }
      }
    } catch {
      return null;
    }
    return null;
  },

  // === EXPORTAÇÃO & IMPORTAÇÃO DE BACKUP / CÓDIGO DE SINCRONIZAÇÃO ===
  exportSyncCode(): string {
    const user = this.getUser();
    const results = this.getResults();
    const daily = this.getDailyProgress();

    const backupPayload = {
      v: 1,
      u: user,
      r: results.slice(0, 50),
      d: daily,
      exportedAt: new Date().toISOString()
    };

    const jsonStr = JSON.stringify(backupPayload);
    if (typeof btoa !== 'undefined') {
      return btoa(unescape(encodeURIComponent(jsonStr)));
    }
    const globalBuffer = (globalThis as any).Buffer;
    if (globalBuffer) {
      return globalBuffer.from(jsonStr, 'utf-8').toString('base64');
    }
    return '';
  },

  importSyncCode(code: string): { success: boolean; user?: UserProfile; error?: string } {
    try {
      let decoded = '';
      if (typeof atob !== 'undefined') {
        decoded = decodeURIComponent(escape(atob(code.trim())));
      } else {
        const globalBuffer = (globalThis as any).Buffer;
        if (globalBuffer) {
          decoded = globalBuffer.from(code.trim(), 'base64').toString('utf-8');
        }
      }

      if (!decoded) {
        return { success: false, error: 'Código de sincronização vazio ou não suportado.' };
      }

      const parsed = JSON.parse(decoded);

      if (!parsed || !parsed.u || !parsed.u.email) {
        return { success: false, error: 'Código de sincronização inválido ou corrompido.' };
      }

      const importedUser = parsed.u as UserProfile;
      safeStorage.setItem(USER_KEY, JSON.stringify(importedUser));

      if (parsed.r && Array.isArray(parsed.r)) {
        safeStorage.setItem(RESULTS_KEY, JSON.stringify(parsed.r));
      }

      if (parsed.d && parsed.d.date) {
        safeStorage.setItem(DAILY_KEY, JSON.stringify(parsed.d));
      }

      return { success: true, user: importedUser };
    } catch (e) {
      return { success: false, error: 'Não foi possível ler o código de sincronização.' };
    }
  },

  clearAllData(): void {
    safeStorage.removeItem(USER_KEY);
    safeStorage.removeItem(RESULTS_KEY);
    safeStorage.removeItem(DAILY_KEY);
  }
};
