# Array dan Metode Manipulasi Data

> **Kategori:** JavaScript | **Level:** Struktur Data & Interaksi DOM | **Minggu 6:** Array dan Metode Manipulasi Data
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami struktur data Array, sistem indeks berbasis 0, dan panjang array (length)
- Membedakan metode mutasi (push, pop, shift, unshift, splice) dari metode tanpa mutasi (slice, concat)
- Menguasai metode transformasi fungsional modern: map() untuk memetakan data baru
- Menggunakan filter() untuk menyaring data dan find() untuk mencari elemen spesifik
- Menerapkan reduce() untuk menghitung agregasi total nilai kumpulan data secara deklaratif

---

## 1. Anatomi Array dan Sistem Indeks

Array adalah struktur data berurutan yang menyimpan kumpulan nilai dalam satu variabel:

```javascript
const buah = ["Apel", "Jeruk", "Mangga", "Pisang"];
console.log(buah[0]);        // "Apel" (Indeks ke-0 adalah elemen pertama)
console.log(buah.length);   // 4 (Total jumlah elemen)
console.log(buah[buah.length - 1]); // "Pisang" (Elemen terakhir)
```

---

## 2. Metode Mutasi vs Tanpa Mutasi

- **Metode Mutasi (Mengubah Array Asli)**:
  - `push(item)`: Menambahkan elemen di akhir array.
  - `pop()`: Menghapus elemen terakhir array.
  - `unshift(item)`: Menambahkan elemen di awal array.
  - `shift()`: Menghapus elemen pertama array.
- **Metode Tanpa Mutasi (Menghasilkan Array Baru)**:
  - `slice(awal, akhir)`: Mengambil sebagian elemen tanpa mengubah array asli.
  - `concat(arrayLain)`: Menggabungkan dua array menjadi satu.

---

## 3. Tiga Serangkai Metode Fungsional: `map`, `filter`, `reduce`

Dalam standar JavaScript profesional, pengolahan data array menggunakan metode deklaratif:

### A. `map()` (Transformasi 1:1)
Mengubah setiap elemen menjadi format baru dengan panjang array yang tetap sama:
```javascript
const harga = [10000, 20000, 50000];
const hargaPajak = harga.map(h => h * 1.11); // [11100, 22200, 55500]
```

### B. `filter()` (Penyaringan Data)
Mengambil hanya elemen yang memenuhi kondisi logika bernilai `true`:
```javascript
const produk = [
  { nama: "Kemeja", stok: 12 },
  { nama: "Celana", stok: 0 },
  { nama: "Jaket", stok: 5 }
];
const produkTersedia = produk.filter(p => p.stok > 0);
```

### C. `reduce()` (Akumulasi Nilai Tunggal)
Menggabungkan seluruh elemen menjadi satu nilai akhir (misal: total harga):
```javascript
const totalStok = produk.reduce((total, p) => total + p.stok, 0);
```

---

