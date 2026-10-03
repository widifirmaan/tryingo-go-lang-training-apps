# Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 7:** Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengonfigurasi Vue Router 4 dengan mode createWebHistory() HTML5 bersih tanpa tanda pagar (#)
- Menerapkan Lazy Loading rute menggunakan dynamic import () => import(...) untuk mengecilkan bundle awal
- Menggunakan properti meta pada rute untuk menyimpan metadata hak akses (requiresAuth, role)
- Mengamankan rute aplikasi menggunakan Global Navigation Guards (router.beforeEach)
- Mengoper parameter URL dinamis (:id) langsung sebagai props ke komponen tampilan via props: true

---

## Program: Sistem Navigasi CRM Enterprise dengan Proteksi Rute Hak Akses

```js
// ============================================================================
// File: router/index.js (Vue Router 4 dengan Navigasi Proteksi RBAC)
// ============================================================================
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"), // Lazy Loading Chunk
    meta: { public: true }
  },
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/leads/:id",
    name: "LeadDetail",
    component: () => import("../views/LeadDetailView.vue"),
    props: true, // Inject route.params.id langsung sebagai props komponen!
    meta: { requiresAuth: true, role: "SALES" }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard Global: Berjalan sebelum setiap perpindahan halaman
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("nusa_crm_token");
  const userRole = localStorage.getItem("nusa_crm_role") || "GUEST";

  console.log(`[Router Guard] Navigasi dari ${from.path} menuju ${to.path}`);

  if (to.meta.requiresAuth && !token) {
    // Belum login: Lempar ke login
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else if (to.meta.role && to.meta.role !== userRole && userRole !== "ADMIN") {
    // Role tidak mencukupi
    alert("Akses Ditolak: Anda tidak memiliki izin untuk halaman ini.");
    next(false); // Batalkan navigasi
  } else {
    next(); // Izinkan navigasi berlanjut
  }
});

export default router;
```

---

## Konsep Kunci

### Arsitektur Routing Single Page Application (SPA)
Pada SPA, perpindahan halaman tidak menyebabkan browser me-refresh dokumen HTML dari server. Vue Router mencegat klik link, memperbarui URL di bilah alamat browser melalui HTML5 History API, dan menukar komponen tampilan yang aktif di dalam `<RouterView />`.

### Lazy Loading untuk Performa Skala Besar
Jangan pernah mengimpor semua halaman di baris atas router!
Dengan sintaks `component: () => import('../views/Detail.vue')`, Vite akan memecah file tersebut menjadi chunk JavaScript terpisah. Kode halaman detail hanya diunduh oleh browser ketika pengguna benar-benar mengeklik link tersebut!

### Kekuatan `router.beforeEach`
Fungsi navigation guard bertindak sebagai gerbang otentikasi. Anda dapat memeriksa apakah token JWT ada di storage sebelum mengizinkan rute `/dashboard` ditampilkan. Jika tidak ada, pengguna langsung dibelokkan ke `/login` tanpa sempat melihat data rahasia.

---

---

## Penjelasan untuk Pemula

### Analogi: Papan Penunjuk Jalan & Penjaga Pintu Lobi VIP
1. **Vue Router** seperti sistem lift pintar di gedung pencakar langit: menekan tombol lantai 14 mengarahkan Anda ke lantai 14 tanpa harus keluar dari gedung dan masuk lagi lewat pintu depan.
2. **beforeEach Guard** seperti petugas keamanan di depan pintu lift eksekutif: sebelum pintu lift terbuka ke lantai direksi (*rute admin*), petugas memeriksa kartu ID (*meta.requiresAuth*). Jika kartu tidak valid, lift ditolak dan dikembalikan ke lobi dasar.

## Eksperimen

- Coba buka rute /dashboard tanpa token di LocalStorage dan amati redirect otomatis ke /login.
- Simulasikan login sukses dengan menulis localStorage.setItem("nusa_crm_token", "xyz") dan buka kembali dashboard.
- Buka URL /leads/L-101 dan verifikasi komponen LeadDetail menerima prop id = "L-101" secara langsung.
- Coba akses rute yang tidak terdaftar dan amati komponen NotFound menangkap rute 404.

---

## Tantangan

Tambahkan progress bar loading visual di bagian atas layar menggunakan library NProgress yang dipicu pada hook `router.beforeEach` (start) dan `router.afterEach` (done).

---

## Model Mental & Diagram Alur Visual

![Diagram Reaktivitas Komponen & Data Flow Vue](/diagrams/react-data-flow.svg)

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Destructuring Reaktif State Hilang
- **Gejala / Masalah:** Variabel yang di-destructure dari `reactive()` kehilangan sifat reaktivitasnya.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `toRefs(state)` sebelum melakukan destructuring pada Composition API.

### 2. Mengubah Prop Komponen Anak secara Langsung
- **Gejala / Masalah:** Memicu warning konsol Vue dan membuat data flow satu arah (one-way data flow) kacau.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Kirim event `emit('update:prop', value)` ke parent alih-alih memutasi prop.

### 3. Lupa `.value` pada Ref di JavaScript
- **Gejala / Masalah:** Objek `ref` dikirim alih-alih nilai aslinya ke logika komputasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Ingat bahwa `.value` wajib di dalam blok `<script setup>`, namun otomatis di-unwrap di template `<template>`.

---

## Ringkasan

Kamu telah menguasai Vue Router 4, lazy loading chunks, dan navigation guards. Minggu depan kita memasuki Level 3: Slots Lanjut, Teleport, dan Capstone CRM.
