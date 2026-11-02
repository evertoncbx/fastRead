import React, { useState, useEffect } from 'react';
import { User, Mail, ArrowRight, BookOpen, Loader2, CheckCircle2, Zap } from 'lucide-react';
import { UserProfile } from '../types';
import { storage } from '../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onSave: (name: string, email: string) => void;
  onRestore: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onSave, onRestore }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);
  const [remoteFound, setRemoteFound] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  // Busca perfil existente remotamente (Supabase fr_profiles ou Cloud KV)
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
      } else {
        setRemoteFound(null);
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
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setRemoteFound(null);
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

    // Se já encontramos o perfil remoto na nuvem, restaura diretamente
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

    // Se for novo perfil e nome não foi informado
    if (!name.trim()) {
      setError('Novo por aqui? Informe seu nome abaixo para iniciar o teste diagnóstico de velocidade.');
      return;
    }

    onSave(name.trim(), cleanEmail);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-stone-200 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-stone-800">
        
        {/* Cabeçalho no Estilo Duolingo: Ícone Vibrante, Tipografia Forte */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto mb-3.5 shadow-lg shadow-emerald-600/30 border-b-4 border-emerald-800">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">LEITOX</h2>
          <p className="text-sm text-stone-600 font-medium mt-1">
            Treinamento de Leitura Dinâmica & Retenção Cognitiva
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-800 text-xs sm:text-sm font-medium text-center mb-4 leading-relaxed">
            {error}
          </div>
        )}

        {/* Formulário 100% Amarrado ao E-mail (Sem código de sincronização) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-stone-600 font-bold block mb-1.5">
              Seu E-mail
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                autoFocus
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (remoteFound) setRemoteFound(null);
                }}
                onBlur={() => handleCheckEmail()}
                className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl py-3.5 pl-12 pr-11 text-base text-stone-900 placeholder:text-stone-400 font-medium focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
              />
              {isSearchingRemote && (
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
              )}
            </div>
          </div>

          {/* Perfil existente reconhecido no banco do projeta / Supabase */}
          {remoteFound ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-left space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-emerald-900 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Perfil Localizado na Nuvem!</span>
              </div>
              <p className="text-sm text-emerald-900 leading-relaxed">
                Bem-vindo(a) de volta, <strong className="text-emerald-950">{remoteFound.name}</strong>! Sua meta de <strong>{remoteFound.targetWpm} PPM</strong> e seus {remoteFound.testsCompleted} treinos estão preservados.
              </p>
              <button
                type="button"
                onClick={() => onRestore(remoteFound)}
                className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md border-b-4 border-emerald-800 transition-all cursor-pointer"
              >
                <span>Continuar Meu Treinamento</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div>
              <label className="text-xs uppercase tracking-wider text-stone-600 font-bold block mb-1.5">
                Seu Nome Completo
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Como gostaria de ser chamado?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl py-3.5 pl-12 pr-4 text-base text-stone-900 placeholder:text-stone-400 font-medium focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>
          )}

          {!remoteFound && (
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSearchingRemote}
                className="w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md border-b-4 border-emerald-800 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSearchingRemote ? (
                  <span>Localizando perfil...</span>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current" />
                    <span>Iniciar Treinamento (+50%)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Dica amigável estilo Duolingo */}
          <div className="pt-2 text-center">
            <p className="text-xs text-stone-500 leading-relaxed">
              Tudo sincronizado automaticamente pelo seu e-mail. Acesse de qualquer celular ou computador sem códigos manuais.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
