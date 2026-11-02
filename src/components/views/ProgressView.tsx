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
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-stone-800">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-stone-900 tracking-tight">Evolução & Métricas</h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">Acompanhamento contínuo rumo à meta de +50%</p>
      </div>

      {/* Card da Meta de +50% */}
      <div className="bg-white border-2 border-stone-200 p-5 sm:p-6 rounded-3xl shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border-2 border-emerald-200 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-800">
              Desafio +50% de Velocidade
            </span>
          </div>

          <span className={`text-xs sm:text-sm font-mono font-black px-3 py-1 rounded-full ${
            percentGain >= 50
              ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
              : 'bg-amber-100 text-amber-900 border-2 border-amber-300'
          }`}>
            {percentGain >= 50 ? 'META CONQUISTADA! 🎉' : `${percentGain}% de ganho`}
          </span>
        </div>

        {/* Comparativo de Velocidades */}
        <div className="grid grid-cols-3 gap-2 text-center my-4 bg-stone-50 p-4 rounded-2xl border-2 border-stone-200">
          <div>
            <span className="text-xs text-stone-500 uppercase tracking-wider block font-bold">Inicial</span>
            <span className="text-2xl sm:text-3xl font-black text-stone-700 font-mono">{user.baselineWpm}</span>
            <span className="text-xs text-stone-500 font-bold block">PPM</span>
          </div>

          <div className="border-x-2 border-stone-200 px-1">
            <span className="text-xs text-emerald-700 uppercase tracking-wider block font-black">Atual</span>
            <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">{user.currentWpm}</span>
            <span className="text-xs text-emerald-700 font-black block">
              {percentGain > 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-xs text-amber-700 uppercase tracking-wider block font-bold">Meta (+50%)</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">{user.targetWpm}</span>
            <span className="text-xs text-stone-500 font-bold block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm font-semibold">
            <span className="text-stone-600">Progresso rumo aos {user.targetWpm} PPM:</span>
            <span className="text-emerald-700 font-mono font-black">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden border border-stone-200">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onRetest}
          className="w-full mt-4 py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md border-b-4 border-emerald-800 transition-all cursor-pointer"
        >
          <Shuffle className="w-5 h-5" />
          <span>Realizar Novo Teste de Aferição (+50%)</span>
        </button>
      </div>

      {/* Grid de Estatísticas Gerais */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border-2 border-stone-200 p-4 sm:p-5 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 text-purple-700 mb-2">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Retenção Média</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">{user.averageComprehension}%</span>
          <span className="text-xs text-stone-500 block font-medium mt-1">Compreensão de leitura</span>
        </div>

        <div className="bg-white border-2 border-stone-200 p-4 sm:p-5 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Sequência</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">{user.streakDays} dias</span>
          <span className="text-xs text-stone-500 block font-medium mt-1">Treinos consecutivos</span>
        </div>

        <div className="bg-white border-2 border-stone-200 p-4 sm:p-5 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Tempo Total</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">{user.totalMinutesTrained} min</span>
          <span className="text-xs text-stone-500 block font-medium mt-1">Dedicados à técnica</span>
        </div>

        <div className="bg-white border-2 border-stone-200 p-4 sm:p-5 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Melhor Marca</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">{user.bestWpm} PPM</span>
          <span className="text-xs text-stone-500 block font-medium mt-1">Recorde alcançado</span>
        </div>
      </div>

      {/* Histórico Recente de Exercícios */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-black text-stone-900 mb-3.5">Histórico de Sessões</h3>

        {results.length === 0 ? (
          <p className="text-xs sm:text-sm text-stone-400 text-center py-4 font-medium">Nenhum treino registrado ainda.</p>
        ) : (
          <div className="space-y-2.5">
            {results.slice(0, 8).map((res) => (
              <div
                key={res.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs sm:text-sm"
              >
                <div>
                  <strong className="text-stone-900 block font-bold">{res.title}</strong>
                  <span className="text-xs text-stone-500 font-mono">
                    {new Date(res.date).toLocaleDateString('pt-BR')} às {new Date(res.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-right">
                  {res.wpm ? (
                    <span className="text-sm sm:text-base font-black text-emerald-700 font-mono block">
                      {res.wpm} PPM
                    </span>
                  ) : res.score ? (
                    <span className="text-sm sm:text-base font-black text-stone-700 font-mono block">
                      {res.score}s
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 block">Concluído</span>
                  )}
                  {res.comprehensionScore !== undefined && (
                    <span className="text-xs text-stone-500 font-semibold">
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
