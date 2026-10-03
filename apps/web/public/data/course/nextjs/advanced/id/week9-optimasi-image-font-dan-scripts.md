# Optimasi Performa: next/image, next/font & Metrik Core Web Vitals (LCP, CLS, INP)

> **Kategori:** Next.js | **Level:** SEO Dinamis, Optimasi & Capstone E-Commerce | **Minggu 9:** Optimasi Performa: next/image, next/font & Metrik Core Web Vitals (LCP, CLS, INP)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 3 metrik krusial Google Core Web Vitals: LCP (Loading), CLS (Stabilitas), dan INP (Responsivitas)
- Menggunakan komponen next/image untuk kompresi otomatis (WebP/AVIF) dan pembuatan responsive srcset
- Mencegah Cumulative Layout Shift (CLS) dengan mendefinisikan prop width/height atau prop fill
- Menggunakan next/font untuk mengunduh Google Fonts pada waktu build (Zero Layout Shift font)
- Menganalisis ukuran bundle JavaScript produksi menggunakan @next/bundle-analyzer

---

## Program: Audit & Optimasi Skor Lighthouse Toko E-Commerce

```tsx
// ============================================================================
// File: app/komponen/BannerHeroOptimasi.tsx (Demonstrasi next/image & next/font)
// ============================================================================
import Image from "next/image";

export default function BannerHeroOptimasi() {
  return (
    <section style={{ maxWidth: "680px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0f172a"
      }}>
        {/* next/image: Otomatis konversi WebP/AVIF, responsive srcset, pencegahan CLS, dan priority LCP */}
        <Image
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          alt="Setup Meja Kerja Minimalis Developer"
          fill
          priority // Prioritaskan loading gambar ini karena merupakan elemen LCP terbesar di layar
          sizes="(max-width: 768px) 100vw, 680px"
          style={{ objectFit: "cover" }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px",
          color: "white"
        }}>
          <h2 style={{ margin: "0 0 8px 0" }}>Produktivitas Tanpa Batas 2026</h2>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px" }}>
            Dioptimalkan dengan next/image: Zero Layout Shift & WebP Compression Otomatis.
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## Konsep Kunci

### Mengapa Tag `<img>` Biasa Dilarang di Next.js?
Tag `<img>` HTML biasa mengunduh file asli berukuran megabyte, tidak melakukan kompresi modern, dan menyebabkan layar melompat-lompat saat gambar selesai dimuat (*Cumulative Layout Shift*).

Komponen **`next/image`** memberikan optimasi otomatis bertaraf enterprise:
1. **Modern Format Optimization**: Mengonversi gambar JPEG/PNG menjadi WebP atau AVIF secara dinamis berdasarkan dukungan browser pengguna (menghemat bandwidth hingga 70%).
2. **Pencegahan CLS (Zero Layout Shift)**: Memaksa pengembang menentukan dimensi atau `fill`, sehingga browser mereservasi ruang kosong sebelum gambar tiba.
3. **Responsive Sizes**: Menghasilkan atribut `srcset` sehingga ponsel kecil tidak mengunduh gambar beresolusi 4K.
4. **Prop `priority`**: Menandai elemen gambar terbesar di layar (*Largest Contentful Paint - LCP*) agar dimuat terlebih dahulu tanpa lazy loading.

### `next/font`: Hilangkan Lonjakan Font (Zero FOIT/FOUT)
Dengan `next/font/google`, Next.js mengunduh file font langsung pada waktu build dan menyimpannya bersama aset statis aplikasi Anda.
Browser tidak perlu lagi melakukan handshake DNS ke `fonts.googleapis.com` saat pengguna membuka web Anda!

---

---

## Penjelasan untuk Pemula

### Analogi: Foto Paspor Terpasang vs Foto Lepas di Meja
1. **Tag `<img>` biasa** seperti menaruh kartu tebal di atas tumpukan dokumen yang sedang Anda baca: saat kartu ditaruh tiba-tiba, seluruh tulisan di bawahnya bergeser turun (*Cumulative Layout Shift* yang menjengkelkan).
2. **`next/image`** seperti bingkai foto di paspor: sudah ada kotak kosong bergaris dengan ukuran pas sejak awal, jadi saat fotonya ditempelkan, tidak ada dokumen lain yang tergeser sedikit pun.
3. **Format WebP** seperti mengompres foto berukuran poster menjadi perangko mini yang tetap tajam tanpa pecah.

## Eksperimen

- Buka tab Network di browser dan perhatikan bahwa format gambar yang diunduh adalah image/webp atau image/avif, bukan jpg asli.
- Hapus prop priority pada gambar hero di atas dan perhatikan peringatan LCP di terminal konsol Next.js.
- Coba ubah ukuran jendela browser dari desktop ke mobile dan perhatikan browser meminta resolusi gambar yang lebih kecil berkat srcset.
- Jalankan audit Lighthouse di Chrome DevTools dan targetkan skor Performance 95+.

---

## Tantangan

Konfigurasikan font kustom `Inter` menggunakan `next/font/google` di `app/layout.tsx` dengan subset latin dan terapkan variabel CSS ke seluruh body dokumen.

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

Kamu telah menguasai next/image, next/font, Core Web Vitals (LCP, CLS), dan optimasi aset. Minggu depan adalah Capstone Final: Headless E-Commerce Storefront.
