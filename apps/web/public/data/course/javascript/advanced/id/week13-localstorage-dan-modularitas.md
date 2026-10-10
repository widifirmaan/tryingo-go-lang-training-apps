# LocalStorage dan Modularitas ES Modules

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Akhir | **Minggu 13:** LocalStorage dan Modularitas ES Modules
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami Web Storage API: perbedaan localStorage (permanen) vs sessionStorage (sementara)
- Menguasai metode localStorage: setItem(), getItem(), removeItem(), dan clear()
- Menyimpan dan membaca objek kompleks dengan serialisasi JSON (JSON.stringify & parse)
- Memahami konsep ES Modules: export, export default, dan import untuk memecah file kode
- Membangun aplikasi catatan persisten yang datanya tidak hilang saat browser di-refresh

---

## 1. Apa Itu LocalStorage?

LocalStorage adalah mekanisme penyimpanan data persisten langsung di browser klien:
- **Kapasitas**: Sekitar 5MB per domain (jauh lebih besar dari Cookie yang hanya 4KB).
- **Persistensi**: Data **tidak akan hilang** meski tab ditutup atau browser dimatikan.
- **Batasan**: Hanya dapat menyimpan tipe data **string**.

---

## 2. Empat Metode Utama LocalStorage

```javascript
// 1. Menyimpan data (Kunci, Nilai)
localStorage.setItem("tema", "gelap");

// 2. Membaca data berdasarkan kunci
const temaTersimpan = localStorage.getItem("tema"); // "gelap"

// 3. Menghapus satu data spesifik
localStorage.removeItem("tema");

// 4. Menghapus seluruh data domain
localStorage.clear();
```

### Pola Menyimpan Objek / Array ke LocalStorage
Karena LocalStorage hanya menerima teks string, gunakan `JSON.stringify` saat menyimpan dan `JSON.parse` saat membaca:

```javascript
const daftarCatatan = [{ id: 1, teks: "Belajar JS" }];

// Simpan:
localStorage.setItem("catatan", JSON.stringify(daftarCatatan));

// Baca kembali:
const dataAmbil = JSON.parse(localStorage.getItem("catatan") || "[]");
```

---

## 3. Modularitas dengan ES Modules (`import` / `export`)

Dalam proyek besar, pisahkan kode menjadi beberapa file terfokus:

```javascript
// file: storage.js
export function simpanData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// file: app.js
import { simpanData } from "./storage.js";
simpanData("user", { nama: "Alex" });
```

Di HTML, tambahkan `type="module"`:
```html
<script type="module" src="app.js"></script>
```

---

## Program: Aplikasi Catatan Persisten dengan Penyimpanan LocalStorage

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>LocalStorage dan Modularitas</title>
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
      margin-bottom: 16px;
    }

    .note-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-save {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    .notes-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .note-item {
      background-color: #F7FAFC;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #2E5B44;
      border-radius: 6px;
      padding: 12px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }

    .btn-delete {
      background: none;
      border: none;
      color: #E53E3E;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
    }

    .clear-bar {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #E2E8F0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #718096;
    }

    .btn-clear-all {
      background: none;
      border: 1px solid #CBD5E0;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      color: #4A5568;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Buku Catatan Persisten (LocalStorage)</h3>

    <form id="note-form" class="note-form">
      <input type="text" id="note-input" placeholder="Tulis catatan penting..." required>
      <button type="submit" class="btn-save">Simpan</button>
    </form>

    <ul id="notes-container" class="notes-list"></ul>

    <div class="clear-bar">
      <span id="note-stats">0 catatan tersimpan di browser</span>
      <button class="btn-clear-all" onclick="hapusSemuaCatatan()">Hapus Semua</button>
    </div>
  </div>

  <script>
    // ── MODUL PENYIMPANAN DATA (STORAGE HELPER) ──
    const STORAGE_KEY = "tryngo_user_notes";

    function ambilSemuaDariStorage() {
      const dataString = localStorage.getItem(STORAGE_KEY);
      return dataString ? JSON.parse(dataString) : [];
    }

    function simpanKeStorage(dataArray) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataArray));
    }

    // ── KONTROLER APLIKASI UTAMA ──
    let daftarCatatan = ambilSemuaDariStorage();

    function renderCatatan() {
      const container = document.getElementById("notes-container");
      const stats = document.getElementById("note-stats");

      stats.textContent = `${daftarCatatan.length} catatan tersimpan di browser`;

      if (daftarCatatan.length === 0) {
        container.innerHTML = '<li style="text-align: center; color: #A0AEC0; font-size: 13px; padding: 12px;">Belum ada catatan. Data yang Anda simpan tidak akan hilang meski halaman di-refresh.</li>';
        return;
      }

      container.innerHTML = daftarCatatan.map((note, index) => `
        <li class="note-item">
          <span>${note.teks}</span>
          <button class="btn-delete" onclick="hapusCatatan(${index})" title="Hapus">&times;</button>
        </li>
      `).join("");
    }

    // Event Submit Form Catatan Baru
    document.getElementById("note-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const input = document.getElementById("note-input");
      const teks = input.value.trim();

      if (!teks) return;

      daftarCatatan.push({
        id: Date.now(),
        teks: teks,
        dibuat: new Date().toISOString()
      });

      simpanKeStorage(daftarCatatan);
      renderCatatan();

      input.value = "";
      input.focus();
    });

    function hapusCatatan(index) {
      daftarCatatan.splice(index, 1);
      simpanKeStorage(daftarCatatan);
      renderCatatan();
    }

    function hapusSemuaCatatan() {
      if (confirm("Yakin ingin menghapus seluruh catatan di browser?")) {
        daftarCatatan = [];
        localStorage.removeItem(STORAGE_KEY);
        renderCatatan();
      }
    }

    // Render data awal saat halaman dibuka
    renderCatatan();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `localStorage.setItem(STORAGE_KEY, JSON.stringify(...))`: Mengonversi array catatan menjadi teks JSON dan menyimpannya secara persisten ke penyimpanan browser.
- `JSON.parse(localStorage.getItem(...))`: Membaca kembali teks string dari LocalStorage dan mengubahnya menjadi array objek saat halaman dimuat ulang.
- `daftarCatatan.splice(index, 1)`: Menghapus item catatan pada indeks terpilih lalu memperbarui penyimpanan LocalStorage.
- `localStorage.removeItem(STORAGE_KEY)`: Membersihkan kunci data tertentu dari memori tanpa mengganggu data situs lainnya.
- Persistensi Data Nyata: Silakan coba segarkan (refresh) halaman atau tutup browser; seluruh catatan Anda akan tetap muncul secara utuh.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 13 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menyimpan objek langsung tanpa JSON.stringify: Menulis localStorage.setItem("data", objek) akan menyimpan string "[object Object]", dan data asli akan rusak.
- Lupa memberikan nilai fallback pada JSON.parse: Jika key belum pernah ada, getItem mengembalikan null; memanggil JSON.parse(null) menghasilkan null, bukan array kosong [].
- Kapasitas penyimpanan terbatas (5MB): Jangan menyimpan file gambar besar bertipe base64 ke dalam LocalStorage; jika kuota habis browser akan melempar QuotaExceededError.
- Data sensitif di LocalStorage: Jangan pernah menyimpan password mentah atau token rahasia sensitif di LocalStorage karena dapat diakses oleh skrip XSS.

---

## Ringkasan

- Modul Minggu 13 (LocalStorage dan Modularitas ES Modules) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
