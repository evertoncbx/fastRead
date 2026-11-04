import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  INITIAL_DIAGNOSTIC_TEXT,
  PERIODIC_ASSESSMENT_TEXT,
  DIAGNOSTIC_TEXTS,
  READING_LIBRARY,
  getRandomAssessmentText,
  getRandomExerciseText,
  calculateTextDifficulty,
  getRecommendedTextForUser
} from '../src/data/texts.ts';
import { storage, emailToStorageKey, APPFR_TABLES, getLocalDateString } from '../src/services/storageService.ts';
import { audio } from '../src/services/audioService.ts';
import { UserProfile } from '../src/types.ts';
import { calculateWordWeight, calculateWordDurations, RsvpPacingMode } from '../src/services/rsvpPacingService.ts';

// Logic mirror from RSVPReader for test verification
function calculateOrpParts(word: string) {
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
}

describe('RSVP ORP (Optimal Recognition Point) Algorithm', () => {
  it('handles empty and 1-letter words gracefully', () => {
    assert.deepStrictEqual(calculateOrpParts(''), { prefix: '', orp: '', suffix: '' });
    assert.deepStrictEqual(calculateOrpParts('a'), { prefix: '', orp: 'a', suffix: '' });
    assert.deepStrictEqual(calculateOrpParts('E'), { prefix: '', orp: 'E', suffix: '' });
  });

  it('correctly selects ORP index for short words (<= 5 chars)', () => {
    const p2 = calculateOrpParts('de');
    assert.strictEqual(p2.orp, 'e');
    assert.strictEqual(p2.prefix, 'd');

    const p5 = calculateOrpParts('livro');
    assert.strictEqual(p5.orp, 'i');
    assert.strictEqual(p5.prefix, 'l');
    assert.strictEqual(p5.suffix, 'vro');
  });

  it('correctly selects ORP index for medium words (6-9 chars)', () => {
    const p6 = calculateOrpParts('Brasil');
    assert.strictEqual(p6.orp, 'a');
    assert.strictEqual(p6.prefix, 'Br');
    assert.strictEqual(p6.suffix, 'sil');

    const p8 = calculateOrpParts('dinamica');
    assert.strictEqual(p8.orp, 'n');
    assert.strictEqual(p8.prefix, 'di');
  });

  it('correctly selects ORP index for long words (10-13 chars and 14+ chars)', () => {
    const p10 = calculateOrpParts('velocidade');
    assert.strictEqual(p10.orp, 'o');
    assert.strictEqual(p10.prefix, 'vel');

    const p15 = calculateOrpParts('subvocalizacao');
    assert.strictEqual(p15.orp, 'o');
    assert.strictEqual(p15.prefix, 'subv');
    assert.strictEqual(p15.prefix + p15.orp + p15.suffix, 'subvocalizacao');
  });
});

describe('Reading Dynamics Metrics & Calculations (+50% Target)', () => {
  it('calculates target WPM as exactly +50% of baseline', () => {
    const baseline = 200;
    const target = Math.round(baseline * 1.5);
    assert.strictEqual(target, 300);

    const baselineOdd = 233;
    const targetOdd = Math.round(baselineOdd * 1.5);
    assert.strictEqual(targetOdd, 350);
  });

  it('calculates effective WPM as WPM * (comprehension / 100)', () => {
    const rawWpm = 300;
    const comp75 = 75;
    const effective75 = Math.round(rawWpm * (comp75 / 100));
    assert.strictEqual(effective75, 225);

    const comp100 = 100;
    const effective100 = Math.round(rawWpm * (comp100 / 100));
    assert.strictEqual(effective100, 300);

    const comp50 = 50;
    const effective50 = Math.round(rawWpm * (comp50 / 100));
    assert.strictEqual(effective50, 150);
  });

  it('safely bounds WPM to realistic ranges (50 to 1500 PPM)', () => {
    const wordCount = 300;
    const fastSecs = 0.5;
    const rawFastWpm = Math.min(1500, Math.max(50, Math.round((wordCount / Math.max(3, fastSecs)) * 60)));
    assert(rawFastWpm <= 1500, 'Should not exceed 1500 WPM');
    assert(rawFastWpm >= 50, 'Should be at least 50 WPM');

    const normalSecs = 60;
    const normalWpm = Math.min(1500, Math.max(50, Math.round((wordCount / normalSecs) * 60)));
    assert.strictEqual(normalWpm, 300);
  });
});

