# Generics: Fungsi Generik, Interfaces & Type Constraints (extends)

> **Kategori:** TypeScript | **Level:** Generics & Utility Types Modern | **Minggu 5:** Generics: Fungsi Generik, Interfaces & Type Constraints (extends)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami esensi Generics sebagai parameter penampung tipe (*type variables*)
- Menulis fungsi dan antarmuka generik yang dapat digunakan kembali untuk berbagai tipe data
- Menerapkan Type Constraints menggunakan kata kunci `extends` untuk membatasi kapabilitas tipe
- Membangun arsitektur Repository Pattern generik dengan pemeliharaan keamanan tipe penuh
- Mencegah duplikasi kode tanpa mengorbankan ketelitian static checking

---

## Program: Repository Data In-Memory & Pipeline Paginated Response

```typescript
// 1. Generic Interface untuk Kontrak Data Terpaginasi
interface ApiResponse<TData> {
  sukses: boolean;
  data: TData;
  pesan?: string;
  waktuRespon: number;
}

interface EntitasDasar {
  id: string;
  dibuatPada: Date;
}

// 2. Generic Class dengan Constraint (TData extends EntitasDasar)
class RepositoryInMemory<TEntity extends EntitasDasar> {
  private items: Map<string, TEntity> = new Map();

  simpan(item: TEntity): TEntity {
    this.items.set(item.id, item);
    return item;
  }

  cariBerdasarkanId(id: string): TEntity | undefined {
    return this.items.get(id);
  }

  ambilSemua(): TEntity[] {
    return Array.from(this.items.values());
  }
}

// 3. Implementasi Konkret
interface PortofolioSaham extends EntitasDasar {
  simbolEmiten: string;
  jumlahLembar: number;
  hargaRataRata: number;
}

const repoSaham = new RepositoryInMemory<PortofolioSaham>();

repoSaham.simpan({
  id: "PF-01",
  simbolEmiten: "BBCA",
  jumlahLembar: 2500,
  hargaRataRata: 9800,
  dibuatPada: new Date()
});

const hasil = repoSaham.cariBerdasarkanId("PF-01");
console.log("Saham Terdaftar:", hasil?.simbolEmiten, "| Lembar:", hasil?.jumlahLembar);
```

---

## Konsep Kunci

### Mengapa Kita Membutuhkan Generics?
Tanpa generics, Anda hanya punya dua pilihan buruk:
1. Menulis fungsi duplikat untuk setiap tipe data (`simpanUser`, `simpanSaham`, `simpanProduk`).
2. Menggunakan tipe `any` yang menghancurkan semua keunggulan keamanan tipe TypeScript.
**Generics** memungkinkan Anda menulis cetak biru fungsi atau kelas yang menerima tipe data sebagai argumen (`<T>`), seperti parameter fungsi menerima nilai data.

### Generic Constraints (`<T extends EntitasDasar>`)
Seringkali kita tidak ingin tipe `T` benar-benar bebas tanpa batas. Misalnya, repository membutuhkan setiap objek yang disimpan wajib memiliki properti `id: string`.
Dengan menulis `<T extends EntitasDasar>`, kita mengunci bahwa tipe apapun yang dimasukkan **wajib memiliki properti minimal yang ada di `EntitasDasar`**, namun tetap mempertahankan identitas tipe aslinya.

---

---

## Penjelasan untuk Pemula

### Analogi: Kotak Kontainer Kargo Standar ISO
1. **Fungsi biasa tanpa Generics** seperti truk khusus yang hanya bisa mengangkut kulkas tertentu: jika ingin mengangkut mesin cuci, Anda harus membeli truk baru.
2. **Generics** seperti sistem kontainer pengapalan modern (ISO shipping container): kapal pengangkut didesain memuat kotak berukuran standar. Kotak tersebut bisa diisi mobil, beras, atau elektronik, dan kapal mengangkutnya dengan keamanan sempurna tanpa perlu peduli isi spesifiknya.

## Eksperimen

- Coba simpan objek ke repoSaham tanpa properti id dan amati pesan eror compile-time.
- Buat interface baru KriptoAset (extends EntitasDasar) dan buat repository terpisah.
- Tulis fungsi generik sederhana balikkanArray<T>(items: T[]): T[].
- Uji apa yang terjadi jika Anda memanggil repoSaham.simpan({ id: "1" } as any).

---

## Tantangan

Buat kelas generik `StackAntrean<T>` dengan method `push(item: T)`, `pop(): T | undefined`, `peek(): T | undefined`, dan `size(): number`. Pastikan tipe data yang keluar selalu identik dengan yang masuk.

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

Kamu telah menguasai Generics dan Generic Constraints. Minggu depan kita mempelajari Utility Types bawaan TypeScript: Partial, Required, Pick, Omit, dan Record.
