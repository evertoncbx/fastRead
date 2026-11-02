import { UserProfile, ExerciseResult, DailyProgress } from '../types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const USER_KEY = 'fastread_user_profile';
const RESULTS_KEY = 'fastread_exercise_results';
const DAILY_KEY = 'fastread_daily_progress';

// Conexão Padrão: Supabase do "projeta" (schema fr.* e tabelas fr_*)
export const DEFAULT_SUPABASE_URL = 'https://fvsrnuovfzcugkwdwixs.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_y61ZayzWcRQSTHLQ0sqaZg_Z5NdiHpk';

export const FR_TABLES = {
  PROFILES: 'fr_profiles',
  RESULTS: 'fr_exercise_results',
  DAILY: 'fr_daily_progress'
} as const;

const DEFAULT_STORAGE_URL = 'https://fvsrnuovfzcugkwdwixs.supabase.co/storage/v1/object';
const DEFAULT_STORAGE_BUCKET = 'bridge-files';
const DEFAULT_STORAGE_KEY = 'sb_publishable_y61ZayzWcRQSTHLQ0sqaZg_Z5NdiHpk';

/**
 * Retorna a data no fuso local do dispositivo em formato YYYY-MM-DD.
 * Evita o bug de fuso horário UTC onde treinos feitos às 21h em Brasília (UTC-3)
 * viravam o dia para amanhã e resetavam o progresso diário.
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper seguro para converter o e-mail em chave de armazenamento persistente
export function emailToStorageKey(email: string): string {
  const clean = email.toLowerCase().trim();
  let hex = '';
  for (let i = 0; i < clean.length; i++) {
    hex += clean.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return `fastread_usr_${hex}.json`;
}

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

// Supabase client instance (com fallback direto ao banco 'projeta')
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || DEFAULT_SUPABASE_ANON_KEY;
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
  dailyProgress?: DailyProgress | null;
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
        const yesterdayStr = getLocalDateString(yesterday);

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
      void this.syncToRemote(profile, this.getResults(), this.getDailyProgress());
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

      const updatedUser: UserProfile = {
        ...user,
        currentWpm,
        bestWpm,
        totalMinutesTrained: totalMinutes,
        testsCompleted,
        averageComprehension: avgComp,
        lastActiveDate: this.getTodayDateString()
      };
      safeStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

      // Sincronização remota para o banco fr_*
      void this.syncToRemote(updatedUser, trimmed, this.getDailyProgress());

      // Salva o resultado individual na tabela fr_exercise_results
      void this.saveResultToSupabase(newResult, user.email);
    }

    return newResult;
  },

  async saveResultToSupabase(result: ExerciseResult, userEmail?: string): Promise<void> {
    if (!supabase) return;
    try {
      await supabase.from(FR_TABLES.RESULTS).insert({
        id: result.id,
        user_id: result.userId,
        user_email: (userEmail || '').toLowerCase().trim(),
        exercise_type: result.exerciseType,
        title: result.title,
        wpm: result.wpm ?? null,
        comprehension_score: result.comprehensionScore ?? null,
        duration_seconds: result.durationSeconds || 0,
        score: result.score ?? null,
        created_at: result.date || new Date().toISOString()
      });
    } catch (e) {
      console.warn('Erro ao salvar resultado no Supabase:', e);
    }
  },

  // === DAILY PROGRESS (JORNADA DIÁRIA) ===
  getTodayDateString(): string {
    return getLocalDateString(new Date());
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
          const yesterdayStr = getLocalDateString(yesterday);

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

        // PERSISTÊNCIA IMEDIATA DO PROGRESSO DIÁRIO NA NUVEM!
        void this.saveDailyProgressToRemote(progress, user);
      }
    }
    return progress;
  },

  async saveDailyProgressToRemote(progress: DailyProgress, userParam?: UserProfile | null): Promise<void> {
    const user = userParam || this.getUser();
    if (!user || !user.email) return;

    const cleanEmail = user.email.toLowerCase().trim();
    const progressId = `dp_${user.id}_${progress.date}`;

    // 1. Persistir no Supabase fr_daily_progress
    if (supabase) {
      try {
        await supabase.from(FR_TABLES.DAILY).upsert({
          id: progressId,
          user_id: user.id,
          user_email: cleanEmail,
          date: progress.date,
          completed_steps: progress.completedSteps,
          total_minutes: progress.totalMinutes,
          all_done: progress.allDone,
          updated_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Erro ao salvar progresso diário no Supabase:', e);
      }
    }

    // 2. Backup no Cloud KV
    try {
      await this.saveToCloudKV(user, this.getResults(), progress);
    } catch {}
  },

  async fetchDailyProgressFromRemote(email: string, dateStr?: string): Promise<DailyProgress | null> {
    const cleanEmail = email.toLowerCase().trim();
    const targetDate = dateStr || this.getTodayDateString();

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from(FR_TABLES.DAILY)
          .select('*')
          .ilike('user_email', cleanEmail)
          .eq('date', targetDate)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          const steps = Array.isArray(data.completed_steps) ? data.completed_steps : [];
          const remoteProgress: DailyProgress = {
            date: data.date || targetDate,
            completedSteps: steps,
            totalMinutes: data.total_minutes || 0,
            allDone: data.all_done || steps.length >= 5
          };

          // Mescla com o progresso local se existir
          const local = this.getDailyProgress();
          if (local.date === targetDate) {
            const mergedSteps = Array.from(new Set([...local.completedSteps, ...remoteProgress.completedSteps]));
            const mergedProgress: DailyProgress = {
              date: targetDate,
              completedSteps: mergedSteps,
              totalMinutes: Math.max(local.totalMinutes, remoteProgress.totalMinutes),
              allDone: mergedSteps.length >= 5 || local.allDone || remoteProgress.allDone
            };
            safeStorage.setItem(DAILY_KEY, JSON.stringify(mergedProgress));
            return mergedProgress;
          }

          safeStorage.setItem(DAILY_KEY, JSON.stringify(remoteProgress));
          return remoteProgress;
        }
      } catch (err) {
        console.warn('Erro ao buscar progresso diário no Supabase:', err);
      }
    }

    return null;
  },

  // === CROSS-DEVICE SYNC & REMOTE LOOKUP (AMARRADO 100% AO E-MAIL) ===

  /**
   * Busca perfil existente pelo e-mail em Supabase (tabela fr_profiles) e na Nuvem de Backup.
   * Permite que ao abrir o Leitox no celular ou em outro computador com o mesmo e-mail,
   * os dados de baseline, target, streak, histórico e progresso diário sejam completamente restaurados.
   */
  async fetchRemoteProfile(email: string): Promise<RemoteSyncResult> {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { profile: null, results: [], dailyProgress: null, source: null };
    }

    const todayStr = this.getTodayDateString();

    // 1. Tentar Supabase fr_*
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from(FR_TABLES.PROFILES)
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
            lastActiveDate: data.last_active_date || (data.updated_at ? data.updated_at.split('T')[0] : todayStr),
            totalMinutesTrained: data.total_minutes || 0,
            testsCompleted: data.tests_completed || 0,
            initialTestCompleted: data.initial_test_completed ?? (data.baseline_wpm > 0),
            createdAt: data.created_at || new Date().toISOString()
          };

          // Buscar histórico de exercícios da tabela fr_exercise_results
          let resultsList: ExerciseResult[] = [];
          try {
            const { data: resData } = await supabase
              .from(FR_TABLES.RESULTS)
              .select('*')
              .or(`user_id.eq.${data.id},user_email.eq.${cleanEmail}`)
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

          // Buscar progresso diário da tabela fr_daily_progress
          let restoredDaily: DailyProgress | null = null;
          try {
            const { data: dailyData } = await supabase
              .from(FR_TABLES.DAILY)
              .select('*')
              .or(`user_id.eq.${data.id},user_email.eq.${cleanEmail}`)
              .eq('date', todayStr)
              .order('updated_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (dailyData) {
              const steps = Array.isArray(dailyData.completed_steps) ? dailyData.completed_steps : [];
              restoredDaily = {
                date: dailyData.date || todayStr,
                completedSteps: steps,
                totalMinutes: dailyData.total_minutes || 0,
                allDone: dailyData.all_done || steps.length >= 5
              };
            }
          } catch {
            // Falha não crítica no daily progress
          }

          // Salvar localmente
          safeStorage.setItem(USER_KEY, JSON.stringify(restoredProfile));
          if (resultsList.length > 0) {
            safeStorage.setItem(RESULTS_KEY, JSON.stringify(resultsList));
          }
          if (restoredDaily) {
            safeStorage.setItem(DAILY_KEY, JSON.stringify(restoredDaily));
          }

          return {
            profile: restoredProfile,
            results: resultsList,
            dailyProgress: restoredDaily,
            source: 'supabase'
          };
        }
      } catch (err) {
        console.warn('Supabase fetchRemoteProfile error:', err);
      }
    }

    // 2. Tentar Cloud Storage Sync (fallback de backup)
    try {
      const cloudObj = await this.fetchFromCloudKV(cleanEmail);
      if (cloudObj && cloudObj.profile) {
        safeStorage.setItem(USER_KEY, JSON.stringify(cloudObj.profile));
        if (cloudObj.results && cloudObj.results.length > 0) {
          safeStorage.setItem(RESULTS_KEY, JSON.stringify(cloudObj.results));
        }
        if (cloudObj.dailyProgress && cloudObj.dailyProgress.date) {
          safeStorage.setItem(DAILY_KEY, JSON.stringify(cloudObj.dailyProgress));
        }
        return {
          profile: cloudObj.profile,
          results: cloudObj.results || [],
          dailyProgress: cloudObj.dailyProgress,
          source: 'cloud'
        };
      }
    } catch (err) {
      console.warn('Cloud KV fetch failed:', err);
    }

    return { profile: null, results: [], dailyProgress: null, source: null };
  },

  /**
   * Sincroniza o perfil atual, resultados e progresso diário para o Supabase (fr_*) e Cloud KV.
   */
  async syncToRemote(
    profile: UserProfile,
    results: ExerciseResult[],
    daily?: DailyProgress
  ): Promise<boolean> {
    let synced = false;
    const cleanEmail = profile.email.toLowerCase().trim();
    const currentDaily = daily || this.getDailyProgress();

    // 1. Supabase fr_profiles & fr_daily_progress
    if (supabase) {
      try {
        const { error: profErr } = await supabase
          .from(FR_TABLES.PROFILES)
          .upsert({
            id: profile.id,
            name: profile.name,
            email: cleanEmail,
            baseline_wpm: profile.baselineWpm,
            target_wpm: profile.targetWpm,
            current_wpm: profile.currentWpm,
            best_wpm: profile.bestWpm,
            avg_comprehension: profile.averageComprehension,
            streak_days: profile.streakDays,
            total_minutes: profile.totalMinutesTrained,
            tests_completed: profile.testsCompleted,
            initial_test_completed: profile.initialTestCompleted,
            last_active_date: profile.lastActiveDate || this.getTodayDateString(),
            updated_at: new Date().toISOString()
          });

        if (!profErr) synced = true;

        // Salvar progresso diário na tabela fr_daily_progress
        const progressId = `dp_${profile.id}_${currentDaily.date}`;
        await supabase
          .from(FR_TABLES.DAILY)
          .upsert({
            id: progressId,
            user_id: profile.id,
            user_email: cleanEmail,
            date: currentDaily.date,
            completed_steps: currentDaily.completedSteps,
            total_minutes: currentDaily.totalMinutes,
            all_done: currentDaily.allDone,
            updated_at: new Date().toISOString()
          });
      } catch (err) {
        console.warn('Supabase sync error:', err);
      }
    }

    // 2. Cloud Storage Backup Persistente
    try {
      await this.saveToCloudKV(profile, results.slice(0, 50), currentDaily);
      synced = true;
    } catch (err) {
      console.warn('Cloud Storage backup error:', err);
    }

    return synced;
  },

  // Helper para Cloud Storage Persistente (Supabase Storage com Bucket Público)
  async saveToCloudKV(
    profile: UserProfile,
    results: ExerciseResult[],
    daily?: DailyProgress
  ): Promise<void> {
    try {
      if (typeof fetch === 'undefined') return;

      const cleanEmail = profile.email.toLowerCase().trim();
      const fileName = emailToStorageKey(cleanEmail);
      const uploadUrl = `${DEFAULT_STORAGE_URL}/${DEFAULT_STORAGE_BUCKET}/${fileName}`;

      const payload = {
        profile,
        results: results.slice(0, 50),
        dailyProgress: daily || this.getDailyProgress(),
        syncedAt: new Date().toISOString()
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'apikey': DEFAULT_STORAGE_KEY,
          'Authorization': `Bearer ${DEFAULT_STORAGE_KEY}`,
          'Content-Type': 'application/json',
          'x-upsert': 'true'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);
    } catch {
      // Ignorar erros de rede em modo offline
    }
  },

  async fetchFromCloudKV(email: string): Promise<{ profile: UserProfile; results: ExerciseResult[]; dailyProgress?: DailyProgress } | null> {
    try {
      if (typeof fetch === 'undefined') return null;

      const cleanEmail = email.toLowerCase().trim();
      const fileName = emailToStorageKey(cleanEmail);
      const publicUrl = `${DEFAULT_STORAGE_URL}/public/${DEFAULT_STORAGE_BUCKET}/${fileName}?_t=${Date.now()}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(publicUrl, {
        signal: controller.signal
      }).catch(() => null);
      clearTimeout(timeoutId);

      if (!res || !res.ok) return null;
      const data = await res.json();
      if (data && data.profile && data.profile.email) {
        // Garantir que perfil com baseline definido seja reconhecido com teste concluído
        if (data.profile.baselineWpm > 0 && data.profile.initialTestCompleted === undefined) {
          data.profile.initialTestCompleted = true;
        }
        return {
          profile: data.profile,
          results: Array.isArray(data.results) ? data.results : [],
          dailyProgress: data.dailyProgress
        };
      }
    } catch {
      return null;
    }
    return null;
  },

  // === EXPORTAÇÃO & IMPORTAÇÃO DE BACKUP (MANTIDO PARA TESTES INTERNOS) ===
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
