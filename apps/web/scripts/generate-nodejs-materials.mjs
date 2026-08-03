// ============================================================================
// generate-nodejs-materials.mjs
// Node.js track: 16 lessons x 2 languages (id/en) -> 32 markdown + 32 StackBlitz JSON.
// Structure based on bootcamp curriculum research 2025-2026 (ZTM, Raveka 12-week,
// W3Schools, MERN roadmaps 2026, DEV 30-day path):
//   Node Foundations      : runtime & V8, event loop / non-blocking I/O, modules & npm,
//                           core modules (fs, path, os, events)
//   Express & Web APIs    : HTTP server, Express routing, middleware, REST API + MVC
//   Databases & Auth      : MongoDB + Mongoose, PostgreSQL + SQL, JWT + bcrypt,
//                           security & error handling
//   Production & Capstone : file upload & API integration, testing, performance &
//                           scalability, deployment + CI/CD capstone
// Each lesson ships a runnable StackBlitz "node" project (files JSON) whose main
// file (server.js) is also embedded as the markdown code block.
// ============================================================================
import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/nodejs', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PHASES = [
  { phase: 1, id: 'foundations', nameId: 'Fondasi Node', nameEn: 'Node Foundations' },
  { phase: 2, id: 'express', nameId: 'Express & Web API', nameEn: 'Express & Web APIs' },
  { phase: 3, id: 'databases', nameId: 'Database & Auth', nameEn: 'Databases & Auth' },
  { phase: 4, id: 'production', nameId: 'Produksi & Capstone', nameEn: 'Production & Capstone' },
];

// ===== PHASE 1: NODE FOUNDATIONS (lessons 1-4) =====
const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'pengenalan-node',
    titleId: 'Pengenalan Node.js: Runtime JavaScript di Server', titleEn: 'Node.js Intro: JavaScript on the Server',
    codeFile: 'server.js',
    files: {
      'server.js': `// Program pertama Anda di Node.js
// Jalankan dengan: node server.js

const nama = 'Budi';
const tahun = 2026;

// console.log ke terminal adalah "print" di dunia Node
console.log('Halo dunia dari Node.js!');
console.log('Nama saya ' + nama + ' dan sekarang tahun ' + tahun);

// Node bisa melakukan hal yang tidak bisa dilakukan browser:
// baca file, akses sistem, buat server.

// Server HTTP pertama - 10 baris saja!
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Halo dari server Node.js!');
});

server.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});`,
      'package.json': `{
  "name": "lesson1-hello-node",
  "version": "1.0.0",
  "description": "Program pertama Node.js: hello world + server HTTP pertama",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}`,
    },
    objId: [
      'Menjelaskan apa itu Node.js dan bedanya dengan JavaScript browser',
      'Menjalankan program JavaScript dengan node',
      'Mengenal V8, runtime, dan REPL',
      'Membuat server HTTP pertama dengan 10 baris kode',
    ],
    objEn: [
      'Explain what Node.js is and how it differs from browser JavaScript',
      'Run JavaScript programs with node',
      'Get to know V8, the runtime, and the REPL',
      'Create a first HTTP server in 10 lines of code',
    ],
    expId: `## Apa itu Node.js?
Node.js adalah runtime JavaScript di server, dibangun di atas mesin V8 (mesin yang sama yang menjalankan JavaScript di Chrome). Konsekuensinya: satu bahasa untuk frontend dan backend. Sebelum Node (2009, Ryan Dahl), JavaScript hanya bisa jalan di browser. Node membuka dunia baru: akses file, jaringan, database, dan web server.
## JavaScript di Browser vs di Node
Browser menyediakan DOM (document, window). Node menyediakan API server: fs (file system), http (jaringan), os (sistem operasi), process. Tidak ada DOM di Node - tidak ada document.getElementById. Yang ada: global seperti console, process, Buffer. Mental model ini penting: Node bukan "browser tanpa tab", melainkan lingkungan runtime yang berbeda.
## V8, Runtime, dan REPL
V8 meng-compile JavaScript ke machine code (JIT). Runtime Node menambahkan libuv (I/O async), buffer, dan modul inti. REPL (Read-Eval-Print Loop) adalah terminal interaktif: ketik node tanpa file, dan setiap baris langsung dieksekusi - bagus untuk eksperimen cepat. Jalankan node -v untuk cek versi, node untuk masuk REPL.
## Server HTTP dalam 10 Baris
Contoh kode: require('node:http'), createServer dengan callback (req, res), listen(3000). Ini fondasi semua framework web Node (Express, Nest). Pahami dulu level ini sebelum naik ke framework - kebanyakan kursus melewatinya, dan itu sebabnya banyak developer tidak paham cara kerja server.`,
    expEn: `## What Is Node.js?
Node.js is a server-side JavaScript runtime built on the V8 engine (the same engine that runs JavaScript in Chrome). Consequence: one language for frontend and backend. Before Node (2009, Ryan Dahl), JavaScript could only run in the browser. Node opened a new world: file access, networking, databases, and web servers.
## JavaScript in the Browser vs in Node
Browsers provide the DOM (document, window). Node provides server APIs: fs (file system), http (networking), os (operating system), process. There is no DOM in Node - no document.getElementById. What exists: globals like console, process, Buffer. This mental model matters: Node is not "a browser without tabs", it is a different runtime environment.
## V8, the Runtime, and the REPL
V8 compiles JavaScript to machine code (JIT). The Node runtime adds libuv (async I/O), buffers, and core modules. The REPL (Read-Eval-Print Loop) is an interactive terminal: type node without a file, and every line executes immediately - great for quick experiments. Run node -v to check the version, node to enter the REPL.
## An HTTP Server in 10 Lines
The sample code: require('node:http'), createServer with a callback (req, res), listen(3000). This is the foundation of every Node web framework (Express, Nest). Master this level before climbing to a framework - most courses skip it, which is why many developers do not understand how servers actually work.`,
    chId: 'Jalankan proyek di playground. Lalu ubah server: (1) tambah route /about yang merespons "Tentang Kami", (2) ganti Content-Type menjadi application/json dan kirim objek JSON { nama: "Budi", role: "siswa" }, (3) ganti port ke 4000. Restart dan uji di preview. Tuliskan apa yang berubah di tiap perubahan.',
    chEn: 'Run the project in the playground. Then modify the server: (1) add an /about route responding "About Us", (2) change Content-Type to application/json and send the JSON object { name: "Budi", role: "student" }, (3) change the port to 4000. Restart and test in the preview. Write down what changed with each edit.',
    sumId: 'Node.js = JavaScript di server via V8. Tidak ada DOM; ada fs, http, os, process. REPL untuk eksperimen. Server HTTP = createServer + listen. Lanjut: event loop, jantung Node.',
    sumEn: 'Node.js = JavaScript on the server via V8. No DOM; there is fs, http, os, process. The REPL is for experiments. An HTTP server = createServer + listen. Next: the event loop, Node\'s heart.',
  },
  {
    phase: 1, num: 2, topicId: 'event-loop',
    titleId: 'Event Loop & Non-Blocking I/O', titleEn: 'The Event Loop & Non-Blocking I/O',
    codeFile: 'server.js',
    files: {
      'server.js': `// Event loop: urutan eksekusi di Node
// Jalankan: node server.js

console.log('1. Mulai (sync)');

// Timers: dijadwalkan, bukan langsung jalan
setTimeout(() => {
  console.log('3. setTimeout 0ms - masuk fase timers');
}, 0);

setImmediate(() => {
  console.log('4. setImmediate - fase check');
});

// Microtask: prioritas tertinggi setelah operasi sync
Promise.resolve().then(() => {
  console.log('2. Promise microtask - dijalankan SEBELUM timers!');
});

// Simulasi I/O non-blocking: baca file besar
const fs = require('node:fs');
fs.readFile(__filename, 'utf-8', (err, data) => {
  console.log('5. File dibaca: ' + data.length + ' karakter (callback I/O)');
});

// Baris ini SELALU jalan terakhir dari kode sync
console.log('6. Selesai (sync) - event loop sekarang mengurus sisanya');

// Non-blocking = server bisa layani ribuan request
const http = require('node:http');
http.createServer((req, res) => {
  // Dua request "berat" tidak saling memblokir
  setTimeout(() => {
    res.end('Request selesai: ' + new Date().toISOString());
  }, 100);
}).listen(3000, () => console.log('Server siap di :3000 (non-blocking)'));`,
      'package.json': `{
  "name": "lesson2-event-loop",
  "version": "1.0.0",
  "description": "Event loop, microtasks, timers, dan non-blocking I/O",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}`,
    },
    objId: [
      'Menjelaskan event loop: satu thread, banyak tugas',
      'Membedakan operasi blocking dan non-blocking',
      'Memahami urutan: sync → microtask → timers → check',
      'Menjelaskan kenapa Node cocok untuk I/O berat (web server)',
    ],
    objEn: [
      'Explain the event loop: one thread, many tasks',
      'Distinguish blocking and non-blocking operations',
      'Understand the order: sync → microtask → timers → check',
      'Explain why Node suits I/O-heavy workloads (web servers)',
    ],
    expId: `## Satu Thread, Banyak Tugas
JavaScript di Node berjalan pada SATU thread utama. Paradoksnya: server Node bisa melayani ribuan koneksi sekaligus. Jawabannya: event loop. Thread utama tidak menunggu I/O selesai - ia menyerahkan pekerjaan ke libuv (pustaka C), lalu kembali memproses tugas lain. Ketika I/O selesai, hasilnya diantrekan sebagai callback.
## Blocking vs Non-Blocking
Blocking: baris kode menahan eksekusi sampai selesai (readFileSync, operasi CPU berat). Non-blocking: kode menyerahkan tugas dan berlanjut; hasil datang lewat callback (readFile, http request). Aturan emas: di server, SELALU gunakan versi async untuk I/O. Contoh kode memakai readFile (async) - bayangkan kalau pakai readFileSync, request lain harus menunggu.
## Urutan Eksekusi (Krusial)
Urutan di contoh: (1) kode sync langsung, (2) microtask (Promise) - dijalankan SETELAH sync tapi SEBELUM timers, (3) timers (setTimeout/setInterval), (4) I/O callbacks, (5) check (setImmediate). Sebagian besar "bug aneh" di Node adalah developer yang salah menebak urutan ini. Jalankan dan amati output 1-6.
## Kenapa Ini Penting untuk Web Server
Satu event loop + non-blocking I/O = satu server menangani ribuan koneksi dengan sumber daya kecil. Server blocking (versi sync) akan mengantrekan semua request di belakang request yang lambat. Ini mengapa Node mendominasi API backend: I/O (database, jaringan, disk) adalah pekerjaan utama API, dan Node dioptimalkan persis untuk itu.`,
    expEn: `## One Thread, Many Tasks
JavaScript in Node runs on a SINGLE main thread. The paradox: a Node server can serve thousands of connections at once. The answer is the event loop. The main thread does not wait for I/O - it hands the work to libuv (a C library), then goes back to processing other tasks. When the I/O finishes, the result is queued as a callback.
## Blocking vs Non-Blocking
Blocking: a code line halts execution until it finishes (readFileSync, heavy CPU work). Non-blocking: the code hands off the task and moves on; the result arrives via a callback (readFile, http request). Golden rule: on a server, ALWAYS use the async version for I/O. The sample uses readFile (async) - imagine if it used readFileSync: every other request would have to wait.
## Execution Order (Crucial)
The order in the sample: (1) sync code runs immediately, (2) microtasks (Promises) - run AFTER sync but BEFORE timers, (3) timers (setTimeout/setInterval), (4) I/O callbacks, (5) check (setImmediate). Most "weird bugs" in Node are developers guessing this order wrong. Run it and watch the 1-6 output.
## Why This Matters for Web Servers
One event loop + non-blocking I/O = a single server handling thousands of connections with small resources. A blocking server (sync version) queues every request behind the slow one. This is why Node dominates backend APIs: I/O (databases, network, disk) is the main work of APIs, and Node is optimized exactly for that.`,
    chId: 'Jalankan dan amati urutan log. Lalu ubah: (1) tambahkan setTimeout kedua dengan delay 100ms - di mana ia muncul? (2) tambahkan Promise.resolve().then kedua - di mana ia muncul? (3) prediksi urutan SEBELUM menjalankan, tulis prediksimu, lalu bandingkan dengan hasilnya.',
    chEn: 'Run and observe the log order. Then modify: (1) add a second setTimeout with a 100ms delay - where does it appear? (2) add a second Promise.resolve().then - where does it appear? (3) predict the order BEFORE running, write down your prediction, then compare with the actual output.',
    sumId: 'Satu thread + event loop + libuv = non-blocking I/O. Urutan: sync → microtask → timers → check. Server API = I/O-bound, dan Node dioptimalkan untuk itu. Lanjut: modul dan npm.',
    sumEn: 'One thread + event loop + libuv = non-blocking I/O. Order: sync → microtask → timers → check. APIs are I/O-bound, and Node is optimized for that. Next: modules and npm.',
  },
  {
    phase: 1, num: 3, topicId: 'modules-npm',
    titleId: 'Module System & npm', titleEn: 'The Module System & npm',
    codeFile: 'server.js',
    files: {
      'server.js': `// Module system & npm
// Jalankan: node server.js

// 1) Modul lokal: import dengan require (CommonJS)
const utils = require('./utils');
console.log('Hasil tambah:', utils.tambah(5, 3));
console.log('Nama aplikasi:', utils.NAMA_APLIKASI);

// 2) Modul inti Node: tanpa install
const path = require('node:path');
console.log('Nama file ini:', path.basename(__filename));

// 3) Modul pihak ketiga: dari npm (lihat package.json)
try {
  const chalk = require('chalk');
  console.log(chalk.green('Modul npm (chalk) berhasil dipakai!'));
} catch {
  console.log('chalk belum diinstall - jalankan: npm install');
}

// 4) ES Modules (import/export) juga didukung
// (lihat file utils.mjs untuk contohnya)

console.log('\\npackage.json menyimpan: nama, versi, scripts, dependencies');
console.log('Semua dependency tercatat di dependencies / devDependencies.');`,
      'utils.js': `// Modul lokal: CommonJS (module.exports)
const NAMA_APLIKASI = 'Tryngo Node';

function tambah(a, b) {
  return a + b;
}

// Ekspor apa yang boleh dipakai modul lain
module.exports = { tambah, NAMA_APLIKASI };`,
      'package.json': `{
  "name": "lesson3-modules-npm",
  "version": "1.0.0",
  "description": "Module system CommonJS + ES Modules dan npm",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "node --test"
  },
  "dependencies": {
    "chalk": "^5.3.0"
  }
}`,
    },
    objId: [
      'Membuat dan mengimpor modul lokal (CommonJS)',
      'Membedakan modul inti, pihak ketiga, dan lokal',
      'Memahami package.json dan semver',
      'Mengelola dependency dengan npm install',
    ],
    objEn: [
      'Create and import local modules (CommonJS)',
      'Distinguish core, third-party, and local modules',
      'Understand package.json and semver',
      'Manage dependencies with npm install',
    ],
    expId: `## Tiga Jenis Modul
Modul inti: disediakan Node (fs, path, http) - require('node:fs'). Pihak ketiga: dari npm registry (express, mongoose) - require('express'). Lokal: file Anda sendiri - require('./utils'). Node mencari dengan urutan: inti → node_modules → path relatif.
## CommonJS vs ES Modules
CommonJS: require/module.exports, default di Node, sinkron. ES Modules: import/export, standar JavaScript modern, didukung Node dengan ekstensi .mjs atau "type": "module" di package.json. Industri 2026 berjalan dua-duanya: codebase lama CommonJS, baru ES Modules. Bootcamp ini memakai require (CommonJS) agar konsisten dan mudah dipahami; di proyek TypeScript/Nest Anda akan bertemu import.
## package.json: Kartu Identitas Proyek
npm init membuatnya. Isi penting: name, version (semver: MAJOR.MINOR.PATCH), scripts (npm start, npm test - perintah kustom), dependencies (produksi) vs devDependencies (build/test). package-lock.json mengunci versi EXAKT dependency - selalu commit file ini di git.
## npm install & Semver
npm install menambah dependency dan memakainya dari node_modules (jangan pernah commit node_modules - .gitignore!). Notasi semver: ^5.3.0 = versi 5.x.x terbaru (minor/patch boleh naik, major tidak). Ini trade-off: fleksibilitas vs stabilitas. npm audit memindai kerentanan dependency - jalankan rutin.`,
    expEn: `## Three Kinds of Modules
Core modules: provided by Node (fs, path, http) - require('node:fs'). Third-party: from the npm registry (express, mongoose) - require('express'). Local: your own files - require('./utils'). Node resolves in order: core → node_modules → relative path.
## CommonJS vs ES Modules
CommonJS: require/module.exports, Node's default, synchronous. ES Modules: import/export, the modern JavaScript standard, supported by Node with .mjs extensions or "type": "module" in package.json. The 2026 industry runs both: old codebases in CommonJS, new ones in ES Modules. This bootcamp uses require (CommonJS) for consistency and clarity; you will meet import in TypeScript/Nest projects.
## package.json: The Project ID Card
npm init creates it. Key fields: name, version (semver: MAJOR.MINOR.PATCH), scripts (npm start, npm test - custom commands), dependencies (production) vs devDependencies (build/test). package-lock.json pins EXACT dependency versions - always commit this file.
## npm install & Semver
npm install adds a dependency and uses it from node_modules (never commit node_modules - .gitignore!). Semver notation: ^5.3.0 = latest 5.x.x (minor/patch may rise, major may not). This is a trade-off: flexibility vs stability. npm audit scans dependency vulnerabilities - run it regularly.`,
    chId: 'Tambahkan modul lokal kedua: file kalkulator.js berisi fungsi kali(a,b) dan bagi(a,b). Impor dari server.js dan tampilkan hasilnya. Lalu tambahkan dependency baru (misalnya "lodash" versi ^4.17.21) di package.json dan pakai satu fungsi darinya. Jalankan dan catat hasilnya.',
    chEn: 'Add a second local module: a file calculator.js with kali(a,b) and bagi(a,b) functions. Import it from server.js and log the results. Then add a new dependency (e.g. "lodash" at ^4.17.21) in package.json and use one function from it. Run and record the output.',
    sumId: 'Modul: inti vs pihak ketiga vs lokal. CommonJS (require) dan ES Modules (import). package.json + semver + lockfile. npm install & audit. Lanjut: core modules fs, path, os, events.',
    sumEn: 'Modules: core vs third-party vs local. CommonJS (require) and ES Modules (import). package.json + semver + lockfile. npm install & audit. Next: core modules fs, path, os, events.',
  },
  {
    phase: 1, num: 4, topicId: 'core-modules',
    titleId: 'Core Modules: fs, path, os, events', titleEn: 'Core Modules: fs, path, os, events',
    codeFile: 'server.js',
    files: {
      'server.js': `// Core modules: fs, path, os, events
// Jalankan: node server.js

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { EventEmitter } = require('node:events');

// --- fs: baca & tulis file (selalu versi async di server) ---
fs.writeFile('catatan.txt', 'Belajar Node: catatan pertama\\n', (err) => {
  if (err) throw err;
  console.log('File catatan.txt ditulis.');
  fs.readFile('catatan.txt', 'utf-8', (err, data) => {
    console.log('Isi file:', data.trim());
  });
});

// --- path: manipulasi path lintas platform (Windows/Linux/Mac) ---
const filePath = path.join(__dirname, 'subfolder', 'app.js');
console.log('path.join:', filePath);
console.log('basename:', path.basename(filePath));
console.log('extname:', path.extname(filePath));

// --- os: informasi sistem ---
console.log('Platform:', os.platform());
console.log('CPU cores:', os.cpus().length);
console.log('Free memory:', Math.round(os.freemem() / 1024 / 1024) + 'MB');

// --- events: EventEmitter, pola observer ---
class PesanService extends EventEmitter {}
const pesan = new PesanService();
pesan.on('pesan-baru', (isi) => {
  console.log('Event diterima:', isi);
});
pesan.emit('pesan-baru', 'Halo dari EventEmitter!');

// EventEmitter adalah fondasi stream, http, dan Express.`,
      'package.json': `{
  "name": "lesson4-core-modules",
  "version": "1.0.0",
  "description": "Core modules: fs, path, os, events",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}`,
    },
    objId: [
      'Membaca dan menulis file dengan fs (async)',
      'Menggunakan path untuk manipulasi path lintas platform',
      'Membaca informasi sistem dengan os',
      'Membangun arsitektur berbasis event dengan EventEmitter',
    ],
    objEn: [
      'Read and write files with fs (async)',
      'Use path for cross-platform path handling',
      'Read system info with os',
      'Build event-driven architecture with EventEmitter',
    ],
    expId: `## fs: File System
fs.writeFile dan fs.readFile adalah dasar aplikasi yang menyimpan data di disk. Selalu pakai versi callback (async) di server - versi Sync (readFileSync) memblokir event loop. Node 14+ punya fs.promises (async/await) - pola modern. Bonus: stream (fs.createReadStream) untuk file besar, pelajaran 13.
## path: Senjata Rahasia Lintas Platform
'/' bekerja di Linux/Mac tapi gagal di Windows - path.join menangani separator otomatis. path.basename/extname/dirname untuk parsing. Kesalahan paling umum di codebase Node lintas platform adalah hardcode separator '/'. Ingat: __dirname = folder file saat ini, __filename = path lengkap file saat ini.
## os: Cek Kesehatan Mesin
os.platform(), os.cpus(), os.freemem(), os.hostname() dipakai untuk monitoring, logging, dan penyesuaian perilaku aplikasi (misal: jumlah worker = jumlah CPU cores - relevan di pelajaran 15).
## events: Pola Desain Paling Penting di Node
EventEmitter mengimplementasikan pola observer: objek 'mengemisi' event, pendengar 'mendengarkan'. Ini fondasi: http server mengemisi 'request', stream mengemisi 'data'/'end', Express dibangun di atasnya. Memahami emitter = memahami separuh API Node. Pola "event + listener" juga yang membuat arsitektur server bisa modular.`,
    expEn: `## fs: The File System
fs.writeFile and fs.readFile are the foundation of apps that store data on disk. Always use the callback (async) version on the server - the Sync versions (readFileSync) block the event loop. Node 14+ has fs.promises (async/await) - the modern pattern. Bonus: streams (fs.createReadStream) for large files, lesson 13.
## path: The Cross-Platform Secret Weapon
'/' works on Linux/Mac but fails on Windows - path.join handles separators automatically. path.basename/extname/dirname for parsing. The most common bug in cross-platform Node codebases is hardcoding the '/' separator. Remember: __dirname = the current file's folder, __filename = the current file's full path.
## os: Read the Machine's Health
os.platform(), os.cpus(), os.freemem(), os.hostname() are used for monitoring, logging, and tuning behavior (e.g., worker count = CPU core count - relevant in lesson 15).
## events: Node's Most Important Design Pattern
EventEmitter implements the observer pattern: objects "emit" events, listeners "listen" for them. This is the foundation: the http server emits 'request', streams emit 'data'/'end', Express is built on it. Understanding the emitter means understanding half of Node's API. The event + listener pattern is also what makes server architecture modular.`,
    chId: 'Bangun mini-logger: buat class Logger extends EventEmitter dengan event "log" yang membawa { level, pesan, waktu }. Tulis fungsi logInfo/logError yang emit event tersebut dan listener yang menulisnya ke file app.log (fs.appendFile) dan ke console. Simulasikan 5 aktivitas login user. Jalankan dan periksa app.log.',
    chEn: 'Build a mini-logger: create a Logger class extends EventEmitter with a "log" event carrying { level, message, time }. Write logInfo/logError functions that emit the event, and a listener that appends to app.log (fs.appendFile) and logs to the console. Simulate 5 user login activities. Run and inspect app.log.',
    sumId: 'fs untuk file (async!), path lintas platform, os untuk info sistem, events untuk arsitektur event-driven. Ini empat pilar modul inti. Lanjut: web server & HTTP.',
    sumEn: 'fs for files (async!), path across platforms, os for system info, events for event-driven architecture. These are the four pillars of the core modules. Next: web servers & HTTP.',
  },
];

