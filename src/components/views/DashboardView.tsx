import React from 'react';
import { Play, Flame, Target, Trophy, Clock, Zap, Layers, Eye, Award, CheckCircle2, Shuffle } from 'lucide-react';
import { UserProfile, DailyProgress, ExerciseType } from '../../types';
import { NavTab } from '../BottomNav';

interface DashboardViewProps {
  user: UserProfile;
  dailyProgress: DailyProgress;
  onNavigate: (tab: NavTab) => void;
  onStartDailyWorkout: () => void;
  onRetest: () => void;
  onStartStep?: (stepId: number, exerciseType: ExerciseType) => void;
}

interface StepInfo {
  id: number;
  type: ExerciseType;
  title: string;
  durationMinutes: number;
  icon: React.ElementType;
  colorClass: string;
  buttonClass: string;
}

const DAILY_STEPS: StepInfo[] = [
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

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  dailyProgress,
  onNavigate,
  onStartDailyWorkout,
  onRetest,
  onStartStep
}) => {
  const percentGain = user.baselineWpm > 0 ? Math.round(((user.currentWpm - user.baselineWpm) / user.baselineWpm) * 100) : 0;
  const progressToTarget = user.baselineWpm > 0 && user.targetWpm > user.baselineWpm
    ? Math.min(100, Math.max(0, Math.round(((user.currentWpm - user.baselineWpm) / (user.targetWpm - user.baselineWpm)) * 100)))
    : 0;

  const stepsCompleted = dailyProgress.completedSteps.length;
  const nextStepId = [1, 2, 3, 4, 5].find(s => !dailyProgress.completedSteps.includes(s)) || 1;
  const nextStepConfig = DAILY_STEPS.find(s => s.id === nextStepId) || DAILY_STEPS[0];

  const handleTriggerNextStep = () => {
    if (onStartStep) {
      onStartStep(nextStepConfig.id, nextStepConfig.type);
    } else {
      onStartDailyWorkout();
    }
  };

  return (
    <div className="space-y-5 p-4 pb-32 max-w-lg mx-auto text-[#131F24]">
      {/* Banner de Teste Inicial Pendente */}
      {(!user.initialTestCompleted || user.baselineWpm === 0) && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#FFF8D9] border-2 border-[#FFE680] border-b-4 border-b-[#E5A500] space-y-3">
          <h4 className="text-lg font-black text-[#7A5000] flex items-center gap-2">
            <span>⚠️ Teste Inicial Pendente</span>
          </h4>
          <p className="text-base font-bold text-[#8C6000]">
            Faça um teste rápido de 2 minutos para calibrar sua velocidade e definir sua meta de +50%.
          </p>
          <button
            onClick={onRetest}
            className="w-full py-4 px-5 btn-duo-yellow text-base font-black cursor-pointer"
          >
            Fazer Teste Inicial Agora
          </button>
        </div>
      )}

      {/* Meta de +50% de Velocidade */}
      <div className="card-duo p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-[#D7FFB8] border-2 border-[#A8EE69] flex items-center justify-center text-[#46A302]">
              <Target className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-stone-400 block">Objetivo</span>
              <h3 className="text-2xl font-black text-[#131F24]">+50% de Velocidade</h3>
            </div>
          </div>

          <button
            onClick={onRetest}
            title="Realizar novo teste"
            className="btn-duo-white py-2.5 px-3.5 text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
          >
            <Shuffle className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Teste</span>
          </button>
        </div>

        {/* 3 Colunas com Números Grandes */}
        <div className="grid grid-cols-3 gap-2 text-center bg-stone-50 p-4 rounded-2xl border-2 border-stone-200">
          <div>
            <span className="text-xs sm:text-sm text-stone-400 uppercase tracking-wider block font-black">Inicial</span>
            <span className="text-3xl sm:text-4xl font-black text-stone-600 font-mono block">{user.baselineWpm}</span>
            <span className="text-xs sm:text-sm text-stone-400 font-bold block">PPM</span>
          </div>

          <div className="border-x-2 border-stone-200 px-1">
            <span className="text-xs sm:text-sm text-[#46A302] uppercase tracking-wider block font-black">Atual</span>
            <span className="text-3xl sm:text-4xl font-black text-[#131F24] font-mono block">{user.currentWpm}</span>
            <span className="text-xs sm:text-sm text-[#46A302] font-black block">
              {percentGain >= 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-xs sm:text-sm text-[#E58500] uppercase tracking-wider block font-black">Meta</span>
            <span className="text-3xl sm:text-4xl font-black text-[#FF9600] font-mono block">{user.targetWpm}</span>
            <span className="text-xs sm:text-sm text-stone-400 font-bold block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso Duolingo */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm sm:text-base font-black">
            <span className="text-stone-500">Progresso até o objetivo:</span>
            <span className="text-[#46A302] font-mono">{progressToTarget}%</span>
          </div>
          <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden border-2 border-stone-200">
            <div
              className="bg-[#58CC02] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToTarget}%` }}
            />
          </div>
        </div>
      </div>

      {/* Botão Principal: Começar Treino em 1 Toque */}
      <div className="card-duo p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-400 block">
              Jornada de Hoje
            </span>
            <h3 className="text-2xl font-black text-[#131F24]">
              {dailyProgress.allDone
                ? 'Treino Concluído! 🎉'
                : `Passo ${nextStepConfig.id} de 5`}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-[#FFF8D9] border-2 border-[#FFE680] border-b-4 border-b-[#E5A500] px-4 py-2 rounded-2xl text-[#B8860B] font-black text-base">
            <Flame className="w-5 h-5 fill-[#FF9600] text-[#FF9600]" />
            <span>{user.streakDays} dias</span>
          </div>
        </div>

        {/* Botão Táteis 3D Gigante */}
        <button
          onClick={handleTriggerNextStep}
          className={`w-full py-4.5 px-6 text-lg sm:text-xl font-black flex items-center justify-center gap-3 cursor-pointer ${
            dailyProgress.allDone
              ? 'btn-duo-white'
              : 'btn-duo-green'
          }`}
        >
          {dailyProgress.allDone ? (
            <>
              <CheckCircle2 className="w-7 h-7 text-[#58CC02] stroke-[2.5]" />
              <span>Ver Minha Jornada Concluída</span>
            </>
          ) : (
            <>
              <Play className="w-7 h-7 fill-current" />
              <span>{stepsCompleted > 0 ? `Continuar: ${nextStepConfig.title}` : `Começar: ${nextStepConfig.title}`}</span>
            </>
          )}
        </button>
      </div>

      {/* A Jornada Diária de 5 Passos (Foco 100% no Usuário sem Poluição) */}
      <div className="space-y-3">
        <h3 className="text-sm font-black uppercase tracking-wider text-stone-400 px-1">
          Etapas do Treino de Hoje
        </h3>

        <div className="space-y-3">
          {DAILY_STEPS.map((step) => {
            const isDone = dailyProgress.completedSteps.includes(step.id);
            const isCurrent = step.id === nextStepId && !dailyProgress.allDone;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-white border-[#A8EE69] border-b-4 border-b-[#58CC02]'
                    : isCurrent
                    ? 'bg-white border-[#58CC02] border-b-4 border-b-[#46A302] ring-2 ring-[#58CC02]/20'
                    : 'bg-white border-stone-200 border-b-4 border-b-stone-300 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
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
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-400 block mb-0.5">
                      Passo {step.id} • {step.durationMinutes} min
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-[#131F24] truncate">
                      {step.title}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onStartStep) {
                      onStartStep(step.id, step.type);
                    } else {
                      onStartDailyWorkout();
                    }
                  }}
                  className={`py-3 px-4 sm:px-5 text-sm sm:text-base font-black shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isDone
                      ? 'btn-duo-white'
                      : isCurrent
                      ? step.buttonClass
                      : 'btn-duo-white'
                  }`}
                >
                  {isDone ? (
                    <span>Refazer</span>
                  ) : (
                    <>
                      <span>Treinar</span>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
