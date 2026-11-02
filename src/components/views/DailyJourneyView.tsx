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
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border-2 border-emerald-200 flex items-center justify-center">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-wider font-black text-emerald-800">
              Protocolo Neurocientífico
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-800 font-mono text-xs font-black bg-amber-50 border-2 border-amber-200 px-3 py-1.5 rounded-xl">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{streakDays} dias seguidos</span>
          </div>
        </div>

        <h2 className="text-xl font-black text-stone-900 tracking-tight">Jornada Diária de 20 Minutos</h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1 font-medium">
          Complete a sequência recomendada para reprogramar o córtex visual e atingir sua meta de <strong className="text-emerald-700 font-bold">+50% de velocidade</strong> com máxima retenção.
        </p>

        {/* Barra de Progresso da Jornada */}
        <div className="mt-4 pt-4 border-t-2 border-stone-100">
          <div className="flex justify-between text-xs sm:text-sm mb-2 font-bold">
            <span className="text-stone-600">Progresso de Hoje:</span>
            <span className="text-emerald-700 font-mono font-black">{completedCount} de 5 concluídos ({dailyProgress.totalMinutes} min)</span>
          </div>
          <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden border border-stone-200">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de Etapas Guiadas com Escala Duolingo */}
      <div className="space-y-3.5">
        {STEPS.map((step) => {
          const isDone = dailyProgress.completedSteps.includes(step.id);
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-4 sm:p-5 rounded-3xl border-2 transition-all ${
                isDone
                  ? 'bg-stone-50/90 border-stone-200'
                  : 'bg-white border-stone-200 shadow-xs hover:border-emerald-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : step.tagColor
                  }`}>
                    {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-stone-500 font-bold uppercase">
                        Passo {step.id} • {step.durationMinutes} min
                      </span>
                      {isDone && (
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                          Concluído
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm sm:text-base font-bold ${isDone ? 'text-stone-400 line-through' : 'text-stone-900'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">{step.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => onStartStep(step.id, step.type)}
                  className={`py-2.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-98 border-b-2 ${
                    isDone
                      ? 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200 border-stone-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-800 shadow-xs'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isDone ? 'Repetir' : 'Iniciar'}</span>
                </button>
              </div>

              {/* Justificativa Científica */}
              <div className="bg-stone-50 py-2 px-3 rounded-xl text-xs text-stone-600 border border-stone-200 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{step.scientificGoal}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
