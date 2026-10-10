# Fetch API dan HTTP Requests

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Akhir | **Minggu 12:** Fetch API dan HTTP Requests
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami konsep protokol HTTP dan REST API: Method GET, Request URL, dan Response JSON
- Menggunakan fungsi native fetch(url) untuk mengambil data dari internet
- Mengonversi response stream menjadi data objek JavaScript dengan response.json()
- Memeriksa status keberhasilan HTTP dengan response.ok dan menangani HTTP Error 404/500
- Membangun antarmuka katalog data live yang merender state loading, success, dan error

---

## 1. Apa Itu REST API dan Fetch API?

- **REST API**: Antarmuka standar di mana server web menyediakan data mentah (biasanya berformat JSON) melalui URL endpoint.
- **Fetch API**: Antarmuka bawaan browser modern untuk mengirim dan menerima request jaringan HTTP tanpa memerlukan library eksternal (seperti Axios).

---

## 2. Dua Langkah Pengambilan Data dengan `fetch()`

Proses `fetch()` melibatkan dua Promise bertahap:

```javascript
async function muatData() {
  // Langkah 1: Kirim HTTP Request & terima Response Header
  const response = await fetch("https://api.example.com/produk");
  
  // Wajib periksa status HTTP (200-299)
  if (!response.ok) {
    throw new Error(`Gagal memuat data! Status: ${response.status}`);
  }

  // Langkah 2: Baca Response Body dan ubah JSON menjadi Objek JS
  const data = await response.json();
  console.log("Data diterima:", data);
}
```

---

## 3. Tiga Status Tampilan Wajib (UI States)

Setiap aplikasi profesional yang berkomunikasi dengan API wajib menampilkan 3 status:
1. **Loading State**: Tampilkan teks atau animasi pemuatan saat data sedang diambil.
2. **Success State**: Tampilkan data kartu atau tabel jika request berhasil.
3. **Error State**: Tampilkan pesan ramah jika jaringan terputus atau server bermasalah.

---

## Program: Katalog Data Produk Live dengan Fetch API dan Penanganan Status

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Fetch API dan HTTP</title>
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

    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
    }

    .btn-fetch {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }

    .status-alert {
      padding: 12px;
      border-radius: 6px;
      font-size: 13px;
      margin-bottom: 16px;
      display: none;
    }

    .alert-loading { background-color: #EBF8FF; color: #2B6CB0; border: 1px solid #BEE3F8; }
    .alert-error { background-color: #FFF5F5; color: #C53030; border: 1px solid #FEB2B2; }

    .posts-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .post-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 14px 16px;
      background: #FAFAFA;
    }

    .post-card h4 {
      font-size: 15px;
      color: #1A202C;
      margin-bottom: 6px;
      text-transform: capitalize;
    }

    .post-card p {
      font-size: 13px;
      color: #4A5568;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header-bar">
      <h3>Data Live dari REST API</h3>
      <button class="btn-fetch" onclick="ambilDataPosts()">Muat Ulang Data</button>
    </div>

    <div id="status-box" class="status-alert"></div>
    <div id="posts-container" class="posts-grid"></div>
  </div>

  <script>
    async function ambilDataPosts() {
      const statusBox = document.getElementById("status-box");
      const postsContainer = document.getElementById("posts-container");

      // 1. STATE: LOADING
      statusBox.style.display = "block";
      statusBox.className = "status-alert alert-loading";
      statusBox.textContent = "⏳ Sedang mengambil data dari jsonplaceholder.typicode.com...";
      postsContainer.innerHTML = "";

      try {
        // 2. STATE: FETCHING DATA
        // Mengambil 3 artikel dari API publik
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");

        // Pemeriksaan status HTTP
        if (!response.ok) {
          throw new Error(`Gagal memuat data dari server. Kode Status HTTP: ${response.status}`);
        }

        // Parsing stream JSON ke objek JavaScript
        const daftarPost = await response.json();

        // 3. STATE: SUCCESS (Render ke DOM)
        statusBox.style.display = "none";

        postsContainer.innerHTML = daftarPost.map(item => `
          <article class="post-card">
            <h4>${item.id}. ${item.title}</h4>
            <p>${item.body}</p>
          </article>
        `).join("");

      } catch (error) {
        // 4. STATE: ERROR
        statusBox.style.display = "block";
        statusBox.className = "status-alert alert-error";
        statusBox.textContent = `✕ Terjadi kendala jaringan: ${error.message}`;
      }
    }

    // Eksekusi otomatis saat halaman dibuka
    ambilDataPosts();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `await fetch(...)`: Mengirimkan request HTTP GET ke endpoint API publik secara asinkron tanpa memuat ulang browser.
- `if (!response.ok)`: Memeriksa apakah status HTTP berada di rentang 200-299; jika server mengembalikan 404 Not Found atau 500 Error, blok catch akan menangkapnya.
- `await response.json()`: Membaca aliran data byte response body dan mendeserialisasikannya menjadi array objek JavaScript.
- `daftarPost.map(...).join("")`: Mengonversi kumpulan data remote menjadi kartu markup HTML dan merendernya ke layar.
- Penanganan Error Jaringan: Blok `try-catch` menangani situasi saat perangkat offline atau URL tidak dapat dihubungi.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 12 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa await pada response.json(): response.json() adalah Promise; jika lupa await, Anda akan menerima Promise { <pending> } bukan data asli.
- Fetch TIDAK me-reject error HTTP 404 atau 500 secara otomatis: fetch hanya me-reject jika terjadi kegagalan jaringan fisik (misal kabel putus). Wajib periksa if (!response.ok)!
- Masalah CORS (Cross-Origin Resource Sharing): Mencoba melakukan fetch ke server pihak ketiga yang tidak mengizinkan akses domain luar akan diblokir oleh browser.
- Lupa membersihkan wadah lama: Menambahkan elemen baru tanpa mengosongkan kontainer akan membuat data lama bertumpuk setiap tombol diklik.

---

## Ringkasan

- Modul Minggu 12 (Fetch API dan HTTP Requests) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
