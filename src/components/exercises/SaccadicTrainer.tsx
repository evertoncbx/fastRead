import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, MoveHorizontal, Zap, CheckCircle2 } from 'lucide-react';
import { audio } from '../../services/audioService';
import confetti from 'canvas-confetti';

interface SaccadicTrainerProps {
  onComplete?: (wpm: number, durationMinutes: number) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

const SAMPLE_WORDS = [
  'BRASIL', 'FUTURO', 'LEITURA', 'FOCO', 'MENTE', 'AVANÇO',
  'CÉREBRO', 'VISÃO', 'PENSAR', 'SABER', 'CLAREZA', 'RITMO',
  'PÁTRIA', 'JUSTIÇA', 'LIVRO', 'SENTIDO', 'IDEIA', 'LÓGICA'
];

export const SaccadicTrainer: React.FC<SaccadicTrainerProps> = ({ onComplete, onBack, isDailyStep }) => {
  const [speedMs, setSpeedMs] = useState<number>(500);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left');
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [jumpsCount, setJumpsCount] = useState<number>(0);
  const [targetJumps] = useState<number>(60);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = () => {
    setIsPlaying(true);
    setIsFinished(false);

    timerRef.current = window.setInterval(() => {
      audio.playClick();
      setActiveSide(prev => (prev === 'left' ? 'right' : 'left'));
      setWordIndex(prev => (prev + 1) % SAMPLE_WORDS.length);
      setJumpsCount(prev => {
        const next = prev + 1;
        if (next >= targetJumps) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          setIsFinished(true);
          audio.playSuccess();
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.6 }
          });
        }
        return next;
      });
    }, speedMs);
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleReset = () => {
    handleStop();
    setJumpsCount(0);
    setIsFinished(false);
    setActiveSide('left');
  };

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-24 text-stone-800">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors py-1 px-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : <div />}
      </div>

      {/* Header Info */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 mb-4 shadow-xs">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <MoveHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              Saltos Sacádicos Bilaterais
              {isDailyStep && <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-stone-500">Agilidade dos músculos motores oculares</p>
          </div>
        </div>

        {/* Dica da técnica */}
        <div className="mt-3 bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2">
          <Zap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            <strong className="text-indigo-950">Instrução:</strong> Mantenha a cabeça perfeitamente imóvel. Movimente exclusivamente os olhos, saltando de um lado para o outro no ritmo dos estímulos visuais.
          </span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold">Saltos Concluídos</span>
          <span className="text-2xl font-black text-indigo-700 font-mono">{jumpsCount} / {targetJumps}</span>
        </div>

        <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold">Intervalo de Salto</span>
          <span className="text-2xl font-black text-stone-900 font-mono">{speedMs}ms</span>
        </div>
      </div>

      {/* Campo Visual de Saltos Sacádicos */}
      <div className="relative bg-[#FCFBF8] border-2 border-stone-200 rounded-3xl p-6 mb-4 shadow-xs min-h-[220px] flex items-center justify-between overflow-hidden">
        {/* Linha Central */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-stone-300 border-dashed" />

        {/* Lado Esquerdo */}
        <div className="w-1/2 flex justify-start items-center pl-2">
          {activeSide === 'left' && isPlaying && (
            <div className="py-3 px-4 rounded-xl bg-indigo-600 text-white font-black text-lg tracking-wider animate-pulse shadow-xs">
              {SAMPLE_WORDS[wordIndex]}
            </div>
          )}
        </div>

        {/* Lado Direito */}
        <div className="w-1/2 flex justify-end items-center pr-2">
          {activeSide === 'right' && isPlaying && (
            <div className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-black text-lg tracking-wider animate-pulse shadow-xs">
              {SAMPLE_WORDS[wordIndex]}
            </div>
          )}
        </div>

        {/* Overlay se parado */}
        {!isPlaying && !isFinished && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10">
            <MoveHorizontal className="w-10 h-10 text-indigo-600 mb-2" />
            <h3 className="text-base font-bold text-stone-900 mb-1">Alongamento Sacádico</h3>
            <p className="text-xs text-stone-500 max-w-xs mb-4">
              Realize 60 saltos rápidos entre as extremidades para destravar a velocidade dos seus olhos.
            </p>
            <button
              onClick={handleStart}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              Iniciar Saltos
            </button>
          </div>
        )}

        {/* Overlay se concluído */}
        {isFinished && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-2" />
            <h3 className="text-base font-bold text-stone-900 mb-1">Músculos Oculares Aquecidos!</h3>
            <p className="text-xs text-stone-500 mb-3">{targetJumps} saltos completados com sucesso.</p>
            {onComplete && (
              <button
                onClick={() => onComplete(400, 2)}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Continuar</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Controles de Intervalo */}
      <div className="bg-white border border-stone-200 p-3.5 rounded-xl mb-4 shadow-xs">
        <div className="flex justify-between text-xs text-stone-600 mb-1">
          <span>Ritmo do Salto</span>
          <span>{speedMs}ms</span>
        </div>
        <input
          type="range"
          min="250"
          max="700"
          step="50"
          value={speedMs}
          disabled={isPlaying}
          onChange={(e) => setSpeedMs(Number(e.target.value))}
          className="w-full accent-indigo-600 bg-stone-100 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
          <span>Rápido (250ms)</span>
          <span>Médio (450ms)</span>
          <span>Moderado (700ms)</span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-2">
        <button
          onClick={isPlaying ? handleStop : handleStart}
          className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
            isPlaying
              ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>{jumpsCount > 0 ? 'Retomar' : 'Iniciar Treino'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          aria-label="Reiniciar"
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
