# Pemrograman Asinkron dan Timer

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Akhir | **Minggu 10:** Pemrograman Asinkron dan Timer
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami perbedaan eksekusi sinkron (blocking) dan asinkron (non-blocking)
- Memahami arsitektur Event Loop: Call Stack, Web APIs, dan Callback Queue
- Menggunakan fungsi timer: setTimeout() untuk penundaan eksekusi sekali jalan
- Menggunakan setInterval() dan clearInterval() untuk perulangan berkala
- Membangun aplikasi stopwatch presisi dan pengukur putaran waktu (Lap Counter)

---

## 1. Sinkron vs Asinkron: Mengapa Asinkron Penting?

Secara default, JavaScript berjalan pada **satu thread tunggal (Single-Threaded)**:
- **Sinkron (Blocking)**: Setiap baris kode dieksekusi satu per satu. Jika satu tugas membutuhkan waktu lama (misal: mengambil data dari server), seluruh halaman web akan membeku (*freeze*) dan tidak bisa diklik.
- **Asinkron (Non-Blocking)**: Operasi yang membutuhkan waktu didelegasikan ke latar belakang (Web APIs browser). Thread utama tetap bebas merespons klik dan ketikan pengguna.

---

## 2. Arsitektur Event Loop

```text
┌─────────────────┐       ┌──────────────────────┐
│   CALL STACK    │  ──►  │       WEB APIs       │
│ (Eksekusi Kode) │       │ (Timer, Fetch, Event)│
└────────┬────────┘       └──────────┬───────────┘
         │                           │
         │   ┌───────────────────┐   │
         └───┤    EVENT LOOP     │◄──┘
             └─────────┬─────────┘
                       │
             ┌─────────▼─────────┐
             │  CALLBACK QUEUE   │
             │(Antrean Eksekusi) │
             └───────────────────┘
```

1. Kode timer seperti `setTimeout` dicatat oleh Call Stack lalu diserahkan ke Web APIs browser.
2. Call Stack langsung lanjut mengeksekusi baris berikutnya tanpa menunggu timer selesai.
3. Saat timer habis, fungsinya masuk ke Callback Queue.
4. **Event Loop** memindahkan fungsi dari Queue ke Call Stack setelah Stack kosong.

---

## 3. Fungsi Timer: `setTimeout` vs `setInterval`

### A. `setTimeout(fungsi, milidetik)`
Menjalankan fungsi sekali setelah jeda waktu tertentu (1 detik = 1000 milidetik):
```javascript
const timerId = setTimeout(() => {
  console.log("Dijalankan setelah 2 detik");
}, 2000);

// Membatalkan timer sebelum sempat berjalan:
clearTimeout(timerId);
```

### B. `setInterval(fungsi, milidetik)`
Menjalankan fungsi secara berulang terus-menerus setiap interval waktu tercapai:
```javascript
let detik = 0;
const intervalId = setInterval(() => {
  detik++;
  console.log("Detik ke:", detik);
  if (detik === 5) {
    clearInterval(intervalId); // Wajib dihentikan!
  }
}, 1000);
```

---

