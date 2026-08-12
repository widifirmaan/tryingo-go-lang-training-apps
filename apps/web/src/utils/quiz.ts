import { Language } from './translations';

export interface QuizQuestion {
  type: 'mcq' | 'tf';
  q: string;
  context: string;
  options: string[];
  answer: number;
  source: string;
}

export interface QuizWeek {
  week: number;
  topic: string;
  questions: QuizQuestion[];
}

export interface QuizLevel {
  level: string;
  levelName: string;
  weeks: QuizWeek[];
}

export interface QuizIndex {
  generated: string;
  totalQuestions: number;
  tracks: Record<string, Record<Language, QuizLevel[]>>;
}

export interface FlatQuestion {
  levelIndex: number;
  levelName: string;
  week: number;
  topic: string;
  q: QuizQuestion;
}

let cache: QuizIndex | null = null;
let inflight: Promise<QuizIndex> | null = null;

export function loadQuizIndex(): Promise<QuizIndex> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = fetch('/quiz-index.json')
    .then((res) => {
      if (!res.ok) throw new Error('Quiz index unavailable');
      return res.json();
    })
    .then((data: QuizIndex) => {
      cache = data;
      return data;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function getTrackQuiz(index: QuizIndex, slug: string, lang: Language): QuizLevel[] {
  return index.tracks?.[slug]?.[lang] || [];
}

export function flattenQuiz(levels: QuizLevel[]): FlatQuestion[] {
  const flat: FlatQuestion[] = [];
  levels.forEach((lv, levelIndex) => {
    lv.weeks.forEach((w) => {
      w.questions.forEach((q) => {
        flat.push({ levelIndex, levelName: lv.levelName, week: w.week, topic: w.topic, q });
      });
    });
  });
  return flat;
}

// ─────────────────────────────────────────────────────────────────────────────
// Persistence (localStorage)
// ─────────────────────────────────────────────────────────────────────────────

export interface QuizProgress {
  answers: number[];
  idx: number;
  startedAt: number;
  total: number;
}

const bestKey = (slug: string, lang: Language) => `tryngo.quiz.best.${slug}.${lang}`;
const progKey = (slug: string, lang: Language) => `tryngo.quiz.progress.${slug}.${lang}`;

export function loadBestScore(slug: string, lang: Language): { score: number; total: number; date: number } | null {
  try {
    const raw = localStorage.getItem(bestKey(slug, lang));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBestScore(slug: string, lang: Language, score: number, total: number) {
  try {
    const prev = loadBestScore(slug, lang);
    if (prev && prev.total === total && prev.score >= score) return;
    localStorage.setItem(bestKey(slug, lang), JSON.stringify({ score, total, date: Date.now() }));
  } catch {}
}

export function loadProgress(slug: string, lang: Language): QuizProgress | null {
  try {
    const raw = localStorage.getItem(progKey(slug, lang));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProgress(slug: string, lang: Language, progress: QuizProgress) {
  try {
    localStorage.setItem(progKey(slug, lang), JSON.stringify(progress));
  } catch {}
}

export function clearProgress(slug: string, lang: Language) {
  try {
    localStorage.removeItem(progKey(slug, lang));
  } catch {}
}
