import React, { useState } from 'react';
import { Flame, BookOpen, HelpCircle, Cloud, Check, X, Smartphone, RefreshCw, LogOut, Zap } from 'lucide-react';
import { UserProfile } from '../types';
import { storage } from '../services/storageService';

interface HeaderProps {
  user: UserProfile | null;
  onOpenGuide: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenGuide, onLogout }) => {
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  const handleForceSync = async () => {
    if (!user) return;
    setIsSyncing(true);
    setSyncStatus('Sincronizando...');
    const ok = await storage.syncToRemote(user, storage.getResults(), storage.getDailyProgress());
    setIsSyncing(false);
    if (ok) {
      setSyncStatus('Sincronizado com sucesso!');
    } else {
      setSyncStatus('Dados salvos no aparelho.');
    }
    setTimeout(() => setSyncStatus(''), 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b-2 border-stone-200 px-3 sm:px-4 py-2 sm:py-3 overflow-hidden">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-1 sm:gap-2">
          {/* Logo & Marca */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#58CC02] border-b-4 border-[#46A302] flex items-center justify-center text-white shadow-sm shrink-0">
              <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#131F24]">
                  LEITOX
                </h1>
                <span className="text-[10px] sm:text-xs bg-[#FFC800] text-[#7A5000] border-2 border-[#E5A500] px-1.5 sm:px-2 py-0.5 rounded-full font-black">
                  +50%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-extrabold truncate max-w-[85px] sm:max-w-none">
                {user ? `Olá, ${user.name.split(' ')[0]}!` : 'Treino Diário'}
              </p>
            </div>
          </div>

          {/* Indicadores & Ações */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {user && (
              <>
                {/* Contador de Dias / Streak */}
                <div
                  title="Dias Seguidos de Treino"
                  className="flex items-center gap-1 bg-[#FFF8D9] border-2 border-[#FFE680] border-b-4 border-b-[#E5A500] px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl text-[#B8860B] text-xs sm:text-base font-black shrink-0"
                >
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF9600] text-[#FF9600]" />
                  <span>{user.streakDays}</span>
                </div>

                {/* Velocidade Atual */}
                <div
                  title="Sua Velocidade Atual"
                  className="flex items-center gap-1 bg-stone-100 border-2 border-stone-200 border-b-4 border-b-stone-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl text-[#131F24] text-xs sm:text-base font-black shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#58CC02] fill-[#58CC02]" />
                  <span>{user.currentWpm}</span>
                  <span className="text-[10px] sm:text-xs text-stone-400 font-black">PPM</span>
                </div>

                {/* Sincronização */}
                <button
                  onClick={() => setShowSyncModal(true)}
                  aria-label="Sincronizar Dispositivos"
                  title="Sincronizar Dispositivos"
                  className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white border-2 border-stone-200 border-b-4 border-b-stone-300 hover:bg-stone-50 text-stone-600 hover:text-[#1CB0F6] transition-all cursor-pointer active:border-b-2 active:translate-y-[2px] shrink-0"
                >
                  <Cloud className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </>
            )}

            {/* Guia Rápido */}
            <button
              onClick={onOpenGuide}
              aria-label="Como Funciona o Treino"
              title="Como Funciona o Treino"
              className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white border-2 border-stone-200 border-b-4 border-b-stone-300 hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-all cursor-pointer active:border-b-2 active:translate-y-[2px] shrink-0"
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* MODAL DE SINCRONIZAÇÃO */}
      {showSyncModal && user && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b-2 border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#DDF4FF] border-2 border-[#1899D6] flex items-center justify-center text-[#1899D6]">
                  <Cloud className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#131F24]">Sincronização</h3>
                  <p className="text-xs text-stone-500 font-bold">Seus dados em qualquer aparelho</p>
                </div>
              </div>
              <button
                onClick={() => setShowSyncModal(false)}
                className="p-1.5 rounded-xl bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-stone-500 font-black uppercase tracking-wider block">Conta Vinculada</span>
              <p className="text-sm font-black text-[#131F24] truncate">{user.email}</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleForceSync}
                disabled={isSyncing}
                className="w-full py-3.5 px-4 btn-duo-green flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 stroke-[2.5] ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}</span>
              </button>

              {syncStatus && (
                <div className="text-center text-xs font-black text-[#46A302] bg-[#D7FFB8] py-2 px-3 rounded-xl border-2 border-[#A8EE69]">
                  {syncStatus}
                </div>
              )}
            </div>

            {onLogout && (
              <button
                onClick={() => {
                  setShowSyncModal(false);
                  onLogout();
                }}
                className="w-full py-3 px-4 btn-duo-white text-xs flex items-center justify-center gap-2 cursor-pointer text-rose-600 hover:text-rose-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Trocar de Conta</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
