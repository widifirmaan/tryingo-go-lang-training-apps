# Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 7:** Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)

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

## Ringkasan

Kamu telah menguasai Vue Router 4, lazy loading chunks, dan navigation guards. Minggu depan kita memasuki Level 3: Slots Lanjut, Teleport, dan Capstone CRM.
