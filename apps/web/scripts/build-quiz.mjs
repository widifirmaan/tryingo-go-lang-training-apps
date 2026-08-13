import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'public', 'data', 'course');
const OUTPUT_FILE = join(__dirname, '..', 'public', 'quiz-index.json');

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic seeded RNG so regenerating the index produces identical output
// ─────────────────────────────────────────────────────────────────────────────
function hashStr(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────────────────────────────────────
// Text helpers
// ─────────────────────────────────────────────────────────────────────────────
function stripMd(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

// Split markdown into `## Heading` sections (raw body, untouched).
function splitSections(content) {
  const map = {};
  let cur = null;
  for (const line of content.split('\n')) {
    const m = /^##\s+(.+)/.exec(line);
    if (m) {
      cur = m[1].trim();
      map[cur] = [];
      continue;
    }
    if (cur) map[cur].push(line);
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, v.join('\n')]));
}

// Extract learning objective bullets.
function extractObjectives(raw) {
  if (!raw) return [];
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^[-*•]/.test(l))
    .map((l) => l.replace(/^[-*•]\s*/, '').trim())
    .filter((l) => l.length > 4);
}

// Extract `### SubTopic` blocks from the Key Concepts section.
// Some generated files embed literal \n inside a single line — normalize those.
function extractConcepts(raw) {
  if (!raw) return [];
  const text = raw.replace(/\\n/g, '\n');
  const parts = text.split(/^###\s+(.+)$/m);
  const subs = [];
  for (let i = 1; i < parts.length; i += 2) {
    const title = stripMd(parts[i] || '');
    const body = stripMd(parts[i + 1] || '');
    if (title && body) subs.push({ title, body });
  }
  return subs;
}

// Build a "definition snippet" that avoids giving the concept name away.
function makeSnippet(sub) {
  const titleWords = sub.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const sents = splitSentences(sub.body);
  if (!sents.length) return sub.body;
  const kept = sents.filter((s) => {
    const lower = s.toLowerCase();
    return !titleWords.some((w) => {
      const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(^|[^a-z])${esc}([^a-z]|$)`, 'i').test(lower);
    });
  });
  return (kept.length ? kept : sents).join(' ');
}

function truncate(text, max) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '…';
}

// Escape a title so it can be embedded in a question string safely.
function cleanTitle(t) {
  return (t || '').replace(/[`*_]/g, '').trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Question builders
// ─────────────────────────────────────────────────────────────────────────────
const OBJ_SECTION_KEYS = {
  'Tujuan Pembelajaran': true,
  'Learning Objectives': true,
};
const CONCEPT_SECTION_KEYS = {
  'Konsep Kunci': true,
  'Key Concepts': true,
};

function pickSection(sections, keys) {
  for (const k of Object.keys(sections)) {
    if (keys[k]) return sections[k];
  }
  return '';
}

// Week-topic MCQ: "what topic does week N cover?"
function buildWeekTopicQuestion(week, allWeeksOfLevel, lang, rng) {
  const distractors = allWeeksOfLevel
    .filter((w) => w.week !== week.week)
    .map((w) => cleanTitle(w.topic));
  if (distractors.length < 1) return null;
  const correct = cleanTitle(week.topic);
  const opts = shuffle([correct, ...distractors.slice(0, 3)], rng);
  const q = lang === 'id'
    ? `Apa topik yang dibahas di Minggu ${week.week}?`
    : `What topic is covered in Week ${week.week}?`;
  return {
    type: 'mcq',
    q,
    context: '',
    options: opts,
    answer: opts.indexOf(correct),
    source: `week${week.week}`,
  };
}

// Concept MCQ: "which concept is described below?"
function buildConceptMcq(sub, distractors, lang, rng, extra) {
  const correct = cleanTitle(sub.title);
  const opts = shuffle([correct, ...distractors], rng);
  const q = lang === 'id'
    ? `Konsep mana yang dijelaskan berikut ini?`
    : `Which concept is described below?`;
  return {
    type: 'mcq',
    q,
    context: truncate(extra || sub.snippet, 240),
    options: opts,
    answer: opts.indexOf(correct),
    source: sub.title,
  };
}

// Concept TF: "does this statement describe concept X?"
function buildConceptTf(sub, distractorTitle, lang) {
  const target = distractorTitle || cleanTitle(sub.title);
  const q = lang === 'id'
    ? `Apakah pernyataan berikut menjelaskan konsep "${target}"?`
    : `Does the following statement describe the concept "${target}"?`;
  return {
    type: 'tf',
    q,
    context: truncate(sub.snippet, 240),
    options: lang === 'id' ? ['Benar', 'Salah'] : ['True', 'False'],
    answer: distractorTitle ? 1 : 0,
    source: sub.title,
  };
}

// Objective TF: "is this one of week N's learning objectives?"
function buildObjectiveTf(statement, week, lang, isTrue) {
  const q = lang === 'id'
    ? `Apakah pernyataan ini termasuk tujuan pembelajaran Minggu ${week}?`
    : `Is this statement one of the learning objectives of Week ${week}?`;
  return {
    type: 'tf',
    q,
    context: truncate(statement, 240),
    options: lang === 'id' ? ['Benar', 'Salah'] : ['True', 'False'],
    answer: isTrue ? 0 : 1,
    source: `week${week}`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main build
// ─────────────────────────────────────────────────────────────────────────────
const LEVEL_ORDER = ['beginer', 'intermediate', 'advanced', 'pro'];
const sortLevels = (a, b) => {
  const ia = LEVEL_ORDER.indexOf(a);
  const ib = LEVEL_ORDER.indexOf(b);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
};

function safeReadDir(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return [];
  }
}

async function buildQuiz() {
  console.log('Building quiz index from:', DATA_DIR);
  if (!existsSync(DATA_DIR)) {
    console.error('Data directory not found:', DATA_DIR);
    process.exit(1);
  }

  const slugs = safeReadDir(DATA_DIR);
  const tracks = {};

  for (const slug of slugs) {
    const trackDir = join(DATA_DIR, slug);
    const levels = safeReadDir(trackDir).sort(sortLevels);

    // Collect every concept title per language for distractor pool.
    const allConceptTitles = { id: [], en: [] };

    // Pass 1: parse every file.
    const parsed = {}; // lang -> [{ level, levelName, weeks: [{week, topic, objectives, concepts}] }]
    for (const lang of ['id', 'en']) {
      const langLevels = [];
      for (const level of levels) {
        const langDir = join(trackDir, level, lang);
        let files;
        try {
          files = readdirSync(langDir).filter((f) => f.endsWith('.md'));
        } catch {
          continue;
        }
        if (!files.length) continue;

        const weeks = [];
        for (const file of files) {
          const content = readFileSync(join(langDir, file), 'utf-8');
          const sections = splitSections(content);
          const topic = (content.match(/^#\s+(.+)/m) || [])[1]?.trim() || file;
          const weekMatch = file.match(/week-?(\d+)/i);
          const week = weekMatch ? parseInt(weekMatch[1]) : 0;
          const levelMeta = (content.match(/\*\*Level:\*\*\s*(.+?)(?:\s*\|\s*\*\*|\s*$)/im) || [])[1]?.trim() || level;
          const concepts = extractConcepts(pickSection(sections, CONCEPT_SECTION_KEYS));
          const objectives = extractObjectives(pickSection(sections, OBJ_SECTION_KEYS));

          for (const c of concepts) allConceptTitles[lang].push({ level, week, title: c.title });
          weeks.push({ week, topic, levelMeta, objectives, concepts });
        }
        weeks.sort((a, b) => a.week - b.week);
        if (weeks.length) {
          langLevels.push({
            level,
            levelName: weeks[0].levelMeta || level,
            weeks,
          });
        }
      }
      parsed[lang] = langLevels;
    }

    // Pass 2: generate questions.
    for (const lang of ['id', 'en']) {
      const langLevels = parsed[lang];
      if (!langLevels || !langLevels.length) continue;

      // Track-wide pool of other-week objectives (for false statements).
      const allObjectives = [];
      for (const lv of langLevels) for (const w of lv.weeks) for (const o of w.objectives) allObjectives.push({ week: w.week, text: o });

      const rng = mulberry32(hashStr(slug + '::' + lang));

      const outLevels = [];
      for (const lv of langLevels) {
        const allWeekTopics = lv.weeks.map((w) => w.week);
        const outWeeks = [];
        for (const w of lv.weeks) {
          const questions = [];

          // 1) Week-topic MCQ (needs >= 2 weeks in the level)
          const wq = buildWeekTopicQuestion(w, lv.weeks, lang, rng);
          if (wq) questions.push(wq);

          // 2) Concept questions
          const subtitles = allConceptTitles[lang] || [];
          for (let i = 0; i < w.concepts.length; i++) {
            const sub = w.concepts[i];
            sub.snippet = makeSnippet(sub);

            const sameWeek = subtitles.filter((c) => c.level === lv.level && c.week === w.week && c.title !== sub.title).map((c) => cleanTitle(c.title));
            const sameLevel = subtitles.filter((c) => c.level === lv.level && c.week !== w.week && c.title !== sub.title).map((c) => cleanTitle(c.title));
            const rest = subtitles.filter((c) => c.level !== lv.level && c.title !== sub.title).map((c) => cleanTitle(c.title));
            const pool = [...new Set([...sameWeek, ...sameLevel, ...rest])];
            const distractors = pool.slice(0, 3);

            if (distractors.length >= 1) {
              questions.push(buildConceptMcq(sub, distractors, lang, rng));
            }

            // Extra MCQ when the subtopic body is long (count scales with content).
            if (sub.snippet.length > 200 && distractors.length >= 1) {
              const sents = splitSentences(sub.body);
              const tail = sents.slice(1).join(' ') || sub.snippet.slice(100);
              const extra = { ...sub, snippet: tail };
              questions.push(buildConceptMcq(extra, distractors, lang, rng, tail));
            }

            // Concept TF, alternating true/false for balance.
            const distractorTitle = i % 2 === 1 && distractors.length ? distractors[0] : null;
            questions.push(buildConceptTf(sub, distractorTitle, lang));
          }

          // 3) Objective questions
          if (w.objectives.length) {
            const own = w.objectives[0];
            questions.push(buildObjectiveTf(own, w.week, lang, true));
            const other = allObjectives.find((o) => o.week !== w.week && o.text !== own);
            if (other) {
              questions.push(buildObjectiveTf(other.text, w.week, lang, false));
            } else if (w.objectives.length > 1) {
              questions.push(buildObjectiveTf(w.objectives[1], w.week, lang, false));
            }
          }

          // 4) Fallback: no concepts parsed → objective-based coverage
          if (!w.concepts.length && w.objectives.length > 2) {
            for (let i = 2; i < Math.min(w.objectives.length, 6); i++) {
              const o = w.objectives[i];
              const other = allObjectives.find((x) => x.week !== w.week && x.text !== o);
              if (other) questions.push(buildObjectiveTf(other.text, w.week, lang, false));
            }
          }

          // Skip weeks with zero questions
          if (questions.length && allWeekTopics.includes(w.week)) {
            outWeeks.push({ week: w.week, topic: cleanTitle(w.topic), questions });
          }
        }
        if (outWeeks.length) {
          outLevels.push({ level: lv.level, levelName: lv.levelName, weeks: outWeeks });
        }
      }

      if (outLevels.length) {
        tracks[slug] = tracks[slug] || {};
        tracks[slug][lang] = outLevels;
      }
    }
  }

  const totalQ = Object.values(tracks).reduce((acc, langs) => {
    for (const lang of Object.values(langs)) {
      for (const lv of lang) for (const w of lv.weeks) acc += w.questions.length;
    }
    return acc;
  }, 0);

  const index = {
    generated: new Date().toISOString(),
    totalQuestions: totalQ,
    tracks,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(index));
  console.log(`Wrote quiz index with ${totalQ} questions across ${Object.keys(tracks).length} tracks to ${OUTPUT_FILE}`);
}

buildQuiz().catch(console.error);
