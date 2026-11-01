import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, Trophy, Eye, Zap, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { audio } from '../../services/audioService';
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
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-24 text-[#f3efe8]">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#a39b8e] hover:text-[#f3efe8] transition-colors py-1 px-2.5 rounded-lg bg-[#1c1917] border border-[#2c2724]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : <div />}

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Alternar som"
            className="p-2 rounded-lg bg-[#1c1917] border border-[#2c2724] text-[#a39b8e] hover:text-[#f3efe8] transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-[#766f63]" />}
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] p-4 rounded-2xl border border-[#3d3834] mb-4 shadow-md">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#faf8f5] flex items-center gap-2">
              Tabela de Schulte
              {isDailyStep && <span className="text-xs bg-amber-500/15 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-[#a39b8e]">Expansão de visão periférica e percepção parafoveal</p>
          </div>
        </div>

        {/* Dica Científica */}
        <div className="mt-3 bg-[#131211]/80 p-2.5 rounded-xl border border-[#2c2724] text-xs text-[#d8d0c2] flex items-start gap-2">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#faf8f5]">Instrução:</strong> Mantenha o olhar fixo no <span className="text-amber-400 font-semibold">ponto central</span>. Use a visão periférica para encontrar os números de 1 até {totalNumbers} sem desviar o foco.
          </span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#1c1917] border border-[#2c2724] p-3 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#a39b8e] block font-medium">Próximo Alvo</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {isFinished ? '✓ CONCLUÍDO' : `${currentExpected} / ${totalNumbers}`}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-black text-amber-300 text-lg">
            {currentExpected <= totalNumbers ? currentExpected : '★'}
          </div>
        </div>

        <div className="bg-[#1c1917] border border-[#2c2724] p-3 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#a39b8e] block font-medium">Tempo Decorrido</span>
            <span className="text-2xl font-black text-amber-300 font-mono">
              {elapsedTime.toFixed(1)}s
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <RotateCcw className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Dimensão da Tabela */}
      {!isPlaying && (
        <div className="flex items-center justify-center gap-2 mb-4 bg-[#1c1917] p-1.5 rounded-xl border border-[#2c2724]">
          <span className="text-xs text-[#a39b8e] font-medium px-2">Dimensão:</span>
          {[3, 4, 5].map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                gridSize === size
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-[#a39b8e] hover:text-[#f3efe8] hover:bg-[#24211e]'
              }`}
            >
              {size}x{size} {size === 5 ? '(Padrão)' : ''}
            </button>
          ))}
        </div>
      )}

      {/* O Grid da Tabela de Schulte */}
      <div className="relative aspect-square w-full max-w-[360px] mx-auto bg-[#1c1917] p-3 rounded-2xl border-2 border-[#2c2724] shadow-xl flex items-center justify-center">
        {/* Ponto Central de Fixação Parafoveal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500/30 border border-amber-400 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping opacity-75" />
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
            const isCompleted = num < currentExpected;
            const isError = lastErrorIndex === idx;

            return (
              <button
                key={idx}
                disabled={!isPlaying || isFinished}
                onClick={() => handleCellClick(num, idx)}
                className={`flex items-center justify-center font-mono font-bold rounded-xl transition-all duration-150 select-none ${
                  gridSize === 3 ? 'text-2xl' : gridSize === 4 ? 'text-xl' : 'text-base'
                } ${
                  isCompleted
                    ? 'bg-[#131211]/40 text-[#585147] border border-[#1c1917] opacity-40'
                    : isError
                    ? 'bg-rose-700 text-white scale-95'
                    : isPlaying
                    ? 'bg-[#24211e] text-[#f3efe8] hover:bg-amber-600 hover:text-white border border-[#36322e] active:scale-95 shadow-sm'
                    : 'bg-[#24211e]/70 text-[#a39b8e] border border-[#2c2724]'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Overlay quando parado */}
        {!isPlaying && !isFinished && (
          <div className="absolute inset-0 bg-[#131211]/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-3 shadow-md">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-[#faf8f5] mb-1">Pronto para treinar a visão?</h3>
            <p className="text-xs text-[#d8d0c2] max-w-xs mb-5">
              Foque no ponto central da tabela. Localize os números em ordem crescente (1 a {totalNumbers}).
            </p>
            <button
              onClick={handleStart}
              className="w-full max-w-xs py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-900/30 active:scale-98 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Iniciar Tabela ({gridSize}x{gridSize})</span>
            </button>
          </div>
        )}

        {/* Overlay quando vitorioso */}
        {isFinished && (
          <div className="absolute inset-0 bg-[#131211]/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-14 h-14 rounded-full bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-center text-emerald-400 mb-2">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-[#faf8f5] mb-1">Excelente Foco Visual!</h3>
            <p className="text-xs text-[#a39b8e] mb-3">Tabela {gridSize}x{gridSize} concluída com sucesso.</p>

            <div className="bg-[#1c1917] border border-[#2c2724] py-3 px-6 rounded-xl mb-4 text-center">
              <span className="text-[11px] text-[#a39b8e] uppercase tracking-wider block font-medium">Tempo Total</span>
              <span className="text-3xl font-black text-emerald-400 font-mono">{elapsedTime.toFixed(1)}s</span>
            </div>

            <div className="flex gap-2 w-full max-w-xs">
              <button
                onClick={handleStart}
                className="flex-1 py-3 px-3 rounded-xl bg-[#24211e] hover:bg-[#2c2724] text-[#d8d0c2] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir</span>
              </button>
              {onComplete && (
                <button
                  onClick={() => onComplete(Number(elapsedTime.toFixed(2)))}
                  className="flex-1 py-3 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Avançar</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isPlaying && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleStop}
            className="py-2.5 px-6 rounded-xl bg-[#1c1917] border border-[#2c2724] text-[#a39b8e] hover:text-[#f3efe8] text-xs font-semibold flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar Tabela</span>
          </button>
        </div>
      )}
    </div>
  );
};