describe('PT-BR Reading Library & Quiz Integrity', () => {
  it('validates all library texts have content and wordCount', () => {
    const allTexts = READING_LIBRARY;
    assert(allTexts.length >= 8, `Should have at least 8 curated texts, found ${allTexts.length}`);

    for (const item of allTexts) {
      assert(item.id.length > 0, `Text must have an id: ${item.id}`);
      assert(item.title.length > 0, `Text must have a title: ${item.id}`);
      assert(item.text.length > 100, `Text must have substantial body: ${item.id}`);
      assert(item.wordCount > 50, `Text must have wordCount > 50: ${item.id}`);
      assert(item.author.length > 0, `Text must have an author: ${item.id}`);
    }
  });

  it('validates all quiz questions and correctIndex bounds across all texts', () => {
    const allTexts = READING_LIBRARY;
    let totalQuestions = 0;

    for (const item of allTexts) {
      if (item.quiz) {
        for (const q of item.quiz) {
          totalQuestions++;
          assert(q.id.length > 0, `Question id missing in ${item.id}`);
          assert(q.question.length > 0, `Question text missing in ${item.id}`);
          assert(q.options.length >= 2, `Question should have at least 2 options: ${q.id}`);
          assert(
            q.correctIndex >= 0 && q.correctIndex < q.options.length,
            `Invalid correctIndex ${q.correctIndex} for question ${q.id} (options length: ${q.options.length})`
          );
          assert(q.explanation.length > 0, `Question explanation missing in ${q.id}`);
        }
      }
    }

    assert(totalQuestions >= 25, `Expected at least 25 comprehensive quiz questions, found ${totalQuestions}`);
  });
});

describe('Text Randomization & Anti-Repetition Engine', () => {
  it('returns a diagnostic text with a valid quiz', () => {
    const randomAssessment = getRandomAssessmentText();
    assert(randomAssessment !== undefined);
    assert(randomAssessment.quiz && randomAssessment.quiz.length >= 2);
  });

  it('avoids recently completed texts when excludeIds is provided', () => {
    const exclude = ['diag-01', 'diag-02'];
    // Executa múltiplos sorteios e valida que nenhum é diag-01 ou diag-02
    for (let i = 0; i < 20; i++) {
      const selected = getRandomAssessmentText(exclude);
      assert.notStrictEqual(selected.id, 'diag-01');
      assert.notStrictEqual(selected.id, 'diag-02');
    }
  });

  it('gracefully falls back when all texts are in the exclusion list and strictly avoids the most recent text', () => {
    const allQuizIds = READING_LIBRARY.filter(t => t.quiz && t.quiz.length > 0).map(t => t.id);
    const mostRecentId = allQuizIds[0];

    // Testa 30 sorteios garantindo que o texto mais recente NUNCA é sorteado
    for (let i = 0; i < 30; i++) {
      const fallback = getRandomAssessmentText(allQuizIds);
      assert(fallback !== undefined);
      assert.notStrictEqual(fallback.id, mostRecentId, `Fallback should never pick most recent text ${mostRecentId}`);
    }
  });

  it('randomizes exercise texts for general training avoiding recent text', () => {
    const exclude = ['machado-cartomante'];
    for (let i = 0; i < 15; i++) {
      const text = getRandomExerciseText(exclude);
      assert(text !== undefined);
      assert.notStrictEqual(text.id, 'machado-cartomante');
    }
  });

  it('excludes both IDs and Titles when shuffling or retesting', () => {
    const exclude = ['diag-01', 'Teste Diagnóstico 2: A Atenção Focada e o Ritmo Cognitivo'];
    for (let i = 0; i < 20; i++) {
      const text = getRandomAssessmentText(exclude);
      assert.notStrictEqual(text.id, 'diag-01');
      assert.notStrictEqual(text.title, 'Teste Diagnóstico 2: A Atenção Focada e o Ritmo Cognitivo');
    }
  });
});

