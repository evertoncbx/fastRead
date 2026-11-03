import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { audio } from '../../services/audioService';
import { READING_LIBRARY, getRandomExerciseText } from '../../data/texts';
import { storage } from '../../services/storageService';
import { ReadingText } from '../../types';
import { CountdownOverlay } from './CountdownOverlay';
import confetti from 'canvas-confetti';

interface MetronomeReaderProps {
  customText?: ReadingText;
  onComplete?: (wpm: number, durationMinutes: number, textTitle?: string, textId?: string) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const MetronomeReader: React.FC<MetronomeReaderProps> = ({ customText, onComplete, onBack, isDailyStep }) => {
  const [currentText, setCurrentText] = useState<ReadingText>(() => {
    if (customText) return customText;
    const exclusions = storage.getRecentReadTexts();
    return getRandomExerciseText(exclusions);
  });

  const [bpm, setBpm] = useState<number>(200); // 120 a 380 BPM
  const [wordsPerBeat] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [, setIsAccentBeat] = useState<boolean>(false);
  const [beatCount, setBeatCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [sessionSeconds] = useState<number>(180);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(180);
  const [soundOn, setSoundOn] = useState<boolean>(audio.isEnabled());

  const { words, paragraphs } = useMemo(() => {
    const rawParagraphs = currentText.text
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    let wordCounter = 0;
    const structuredParagraphs: {
      paragraphIndex: number;
      words: { text: string; globalIndex: number }[];
    }[] = [];

    const allWords: string[] = [];

    rawParagraphs.forEach((pText, pIdx) => {
      const pWords = pText.split(/\s+/).filter(w => w.trim().length > 0);
      const paragraphWordItems: { text: string; globalIndex: number }[] = [];

      pWords.forEach(w => {
        allWords.push(w);
        paragraphWordItems.push({
          text: w,
          globalIndex: wordCounter++
        });
      });

      if (paragraphWordItems.length > 0) {
        structuredParagraphs.push({
          paragraphIndex: pIdx,
          words: paragraphWordItems
        });
      }
    });

    return { words: allWords, paragraphs: structuredParagraphs };
  }, [currentText]);

  const calculatedWpm = bpm * wordsPerBeat;

  const metronomeTimerRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  const handleShuffleText = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setIsFinished(false);
    const exclusions = [currentText.id, currentText.title, ...storage.getRecentReadTexts()];
    const nextText = getRandomExerciseText(exclusions);
    storage.addRecentReadText(nextText.id, nextText.title);
    setCurrentText(nextText);
    if (wordsContainerRef.current) {
      wordsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (activeWordRef.current && wordsContainerRef.current) {
      const container = wordsContainerRef.current;
      const element = activeWordRef.current;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // Posição vertical do elemento ativo em relação à janela visível do container
      const relativeTop = elementRect.top - containerRect.top;
      const relativeBottom = elementRect.bottom - containerRect.top;

      // Margens de conforto visual:
      // - Se o elemento estiver muito perto do topo (< 40px) e o container já tiver sido rolado
      // - Se o elemento estiver avançando na parte inferior (> container.clientHeight - 80px)
      const isAboveComfortZone = relativeTop < 40 && container.scrollTop > 0;
      const isBelowComfortZone = relativeBottom > container.clientHeight - 80;

      if (isAboveComfortZone || isBelowComfortZone) {
        // Posiciona a linha ativa no terço superior (~30% da altura visível) com visão livre para as próximas linhas
        const targetRelativeTop = Math.max(24, container.clientHeight * 0.3);
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
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const beatIntervalMs = (60 / bpm) * 1000;
      let localBeat = beatCount;

      metronomeTimerRef.current = window.setInterval(() => {
        localBeat++;
        setBeatCount(localBeat);
        const isAccent = localBeat % 4 === 1;
        setIsAccentBeat(isAccent);

        if (soundOn) {
          if (isAccent) audio.playMetronomeTick(true);
          else audio.playMetronomeTick(false);
        }

        setCurrentIndex(prev => {
          const next = prev + wordsPerBeat;
          if (next >= words.length) {
            handleCompleteSession();
            return words.length - 1;
          }
          return next;
        });
      }, beatIntervalMs);

      countdownTimerRef.current = window.setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            handleCompleteSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    }

    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [isPlaying, bpm, wordsPerBeat, soundOn, words.length]);

  const handleCompleteSession = () => {
    if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setIsPlaying(false);
    setIsFinished(true);
    audio.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (isFinished) {
      setCurrentIndex(0);
      setRemainingSeconds(sessionSeconds);
      setIsFinished(false);
      if (wordsContainerRef.current) {
        wordsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setShowCountdown(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setShowCountdown(false);
    setCurrentIndex(0);
    setRemainingSeconds(sessionSeconds);
    setIsFinished(false);
    if (wordsContainerRef.current) {
      wordsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const s = audio.toggleSound();
    setSoundOn(s);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
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
        title="Metrônomo Rítmico"
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

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Alternar som"
            className="p-2.5 rounded-2xl bg-white border-2 border-stone-200 border-b-4 border-b-stone-300 text-stone-600 cursor-pointer"
          >
            {soundOn ? <Volume2 className="w-5 h-5 text-[#58CC02]" /> : <VolumeX className="w-5 h-5 text-stone-400" />}
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="card-duo p-5 mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D7FFB8] border-2 border-[#A8EE69] flex items-center justify-center text-[#46A302]">
              <Zap className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#131F24]">
                Metrônomo Rítmico
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#D7FFB8] text-[#46A302] border-2 border-[#A8EE69] px-3.5 py-1.5 rounded-full text-sm font-black font-mono">
              <span>{calculatedWpm} PPM</span>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 border-2 border-stone-200 px-3 py-1.5 rounded-full text-sm font-mono font-black text-stone-600">
              <Clock className="w-4 h-4" />
              <span>{formatTime(remainingSeconds)}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t-2 border-stone-100 flex items-center justify-between text-sm font-bold text-stone-500">
          <span className="truncate pr-2 font-black text-[#131F24] text-base">{currentText.title}</span>
          <span className="shrink-0 font-mono text-sm">{currentIndex + 1} de {words.length}</span>
        </div>
      </div>

      {/* ÁREA DE LEITURA COM PALAVRA DESTACADA EM DUOLINGO GREEN */}
      <div
        ref={wordsContainerRef}
        className="card-duo p-6 sm:p-8 bg-white min-h-[320px] max-h-[50vh] overflow-y-auto mb-4 font-reading text-2xl sm:text-3xl leading-[2.2] text-[#131F24] select-none scroll-smooth"
      >
        <div className="space-y-6">
          {paragraphs.map((p) => (
            <div key={p.paragraphIndex} className="flex flex-wrap gap-x-2.5 gap-y-3.5 items-center">
              {p.words.map(({ text, globalIndex }) => {
                const isActive = globalIndex === currentIndex;
                const isPast = globalIndex < currentIndex;

                return (
                  <span
                    key={globalIndex}
                    ref={isActive ? activeWordRef : null}
                    className={`inline-block rounded-xl px-2 py-0.5 font-bold transition-colors duration-100 ${
                      isActive
                        ? 'bg-[#58CC02] text-white shadow-xs'
                        : isPast
                        ? 'text-stone-300'
                        : 'text-[#131F24]'
                    }`}
                  >
                    {text}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Controle de Cadência (BPM) */}
      <div className="card-duo p-5 mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black uppercase text-stone-400">Cadência Rítmica</span>
          <span className="text-2xl font-black text-[#46A302] font-mono">{bpm} BPM ({calculatedWpm} PPM)</span>
        </div>

        <input
          type="range"
          min="120"
          max="360"
          step="10"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full accent-[#58CC02] h-3.5 bg-stone-100 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between gap-2">
          {[160, 220, 280, 340].map((preset) => (
            <button
              key={preset}
              onClick={() => setBpm(preset)}
              className={`flex-1 py-2 rounded-2xl text-sm font-black transition-all cursor-pointer ${
                bpm === preset
                  ? 'bg-[#58CC02] border-b-2 border-[#46A302] text-white'
                  : 'btn-duo-white'
              }`}
            >
              {preset} BPM
            </button>
          ))}
        </div>
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
            isPlaying ? 'btn-duo-yellow' : 'btn-duo-green'
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
          onClick={() => onComplete(calculatedWpm, 3, currentText.title, currentText.id)}
          className="w-full mt-4 py-4.5 px-6 btn-duo-green text-lg font-black flex items-center justify-center gap-2 cursor-pointer animate-in fade-in"
        >
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          <span>Salvar Resultado do Treino</span>
        </button>
      )}
    </div>
  );
};
