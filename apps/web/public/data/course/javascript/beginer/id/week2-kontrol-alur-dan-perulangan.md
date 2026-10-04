# Kontrol Alur: Percabangan Logika, Ternary & Perulangan for...of

> **Kategori:** JavaScript | **Level:** Dasar Logika & Struktur Data | **Minggu 2:** Kontrol Alur: Percabangan Logika, Ternary & Perulangan for...of
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai percabangan if, else if, dan else dengan operator logika Boolean (&&, ||, !)
- Menggunakan Operator Ternary (? :) secara bersih untuk penugasan nilai ringkas tanpa if bertumpuk
- Menulis perulangan modern for...of untuk menjelajah elemen array secara elegan
- Memahami evaluasi switch-case dengan penanganan multi-kondisi dan klausul default wajib
- Memahami konsep Truthy dan Falsy values dalam evaluasi kondisi JavaScript

---

## Program: Sistem Filter Transaksi & Verifikasi Hak Akses

```javascript
// 1. Array Data Transaksi Sederhana
const transaksi = [
  { id: "TRX-01", nominal: 450000, status: "SUCCESS" },
  { id: "TRX-02", nominal: 1200000, status: "PENDING" },
  { id: "TRX-03", nominal: 850000, status: "SUCCESS" },
  { id: "TRX-04", nominal: 2500000, status: "FAILED" },
  { id: "TRX-05", nominal: 300000, status: "SUCCESS" }
];

console.log("=== Laporan Audit Transaksi ===");

let totalPendapatan = 0;
let jumlahSukses = 0;

// 2. Perulangan Modern for...of (Bersih & Mudah Dibaca)
for (const item of transaksi) {
  // 3. Percabangan dengan Operator Logika Bersarang
  if (item.status === "SUCCESS") {
    totalPendapatan += item.nominal;
    jumlahSukses++;
    console.log("[LUNAS]  " + item.id + " : Rp " + item.nominal.toLocaleString("id-ID"));
  } else if (item.status === "PENDING") {
    console.log("[MENUNGGU] " + item.id + " : Menunggu konfirmasi gateway");
  } else {
    console.log("[GAGAL]  " + item.id + " : Transaksi ditolak bank");
  }
}

// 4. Operator Ternary Modern untuk Keputusan Cepat
const statusSistem = jumlahSukses >= 3 ? "Kondisi Sehat" : "Peringatan Anomali";
console.log("\nStatus Operasional Gateway:", statusSistem);
console.log("Total Kas Masuk           : Rp " + totalPendapatan.toLocaleString("id-ID"));

// 5. Evaluasi Hak Akses dengan Switch Case
const peranPengguna = "ADMIN";

switch (peranPengguna) {
  case "SUPERADMIN":
  case "ADMIN":
    console.log("Otorisasi: Akses penuh untuk merevisi dan menghapus transaksi.");
    break;
  case "AUDITOR":
    console.log("Otorisasi: Hak akses baca (read-only) untuk laporan keuangan.");
    break;
  default:
    console.log("Otorisasi: Akses ditolak. Silakan hubungi tim IT Security.");
    break;
}
```

---

## Konsep Kunci

### Falsy Values di JavaScript
Dalam percabangan \`if (kondisi)\`, JavaScript mengevaluasi nilai menjadi Boolean. Ada tepat **8 nilai yang selalu Falsy** (dianggap salah):
1. \`false\`
2. \`0\` dan \`-0\`
3. \`0n\` (BigInt nol)
4. \`""\` (string kosong)
5. \`null\`
6. \`undefined\`
7. \`NaN\` (Not-a-Number)
8. \`document.all\` (historis)
Semua nilai selain 8 nilai di atas (termasuk array kosong \`[]\` dan objek kosong \`{}\`) dianggap **Truthy**!

### Operator Ternary: Ringkas & Bersih
Alih-alih menulis 5 baris:
\`\`\`javascript
let pesan;
if (umur >= 17) { pesan = "Dewasa"; } else { pesan = "Anak-anak"; }
\`\`\`
Gunakan ternary dalam 1 baris ekspresi:
\`\`\`javascript
const pesan = umur >= 17 ? "Dewasa" : "Anak-anak";
\`\`\`

### Mengapa for...of Menggantikan for Tradisional?
Perulangan \`for (let i = 0; i < arr.length; i++)\` rawan kesalahan perhitungan indeks (*off-by-one error*). Sintaks \`for (const item of koleksi)\` langsung mengekstrak objek item tanpa perlu mengelola variabel pencacah indeks manual.

---

---

## Penjelasan untuk Pemula

### Analogi: Gerbang Tol Otomatis
1. **`if/else`** seperti gardu pintu tol: palang tol membaca kartu e-toll Anda. JIKA saldo cukup, palang terbuka hijau. JIKA TIDAK, alarm merah menyala dan mobil harus menepi.
2. **`for...of`** seperti deretan mobil yang antre masuk tol: setiap mobil dipanggil bergiliran satu demi satu dari depan sampai mobil paling belakang selesai dilayani.
3. **Operator Ternary** seperti lampu indikator sederhana di dashboard: mesin menyala hijau atau mati merah, hanya dua kemungkinan instan.

## Eksperimen

- Uji Truthy/Falsy: ganti kondisi if dengan if ([]) dan perhatikan bahwa array kosong dievaluasi sebagai true.
- Lupa menulis kata kunci break pada salah satu case di switch, dan amati fenomena fall-through di mana case di bawahnya ikut dieksekusi tanpa sengaja.
- Ganti for...of dengan perulangan for klasik menggunakan indeks i, lalu bandingkan kemudahan pembacaan kodenya.
- Ubah status semua transaksi menjadi FAILED dan amati bagaimana operator ternary mengubah status operasional menjadi "Peringatan Anomali".

---

## Tantangan

Buat sistem penilaian kelulusan siswa: buat array berisi 5 objek siswa (nama, nilai matematika, nilai coding). Gunakan perulangan `for...of` dan ternary untuk menentukan apakah siswa lulus (keduanya $\ge 70$), hitung rata-rata kelas, dan cetak daftar nama siswa berprestasi.

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

Kamu telah menguasai percabangan logika, evaluasi Truthy/Falsy, operator ternary, dan perulangan for...of. Minggu depan kita akan mendalami fungsi modern, arrow functions, scope, dan closures.
