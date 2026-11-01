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
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    scientificGoal: 'Expande o ângulo de visão periférica e destrava o campo parafoveal'
  },
  {
    id: 2,
    type: 'metronome',
    title: 'Supressão da Subvocalização & Ritmo',
    subtitle: 'Metrônomo Rítmico com Clássicos PT-BR',
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
    tagColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    scientificGoal: 'Elimina regressões e saltos sacádicos desnecessários'
  },
  {
    id: 4,
    type: 'chunking',
    title: 'Leitura em Blocos e Sintagmas',
    subtitle: 'Agrupamento de 3 palavras por fixação',
    durationMinutes: 4,
    icon: Layers,
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    scientificGoal: 'Ensina o cérebro a absorver conceitos completos em vez de sílabas isoladas'
  },
  {
    id: 5,
    type: 'assessment',
    title: 'Teste de Aferição & Retenção do Dia',
    subtitle: 'Cronômetro + Quiz de Fixação (Texto Inédito)',
    durationMinutes: 3,
    icon: Award,
    tagColor: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    scientificGoal: 'Mede a velocidade real (PPM) e a taxa de compreensão do treino'
  }
];

export const DailyJourneyView: React.FC<DailyJourneyViewProps> = ({
  dailyProgress,
  streakDays,
  onStartStep
}) => {
  const completedCount = dailyProgress.completedSteps.length;

  return (
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-[#f3efe8]">
      {/* Header da Jornada */}
      <div className="bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] p-5 rounded-3xl border border-[#3d3834] shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
              Protocolo Neurocientífico
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{streakDays} dias seguidos</span>
          </div>
        </div>

        <h2 className="text-lg font-black text-[#faf8f5]">Jornada Diária de 20 Minutos</h2>
        <p className="text-xs text-[#a39b8e] leading-relaxed mt-1">
          Complete a sequência recomendada para reprogramar o córtex visual e atingir sua meta de <strong className="text-amber-400">+50% de velocidade</strong> com máxima retenção.
        </p>

        {/* Barra de Progresso da Jornada */}
        <div className="mt-4 pt-3 border-t border-[#2c2724]">
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-[#a39b8e]">Progresso de Hoje:</span>
            <span className="text-amber-300 font-mono font-bold">{completedCount} de 5 concluídos ({dailyProgress.totalMinutes} min)</span>
          </div>
          <div className="w-full bg-[#131211] h-2.5 rounded-full overflow-hidden border border-[#2c2724]">
            <div
              className="bg-gradient-to-r from-amber-600 to-emerald-500 h-full rounded-full transition-all duration-300"
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
                  ? 'bg-[#131211]/80 border-emerald-600/30'
                  : 'bg-[#1c1917] border-[#2c2724] hover:border-[#403b34] shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                      : step.tagColor
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#766f63] font-semibold uppercase">
                        Passo {step.id} • {step.durationMinutes} min
                      </span>
                      {isDone && (
                        <span className="text-[9px] bg-emerald-950/50 text-emerald-300 font-bold px-1.5 py-0.2 rounded-full border border-emerald-600/30">
                          Concluído
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold ${isDone ? 'text-[#766f63] line-through' : 'text-[#faf8f5]'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#a39b8e]">{step.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => onStartStep(step.id, step.type)}
                  className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 ${
                    isDone
                      ? 'bg-[#2c2724] text-[#a39b8e] hover:text-[#f3efe8] hover:bg-[#36322e]'
                      : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-900/30'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isDone ? 'Repetir' : 'Iniciar'}</span>
                </button>
              </div>

              {/* Justificativa Científica */}
              <div className="bg-[#131211]/60 py-1.5 px-2.5 rounded-lg text-[11px] text-[#a39b8e] border border-[#2c2724] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{step.scientificGoal}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
