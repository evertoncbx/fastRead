import React from 'react';
import { Play, Flame, Target, Trophy, Clock, Zap, Layers, Eye, BookOpen, ArrowRight, CheckCircle2, Shuffle } from 'lucide-react';
import { UserProfile, DailyProgress } from '../../types';
import { NavTab } from '../BottomNav';

interface DashboardViewProps {
  user: UserProfile;
  dailyProgress: DailyProgress;
  onNavigate: (tab: NavTab) => void;
  onStartDailyWorkout: () => void;
  onRetest: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  dailyProgress,
  onNavigate,
  onStartDailyWorkout,
  onRetest
}) => {
  const percentGain = user.baselineWpm > 0 ? Math.round(((user.currentWpm - user.baselineWpm) / user.baselineWpm) * 100) : 0;
  const progressToTarget = user.baselineWpm > 0 && user.targetWpm > user.baselineWpm
    ? Math.min(100, Math.max(0, Math.round(((user.currentWpm - user.baselineWpm) / (user.targetWpm - user.baselineWpm)) * 100)))
    : 0;

  const stepsCompleted = dailyProgress.completedSteps.length;

  return (
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-[#f3efe8]">
      {/* Banner de Teste Diagnóstico Pendente */}
      {(!user.initialTestCompleted || user.baselineWpm === 0) && (
        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 border border-amber-600/40 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md">
          <div>
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>⚠️ Teste Diagnóstico Pendente</span>
            </h4>
            <p className="text-[11px] text-[#d8d0c2] mt-0.5">
              Calibre sua velocidade inicial em um teste de 2 min para definir sua meta de +50%.
            </p>
          </div>
          <button
            onClick={onRetest}
            className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs whitespace-nowrap shrink-0 shadow-sm transition-all"
          >
            Fazer Agora
          </button>
        </div>
      )}

      {/* Card da Meta de +50% de Velocidade */}
      <div className="relative bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] border border-[#3d3834] rounded-3xl p-5 shadow-xl overflow-hidden">
        {/* Glow âmbar sutil */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-600/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Meta Principal: Ganho de +50%
            </span>
          </div>

          <button
            onClick={onRetest}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-lg transition-colors border border-amber-500/20"
          >
            <Shuffle className="w-3 h-3" />
            <span>Novo Teste</span>
          </button>
        </div>

        {/* Números da Meta */}
        <div className="grid grid-cols-3 gap-2 text-center my-3 bg-[#131211]/80 p-3 rounded-2xl border border-[#2c2724]">
          <div>
            <span className="text-[10px] text-[#a39b8e] uppercase tracking-wider block font-medium">Inicial</span>
            <span className="text-xl font-black text-[#d8d0c2] font-mono">{user.baselineWpm}</span>
            <span className="text-[9px] text-[#766f63] block">PPM</span>
          </div>

          <div className="border-x border-[#2c2724] px-1">
            <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-semibold">Atual</span>
            <span className="text-2xl font-black text-[#faf8f5] font-mono">{user.currentWpm}</span>
            <span className="text-[9px] text-amber-400 font-bold block">
              {percentGain >= 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-amber-300 uppercase tracking-wider block font-medium">Meta (+50%)</span>
            <span className="text-xl font-black text-amber-300 font-mono">{user.targetWpm}</span>
            <span className="text-[9px] text-[#766f63] block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso em direção à meta */}
        <div className="space-y-1 mt-3">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#a39b8e] font-medium">Progresso até o objetivo:</span>
            <span className="text-amber-400 font-mono font-bold">{progressToTarget}%</span>
          </div>
          <div className="w-full bg-[#131211] h-2.5 rounded-full overflow-hidden border border-[#2c2724]">
            <div
              className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToTarget}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card da Jornada Diária de 15 a 20 Minutos */}
      <div className="bg-[#1c1917] border border-[#2c2724] rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#faf8f5]">Treino Diário (15 a 20 min)</h3>
              <p className="text-[11px] text-[#a39b8e]">
                {dailyProgress.allDone
                  ? 'Parabéns! Jornada de hoje completada.'
                  : `${stepsCompleted} de 5 etapas concluídas hoje.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{user.streakDays} dias</span>
          </div>
        </div>

        {/* Mini steps preview */}
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {[1, 2, 3, 4, 5].map((step) => {
            const isDone = dailyProgress.completedSteps.includes(step);
            return (
              <div
                key={step}
                className={`py-1.5 px-1 rounded-lg text-center border text-[10px] font-mono transition-all ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300 font-bold'
                    : 'bg-[#131211]/60 border-[#2c2724] text-[#766f63]'
                }`}
              >
                {isDone ? '✓ Passo ' + step : 'Passo ' + step}
              </div>
            );
          })}
        </div>

        <button
          onClick={onStartDailyWorkout}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
            dailyProgress.allDone
              ? 'bg-[#2c2724] hover:bg-[#36322e] text-[#d8d0c2]'
              : 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-black'
          }`}
        >
          {dailyProgress.allDone ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ver Detalhes da Jornada Concluída</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{stepsCompleted > 0 ? 'Continuar Treino Diário' : 'Iniciar Treino de Hoje (15-20 min)'}</span>
            </>
          )}
        </button>
      </div>

      {/* Acesso Rápido aos Exercícios Individuais */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs uppercase tracking-wider font-bold text-[#a39b8e]">Treino Livre por Método</h3>
          <button
            onClick={() => onNavigate('exercises')}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Schulte */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-[#1c1917] border border-[#2c2724] hover:border-amber-600/50 text-left transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-105 transition-transform">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#faf8f5]">Tabela de Schulte</h4>
            <p className="text-[10px] text-[#a39b8e] mt-0.5">Visão periférica (3x3 a 5x5)</p>
          </button>

          {/* Metrônomo */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-[#1c1917] border border-[#2c2724] hover:border-amber-600/50 text-left transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#faf8f5]">Metrônomo Rítmico</h4>
            <p className="text-[10px] text-[#a39b8e] mt-0.5">Anti-subvocalização</p>
          </button>

          {/* RSVP */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-[#1c1917] border border-[#2c2724] hover:border-amber-600/50 text-left transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 mb-2 group-hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#faf8f5]">Leitor RSVP (ORP)</h4>
            <p className="text-[10px] text-[#a39b8e] mt-0.5">Ponto focal 300-800 PPM</p>
          </button>

          {/* Chunking */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-[#1c1917] border border-[#2c2724] hover:border-amber-600/50 text-left transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#faf8f5]">Leitura em Blocos</h4>
            <p className="text-[10px] text-[#a39b8e] mt-0.5">Sintagmas e fixação rápida</p>
          </button>
        </div>
      </div>

      {/* Destaque da Biblioteca de Textos */}
      <div className="bg-[#1c1917] border border-[#2c2724] rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#24211e] flex items-center justify-center text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#faf8f5]">Biblioteca Nacional PT-BR</h4>
            <p className="text-[10px] text-[#a39b8e]">Machado de Assis, Lima Barreto, Alencar...</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('library')}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 py-1.5 px-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
        >
          Explorar
        </button>
      </div>
    </div>
  );
};