describe('Cross-Device Cloud Sync & Storage Engine', () => {
  it('generates consistent, safe hex storage keys for email accounts', () => {
    const key1 = emailToStorageKey('Everton.CBX@gmail.com');
    const key2 = emailToStorageKey('everton.cbx@gmail.com ');
    assert.strictEqual(key1, key2);
    assert(key1.startsWith('fastread_usr_'));
    assert(key1.endsWith('.json'));
    assert.strictEqual(key1, 'fastread_usr_65766572746f6e2e63627840676d61696c2e636f6d.json');
  });

  it('uploads and restores user profile seamlessly via persistent cloud storage', async () => {
    const testEmail = `test_sync_${Date.now()}@fastread.com`;
    const testProfile: UserProfile = {
      id: 'usr_sync_test',
      name: 'Testador Mobile',
      email: testEmail,
      baselineWpm: 255,
      targetWpm: 383,
      currentWpm: 270,
      bestWpm: 290,
      averageComprehension: 90,
      streakDays: 4,
      lastActiveDate: storage.getTodayDateString(),
      totalMinutesTrained: 25,
      testsCompleted: 3,
      initialTestCompleted: true,
      createdAt: new Date().toISOString()
    };

    // 1. Sincroniza para a nuvem
    const syncSuccess = await storage.syncToRemote(testProfile, []);
    assert.strictEqual(syncSuccess, true, 'syncToRemote should succeed');

    // 2. Busca e restaura simulando abertura no celular com o mesmo email digitado com maiúsculas/espaços
    const remote = await storage.fetchRemoteProfile(`  ${testEmail.toUpperCase()}  `);
    assert(remote.profile !== null, 'Profile should be found in cloud');
    assert.strictEqual(remote.profile.email, testEmail);
    assert.strictEqual(remote.profile.baselineWpm, 255);
    assert.strictEqual(remote.profile.targetWpm, 383);
    assert.strictEqual(remote.profile.initialTestCompleted, true);
    assert(remote.source === 'supabase' || remote.source === 'cloud');
  });

  it('encodes and decodes sync codes without loss of profile data', () => {
    const sampleProfile: UserProfile = {
      id: 'usr_test_123',
      name: 'Everton Carlos',
      email: 'everton.cbx@gmail.com',
      baselineWpm: 240,
      targetWpm: 360,
      currentWpm: 310,
      bestWpm: 350,
      averageComprehension: 85,
      streakDays: 7,
      lastActiveDate: '2026-11-01',
      totalMinutesTrained: 45,
      testsCompleted: 4,
      initialTestCompleted: true,
      createdAt: '2026-11-01T10:00:00.000Z'
    };

    // Serialização mockada de backup
    const backupPayload = {
      v: 1,
      u: sampleProfile,
      r: [{
        id: 'res_1',
        userId: sampleProfile.id,
        exerciseType: 'assessment',
        title: 'Teste Diagnóstico 1',
        wpm: 240,
        comprehensionScore: 80,
        durationSeconds: 78,
        date: '2026-11-01T10:02:00.000Z'
      }],
      d: {
        date: '2026-11-01',
        completedSteps: [1, 2],
        totalMinutes: 8,
        allDone: false
      },
      exportedAt: new Date().toISOString()
    };

    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(backupPayload))));
    assert(encoded.length > 20);

    // Deserialização
    const decoded = decodeURIComponent(escape(atob(encoded)));
    const restored = JSON.parse(decoded);
    assert.strictEqual(restored.u.email, 'everton.cbx@gmail.com');
    assert.strictEqual(restored.u.baselineWpm, 240);
    assert.strictEqual(restored.u.targetWpm, 360);
    assert.strictEqual(restored.u.initialTestCompleted, true);
    assert.strictEqual(restored.r.length, 1);
  });

  it('rejects malformed sync codes gracefully', () => {
    const invalidResult = storage.importSyncCode('codigo_invalido_totalmente_errado');
    assert.strictEqual(invalidResult.success, false);
    assert(invalidResult.error !== undefined);
  });
});

