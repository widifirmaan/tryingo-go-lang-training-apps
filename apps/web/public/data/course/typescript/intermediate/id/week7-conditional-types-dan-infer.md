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

Kamu telah menguasai Conditional Types, infer, dan Template Literal Types. Minggu depan kita memasuki Level 3: Mapped Types, keyof, dan arsitektur State Store.
