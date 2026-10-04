# Variabel Modern (const/let), 7 Tipe Primitif & Type Coercion

> **Kategori:** JavaScript | **Level:** Dasar Logika & Struktur Data | **Minggu 1:** Variabel Modern (const/let), 7 Tipe Primitif & Type Coercion
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami alasan pelarangan var dan selalu menggunakan const secara default serta let jika nilai berubah
- Menguasai 7 tipe data primitif JavaScript: string, number, bigint, boolean, undefined, symbol, dan null
- Memahami fenomena Type Coercion dan mengapa loose equality (==) berbahaya bagi logika bisnis
- Selalu menggunakan operator kesetaraan ketat (=== dan !==) dalam setiap percabangan logika
- Menggunakan typeof untuk memeriksa tipe data variabel secara runtime

---

## Program: Kalkulator Kasir & Verifikasi Tipe Data Primitif

```javascript
// 1. Deklarasi Modern: const (default) vs let (re-assignable)
const namaToko = "Nusa Tech Store";
let kuotaStok = 45;
kuotaStok = kuotaStok - 5; // Valid dengan let

// 2. Tujuh Tipe Data Primitif JavaScript
const hargaProduk = 1250000;              // number
const pajakPersen = 0.11;                 // number (float)
const namaBarang = 'Monitor 24" 100Hz';   // string
const sedangPromo = true;                 // boolean
let diskonKhusus = null;                  // null (sengaja kosong)
let catatanKasir;                         // undefined (belum diisi)
const idUnik = Symbol("id-transaksi");     // symbol (pasti unik)
const tokenBig = 9007199254740991n + 5n;  // bigint (angka raksasa)

// 3. Kalkulasi dan Pengecekan Tipe Data
const nominalPajak = hargaProduk * pajakPersen;
const totalAkhir = hargaProduk + nominalPajak;

console.log("=== Struk Transaksi " + namaToko + " ===");
console.log("Barang      : " + namaBarang);
console.log("Harga Dasar : Rp " + hargaProduk.toLocaleString("id-ID"));
console.log("Pajak (11%) : Rp " + nominalPajak.toLocaleString("id-ID"));
console.log("Total Bayar : Rp " + totalAkhir.toLocaleString("id-ID"));

// 4. Bahaya Type Coercion (Konversi Implisit) & Solusi Strict Equality (===)
console.log("\n=== Evaluasi Tipe & Strict Equality ===");
console.log("type of hargaProduk :", typeof hargaProduk); // "number"
console.log("type of namaBarang  :", typeof namaBarang);  // "string"
console.log("type of diskonKhusus:", typeof diskonKhusus); // "object" (kebiasaan historis JS)

const angka = 42;
const teks = "42";
console.log("angka == teks  (Loose equality):", angka == teks);   // true (koersi otomatis berbahaya)
console.log("angka === teks (Strict equality):", angka === teks); // false (tipe beda ditolak!)
```

---

## Konsep Kunci

