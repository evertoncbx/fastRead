import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, FastForward, Rewind, Volume2, VolumeX, ArrowLeft, Zap, BookOpen, CheckCircle2 } from 'lucide-react';
import { audio } from '../../services/audioService';
import { READING_LIBRARY } from '../../data/texts';
import confetti from 'canvas-confetti';

interface RSVPReaderProps {
  onComplete?: (wpm: number, durationMinutes: number) => void;
  onBack?: () => void;
  isDailyStep?: boolean;
}

export const RSVPReader: React.FC<RSVPReaderProps> = ({ onComplete, onBack, isDailyStep }) => {
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(2); // Padrão: Machado de Assis
  const [wpm, setWpm] = useState<number>(350); // 200 a 800 PPM
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(false); // RSVP sound is off by default to avoid sensory overload

  const currentText = READING_LIBRARY[selectedTextIndex];

  // Tokenizar palavras mantendo pontuações
  const words = useMemo(() => {
    return currentText.text.split(/\s+/).filter(w => w.trim().length > 0);
  }, [currentText]);

  const timerRef = useRef<number | null>(null);

  // Calcula o Ponto Ótimo de Reconhecimento (ORP - Optimal Recognition Point)
  // A ciência cognitiva aponta que a fixação ideal é entre 30% a 35% do comprimento da palavra
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
    else orpIndex = 4;

    return {
      prefix: word.substring(0, orpIndex),
      orp: word.charAt(orpIndex),
      suffix: word.substring(orpIndex + 1)
    };
  }, [words, currentIndex]);

  // Tempo base por palavra em ms: (60 / wpm) * 1000
  const getWordDelay = (word: string) => {
    const baseDelay = (60 / wpm) * 1000;
    // Pausa levemente maior para pontuações para respeitar o processamento sintático
    if (/[.?!]$/.test(word)) {
      return baseDelay * 1.6;
    }
    if (/[,;:]$/.test(word)) {
      return baseDelay * 1.3;
    }
    return baseDelay;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleNextWord = (nextIndex: number) => {
    if (nextIndex >= words.length) {
      setIsPlaying(false);
      setIsFinished(true);
      audio.playSuccess();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onComplete) {
        onComplete(wpm, Math.max(1, Math.round(words.length / wpm)));
      }
      return;
    }

    const currentWord = words[nextIndex] || '';
    const delay = getWordDelay(currentWord);

    timerRef.current = window.setTimeout(() => {
      if (soundOn) audio.playClick();
      setCurrentIndex(nextIndex);
      scheduleNextWord(nextIndex + 1);
    }, delay);
  };

  const handlePlay = () => {
    if (currentIndex >= words.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
    setIsFinished(false);
    scheduleNextWord(currentIndex);
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
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Leitor RSVP com Ponto Focal (ORP)
              {isDailyStep && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Jornada</span>}
            </h2>
            <p className="text-xs text-slate-400">Elimina movimentos sacádicos e acelera a captação visual</p>
          </div>
        </div>

        {/* Dica da técnica */}
        <div className="mt-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Como Funciona:</strong> Fixe o olhar na <span className="text-amber-400 font-bold">letra destacada em âmbar</span> entre as guias verticais. Seus olhos não precisam se mover — o cérebro processa o conceito instantaneamente.
          </span>
        </div>
      </div>

      {/* Seletor de Textos */}
      <div className="mb-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
        <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block mb-1.5 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          Obra em Domínio Público:
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
              {item.title} — {item.author} ({item.wordCount} palavras)
            </option>
          ))}
        </select>
      </div>

      {/* Visor RSVP (Optimal Recognition Point / ORP Visualizer) */}
      <div className="relative bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 mb-4 shadow-2xl flex flex-col items-center justify-center min-h-[190px] overflow-hidden">
        {/* Guias verticais de alinhamento óptico (Superior e Inferior) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-amber-400/80 rounded-full" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-amber-400/80 rounded-full" />

        {/* Linha guia de mira foveal horizontal muito sutil */}
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] bg-slate-800/40 pointer-events-none" />

        {/* Container da Palavra com Alinhamento Estrito no ORP */}
        <div className="relative z-10 flex items-center justify-center w-full font-mono text-3xl sm:text-4xl select-none">
          {/* Prefixo: alinhado à direita antes do centro */}
          <div className="w-1/2 text-right text-slate-200 font-medium tracking-normal pr-[2px]">
            {currentWordParts.prefix}
          </div>

          {/* Letra ORP: exatamente no centro e colorida */}
          <div className="text-amber-400 font-black scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] px-[1px]">
            {currentWordParts.orp}
          </div>

          {/* Sufixo: alinhado à esquerda após o centro */}
          <div className="w-1/2 text-left text-slate-200 font-medium tracking-normal pl-[2px]">
            {currentWordParts.suffix}
          </div>
        </div>

        {/* Progresso de Palavras */}
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>{currentIndex + 1} de {words.length} pal.</span>
          <span>{progressPercentage}%</span>
        </div>

        {/* Overlay se concluído */}
        {isFinished && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Leitura RSVP Concluída!</h3>
            <p className="text-xs text-slate-300 mb-3">Velocidade mantida: {wpm} PPM.</p>
            {onComplete && (
              <button
                onClick={() => onComplete(wpm, Math.max(1, Math.round(words.length / wpm)))}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Continuar Jornada</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Barra de Progresso Interativa */}
      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-4 border border-slate-800">
        <div
          className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full transition-all duration-150"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Controles de Velocidade (PPM) */}
      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium">Velocidade de Exibição</span>
          <span className="text-xl font-black text-amber-400 font-mono">
            {wpm} <span className="text-xs font-semibold text-slate-400">PPM</span>
          </span>
        </div>

        <input
          type="range"
          min="150"
          max="800"
          step="25"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>200 PPM (Médio)</span>
          <span>450 PPM (Avançado)</span>
          <span>800 PPM (Turbo)</span>
        </div>
      </div>

      {/* Botoes de Navegação e Reprodução */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => handleJump(-10)}
          aria-label="Voltar 10 palavras"
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <Rewind className="w-5 h-5" />
        </button>

        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
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
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <FastForward className="w-5 h-5" />
        </button>

        <button
          onClick={handleReset}
          aria-label="Reiniciar leitura"
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
