import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, ArrowLeft, Timer, Brain, Award, ChevronRight, Shuffle } from 'lucide-react';
import { ReadingText } from '../../types';
import { getRandomAssessmentText } from '../../data/texts';
import { audio } from '../../services/audioService';
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
  // Inicialização inteligente do texto: se não for passado customText, sorteia evitando textos recentes
  const [text, setText] = useState<ReadingText>(() => {
    if (customText) return customText;
    return getRandomAssessmentText(recentTitles);
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

  useEffect(() => {
    if (customText) {
      setText(customText);
    }
  }, [customText]);

  const handleShuffleText = () => {
    const exclude = [text.id, text.title, ...recentTitles];
    const newText = getRandomAssessmentText(exclude);
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
      // Calcular score final
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
    <div className="flex flex-col min-h-full max-w-lg mx-auto p-4 pb-24 text-stone-800">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        {onBack && phase === 'intro' ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors py-1 px-2.5 rounded-lg bg-white border border-stone-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        ) : <div />}

        {phase === 'reading' && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-mono font-bold animate-pulse">
            <Timer className="w-3.5 h-3.5" />
            <span>{elapsedSeconds.toFixed(1)}s</span>
          </div>
        )}
      </div>

      {/* FASE 1: INTRODUÇÃO */}
      {phase === 'intro' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-stone-900 mb-1">
              {isInitialTest ? 'Teste Diagnóstico Inicial' : 'Teste de Aferição de Progresso'}
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              {isInitialTest
                ? 'Este teste medirá sua velocidade de leitura natural (PPM) e sua taxa de retenção. Ele definirá a sua meta personalizada de aumento de +50%!'
                : 'Averigue o seu avanço após as sessões de treino e meça a sua aproximação da meta de +50% de velocidade.'}
            </p>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <Brain className="w-4 h-4" />
                <span>Como funciona o teste:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                <li>Leia o texto no seu ritmo natural de compreensão, sem forçar pressa artificial.</li>
                <li>Ao terminar a última palavra, aperte o botão "Terminei de Ler".</li>
                <li>Responda às perguntas para avaliar a absorção real do conteúdo.</li>
              </ul>
            </div>
          </div>

          {/* Card do Texto Selecionado com botão de Randomização */}
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex items-center justify-between text-xs text-stone-600 shadow-xs">
            <div className="pr-2 flex-1">
              <span className="block text-stone-500 text-xs uppercase tracking-wider font-bold">Texto Selecionado</span>
              <strong className="text-stone-900 text-sm sm:text-base block leading-snug">{text.title}</strong>
              <span className="text-xs text-emerald-800 font-mono font-bold block mt-0.5">{text.wordCount} palavras • ~{text.estimatedMinutes} min</span>
            </div>

            <button
              onClick={handleShuffleText}
              title="Sortear outro texto para este teste"
              className="py-1.5 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Sortear Outro</span>
            </button>
          </div>

          <button
            onClick={handleStartReading}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Começar a Ler Agora</span>
          </button>
        </div>
      )}

      {/* FASE 2: LEITURA EM ANDAMENTO (Estilo Editorial Papel & Livro) */}
      {phase === 'reading' && (
        <div className="space-y-4">
          <div className="bg-[#FCFBF8] border border-stone-200 rounded-3xl p-5 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-1">{text.title}</h3>
            <span className="text-xs text-stone-500 block mb-4 italic">Por {text.author}</span>

            {/* Texto formatado com tipografia confortável editorial */}
            <div className="text-stone-800 text-sm md:text-base leading-relaxed space-y-3 font-reading max-h-[52vh] overflow-y-auto pr-1 selection:bg-emerald-500/20">
              {text.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="indent-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinishReading}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Terminei de Ler! ({elapsedSeconds.toFixed(1)}s)</span>
          </button>
        </div>
      )}

      {/* FASE 3: QUESTIONÁRIO DE COMPREENSÃO */}
      {phase === 'quiz' && text.quiz && (
        <div className="space-y-4">
          <div className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <span className="text-xs text-stone-500 font-medium">
              Pergunta {currentQuizIndex + 1} de {text.quiz.length}
            </span>
            <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-bold">
              Retenção e Compreensão
            </span>
          </div>

          {(() => {
            const currentQ = text.quiz[currentQuizIndex];
            const selectedOpt = answers[currentQ.id];

            return (
              <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-xs space-y-4">
                <h3 className="text-sm md:text-base font-bold text-stone-900 leading-snug">
                  {currentQ.question}
                </h3>

                <div className="space-y-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-2xl text-left text-sm md:text-base font-bold transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-md border-b-4 border-emerald-800 ring-2 ring-emerald-400'
                            : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border-2 border-stone-200'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                          isSelected ? 'bg-white text-emerald-800' : 'bg-stone-200 text-stone-700'
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
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 border-b-4 border-emerald-800 shadow-md transition-all mt-4 cursor-pointer active:scale-98"
                >
                  <span>{currentQuizIndex < text.quiz.length - 1 ? 'Próxima Pergunta' : 'Finalizar Teste'}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* FASE 4: RESULTADO DETALHADO */}
      {phase === 'result' && scoreData && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-1">
              {isInitialTest ? 'Linha de Base Estabelecida' : 'Resultado do Teste'}
            </span>
            <h2 className="text-2xl font-black text-stone-900 mb-2">
              {scoreData.wpm} <span className="text-base text-stone-500 font-normal">PPM</span>
            </h2>
            <p className="text-xs text-stone-600 max-w-xs mx-auto mb-5">
              Você leu {text.wordCount} palavras em {scoreData.elapsedSeconds.toFixed(1)} segundos com {scoreData.compPercent}% de retenção.
            </p>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-stone-50 p-3.5 rounded-2xl border-2 border-stone-200">
                <span className="text-xs text-stone-500 uppercase tracking-wider block font-bold">Compreensão</span>
                <span className={`text-2xl font-black font-mono ${
                  scoreData.compPercent >= 75 ? 'text-emerald-700' : 'text-amber-700'
                }`}>
                  {scoreData.compPercent}%
                </span>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-2xl border-2 border-stone-200">
                <span className="text-xs text-stone-500 uppercase tracking-wider block font-bold">PPM Eficaz</span>
                <span className="text-2xl font-black font-mono text-emerald-700">
                  {scoreData.effectiveWpm}
                </span>
              </div>
            </div>

            {/* Meta de +50% */}
            <div className="bg-stone-50 border-2 border-stone-200 p-4 rounded-2xl text-left space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-stone-700 font-bold">Meta de Aumento (+50%):</span>
                <strong className="text-emerald-700 font-mono text-base font-black">{targetWpm} PPM</strong>
              </div>

              {baselineWpm > 0 && !isInitialTest && (
                <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-stone-200">
                  <span className="text-stone-600 font-medium">Evolução desde o início:</span>
                  <span className={`font-black font-mono ${percentGain >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {percentGain > 0 ? `+${percentGain}%` : `${percentGain}%`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Gabarito e Revisão de Retenção */}
          {text.quiz && text.quiz.length > 0 && (
            <div className="bg-white border-2 border-stone-200 p-5 rounded-3xl text-left space-y-3.5 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-black block">
                Gabarito Comentado & Justificativas
              </span>
              <div className="space-y-3">
                {text.quiz.map((q, idx) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correctIndex;

                  return (
                    <div key={q.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm space-y-2">
                      <div className="flex items-start gap-2 font-bold text-stone-900">
                        <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {isCorrect ? '✓ Correto' : '✗ Incorreto'}
                        </span>
                        <span>{idx + 1}. {q.question}</span>
                      </div>
                      {!isCorrect && userAns !== undefined && (
                        <p className="text-xs text-rose-700 font-semibold pl-2">
                          Sua escolha: <span className="line-through">{q.options[userAns]}</span>
                        </p>
                      )}
                      <p className="text-xs text-emerald-800 pl-2 font-bold">
                        Resposta certa: {q.options[q.correctIndex]}
                      </p>
                      <p className="text-xs text-stone-600 italic pl-2 border-l-2 border-emerald-500/50 mt-1 leading-relaxed">
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
                effectiveWpm: scoreData.effectiveWpm,
                textTitle: text.title,
                textId: text.id
              });
            }}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Salvar e Concluir Teste</span>
          </button>
        </div>
      )}
    </div>
  );
};
