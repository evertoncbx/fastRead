import React from 'react';
import { Target, Award, Clock, Flame, Brain, TrendingUp, CheckCircle2, RotateCcw } from 'lucide-react';
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
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-slate-100">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-white">Evolução & Métricas</h2>
        <p className="text-xs text-slate-400">Acompanhamento contínuo rumo à meta de +50%</p>
      </div>

      {/* Card da Meta de +50% */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Desafio +50% de Velocidade
            </span>
          </div>

          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
            percentGain >= 50
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-indigo-500/20 text-indigo-300'
          }`}>
            {percentGain >= 50 ? 'META CONQUISTADA! 🎉' : `${percentGain}% de ganho`}
          </span>
        </div>

        {/* Comparativo de Velocidades */}
        <div className="grid grid-cols-3 gap-2 text-center my-4 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Inicial</span>
            <span className="text-2xl font-black text-slate-300 font-mono">{user.baselineWpm}</span>
            <span className="text-[9px] text-slate-500 block">PPM</span>
          </div>

          <div className="border-x border-slate-800">
            <span className="text-[10px] text-indigo-400 uppercase tracking-wider block font-semibold">Atual</span>
            <span className="text-2xl font-black text-white font-mono">{user.currentWpm}</span>
            <span className="text-[9px] text-indigo-400 font-bold block">
              {percentGain > 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-medium">Meta (+50%)</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{user.targetWpm}</span>
            <span className="text-[9px] text-slate-500 block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400">Progresso rumo aos {user.targetWpm} PPM:</span>
            <span className="text-indigo-300 font-mono font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onRetest}
          className="w-full mt-4 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Realizar Novo Teste de Aferição (+50%)</span>
        </button>
      </div>

      {/* Grid de Estatísticas Gerais */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Brain className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Retenção Média</span>
          </div>
          <span className="text-2xl font-black text-white font-mono">{user.averageComprehension}%</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Compreensão de leitura</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Flame className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sequência</span>
          </div>
          <span className="text-2xl font-black text-white font-mono">{user.streakDays} dias</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Treinos consecutivos</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tempo Total</span>
          </div>
          <span className="text-2xl font-black text-white font-mono">{user.totalMinutesTrained} min</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Dedicados à técnica</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Melhor Marca</span>
          </div>
          <span className="text-2xl font-black text-white font-mono">{user.bestWpm} PPM</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Recorde alcançado</span>
        </div>
      </div>

      {/* Histórico Recente de Exercícios */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-3">Histórico de Sessões</h3>

        {results.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">Nenhum treino registrado ainda.</p>
        ) : (
          <div className="space-y-2.5">
            {results.slice(0, 8).map((res) => (
              <div
                key={res.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-white block">{res.title}</strong>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(res.date).toLocaleDateString('pt-BR')} às {new Date(res.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-right">
                  {res.wpm ? (
                    <span className="text-sm font-bold text-indigo-400 font-mono block">
                      {res.wpm} PPM
                    </span>
                  ) : res.score ? (
                    <span className="text-sm font-bold text-amber-400 font-mono block">
                      {res.score}s
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-emerald-400 block">Concluído</span>
                  )}
                  {res.comprehensionScore !== undefined && (
                    <span className="text-[10px] text-slate-400">
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
