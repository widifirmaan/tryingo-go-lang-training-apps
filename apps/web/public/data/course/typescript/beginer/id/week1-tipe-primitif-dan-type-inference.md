# Anotasi Tipe Primitif, Type Inference & Union Types

> **Kategori:** TypeScript | **Level:** Pondasi Tipe & Type Narrowing | **Minggu 1:** Anotasi Tipe Primitif, Type Inference & Union Types
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi TypeScript sebagai superset JavaScript dengan static type checking
- Menggunakan anotasi tipe eksplisit untuk string, number, boolean, bigint, dan symbol
- Memahami cara kerja Type Inference otomatis oleh compiler TypeScript
- Memanfaatkan Union Types (|) dan Literal Types untuk membatasi nilai yang valid
- Mencegah bug tipe data sebelum kode dijalankan di browser atau Node.js

---

## Program: Sistem Kasir & Verifikasi Tipe Data Keuangan

```typescript
// 1. Tipe Primitif & Type Inference
const tokoNama: string = "Nusa Investa";
let saldoKas: number = 5_000_000; // Numeric separator readability
const tokoAktif: boolean = true;

// 2. Union Types & Literal Types (Nilai Spesifik)
type StatusTransaksi = "PENDING" | "PAID" | "REFUNDED" | "FAILED";
type MataUang = "IDR" | "USD" | "EUR";

interface TransaksiAwal {
  id: string;
  nominal: number;
  kurs: MataUang;
  status: StatusTransaksi;
}

const tx1: TransaksiAwal = {
  id: "TX-9012",
  nominal: 1_250_000,
  kurs: "IDR",
  status: "PAID"
};

function formatRingkasan(tx: TransaksiAwal): string {
  return `[${tx.status}] ${tx.id}: ${tx.nominal.toLocaleString("id-ID")} ${tx.kurs}`;
}

console.log("=== Profil Toko ===");
console.log(`Nama: ${tokoNama} | Saldo Awal: Rp ${saldoKas.toLocaleString("id-ID")}`);
console.log("Transaksi Pertama:", formatRingkasan(tx1));
```

---

## Konsep Kunci

### Mengapa TypeScript Mengubah Industri Web?
JavaScript adalah bahasa *dynamically typed*: tipe data baru diketahui saat kode dieksekusi di browser. Kesalahan ketik nama properti atau pemberian nilai `undefined` sering menyebabkan eror fatal `TypeError: Cannot read properties of undefined`. TypeScript menambahkan **lapisan verifikasi statis pada waktu kompilasi (*compile-time*)**, mendeteksi 100% ketidaksesuaian tipe sebelum kode pernah dikirim ke server.

### Type Inference vs Anotasi Eksplisit
Compiler TypeScript sangat pintar. Jika Anda menulis `let saldo = 5000000;`, TypeScript secara otomatis menyimpulkan (*inferred*) bahwa tipe variabel tersebut adalah `number`. Anda tidak perlu menganotasi setiap variabel secara berlebihan, kecuali saat mendeklarasikan parameter fungsi atau kontrak data kompleks.

### Union Types & Literal Types
Daripada menggunakan string bebas yang rentan salah ketik seperti `"lunas"` atau `"dibayar"`, kita menggunakan **Literal Union**:
```typescript
type StatusOrder = "PENDING" | "SUCCESS" | "FAILED";
```
Jika ada pengembang yang memasukkan `"PENDINGG"`, compiler akan langsung melempar eror merah seketika.

---

---

## Penjelasan untuk Pemula

### Analogi: Label Tegangan Listrik
1. **JavaScript murni** seperti stopkontak tanpa label: Anda bisa mencolokkan alat 110V ke arus 220V, dan alat tersebut baru meledak saat dinyalakan (runtime crash).
2. **TypeScript** seperti colokan dengan bentuk fisik pengaman khusus (adapter tipe): jika kabel Anda memiliki colokan 110V, ia tidak akan pernah bisa ditancapkan ke soket 220V sejak awal. Anda diselamatkan sebelum arus listrik mengalir.

