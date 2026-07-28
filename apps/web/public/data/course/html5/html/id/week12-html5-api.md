# HTML5 APIs

> HTML5 | Modul 12

## Tujuan Pembelajaran

- Menggambar grafis dengan Canvas API
- Mendapatkan lokasi pengguna dengan Geolocation API
- Mengimplementasi Drag & Drop
- Menyimpan data dengan Web Storage API
- Memanipulasi riwayat browser dengan History API

---

## Program: Aplikasi Browser API

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 APIs Demo</title>
</head>
<body>
  <h1>HTML5 Browser APIs</h1>

  <section>
    <h2>🎨 Canvas</h2>
    <canvas id="myCanvas" width="400" height="150"></canvas>
    <p><button onclick="gambarCanvas()">Gambar Ulang</button></p>
  </section>

  <section>
    <h2>📍 Geolocation</h2>
    <p><button onclick="dapatkanLokasi()">Dapatkan Lokasi Saya</button></p>
    <pre id="lokasi" style="background:#eee;padding:.5rem"></pre>
  </section>

  <section>
    <h2>💾 Web Storage</h2>
    <p>
      <label for="catatan">Catatan (tersimpan otomatis):</label><br>
      <textarea id="catatan" rows="4" cols="50" placeholder="Tulis catatan..."></textarea>
    </p>
    <p><button onclick="simpanCatatan()">Simpan</button> <button onclick="hapusCatatan()">Hapus</button></p>
    <p id="storageStatus"></p>
  </section>

  <section>
    <h2>🎯 Drag & Drop</h2>
    <div id="dragSource" style="display:flex;gap:8px;margin:.5rem 0;min-height:50px">
      <div draggable="true" style="background:#E34F26;color:#fff;padding:.5rem 1rem;border-radius:6px;cursor:grab">Item 1</div>
      <div draggable="true" style="background:#1572B6;color:#fff;padding:.5rem 1rem;border-radius:6px;cursor:grab">Item 2</div>
      <div draggable="true" style="background:#2E5B44;color:#fff;padding:.5rem 1rem;border-radius:6px;cursor:grab">Item 3</div>
    </div>
    <div id="dropZone" style="border:2px dashed #ccc;padding:1rem;border-radius:8px;min-height:60px;text-align:center">
      Drop item di sini
    </div>
  </section>

  <script>
    function gambarCanvas() {
      const c = document.getElementById("myCanvas").getContext("2d");
      c.clearRect(0, 0, 400, 150);
      c.fillStyle = "#E34F26"; c.fillRect(20, 30, 100, 80);
      c.fillStyle = "#1572B6"; c.beginPath(); c.arc(200, 70, 40, 0, Math.PI*2); c.fill();
      c.fillStyle = "#2E5B44"; c.beginPath(); c.moveTo(340,110); c.lineTo(380,30); c.lineTo(300,30); c.closePath(); c.fill();
      c.fillStyle = "#fff"; c.font = "bold 14px system-ui"; c.textAlign = "center";
      c.fillText("Canvas API", 200, 140);
    }
    gambarCanvas();

    function dapatkanLokasi() {
      if (!navigator.geolocation) return alert("Geolocation tidak didukung");
      navigator.geolocation.getCurrentPosition(
        p => document.getElementById("lokasi").textContent = "Lat: " + p.coords.latitude + "\nLng: " + p.coords.longitude,
        e => document.getElementById("lokasi").textContent = "Error: " + e.message
      );
    }

    function simpanCatatan() {
      localStorage.setItem("html5Note", document.getElementById("catatan").value);
      document.getElementById("storageStatus").textContent = "✓ Tersimpan!";
    }
    function hapusCatatan() {
      localStorage.removeItem("html5Note");
      document.getElementById("catatan").value = "";
      document.getElementById("storageStatus").textContent = "🗑️ Dihapus";
    }
    document.getElementById("catatan").value = localStorage.getItem("html5Note") || "";

    // Drag & Drop
    document.querySelectorAll("[draggable=true]").forEach(el => {
      el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", e.target.textContent);
        e.dataTransfer.effectAllowed = "move";
      });
    });
    document.getElementById("dropZone").addEventListener("dragover", e => e.preventDefault());
    document.getElementById("dropZone").addEventListener("drop", e => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      const item = document.createElement("div");
      item.textContent = "✓ " + data;
      item.style.cssText = "background:#2E5B44;color:#fff;padding:.3rem .8rem;border-radius:6px;margin:4px;display:inline-block";
      e.target.appendChild(item);
    });
  </script>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Canvas
Elemen untuk menggambar grafis dengan JavaScript. Gunakan `getContext("2d")` untuk rendering. Method: `fillRect`, `arc`, `beginPath`, `fill`, `fillText`. Canvas bagus untuk game, grafik, visualisasi data.

### Geolocation
`navigator.geolocation.getCurrentPosition()` — dapatkan posisi satu kali. `watchPosition()` — pantau perubahan posisi. Membutuhkan izin user.

### Web Storage
`localStorage` — data persisten (tidak hilang saat browser ditutup). `sessionStorage` — data sementara (hilang saat tab ditutup). Hanya bisa string. Gunakan `JSON.stringify()` untuk objek.

### Drag & Drop
`draggable="true"` — buat elemen bisa di-drag. Event: `dragstart`, `dragover`, `drop`. `dataTransfer` — bawa data antar event.

### History API
`history.pushState()` — tambah state. `history.replaceState()` — ganti state. `popstate` event — tangani navigasi.

---

## Eksperimen

Gambar lingkaran dengan gradien di Canvas,Implementasi drag & drop gambar ke drop zone,Simpan array objek ke localStorage dan restore,Gambar grafik batang sederhana di Canvas

---

## Tantangan

Buat halaman "My Dashboard" yang menggabungkan: Canvas untuk grafik batang sederhana, Geolocation untuk menampilkan posisi user, Drag & Drop untuk widget yang bisa diatur ulang, localStorage untuk menyimpan preferensi layout, dan History API untuk navigasi tab.

---

## Ringkasan

HTML5 APIs membuka pintu ke kemampuan browser modern: Canvas untuk grafis, Geolocation untuk lokasi, Web Storage untuk penyimpanan, Drag & Drop untuk interaksi, dan History API untuk navigasi. Modul selanjutnya: **Performa & Best Practices** — cara mengoptimalkan halaman HTML Anda.
