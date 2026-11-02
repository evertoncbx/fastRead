import React, { useState, useEffect } from 'react';
import { User, Mail, ArrowRight, BookOpen, Loader2, CheckCircle2 } from 'lucide-react';
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
      // Silencioso
    } finally {
      setIsSearchingRemote(false);
    }
  };

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

    if (!name.trim()) {
      setError('Por favor, informe seu nome.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }

    if (remoteFound) {
      onRestore(remoteFound);
      return;
    }

    try {
      setIsSearchingRemote(true);
      const remote = await storage.fetchRemoteProfile(email.toLowerCase().trim());
      if (remote.profile) {
        onRestore(remote.profile);
        return;
      }
    } catch {
      // Cria novo
    } finally {
      setIsSearchingRemote(false);
    }

    onSave(name.trim(), email.toLowerCase().trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-stone-200 rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 text-[#131F24]">
        {/* Header com Logo */}
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-3xl bg-[#58CC02] border-b-4 border-[#46A302] flex items-center justify-center text-white mx-auto shadow-sm">
            <BookOpen className="w-8 h-8 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#FFC800] text-[#7A5000] border-2 border-white rounded-full flex items-center justify-center text-sm font-black leading-none shadow-xs">
              +
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#131F24]">
            Bem-vindo ao leia<span className="text-[#58CC02]">+</span>
          </h2>
          <p className="text-sm font-bold text-stone-500">
            Treine sua leitura diária e aumente sua velocidade em até +50%.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* E-mail */}
          <div>
            <label className="text-xs font-black uppercase text-stone-400 block mb-1">
              Seu E-mail
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="exemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border-2 border-stone-200 focus:border-[#58CC02] outline-none text-base font-bold transition-colors"
              />
              {isSearchingRemote && (
                <Loader2 className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1899D6] animate-spin" />
              )}
            </div>
          </div>

          {/* Banner de Perfil Existente Encontrado */}
          {remoteFound && (
            <div className="p-3.5 rounded-2xl bg-[#D7FFB8] border-2 border-[#A8EE69] text-xs font-bold text-[#46A302] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0 stroke-[2.5]" />
              <div>
                <span>Perfil recuperado! </span>
                <span className="font-mono font-black">{remoteFound.currentWpm} PPM</span> • {remoteFound.streakDays} dias de sequência
              </div>
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="text-xs font-black uppercase text-stone-400 block mb-1">
              Como quer ser chamado?
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome ou apelido"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-stone-200 focus:border-[#58CC02] outline-none text-base font-bold transition-colors"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-black text-[#FF4B4B] bg-[#FFEAEA] p-2.5 rounded-xl border border-[#FFC2C2] text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 btn-duo-green text-base font-black flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
          >
            <span>{remoteFound ? 'Entrar com meu Perfil' : 'Começar Agora'}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
