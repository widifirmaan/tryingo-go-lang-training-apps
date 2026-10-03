# Mapped Types, keyof Operator & Immutable State Store

> **Kategori:** TypeScript | **Level:** Sistem Tipe Lanjut & Capstone Portofolio | **Minggu 8:** Mapped Types, keyof Operator & Immutable State Store
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai operator keyof untuk mengekstrak union kunci dari interface apapun
- Menulis Mapped Types kustom untuk mentransformasi properti objek secara dinamis
- Menggunakan Key Remapping (`as`) dan fungsi intrinsik string (Capitalize, Uppercase)
- Membangun utilitas rekursif DeepReadonly untuk arsitektur state immutability enterprise
- Mencegah kecacatan data pada aplikasi manajemen aset keuangan bertaraf produksi

---

## Program: Mesin State Store Reaktif dengan Mutasi Deep Readonly

```typescript
// 1. keyof Operator: Mengambil Union dari Semua Kunci Objek
interface PortofolioState {
  totalAset: number;
  simbolAktif: string[];
  sedangSinkronisasi: boolean;
}

type KunciPortofolio = keyof PortofolioState; // "totalAset" | "simbolAktif" | "sedangSinkronisasi"

// 2. Mapped Type: Mengubah Setiap Kunci Properti Menjadi Getter Method
type GetterPortofolio<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// 3. Deep Readonly: Mengunci Objek Bertingkat Sampai Kedalaman Terdalam
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface KonfigurasiInvestasi {
  profilRisiko: string;
  aturanBatas: {
    maksimalAlokasiSatuEmiten: number;
    stopLossPersen: number;
  };
}

const configAman: DeepReadonly<KonfigurasiInvestasi> = {
  profilRisiko: "MODERAT",
  aturanBatas: {
    maksimalAlokasiSatuEmiten: 0.20,
    stopLossPersen: 0.05
  }
};

// configAman.aturanBatas.stopLossPersen = 0.1; // COMPILE ERROR: Deeply locked!

console.log("Status Konfigurasi:", configAman.profilRisiko);
console.log("Stop Loss Terkunci:", configAman.aturanBatas.stopLossPersen * 100, "%");
```

---

## Konsep Kunci

### Operator `keyof`
Operator `keyof` mengambil semua nama properti publik dari suatu tipe dan mengubahnya menjadi union tipe literal string. Ini memungkinkan Anda membuat fungsi akses properti yang 100% aman:
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Mapped Types (`[K in keyof T]`)
Jika Anda ingin membuat salinan tipe tetapi mengubah semua nilainya (misalnya semua nilai dijadikan fungsi *getter* atau dijadikan *nullable*), gunakan sintaks Mapped Types:
```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

### Key Remapping dengan `as`
Sejak TypeScript 4.1, Anda bisa mengubah nama kunci saat memetakan properti:
`[K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];`
Sintaks ini secara otomatis mengubah properti `nama` menjadi method `getNama()`, persis seperti generator kode di level tipe!

---

---

## Penjelasan untuk Pemula

### Analogi: Cetakan Mesin Pabrik & Stempel Segel
1. **`keyof`** seperti daftar menu di restoran: Anda hanya boleh memesan nama makanan yang tercantum di buku menu; menyebutkan makanan di luar menu langsung ditolak pramusaji.
2. **Deep Readonly** seperti melaminasi buku sertifikat tanah: bukan hanya sampul depannya yang tidak bisa dicoret, tetapi setiap halaman di lembar terdalam ikut terkunci rapat dari coretan tinta.

## Eksperimen

- Buka komentar pada baris configAman.aturanBatas.stopLossPersen = 0.1 dan amati eror kompilasi.
- Buat Mapped Type baru yang mengubah seluruh tipe data nilai properti menjadi string.
- Uji operator keyof pada interface yang memiliki ratusan properti.
- Tambahkan properti array ke KonfigurasiInvestasi dan lihat bagaimana DeepReadonly menguncinya.

---

## Tantangan

Buat utilitas Mapped Type `ValidasiSkema<T>` yang mengubah setiap properti `T` menjadi fungsi validator: `(nilai: T[K]) => boolean | string`. Uji pada interface `ProfilUser`.

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

### 1. `interface Name { prop: Type; }`
- **Fungsi Utama:** Mendefinisikan kontrak bentuk objek terstruktur.
- **Parameter / Atribut:** `Field names, Types, Optional (?)`.
- **Perilaku & Efek Sistem:** Menjamin seluruh objek yang dibuat mematuhi struktur tipe yang ditentukan secara ketat saat compile-time.
- **Contoh Penggunaan Praktis:**
```javascript
interface Student {
  id: string;
  name: string;
  gpa?: number;
}
const alex: Student = { id: 's1', name: 'Alex' };
```
- **Hasil Output yang Diharapkan:**
```text
Validasi kompilasi berhasil tanpa error type mismatch
```

### 2. `type Union = TypeA | TypeB`
- **Fungsi Utama:** Tipe gabungan multi-kondisi (Union Type).
- **Parameter / Atribut:** `Dua atau lebih definisi tipe`.
- **Perilaku & Efek Sistem:** Mengizinkan variabel memiliki salah satu dari sekumpulan nilai atau struktur tipe yang diizinkan.
- **Contoh Penggunaan Praktis:**
```javascript
type Status = 'pending' | 'success' | 'failed';
let currentStatus: Status = 'success';
```
- **Hasil Output yang Diharapkan:**
```text
Hanya menerima 3 kemungkinan string yang dideklarasikan
```

### 3. `function genericFn<T>(arg: T): T`
- **Fungsi Utama:** Fungsi tipe dinamis aman (Generics).
- **Parameter / Atribut:** `Type Parameter T`.
- **Perilaku & Efek Sistem:** Memungkinkan pembuatan fungsi atau struktur kelas yang dapat bekerja dengan beragam tipe data dengan tetap menjaga type-safety.
- **Contoh Penggunaan Praktis:**
```javascript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
const firstNum = getFirst([10, 20]); // Type: number
```
- **Hasil Output yang Diharapkan:**
```text
10 (dengan inferensi tipe number murni)
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Fungsi Utama:** Tipe utilitas bawaan TypeScript.
- **Parameter / Atribut:** `Type T, Keys K`.
- **Perilaku & Efek Sistem:** Mentransformasi struktur tipe yang sudah ada menjadi opsional (`Partial`) atau mengambil subset field spesifik.
- **Contoh Penggunaan Praktis:**
```javascript
interface Product { id: string; name: string; price: number; }
type UpdateProductDto = Partial<Product>;
```
- **Hasil Output yang Diharapkan:**
```text
Semua properti Product berubah menjadi opsional untuk update
```


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

Kamu telah menguasai keyof, Mapped Types, Key Remapping, dan Deep Readonly. Minggu depan kita mendalami Declaration Files (.d.ts) dan konfigurasi kompilasi enterprise.
