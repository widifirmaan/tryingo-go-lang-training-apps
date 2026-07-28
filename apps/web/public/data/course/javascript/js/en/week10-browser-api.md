# Browser APIs

> JavaScript | Module 10

## Learning Objectives

- Store data with localStorage and sessionStorage
- Use the Geolocation API
- Create animations with requestAnimationFrame
- Manage time with setTimeout and setInterval
- Leverage the Notification API

---

## Program: Personal Toolkit

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

## Explanation

### localStorage & sessionStorage
Both store data in the browser. localStorage — persists. sessionStorage — cleared when tab closes. Can only store strings (use JSON.stringify).

### Geolocation API
Get user position (with permission). `getCurrentPosition()` for one-time, `watchPosition()` for real-time.

### setTimeout & setInterval
`setTimeout(fn, ms)` — execute once after delay. `setInterval(fn, ms)` — execute repeatedly. Store the return value to clear.

### Canvas
HTML element for drawing graphics with JavaScript. Use `getContext("2d")` for rendering.

---

## Experiments

1. **Save theme preference (light/dark) in localStorage**
1. **Create a simple compass with DeviceOrientation API**
1. **Implement a stopwatch with 10ms precision**
1. **Draw a bar chart on canvas from array data**

---

## Challenge

Create a "Daily Tracker" app using localStorage to store: daily goals (text), progress (checkboxes), daily notes (textarea with auto-save), and statistics (streak, total completed). Use setInterval for hourly reminders.

---

## Summary

Browser APIs provide access to device features: local storage, geolocation, timers, and canvas. With these APIs, web apps can approach native app capabilities. Next module: **Advanced Concepts** — closures, this, prototypes, and important patterns.
