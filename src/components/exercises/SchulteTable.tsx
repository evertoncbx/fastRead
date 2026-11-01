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
  const [gridSize, setGridSize] = useState<number>(5); // 3x3, 4x4, 5x5
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

  // Gerar grid aleatório
  const generateGrid = (size: number) => {
    const total = size * size;
    const array: number[] = [];
    for (let i = 1; i <= total; i++) {
      array.push(i);
    }
    // Fisher-Yates shuffle
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
        // Vitória!
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
        // onComplete será acionado pelo botão 'Avançar' no overlay de vitória!
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

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Alternar som"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-brand-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-4 rounded-2xl border border-slate-800 mb-4 shadow-lg">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Tabela de Schulte
              {isDailyStep && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Jornada Diária</span>}
            </h2>
            <p className="text-xs text-slate-400">Expansão de visão periférica e percepção parafoveal</p>
          </div>
        </div>

        {/* Dica Científica */}
        <div className="mt-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Instrução Científica:</strong> Mantenha o olhar fixo no <span className="text-amber-400 font-semibold">ponto central</span>. Use a visão periférica para encontrar os números de 1 até {totalNumbers} sem mover a cabeça.
          </span>
        </div>
      </div>

      {/* Status Bar: Próximo Número & Cronômetro */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Próximo Alvo</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {isFinished ? '✓ CONCLUÍDO' : `${currentExpected} / ${totalNumbers}`}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-black text-amber-300 text-lg">
            {currentExpected <= totalNumbers ? currentExpected : '★'}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Tempo Decorrido</span>
            <span className="text-2xl font-black text-indigo-400 font-mono">
              {elapsedTime.toFixed(1)}s
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
            <RotateCcw className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Grid Size Selector */}
      {!isPlaying && (
        <div className="flex items-center justify-center gap-2 mb-4 bg-slate-900/70 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium px-2">Dimensão:</span>
          {[3, 4, 5].map((size) => (
            <button
              key={size}
              onClick={() => {
                setGridSize(size);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                gridSize === size
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {size}x{size} {size === 5 ? '(Padrão)' : ''}
            </button>
          ))}
        </div>
      )}

      {/* O Grid da Tabela de Schulte */}
      <div className="relative aspect-square w-full max-w-[360px] mx-auto bg-slate-900 p-3 rounded-2xl border-2 border-slate-800 shadow-2xl flex items-center justify-center">
        {/* Ponto Central de Fixação Parafoveal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400/30 border border-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
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
                    ? 'bg-slate-950/40 text-slate-600 border border-slate-900 opacity-40'
                    : isError
                    ? 'bg-rose-600 text-white scale-95 animate-shake'
                    : isPlaying
                    ? 'bg-slate-800/90 text-slate-100 hover:bg-indigo-600 hover:text-white border border-slate-700/80 active:scale-95 shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-800'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Overlay quando parado */}
        {!isPlaying && !isFinished && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 shadow-lg">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Pronto para treinar a visão?</h3>
            <p className="text-xs text-slate-300 max-w-xs mb-5">
              Foque no ponto central da tabela. Localize os números em ordem crescente (1 a {totalNumbers}).
            </p>
            <button
              onClick={handleStart}
              className="w-full max-w-xs py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-98 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Iniciar Tabela ({gridSize}x{gridSize})</span>
            </button>
          </div>
        )}

        {/* Overlay quando vitorioso */}
        {isFinished && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-white mb-1">Excelente Foco Visual!</h3>
            <p className="text-xs text-slate-300 mb-3">Tabela {gridSize}x{gridSize} concluída com sucesso.</p>

            <div className="bg-slate-900 border border-slate-800 py-3 px-6 rounded-xl mb-4 text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Tempo Total</span>
              <span className="text-3xl font-black text-emerald-400 font-mono">{elapsedTime.toFixed(1)}s</span>
            </div>

            <div className="flex gap-2 w-full max-w-xs">
              <button
                onClick={handleStart}
                className="flex-1 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir</span>
              </button>
              {onComplete && (
                <button
                  onClick={() => onComplete(Number(elapsedTime.toFixed(2)))}
                  className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Avançar</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controles de Jogo */}
      {isPlaying && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleStop}
            className="py-2.5 px-6 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar Tabela</span>
          </button>
        </div>
      )}
    </div>
  );
};
