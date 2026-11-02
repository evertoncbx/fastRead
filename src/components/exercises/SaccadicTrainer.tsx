import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, MoveHorizontal, CheckCircle2 } from 'lucide-react';
import { audio } from '../../services/audioService';
import { CountdownOverlay } from './CountdownOverlay';
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
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
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
    setShowCountdown(true);
  };

  const startActualJumps = () => {
    setShowCountdown(false);
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

  const handlePause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setJumpsCount(0);
    setIsFinished(false);
    setActiveSide('left');
  };

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-28 text-[#131F24]">
      {/* Contador Regressivo de 3 Segundos */}
      <CountdownOverlay
        isActive={showCountdown}
        onComplete={startActualJumps}
        title="Saltos Sacádicos"
      />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="btn-duo-white py-2 px-3 text-sm flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : <div />}
      </div>

      {/* Header Info */}
      <div className="card-duo p-5 mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0D4] border-2 border-[#FFD9A6] flex items-center justify-center text-[#E58500]">
              <MoveHorizontal className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#131F24]">
                Saltos Sacádicos
              </h2>
            </div>
          </div>

          <span className="text-xs font-black bg-[#FFF0D4] text-[#E58500] border-2 border-[#FFD9A6] px-3 py-1 rounded-full font-mono">
            {jumpsCount} / {targetJumps}
          </span>
        </div>
      </div>

      {/* ÁREA DOS SALTOS BILATERAIS COM PALAVRAS GRANDES */}
      <div className="card-duo p-8 min-h-[220px] bg-white flex items-center justify-between mb-4 relative select-none">
        {/* Lado Esquerdo */}
        <div className="w-1/2 flex items-center justify-center">
          {activeSide === 'left' && isPlaying && !isFinished && (
            <div className="text-2xl sm:text-4xl font-mono font-black text-[#1899D6] bg-[#DDF4FF] px-4 py-2 rounded-2xl border-2 border-[#B0E4FF] animate-in zoom-in-90 duration-100">
              {SAMPLE_WORDS[wordIndex]}
            </div>
          )}
        </div>

        {/* Separador Central */}
        <div className="w-0.5 h-24 bg-stone-200 rounded-full" />

        {/* Lado Direito */}
        <div className="w-1/2 flex items-center justify-center">
          {activeSide === 'right' && isPlaying && !isFinished && (
            <div className="text-2xl sm:text-4xl font-mono font-black text-[#58CC02] bg-[#D7FFB8] px-4 py-2 rounded-2xl border-2 border-[#A8EE69] animate-in zoom-in-90 duration-100">
              {SAMPLE_WORDS[wordIndex]}
            </div>
          )}
        </div>

        {isFinished && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center space-y-2 rounded-3xl animate-in fade-in">
            <CheckCircle2 className="w-12 h-12 text-[#58CC02] stroke-[2.5]" />
            <h3 className="text-xl font-black text-[#131F24]">Treino Finalizado!</h3>
            <p className="text-sm font-bold text-stone-400">{targetJumps} saltos completados</p>
          </div>
        )}
      </div>

      {/* Controle de Velocidade */}
      <div className="card-duo p-5 mb-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase text-stone-400">
          <span>Intervalo de Salto</span>
          <span className="font-mono text-sm text-[#131F24]">{speedMs} ms</span>
        </div>
        <div className="flex gap-2">
          {[
            { label: 'Rápido', ms: 350 },
            { label: 'Normal', ms: 500 },
            { label: 'Suave', ms: 700 }
          ].map((item) => (
            <button
              key={item.ms}
              onClick={() => setSpeedMs(item.ms)}
              className={`flex-1 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                speedMs === item.ms
                  ? 'bg-[#FF9600] border-b-2 border-[#E58500] text-white'
                  : 'btn-duo-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          title="Reiniciar"
          className="p-4 btn-duo-white flex items-center justify-center shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={isPlaying ? handlePause : handleStart}
          className={`flex-1 py-4 px-6 text-lg font-black flex items-center justify-center gap-2 cursor-pointer ${
            isPlaying ? 'btn-duo-yellow' : 'btn-duo-green'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-6 h-6 fill-current" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6 fill-current" />
              <span>{isFinished ? 'Reiniciar' : 'Começar'}</span>
            </>
          )}
        </button>
      </div>

      {isFinished && onComplete && (
        <button
          onClick={() => onComplete(0, 2)}
          className="w-full mt-4 py-4 px-6 btn-duo-green text-base font-black flex items-center justify-center gap-2 cursor-pointer animate-in fade-in"
        >
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span>Salvar Resultado do Treino</span>
        </button>
      )}
    </div>
  );
};
