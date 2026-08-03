# Pengenalan Node.js: Runtime JavaScript di Server

> Node.js | Fondasi Node | Pelajaran 1

## Tujuan Pembelajaran

- Menjelaskan apa itu Node.js dan bedanya dengan JavaScript browser
- Menjalankan program JavaScript dengan node
- Mengenal V8, runtime, dan REPL
- Membuat server HTTP pertama dengan 10 baris kode

---

## Program: Pengenalan Node.js: Runtime JavaScript di Server

```js
// Program pertama Anda di Node.js
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
});
```

---

## Penjelasan

## Apa itu Node.js?
Node.js adalah runtime JavaScript di server, dibangun di atas mesin V8 (mesin yang sama yang menjalankan JavaScript di Chrome). Konsekuensinya: satu bahasa untuk frontend dan backend. Sebelum Node (2009, Ryan Dahl), JavaScript hanya bisa jalan di browser. Node membuka dunia baru: akses file, jaringan, database, dan web server.
## JavaScript di Browser vs di Node
Browser menyediakan DOM (document, window). Node menyediakan API server: fs (file system), http (jaringan), os (sistem operasi), process. Tidak ada DOM di Node - tidak ada document.getElementById. Yang ada: global seperti console, process, Buffer. Mental model ini penting: Node bukan "browser tanpa tab", melainkan lingkungan runtime yang berbeda.
## V8, Runtime, dan REPL
V8 meng-compile JavaScript ke machine code (JIT). Runtime Node menambahkan libuv (I/O async), buffer, dan modul inti. REPL (Read-Eval-Print Loop) adalah terminal interaktif: ketik node tanpa file, dan setiap baris langsung dieksekusi - bagus untuk eksperimen cepat. Jalankan node -v untuk cek versi, node untuk masuk REPL.
## Server HTTP dalam 10 Baris
Contoh kode: require('node:http'), createServer dengan callback (req, res), listen(3000). Ini fondasi semua framework web Node (Express, Nest). Pahami dulu level ini sebelum naik ke framework - kebanyakan kursus melewatinya, dan itu sebabnya banyak developer tidak paham cara kerja server.

---

## Eksperimen

1. **Apa itu Node.js?**
2. **JavaScript di Browser vs di Node**
3. **V8, Runtime, dan REPL**
4. **Server HTTP dalam 10 Baris**

---

## Tantangan

Jalankan proyek di playground. Lalu ubah server: (1) tambah route /about yang merespons "Tentang Kami", (2) ganti Content-Type menjadi application/json dan kirim objek JSON { nama: "Budi", role: "siswa" }, (3) ganti port ke 4000. Restart dan uji di preview. Tuliskan apa yang berubah di tiap perubahan.

---

## Ringkasan

Node.js = JavaScript di server via V8. Tidak ada DOM; ada fs, http, os, process. REPL untuk eksperimen. Server HTTP = createServer + listen. Lanjut: event loop, jantung Node.