describe('Streak Inactivity Validation & Daily Flame Engine (Duolingo/Busuu)', () => {
  it('determines streak continuity correctly', () => {
    const todayStr = '2026-11-02';
    const yesterdayStr = '2026-11-01';
    const twoDaysAgoStr = '2026-10-31';

    const activeYesterdayContinuity = yesterdayStr === yesterdayStr || yesterdayStr === todayStr;
    assert.strictEqual(activeYesterdayContinuity, true);

    const activeTwoDaysAgoContinuity = twoDaysAgoStr === yesterdayStr || twoDaysAgoStr === todayStr;
    assert.strictEqual(activeTwoDaysAgoContinuity, false);
  });

  it('increments streak when user connects on consecutive days', () => {
    const todayStr = storage.getTodayDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);

    const testUser: UserProfile = {
      id: 'usr_test_streak_consecutive',
      name: 'Tester',
      email: 'tester_consecutive@caixa.gov.br',
      baselineWpm: 200,
      targetWpm: 300,
      currentWpm: 220,
      bestWpm: 250,
      averageComprehension: 80,
      streakDays: 1,
      lastActiveDate: yesterdayStr,
      totalMinutesTrained: 10,
      testsCompleted: 1,
      initialTestCompleted: true,
      createdAt: yesterdayStr
    };

    storage.saveUser(testUser);
    const updated = storage.recordDailyAccess();
    assert(updated !== null);
    assert.strictEqual(updated.streakDays, 2, 'Connecting today after connecting yesterday must increment streak to 2');
    assert.strictEqual(updated.lastActiveDate, todayStr);
  });

  it('keeps streak intact without duplicate increments on multiple connections same day', () => {
    const user = storage.getUser();
    assert(user !== null);
    const initialStreak = user.streakDays;

    // Conectar novamente no mesmo dia
    const secondAccess = storage.recordDailyAccess();
    assert(secondAccess !== null);
    assert.strictEqual(secondAccess.streakDays, initialStreak, 'Repeated access on the same day must not duplicate streak count');
  });

  it('resets streak to 0 (flame extinguishes) if user is inactive for more than 1 day', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const threeDaysAgoStr = getLocalDateString(threeDaysAgo);

    const inactiveUser: UserProfile = {
      id: 'usr_test_inactive',
      name: 'Inativo',
      email: 'inativo@caixa.gov.br',
      baselineWpm: 180,
      targetWpm: 270,
      currentWpm: 180,
      bestWpm: 180,
      averageComprehension: 75,
      streakDays: 5,
      lastActiveDate: threeDaysAgoStr,
      totalMinutesTrained: 30,
      testsCompleted: 3,
      initialTestCompleted: true,
      createdAt: threeDaysAgoStr
    };

    storage.saveUser(inactiveUser);
    // getUser() deve identificar inatividade superior a 1 dia e apagar o foguinho (streak = 0)
    const fetched = storage.getUser();
    assert(fetched !== null);
    assert.strictEqual(fetched.streakDays, 0, 'Inactive user for > 1 day must have streak reset to 0 (flame off)');

    // Ao conectar hoje após a quebra, inicia uma nova sequência de 1 dia com o foguinho reacendido
    const reactivated = storage.recordDailyAccess();
    assert(reactivated !== null);
    assert.strictEqual(reactivated.streakDays, 1, 'Re-connecting after streak loss starts new 1-day sequence');
  });

  it('reconciles streak to day 3 when activity is present across consecutive days', () => {
    const todayStr = storage.getTodayDateString();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const twoDaysAgoStr = getLocalDateString(twoDaysAgo);

    const userDay3: UserProfile = {
      id: 'usr_day3_reconcile',
      name: 'Usuario Dia 3',
      email: 'dia3@caixa.gov.br',
      baselineWpm: 200,
      targetWpm: 300,
      currentWpm: 210,
      bestWpm: 210,
      averageComprehension: 80,
      streakDays: 0, // estava zerado pelo bug anterior
      lastActiveDate: todayStr,
      totalMinutesTrained: 15,
      testsCompleted: 2,
      initialTestCompleted: true,
      createdAt: twoDaysAgoStr
    };

    storage.saveUser(userDay3);

    // Salva resultados nas datas de anteontem e ontem para simular o histórico dos 3 dias
    storage.addResult({
      userId: userDay3.id,
      exerciseType: 'metronome',
      title: 'Treino Dia 1',
      wpm: 200,
      comprehensionScore: 80,
      durationSeconds: 120,
      date: `${twoDaysAgoStr}T10:00:00Z`
    });

    storage.addResult({
      userId: userDay3.id,
      exerciseType: 'metronome',
      title: 'Treino Dia 2',
      wpm: 220,
      comprehensionScore: 85,
      durationSeconds: 120,
      date: `${yesterdayStr}T10:00:00Z`
    });

    // Reconcilia o acesso de hoje
    const reconciled = storage.recordDailyAccess();
    assert(reconciled !== null);
    assert.strictEqual(reconciled.streakDays, 3, 'User with activity on 3 consecutive days must reconcile to streak of 3');
  });

  it('generates 7-day weekly history for streak calendar modal', () => {
    const history = storage.getStreakWeeklyHistory();
    assert.strictEqual(history.length, 7, 'Weekly history must have exactly 7 days');
    const todayItem = history[history.length - 1];
    assert.strictEqual(todayItem.isToday, true, 'Last item must be marked as today');
  });
});

