# Interface vs Type Alias, Optional, Readonly & Index Signatures

> **Kategori:** TypeScript | **Level:** Pondasi Tipe & Type Narrowing | **Minggu 2:** Interface vs Type Alias, Optional, Readonly & Index Signatures
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan dan kapan memilih interface vs type alias
- Menggunakan modifier readonly untuk menjamin data tidak bisa dimutasi sembarangan
- Menggunakan properti opsional (?) untuk menangani atribut yang belum tentu ada
- Menggabungkan kontrak data menggunakan Intersection Types (&) dan interface extends
- Membuat struktur kamus kunci-nilai dinamis dengan Index Signatures

---

## Program: Kontrak Profil Akun Pengguna & Kamus Kurs Dinamis

```typescript
// 1. Interface dengan Properti Opsional (?) dan Readonly
interface ProfilPengguna {
  readonly id: string;         // Tidak bisa diubah setelah dibuat
  nama: string;
  email: string;
  nomorTelepon?: string;      // Opsional (bisa undefined)
  tanggalDaftar: Date;
}

// 2. Type Alias dengan Intersection (&)
type MetadataAudit = {
  diubahTerakhir: Date;
  versi: number;
};

type AkunMember = ProfilPengguna & MetadataAudit & {
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
};

// 3. Index Signature untuk Dictionary Dinamis
interface TabelKursMataUang {
  readonly tanggalKurs: string;
  [kodeMataUang: string]: number | string; // Dinamis menampung kode valas apapun
}

const kursHariIni: TabelKursMataUang = {
  tanggalKurs: "2026-10-03",
  USD: 16250,
  EUR: 17500,
  SGD: 12200,
  JPY: 110.5
};

const user1: AkunMember = {
  id: "USR-001",
  nama: "Budi Pratama",
  email: "budi@nusa.id",
  tanggalDaftar: new Date(),
  diubahTerakhir: new Date(),
  versi: 1,
  tier: "GOLD"
};

console.log("Pengguna Terdaftar:", user1.nama, "| Tier:", user1.tier);
console.log("Kurs USD ke IDR:", kursHariIni["USD"]);
```

---

## Konsep Kunci

### Interface vs Type Alias
- **`interface`**: Digunakan terutama untuk mendefinisikan bentuk objek (*shape of an object*) dan kontrak OOP. Interface mendukung *declaration merging* (dapat dideklarasikan ulang untuk menambah properti).
- **`type alias`**: Jauh lebih fleksibel. Bisa merepresentasikan union, primitif, tuples, dan fungsi selain bentuk objek.
Sebagai aturan baku industri: gunakan `interface` untuk mendefinisikan entitas objek domain, dan gunakan `type` untuk union, fungsi, dan manipulasi tipe kompleks.

### Readonly & Optional Properties
- `readonly id: string`: Mencegah *re-assignment* `user.id = "lain"`. Memberikan kepastian integritas ID.
- `nomorTelepon?: string`: Menandai bahwa properti bisa bertipe `string | undefined`.

### Index Signatures
Saat Anda tidak mengetahui semua nama kunci di muka (misalnya tabel nilai tukar valuta asing atau cache memori), gunakan *index signature*:
```typescript
interface CacheStore {
  [key: string]: string | number;
}
```

---

---

## Penjelasan untuk Pemula

### Analogi: Formulir Paspor & Buku Alamat
1. **Interface** seperti formulir blangko pembuatan paspor: ada kolom wajib (Nama, NIK) dan kolom opsional (Gelar, Nama Panggilan). Kolom NIK bertuliskan tinta permanen (*readonly*).
2. **Index Signature** seperti buku catatan nomor telepon kosong: Anda bebas menulis nama kontak apa saja di sisi kiri (*key*), dan nomor telepon di sisi kanan (*value*).

## Eksperimen

- Coba ubah user1.id = "USR-999" dan perhatikan bagaimana TypeScript menolaknya.
- Hapus properti email dari user1 dan baca pesan eror missing property dari compiler.
- Tambahkan mata uang baru seperti "GBP": 20800 ke kursHariIni.
- Kombinasikan dua interface menggunakan kata kunci extends.

---

## Tantangan

Rancang interface `ProdukInventaris` dengan SKU readonly, nama, harga, stok, dan tag kategori opsional. Buat interface turunan `ProdukDiskon` yang menambahkan persentase diskon dan fungsi kalkulasi harga bersih.

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

Kamu telah menguasai Interface, Type Alias, Readonly, Optional, dan Index Signatures. Minggu depan kita mempelajari Type Narrowing dan Type Guards.
