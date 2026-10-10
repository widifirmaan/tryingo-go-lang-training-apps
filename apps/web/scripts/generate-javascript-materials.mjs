import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { JS_WEEKS_P1 } from './js_materials_data_p1.mjs';
import { JS_WEEKS_P2 } from './js_materials_data_p2.mjs';
import { JS_WEEKS_P3 } from './js_materials_data_p3.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '../public/data/course/javascript');

const ALL_WEEKS = [...JS_WEEKS_P1, ...JS_WEEKS_P2, ...JS_WEEKS_P3];

// 1. Clean old files in baseDir
if (fs.existsSync(baseDir)) {
  fs.rmSync(baseDir, { recursive: true, force: true });
}

// 2. Ensure target directories exist
const dirs = [
  path.join(baseDir, 'beginer/id'),
  path.join(baseDir, 'beginer/en'),
  path.join(baseDir, 'intermediate/id'),
  path.join(baseDir, 'intermediate/en'),
  path.join(baseDir, 'advanced/id'),
  path.join(baseDir, 'advanced/en')
];

for (const dir of dirs) {
  fs.mkdirSync(dir, { recursive: true });
}

function buildMarkdown(item, lang) {
  const isId = lang === 'id';
  const title = isId ? item.titleId : item.titleEn;
  const levelName = isId ? item.levelNameId : item.levelNameEn;
  const objectives = isId ? item.objectivesId : item.objectivesEn;
  const content = isId ? item.contentId : item.contentEn;
  const programTitle = isId ? item.programTitleId : item.programTitleEn;
  const breakdown = isId ? item.breakdownId : item.breakdownEn;
  const pitfalls = isId ? item.pitfallsId : item.pitfallsEn;

  const summary = isId 
    ? `- Modul Minggu ${item.week} (${title}) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.\n- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.\n- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.`
    : `- Week ${item.week} (${title}) delivers hands-on algorithmic and practical JavaScript development proficiencies.\n- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.\n- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.`;

  const experiments = isId
    ? `1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.\n2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.\n3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.`
    : `1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.\n2. Introduce new conditional branches or helper functions relevant to your scenarios.\n3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.`;

  const challenges = isId
    ? `Terapkan konsep Minggu ${item.week} ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.`
    : `Apply Week ${item.week} core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.`;

  if (isId) {
    return `# ${title}

> **Kategori:** ${item.category} | **Level:** ${levelName} | **Minggu ${item.week}:** ${title}
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

${objectives.map(o => `- ${o}`).join('\n')}

---

${content}

---

## Program: ${programTitle}

\`\`\`html
${item.programCode}
\`\`\`

---

## Bedah Detail Kode Program

${breakdown.map(b => `- ${b}`).join('\n')}

---

## Eksperimen di Playground

${experiments}

---

## Tantangan Praktik

${challenges}

---

## Jebakan Umum & Debugging (Common Pitfalls)

${pitfalls.map(p => `- ${p}`).join('\n')}

---

## Ringkasan

${summary}
`;
  } else {
    return `# ${title}

> **Category:** ${item.category} | **Level:** ${levelName} | **Week ${item.week}:** ${title}
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

${objectives.map(o => `- ${o}`).join('\n')}

---

${content}

---

## Program: ${programTitle}

\`\`\`html
${item.programCode}
\`\`\`

---

## Detailed Code Breakdown

${breakdown.map(b => `- ${b}`).join('\n')}

---

## Playground Experiments

${experiments}

---

## Practical Challenge

${challenges}

---

## Common Pitfalls & Debugging

${pitfalls.map(p => `- ${p}`).join('\n')}

---

## Summary

${summary}
`;
  }
}

let generatedCount = 0;
for (const item of ALL_WEEKS) {
  for (const lang of ['id', 'en']) {
    const filename = `week${item.week}-${item.topicId}.md`;
    const targetDir = path.join(baseDir, item.levelId, lang);
    const targetFile = path.join(targetDir, filename);

    const md = buildMarkdown(item, lang);
    fs.writeFileSync(targetFile, md, 'utf8');
    generatedCount++;
    console.log(`[GENERATED] ${item.levelId}/${lang}/${filename}`);
  }
}

console.log(`\nSuccessfully generated all ${generatedCount} JavaScript curriculum files across 14 weeks!`);
