import React, { useState, useEffect } from 'react';
import { UserProfile, ExerciseResult, DailyProgress, ExerciseType, ReadingText } from './types';
import { storage } from './services/storageService';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { StudyGuideModal } from './components/StudyGuideModal';
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
import { getRandomAssessmentText, getRandomExerciseText } from './data/texts';

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>(storage.getDailyProgress());
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

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
    const loadedUser = storage.getUser();
    setUser(loadedUser);
    setResults(storage.getResults());
    setDailyProgress(storage.getDailyProgress());

    // Sincronização em segundo plano para manter perfil e nuvem sempre alinhados
    if (loadedUser && loadedUser.email) {
      void storage.syncToRemote(loadedUser, storage.getResults());
    }

    // Se o usuário existir mas nunca realizou o teste diagnóstico inicial, abre o teste
    if (loadedUser && !loadedUser.initialTestCompleted) {
      const initialText = getRandomAssessmentText();
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
    const initialText = getRandomAssessmentText();
    setActiveExercise({
      type: 'assessment',
      isInitialDiagnostic: true,
      customText: initialText
    });
  };

  // Restauração de Perfil Existente (por e-mail no celular ou código de sincronização)
  const handleRestoreUser = (restoredProfile: UserProfile) => {
    setUser(restoredProfile);
    setResults(storage.getResults());
    setDailyProgress(storage.getDailyProgress());

    // Se o perfil já completou o teste inicial, NÃO abre o teste novamente!
    if (!restoredProfile.initialTestCompleted) {
      const initialText = getRandomAssessmentText();
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
      // Configurar baseline e meta de +50%
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

    // Salvar resultado
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
    score?: number
  ) => {
    if (!user) return;

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

  // Iniciar Etapa da Jornada Diária (com randomização de textos para evitar repetições)
  const handleStartDailyStep = (stepId: number, type: ExerciseType) => {
    let customText: ReadingText | undefined;

    if (type === 'assessment') {
      const recentTitles = results.filter(r => r.exerciseType === 'assessment').map(r => r.title);
      customText = getRandomAssessmentText(recentTitles);
    } else if (type === 'metronome' || type === 'rsvp' || type === 'chunking') {
      const recentExerciseTitles = results.map(r => r.title);
      customText = getRandomExerciseText(recentExerciseTitles);
    }

    setActiveExercise({
      type,
      isDailyStep: true,
      dailyStepId: stepId,
      customText
    });
  };

  // Iniciar Exercício do Catálogo Livre
  const handleSelectFreeExercise = (type: ExerciseType) => {
    let customText: ReadingText | undefined;
    if (type === 'assessment') {
      const recentTitles = results.filter(r => r.exerciseType === 'assessment').map(r => r.title);
      customText = getRandomAssessmentText(recentTitles);
    }
    setActiveExercise({
      type,
      customText
    });
  };

  // Iniciar Texto da Biblioteca
  const handleSelectTextForExercise = (text: ReadingText, exerciseType: ExerciseType) => {
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
  };

  return (
    <div className="min-h-screen bg-[#191715] text-[#f3efe8] flex flex-col font-sans">
      {/* Modal de Cadastro / Restauração Multi-Dispositivo */}
      <AuthModal
        isOpen={user === null}
        onSave={handleSaveUser}
        onRestore={handleRestoreUser}
      />

      {/* Modal do Guia Científico */}
      <StudyGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Header Fixo */}
      <Header
        user={user}
        onOpenGuide={() => setIsGuideOpen(true)}
        onLogout={handleLogout}
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
                onComplete={(wpm, durMin) => {
                  handleGenericExerciseComplete(
                    'metronome',
                    `Metrônomo: ${activeExercise.customText?.title || 'Anti-Subvocalização'}`,
                    wpm,
                    durMin
                  );
                }}
              />
            )}

            {activeExercise.type === 'rsvp' && (
              <RSVPReader
                customText={activeExercise.customText}
                isDailyStep={activeExercise.isDailyStep}
                onBack={() => setActiveExercise(null)}
                onComplete={(wpm, durMin) => {
                  handleGenericExerciseComplete(
                    'rsvp',
                    `RSVP (ORP): ${activeExercise.customText?.title || 'Ponto Focal'}`,
                    wpm,
                    durMin
                  );
                }}
              />
            )}

            {activeExercise.type === 'chunking' && (
              <ChunkingTrainer
                customText={activeExercise.customText}
                isDailyStep={activeExercise.isDailyStep}
                onBack={() => setActiveExercise(null)}
                onComplete={(wpm, durMin) => {
                  handleGenericExerciseComplete(
                    'chunking',
                    `Blocos: ${activeExercise.customText?.title || 'Chunking'}`,
                    wpm,
                    durMin
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
                recentTitles={results.filter(r => r.exerciseType === 'assessment').map(r => r.title)}
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
                  onRetest={() => {
                    const recentTitles = results.filter(r => r.exerciseType === 'assessment').map(r => r.title);
                    const randomText = getRandomAssessmentText(recentTitles);
                    setActiveExercise({
                      type: 'assessment',
                      customText: randomText
                    });
                  }}
                />
              )}

              {activeTab === 'journey' && (
                <DailyJourneyView
                  dailyProgress={dailyProgress}
                  streakDays={user.streakDays}
                  onStartStep={handleStartDailyStep}
                />
              )}

              {activeTab === 'exercises' && (
                <ExercisesView onSelectExercise={handleSelectFreeExercise} />
              )}

              {activeTab === 'library' && (
                <LibraryView onSelectTextForExercise={handleSelectTextForExercise} />
              )}

              {activeTab === 'progress' && (
                <ProgressView
                  user={user}
                  results={results}
                  onRetest={() => {
                    const recentTitles = results.filter(r => r.exerciseType === 'assessment').map(r => r.title);
                    const randomText = getRandomAssessmentText(recentTitles);
                    setActiveExercise({
                      type: 'assessment',
                      customText: randomText
                    });
                  }}
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
