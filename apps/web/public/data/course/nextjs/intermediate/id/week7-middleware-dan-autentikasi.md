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
┌──────────────────────────────────────────────────────────┐
│ NEXT.JS APP ROUTER ARCHITECTURE                          │
│                                                          │
│ [Server Component] (Default: Keamanan & DB Direct Access)│
│  • page.tsx / layout.tsx                                 │
│  • Fetch data di server tanpa CORS / Waterfalls          │
│       │                                                  │
│       ▼ Mengirim RSC Payload                             │
│ [Client Component] ('use client')                        │
│  • State lokal, onClick, animasi interaktif              │
│       │                                                  │
│       ▼ Server Actions ('use server')                    │
│  Mutasi langsung ke database & Revalidasi Path           │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `export default async function Page()`
- **Fungsi Utama:** Server Component asinkron bawaan.
- **Parameter / Atribut:** `Props (params, searchParams)`.
- **Perilaku & Efek Sistem:** Merender halaman di server dengan akses database langsung tanpa paparan secret ke browser..
- **Contoh Penggunaan Praktis:**
```typescript
export default async function Page() {
  const data = await db.query('SELECT * FROM items');
  return <main>{data.map(i => <p key={i.id}>{i.name}</p>)}</main>;
}
```
- **Hasil Output yang Diharapkan:**
```output
HTML statis siap saji dikirimkan ke peramban klien
```

### 2. `'use client'`
- **Fungsi Utama:** Direktif penanda Komponen Klien.
- **Parameter / Atribut:** `Ditulis di baris pertama`.
- **Perilaku & Efek Sistem:** Mengizinkan penggunaan hook interaktif browser seperti `useState`, `useEffect`, dan event listener..
- **Contoh Penggunaan Praktis:**
```typescript
'use client';
import { useState } from 'react';
export default function Counter() {
  const [val, setVal] = useState(0);
  return <button onClick={() => setVal(v => v + 1)}>{val}</button>;
}
```
- **Hasil Output yang Diharapkan:**
```output
Komponen interaktif beroperasi di browser klien
```

### 3. `'use server' (Server Actions)`
- **Fungsi Utama:** Mutasi data server langsung dari form.
- **Parameter / Atribut:** `Form data / arguments`.
- **Perilaku & Efek Sistem:** Mengeksekusi mutasi database di sisi server langsung dari event form klien tanpa endpoint REST terpisah..
- **Contoh Penggunaan Praktis:**
```typescript
async function createItem(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await db.items.create({ name });
  revalidatePath('/items');
}
```
- **Hasil Output yang Diharapkan:**
```output
Data tersimpan di server dan halaman otomatis di-revalidasi
```

### 4. `<Link href="/dashboard">`
- **Fungsi Utama:** Navigasi halaman cepat tanpa reload.
- **Parameter / Atribut:** `href (Path route)`.
- **Perilaku & Efek Sistem:** Melakukan pre-fetching rute di latar belakang dan transisi halaman instan (SPA feel)..
- **Contoh Penggunaan Praktis:**
```typescript
import Link from 'next/link';
<Link href="/about" className="btn">Tentang Kami</Link>
```
- **Hasil Output yang Diharapkan:**
```output
Halaman berpindah instan tanpa muat ulang browser
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
