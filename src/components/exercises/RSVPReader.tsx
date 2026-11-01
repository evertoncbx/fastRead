import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, FastForward, Rewind, Volume2, VolumeX, ArrowLeft, Zap, BookOpen, CheckCircle2 } from 'lucide-react';
import { audio } from '../../services/audioService';
import { READING_LIBRARY } from '../../data/texts';
import { ReadingText } from '../../types';
import confetti from 'canvas-confetti';

interface RSVPReaderProps {
  customText?: ReadingText;
  onComplete?: (wpm: number, durationMinutes: number) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const RSVPReader: React.FC<RSVPReaderProps> = ({ customText, onComplete, onBack, isDailyStep }) => {
  const availableTexts = useMemo(() => {
    if (customText && !READING_LIBRARY.some(t => t.id === customText.id)) {
      return [customText, ...READING_LIBRARY];
    }
    return READING_LIBRARY;
  }, [customText]);

  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(() => {
    if (customText) {
      const foundIdx = READING_LIBRARY.findIndex(t => t.id === customText.id);
      return foundIdx >= 0 ? foundIdx : 0;
    }
    return 2;
  });

  const [wpm, setWpm] = useState<number>(350); // 200 a 800 PPM
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(false);

  const currentText = availableTexts[selectedTextIndex] || availableTexts[0];

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

  // Calcula o Ponto Ótimo de Reconhecimento (ORP - Optimal Recognition Point)
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

  const getWordDelay = (word: string) => {
    const baseDelay = (60 / wpmRef.current) * 1000;
    if (/[.?!]$/.test(word)) {
      return baseDelay * 1.5;
    }
    if (/[,;:]$/.test(word)) {
      return baseDelay * 1.25;
    }
    return baseDelay;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleNextWord = (nextIndex: number) => {
    const currentWords = wordsRef.current;
    if (nextIndex >= currentWords.length) {
      setIsPlaying(false);
      setIsFinished(true);
      audio.playSuccess();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      return;
    }

    const currentWord = currentWords[nextIndex] || '';
    const delay = getWordDelay(currentWord);

    timerRef.current = window.setTimeout(() => {
      if (soundOnRef.current) audio.playClick();
      setCurrentIndex(nextIndex);
      scheduleNextWord(nextIndex + 1);
    }, delay);
  };

  const handlePlay = () => {
    let startIdx = currentIndex;
    if (startIdx >= words.length - 1) {
      startIdx = 0;
      setCurrentIndex(0);
    }
    setIsPlaying(true);
    setIsFinished(false);

    const currentWord = words[startIdx] || '';
    const delay = getWordDelay(currentWord);
    timerRef.current = window.setTimeout(() => {
      if (soundOnRef.current) audio.playClick();
      const nextIdx = startIdx + 1;
      if (nextIdx < words.length) {
        setCurrentIndex(nextIdx);
        scheduleNextWord(nextIdx + 1);
      } else {
        scheduleNextWord(nextIdx);
      }
    }, delay);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleReset = () => {
    handlePause();
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const handleJump = (delta: number) => {
    const newIdx = Math.max(0, Math.min(words.length - 1, currentIndex + delta));
    setCurrentIndex(newIdx);
    if (isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      scheduleNextWord(newIdx);
    }
  };

  const toggleSound = () => {
    const s = audio.toggleSound();
    setSoundOn(s);
  };

  const progressPercentage = Math.round(((currentIndex + 1) / words.length) * 100) || 0;

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
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#faf8f5] flex items-center gap-2">
              Leitor RSVP com Ponto Focal (ORP)
              {isDailyStep && <span className="text-xs bg-amber-500/15 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-[#a39b8e]">Elimina movimentos sacádicos e acelera a captação visual</p>
          </div>
        </div>

        {/* Dica da técnica */}
        <div className="mt-3 bg-[#131211]/80 p-2.5 rounded-xl border border-[#2c2724] text-xs text-[#d8d0c2] flex items-start gap-2">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#faf8f5]">Como Funciona:</strong> Fixe o olhar na <span className="text-amber-400 font-bold">letra destacada em âmbar</span> entre as guias verticais. Seus olhos não precisam se mover — o cérebro processa o conceito instantaneamente.
          </span>
        </div>
      </div>

      {/* Seletor de Textos */}
      <div className="mb-3 bg-[#1c1917] border border-[#2c2724] p-2.5 rounded-xl">
        <label className="text-[11px] uppercase tracking-wider text-[#a39b8e] font-medium block mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Obra em Domínio Público:
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
              {item.title} — {item.author} ({item.wordCount} palavras)
            </option>
          ))}
        </select>
      </div>

      {/* Visor RSVP (Optimal Recognition Point / ORP Visualizer) */}
      <div className="relative bg-[#1c1917] border-2 border-[#2c2724] rounded-3xl p-8 mb-4 shadow-xl flex flex-col items-center justify-center min-h-[190px] overflow-hidden">
        {/* Guias verticais de alinhamento óptico */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-amber-500/80 rounded-full" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-amber-500/80 rounded-full" />

        {/* Linha guia foveal sutil */}
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] bg-[#2c2724]/60 pointer-events-none" />

        {/* Container da Palavra com Alinhamento Estrito no ORP */}
        <div className="relative z-10 flex items-center justify-center w-full font-mono text-3xl sm:text-4xl select-none">
          <div className="w-1/2 text-right text-[#f5f2eb] font-medium tracking-normal pr-[2px]">
            {currentWordParts.prefix}
          </div>

          <div className="text-amber-400 font-black scale-110 px-[2px] bg-amber-500/15 rounded-md">
            {currentWordParts.orp}
          </div>

          <div className="w-1/2 text-left text-[#f5f2eb] font-medium tracking-normal pl-[2px]">
            {currentWordParts.suffix}
          </div>
        </div>

        {/* Progresso de Palavras */}
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#766f63]">
          <span>{currentIndex + 1} de {words.length} pal.</span>
          <span>{progressPercentage}%</span>
        </div>

        {/* Overlay se concluído */}
        {isFinished && (
          <div className="absolute inset-0 bg-[#131211]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#faf8f5] mb-1">Leitura RSVP Concluída!</h3>
            <p className="text-xs text-[#a39b8e] mb-3">Velocidade mantida: {wpm} PPM.</p>
            {onComplete && (
              <button
                onClick={() => onComplete(wpm, Math.max(1, Math.round(words.length / wpm)))}
                className="py-2.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Continuar Jornada</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Barra de Progresso Interativa */}
      <div className="w-full bg-[#1c1917] h-2 rounded-full overflow-hidden mb-4 border border-[#2c2724]">
        <div
          className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-150"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Controles de Velocidade (PPM) */}
      <div className="bg-[#1c1917] border border-[#2c2724] p-3 rounded-2xl mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#a39b8e] font-medium">Velocidade de Exibição</span>
          <span className="text-xl font-black text-amber-400 font-mono">
            {wpm} <span className="text-xs font-semibold text-[#a39b8e]">PPM</span>
          </span>
        </div>

        <input
          type="range"
          min="150"
          max="800"
          step="25"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-amber-500 bg-[#24211e] h-2 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-[#766f63] font-mono mt-1">
          <span>200 PPM (Médio)</span>
          <span>450 PPM (Avançado)</span>
          <span>800 PPM (Turbo)</span>
        </div>
      </div>

      {/* Botões de Navegação e Reprodução */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => handleJump(-10)}
          aria-label="Voltar 10 palavras"
          className="p-3.5 rounded-xl bg-[#1c1917] border border-[#2c2724] text-[#a39b8e] hover:text-[#f3efe8] transition-colors"
        >
          <Rewind className="w-5 h-5" />
        </button>

        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
            isPlaying
              ? 'bg-[#2c2724] hover:bg-[#36322e] text-[#f3efe8]'
              : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
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
              <span>{currentIndex > 0 ? 'Continuar Leitura' : 'Iniciar RSVP'}</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleJump(10)}
          aria-label="Avançar 10 palavras"
          className="p-3.5 rounded-xl bg-[#1c1917] border border-[#2c2724] text-[#a39b8e] hover:text-[#f3efe8] transition-colors"
        >
          <FastForward className="w-5 h-5" />
        </button>

        <button
          onClick={handleReset}
          aria-label="Reiniciar leitura"
          className="p-3.5 rounded-xl bg-[#1c1917] border border-[#2c2724] text-[#a39b8e] hover:text-[#f3efe8] transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
