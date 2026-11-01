import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, Layers, Zap, BookOpen, CheckCircle2 } from 'lucide-react';
import { READING_LIBRARY } from '../../data/texts';
import { ReadingText } from '../../types';
import confetti from 'canvas-confetti';

interface ChunkingTrainerProps {
  customText?: ReadingText;
  onComplete?: (wpm: number, durationMinutes: number) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const ChunkingTrainer: React.FC<ChunkingTrainerProps> = ({ customText, onComplete, onBack, isDailyStep }) => {
  const availableTexts = useMemo(() => {
    if (customText && !READING_LIBRARY.some(t => t.id === customText.id)) {
      return [customText, ...READING_LIBRARY];
    }
    return READING_LIBRARY;
  }, [customText]);

  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(() => {
    if (customText) {
      const idx = READING_LIBRARY.findIndex(t => t.id === customText.id);
      return idx >= 0 ? idx : 0;
    }
    return 3;
  });
  const [chunkSize, setChunkSize] = useState<number>(3);
  const [wpm, setWpm] = useState<number>(300);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentText = availableTexts[selectedTextIndex] || availableTexts[0];

  const chunks = useMemo(() => {
    const allWords = currentText.text.split(/\s+/).filter(w => w.trim().length > 0);
    const groups: string[] = [];
    for (let i = 0; i < allWords.length; i += chunkSize) {
      groups.push(allWords.slice(i, i + chunkSize).join(' '));
    }
    return groups;
  }, [currentText, chunkSize]);

  const timerRef = useRef<number | null>(null);
  const chunkContainerRef = useRef<HTMLDivElement>(null);
  const activeChunkRef = useRef<HTMLDivElement>(null);

  const intervalMs = Math.round((chunkSize / wpm) * 60 * 1000);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying && activeChunkRef.current && chunkContainerRef.current) {
      const container = chunkContainerRef.current;
      const element = activeChunkRef.current;
      container.scrollTo({
        top: element.offsetTop - container.clientHeight / 2 + element.clientHeight / 2,
        behavior: 'smooth'
      });
    }
  }, [currentChunkIndex, isPlaying]);

  const handleStart = () => {
    if (currentChunkIndex >= chunks.length - 1) {
      setCurrentChunkIndex(0);
    }
    setIsPlaying(true);
    setIsFinished(false);

    timerRef.current = window.setInterval(() => {
      setCurrentChunkIndex(prev => {
        const next = prev + 1;
        if (next >= chunks.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsPlaying(false);
          setIsFinished(true);
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
          return chunks.length - 1;
        }
        return next;
      });
    }, intervalMs);
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleReset = () => {
    handleStop();
    setCurrentChunkIndex(0);
    setIsFinished(false);
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
      </div>

      {/* Header Info */}
      <div className="bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] p-4 rounded-2xl border border-[#3d3834] mb-4 shadow-md">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#faf8f5] flex items-center gap-2">
              Leitura em Blocos (Chunking)
              {isDailyStep && <span className="text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-[#a39b8e]">Expansão de fixação ocular e agrupamento de sintagmas</p>
          </div>
        </div>

        {/* Dica da técnica */}
        <div className="mt-3 bg-[#131211]/80 p-2.5 rounded-xl border border-[#2c2724] text-xs text-[#d8d0c2] flex items-start gap-2">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#faf8f5]">Instrução:</strong> Em vez de olhar para cada palavra individualmente, foque seus olhos no meio de cada <span className="text-emerald-400 font-bold">bloco destacado</span>, absorvendo o grupo como uma única unidade conceitual.
          </span>
        </div>
      </div>

      {/* Seletor de Textos */}
      <div className="mb-3 bg-[#1c1917] border border-[#2c2724] p-2.5 rounded-xl">
        <label className="text-[11px] uppercase tracking-wider text-[#a39b8e] font-medium block mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Texto de Treino:
        </label>
        <select
          value={selectedTextIndex}
          disabled={isPlaying}
          onChange={(e) => {
            setSelectedTextIndex(Number(e.target.value));
            handleReset();
          }}
          className="w-full bg-[#131211] border border-[#2c2724] rounded-lg py-1.5 px-3 text-xs text-[#f3efe8] font-medium focus:outline-none focus:border-amber-500"
        >
          {availableTexts.map((item, idx) => (
            <option key={item.id} value={idx}>
              {item.title} ({item.author})
            </option>
          ))}
        </select>
      </div>

      {/* Controles de Configuração */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Tamanho do Bloco */}
        <div className="bg-[#1c1917] border border-[#2c2724] p-3 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-[#a39b8e] block font-medium mb-1.5">Bloco Ocular</span>
          <div className="flex gap-1.5">
            {[2, 3, 4].map((size) => (
              <button
                key={size}
                disabled={isPlaying}
                onClick={() => {
                  setChunkSize(size);
                  handleReset();
                }}
                className={`flex-1 py-1 px-1.5 text-xs font-bold rounded-lg transition-all ${
                  chunkSize === size
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#24211e] text-[#a39b8e] hover:text-[#f3efe8]'
                }`}
              >
                {size} pal.
              </button>
            ))}
          </div>
        </div>

        {/* Velocidade PPM */}
        <div className="bg-[#1c1917] border border-[#2c2724] p-3 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-[#a39b8e] block font-medium mb-1">Velocidade</span>
          <span className="text-xl font-black text-[#faf8f5] font-mono">{wpm} <span className="text-xs text-emerald-400">PPM</span></span>
        </div>
      </div>

      {/* Slider de Velocidade */}
      <div className="bg-[#1c1917] border border-[#2c2724] p-3 rounded-xl mb-4">
        <input
          type="range"
          min="180"
          max="600"
          step="20"
          value={wpm}
          disabled={isPlaying}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-emerald-500 bg-[#24211e] h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#766f63] font-mono mt-1">
          <span>180 PPM (Leve)</span>
          <span>350 PPM (Acelerado)</span>
          <span>600 PPM (Turbo)</span>
        </div>
      </div>

      {/* Coluna Centralizada de Blocos de Leitura */}
      <div className="relative bg-[#1c1917] border border-[#2c2724] rounded-2xl shadow-xl overflow-hidden mb-4 flex-1 min-h-[220px] max-h-[340px] flex flex-col">
        <div
          ref={chunkContainerRef}
          className="p-5 overflow-y-auto space-y-3.5 flex flex-col items-center font-reading"
        >
          {chunks.map((chunk, idx) => {
            const isCurrent = idx === currentChunkIndex;
            const isPast = idx < currentChunkIndex;

            return (
              <div
                key={idx}
                ref={isCurrent ? activeChunkRef : null}
                className={`py-2 px-4 rounded-xl text-center font-medium transition-all duration-150 max-w-[280px] w-full ${
                  isCurrent
                    ? 'bg-emerald-700 text-white font-bold text-lg scale-105 shadow-md ring-2 ring-emerald-400'
                    : isPast
                    ? 'text-[#766f63] text-sm opacity-60'
                    : 'text-[#a39b8e] text-sm'
                }`}
              >
                {chunk}
              </div>
            );
          })}
        </div>

        {/* Overlay se concluído */}
        {isFinished && (
          <div className="absolute inset-0 bg-[#131211]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#faf8f5] mb-1">Treino em Blocos Concluído!</h3>
            <p className="text-xs text-[#a39b8e] mb-3">Sua fóvea ocular foi exercitada para capturar {chunkSize} palavras por fixação.</p>
            {onComplete && (
              <button
                onClick={() => onComplete(wpm, Math.max(1, Math.round((chunks.length * chunkSize) / wpm)))}
                className="py-2.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Continuar</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-2">
        <button
          onClick={isPlaying ? handleStop : handleStart}
          className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
            isPlaying
              ? 'bg-[#2c2724] hover:bg-[#36322e] text-[#f3efe8]'
              : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-emerald-900/30'
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
              <span>Iniciar Blocos ({wpm} PPM)</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          aria-label="Reiniciar"
          className="p-3.5 rounded-xl bg-[#1c1917] border border-[#2c2724] text-[#a39b8e] hover:text-[#f3efe8] transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
