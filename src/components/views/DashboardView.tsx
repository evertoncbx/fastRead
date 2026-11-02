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
        <div className="bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 rounded-3xl flex items-center justify-between gap-3 shadow-xs">
          <div>
            <h4 className="text-sm font-black text-amber-900 flex items-center gap-1.5">
              <span>⚠️ Teste Diagnóstico Pendente</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 mt-0.5 font-medium">
              Calibre sua velocidade inicial em um teste de 2 min para definir sua meta de +50%.
            </p>
          </div>
          <button
            onClick={onRetest}
            className="py-2.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 shadow-xs transition-all border-b-2 border-amber-800 cursor-pointer"
          >
            Fazer Agora
          </button>
        </div>
      )}

      {/* Card da Meta de +50% de Velocidade */}
      <div className="relative bg-white border-2 border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-800">
              Meta: +50% de Velocidade
            </span>
          </div>

          <button
            onClick={onRetest}
            className="text-xs sm:text-sm text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors border border-emerald-200 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Novo Teste</span>
          </button>
        </div>

        {/* Números da Meta com Tipografia Ampla */}
        <div className="grid grid-cols-3 gap-2 text-center my-3.5 bg-stone-50 p-4 rounded-2xl border-2 border-stone-200">
          <div>
            <span className="text-xs text-stone-500 uppercase tracking-wider block font-bold">Inicial</span>
            <span className="text-2xl sm:text-3xl font-black text-stone-700 font-mono">{user.baselineWpm}</span>
            <span className="text-xs text-stone-500 font-bold block">PPM</span>
          </div>

          <div className="border-x-2 border-stone-200 px-1">
            <span className="text-xs text-emerald-700 uppercase tracking-wider block font-black">Atual</span>
            <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono">{user.currentWpm}</span>
            <span className="text-xs text-emerald-700 font-black block">
              {percentGain >= 0 ? `+${percentGain}%` : `${percentGain}%`}
            </span>
          </div>

          <div>
            <span className="text-xs text-amber-700 uppercase tracking-wider block font-bold">Meta (+50%)</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">{user.targetWpm}</span>
            <span className="text-xs text-stone-500 font-bold block">PPM</span>
          </div>
        </div>

        {/* Barra de Progresso em direção à meta */}
        <div className="space-y-2 mt-3.5">
          <div className="flex justify-between text-xs sm:text-sm font-semibold">
            <span className="text-stone-600">Progresso até o objetivo:</span>
            <span className="text-emerald-700 font-mono font-black">{progressToTarget}%</span>
          </div>
          <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden border border-stone-200">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToTarget}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card da Jornada Diária de 15 a 20 Minutos */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">Treino Diário (15-20 min)</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                {dailyProgress.allDone
                  ? 'Parabéns! Jornada de hoje completada.'
                  : `${stepsCompleted} de 5 etapas concluídas hoje.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-amber-800 font-mono text-xs sm:text-sm font-black bg-amber-50 px-3 py-1.5 rounded-xl border-2 border-amber-200">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{user.streakDays} dias</span>
          </div>
        </div>

        {/* Mini steps preview */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((step) => {
            const isDone = dailyProgress.completedSteps.includes(step);
            return (
              <div
                key={step}
                className={`py-2 px-1 rounded-xl text-center border-2 text-xs font-mono transition-all ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-400 font-medium'
                }`}
              >
                {isDone ? '✓ ' + step : 'P' + step}
              </div>
            );
          })}
        </div>

        <button
          onClick={onStartDailyWorkout}
          className={`w-full py-4 px-5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md border-b-4 transition-all active:scale-98 cursor-pointer ${
            dailyProgress.allDone
              ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-800'
          }`}
        >
          {dailyProgress.allDone ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Ver Detalhes da Jornada Concluída</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>{stepsCompleted > 0 ? 'Continuar Treino Diário' : 'Iniciar Treino de Hoje (15-20 min)'}</span>
            </>
          )}
        </button>
      </div>

      {/* Acesso Rápido aos Exercícios Individuais */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600">Treino Livre por Método</h3>
          <button
            onClick={() => onNavigate('exercises')}
            className="text-xs sm:text-sm text-emerald-800 hover:text-emerald-950 font-bold cursor-pointer"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Schulte */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-4 rounded-3xl bg-white border-2 border-stone-200 hover:border-emerald-500 text-left transition-all shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700 mb-2.5 group-hover:scale-105 transition-transform">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Tabela Schulte</h4>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Visão periférica (3x3 a 5x5)</p>
          </button>

          {/* Metrônomo */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-4 rounded-3xl bg-white border-2 border-stone-200 hover:border-emerald-500 text-left transition-all shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 mb-2.5 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Metrônomo Rítmico</h4>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Anti-subvocalização</p>
          </button>

          {/* RSVP */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-4 rounded-3xl bg-white border-2 border-stone-200 hover:border-emerald-500 text-left transition-all shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-700 mb-2.5 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Leitor RSVP (ORP)</h4>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Ponto focal 300-800 PPM</p>
          </button>

          {/* Chunking */}
          <button
            onClick={() => onNavigate('exercises')}
            className="p-4 rounded-3xl bg-white border-2 border-stone-200 hover:border-emerald-500 text-left transition-all shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-teal-700 mb-2.5 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Leitura em Blocos</h4>
            <p className="text-xs text-stone-500 font-medium mt-0.5">Sintagmas e fixação</p>
          </button>
        </div>
      </div>

      {/* Destaque da Biblioteca de Textos */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">Biblioteca Nacional PT-BR</h4>
            <p className="text-xs text-stone-500 font-medium">Machado de Assis, Lima Barreto, Alencar...</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('library')}
          className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          Explorar
        </button>
      </div>
    </div>
  );
};
