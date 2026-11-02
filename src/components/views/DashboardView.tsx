import React from 'react';
import { Play, Flame, Target, Trophy, Clock, Zap, Layers, Eye, BookOpen, CheckCircle2, Shuffle } from 'lucide-react';
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
    <div className="space-y-4 p-4 pb-24 max-w-lg mx-auto text-stone-800">
      {/* Banner de Teste Diagnóstico Pendente */}
      {(!user.initialTestCompleted || user.baselineWpm === 0) && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
          <div>
            <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <span>⚠️ Teste Diagnóstico Pendente</span>
            </h4>
            <p className="text-[11px] text-amber-700 mt-0.5">
              Calibre sua velocidade inicial em um teste de 2 min para definir sua meta de +50%.
            </p>
          </div>
          <button
            onClick={onRetest}
            className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs whitespace-nowrap shrink-0 shadow-xs transition-all"
          >
            Fazer Agora
          </button>
        </div>
      )}

      {/* Card da Meta de +50% de Velocidade */}
      <div className="relative bg-white border border-stone-200 rounded-3xl p-5 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Meta Principal: Ganho de +50%
            </span>
          </div>

          <button
            onClick={onRetest}
            className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-lg transition-colors border border-emerald-200"
          >
            <Shuffle className="w-3 h-3" />
            <span>Novo Teste</span>
          </button>
        </div>

        {/* Números da Meta */}
        <div className="grid grid-cols-3 gap-2 text-center my-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
          <div>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Inicial</span>
            <span className="text-xl font-black text-stone-700 font-mono">{user.baselineWpm}</span>
            <span className="text-[9px] text-stone-500 block">PPM</span>
          </div>

          <div className="border-x border-stone-200 px-1">
            <span className="text-[10px] text-emerald-700 uppercase tracking-wider block font-bold">Atual</span>
            <span className="text-2xl font-black text-stone-900 font-mono">{user.currentWpm}</span>
            <span className="text-[9px] text-emerald-700 font-bold block">
              {percentGain >= 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-amber-700 uppercase tracking-wider block font-semibold">Meta (+50%)</span>
            <span className="text-xl font-black text-amber-700 font-mono">{user.targetWpm}</span>
            <span className="text-[9px] text-stone-500 block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso em direção à meta */}
        <div className="space-y-1.5 mt-3">
          <div className="flex justify-between text-[11px]">
            <span className="text-stone-500 font-medium">Progresso até o objetivo:</span>
            <span className="text-emerald-700 font-mono font-bold">{progressToTarget}%</span>
          </div>
          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToTarget}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card da Jornada Diária de 15 a 20 Minutos */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Treino Diário (15 a 20 min)</h3>
              <p className="text-[11px] text-stone-500">
                {dailyProgress.allDone
                  ? 'Parabéns! Jornada de hoje completada.'
                  : `${stepsCompleted} de 5 etapas concluídas hoje.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-700 font-mono text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
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
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-400'
                }`}
              >
                {isDone ? '✓ Passo ' + step : 'Passo ' + step}
              </div>
            );
          })}
        </div>

        <button
          onClick={onStartDailyWorkout}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all ${
            dailyProgress.allDone
              ? 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'
          }`}
        >
          {dailyProgress.allDone ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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
          <h3 className="text-xs uppercase tracking-wider font-bold text-stone-500">Treino Livre por Método</h3>
          <button
            onClick={() => onNavigate('exercises')}
            className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Schulte */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 text-left transition-all shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-2 group-hover:scale-105 transition-transform">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Tabela de Schulte</h4>
            <p className="text-[10px] text-stone-500 mt-0.5">Visão periférica (3x3 a 5x5)</p>
          </button>

          {/* Metrônomo */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 text-left transition-all shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-2 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Metrônomo Rítmico</h4>
            <p className="text-[10px] text-stone-500 mt-0.5">Anti-subvocalização</p>
          </button>

          {/* RSVP */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 text-left transition-all shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-2 group-hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Leitor RSVP (ORP)</h4>
            <p className="text-[10px] text-stone-500 mt-0.5">Ponto focal 300-800 PPM</p>
          </button>

          {/* Chunking */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 text-left transition-all shadow-xs group"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mb-2 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Leitura em Blocos</h4>
            <p className="text-[10px] text-stone-500 mt-0.5">Sintagmas e fixação rápida</p>
          </button>
        </div>
      </div>

      {/* Destaque da Biblioteca de Textos */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">Biblioteca Nacional PT-BR</h4>
            <p className="text-[10px] text-stone-500">Machado de Assis, Lima Barreto, Alencar...</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('library')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 py-1.5 px-3 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
        >
          Explorar
        </button>
      </div>
    </div>
  );
};
