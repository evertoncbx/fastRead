import React from 'react';
import { CheckCircle2, Play, Eye, Zap, Layers, Trophy, Flame, Award, ChevronRight } from 'lucide-react';
import { DailyProgress, ExerciseType } from '../../types';
import { StreakBadge } from '../StreakBadge';

interface DailyJourneyViewProps {
  dailyProgress: DailyProgress;
  streakDays: number;
  onStartStep: (stepId: number, exerciseType: ExerciseType) => void;
  onOpenStreakModal?: () => void;
}

interface StepConfig {
  id: number;
  type: ExerciseType;
  title: string;
  durationMinutes: number;
  icon: React.ElementType;
  colorClass: string;
  buttonClass: string;
}

const STEPS: StepConfig[] = [
  {
    id: 1,
    type: 'schulte',
    title: 'Aquecimento Visual',
    durationMinutes: 3,
    icon: Eye,
    colorClass: 'bg-[#FFF8D9] text-[#B8860B] border-[#FFE680]',
    buttonClass: 'btn-duo-yellow'
  },
  {
    id: 2,
    type: 'metronome',
    title: 'Ritmo & Concentração',
    durationMinutes: 5,
    icon: Zap,
    colorClass: 'bg-[#D7FFB8] text-[#46A302] border-[#A8EE69]',
    buttonClass: 'btn-duo-green'
  },
  {
    id: 3,
    type: 'rsvp',
    title: 'Velocidade Turbo',
    durationMinutes: 5,
    icon: Trophy,
    colorClass: 'bg-[#DDF4FF] text-[#1899D6] border-[#B0E4FF]',
    buttonClass: 'btn-duo-blue'
  },
  {
    id: 4,
    type: 'chunking',
    title: 'Leitura em Blocos',
    durationMinutes: 4,
    icon: Layers,
    colorClass: 'bg-[#F6E8FF] text-[#A559D9] border-[#E4B8FF]',
    buttonClass: 'btn-duo-purple'
  },
  {
    id: 5,
    type: 'assessment',
    title: 'Desafio do Dia (Quiz)',
    durationMinutes: 3,
    icon: Award,
    colorClass: 'bg-[#FFEAEA] text-[#EA2B2B] border-[#FFC2C2]',
    buttonClass: 'btn-duo-red'
  }
];

export const DailyJourneyView: React.FC<DailyJourneyViewProps> = ({
  dailyProgress,
  streakDays,
  onStartStep,
  onOpenStreakModal
}) => {
  const completedCount = dailyProgress.completedSteps.length;
  const progressPercent = Math.round((completedCount / STEPS.length) * 100);

  return (
    <div className="space-y-4 p-4 pb-28 max-w-lg mx-auto text-[#131F24]">
      {/* Top Banner da Jornada */}
      <div className="card-duo p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#131F24]">Treino de Hoje</h2>
            <p className="text-sm font-bold text-stone-500 mt-0.5">
              {dailyProgress.allDone ? 'Meta diária concluída! 🎉' : `${completedCount} de ${STEPS.length} etapas concluídas`}
            </p>
          </div>

          <StreakBadge
            streakDays={streakDays}
            size="md"
            showDaysSuffix={true}
            onClick={onOpenStreakModal}
          />
        </div>

        {/* Barra de Progresso Duolingo */}
        <div className="space-y-1.5">
          <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden border-2 border-stone-200">
            <div
              className="bg-[#58CC02] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de Passos - Limpa, Fluida e Estilo Duolingo */}
      <div className="space-y-3">
        {STEPS.map((step) => {
          const isDone = dailyProgress.completedSteps.includes(step.id);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex items-center justify-between gap-3 ${
                isDone
                  ? 'bg-white border-[#A8EE69] border-b-4 border-b-[#58CC02]'
                  : 'bg-white border-stone-200 border-b-4 border-b-stone-300 hover:border-[#1CB0F6]'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Ícone Redondo ou Check */}
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 ${
                    isDone
                      ? 'bg-[#D7FFB8] text-[#46A302] border-[#A8EE69]'
                      : step.colorClass
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-7 h-7 stroke-[2.5]" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-400">
                      Passo {step.id} • {step.durationMinutes} min
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#131F24] truncate">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Botão de Ação */}
              <button
                onClick={() => onStartStep(step.id, step.type)}
                className={`py-3.5 px-5 text-base font-black shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isDone
                    ? 'btn-duo-white'
                    : step.buttonClass
                }`}
              >
                {isDone ? (
                  <span>Refazer</span>
                ) : (
                  <>
                    <span>Começar</span>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {dailyProgress.allDone && (
        <div className="card-duo p-6 text-center space-y-2 bg-[#D7FFB8] border-[#A8EE69] border-b-4 border-b-[#46A302]">
          <span className="text-3xl block">🏆</span>
          <h3 className="text-xl font-black text-[#46A302]">Treino Concluído com Sucesso!</h3>
          <p className="text-sm font-bold text-stone-600">
            Você completou todas as etapas de hoje. Volte amanhã para manter sua sequência de leitura!
          </p>
        </div>
      )}
    </div>
  );
};
