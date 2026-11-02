import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft, Clock, Zap, CheckCircle2, BookOpen } from 'lucide-react';
import { audio } from '../../services/audioService';
import { READING_LIBRARY } from '../../data/texts';
import { ReadingText } from '../../types';
import confetti from 'canvas-confetti';

interface MetronomeReaderProps {
  customText?: ReadingText;
  onComplete?: (wpm: number, durationMinutes: number) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const MetronomeReader: React.FC<MetronomeReaderProps> = ({ customText, onComplete, onBack, isDailyStep }) => {
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
    return 0;
  });
  const [bpm, setBpm] = useState<number>(200); // 120 a 380 BPM
  const [wordsPerBeat, setWordsPerBeat] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [, setIsAccentBeat] = useState<boolean>(false);
  const [beatCount, setBeatCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [sessionSeconds] = useState<number>(180);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(180);
  const [soundOn, setSoundOn] = useState<boolean>(audio.isEnabled());

  const currentText = availableTexts[selectedTextIndex] || availableTexts[0];

  const words = useMemo(() => {
    return currentText.text.split(/\s+/).filter(w => w.trim().length > 0);
  }, [currentText]);

  const calculatedWpm = bpm * wordsPerBeat;

  const metronomeTimerRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying && activeWordRef.current && wordsContainerRef.current) {
      const container = wordsContainerRef.current;
      const element = activeWordRef.current;
      const elementTop = element.offsetTop;
      const containerHeight = container.clientHeight;
      container.scrollTo({
        top: elementTop - containerHeight / 2,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isPlaying]);

  const startMetronome = () => {
    setIsPlaying(true);
    setIsFinished(false);

    countdownTimerRef.current = window.setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          stopMetronome();
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    let count = 0;
    metronomeTimerRef.current = window.setInterval(() => {
      count++;
      setBeatCount(count);
      const isAccent = count % 4 === 1;
      setIsAccentBeat(isAccent);
      audio.playMetronomeTick(isAccent);

      setCurrentIndex(prev => {
        const next = prev + wordsPerBeat;
        if (next >= words.length) {
          stopMetronome();
          handleSessionComplete();
          return words.length - 1;
        }
        return next;
      });
    }, Math.round((60 / bpm) * 1000));
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  };

  const handleSessionComplete = () => {
    setIsFinished(true);
    audio.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    stopMetronome();
    setCurrentIndex(0);
    setRemainingSeconds(sessionSeconds);
    setIsFinished(false);
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

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Alternar som"
            className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-2xs transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 mb-4 shadow-xs">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              Metrônomo Anti-Subvocalização
              {isDailyStep && <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-stone-500">Silenciando a voz interior com cadência rítmica forçada</p>
          </div>
        </div>

        {/* Instruções neurocientíficas */}
        <div className="mt-3 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-950 block mb-0.5">Técnica Comprovada:</strong>
            Mantenha a língua relaxada contra o céu da boca. Acompanhe a palavra destacada no ritmo do metrônomo. Não pronuncie as palavras mentalmente — confie na captação visual direta!
          </div>
        </div>
      </div>

      {/* Seletor de Textos */}
      <div className="mb-3 bg-white border border-stone-200 p-2.5 rounded-xl shadow-xs">
        <label className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          Texto Selecionado:
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

      {/* Controles de BPM & Velocidade */}
      <div className="bg-white border border-stone-200 p-3.5 rounded-2xl mb-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold">Velocidade Alvo</span>
            <span className="text-2xl font-black text-stone-900 font-mono flex items-center gap-2">
              {calculatedWpm} <span className="text-xs font-semibold text-emerald-700">PPM</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 block font-semibold">Tempo Restante</span>
            <span className="text-lg font-bold text-emerald-700 font-mono">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>

        {/* Slider de BPM */}
        <div className="space-y-1.5 mt-2">
          <div className="flex justify-between text-xs text-stone-500">
            <span>Cadência: {bpm} BPM</span>
            <span>{wordsPerBeat === 1 ? '1 palavra/batida' : '2 palavras/batida'}</span>
          </div>
          <input
            type="range"
            min="120"
            max="360"
            step="10"
            value={bpm}
            disabled={isPlaying}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-emerald-600 bg-stone-100 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>120 BPM (Iniciante)</span>
            <span>220 BPM (Acelerado)</span>
            <span>360 BPM (Turbo)</span>
          </div>
        </div>

        {/* Pulso Visual do Metrônomo (4 tempos) */}
        <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-stone-100">
          {[1, 2, 3, 4].map((step) => {
            const isActive = isPlaying && ((beatCount % 4) === (step % 4));
            return (
              <div
                key={step}
                className={`w-4 h-4 rounded-full transition-all duration-75 flex items-center justify-center ${
                  isActive
                    ? step === 1
                      ? 'bg-emerald-600 scale-125 shadow-xs shadow-emerald-500/50'
                      : 'bg-emerald-500 scale-110 shadow-xs'
                    : 'bg-stone-200'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Janela de Leitura com Cursor Rítmico */}
      <div className="relative bg-[#FCFBF8] border border-stone-200 rounded-2xl shadow-xs overflow-hidden mb-4 flex-1 min-h-[220px] max-h-[320px] flex flex-col">
        <div
          ref={wordsContainerRef}
          className="relative p-4 overflow-y-auto leading-relaxed text-sm md:text-base font-reading select-none space-x-1 space-y-1"
        >
          {words.map((word, idx) => {
            const isCurrent = idx >= currentIndex && idx < currentIndex + wordsPerBeat;
            const isPast = idx < currentIndex;

            return (
              <span
                key={idx}
                ref={isCurrent ? activeWordRef : null}
                className={`inline-block transition-all duration-75 rounded px-1.5 py-0.5 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white font-bold scale-105 shadow-xs'
                    : isPast
                    ? 'text-stone-400'
                    : 'text-stone-800'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Overlay se finalizou */}
        {isFinished && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">Excelente Ritmo Mantido!</h3>
            <p className="text-xs text-stone-500 mb-3">Sua subvocalização foi silenciada em prol da percepção visual.</p>
            <div className="bg-stone-50 border border-stone-200 py-2 px-5 rounded-xl mb-4 font-mono">
              <span className="text-[11px] text-stone-500 block">Velocidade Mantida</span>
              <span className="text-2xl font-black text-emerald-700">{calculatedWpm} PPM</span>
            </div>
            {onComplete && (
              <button
                onClick={() => onComplete(calculatedWpm, Math.max(1, Math.round((sessionSeconds - remainingSeconds) / 60)))}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Concluir Exercício</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Barra de Ação Principal */}
      <div className="flex gap-2">
        <button
          onClick={isPlaying ? stopMetronome : startMetronome}
          className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
            isPlaying
              ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 fill-current" />
              <span>Pausar Metrônomo</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Iniciar Ritmo ({calculatedWpm} PPM)</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          aria-label="Reiniciar texto"
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
