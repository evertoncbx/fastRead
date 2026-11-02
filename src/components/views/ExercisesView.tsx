import React from 'react';
import { Eye, Zap, Trophy, Layers, MoveHorizontal, Award, ChevronRight } from 'lucide-react';
import { ExerciseType } from '../../types';

interface ExercisesViewProps {
  onSelectExercise: (type: ExerciseType) => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({ onSelectExercise }) => {
  const exercises = [
    {
      type: 'schulte' as ExerciseType,
      title: 'Tabela de Schulte',
      icon: Eye,
      colorClass: 'bg-[#FFF8D9] text-[#B8860B] border-[#FFE680]',
      duration: '3 min'
    },
    {
      type: 'metronome' as ExerciseType,
      title: 'Metrônomo Rítmico',
      icon: Zap,
      colorClass: 'bg-[#D7FFB8] text-[#46A302] border-[#A8EE69]',
      duration: '5 min'
    },
    {
      type: 'rsvp' as ExerciseType,
      title: 'Leitor RSVP Turbo',
      icon: Trophy,
      colorClass: 'bg-[#DDF4FF] text-[#1899D6] border-[#B0E4FF]',
      duration: '5 min'
    },
    {
      type: 'chunking' as ExerciseType,
      title: 'Leitura em Blocos',
      icon: Layers,
      colorClass: 'bg-[#F6E8FF] text-[#A559D9] border-[#E4B8FF]',
      duration: '4 min'
    },
    {
      type: 'saccadic' as ExerciseType,
      title: 'Saltos Sacádicos',
      icon: MoveHorizontal,
      colorClass: 'bg-[#FFF0D4] text-[#E58500] border-[#FFD9A6]',
      duration: '2 min'
    },
    {
      type: 'assessment' as ExerciseType,
      title: 'Teste de Velocidade',
      icon: Award,
      colorClass: 'bg-[#FFEAEA] text-[#EA2B2B] border-[#FFC2C2]',
      duration: '3 min'
    }
  ];

  return (
    <div className="space-y-4 p-4 pb-32 max-w-lg mx-auto text-[#131F24]">
      <div>
        <h2 className="text-3xl font-black text-[#131F24] tracking-tight">Treino Livre</h2>
      </div>

      <div className="space-y-3">
        {exercises.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.type}
              onClick={() => onSelectExercise(item.type)}
              className="w-full text-left p-5 rounded-3xl bg-white border-2 border-stone-200 border-b-4 border-b-stone-300 hover:border-[#1CB0F6] transition-all cursor-pointer active:border-b-2 active:translate-y-[2px] flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-15 h-15 rounded-2xl border-2 flex items-center justify-center shrink-0 ${item.colorClass}`}>
                  <Icon className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-stone-400 block mb-1">
                    {item.duration}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#131F24] truncate">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 group-hover:text-[#1CB0F6] group-hover:bg-[#DDF4FF] shrink-0 transition-colors">
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
