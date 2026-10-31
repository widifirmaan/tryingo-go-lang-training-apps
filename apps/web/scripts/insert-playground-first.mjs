import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'apps/web/public/data/course';
const NOTE_ID = `> **⚡ Coba dulu di browser — tanpa install!** Semua blok kode di materi ini punya tombol **Coba di Playground** dan bisa langsung dijalankan di tab ini. Langkah instalasi lokal di bawah ini opsional — lakukan nanti saat Anda sudah siap ngoding di editor sendiri (VS Code/IDE) atau mengerjakan proyek nyata.`;
const NOTE_EN = `> **⚡ Try it in the browser first — no install required!** Every code block in this lesson has a **Try in Playground** button and runs right in this tab. The local installation steps below are optional — follow them later, once you are ready to code in your own editor (VS Code/IDE) or build real projects.`;

let ok = 0, skipped = 0;
const tracks = fs.readdirSync(ROOT).filter(d => fs.statSync(path.join(ROOT, d)).isDirectory());
for (const tr of tracks) {
  for (const langDir of ['id', 'en']) {
    const dir = path.join(ROOT, tr, 'beginer', langDir);
    if (!fs.existsSync(dir)) continue;
    for (const w1 of fs.readdirSync(dir).filter(f => f.startsWith('week1-') && f.endsWith('.md'))) {
      const file = path.join(dir, w1);
      let md = fs.readFileSync(file, 'utf8');
      if (md.includes('⚡')) { skipped++; continue; }
      const lines = md.split('\n');
      const idx = lines.findIndex(l => /^(## Panduan Mulai Cepat|## Quick Start Guide)/.test(l));
      if (idx === -1) { skipped++; console.log(`  no quick start: ${tr}/${langDir}`); continue; }
      const note = langDir === 'id' ? NOTE_ID : NOTE_EN;
      if (lines[idx + 1]?.trim() === '') lines.splice(idx + 1, 0, '', note);
      else lines.splice(idx + 1, 0, '', note);
      fs.writeFileSync(file, lines.join('\n'));
      ok++;
    }
  }
}
console.log(`Inserted playground-first note: ${ok}, skipped: ${skipped}`);
