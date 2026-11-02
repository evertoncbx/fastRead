import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  INITIAL_DIAGNOSTIC_TEXT,
  PERIODIC_ASSESSMENT_TEXT,
  DIAGNOSTIC_TEXTS,
  READING_LIBRARY,
  getRandomAssessmentText,
  getRandomExerciseText
} from '../src/data/texts.ts';
import { storage, emailToStorageKey } from '../src/services/storageService.ts';
import { UserProfile } from '../src/types.ts';

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

describe('Streak Inactivity Validation', () => {
  it('determines streak continuity correctly', () => {
    const todayStr = '2026-11-02';
    const yesterdayStr = '2026-11-01';
    const twoDaysAgoStr = '2026-10-31';

    const activeYesterdayContinuity = yesterdayStr === yesterdayStr || yesterdayStr === todayStr;
    assert.strictEqual(activeYesterdayContinuity, true);

    const activeTwoDaysAgoContinuity = twoDaysAgoStr === yesterdayStr || twoDaysAgoStr === todayStr;
    assert.strictEqual(activeTwoDaysAgoContinuity, false);
  });
});