## Program: Stopwatch Presisi dengan Pengatur Putaran Lap

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Asinkron dan Timer</title>
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
      max-width: 440px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
      text-align: center;
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 20px;
    }

    .time-display {
      font-family: "Courier New", Courier, monospace;
      font-size: 44px;
      font-weight: 800;
      color: #2E5B44;
      background-color: #F7FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }

    .btn-row {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .btn {
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .btn-start { background-color: #2E5B44; color: white; }
    .btn-pause { background-color: #DD6B20; color: white; }
    .btn-lap { background-color: #3182CE; color: white; }
    .btn-reset { background-color: #E2E8F0; color: #4A5568; }

    .lap-list {
      list-style: none;
      max-height: 140px;
      overflow-y: auto;
      border-top: 1px solid #E2E8F0;
      padding-top: 12px;
      text-align: left;
      font-size: 13px;
    }

    .lap-item {
      display: flex;
      justify-content: space-between;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .lap-item:nth-child(even) { background-color: #F7FAFC; }
  </style>
</head>
<body>

  <div class="container">
    <h3>Stopwatch Asinkron Mandiri</h3>

    <div id="display" class="time-display">00:00.00</div>

    <div class="btn-row">
      <button id="btn-toggle" class="btn btn-start" onclick="toggleStart()">Mulai</button>
      <button id="btn-lap" class="btn btn-lap" onclick="catatLap()" disabled>Lap</button>
      <button class="btn btn-reset" onclick="resetStopwatch()">Reset</button>
    </div>

    <ul id="lap-container" class="lap-list"></ul>
  </div>

  <script>
    let waktuMulai = 0;
    let waktuTertunda = 0;
    let timerInterval = null;
    let lapCount = 0;

    function formatWaktu(ms) {
      const menit = Math.floor(ms / 60000);
      const detik = Math.floor((ms % 60000) / 1000);
      const centi = Math.floor((ms % 1000) / 10);

      const mm = String(menit).padStart(2, "0");
      const ss = String(detik).padStart(2, "0");
      const cc = String(centi).padStart(2, "0");

      return `${mm}:${ss}.${cc}`;
    }

    function perbaruiTampilan() {
      const sekarang = Date.now();
      const selisih = sekarang - waktuMulai + waktuTertunda;
      document.getElementById("display").textContent = formatWaktu(selisih);
    }

    function toggleStart() {
      const btnToggle = document.getElementById("btn-toggle");
      const btnLap = document.getElementById("btn-lap");

      if (timerInterval === null) {
        // Mulai Stopwatch via setInterval
        waktuMulai = Date.now();
        timerInterval = setInterval(perbaruiTampilan, 10); // Update setiap 10ms
        btnToggle.textContent = "Jeda";
        btnToggle.className = "btn btn-pause";
        btnLap.disabled = false;
      } else {
        // Jeda Stopwatch via clearInterval
        clearInterval(timerInterval);
        timerInterval = null;
        waktuTertunda += Date.now() - waktuMulai;
        btnToggle.textContent = "Lanjut";
        btnToggle.className = "btn btn-start";
      }
    }

    function catatLap() {
      lapCount++;
      const teksWaktu = document.getElementById("display").textContent;
      const li = document.createElement("li");
      li.className = "lap-item";
      li.innerHTML = `<span>Putaran #${lapCount}</span><strong>${teksWaktu}</strong>`;
      document.getElementById("lap-container").prepend(li);
    }

    function resetStopwatch() {
      clearInterval(timerInterval);
      timerInterval = null;
      waktuMulai = 0;
      waktuTertunda = 0;
      lapCount = 0;

      document.getElementById("display").textContent = "00:00.00";
      document.getElementById("lap-container").innerHTML = "";

      const btnToggle = document.getElementById("btn-toggle");
      btnToggle.textContent = "Mulai";
      btnToggle.className = "btn btn-start";
      document.getElementById("btn-lap").disabled = true;
    }
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `timerInterval = setInterval(perbaruiTampilan, 10)`: Memanggil fungsi perbaruiTampilan setiap 10 milidetik secara asinkron tanpa memblokir browser.
- `clearInterval(timerInterval)`: Menghentikan perulangan interval timer seketika saat tombol jeda atau reset ditekan.
- `Date.now() - waktuMulai`: Menghitung waktu berlalu menggunakan timestamp sistem fisik sehingga akurasi waktu tidak terpengaruh lag perulangan.
- `String(menit).padStart(2, "0")`: Memastikan angka satuan selalu memiliki awalan angka 0 (misal: "05" bukan "5").
- Manajemen ID Timer: Menyimpan ID timer ke dalam variabel global `timerInterval` memungkinkan pembatalan terkontrol kapan saja.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 10 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa memanggil clearInterval(): Menyebabkan timer terus berjalan di memori selamanya (kebocoran memori) bahkan saat komponen sudah tidak digunakan.
- Mengandalkan counter manual i++ di setInterval alih-alih Date.now(): Interval browser tidak dijamin tepat 1000ms karena antrean Event Loop; selalu gunakan selisih Date.now().
- Mendaftarkan setInterval berulang kali tanpa membersihkan timer lama: Mengklik tombol mulai berkali-kali akan menumpuk lusinan timer yang berjalan bersamaan.
- Delay 0ms pada setTimeout tidak berjalan instan: setTimeout(fn, 0) tetap harus menunggu antrean Callback Queue dan giliran Call Stack kosong.

---

## Ringkasan

- Modul Minggu 10 (Pemrograman Asinkron dan Timer) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