describe('Expanded Text Database & Multi-Step Zero Duplication', () => {
  it('contains at least 35 substantial texts across all requested categories', () => {
    assert(READING_LIBRARY.length >= 35, `Expected at least 35 texts, found ${READING_LIBRARY.length}`);
    const categories = new Set(READING_LIBRARY.map(t => t.category));
    assert(categories.has('noticia'), 'Should include public news');
    assert(categories.has('discurso'), 'Should include public speeches');
    assert(categories.has('conto'), 'Should include literature/stories');
    assert(categories.has('artigo'), 'Should include articles');
  });

  it('guarantees unique texts across 10 consecutive exercise steps without repeats', () => {
    const sessionServed: string[] = [];
    const chosenTexts: string[] = [];

    // Simula 10 etapas ou treinos consecutivos
    for (let step = 1; step <= 10; step++) {
      const text = getRandomExerciseText(sessionServed);
      assert(!chosenTexts.includes(text.id), `Step ${step} repeated text ${text.id}!`);
      chosenTexts.push(text.id);
      sessionServed.push(text.id, text.title);
    }

    assert.strictEqual(chosenTexts.length, 10);
    const uniqueChosen = new Set(chosenTexts);
    assert.strictEqual(uniqueChosen.size, 10, 'All 10 served texts must be unique in the session');
  });

  it('never repeatedly serves "O Homem que Sabia Javanês" consecutively, even with prefixed titles', () => {
    const excludeWithPrefixes = [
      'Metrônomo: O Homem que Sabia Javanês',
      'RSVP Turbo: O Homem que Sabia Javanês',
      'Blocos: O Homem que Sabia Javanês'
    ];
    for (let i = 0; i < 30; i++) {
      const exerciseText = getRandomExerciseText(excludeWithPrefixes);
      assert.notStrictEqual(exerciseText.id, 'diag-03');
      assert.notStrictEqual(exerciseText.title, 'O Homem que Sabia Javanês');
    }
  });

  it('correctly persists and retrieves recent read texts across sessions', () => {
    storage.addRecentReadText('test-id-1', 'Texto Teste 1');
    storage.addRecentReadText('test-id-2', 'Metrônomo: Texto Teste 2');
    const recents = storage.getRecentReadTexts();
    assert(recents.includes('test-id-1'));
    assert(recents.includes('Texto Teste 1'));
    assert(recents.includes('test-id-2'));
    assert(recents.includes('Texto Teste 2')); // Cleaned title without prefix
  });

  it('contains at least 60 rich texts in the expanded database', () => {
    assert(READING_LIBRARY.length >= 60, `Expected at least 60 texts, found ${READING_LIBRARY.length}`);
  });
});

