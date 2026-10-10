import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CSS_WEEKS_P1 } from './css_materials_data_p1.mjs';
import { CSS_WEEKS_P2 } from './css_materials_data_p2.mjs';
import { CSS_WEEKS_P3 } from './css_materials_data_p3.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '../public/data/course/css3');

const ALL_WEEKS = [...CSS_WEEKS_P1, ...CSS_WEEKS_P2, ...CSS_WEEKS_P3];

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
    ? `- Modul Minggu ${item.week} (${title}) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.\n- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.\n- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.`
    : `- Week ${item.week} (${title}) delivers hands-on structural visual styling competencies.\n- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.\n- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.`;

  const experiments = isId
    ? `1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.\n2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.\n3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.`
    : `1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.\n2. Introduce new rules or properties to extend component visual features.\n3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.`;

  const challenges = isId
    ? `Terapkan konsep Minggu ${item.week} ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.`
    : `Apply Week ${item.week} styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.`;

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

console.log(`\nSuccessfully generated all ${generatedCount} CSS3 curriculum files across 14 weeks!`);
