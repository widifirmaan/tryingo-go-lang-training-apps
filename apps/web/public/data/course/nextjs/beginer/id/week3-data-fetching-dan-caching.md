# Data Fetching Modern: Native fetch(), Extended Caching & ISR (Incremental Static Regeneration)

> **Kategori:** Next.js | **Level:** App Router, RSC & Fondasi Streaming | **Minggu 3:** Data Fetching Modern: Native fetch(), Extended Caching & ISR (Incremental Static Regeneration)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perluasan fungsi bawaan fetch() di Next.js dengan opsi cache terintegrasi
- Menguasai 3 strategi data fetching: Static (force-cache), Dynamic (no-store), dan ISR (revalidate)
- Memahami cara kerja Incremental Static Regeneration (ISR) untuk situs performa tinggi ber-cache
- Menggunakan revalidasi berbasis waktu (time-based) dan revalidasi berbasis tag on-demand (revalidateTag)
- Mencegah request waterfall dengan teknik pemanggilan paralel Promise.all() di server

---

## Program: Mesin Sinkronisasi Kurs Valuta Asing dengan Revalidasi Berkala

```tsx
// ============================================================================
// File: app/kurs/page.tsx (Data Fetching dengan Extended Caching & ISR)
// ============================================================================

interface ResponKurs {
  base: string;
  date: string;
  rates: Record<string, number>;
  diambilPadaWaktu: string;
}

async function ambilDataKursTerkini(): Promise<ResponKurs> {
  // Simulasi fetch() dengan opsi caching canggih Next.js
  // 1. { cache: 'force-cache' } -> Static Data (SSG) - Di-cache selamanya sampai build baru
  // 2. { cache: 'no-store' }    -> Dynamic Data (SSR) - Di-fetch ulang di SETIAP request
  // 3. { next: { revalidate: 60 } } -> ISR - Di-cache selama 60 detik, lalu di-refresh di background!
  
  console.log("[Server] Mengambil kurs baru dari liquidity provider...");

  return {
    base: "USD",
    date: new Date().toISOString().split("T")[0],
    rates: {
      IDR: 16250 + Math.floor(Math.random() * 50),
      EUR: 0.92,
      SGD: 1.34,
      JPY: 155.4
    },
    diambilPadaWaktu: new Date().toLocaleTimeString("id-ID")
  };
}

export default async function HalamanKursMataUang() {
  const kurs = await ambilDataKursTerkini();

  return (
    <div style={{ maxWidth: "480px", margin: "24px auto", fontFamily: "sans-serif" }}>
      <header style={{ background: "#0f172a", color: "white", padding: "16px", borderRadius: "8px 8px 0 0" }}>
        <h2 style={{ margin: 0 }}>Papan Kurs Valuta Asing (ISR)</h2>
        <small style={{ color: "#94a3b8" }}>Basis Mata Uang: 1 {kurs.base}</small>
      </header>

      <div style={{ border: "1px solid #cbd5e1", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px" }}>
        <div style={{ marginBottom: "12px", fontSize: "13px", color: "#64748b" }}>
          Terakhir diperbarui: <strong>{kurs.diambilPadaWaktu}</strong> (Cache TTL: 60s)
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
              <th style={{ padding: "8px 0" }}>Mata Uang</th>
              <th style={{ padding: "8px 0", textAlign: "right" }}>Nilai Tukar</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(kurs.rates).map(([kode, nilai]) => (
              <tr key={kode} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "8px 0", fontWeight: "bold" }}>{kode}</td>
                <td style={{ padding: "8px 0", textAlign: "right", fontFamily: "monospace" }}>
                  {kode === "IDR" ? `Rp ${nilai.toLocaleString("id-ID")}` : nilai}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## Konsep Kunci

### Evolusi Caching di Next.js
Di web tradisional, Anda harus memilih antara halaman statis murni yang cepat tapi datanya basi (SSG), atau halaman dinamis yang selalu terbaru tapi lambat dan membebani database (SSR).
Next.js menyatukan keduanya melalui **arsitektur caching berlapis**:

1. **Static Data Fetching (`force-cache`)**:
   Data diambil sekali saat waktu build dan disimpan selamanya. Cocok untuk artikel blog atau syarat & ketentuan.
2. **Dynamic Data Fetching (`no-store`)**:
   Data diambil segar dari database pada setiap permintaan HTTP pengguna. Wajib digunakan untuk saldo rekening, dashboard personal, atau status pembayaran.
3. **Incremental Static Regeneration (ISR - `next: { revalidate: 60 }`)**:
   Inovasi terbesar Next.js: Halaman disajikan instan dari cache CDN global. Setiap 60 detik sekali di latar belakang (*background*), Next.js memeriksa apakah ada data baru. Pengguna mendapatkan kecepatan halaman statis (10ms) dengan kesegaran data dinamis!

### On-Demand Revalidation (`revalidateTag`)
Selain menunggu 60 detik, Anda bisa memicu pembersihan cache secara instan kapan saja menggunakan tag:
`fetch(url, { next: { tags: ['katalog-produk'] } })`
Ketika admin toko mengedit harga produk di CMS, server Anda cukup memanggil `revalidateTag('katalog-produk')`, dan seluruh cache dunia langsung diperbarui seketika!

---

---

## Penjelasan untuk Pemula

### Analogi: Majalah Mingguan vs Koran Pagi vs Papan Kurs Bandara
1. **Static (`force-cache`)** seperti buku ensiklopedia cetak: dicetak sekali di percetakan (*build time*) dan tidak pernah berubah sampai edisi tahun depan.
2. **Dynamic (`no-store`)** seperti radar pengawas lalu lintas udara: setiap detik harus menyala langsung melihat posisi pesawat saat ini tanpa rekaman lama.
3. **ISR (`revalidate: 60`)** seperti papan valuta asing di bandara: petugas mengganti lembaran angka kurs setiap 1 jam sekali. Pengunjung yang lewat bisa langsung membaca papan seketika tanpa harus menunggu kasir menghitung ulang dari nol.

## Eksperimen

- Refresh halaman kurs berkali-kali dan amati waktu diambilPadaWaktu tetap sama selama 60 detik pertama (cache hit).
- Ubah opsi cache menjadi no-store dan amati bahwa jam detik berubah pada setiap kali refresh.
- Gabungkan dua fetch independen menggunakan const [kurs, berita] = await Promise.all([...]).
- Pelajari cara kerja router.refresh() di Client Component untuk memicu revalidasi data di layar.

---

## Tantangan

Bangun halaman ringkasan inventaris yang mengambil data stok dari dua gudang berbeda secara paralel dengan Promise.all() dan menetapkan aturan cache ISR 30 detik.

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

Kamu telah menguasai extended fetch, strategi caching (Static, Dynamic, ISR), dan revalidateTag. Minggu depan kita mempelajari Streaming SSR dan Suspense.
