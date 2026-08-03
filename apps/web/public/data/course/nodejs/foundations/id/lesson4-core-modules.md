# Core Modules: fs, path, os, events

> Node.js | Fondasi Node | Pelajaran 4

## Tujuan Pembelajaran

- Membaca dan menulis file dengan fs (async)
- Menggunakan path untuk manipulasi path lintas platform
- Membaca informasi sistem dengan os
- Membangun arsitektur berbasis event dengan EventEmitter

---

## Program: Core Modules: fs, path, os, events

```js
// Core modules: fs, path, os, events
// Jalankan: node server.js

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { EventEmitter } = require('node:events');

// --- fs: baca & tulis file (selalu versi async di server) ---
fs.writeFile('catatan.txt', 'Belajar Node: catatan pertama\n', (err) => {
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

// EventEmitter adalah fondasi stream, http, dan Express.
```

---

## Penjelasan

## fs: File System
fs.writeFile dan fs.readFile adalah dasar aplikasi yang menyimpan data di disk. Selalu pakai versi callback (async) di server - versi Sync (readFileSync) memblokir event loop. Node 14+ punya fs.promises (async/await) - pola modern. Bonus: stream (fs.createReadStream) untuk file besar, pelajaran 13.
## path: Senjata Rahasia Lintas Platform
'/' bekerja di Linux/Mac tapi gagal di Windows - path.join menangani separator otomatis. path.basename/extname/dirname untuk parsing. Kesalahan paling umum di codebase Node lintas platform adalah hardcode separator '/'. Ingat: __dirname = folder file saat ini, __filename = path lengkap file saat ini.
## os: Cek Kesehatan Mesin
os.platform(), os.cpus(), os.freemem(), os.hostname() dipakai untuk monitoring, logging, dan penyesuaian perilaku aplikasi (misal: jumlah worker = jumlah CPU cores - relevan di pelajaran 15).
## events: Pola Desain Paling Penting di Node
EventEmitter mengimplementasikan pola observer: objek 'mengemisi' event, pendengar 'mendengarkan'. Ini fondasi: http server mengemisi 'request', stream mengemisi 'data'/'end', Express dibangun di atasnya. Memahami emitter = memahami separuh API Node. Pola "event + listener" juga yang membuat arsitektur server bisa modular.

---

## Eksperimen

1. **fs: File System**
2. **path: Senjata Rahasia Lintas Platform**
3. **os: Cek Kesehatan Mesin**
4. **events: Pola Desain Paling Penting di Node**

---

## Tantangan

Bangun mini-logger: buat class Logger extends EventEmitter dengan event "log" yang membawa { level, pesan, waktu }. Tulis fungsi logInfo/logError yang emit event tersebut dan listener yang menulisnya ke file app.log (fs.appendFile) dan ke console. Simulasikan 5 aktivitas login user. Jalankan dan periksa app.log.

---

## Ringkasan

fs untuk file (async!), path lintas platform, os untuk info sistem, events untuk arsitektur event-driven. Ini empat pilar modul inti. Lanjut: web server & HTTP.