## Eksperimen

- Ubah nilai status tx1 menjadi "SUKSES" dan amati pesan eror kompilasi TypeScript.
- Coba masukkan string ke variabel saldoKas dan amati peringatan type assignment.
- Gunakan operator typeof pada JavaScript untuk melihat apakah tipe TypeScript ada saat runtime.
- Buat type MataUang baru yang mendukung "JPY" dan tambahkan transaksi dalam Yen.

---

## Tantangan

Buat tipe kustom `PrioritasTiket` ("LOW" | "MEDIUM" | "HIGH" | "CRITICAL") dan interface `TiketDukungan`. Tulis fungsi validasi yang menolak pembuatan tiket jika statusnya belum ditentukan.

---

## Model Mental & Diagram Alur Visual

```diagram
┌───────────────────────────────┐
│     KODE SUMBER TYPESCRIPT    │ (Strict Type Annotations)
│ interface User { id: UUID; }  │
└──────────────┬────────────────┘
               │ TYPE CHECKING (tsc) ──► Menemukan bug sebelum runtime!
               ▼
┌───────────────────────────────┐
│     JAVASCRIPT HASIL COMPILE  │ (Tipe dihapus / Type Erasure)
│ function getUser(user) { ... }│
└───────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `interface Name { prop: Type; }`
- **Fungsi Utama:** Mendefinisikan kontrak bentuk objek terstruktur.
- **Parameter / Atribut:** `Field names, Types, Optional (?)`.
- **Perilaku & Efek Sistem:** Menjamin seluruh objek mematuhi struktur tipe data saat compile-time..
- **Contoh Penggunaan Praktis:**
```typescript
interface User {
  id: string;
  name: string;
  isActive?: boolean;
}
const u: User = { id: 'u1', name: 'Alex' };
console.log(u.name);
```
- **Hasil Output yang Diharapkan:**
```output
Alex
```

### 2. `type Union = TypeA | TypeB`
- **Fungsi Utama:** Tipe gabungan multi-kondisi.
- **Parameter / Atribut:** `Dua atau lebih varian tipe data`.
- **Perilaku & Efek Sistem:** Membatasi variabel hanya boleh menerima salah satu nilai yang sah..
- **Contoh Penggunaan Praktis:**
```typescript
type Status = 'idle' | 'loading' | 'success';
let current: Status = 'loading';
console.log(current);
```
- **Hasil Output yang Diharapkan:**
```output
loading
```

### 3. `function genericFn<T>(arg: T): T`
- **Fungsi Utama:** Fungsi tipe dinamis aman (Generics).
- **Parameter / Atribut:** `Type Parameter T`.
- **Perilaku & Efek Sistem:** Membuat fungsi yang dapat menangani berbagai tipe data dengan tetap menjaga type safety..
- **Contoh Penggunaan Praktis:**
```typescript
function wrap<T>(val: T): { data: T } {
  return { data: val };
}
const box = wrap('Tryngo');
console.log(JSON.stringify(box));
```
- **Hasil Output yang Diharapkan:**
```output
{"data":"Tryngo"}
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Fungsi Utama:** Tipe utilitas transformasi bawaan.
- **Parameter / Atribut:** `Base Type T, Keys K`.
- **Perilaku & Efek Sistem:** Mengubah properti menjadi opsional (`Partial`) atau mengambil subset kolom tertentu..
- **Contoh Penggunaan Praktis:**
```typescript
interface Task { id: string; title: string; done: boolean; }
type UpdateDto = Partial<Task>;
const update: UpdateDto = { done: true };
console.log(update.done);
```
- **Hasil Output yang Diharapkan:**
```output
true
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

Kamu telah memahami static type checking, anotasi primitif, inference, dan union types. Minggu depan kita mempelajari Interface, Type Alias, dan Index Signatures.
