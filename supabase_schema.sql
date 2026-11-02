-- =========================================================
-- ESQUEMA SQL SUPABASE - LEITOX (FAST-READ) NO BANCO PROJETA
-- Schema 'fr' e Tabelas 'public.fr_*' com RLS e Vistas
-- =========================================================

-- 1. Criação do Schema Dedicado fr
CREATE SCHEMA IF NOT EXISTS fr;

-- 2. Tabela de Perfis de Usuário Fast-Read
CREATE TABLE IF NOT EXISTS public.fr_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  baseline_wpm INTEGER DEFAULT 0,
  target_wpm INTEGER DEFAULT 0,
  current_wpm INTEGER DEFAULT 0,
  best_wpm INTEGER DEFAULT 0,
  avg_comprehension INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 1,
  total_minutes INTEGER DEFAULT 0,
  tests_completed INTEGER DEFAULT 0,
  initial_test_completed BOOLEAN DEFAULT false,
  last_active_date TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fr_profiles_email ON public.fr_profiles(email);
CREATE INDEX IF NOT EXISTS idx_fr_profiles_updated ON public.fr_profiles(updated_at DESC);

-- 3. Tabela de Histórico de Exercícios e Resultados
CREATE TABLE IF NOT EXISTS public.fr_exercise_results (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_email TEXT,
  exercise_type TEXT NOT NULL,
  title TEXT NOT NULL,
  wpm INTEGER,
  comprehension_score INTEGER,
  duration_seconds INTEGER DEFAULT 0,
  score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fr_exercise_results_user_id ON public.fr_exercise_results(user_id);
CREATE INDEX IF NOT EXISTS idx_fr_exercise_results_user_email ON public.fr_exercise_results(user_email);
CREATE INDEX IF NOT EXISTS idx_fr_exercise_results_created ON public.fr_exercise_results(created_at DESC);

-- 4. Tabela de Progresso Diário (Jornada Diária de 20 min)
CREATE TABLE IF NOT EXISTS public.fr_daily_progress (
  id TEXT PRIMARY KEY, -- formato: dp_{user_id}_{date}
  user_id TEXT NOT NULL,
  user_email TEXT,
  date TEXT NOT NULL, -- formato YYYY-MM-DD
  completed_steps JSONB DEFAULT '[]'::jsonb NOT NULL,
  total_minutes INTEGER DEFAULT 0 NOT NULL,
  all_done BOOLEAN DEFAULT false NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fr_daily_progress_user_date ON public.fr_daily_progress(user_id, date);
CREATE INDEX IF NOT EXISTS idx_fr_daily_progress_email_date ON public.fr_daily_progress(user_email, date);
CREATE INDEX IF NOT EXISTS idx_fr_daily_progress_updated ON public.fr_daily_progress(updated_at DESC);

-- 5. Vistas no Schema fr para consultas diretas fr.nomedatabela
CREATE OR REPLACE VIEW fr.profiles AS SELECT * FROM public.fr_profiles;
CREATE OR REPLACE VIEW fr.exercise_results AS SELECT * FROM public.fr_exercise_results;
CREATE OR REPLACE VIEW fr.daily_progress AS SELECT * FROM public.fr_daily_progress;

CREATE OR REPLACE VIEW fr.fr_profiles AS SELECT * FROM public.fr_profiles;
CREATE OR REPLACE VIEW fr.fr_exercise_results AS SELECT * FROM public.fr_exercise_results;
CREATE OR REPLACE VIEW fr.fr_daily_progress AS SELECT * FROM public.fr_daily_progress;

-- 6. Habilitar Row Level Security (RLS)
ALTER TABLE public.fr_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fr_exercise_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fr_daily_progress ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de acesso para anon, authenticated e service_role
DROP POLICY IF EXISTS "Allow all on fr_profiles" ON public.fr_profiles;
CREATE POLICY "Allow all on fr_profiles" ON public.fr_profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on fr_exercise_results" ON public.fr_exercise_results;
CREATE POLICY "Allow all on fr_exercise_results" ON public.fr_exercise_results FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on fr_daily_progress" ON public.fr_daily_progress;
CREATE POLICY "Allow all on fr_daily_progress" ON public.fr_daily_progress FOR ALL USING (true) WITH CHECK (true);

GRANT USAGE ON SCHEMA fr TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA fr TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA fr TO anon, authenticated, service_role;

GRANT ALL ON public.fr_profiles TO anon, authenticated, service_role;
GRANT ALL ON public.fr_exercise_results TO anon, authenticated, service_role;
GRANT ALL ON public.fr_daily_progress TO anon, authenticated, service_role;

-- 8. Recarregar Cache PostgREST
NOTIFY pgrst, 'reload schema';
