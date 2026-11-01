import React from 'react';
import { Flame, Zap, Trophy, HelpCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenGuide }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              LEITOX
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono font-bold">
                +50%
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">
              {user ? `Olá, ${user.name.split(' ')[0]}` : 'Leitura Dinâmica'}
            </p>
          </div>
        </div>

        {/* Right Stats & Help Button */}
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
                className="flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg text-indigo-300 text-xs font-mono font-bold"
              >
                <span>{user.currentWpm}</span>
                <span className="text-[10px] text-slate-400">PPM</span>
              </div>
            </>
          )}

          {/* Guide Button */}
          <button
            onClick={onOpenGuide}
            title="Guia Científico e Métodos"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
