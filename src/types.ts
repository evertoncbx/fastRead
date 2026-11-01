export type ExerciseType = 'schulte' | 'metronome' | 'rsvp' | 'chunking' | 'saccadic' | 'assessment';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  baselineWpm: number; // PPM inicial aferido no teste diagnóstico
  targetWpm: number;   // Meta (+50% do baseline)
  currentWpm: number;  // PPM mais recente
  bestWpm: number;     // Recorde de PPM
  averageComprehension: number; // Taxa média de retenção em %
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalMinutesTrained: number;
  testsCompleted: number;
  initialTestCompleted: boolean;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReadingText {
  id: string;
  title: string;
  author: string;
  category: 'conto' | 'discurso' | 'noticia' | 'artigo';
  description: string;
  text: string;
  wordCount: number;
  estimatedMinutes: number;
  quiz?: QuizQuestion[];
}

export interface ExerciseResult {
  id: string;
  userId: string;
  exerciseType: ExerciseType;
  title: string;
  wpm?: number;
  comprehensionScore?: number; // 0-100%
  durationSeconds: number;
  score?: number; // Para Schulte (ex: tempo total em segundos)
  date: string; // ISO String
}

export interface DailyStep {
  stepId: number;
  exerciseType: ExerciseType;
  title: string;
  subtitle: string;
  durationMinutes: number;
  completed: boolean;
  iconName: string;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  completedSteps: number[]; // stepIds
  totalMinutes: number;
  allDone: boolean;
}
