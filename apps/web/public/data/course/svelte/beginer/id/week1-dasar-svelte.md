# Dasar Svelte & Template

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 1:** Dasar Svelte & Template

## Tujuan Pembelajaran

- Memahami Svelte sebagai compiler framework
- Template syntax: { } untuk expressions
- Reactive declarations: $: derived = expr
- Event handling: on:click={handler}
- Scoped CSS di dalam komponen

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Svelte for VS Code** (`svelte.svelte-vscode`): Syntax highlighting, autocomplete & diagnostics file .svelte

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension svelte.svelte-vscode
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+))
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

> 💡 **Tips Prasyarat:** Node.js digunakan untuk proses compile Svelte dan Vite bundler.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
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

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
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
  <h1 style="color: #ff3e00;">✨ Halo dari Svelte 5!</h1>
  <p>Reaktivitas menggunakan Runes ($state):</p>
  <button on:click={() => count++} style="padding: 10px 20px; font-size: 16px; border-radius: 8px;">
    Klik Counter: {count}
  </button>
</main>
```
Komponen Svelte 5 dengan rune $state() modern.

---

### 5. Struktur Direktori Proyek Baru
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

### 6. Tips & Best Practice untuk Pemula
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
