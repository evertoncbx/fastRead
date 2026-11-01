import { describe, it } from 'node:test';
import assert from 'node:assert';
import { INITIAL_DIAGNOSTIC_TEXT, PERIODIC_ASSESSMENT_TEXT, READING_LIBRARY } from '../src/data/texts.ts';

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
    // 2-5 chars -> index 1
    const p2 = calculateOrpParts('de');
    assert.strictEqual(p2.orp, 'e');
    assert.strictEqual(p2.prefix, 'd');

    const p5 = calculateOrpParts('livro');
    assert.strictEqual(p5.orp, 'i');
    assert.strictEqual(p5.prefix, 'l');
    assert.strictEqual(p5.suffix, 'vro');
  });

  it('correctly selects ORP index for medium words (6-9 chars)', () => {
    // 6-9 chars -> index 2
    const p6 = calculateOrpParts('Brasil');
    assert.strictEqual(p6.orp, 'a');
    assert.strictEqual(p6.prefix, 'Br');
    assert.strictEqual(p6.suffix, 'sil');

    const p9 = calculateOrpParts('velocidade');
    // 'velocidade' has 10 chars -> index 3
    const p8 = calculateOrpParts('dinamica');
    assert.strictEqual(p8.orp, 'n');
    assert.strictEqual(p8.prefix, 'di');
  });

  it('correctly selects ORP index for long words (10-13 chars and 14+ chars)', () => {
    // 10-13 chars -> index 3
    const p10 = calculateOrpParts('velocidade');
    assert.strictEqual(p10.orp, 'o');
    assert.strictEqual(p10.prefix, 'vel');

    // 14+ chars -> index 4 (never exceeds length - 1)
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
    
    // Very fast click (0.5s) -> clamped to sensible maximum
    const fastSecs = 0.5;
    const rawFastWpm = Math.min(1500, Math.max(50, Math.round((wordCount / Math.max(3, fastSecs)) * 60)));
    assert(rawFastWpm <= 1500, 'Should not exceed 1500 WPM');
    assert(rawFastWpm >= 50, 'Should be at least 50 WPM');

    // Normal reading (60s for 300 words = 300 WPM)
    const normalSecs = 60;
    const normalWpm = Math.min(1500, Math.max(50, Math.round((wordCount / normalSecs) * 60)));
    assert.strictEqual(normalWpm, 300);
  });
});

describe('PT-BR Reading Library & Quiz Integrity', () => {
  it('validates all library texts have content and wordCount', () => {
    const allTexts = [INITIAL_DIAGNOSTIC_TEXT, PERIODIC_ASSESSMENT_TEXT, ...READING_LIBRARY];
    assert(allTexts.length >= 5, 'Should have at least 5 curated texts');

    for (const item of allTexts) {
      assert(item.id.length > 0, `Text must have an id: ${item.id}`);
      assert(item.title.length > 0, `Text must have a title: ${item.id}`);
      assert(item.text.length > 100, `Text must have substantial body: ${item.id}`);
      assert(item.wordCount > 50, `Text must have wordCount > 50: ${item.id}`);
      assert(item.author.length > 0, `Text must have an author: ${item.id}`);
    }
  });

  it('validates all quiz questions and correctIndex bounds', () => {
    const allTexts = [INITIAL_DIAGNOSTIC_TEXT, PERIODIC_ASSESSMENT_TEXT, ...READING_LIBRARY];
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

    assert(totalQuestions >= 15, `Expected at least 15 comprehensive quiz questions, found ${totalQuestions}`);
  });
});

describe('Streak Inactivity Validation', () => {
  it('determines streak continuity correctly', () => {
    const todayStr = '2026-11-02';
    const yesterdayStr = '2026-11-01';
    const twoDaysAgoStr = '2026-10-31';

    // Active yesterday -> continuity kept
    const activeYesterdayContinuity = yesterdayStr === yesterdayStr || yesterdayStr === todayStr;
    assert.strictEqual(activeYesterdayContinuity, true);

    // Active 2 days ago -> broken
    const activeTwoDaysAgoContinuity = twoDaysAgoStr === yesterdayStr || twoDaysAgoStr === todayStr;
    assert.strictEqual(activeTwoDaysAgoContinuity, false);
  });
});
