import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'apps/web/public/data/course';
const tracks = fs.readdirSync(ROOT).filter(d => fs.statSync(path.join(ROOT, d)).isDirectories?.() ?? fs.statSync(path.join(ROOT, d)).isDirectory());

const FONDASI_ID = `## Fondasi: Sebelum Menulis Kode

Bagian ini untuk Anda yang **benar-benar baru** belajar coding. Konsepnya sama di semua bahasa — dibutuhkan sekali paham, dipakai selamanya.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: \`belajar.md\`). File punya **ekstensi** yang menunjukkan bahasanya: \`.md\`, \`.go\`, \`.py\`, \`.html\`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: \`cd folder\` (pindah folder), \`ls\` / \`dir\` (lihat isi folder), \`go run main.go\` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan — cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung — cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis — error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan — lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis — itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung — inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan — tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: \`let nama = "Budi"\`; \`rupiah = 250000\`), lalu jalankan.

---

`;

const FONDASI_EN = `## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language — learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. \`lesson.md\`). Files have **extensions** that indicate the language: \`.md\`, \`.go\`, \`.py\`, \`.html\`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: \`cd folder\` (change folder), \`ls\` / \`dir\` (list contents), \`go run main.go\` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running — fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly — great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write — errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs — more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies — they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live — the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations — it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. \`let name = "Budi"\`; \`rupiah = 250000\`) and run.

---

`;

let ok = 0, skip = 0;
for (const tr of tracks) {
  for (const [langDir, content] of [['id', FONDASI_ID], ['en', FONDASI_EN]]) {
    const dir = path.join(ROOT, tr, 'beginer', langDir);
    if (!fs.existsSync(dir)) { skip++; continue; }
    const w1 = fs.readdirSync(dir).find(f => f.startsWith('week1-') && f.endsWith('.md'));
    if (!w1) { skip++; console.log(`  no week1 file: ${tr}/${langDir}`); continue; }
    const file = path.join(dir, w1);
    let md = fs.readFileSync(file, 'utf8');
    if (md.includes('## Fondasi:') || md.includes('## Foundations:')) { skip++; console.log(`  already has: ${tr}/${langDir}`); continue; }

    // Insert between the objectives section's closing "---" and the next "## " heading
    const anchor = md.search(/\n---\n\n## /);
    if (anchor === -1) { skip++; console.log(`  anchor not found: ${tr}/${langDir}`); continue; }
    // Verify the section before the anchor is the objectives heading
    const before = md.slice(0, anchor);
    if (!/(## Tujuan Pembelajaran|## Learning Objectives)\n/.test(before)) { skip++; console.log(`  anchor is not after objectives: ${tr}/${langDir}`); continue; }

    md = md.slice(0, anchor + 1) + '\n' + content + md.slice(anchor + 1).replace(/^\n/, '');
    fs.writeFileSync(file, md);
    ok++;
  }
}
console.log(`Inserted: ${ok}, skipped: ${skip}`);
