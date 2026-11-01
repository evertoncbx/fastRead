import React, { useState } from 'react';
import { Flame, BookOpen, HelpCircle, Cloud, Copy, Check, RotateCcw, X, Smartphone } from 'lucide-react';
import { UserProfile } from '../types';
import { storage } from '../services/storageService';

interface HeaderProps {
  user: UserProfile | null;
  onOpenGuide: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenGuide, onLogout }) => {
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  const handleCopySyncCode = () => {
    const code = storage.exportSyncCode();
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleForceSync = async () => {
    if (!user) return;
    setSyncStatus('Sincronizando com a nuvem...');
    const ok = await storage.syncToRemote(user, storage.getResults());
    if (ok) {
      setSyncStatus('Sincronizado com sucesso!');
    } else {
      setSyncStatus('Dados salvos localmente.');
    }
    setTimeout(() => setSyncStatus(''), 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#131211]/90 backdrop-blur-md border-b border-[#2c2724] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-amber-900/40">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-[#faf8f5] flex items-center gap-1.5">
                LEITOX
                <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/25 px-1.5 py-0.2 rounded font-mono font-bold">
                  +50%
                </span>
              </h1>
              <p className="text-[10px] text-[#a39b8e] font-medium">
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
                  className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg text-amber-400 text-xs font-mono font-bold"
                >
                  <Flame className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <span>{user.streakDays}d</span>
                </div>

                {/* Current Speed Badge */}
                <div
                  title="PPM Atual"
                  className="flex items-center gap-1 bg-[#221f1c] border border-[#36322e] px-2.5 py-1 rounded-lg text-amber-300 text-xs font-mono font-bold"
                >
                  <span>{user.currentWpm}</span>
                  <span className="text-[10px] text-[#a39b8e]">PPM</span>
                </div>

                {/* Cloud Sync Button */}
                <button
                  onClick={() => setShowSyncModal(true)}
                  title="Sincronização Nuvem & Celular"
                  className="p-1.5 rounded-lg bg-[#221f1c] border border-[#36322e] text-[#a39b8e] hover:text-amber-400 transition-colors"
                >
                  <Cloud className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Guide Button */}
            <button
              onClick={onOpenGuide}
              title="Guia Científico e Métodos"
              className="p-1.5 rounded-lg bg-[#221f1c] border border-[#36322e] text-[#a39b8e] hover:text-[#f3efe8] transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MODAL DE SINCRONIZAÇÃO NUVEM & CELULAR */}
      {showSyncModal && user && (
        <div className="fixed inset-0 z-50 bg-[#131211]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1917] border border-[#36322e] rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#faf8f5]">Sincronização & Celular</h3>
                  <p className="text-[10px] text-[#a39b8e]">Acesse seu treino em qualquer tela</p>
                </div>
              </div>

              <button
                onClick={() => setShowSyncModal(false)}
                className="p-1 rounded-lg text-[#a39b8e] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-[#131211] border border-[#2c2724] space-y-1 text-xs">
              <div className="flex justify-between text-[#a39b8e]">
                <span>E-mail cadastrado:</span>
                <strong className="text-[#f3efe8] font-mono">{user.email}</strong>
              </div>
              <div className="flex justify-between text-[#a39b8e]">
                <span>Meta calculada:</span>
                <strong className="text-amber-400 font-mono">{user.targetWpm} PPM</strong>
              </div>
              <div className="flex justify-between text-[#a39b8e]">
                <span>Status da Nuvem:</span>
                <span className="text-emerald-400 font-semibold">Ativo & Sincronizado</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCopySyncCode}
                className="w-full py-2.5 px-3 rounded-xl bg-[#2c2724] hover:bg-[#36322e] border border-[#403b34] text-xs font-bold text-[#f3efe8] flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                <span>{copied ? 'Código Copiado com Sucesso!' : 'Copiar Código de Sincronização'}</span>
              </button>

              <button
                onClick={handleForceSync}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Cloud className="w-4 h-4" />
                <span>Forçar Sincronização Agora</span>
              </button>
            </div>

            {syncStatus && (
              <p className="text-[11px] text-amber-400 text-center font-medium">{syncStatus}</p>
            )}

            <p className="text-[10px] text-[#766f63] text-center leading-relaxed">
              Ao abrir no celular, digite <strong>{user.email}</strong> ou cole o código acima para restaurar instantaneamente.
            </p>

            {onLogout && (
              <div className="pt-2 border-t border-[#2c2724]">
                <button
                  onClick={() => {
                    setShowSyncModal(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-[11px] text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Sair ou Trocar de Conta
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