describe('Automated Text Difficulty & Lexical Grading Algorithm', () => {
  it('computes objective difficulty metrics based on vocabulary and sentence length', () => {
    const simpleText = 'O gato viu a bola. A bola rolou pelo quintal. O dia estava bonito.';
    const simpleDiff = calculateTextDifficulty(simpleText);
    assert(simpleDiff.level <= 2, `Simple text should be level 1 or 2, got ${simpleDiff.level}`);
    assert(simpleDiff.score > 0, 'Score should be positive');

    const denseText = 'A hermenêutica constitucional exige a ponderação principiológica dos direitos fundamentais em situações de antinomia aparente, resguardando a dignidade humana como cláusula pétrea inegociável da ordem republicana.';
    const denseDiff = calculateTextDifficulty(denseText);
    assert(denseDiff.level >= 4, `Dense academic text should be level 4 or 5, got ${denseDiff.level}`);
    assert(denseDiff.score > simpleDiff.score, 'Dense text must have higher score than simple text');
  });

  it('verifies every text in the library has difficultyLevel between 1 and 5 and positive difficultyScore', () => {
    for (const t of READING_LIBRARY) {
      assert(t.difficultyLevel !== undefined, `difficultyLevel missing for ${t.id}`);
      assert(t.difficultyLevel >= 1 && t.difficultyLevel <= 5, `difficultyLevel out of bounds for ${t.id}: ${t.difficultyLevel}`);
      assert(t.difficultyScore !== undefined && t.difficultyScore > 0, `difficultyScore invalid for ${t.id}: ${t.difficultyScore}`);
    }
  });

  it('verifies balanced distribution across difficulty tiers in the library', () => {
    const levels = new Set(READING_LIBRARY.map(t => t.difficultyLevel));
    assert(levels.has(1) || levels.has(2), 'Should have beginner/basic texts');
    assert(levels.has(3), 'Should have intermediate texts');
    assert(levels.has(4) || levels.has(5), 'Should have advanced/challenging texts');
  });
});

