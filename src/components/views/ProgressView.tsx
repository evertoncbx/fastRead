import React from 'react';
import { Target, Award, Clock, Flame, Brain, Shuffle } from 'lucide-react';
import { UserProfile, ExerciseResult } from '../../types';

interface ProgressViewProps {
  user: UserProfile;
  results: ExerciseResult[];
  onRetest: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ user, results, onRetest }) => {
  const percentGain = user.baselineWpm > 0
    ? Math.round(((user.currentWpm - user.baselineWpm) / user.baselineWpm) * 100)
    : 0;

  const targetDiff = user.targetWpm - user.baselineWpm;
  const currentDiff = user.currentWpm - user.baselineWpm;
  const progressPercent = targetDiff > 0 ? Math.min(100, Math.max(0, Math.round((currentDiff / targetDiff) * 100))) : 0;

  return (
    <div className="space-y-4 p-4 pb-28 max-w-lg mx-auto text-[#131F24]">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-[#131F24] tracking-tight">Sua Evolução</h2>
        <p className="text-sm font-bold text-stone-500 mt-0.5">Acompanhe seu avanço rumo à meta de +50%</p>
      </div>

      {/* Card da Meta de +50% */}
      <div className="card-duo p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D7FFB8] border-2 border-[#A8EE69] flex items-center justify-center text-[#46A302]">
              <Target className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-stone-400 block">Desafio</span>
              <h3 className="text-xl font-black text-[#131F24]">+50% de Velocidade</h3>
            </div>
          </div>

          <span className={`text-xs sm:text-sm font-black px-3.5 py-1 rounded-full border-2 ${
            percentGain >= 50
              ? 'bg-[#D7FFB8] text-[#46A302] border-[#A8EE69]'
              : 'bg-[#FFF8D9] text-[#B8860B] border-[#FFE680]'
          }`}>
            {percentGain >= 50 ? 'META BATIDA! 🎉' : `${percentGain}% de ganho`}
          </span>
        </div>

        {/* 3 Colunas de Velocidade */}
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
              {percentGain > 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-xs sm:text-sm text-[#E58500] uppercase tracking-wider block font-black">Meta</span>
            <span className="text-3xl sm:text-4xl font-black text-[#FF9600] font-mono block">{user.targetWpm}</span>
            <span className="text-xs sm:text-sm text-stone-400 font-bold block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm sm:text-base font-black">
            <span className="text-stone-500">Progresso até os {user.targetWpm} PPM:</span>
            <span className="text-[#46A302] font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden border-2 border-stone-200">
            <div
              className="bg-[#58CC02] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onRetest}
          className="w-full py-4.5 px-6 btn-duo-green text-lg font-black flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Shuffle className="w-5 h-5 stroke-[2.5]" />
          <span>Fazer Novo Teste de Velocidade</span>
        </button>
      </div>

      {/* Grid de Estatísticas Gerais em 2x2 com Cores Duolingo */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="card-duo p-5 space-y-1.5">
          <div className="flex items-center gap-2 text-[#A559D9] mb-1">
            <Brain className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs sm:text-sm font-black uppercase text-stone-400">Retenção</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#131F24] font-mono block">{user.averageComprehension}%</span>
          <span className="text-xs sm:text-sm font-bold text-stone-400 block">Compreensão Média</span>
        </div>

        <div className="card-duo p-5 space-y-1.5">
          <div className="flex items-center gap-2 text-[#FF9600] mb-1">
            <Flame className="w-5 h-5 fill-current" />
            <span className="text-xs sm:text-sm font-black uppercase text-stone-400">Sequência</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#131F24] font-mono block">{user.streakDays} dias</span>
          <span className="text-xs sm:text-sm font-bold text-stone-400 block">Dias Consecutivos</span>
        </div>

        <div className="card-duo p-5 space-y-1.5">
          <div className="flex items-center gap-2 text-[#46A302] mb-1">
            <Clock className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs sm:text-sm font-black uppercase text-stone-400">Tempo Total</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#131F24] font-mono block">{user.totalMinutesTrained} min</span>
          <span className="text-xs sm:text-sm font-bold text-stone-400 block">Dedicados ao Treino</span>
        </div>

        <div className="card-duo p-5 space-y-1.5">
          <div className="flex items-center gap-2 text-[#1899D6] mb-1">
            <Award className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs sm:text-sm font-black uppercase text-stone-400">Recorde</span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#131F24] font-mono block">{user.bestWpm} PPM</span>
          <span className="text-xs sm:text-sm font-bold text-stone-400 block">Melhor Velocidade</span>
        </div>
      </div>

      {/* Histórico Recente de Treinos */}
      <div className="card-duo p-5 sm:p-6 space-y-3">
        <h3 className="text-lg font-black text-[#131F24]">Histórico Recente</h3>

        {results.length === 0 ? (
          <p className="text-sm font-bold text-stone-400 text-center py-4">Nenhum treino registrado ainda.</p>
        ) : (
          <div className="space-y-2">
            {results.slice(0, 8).map((res) => (
              <div
                key={res.id}
                className="p-3.5 rounded-2xl bg-stone-50 border-2 border-stone-200 flex items-center justify-between text-sm"
              >
                <div className="min-w-0 pr-2">
                  <strong className="text-[#131F24] block font-black truncate">{res.title}</strong>
                  <span className="text-xs text-stone-400 font-bold font-mono">
                    {new Date(res.date).toLocaleDateString('pt-BR')} às {new Date(res.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  {res.wpm ? (
                    <span className="text-base font-black text-[#46A302] font-mono block">
                      {res.wpm} PPM
                    </span>
                  ) : res.score ? (
                    <span className="text-base font-black text-stone-700 font-mono block">
                      {res.score}s
                    </span>
                  ) : (
                    <span className="text-sm font-black text-[#46A302] block">Concluído</span>
                  )}
                  {res.comprehensionScore !== undefined && (
                    <span className="text-xs text-stone-400 font-bold block">
                      {res.comprehensionScore}% retenção
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
