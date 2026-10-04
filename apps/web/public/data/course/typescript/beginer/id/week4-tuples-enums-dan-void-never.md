# Tuples, Const Enums vs As Const, serta Exhaustive Check dengan never

> **Kategori:** TypeScript | **Level:** Pondasi Tipe & Type Narrowing | **Minggu 4:** Tuples, Const Enums vs As Const, serta Exhaustive Check dengan never
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menggunakan Tuples untuk memodelkan baris data terstruktur dengan tipe dan urutan kaku
- Mengetahui kelemahan numeric enums tradisional dan cara kerja `as const` object
- Memahami tipe void (fungsi tanpa return) vs tipe never (fungsi yang tidak pernah selesai/mustahil tercapai)
- Menerapkan pola Exhaustive Checking dengan tipe never untuk mendeteksi missing case secara compile-time
- Membangun sistem penanganan eror yang 100% aman dari perubahan masa depan

---

## Program: Matriks Respons HTTP & Verifikasi Kelengkapan Alur Sistem

```typescript
// 1. Tuples: Array dengan Panjang & Urutan Tipe Tetap
type KoordinatGeo = [latitude: number, longitude: number];
type RekorTransaksi = [id: string, nominal: number, sukses: boolean];

const kantorPusat: KoordinatGeo = [-6.2088, 106.8456]; // Jakarta
const log1: RekorTransaksi = ["TX-100", 500000, true];

// 2. As Const Object vs Enums (Standar Modern)
export const LogLevel = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  CRITICAL: "CRITICAL"
} as const;

type TipeLogLevel = typeof LogLevel[keyof typeof LogLevel];

// 3. Exhaustive Check Menggunakan Tipe never
type PembayaranKanal = "QRIS" | "VIRTUAL_ACCOUNT" | "KARTU_KREDIT" | "GERAI_TUNAI";

function prosesBiayaAdmin(kanal: PembayaranKanal): number {
  switch (kanal) {
    case "QRIS":
      return 1500;
    case "VIRTUAL_ACCOUNT":
      return 4000;
    case "KARTU_KREDIT":
      return 7500;
    case "GERAI_TUNAI":
      return 2500;
    default:
      // Jika semua case terpenuhi, kode ini mustahil tercapai (bertipe never)
      const _exhaustiveCheck: never = kanal;
      throw new Error(`Kanal tidak dikenali: ${_exhaustiveCheck}`);
  }
}

console.log("Kantor:", kantorPusat[0], kantorPusat[1]);
console.log("Biaya QRIS:", prosesBiayaAdmin("QRIS"), "IDR");
console.log("Biaya Virtual Account:", prosesBiayaAdmin("VIRTUAL_ACCOUNT"), "IDR");
```

---

## Konsep Kunci

### Mengapa Komunitas Menghindari TypeScript `enum`?
`enum` tradisional di TypeScript menghasilkan kode JavaScript ekstra (*runtime overhead*) dan memiliki perilaku numeric enum yang longgar. Standar modern TypeScript lebih memilih objek biasa yang di-freeze dengan **`as const`**:
```typescript
const Role = { Admin: "ADMIN", Member: "MEMBER" } as const;
type RoleType = typeof Role[keyof typeof Role];
```
Pola ini 100% murni JavaScript dan memiliki performa kompilasi instan.

### Kekuatan Tipe `never` & Exhaustive Checking
Tipe `never` merepresentasikan nilai yang **tidak boleh ada**. Jika Anda memiliki union tipe dengan 4 opsi, dan Anda menulis `switch` untuk 4 opsi tersebut, maka di blok `default`, variabel tersebut bertipe `never`.
Jika di kemudian hari rekan tim menambahkan opsi ke-5 pada union tersebut (misal `"PAYLATER"`), compiler akan **langsung memunculkan eror kompilasi merah di blok default**, karena tipe `"PAYLATER"` tidak bisa dimasukkan ke dalam `never`!

---

---

## Penjelasan untuk Pemula

### Analogi: Pengaman Pintu Darurat & Resep Paten
1. **Tuple** seperti resep racikan sirup: botol pertama harus 200ml gula, botol kedua harus 50ml perisa, urutan tidak boleh terbalik.
2. **Exhaustive Check dengan never** seperti alarm pintu darurat otomatis: jika ada 4 skenario kebocoran pipa dan Anda hanya menyiapkan 3 tombol penutup, alarm sistem menyala merah dan pabrik menolak dioperasikan sebelum tombol ke-4 dipasang.

## Eksperimen

- Tambahkan kanal baru "PAYLATER" ke union PembayaranKanal dan amati eror merah di default switch.
- Coba tambahkan elemen ke-3 pada variabel kantorPusat dan perhatikan peringatan panjang tuple.
- Coba assign nilai string sembarangan ke variabel TipeLogLevel.
- Uji pemanggilan prosesBiayaAdmin dengan casting sembarangan (as any) untuk melihat runtime error default.

---

## Tantangan

Bangun sistem finite state machine pesanan: "CREATED" -> "PAID" -> "SHIPPED" -> "DELIVERED" atau "CANCELLED". Tulis fungsi transisi status dengan exhaustive checking yang mencegah perpindahan status ilegal.

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
```
- **Hasil Output yang Diharapkan:**
```text
Validasi kompilasi sukses 100% aman
```

### 2. `type Union = TypeA | TypeB`
- **Fungsi Utama:** Tipe gabungan multi-kondisi.
- **Parameter / Atribut:** `Dua atau lebih varian tipe data`.
- **Perilaku & Efek Sistem:** Membatasi variabel hanya boleh menerima salah satu nilai yang sah..
- **Contoh Penggunaan Praktis:**
```typescript
type Status = 'idle' | 'loading' | 'success';
let current: Status = 'loading';
```
- **Hasil Output yang Diharapkan:**
```text
Menolak nilai di luar 3 opsi literal yang ditentukan
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
```
- **Hasil Output yang Diharapkan:**
```text
{ data: 'Tryngo' }
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Fungsi Utama:** Tipe utilitas transformasi bawaan.
- **Parameter / Atribut:** `Base Type T, Keys K`.
- **Perilaku & Efek Sistem:** Mengubah properti menjadi opsional (`Partial`) atau mengambil subset kolom tertentu..
- **Contoh Penggunaan Praktis:**
```typescript
interface Task { id: string; title: string; done: boolean; }
type UpdateDto = Partial<Task>;
```
- **Hasil Output yang Diharapkan:**
```text
Semua kolom Task berubah menjadi opsional
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

Kamu telah menguasai fondasi tipe, narrowing, discriminated unions, dan exhaustive checks. Minggu depan kita memasuki Level 2: Generics & Utility Types.
