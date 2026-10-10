# Promise dan Async/Await

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Akhir | **Minggu 11:** Promise dan Async/Await
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami anatomi objek Promise: 3 status (pending, fulfilled, rejected)
- Membuat Promise kustom menggunakan konstruktor new Promise((resolve, reject) => ...)
- Menangani hasil Promise dengan metode berantai: .then(), .catch(), dan .finally()
- Menguasai sintaks modern async dan await untuk menulis kode asinkron yang tampak sinkron
- Menerapkan penanganan kesalahan (error handling) yang tangguh dengan blok try...catch

---

## 1. Apa Itu Promise?

Promise adalah objek yang mewakili hasil akhir dari suatu operasi asinkron yang belum selesai saat ini:

```text
                 ┌───► Fulfilled (Sukses: resolve(data)) ──► .then() / await
[ PENDING ] ─────┤
 (Sedang Proses) └───► Rejected (Gagal: reject(error))  ──► .catch() / try-catch
```

1. **Pending**: Operasi sedang berlangsung di latar belakang.
2. **Fulfilled**: Operasi berhasil diselesaikan dengan membawa nilai hasil (*value*).
3. **Rejected**: Operasi mengalami kegagalan dengan membawa alasan galat (*error reason*).

---

## 2. Membuat Promise Sendiri

```javascript
function ambilDataPengguna(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, nama: "Budi Santoso", status: "Aktif" });
      } else {
        reject(new Error("ID Pengguna tidak valid!"));
      }
    }, 1000);
  });
}
```

---

## 3. Sintaks Modern: `async` dan `await`

Sintaks `async/await` adalah cara modern yang paling bersih untuk mengonsumsi Promise tanpa rantai `.then()` yang panjang:

```javascript
// Fungsi yang menggunakan await WAJIB diawali dengan kata kunci async
async function muatProfil() {
  try {
    console.log("Memulai proses...");
    const data = await ambilDataPengguna(10); // Menunggu Promise resolve
    console.log("Berhasil:", data.nama);
  } catch (error) {
    console.error("Tertangkap Galat:", error.message);
  } finally {
    console.log("Selesai (selalu dijalankan).");
  }
}
```

---

## Program: Simulator Autentikasi Pengguna dengan Delay Jaringan dan Error Handling

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Promise dan Async Await</title>
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
      max-width: 480px;
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

    .form-group {
      margin-bottom: 12px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-login {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }

    .btn-login:disabled {
      background-color: #A0AEC0;
      cursor: not-allowed;
    }

    .status-panel {
      margin-top: 16px;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 13px;
      display: none;
      line-height: 1.5;
    }

    .status-loading {
      background-color: #EBF8FF;
      color: #2B6CB0;
      border: 1px solid #BEE3F8;
    }

    .status-success {
      background-color: #E2F2E9;
      color: #2E5B44;
      border: 1px solid #C6E6D5;
    }

    .status-error {
      background-color: #FFF5F5;
      color: #C53030;
      border: 1px solid #FEB2B2;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Simulasi Login Asinkron (Promise)</h3>

    <div class="form-group">
      <label>Username (Gunakan: admin):</label>
      <input type="text" id="username-input" value="admin">
    </div>

    <div class="form-group">
      <label>Password (Gunakan: rahasia123):</label>
      <input type="password" id="password-input" value="rahasia123">
    </div>

    <button id="btn-submit" class="btn-login" onclick="prosesLogin()">Masuk Akun</button>

    <div id="status-box" class="status-panel"></div>
  </div>

  <script>
    // 1. Fungsi Penghasil Promise (Simulasi API Jaringan dengan Delay 1.5 Detik)
    function panggilApiLogin(username, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin" && password === "rahasia123") {
            resolve({
              token: "auth_token_9988aabb",
              user: "Administrator Nusa",
              peran: "SuperAdmin"
            });
          } else {
            reject(new Error("Kredensial salah: Username atau password tidak cocok!"));
          }
        }, 1500);
      });
    }

    // 2. Fungsi Asinkron Konsumen dengan async/await dan try-catch
    async function prosesLogin() {
      const u = document.getElementById("username-input").value;
      const p = document.getElementById("password-input").value;
      const statusBox = document.getElementById("status-box");
      const btn = document.getElementById("btn-submit");

      // Set state loading UI
      btn.disabled = true;
      statusBox.style.display = "block";
      statusBox.className = "status-panel status-loading";
      statusBox.textContent = "⏳ Menghubungi server otorisasi (menunggu 1,5 detik)...";

      try {
        // Eksekusi Promise dengan await
        const hasil = await panggilApiLogin(u, p);

        // Berhasil (Fulfilled)
        statusBox.className = "status-panel status-success";
        statusBox.innerHTML = `
          <strong>✓ Login Berhasil!</strong><br>
          Selamat datang, ${hasil.user} (${hasil.peran}).<br>
          Token Sesi: <code>${hasil.token}</code>
        `;
      } catch (err) {
        // Gagal (Rejected)
        statusBox.className = "status-panel status-error";
        statusBox.innerHTML = `
          <strong>✕ Terjadi Kesalahan:</strong><br>
          ${err.message}
        `;
      } finally {
        // Blok finally SELALU dijalankan (kembalikan tombol aktif)
        btn.disabled = false;
      }
    }
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `new Promise((resolve, reject) => ...)`: Membuat kontrak asinkron yang akan diselesaikan dengan resolve() atau dibatalkan dengan reject().
- `async function prosesLogin()`: Menandai fungsi sebagai asinkron agar dapat menggunakan operator `await` di dalamnya.
- `const hasil = await panggilApiLogin(...)`: Menjeda eksekusi baris berikutnya secara rapi hingga Promise selesai tanpa memblokir thread UI.
- `try ... catch (err)`: Menangkap penolakan Promise (reject) dan galat jaringan secara terstruktur tanpa membuat aplikasi crash.
- `finally`: Blok penutup yang menjamin tombol login diaktifkan kembali (`btn.disabled = false`) baik proses berhasil maupun gagal.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 11 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa kata kunci async saat menggunakan await: Menggunakan await di dalam fungsi biasa (non-async) akan memicu SyntaxError: await is only valid in async functions.
- Lupa blok try-catch pada await: Jika Promise di-reject dan tidak ada try-catch, browser akan memicu Uncaught (in promise) Error fatal.
- Mengira await membuat kode menjadi multi-threaded: await tidak membuat thread baru; ia hanya membebaskan Call Stack untuk memproses tugas lain.
- Lupa resolve atau reject pada konstruktor Promise: Promise akan menggantung dalam status pending selamanya dan await tidak akan pernah selesai.

---

## Ringkasan

- Modul Minggu 11 (Promise dan Async/Await) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
