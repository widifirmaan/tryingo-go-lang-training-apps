import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_ROOT = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('🔍 TRYNGO FULL SYSTEM AUDIT');
console.log('================================================================\n');

let issues = [];
let warnings = [];
let auditSummary = {};

// 1. Audit Tracks Data vs Curriculum vs SlugMap
import { SLUG_MAP, REVERSE_SLUG_MAP } from '../src/data/slugMap.ts';
import { getCurriculum } from '../src/data/curriculum.ts';

console.log(`[1/7] Auditing Track Registry & Slugs...`);
const trackKeys = Object.keys(SLUG_MAP);
console.log(`Found ${trackKeys.length} tracks registered in SLUG_MAP.`);

if (trackKeys.length !== 28) {
  issues.push(`Expected 28 tracks in SLUG_MAP, but found ${trackKeys.length}`);
}

for (const [trackId, slug] of Object.entries(SLUG_MAP)) {
  if (REVERSE_SLUG_MAP[slug] !== trackId) {
    issues.push(`Reverse slug mapping mismatch for ${slug}: expected ${trackId}, got ${REVERSE_SLUG_MAP[slug]}`);
  }

  const curriculum = getCurriculum(slug);
  if (!curriculum || curriculum.length === 0) {
    issues.push(`No curriculum defined for slug: ${slug}`);
  } else {
    let weekCount = 0;
    for (const lvl of curriculum) {
      weekCount += lvl.weeks.length;
    }
    auditSummary[slug] = {
      name: slug.toUpperCase(),
      levels: curriculum.length,
      weeks: weekCount,
      filesExpected: weekCount * 2
    };
  }
}

// 2. Audit Markdown Course Materials
console.log(`[2/7] Auditing 528 Course Markdown Files...`);
const COURSE_BASE = path.join(APP_ROOT, 'public/data/course');
let totalMdFiles = 0;
let totalSectionsChecked = 0;

const REQUIRED_HEADERS_ID = [
  '## Tujuan Pembelajaran',
  '## Program',
  '## Konsep Kunci',
  '## Eksperimen',
  '## Tantangan',
  '## Ringkasan'
];

const REQUIRED_HEADERS_EN = [
  '## Learning Objectives',
  '## Program',
  '## Key Concepts',
  '## Experiments',
  '## Challenge',
  '## Summary'
];

for (const [slug, info] of Object.entries(auditSummary)) {
  const slugDir = path.join(COURSE_BASE, slug);
  if (!fs.existsSync(slugDir)) {
    issues.push(`Missing course directory: ${slugDir}`);
    continue;
  }

  const curriculum = getCurriculum(slug);
  for (const lvl of curriculum) {
    for (const w of lvl.weeks) {
      for (const lang of ['id', 'en']) {
        const expectedFile = path.join(slugDir, lvl.levelId, lang, `week${w.week}-${w.topicId}.md`);
        if (!fs.existsSync(expectedFile)) {
          issues.push(`Missing file: ${expectedFile}`);
          continue;
        }

        totalMdFiles++;
        const content = fs.readFileSync(expectedFile, 'utf-8');

        // Check if content is empty or abnormally short
        if (content.length < 500) {
          issues.push(`File too short (${content.length} bytes): ${expectedFile}`);
        }

        // Check headers
        const requiredHeaders = lang === 'id' ? REQUIRED_HEADERS_ID : REQUIRED_HEADERS_EN;
        for (const h of requiredHeaders) {
          totalSectionsChecked++;
          if (!content.includes(h)) {
            issues.push(`Missing required heading "${h}" in: ${expectedFile}`);
          }
        }

        // Check code blocks
        if (!content.includes('```')) {
          issues.push(`No code blocks found in: ${expectedFile}`);
        }
      }
    }
  }
}
console.log(`Audited ${totalMdFiles} markdown files and verified ${totalSectionsChecked} structural sections.`);

// 3. Audit Search Index
console.log(`[3/7] Auditing Search Index (search-index.json)...`);
const searchIndexPath = path.join(APP_ROOT, 'public/search-index.json');
if (!fs.existsSync(searchIndexPath)) {
  issues.push(`Missing search-index.json`);
} else {
  const searchIndexRaw = JSON.parse(fs.readFileSync(searchIndexPath, 'utf-8'));
  const searchEntries = Array.isArray(searchIndexRaw) ? searchIndexRaw : (searchIndexRaw.entries || []);
  console.log(`search-index.json contains ${searchEntries.length} entries.`);
  if (searchEntries.length !== totalMdFiles) {
    warnings.push(`Search index count (${searchEntries.length}) does not match total markdown files (${totalMdFiles})`);
  }

  // Check track distribution in search index
  const indexedSlugs = new Set(searchEntries.map(e => e.slug || e.trackSlug));
  for (const slug of Object.keys(auditSummary)) {
    if (!indexedSlugs.has(slug)) {
      issues.push(`Track ${slug} is MISSING from search-index.json!`);
    }
  }
}

