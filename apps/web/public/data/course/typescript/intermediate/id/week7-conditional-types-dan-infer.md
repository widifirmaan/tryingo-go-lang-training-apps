# Conditional Types, infer Keyword & Template Literal Types

> **Kategori:** TypeScript | **Level:** Generics & Utility Types Modern | **Minggu 7:** Conditional Types, infer Keyword & Template Literal Types
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami logika percabangan tipe dengan Conditional Types (T extends U ? X : Y)
- Menggunakan kata kunci `infer` untuk mengekstrak tipe elemen internal dari struktur kompleks
- Membangun utilitas unwrap tipe Promise dan Array kustom
- Menggunakan Template Literal Types untuk memvalidasi string berpola (misal event name, CSS selector)
- Menghindari kesalahan ketik nama event pada arsitektur sistem berbasis pub/sub

---

## Program: Mesin Pembongkar Tipe Asinkron & Event Dispatcher Tipe-Ketat

```typescript
// 1. Conditional Types: T extends U ? X : Y
type CekTipeData<T> = T extends string ? "Ini Teks" : "Bukan Teks";

type Uji1 = CekTipeData<string>; // "Ini Teks"
type Uji2 = CekTipeData<number>; // "Bukan Teks"

// 2. infer: Membongkar / Menembus Tipe Dalam Promise (Unwrap Promise)
type BongkarPromise<T> = T extends Promise<infer U> ? U : T;

type DataAsinkron = Promise<{ id: string; saldo: number }>;
type DataBersih = BongkarPromise<DataAsinkron>; // { id: string; saldo: number }

// 3. Template Literal Types (Membangun Format String Dinamis)
type AksiSistem = "buat" | "perbarui" | "hapus";
type EntitasSistem = "pengguna" | "transaksi" | "portofolio";

// Hasil: "buat:pengguna" | "buat:transaksi" | "perbarui:pengguna" | dst...
type NamaEventPublik = `${AksiSistem}:${EntitasSistem}`;

class EventBusKetat {
  private listener: Map<string, Function[]> = new Map();

  on(event: NamaEventPublik, handler: (payload: any) => void) {
    const list = this.listener.get(event) || [];
    list.push(handler);
    this.listener.set(event, list);
  }

  emit(event: NamaEventPublik, payload: any) {
    const list = this.listener.get(event) || [];
    list.forEach(fn => fn(payload));
  }
}

const bus = new EventBusKetat();
bus.on("buat:transaksi", (data) => {
  console.log("Event diterima:", data);
});

bus.emit("buat:transaksi", { id: "TX-77", nominal: 250000 });
```

---

## Konsep Kunci

### Logika 'If-Else' di Level Tipe
Conditional Types membawa logika percabangan (*if-else*) ke dalam compiler TypeScript:
```typescript
type NonNullableCustom<T> = T extends null | undefined ? never : T;
```
Jika `T` adalah `null` atau `undefined`, ia dibuang (`never`), jika bukan, ia dipertahankan.

### Keajaiban Kata Kunci `infer`
Kata kunci `infer` digunakan di dalam klausa kondisional untuk **menebak atau mengekstrak tipe variabel yang berada di dalam pembungkus**.
Misalnya: jika Anda menerima `Promise<User>`, bagaimana cara mendapatkan tipe `User`-nya saja tanpa pembungkus Promise?
Dengan `T extends Promise<infer U> ? U : T`, TypeScript secara otomatis memasukkan isi tipe ke dalam variabel bayangan `U` dan mengembalikannya!

### Template Literal Types
Sejak TypeScript 4.1, Anda bisa menggabungkan union string persis seperti template string JavaScript:
```typescript
type HttpMethod = 'GET' | 'POST';
type Endpoint = '/users' | '/orders';
type Route = `${HttpMethod} ${Endpoint}`; // "GET /users" | "POST /users" | ...
```

---

---

## Penjelasan untuk Pemula

### Analogi: Pembuka Paket Hadiah & Stempel Tiket
1. **`infer`** seperti mesin pemindai sinar-X paket pos: jika paketnya berupa kardus berbungkus pita (*Promise*), mesin membongkar kardus dan mengeluarkan isi barang di dalamnya.
2. **Template Literal Types** seperti stempel kombinasi tanggal dan kota di paspor: ada bagian hari, bulan, dan negara asal yang digabungkan otomatis menjadi format baku yang tidak bisa dipalsukan.

## Eksperimen

- Coba panggil bus.emit("buat:barang_palsu" as any) dan lihat mengapa nama event harus sesuai pola.
- Uji BongkarPromise dengan tipe non-promise seperti string murni dan amati hasil kembaliannya.
- Buat template literal type untuk kode warna hex yang diawali dengan tanda pagar: `#${string}`.
- Buat utilitas EkstrakArray<T> yang meng-infer tipe isi array: T extends (infer E)[] ? E : T.

---

## Tantangan

Tulis tipe kondisional `Flatten<T>` yang dapat membongkar array multi-dimensi (misal `number[][][]` menjadi `number`). Tambahkan penanganan untuk tipe data primitif biasa.

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

Kamu telah menguasai Conditional Types, infer, dan Template Literal Types. Minggu depan kita memasuki Level 3: Mapped Types, keyof, dan arsitektur State Store.
