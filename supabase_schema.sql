-- =========================================================
-- ESQUEMA SQL SUPABASE - LEITOX (LEITURA DINÂMICA TURBO)
-- =========================================================

-- 1. Tabela de Perfis de Usuário
CREATE TABLE IF NOT EXISTS public.profiles (
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Histórico de Exercícios e Resultados
CREATE TABLE IF NOT EXISTS public.exercise_results (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_type TEXT NOT NULL,
  title TEXT NOT NULL,
  wpm INTEGER,
  comprehension_score INTEGER,
  duration_seconds INTEGER DEFAULT 0,
  score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_results ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público para o client anônimo (leitura e escrita)
CREATE POLICY "Permitir leitura anonima de perfis" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Permitir insercao e atualizacao anonima de perfis" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Permitir leitura de resultados" ON public.exercise_results FOR SELECT USING (true);
CREATE POLICY "Permitir insercao de resultados" ON public.exercise_results FOR ALL USING (true);
