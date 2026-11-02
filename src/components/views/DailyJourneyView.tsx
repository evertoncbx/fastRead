import React from 'react';
import { CalendarCheck2, CheckCircle2, Play, Eye, Zap, Layers, Trophy, Flame, Award } from 'lucide-react';
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
    tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
    scientificGoal: 'Expande o raio da visão periférica e destrava o campo parafoveal'
  },
  {
    id: 2,
    type: 'metronome',
    title: 'Supressão da Subvocalização & Ritmo',
    subtitle: 'Metrônomo Rítmico com Clássicos PT-BR',
    durationMinutes: 5,
    icon: Zap,
    tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    scientificGoal: 'Inibe a voz interior forçando cadência superior à velocidade da fala'
  },
  {
    id: 3,
    type: 'rsvp',
    title: 'Aceleração Visual com Ponto Focal (ORP)',
    subtitle: 'Leitor RSVP Turbo (350+ PPM)',
    durationMinutes: 5,
    icon: Trophy,
    tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
    scientificGoal: 'Elimina regressões e saltos sacádicos desnecessários'
  },
  {
    id: 4,
    type: 'chunking',
    title: 'Leitura em Blocos e Sintagmas',
    subtitle: 'Agrupamento de 3 palavras por fixação',
    durationMinutes: 4,
    icon: Layers,
    tagColor: 'text-teal-700 bg-teal-50 border-teal-200',
    scientificGoal: 'Ensina o cérebro a absorver conceitos completos em vez de sílabas isoladas'
  },
  {
    id: 5,
    type: 'assessment',
    title: 'Teste de Aferição & Retenção do Dia',
    subtitle: 'Cronômetro + Quiz de Fixação (Texto Inédito)',
    durationMinutes: 3,
    icon: Award,
    tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
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
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-stone-800">
      {/* Header da Jornada */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-800">
              Protocolo Neurocientífico
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-700 font-mono text-xs font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{streakDays} dias seguidos</span>
          </div>
        </div>

        <h2 className="text-lg font-black text-stone-900">Jornada Diária de 20 Minutos</h2>
        <p className="text-xs text-stone-600 leading-relaxed mt-1">
          Complete a sequência recomendada para reprogramar o córtex visual e atingir sua meta de <strong className="text-emerald-700 font-bold">+50% de velocidade</strong> com máxima retenção.
        </p>

        {/* Barra de Progresso da Jornada */}
        <div className="mt-4 pt-3 border-t border-stone-200">
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-stone-500">Progresso de Hoje:</span>
            <span className="text-emerald-700 font-mono font-bold">{completedCount} de 5 concluídos ({dailyProgress.totalMinutes} min)</span>
          </div>
          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
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
                  ? 'bg-stone-50/80 border-stone-200'
                  : 'bg-white border-stone-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : step.tagColor
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-stone-500 font-semibold uppercase">
                        Passo {step.id} • {step.durationMinutes} min
                      </span>
                      {isDone && (
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded-full border border-emerald-200">
                          Concluído
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold ${isDone ? 'text-stone-400 line-through' : 'text-stone-900'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-500">{step.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => onStartStep(step.id, step.type)}
                  className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 ${
                    isDone
                      ? 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 border border-stone-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isDone ? 'Repetir' : 'Iniciar'}</span>
                </button>
              </div>

              {/* Justificativa Científica */}
              <div className="bg-stone-50 py-1.5 px-2.5 rounded-lg text-[11px] text-stone-600 border border-stone-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{step.scientificGoal}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