// 4. Audit Quiz Index
console.log(`[4/7] Auditing Quiz Index (quiz-index.json)...`);
const quizIndexPath = path.join(APP_ROOT, 'public/quiz-index.json');
if (!fs.existsSync(quizIndexPath)) {
  issues.push(`Missing quiz-index.json`);
} else {
  const quizIndex = JSON.parse(fs.readFileSync(quizIndexPath, 'utf-8'));
  const totalQuestions = quizIndex.totalQuestions || 0;
  console.log(`quiz-index.json contains ${totalQuestions} generated questions.`);

  if (totalQuestions < 1000) {
    issues.push(`Quiz questions suspiciously low: ${totalQuestions}`);
  }

  // Validate question integrity
  let malformedQuestions = 0;
  const questionsPerTrack = {};

  for (const [slug, langs] of Object.entries(quizIndex.tracks || {})) {
    questionsPerTrack[slug] = 0;
    for (const [lang, levels] of Object.entries(langs)) {
      for (const lv of levels) {
        for (const w of lv.weeks) {
          questionsPerTrack[slug] += w.questions.length;
          for (const q of w.questions) {
            if (!q.q || !q.options || q.options.length < 2 || q.answer === undefined) {
              malformedQuestions++;
            }
          }
        }
      }
    }
  }

  if (malformedQuestions > 0) {
    issues.push(`Found ${malformedQuestions} malformed questions in quiz-index.json!`);
  }

  for (const slug of Object.keys(auditSummary)) {
    if (!questionsPerTrack[slug] || questionsPerTrack[slug] < 20) {
      issues.push(`Track ${slug} has insufficient quiz questions (${questionsPerTrack[slug] || 0})`);
    }
  }
}

// 5. Audit SEO, Robots & Sitemap
console.log(`[5/7] Auditing SEO Files (robots.txt, sitemap.xml, index.html)...`);
const robotsPath = path.join(APP_ROOT, 'public/robots.txt');
if (!fs.existsSync(robotsPath)) {
  issues.push(`Missing robots.txt in public/`);
} else {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  if (!robots.includes('Sitemap: https://tryngo.widifirmaan.web.id/sitemap.xml')) {
    issues.push(`robots.txt missing or incorrect Sitemap directive.`);
  }
}

const sitemapPath = path.join(APP_ROOT, 'public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  issues.push(`Missing sitemap.xml in public/`);
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  if (!sitemap.includes('<urlset') || !sitemap.includes('</urlset>')) {
    issues.push(`sitemap.xml is not valid XML!`);
  }
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`sitemap.xml contains ${urlCount} indexed URLs.`);
  if (urlCount < 200) {
    issues.push(`sitemap.xml has too few URLs (${urlCount})`);
  }
}

const htmlPath = path.join(APP_ROOT, 'index.html');
const indexHtml = fs.readFileSync(htmlPath, 'utf-8');
const requiredSeoStrings = [
  '<link rel="canonical" href="https://tryngo.widifirmaan.web.id/"',
  'property="og:title"',
  'property="og:description"',
  'property="og:image"',
  'name="twitter:card"',
  'name="robots"',
  'type="application/ld+json"',
  '@type": "EducationalOrganization"',
  '@type": "WebSite"',
  '@type": "ItemList"'
];

for (const req of requiredSeoStrings) {
  if (!indexHtml.includes(req)) {
    issues.push(`index.html is missing SEO tag or structured data: ${req}`);
  }
}

// Validate JSON-LD syntax
try {
  const match = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (match) {
    const parsed = JSON.parse(match[1]);
    if (!parsed['@graph'] || parsed['@graph'].length < 3) {
      issues.push(`JSON-LD structured data missing expected @graph nodes.`);
    }
  } else {
    issues.push(`Could not extract JSON-LD script from index.html`);
  }
} catch (err) {
  issues.push(`JSON-LD parsing error: ${err.message}`);
}

// 6. Audit Dist Output & Deployment Readiness
console.log(`[6/7] Auditing dist/ build output...`);
const distPath = path.join(APP_ROOT, 'dist');
if (!fs.existsSync(distPath)) {
  issues.push(`dist/ folder does not exist!`);
} else {
  const distIndex = path.join(distPath, 'index.html');
  const distRobots = path.join(distPath, 'robots.txt');
  const distSitemap = path.join(distPath, 'sitemap.xml');
  const distSearch = path.join(distPath, 'search-index.json');
  const distQuiz = path.join(distPath, 'quiz-index.json');
  const distOg = path.join(distPath, 'og-image.jpg');
  const distWasmOversized = path.join(distPath, 'wasm/go-exec.wasm');

  if (!fs.existsSync(distIndex)) issues.push(`dist/index.html missing!`);
  if (!fs.existsSync(distRobots)) issues.push(`dist/robots.txt missing!`);
  if (!fs.existsSync(distSitemap)) issues.push(`dist/sitemap.xml missing!`);
  if (!fs.existsSync(distSearch)) issues.push(`dist/search-index.json missing!`);
  if (!fs.existsSync(distQuiz)) issues.push(`dist/quiz-index.json missing!`);
  if (!fs.existsSync(distOg)) issues.push(`dist/og-image.jpg missing!`);

  // Ensure 25MB Cloudflare limit is strictly respected
  if (fs.existsSync(distWasmOversized)) {
    issues.push(`dist/wasm/go-exec.wasm exists and will breach Cloudflare 25MB limit!`);
  }
}

// 7. Audit Results
console.log(`\n================================================================`);
console.log(`📊 AUDIT SUMMARY REPORT`);
console.log(`================================================================`);
console.log(`Total Stacks Audited: ${Object.keys(auditSummary).length} / 28`);
console.log(`Total Markdown Files: ${totalMdFiles} / 528`);
console.log(`Total Issues Found:   ${issues.length}`);
console.log(`Total Warnings Found: ${warnings.length}`);

if (issues.length > 0) {
  console.log(`\n❌ CRITICAL ISSUES DETECTED:`);
  for (const iss of issues) {
    console.log(`  - ${iss}`);
  }
  process.exit(1);
} else {
  console.log(`\n✅ 100% AUDIT PASS: All 28 tracks, 528 modules, search indexes, quiz indexes, SEO tags, sitemaps, and deployment assets are completely verified!`);
  process.exit(0);
}
