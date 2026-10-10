import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { HTML_WEEKS_DATA } from './html_materials_data_p1.mjs';
import { HTML_WEEKS_P2 } from './html_materials_data_p2.mjs';
import { HTML_WEEKS_P3 } from './html_materials_data_p3.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '../public/data/course/html5');

const ALL_WEEKS = [...HTML_WEEKS_DATA, ...HTML_WEEKS_P2, ...HTML_WEEKS_P3];

// Ensure clean directory structure
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

// Clean old files in advanced if they have old names
const oldAdvancedId = path.join(baseDir, 'advanced/id');
const oldAdvancedEn = path.join(baseDir, 'advanced/en');
for (const p of [oldAdvancedId, oldAdvancedEn]) {
  if (fs.existsSync(p)) {
    const files = fs.readdirSync(p);
    for (const f of files) {
      if (f.startsWith('week5-') || f.startsWith('week6-') || f.startsWith('week7-') || f.startsWith('week8-')) {
        fs.unlinkSync(path.join(p, f));
      }
    }
  }
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
    ? `- Modul Minggu ${item.week} (${title}) melatih pemahaman struktural secara praktis.\n- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.\n- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.`
    : `- Week ${item.week} (${title}) delivers hands-on structural skills.\n- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.\n- In the next module, we continue our progressive project development journey.`;

  const experiments = isId
    ? `1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.\n2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.\n3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.`
    : `1. Modify text or values inside the Playground editor and observe instant live preview updates.\n2. Add new complementary elements relevant to your own page structure.\n3. Test the layout across different viewport sizes to evaluate fluid responsiveness.`;

  const challenges = isId
    ? `Terapkan konsep Minggu ${item.week} ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.`
    : `Apply the core concepts of Week ${item.week} directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.`;

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

console.log(`\nSuccessfully generated all ${generatedCount} HTML curriculum files across 14 weeks!`);
