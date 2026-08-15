# HTML APIs

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 11:** HTML APIs

## Tujuan Pembelajaran

- Drag & Drop API: draggable, dragstart, dragover, drop
- Geolocation API: navigator.geolocation.getCurrentPosition
- Web Storage: localStorage dan sessionStorage
- DataTransfer API untuk drag & drop data
- Deteksi dukungan API: feature detection

---

## Program: Drag & Drop + Geolocation

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>HTML APIs Demo</title>
</head>
<body>
    <h1>HTML5 APIs</h1>

    <h2>Drag & Drop API</h2>
    <div id="drag-source" draggable="true"
         style="width:100px;height:100px;background:#4CAF50;color:white;
                display:flex;align-items:center;justify-content:center;
                cursor:move;border-radius:8px;">
        Drag saya
    </div>
    <div id="drop-zone"
         style="width:200px;height:150px;border:3px dashed #999;
                display:flex;align-items:center;justify-content:center;
                margin-top:20px;border-radius:8px;">
        Drop di sini
    </div>

    <h2>Geolocation API</h2>
    <button onclick="getLocation()">Dapatkan Lokasi</button>
    <p id="lokasi">Klik tombol untuk mendapatkan lokasi Anda.</p>

    <h2>Local Storage</h2>
    <input type="text" id="nama-input" placeholder="Masukkan nama Anda">
    <button onclick="simpanNama()">Simpan</button>
    <p id="sapaan"></p>

    <script>
    // Drag & Drop
    const dragSource = document.getElementById('drag-source');
    const dropZone = document.getElementById('drop-zone');

    dragSource.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'Element dropped!');
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.background = '#e0f7fa';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.innerHTML = e.dataTransfer.getData('text/plain');
        dropZone.style.background = '#c8e6c9';
    });

    // Geolocation
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                document.getElementById('lokasi').textContent =
                    'Lat: ' + pos.coords.latitude.toFixed(4) +
                    ', Lng: ' + pos.coords.longitude.toFixed(4);
            });
        } else {
            document.getElementById('lokasi').textContent = 'Geolocation tidak didukung.';
        }
    }

    // Local Storage
    function simpanNama() {
        const nama = document.getElementById('nama-input').value;
        localStorage.setItem('nama', nama);
        document.getElementById('sapaan').textContent = 'Halo, ' + nama + '!';
    }

    // Load saved name
    const saved = localStorage.getItem('nama');
    if (saved) {
        document.getElementById('sapaan').textContent = 'Selamat datang kembali, ' + saved + '!';
    }
    </script>
</body>
</html>
```

---

## Konsep Kunci

### Drag & Drop
`draggable="true"` pada source. Event: `dragstart`, `dragover`, `drop`. `e.dataTransfer` untuk transfer data.

### Geolocation
`navigator.geolocation.getCurrentPosition(callback)` — minta izin user, dapat latitude/longitude.

### Web Storage
`localStorage.setItem(key, value)` — simpan data persisten. `sessionStorage` untuk session saja.

### Feature Detection
Cek `if (navigator.geolocation)` sebelum pakai API.

---

## Penjelasan untuk Pemula

API = perintah siap pakai yang bisa kita panggil dari JavaScript (kode di dalam `<script>`), seperti meminta layanan dari browser.

- **Drag & Drop**: `draggable="true"` membuat elemen bisa diseret; JavaScript mendengarkan event `dragstart`, `dragover`, `drop`.
- **Geolocation**: `navigator.geolocation.getCurrentPosition(...)` meminta lokasi pengguna (setelah izin diberikan).
- **Web Storage**: `localStorage` menyimpan data yang tetap ada walau tab ditutup; `sessionStorage` hilang saat tab ditutup.

Kuncinya: selalu cek dulu dukungannya (contoh `if (navigator.geolocation)`), supaya halaman tidak error di browser lama.

**Coba:** Di program "HTML APIs Demo", klik tombol Dapatkan Lokasi dan izinkan permintaannya — lihat koordinat muncul. Ketik nama lalu Simpan, tutup tab, buka lagi — namamu masih ada (localStorage).

---

## Eksperimen

- Buat multiple drag source ke satu drop zone
- Coba sessionStorage vs localStorage
- Tambah error handling untuk geolocation
- Buat drag & drop file upload
- Simpan multiple data di localStorage

---

## Tantangan

Buat aplikasi to-do list dengan drag & drop reorder dan localStorage persistence.

---

## Ringkasan

Minggu 11 dari 14: **HTML APIs** (Level: HTML5 Lengkap). Interaktivitas native. Minggu depan: **Aksesibilitas (a11y)**.
