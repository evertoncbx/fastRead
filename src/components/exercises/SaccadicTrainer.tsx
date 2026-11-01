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
  const [speedMs, setSpeedMs] = useState<number>(500); // 300ms a 800ms
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left');
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [jumpsCount, setJumpsCount] = useState<number>(0);
  const [targetJumps] = useState<number>(60); // 60 saltos
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
          // onComplete é acionado pelo botão Continuar no overlay!
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
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-24 text-slate-100">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : <div />}
      </div>

      {/* Header Info */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-4 rounded-2xl border border-slate-800 mb-4 shadow-lg">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <MoveHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Saltos Sacádicos Bilaterais
              {isDailyStep && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-slate-400">Agilidade dos músculos motores oculares</p>
          </div>
        </div>

        {/* Dica da técnica */}
        <div className="mt-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
          <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Instrução:</strong> Mantenha a cabeça perfeitamente imóvel. Movimente exclusivamente os olhos, saltando de um lado para o outro no ritmo dos estímulos visuais.
          </span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Saltos Concluídos</span>
          <span className="text-2xl font-black text-cyan-400 font-mono">{jumpsCount} / {targetJumps}</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Intervalo de Salto</span>
          <span className="text-2xl font-black text-white font-mono">{speedMs}ms</span>
        </div>
      </div>

      {/* Campo Visual de Saltos Sacádicos */}
      <div className="relative bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 mb-4 shadow-2xl min-h-[220px] flex items-center justify-between overflow-hidden">
        {/* Linha Central */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-slate-800 border-dashed" />

        {/* Lado Esquerdo */}
        <div className="w-1/2 flex justify-start items-center pl-2">
          {activeSide === 'left' && isPlaying && (
            <div className="py-3 px-4 rounded-xl bg-cyan-500 text-slate-950 font-black text-lg tracking-wider animate-pulse shadow-lg shadow-cyan-500/40">
              {SAMPLE_WORDS[wordIndex]}
            </div>
          )}
        </div>

        {/* Lado Direito */}
        <div className="w-1/2 flex justify-end items-center pr-2">
          {activeSide === 'right' && isPlaying && (
            <div className="py-3 px-4 rounded-xl bg-amber-400 text-slate-950 font-black text-lg tracking-wider animate-pulse shadow-lg shadow-amber-400/40">
              {SAMPLE_WORDS[wordIndex]}
            </div>
          )}
        </div>

        {/* Overlay se parado */}
        {!isPlaying && !isFinished && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
            <MoveHorizontal className="w-10 h-10 text-cyan-400 mb-2" />
            <h3 className="text-base font-bold text-white mb-1">Alongamento Sacádico</h3>
            <p className="text-xs text-slate-300 max-w-xs mb-4">
              Realize 60 saltos rápidos entre as extremidades para destravar a velocidade dos seus olhos.
            </p>
            <button
              onClick={handleStart}
              className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all"
            >
              Iniciar Saltos
            </button>
          </div>
        )}

        {/* Overlay se concluído */}
        {isFinished && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2" />
            <h3 className="text-base font-bold text-white mb-1">Músculos Oculares Aquecidos!</h3>
            <p className="text-xs text-slate-300 mb-3">{targetJumps} saltos completados com sucesso.</p>
            {onComplete && (
              <button
                onClick={() => onComplete(400, 2)}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Continuar</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Controles de Intervalo */}
      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
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
          className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>Rápido (250ms)</span>
          <span>Médio (450ms)</span>
          <span>Moderado (700ms)</span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-2">
        <button
          onClick={isPlaying ? handleStop : handleStart}
          className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/25'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/25'
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
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
