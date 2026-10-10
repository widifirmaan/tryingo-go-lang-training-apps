# Manipulasi DOM dan Seleksi Elemen

> **Kategori:** JavaScript | **Level:** Struktur Data & Interaksi DOM | **Minggu 8:** Manipulasi DOM dan Seleksi Elemen
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami arsitektur Document Object Model (DOM) sebagai representasi pohon elemen HTML
- Menguasai metode seleksi elemen: document.getElementById() dan document.querySelector() / querySelectorAll()
- Membaca dan memodifikasi isi teks dengan aman menggunakan textContent alih-alih innerHTML
- Mengelola kelas CSS secara dinamis dengan classList (add, remove, toggle, contains)
- Membuat dan menyisipkan elemen baru secara terprogram dengan document.createElement() dan appendChild()

---

## 1. Apa Itu DOM (Document Object Model)?

DOM adalah antarmuka pemrograman berorientasi objek yang merepresentasikan halaman web sebagai sebuah **pohon simpul (node tree)**.

```text
                  document
                     │
                   <html>
                 ┌───┴───┐
              <head>   <body>
                         │
                      <header>
                     ┌───┴───┐
                    <h1>    <p>
```

Melalui DOM, JavaScript dapat membaca, menambah, mengubah, dan menghapus elemen maupun atribut HTML secara langsung pada layar pengguna.

---

## 2. Metode Seleksi Elemen Modern

- **`document.getElementById("id")`**: Mengambil 1 elemen unik berdasarkan ID (paling cepat).
- **`document.querySelector("selektor")`**: Mengambil 1 elemen pertama yang cocok dengan selektor CSS apa pun (misal: `.btn-primer`, `header > nav a`).
- **`document.querySelectorAll("selektor")`**: Mengambil seluruh elemen yang cocok dalam bentuk NodeList (dapat di-loop dengan `forEach`).

---

## 3. Keamanan: `textContent` vs `innerHTML`

- **`textContent` (Direkomendasikan)**: Membaca atau menyisipkan teks polos. Sangat aman dari serangan Cross-Site Scripting (XSS).
- **`innerHTML`**: Membaca atau menyisipkan kode HTML mentah. **Bahaya:** Jangan pernah memasukkan input dari pengguna ke dalam `innerHTML` tanpa sanitasi, karena penyerang dapat menyuntikkan skrip jahat (`<script>`).

---

## 4. Manipulasi Kelas CSS dengan `classList`

Hindari mengubah style satu per satu dengan `elem.style.color`. Gunakan `classList` untuk menambah atau mencabut kelas CSS:

```javascript
const kartu = document.querySelector(".card");

kartu.classList.add("aktif");       // Menambahkan class .aktif
kartu.classList.remove("tersembunyi"); // Menghapus class
kartu.classList.toggle("gelap");    // Otomatis tambah jika belum ada, hapus jika sudah ada
```

---

## Program: Generator Kartu Dinamis dan Pengendali Tampilan DOM

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Manipulasi DOM</title>
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
      max-width: 540px;
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

    .input-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-add {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
    }

    .card-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .item-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #2E5B44;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.15s ease;
    }

    .item-card.highlight {
      background-color: #E2F2E9;
    }

    .card-actions button {
      background: none;
      border: 1px solid #CBD5E0;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      margin-left: 6px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pembangun Kartu Dinamis (DOM Mutation)</h3>

    <div class="input-bar">
      <input type="text" id="judul-input" placeholder="Ketik nama tugas / catatan baru..." value="Mempelajari Seleksi Elemen DOM">
      <button class="btn-add" onclick="tambahKartu()">+ Tambah</button>
    </div>

    <div id="grid-kartu" class="card-grid"></div>
  </div>

  <script>
    function tambahKartu() {
      const inputElem = document.getElementById("judul-input");
      const teks = inputElem.value.trim();

      if (!teks) {
        alert("Harap masukkan teks judul terlebih dahulu!");
        return;
      }

      const gridContainer = document.getElementById("grid-kartu");

      // 1. Membuat Elemen Baru Secara Terprogram (createElement)
      const kartu = document.createElement("div");
      kartu.className = "item-card";

      // 2. Membuat Elemen Teks Judul
      const judulSpan = document.createElement("span");
      judulSpan.textContent = teks; // Aman dari XSS!

      // 3. Membuat Kontainer Tombol Aksi
      const aksiDiv = document.createElement("div");
      aksiDiv.className = "card-actions";

      // Tombol Sorot (classList.toggle)
      const btnSorot = document.createElement("button");
      btnSorot.textContent = "Sorot";
      btnSorot.onclick = function() {
        kartu.classList.toggle("highlight");
      };

      // Tombol Hapus (remove)
      const btnHapus = document.createElement("button");
      btnHapus.textContent = "Hapus";
      btnHapus.onclick = function() {
        kartu.remove(); // Menghapus elemen langsung dari pohon DOM
      };

      // 4. Menyusun Struktur Anak ke Induk
      aksiDiv.appendChild(btnSorot);
      aksiDiv.appendChild(btnHapus);

      kartu.appendChild(judulSpan);
      kartu.appendChild(aksiDiv);

      // 5. Menyisipkan Kartu ke Pohon DOM Utama (prepend/appendChild)
      gridContainer.prepend(kartu);

      // Bersihkan input dan kembalikan fokus
      inputElem.value = "";
      inputElem.focus();
    }

    // Buat kartu pertama otomatis
    tambahKartu();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `document.createElement("div")`: Menciptakan node elemen HTML baru di memori browser sebelum disisipkan ke layar.
- `judulSpan.textContent = teks`: Menyisipkan teks masukan pengguna secara aman tanpa risiko injeksi kode jahat.
- `kartu.classList.toggle("highlight")`: Menambahkan atau menghapus kelas CSS highlight secara dinamis saat tombol diklik.
- `kartu.remove()`: Menghapus simpul kartu langsung dari struktur pohon DOM secara bersih.
- `gridContainer.prepend(kartu)`: Menyisipkan elemen baru di posisi paling atas kontainer agar tugas terbaru langsung terlihat.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 8 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menyisipkan input pengguna via innerHTML: Ini adalah celah keamanan paling umum di web (XSS); penyerang dapat memasukkan <img src=x onerror=alert(1)> untuk mencuri data sesi.
- Lupa appendChild atau prepend: Membuat elemen dengan createElement tetapi lupa menyisipkannya ke kontainer induk akan membuat elemen tersebut tidak pernah tampil di layar.
- Menghapus elemen yang belum ada di DOM: Memanggil elem.remove() pada variabel yang bernilai null akan memicu TypeError.
- QuerySelector salah penulisan: Menulis querySelector("btn") alih-alih querySelector(".btn") untuk class akan menghasilkan null.

---

## Ringkasan

- Modul Minggu 8 (Manipulasi DOM dan Seleksi Elemen) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
