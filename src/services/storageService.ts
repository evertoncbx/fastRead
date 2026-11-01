import { UserProfile, ExerciseResult, DailyProgress } from '../types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const USER_KEY = 'fastread_user_profile';
const RESULTS_KEY = 'fastread_exercise_results';
const DAILY_KEY = 'fastread_daily_progress';

// Supabase client instance (optional)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.warn('Supabase initialization failed, falling back to local storage', e);
  }
}

export const getSupabaseClient = () => supabase;

export const storage = {
  // === USER PROFILE ===
  getUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (!data) return null;
      const user = JSON.parse(data) as UserProfile;

      // Se o usuário ficou inativo por mais de 1 dia (não acessou hoje nem ontem), reseta a sequência honestamente
      if (user.lastActiveDate) {
        const todayStr = this.getTodayDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (user.lastActiveDate !== todayStr && user.lastActiveDate !== yesterdayStr) {
          if (user.streakDays > 0) {
            user.streakDays = 0;
            localStorage.setItem(USER_KEY, JSON.stringify(user));
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
      localStorage.setItem(USER_KEY, JSON.stringify(profile));

      // Async sync to Supabase if configured
      if (supabase) {
        void (async () => {
          try {
            const { error } = await supabase!
              .from('profiles')
              .upsert({
                id: profile.id,
                name: profile.name,
                email: profile.email,
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
            if (error) console.warn('Supabase profile sync error:', error.message);
          } catch (err) {
            console.warn('Supabase sync network error:', err);
          }
        })();
      }
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
      const data = localStorage.getItem(RESULTS_KEY);
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
    // Keep last 100 results locally
    const trimmed = results.slice(0, 100);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));

    // Update user stats
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

      this.updateUserProfile({
        currentWpm,
        bestWpm,
        totalMinutesTrained: totalMinutes,
        testsCompleted,
        averageComprehension: avgComp
      });
    }

    // Sync result to Supabase if configured
    if (supabase) {
      void (async () => {
        try {
          const { error } = await supabase!
            .from('exercise_results')
            .insert({
              id: newResult.id,
              user_id: newResult.userId,
              exercise_type: newResult.exerciseType,
              title: newResult.title,
              wpm: newResult.wpm,
              comprehension_score: newResult.comprehensionScore,
              duration_seconds: newResult.durationSeconds,
              score: newResult.score,
              created_at: newResult.date
            });
          if (error) console.warn('Supabase result sync error:', error.message);
        } catch (err) {
          console.warn('Supabase insert network error:', err);
        }
      })();
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
      const raw = localStorage.getItem(DAILY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DailyProgress;
        if (parsed.date === todayStr) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }

    // Fresh day
    const fresh: DailyProgress = {
      date: todayStr,
      completedSteps: [],
      totalMinutes: 0,
      allDone: false
    };
    localStorage.setItem(DAILY_KEY, JSON.stringify(fresh));
    return fresh;
  },

  markDailyStepComplete(stepId: number, durationMinutes: number): DailyProgress {
    const progress = this.getDailyProgress();
    if (!progress.completedSteps.includes(stepId)) {
      progress.completedSteps.push(stepId);
      progress.totalMinutes += durationMinutes;
      // If 5 steps completed
      if (progress.completedSteps.length >= 5) {
        progress.allDone = true;
      }
      localStorage.setItem(DAILY_KEY, JSON.stringify(progress));

      // Check and update streak
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
            streak = 1; // Reset if broke streak
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

  clearAllData(): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(RESULTS_KEY);
    localStorage.removeItem(DAILY_KEY);
  }
};
