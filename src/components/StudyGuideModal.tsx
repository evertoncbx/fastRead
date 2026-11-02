import React from 'react';
import { X, Brain, Zap, Target, Eye, Award } from 'lucide-react';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-stone-800">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-stone-900">Guia Científico & Métodos</h2>
              <p className="text-[10px] text-stone-500">Fundamentos da Leitura Dinâmica & Retenção Cognitiva</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-stone-700 leading-relaxed">
          {/* Seção 1: O Objetivo +50% */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
              <Target className="w-4 h-4 text-emerald-700" />
              O Desafio: Ganho de +50% em Velocidade
            </h3>
            <p className="text-emerald-900">
              A velocidade média de um leitor adulto situa-se entre <strong>150 e 220 Palavras Por Minuto (PPM)</strong>. Nosso objetivo com o Leitox é conduzir você para <strong>300 a 450+ PPM</strong> com retenção superior a 75%.
            </p>
          </div>

          {/* Seção 2: Os 3 Pilares Científicos */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-700" />
              Os 3 Pilares Comprovados de Avanço
            </h3>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <strong className="text-emerald-800 block font-semibold">1. Eliminar a Subvocalização</strong>
              <p className="text-stone-600">
                A voz mental limita a leitura à cadência da fala humana. Usamos o <strong>Metrônomo Rítmico</strong> e velocidades forçadas (&gt;250 PPM) para silenciar o freio vocal e acionar o processamento visual direto.
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <strong className="text-blue-800 block font-semibold">2. Acelerar a Captação Visual & ORP</strong>
              <p className="text-stone-600">
                O leitor <strong>RSVP (Rapid Serial Visual Presentation)</strong> com <em>Optimal Recognition Point (Ponto Ótimo de Reconhecimento)</em> alinha a letra focal de cada palavra no centro óptico, eliminando a fadiga de saltos sacádicos erráticos.
              </p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <strong className="text-teal-800 block font-semibold">3. Expansão Parafoveal & Chunking</strong>
              <p className="text-stone-600">
                Com as <strong>Tabelas de Schulte</strong> e a <strong>Leitura em Blocos</strong>, treinamos o cérebro para capturar 2 a 4 palavras de uma só vez, reduzindo o número total de fixações por página pela metade.
              </p>
            </div>
          </div>

          {/* Seção 3: Benchmark Internacional */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-purple-700" />
              Benchmark: Análise dos Melhores Métodos Globais
            </h3>
            <ul className="space-y-1.5 text-stone-600">
              <li>• <strong className="text-stone-800">Ler Mais Rápido (Inspiração Visual):</strong> Interface limpa, diurna, agradável e focada na leitura ergonômica sem sobrecarga visual.</li>
              <li>• <strong className="text-stone-800">Spreeder (EUA):</strong> Pioneiro em RSVP e ORP.</li>
              <li>• <strong className="text-stone-800">Outread / Readme:</strong> Guias visuais contínuos.</li>
              <li>• <strong className="text-emerald-700 font-bold">Diferencial Leitox:</strong> Reúne todos os métodos comprovados com biblioteca brasileira de domínio público (Machado de Assis, Lima Barreto, Alencar), testes com randomização inteligente e sincronização móvel.</li>
            </ul>
          </div>

          {/* Seção 4: A Rotina Diária de 15 a 20 Minutos */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2.5">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-700" />
              A Jornada Diária de 15 a 20 Minutos
            </h3>
            <div className="grid grid-cols-5 gap-1.5 text-center pt-1 font-mono text-[10px]">
              <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                <span className="block text-stone-400">Passo 1</span>
                <strong className="text-amber-700">Schulte</strong>
                <span className="block text-stone-500 text-[9px]">3 min</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                <span className="block text-stone-400">Passo 2</span>
                <strong className="text-emerald-700">Metrônomo</strong>
                <span className="block text-stone-500 text-[9px]">5 min</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                <span className="block text-stone-400">Passo 3</span>
                <strong className="text-blue-700">RSVP</strong>
                <span className="block text-stone-500 text-[9px]">5 min</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                <span className="block text-stone-400">Passo 4</span>
                <strong className="text-teal-700">Blocos</strong>
                <span className="block text-stone-500 text-[9px]">4 min</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                <span className="block text-stone-400">Passo 5</span>
                <strong className="text-purple-700">Aferição</strong>
                <span className="block text-stone-500 text-[9px]">3 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
          >
            Entendido, Vamos Treinar!
          </button>
        </div>
      </div>
    </div>
  );
};
