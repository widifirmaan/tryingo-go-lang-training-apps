# Perulangan dan Iterasi Data

> **Kategori:** JavaScript | **Level:** Dasar JavaScript & Logika | **Minggu 4:** Perulangan dan Iterasi Data
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menguasai struktur perulangan klasik for (inisialisasi, kondisi, increment)
- Memahami perulangan while dan do-while serta perbedaannya
- Menggunakan perulangan for...of untuk membaca elemen array secara intuitif
- Mengontrol alur perulangan dengan kata kunci break (berhenti) dan continue (lewati)
- Menerapkan pola akumulator untuk menjumlahkan dan mengolah kumpulan data numerik

---

## 1. Perulangan Klasik `for`

Digunakan saat jumlah iterasi sudah diketahui secara pasti:

```javascript
// for (inisialisasi; kondisi; perubahan)
for (let i = 1; i <= 5; i++) {
  console.log("Iterasi ke-" + i);
}
```

1. **Inisialisasi (`let i = 1`)**: Dijalankan sekali saat loop dimulai.
2. **Kondisi (`i <= 5`)**: Diperiksa sebelum setiap putaran. Jika `true`, blok kode dijalankan.
3. **Perubahan (`i++`)**: Dijalankan di akhir setiap putaran untuk menambah nilai `i`.

---

## 2. Perulangan `while` vs `do...while`

- **`while`**: Kondisi diperiksa **di awal**. Jika kondisi langsung bernilai `false`, kode tidak akan pernah dijalankan sama sekali.
- **`do...while`**: Kondisi diperiksa **di akhir**. Kode dijamin berjalan **minimal satu kali** sebelum kondisi dicek.

```javascript
let saldo = 100;
while (saldo > 0) {
  saldo -= 25;
}
```

---

## 3. Perulangan Modern `for...of`

Cara paling bersih dan mudah dibaca untuk membaca seluruh elemen array:

```javascript
const daftarKota = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"];

for (const kota of daftarKota) {
  console.log("Kota: " + kota);
}
```

---

## 4. Mengontrol Alur: `break` dan `continue`

- **`break`**: Menghentikan perulangan sepenuhnya seketika itu juga dan keluar dari loop.
- **`continue`**: Menghentikan putaran saat ini dan langsung melompat ke putaran berikutnya:

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue; // Lewati angka 3
  if (i === 8) break;    // Berhenti total di angka 8
  console.log(i); // Mencetak: 1, 2, 4, 5, 6, 7
}
```

---

## Program: Generator Tabel Perkalian dan Analisis Deret Angka

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Perulangan dan Iterasi</title>
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

    .controls {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    select, button {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
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

    .table-display {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre-line;
      max-height: 260px;
      overflow-y: auto;
    }

    .summary-bar {
      margin-top: 16px;
      padding: 12px;
      background-color: #E2F2E9;
      color: #2E5B44;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Generator Tabel Perkalian Matematika</h3>

    <div class="controls">
      <select id="angka-select">
        <option value="5">Perkalian 5</option>
        <option value="7">Perkalian 7</option>
        <option value="8">Perkalian 8</option>
        <option value="12">Perkalian 12</option>
      </select>
      <button onclick="buatTabel()">Generate</button>
    </div>

    <div id="output" class="table-display"></div>
    <div id="summary" class="summary-bar"></div>
  </div>

  <script>
    function buatTabel() {
      const pengali = Number(document.getElementById("angka-select").value);
      const outputElem = document.getElementById("output");
      const summaryElem = document.getElementById("summary");

      const barisTabel = [];
      let totalAkumulator = 0;

      // 1. Perulangan for Klasik (1 sampai 10)
      for (let i = 1; i <= 10; i++) {
        const hasil = pengali * i;
        totalAkumulator += hasil; // Pola Akumulator

        // Formatting baris tabel
        const paddingI = i < 10 ? " " + i : i;
        barisTabel.push(`${pengali} x ${paddingI} = ${hasil}`);
      }

      outputElem.textContent = barisTabel.join("\n");

      // 2. Ringkasan Hasil
      summaryElem.textContent = `Total Akumulasi Seluruh Hasil (1 s/d 10): ${totalAkumulator.toLocaleString("id-ID")}`;
    }

    // Eksekusi awal
    buatTabel();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `for (let i = 1; i <= 10; i++)`: Perulangan yang mengiterasi variabel pencacah `i` secara teratur dari angka 1 hingga 10.
- `totalAkumulator += hasil`: Operator penugasan penjumlahan (`+=`) yang mengakumulasikan nilai setiap perkalian ke dalam variabel total.
- `barisTabel.push(...)`: Menambahkan hasil kalkulasi setiap putaran loop ke dalam array sebagai deretan baris teks.
- `barisTabel.join("\n")`: Menggabungkan seluruh elemen array menjadi satu string panjang yang dipisahkan oleh karakter baris baru.
- Performa efisien: Mengumpulkan data ke array lalu merender sekali jauh lebih cepat daripada memanipulasi DOM di dalam setiap putaran loop.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 4 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Infinite Loop (Perulangan Tanpa Henti): Lupa menulis increment i++ pada loop while akan membuat browser macet total (*freeze*) karena perulangan berjalan selamanya.
- Off-by-one Error: Menggunakan kondisi i < 10 alih-alih i <= 10 menyebabkan perulangan berhenti di angka 9 dan melewatkan angka 10.
- Memanipulasi DOM langsung di dalam perulangan besar: Menulis innerHTML += di dalam perulangan 1000 kali akan memperlambat performa browser secara drastis.
- Salah menggunakan for...in untuk array: for...in digunakan untuk kunci objek; untuk membaca item array selalu gunakan for...of.

---

## Ringkasan

- Modul Minggu 4 (Perulangan dan Iterasi Data) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
