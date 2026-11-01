import React from 'react';
import { Eye, Zap, Trophy, Layers, MoveHorizontal, Award, ArrowRight } from 'lucide-react';
import { ExerciseType } from '../../types';

interface ExercisesViewProps {
  onSelectExercise: (type: ExerciseType) => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({ onSelectExercise }) => {
  const exercises = [
    {
      type: 'schulte' as ExerciseType,
      title: 'Tabelas de Schulte (3x3 a 5x5)',
      category: 'Visão Periférica',
      description: 'Expande o raio do campo parafoveal mantendo o olhar ancorado no centro.',
      icon: Eye,
      color: 'from-amber-600/20 to-amber-700/5 text-amber-400 border-amber-600/30',
      tag: 'Aceleração Visual',
      duration: '2-3 min'
    },
    {
      type: 'metronome' as ExerciseType,
      title: 'Metrônomo Rítmico Anti-Subvocalização',
      category: 'Supressão Sonora',
      description: 'Derruba o vício de pronunciar cada palavra na mente através de cadência rítmica acelerada.',
      icon: Zap,
      color: 'from-amber-700/20 to-amber-800/5 text-amber-300 border-amber-600/30',
      tag: 'Eliminar Subvocalização',
      duration: '3-5 min'
    },
    {
      type: 'rsvp' as ExerciseType,
      title: 'Leitor RSVP com Ponto Focal (ORP)',
      category: 'Aceleração Turbo',
      description: 'Apresentação serial rápida que alinha a letra focal da palavra, atingindo até 800 PPM sem esforço.',
      icon: Trophy,
      color: 'from-amber-500/20 to-amber-600/5 text-amber-200 border-amber-500/30',
      tag: 'Sem Saltos Oculares',
      duration: '3-5 min'
    },
    {
      type: 'chunking' as ExerciseType,
      title: 'Leitura em Blocos (Chunking)',
      category: 'Sintagmas',
      description: 'Treina o cérebro para agrupar 2 a 4 palavras por fixação em colunas estreitas.',
      icon: Layers,
      color: 'from-emerald-600/20 to-emerald-700/5 text-emerald-400 border-emerald-600/30',
      tag: 'Fixação Ampla',
      duration: '3-4 min'
    },
    {
      type: 'saccadic' as ExerciseType,
      title: 'Saltos Sacádicos Bilaterais',
      category: 'Agilidade Ocular',
      description: 'Exercícios dinâmicos para soltar os músculos que controlam a movimentação dos olhos.',
      icon: MoveHorizontal,
      color: 'from-amber-600/15 to-stone-700/5 text-amber-400 border-amber-600/25',
      tag: 'Alongamento Visual',
      duration: '2 min'
    },
    {
      type: 'assessment' as ExerciseType,
      title: 'Teste com Cronômetro & Quiz',
      category: 'Aferição Real',
      description: 'Mede suas Palavras Por Minuto (PPM) e valida a retenção através de questionário com textos variados.',
      icon: Award,
      color: 'from-amber-700/25 to-amber-900/10 text-amber-300 border-amber-600/40',
      tag: 'Medição de Progresso',
      duration: '2-3 min'
    }
  ];

  return (
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-[#f3efe8]">
      <div>
        <h2 className="text-lg font-black text-[#faf8f5]">Catálogo de Exercícios</h2>
        <p className="text-xs text-[#a39b8e]">Escolha uma modalidade para praticar individualmente</p>
      </div>

      <div className="space-y-3">
        {exercises.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.type}
              onClick={() => onSelectExercise(item.type)}
              className="w-full text-left bg-[#1c1917] border border-[#2c2724] hover:border-[#403b34] p-4 rounded-2xl transition-all shadow-sm group relative overflow-hidden active:scale-99"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#a39b8e]">
                        {item.category}
                      </span>
                      <span className="text-[9px] bg-[#24211e] text-[#d8d0c2] px-1.5 py-0.2 rounded font-mono border border-[#36322e]">
                        {item.duration}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#faf8f5] group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a39b8e] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#24211e] border border-[#36322e] flex items-center justify-center text-[#a39b8e] group-hover:bg-amber-600 group-hover:text-white transition-all shrink-0 mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
