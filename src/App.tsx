import React, { useState, useEffect } from 'react';
import { UserProfile, ExerciseResult, DailyProgress, ExerciseType, ReadingText } from './types';
import { storage } from './services/storageService';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { StudyGuideModal } from './components/StudyGuideModal';
import { StreakModal } from './components/StreakModal';
import { DashboardView } from './components/views/DashboardView';
import { DailyJourneyView } from './components/views/DailyJourneyView';
import { ExercisesView } from './components/views/ExercisesView';
import { LibraryView } from './components/views/LibraryView';
import { ProgressView } from './components/views/ProgressView';
import { SchulteTable } from './components/exercises/SchulteTable';
import { MetronomeReader } from './components/exercises/MetronomeReader';
import { RSVPReader } from './components/exercises/RSVPReader';
import { ChunkingTrainer } from './components/exercises/ChunkingTrainer';
import { SaccadicTrainer } from './components/exercises/SaccadicTrainer';
import { ReadingTest } from './components/exercises/ReadingTest';
import { getRecommendedTextForUser, READING_LIBRARY, getRandomAssessmentText, getRandomExerciseText } from './data/texts';

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>(storage.getDailyProgress());
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState<boolean>(false);
  const [sessionServedTitles, setSessionServedTitles] = useState<string[]>([]);
  const [libraryTexts, setLibraryTexts] = useState<ReadingText[]>(READING_LIBRARY);

  // Estado de Exercício Ativo
  const [activeExercise, setActiveExercise] = useState<{
    type: ExerciseType;
    isDailyStep?: boolean;
    dailyStepId?: number;
    customText?: ReadingText;
    isInitialDiagnostic?: boolean;
  } | null>(null);

  // Carregar dados na inicialização
  useEffect(() => {
    // Registra e reconcilia automaticamente o acesso do dia e a ofensiva diária (streak)
    const loadedUser = storage.recordDailyAccess() || storage.getUser();
    setUser(loadedUser);
    setResults(storage.getResults());
    setDailyProgress(storage.getDailyProgress());

    // Carregar textos dinamicamente do Supabase (appfr.texts / appfr_texts)
    void storage.fetchRemoteTexts().then((remote) => {
      if (remote && remote.length > 0) {
        setLibraryTexts(remote);
      }
    });

    // Sincronização em segundo plano
    if (loadedUser && loadedUser.email) {
      void storage.syncToRemote(loadedUser, storage.getResults(), storage.getDailyProgress());
      void storage.fetchDailyProgressFromRemote(loadedUser.email).then((remoteDaily) => {
        if (remoteDaily) {
          setDailyProgress(remoteDaily);
        }
      });
    }

    // Se o usuário existir mas nunca realizou o teste diagnóstico inicial, abre o teste
    if (loadedUser && !loadedUser.initialTestCompleted) {
      const initialText = getRecommendedTextForUser(null, [], 'assessment', READING_LIBRARY, true);
      setSessionServedTitles([initialText.title]);
      setActiveExercise({
        type: 'assessment',
        isInitialDiagnostic: true,
        customText: initialText
      });
    }
  }, []);

  // Cadastro de Novo Usuário (Nome + Email)
  const handleSaveUser = (name: string, email: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name,
      email,
      baselineWpm: 0,
      targetWpm: 0,
      currentWpm: 0,
      bestWpm: 0,
      averageComprehension: 0,
      streakDays: 1,
      lastActiveDate: storage.getTodayDateString(),
      totalMinutesTrained: 0,
      testsCompleted: 0,
      initialTestCompleted: false,
      createdAt: new Date().toISOString()
    };

    storage.saveUser(newUser);
    setUser(newUser);

    // Imediatamente abre o teste diagnóstico inicial com texto randomizado para medir o baseline!
    const initialText = getRecommendedTextForUser(null, [], 'assessment', libraryTexts, true);
    setSessionServedTitles([initialText.title]);
    setActiveExercise({
      type: 'assessment',
      isInitialDiagnostic: true,
      customText: initialText
    });
  };

  // Restauração de Perfil Existente
  const handleRestoreUser = (restoredProfile: UserProfile) => {
    setUser(restoredProfile);
    setResults(storage.getResults());
    setDailyProgress(storage.getDailyProgress());

    if (!restoredProfile.initialTestCompleted) {
      const initialText = getRecommendedTextForUser(restoredProfile, [], 'assessment', libraryTexts, true);
      setSessionServedTitles([initialText.title]);
      setActiveExercise({
        type: 'assessment',
        isInitialDiagnostic: true,
        customText: initialText
      });
    } else {
      setActiveExercise(null);
      setActiveTab('dashboard');
    }
  };

  // Conclusão do Teste Inicial ou Periódico
  const handleAssessmentComplete = (data: {
    wpm: number;
    comprehensionScore: number;
    durationSeconds: number;
    effectiveWpm: number;
    textTitle?: string;
    textId?: string;
  }) => {
    if (!user) return;

    if (activeExercise?.isInitialDiagnostic) {
      const targetWpm = Math.round(data.wpm * 1.5);
      const updated = storage.updateUserProfile({
        baselineWpm: data.wpm,
        targetWpm,
        currentWpm: data.wpm,
        bestWpm: data.wpm,
        averageComprehension: data.comprehensionScore,
        initialTestCompleted: true
      });
      if (updated) setUser(updated);
    }

    const completedTitle = data.textTitle || activeExercise?.customText?.title || (activeExercise?.isInitialDiagnostic ? 'Teste Diagnóstico Inicial' : 'Teste de Aferição (+50%)');

    if (data.textId || completedTitle) {
      storage.addRecentReadText(data.textId || '', completedTitle);
    }

    storage.addResult({
      userId: user.id,
      exerciseType: 'assessment',
      title: completedTitle,
      wpm: data.wpm,
      comprehensionScore: data.comprehensionScore,
      durationSeconds: data.durationSeconds
    });

    if (activeExercise?.dailyStepId) {
      const updatedDaily = storage.markDailyStepComplete(activeExercise.dailyStepId, 3);
      setDailyProgress(updatedDaily);
    }

    setResults(storage.getResults());
    const refreshedUser = storage.getUser();
    if (refreshedUser) setUser(refreshedUser);

    setActiveExercise(null);
  };

  // Conclusão de Exercício Geral (Schulte, Metrônomo, RSVP, Blocos, Saltos)
  const handleGenericExerciseComplete = (
    exerciseType: ExerciseType,
    title: string,
    wpm?: number,
    durationMinutes: number = 3,
    score?: number,
    textId?: string,
    rawTextTitle?: string
  ) => {
    if (!user) return;

    if (textId || rawTextTitle) {
      storage.addRecentReadText(textId || '', rawTextTitle);
    }

    storage.addResult({
      userId: user.id,
      exerciseType,
      title,
      wpm,
      score,
      durationSeconds: durationMinutes * 60
    });

    if (activeExercise?.dailyStepId) {
      const updatedDaily = storage.markDailyStepComplete(activeExercise.dailyStepId, durationMinutes);
      setDailyProgress(updatedDaily);
    }

    setResults(storage.getResults());
    const refreshedUser = storage.getUser();
    if (refreshedUser) setUser(refreshedUser);

    setActiveExercise(null);
  };

  // Obter lista consolidada de exclusões (persistente + histórico + sessão)
  const getExclusionList = () => {
    const persisted = storage.getRecentReadTexts();
    const resultTitles = results.map(r => r.title);
    return Array.from(new Set([
      ...persisted,
      ...resultTitles,
      ...sessionServedTitles
    ]));
  };

  // Iniciar Etapa da Jornada Diária (com recomendação automática baseada no desempenho)
  const handleStartDailyStep = (stepId: number, type: ExerciseType) => {
    let customText: ReadingText | undefined;
    const exclusions = getExclusionList();

    if (type === 'assessment') {
      customText = getRecommendedTextForUser(user, exclusions, 'assessment', libraryTexts, true);
    } else if (type === 'metronome' || type === 'rsvp' || type === 'chunking') {
      customText = getRecommendedTextForUser(user, exclusions, type, libraryTexts, false);
    }

    if (customText) {
      storage.addRecentReadText(customText.id, customText.title);
      setSessionServedTitles(prev => [customText.title, ...prev.slice(0, 20)]);
    }

    setActiveExercise({
      type,
      isDailyStep: true,
      dailyStepId: stepId,
      customText
    });
  };

  // Iniciar Exercício do Treino Livre (com seleção automática de dificuldade)
  const handleSelectFreeExercise = (type: ExerciseType) => {
    let customText: ReadingText | undefined;
    const exclusions = getExclusionList();

    if (type === 'assessment') {
      customText = getRecommendedTextForUser(user, exclusions, 'assessment', libraryTexts, true);
    } else if (type === 'metronome' || type === 'rsvp' || type === 'chunking') {
      customText = getRecommendedTextForUser(user, exclusions, type, libraryTexts, false);
    }

    if (customText) {
      storage.addRecentReadText(customText.id, customText.title);
      setSessionServedTitles(prev => [customText.title, ...prev.slice(0, 20)]);
    }

    setActiveExercise({
      type,
      customText
    });
  };

  // Iniciar Texto da Biblioteca
  const handleSelectTextForExercise = (text: ReadingText, exerciseType: ExerciseType) => {
    storage.addRecentReadText(text.id, text.title);
    setSessionServedTitles(prev => [text.title, ...prev.slice(0, 20)]);
    setActiveExercise({
      type: exerciseType,
      customText: text
    });
  };

  // Desconectar / Trocar de Conta
  const handleLogout = () => {
    storage.clearAllData();
    setUser(null);
    setResults([]);
    setActiveExercise(null);
    setSessionServedTitles([]);
  };

  const handleRetest = () => {
    const exclusions = getExclusionList();
    const randomText = getRecommendedTextForUser(user, exclusions, 'assessment', libraryTexts, true);
    storage.addRecentReadText(randomText.id, randomText.title);
    setSessionServedTitles(prev => [randomText.title, ...prev.slice(0, 20)]);
    setActiveExercise({
      type: 'assessment',
      customText: randomText
    });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7F7F7] text-[#131F24] flex flex-col font-sans">
      {/* Modal de Cadastro / Restauração Multi-Dispositivo */}
      <AuthModal
        isOpen={user === null}
        onSave={handleSaveUser}
        onRestore={handleRestoreUser}
      />

      {/* Modal do Guia Rápido */}
      <StudyGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Modal da Ofensiva / Sequência Diária (Estilo Duolingo) */}
      <StreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        user={user}
        onStartTraining={() => {
          setActiveTab('journey');
          setIsStreakModalOpen(false);
        }}
        onStreakUpdated={(updated) => setUser(updated)}
      />

      {/* Header Fixo */}
      <Header
        user={user}
        onOpenGuide={() => setIsGuideOpen(true)}
        onLogout={handleLogout}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 w-full max-w-lg mx-auto overflow-x-hidden">
        {/* MODO EXERCÍCIO ATIVO */}
        {activeExercise ? (
          <div>
            {activeExercise.type === 'schulte' && (
              <SchulteTable
                isDailyStep={activeExercise.isDailyStep}
                onBack={() => setActiveExercise(null)}
                onComplete={(timeSecs) => {
                  handleGenericExerciseComplete(
                    'schulte',
                    'Tabela de Schulte (Visão Periférica)',
                    undefined,
                    3,
                    timeSecs
                  );
                }}
              />
            )}

            {activeExercise.type === 'metronome' && (
              <MetronomeReader
                customText={activeExercise.customText}
                isDailyStep={activeExercise.isDailyStep}
                onBack={() => setActiveExercise(null)}
                onComplete={(wpm, durMin, textTitle, textId) => {
                  const resolvedTitle = textTitle || activeExercise.customText?.title;
                  handleGenericExerciseComplete(
                    'metronome',
                    resolvedTitle ? `Metrônomo: ${resolvedTitle}` : 'Metrônomo: Ritmo & Foco',
                    wpm,
                    durMin,
                    undefined,
                    textId || activeExercise.customText?.id,
                    resolvedTitle
                  );
                }}
              />
            )}

            {activeExercise.type === 'rsvp' && (
              <RSVPReader
                customText={activeExercise.customText}
                isDailyStep={activeExercise.isDailyStep}
                onBack={() => setActiveExercise(null)}
                onComplete={(wpm, durMin, textTitle, textId) => {
                  const resolvedTitle = textTitle || activeExercise.customText?.title;
                  handleGenericExerciseComplete(
                    'rsvp',
                    resolvedTitle ? `RSVP Turbo: ${resolvedTitle}` : 'RSVP Turbo: Ponto Focal',
                    wpm,
                    durMin,
                    undefined,
                    textId || activeExercise.customText?.id,
                    resolvedTitle
                  );
                }}
              />
            )}

            {activeExercise.type === 'chunking' && (
              <ChunkingTrainer
                customText={activeExercise.customText}
                isDailyStep={activeExercise.isDailyStep}
                onBack={() => setActiveExercise(null)}
                onComplete={(wpm, durMin, textTitle, textId) => {
                  const resolvedTitle = textTitle || activeExercise.customText?.title;
                  handleGenericExerciseComplete(
                    'chunking',
                    resolvedTitle ? `Blocos: ${resolvedTitle}` : 'Blocos: Grupos de Palavras',
                    wpm,
                    durMin,
                    undefined,
                    textId || activeExercise.customText?.id,
                    resolvedTitle
                  );
                }}
              />
            )}

            {activeExercise.type === 'saccadic' && (
              <SaccadicTrainer
                isDailyStep={activeExercise.isDailyStep}
                onBack={() => setActiveExercise(null)}
                onComplete={(wpm, durMin) => {
                  handleGenericExerciseComplete(
                    'saccadic',
                    'Saltos Sacádicos Bilaterais',
                    wpm,
                    durMin
                  );
                }}
              />
            )}

            {activeExercise.type === 'assessment' && (
              <ReadingTest
                customText={activeExercise.customText}
                isInitialTest={activeExercise.isInitialDiagnostic}
                baselineWpm={user?.baselineWpm || 0}
                recentTitles={getExclusionList()}
                onBack={() => setActiveExercise(null)}
                onComplete={handleAssessmentComplete}
              />
            )}
          </div>
        ) : (
          /* NAVEGAÇÃO DE ABAS */
          user && (
            <div>
              {activeTab === 'dashboard' && (
                <DashboardView
                  user={user}
                  dailyProgress={dailyProgress}
                  onNavigate={(tab) => setActiveTab(tab)}
                  onStartDailyWorkout={() => setActiveTab('journey')}
                  onRetest={handleRetest}
                  onStartStep={handleStartDailyStep}
                  onOpenStreakModal={() => setIsStreakModalOpen(true)}
                />
              )}

              {activeTab === 'journey' && (
                <DailyJourneyView
                  dailyProgress={dailyProgress}
                  streakDays={user.streakDays}
                  onStartStep={handleStartDailyStep}
                  onOpenStreakModal={() => setIsStreakModalOpen(true)}
                />
              )}

              {activeTab === 'exercises' && (
                <ExercisesView onSelectExercise={handleSelectFreeExercise} />
              )}

              {activeTab === 'library' && (
                <LibraryView
                  libraryTexts={libraryTexts}
                  onSelectTextForExercise={handleSelectTextForExercise}
                />
              )}

              {activeTab === 'progress' && (
                <ProgressView
                  user={user}
                  results={results}
                  onRetest={handleRetest}
                  onOpenStreakModal={() => setIsStreakModalOpen(true)}
                />
              )}
            </div>
          )
        )}
      </main>

      {/* Navegação Inferior Fixa */}
      {!activeExercise && (
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab)}
          dailyDoneCount={dailyProgress.completedSteps.length}
        />
      )}
    </div>
  );
};

export default App;
