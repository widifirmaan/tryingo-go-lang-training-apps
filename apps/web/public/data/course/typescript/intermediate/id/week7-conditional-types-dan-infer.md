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

Kamu telah menguasai Conditional Types, infer, dan Template Literal Types. Minggu depan kita memasuki Level 3: Mapped Types, keyof, dan arsitektur State Store.
