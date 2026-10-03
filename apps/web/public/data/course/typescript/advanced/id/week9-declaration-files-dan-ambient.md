# Declaration Files (.d.ts), Ambient Types & Module Augmentation

> **Kategori:** TypeScript | **Level:** Sistem Tipe Lanjut & Capstone Portofolio | **Minggu 9:** Declaration Files (.d.ts), Ambient Types & Module Augmentation
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran file definisi tipe (.d.ts) dan bagaimana npm @types bekerja
- Menggunakan kata kunci `declare` untuk ambient declarations variabel global browser / Node.js
- Menerapkan Module Augmentation untuk memperluas interface library pihak ketiga (Express, Next.js)
- Memahami opsi tsconfig penting: strict, noImplicitAny, exactOptionalPropertyTypes, skipLibCheck
- Menulis definisi tipe mandiri untuk library open source warisan tanpa tipe bawaan

---

## Program: Mengetik Library Eksternal Tanpa Tipe & Augmentasi Sesi Express

```typescript
// 1. Ambient Declaration untuk Library JavaScript Warisan Tanpa Tipe
declare namespace WindowSDKWarisan {
  function hitungPajakInternasional(nominal: number, negara: string): number;
  const versiEngine: string;
}

// 2. Module Augmentation (Memperluas Tipe Library Tanpa Mengubah Source-nya)
// Bayangkan ini memperluas interface Express Request atau Session bawaan
declare global {
  namespace Express {
    interface Request {
      penggunaTervalidasi?: {
        userId: string;
        tierAkun: "RETAIL" | "INSTITUSI";
        ipAddress: string;
      };
    }
  }
}

// 3. Penggunaan Nyata dalam Handler Middleware
function middlewareAutentikasi(req: any) {
  // Melalui module augmentation, properti penggunaTervalidasi kini dikenal resmi
  req.penggunaTervalidasi = {
    userId: "USR-789",
    tierAkun: "INSTITUSI",
    ipAddress: "103.11.22.33"
  };
  console.log("User terautentikasi:", req.penggunaTervalidasi.userId);
  console.log("Tier Hak Akses:", req.penggunaTervalidasi.tierAkun);
}

const reqMock: any = {};
middlewareAutentikasi(reqMock);
```

---

## Konsep Kunci

### Apa itu File `.d.ts`?
File berakhiran `.d.ts` (*Declaration File*) hanya berisi informasi tipe data tanpa implementasi logika kode. File ini bertindak sebagai **jembatan penerjemah** antara JavaScript murni dengan compiler TypeScript. Ketika Anda menginstal `@types/node` atau `@types/react`, Anda sebenarnya sedang mengunduh koleksi file `.d.ts` ini.

### Module Augmentation
Seringkali library pihak ketiga seperti Express memiliki objek `Request` standar. Namun, aplikasi Anda memiliki middleware autentikasi yang menambahkan properti `req.user`.
Daripada melakukan casting `(req as any).user`, Anda dapat memperluas interface asli library tersebut menggunakan **Declaration Merging / Module Augmentation**:
```typescript
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
```
Kini seluruh aplikasi Anda menikmati auto-complete dan type safety tanpa menyentuh node_modules!

---

---

## Penjelasan untuk Pemula

### Analogi: Papan Label Nama di Hotel Berbintang
1. **`.d.ts`** seperti buku panduan fasilitas hotel yang diterjemahkan ke 5 bahasa: gedungnya sendiri berbahasa lokal (*JavaScript*), namun buku panduan membantu tamu asing (*TypeScript*) mengetahui persis letak kolam renang dan nomor kamar.
2. **Module Augmentation** seperti stiker kartu akses VIP: Anda tidak mengubah bentuk fisik kartu kamar hotel, tetapi petugas menempelkan izin akses khusus lift lantai penthouse di atas kartu tersebut.

## Eksperimen

- Coba deklarasikan variabel global declare const API_SECRET: string dan panggil di console.
- Tambahkan properti baru ke namespace Express.Request di atas dan periksa ketersediaannya.
- Eksplorasi file tsconfig.json dan aktifkan flag strict: true.
- Pelajari apa yang terjadi jika flag skipLibCheck disetel ke false pada project besar.

---

## Tantangan

Tulis file deklarasi ambient `window-env.d.ts` yang memperluas interface `Window` browser global dengan properti `analyticsTracker: { trackEvent: (name: string, meta?: object) => void }`.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Penyalahgunaan Tipe 'any'
- **Gejala / Masalah:** Menghilangkan seluruh keamanan pengecekan compile-time TypeScript.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `unknown` jika tipe data belum pasti, lalu persempit dengan type guards (`typeof`, `instanceof`).

### 2. Non-Null Assertion Operator (!) Sembarangan
- **Gejala / Masalah:** Terjadi runtime error `Cannot read properties of undefined` saat nilai ternyata null.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan optional chaining (`?.`) atau pengecekan kondisional eksplisit `if (val != null)`.

### 3. Interface vs Type yang Tidak Konsisten
- **Gejala / Masalah:** Membingungkan arsitektur tim dan menyulitkan declaration merging saat menulis library.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `interface` untuk struktur objek extensible dan `type` untuk union, tuple, atau primitive alias.

---

## Ringkasan

Kamu telah menguasai Declaration Files dan Module Augmentation. Minggu depan adalah Capstone Final: Mesin Portofolio Keuangan Tipe-Ketat.
