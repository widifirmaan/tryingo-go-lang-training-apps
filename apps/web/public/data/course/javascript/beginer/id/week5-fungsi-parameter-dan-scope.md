# Fungsi, Parameter, dan Scope

> **Kategori:** JavaScript | **Level:** Dasar JavaScript & Logika | **Minggu 5:** Fungsi, Parameter, dan Scope
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami anatomi Deklarasi Fungsi (function) vs Ekspresi Fungsi vs Arrow Function (=>)
- Menguasai parameter fungsi, argumen, dan penetapan Default Parameters
- Memahami peran nilai kembalian (return) dalam menghasilkan data yang dapat digunakan kembali
- Memahami hierarki Scope: Global Scope vs Function Scope vs Block Scope (let/const)
- Membangun pustaka fungsi utilitas matematika dan pemformatan mata uang (Level 1 Capstone)

---

## 1. Tiga Cara Menulis Fungsi dalam JavaScript

Fungsi adalah blok kode modular yang dirancang untuk melakukan tugas tertentu dan dapat dipanggil berulang kali:

### A. Function Declaration (Dapat Di-hoist)
```javascript
function hitungLuas(panjang, lebar) {
  return panjang * lebar;
}
```

### B. Function Expression
```javascript
const hitungLuas = function(panjang, lebar) {
  return panjang * lebar;
};
```

### C. Arrow Function (Sintaks Ringkas Modern)
```javascript
const hitungLuas = (panjang, lebar) => panjang * lebar;
```

---

## 2. Parameter Default & Nilai Kembalian (`return`)

Anda dapat memberikan nilai default pada parameter jika pengguna tidak menyertakan argumen saat memanggil fungsi:

```javascript
function hitungDiskon(harga, diskon = 0.05) {
  return harga * (1 - diskon);
}

hitungDiskon(100000);       // Menggunakan diskon default 5% -> 95000
hitungDiskon(100000, 0.20); // Menggunakan diskon kustom 20% -> 80000
```

- Kata kunci **`return`** menghentikan eksekusi fungsi dan mengirimkan nilai hasilnya kembali ke pemanggil. Tanpa `return`, fungsi akan mengembalikan `undefined`.

---

## 3. Aturan Scope: Di Mana Variabel Anda Hidup?

Scope menentukan area kode di mana suatu variabel dapat diakses:

```text
┌────────────────────────────────────────────────────────┐
│ GLOBAL SCOPE (Dapat diakses di mana saja)              │
│ const pajak = 0.11;                                    │
│                                                        │
│   function prosesOrder() {                             │
│     // FUNCTION SCOPE                                  │
│     const orderId = 101;                               │
│                                                        │
│     if (orderId > 100) {                               │
│       // BLOCK SCOPE ({ ... } dengan let/const)        │
│       const bonus = 5000;                              │
│     }                                                  │
│     // bonus TIDAK BISA diakses di sini!               │
│   }                                                    │
│   // orderId TIDAK BISA diakses di sini!               │
└────────────────────────────────────────────────────────┘
```

---

## Program: Pustaka Utilitas Matematika dan Pemformatan Mata Uang Rupiah

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Fungsi dan Scope</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .container {
      max-width: 520px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .grid-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-calc {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 16px;
    }

    .result-panel {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      line-height: 1.8;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pustaka Utilitas Finansial & Geometri</h3>

    <div class="grid-inputs">
      <div>
        <label>Harga Barang (Rp):</label>
        <input type="number" id="input-harga" value="150000">
      </div>
      <div>
        <label>Diskon (%):</label>
        <input type="number" id="input-diskon" value="15">
      </div>
      <div>
        <label>Panjang Ruang (m):</label>
        <input type="number" id="input-panjang" value="8">
      </div>
      <div>
        <label>Lebar Ruang (m):</label>
        <input type="number" id="input-lebar" value="5">
      </div>
    </div>

    <button class="btn-calc" onclick="jalankanKalkulasi()">Hitung Semua Nilai</button>

    <div id="output" class="result-panel"></div>
  </div>

  <script>
    // ── PUSTAKA FUNGSI UTILITY (MODULAR & REUSABLE) ──

    // 1. Fungsi Arrow: Format Rupiah
    const formatRupiah = (angka) => {
      return "Rp " + Number(angka).toLocaleString("id-ID");
    };

    // 2. Fungsi Deklarasi: Hitung Diskon dengan Default Parameter
    function hitungTotalSetelahDiskon(harga, persenDiskon = 0) {
      const potongan = harga * (persenDiskon / 100);
      return harga - potongan;
    }

    // 3. Fungsi Arrow Satu Baris: Hitung Luas Ruang
    const hitungLuasRuang = (p, l) => p * l;

    // 4. Fungsi Arrow: Hitung Keliling
    const hitungKeliling = (p, l) => 2 * (p + l);

    // ── EKSEKUSI INTEGRASI ──
    function jalankanKalkulasi() {
      const harga = Number(document.getElementById("input-harga").value);
      const diskon = Number(document.getElementById("input-diskon").value);
      const p = Number(document.getElementById("input-panjang").value);
      const l = Number(document.getElementById("input-lebar").value);

      const hargaAkhir = hitungTotalSetelahDiskon(harga, diskon);
      const luas = hitungLuasRuang(p, l);
      const keliling = hitungKeliling(p, l);

      document.getElementById("output").innerHTML = `
        <strong>Hasil Perhitungan Finansial:</strong><br>
        • Harga Awal: ${formatRupiah(harga)}<br>
        • Diskon (${diskon}%): -${formatRupiah(harga - hargaAkhir)}<br>
        • <strong>Total Bayar: ${formatRupiah(hargaAkhir)}</strong><br>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #E2E8F0;">
        <strong>Hasil Perhitungan Geometri:</strong><br>
        • Luas Ruangan: <strong>${luas} m²</strong><br>
        • Keliling: <strong>${keliling} m</strong>
      `;
    }

    jalankanKalkulasi();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `const formatRupiah = (angka) => ...`: Arrow function ringkas yang memformat angka biasa menjadi format mata uang Rupiah.
- `function hitungTotalSetelahDiskon(harga, persenDiskon = 0)`: Fungsi dengan nilai default `0` untuk persen diskon jika parameter tidak diberikan.
- `return harga - potongan`: Mengembalikan hasil kalkulasi bersih agar dapat digunakan kembali oleh kode lain.
- `const hitungLuasRuang = (p, l) => p * l`: Arrow function satu baris dengan implicit return (tanpa kurung kurawal dan tanpa kata kunci return manual).
- Pemisahan fungsi murni (Pure Functions): Seluruh fungsi kalkulator menerima input dan mengembalikan output tanpa mengubah variabel di luar dirinya.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 5 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa menulis kata kunci return: Jika fungsi menghitung nilai tetapi lupa menulis return, fungsi tersebut akan menghasilkan undefined.
- Mengakses variabel di luar block scope: Mencoba membaca variabel let/const yang dideklarasikan di dalam blok if dari luar blok akan memicu ReferenceError.
- Menulis argumen dengan urutan terbalik: Jika fungsi menerima (harga, diskon) lalu Anda memanggilnya dengan hitung(10, 50000), perhitungan akan salah total.
- Kebingungan kurung kurawal pada arrow function: Jika menggunakan kurung kurawal { ... }, kata kunci return menjadi WAJIB ditulis manual.

---

## Ringkasan

- Modul Minggu 5 (Fungsi, Parameter, dan Scope) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
