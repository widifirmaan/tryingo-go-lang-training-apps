# Dasar Vue & Template Syntax

> **Kategori:** Vue | **Level:** Pemula | **Minggu 1:** Dasar Vue & Template Syntax

## Tujuan Pembelajaran

- Memahami Vue sebagai progressive framework
- Template syntax: {{ }} untuk text interpolation
- Directives: v-bind, v-on, v-if, v-for, v-model
- Reactivity: data() return object yang reaktif
- Methods dan Computed properties

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Vue - Official (Volar)** (`vue.volar`): Dukungan bahasa, intellisense, & TypeScript untuk .vue
- **ESLint** (`dbaeumer.vscode-eslint`): Linting kode JavaScript/Vue

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension vue.volar --install-extension dbaeumer.vscode-eslint
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

> 💡 **Tips Prasyarat:** Ekstensi Volar akan mengambil alih TypeScript server untuk mendeteksi tipe dalam template SFC.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
```
- **Keterangan:** Menjalankan generator resmi Vue CLI untuk memilih TypeScript, Vue Router, Pinia, dan ESLint.
- **Pindah ke direktori project:**
```bash
cd my-vue-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run dev
```
Akses di browser atau terminal: `http://localhost:5173`

> ℹ️ Buka http://localhost:5173 untuk melihat aplikasi Vue aktif.

**File Titik Masuk Utama (`src/App.vue`):**
```vue
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const title = 'Halo dari Vue 3 & Composition API!';
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <button @click="count++">
      Ditekan: {{ count }} kali
    </button>
  </main>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 4rem;
  font-family: system-ui, sans-serif;
}
button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: #42b883;
  color: white;
  border: none;
  font-weight: bold;
}
</style>
```
Komponen SFC Vue 3 dengan <script setup> dan reactive ref().

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-vue-app/
├── src/
│   ├── assets/          # Logo dan gambar
│   ├── components/      # Komponen Vue reusable
│   ├── App.vue          # Root Single-File Component
│   └── main.ts          # Mount instance Vue ke DOM
├── index.html           # Shell HTML utama
├── vite.config.ts       # Vite config dengan plugin @vitejs/plugin-vue
└── package.json         # Dependensi Vue 3 & Pinia
```
File .vue menggabungkan <template>, <script setup>, dan <style scoped> dalam satu file.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `ref()` untuk tipe primitif (angka, boolean, string) dan `reactive()` untuk objek.
- Gunakan Pinia (`npm i pinia`) sebagai store global resmi pengganti Vuex.

---

## Program: Halo Vue

```vue
// Vue = progressive framework untuk membangun UI
const { createApp } = Vue;
const app = createApp({
  data() { return { message: 'Halo, Vue!', name: 'Tryngo', isDark: false, count: 0 }; },
  methods: { toggle() { this.isDark = !this.isDark; }, increment() { this.count++; } },
  computed: { greeting() { return this.message + ' Selamat datang, ' + this.name; } },
});
app.mount('#app');
console.log('Vue app siap dijalankan');
```

---

## Konsep Kunci

### Template Syntax
{{ }} = text interpolation. Update otomatis saat data berubah.

### Directives
v-bind, v-on, v-if, v-for, v-model.

### Reactivity
Data di-return dari data() jadi reactive.

### Computed vs Method
Computed = cached, hanya re-evaluate saat dependency berubah.

---

## Eksperimen

- Ubah data dan lihat UI update
- Tambah computed property baru
- Buat conditional rendering
- Render list dengan v-for

---

## Tantangan

Buat counter app dengan: increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.

---

## Ringkasan

Minggu 1 dari 12: **Dasar Vue & Template Syntax** (Level: Pemula). Minggu depan: **Reactivity & Composition API**.
