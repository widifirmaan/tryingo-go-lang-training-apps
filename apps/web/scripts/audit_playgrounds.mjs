import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STACKBLITZ_FENCES = {
  nodejs: ['javascript', 'js'],
  nextjs: ['tsx', 'jsx', 'ts', 'typescript', 'javascript', 'js'],
  nestjs: ['typescript', 'ts'],
  angular: ['typescript', 'ts'],
  django: ['python', 'py'],
  spring: ['java'],
};

const INLINE_FENCES = {
  golang: ['go'],
  rust: ['rust'],
  javascript: ['javascript', 'js', 'html'],
  typescript: ['typescript', 'ts', 'javascript'],
  html5: ['html'],
  css3: ['html'],
  tailwind: ['html'],
};

function getFencesForSlug(slug) {
  if (slug === 'docker') return ['bash', 'sh', 'shell', 'dockerfile', 'yaml', 'yml'];
  if (STACKBLITZ_FENCES[slug]) return STACKBLITZ_FENCES[slug];
  if (slug === 'postgresql' || slug === 'mysql') return ['sql'];
  if (slug === 'mongodb') return ['javascript', 'js', 'json'];
  if (slug === 'redis') return ['redis', 'bash', 'sh'];
  if (slug === 'graphql') return ['graphql'];
  if (slug === 'php' || slug === 'laravel' || slug === 'codeigniter4') return ['php'];
  if (slug === 'csharp') return ['csharp', 'cs'];
  if (slug === 'python') return ['python', 'py'];
  if (slug === 'rails') return ['ruby', 'rb', 'erb', 'javascript', 'js'];
  if (slug === 'react') return ['jsx', 'tsx', 'javascript', 'js'];
  if (slug === 'vue') return ['vue', 'html', 'javascript', 'js', 'ts'];
  if (slug === 'svelte') return ['svelte', 'html', 'javascript', 'js', 'ts'];
  return INLINE_FENCES[slug] || [];
}

function extractCode(markdown, preferred = []) {
  const regex = /```(\w*)\r?\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    blocks.push({ lang: (match[1] || '').toLowerCase(), code: match[2].trim() });
  }
  if (!blocks.length) return '';
  if (preferred.length) {
    const rank = new Map(preferred.map((l, i) => [l.toLowerCase(), i]));
    const hits = blocks
      .filter(b => rank.has(b.lang))
      .sort((a, b) => (rank.get(a.lang) - rank.get(b.lang)) || (b.code.length - a.code.length));
    if (hits.length) {
      const top = hits[0];
      if ((top.lang === 'javascript' || top.lang === 'js' || top.lang === 'typescript' || top.lang === 'ts')
        && /document|window|getElementById|querySelector|addEventListener/.test(top.code)) {
        const html = blocks.filter(b => b.lang === 'html').sort((a, b) => b.code.length - a.code.length)[0];
        if (html) return html.code;
      }
      return top.code;
    }
  }
  return blocks.reduce((a, b) => (b.code.length > a.code.length ? b : a)).code;
}

const baseDir = path.resolve(__dirname, '../public/data/course');
const slugs = fs.readdirSync(baseDir).filter(s => fs.statSync(path.join(baseDir, s)).isDirectory());

const stats = {};
for (const slug of slugs) {
  const trackDir = path.join(baseDir, slug);
  stats[slug] = { total: 0, extractedPreferred: 0, extractedFallback: 0, empty: 0, emptyList: [] };

  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith('.md')) {
        stats[slug].total++;
        const content = fs.readFileSync(p, 'utf8');
        const fences = getFencesForSlug(slug);
        const code = extractCode(content, fences);
        if (!code || !code.trim()) {
          stats[slug].empty++;
          stats[slug].emptyList.push(ent.name);
        } else {
          const firstBlockRegex = /```(\w*)\r?\n([\s\S]*?)```/g;
          const blocks = [];
          let m;
          while ((m = firstBlockRegex.exec(content)) !== null) {
            blocks.push({ lang: m[1].toLowerCase(), code: m[2].trim() });
          }
          const hasPreferred = blocks.some(b => fences.map(f => f.toLowerCase()).includes(b.lang));
          if (hasPreferred) stats[slug].extractedPreferred++;
          else stats[slug].extractedFallback++;
        }
      }
    }
  }
  walk(trackDir);
}

console.log('='.repeat(80));
console.log('PLAYGROUND CODE EXTRACTION AUDIT');
console.log('='.repeat(80));
let totalCourses = 0;
let totalPreferred = 0;
let totalFallback = 0;
let totalEmpty = 0;

for (const [slug, s] of Object.entries(stats).sort()) {
  totalCourses += s.total;
  totalPreferred += s.extractedPreferred;
  totalFallback += s.extractedFallback;
  totalEmpty += s.empty;
  const status = s.empty > 0 ? '❌ EMPTY' : (s.extractedFallback > 0 ? '⚠️ FALLBACK' : '✅ OK');
  console.log(`${slug.padEnd(16)}: Total ${String(s.total).padStart(2)} | Preferred: ${String(s.extractedPreferred).padStart(2)} | Fallback: ${String(s.extractedFallback).padStart(2)} | Empty: ${s.empty} [${status}]`);
}

console.log('-'.repeat(80));
console.log(`TOTAL FILES: ${totalCourses} | Preferred: ${totalPreferred} | Fallback: ${totalFallback} | Empty: ${totalEmpty}`);
console.log('='.repeat(80));
