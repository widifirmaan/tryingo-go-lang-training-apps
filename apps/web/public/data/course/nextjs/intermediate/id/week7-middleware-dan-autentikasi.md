# Edge Middleware: Verifikasi Sesi JWT, Protected Routes & Header Rewrites

> **Kategori:** Next.js | **Level:** Server Actions, Route Handlers & Edge Auth | **Minggu 7:** Edge Middleware: Verifikasi Sesi JWT, Protected Routes & Header Rewrites
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran Edge Middleware yang berjalan sebelum permintaan HTTP mencapai halaman manapun
- Menggunakan config matcher untuk mengoptimalkan rute yang diperiksa middleware
- Menerapkan proteksi rute privat (Protected Routes) berbasis cookies sesi terenkripsi
- Melakukan redirect aman dengan mempertahankan URL asal pengguna (returnUrl pattern)
- Menyuntikkan header keamanan global dan ID penelusuran request (Distributed Tracing)

---

## Program: Satpam Gerbang Edge: Proteksi Halaman Admin & Multi-Tenant Rewrite

```ts
// ============================================================================
// File: middleware.ts (Diletakkan di Root Project - Berjalan di V8 Edge Runtime!)
// ============================================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenSesi = request.cookies.get("nusa_auth_session")?.value;

  console.log(`[Edge Middleware] Memeriksa akses ke jalur: ${pathname}`);

  // 1. Proteksi Halaman Dashboard Admin & Kasir
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    if (!tokenSesi) {
      // Belum login: Redirect paksa ke halaman login dengan query return_url
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("kembali_ke", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Custom Security Headers & Request Tracing ID
  const response = NextResponse.next();
  response.headers.set("x-nusa-edge-region", "sin1"); // Singapore Edge
  response.headers.set("x-trace-request-id", `REQ-${Date.now()}`);

  return response;
}

// Konfigurasi Matcher: Hanya jalankan middleware pada rute aplikasi, abaikan file statis!
export const config = {
  matcher: [
    /*
     * Cocokkan semua path kecuali:
     * - api routes tertentu (_next/static, _next/image, favicon.ico)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
```

---

## Konsep Kunci

### Apa itu Edge Middleware?
Middleware adalah kode yang dieksekusi **di server Edge (terdekat dengan lokasi fisik pengguna)** sebelum permintaan pernah menyentuh file `page.tsx` atau database.
Karena berjalan di Edge V8 Runtime ultra-ringan:
1. Waktu eksekusi sangat cepat (kurang dari 5 milidetik).
2. Anda bisa mencegat pengguna tidak berhak dan langsung me-redirect mereka ke `/login` tanpa membuang sumber daya server untuk merender halaman.

### Dua Operasi Utama Middleware:
- **`NextResponse.redirect()`**: Mengubah URL di browser pengguna dan mengirim status HTTP 307/308. Pengguna melihat perpindahan halaman.
- **`NextResponse.rewrite()`**: Menampilkan konten dari URL lain secara internal **tanpa mengubah alamat di bilah URL browser pengguna**. Sangat populer untuk fitur *Multi-Tenancy* (misal: `toko-budi.platform.id` secara internal membaca `app/tenant/budi`).

### Aturan Matcher
Tanpa filter `matcher`, middleware akan berjalan pada setiap request gambar `.png`, font, dan file CSS. Selalu pasang regex matcher untuk mengecualikan `_next/static`, `_next/image`, dan `favicon.ico` demi performa maksimal.

---

---

## Penjelasan untuk Pemula

### Analogi: Satpam Gerbang Kompleks Perumahan
1. **Tanpa Middleware**, seorang penyusup bisa masuk sampai ke pintu depan kamar tidur Anda (*server merender halaman*), baru kemudian Anda bertanya "Kamu siapa?". Sangat boros energi dan berbahaya.
2. **Edge Middleware** seperti satpam di pos gerbang utama kompleks perumahan: jika mobil tidak memiliki stiker warga penghuni (*cookie token sesi*), satpam langsung memutar balik mobil di gerbang depan (*redirect ke login*) tanpa pernah membiarkannya masuk ke jalanan kompleks.

## Eksperimen

- Coba buka URL /admin tanpa cookie nusa_auth_session dan perhatikan redirect otomatis ke /login?kembali_ke=%2Fadmin.
- Tambahkan cookie nusa_auth_session secara manual di DevTools Application tab dan buka kembali /admin.
- Periksa tab Network dan temukan header x-nusa-edge-region dan x-trace-request-id.
- Pelajari cara verifikasi token JWT menggunakan library jose yang kompatibel dengan Edge Runtime.

---

## Tantangan

Implementasikan middleware feature flag: jika cookie `beta_tester=true` ada, rewrite permintaan dari `/checkout` ke `/checkout-v2` tanpa mengubah URL di browser pengguna.

---

## Model Mental & Diagram Alur Visual

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

### 1. Menggunakan Hook Browser di Server Component
- **Gejala / Masalah:** Error kompilasi `useState can only be used in a Client Component`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan direktif `'use client'` di baris paling atas berkas komponen yang memerlukan interaktivitas browser.

### 2. Waterfalls Fetching Data yang Tidak Perlu
- **Gejala / Masalah:** Loading halaman menjadi sangat lambat karena request dilakukan berurutan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `Promise.all([fetchA(), fetchB()])` untuk menjalankan pemanggilan API secara paralel di server.

### 3. Caching yang Terlalu Agresif
- **Gejala / Masalah:** Data baru di database tidak muncul di browser pengguna.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tentukan revalidasi yang tepat via `fetch(url, { next: { revalidate: 60 } })` atau panggil `revalidatePath()`.

---

## Ringkasan

Kamu telah menguasai Edge Middleware, otentikasi cookies, redirect, dan rewrites. Minggu depan kita memasuki Level 3: Dynamic SEO, Metadata API, dan OpenGraph.
