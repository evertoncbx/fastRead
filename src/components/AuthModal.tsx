import React, { useState, useEffect } from 'react';
import { User, Mail, ArrowRight, BookOpen, KeyRound, Loader2, CheckCircle2, Cloud } from 'lucide-react';
import { UserProfile } from '../types';
import { storage } from '../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onSave: (name: string, email: string) => void;
  onRestore: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onSave, onRestore }) => {
  const [tab, setTab] = useState<'login' | 'import'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [syncCode, setSyncCode] = useState('');
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);
  const [remoteFound, setRemoteFound] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  // Busca perfil existente remotamente (Supabase ou Cloud Storage)
  const handleCheckEmail = async (targetEmail?: string) => {
    const cleanEmail = (targetEmail || email).toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@') || cleanEmail.length < 5) return;

    setIsSearchingRemote(true);
    setError('');
    try {
      const result = await storage.fetchRemoteProfile(cleanEmail);
      if (result.profile) {
        setRemoteFound(result.profile);
        if (!name.trim() && result.profile.name) {
          setName(result.profile.name);
        }
      }
    } catch {
      // Falha silenciosa
    } finally {
      setIsSearchingRemote(false);
    }
  };

  // Verificação debounced para celulares (detecta perfil antes mesmo de sair do campo)
  useEffect(() => {
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail.includes('@') && cleanEmail.includes('.') && cleanEmail.length >= 6) {
      const timer = setTimeout(() => {
        void handleCheckEmail(cleanEmail);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [email]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }

    // Se já encontramos o perfil remoto, restaura diretamente!
    if (remoteFound) {
      onRestore(remoteFound);
      return;
    }

    // Se ainda não buscou remotamente, tenta buscar antes de forçar novo cadastro
    setIsSearchingRemote(true);
    try {
      const remote = await storage.fetchRemoteProfile(cleanEmail);
      if (remote.profile) {
        setRemoteFound(remote.profile);
        onRestore(remote.profile);
        return;
      }
    } catch {
      // Ignora erro
    } finally {
      setIsSearchingRemote(false);
    }

    // Se realmente for novo perfil e nome não foi preenchido
    if (!name.trim()) {
      setError('E-mail não localizado na nuvem. Se você já fez o teste no computador, use o mesmo e-mail ou a aba "Código de Sincronização". Para criar um novo perfil agora, informe seu nome abaixo.');
      return;
    }

    onSave(name.trim(), cleanEmail);
  };

  const handleImportCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncCode.trim()) {
      setError('Por favor, cole o código de sincronização.');
      return;
    }

    const result = storage.importSyncCode(syncCode.trim());
    if (result.success && result.user) {
      onRestore(result.user);
    } else {
      setError(result.error || 'Código de sincronização inválido.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-stone-800">
        {/* Cabeçalho */}
        <div className="text-center mb-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-emerald-600/25">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-stone-900 tracking-tight">Leitox</h2>
          <p className="text-xs text-stone-500 mt-1">
            Treinamento de Leitura Dinâmica & Retenção Cognitiva
          </p>
        </div>

        {/* Abas: E-mail / Código */}
        <div className="flex border-b border-stone-200 mb-4 text-xs font-semibold">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Acesso por E-mail
          </button>
          <button
            onClick={() => { setTab('import'); setError(''); }}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              tab === 'import'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Código de Sincronização
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center mb-3">
            {error}
          </div>
        )}

        {/* ABA 1: ACESSO POR E-MAIL */}
        {tab === 'login' && (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                Seu E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Ex: seuemail@dominio.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (remoteFound) setRemoteFound(null);
                  }}
                  onBlur={() => handleCheckEmail()}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-10 pr-10 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-emerald-500"
                />
                {isSearchingRemote && (
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
            </div>

            {/* Alerta de Perfil Remoto Encontrado */}
            {remoteFound ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Perfil Encontrado na Nuvem!</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Olá, <strong>{remoteFound.name}</strong>! Sua meta de <strong>{remoteFound.targetWpm} PPM</strong> e seus {remoteFound.testsCompleted} treinos estão preservados.
                </p>
                <button
                  type="button"
                  onClick={() => onRestore(remoteFound)}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Restaurar Meu Progresso Neste Celular</span>
                </button>
              </div>
            ) : (
              <div>
                <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                  Seu Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Ex: Everton Carlos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-10 pr-3 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {!remoteFound && (
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSearchingRemote}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all disabled:opacity-50"
                >
                  <span>{isSearchingRemote ? 'Verificando Nuvem...' : 'Acessar Treinamento'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <p className="text-[10px] text-stone-500 text-center pt-1">
              Se você já utilizou o Leitox no computador, seu perfil será sincronizado automaticamente pelo e-mail.
            </p>
          </form>
        )}

        {/* ABA 2: IMPORTAR CÓDIGO DE SINCRONIZAÇÃO */}
        {tab === 'import' && (
          <form onSubmit={handleImportCode} className="space-y-3.5">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                Cole o Código de Sincronização
              </label>
              <textarea
                rows={4}
                placeholder="Cole aqui o código copiado do computador..."
                value={syncCode}
                onChange={(e) => setSyncCode(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Importar Dados e Entrar</span>
            </button>

            <p className="text-[10px] text-stone-500 text-center">
              No computador, abra o menu superior do Leitox e clique em <em>Sincronizar</em> para copiar seu código.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
