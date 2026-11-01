import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft, Clock, Zap, CheckCircle2, BookOpen } from 'lucide-react';
import { audio } from '../../services/audioService';
import { READING_LIBRARY } from '../../data/texts';
import confetti from 'canvas-confetti';

interface MetronomeReaderProps {
  onComplete?: (wpm: number, durationMinutes: number) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const MetronomeReader: React.FC<MetronomeReaderProps> = ({ onComplete, onBack, isDailyStep }) => {
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(200); // 120 a 380 BPM
  const [wordsPerBeat, setWordsPerBeat] = useState<number>(1); // 1 ou 2 palavras por batida
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAccentBeat, setIsAccentBeat] = useState<boolean>(false);
  const [beatCount, setBeatCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [sessionSeconds, setSessionSeconds] = useState<number>(180); // 3 minutos default
  const [remainingSeconds, setRemainingSeconds] = useState<number>(180);
  const [soundOn, setSoundOn] = useState<boolean>(audio.isEnabled());

  const currentText = READING_LIBRARY[selectedTextIndex];
  
  // Dividir o texto em palavras
  const words = useMemo(() => {
    return currentText.text.split(/\s+/).filter(w => w.trim().length > 0);
  }, [currentText]);

  // Intervalo em ms para cada batida do metrônomo: (60 / bpm) * 1000
  const intervalMs = Math.round((60 / bpm) * 1000);
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

  // Rolagem suave para manter a palavra ativa sempre visível
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

    // Timer de contagem regressiva da sessão
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

    // Loop do Metrônomo
    let count = 0;
    metronomeTimerRef.current = window.setInterval(() => {
      count++;
      setBeatCount(count);
      const isAccent = count % 4 === 1;
      setIsAccentBeat(isAccent);
      audio.playMetronomeTick(isAccent);

      // Avançar palavra
      setCurrentIndex(prev => {
        const next = prev + wordsPerBeat;
        if (next >= words.length) {
          // Chegou ao fim do texto
          stopMetronome();
          handleSessionComplete();
          return words.length - 1;
        }
        return next;
      });
    }, intervalMs);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  };

  const handleReset = () => {
    stopMetronome();
    setCurrentIndex(0);
    setRemainingSeconds(sessionSeconds);
    setBeatCount(0);
    setIsFinished(false);
  };

  const handleSessionComplete = () => {
    setIsFinished(true);
    audio.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    if (onComplete) {
      onComplete(calculatedWpm, Math.round((sessionSeconds - remainingSeconds) / 60) || 1);
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
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Metrônomo Anti-Subvocalização
              {isDailyStep && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-slate-400">Silenciando a voz interna com cadência rítmica forçada</p>
          </div>
        </div>

        {/* Instruções neurocientíficas */}
        <div className="mt-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
          <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Técnica Comprovada:</strong>
            Mantenha a língua relaxada contra o céu da boca. Acompanhe a palavra destacada no ritmo do metrônomo. Não pronuncie as palavras mentalmente — confie na captação visual imediata!
          </div>
        </div>
      </div>

      {/* Seletor de Textos */}
      <div className="mb-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
        <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          Texto Selecionado:
        </label>
        <select
          value={selectedTextIndex}
          disabled={isPlaying}
          onChange={(e) => {
            setSelectedTextIndex(Number(e.target.value));
            handleReset();
          }}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-lg py-1.5 px-3 text-xs text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
        >
          {READING_LIBRARY.map((item, idx) => (
            <option key={item.id} value={idx}>
              {item.title} ({item.author})
            </option>
          ))}
        </select>
      </div>

      {/* Controles de BPM & Velocidade */}
      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Velocidade Alvo</span>
            <span className="text-2xl font-black text-white font-mono flex items-center gap-2">
              {calculatedWpm} <span className="text-xs font-semibold text-indigo-400">PPM</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Tempo Restante</span>
            <span className="text-lg font-bold text-amber-400 font-mono">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>

        {/* Slider de BPM */}
        <div className="space-y-1.5 mt-2">
          <div className="flex justify-between text-xs text-slate-400">
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
            className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>120 BPM (Iniciante)</span>
            <span>220 BPM (Acelerado)</span>
            <span>360 BPM (Turbo)</span>
          </div>
        </div>

        {/* Pulso Visual do Metrônomo (4 tempos) */}
        <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-slate-800">
          {[1, 2, 3, 4].map((step) => {
            const isActive = isPlaying && ((beatCount % 4) === (step % 4));
            return (
              <div
                key={step}
                className={`w-4 h-4 rounded-full transition-all duration-75 flex items-center justify-center ${
                  isActive
                    ? step === 1
                      ? 'bg-amber-400 scale-125 shadow-lg shadow-amber-400/50'
                      : 'bg-indigo-400 scale-110 shadow-md shadow-indigo-400/40'
                    : 'bg-slate-800 border border-slate-700'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Janela de Leitura Guiada com Cursor Rítmico */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mb-4 flex-1 min-h-[220px] max-h-[320px] flex flex-col">
        <div
          ref={wordsContainerRef}
          className="p-4 overflow-y-auto leading-relaxed text-sm md:text-base font-sans select-none space-x-1 space-y-1"
        >
          {words.map((word, idx) => {
            const isCurrent = idx >= currentIndex && idx < currentIndex + wordsPerBeat;
            const isPast = idx < currentIndex;

            return (
              <span
                key={idx}
                ref={isCurrent ? activeWordRef : null}
                className={`inline-block transition-all duration-75 rounded px-1 py-0.5 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white font-bold scale-105 shadow-md shadow-indigo-600/30'
                    : isPast
                    ? 'text-slate-400 opacity-80'
                    : 'text-slate-300'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Overlay se finalizou */}
        {isFinished && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Excelente Ritmo Mantido!</h3>
            <p className="text-xs text-slate-300 mb-3">Sua subvocalização foi forçada a dar lugar ao foco visual.</p>
            <div className="bg-slate-900 border border-slate-800 py-2 px-5 rounded-xl mb-4 font-mono">
              <span className="text-[11px] text-slate-400 block">Velocidade Mantida</span>
              <span className="text-2xl font-black text-indigo-400">{calculatedWpm} PPM</span>
            </div>
            {onComplete && (
              <button
                onClick={() => onComplete(calculatedWpm, 3)}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Concluir Exercício</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Barra de Ação Principal (Play / Pause / Reset) */}
      <div className="flex gap-2">
        <button
          onClick={isPlaying ? stopMetronome : startMetronome}
          className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/25'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
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
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
