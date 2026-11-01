import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, RotateCcw, ArrowLeft, Timer, Brain, Award, AlertCircle, ChevronRight, Shuffle } from 'lucide-react';
import { ReadingText } from '../../types';
import { INITIAL_DIAGNOSTIC_TEXT, PERIODIC_ASSESSMENT_TEXT, DIAGNOSTIC_TEXTS, getRandomAssessmentText } from '../../data/texts';
import { audio } from '../../services/audioService';
import confetti from 'canvas-confetti';

interface ReadingTestProps {
  customText?: ReadingText;
  isInitialTest?: boolean;
  baselineWpm?: number;
  onComplete: (data: {
    wpm: number;
    comprehensionScore: number;
    durationSeconds: number;
    effectiveWpm: number;
  }) => void;
  onBack?: () => void;
}

export const ReadingTest: React.FC<ReadingTestProps> = ({
  customText,
  isInitialTest = false,
  baselineWpm = 0,
  onComplete,
  onBack
}) => {
  // Inicialização inteligente do texto: se não for passado customText, sorteia um dos textos de avaliação
  const [text, setText] = useState<ReadingText>(() => {
    if (customText) return customText;
    if (isInitialTest) {
      return getRandomAssessmentText();
    }
    return getRandomAssessmentText();
  });

  // Fases: 'intro' | 'reading' | 'quiz' | 'result'
  const [phase, setPhase] = useState<'intro' | 'reading' | 'quiz' | 'result'>('intro');
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

  const handleShuffleText = () => {
    const newText = getRandomAssessmentText([text.id]);
    setText(newText);
  };

  const handleStartReading = () => {
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
    // Evita tempos irreais mínimos para impedir WPMs inflados por cliques acidentais
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

  const handleSelectOption = (optionIndex: number) => {
    if (!text.quiz) return;
    const currentQ = text.quiz[currentQuizIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
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
      const readSeconds = readingDurationRef.current > 0 ? readingDurationRef.current : Math.max(3, elapsedSeconds);
      const calculatedWpm = Math.min(1500, Math.max(50, Math.round((text.wordCount / readSeconds) * 60)));
      finalizeResults(calculatedWpm, compPercent, readSeconds);
    }
  };

  const finalizeResults = (rawWpm: number, compPercent: number, totalSeconds: number) => {
    const effectiveWpm = Math.round(rawWpm * (compPercent / 100));
    setScoreData({
      wpm: rawWpm,
      compPercent,
      effectiveWpm,
      elapsedSeconds: totalSeconds
    });
    setPhase('result');
    audio.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const targetWpm = baselineWpm > 0 ? Math.round(baselineWpm * 1.5) : Math.round((scoreData?.wpm || 200) * 1.5);
  const percentGain = baselineWpm > 0 && scoreData ? Math.round(((scoreData.wpm - baselineWpm) / baselineWpm) * 100) : 0;

  return (
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-24 text-[#f3efe8]">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack && phase === 'intro' ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#a39b8e] hover:text-[#f3efe8] transition-colors py-1 px-2.5 rounded-lg bg-[#1c1917] border border-[#2c2724]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : <div />}

        {phase === 'reading' && (
          <div className="flex items-center gap-2 bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold animate-pulse">
            <Timer className="w-3.5 h-3.5" />
            <span>{elapsedSeconds.toFixed(1)}s</span>
          </div>
        )}
      </div>

      {/* FASE 1: INTRODUÇÃO */}
      {phase === 'intro' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] p-5 rounded-3xl border border-[#3d3834] shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-[#faf8f5] mb-1">
              {isInitialTest ? 'Teste Diagnóstico Inicial' : 'Teste de Aferição de Progresso'}
            </h2>
            <p className="text-xs text-[#d8d0c2] leading-relaxed mb-4">
              {isInitialTest
                ? 'Este teste medirá sua velocidade de leitura natural (PPM) e sua taxa de retenção. Ele definirá a sua meta personalizada de aumento de +50%!'
                : 'Averigue o seu avanço após as sessões de treino e meça a sua aproximação da meta de +50% de velocidade.'}
            </p>

            <div className="bg-[#131211]/80 p-3 rounded-xl border border-[#2c2724] space-y-2 text-xs text-[#d8d0c2]">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Brain className="w-4 h-4" />
                <span>Como funciona o teste:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#a39b8e]">
                <li>Leia o texto no seu ritmo natural de compreensão, sem forçar pressa artificial.</li>
                <li>Ao terminar a última palavra, aperte o botão "Terminei de Ler".</li>
                <li>Responda às perguntas para avaliar a absorção real do conteúdo.</li>
              </ul>
            </div>
          </div>

          {/* Card do Texto Selecionado com botão de Randomização */}
          <div className="bg-[#1c1917] p-3.5 rounded-2xl border border-[#2c2724] flex items-center justify-between text-xs text-[#a39b8e]">
            <div className="pr-2 flex-1">
              <span className="block text-[#766f63] text-[11px] uppercase tracking-wider font-medium">Texto Selecionado</span>
              <strong className="text-[#faf8f5] text-sm block leading-snug">{text.title}</strong>
              <span className="text-[11px] text-amber-400 font-mono block mt-0.5">{text.wordCount} palavras • ~{text.estimatedMinutes} min</span>
            </div>

            <button
              onClick={handleShuffleText}
              title="Sortear outro texto para este teste"
              className="py-1.5 px-2.5 rounded-xl bg-[#24211e] hover:bg-[#2c2724] border border-[#36322e] text-xs font-semibold text-amber-300 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Sortear Outro</span>
            </button>
          </div>

          <button
            onClick={handleStartReading}
            className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/40 active:scale-98 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Começar a Ler Agora</span>
          </button>
        </div>
      )}

      {/* FASE 2: LEITURA EM ANDAMENTO (Estilo Editorial Papel & Livro) */}
      {phase === 'reading' && (
        <div className="space-y-4">
          <div className="bg-[#1c1917] border border-[#2c2724] rounded-3xl p-5 shadow-xl">
            <h3 className="text-base font-bold text-[#faf8f5] mb-1">{text.title}</h3>
            <span className="text-xs text-[#a39b8e] block mb-4 italic">Por {text.author}</span>

            {/* Texto formatado com tipografia confortável editorial */}
            <div className="text-[#f5f2eb] text-sm md:text-base leading-relaxed space-y-3 font-reading max-h-[52vh] overflow-y-auto pr-1 selection:bg-amber-500/30">
              {text.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="indent-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinishReading}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 active:scale-98 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Terminei de Ler! ({elapsedSeconds.toFixed(1)}s)</span>
          </button>
        </div>
      )}

      {/* FASE 3: QUESTIONÁRIO DE COMPREENSÃO */}
      {phase === 'quiz' && text.quiz && (
        <div className="space-y-4">
          <div className="bg-[#1c1917] border border-[#2c2724] p-4 rounded-2xl flex items-center justify-between">
            <span className="text-xs text-[#a39b8e] font-medium">
              Pergunta {currentQuizIndex + 1} de {text.quiz.length}
            </span>
            <span className="text-xs bg-amber-500/15 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
              Retenção e Compreensão
            </span>
          </div>

          {(() => {
            const currentQ = text.quiz[currentQuizIndex];
            const selectedOpt = answers[currentQ.id];

            return (
              <div className="bg-[#1c1917] border border-[#2c2724] p-5 rounded-3xl shadow-xl space-y-4">
                <h3 className="text-sm md:text-base font-bold text-[#faf8f5] leading-snug">
                  {currentQ.question}
                </h3>

                <div className="space-y-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-3.5 rounded-xl text-left text-xs md:text-sm font-medium transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-amber-700 text-white shadow-md ring-2 ring-amber-400'
                            : 'bg-[#131211] text-[#d8d0c2] hover:bg-[#24211e] border border-[#2c2724]'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isSelected ? 'bg-white text-amber-800' : 'bg-[#24211e] text-[#a39b8e]'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={selectedOpt === undefined}
                  onClick={handleNextQuizQuestion}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-2 transition-all mt-3"
                >
                  <span>{currentQuizIndex < text.quiz.length - 1 ? 'Próxima Pergunta' : 'Finalizar Teste'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* FASE 4: RESULTADO DETALHADO */}
      {phase === 'result' && scoreData && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#24211e] via-[#1c1917] to-[#1c1917] p-6 rounded-3xl border border-[#3d3834] text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
              {isInitialTest ? 'Linha de Base Estabelecida' : 'Resultado do Teste'}
            </span>
            <h2 className="text-2xl font-black text-[#faf8f5] mb-2">
              {scoreData.wpm} <span className="text-base text-[#a39b8e] font-normal">PPM</span>
            </h2>
            <p className="text-xs text-[#d8d0c2] max-w-xs mx-auto mb-5">
              Você leu {text.wordCount} palavras em {scoreData.elapsedSeconds.toFixed(1)} segundos com {scoreData.compPercent}% de retenção.
            </p>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#131211]/80 p-3 rounded-2xl border border-[#2c2724]">
                <span className="text-[10px] text-[#a39b8e] uppercase tracking-wider block font-medium">Compreensão</span>
                <span className={`text-xl font-black font-mono ${
                  scoreData.compPercent >= 75 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {scoreData.compPercent}%
                </span>
              </div>

              <div className="bg-[#131211]/80 p-3 rounded-2xl border border-[#2c2724]">
                <span className="text-[10px] text-[#a39b8e] uppercase tracking-wider block font-medium">PPM Eficaz</span>
                <span className="text-xl font-black font-mono text-amber-400">
                  {scoreData.effectiveWpm}
                </span>
              </div>
            </div>

            {/* Meta de +50% */}
            <div className="bg-[#131211]/90 border border-amber-600/25 p-3.5 rounded-2xl text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#d8d0c2] font-medium">Meta de Aumento (+50%):</span>
                <strong className="text-amber-400 font-mono text-sm">{targetWpm} PPM</strong>
              </div>

              {baselineWpm > 0 && !isInitialTest && (
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#2c2724]">
                  <span className="text-[#a39b8e]">Evolução desde o início:</span>
                  <span className={`font-bold font-mono ${percentGain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {percentGain > 0 ? `+${percentGain}%` : `${percentGain}%`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Gabarito e Revisão de Retenção */}
          {text.quiz && text.quiz.length > 0 && (
            <div className="bg-[#1c1917] border border-[#2c2724] p-4 rounded-3xl text-left space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                Gabarito Comentado & Justificativas
              </span>
              <div className="space-y-2.5">
                {text.quiz.map((q, idx) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correctIndex;

                  return (
                    <div key={q.id} className="p-3 rounded-xl bg-[#131211]/80 border border-[#2c2724] text-xs space-y-1.5">
                      <div className="flex items-start gap-2 font-semibold text-[#f3efe8]">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-600/30' : 'bg-rose-950/40 text-rose-300 border border-rose-600/30'
                        }`}>
                          {isCorrect ? '✓ Correto' : '✗ Incorreto'}
                        </span>
                        <span>{idx + 1}. {q.question}</span>
                      </div>
                      {!isCorrect && userAns !== undefined && (
                        <p className="text-[11px] text-rose-300 pl-2">
                          Sua escolha: <span className="line-through">{q.options[userAns]}</span>
                        </p>
                      )}
                      <p className="text-[11px] text-emerald-400 pl-2 font-medium">
                        Resposta certa: {q.options[q.correctIndex]}
                      </p>
                      <p className="text-[11px] text-[#a39b8e] italic pl-2 border-l-2 border-amber-600/40 mt-1">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              onComplete({
                wpm: scoreData.wpm,
                comprehensionScore: scoreData.compPercent,
                durationSeconds: Math.round(scoreData.elapsedSeconds),
                effectiveWpm: scoreData.effectiveWpm
              });
            }}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 active:scale-98 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Salvar e Concluir Teste</span>
          </button>
        </div>
      )}
    </div>
  );
};
