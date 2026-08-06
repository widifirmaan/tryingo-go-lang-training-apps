# HTML APIs

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 11:** HTML APIs

## Learning Objectives

- Drag & Drop API: draggable, dragstart, dragover, drop
- Geolocation API: navigator.geolocation.getCurrentPosition
- Web Storage: localStorage and sessionStorage
- DataTransfer API for drag & drop data
- API support detection: feature detection

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

## Key Concepts

### Drag & Drop
`draggable="true"` on source. Events: `dragstart`, `dragover`, `drop`. `e.dataTransfer` for data transfer.

### Geolocation
`navigator.geolocation.getCurrentPosition(callback)` — request user permission, get lat/lng.

### Web Storage
`localStorage.setItem(key, value)` — store persistent data. `sessionStorage` for session-only.

### Feature Detection
Check `if (navigator.geolocation)` before using API.

---

## Experiments

- Create multiple drag sources to one drop zone
- Try sessionStorage vs localStorage
- Add error handling for geolocation
- Create drag & drop file upload
- Store multiple data in localStorage

---

## Challenge

Build a to-do list app with drag & drop reordering and localStorage persistence.

---

## Summary

Week 11 of 14: **HTML APIs** (Level: Complete HTML5). Native interactivity. Next week: **Accessibility (a11y)**.
