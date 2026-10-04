# Fungsi Kelas Satu, Arrow Functions, Scope & Closures

> **Kategori:** JavaScript | **Level:** Dasar Logika & Struktur Data | **Minggu 3:** Fungsi Kelas Satu, Arrow Functions, Scope & Closures
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami bahwa fungsi di JavaScript adalah First-Class Citizens (dapat disimpan di variabel dan dioper sebagai argumen)
- Menguasai sintaks Arrow Functions, parameter default, dan fitur implicit return
- Memahami Lexical Scope: bagaimana fungsi mengakses variabel di lingkungan tempat ia didefinisikan
- Menguasai konsep Closure: kemampuan fungsi dalam mengingat variabel luar bahkan setelah fungsi luar selesai dijalankan
- Membuat fungsi pabrik (Factory Functions) untuk enkapsulasi state privat tanpa variabel global

---

## Program: Pabrik Generator Diskon (Discount Factory) dengan Closure

```javascript
// 1. Function Declaration Tradisional vs Arrow Function Modern
function hitungTotal(harga, kuantitas = 1) {
  return harga * kuantitas;
}

// Arrow function ringkas dengan implicit return
const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

// 2. Fungsi sebagai First-Class Citizen (Bisa dijadikan argumen)
const terapkanBiayaLayanan = (subtotal, fungsiFormat, tarifAdmin = 5000) => {
  const totalAkhir = subtotal + tarifAdmin;
  return fungsiFormat(totalAkhir);
};

console.log("Total Belanja Dasar  :", formatRupiah(hitungTotal(75000, 2)));
console.log("Dengan Biaya Layanan :", terapkanBiayaLayanan(150000, formatRupiah));

// 3. Konsep Lanjutan: Lexical Scope & Closure
// Fungsi luar mengingat variabel lingkungannya meskipun sudah selesai dieksekusi!
function buatKalkulatorDiskon(persenDiskon) {
  const faktorPengali = 1 - (persenDiskon / 100);

  // Fungsi anak (closure) mempertahankan akses ke faktorPengali
  return function(hargaAsli) {
    const hargaDiskon = hargaAsli * faktorPengali;
    return formatRupiah(hargaDiskon);
  };
}

// Membuat generator diskon khusus
const diskonMemberVIP = buatKalkulatorDiskon(20); // Diskon 20%
const diskonFlashSale = buatKalkulatorDiskon(50); // Diskon 50%

console.log("\n=== Eksekusi Engine Closure ===");
const hargaLaptop = 10000000;
console.log("Harga Normal :", formatRupiah(hargaLaptop));
console.log("Member VIP   :", diskonMemberVIP(hargaLaptop)); // Memakai diskon 20%
console.log("Flash Sale   :", diskonFlashSale(hargaLaptop)); // Memakai diskon 50%
```

---

## Konsep Kunci

### First-Class Functions
Di JavaScript, fungsi diperlakukan sama seperti tipe data lainnya: dapat disimpan di dalam variabel, dimasukkan ke dalam array, menjadi properti objek, dan dioperkan ke dalam fungsi lain sebagai argumen (*callback*).

### Arrow Functions vs Deklarasi Tradisional
Arrow functions (\`() => {}\`) diperkenalkan di ES6 dengan dua keunggulan utama:
1. **Sintaks Ringkas**: Jika fungsi hanya memiliki 1 baris ekspresi, tanda kurung kurawal dan kata kunci \`return\` dapat dihilangkan (*implicit return*).
2. **Lexical \`this\`**: Arrow function tidak membuat konteks \`this\` sendiri, melainkan mewarisi \`this\` dari lingkungan luar tempat ia dibuat.

### Misteri Closure
Closure adalah salah satu konsep terpenting dalam JavaScript. Ketika sebuah fungsi didefinisikan di dalam fungsi lain, fungsi dalam tersebut **mengikat salinan memori lingkungan luar tempat ia lahir (*lexical environment*)**. 
Meskipun fungsi \`buatKalkulatorDiskon()\` sudah selesai dieksekusi dan keluar dari call stack, variabel \`faktorPengali\` tetap hidup di heap memori karena masih direferensikan oleh fungsi anak. Inilah dasar dari encapsulation dan privasi data di JavaScript!

---

---

## Penjelasan untuk Pemula

### Analogi: Mesin Pembuat Stempel Otomatis
1. **Fungsi Biasa** seperti kalkulator saku: Anda memencet angka, hasilnya keluar, lalu kalkulator lupa angka tadi.
2. **Closure** seperti memesan stempel kustom di percetakan: Anda memesan "Tolong buatkan stempel diskon 20%". Percetakan mencetak stempel berlabel '20%' (**`buatKalkulatorDiskon(20)`**). Kapan pun stempel itu Anda bawa pulang dan Anda capkan ke buku nota apapun, stempel itu selalu mengingat rumus 20% miliknya sendiri.

## Eksperimen

- Buat kalkulator diskon baru diskonKaryawan = buatKalkulatorDiskon(30) dan uji apakah nilainya independen dari diskon VIP.
- Coba ubah arrow function implicit return menjadi kurung kurawal {} tanpa kata kunci return, dan amati mengapa hasilnya menjadi undefined.
- Periksa variabel faktorPengali langsung dari luar fungsi console.log(faktorPengali) untuk memverifikasi bahwa variabel tersebut privat dan terlindungi dari scope global.
- Buat fungsi pencacah id otomatis menggunakan closure: setiap kali dipanggil, angka id bertambah +1.

---

## Tantangan

Buat fungsi pabrik rekening bank `buatAkunBank(nama, saldoAwal)`: simpan saldo di dalam closure privat. Kembalikan objek yang memiliki method `setor(jumlah)`, `tarik(jumlah)`, dan `cekSaldo()`. Pastikan saldo tidak bisa diubah langsung dari luar tanpa melalui method.

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

Kamu telah menguasai fungsi kelas satu, arrow functions, lexical scope, dan closures. Minggu depan kita akan mendalami manipulasi data array modern menggunakan pipeline fungsional map, filter, dan reduce.
