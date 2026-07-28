# Browser API

> JavaScript | Modul 10

## Tujuan Pembelajaran

- Menyimpan data dengan localStorage dan sessionStorage
- Menggunakan Geolocation API
- Membuat animasi dengan requestAnimationFrame
- Mengelola waktu dengan setTimeout dan setInterval
- Memanfaatkan Notification API

---

## Program: Toolkit Pribadi

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Browser API</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input,textarea{padding:.4rem;border:1px solid #ccc;border-radius:4px;width:100%;box-sizing:border-box}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}#canvas{border:1px solid #ccc;border-radius:8px;display:block;margin:.5rem 0}</style></head>
<body>
<h1>Browser API Toolkit</h1>
<div class="card">
  <h2>📝 Catatan Cepat (localStorage)</h2>
  <textarea id="note" rows="3" placeholder="Tulis catatan..."></textarea>
  <button onclick="simpanNote()">Simpan</button>
  <button onclick="hapusNote()">Hapus</button>
  <p id="noteStatus"></p>
</div>
<div class="card">
  <h2>⏱️ Timer</h2>
  <p>Waktu: <span id="timer">00:00:00</span></p>
  <button onclick="mulaiTimer()">Mulai</button>
  <button onclick="hentikanTimer()">Hentikan</button>
  <button onclick="resetTimer()">Reset</button>
</div>
<div class="card">
  <h2>📍 Geolocation</h2>
  <button onclick="dapatkanLokasi()">Dapatkan Lokasi Saya</button>
  <pre id="lokasi"></pre>
</div>
<div class="card">
  <h2>🎨 Canvas</h2>
  <canvas id="canvas" width="300" height="150"></canvas>
  <button onclick="gambarCanvas()">Gambar</button>
  <button onclick="clearCanvas()">Hapus Canvas</button>
</div>
<script>
  // localStorage
  function simpanNote() {
    let note = document.getElementById("note").value;
    localStorage.setItem("quickNote", note);
    document.getElementById("noteStatus").textContent = "✅ Tersimpan!";
  }
  function hapusNote() {
    localStorage.removeItem("quickNote");
    document.getElementById("note").value = "";
    document.getElementById("noteStatus").textContent = "🗑️ Dihapus";
  }
  (function() {
    let saved = localStorage.getItem("quickNote");
    if (saved) document.getElementById("note").value = saved;
  })();

  // Timer
  let timerInterval, detik = 0;
  function mulaiTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      detik++;
      let h = String(Math.floor(detik / 3600)).padStart(2, "0");
      let m = String(Math.floor((detik % 3600) / 60)).padStart(2, "0");
      let s = String(detik % 60).padStart(2, "0");
      document.getElementById("timer").textContent = `${h}:${m}:${s}`;
    }, 1000);
  }
  function hentikanTimer() { clearInterval(timerInterval); timerInterval = null; }
  function resetTimer() { hentikanTimer(); detik = 0; document.getElementById("timer").textContent = "00:00:00"; }

  // Geolocation
  function dapatkanLokasi() {
    if (!navigator.geolocation) return alert("Geolocation tidak didukung");
    navigator.geolocation.getCurrentPosition(
      pos => {
        document.getElementById("lokasi").textContent =
          `Lat: ${pos.coords.latitude}\nLng: ${pos.coords.longitude}\nAkurasi: ${pos.coords.accuracy}m`;
      },
      err => document.getElementById("lokasi").textContent = "❌ " + err.message
    );
  }

  // Canvas
  function gambarCanvas() {
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "#F7DF1E";
    c.fillRect(20, 20, 260, 110);
    c.fillStyle = "#000";
    c.font = "bold 20px system-ui";
    c.textAlign = "center";
    c.fillText("Hello Canvas!", 150, 85);
    c.beginPath();
    c.arc(250, 50, 25, 0, Math.PI * 2);
    c.fillStyle = "#e63946";
    c.fill();
  }
  function clearCanvas() {
    let c = document.getElementById("canvas").getContext("2d");
    c.clearRect(0, 0, 300, 150);
  }
</script>
</body>
</html>
```

---

## Penjelasan

### localStorage & sessionStorage
Keduanya menyimpan data di browser. localStorage — persisten. sessionStorage — hilang saat tab ditutup. Hanya bisa string (gunakan JSON.stringify).

### Geolocation API
Mendapatkan posisi user (dengan izin). `getCurrentPosition()` untuk satu kali, `watchPosition()` untuk real-time.

### setTimeout & setInterval
`setTimeout(fn, ms)` — jalankan sekali setelah delay. `setInterval(fn, ms)` — jalankan berulang. Simpan return value untuk clear.

### Canvas
Elemen HTML untuk menggambar grafis menggunakan JavaScript. Gunakan `getContext("2d")` untuk rendering.

---

## Eksperimen

1. **Simpan preferensi tema (terang/gelap) di localStorage**
1. **Buat kompas sederhana dengan DeviceOrientation API**
1. **Implementasi stopwatch dengan precision 10ms**
1. **Gambar diagram batang di canvas dari data array**

---

## Tantangan

Buat aplikasi "Daily Tracker" yang menggunakan localStorage untuk menyimpan: target harian (teks), progres (checkbox), catatan harian (textarea dengan auto-save), dan statistik (streak, total selesai). Gunakan setInterval untuk pengingat setiap jam.

---

## Ringkasan

Browser API memberikan akses ke fitur-fitur perangkat: penyimpanan lokal, geolokasi, timer, dan canvas. Dengan API ini, aplikasi web bisa mendekati kemampuan aplikasi native. Modul selanjutnya: **Konsep Lanjutan** — closure, this, prototype, dan pattern penting.
