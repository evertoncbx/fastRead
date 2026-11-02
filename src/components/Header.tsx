import React, { useState } from 'react';
import { Flame, BookOpen, HelpCircle, Cloud, Check, X, Smartphone, RefreshCw, LogOut } from 'lucide-react';
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
    setSyncStatus('Sincronizando com a nuvem...');
    const ok = await storage.syncToRemote(user, storage.getResults(), storage.getDailyProgress());
    setIsSyncing(false);
    if (ok) {
      setSyncStatus('Sincronizado com o Supabase com sucesso!');
    } else {
      setSyncStatus('Dados salvos localmente.');
    }
    setTimeout(() => setSyncStatus(''), 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-stone-200 shadow-xs px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 border-b-2 border-emerald-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-stone-900 flex items-center gap-1.5">
                LEITOX
                <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-mono font-black">
                  +50%
                </span>
              </h1>
              <p className="text-xs text-stone-600 font-semibold">
                {user ? `Olá, ${user.name.split(' ')[0]}` : 'Leitura Dinâmica'}
              </p>
            </div>
          </div>

          {/* Right Stats & Action Buttons */}
          <div className="flex items-center gap-2">
            {user && (
              <>
                {/* Streak Counter */}
                <div
                  title="Dias Seguidos de Treino"
                  className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-200 px-3 py-1.5 rounded-xl text-amber-800 text-xs font-mono font-black"
                >
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{user.streakDays}d</span>
                </div>

                {/* Current Speed Badge */}
                <div
                  title="PPM Atual"
                  className="flex items-center gap-1 bg-stone-100 border-2 border-stone-200 px-3 py-1.5 rounded-xl text-stone-900 text-xs font-mono font-black"
                >
                  <span>{user.currentWpm}</span>
                  <span className="text-[11px] text-stone-500 font-bold">PPM</span>
                </div>

                {/* Cloud Sync Button */}
                <button
                  onClick={() => setShowSyncModal(true)}
                  title="Sincronização na Nuvem"
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 border-2 border-stone-200 text-stone-700 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <Cloud className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Guide Button */}
            <button
              onClick={onOpenGuide}
              title="Guia Científico e Métodos"
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 border-2 border-stone-200 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MODAL DE SINCRONIZAÇÃO NUVEM AMARRADO AO E-MAIL */}
      {showSyncModal && user && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 text-stone-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">Sincronização & Celular</h3>
                  <p className="text-xs text-stone-500 font-medium">Conectado ao Supabase (fr_*)</p>
                </div>
              </div>

              <button
                onClick={() => setShowSyncModal(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-stone-600">
                <span className="font-semibold">E-mail vinculado:</span>
                <strong className="text-stone-900 font-mono font-bold">{user.email}</strong>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span className="font-semibold">Meta de leitura:</span>
                <strong className="text-emerald-700 font-mono font-bold">{user.targetWpm} PPM (+50%)</strong>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span className="font-semibold">Status do Banco:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Supabase Ativo
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleForceSync}
                disabled={isSyncing}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm border-b-4 border-emerald-800 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSyncing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Cloud className="w-4 h-4" />
                )}
                <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Agora na Nuvem'}</span>
              </button>
            </div>

            {syncStatus && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 text-center font-bold flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{syncStatus}</span>
              </div>
            )}

            <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 leading-relaxed text-center font-medium">
              💡 Para acessar seu treino no celular ou em outro computador, basta abrir o Leitox e digitar seu e-mail: <strong>{user.email}</strong>. Seu histórico e progresso diário serão carregados na hora!
            </div>

            {onLogout && (
              <div className="pt-2 border-t-2 border-stone-200">
                <button
                  onClick={() => {
                    setShowSyncModal(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 rounded-xl text-xs sm:text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair ou Trocar de Conta</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
