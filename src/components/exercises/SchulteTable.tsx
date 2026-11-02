import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, Trophy, Eye, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { audio } from '../../services/audioService';
import { CountdownOverlay } from './CountdownOverlay';
import confetti from 'canvas-confetti';

interface SchulteTableProps {
  onComplete?: (timeSeconds: number) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const SchulteTable: React.FC<SchulteTableProps> = ({ onComplete, onBack, isDailyStep }) => {
  const [gridSize, setGridSize] = useState<number>(5);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentExpected, setCurrentExpected] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [lastErrorIndex, setLastErrorIndex] = useState<number | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(audio.isEnabled());

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const totalNumbers = gridSize * gridSize;

  const generateGrid = (size: number) => {
    const total = size * size;
    const array: number[] = [];
    for (let i = 1; i <= total; i++) {
      array.push(i);
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setNumbers(array);
    setCurrentExpected(1);
    setIsFinished(false);
    setElapsedTime(0);
    setLastErrorIndex(null);
  };

  useEffect(() => {
    generateGrid(gridSize);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gridSize]);

  const handleStart = () => {
    setShowCountdown(true);
  };

  const startActualGame = () => {
    setShowCountdown(false);
    generateGrid(gridSize);
    setIsPlaying(true);
    startTimeRef.current = performance.now();
    timerRef.current = window.setInterval(() => {
      const now = performance.now();
      setElapsedTime((now - startTimeRef.current) / 1000);
    }, 50);
  };

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowCountdown(false);
    setIsPlaying(false);
  };

  const handleCellClick = (num: number, index: number) => {
    if (!isPlaying || isFinished) return;

    if (num === currentExpected) {
      audio.playClick();
      setLastErrorIndex(null);
      if (currentExpected === totalNumbers) {
        if (timerRef.current) clearInterval(timerRef.current);
        const finalTime = (performance.now() - startTimeRef.current) / 1000;
        setElapsedTime(finalTime);
        setIsPlaying(false);
        setIsFinished(true);
        audio.playSuccess();
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        setCurrentExpected(prev => prev + 1);
      }
    } else {
      audio.playError();
      setLastErrorIndex(index);
      setTimeout(() => setLastErrorIndex(null), 400);
    }
  };

  const toggleSound = () => {
    const s = audio.toggleSound();
    setSoundOn(s);
  };

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-28 text-[#131F24]">
      {/* Contador Regressivo de 3 Segundos */}
      <CountdownOverlay
        isActive={showCountdown}
        onComplete={startActualGame}
        title="Tabela de Schulte"
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

        <button
          onClick={toggleSound}
          aria-label="Alternar som"
          className="p-2 rounded-2xl bg-white border-2 border-stone-200 border-b-4 border-b-stone-300 text-stone-600 cursor-pointer"
        >
          {soundOn ? <Volume2 className="w-5 h-5 text-[#58CC02]" /> : <VolumeX className="w-5 h-5 text-stone-400" />}
        </button>
      </div>

      {/* Header Info */}
      <div className="card-duo p-5 mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8D9] border-2 border-[#FFE680] flex items-center justify-center text-[#B8860B]">
              <Eye className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#131F24]">
                Tabela de Schulte
              </h2>
            </div>
          </div>

          <span className="text-xs font-black bg-[#FFF8D9] text-[#B8860B] border-2 border-[#FFE680] px-3 py-1 rounded-full">
            {gridSize}x{gridSize}
          </span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card-duo p-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-400 block font-black">Próximo Número</span>
            <span className="text-3xl font-black text-[#58CC02] font-mono">
              {isFinished ? '✓ FIM' : currentExpected}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#D7FFB8] border-2 border-[#A8EE69] flex items-center justify-center font-black text-[#46A302] text-2xl">
            {currentExpected <= totalNumbers ? currentExpected : '★'}
          </div>
        </div>

        <div className="card-duo p-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-400 block font-black">Tempo</span>
            <span className="text-3xl font-black text-[#131F24] font-mono">
              {elapsedTime.toFixed(1)}s
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-stone-100 border-2 border-stone-200 flex items-center justify-center text-stone-500 font-bold">
            <RotateCcw className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Dimensão da Tabela */}
      {!isPlaying && (
        <div className="flex items-center justify-center gap-2 mb-4 bg-white p-2 rounded-2xl border-2 border-stone-200">
          <span className="text-xs font-black text-stone-400 px-2">Grade:</span>
          {[3, 4, 5].map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`py-1.5 px-4 text-xs font-black rounded-xl transition-all cursor-pointer ${
                gridSize === size
                  ? 'bg-[#FFC800] border-b-2 border-[#E5A500] text-white'
                  : 'btn-duo-white'
              }`}
            >
              {size}x{size} {size === 5 ? '(Padrão)' : ''}
            </button>
          ))}
        </div>
      )}

      {/* O Grid da Tabela de Schulte */}
      <div className="relative aspect-square w-full max-w-[380px] mx-auto bg-stone-100 p-3 rounded-3xl border-2 border-stone-200 mb-4 flex items-center justify-center">
        {/* Ponto Central de Fixação */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="w-4 h-4 rounded-full bg-[#58CC02]/30 border-2 border-[#58CC02] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#58CC02]" />
          </div>
        </div>

        <div
          className="grid gap-2 w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
          }}
        >
          {numbers.map((num, idx) => {
            const isClicked = num < currentExpected;
            const isError = lastErrorIndex === idx;

            return (
              <button
                key={idx}
                disabled={!isPlaying || isFinished}
                onClick={() => handleCellClick(num, idx)}
                className={`flex items-center justify-center rounded-2xl font-mono font-black transition-all select-none cursor-pointer ${
                  gridSize === 3 ? 'text-3xl' : gridSize === 4 ? 'text-2xl' : 'text-xl'
                } ${
                  isError
                    ? 'bg-[#FF4B4B] text-white border-2 border-[#EA2B2B] scale-95'
                    : isClicked
                    ? 'bg-[#D7FFB8] text-[#46A302] border-2 border-[#A8EE69] opacity-80'
                    : 'bg-white text-[#131F24] border-2 border-stone-200 border-b-4 border-b-stone-300 hover:bg-stone-50 active:border-b-2 active:translate-y-[2px]'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controles Play / Stop */}
      <div className="flex gap-3">
        {!isPlaying ? (
          <button
            onClick={handleStart}
            className="flex-1 py-4 px-6 btn-duo-green text-lg font-black flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>Começar Treino</span>
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex-1 py-4 px-6 btn-duo-yellow text-lg font-black flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Pausar</span>
          </button>
        )}
      </div>

      {isFinished && onComplete && (
        <button
          onClick={() => onComplete(elapsedTime)}
          className="w-full mt-4 py-4 px-6 btn-duo-green text-base font-black flex items-center justify-center gap-2 cursor-pointer animate-in fade-in"
        >
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span>Salvar Resultado ({elapsedTime.toFixed(1)}s)</span>
        </button>
      )}
    </div>
  );
};
