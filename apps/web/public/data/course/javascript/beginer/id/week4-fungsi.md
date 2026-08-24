# Fungsi — Resep yang Bisa Dipakai Ulang

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 4:** Fungsi

## Tujuan Pembelajaran

- Membuat resep dengan `function` dan panah `=>` — tulis sekali, pakai 100 kali
- Kirim bahan via **parameter**, dapat hasil via **return**
- Nilai default `nama = "Tamu"` dan sisa bahan `...angka`
- Fungsi sebagai hadiah: **callback** `proses(data, fn)` dan **closure** (fungsi ingat kotak luar)

---

## Kenapa Ini Penting Buat Kamu?

Warung punya resep "hitung total + diskon + ongkir". Tanpa fungsi, kamu tulis rumus 20x. Dengan fungsi `hitungTotal(belanja, diskon)` tulis sekali, panggil `hitungTotal(keranjangA)` dan `hitungTotal(keranjangB)` — **anti copy-paste, anti salah**.

---

## Program: Dapur Fungsi Warung

```javascript
// 1. Deklarasi — resep resmi
function sapa(nama) {
  return `Halo, ${nama}! Selamat belanja`;
}
console.log(sapa("Budi"));
console.log(sapa("Siti"));

// 2. Expression & Arrow — resep cepat
const tambah = function(a, b) { return a + b; };
const kali = (a, b) => a * b; // panah 1 baris → otomatis return
const bagi = (a, b) => {
  if (b === 0) return "Error: tidak bisa bagi 0";
  return a / b;
};
console.log("\nKali 4*3:", kali(4, 3));
console.log("Bagi 10/0:", bagi(10, 0));

// 3. Default — jika tidak kasih bahan, pakai cadangan
const sapaDefault = (nama = "Tamu") => `Halo, ${nama}!`;
console.log(sapaDefault()); // Tamu

// 4. Rest — terima banyak bahan sekaligus
const totalSemua = (...angka) => angka.reduce((a, b) => a + b, 0);
console.log("Total semua:", totalSemua(1, 2, 3, 4, 5));

// 5. Callback — serahkan tugas ke fungsi lain (seperti titip cucian)
function proses(daftar, kerja) {
  return daftar.map(kerja); // kerja adalah fungsi
}
console.log("\nProses:", proses([1, 2, 3], n => n * n)); // kuadrat

// 6. Closure — fungsi ingat rahasia luar meski sudah selesai
function buatCounter() {
  let hitung = 0; // kotak rahasia
  return function() { // fungsi anak ingat kotak ini
    hitung++;
    return hitung;
  };
}
const counterWarung = buatCounter();
console.log("\n=== Closure Counter ===");
console.log(counterWarung()); // 1
console.log(counterWarung()); // 2
console.log(counterWarung()); // 3 — ingat terus!

// 7. Contoh nyata warung: hitung total + diskon
function hitungTotal(belanja, diskonPersen = 0) {
  const total = belanja.reduce((s, item) => s + item.harga * item.qty, 0);
  const potongan = total * (diskonPersen / 100);
  return total - potongan;
}
const keranjang = [{ harga: 62000, qty: 1 }, { harga: 5000, qty: 2 }];
console.log("\nTotal tanpa diskon:", hitungTotal(keranjang));
console.log("Total diskon 10%:", hitungTotal(keranjang, 10));
```

---

## Konsep Kunci

### 3 Cara Tulis Fungsi
- `function sapa(nama){ return ... }` — resmi, bisa dipanggil sebelum deklarasi (hoisted)
- `const sapa = function(nama){...}` — simpan di variabel
- `const sapa = (nama) => ...` — panah, paling pendek

### Parameter & Return
- `function hitung(a,b)` → `a,b` bahan masuk, `return` hasil keluar. Tanpa `return` → `undefined`.
- Default: `(nama = "Tamu")`, Rest: `(...angka)` tampung semua jadi array.

### Callback & Closure
- **Callback**: fungsi dikirim sebagai argumen `proses(data, n => n*2)`
- **Closure**: fungsi di dalam ingat variabel luar `let hitung` meski induk sudah selesai — untuk counter, private data.

---

## Penjelasan untuk Pemula

### Analogi: Resep Masakan

- **Fungsi = resep**: tulis "Soto: ayam, bumbu → rebus" sekali, masak 100 mangkok tinggal `soto(ayam)`.
- **Parameter = bahan**: `sapa(nama)` → `nama` bahan yang kamu kirim.
- **Return = hidangan jadi**: `return "Halo Budi"` → piring siap saji.
- **Callback = titip**: "Tolong potongkan sayur sesuai *cara* ini" → cara itu fungsi lain.
- **Closure = brankas rahasia**: counter ingat `hitung` di brankas, tidak bisa diintip dari luar, hanya lewat fungsi.

### Cara Komputer Membaca

1. `const kali = (a,b) => a*b` → simpan resep "kali" di kotak `kali`
2. `kali(4,3)` → ambil resep, isi `a=4,b=3` → hitung `12` → `return 12` → cetak

### 3 Istilah Wajib

1. **Fungsi**: resep pakai ulang
2. **Return**: hasil yang dikembalikan
3. **Closure**: fungsi ingat kotak luar

---

## Eksperimen

- **Hijau:** Buat `const sapaWarung = nama => `Selamat datang di Warung, ${nama}`` → panggil 2x.
- **Kuning:** `totalSemua(10,20,30)` → berapa? Coba `hitungTotal(keranjang, 20)` diskon 20%.
- **Merah:** Lupa `return` di `bagi` → `undefined`. Tambah `return` → benar.

---

## Tantangan

**Warung Otomatis:** Buat 3 fungsi:
1. `hitungSubtotal(keranjang)` → total tanpa diskon
2. `hitungOngkir(jarakKg, jarakKm)` → `berat*5000 + jarak*2000`
3. `cetakStruk(keranjang, jarak)` → gabung 1+2, pakai `sapa(nama)` dan return string struk lengkap
Panggil dengan 2 keranjang berbeda untuk buktikan pakai ulang.

Bonus closure: `buatDiskon(10)` return fungsi `harga => harga*0.9` — dipakai `keranjang.map(buatDiskon(10))`.

---

## Glosarium Mini

- **Fungsi**: blok resep
- **Parameter/argumen**: bahan masuk
- **Return**: hasil keluar
- **Callback**: fungsi titip
- **Closure**: ingat variabel luar

---

## Ringkasan

Minggu 4 dari 14: **Fungsi** (Level: Pemula). Kamu sudah punya resep yang bisa dipakai 100x tanpa tulis ulang. Minggu depan: **DOM Manipulation** — hubungkan JS ke halaman web yang kamu bikin di HTML/CSS (bikin tombol benar-benar klik).
