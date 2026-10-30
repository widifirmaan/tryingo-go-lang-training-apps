/**
 * Progress tracking utility for Tryngo
 * Saves completed weeks, last reading position, and triggers updates
 */

const STORAGE_KEY = 'tryngo-learning-progress';
export const PROGRESS_EVENT = 'tryngo-progress-update';

export interface ProgressData {
  [trackSlug: string]: {
    completedWeeks: number[];
    lastUpdated: string;
  };
}

export interface LastPosition {
  slug: string;
  level: string;
  week: number;
  titleId: string;
  titleEn: string;
  updatedAt: string;
}

export function getStoredProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

// --- Last reading position (powers "Lanjutkan Belajar") ---

const POSITION_KEY = 'tryngo-last-position';

export function setPosition(pos: LastPosition): void {
  try {
    localStorage.setItem(POSITION_KEY, JSON.stringify(pos));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch (err) {
    console.error('Failed to save last position to localStorage', err);
  }
}

export function getLastPosition(): LastPosition | null {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (!raw) return null;
    const pos = JSON.parse(raw) as LastPosition;
    if (!pos?.slug || !pos?.level || !pos?.week) return null;
    return pos;
  } catch {
    return null;
  }
}

export function isWeekCompleted(trackSlug: string, week: number): boolean {
  const data = getStoredProgress();
  return Boolean(data[trackSlug]?.completedWeeks?.includes(week));
}

export function toggleWeekCompleted(trackSlug: string, week: number): boolean {
  const data = getStoredProgress();
  if (!data[trackSlug]) {
    data[trackSlug] = {
      completedWeeks: [],
      lastUpdated: new Date().toISOString()
    };
  }

  const list = data[trackSlug].completedWeeks;
  const index = list.indexOf(week);
  let nowCompleted = false;

  if (index >= 0) {
    list.splice(index, 1);
    nowCompleted = false;
  } else {
    list.push(week);
    list.sort((a, b) => a - b);
    nowCompleted = true;
  }

  data[trackSlug].lastUpdated = new Date().toISOString();
  saveProgress(data);
  return nowCompleted;
}

export function getTrackProgress(trackSlug: string, totalWeeks: number): {
  completedWeeks: number[];
  completedCount: number;
  percent: number;
  isFinished: boolean;
} {
  const data = getStoredProgress();
  const completedWeeks = data[trackSlug]?.completedWeeks || [];
  const validWeeks = completedWeeks.filter(w => w <= totalWeeks);
  const completedCount = validWeeks.length;
  const percent = totalWeeks > 0 ? Math.round((completedCount / totalWeeks) * 100) : 0;
  return {
    completedWeeks: validWeeks,
    completedCount,
    percent: Math.min(100, percent),
    isFinished: totalWeeks > 0 && completedCount >= totalWeeks
  };
}

export function getTotalStats(): {
  totalCompletedWeeks: number;
  completedTracksCount: number;
} {
  const data = getStoredProgress();
  let totalWeeks = 0;
  let completedTracks = 0;

  for (const track of Object.values(data)) {
    totalWeeks += (track.completedWeeks || []).length;
    if ((track.completedWeeks || []).length >= 8) {
      completedTracks++;
    }
  }

  return {
    totalCompletedWeeks: totalWeeks,
    completedTracksCount: completedTracks
  };
}