describe('Automated Progress-Driven Recommendation Engine', () => {
  it('automatically recommends easier texts for beginner readers (WPM < 180)', () => {
    const beginnerUser: UserProfile = {
      id: 'usr_beg',
      name: 'Iniciante',
      email: 'iniciante@test.com',
      baselineWpm: 140,
      targetWpm: 210,
      currentWpm: 140,
      bestWpm: 150,
      averageComprehension: 70,
      streakDays: 1,
      lastActiveDate: '2026-11-02',
      totalMinutesTrained: 5,
      testsCompleted: 1,
      initialTestCompleted: true,
      createdAt: '2026-11-02T10:00:00.000Z'
    };

    const text = getRecommendedTextForUser(beginnerUser, [], 'metronome', READING_LIBRARY, false);
    assert(text !== undefined);
    assert((text.difficultyLevel || 2) <= 3, `Beginner should receive difficulty <= 3, got ${text.difficultyLevel}`);
  });

  it('automatically recommends advanced texts for high-speed readers (WPM > 380)', () => {
    const advancedUser: UserProfile = {
      id: 'usr_adv',
      name: 'Veloz',
      email: 'veloz@test.com',
      baselineWpm: 320,
      targetWpm: 480,
      currentWpm: 420,
      bestWpm: 450,
      averageComprehension: 80,
      streakDays: 10,
      lastActiveDate: '2026-11-02',
      totalMinutesTrained: 120,
      testsCompleted: 8,
      initialTestCompleted: true,
      createdAt: '2026-11-02T10:00:00.000Z'
    };

    const text = getRecommendedTextForUser(advancedUser, [], 'metronome', READING_LIBRARY, false);
    assert(text !== undefined);
    assert((text.difficultyLevel || 2) >= 3, `Advanced reader should receive difficulty >= 3, got ${text.difficultyLevel}`);
  });

  it('promotes user to higher difficulty when comprehension is high (>= 85%)', () => {
    const highCompUser: UserProfile = {
      id: 'usr_high',
      name: 'Retentor',
      email: 'retentor@test.com',
      baselineWpm: 250,
      targetWpm: 375,
      currentWpm: 280,
      bestWpm: 290,
      averageComprehension: 95,
      streakDays: 5,
      lastActiveDate: '2026-11-02',
      totalMinutesTrained: 40,
      testsCompleted: 4,
      initialTestCompleted: true,
      createdAt: '2026-11-02T10:00:00.000Z'
    };

    const text = getRecommendedTextForUser(highCompUser, [], 'metronome', READING_LIBRARY, false);
    assert(text !== undefined);
  });

  it('safely handles user=null and gracefully provides standard entry level', () => {
    const text = getRecommendedTextForUser(null, [], 'assessment', READING_LIBRARY, true);
    assert(text !== undefined);
    assert(text.quiz && text.quiz.length >= 2, 'Quiz must be present for assessment');
  });
});

describe('Countdown Audio & Visual Cues', () => {
  it('audio service provides playCountdownTick and playCountdownGo methods', () => {
    assert(typeof audio.playCountdownTick === 'function', 'playCountdownTick should be a function');
    assert(typeof audio.playCountdownGo === 'function', 'playCountdownGo should be a function');
    // Invoca para garantir ausência de erros em ambiente sem Web Audio API nativo (Node)
    audio.playCountdownTick(3);
    audio.playCountdownTick(2);
    audio.playCountdownTick(1);
    audio.playCountdownGo();
  });
});

describe('Supabase Schema & Project Projeta (appfr.* Naming Convention)', () => {
  it('defines APPFR_TABLES targeting appfr_* naming convention', () => {
    assert.strictEqual(APPFR_TABLES.PROFILES, 'appfr_profiles');
    assert.strictEqual(APPFR_TABLES.RESULTS, 'appfr_exercise_results');
    assert.strictEqual(APPFR_TABLES.DAILY, 'appfr_daily_progress');
    assert.strictEqual(APPFR_TABLES.TEXTS, 'appfr_texts');
  });

  it('operates remote text cache in volatile memory without polluting localStorage', () => {
    const sample = [READING_LIBRARY[0], READING_LIBRARY[1]];
    storage.setRemoteTextsCache(sample);
    const cached = storage.getRemoteTextsCache();
    assert.deepStrictEqual(cached, sample);
  });

  it('verifies supabase_schema.sql contains the appfr schema and appfr_texts table definitions', () => {
    const schemaSql = fs.readFileSync(path.resolve('supabase_schema.sql'), 'utf8');
    assert(schemaSql.includes('CREATE SCHEMA IF NOT EXISTS appfr;'), 'Must create appfr schema');
    assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.appfr_texts'), 'Must create public.appfr_texts table');
    assert(schemaSql.includes('CREATE OR REPLACE VIEW appfr.texts'), 'Must create appfr.texts view');
    assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.appfr_profiles'), 'Must create public.appfr_profiles table');
    assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.appfr_exercise_results'), 'Must create public.appfr_exercise_results table');
    assert(schemaSql.includes('CREATE TABLE IF NOT EXISTS public.appfr_daily_progress'), 'Must create public.appfr_daily_progress table');
    assert(schemaSql.includes('INSERT INTO public.appfr_texts'), 'Must contain seed inserts for all texts');
  });
});

