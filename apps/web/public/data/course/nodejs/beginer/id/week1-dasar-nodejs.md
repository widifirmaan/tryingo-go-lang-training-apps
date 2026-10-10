# Dasar Node.js & Runtime

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 1:** Dasar Node.js & Runtime

## Tujuan Pembelajaran

- Memahami apa itu Node.js dan perannya sebagai JavaScript runtime
- Menjalankan file JavaScript dengan node command
- Mengenal process object: version, platform, argv
- Variabel: const, let, dan tipe data dasar JavaScript
- Function declaration vs arrow function

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **ESLint** (`dbaeumer.vscode-eslint`): Linting kode JavaScript & Node.js
- **Prettier** (`esbenp.prettier-vscode`): Formatting konsisten

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+ / v22+))
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

### 3. Inisialisasi Project Kosong (Scaffolding)
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

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
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

### 5. Struktur Direktori Proyek Baru
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

### 6. Tips & Best Practice untuk Pemula
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
