# Type Narrowing: typeof, instanceof, in & Custom Type Guards

> **Kategori:** TypeScript | **Level:** Pondasi Tipe & Type Narrowing | **Minggu 3:** Type Narrowing: typeof, instanceof, in & Custom Type Guards
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Control Flow Analysis dan Narrowing pada compiler TypeScript
- Menggunakan guard bawaan JavaScript: typeof, instanceof, dan in operator
- Merancang Discriminated Unions (Tagged Unions) menggunakan properti pembeda literal
- Menulis Custom Type Guard dengan sintaks predicate (parameter is T)
- Membedakan tipe any (tidak aman) dengan tipe unknown (tipe aman wajib dinarrowing)

---

## Program: Kalkulator Luas Bentuk Geometris & Mesin Validasi Transaksi

```typescript
// 1. Discriminated Union (Tagged Union)
interface Lingkaran {
  kind: "lingkaran";
  radius: number;
}

interface PersegiPanjang {
  kind: "persegi_panjang";
  panjang: number;
  lebar: number;
}

interface Segitiga {
  kind: "segitiga";
  alas: number;
  tinggi: number;
}

type BentukGeometri = Lingkaran | PersegiPanjang | Segitiga;

// 2. Type Narrowing via Discriminant Property
function hitungLuas(bentuk: BentukGeometri): number {
  switch (bentuk.kind) {
    case "lingkaran":
      return Math.PI * bentuk.radius ** 2;
    case "persegi_panjang":
      return bentuk.panjang * bentuk.lebar;
    case "segitiga":
      return 0.5 * bentuk.alas * bentuk.tinggi;
  }
}

// 3. Custom Type Guard (User-Defined Type Predicate: x is T)
interface PembayaranKredit {
  nomorKartu: string;
  cicilanBulan: number;
}

function isPembayaranKredit(item: any): item is PembayaranKredit {
  return typeof item === "object" && item !== null && "nomorKartu" in item && "cicilanBulan" in item;
}

const inputLuar: unknown = { nomorKartu: "4111-2222-3333-4444", cicilanBulan: 12 };

if (isPembayaranKredit(inputLuar)) {
  console.log("Kartu Terverifikasi. Cicilan:", inputLuar.cicilanBulan, "bulan");
}

const c: Lingkaran = { kind: "lingkaran", radius: 7 };
console.log("Luas Lingkaran (r=7):", hitungLuas(c).toFixed(2));
```

---

## Konsep Kunci

### Apa itu Type Narrowing?
Dalam TypeScript, variabel seringkali memiliki tipe gabungan (*Union*), misalnya `string | number` atau `BentukA | BentukB`. **Type Narrowing** adalah proses di mana compiler menganalisis cabang kode (*if/switch/guards*) dan mempersempit tipe variabel menjadi tipe spesifik yang pasti aman pada blok kode tersebut.

### Discriminated Unions (Pola Terbaik)
Discriminated Union adalah pola paling kuat dalam TypeScript untuk memodelkan *state* sistem. Setiap interface dalam union memiliki satu properti pembeda (*discriminant literal*) yang sama (misalnya `kind: "lingkaran"` atau `status: "success"`).
Saat Anda melakukan `switch (bentuk.kind)`, compiler langsung tahu 100% properti apa saja yang tersedia di dalam `case` tersebut!

### Custom Type Guards (`pet is Dog`)
Jika logika pengecekan tipe cukup rumit dan berasal dari data luar (misalnya respons API JSON), buatlah fungsi pemeriksa dengan nilai kembalian `arg is TargetType`:
```typescript
function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'id' in val;
}
```

---

---

## Penjelasan untuk Pemula

### Analogi: Jalur Bagasi Bandara
1. **Union type** seperti ban berjalan bagasi di bandara: ada koper kabin, koper bagasi roda, dan kotak kardus makanan campur aduk.
2. **Type Narrowing** seperti petugas bea cukai: jika koper memiliki stempel 'Fragile' (*discriminant*), ia diarahkan ke jalur manual; jika berbentuk kardus, diarahkan ke jalur pemeriksaan khusus.

## Eksperimen

- Hapus salah satu case dari switch di hitungLuas dan amati apakah TypeScript memberi peringatan.
- Coba akses bentuk.radius di dalam case "persegi_panjang" dan lihat erornya.
- Ubah inputLuar menjadi angka murni dan buktikan bahwa blok if tidak dieksekusi.
- Tambahkan bentuk baru "trapesium" ke dalam union dan perbaiki switch statement-nya.

---

## Tantangan

Rancang Discriminated Union `ApiResponse<T>` yang memiliki status "SUCCESS" (membawa data dan timestamp) atau "ERROR" (membawa pesan kesalahan dan kode eror HTTP). Tulis fungsi pemroses respons yang aman.

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

Kamu telah menguasai Control Flow Analysis, Discriminated Unions, dan Custom Type Guards. Minggu depan kita membahas Tuples, Const Enums, dan Exhaustive Checks dengan never.
