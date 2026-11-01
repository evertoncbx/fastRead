import React from 'react';
import { X, BookOpen, Brain, Zap, Target, Layers, Eye, Award } from 'lucide-react';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131211]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1c1917] border border-[#2c2724] rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#f3efe8]">
        {/* Header */}
        <div className="p-4 border-b border-[#2c2724] flex items-center justify-between bg-[#131211]/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#faf8f5]">Guia Científico & Métodos</h2>
              <p className="text-[10px] text-[#a39b8e]">Fundamentos da Leitura Dinâmica & Retenção Cognitiva</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#24211e] text-[#a39b8e] hover:text-[#f3efe8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-[#d8d0c2] leading-relaxed">
          {/* Seção 1: O Objetivo +50% */}
          <div className="bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] p-4 rounded-2xl border border-[#3d3834]">
            <h3 className="text-sm font-bold text-[#faf8f5] flex items-center gap-1.5 mb-2">
              <Target className="w-4 h-4 text-amber-400" />
              O Desafio: Ganho de +50% em Velocidade
            </h3>
            <p>
              A velocidade média de um leitor adulto situa-se entre <strong>150 e 220 Palavras Por Minuto (PPM)</strong>. Nosso objetivo com o Leitox é conduzir você para <strong>300 a 450+ PPM</strong> com retenção superior a 75%.
            </p>
          </div>

          {/* Seção 2: Os 3 Pilares Científicos */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#faf8f5] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Os 3 Pilares Comprovados de Avanço
            </h3>

            <div className="bg-[#131211]/80 p-3 rounded-xl border border-[#2c2724] space-y-1">
              <strong className="text-amber-400 block font-semibold">1. Eliminar a Subvocalização</strong>
              <p className="text-[#a39b8e]">
                A voz mental limita a leitura à cadência da fala humana. Usamos o <strong>Metrônomo Rítmico</strong> e velocidades forçadas (&gt;250 PPM) para silenciar o freio vocal e acionar o processamento visual direto.
              </p>
            </div>

            <div className="bg-[#131211]/80 p-3 rounded-xl border border-[#2c2724] space-y-1">
              <strong className="text-amber-300 block font-semibold">2. Acelerar a Captação Visual & ORP</strong>
              <p className="text-[#a39b8e]">
                O leitor <strong>RSVP (Rapid Serial Visual Presentation)</strong> com <em>Optimal Recognition Point (Ponto Ótimo de Reconhecimento)</em> alinha a letra focal de cada palavra no centro óptico, eliminando a fadiga de saltos sacádicos erráticos.
              </p>
            </div>

            <div className="bg-[#131211]/80 p-3 rounded-xl border border-[#2c2724] space-y-1">
              <strong className="text-emerald-400 block font-semibold">3. Expansão Parafoveal & Chunking</strong>
              <p className="text-[#a39b8e]">
                Com as <strong>Tabelas de Schulte</strong> e a <strong>Leitura em Blocos</strong>, treinamos o cérebro para capturar 2 a 4 palavras de uma só vez, reduzindo o número total de fixações por página pela metade.
              </p>
            </div>
          </div>

          {/* Seção 3: Benchmark Internacional */}
          <div className="bg-[#131211]/80 p-4 rounded-2xl border border-[#2c2724] space-y-2">
            <h3 className="text-sm font-bold text-[#faf8f5] flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              Benchmark: Análise dos Melhores Métodos Globais
            </h3>
            <ul className="space-y-1.5 text-[#a39b8e]">
              <li>• <strong className="text-[#faf8f5]">Spreeder (EUA):</strong> Pioneiro em RSVP; faltava contexto em Português brasileiro e questionários de fixação.</li>
              <li>• <strong className="text-[#faf8f5]">Outread / Readme:</strong> Guias visuais contínuos; não incluíam metrônomo rítmico puro anti-subvocalização.</li>
              <li>• <strong className="text-[#faf8f5]">7 Speed Reading:</strong> Foco em exercícios cognitivos e tabelas de Schulte.</li>
              <li>• <strong className="text-amber-300">Diferencial Leitox:</strong> Reúne todos os métodos comprovados com biblioteca brasileira de domínio público (Machado de Assis, Lima Barreto, Alencar), testes com randomização inteligente e sincronização móvel.</li>
            </ul>
          </div>

          {/* Seção 4: A Rotina Diária de 15 a 20 Minutos */}
          <div className="bg-[#131211]/80 p-4 rounded-2xl border border-[#2c2724] space-y-2.5">
            <h3 className="text-sm font-bold text-[#faf8f5] flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-400" />
              A Jornada Diária de 15 a 20 Minutos
            </h3>
            <div className="grid grid-cols-5 gap-1.5 text-center pt-1 font-mono text-[10px]">
              <div className="bg-[#1c1917] p-1.5 rounded-lg border border-[#2c2724]">
                <span className="block text-[#766f63]">Passo 1</span>
                <strong className="text-amber-400">Schulte</strong>
                <span className="block text-[#a39b8e] text-[9px]">3 min</span>
              </div>
              <div className="bg-[#1c1917] p-1.5 rounded-lg border border-[#2c2724]">
                <span className="block text-[#766f63]">Passo 2</span>
                <strong className="text-amber-300">Metrônomo</strong>
                <span className="block text-[#a39b8e] text-[9px]">5 min</span>
              </div>
              <div className="bg-[#1c1917] p-1.5 rounded-lg border border-[#2c2724]">
                <span className="block text-[#766f63]">Passo 3</span>
                <strong className="text-amber-200">RSVP</strong>
                <span className="block text-[#a39b8e] text-[9px]">5 min</span>
              </div>
              <div className="bg-[#1c1917] p-1.5 rounded-lg border border-[#2c2724]">
                <span className="block text-[#766f63]">Passo 4</span>
                <strong className="text-emerald-400">Blocos</strong>
                <span className="block text-[#a39b8e] text-[9px]">4 min</span>
              </div>
              <div className="bg-[#1c1917] p-1.5 rounded-lg border border-[#2c2724]">
                <span className="block text-[#766f63]">Passo 5</span>
                <strong className="text-amber-400">Aferição</strong>
                <span className="block text-[#a39b8e] text-[9px]">3 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2c2724] bg-[#131211]/80">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
          >
            Entendido, Vamos Treinar!
          </button>
        </div>
      </div>
    </div>
  );
};