### Kematian var: const vs let
Di JavaScript modern (ES6+), keyword \`var\` sudah ditinggalkan karena memiliki cakupan fungsi (*function-scoped*) yang rentan bocor dan mengizinkan deklarasi ulang variabel yang sama tanpa peringatan.
- **\`const\`**: Gunakan untuk 90% variabel Anda. Nilainya tidak dapat di-reassign, melindungi integritas memori.
- **\`let\`**: Gunakan hanya jika nilai variabel memang akan diubah ulang di alur berikutnya (misal: pencacah loop atau total akumulasi).

### 7 Tipe Primitif di Memori
Tipe data primitif disimpan langsung di stack memori secara *immutable* (nilainya tidak bisa diubah di tempat):
1. \`number\`: Merepresentasikan bilangan bulat dan desimal berbasis IEEE 754 64-bit float.
2. \`string\`: Rangkaian karakter teks.
3. \`boolean\`: Nilai logika \`true\` atau \`false\`.
4. \`undefined\`: Variabel telah dideklarasikan tetapi belum pernah diberi nilai.
5. \`null\`: Nilai kosong yang sengaja diberikan untuk menandakan "tidak ada objek".
6. \`bigint\`: Menangani bilangan bulat di atas batas aman \`Number.MAX_SAFE_INTEGER\` ($2^{53} - 1$).
7. \`symbol\`: Pengenal unik yang dijamin tidak akan pernah bentrok.

### Mengapa Selalu Pakai === ?
Operator \`==\` (*loose equality*) melakukan konversi tipe data otomatis secara diam-diam di belakang layar. Contohnya: \`"" == 0\` bernilai \`true\`, dan \`false == "0"\` bernilai \`true\`! Ini adalah celah bug terbesar dalam JavaScript pemula. Operator \`===\` (*strict equality*) memeriksa tipe data DAN nilainya sekaligus tanpa toleransi.

---

---

## Penjelasan untuk Pemula

### Analogi: Kotak Brankas dan Label Wadah
1. **`const`** seperti kotak brankas kaca bersegel: Anda memasukkan emas ke dalamnya dan menguncinya permanen. Anda bisa melihat isinya, tapi tidak bisa mengganti emas tersebut dengan benda lain.
2. **`let`** seperti toples kue di dapur: hari ini bisa diisi biskuit cokelat, besok kuenya habis bisa diisi ulang kacang mede.
3. **`undefined` vs `null`**: \`undefined\` adalah toples kosong yang baru Anda beli dari toko dan belum pernah Anda sentuh; \`null\` adalah toples yang sengaja Anda buka dan bersihkan untuk menandakan: "Toples ini sengaja saya kosongkan untuk pesanan besok".
4. **`===`** seperti petugas keamanan bank yang memeriksa KTP asli DAN mencocokkan wajah orangnya langsung, bukan sekadar melihat foto fotokopian buram (\`==\`).

## Eksperimen

- Coba ubah nilai variabel const namaToko di baris bawahnya dan amati pesan error TypeError: Assignment to constant variable.
- Uji operasi "5" - 2 dan "5" + 2 di konsol, amati bagaimana tanda minus memicu matematika (hasil 3) sedangkan tanda plus memicu penggabungan teks (hasil "52").
- Periksa typeof NaN (Not a Number) di konsol dan temukan fakta unik bahwa tipenya adalah "number".
- Bandingkan null == undefined (true) dengan null === undefined (false) untuk membuktikan perbedaan operator kesetaraan.

---

## Tantangan

Buat kalkulator konversi mata uang: tetapkan `const kursUsd = 16250`. Buat variabel saldo rupiah, hitung nilai konversi ke USD, gunakan `Math.floor()` untuk membulatkan, dan cetak perbandingan tipe data menggunakan operator `===`.

---

## Model Mental & Diagram Alur Visual

![Diagram JavaScript Event Loop & Asynchronous Architecture](/diagrams/js-event-loop.svg)

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

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok.
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak diubah; `let` untuk nilai dinamis reassignable..
- **Contoh Penggunaan Praktis:**
```javascript
const app = 'Tryngo';
let count = 0;
count += 1;
console.log(app, count);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical this.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup luar..
- **Contoh Penggunaan Praktis:**
```javascript
const square = (n) => n * n;
console.log(square(7));
```
- **Hasil Output yang Diharapkan:**
```text
49
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron linear.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Membaca data HTTP API secara asinkron tanpa callback hell..
- **Contoh Penggunaan Praktis:**
```javascript
async function loadData() {
  const res = await fetch('https://api.example.com/data');
  return await res.json();
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan data JSON dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional immutable.
- **Parameter / Atribut:** `callback(item, index)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring data..
- **Contoh Penggunaan Praktis:**
```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);
```
- **Hasil Output yang Diharapkan:**
```text
[2, 4]
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Perilaku Equality Lemah (== vs ===)
- **Gejala / Masalah:** Coercion tipe data tak terduga (misal `0 == ''` bernilai `true`).
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan operator strict equality (`===` dan `!==`).

### 2. Mutasi Objek & Array secara Langsung
- **Gejala / Masalah:** Perubahan state tidak terdeteksi oleh reactive framework atau memicu bug sampingan tak terduga.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan spread operator (`{ ...obj }`, `[...arr]`) atau metode immutable seperti `.map()`, `.filter()`, dan `.toSorted()`.

### 3. Unhandled Promise Rejection & Async/Await tanpa Try-Catch
- **Gejala / Masalah:** Aplikasi crash atau thread backend macet tanpa log error yang jelas.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus `await` dalam blok `try { ... } catch (err) { ... }`.

---

## Ringkasan

Kamu telah menguasai variabel modern const/let, 7 tipe data primitif, dan pencegahan bug type coercion. Minggu depan kita akan mendalami struktur kontrol alur percabangan dan perulangan modern.
