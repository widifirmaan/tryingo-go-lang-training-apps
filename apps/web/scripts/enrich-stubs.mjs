import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'apps/web/public/data/course';
import { DATA_SQL } from './enrich-data-backend.mjs';
import { DATA_FRONTEND } from './enrich-data-frontend.mjs';

const DATA = { ...DATA_SQL, ...DATA_FRONTEND };

function* walk(dir) {
  for (const d of fs.readdirSync(dir)) {
    const p = path.join(dir, d);
    if (fs.statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.md')) yield p;
  }
}

const TOPICS_ID = { assumptions: '…' };

let enriched = 0;
const results = [];

// ---- 1) Metadata normalization for the 5 custom families ----
const CUSTOM = ['css3', 'html5', 'javascript', 'tailwind', 'typescript'];
const LEVEL_ID = { beginer: 'Pemula', intermediate: 'Menengah', advanced: 'Lanjutan' };
const LEVEL_EN = { beginer: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
let metaFixed = 0;

for (const file of walk(ROOT)) {
  const parts = file.split(path.sep);
  const slug = parts[parts.length - 4];
  const level = parts[parts.length - 3];
  if (!CUSTOM.includes(slug)) continue;
  let md = fs.readFileSync(file, 'utf8');
  const series = md.match(/\*\*Level:\*\* ([^|]+)\|/)?.[1].trim();
  if (!series) continue;
  const difficulty = file.includes('/en/') ? LEVEL_EN[level] : LEVEL_ID[level];
  md = md.replace(/\*\*Level:\*\* ([^|]+)\|/, `**Level:** ${difficulty} | **Seri:** ${series} |`);
  fs.writeFileSync(file, md);
  metaFixed++;
}

// ---- 2) Enrich thin stub files ----
for (const file of walk(ROOT)) {
  const parts = file.split(path.sep);
  const slug = parts[parts.length - 4];
  const lang = parts[parts.length - 2];
  const data = DATA[slug];
  if (!data) continue;
  const md = fs.readFileSync(file, 'utf8');
  const base = fs.statSync(file).size;
  if (base > 2200) continue; // already rich
  const themeKey = path.basename(file).replace(/\.md$/, '');
  const theme = data[themeKey];
  if (!theme) { results.push(`  no theme map: ${slug}/${themeKey}`); continue; }

  const isId = lang === 'id';
  const intro = isId ? theme.introId : theme.introEn;
  const code = isId ? theme.codeId : theme.codeEn;
  const exps = isId ? theme.expsId : theme.expsEn;
  const conceptTitle = isId ? 'Konsep Kunci' : 'Key Concepts';
  const expTitle = isId ? 'Eksperimen' : 'Experiments';
  const challengeTitle = isId ? 'Tantangan' : 'Challenge';
  const summaryTitle = isId ? 'Ringkasan' : 'Summary';
  const title = isId ? theme.titleId : theme.titleEn;

  // capture existing summary
  const summaryMatch = md.match(/^## (Ringkasan|Summary)\n\n([\s\S]+?)(?=\n---|$)/);
  const summary = summaryMatch ? summaryMatch[2].trim() : (isId
    ? `Materi minggu ini telah dibahas: ${title}. Lanjut ke pekan berikutnya untuk memperdalam.`
    : `This week's material has been covered: ${title}. Continue to the following week to deepen.`);

  // Build the replacement segment
  const conceptBlocks = theme.concepts
    .map(([h, b]) => `### ${h}\n\n${b}`)
    .join('\n\n');
  const expBullets = exps.map((e) => `- ${e}`).join('\n');

  const tail = `## Program: ${title}\n\n${intro}\n\n\`\`\`${theme.lang}\n${code.trim()}\n\`\`\`\n\n---\n\n## ${conceptTitle}\n\n${conceptBlocks}\n\n---\n\n## ${expTitle}\n\n${expBullets}\n\n---\n\n## ${challengeTitle}\n\n${(isId ? theme.serId : theme.serEn)}\n\n---\n\n## ${summaryTitle}\n\n${summary}\n`;

  // cut the old Program-to-EOF tail
  const head = md.slice(0, md.indexOf('## Program:'));
  fs.writeFileSync(file, head + tail.replace(/^- /m, '- ') + (tail.endsWith('\n') ? '' : '\n'));
  enriched++;
}

console.log(`Metadata normalized: ${metaFixed}`);
console.log(`Files enriched: ${enriched}`);
if (results.length) console.log(results.join('\n'));