// ===== PHASE 2: EXPRESS & WEB APIS (lessons 5-8) =====
const LESSONS_P2 = [
  {
    phase: 2, num: 5, topicId: 'http-server',
    titleId: 'HTTP Module & Web Server', titleEn: 'The HTTP Module & Web Servers',
    codeFile: 'server.js',
    files: {
      'server.js': `// Web server dengan modul http murni (tanpa framework)
// Jalankan: node server.js lalu buka preview

const http = require('node:http');
const { URL } = require('node:url');

// Data in-memory sederhana (belum database - pelajaran 9)
const catatan = [
  { id: 1, judul: 'Belajar Node', selesai: false },
  { id: 2, judul: 'Belajar Express', selesai: true },
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  const method = req.method;

  // Helper untuk kirim JSON
  const kirimJson = (status, data) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // ROUTING manual: method + path
  if (method === 'GET' && url.pathname === '/') {
    return kirimJson(200, { pesan: 'API Catatan Sederhana' });
  }

  if (method === 'GET' && url.pathname === '/catatan') {
    return kirimJson(200, catatan);
  }

  if (method === 'GET' && url.pathname.startsWith('/catatan/')) {
    const id = Number(url.pathname.split('/')[2]);
    const item = catatan.find((c) => c.id === id);
    if (!item) return kirimJson(404, { error: 'Catatan tidak ditemukan' });
    return kirimJson(200, item);
  }

  // Ambil body dari POST (manual - pelajaran 6 pakai express.json)
  if (method === 'POST' && url.pathname === '/catatan') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const baru = JSON.parse(body || '{}');
      baru.id = catatan.length + 1;
      catatan.push(baru);
      kirimJson(201, baru);
    });
    return;
  }

  kirimJson(404, { error: 'Route tidak ditemukan: ' + method + ' ' + url.pathname });
});

server.listen(3000, () => {
  console.log('Server http murni berjalan di http://localhost:3000');
});`,
      'package.json': `{
  "name": "lesson5-http-server",
  "version": "1.0.0",
  "description": "Web server dengan modul http murni + routing manual",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}`,
    },
    objId: [
      'Membaca request: method, path, query, body',
      'Menulis response: status code, header, JSON',
      'Membangun routing manual dengan http murni',
      'Memahami keterbatasan http murni (kenapa butuh Express)',
    ],
    objEn: [
      'Read a request: method, path, query, body',
      'Write a response: status code, headers, JSON',
      'Build manual routing with pure http',
      'Understand the limits of pure http (why Express exists)',
    ],
    expId: `## Anatomi Request & Response
Setiap request punya: method (GET/POST/PUT/DELETE), url (path + query), headers, dan body (untuk POST/PUT). Response punya: status code (200 OK, 201 Created, 404 Not Found, 500 Error), headers (Content-Type), dan body. Bootcamp yang baik melatih ini DULU dengan http murni, sebelum framework menyembunyikannya.
## Status Code yang Wajib Dihafal
2xx sukses (200 OK, 201 Created, 204 No Content), 3xx redirect, 4xx error client (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx error server (500). API yang benar mengembalikan status code yang TEPAT - bukan hanya 200 untuk semuanya.
## Routing Manual: Penderitaan yang Mendidik
Lihat betapa banyak kode untuk 5 route? Setiap route butuh: cek method, cek path, parsing id, helper JSON. Bayangkan 50 route. Inilah tepatnya yang Express otomatiskan. Tapi Anda sekarang PAHAM apa yang terjadi di balik layar - kebanyakan developer framework tidak pernah mengerti request-response cycle.
## Body Parsing Manual
POST body datang sebagai stream (data/end) - Anda menggabungkan chunk lalu JSON.parse. Ini membuka konsep penting: request body adalah stream, bukan string jadi. Express.json() melakukan ini untuk Anda, tapi sekarang Anda tahu persis apa yang dilakukannya.`,
    expEn: `## Anatomy of a Request & Response
Every request has: a method (GET/POST/PUT/DELETE), a url (path + query), headers, and a body (for POST/PUT). A response has: a status code (200 OK, 201 Created, 404 Not Found, 500 Error), headers (Content-Type), and a body. A good bootcamp trains this FIRST with pure http, before a framework hides it away.
## Status Codes You Must Memorize
2xx success (200 OK, 201 Created, 204 No Content), 3xx redirects, 4xx client errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx server errors (500). Correct APIs return the RIGHT status code - not just 200 for everything.
## Manual Routing: Educational Suffering
See how much code it takes for 5 routes? Each route needs: method check, path check, id parsing, JSON helper. Imagine 50 routes. This is exactly what Express automates. But you now UNDERSTAND what happens under the hood - most framework developers never grasp the request-response cycle.
## Manual Body Parsing
A POST body arrives as a stream (data/end) - you concatenate chunks then JSON.parse. This opens a key concept: the request body is a stream, not a ready string. express.json() does this for you, but now you know exactly what it does.`,
    chId: 'Perluas API catatan: (1) tambah route PUT /catatan/:id untuk mengubah judul, (2) route DELETE /catatan/:id untuk menghapus, (3) validasi: POST dengan body kosong mengembalikan 400. Uji semua route dengan curl/POST (di terminal playground atau dengan fetch di preview). Tuliskan status code tiap route.',
    chEn: 'Extend the notes API: (1) add PUT /catatan/:id to update the title, (2) DELETE /catatan/:id to delete, (3) validation: POST with an empty body returns 400. Test every route with curl/POST (in the playground terminal or fetch in preview). Write down the status code of each route.',
    sumId: 'Request = method + url + headers + body. Status code wajib tepat. Routing manual mahal - itulah kenapa Express ada. Body = stream. Lanjut: Express dan routing.',
    sumEn: 'A request = method + url + headers + body. Status codes must be precise. Manual routing is expensive - that is why Express exists. The body is a stream. Next: Express and routing.',
  },
  {
    phase: 2, num: 6, topicId: 'express-routing',
    titleId: 'Express: Routing & Penanganan Request', titleEn: 'Express: Routing & Request Handling',
    codeFile: 'server.js',
    files: {
      'server.js': `// Express: framework web paling populer untuk Node
// Jalankan: node server.js

const express = require('express');
const app = express();

// Middleware bawaan: parse JSON body otomatis
app.use(express.json());

// Data in-memory
let catatan = [
  { id: 1, judul: 'Belajar Express', selesai: false },
  { id: 2, judul: 'Belajar Middleware', selesai: true },
];
let idBerikutnya = 3;

// GET semua
app.get('/catatan', (req, res) => {
  res.json(catatan);
});

// GET satu dengan route parameter
app.get('/catatan/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = catatan.find((c) => c.id === id);
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(item);
});

// GET dengan query string: /catatan?selesai=true
app.get('/catatan-selesai', (req, res) => {
  const hanyaSelesai = req.query.selesai === 'true';
  res.json(catatan.filter((c) => c.selesai === hanyaSelesai));
});

// POST: buat baru (express.json() sudah parse body)
app.post('/catatan', (req, res) => {
  const { judul } = req.body;
  if (!judul) return res.status(400).json({ error: 'judul wajib diisi' });
  const baru = { id: idBerikutnya++, judul, selesai: false };
  catatan.push(baru);
  res.status(201).json(baru);
});

// PUT: update
app.put('/catatan/:id', (req, res) => {
  const item = catatan.find((c) => c.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  item.judul = req.body.judul || item.judul;
  item.selesai = req.body.selesai !== undefined ? req.body.selesai : item.selesai;
  res.json(item);
});

// DELETE
app.delete('/catatan/:id', (req, res) => {
  const sebelum = catatan.length;
  catatan = catatan.filter((c) => c.id !== Number(req.params.id));
  if (catatan.length === sebelum) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('API Express berjalan di http://localhost:3000/catatan');
});`,
      'package.json': `{
  "name": "lesson6-express-routing",
  "version": "1.0.0",
  "description": "Express: routing lengkap CRUD + query + validation",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}`,
    },
    objId: [
      'Membuat server Express dengan beberapa baris',
      'Mendefinisikan route CRUD lengkap',
      'Memakai route params dan query strings',
      'Mengembalikan status code dan JSON yang benar',
    ],
    objEn: [
      'Create an Express server in a few lines',
      'Define full CRUD routes',
      'Use route params and query strings',
      'Return correct status codes and JSON',
    ],
    expId: `## Express: Perbandingan dengan http Murni
Bandingkan kode ini dengan pelajaran 5: 5 route sekarang ~40 baris vs ~70 baris dengan routing manual. express.json() menggantikan penggabungan chunk manual. res.json() menggantikan writeHead+end. res.status(404).json() mengalirkan respons dengan satu ekspresi. Express = http murni + kenyamanan, TANPA mengganti cara kerja fundamentalnya.
## Route Parameters & Query
req.params.id untuk /catatan/:id (path segment). req.query untuk ?selesai=true (query string). Ingat: params = bagian dari URL path, query = parameter setelah '?'. Keduanya SELALU string - konversi dengan Number() bila perlu. Perhatikan juga: route /catatan-selesai HARUS didefinisikan SEBELUM /catatan/:id, kalau tidak "selesai" tertangkap sebagai id.
## Request Body & Validasi
req.body tersedia karena express.json(). Validasi minimal: cek field wajib (judul), balas 400 dengan pesan jelas. Ini prinsip "fail fast": jangan simpan data rusak ke penyimpanan. Validasi lengkap (express-validator / zod) di pelajaran 12.
## Status Code & REST
Perhatikan pola: GET → 200, POST → 201 (created) + data baru, PUT → 200, DELETE → 204 (no content). Konsistensi ini yang membuat API bisa dipakai frontend dan konsumen lain tanpa tebak-tebakan. Ini juga yang diuji di wawancara kerja backend.`,
    expEn: `## Express: Compared to Pure http
Compare this code to lesson 5: 5 routes now ~40 lines vs ~70 lines of manual routing. express.json() replaces manual chunk concatenation. res.json() replaces writeHead+end. res.status(404).json() flows the response in one expression. Express = pure http + convenience, WITHOUT changing how it fundamentally works.
## Route Parameters & Query
req.params.id for /catatan/:id (a path segment). req.query for ?selesai=true (the query string). Remember: params are part of the URL path, query comes after '?'. Both are ALWAYS strings - convert with Number() when needed. Also note: the /catatan-selesai route MUST be defined BEFORE /catatan/:id, otherwise "selesai" gets caught as an id.
## Request Body & Validation
req.body is available because of express.json(). Minimal validation: check required fields (judul), reply 400 with a clear message. This is "fail fast": never store broken data. Full validation (express-validator / zod) comes in lesson 12.
## Status Codes & REST
Note the pattern: GET → 200, POST → 201 (created) + the new data, PUT → 200, DELETE → 204 (no content). This consistency lets frontends and other consumers use the API without guessing. It is also what backend job interviews test.`,
    chId: 'Tambahkan: (1) route GET /statistik yang menghitung total dan yang selesai dari array catatan, (2) route POST /catatan/bulk yang menerima array judul dan membuat beberapa catatan sekaligus (loop + validasi tiap item), (3) uji dengan fetch di preview. Dokumentasikan response tiap endpoint.',
    chEn: 'Add: (1) a GET /statistik route computing total and completed counts from the notes array, (2) a POST /catatan/bulk route accepting an array of titles and creating several notes at once (loop + validate each item), (3) test with fetch in the preview. Document each endpoint\'s response.',
    sumId: 'Express = http + kenyamanan: routing deklaratif, params, query, JSON body, status codes tepat. Urutan route penting. Validasi dasar + fail fast. Lanjut: middleware.',
    sumEn: 'Express = http + convenience: declarative routing, params, query, JSON bodies, precise status codes. Route order matters. Basic validation + fail fast. Next: middleware.',
  },
  {
    phase: 2, num: 7, topicId: 'express-middleware',
    titleId: 'Middleware: Pipeline Request', titleEn: 'Middleware: The Request Pipeline',
    codeFile: 'server.js',
    files: {
      'server.js': `// Middleware: pipeline request -> response
// Jalankan: node server.js

const express = require('express');
const app = express();

app.use(express.json());

// 1) Middleware logging kustom
app.use((req, res, next) => {
  const waktu = new Date().toISOString();
  console.log(\`[\${waktu}] \${req.method} \${req.url}\`);
  next(); // WAJIB: teruskan ke middleware berikutnya
});

// 2) Middleware autentikasi sederhana (proteksi route tertentu)
function butuhToken(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (token !== 'rahasia123') {
    return res.status(401).json({ error: 'Token tidak valid' });
  }
  next();
}

// 3) Middleware spesifik route: hitung durasi
app.get('/catatan', (req, res, next) => {
  req.mulai = Date.now();
  next();
}, (req, res) => {
  // Data sementara (akan diganti database di pelajaran 9)
  const data = [
    { id: 1, judul: 'Catatan 1', selesai: false },
    { id: 2, judul: 'Catatan 2', selesai: true },
  ];
  res.json({ data, durasiMs: Date.now() - req.mulai });
});

// 4) Route publik vs terproteksi
app.get('/publik', (req, res) => {
  res.json({ pesan: 'Semua orang bisa akses' });
});

app.get('/rahasia', butuhToken, (req, res) => {
  res.json({ pesan: 'Anda punya token yang benar!' });
});

// 5) Middleware 404: menangkap semua route yang tidak ada
app.use((req, res) => {
  res.status(404).json({ error: 'Route tidak ditemukan' });
});

// 6) Middleware error: 4 argumen (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(500).json({ error: 'Terjadi kesalahan server' });
});

app.listen(3000, () => console.log('Server middleware di :3000'));`,
      'package.json': `{
  "name": "lesson7-express-middleware",
  "version": "1.0.0",
  "description": "Middleware: custom, route-specific, auth, 404, error",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}`,
    },
    objId: [
      'Menjelaskan konsep pipeline middleware (req, res, next)',
      'Menulis middleware kustom: logging, auth, 404',
      'Memakai middleware pada route tertentu',
      'Menangani error terpusat dengan error middleware',
    ],
    objEn: [
      'Explain the middleware pipeline concept (req, res, next)',
      'Write custom middleware: logging, auth, 404',
      'Apply middleware to specific routes',
      'Handle errors centrally with error middleware',
    ],
    expId: `## Middleware: Konsep Inti Express
Middleware adalah fungsi yang menerima (req, res, next) dan berjalan BERTAHAP: setiap middleware bisa membaca/mengubah req & res, lalu memanggil next() untuk meneruskan ke tahap berikutnya. Bayangkan jalur produksi: setiap stasiun menangani satu tugas. express.json() sendiri adalah middleware - begitu juga morgan (logging), helmet (keamanan).
## Urutan Pemasangan = Urutan Eksekusi
Middleware dipanggil sesuai urutan app.use/route yang didaftarkan. Logging harus dipasang paling awal (agar mencatat semua). 404 middleware dipasang di PALING AKHIR (setelah semua route). Jika urutan salah, perilaku aplikasi salah - pola debugging klasik di Express adalah memeriksa urutan middleware.
## next() dan Aliran Kontrol
Panggil next() untuk lanjut; jangan panggil next() jika respons sudah dikirim (akan double response - bug umum). Lewati nilai ke next(err) untuk melompat langsung ke error middleware. Middleware yang TIDAK memanggil next dan TIDAK mengirim respons akan menggantung request.
## Auth via Middleware
Pola butuhToken: cek header, jika gagal → 401 (return! jangan next), jika sukses → next(). Ini pola untuk JWT di pelajaran 11: middleware verifikasi token, lalu route handler jalan. Satu middleware bisa dipasang di banyak route - proteksi API tanpa menduplikasi kode.`,
    expEn: `## Middleware: Express's Core Concept
Middleware is a function receiving (req, res, next) that runs in STAGES: each middleware can read/modify req & res, then calls next() to pass to the next stage. Think of an assembly line: each station handles one task. express.json() itself is middleware - so are morgan (logging), helmet (security).
## Mount Order = Execution Order
Middleware runs in the order it is registered with app.use/routes. Logging must be mounted first (so it logs everything). The 404 middleware is mounted LAST (after all routes). If the order is wrong, app behavior is wrong - the classic Express debugging pattern is checking middleware order.
## next() and Control Flow
Call next() to continue; do NOT call next() after the response has already been sent (double-response - a common bug). Pass a value to next(err) to jump straight to the error middleware. Middleware that neither calls next nor sends a response will hang the request.
## Auth via Middleware
The butuhToken pattern: check the header, if it fails → 401 (return! not next), if it passes → next(). This is the JWT pattern in lesson 11: token-verifying middleware, then the route handler runs. One middleware can mount on many routes - protecting the API without duplicating code.`,
    chId: 'Bangun middleware "rate limiter" sederhana: batasi maksimal 3 request per menit per IP (simpan hitungan di Map). Jika melebihi, balas 429 Too Many Requests. Pasang pada route /rahasia. Uji dengan 5 request berturut-turut dan catat status code tiap request.',
    chEn: 'Build a simple "rate limiter" middleware: cap requests at 3 per minute per IP (store counts in a Map). If exceeded, reply 429 Too Many Requests. Mount it on the /rahasia route. Test with 5 consecutive requests and record each status code.',
    sumId: 'Middleware = pipeline (req, res, next). Urutan pemasangan menentukan perilaku. 404 & error handler di akhir. Auth = middleware. Lanjut: REST API & MVC.',
    sumEn: 'Middleware = the pipeline (req, res, next). Mount order defines behavior. 404 & error handlers go last. Auth = middleware. Next: REST APIs & MVC.',
  },
  {
    phase: 2, num: 8, topicId: 'rest-api-mvc',
    titleId: 'REST API & Arsitektur MVC', titleEn: 'REST APIs & MVC Architecture',
    codeFile: 'server.js',
    files: {
      'server.js': `// Struktur MVC: routes -> controllers -> data
// Jalankan: node server.js

const express = require('express');
const app = express();
app.use(express.json());

// ---- MODEL (layer data) ----
// Di pelajaran 9, bagian ini diganti Mongoose (MongoDB)
const dataCatatan = [
  { id: 1, judul: 'Belajar MVC', selesai: false },
  { id: 2, judul: 'Belajar REST', selesai: true },
];
let idBerikutnya = 3;

// ---- CONTROLLER (logika bisnis) ----
const CatatanController = {
  semua(req, res) {
    res.json(dataCatatan);
  },
  detail(req, res) {
    const item = dataCatatan.find((c) => c.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
    res.json(item);
  },
  buat(req, res) {
    const { judul } = req.body;
    if (!judul) return res.status(400).json({ error: 'judul wajib diisi' });
    const baru = { id: idBerikutnya++, judul, selesai: false };
    dataCatatan.push(baru);
    res.status(201).json(baru);
  },
  hapus(req, res) {
    const sebelum = dataCatatan.length;
    const index = dataCatatan.findIndex((c) => c.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Tidak ditemukan' });
    dataCatatan.splice(index, 1);
    res.status(204).end();
  },
};

// ---- ROUTES (pemetaan URL -> controller) ----
// Konvensi REST: kata benda jamak, tanpa kata kerja di URL
app.get('/catatan', CatatanController.semua);
app.get('/catatan/:id', CatatanController.detail);
app.post('/catatan', CatatanController.buat);
app.delete('/catatan/:id', CatatanController.hapus);

app.use((req, res) => res.status(404).json({ error: 'Route tidak ditemukan' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Kesalahan server' });
});

app.listen(3000, () => console.log('API MVC di http://localhost:3000/catatan'));`,
      'package.json': `{
  "name": "lesson8-rest-api-mvc",
  "version": "1.0.0",
  "description": "REST API dengan arsitektur MVC",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}`,
    },
    objId: [
      'Merancang API RESTful: resource, method, status code',
      'Memisahkan kode menjadi Model, Controller, Route',
      'Menerapkan konvensi penamaan REST',
      'Menjelaskan alur request: route → controller → model',
    ],
    objEn: [
      'Design RESTful APIs: resources, methods, status codes',
      'Separate code into Model, Controller, Route',
      'Apply REST naming conventions',
      'Explain the request flow: route → controller → model',
    ],
    expId: `## Prinsip REST dalam Satu Paragraf
REST = memodelkan API sebagai RESOURCE (kata benda: /catatan) dan bertindak dengannya via HTTP method (GET baca, POST buat, PUT ubah, DELETE hapus). Bukan aksi dalam URL (/hapusCatatan) - resource + method sudah cukup ekspresif. API RESTful yang baik: konsisten, dapat ditebak, dan sesuai konvensi.
## Mengapa MVC? Sepatu Balet di Pabrik Kode
MVC (Model-View-Controller) memisahkan: Model = data & aturannya, Controller = logika bisnis (validasi, status code), View = output (JSON/HTML - di API, res.json). Di backend API, Routes hanyalah pemetaan URL → controller. Manfaat: setiap file kecil & fokus, bisa di-test, bisa diganti implementasinya (misal: ganti array → MongoDB tanpa menyentuh route).
## Alur Request di Aplikasi Ini
Request masuk → Express mencocokkan URL dengan route → route memanggil controller → controller memvalidasi & memanggil data (model) → controller membentuk response (status + JSON). Jika Anda bisa menjelaskan alur ini tanpa menoleh, Anda sudah memahami arsitektur backend modern - ini juga cara kerja NestJS, Laravel, dan Spring (dengan nama berbeda).
## Konvensi Penamaan REST
Plural noun: /catatan, /user. Resource bersarang: /catatan/:id/komentar. Method + status code sudah dijelaskan pelajaran 6. Konsistensi > kreativitas: satu API harus memakai satu gaya, bukan gaya campuran.`,
    expEn: `## REST Principles in One Paragraph
REST = modeling an API as RESOURCES (nouns: /catatan) and acting on them via HTTP methods (GET read, POST create, PUT update, DELETE delete). Not actions in URLs (/hapusCatatan) - resource + method are expressive enough. A good RESTful API: consistent, predictable, conventional.
## Why MVC? Ballet Shoes in the Code Factory
MVC (Model-View-Controller) separates: Model = data & its rules, Controller = business logic (validation, status codes), View = output (JSON/HTML - in APIs, res.json). In backend APIs, Routes are just URL → controller mappings. Benefits: every file is small & focused, testable, and its implementation swappable (e.g., switching array → MongoDB without touching routes).
## Request Flow in This App
Request arrives → Express matches the URL to a route → the route calls the controller → the controller validates & accesses data (model) → the controller shapes the response (status + JSON). If you can explain this flow without looking, you understand modern backend architecture - it is also how NestJS, Laravel, and Spring work (under different names).
## REST Naming Conventions
Plural nouns: /catatan, /user. Nested resources: /catatan/:id/komentar. Methods + status codes were covered in lesson 6. Consistency > creativity: one API must use one style, not a mix.`,
    chId: 'Refactor: pisahkan kode menjadi 3 file - routes/catatan.js (Router express), controllers/catatanController.js, dan models/catatanModel.js (fungsi array). server.js hanya memuat app + router. Tambahkan resource baru /label (CRUD lengkap) dengan pola yang sama. Uji kedua resource.',
    chEn: 'Refactor: split the code into 3 files - routes/catatan.js (an express Router), controllers/catatanController.js, and models/catatanModel.js (array functions). server.js only mounts the app + router. Add a second resource /label (full CRUD) with the same pattern. Test both resources.',
    sumId: 'REST: resource + method, bukan aksi di URL. MVC: model/controller/route terpisah. Alur: route → controller → model → response. Ini fondasi Nest/Laravel/Spring. Lanjut: MongoDB.',
    sumEn: 'REST: resources + methods, not actions in URLs. MVC: model/controller/route separated. Flow: route → controller → model → response. This is the foundation of Nest/Laravel/Spring. Next: MongoDB.',
  },
];

