import React from 'react';
import { X, Brain, Zap, Target, Layers, Trophy } from 'lucide-react';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-stone-200 rounded-3xl max-w-sm w-full flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 text-[#131F24]">
        {/* Header */}
        <div className="p-5 border-b-2 border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D7FFB8] text-[#46A302] border-2 border-[#A8EE69] flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#131F24]">Como Funciona</h2>
              <p className="text-sm font-bold text-stone-400">Guia Rápido leia+</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Super Minimalista */}
        <div className="p-5 space-y-3.5 text-base font-bold text-stone-600">
          <div className="bg-[#FFF8D9] p-4 rounded-2xl border-2 border-[#FFE680] flex items-center gap-3">
            <Target className="w-8 h-8 text-[#FF9600] shrink-0" />
            <div>
              <strong className="text-base font-black text-[#7A5000] block">Meta: +50% de Velocidade</strong>
              <p className="text-sm font-bold text-[#8C6000]">
                Aumente sua leitura diária mantendo excelente compreensão.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D7FFB8] text-[#46A302] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <strong className="text-base font-black text-[#131F24] block">Metrônomo</strong>
                <p className="text-sm font-bold text-stone-500">Acompanhe a palavra em destaque no ritmo.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DDF4FF] text-[#1899D6] flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <strong className="text-base font-black text-[#131F24] block">RSVP Turbo</strong>
                <p className="text-sm font-bold text-stone-500">Mantenha o foco fixo no centro da tela.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6E8FF] text-[#A559D9] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <strong className="text-base font-black text-[#131F24] block">Blocos</strong>
                <p className="text-sm font-bold text-stone-500">Leia grupos de palavras de uma só vez.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-stone-100 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-4 btn-duo-green text-lg font-black cursor-pointer"
          >
            Bora Treinar!
          </button>
        </div>
      </div>
    </div>
  );
};
