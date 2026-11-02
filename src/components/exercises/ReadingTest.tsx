import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, ArrowLeft, Timer, Brain, Award, ChevronRight } from 'lucide-react';
import { ReadingText } from '../../types';
import { getRandomAssessmentText } from '../../data/texts';
import { audio } from '../../services/audioService';
import { CountdownOverlay } from './CountdownOverlay';
import confetti from 'canvas-confetti';

interface ReadingTestProps {
  customText?: ReadingText;
  isInitialTest?: boolean;
  baselineWpm?: number;
  recentTitles?: string[];
  onComplete: (data: {
    wpm: number;
    comprehensionScore: number;
    durationSeconds: number;
    effectiveWpm: number;
    textTitle?: string;
    textId?: string;
  }) => void;
  onBack?: () => void;
}

export const ReadingTest: React.FC<ReadingTestProps> = ({
  customText,
  isInitialTest = false,
  baselineWpm = 0,
  recentTitles = [],
  onComplete,
  onBack
}) => {
  const [text, setText] = useState<ReadingText>(() => {
    if (customText) return customText;
    return getRandomAssessmentText(recentTitles);
  });

  const [phase, setPhase] = useState<'intro' | 'reading' | 'quiz' | 'result'>('intro');
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [qId: string]: number }>({});
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [scoreData, setScoreData] = useState<{
    wpm: number;
    compPercent: number;
    effectiveWpm: number;
    elapsedSeconds: number;
  } | null>(null);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const readingDurationRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (customText) {
      setText(customText);
    }
  }, [customText]);

  const handleStartReading = () => {
    setShowCountdown(true);
  };

  const startActualReading = () => {
    setShowCountdown(false);
    setPhase('reading');
    setElapsedSeconds(0);
    readingDurationRef.current = 0;
    startTimeRef.current = performance.now();
    timerRef.current = window.setInterval(() => {
      const now = performance.now();
      setElapsedSeconds((now - startTimeRef.current) / 1000);
    }, 100);
  };

  const handleFinishReading = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const rawSeconds = (performance.now() - startTimeRef.current) / 1000;
    const finalSeconds = Math.max(3, rawSeconds);
    readingDurationRef.current = finalSeconds;
    setElapsedSeconds(finalSeconds);

    const calculatedWpm = Math.min(1500, Math.max(50, Math.round((text.wordCount / finalSeconds) * 60)));

    if (text.quiz && text.quiz.length > 0) {
      setPhase('quiz');
      setCurrentQuizIndex(0);
      setAnswers({});
    } else {
      finalizeResults(calculatedWpm, 100, finalSeconds);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    if (!text.quiz) return;
    const currentQ = text.quiz[currentQuizIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleNextQuizQuestion = () => {
    if (!text.quiz) return;
    if (currentQuizIndex < text.quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      let correct = 0;
      text.quiz.forEach(q => {
        if (answers[q.id] === q.correctIndex) {
          correct++;
        }
      });
      const compPercent = Math.round((correct / text.quiz.length) * 100);
      const calculatedWpm = Math.min(1500, Math.max(50, Math.round((text.wordCount / readingDurationRef.current) * 60)));
      finalizeResults(calculatedWpm, compPercent, readingDurationRef.current);
    }
  };

  const finalizeResults = (wpm: number, compPercent: number, finalSeconds: number) => {
    const effectiveWpm = Math.round(wpm * (compPercent / 100));
    setScoreData({
      wpm,
      compPercent,
      effectiveWpm,
      elapsedSeconds: finalSeconds
    });
    setPhase('result');
    audio.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const targetWpm = isInitialTest && scoreData
    ? Math.round(scoreData.wpm * 1.5)
    : Math.round(baselineWpm * 1.5);

  const percentGain = baselineWpm > 0 && scoreData
    ? Math.round(((scoreData.wpm - baselineWpm) / baselineWpm) * 100)
    : 0;

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-28 text-[#131F24]">
      {/* Contador Regressivo de 3 Segundos */}
      <CountdownOverlay
        isActive={showCountdown}
        onComplete={startActualReading}
        title={isInitialTest ? 'Teste Inicial de Velocidade' : 'Teste de Aferição (+50%)'}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack && phase === 'intro' ? (
          <button
            onClick={onBack}
            className="btn-duo-white py-2 px-3 text-sm flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : <div />}

        {phase === 'reading' && (
          <div className="flex items-center gap-2 bg-[#D7FFB8] text-[#46A302] border-2 border-[#A8EE69] px-4 py-1.5 rounded-full text-sm font-mono font-black animate-pulse">
            <Timer className="w-4 h-4 stroke-[2.5]" />
            <span>{elapsedSeconds.toFixed(1)}s</span>
          </div>
        )}
      </div>

      {/* FASE 1: INTRODUÇÃO */}
      {phase === 'intro' && (
        <div className="space-y-4">
          <div className="card-duo p-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#D7FFB8] border-2 border-[#A8EE69] flex items-center justify-center text-[#46A302] mx-auto">
              <Award className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-[#131F24]">
                {isInitialTest ? 'Teste Inicial de Velocidade' : 'Teste de Aferição (+50%)'}
              </h2>
            </div>

            {/* Texto Selecionado Automaticamente */}
            <div className="bg-stone-50 p-4 rounded-2xl border-2 border-stone-200 text-left">
              <strong className="text-lg font-black text-[#131F24] block truncate">{text.title}</strong>
              <span className="text-xs font-black text-[#46A302] font-mono block mt-1">
                {text.wordCount} palavras • ~{text.estimatedMinutes} min
              </span>
            </div>

            <button
              onClick={handleStartReading}
              className="w-full py-4 px-6 btn-duo-green text-lg font-black flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Começar a Ler Agora</span>
            </button>
          </div>
        </div>
      )}

      {/* FASE 2: LEITURA EM ANDAMENTO */}
      {phase === 'reading' && (
        <div className="space-y-4">
          <div className="card-duo p-6 bg-white space-y-4">
            <div className="border-b-2 border-stone-100 pb-3">
              <h3 className="text-xl sm:text-2xl font-black text-[#131F24]">{text.title}</h3>
              <span className="text-xs sm:text-sm font-bold text-stone-400 block mt-0.5">{text.author}</span>
            </div>

            {/* Texto com tipografia ampliada e altamente legível */}
            <div className="text-[#131F24] text-2xl sm:text-3xl leading-[2.1] space-y-5 font-reading max-h-[55vh] overflow-y-auto pr-2 selection:bg-[#58CC02]/25">
              {text.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="indent-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinishReading}
            className="w-full py-4 px-6 btn-duo-green text-lg font-black flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            <span>Terminei de Ler! ({elapsedSeconds.toFixed(1)}s)</span>
          </button>
        </div>
      )}

      {/* FASE 3: QUESTIONÁRIO DE COMPREENSÃO */}
      {phase === 'quiz' && text.quiz && (
        <div className="space-y-4">
          <div className="card-duo p-4 flex items-center justify-between">
            <span className="text-sm font-black text-stone-500">
              Pergunta {currentQuizIndex + 1} de {text.quiz.length}
            </span>
            <span className="text-xs font-black bg-[#F6E8FF] text-[#A559D9] border-2 border-[#E4B8FF] px-3 py-1 rounded-full">
              Compreensão
            </span>
          </div>

          {(() => {
            const currentQ = text.quiz[currentQuizIndex];
            const selectedOpt = answers[currentQ.id];

            return (
              <div className="card-duo p-6 space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-[#131F24] leading-snug">
                  {currentQ.question}
                </h3>

                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-2xl text-left text-base sm:text-lg font-bold transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-[#D7FFB8] text-[#131F24] border-2 border-[#58CC02] border-b-4 border-b-[#46A302]'
                            : 'bg-white text-[#131F24] border-2 border-stone-200 border-b-4 border-b-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 mt-0.5 border-2 ${
                          isSelected
                            ? 'bg-[#58CC02] text-white border-[#46A302]'
                            : 'bg-stone-100 text-stone-600 border-stone-200'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={selectedOpt === undefined}
                  onClick={handleNextQuizQuestion}
                  className="w-full py-4 px-6 btn-duo-green text-base sm:text-lg font-black flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer mt-4"
                >
                  <span>{currentQuizIndex < text.quiz.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}</span>
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* FASE 4: RESULTADO DETALHADO */}
      {phase === 'result' && scoreData && (
        <div className="space-y-4">
          <div className="card-duo p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-[#D7FFB8] border-2 border-[#A8EE69] flex items-center justify-center text-[#46A302] mx-auto">
              <Award className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#46A302] block mb-1">
                {isInitialTest ? 'Velocidade Inicial Definida' : 'Resultado do Teste'}
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#131F24] font-mono">
                {scoreData.wpm} <span className="text-xl text-stone-400 font-bold">PPM</span>
              </h2>
              <p className="text-sm font-bold text-stone-500 mt-2">
                Você leu {text.wordCount} palavras em {scoreData.elapsedSeconds.toFixed(1)} segundos com {scoreData.compPercent}% de retenção.
              </p>
            </div>

            {/* 2 Colunas com Métricas */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 text-center">
                <span className="text-xs text-stone-400 uppercase tracking-wider block font-black">Compreensão</span>
                <span className={`text-3xl font-black font-mono ${
                  scoreData.compPercent >= 70 ? 'text-[#46A302]' : 'text-[#FF9600]'
                }`}>
                  {scoreData.compPercent}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-200 text-center">
                <span className="text-xs text-stone-400 uppercase tracking-wider block font-black">PPM Eficaz</span>
                <span className="text-3xl font-black font-mono text-[#1899D6]">
                  {scoreData.effectiveWpm}
                </span>
              </div>
            </div>

            {/* Meta de +50% */}
            <div className="bg-[#FFF8D9] border-2 border-[#FFE680] p-4 rounded-2xl text-left space-y-1">
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span className="text-[#7A5000] font-black">Sua Meta (+50%):</span>
                <strong className="text-[#FF9600] font-mono text-xl font-black">{targetWpm} PPM</strong>
              </div>

              {baselineWpm > 0 && !isInitialTest && (
                <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-[#FFE680]/60">
                  <span className="text-[#7A5000] font-bold">Evolução do ponto de partida:</span>
                  <span className={`font-black font-mono text-base ${percentGain >= 0 ? 'text-[#46A302]' : 'text-rose-600'}`}>
                    {percentGain > 0 ? `+${percentGain}%` : `${percentGain}%`}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onComplete({
                  wpm: scoreData.wpm,
                  comprehensionScore: scoreData.compPercent,
                  durationSeconds: Math.round(scoreData.elapsedSeconds),
                  effectiveWpm: scoreData.effectiveWpm,
                  textTitle: text.title,
                  textId: text.id
                });
              }}
              className="w-full py-4 px-6 btn-duo-green text-lg font-black flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              <span>Salvar e Continuar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
