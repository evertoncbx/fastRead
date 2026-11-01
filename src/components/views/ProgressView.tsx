import React from 'react';
import { Target, Award, Clock, Flame, Brain, TrendingUp, CheckCircle2, RotateCcw, Shuffle } from 'lucide-react';
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
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-[#f3efe8]">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-[#faf8f5]">Evolução & Métricas</h2>
        <p className="text-xs text-[#a39b8e]">Acompanhamento contínuo rumo à meta de +50%</p>
      </div>

      {/* Card da Meta de +50% */}
      <div className="bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] border border-[#3d3834] p-5 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Desafio +50% de Velocidade
            </span>
          </div>

          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
            percentGain >= 50
              ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-600/40'
              : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
          }`}>
            {percentGain >= 50 ? 'META CONQUISTADA! 🎉' : `${percentGain}% de ganho`}
          </span>
        </div>

        {/* Comparativo de Velocidades */}
        <div className="grid grid-cols-3 gap-2 text-center my-4 bg-[#131211]/80 p-3 rounded-2xl border border-[#2c2724]">
          <div>
            <span className="text-[10px] text-[#a39b8e] uppercase tracking-wider block font-medium">Inicial</span>
            <span className="text-2xl font-black text-[#d8d0c2] font-mono">{user.baselineWpm}</span>
            <span className="text-[9px] text-[#766f63] block">PPM</span>
          </div>

          <div className="border-x border-[#2c2724]">
            <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-semibold">Atual</span>
            <span className="text-2xl font-black text-[#faf8f5] font-mono">{user.currentWpm}</span>
            <span className="text-[9px] text-amber-400 font-bold block">
              {percentGain > 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-amber-300 uppercase tracking-wider block font-medium">Meta (+50%)</span>
            <span className="text-2xl font-black text-amber-300 font-mono">{user.targetWpm}</span>
            <span className="text-[9px] text-[#766f63] block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-[#a39b8e]">Progresso rumo aos {user.targetWpm} PPM:</span>
            <span className="text-amber-300 font-mono font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#131211] h-2.5 rounded-full overflow-hidden border border-[#2c2724]">
            <div
              className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onRetest}
          className="w-full mt-4 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Shuffle className="w-4 h-4" />
          <span>Realizar Novo Teste de Aferição (+50%)</span>
        </button>
      </div>

      {/* Grid de Estatísticas Gerais */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1c1917] border border-[#2c2724] p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Brain className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a39b8e]">Retenção Média</span>
          </div>
          <span className="text-2xl font-black text-[#faf8f5] font-mono">{user.averageComprehension}%</span>
          <span className="text-[10px] text-[#766f63] block mt-0.5">Compreensão de leitura</span>
        </div>

        <div className="bg-[#1c1917] border border-[#2c2724] p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Flame className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a39b8e]">Sequência</span>
          </div>
          <span className="text-2xl font-black text-[#faf8f5] font-mono">{user.streakDays} dias</span>
          <span className="text-[10px] text-[#766f63] block mt-0.5">Treinos consecutivos</span>
        </div>

        <div className="bg-[#1c1917] border border-[#2c2724] p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a39b8e]">Tempo Total</span>
          </div>
          <span className="text-2xl font-black text-[#faf8f5] font-mono">{user.totalMinutesTrained} min</span>
          <span className="text-[10px] text-[#766f63] block mt-0.5">Dedicados à técnica</span>
        </div>

        <div className="bg-[#1c1917] border border-[#2c2724] p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-amber-300 mb-2">
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a39b8e]">Melhor Marca</span>
          </div>
          <span className="text-2xl font-black text-[#faf8f5] font-mono">{user.bestWpm} PPM</span>
          <span className="text-[10px] text-[#766f63] block mt-0.5">Recorde alcançado</span>
        </div>
      </div>

      {/* Histórico Recente de Exercícios */}
      <div className="bg-[#1c1917] border border-[#2c2724] rounded-3xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-[#faf8f5] mb-3">Histórico de Sessões</h3>

        {results.length === 0 ? (
          <p className="text-xs text-[#766f63] text-center py-4">Nenhum treino registrado ainda.</p>
        ) : (
          <div className="space-y-2.5">
            {results.slice(0, 8).map((res) => (
              <div
                key={res.id}
                className="p-3 rounded-xl bg-[#131211]/80 border border-[#2c2724] flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-[#faf8f5] block">{res.title}</strong>
                  <span className="text-[10px] text-[#766f63] font-mono">
                    {new Date(res.date).toLocaleDateString('pt-BR')} às {new Date(res.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-right">
                  {res.wpm ? (
                    <span className="text-sm font-bold text-amber-400 font-mono block">
                      {res.wpm} PPM
                    </span>
                  ) : res.score ? (
                    <span className="text-sm font-bold text-amber-300 font-mono block">
                      {res.score}s
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-emerald-400 block">Concluído</span>
                  )}
                  {res.comprehensionScore !== undefined && (
                    <span className="text-[10px] text-[#a39b8e]">
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
