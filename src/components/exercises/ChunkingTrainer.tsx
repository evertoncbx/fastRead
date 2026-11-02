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
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              Leitura em Blocos (Chunking)
              {isDailyStep && <span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-stone-500">Expansão de fixação ocular e agrupamento de sintagmas</p>
          </div>
        </div>

        {/* Dica da técnica */}
        <div className="mt-3 bg-teal-50/80 p-2.5 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-start gap-2">
          <Zap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>
            <strong className="text-teal-950">Instrução:</strong> Em vez de olhar para cada palavra individualmente, foque seus olhos no meio de cada <span className="text-teal-700 font-bold">bloco destacado</span>, absorvendo o grupo como uma única unidade conceitual.
          </span>
        </div>
      </div>

      {/* Seletor de Textos */}
      <div className="mb-3 bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
        <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          Texto de Treino:
        </label>
        <select
          value={selectedTextIndex}
          disabled={isPlaying}
          onChange={(e) => {
            setSelectedTextIndex(Number(e.target.value));
            handleReset();
          }}
          className="w-full bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-3 text-xs text-stone-800 font-medium focus:bg-white focus:outline-none focus:border-emerald-500"
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
        <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold mb-1.5">Bloco Ocular</span>
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
                    ? 'bg-teal-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                {size} pal.
              </button>
            ))}
          </div>
        </div>

        {/* Velocidade PPM */}
        <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold mb-1">Velocidade</span>
          <span className="text-xl font-black text-stone-900 font-mono">{wpm} <span className="text-xs text-teal-700">PPM</span></span>
        </div>
      </div>

      {/* Slider de Velocidade */}
      <div className="bg-white border border-stone-200 p-3 rounded-xl mb-4 shadow-xs">
        <input
          type="range"
          min="180"
          max="600"
          step="20"
          value={wpm}
          disabled={isPlaying}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-teal-600 bg-stone-100 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
          <span>180 PPM (Leve)</span>
          <span>350 PPM (Acelerado)</span>
          <span>600 PPM (Turbo)</span>
        </div>
      </div>

      {/* Coluna Centralizada de Blocos de Leitura */}
      <div className="relative bg-[#FCFBF8] border border-stone-200 rounded-2xl shadow-xs overflow-hidden mb-4 flex-1 min-h-[220px] max-h-[340px] flex flex-col">
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
                    ? 'bg-teal-600 text-white font-bold text-lg scale-105 shadow-xs ring-2 ring-teal-400'
                    : isPast
                    ? 'text-stone-300 text-sm opacity-60'
                    : 'text-stone-700 text-sm'
                }`}
              >
                {chunk}
              </div>
            );
          })}
        </div>

        {/* Overlay se concluído */}
        {isFinished && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">Treino em Blocos Concluído!</h3>
            <p className="text-xs text-stone-500 mb-3">Sua fóvea ocular foi exercitada para capturar {chunkSize} palavras por fixação.</p>
            {onComplete && (
              <button
                onClick={() => onComplete(wpm, Math.max(1, Math.round((chunks.length * chunkSize) / wpm)))}
                className="py-2.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
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
          className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
            isPlaying
              ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
              : 'bg-teal-600 hover:bg-teal-700 text-white'
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
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
