import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, Layers, CheckCircle2 } from 'lucide-react';
import { READING_LIBRARY, getRandomExerciseText } from '../../data/texts';
import { storage } from '../../services/storageService';
import { ReadingText } from '../../types';
import { CountdownOverlay } from './CountdownOverlay';
import confetti from 'canvas-confetti';

interface ChunkingTrainerProps {
  customText?: ReadingText;
  onComplete?: (wpm: number, durationMinutes: number, textTitle?: string, textId?: string) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const ChunkingTrainer: React.FC<ChunkingTrainerProps> = ({ customText, onComplete, onBack, isDailyStep }) => {
  const [currentText, setCurrentText] = useState<ReadingText>(() => {
    if (customText) return customText;
    const exclusions = storage.getRecentReadTexts();
    return getRandomExerciseText(exclusions);
  });

  const [chunkSize, setChunkSize] = useState<number>(3);
  const [wpm, setWpm] = useState<number>(300);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

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

  const handleShuffleText = () => {
    setIsPlaying(false);
    setCurrentChunkIndex(0);
    setIsFinished(false);
    const exclusions = [currentText.id, currentText.title, ...storage.getRecentReadTexts()];
    const nextText = getRandomExerciseText(exclusions);
    storage.addRecentReadText(nextText.id, nextText.title);
    setCurrentText(nextText);
    if (chunkContainerRef.current) {
      chunkContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (activeChunkRef.current && chunkContainerRef.current) {
      const container = chunkContainerRef.current;
      const element = activeChunkRef.current;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // Posição vertical do bloco em relação à área visível do container
      const relativeTop = elementRect.top - containerRect.top;
      const relativeBottom = elementRect.bottom - containerRect.top;

      // Margens de conforto visual para blocos de leitura
      const isAboveComfortZone = relativeTop < 40 && container.scrollTop > 0;
      const isBelowComfortZone = relativeBottom > container.clientHeight - 80;

      if (isAboveComfortZone || isBelowComfortZone) {
        // Posiciona o bloco ativo no terço superior (~35% da altura)
        const targetRelativeTop = Math.max(24, container.clientHeight * 0.35);
        const delta = relativeTop - targetRelativeTop;
        const targetScrollTop = Math.max(0, container.scrollTop + delta);

        if (Math.abs(container.scrollTop - targetScrollTop) > 8) {
          container.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [currentChunkIndex, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentChunkIndex(prev => {
          const next = prev + 1;
          if (next >= chunks.length) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            setIsFinished(true);
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
            return prev;
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, intervalMs, chunks.length]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (isFinished) {
      setCurrentChunkIndex(0);
      setIsFinished(false);
      if (chunkContainerRef.current) {
        chunkContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setShowCountdown(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setShowCountdown(false);
    setCurrentChunkIndex(0);
    setIsFinished(false);
    if (chunkContainerRef.current) {
      chunkContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-32 text-[#131F24]">
      {/* Contador Regressivo de 3 Segundos */}
      <CountdownOverlay
        isActive={showCountdown}
        onComplete={() => {
          setShowCountdown(false);
          setIsPlaying(true);
        }}
        title="Leitura em Blocos"
      />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="btn-duo-white py-2.5 px-4 text-base font-black flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            <span>Voltar</span>
          </button>
        ) : <div />}
      </div>

      {/* Header Info */}
      <div className="card-duo p-5 mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6E8FF] border-2 border-[#E4B8FF] flex items-center justify-center text-[#A559D9]">
              <Layers className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#131F24]">
                Leitura em Blocos
              </h2>
            </div>
          </div>

          <span className="text-base font-black bg-[#F6E8FF] text-[#A559D9] border-2 border-[#E4B8FF] px-4 py-1.5 rounded-full font-mono">
            {wpm} PPM
          </span>
        </div>

        <div className="pt-2 border-t-2 border-stone-100 flex items-center justify-between text-sm font-bold text-stone-500">
          <span className="truncate pr-2 font-black text-[#131F24] text-base">{currentText.title}</span>
          <span className="shrink-0 font-mono text-sm">{currentChunkIndex + 1} de {chunks.length}</span>
        </div>
      </div>

      {/* ÁREA DE LEITURA EM BLOCOS COM TIPOGRAFIA GRANDE */}
      <div
        ref={chunkContainerRef}
        className="card-duo p-6 sm:p-8 bg-white min-h-[320px] max-h-[50vh] overflow-y-auto mb-4 font-reading text-2xl sm:text-3xl leading-relaxed text-[#131F24] select-none scroll-smooth"
      >
        <div className="flex flex-col gap-3.5 items-center text-center">
          {chunks.map((chunk, idx) => {
            const isActive = idx === currentChunkIndex;
            const isPast = idx < currentChunkIndex;

            return (
              <div
                key={idx}
                ref={isActive ? activeChunkRef : null}
                className={`py-2.5 px-5 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-[#F6E8FF] text-[#A559D9] border-2 border-[#CE82FF] font-black scale-105 shadow-sm'
                    : isPast
                    ? 'text-stone-300 font-medium'
                    : 'text-stone-700 font-medium'
                }`}
              >
                {chunk}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controles de Tamanho do Bloco e Velocidade */}
      <div className="card-duo p-5 mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black uppercase text-stone-400">Palavras por Bloco</span>
          <div className="flex gap-2">
            {[2, 3, 4].map((size) => (
              <button
                key={size}
                onClick={() => setChunkSize(size)}
                className={`py-1.5 px-3.5 rounded-xl text-sm font-black transition-all cursor-pointer ${
                  chunkSize === size
                    ? 'bg-[#CE82FF] border-b-2 border-[#A559D9] text-white'
                    : 'btn-duo-white'
                }`}
              >
                {size} palavras
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t-2 border-stone-100 flex items-center justify-between">
          <span className="text-sm font-black uppercase text-stone-400">Velocidade</span>
          <span className="text-2xl font-black text-[#A559D9] font-mono">{wpm} PPM</span>
        </div>

        <input
          type="range"
          min="150"
          max="600"
          step="25"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-[#CE82FF] h-3.5 bg-stone-100 rounded-lg cursor-pointer"
        />
      </div>

      {/* Botões de Ação */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          title="Reiniciar"
          className="p-4.5 btn-duo-white flex items-center justify-center shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={handlePlayPause}
          className={`flex-1 py-4.5 px-6 text-xl font-black flex items-center justify-center gap-2 cursor-pointer ${
            isPlaying ? 'btn-duo-yellow' : 'btn-duo-purple'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-7 h-7 fill-current" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-7 h-7 fill-current" />
              <span>{isFinished ? 'Reiniciar' : 'Começar'}</span>
            </>
          )}
        </button>
      </div>

      {isFinished && onComplete && (
        <button
          onClick={() => onComplete(wpm, 3, currentText.title, currentText.id)}
          className="w-full mt-4 py-4.5 px-6 btn-duo-green text-lg font-black flex items-center justify-center gap-2 cursor-pointer animate-in fade-in"
        >
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          <span>Salvar Resultado do Treino</span>
        </button>
      )}
    </div>
  );
};
