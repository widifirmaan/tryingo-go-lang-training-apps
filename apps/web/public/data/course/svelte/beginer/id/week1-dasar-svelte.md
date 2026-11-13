# Dasar Svelte & Template

## Kenapa Materi Ini Penting

Svelte meng-comple reaktivitas saat build time - tanpa virtual DOM, hasilnya bundle super kecil dan runtime cepat. Filosofi "it looks like writing HTML" membuatnya bahasa framework paling menyenangkan untuk dipelajari.

Program latihan: *"Halo Svelte"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- Memahami Svelte sebagai compiler framework
- Template syntax: { } untuk expressions
- Reactive declarations: $: derived = expr
- Event handling: on:click={handler}
- Scoped CSS di dalam komponen


## Fondasi: Sebelum Menulis Kode

Panduan dasar berikut merangkum konsep pemrograman inti yang berlaku universal.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan - cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung - cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis - error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan - lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis - itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung - inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan - tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

> **Coba langsung di browser tanpa instalasi.** Semua blok kode dapat dijalankan langsung di Playground.

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (Node.js LTS (v20+))
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
v20.x.x
10.x.x
```

> **Tips Prasyarat:** Node.js digunakan untuk proses compile Svelte dan Vite bundler.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npm create svelte@latest my-svelte-app
cd my-svelte-app
npm install
```
- **Keterangan:** Pilih opsi "Skeleton project" dengan TypeScript untuk memulai project dasar yang bersih.
- **Pindah ke direktori project:**
```bash
cd my-svelte-app
```

---

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run dev
```
Akses di browser atau terminal: `http://localhost:5173`

> ℹ️ Server SvelteKit akan berjalan di http://localhost:5173.

**File Titik Masuk Utama (`src/routes/+page.svelte`):**
```svelte
<script lang="ts">
  let count = $state(0);
</script>

<main style="text-align: center; padding: 4rem; font-family: system-ui;">
  <h1 style="color: #ff3e00;">Halo dari Svelte 5!</h1>
  <p>Reaktivitas menggunakan Runes ($state):</p>
  <button on:click={() => count++} style="padding: 10px 20px; font-size: 16px; border-radius: 8px;">
    Klik Counter: {count}
  </button>
</main>
```
Komponen Svelte 5 dengan rune $state() modern.

---

### 4. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-svelte-app/
├── src/
│   ├── routes/
│   │   ├── +page.svelte     # Halaman utama (/)
│   │   └── +layout.svelte   # Layout pembungkus
│   └── app.html             # Template HTML dasar
├── svelte.config.js         # Konfigurasi adapter Svelte
├── vite.config.ts           # Konfigurasi bundler Vite
└── package.json             # Dependensi project
```
SvelteKit menggunakan struktur folder src/routes untuk routing berbasis file.

---

### 5. Tips & Best Practice untuk Pemula
- Svelte 5 menggunakan Runes (`$state`, `$derived`, `$effect`) menggantikan deklarasi `let` reaktif lama.
- SvelteKit menyediakan adapter untuk deploy langsung ke Cloudflare Pages, Vercel, atau Node.js.

---

## Program: Halo Svelte

```svelte
<!-- Svelte = compiler framework (no virtual DOM) -->
<script>
  let name = "Tryngo";
  let count = 0;
  $: doubled = count * 2;
  $: greeting = "Halo, " + name + "!";
  function increment() { count++; }
</script>
<h1>{greeting}</h1>
<p>Count: {count} | Doubled: {doubled}</p>
<button on:click={increment}>+</button>
<!-- Svelte app siap dijalankan -->
```

---

## Konsep Kunci

### Svelte
Compiler framework. No virtual DOM.

### Template
{ } = expression. Auto-update saat state berubah.

### Reactive Declarations
$: = re-run saat dependency berubah.

### Scoped CSS
CSS di <style> hanya berlaku untuk komponen ini.

---

## Eksperimen

- Ubah state dan lihat UI update
- Tambah reactive declaration baru
- Buat conditional rendering
- Render list dengan each

---

## Tantangan

Buat counter app dengan increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.

---

## Ringkasan

Minggu 1 dari 10: **Dasar Svelte & Template** (Level: Pemula). Minggu depan: **Reactivity & Statements**.
