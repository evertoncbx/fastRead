import React from 'react';
import { Eye, Zap, Trophy, Layers, MoveHorizontal, Award, ArrowRight, Sparkles } from 'lucide-react';
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
      color: 'from-indigo-600/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30',
      tag: 'Aceleração Visual',
      duration: '2-3 min'
    },
    {
      type: 'metronome' as ExerciseType,
      title: 'Metrônomo Rítmico Anti-Subvocalização',
      category: 'Supressão Sonora',
      description: 'Derruba o vício de pronunciar cada palavra na mente através de cadência rítmica acelerada.',
      icon: Zap,
      color: 'from-amber-600/20 to-amber-600/5 text-amber-400 border-amber-500/30',
      tag: 'Eliminar Subvocalização',
      duration: '3-5 min'
    },
    {
      type: 'rsvp' as ExerciseType,
      title: 'Leitor RSVP com Ponto Focal (ORP)',
      category: 'Aceleração Turbo',
      description: 'Apresentação serial rápida que alinha a letra focal da palavra, atingindo até 800 PPM sem esforço.',
      icon: Trophy,
      color: 'from-cyan-600/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30',
      tag: 'Sem Saltos Oculares',
      duration: '3-5 min'
    },
    {
      type: 'chunking' as ExerciseType,
      title: 'Leitura em Blocos (Chunking)',
      category: 'Sintagmas',
      description: 'Treina o cérebro para agrupar 2 a 4 palavras por fixação em colunas estreitas.',
      icon: Layers,
      color: 'from-emerald-600/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
      tag: 'Fixação Ampla',
      duration: '3-4 min'
    },
    {
      type: 'saccadic' as ExerciseType,
      title: 'Saltos Sacádicos Bilaterais',
      category: 'Agilidade Ocular',
      description: 'Exercícios dinâmicos para soltar os músculos que controlam a movimentação dos olhos.',
      icon: MoveHorizontal,
      color: 'from-purple-600/20 to-purple-600/5 text-purple-400 border-purple-500/30',
      tag: 'Alongamento Visual',
      duration: '2 min'
    },
    {
      type: 'assessment' as ExerciseType,
      title: 'Teste com Cronômetro & Quiz',
      category: 'Aferição Real',
      description: 'Mede suas Palavras Por Minuto (PPM) e valida a retenção através de questionário.',
      icon: Award,
      color: 'from-rose-600/20 to-rose-600/5 text-rose-400 border-rose-500/30',
      tag: 'Medição de Progresso',
      duration: '2-3 min'
    }
  ];

  return (
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-slate-100">
      <div>
        <h2 className="text-lg font-black text-white">Catálogo de Exercícios</h2>
        <p className="text-xs text-slate-400">Escolha uma modalidade para praticar individualmente</p>
      </div>

      <div className="space-y-3">
        {exercises.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.type}
              onClick={() => onSelectExercise(item.type)}
              className="w-full text-left bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition-all shadow-md group relative overflow-hidden active:scale-99"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                      <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-mono">
                        {item.duration}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 mt-1">
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
