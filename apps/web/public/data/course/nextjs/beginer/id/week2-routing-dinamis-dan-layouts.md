# Routing Berbasis Berkas: Dynamic Segments ([slug]), Nested Layouts & Not-Found

> **Kategori:** Next.js | **Level:** App Router, RSC & Fondasi Streaming | **Minggu 2:** Routing Berbasis Berkas: Dynamic Segments ([slug]), Nested Layouts & Not-Found
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami sistem file-system routing di Next.js: folder mendefinisikan rute URL
- Menggunakan Dynamic Route Segments ([slug], [id]) untuk halaman dinamis berparameter
- Menangani Promise params pada Next.js versi 15+ sesuai standar asinkron terbaru
- Mengimplementasikan halaman layout bersarang (Nested Layouts) yang mempertahankan state navigasi
- Memanfaatkan fungsi notFound() dan file not-found.tsx untuk penanganan 404 terstruktur

---

## Program: Halaman Detail Produk Dinamis & Penanganan 404 Terpersonalisasi

```tsx
// ============================================================================
// File: app/produk/[slug]/page.tsx (Dynamic Route Segment)
// ============================================================================
import { notFound } from "next/navigation";

// Kamus data produk berbasis slug unik
const DATABASE_PRODUK: Record<string, { nama: string; harga: number; deskripsi: string; rating: number }> = {
  "mechanical-keyboard-75": {
    nama: "Mechanical Keyboard 75% Wireless",
    harga: 1250000,
    deskripsi: "Switch tactile gateron pro yellow, gasket mount, RGB south-facing.",
    rating: 4.9
  },
  "monitor-gaming-27": {
    nama: "Monitor Gaming 27\" Fast IPS 165Hz",
    harga: 3850000,
    deskripsi: "Resolusi 2K QHD, 1ms response time, 99% sRGB color gamut.",
    rating: 4.8
  }
};

interface HalamanDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function HalamanDetailProduk({ params }: HalamanDetailProps) {
  // Pada Next.js 15+, params adalah Promise yang wajib di-await
  const { slug } = await params;
  const produk = DATABASE_PRODUK[slug];

  // Jika slug tidak ditemukan di database, picu notFound() otomatis
  if (!produk) {
    notFound();
  }

  return (
    <article style={{ maxWidth: "560px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>← Kembali ke Katalog</a>
      <h1 style={{ margin: "16px 0 8px 0" }}>{produk.nama}</h1>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a" }}>
          Rp {produk.harga.toLocaleString("id-ID")}
        </span>
        <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "4px", fontSize: "13px" }}>
          ★ {produk.rating} / 5.0
        </span>
      </div>
      <p style={{ lineHeight: "1.6", color: "#334155" }}>{produk.deskripsi}</p>
    </article>
  );
}
```

---

## Konsep Kunci

### Routing Berbasis Folder di App Router
Di Next.js App Router, Anda tidak perlu mengonfigurasi router library seperti `react-router`.
Struktur folder Anda secara otomatis menjadi URL:
- `app/page.tsx` -> `/`
- `app/tentang/page.tsx` -> `/tentang`
- `app/produk/[slug]/page.tsx` -> `/produk/mechanical-keyboard-75`

### Konvensi Berkas Khusus App Router
Setiap folder rute dapat memiliki file-file khusus yang dipahami otomatis oleh Next.js:
1. `page.tsx`: Komponen halaman utama rute.
2. `layout.tsx`: Membungkus halaman dan anak-anaknya. Layout **tidak pernah di-re-render ulang saat user berpindah halaman di dalam segmen yang sama** (*state preservation*).
3. `loading.tsx`: Tampilan skeleton instan saat data halaman sedang diambil.
4. `not-found.tsx`: Tampilan 404 khusus jika fungsi `notFound()` dipanggil.
5. `error.tsx`: Error boundary otomatis untuk menangkap kegagalan runtime.

### Penanganan Halaman Tidak Ditemukan (`notFound()`)
Jika pengguna mengakses slug acak seperti `/produk/baju-alien`, jangan tampilkan layar kosong! Panggil `notFound()`. Next.js akan langsung menghentikan render dan menampilkan antarmuka `not-found.tsx` terdekat dengan status code HTTP 404 yang benar untuk mesin pencari Google.

---

---

## Penjelasan untuk Pemula

### Analogi: Lemari Arsip Berlabel & Nomor Kamar Hotel
1. **Dynamic Segment `[slug]`** seperti nomor kamar hotel `/kamar/[nomor]`: pihak hotel tidak membangun pintu berbeda untuk setiap tamu, melainkan satu pintu standar yang kuncinya disesuaikan dengan nomor kamar yang dipesan.
2. **Layout** seperti lobi dan koridor hotel: koridor tetap sama dan tidak dihancurkan saat Anda berjalan dari kamar 101 ke kamar 102.
3. **notFound()** seperti resepsionis yang berkata: "Maaf kamar 999 tidak terdaftar di denah hotel kami", lalu mengarahkan Anda ke ruang tunggu informasi.

## Eksperimen

- Buka URL /produk/monitor-gaming-27 dan verifikasi detail produk berhasil dimuat dari database simulasi.
- Coba buka URL dengan slug asal-asalan seperti /produk/kucing-terbang dan amati tampilan 404 terpanggil.
- Buat file app/produk/layout.tsx yang menambahkan banner "Promo Diskon Akhir Pekan" di atas seluruh halaman produk.
- Gunakan fungsi generateStaticParams() untuk melakukan pre-render HTML statis pada waktu build (SSG).

---

## Tantangan

Implementasikan file `app/produk/[slug]/not-found.tsx` khusus yang menampilkan pesan hangat "Produk ini telah habis atau ditarik dari katalog" dilengkapi tombol kembali ke beranda.

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

Kamu telah menguasai file-system routing, dynamic segments [slug], nested layouts, dan notFound boundary. Minggu depan kita mempelajari Data Fetching dan Caching mendalam.
