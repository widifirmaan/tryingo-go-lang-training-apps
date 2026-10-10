# Variabel, Tipe Data, dan Operator

> **Kategori:** JavaScript | **Level:** Dasar JavaScript & Logika | **Minggu 2:** Variabel, Tipe Data, dan Operator
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menguasai perbedaan deklarasi variabel: const (tetap), let (dapat diubah), dan alasan menghindari var
- Memahami 7 tipe data primitif: string, number, boolean, null, undefined, symbol, dan bigint
- Menggunakan operator aritmatika (+, -, *, /, %, **) dan operator penugasan (+=, -=)
- Membedakan operator kesetaraan ketat (===) dengan kesetaraan longgar (==) untuk mencegah type coercion
- Menerapkan template literals (${}) untuk penggabungan string yang bersih dan ekspresif

---

## 1. Aturan Emas Deklarasi: `const` vs `let` vs `var`

- **`const` (Default Utama)**: Gunakan untuk nilai yang tidak akan pernah di-assign ulang. Mencegah bug perubahan data yang tidak disengaja.
- **`let`**: Gunakan hanya jika nilai variabel memang perlu diubah di kemudian alur (misal: variabel penghitung counter atau perulangan).
- **`var` (Usang / Hindari)**: Jangan gunakan `var` dalam kode modern karena memiliki masalah *function scope* dan *hoisting* yang membingungkan.

```javascript
const namaToko = "Toko Nusa";
let totalItem = 3;
totalItem = totalItem + 1; // Valid dengan let!
```

---

## 2. 7 Tipe Data Primitif JavaScript

```text
┌───────────┬───────────────────────────────┬────────────────────────────┐
│ Tipe Data │ Penjelasan                    │ Contoh                     │
├───────────┼───────────────────────────────┼────────────────────────────┤
│ string    │ Teks karakter                 │ "Halo", 'Dunia', `Web`    │
│ number    │ Angka bulat & desimal         │ 42, 3.14, -10              │
│ boolean   │ Nilai kebenaran logika        │ true, false                │
│ null      │ Nilai kosong yang disengaja   │ null                       │
│ undefined │ Variabel belum diberi nilai   │ let x; (bernilai undefined)│
│ bigint    │ Bilangan bulat ekstra besar   │ 9007199254740991n          │
│ symbol    │ Pengenal unik absolut         │ Symbol("id")               │
└───────────┴───────────────────────────────┴────────────────────────────┘
```

Gunakan operator `typeof` untuk memeriksa tipe data suatu variabel secara runtime:
```javascript
console.log(typeof "Halo"); // "string"
console.log(typeof 100);    // "number"
```

---

## 3. Operator Perbandingan: Mengapa Wajib `===`?

JavaScript memiliki fitur *Type Coercion* (konversi tipe otomatis) yang berbahaya jika menggunakan `==` (loose equality):

```javascript
// BERBAHAYA (Loose Equality):
"5" == 5;  // true! (String "5" dipaksa diubah menjadi angka 5)
0 == false; // true!
"" == 0;    // true!

// STANDAR AMAN (Strict Equality):
"5" === 5;  // false! (Tipe data berbeda: string vs number)
0 === false; // false!
```

**Aturan Mutlak:** Selalu gunakan operator `===` (sama persis) dan `!==` (tidak sama persis).

---