// ===== PHASE 3: DATABASES & AUTH (lessons 9-12) =====
const LESSONS_P3 = [
  {
    phase: 3, num: 9, topicId: 'mongodb-mongoose',
    titleId: 'MongoDB & Mongoose: Persistensi Pertama', titleEn: 'MongoDB & Mongoose: First Persistence',
    codeFile: 'server.js',
    files: {
      'server.js': `// MongoDB + Mongoose: data yang bertahan hidup
// Catatan: di playground ini, DB disimulasikan di memori.
// Di mesin lokal: instal MongoDB (atau pakai Atlas) + mongoose.

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// --- Schema: cetak biru dokumen ---
const catatanSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, maxlength: 200 },
    selesai: { type: Boolean, default: false },
    prioritas: { type: String, enum: ['rendah', 'sedang', 'tinggi'], default: 'sedang' },
    tags: [String],
  },
  { timestamps: true } // createdAt & updatedAt otomatis
);

// --- Model: interface untuk koleksi "catatans" ---
const Catatan = mongoose.model('Catatan', catatanSchema);

// --- Koneksi (di lokal: mongodb://localhost:27017/tryngo) ---
// mongoose.connect('mongodb://localhost:27017/tryngo')
//   .then(() => console.log('Terhubung ke MongoDB'))
//   .catch((err) => console.error('Gagal konek:', err));

// --- CRUD dengan Mongoose ---
app.get('/catatan', async (req, res) => {
  const { selesai, tag, limit = 10 } = req.query;
  const filter = {};
  if (selesai !== undefined) filter.selesai = selesai === 'true';
  if (tag) filter.tags = tag;
  const data = await Catatan.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
  res.json(data);
});

app.post('/catatan', async (req, res) => {
  try {
    const baru = await Catatan.create(req.body);
    res.status(201).json(baru);
  } catch (err) {
    // ValidationError dari Mongoose
    res.status(400).json({ error: err.message });
  }
});

app.put('/catatan/:id', async (req, res) => {
  const item = await Catatan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(item);
});

app.delete('/catatan/:id', async (req, res) => {
  const item = await Catatan.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.status(204).end();
});

// Seeder: isi data contoh saat server start
(async () => {
  if ((await Catatan.countDocuments()) === 0) {
    await Catatan.create([
      { judul: 'Belajar Mongoose', prioritas: 'tinggi', tags: ['node'] },
      { judul: 'Belajar Schema', selesai: true, tags: ['node'] },
    ]);
  }
  app.listen(3000, () => console.log('API MongoDB di :3000/catatan'));
})();`,
      'package.json': `{
  "name": "lesson9-mongodb-mongoose",
  "version": "1.0.0",
  "description": "MongoDB + Mongoose: schema, model, CRUD",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "mongoose": "^8.9.0"
  }
}`,
    },
    objId: [
      'Menjelaskan model dokumen: collection, document, BSON',
      'Mendefinisikan schema dan model dengan Mongoose',
      'Melakukan CRUD async dengan query Mongoose',
      'Memanfaatkan validasi bawaan Mongoose',
    ],
    objEn: [
      'Explain the document model: collections, documents, BSON',
      'Define schemas and models with Mongoose',
      'Perform async CRUD with Mongoose queries',
      'Leverage built-in Mongoose validation',
    ],
    expId: `## NoSQL: Berpikir Dokumen, Bukan Baris
MongoDB menyimpan dokumen (objek JSON/BSON) dalam collection (bukan tabel). Satu dokumen bisa punya struktur berbeda (no strict schema) - flexibel, tapi ini pedang bermata dua: tanpa schema, data bisa berantakan. Mongoose menambahkan schema di level aplikasi untuk menjawabnya.
## Schema & Model
Schema = cetak biru (type, required, default, enum, maxlength). Model = interface untuk berinteraksi dengan collection. Aturan emas modeling dokumen: embed (simpan di dalam) jika dibaca bersama, reference (id) jika dipakai terpisah. Catatan punya tags array di dalamnya - embedded, karena selalu tampil bersama.
## CRUD Async
Mongoose adalah library async: find (query, bisa dirantai: .sort().limit()), create, findByIdAndUpdate ({ new: true } mengembalikan hasil terbaru, runValidators menjalankan validasi schema), findByIdAndDelete. Validasi: .create() melempar ValidationError jika field wajib kosong - ditangkap try/catch dan dibalas 400.
## timestamps & Query yang Bermanfaat
{ timestamps: true } menambahkan createdAt/updatedAt otomatis - tidak perlu dihafal, selalu ada. Pattern filter dinamis (selesai, tag, limit) di contoh menunjukkan cara API yang fleksibel: query string → filter object → query Mongoose. Ini pola yang dipakai hampir semua API produksi.`,
    expEn: `## NoSQL: Think Documents, Not Rows
MongoDB stores documents (JSON/BSON objects) in collections (not tables). A single document may have a different structure (no strict schema) - flexible, but a double-edged sword: without a schema, data can get messy. Mongoose adds schemas at the application level to answer that.
## Schema & Model
Schema = the blueprint (type, required, default, enum, maxlength). Model = the interface to interact with a collection. The golden rule of document modeling: embed (store inside) if always read together, reference (store an id) if used separately. Notes have a tags array inside - embedded, because it always renders with them.
## Async CRUD
Mongoose is an async library: find (query, chainable: .sort().limit()), create, findByIdAndUpdate ({ new: true } returns the updated result, runValidators runs schema validation), findByIdAndDelete. Validation: .create() throws ValidationError when required fields are empty - caught by try/catch and answered with 400.
## timestamps & Useful Queries
{ timestamps: true } adds createdAt/updatedAt automatically - no memorizing, always there. The dynamic filter pattern (selesai, tag, limit) in the sample shows how flexible APIs work: query string → filter object → Mongoose query. This is the pattern nearly every production API uses.`,
    chId: 'Tambah fitur: (1) schema field "deadline" bertipe Date, (2) route GET /catatan/terlambat: filter deadline < sekarang dan selesai = false, (3) route GET /catatan?prioritas=tinggi bekerja - uji dengan fetch. Seeder: tambah catatan dengan deadline kemarin. Dokumentasikan query filter yang Anda pakai.',
    chEn: 'Add features: (1) a schema field "deadline" of type Date, (2) a GET /catatan/terlambat route filtering deadline < now and selesai = false, (3) make GET /catatan?prioritas=tinggi work - test with fetch. In the seeder, add a note with yesterday\'s deadline. Document the filter queries you used.',
    sumId: 'MongoDB: dokumen dalam collection. Mongoose: schema + model + CRUD async + validasi. Embed vs reference. timestamps & filter dinamis. Lanjut: PostgreSQL & SQL.',
    sumEn: 'MongoDB: documents in collections. Mongoose: schemas + models + async CRUD + validation. Embed vs reference. timestamps & dynamic filters. Next: PostgreSQL & SQL.',
  },
  {
    phase: 3, num: 10, topicId: 'postgresql-sql',
    titleId: 'PostgreSQL & SQL: Relational yang Tegas', titleEn: 'PostgreSQL & SQL: Firmly Relational',
    codeFile: 'server.js',
    files: {
      'server.js': `// PostgreSQL: SQL + relasi antar tabel
// Jalankan: node server.js
// Catatan: playground ini mensimulasikan client pg di memori.

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// --- Koneksi pool (koneksi dipakai bersama, efisien) ---
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'rahasia',
  database: 'tryngo',
});

// --- Schema SQL (DDL) ---
// CREATE TABLE user (id SERIAL PRIMARY KEY, nama TEXT NOT NULL, email TEXT UNIQUE);
// CREATE TABLE catatan (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
//   judul TEXT NOT NULL,
//   selesai BOOLEAN DEFAULT false,
//   dibuat TIMESTAMPTZ DEFAULT now()
// );

// --- CRUD dengan SQL (parameterized - aman dari SQL injection) ---
app.get('/catatan', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM catatan ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/catatan/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM catatan WHERE id = $1',
    [id] // $1 = placeholder aman
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Tidak ditemukan' });
  }
  res.json(result.rows[0]);
});

app.post('/catatan', async (req, res) => {
  const { judul, user_id = 1 } = req.body;
  const result = await pool.query(
    'INSERT INTO catatan (judul, user_id) VALUES ($1, $2) RETURNING *',
    [judul, user_id]
  );
  res.status(201).json(result.rows[0]);
});

app.put('/catatan/:id', async (req, res) => {
  const { judul, selesai } = req.body;
  const result = await pool.query(
    'UPDATE catatan SET judul = $1, selesai = $2 WHERE id = $3 RETURNING *',
    [judul, selesai, req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(result.rows[0]);
});

app.delete('/catatan/:id', async (req, res) => {
  await pool.query('DELETE FROM catatan WHERE id = $1', [req.params.id]);
  res.status(204).end();
});

// --- JOIN: relasi antar tabel ---
app.get('/user/:id/catatan', async (req, res) => {
  const result = await pool.query(
    'SELECT u.nama, c.judul, c.selesai FROM user u ' +
    'JOIN catatan c ON c.user_id = u.id WHERE u.id = $1',
    [req.params.id]
  );
  res.json(result.rows);
});

app.listen(3000, () => console.log('API PostgreSQL di :3000/catatan'));`,
      'package.json': `{
  "name": "lesson10-postgresql-sql",
  "version": "1.0.0",
  "description": "PostgreSQL + SQL: CRUD, parameterized queries, JOIN",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "pg": "^8.13.0"
  }
}`,
    },
    objId: [
      'Menjelaskan model relasional: tabel, baris, primary/foreign key',
      'Menulis query CRUD dengan parameterized queries',
      'Menggabungkan data dengan JOIN',
      'Memutuskan kapan SQL dan kapan NoSQL',
    ],
    objEn: [
      'Explain the relational model: tables, rows, primary/foreign keys',
      'Write CRUD queries with parameterized queries',
      'Join data across tables with JOIN',
      'Decide when to use SQL and when NoSQL',
    ],
    expId: `## Model Relasional: Tabel, Baris, Kunci
Data disimpan dalam tabel (baris = record, kolom = field, terdefinisi tegas oleh schema). PRIMARY KEY mengidentifikasi baris; FOREIGN KEY menghubungkan tabel (catatan.user_id → user.id). Relasi mencegah duplikasi: user disimpan sekali, catatan mereferensikannya. Ini kekuatan SQL: integritas data adalah prioritas.
## Parameterized Query: $1, $2
JANGAN PERNAH menggabungkan nilai ke query dengan string template ('...' + judul + '...'). Itu SQL injection - celah yang bisa menghapus seluruh database Anda. Pakai placeholder $1, $2 + array nilai: pg menangani escaping. Ini pelajaran keamanan paling penting di track ini, dan persis yang diuji di wawancara backend.
## JOIN: Menyatukan Data
JOIN menggabungkan baris dari dua tabel berdasarkan kunci (ON c.user_id = u.id). Hasil: data user + data catatannya dalam satu query, tanpa dua round-trip. JOIN ada beberapa jenis: INNER (hanya yang cocok), LEFT (semua baris kiri), dsb. Kemampuan menyusun JOIN adalah skill inti database relasional.
## SQL vs NoSQL: Keputusan Arsitektur
SQL: data sangat terstruktur, relasi kuat, butuh transaksi & konsistensi (finansial, akuntansi, order). NoSQL: fleksibel, scale horizontal mudah, skema berubah cepat (log, katalog, prototype). Banyak stack produksi memakai KEDUANYA (polyglot persistence). Jawaban wawancara yang bagus menjelaskan trade-off, bukan memilih satu pemenang.`,
    expEn: `## The Relational Model: Tables, Rows, Keys
Data lives in tables (rows = records, columns = fields, firmly defined by schema). A PRIMARY KEY identifies a row; a FOREIGN KEY links tables (catatan.user_id → user.id). Relations prevent duplication: a user is stored once, notes reference it. This is SQL's strength: data integrity is the priority.
## Parameterized Queries: $1, $2
NEVER splice values into a query with string templates ('...' + judul + '...'). That is SQL injection - a hole that can wipe your entire database. Use $1, $2 placeholders + a values array: pg handles escaping. This is the most important security lesson in this track, and exactly what backend interviews test.
## JOIN: Fusing Data
JOIN combines rows from two tables on a key (ON c.user_id = u.id). Result: a user's data + their notes in one query, without two round-trips. JOIN comes in flavors: INNER (only matches), LEFT (all left rows), etc. Crafting JOINs is a core relational database skill.
## SQL vs NoSQL: An Architecture Decision
SQL: highly structured data, strong relations, needs transactions & consistency (finance, accounting, orders). NoSQL: flexible, easy horizontal scaling, fast-changing schemas (logs, catalogs, prototypes). Many production stacks use BOTH (polyglot persistence). A good interview answer explains trade-offs, not one winner.`,
    chId: 'Tulis DDL untuk sistem blog: tabel user (id, nama, email), tabel post (id, user_id FK, judul, isi, published_at), tabel komentar (id, post_id FK, user_id FK, isi). Lalu tulis 3 query: (1) semua post user tertentu dengan nama user (JOIN), (2) jumlah post per user (GROUP BY), (3) post dengan 5 komentar terbaru. Tuliskan SQL-nya.',
    chEn: 'Write DDL for a blog system: user table (id, nama, email), post table (id, user_id FK, judul, isi, published_at), komentar table (id, post_id FK, user_id FK, isi). Then write 3 queries: (1) all posts of a given user with the user name (JOIN), (2) post count per user (GROUP BY), (3) posts with their 5 latest comments. Write the SQL down.',
    sumId: 'SQL: tabel + kunci + integritas. Parameterized query = wajib. JOIN menyatukan relasi. SQL vs NoSQL = keputusan arsitektur. Lanjut: autentikasi JWT.',
    sumEn: 'SQL: tables + keys + integrity. Parameterized queries are mandatory. JOIN fuses relations. SQL vs NoSQL = an architecture decision. Next: JWT authentication.',
  },
  {
    phase: 3, num: 11, topicId: 'auth-jwt',
    titleId: 'Autentikasi: bcrypt & JWT', titleEn: 'Authentication: bcrypt & JWT',
    codeFile: 'server.js',
    files: {
      'server.js': `// Autentikasi: register + login + protected routes
// Jalankan: node server.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Di produksi: simpan di .env, JANGAN di kode!
const JWT_SECRET = 'kunci-sangat-rahasia';
const JWT_EXPIRES = '2h';

// "Database" in-memory (ganti dengan MongoDB/PostgreSQL di proyek asli)
const user = [];

// --- Helper: middleware auth ---
function butuhAuth(req, res, next) {
  const header = req.headers.authorization; // "Bearer <token>"
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ada' });
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Token tidak valid / kedaluwarsa' });
  }
}

// --- Register: hash password, simpan user ---
app.post('/register', async (req, res) => {
  const { nama, email, password } = req.body;
  if (!nama || !email || !password) {
    return res.status(400).json({ error: 'nama, email, password wajib diisi' });
  }
  if (user.find((u) => u.email === email)) {
    return res.status(409).json({ error: 'Email sudah terdaftar' });
  }
  const hash = await bcrypt.hash(password, 10); // 10 = cost factor
  const baru = { id: user.length + 1, nama, email, password: hash };
  user.push(baru);
  res.status(201).json({ id: baru.id, nama, email });
});

// --- Login: verifikasi hash, terbitkan JWT ---
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const akun = user.find((u) => u.email === email);
  // Pesan error SAMA untuk email/password salah - jangan bocorkan info
  if (!akun) return res.status(401).json({ error: 'Email atau password salah' });
  const cocok = await bcrypt.compare(password, akun.password);
  if (!cocok) return res.status(401).json({ error: 'Email atau password salah' });

  const token = jwt.sign(
    { id: akun.id, nama: akun.nama },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
  res.json({ token, user: { id: akun.id, nama: akun.nama, email: akun.email } });
});

// --- Protected route ---
app.get('/profil', butuhAuth, (req, res) => {
  const akun = user.find((u) => u.id === req.user.id);
  res.json({ id: akun.id, nama: akun.nama, email: akun.email });
});

// --- Bootstrap: buat user contoh ---
(async () => {
  const hash = await bcrypt.hash('password123', 10);
  user.push({ id: 1, nama: 'Budi', email: 'budi@mail.com', password: hash });
  app.listen(3000, () => console.log('Auth API di :3000 (register/login/profil)'));
})();`,
      'package.json': `{
  "name": "lesson11-auth-jwt",
  "version": "1.0.0",
  "description": "Auth: register, login, bcrypt, JWT, protected routes",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2"
  }
}`,
    },
    objId: [
      'Menyimpan password dengan aman (bcrypt hash + salt)',
      'Menerbitkan dan memverifikasi JWT',
      'Membuat route terproteksi dengan middleware auth',
      'Menerapkan praktik keamanan: 401/409, pesan seragam, secret di .env',
    ],
    objEn: [
      'Store passwords securely (bcrypt hash + salt)',
      'Issue and verify JWTs',
      'Protect routes with an auth middleware',
      'Apply security practices: 401/409, uniform messages, secrets in .env',
    ],
    expId: `## Jangan Pernah Simpan Password Mentah
Jika database bocor dan password tersimpan mentah, semua akun Anda kompromi. bcrypt.hash(password, 10): hash satu arah + salt otomatis per-user. Login memakai bcrypt.compare (bukan perbandingan string!). Cost factor 10 = keseimbangan keamanan vs performa (12 direkomendasikan untuk produksi). Tidak ada cara "reverse" hash - brute force adalah satu-satunya, dan salt membuatnya sia-sia.
## JWT: Token, Bukan Session
Setelah login, server menerbitkan token (header.payload.signature) yang dibawa client di header Authorization: Bearer <token>. Server memverifikasi signature dengan JWT_SECRET - TANPA menyimpan state (stateless). Payload bisa dibaca siapa saja - JANGAN taruh data sensitif di payload. expiresIn mencegah token abadi. Logout = client membuang token (server stateless).
## Middleware Auth: Satu Pola untuk Semua Route
butuhAuth: ambil header, validasi format "Bearer ", jwt.verify (melempar jika invalid/expired), simpan payload ke req.user, next(). Tempelkan ke route mana pun: app.get('/profil', butuhAuth, handler). Ini pola yang sama di semua framework (NestJS pakai guards, Laravel pakai middleware).
## Praktik Keamanan yang Sering Dilupakan
(1) Pesan error login seragam ("Email atau password salah") - jangan bilang "email tidak ditemukan", itu membantu penyerang. (2) Status code tepat: 401 unauthenticated, 409 conflict, 403 forbidden. (3) JWT_SECRET di .env + tidak pernah di git. (4) HTTPS di produksi - tanpa itu, token bisa dicuri di jaringan.`,
    expEn: `## Never Store Raw Passwords
If a database leaks and passwords are stored raw, every account is compromised. bcrypt.hash(password, 10): one-way hash + automatic per-user salt. Login uses bcrypt.compare (not string comparison!). Cost factor 10 = security vs performance balance (12 is recommended for production). There is no way to "reverse" a hash - brute force is the only route, and salt makes it futile.
## JWT: Tokens, Not Sessions
After login, the server issues a token (header.payload.signature) that the client carries in the Authorization: Bearer <token> header. The server verifies the signature with JWT_SECRET - WITHOUT storing state (stateless). The payload can be read by anyone - do NOT put sensitive data in it. expiresIn prevents immortal tokens. Logout = the client discards the token (the server is stateless).
## Auth Middleware: One Pattern for All Routes
butuhAuth: take the header, validate "Bearer " format, jwt.verify (throws on invalid/expired), stash the payload in req.user, next(). Mount it on any route: app.get('/profil', butuhAuth, handler). This is the same pattern in every framework (NestJS guards, Laravel middleware).
## Security Practices Often Forgotten
(1) Uniform login errors ("Email or password wrong") - do not say "email not found", that helps attackers. (2) Correct status codes: 401 unauthenticated, 409 conflict, 403 forbidden. (3) JWT_SECRET in .env, never in git. (4) HTTPS in production - without it, tokens can be stolen on the network.`,
    chId: 'Perluas sistem auth: (1) role pada user ("user" | "admin") dan route GET /admin yang HANYA bisa diakses admin (cek req.user.role, balas 403 untuk selain admin), (2) endpoint /ganti-password (butuhAuth): verifikasi password lama dengan bcrypt.compare, hash password baru, simpan, (3) uji seluruh alur dengan fetch di preview.',
    chEn: 'Extend the auth system: (1) a role on users ("user" | "admin") and a GET /admin route accessible ONLY by admins (check req.user.role, reply 403 otherwise), (2) a /ganti-password endpoint (butuhAuth): verify the old password with bcrypt.compare, hash the new one, store it, (3) test the whole flow with fetch in the preview.',
    sumId: 'bcrypt: hash + salt, jangan simpan mentah. JWT: stateless token + expiresIn. Auth = middleware. Pesan seragam + status code tepat + secret di .env. Lanjut: keamanan & error handling.',
    sumEn: 'bcrypt: hash + salt, never store raw. JWT: stateless tokens + expiresIn. Auth = middleware. Uniform messages + precise status codes + secrets in .env. Next: security & error handling.',
  },
  {
    phase: 3, num: 12, topicId: 'security-errors',
    titleId: 'Keamanan API & Error Handling', titleEn: 'API Security & Error Handling',
    codeFile: 'server.js',
    files: {
      'server.js': `// Keamanan API + error handling terpusat
// Jalankan: node server.js

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// --- 1) Keamanan dasar ---
app.use(helmet()); // header keamanan HTTP (X-Frame-Options, CSP, dll)
app.use(cors()); // izinkan origin tertentu (bukan * di produksi)
app.use(express.json());

// --- 2) Rate limiting: batasi abuse ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  limit: 100, // maks 100 request per window per IP
  message: { error: 'Terlalu banyak request - coba lagi nanti' },
});
app.use('/api', limiter);

// --- 3) Validasi input ---
function validasiCatatan(req, res, next) {
  const { judul } = req.body;
  if (!judul || typeof judul !== 'string' || judul.length > 200) {
    return res.status(400).json({ error: 'judul wajib: string, maks 200 karakter' });
  }
  req.body.judul = judul.trim(); // bersihkan spasi
  next();
}

// --- 4) Error class khusus (agar handler terpusat tahu jenisnya) ---
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// --- 5) Data & routes ---
const catatan = [];
let id = 1;

app.get('/api/catatan', (req, res) => {
  res.json(catatan);
});

app.post('/api/catatan', validasiCatatan, (req, res) => {
  const baru = { id: id++, judul: req.body.judul, selesai: false };
  catatan.push(baru);
  res.status(201).json(baru);
});

// Contoh error yang dilempar ke handler terpusat
app.get('/api/ledakan', (req, res, next) => {
  next(new ApiError(500, 'Sesuatu meledak secara terencana'));
});

// --- 6) 404: route tidak ditemukan ---
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route tidak ditemukan' });
});

// --- 7) Error handler TERPUSAT (wajib 4 argumen) ---
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error('SERVER ERROR:', err.stack);
  const body = status >= 500
    ? { error: 'Terjadi kesalahan server' } // jangan bocorkan detail ke client
    : { error: err.message };
  res.status(status).json(body);
});

app.listen(3000, () => console.log('Secure API di :3000/api/catatan'));`,
      'package.json': `{
  "name": "lesson12-security-errors",
  "version": "1.0.0",
  "description": "Keamanan API: helmet, CORS, rate limit, validasi, error handling",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "express-rate-limit": "^7.4.0",
    "helmet": "^8.0.0"
  }
}`,
    },
    objId: [
      'Memasang helmet, CORS, dan rate limiting',
      'Menulis validasi input dengan fail fast',
      'Menangani error secara terpusat',
      'Menyembunyikan detail error server dari client',
    ],
    objEn: [
      'Mount helmet, CORS, and rate limiting',
      'Write input validation with fail fast',
      'Handle errors centrally',
      'Hide server error details from clients',
    ],
    expId: `## Empat Lapis Pertahanan API
(1) helmet: header keamanan HTTP (CSP, X-Frame-Options, HSTS...) - menutup kelas serangan XSS/clickjacking. (2) cors: membatasi browser mana yang boleh memanggil API. (3) rate limit: membatasi request per IP - menahan brute force & DDoS dasar. (4) validasi input: menolak data buruk SEBELUM masuk logika. API produksi memasang semuanya; API kursus biasanya melupakan sebagian.
## Validasi: Fail Fast, Jangan Pernah Percaya Input
Client adalah musuh yang sopan: semua yang masuk lewat HTTP bisa dimanipulasi. Validasi tiap field: wajib, tipe, panjang, format. Trim data (judul.trim()). Tolak dengan 400 + pesan jelas. Pola middleware validasi (validasiCatatan) membuat handler route bersih - ini yang diotomatiskan express-validator/zod di proyek besar.
## Error Handling Terpusat: Satu Tempat untuk Semua
Middleware error (4 argumen: err, req, res, next) menangkap SEMUA error: yang dilempar next(err) maupun error async yang diteruskan. 404 handler menangkap route yang tidak terdefinisi. Keuntungan: format response error konsisten, log terpusat, dan kode route tidak penuh try/catch. ApiError class membawa status code agar handler tahu cara merespons.
## Jangan Bocorkan Detail Server
res.status(500) mengembalikan pesan GENERIK untuk client; detail error (stack trace) hanya ke log server. Stack trace di respons client = peta serangan gratis untuk hacker. Aturan: 4xx = pesan error spesifik untuk client; 5xx = pesan generik + log detail.`,
    expEn: `## Four Layers of API Defense
(1) helmet: HTTP security headers (CSP, X-Frame-Options, HSTS...) - closes a class of XSS/clickjacking attacks. (2) cors: limits which browsers may call the API. (3) rate limit: caps requests per IP - holds back brute force & basic DDoS. (4) input validation: rejects bad data BEFORE it enters business logic. Production APIs mount all of them; tutorial APIs usually forget some.
## Validation: Fail Fast, Never Trust Input
The client is a polite enemy: everything arriving over HTTP can be manipulated. Validate every field: required, type, length, format. Trim data (judul.trim()). Reject with 400 + a clear message. The validation middleware pattern (validasiCatatan) keeps route handlers clean - express-validator/zod automate this in bigger projects.
## Central Error Handling: One Place for Everything
The error middleware (4 args: err, req, res, next) catches ALL errors: those thrown via next(err) and forwarded async errors. The 404 handler catches undefined routes. Payoff: consistent error response format, central logging, and route code free of try/catch soup. The ApiError class carries a status code so the handler knows how to respond.
## Never Leak Server Details
res.status(500) returns a GENERIC message to the client; details (stack traces) go only to server logs. A stack trace in a client response is a free attack map for hackers. Rule: 4xx = specific error message for the client; 5xx = generic message + detailed logs.`,
    chId: 'Tambahkan ke API: (1) validasi param id (harus angka positif - selain itu 400), (2) endpoint /api/ganti-password yang melempar ApiError(401) jika token lama tidak valid (simulasi: header x-auth harus "valid"), (3) uji: request tanpa header ke /api/ledakan, request berlebihan (lebih dari 100) ke /api/catatan - catat status code dan body tiap kasus.',
    chEn: 'Add to the API: (1) id param validation (must be a positive number - otherwise 400), (2) a /api/ganti-password endpoint throwing ApiError(401) when the old token is invalid (simulation: header x-auth must be "valid"), (3) test: a request without headers to /api/ledakan, an excessive request stream (over 100) to /api/catatan - record status codes and bodies for each case.',
    sumId: 'helmet + CORS + rate limit + validasi = 4 lapis pertahanan. Fail fast: tolak input buruk. Error handler terpusat + ApiError. 5xx generik untuk client. Lanjut: upload & integrasi.',
    sumEn: 'helmet + CORS + rate limit + validation = 4 defense layers. Fail fast: reject bad input. Central error handler + ApiError. Generic 5xx to clients. Next: uploads & integration.',
  },
];

