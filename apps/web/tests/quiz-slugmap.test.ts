import { describe, it, expect } from 'vitest';
import { getTrackQuiz, flattenQuiz } from '../src/utils/quiz';
import type { QuizIndex, QuizLevel } from '../src/utils/quiz';
import { SLUG_MAP, REVERSE_SLUG_MAP } from '../src/data/slugMap';
import { getCurriculum } from '../src/data/curriculum';

const indexWith: QuizIndex = {
  generatedAt: '2026-01-01',
  tracks: {
    golang: {
      id: [{ levelName: 'Pemula', weeks: [{ week: 1, topic: 'X', questions: [{ type: 'mcq', question: 'q', options: ['a', 'b'], answer: 0 }] }] }] as unknown as QuizLevel[],
      en: [{ levelName: 'Beginner', weeks: [{ week: 1, topic: 'Y', questions: [{ type: 'tf', question: 'q2', answer: true }] }] }] as unknown as QuizLevel[],
    },
  },
} as unknown as QuizIndex;

describe('quiz.ts', () => {
  it('getTrackQuiz resolves slug + language, empty for unknown slug', () => {
    expect(getTrackQuiz(indexWith, 'golang', 'id').length).toBe(1);
    expect(getTrackQuiz(indexWith, 'unknown-slug', 'id')).toEqual([]);
  });

  it('flattenQuiz flattens levels into flat questions carrying context', () => {
    const flat = flattenQuiz(getTrackQuiz(indexWith, 'golang', 'id'));
    expect(flat.length).toBe(1);
    expect(flat[0].levelIndex).toBe(0);
    expect(flat[0].levelName).toBe('Pemula');
    expect(flat[0].week).toBe(1);
    expect(flat[0].topic).toBe('X');
    expect(flat[0].q).toMatchObject({ question: 'q' });
  });
});

describe('slugMap.ts', () => {
  it('REVERSE_SLUG_MAP inverts SLUG_MAP', () => {
    expect(Object.keys(REVERSE_SLUG_MAP).length).toBe(28);
    for (const [trackId, slug] of Object.entries(SLUG_MAP)) {
      expect(REVERSE_SLUG_MAP[slug]).toBe(trackId);
    }
  });
});

describe('curriculum.ts', () => {
  it('returns custom curriculum for known slug and default otherwise', () => {
    const go = getCurriculum('golang');
    expect(go.length).toBeGreaterThanOrEqual(3);
    expect(go[0].weeks.length).toBeGreaterThan(0);
    expect(getCurriculum('nope-not-a-track').length).toBe(4);
  });

  it('every mapped track defines levels with non-empty week titles', () => {
    const slugs = new Set(Object.values(SLUG_MAP));
    expect(slugs.size).toBe(28);
    for (const slug of slugs) {
      const levels = getCurriculum(slug);
      expect(levels.length, slug).toBeGreaterThanOrEqual(2);
      for (const lv of levels) {
        expect(lv.weeks.length, `${slug}/${lv.levelId ?? ''}`).toBeGreaterThan(0);
        for (const w of lv.weeks) {
          expect(w.titleId.length, `${slug}/w${w.week}`).toBeGreaterThan(0);
          expect(w.titleEn.length, `${slug}/w${w.week}`).toBeGreaterThan(0);
        }
      }
    }
  });
});
