import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, FastForward, Rewind, Volume2, VolumeX, ArrowLeft, Trophy, CheckCircle2 } from 'lucide-react';
import { audio } from '../../services/audioService';
import { READING_LIBRARY, getRandomExerciseText } from '../../data/texts';
import { storage } from '../../services/storageService';
import { ReadingText } from '../../types';
import { CountdownOverlay } from './CountdownOverlay';
import confetti from 'canvas-confetti';

interface RSVPReaderProps {
  customText?: ReadingText;
  onComplete?: (wpm: number, durationMinutes: number, textTitle?: string, textId?: string) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const RSVPReader: React.FC<RSVPReaderProps> = ({ customText, onComplete, onBack, isDailyStep }) => {
  const [currentText, setCurrentText] = useState<ReadingText>(() => {
    if (customText) return customText;
    const exclusions = storage.getRecentReadTexts();
    return getRandomExerciseText(exclusions);
  });

  const [wpm, setWpm] = useState<number>(350); // 200 a 800 PPM
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(false);

  const words = useMemo(() => {
    return currentText.text.split(/\s+/).filter(w => w.trim().length > 0);
  }, [currentText]);

  const timerRef = useRef<number | null>(null);
  const wpmRef = useRef(wpm);
  wpmRef.current = wpm;
  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;
  const wordsRef = useRef(words);
  wordsRef.current = words;

  // Trocar para outro texto aleatório evitando repetições
  const handleShuffleText = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setIsFinished(false);
    const exclusions = [currentText.id, currentText.title, ...storage.getRecentReadTexts()];
    const nextText = getRandomExerciseText(exclusions);
    storage.addRecentReadText(nextText.id, nextText.title);
    setCurrentText(nextText);
  };

  // Ponto Ótimo de Reconhecimento (ORP - Optimal Recognition Point)
  const currentWordParts = useMemo(() => {
    if (words.length === 0 || currentIndex >= words.length) {
      return { prefix: '', orp: '', suffix: '' };
    }
    const word = words[currentIndex] || '';
    const len = word.length;
    if (len === 0) return { prefix: '', orp: '', suffix: '' };
    if (len === 1) return { prefix: '', orp: word, suffix: '' };

    let orpIndex = 0;
    if (len <= 5) orpIndex = 1;
    else if (len <= 9) orpIndex = 2;
    else if (len <= 13) orpIndex = 3;
    else orpIndex = Math.min(len - 1, 4);

    return {
      prefix: word.substring(0, orpIndex),
      orp: word.charAt(orpIndex),
      suffix: word.substring(orpIndex + 1)
    };
  }, [words, currentIndex]);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round((60 / wpm) * 1000);
      timerRef.current = window.setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= wordsRef.current.length) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            setIsFinished(true);
            audio.playSuccess();
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
            return prev;
          }
          if (soundOnRef.current && next % 5 === 0) {
            audio.playClick();
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
  }, [isPlaying, wpm]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (isFinished) {
      setCurrentIndex(0);
      setIsFinished(false);
    }
    setShowCountdown(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setShowCountdown(false);
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const handleSeek = (delta: number) => {
    setCurrentIndex(prev => Math.max(0, Math.min(words.length - 1, prev + delta)));
  };

  const progressPercent = words.length > 0 ? Math.round((currentIndex / words.length) * 100) : 0;

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-32 text-[#131F24]">
      {/* Contador Regressivo de 3 Segundos */}
      <CountdownOverlay
        isActive={showCountdown}
        onComplete={() => {
          setShowCountdown(false);
          setIsPlaying(true);
        }}
        title="Leitor RSVP Turbo"
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
            onClick={() => setSoundOn(prev => !prev)}
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
            <div className="w-12 h-12 rounded-2xl bg-[#DDF4FF] border-2 border-[#B0E4FF] flex items-center justify-center text-[#1899D6]">
              <Trophy className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#131F24]">
                RSVP Turbo
              </h2>
            </div>
          </div>

          <span className="text-base font-black bg-[#DDF4FF] text-[#1899D6] border-2 border-[#B0E4FF] px-4 py-1.5 rounded-full font-mono">
            {wpm} PPM
          </span>
        </div>

        <div className="pt-2 border-t-2 border-stone-100 flex items-center justify-between text-sm font-bold text-stone-500">
          <span className="truncate pr-2 font-black text-[#131F24] text-base">{currentText.title}</span>
          <span className="shrink-0 font-mono text-sm">{currentIndex + 1} de {words.length}</span>
        </div>
      </div>

      {/* TELA PRINCIPAL RSVP: Palavra Gigante com Ponto Focal */}
      <div className="relative card-duo p-8 sm:p-14 min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-center bg-white mb-4">
        {/* Marcadores Visuais Centrais */}
        <div className="absolute top-4 w-5 h-2 bg-[#FF4B4B] rounded-full" />
        <div className="absolute bottom-4 w-5 h-2 bg-[#FF4B4B] rounded-full" />

        {isFinished ? (
          <div className="text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-16 h-16 text-[#58CC02] stroke-[2.5] mx-auto" />
            <h3 className="text-3xl font-black text-[#131F24]">Texto Concluído!</h3>
            <p className="text-base font-bold text-stone-400">Velocidade média: {wpm} PPM</p>
          </div>
        ) : (
          <div className="font-mono text-5xl sm:text-7xl font-black tracking-wide select-none flex items-baseline justify-center">
            <span className="text-right text-[#131F24] w-[4.5ch]">
              {currentWordParts.prefix}
            </span>
            <span className="text-[#FF4B4B] font-black underline decoration-4 decoration-[#FF4B4B] px-0.5">
              {currentWordParts.orp}
            </span>
            <span className="text-left text-[#131F24] w-[4.5ch]">
              {currentWordParts.suffix}
            </span>
          </div>
        )}

        {/* Barra de Progresso Interna */}
        <div className="absolute bottom-0 inset-x-0 h-2.5 bg-stone-100 overflow-hidden rounded-b-[1.5rem]">
          <div
            className="bg-[#58CC02] h-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Controles de Velocidade (PPM) */}
      <div className="card-duo p-5 mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black uppercase text-stone-400">Velocidade do Treino</span>
          <span className="text-2xl font-black text-[#1899D6] font-mono">{wpm} PPM</span>
        </div>

        <input
          type="range"
          min="150"
          max="800"
          step="25"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-[#1CB0F6] h-3.5 bg-stone-100 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between gap-2">
          {[250, 350, 450, 600].map((preset) => (
            <button
              key={preset}
              onClick={() => setWpm(preset)}
              className={`flex-1 py-2 rounded-2xl text-sm font-black transition-all cursor-pointer ${
                wpm === preset
                  ? 'bg-[#1CB0F6] border-b-2 border-[#1899D6] text-white'
                  : 'btn-duo-white'
              }`}
            >
              {preset} PPM
            </button>
          ))}
        </div>
      </div>

      {/* Botões Principais de Navegação e Play */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleSeek(-10)}
          title="Recuar 10 palavras"
          className="p-4.5 btn-duo-white flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Rewind className="w-6 h-6 stroke-[2.5]" />
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

        <button
          onClick={() => handleSeek(10)}
          title="Avançar 10 palavras"
          className="p-4.5 btn-duo-white flex items-center justify-center shrink-0 cursor-pointer"
        >
          <FastForward className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={handleReset}
          title="Voltar ao início"
          className="p-4.5 btn-duo-white flex items-center justify-center shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-6 h-6 stroke-[2.5]" />
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