// ===== PHASE 4: PRODUCTION & CAPSTONE (lessons 13-16) =====
const LESSONS_P4 = [
  {
    phase: 4, num: 13, topicId: 'upload-integrasi',
    titleId: 'File Upload & Integrasi API Eksternal', titleEn: 'File Uploads & External API Integration',
    codeFile: 'server.js',
    files: {
      'server.js': `// File upload (multer) + integrasi API eksternal + pagination
// Jalankan: node server.js

const express = require('express');
const multer = require('multer');
const path = require('node:path');

const app = express();
app.use(express.json());

// --- Multer: handle multipart/form-data ---
// Simpan di memori (untuk produksi: cloud storage / disk dengan validasi)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // maks 2MB
  fileFilter: (req, file, cb) => {
    const ok = ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error('Hanya gambar yang diizinkan'), ok);
  },
});

// --- Data in-memory dengan pagination ---
const post = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  judul: 'Postingan ' + (i + 1),
  gambarUrl: null,
}));

// --- Upload endpoint ---
app.post('/post/:id/gambar', upload.single('gambar'), (req, res) => {
  const p = post.find((x) => x.id === Number(req.params.id));
  if (!p) return res.status(404).json({ error: 'Post tidak ditemukan' });
  if (!req.file) return res.status(400).json({ error: 'File gambar wajib ada' });
  p.gambarUrl = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64');
  res.json({ pesan: 'Gambar diunggah', ukuranKB: Math.round(req.file.size / 1024), gambarUrl: p.gambarUrl });
});

// --- Pagination: /post?page=1&limit=10 ---
app.get('/post', (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 10);
  const mulai = (page - 1) * limit;
  const data = post.slice(mulai, mulai + limit);
  res.json({
    data,
    pagination: { page, limit, total: post.length, totalPages: Math.ceil(post.length / limit) },
  });
});

// --- Integrasi API eksternal (simulasi fetch ke https://api.contoh.com/users) ---
app.get('/user-eksternal', async (req, res) => {
  // Di produksi: const resp = await fetch('https://api.example.com/users', { headers: {...} });
  // Di playground, simulasikan respons API eksternal:
  const data = await Promise.resolve([
    { id: 1, nama: 'Budi' },
    { id: 2, nama: 'Ani' },
  ]);
  res.json(data);
});

app.listen(3000, () => console.log('Upload & integrasi API di :3000'));`,
      'package.json': `{
  "name": "lesson13-upload-integrasi",
  "version": "1.0.0",
  "description": "File upload multer, pagination, integrasi API eksternal",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "multer": "^1.4.5-lts.1"
  }
}`,
    },
    objId: [
      'Menangani upload file dengan multer',
      'Membatasi tipe dan ukuran file',
      'Membangun pagination API yang benar',
      'Memanggil API eksternal dengan fetch',
    ],
    objEn: [
      'Handle file uploads with multer',
      'Restrict file types and sizes',
      'Build correct API pagination',
      'Call external APIs with fetch',
    ],
    expId: `## Multer: File Upload Tanpa Sakit Kepala
Form data multipart tidak bisa diparse express.json(). Multer menyediakan middleware: upload.single('gambar') menangkap file di field tersebut. memoryStorage menyimpan di RAM (cukup untuk kecil); produksi biasanya diskStorage atau langsung ke cloud storage (S3/Cloudinary). Selalu batasi: ukuran (limits.fileSize) dan tipe (fileFilter) - file berbahaya adalah vektor serangan.
## Validasi File: Dua Lapis
fileFilter menolak ekstensi selain gambar. Lapis kedua: verifikasi MIME/isi file (bukan hanya ekstensi - ekstensi bisa dipalsukan). Never trust the client: file yang diunggah user bisa berisi apa saja. Simpan dengan nama random (jangan nama user - path traversal!), dan jangan pernah mengeksekusi file upload.
## Pagination: Skill yang Selalu Diuji
Data besar harus dipecah: page + limit → skip = (page-1)*limit. Respons yang baik menyertakan metadata: total, totalPages, page, limit - frontend butuh untuk tombol navigasi. Batasi limit maksimum (Math.min) agar user tidak minta 10.000 record sekaligus. Pola yang sama di semua stack (offset pagination ini; cursor pagination untuk data raksasa).
## Integrasi API Eksternal
Backend sering jadi "perantara": fetch ke API pihak ketiga, transformasi, lalu sajikan ke frontend (menyembunyikan API key dari browser!). Node 18+ punya fetch bawaan. Praktik penting: timeout (fetch tanpa timeout menggantung selamanya), retry untuk kegagalan sementara, dan simpan hasil yang jarang berubah di cache (pelajaran 15).`,
    expEn: `## Multer: File Uploads Without Headaches
Multipart form data cannot be parsed by express.json(). Multer provides the middleware: upload.single('gambar') captures the file in that field. memoryStorage keeps it in RAM (fine for small files); production usually uses diskStorage or straight to cloud storage (S3/Cloudinary). Always limit: size (limits.fileSize) and type (fileFilter) - dangerous files are an attack vector.
## File Validation: Two Layers
fileFilter rejects extensions other than images. The second layer: verify MIME/actual content (not just extension - extensions can be faked). Never trust the client: an uploaded file may contain anything. Save with random names (never user names - path traversal!), and never execute uploaded files.
## Pagination: A Skill Always Tested
Large data must be split: page + limit → skip = (page-1)*limit. A good response includes metadata: total, totalPages, page, limit - frontends need it for navigation buttons. Cap the maximum limit (Math.min) so users cannot request 10,000 records at once. The same pattern exists in every stack (this is offset pagination; cursor pagination for giant datasets).
## External API Integration
Backends often act as "middlemen": fetch a third-party API, transform, then serve to the frontend (hiding API keys from the browser!). Node 18+ has built-in fetch. Essential practices: timeouts (a fetch without a timeout hangs forever), retries for transient failures, and caching rarely-changing results (lesson 15).`,
    chId: 'Bangun mini endpoint galeri: (1) tambahkan kolom ukuran file dan waktu upload ke respons /post/:id/gambar, (2) route GET /post/:id/gambar yang mengembalikan gambarUrl, (3) route DELETE /post/:id/gambar untuk menghapus gambar, (4) pagination dengan sortir terbaru (id desc). Uji seluruh alur.',
    chEn: 'Build a mini gallery endpoint: (1) add file size and upload time fields to the /post/:id/gambar response, (2) a GET /post/:id/gambar route returning gambarUrl, (3) a DELETE /post/:id/gambar route removing the image, (4) pagination sorted newest first (id desc). Test the whole flow.',
    sumId: 'Multer: batasi ukuran & tipe, jangan percaya nama file. Pagination: page/limit + metadata. Fetch eksternal: timeout, retry, cache. Lanjut: testing.',
    sumEn: 'Multer: cap size & type, never trust file names. Pagination: page/limit + metadata. External fetch: timeout, retry, cache. Next: testing.',
  },
  {
    phase: 4, num: 14, topicId: 'testing',
    titleId: 'Testing API: Jest & Supertest', titleEn: 'API Testing: Jest & Supertest',
    codeFile: 'server.js',
    files: {
      'server.js': `// Aplikasi yang akan dites (dipisahkan dari server agar bisa di-supertest)
// Jalankan test: npm test

const express = require('express');
const app = express();
app.use(express.json());

// Data dengan fungsi terpisah agar mudah di-unit-test
const buatCatatan = (judul) => ({ id: Date.now(), judul, selesai: false });

const data = [
  { id: 1, judul: 'Belajar Jest', selesai: true },
  { id: 2, judul: 'Belajar Supertest', selesai: false },
];

app.get('/catatan', (req, res) => {
  const { selesai } = req.query;
  let hasil = data;
  if (selesai !== undefined) hasil = data.filter((c) => c.selesai === (selesai === 'true'));
  res.json(hasil);
});

app.get('/catatan/:id', (req, res) => {
  const item = data.find((c) => c.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(item);
});

app.post('/catatan', (req, res) => {
  const { judul } = req.body;
  if (!judul || typeof judul !== 'string') {
    return res.status(400).json({ error: 'judul wajib: string' });
  }
  const baru = buatCatatan(judul.trim());
  data.push(baru);
  res.status(201).json(baru);
});

app.delete('/catatan/:id', (req, res) => {
  const idx = data.findIndex((c) => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Tidak ditemukan' });
  data.splice(idx, 1);
  res.status(204).end();
});

module.exports = app; // ekspor untuk supertest (server listen di file lain)
module.exports.buatCatatan = buatCatatan; // ekspor helper untuk unit test`,
      'server.js.orig.txt': `// Bagaimana app dijalankan di produksi:
// const app = require('./server');
// app.listen(3000, () => console.log('API di :3000'));
// (Untuk test, kita tidak listen - supertest memanggil app langsung)`,
      'server.test.js': `// Unit test + integration test dengan Jest & Supertest
// Jalankan: npm test

const request = require('supertest');
const { app, buatCatatan } = require('./server');

// --- UNIT TEST: logika murni ---
describe('buatCatatan()', () => {
  test('membuat objek catatan dengan selesai=false', () => {
    const c = buatCatatan('Belajar test');
    expect(c.judul).toBe('Belajar test');
    expect(c.selesai).toBe(false);
    expect(typeof c.id).toBe('number');
  });
});

// --- INTEGRATION TEST: API end-to-end ---
describe('GET /catatan', () => {
  test('mengembalikan 200 dan array', async () => {
    const res = await request(app).get('/catatan');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('filter selesai=true hanya mengembalikan item selesai', async () => {
    const res = await request(app).get('/catatan?selesai=true');
    expect(res.status).toBe(200);
    expect(res.body.every((c) => c.selesai === true)).toBe(true);
  });
});

describe('POST /catatan', () => {
  test('membuat catatan baru (201) dan mengembalikannya', async () => {
    const res = await request(app).post('/catatan').send({ judul: 'Catatan test' });
    expect(res.status).toBe(201);
    expect(res.body.judul).toBe('Catatan test');
    expect(res.body.selesai).toBe(false);
  });

  test('menolak judul kosong (400)', async () => {
    const res = await request(app).post('/catatan').send({ judul: '' });
    expect(res.status).toBe(400);
  });
});

describe('GET /catatan/:id', () => {
  test('mengembalikan 404 untuk id yang tidak ada', async () => {
    const res = await request(app).get('/catatan/9999');
    expect(res.status).toBe(404);
  });
});

describe('DELETE /catatan/:id', () => {
  test('menghapus dan mengembalikan 204', async () => {
    const res = await request(app).delete('/catatan/1');
    expect(res.status).toBe(204);
    const cek = await request(app).get('/catatan/1');
    expect(cek.status).toBe(404);
  });
});`,
      'package.json': `{
  "name": "lesson14-testing",
  "version": "1.0.0",
  "description": "Testing API dengan Jest + Supertest",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "jest --watchAll=false"
  },
  "dependencies": {
    "express": "^4.21.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^7.0.0"
  }
}`,
    },
    objId: [
      'Membedakan unit test dan integration test',
      'Menulis test API dengan Jest dan Supertest',
      'Menguji skenario sukses DAN error (404, 400)',
      'Menjelaskan pola test yang andal: deskriptif, cepat, independen',
    ],
    objEn: [
      'Distinguish unit tests and integration tests',
      'Write API tests with Jest and Supertest',
      'Test success AND error scenarios (404, 400)',
      'Explain reliable test patterns: descriptive, fast, independent',
    ],
    expId: `## Mengapa Test? Kepercayaan Diri yang Bisa Dihitung
Test bukan untuk "mengejar 100% coverage" - ia untuk memberanikan Anda mengubah kode. Tanpa test, refactor = berdoa. Dengan test, Anda bisa memindahkan 50 baris dan tahu persis kalau perilaku berubah. Bootcamp produksi menjadikan test bagian dari definisi "selesai", bukan bonus.
## Unit Test vs Integration Test
Unit: menguji SATU fungsi murni (buatCatatan) - cepat, tanpa jaringan. Integration: menguji API end-to-end (supertest memanggil app Express tanpa listen) - verifikasi routing, middleware, status code, dan respons JSON. Keduanya saling melengkapi: unit untuk logika, integration untuk kontrak HTTP.
## Pola Test yang Baik (AAA)
Arrange (siapkan input), Act (panggil fungsi/endpoint), Assert (periksa hasil). Deskripsi test harus bercerita: 'mengembalikan 404 untuk id yang tidak ada'. Assert yang TEPAT: periksa status code DAN body, bukan hanya "tidak error". Test error sama pentingnya dengan test sukses - 400, 404, 401, 429 adalah kontrak API.
## Independen & Deterministik
Setiap test harus berdiri sendiri: jangan bergantung pada urutan eksekusi atau state test lain (reset data di beforeEach). Test yang bergantung = test yang kadang gagal tanpa sebab. Jalankan npm test di CI (pelajaran 16): setiap push kode yang memecahkan test = build merah, dan itu melindungi seluruh tim.`,
    expEn: `## Why Test? Confidence You Can Measure
Tests are not about "chasing 100% coverage" - they are what embolden you to change code. Without tests, refactoring is praying. With tests, you can move 50 lines and know exactly when behavior changes. Production bootcamps make tests part of the definition of "done", not a bonus.
## Unit vs Integration Tests
Unit: tests ONE pure function (buatCatatan) - fast, no network. Integration: tests the API end-to-end (supertest calls the Express app without listen) - verifies routing, middleware, status codes, and JSON responses. They complement each other: unit for logic, integration for the HTTP contract.
## Good Test Patterns (AAA)
Arrange (prepare input), Act (call the function/endpoint), Assert (check the result). Test descriptions should tell a story: 'returns 404 for a non-existent id'. Assert PRECISELY: check status code AND body, not just "no error". Testing errors matters as much as testing success - 400, 404, 401, 429 are API contracts.
## Independent & Deterministic
Every test must stand alone: never depend on execution order or another test's state (reset data in beforeEach). Dependent tests = tests that randomly fail for no reason. Run npm test in CI (lesson 16): any push that breaks a test = red build, protecting the whole team.`,
    chId: 'Tulis test untuk skenario yang belum tercakup: (1) POST /catatan dengan judul berupa angka (400), (2) GET /catatan?selesai=false hanya item belum selesai, (3) POST lalu DELETE catatan baru (alur hidup lengkap), (4) test unit untuk helper buatCatatan (pindahkan ke modul terpisah agar bisa di-require). Jalankan npm test sampai semua hijau.',
    chEn: 'Write tests for uncovered scenarios: (1) POST /catatan with a numeric judul (400), (2) GET /catatan?selesai=false returning only unfinished items, (3) POST then DELETE a new note (full lifecycle), (4) a unit test for the buatCatatan helper (move it to a separate module so it can be required). Run npm test until everything is green.',
    sumId: 'Test = keberanian refactor. Unit vs integration. AAA + deskripsi bercerita. Test error = kontrak API. Independen & deterministik. Lanjut: performa & skalabilitas.',
    sumEn: 'Tests = courage to refactor. Unit vs integration. AAA + storytelling descriptions. Testing errors = the API contract. Independent & deterministic. Next: performance & scalability.',
  },
  {
    phase: 4, num: 15, topicId: 'performa-skala',
    titleId: 'Performa & Skalabilitas: Jangan Blokir Event Loop', titleEn: 'Performance & Scalability: Don\'t Block the Event Loop',
    codeFile: 'server.js',
    files: {
      'server.js': `// Performa: event loop, blocking code, cluster, PM2
// Jalankan: node server.js

const express = require('express');
const app = express();
app.use(express.json());

// --- 1) TUGAS BERAT YANG MEMBLOKIR EVENT LOOP (ANTI-PATTERN) ---
// while loop menahan event loop: SEMUA request lain menunggu.
// Jangan lakukan ini di produksi!
app.get('/blokir', (req, res) => {
  const akhir = Date.now() + 2000; // "kerja" 2 detik
  while (Date.now() < akhir) {} // CPU busy - event loop beku
  res.json({ pesan: 'Selesai memblokir 2 detik. Request lain antri!' });
});

// --- 2) VERSI BAIK: serahkan kerja berat ke worker thread ---
const { Worker } = require('node:worker_threads');

app.get('/kerja-berat', (req, res) => {
  const worker = new Worker(
    \`const { parentPort } = require('node:worker_threads');
     let x = 0;
     for (let i = 0; i < 2e9; i++) x += i;
     parentPort.postMessage(x);\`,
    { eval: true }
  );
  worker.once('message', (hasil) => res.json({ hasil }));
  worker.once('error', () => res.status(500).json({ error: 'Worker gagal' }));
});

// --- 3) POLA ASYNC YANG BENAR: lepaskan I/O ---
const fs = require('node:fs/promises');
app.get('/baca-file', async (req, res) => {
  // fs/promises = non-blocking; event loop tetap melayani request lain
  const isi = await fs.readFile(__filename, 'utf-8');
  res.json({ baris: isi.split('\\n').length });
});

// --- 4) SIMULASI PM2 (multi-proses) ---
// Di produksi, jalankan: pm2 start server.js -i max
// -> satu worker PROCESS per CPU core, load balanced oleh OS/PM2
// app.listen di file terpisah bila memakai cluster mode.

const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary && process.env.USE_CLUSTER === 'true') {
  console.log('Primary membagi kerja ke ' + os.cpus().length + ' worker processes...');
  for (let i = 0; i < os.cpus().length; i++) cluster.fork();
} else {
  app.listen(3000, () => console.log('Worker ' + process.pid + ' melayani di :3000'));
}`,
      'package.json': `{
  "name": "lesson15-performa-skala",
  "version": "1.0.0",
  "description": "Performa: blocking vs worker threads vs cluster",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "cluster": "cross-env USE_CLUSTER=true node server.js"
  },
  "dependencies": {
    "cross-env": "^7.0.3",
    "express": "^4.21.2"
  }
}`,
    },
    objId: [
      'Mengenali kode yang memblokir event loop',
      'Melepaskan kerja berat ke worker threads',
      'Menjelaskan clustering dan PM2',
      'Menerapkan caching untuk beban berulang',
    ],
    objEn: [
      'Recognize code that blocks the event loop',
      'Offload heavy work to worker threads',
      'Explain clustering and PM2',
      'Apply caching for repeated loads',
    ],
    expId: `## Musuh #1: Kode Sinkron yang Panjang
While loop 2 detik membekukan event loop: SEMUA request lain antri sampai selesai. Di produksi, satu route "bocor" begini bisa membuat seluruh API timeout. Sumber umum: perulangan besar tanpa hasil antara, JSON.parse data raksasa, crypto sync, operasi file sync. Aturan: I/O selalu async, CPU berat selalu lepaskan dari thread utama.
## Worker Threads: CPU Heavy ke Thread Lain
worker_threads menjalankan kode JavaScript di thread paralel (Node bukan single-thread untuk komputasi, hanya untuk I/O!). Setiap worker punya event loop sendiri - event loop utama tetap bebas melayani request. Komunikasi lewat postMessage (bukan variabel bersama - memory terpisah, default aman). Pakai untuk: hashing, transformasi gambar, komputasi berat.
## Cluster & PM2: Banyak Proses, Banyak Core
Satu proses Node memakai SATU core CPU. cluster.fork() menyalin proses per core - OS mendistribusikan koneksi. PM2 mengotomatiskan ini (pm2 start server.js -i max) + auto-restart, log management, zero-downtime reload. Stateless API adalah prasyarat: setiap request harus bisa dilayani proses mana pun (jangan simpan session di memori proses!).
## Caching: Beban yang Sama Jangan Dihitung Dua Kali
Data yang jarang berubah (katalog, konfigurasi, hasil API eksternal) sebaiknya di-cache: perhitungan sekali, sajikan berkali-kali. Level: in-memory (Map/Redis - pelajaran Redis track), HTTP cache headers (Cache-Control), CDN. Hit ratio yang baik bisa memangkas latensi dan biaya database secara drastis.`,
    expEn: `## Enemy #1: Long Synchronous Code
A 2-second while loop freezes the event loop: EVERY other request queues until it finishes. In production, one "leaky" route like this can time out the whole API. Common sources: big loops with no interleaved awaits, parsing giant JSON, sync crypto, sync file operations. Rules: I/O always async, heavy CPU always off the main thread.
## Worker Threads: Heavy CPU to Other Threads
worker_threads runs JavaScript in parallel threads (Node is not single-threaded for computation, only for I/O!). Each worker has its own event loop - the main loop stays free to serve requests. Communication via postMessage (no shared variables - separate memory, safe by default). Use for: hashing, image transforms, heavy computation.
## Cluster & PM2: Many Processes, Many Cores
One Node process uses ONE CPU core. cluster.fork() duplicates the process per core - the OS distributes connections. PM2 automates this (pm2 start server.js -i max) plus auto-restart, log management, zero-downtime reload. A stateless API is the prerequisite: every request must be servable by any process (never store sessions in process memory!).
## Caching: Don't Recompute the Same Load Twice
Rarely-changing data (catalogs, config, external API results) should be cached: compute once, serve many times. Levels: in-memory (Map/Redis - see the Redis track), HTTP cache headers (Cache-Control), CDN. A good hit ratio can slash latency and database costs dramatically.`,
    chId: 'Ukur sendiri: (1) buat endpoint /loop-cepat yang menjalankan loop 100 juta iterasi tanpa worker - buka dua tab, request /blokir lalu /loop-cepat bersamaan - catat waktunya, (2) ganti /loop-cepat memakai worker thread - ulangi percobaan, (3) hitung perbedaan waktu. Tuliskan kesimpulanmu tentang event loop.',
    chEn: 'Measure it yourself: (1) create a /loop-cepat endpoint running a 100-million-iteration loop without a worker - open two tabs, request /blokir then /loop-cepat simultaneously - record the times, (2) switch /loop-cepat to a worker thread - repeat the experiment, (3) compute the difference. Write down your conclusion about the event loop.',
    sumId: 'Jangan blokir event loop: I/O async, CPU berat ke worker threads. Cluster/PM2: satu proses per core. Stateless API = prasyarat skala. Cache: hitung sekali, sajikan banyak. Lanjut: deploy & capstone.',
    sumEn: 'Do not block the event loop: async I/O, heavy CPU to worker threads. Cluster/PM2: one process per core. Stateless APIs are the scalability prerequisite. Cache: compute once, serve many. Next: deployment & capstone.',
  },
  {
    phase: 4, num: 16, topicId: 'deploy-capstone',
    titleId: 'Deployment, CI/CD & Capstone', titleEn: 'Deployment, CI/CD & the Capstone',
    codeFile: 'server.js',
    files: {
      'server.js': `// CAPSTONE: API Task Manager yang siap produksi
// Jalankan: node server.js (di produksi: pm2 / container)
// Prasyarat produksi: env vars, database nyata, HTTPS, CI/CD.

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'ganti-di-env-produksi';

// Rate limit
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

// "Database" in-memory (proyek asli: MongoDB/PostgreSQL dari pelajaran 9-10)
let user = [];
let task = [];
let idTask = 1;

// Auth
function butuhAuth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ error: 'Login dulu' });
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token tidak valid' });
  }
}

// --- Auth routes ---
app.post('/api/register', async (req, res) => {
  const { nama, email, password } = req.body;
  if (!nama || !email || !password) return res.status(400).json({ error: 'Semua field wajib' });
  if (user.find((u) => u.email === email)) return res.status(409).json({ error: 'Email sudah dipakai' });
  const baru = { id: user.length + 1, nama, email, password: await bcrypt.hash(password, 10) };
  user.push(baru);
  res.status(201).json({ id: baru.id, nama, email });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const akun = user.find((u) => u.email === email);
  if (!akun || !(await bcrypt.compare(password, akun.password))) {
    return res.status(401).json({ error: 'Email atau password salah' });
  }
  const token = jwt.sign({ id: akun.id, nama: akun.nama }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// --- Task CRUD (hanya punya user sendiri!) ---
app.get('/api/task', butuhAuth, (req, res) => {
  res.json(task.filter((t) => t.userId === req.user.id));
});

app.post('/api/task', butuhAuth, (req, res) => {
  const { judul, prioritas = 'sedang' } = req.body;
  if (!judul || typeof judul !== 'string') return res.status(400).json({ error: 'judul wajib' });
  const baru = { id: idTask++, userId: req.user.id, judul, prioritas, selesai: false, dibuat: new Date() };
  task.push(baru);
  res.status(201).json(baru);
});

app.put('/api/task/:id', butuhAuth, (req, res) => {
  const t = task.find((x) => x.id === Number(req.params.id) && x.userId === req.user.id);
  if (!t) return res.status(404).json({ error: 'Task tidak ditemukan' });
  if (req.body.judul) t.judul = req.body.judul;
  if (req.body.selesai !== undefined) t.selesai = req.body.selesai;
  res.json(t);
});

app.delete('/api/task/:id', butuhAuth, (req, res) => {
  const idx = task.findIndex((x) => x.id === Number(req.params.id) && x.userId === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Task tidak ditemukan' });
  task.splice(idx, 1);
  res.status(204).end();
});

// Error handling terpusat
app.use('/api', (req, res) => res.status(404).json({ error: 'Route tidak ditemukan' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Kesalahan server' });
});

app.listen(PORT, () => console.log('Capstone API berjalan di :' + PORT));

// --- Checklist produksi (dari seluruh track) ---
// 1. .env: PORT, JWT_SECRET, DATABASE_URL (tidak pernah di git)
// 2. Database nyata + parameterized queries (pelajaran 9-10)
// 3. helmet, CORS whitelist, rate limit, validasi (pelajaran 12)
// 4. Test dengan Jest + Supertest di CI (pelajaran 14)
// 5. pm2 -i max / container + stateless (pelajaran 15)
// 6. CI/CD: GitHub Actions build+test -> deploy ke Render/Railway`,
      'package.json': `{
  "name": "lesson16-deploy-capstone",
  "version": "1.0.0",
  "description": "Capstone: Task Manager API + checklist produksi",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --watchAll=false"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.0",
    "express": "^4.21.2",
    "express-rate-limit": "^7.4.0",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2"
  }
}`,
    },
    objId: [
      'Menyiapkan aplikasi untuk produksi: env vars, port, error handling',
      'Menjelaskan alur CI/CD: build, test, deploy',
      'Mendeploy API ke platform PaaS (Render/Railway)',
      'Menyelesaikan capstone: API Task Manager end-to-end',
    ],
    objEn: [
      'Prepare an app for production: env vars, port, error handling',
      'Explain the CI/CD flow: build, test, deploy',
      'Deploy an API to a PaaS platform (Render/Railway)',
      'Complete the capstone: an end-to-end Task Manager API',
    ],
    expId: `## Dari Laptop ke Server: Apa yang Berubah
Kode yang sama, lingkungan yang berbeda: PORT dari env (bukan hardcode 3000), JWT_SECRET dari env (bukan di kode!), DATABASE_URL dari env. dotenv membaca .env di development; platform PaaS menyuntikkan env di produksi. Aturan: tidak ada rahasia di kode, tidak ada konfigurasi hardcode. Sekali melanggar, rahasia bocor ke git selamanya.
## CI/CD dalam Satu Paragraf
CI (Continuous Integration): setiap push ke git memicu build + test otomatis - kode yang memecahkan test tidak pernah sampai ke produksi. CD (Continuous Delivery): branch utama yang lulus otomatis dideploy. Alat: GitHub Actions (YAML workflow: checkout → npm ci → npm test → deploy). Pipeline yang baik membuat deploy semembosankan mungkin - karena membosankan = dapat diulang = dapat diandalkan.
## Deploy ke PaaS (Render/Railway/Vercel)
PaaS = server dikelola platform: push kode (atau konek GitHub repo), platform build + jalankan + beri HTTPS + auto-restart. Untuk API Node: tentukan build command (npm ci) dan start command (npm start / pm2). Database terpisah (managed DB di platform yang sama). Healthcheck endpoint (/health) memberitahu platform kapan aplikasi siap menerima trafik.
## Capstone: Konsep yang Merangkum Track
Task Manager API ini menggabungkan SEMUA yang dipelajari: struktur route/controller, validasi fail-fast, bcrypt + JWT stateless, proteksi data per-user (filter task oleh userId dari token!), helmet + rate limit, error handling terpusat. Untuk menutup: tambahkan test, deploy, dan dokumentasikan API (README + contoh curl) - itu yang membedakan lulusan bootcamp dari pembuat tutorial.`,
    expEn: `## From Laptop to Server: What Changes
Same code, different environment: PORT from env (not hardcoded 3000), JWT_SECRET from env (not in code!), DATABASE_URL from env. dotenv reads .env in development; PaaS platforms inject env in production. Rule: no secrets in code, no hardcoded config. Break it once and the secret leaks into git forever.
## CI/CD in One Paragraph
CI (Continuous Integration): every push to git triggers automated build + test - code that breaks tests never reaches production. CD (Continuous Delivery): the main branch that passes deploys automatically. Tools: GitHub Actions (YAML workflow: checkout → npm ci → npm test → deploy). A good pipeline makes deployment as boring as possible - because boring = repeatable = reliable.
## Deploy to PaaS (Render/Railway/Vercel)
PaaS = a platform-managed server: push code (or connect a GitHub repo), the platform builds + runs + gives HTTPS + auto-restart. For Node APIs: specify the build command (npm ci) and start command (npm start / pm2). The database is separate (managed DB on the same platform). A healthcheck endpoint (/health) tells the platform when the app is ready for traffic.
## Capstone: The Concept Wrapping Up the Track
This Task Manager API combines EVERYTHING learned: route/controller structure, fail-fast validation, bcrypt + stateless JWT, per-user data protection (filtering tasks by the userId from the token!), helmet + rate limit, central error handling. To close it out: add tests, deploy, and document the API (README + curl examples) - that is what separates bootcamp graduates from tutorial makers.`,
    chId: 'Selesaikan capstone: (1) tambahkan fitur filter & sort task (?selesai=true&prioritas=tinggi&sort=terbaru), (2) tambahkan route GET /api/me yang mengembalikan profil user dari token, (3) tulis 4 test Supertest: register→login→buat task→baca task (alur happy path), (4) tulis README: cara run, env vars, daftar endpoint. Jika punya akun Render/Railway, deploy dan bagikan URL-nya.',
    chEn: 'Finish the capstone: (1) add task filter & sort (?selesai=true&prioritas=tinggi&sort=terbaru), (2) add a GET /api/me route returning the user profile from the token, (3) write 4 Supertest tests: register→login→create task→read task (happy path flow), (4) write a README: how to run, env vars, endpoint list. If you have a Render/Railway account, deploy and share the URL.',
    sumId: 'Produksi: env vars, stateless, HTTPS, healthcheck. CI/CD: build+test sebelum deploy. PaaS untuk deploy cepat. Capstone merangkum: auth, data per-user, keamanan, error handling. Anda siap Node!',
    sumEn: 'Production: env vars, stateless, HTTPS, healthchecks. CI/CD: build+test before deploy. PaaS for fast deployment. The capstone ties it together: auth, per-user data, security, error handling. You are Node-ready!',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Node.js | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`js
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    // Write project files JSON for StackBlitz playground
    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\n✓ Generated ${total} Node.js curriculum files (${LESSONS.length} lessons × 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);



