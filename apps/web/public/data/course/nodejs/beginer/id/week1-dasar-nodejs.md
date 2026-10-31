# Dasar Node.js & Runtime

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 1:** Dasar Node.js & Runtime

## Kenapa Materi Ini Penting

Node.js menjadikan JavaScript jalan di server: event loop berbasis non-blocking menjadikan satu bahasa dipakai dari browser hingga database. Memahami runtime Node = langsung paham streaming, worker, dan API realtime.

Di minggu ke-1 — bertajuk **"Dasar Node.js & Runtime"** — program latihan utamanya adalah *"Halo Node.js"*. Kerjakan programnya di Playground dulu, ubah sedikit demi sedikit, lalu baca penjelasan konsepnya.


## Tujuan Pembelajaran

- Memahami apa itu Node.js dan perannya sebagai JavaScript runtime
- Menjalankan file JavaScript dengan node command
- Mengenal process object: version, platform, argv
- Variabel: const, let, dan tipe data dasar JavaScript
- Function declaration vs arrow function


## Fondasi: Sebelum Menulis Kode

Bagian ini untuk Anda yang **benar-benar baru** belajar coding. Konsepnya sama di semua bahasa — dibutuhkan sekali paham, dipakai selamanya.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan — cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung — cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis — error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan — lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis — itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung — inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan — tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (Node.js LTS (v20+ / v22+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v22.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** Node.js sudah menyertakan package manager npm secara otomatis.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-node-api && cd my-node-api
npm init -y
npm install express dotenv
npm install -D typescript tsx @types/node @types/express
npx tsc --init
```
- **Keterangan:** Membuat project Node.js modern menggunakan TypeScript dan runtime eksekusi instan tsx.
- **Pindah ke direktori project:**
```bash
cd my-node-api
```

---

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npx tsx watch src/index.ts
```
Akses di browser atau terminal: `http://localhost:3000`

> ℹ️ API server aktif dengan fitur watch otomatis setiap file disimpan.

**File Titik Masuk Utama (`src/index.ts`):**
```js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Server Node.js aktif di http://localhost:${PORT}`);
});
```
Server Express sederhana dengan healthcheck endpoint.

---

### 4. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-node-api/
├── src/
│   └── index.ts         # Server HTTP Express
├── .env                 # Konfigurasi environment variables
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Dependensi & skrip start
```
Struktur ramping dan minimalis, cocok untuk microservice.

---

### 5. Tips & Best Practice untuk Pemula
- Gunakan `tsx` (`npx tsx file.ts`) untuk mengeksekusi file TypeScript langsung tanpa kompilasi manual.
- Manfaatkan built-in Node test runner: `node --test` untuk unit test tanpa library pihak ketiga.

---

## Program: Halo Node.js

```javascript
const nama = "Node.js";
console.log("Selamat datang di " + nama + "!");
console.log("Versi: " + process.version);
console.log("Platform: " + process.platform);

const umur = 25;
const tinggi = 175.5;
const aktif = true;
const hobi = ["ngoding", "baca buku", "musik"];
const profil = { nama: "Budi", kota: "Jakarta" };

console.log("Umur: " + umur + " tahun");
console.log("Hobi: " + hobi.join(", "));
console.log("Profil: " + profil.nama + " dari " + profil.kota);

function sapa(nama) { return "Halo, " + nama + "!"; }
const kali = (a, b) => a * b;

console.log(sapa("Gopher"));
console.log("5 x 3 = " + kali(5, 3));
```

---

## Konsep Kunci

### Apa Itu Node.js
Node.js adalah JavaScript runtime berbasis V8 engine.

### Process Object
process.version, process.platform, process.argv.

### Variabel
const tidak bisa di-reassign, let bisa, var hindari.

### Function
Function declaration vs arrow function.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah function baru dengan parameter berbeda
- Coba process.argv dengan argumen custom
- Buat arrow function dengan multiple parameters

---

## Tantangan

Buat program CLI sapaan: terima nama dari process.argv, output sapaan dengan timestamp.

---

## Ringkasan

Minggu 1 dari 12: **Dasar Node.js & Runtime** (Level: Pemula). Minggu depan: **Modules & NPM**.
