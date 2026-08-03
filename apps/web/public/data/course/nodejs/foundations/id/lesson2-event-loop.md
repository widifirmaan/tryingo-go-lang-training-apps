# Event Loop & Non-Blocking I/O

> Node.js | Fondasi Node | Pelajaran 2

## Tujuan Pembelajaran

- Menjelaskan event loop: satu thread, banyak tugas
- Membedakan operasi blocking dan non-blocking
- Memahami urutan: sync → microtask → timers → check
- Menjelaskan kenapa Node cocok untuk I/O berat (web server)

---

## Program: Event Loop & Non-Blocking I/O

```js
// Event loop: urutan eksekusi di Node
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
}).listen(3000, () => console.log('Server siap di :3000 (non-blocking)'));
```

---

## Penjelasan

## Satu Thread, Banyak Tugas
JavaScript di Node berjalan pada SATU thread utama. Paradoksnya: server Node bisa melayani ribuan koneksi sekaligus. Jawabannya: event loop. Thread utama tidak menunggu I/O selesai - ia menyerahkan pekerjaan ke libuv (pustaka C), lalu kembali memproses tugas lain. Ketika I/O selesai, hasilnya diantrekan sebagai callback.
## Blocking vs Non-Blocking
Blocking: baris kode menahan eksekusi sampai selesai (readFileSync, operasi CPU berat). Non-blocking: kode menyerahkan tugas dan berlanjut; hasil datang lewat callback (readFile, http request). Aturan emas: di server, SELALU gunakan versi async untuk I/O. Contoh kode memakai readFile (async) - bayangkan kalau pakai readFileSync, request lain harus menunggu.
## Urutan Eksekusi (Krusial)
Urutan di contoh: (1) kode sync langsung, (2) microtask (Promise) - dijalankan SETELAH sync tapi SEBELUM timers, (3) timers (setTimeout/setInterval), (4) I/O callbacks, (5) check (setImmediate). Sebagian besar "bug aneh" di Node adalah developer yang salah menebak urutan ini. Jalankan dan amati output 1-6.
## Kenapa Ini Penting untuk Web Server
Satu event loop + non-blocking I/O = satu server menangani ribuan koneksi dengan sumber daya kecil. Server blocking (versi sync) akan mengantrekan semua request di belakang request yang lambat. Ini mengapa Node mendominasi API backend: I/O (database, jaringan, disk) adalah pekerjaan utama API, dan Node dioptimalkan persis untuk itu.

---

## Eksperimen

1. **Satu Thread, Banyak Tugas**
2. **Blocking vs Non-Blocking**
3. **Urutan Eksekusi (Krusial)**
4. **Kenapa Ini Penting untuk Web Server**

---

## Tantangan

Jalankan dan amati urutan log. Lalu ubah: (1) tambahkan setTimeout kedua dengan delay 100ms - di mana ia muncul? (2) tambahkan Promise.resolve().then kedua - di mana ia muncul? (3) prediksi urutan SEBELUM menjalankan, tulis prediksimu, lalu bandingkan dengan hasilnya.

---

## Ringkasan

Satu thread + event loop + libuv = non-blocking I/O. Urutan: sync → microtask → timers → check. Server API = I/O-bound, dan Node dioptimalkan untuk itu. Lanjut: modul dan npm.