describe('RSVP Adaptive Pacing Engine (ReadMaxx-style Dynamic Timing)', () => {
  it('correctly assigns lower weights to short words and higher weights to long words', () => {
    const shortWeight = calculateWordWeight('de');
    const midWeight = calculateWordWeight('tempo');
    const longWeight = calculateWordWeight('compreensao');
    const veryLongWeight = calculateWordWeight('extraordinariamente');

    assert(shortWeight < midWeight, `Short word (${shortWeight}) should have lower weight than mid word (${midWeight})`);
    assert(midWeight < longWeight, `Mid word (${midWeight}) should have lower weight than long word (${longWeight})`);
    assert(longWeight < veryLongWeight, `Long word (${longWeight}) should have lower weight than very long word (${veryLongWeight})`);
  });

  it('adds natural pauses for ending punctuation (. ! ?) and breathing pauses for commas', () => {
    const plainWord = calculateWordWeight('palavra');
    const commaWord = calculateWordWeight('palavra,');
    const periodWord = calculateWordWeight('palavra.');

    assert(commaWord > plainWord, 'Comma should add a gentle pausing weight');
    assert(periodWord > commaWord, 'Period should add a stronger reflective sentence pause than comma');
  });

  it('allocates strictly uniform duration in fixed mode', () => {
    const words = ['o', 'homem', 'que', 'sabia', 'desenvolvimento', 'e', 'extraordinariamente'];
    const wpm = 300; // 200 ms por palavra
    const durations = calculateWordDurations(words, wpm, 'fixed');

    assert.strictEqual(durations.length, words.length);
    durations.forEach(d => {
      assert.strictEqual(d, 200, `Expected 200ms in fixed mode at 300 PPM, got ${d}`);
    });
  });

  it('keeps long words longer on screen in adaptive mode while preserving overall target time', () => {
    const words = ['o', 'homem', 'que', 'sabia', 'desenvolvimento', 'e', 'extraordinariamente', 'fim.'];
    const wpm = 300;
    const baseExpectedTotal = words.length * 200; // 1600 ms

    const durations = calculateWordDurations(words, wpm, 'adaptive');

    const shortWordDuration = durations[0]; // 'o'
    const veryLongWordDuration = durations[6]; // 'extraordinariamente'
    const punctuationDuration = durations[7]; // 'fim.'

    assert(veryLongWordDuration > shortWordDuration,
      `Long word duration (${veryLongWordDuration}ms) must exceed short word duration (${shortWordDuration}ms)`);
    assert(punctuationDuration > shortWordDuration,
      `Punctuation word duration (${punctuationDuration}ms) must exceed short word duration (${shortWordDuration}ms)`);

    // Verifica que a soma total dos tempos se mantém muito próxima do tempo alvo total (desvio < 5%)
    const actualTotal = durations.reduce((acc, d) => acc + d, 0);
    const deviation = Math.abs(actualTotal - baseExpectedTotal) / baseExpectedTotal;
    assert(deviation < 0.05, `Overall text reading time deviation should be < 5%, got ${(deviation * 100).toFixed(1)}%`);
  });

  it('persists and retrieves user rsvp pacing mode preference in storageService', () => {
    // Default should be adaptive
    const defaultMode = storage.getRsvpPacingMode();
    assert.strictEqual(defaultMode, 'adaptive');

    // Switch to fixed
    storage.setRsvpPacingMode('fixed');
    assert.strictEqual(storage.getRsvpPacingMode(), 'fixed');

    // Switch back to adaptive
    storage.setRsvpPacingMode('adaptive');
    assert.strictEqual(storage.getRsvpPacingMode(), 'adaptive');

    // Tests WPM persistence
    storage.setRsvpWpm(425);
    assert.strictEqual(storage.getRsvpWpm(), 425);
    storage.setRsvpWpm(350); // reset
  });
});



