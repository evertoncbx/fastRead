import React from 'react';
import { CalendarCheck2, CheckCircle2, Play, Eye, Zap, Layers, Trophy, Clock, Flame, Award } from 'lucide-react';
import { DailyProgress, ExerciseType } from '../../types';

interface DailyJourneyViewProps {
  dailyProgress: DailyProgress;
  streakDays: number;
  onStartStep: (stepId: number, exerciseType: ExerciseType) => void;
}

interface StepConfig {
  id: number;
  type: ExerciseType;
  title: string;
  subtitle: string;
  durationMinutes: number;
  icon: React.ElementType;
  tagColor: string;
  scientificGoal: string;
}

const STEPS: StepConfig[] = [
  {
    id: 1,
    type: 'schulte',
    title: 'Aquecimento Visual & Percepção Parafoveal',
    subtitle: 'Tabela de Schulte 5x5',
    durationMinutes: 3,
    icon: Eye,
    tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    scientificGoal: 'Expande o ângulo de visão periférica e destrava o campo parafoveal'
  },
  {
    id: 2,
    type: 'metronome',
    title: 'Supressão da Subvocalização & Ritmo',
    subtitle: 'Metrônomo Rítmico com Machado de Assis',
    durationMinutes: 5,
    icon: Zap,
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    scientificGoal: 'Inibe a voz interior forçando cadência superior à velocidade da fala'
  },
  {
    id: 3,
    type: 'rsvp',
    title: 'Aceleração Visual com Ponto Focal (ORP)',
    subtitle: 'Leitor RSVP Turbo (350+ PPM)',
    durationMinutes: 5,
    icon: Trophy,
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    scientificGoal: 'Elimina regressões e saltos sacádicos inúteis'
  },
  {
    id: 4,
    type: 'chunking',
    title: 'Leitura em Blocos e Sintagmas',
    subtitle: 'Agrupamento de 3 palavras por fixação',
    durationMinutes: 4,
    icon: Layers,
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    scientificGoal: 'Ensina o cérebro a absorver conceitos completos em vez de sílabas'
  },
  {
    id: 5,
    type: 'assessment',
    title: 'Teste de Aferição & Retenção do Dia',
    subtitle: 'Cronômetro + Quiz de Fixação',
    durationMinutes: 3,
    icon: Award,
    tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    scientificGoal: 'Mede a velocidade real (PPM) e a taxa de compreensão do treino'
  }
];

export const DailyJourneyView: React.FC<DailyJourneyViewProps> = ({
  dailyProgress,
  streakDays,
  onStartStep
}) => {
  const completedCount = dailyProgress.completedSteps.length;
  const totalMinutes = STEPS.reduce((acc, s) => acc + s.durationMinutes, 0);

  return (
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-slate-100">
      {/* Header da Jornada */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 p-5 rounded-3xl border border-indigo-500/30 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-300">
              Protocolo Neurocientífico
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{streakDays} dias seguidos</span>
          </div>
        </div>

        <h2 className="text-lg font-black text-white">Jornada Diária de 20 Minutos</h2>
        <p className="text-xs text-slate-300 leading-relaxed mt-1">
          Complete a sequência diária recomendada para reprogramar o córtex visual e atingir sua meta de <strong className="text-indigo-400">+50% de velocidade</strong> com máxima retenção.
        </p>

        {/* Barra de Progresso da Jornada */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-400">Progresso de Hoje:</span>
            <span className="text-indigo-300 font-mono font-bold">{completedCount} de 5 concluídos ({dailyProgress.totalMinutes} min)</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de Etapas Guiadas */}
      <div className="space-y-3">
        {STEPS.map((step) => {
          const isDone = dailyProgress.completedSteps.includes(step.id);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-slate-950/70 border-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isDone
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : step.tagColor
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase">
                        Passo {step.id} • {step.durationMinutes} min
                      </span>
                      {isDone && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded-full">
                          Concluído
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold ${isDone ? 'text-slate-300 line-through' : 'text-white'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400">{step.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => onStartStep(step.id, step.type)}
                  className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 ${
                    isDone
                      ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isDone ? 'Repetir' : 'Iniciar'}</span>
                </button>
              </div>

              {/* Justificativa Científica */}
              <div className="bg-slate-950/60 py-1.5 px-2.5 rounded-lg text-[11px] text-slate-400 border border-slate-800/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>{step.scientificGoal}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
