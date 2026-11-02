import React, { useState } from 'react';
import { Flame, BookOpen, HelpCircle, Cloud, Copy, Check, X, Smartphone } from 'lucide-react';
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
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/25">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-stone-900 flex items-center gap-1.5">
                LEITOX
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-mono font-bold">
                  +50%
                </span>
              </h1>
              <p className="text-[10px] text-stone-500 font-medium">
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
                  className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-lg text-amber-700 text-xs font-mono font-bold"
                >
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{user.streakDays}d</span>
                </div>

                {/* Current Speed Badge */}
                <div
                  title="PPM Atual"
                  className="flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-lg text-stone-800 text-xs font-mono font-bold"
                >
                  <span>{user.currentWpm}</span>
                  <span className="text-[10px] text-stone-500">PPM</span>
                </div>

                {/* Cloud Sync Button */}
                <button
                  onClick={() => setShowSyncModal(true)}
                  title="Sincronização Nuvem & Celular"
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-600 hover:text-emerald-700 transition-colors"
                >
                  <Cloud className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Guide Button */}
            <button
              onClick={onOpenGuide}
              title="Guia Científico e Métodos"
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MODAL DE SINCRONIZAÇÃO NUVEM & CELULAR */}
      {showSyncModal && user && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Sincronização & Celular</h3>
                  <p className="text-[10px] text-stone-500">Acesse seu treino em qualquer tela</p>
                </div>
              </div>

              <button
                onClick={() => setShowSyncModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>E-mail cadastrado:</span>
                <strong className="text-stone-900 font-mono">{user.email}</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Meta calculada:</span>
                <strong className="text-emerald-700 font-mono">{user.targetWpm} PPM</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Status da Nuvem:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ativo
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCopySyncCode}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-xs font-bold text-stone-800 flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
                <span>{copied ? 'Código Copiado com Sucesso!' : 'Copiar Código de Sincronização'}</span>
              </button>

              <button
                onClick={handleForceSync}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Cloud className="w-4 h-4" />
                <span>Forçar Sincronização Agora</span>
              </button>
            </div>

            {syncStatus && (
              <p className="text-[11px] text-emerald-700 text-center font-medium">{syncStatus}</p>
            )}

            <p className="text-[10px] text-stone-500 text-center leading-relaxed">
              Ao abrir no celular, digite <strong>{user.email}</strong> para restaurar seu progresso instantaneamente.
            </p>

            {onLogout && (
              <div className="pt-2 border-t border-stone-200">
                <button
                  onClick={() => {
                    setShowSyncModal(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-[11px] text-rose-600 hover:text-rose-700 font-semibold"
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