## Program: Pengolah Data Inventaris Toko dengan Filter dan Agregasi

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Array dan Metode Manipulasi</title>
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
      max-width: 560px;
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

    .toolbar {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    select, button {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
    }

    select {
      border: 1px solid #CBD5E0;
      flex: 1;
    }

    button {
      background-color: #2E5B44;
      color: white;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }

    .item-list {
      list-style: none;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }

    .item-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px solid #EDF2F7;
      font-size: 13px;
    }

    .item-row:last-child {
      border-bottom: none;
    }

    .item-row:nth-child(even) {
      background-color: #F7FAFC;
    }

    .badge-qty {
      background-color: #E2F2E9;
      color: #2E5B44;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .metric-panel {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 14px 18px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pengolahan Data Inventaris (Array Pipeline)</h3>

    <div class="toolbar">
      <select id="kategori-filter" onchange="renderInventaris()">
        <option value="SEMUA">Semua Kategori</option>
        <option value="Elektronik">Elektronik</option>
        <option value="Pakaian">Pakaian</option>
        <option value="Buku">Buku</option>
      </select>
    </div>

    <ul id="list-container" class="item-list"></ul>

    <div class="metric-panel">
      <span>Total Nilai Inventaris:</span>
      <span id="total-val">Rp 0</span>
    </div>
  </div>

  <script>
    // 1. Kumpulan Data Mentah (Array of Objects)
    const inventaris = [
      { id: 1, nama: "Keyboard Mekanikal", kategori: "Elektronik", harga: 450000, stok: 8 },
      { id: 2, nama: "Mouse Ergonomis", kategori: "Elektronik", harga: 220000, stok: 15 },
      { id: 3, nama: "Kaos Polos Katun", kategori: "Pakaian", harga: 75000, stok: 30 },
      { id: 4, nama: "Jaket Parka Anti Air", kategori: "Pakaian", harga: 320000, stok: 5 },
      { id: 5, nama: "Buku Panduan JavaScript", kategori: "Buku", harga: 95000, stok: 20 },
      { id: 6, nama: "Buku Desain Web Modern", kategori: "Buku", harga: 110000, stok: 12 }
    ];

    function renderInventaris() {
      const filterKat = document.getElementById("kategori-filter").value;
      const listContainer = document.getElementById("list-container");

      // 2. Operasi FILTER: Menyaring berdasarkan kategori
      const dataTerfilter = filterKat === "SEMUA" 
        ? inventaris 
        : inventaris.filter(item => item.kategori === filterKat);

      // 3. Operasi MAP: Mengonversi data objek menjadi string HTML baris
      listContainer.innerHTML = dataTerfilter.map(item => `
        <li class="item-row">
          <div>
            <strong>${item.nama}</strong>
            <span style="color: #718096; font-size: 12px; margin-left: 6px;">(${item.kategori})</span>
          </div>
          <div>
            <span style="margin-right: 12px;">Rp ${item.harga.toLocaleString("id-ID")}</span>
            <span class="badge-qty">${item.stok} unit</span>
          </div>
        </li>
      `).join("");

      // 4. Operasi REDUCE: Menghitung total nilai seluruh barang terpilih
      const totalNilai = dataTerfilter.reduce((akumulator, item) => {
        return akumulator + (item.harga * item.stok);
      }, 0);

      document.getElementById("total-val").textContent = "Rp " + totalNilai.toLocaleString("id-ID");
    }

    renderInventaris();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `inventaris.filter(...)`: Menguji setiap elemen inventaris apakah memenuhi kriteria kategori yang dipilih di dropdown.
- `dataTerfilter.map(...)`: Mengubah setiap objek inventaris menjadi baris elemen HTML `<li>` secara deklaratif.
- `dataTerfilter.reduce((acc, item) => ..., 0)`: Akumulator yang mengalikan harga dengan stok setiap barang lalu menjumlahkannya ke nilai awal 0.
- `Number.toLocaleString("id-ID")`: Memformat angka rupiah dengan pemisah titik ribuan standar Indonesia.
- Immutabilitas: Array asli `inventaris` tidak pernah diubah oleh fungsi filter atau map, sehingga data tetap utuh saat filter diubah-ubah.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 6 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa nilai awal pada reduce: Jika nilai awal 0 tidak diberikan pada reduce((acc, val) => ...), elemen pertama array akan dijadikan nilai awal akumulator, memicu bug jika elemen berupa objek.
- Mengharapkan filter memutasi array asli: filter mengembalikan array baru; jika Anda tidak menampung hasilnya ke variabel baru, hasil filter akan hilang.
- Memodifikasi array saat di-loop dengan forEach: Mengubah elemen yang sedang diiterasi dapat menyebabkan loncatan indeks yang tidak terduga.
- Menggunakan find saat mengharapkan banyak hasil: find hanya mengembalikan 1 elemen pertama yang cocok; gunakan filter jika ingin semua elemen.

---

## Ringkasan

- Modul Minggu 6 (Array dan Metode Manipulasi Data) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
