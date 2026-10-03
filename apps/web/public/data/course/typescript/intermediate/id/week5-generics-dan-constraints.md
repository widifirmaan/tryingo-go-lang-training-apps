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

Kamu telah menguasai Generics dan Generic Constraints. Minggu depan kita mempelajari Utility Types bawaan TypeScript: Partial, Required, Pick, Omit, dan Record.
