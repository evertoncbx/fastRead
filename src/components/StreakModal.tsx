import React from 'react';
import { Flame, X, Calendar, Check, AlertCircle, Sparkles, Trophy } from 'lucide-react';
import { UserProfile } from '../types';
import { storage } from '../services/storageService';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onStartTraining?: () => void;
  onStreakUpdated?: (updatedUser: UserProfile) => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  user,
  onStartTraining,
  onStreakUpdated
}) => {
  if (!isOpen || !user) return null;

  const streak = user.streakDays;
  const isLit = streak > 0;
  const weeklyHistory = storage.getStreakWeeklyHistory(user);

  // Reconciliação manual se o usuário quiser garantir a verificação do 3º dia
  const handleReconcileStreak = () => {
    const updated = storage.recordDailyAccess(user);
    if (updated && onStreakUpdated) {
      onStreakUpdated(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-3xl border-2 border-stone-200 border-b-4 border-b-stone-300 p-5 sm:p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        {/* Topo / Fechar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-stone-400 stroke-[2.5]" />
            <span className="text-xs font-black uppercase tracking-wider text-stone-400">
              Ofensiva Diária
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Destaque Central da Chama */}
        <div className="text-center space-y-3">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl border-4 flex items-center justify-center shadow-md relative transition-transform duration-300 ${
              isLit
                ? 'bg-[#FFF8D9] border-[#FFE680] border-b-6 border-b-[#E5A500]'
                : 'bg-stone-100 border-stone-200 border-b-6 border-b-stone-300'
            }`}
          >
            {isLit ? (
              <>
                <Flame className="w-12 h-12 sm:w-14 sm:h-14 fill-[#FF9600] text-[#FF9600] drop-shadow-md animate-pulse" />
                <span className="absolute -top-2 -right-2 bg-[#FFC800] text-[#7A5000] border-2 border-white rounded-full p-1 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </>
            ) : (
              <Flame className="w-12 h-12 sm:w-14 sm:h-14 text-stone-400 fill-stone-200 stroke-[2]" />
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#131F24] tracking-tight">
              {isLit ? `${streak} ${streak === 1 ? 'Dia' : 'Dias'} de Sequência!` : 'Chama Apagada'}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-stone-500 mt-1 leading-relaxed">
              {isLit
                ? 'Você está mantendo sua ofensiva acesa! Acesse e treine todos os dias para não perder o ritmo.'
                : 'Você faltou ontem ou ainda não conectou sua sequência. Conecte-se e pratique hoje para reacender o foguinho!'}
            </p>
          </div>
        </div>

        {/* Mini Calendário dos Últimos 7 Dias (Estilo Duolingo) */}
        <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-3.5 space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 block text-center">
            Últimos 7 Dias
          </span>

          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-1">
            {weeklyHistory.map((item, idx) => {
              const active = item.hasActivity;
              const isToday = item.isToday;

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className={`text-[10px] font-extrabold ${isToday ? 'text-[#1CB0F6]' : 'text-stone-400'}`}>
                    {item.dayLabel}
                  </span>

                  <div
                    title={`${item.dayLabel} (${item.date}): ${active ? 'Atividade Concluída' : 'Sem Treino'}`}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                      active
                        ? 'bg-[#58CC02] text-white shadow-xs border-2 border-[#46A302]'
                        : isToday
                        ? 'bg-white border-2 border-dashed border-[#1CB0F6] text-[#1CB0F6]'
                        : 'bg-stone-200/70 border-2 border-transparent text-stone-400'
                    }`}
                  >
                    {active ? (
                      <Flame className="w-4 h-4 fill-white text-white" />
                    ) : isToday ? (
                      <span className="font-black text-[11px]">{item.dayOfMonth}</span>
                    ) : (
                      <span className="text-[11px] font-bold text-stone-400">{item.dayOfMonth}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Como Funciona a Ofensiva */}
        <div className="bg-[#FFF8D9]/70 border-2 border-[#FFE680] rounded-2xl p-3 text-xs text-[#7A5000] space-y-1">
          <div className="flex items-center gap-1.5 font-black text-xs text-[#B8860B]">
            <Trophy className="w-4 h-4 shrink-0 text-[#FF9600]" />
            <span>Como funciona a sequência:</span>
          </div>
          <p className="leading-snug">
            • <strong>+1 dia</strong> a cada dia consecutivo que você conecta e treina.
          </p>
          <p className="leading-snug">
            • <strong>Faltou 1 dia:</strong> a sequência zera e o foguinho apaga até o seu retorno!
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-2 pt-1">
          {onStartTraining && (
            <button
              onClick={() => {
                onStartTraining();
                onClose();
              }}
              className="w-full btn-duo-green py-3 text-base font-black flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>{isLit ? 'Continuar Treinando Hoje' : 'Acender Foguinho Agora'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full btn-duo-white py-2.5 text-sm font-black text-stone-500 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
