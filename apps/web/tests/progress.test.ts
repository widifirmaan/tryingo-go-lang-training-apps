import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getStoredProgress,
  saveProgress,
  setPosition,
  getLastPosition,
  isWeekCompleted,
  toggleWeekCompleted,
  getTrackProgress,
  getTotalStats,
  PROGRESS_EVENT,
} from '../src/utils/progress';

const store = new Map<string, string>();
const dummy = { dispatchEvent: vi.fn() } as unknown as Window;

beforeEach(() => {
  store.clear();
  vi.stubGlobal('window', dummy);
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
});

describe('progress.ts', () => {
  it('getStoredProgress returns empty object when nothing saved', () => {
    expect(getStoredProgress()).toEqual({});
  });

  it('getStoredProgress ignores corrupt JSON', () => {
    store.set('tryngo-learning-progress', 'not json{');
    expect(getStoredProgress()).toEqual({});
  });

  it('saveProgress persists data and dispatches event', () => {
    saveProgress({ golang: { completedWeeks: [1, 2], lastUpdated: '2026-01-01' } });
    expect(JSON.parse(store.get('tryngo-learning-progress')!)).toEqual({
      golang: { completedWeeks: [1, 2], lastUpdated: '2026-01-01' },
    });
    expect(dummy.dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: PROGRESS_EVENT })
    );
  });

  it('isWeekCompleted reflects saved data', () => {
    expect(isWeekCompleted('golang', 3)).toBe(false);
    saveProgress({ golang: { completedWeeks: [3], lastUpdated: 'x' } });
    expect(isWeekCompleted('golang', 3)).toBe(true);
    expect(isWeekCompleted('golang', 4)).toBe(false);
  });

  it('toggleWeekCompleted adds and removes', () => {
    const added = toggleWeekCompleted('react', 1);
    expect(added).toBe(true);
    expect(isWeekCompleted('react', 1)).toBe(true);
    const removed = toggleWeekCompleted('react', 1);
    expect(removed).toBe(false);
    expect(isWeekCompleted('react', 1)).toBe(false);
  });

  it('toggleWeekCompleted keeps other weeks intact', () => {
    toggleWeekCompleted('react', 1);
    toggleWeekCompleted('react', 2);
    toggleWeekCompleted('react', 1); // remove
    const data = getStoredProgress();
    expect(data.react!.completedWeeks).toEqual([2]);
  });

  it('last position round-trips and validates', () => {
    expect(getLastPosition()).toBeNull();
    const pos = { slug: 'golang', level: 'beginer', week: 2, titleId: 'A', titleEn: 'B', updatedAt: 'now' };
    setPosition(pos);
    expect(getLastPosition()).toEqual(pos);
    store.set('tryngo-last-position', JSON.stringify({ slug: 'x' }));

    expect(getLastPosition()).toBeNull();
  });

  it('does not throw when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', undefined);
    expect(() => saveProgress({})).not.toThrow();
    expect(() => getLastPosition()).not.toThrow();
    expect(getLastPosition()).toBeNull();
  });

  it('getTrackProgress computes counts and percent', () => {
    saveProgress({ vue: { completedWeeks: [1, 3], lastUpdated: 'x' } });
    const p = getTrackProgress('vue', 4);
    expect(p.completedWeeks).toEqual([1, 3]);
    expect(p.completedCount).toBe(2);
    expect(p.percent).toBe(50);
    expect(p.isFinished).toBe(false);
    const done = getTrackProgress('vue', 1);
    expect(done.isFinished).toBe(true);
    expect(done.completedWeeks).toEqual([1]); // weeks > total filtered
  });

  it('getTotalStats aggregates across tracks', () => {
    saveProgress({
      vue: { completedWeeks: [1, 2], lastUpdated: 'x' },
      golang: { completedWeeks: [1], lastUpdated: 'y' },
    });
    const s = getTotalStats();
    expect(s.totalCompletedWeeks).toBe(3);
    expect(s.completedTracksCount).toBe(0); // needs >= 8 weeks to count
    toggleWeekCompleted('vue', 9);
    for (let w = 2; w <= 9; w++) toggleWeekCompleted('golang', w); // golang already had [1]
    expect(getTotalStats().completedTracksCount).toBe(1);
  });
});
