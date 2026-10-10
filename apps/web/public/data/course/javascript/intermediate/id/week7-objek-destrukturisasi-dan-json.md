# Objek, Destrukturisasi, dan JSON

> **Kategori:** JavaScript | **Level:** Struktur Data & Interaksi DOM | **Minggu 7:** Objek, Destrukturisasi, dan JSON
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami struktur Objek Literal (key-value pairs) dan akses dot notation vs bracket notation
- Menguasai metode inspeksi objek: Object.keys(), Object.values(), dan Object.entries()
- Menerapkan Destructuring Assignment pada objek dan array untuk kode yang bersih
- Menggunakan Spread Operator (...) untuk kloning objek dan menggabungkan data tanpa mutasi
- Memahami format standar data JSON serta metode JSON.stringify() dan JSON.parse()

---

## 1. Anatomi Objek Literal

Objek menyimpan data dalam bentuk pasangan kunci dan nilai (**key-value pairs**):

```javascript
const profilPengguna = {
  id: 1042,
  nama: "Alex Pratama",
  email: "alex@example.com",
  peran: "Developer",
  aktif: true
};

// Akses Properti:
console.log(profilPengguna.nama);       // Dot notation (Standar)
console.log(profilPengguna["email"]);   // Bracket notation (Jika key berupa variabel dinamis)
```

---

## 2. Destructuring Assignment (Membongkar Properti)

Destructuring mengekstrak properti objek langsung ke dalam variabel individual:

```javascript
// Tanpa Destructuring:
const nama = profilPengguna.nama;
const email = profilPengguna.email;

// Dengan Destructuring Bersih:
const { nama, email, peran = "Pengguna" } = profilPengguna;
console.log(nama, email, peran);
```

---

## 3. Spread Operator (`...`) untuk Immutabilitas

Spread operator membuat salinan (*shallow copy*) objek baru tanpa mengubah objek asli:

```javascript
const updateProfil = {
  ...profilPengguna,      // Salin semua properti lama
  peran: "Lead Engineer", // Timpa properti peran
  lokasi: "Jakarta"       // Tambah properti baru
};
```

---

## 4. Bekerja dengan Data JSON (JavaScript Object Notation)

JSON adalah format teks universal untuk pertukaran data antara browser dan server:

- **`JSON.stringify(objek)`**: Mengubah objek JavaScript menjadi teks string JSON.
- **`JSON.parse(teksJSON)`**: Mengubah teks string JSON kembali menjadi objek JavaScript:

```javascript
const payloadString = JSON.stringify(updateProfil);
// '{"id":1042,"nama":"Alex Pratama",...}'

const objekKembali = JSON.parse(payloadString);
```

---

## Program: Pengelola Profil Pengguna dengan Destrukturisasi dan JSON Serializer

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Objek dan JSON</title>
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

    .profile-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      background-color: #F7FAFC;
    }

    .profile-card h4 {
      color: #1A202C;
      margin-bottom: 8px;
    }

    .profile-meta {
      font-size: 13px;
      color: #4A5568;
      line-height: 1.6;
    }

    .btn-update {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      margin-right: 8px;
    }

    .json-preview {
      background-color: #1A202C;
      color: #A0AEC0;
      font-family: "Courier New", Courier, monospace;
      font-size: 12px;
      padding: 14px;
      border-radius: 8px;
      margin-top: 16px;
      white-space: pre;
      overflow-x: auto;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Manajemen Data Objek & JSON</h3>

    <div class="profile-card">
      <h4 id="user-name">Memuat nama...</h4>
      <div id="user-meta" class="profile-meta"></div>
    </div>

    <div>
      <button class="btn-update" onclick="naikkanJabatan()">Promosikan Jabatan (Spread)</button>
      <button class="btn-update" style="background-color: #4A5568;" onclick="resetProfil()">Reset Data</button>
    </div>

    <div style="margin-top: 20px; font-size: 13px; font-weight: 600; color: #4A5568;">
      Serialisasi JSON Payload (String):
    </div>
    <div id="json-box" class="json-preview"></div>
  </div>

  <script>
    // 1. Objek Awal
    const profilAsal = {
      id: 204,
      nama: "Nadia Safitri",
      email: "nadia@tryngo.id",
      departemen: "Teknologi",
      jabatan: "Junior Engineer",
      keahlian: ["HTML5", "CSS3", "JavaScript"],
      aktif: true
    };

    let profilAktif = { ...profilAsal };

    function tampilkanProfil() {
      // 2. Destructuring Assignment: Ekstrak properti ke variabel
      const { nama, email, departemen, jabatan, keahlian, aktif } = profilAktif;

      document.getElementById("user-name").textContent = nama;
      document.getElementById("user-meta").innerHTML = `
        <strong>Email:</strong> ${email}<br>
        <strong>Departemen:</strong> ${departemen}<br>
        <strong>Jabatan:</strong> ${jabatan}<br>
        <strong>Keahlian:</strong> ${keahlian.join(", ")}<br>
        <strong>Status:</strong> ${aktif ? "Aktif Bekerja" : "Nonaktif"}
      `;

      // 3. Serialisasi JSON dengan indentasi 2 spasi
      const jsonString = JSON.stringify(profilAktif, null, 2);
      document.getElementById("json-box").textContent = jsonString;
    }

    function naikkanJabatan() {
      // 4. Spread Operator: Update tanpa mengubah objek lama secara langsung
      profilAktif = {
        ...profilAktif,
        jabatan: "Senior Fullstack Engineer",
        keahlian: [...profilAktif.keahlian, "Node.js"]
      };
      tampilkanProfil();
    }

    function resetProfil() {
      profilAktif = { ...profilAsal };
      tampilkanProfil();
    }

    tampilkanProfil();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `const { nama, email, ... } = profilAktif`: Destructuring assignment yang membongkar properti objek langsung ke nama-nama variabel yang mudah dibaca.
- `{ ...profilAktif, jabatan: "Senior..." }`: Menggunakan spread operator (`...`) untuk membuat salinan data baru dan menimpa properti jabatan secara aman.
- `[...profilAktif.keahlian, "Node.js"]`: Menambahkan item baru ke array keahlian secara non-mutatif menggunakan spread array.
- `JSON.stringify(profilAktif, null, 2)`: Mengonversi objek JavaScript menjadi string JSON yang rapi dengan indentasi 2 spasi untuk kemudahan dibaca.
- `JSON.parse()`: Kebalikan dari stringify, digunakan untuk mengubah kembali teks dari API server menjadi objek yang dapat dimanipulasi.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 7 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menyalin objek dengan penugasan sama dengan (objB = objA): Ini TIDAK menduplikasi objek, melainkan menyalin referensi memori yang sama. Mengubah objB akan ikut mengubah objA!
- Gagal melakukan deep clone dengan spread: Spread operator hanya melakukan shallow copy (salinan 1 tingkat). Objek atau array bersarang di dalamnya tetap merujuk ke referensi yang sama.
- Sintaks JSON yang tidak valid: JSON WAJIB menggunakan tanda petik ganda ("nama": "Alex"), bukan tanda petik tunggal ('nama').
- Lupa menangani error pada JSON.parse: Jika string JSON rusak atau tidak valid, JSON.parse akan memicu SyntaxError fatal. Selalu gunakan try-catch saat parsing data dari API.

---

## Ringkasan

- Modul Minggu 7 (Objek, Destrukturisasi, dan JSON) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