## Program: Kalkulator Kasir Belanja dengan Verifikasi Tipe Data

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Variabel dan Operator</title>
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

    .card {
      max-width: 500px;
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
      margin-bottom: 12px;
    }

    .bill-receipt {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      white-space: pre-line;
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .type-check-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-top: 12px;
    }

    .type-check-table th, .type-check-table td {
      border: 1px solid #E2E8F0;
      padding: 6px 10px;
      text-align: left;
    }

    .type-check-table th {
      background-color: #EDF2F7;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Struk Kasir: Kalkulasi Nilai Data</h3>
    <div id="receipt" class="bill-receipt">Memuat struk transaksi...</div>

    <table class="type-check-table">
      <thead>
        <tr>
          <th>Variabel</th>
          <th>Nilai</th>
          <th>typeof</th>
        </tr>
      </thead>
      <tbody id="type-tbody"></tbody>
    </table>
  </div>

  <script>
    // 1. Deklarasi Data Transaksi
    const namaProduk = "Buku Panduan Web";
    const hargaSatuan = 85000;
    let kuantitas = 2;
    const persentaseDiskon = 0.10; // Diskon 10%
    const statusMember = true;

    // 2. Operasi Aritmatika
    const subtotal = hargaSatuan * kuantitas;
    const nominalDiskon = subtotal * persentaseDiskon;
    const totalBayar = subtotal - nominalDiskon;

    // 3. Format Struk dengan Template Literals
    const struk = [
      "========================================",
      "             TOKO BUKU NUSA             ",
      "========================================",
      `Item        : ${namaProduk}`,
      `Harga       : Rp ${hargaSatuan.toLocaleString("id-ID")}`,
      `Jumlah      : ${kuantitas} pcs`,
      `Subtotal    : Rp ${subtotal.toLocaleString("id-ID")}`,
      `Diskon (10%): -Rp ${nominalDiskon.toLocaleString("id-ID")}`,
      "----------------------------------------",
      `TOTAL BAYAR : Rp ${totalBayar.toLocaleString("id-ID")}`,
      `Member VIP  : ${statusMember === true ? "YA (Aktif)" : "TIDAK"}`,
      "========================================"
    ].join("\n");

    document.getElementById("receipt").textContent = struk;

    // 4. Verifikasi Tipe Data Runtime (typeof)
    const inspeksiData = [
      { nama: "namaProduk", nilai: namaProduk, tipe: typeof namaProduk },
      { nama: "hargaSatuan", nilai: hargaSatuan, tipe: typeof hargaSatuan },
      { nama: "kuantitas", nilai: kuantitas, tipe: typeof kuantitas },
      { nama: "persentaseDiskon", nilai: persentaseDiskon, tipe: typeof persentaseDiskon },
      { nama: "statusMember", nilai: String(statusMember), tipe: typeof statusMember }
    ];

    const tbody = document.getElementById("type-tbody");
    inspeksiData.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><code>${item.nama}</code></td>
        <td>${item.nilai}</td>
        <td><strong>${item.tipe}</strong></td>
      `;
      tbody.appendChild(tr);
    });
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `const hargaSatuan = 85000`: Mengunci harga satuan dengan `const` agar nilainya tidak bisa diubah secara tidak sengaja oleh proses lain.
- `let kuantitas = 2`: Menggunakan `let` untuk jumlah barang yang dapat berubah saat pembeli menambah pesanan.
- `subtotal * persentaseDiskon`: Operasi perkalian aritmatika untuk menghitung nominal potongan harga secara akurat.
- ``Item: ${namaProduk}``: Template literals dengan tanda backtick (\`) yang memudahkan penyisipan variabel langsung ke dalam teks string.
- `typeof`: Memeriksa tipe data variabel secara runtime untuk memastikan nilai numerik tidak salah dikenali sebagai string.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 2 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menghitung angka yang tersimpan sebagai string: Jika "10" + 5 dieksekusi, hasilnya bukan 15 melainkan "105" karena operator + melakukan penggabungan string (concatenation).
- Menggunakan == alih-alih ===: Menyebabkan bug terselubung saat membandingkan 0 == "" atau false == 0.
- Mencoba me-reassign variabel const: Menulis const x = 1; x = 2; akan memicu TypeError: Assignment to constant variable.
- Lupa tanda kurung kurawal pada template literals: Menulis $namaProduk alih-alih ${namaProduk} akan mencetak teks biasa tanpa mengganti nilainya.

---

## Ringkasan

- Modul Minggu 2 (Variabel, Tipe Data, dan Operator) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
