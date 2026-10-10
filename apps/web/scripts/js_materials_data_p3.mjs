export const JS_WEEKS_P3 = [
  // ── MINGGU 10: Pemrograman Asinkron dan Timer ────────────────────────────────
  {
    week: 10,
    topicId: 'pemrograman-asinkron-dan-timer',
    levelId: 'advanced',
    levelNameId: 'Asinkron, Storage & Proyek Akhir',
    levelNameEn: 'Asynchronous, Storage & Final Project',
    category: 'JavaScript',
    titleId: 'Pemrograman Asinkron dan Timer',
    titleEn: 'Asynchronous Programming and Timers',
    objectivesId: [
      'Memahami perbedaan eksekusi sinkron (blocking) dan asinkron (non-blocking)',
      'Memahami arsitektur Event Loop: Call Stack, Web APIs, dan Callback Queue',
      'Menggunakan fungsi timer: setTimeout() untuk penundaan eksekusi sekali jalan',
      'Menggunakan setInterval() dan clearInterval() untuk perulangan berkala',
      'Membangun aplikasi stopwatch presisi dan pengukur putaran waktu (Lap Counter)'
    ],
    objectivesEn: [
      'Distinguish synchronous blocking execution from asynchronous non-blocking pipelines',
      'Understand the Event Loop architecture: Call Stack, Web APIs, Callback Queue',
      'Deploy setTimeout() for deferred one-shot task execution',
      'Control recurring intervals using setInterval() and clearInterval()',
      'Construct a precision stopwatch with lap logging functionality'
    ],
    contentId: `## 1. Sinkron vs Asinkron: Mengapa Asinkron Penting?

Secara default, JavaScript berjalan pada **satu thread tunggal (Single-Threaded)**:
- **Sinkron (Blocking)**: Setiap baris kode dieksekusi satu per satu. Jika satu tugas membutuhkan waktu lama (misal: mengambil data dari server), seluruh halaman web akan membeku (*freeze*) dan tidak bisa diklik.
- **Asinkron (Non-Blocking)**: Operasi yang membutuhkan waktu didelegasikan ke latar belakang (Web APIs browser). Thread utama tetap bebas merespons klik dan ketikan pengguna.

---

## 2. Arsitektur Event Loop

\`\`\`text
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
\`\`\`

1. Kode timer seperti \`setTimeout\` dicatat oleh Call Stack lalu diserahkan ke Web APIs browser.
2. Call Stack langsung lanjut mengeksekusi baris berikutnya tanpa menunggu timer selesai.
3. Saat timer habis, fungsinya masuk ke Callback Queue.
4. **Event Loop** memindahkan fungsi dari Queue ke Call Stack setelah Stack kosong.

---

## 3. Fungsi Timer: \`setTimeout\` vs \`setInterval\`

### A. \`setTimeout(fungsi, milidetik)\`
Menjalankan fungsi sekali setelah jeda waktu tertentu (1 detik = 1000 milidetik):
\`\`\`javascript
const timerId = setTimeout(() => {
  console.log("Dijalankan setelah 2 detik");
}, 2000);

// Membatalkan timer sebelum sempat berjalan:
clearTimeout(timerId);
\`\`\`

### B. \`setInterval(fungsi, milidetik)\`
Menjalankan fungsi secara berulang terus-menerus setiap interval waktu tercapai:
\`\`\`javascript
let detik = 0;
const intervalId = setInterval(() => {
  detik++;
  console.log("Detik ke:", detik);
  if (detik === 5) {
    clearInterval(intervalId); // Wajib dihentikan!
  }
}, 1000);
\`\`\``,
    contentEn: `## 1. Synchronous vs Asynchronous Models

JavaScript runs on a **Single-Threaded execution model**:
- **Synchronous (Blocking)**: Instructions execute sequentially. Heavy processes freeze UI rendering.
- **Asynchronous (Non-Blocking)**: Long-running operations offload to Web APIs, keeping main threads responsive.

---

## 2. Event Loop Architecture

\`\`\`text
┌─────────────────┐       ┌──────────────────────┐
│   CALL STACK    │  ──►  │       WEB APIs       │
│ (Active frames) │       │ (Timers, Network)    │
└────────┬────────┘       └──────────┬───────────┘
         │                           │
         │   ┌───────────────────┐   │
         └───┤    EVENT LOOP     │◄──┘
             └─────────┬─────────┘
                       │
             ┌─────────▼─────────┐
             │  CALLBACK QUEUE   │
             │ (Pending tasks)   │
             └───────────────────┘
\`\`\`

---

## 3. Timer Primitives: \`setTimeout\` vs \`setInterval\`

### A. \`setTimeout(fn, delayMs)\`
Fires callbacks once after specified elapsed milliseconds:
\`\`\`javascript
const timerId = setTimeout(() => {
  console.log("Fired after 2000ms");
}, 2000);

clearTimeout(timerId); // Cancels pending execution
\`\`\`

### B. \`setInterval(fn, intervalMs)\`
Recursively dispatches callbacks at recurring intervals:
\`\`\`javascript
let count = 0;
const intervalId = setInterval(() => {
  count++;
  if (count === 5) clearInterval(intervalId);
}, 1000);
\`\`\``,
    programTitleId: 'Stopwatch Presisi dengan Pengatur Putaran Lap',
    programTitleEn: 'Precision Chronograph Stopwatch with Lap Recorder',
    programCode: `<!DOCTYPE html>
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

      return \`\${mm}:\${ss}.\${cc}\`;
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
      li.innerHTML = \`<span>Putaran #\${lapCount}</span><strong>\${teksWaktu}</strong>\`;
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
</html>`,
    breakdownId: [
      '`timerInterval = setInterval(perbaruiTampilan, 10)`: Memanggil fungsi perbaruiTampilan setiap 10 milidetik secara asinkron tanpa memblokir browser.',
      '`clearInterval(timerInterval)`: Menghentikan perulangan interval timer seketika saat tombol jeda atau reset ditekan.',
      '`Date.now() - waktuMulai`: Menghitung waktu berlalu menggunakan timestamp sistem fisik sehingga akurasi waktu tidak terpengaruh lag perulangan.',
      '`String(menit).padStart(2, "0")`: Memastikan angka satuan selalu memiliki awalan angka 0 (misal: "05" bukan "5").',
      'Manajemen ID Timer: Menyimpan ID timer ke dalam variabel global `timerInterval` memungkinkan pembatalan terkontrol kapan saja.'
    ],
    breakdownEn: [
      '`setInterval(..., 10)`: Dispatches recurring callback execution every 10 milliseconds without blocking UI responsiveness.',
      '`clearInterval(timerInterval)`: Destroys pending intervals when pausing or resetting timers.',
      '`Date.now() - waktuMulai`: Relies on absolute system clock hardware timestamps avoiding drift from browser timer throttling.',
      '`String(...).padStart(2, "0")`: Formats numerical timestamps with consistent zero padding.',
      'Timer ID retention: Preserves interval handles inside state bindings allowing deterministic cancellation.'
    ],
    pitfallsId: [
      'Lupa memanggil clearInterval(): Menyebabkan timer terus berjalan di memori selamanya (kebocoran memori) bahkan saat komponen sudah tidak digunakan.',
      'Mengandalkan counter manual i++ di setInterval alih-alih Date.now(): Interval browser tidak dijamin tepat 1000ms karena antrean Event Loop; selalu gunakan selisih Date.now().',
      'Mendaftarkan setInterval berulang kali tanpa membersihkan timer lama: Mengklik tombol mulai berkali-kali akan menumpuk lusinan timer yang berjalan bersamaan.',
      'Delay 0ms pada setTimeout tidak berjalan instan: setTimeout(fn, 0) tetap harus menunggu antrean Callback Queue dan giliran Call Stack kosong.'
    ],
    pitfallsEn: [
      'Omitting clearInterval(): Causes persistent interval handlers to leak memory indefinitely.',
      'Counting ticks manually instead of Date.now(): System task queues introduce drift; compute true elapsed time via hardware clock timestamps.',
      'Stacking redundant intervals: Clicking start without clearing prior handles triggers racing concurrent intervals.',
      'Misinterpreting 0ms delays: setTimeout(fn, 0) still yields to existing Call Stack frames and waits in the task queue.'
    ]
  },

  // ── MINGGU 11: Promise dan Async/Await ────────────────────────────────────────
  {
    week: 11,
    topicId: 'promise-dan-async-await',
    levelId: 'advanced',
    levelNameId: 'Asinkron, Storage & Proyek Akhir',
    levelNameEn: 'Asynchronous, Storage & Final Project',
    category: 'JavaScript',
    titleId: 'Promise dan Async/Await',
    titleEn: 'Promises and Async/Await',
    objectivesId: [
      'Memahami anatomi objek Promise: 3 status (pending, fulfilled, rejected)',
      'Membuat Promise kustom menggunakan konstruktor new Promise((resolve, reject) => ...)',
      'Menangani hasil Promise dengan metode berantai: .then(), .catch(), dan .finally()',
      'Menguasai sintaks modern async dan await untuk menulis kode asinkron yang tampak sinkron',
      'Menerapkan penanganan kesalahan (error handling) yang tangguh dengan blok try...catch'
    ],
    objectivesEn: [
      'Master the Promise lifecycle: 3 states (pending, fulfilled, rejected)',
      'Construct custom Promises via new Promise((resolve, reject) => ...)',
      'Handle resolution and rejections via .then(), .catch(), and .finally()',
      'Write synchronous-looking asynchronous control flows with async and await',
      'Implement structured error boundaries using try...catch blocks'
    ],
    contentId: `## 1. Apa Itu Promise?

Promise adalah objek yang mewakili hasil akhir dari suatu operasi asinkron yang belum selesai saat ini:

\`\`\`text
                 ┌───► Fulfilled (Sukses: resolve(data)) ──► .then() / await
[ PENDING ] ─────┤
 (Sedang Proses) └───► Rejected (Gagal: reject(error))  ──► .catch() / try-catch
\`\`\`

1. **Pending**: Operasi sedang berlangsung di latar belakang.
2. **Fulfilled**: Operasi berhasil diselesaikan dengan membawa nilai hasil (*value*).
3. **Rejected**: Operasi mengalami kegagalan dengan membawa alasan galat (*error reason*).

---

## 2. Membuat Promise Sendiri

\`\`\`javascript
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
\`\`\`

---

## 3. Sintaks Modern: \`async\` dan \`await\`

Sintaks \`async/await\` adalah cara modern yang paling bersih untuk mengonsumsi Promise tanpa rantai \`.then()\` yang panjang:

\`\`\`javascript
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
\`\`\``,
    contentEn: `## 1. What is a Promise?

A Promise represents the eventual completion or failure of an asynchronous operation:

\`\`\`text
                 ┌───► Fulfilled (Success: resolve(data)) ──► .then() / await
[ PENDING ] ─────┤
 (Processing)    └───► Rejected (Error: reject(error))   ──► .catch() / try-catch
\`\`\`

---

## 2. Custom Promise Instantiation

\`\`\`javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Budi Santoso" });
      else reject(new Error("Invalid ID"));
    }, 1000);
  });
}
\`\`\`

---

## 3. Modern Syntactic Standard: \`async\` & \`await\`

\`async/await\` straightens out nested \`.then()\` promise chains into linear control structures:

\`\`\`javascript
async function loadProfile() {
  try {
    const data = await fetchUser(10);
    console.log("Result:", data.name);
  } catch (error) {
    console.error("Caught error:", error.message);
  } finally {
    console.log("Completed execution.");
  }
}
\`\`\``,
    programTitleId: 'Simulator Autentikasi Pengguna dengan Delay Jaringan dan Error Handling',
    programTitleEn: 'Authentication Flow Simulator with Network Delay and Error Handling',
    programCode: `<!DOCTYPE html>
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
        statusBox.innerHTML = \`
          <strong>✓ Login Berhasil!</strong><br>
          Selamat datang, \${hasil.user} (\${hasil.peran}).<br>
          Token Sesi: <code>\${hasil.token}</code>
        \`;
      } catch (err) {
        // Gagal (Rejected)
        statusBox.className = "status-panel status-error";
        statusBox.innerHTML = \`
          <strong>✕ Terjadi Kesalahan:</strong><br>
          \${err.message}
        \`;
      } finally {
        // Blok finally SELALU dijalankan (kembalikan tombol aktif)
        btn.disabled = false;
      }
    }
  </script>

</body>
</html>`,
    breakdownId: [
      '`new Promise((resolve, reject) => ...)`: Membuat kontrak asinkron yang akan diselesaikan dengan resolve() atau dibatalkan dengan reject().',
      '`async function prosesLogin()`: Menandai fungsi sebagai asinkron agar dapat menggunakan operator `await` di dalamnya.',
      '`const hasil = await panggilApiLogin(...)`: Menjeda eksekusi baris berikutnya secara rapi hingga Promise selesai tanpa memblokir thread UI.',
      '`try ... catch (err)`: Menangkap penolakan Promise (reject) dan galat jaringan secara terstruktur tanpa membuat aplikasi crash.',
      '`finally`: Blok penutup yang menjamin tombol login diaktifkan kembali (`btn.disabled = false`) baik proses berhasil maupun gagal.'
    ],
    breakdownEn: [
      '`new Promise((resolve, reject) => ...)`: Instantiates an asynchronous deferred contract resolving or rejecting explicitly.',
      '`async function`: Flags functions as asynchronous scopes enabling inline `await` keywords.',
      '`await panggilApiLogin(...)`: Suspends execution of current function non-blockingly until Promise resolves.',
      '`try ... catch (err)`: Structured exception boundary capturing rejections without crashing runtime executions.',
      '`finally`: Guaranteed teardown block resetting interactive UI states (reenabling buttons) regardless of outcome.'
    ],
    pitfallsId: [
      'Lupa kata kunci async saat menggunakan await: Menggunakan await di dalam fungsi biasa (non-async) akan memicu SyntaxError: await is only valid in async functions.',
      'Lupa blok try-catch pada await: Jika Promise di-reject dan tidak ada try-catch, browser akan memicu Uncaught (in promise) Error fatal.',
      'Mengira await membuat kode menjadi multi-threaded: await tidak membuat thread baru; ia hanya membebaskan Call Stack untuk memproses tugas lain.',
      'Lupa resolve atau reject pada konstruktor Promise: Promise akan menggantung dalam status pending selamanya dan await tidak akan pernah selesai.'
    ],
    pitfallsEn: [
      'Using await outside async functions: Triggers a SyntaxError: await is only valid in async functions.',
      'Omitting try-catch around await: Unhandled rejections log Uncaught (in promise) exceptions to the browser.',
      'Misunderstanding thread concurrency: await does not spawn background OS threads; it pauses execution at the function boundary within the single thread.',
      'Unresolved promise closures: Forgetting to invoke either resolve or reject hangs promises in perpetual pending state.'
    ]
  },

  // ── MINGGU 12: Fetch API dan HTTP Requests ────────────────────────────────────
  {
    week: 12,
    topicId: 'fetch-api-dan-http',
    levelId: 'advanced',
    levelNameId: 'Asinkron, Storage & Proyek Akhir',
    levelNameEn: 'Asynchronous, Storage & Final Project',
    category: 'JavaScript',
    titleId: 'Fetch API dan HTTP Requests',
    titleEn: 'Fetch API and HTTP Requests',
    objectivesId: [
      'Memahami konsep protokol HTTP dan REST API: Method GET, Request URL, dan Response JSON',
      'Menggunakan fungsi native fetch(url) untuk mengambil data dari internet',
      'Mengonversi response stream menjadi data objek JavaScript dengan response.json()',
      'Memeriksa status keberhasilan HTTP dengan response.ok dan menangani HTTP Error 404/500',
      'Membangun antarmuka katalog data live yang merender state loading, success, dan error'
    ],
    objectivesEn: [
      'Understand HTTP fundamentals and REST APIs: GET methods, endpoint URLs, and JSON responses',
      'Deploy the native fetch() API to consume remote network endpoints',
      'Deserialize incoming response streams using response.json()',
      'Evaluate HTTP transport status via response.ok and manage 404/500 failures',
      'Construct a live catalog interface coordinating loading, success, and error states'
    ],
    contentId: `## 1. Apa Itu REST API dan Fetch API?

- **REST API**: Antarmuka standar di mana server web menyediakan data mentah (biasanya berformat JSON) melalui URL endpoint.
- **Fetch API**: Antarmuka bawaan browser modern untuk mengirim dan menerima request jaringan HTTP tanpa memerlukan library eksternal (seperti Axios).

---

## 2. Dua Langkah Pengambilan Data dengan \`fetch()\`

Proses \`fetch()\` melibatkan dua Promise bertahap:

\`\`\`javascript
async function muatData() {
  // Langkah 1: Kirim HTTP Request & terima Response Header
  const response = await fetch("https://api.example.com/produk");
  
  // Wajib periksa status HTTP (200-299)
  if (!response.ok) {
    throw new Error(\`Gagal memuat data! Status: \${response.status}\`);
  }

  // Langkah 2: Baca Response Body dan ubah JSON menjadi Objek JS
  const data = await response.json();
  console.log("Data diterima:", data);
}
\`\`\`

---

## 3. Tiga Status Tampilan Wajib (UI States)

Setiap aplikasi profesional yang berkomunikasi dengan API wajib menampilkan 3 status:
1. **Loading State**: Tampilkan teks atau animasi pemuatan saat data sedang diambil.
2. **Success State**: Tampilkan data kartu atau tabel jika request berhasil.
3. **Error State**: Tampilkan pesan ramah jika jaringan terputus atau server bermasalah.`,
    contentEn: `## 1. REST APIs and the Fetch Protocol

- **REST APIs**: Web services exposing raw data payloads (typically JSON) across standardized HTTP endpoints.
- **Fetch API**: Modern browser native interface for dispatching and receiving HTTP network traffic without third-party dependencies.

---

## 2. The Two-Step Fetch Pipeline

Consuming data requires awaiting two sequential promises:

\`\`\`javascript
async function fetchData() {
  // Step 1: Dispatch HTTP request & receive response headers
  const response = await fetch("https://api.example.com/products");
  
  // Check HTTP transport validity (200-299)
  if (!response.ok) {
    throw new Error(\`Request failed with status: \${response.status}\`);
  }

  // Step 2: Stream and parse JSON body into JavaScript object
  const data = await response.json();
  console.log("Payload:", data);
}
\`\`\`

---

## 3. The 3 Essential UI States

Production data consumers must handle:
1. **Loading State**: Visual feedback during in-flight network transit.
2. **Success State**: Rendered UI presentation of incoming datasets.
3. **Error State**: User-friendly messaging during network dropouts or server failures.`,
    programTitleId: 'Katalog Data Produk Live dengan Fetch API dan Penanganan Status',
    programTitleEn: 'Live Product Catalog Consumer with Fetch API and State Management',
    programCode: `<!DOCTYPE html>
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
          throw new Error(\`Gagal memuat data dari server. Kode Status HTTP: \${response.status}\`);
        }

        // Parsing stream JSON ke objek JavaScript
        const daftarPost = await response.json();

        // 3. STATE: SUCCESS (Render ke DOM)
        statusBox.style.display = "none";

        postsContainer.innerHTML = daftarPost.map(item => \`
          <article class="post-card">
            <h4>\${item.id}. \${item.title}</h4>
            <p>\${item.body}</p>
          </article>
        \`).join("");

      } catch (error) {
        // 4. STATE: ERROR
        statusBox.style.display = "block";
        statusBox.className = "status-alert alert-error";
        statusBox.textContent = \`✕ Terjadi kendala jaringan: \${error.message}\`;
      }
    }

    // Eksekusi otomatis saat halaman dibuka
    ambilDataPosts();
  </script>

</body>
</html>`,
    breakdownId: [
      '`await fetch(...)`: Mengirimkan request HTTP GET ke endpoint API publik secara asinkron tanpa memuat ulang browser.',
      '`if (!response.ok)`: Memeriksa apakah status HTTP berada di rentang 200-299; jika server mengembalikan 404 Not Found atau 500 Error, blok catch akan menangkapnya.',
      '`await response.json()`: Membaca aliran data byte response body dan mendeserialisasikannya menjadi array objek JavaScript.',
      '`daftarPost.map(...).join("")`: Mengonversi kumpulan data remote menjadi kartu markup HTML dan merendernya ke layar.',
      'Penanganan Error Jaringan: Blok `try-catch` menangani situasi saat perangkat offline atau URL tidak dapat dihubungi.'
    ],
    breakdownEn: [
      '`fetch(...)`: Dispatches an asynchronous HTTP GET request to public mock endpoints.',
      '`if (!response.ok)`: Audits HTTP status boundaries (200-299); intercepts 404 and 500 error scenarios.',
      '`await response.json()`: Streams and parses raw byte payloads into native JavaScript collections.',
      '`daftarPost.map(...).join("")`: Transforms remote JSON records into semantic HTML card markup.',
      'Network fault tolerance: The `try-catch` boundary shields the application when clients lose internet connectivity.'
    ],
    pitfallsId: [
      'Lupa await pada response.json(): response.json() adalah Promise; jika lupa await, Anda akan menerima Promise { <pending> } bukan data asli.',
      'Fetch TIDAK me-reject error HTTP 404 atau 500 secara otomatis: fetch hanya me-reject jika terjadi kegagalan jaringan fisik (misal kabel putus). Wajib periksa if (!response.ok)!',
      'Masalah CORS (Cross-Origin Resource Sharing): Mencoba melakukan fetch ke server pihak ketiga yang tidak mengizinkan akses domain luar akan diblokir oleh browser.',
      'Lupa membersihkan wadah lama: Menambahkan elemen baru tanpa mengosongkan kontainer akan membuat data lama bertumpuk setiap tombol diklik.'
    ],
    pitfallsEn: [
      'Omitting await on response.json(): response.json() returns a Promise; forgetting await leaves you with an unfulfilled Promise object.',
      'Fetch does not reject on HTTP 404 or 500: Network fetch only rejects on physical network failure; always verify response.ok manually.',
      'CORS security blocks: Fetching endpoints that lack Access-Control-Allow-Origin headers causes browsers to reject requests.',
      'Failing to flush previous data: Appending without resetting container contents duplicates previous records on successive fetches.'
    ]
  },

  // ── MINGGU 13: LocalStorage dan Modularitas ES Modules ────────────────────────
  {
    week: 13,
    topicId: 'localstorage-dan-modularitas',
    levelId: 'advanced',
    levelNameId: 'Asinkron, Storage & Proyek Akhir',
    levelNameEn: 'Asynchronous, Storage & Final Project',
    category: 'JavaScript',
    titleId: 'LocalStorage dan Modularitas ES Modules',
    titleEn: 'LocalStorage and ES Modules',
    objectivesId: [
      'Memahami Web Storage API: perbedaan localStorage (permanen) vs sessionStorage (sementara)',
      'Menguasai metode localStorage: setItem(), getItem(), removeItem(), dan clear()',
      'Menyimpan dan membaca objek kompleks dengan serialisasi JSON (JSON.stringify & parse)',
      'Memahami konsep ES Modules: export, export default, dan import untuk memecah file kode',
      'Membangun aplikasi catatan persisten yang datanya tidak hilang saat browser di-refresh'
    ],
    objectivesEn: [
      'Understand Web Storage API mechanics: persistent localStorage vs ephemeral sessionStorage',
      'Master localStorage primitives: setItem(), getItem(), removeItem(), and clear()',
      'Store and deserialize complex object graphs using JSON stringification',
      'Modularize codebases using standard ES Modules: export, export default, and import',
      'Construct a persistent notebook app retaining state across browser refreshes'
    ],
    contentId: `## 1. Apa Itu LocalStorage?

LocalStorage adalah mekanisme penyimpanan data persisten langsung di browser klien:
- **Kapasitas**: Sekitar 5MB per domain (jauh lebih besar dari Cookie yang hanya 4KB).
- **Persistensi**: Data **tidak akan hilang** meski tab ditutup atau browser dimatikan.
- **Batasan**: Hanya dapat menyimpan tipe data **string**.

---

## 2. Empat Metode Utama LocalStorage

\`\`\`javascript
// 1. Menyimpan data (Kunci, Nilai)
localStorage.setItem("tema", "gelap");

// 2. Membaca data berdasarkan kunci
const temaTersimpan = localStorage.getItem("tema"); // "gelap"

// 3. Menghapus satu data spesifik
localStorage.removeItem("tema");

// 4. Menghapus seluruh data domain
localStorage.clear();
\`\`\`

### Pola Menyimpan Objek / Array ke LocalStorage
Karena LocalStorage hanya menerima teks string, gunakan \`JSON.stringify\` saat menyimpan dan \`JSON.parse\` saat membaca:

\`\`\`javascript
const daftarCatatan = [{ id: 1, teks: "Belajar JS" }];

// Simpan:
localStorage.setItem("catatan", JSON.stringify(daftarCatatan));

// Baca kembali:
const dataAmbil = JSON.parse(localStorage.getItem("catatan") || "[]");
\`\`\`

---

## 3. Modularitas dengan ES Modules (\`import\` / \`export\`)

Dalam proyek besar, pisahkan kode menjadi beberapa file terfokus:

\`\`\`javascript
// file: storage.js
export function simpanData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// file: app.js
import { simpanData } from "./storage.js";
simpanData("user", { nama: "Alex" });
\`\`\`

Di HTML, tambahkan \`type="module"\`:
\`\`\`html
<script type="module" src="app.js"></script>
\`\`\``,
    contentEn: `## 1. What is LocalStorage?

LocalStorage provides persistent key-value storage inside the client's browser sandbox:
- **Capacity**: Approximately 5MB per origin (far superior to 4KB Cookies).
- **Persistence**: Data survives across browser restarts and session terminations.
- **Constraint**: Values are stored strictly as **strings**.

---

## 2. Core LocalStorage Methods

\`\`\`javascript
// 1. Write item
localStorage.setItem("theme", "dark");

// 2. Read item
const theme = localStorage.getItem("theme");

// 3. Delete item
localStorage.removeItem("theme");

// 4. Flush domain storage
localStorage.clear();
\`\`\`

### Serializing Objects
Always pair serialization routines:

\`\`\`javascript
// Write:
localStorage.setItem("notes", JSON.stringify(notesArray));

// Read:
const cached = JSON.parse(localStorage.getItem("notes") || "[]");
\`\`\`

---

## 3. Code Modularization with ES Modules

Split sprawling scripts into single-responsibility modules:

\`\`\`javascript
// storage.js
export function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// app.js
import { save } from "./storage.js";
save("user", { name: "Alex" });
\`\`\`

Include using \`type="module"\`:
\`\`\`html
<script type="module" src="app.js"></script>
\`\`\``,
    programTitleId: 'Aplikasi Catatan Persisten dengan Penyimpanan LocalStorage',
    programTitleEn: 'Persistent Notes Application with LocalStorage Engine',
    programCode: `<!DOCTYPE html>
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

      stats.textContent = \`\${daftarCatatan.length} catatan tersimpan di browser\`;

      if (daftarCatatan.length === 0) {
        container.innerHTML = '<li style="text-align: center; color: #A0AEC0; font-size: 13px; padding: 12px;">Belum ada catatan. Data yang Anda simpan tidak akan hilang meski halaman di-refresh.</li>';
        return;
      }

      container.innerHTML = daftarCatatan.map((note, index) => \`
        <li class="note-item">
          <span>\${note.teks}</span>
          <button class="btn-delete" onclick="hapusCatatan(\${index})" title="Hapus">&times;</button>
        </li>
      \`).join("");
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
</html>`,
    breakdownId: [
      '`localStorage.setItem(STORAGE_KEY, JSON.stringify(...))`: Mengonversi array catatan menjadi teks JSON dan menyimpannya secara persisten ke penyimpanan browser.',
      '`JSON.parse(localStorage.getItem(...))`: Membaca kembali teks string dari LocalStorage dan mengubahnya menjadi array objek saat halaman dimuat ulang.',
      '`daftarCatatan.splice(index, 1)`: Menghapus item catatan pada indeks terpilih lalu memperbarui penyimpanan LocalStorage.',
      '`localStorage.removeItem(STORAGE_KEY)`: Membersihkan kunci data tertentu dari memori tanpa mengganggu data situs lainnya.',
      'Persistensi Data Nyata: Silakan coba segarkan (refresh) halaman atau tutup browser; seluruh catatan Anda akan tetap muncul secara utuh.'
    ],
    breakdownEn: [
      '`localStorage.setItem(...)`: Serializes notes array to JSON and commits it persistently to disk.',
      '`JSON.parse(...)`: Deserializes saved JSON strings from storage back into interactive memory.',
      '`daftarCatatan.splice(index, 1)`: Removes specific items at index and syncs updated state to storage.',
      '`localStorage.removeItem(...)`: Purges specific storage keys without wiping unrelated origin records.',
      'Persistent storage guarantee: Refreshing the page or closing browser tabs preserves all active user records.'
    ],
    pitfallsId: [
      'Menyimpan objek langsung tanpa JSON.stringify: Menulis localStorage.setItem("data", objek) akan menyimpan string "[object Object]", dan data asli akan rusak.',
      'Lupa memberikan nilai fallback pada JSON.parse: Jika key belum pernah ada, getItem mengembalikan null; memanggil JSON.parse(null) menghasilkan null, bukan array kosong [].',
      'Kapasitas penyimpanan terbatas (5MB): Jangan menyimpan file gambar besar bertipe base64 ke dalam LocalStorage; jika kuota habis browser akan melempar QuotaExceededError.',
      'Data sensitif di LocalStorage: Jangan pernah menyimpan password mentah atau token rahasia sensitif di LocalStorage karena dapat diakses oleh skrip XSS.'
    ],
    pitfallsEn: [
      'Storing objects without stringification: Writing localStorage.setItem("data", obj) commits "[object Object]" irreversibly destroying the payload.',
      'Missing fallback on initial parse: Unset keys return null; provide fallback JSON.parse(localStorage.getItem(k) || "[]") to avoid null crashes.',
      'Quota limits: LocalStorage caps at ~5MB; storing heavy media strings triggers a QuotaExceededError.',
      'Storing raw secrets in LocalStorage: Avoid storing unencrypted passwords or vulnerable session tokens subject to XSS theft.'
    ]
  },

  // ── MINGGU 14: Proyek Akhir: Aplikasi Web Interaktif Lengkap ──────────────────
  {
    week: 14,
    topicId: 'proyek-akhir-aplikasi-web',
    levelId: 'advanced',
    levelNameId: 'Asinkron, Storage & Proyek Akhir',
    levelNameEn: 'Asynchronous, Storage & Final Project',
    category: 'JavaScript',
    titleId: 'Proyek Akhir: Aplikasi Web Interaktif Lengkap',
    titleEn: 'Final Project: Complete Interactive Web Application',
    objectivesId: [
      'Mengintegrasikan seluruh kompetensi 14 minggu ke dalam 1 arsitektur aplikasi modular utuh',
      'Menerapkan operasi CRUD penuh (Create, Read, Update status, Delete) berbasis state reaktif',
      'Membangun fitur pencarian (search) dan filter kategori secara dinamis di antarmuka',
      'Menerapkan persistensi otomatis ke LocalStorage dengan penanganan data aman',
      'Menyelesaikan proyek web siap pakai mandiri tanpa ketergantungan library eksternal'
    ],
    objectivesEn: [
      'Synthesize 14 weeks of competencies into a unified modular application architecture',
      'Implement complete CRUD operations (Create, Read, Update status, Delete) via reactive state',
      'Build real-time search filtering and multi-category sorting',
      'Synchronize application state persistently to LocalStorage with robust error guards',
      'Deploy a standalone production-ready web application built purely with native JavaScript'
    ],
    contentId: `## 1. Arsitektur Proyek Akhir JavaScript

Dalam minggu penutup ini, Anda merancang sebuah **Aplikasi Manajemen Tugas dan Inventaris Mandiri** lengkap:

\`\`\`text
final-javascript-project/
├── index.html           # Struktur antarmuka semantik lengkap
├── styles.css           # Penataan gaya visual & tata letak responsif
└── js/
    ├── storage.js       # Logika persistensi dan sinkronisasi LocalStorage
    ├── state.js         # Pengelolaan data state, penambahan, dan filter
    └── app.js           # Titik masuk utama, event listener & render DOM
\`\`\`

---

## 2. Sintesis Seluruh Modul (Minggu 1-13)

Proyek ini menyatukan seluruh pilar JavaScript:
1. **Pondasi Bahasa (Minggu 1-5):** Variabel \`const\`/\`let\`, tipe data primitif, percabangan logika kelayakan data, perulangan pemrosesan, dan fungsi terpisah (*Pure Functions*).
2. **Struktur Data & DOM (Minggu 6-9):** Transformasi array (\`map\`, \`filter\`, \`reduce\`), destrukturisasi objek, seleksi querySelector, manipulasi classList, dan event delegation pada form submit.
3. **Penyimpanan & Keamanan (Minggu 10-13):** Serialisasi JSON, validasi masukan pencegah XSS via \`textContent\`, dan penyimpanan persisten di LocalStorage.

---

## 3. Alur Data Satu Arah (Unidirectional Data Flow)

\`\`\`text
[ User Action / Event ] ──► [ Update State (Array Objek) ]
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
     [ Simpan ke LocalStorage ]                    [ Render Ulang DOM ]
\`\`\`

Dengan memisahkan state data dari elemen HTML di layar, kode menjadi sangat mudah didebug dan dipelihara.`,
    contentEn: `## 1. Final JavaScript Capstone Architecture

In this concluding capstone week, you synthesize all competencies into a standalone **Task and Inventory Management Application**:

\`\`\`text
final-javascript-project/
├── index.html           # Semantic layout structure
├── styles.css           # Visual presentation and responsive styling
└── js/
    ├── storage.js       # LocalStorage synchronization routines
    ├── state.js         # Reactive state operations and filtering
    └── app.js           # Main entry point, event dispatchers, and DOM renderer
\`\`\`

---

## 2. End-to-End Module Synthesis (Weeks 1-13)

This capstone unites:
1. **Language Foundations (Weeks 1-5):** \`const\`/\`let\` invariants, primitives, conditional guards, iteration loops, and pure function pipelines.
2. **Data & DOM (Weeks 6-9):** Functional array methods (\`map\`, \`filter\`, \`reduce\`), destructuring, dynamic DOM construction, and unified event delegation.
3. **Storage & Security (Weeks 10-13):** Safe JSON serialization, XSS-proof text bindings, and resilient LocalStorage state persistence.

---

## 3. Unidirectional Data Flow

\`\`\`text
[ User Action / Event ] ──► [ Update State (Array of Objects) ]
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
     [ Commit to LocalStorage ]                    [ Re-render DOM Views ]
\`\`\`

Separating raw data state from DOM elements creates modular, maintainable applications.`,
    programTitleId: 'Aplikasi Manajemen Tugas dan Proyek Mandiri Lengkap',
    programTitleEn: 'Complete Standalone Project and Task Management Application',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Tugas Mandiri — Proyek Akhir</title>
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
      padding: 24px 16px;
      line-height: 1.5;
    }

    .app-container {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .app-header {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 24px;
      text-align: center;
    }

    .app-header h2 {
      font-size: 22px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    .app-header p {
      font-size: 13px;
      opacity: 0.9;
    }

    .app-body {
      padding: 24px;
    }

    /* Formulir Tambah */
    .task-form {
      display: grid;
      grid-template-columns: 1fr 140px auto;
      gap: 10px;
      margin-bottom: 20px;
    }

    input, select, button {
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 14px;
      border: 1px solid #CBD5E0;
    }

    .btn-primary {
      background-color: #2E5B44;
      color: white;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .btn-primary:hover {
      background-color: #234634;
    }

    /* Toolbar Filter & Pencarian */
    .search-filter-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .search-filter-bar input {
      flex: 1;
    }

    /* Daftar Item Tugas */
    .task-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 120px;
    }

    .task-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #2E5B44;
      border-radius: 8px;
      background: #FFFFFF;
      transition: all 0.2s ease;
    }

    .task-card.completed {
      background-color: #F7FAFC;
      border-left-color: #A0AEC0;
      opacity: 0.7;
    }

    .task-card.completed .title-text {
      text-decoration: line-through;
      color: #718096;
    }

    .task-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .category-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      background-color: #E2F2E9;
      color: #2E5B44;
    }

    .btn-delete-item {
      background: none;
      border: none;
      color: #E53E3E;
      font-size: 18px;
      cursor: pointer;
      padding: 4px 8px;
    }

    /* Footer Ringkasan */
    .app-footer {
      border-top: 1px solid #E2E8F0;
      padding: 16px 24px;
      background-color: #F7FAFC;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="app-container">
    <header class="app-header">
      <h2>Portal Manajemen Tugas Mandiri</h2>
      <p>Proyek Akhir Capstone: Aplikasi Terstruktur Berbasis State & LocalStorage</p>
    </header>

    <div class="app-body">
      <!-- 1. Formulir Tambah Data -->
      <form id="add-form" class="task-form">
        <input type="text" id="title-input" placeholder="Nama tugas baru..." required>
        <select id="category-select">
          <option value="Proyek">Proyek</option>
          <option value="Belajar">Belajar</option>
          <option value="Pribadi">Pribadi</option>
        </select>
        <button type="submit" class="btn-primary">+ Tambah</button>
      </form>

      <!-- 2. Pencarian dan Filter Realtime -->
      <div class="search-filter-bar">
        <input type="text" id="search-input" placeholder="Cari nama tugas...">
        <select id="filter-select">
          <option value="SEMUA">Semua Kategori</option>
          <option value="Proyek">Proyek</option>
          <option value="Belajar">Belajar</option>
          <option value="Pribadi">Pribadi</option>
        </select>
      </div>

      <!-- 3. Daftar Tampilan Tugas -->
      <ul id="task-list-view" class="task-list"></ul>
    </div>

    <!-- 4. Ringkasan Status -->
    <footer class="app-footer">
      <span id="metric-summary">Memuat metrik...</span>
      <button onclick="bersihkanSelesai()" style="background:none; border:none; color:#2E5B44; font-weight:600; cursor:pointer; font-size:12px;">Hapus yang Selesai</button>
    </footer>
  </div>

  <script>
    // ── 1. MODUL STORAGE PERSISTENSI ──
    const KEY_STORAGE = "tryngo_capstone_tasks";

    function loadState() {
      const saved = localStorage.getItem(KEY_STORAGE);
      if (saved) {
        try { return JSON.parse(saved); } catch(e) { return []; }
      }
      // Data Awal Bawaan
      return [
        { id: 1, judul: "Menyelesaikan Modul HTML5 Semantik", kategori: "Belajar", selesai: true },
        { id: 2, judul: "Membangun Desain CSS Responsif", kategori: "Proyek", selesai: true },
        { id: 3, judul: "Menguasai Pemrograman JavaScript", kategori: "Belajar", selesai: false }
      ];
    }

    function saveState(data) {
      localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
    }

    // ── 2. SINGLE SOURCE OF TRUTH (STATE) ──
    let appState = loadState();

    // ── 3. RENDER FUNCTION (UNIDIRECTIONAL UI) ──
    function renderApp() {
      const listView = document.getElementById("task-list-view");
      const searchQuery = document.getElementById("search-input").value.toLowerCase();
      const filterCategory = document.getElementById("filter-select").value;

      // Filter Data berdasarkan Search dan Kategori
      const filtered = appState.filter(item => {
        const cocokCari = item.judul.toLowerCase().includes(searchQuery);
        const cocokKategori = filterCategory === "SEMUA" || item.kategori === filterCategory;
        return cocokCari && cocokKategori;
      });

      // Update Metrik Ringkasan (Reduce & Filter)
      const totalSelesai = appState.filter(t => t.selesai).length;
      document.getElementById("metric-summary").textContent = 
        \`\${totalSelesai} dari \${appState.length} tugas selesai (\${appState.length === 0 ? 0 : Math.round((totalSelesai/appState.length)*100)}%)\`;

      if (filtered.length === 0) {
        listView.innerHTML = '<li style="text-align:center; padding:24px; color:#A0AEC0; font-size:13px;">Tidak ada tugas yang sesuai kriteria pencarian.</li>';
        return;
      }

      listView.innerHTML = filtered.map(item => \`
        <li class="task-card \${item.selesai ? 'completed' : ''}" data-id="\${item.id}">
          <div class="task-info">
            <input type="checkbox" \${item.selesai ? 'checked' : ''} onchange="toggleStatus(\${item.id})">
            <span class="category-badge">\${item.kategori}</span>
            <span class="title-text">\${item.judul}</span>
          </div>
          <button class="btn-delete-item" onclick="deleteTask(\${item.id})" title="Hapus Tugas">&times;</button>
        </li>
      \`).join("");
    }

    // ── 4. AKSI PENGUBAH STATE (MUTATORS) ──
    document.getElementById("add-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const titleInput = document.getElementById("title-input");
      const categorySelect = document.getElementById("category-select");

      const judulBaru = titleInput.value.trim();
      if (!judulBaru) return;

      // Buat item baru
      const itemBaru = {
        id: Date.now(),
        judul: judulBaru,
        kategori: categorySelect.value,
        selesai: false
      };

      appState.unshift(itemBaru);
      saveState(appState);
      renderApp();

      titleInput.value = "";
      titleInput.focus();
    });

    function toggleStatus(id) {
      appState = appState.map(item => {
        if (item.id === id) {
          return { ...item, selesai: !item.selesai };
        }
        return item;
      });
      saveState(appState);
      renderApp();
    }

    function deleteTask(id) {
      appState = appState.filter(item => item.id !== id);
      saveState(appState);
      renderApp();
    }

    function bersihkanSelesai() {
      appState = appState.filter(item => !item.selesai);
      saveState(appState);
      renderApp();
    }

    // Listener Live Search dan Filter
    document.getElementById("search-input").addEventListener("input", renderApp);
    document.getElementById("filter-select").addEventListener("change", renderApp);

    // Render Perdana
    renderApp();
  </script>

</body>
</html>`,
    breakdownId: [
      '`Single Source of Truth (appState)`: Seluruh data aplikasi dikelola dalam satu array objek sentral, bukan tersebar di elemen HTML.',
      '`Unidirectional Data Flow`: Setiap kali terjadi penambahan, penghapusan, atau perubahan status, state diperbarui terlebih dahulu, disimpan ke LocalStorage, lalu tampilan dirender ulang.',
      '`appState.filter(...)`: Mengombinasikan pencarian teks `includes()` dan penyaringan kategori dropdown secara simultan dan instan.',
      '`toggleStatus(id)`: Menggunakan `map()` dan spread operator `{ ...item, selesai: !item.selesai }` untuk memperbarui status centang tanpa mutasi langsung.',
      '`bersihkanSelesai()`: Fitur pembersihan cepat yang membuang seluruh tugas yang sudah selesai dari state dan storage.'
    ],
    breakdownEn: [
      '`Single Source of Truth`: Application state lives in a centralized array of objects rather than dispersed across HTML element nodes.',
      '`Unidirectional Data Flow`: User interactions mutate state, state commits to LocalStorage, and views re-render deterministically.',
      '`appState.filter(...)`: Integrates real-time substring search matching with categorical dropdown filters simultaneously.',
      '`toggleStatus(id)`: Deploys immutable functional map and spread operations to flip task completion states safely.',
      '`bersihkanSelesai()`: Purges completed task records cleanly from memory and storage in a single action.'
    ],
    pitfallsId: [
      'Menyimpan state di dalam elemen DOM (DOM as state): Menyimpan status data di atribut HTML membuat sinkronisasi LocalStorage dan pencarian menjadi sangat rumit.',
      'Lupa memanggil renderApp() setelah mutasi state: Jika state diubah tetapi fungsi render tidak dipanggil, layar pengguna tidak akan menampilkan perubahan apa pun.',
      'Menggunakan indeks array sebagai ID unik: Jika data diurutkan atau difilter, indeks array akan bergeser dan menghapus item yang salah. Selalu gunakan ID unik seperti Date.now().',
      'Pencarian case-sensitive: Lupa menggunakan .toLowerCase() pada query dan judul tugas akan membuat pencarian gagal jika huruf besar-kecil tidak sama persis.'
    ],
    pitfallsEn: [
      'Using the DOM as state store: Storing data inside DOM nodes makes filtering, persistence, and debugging extremely fragile.',
      'Omitting renderApp() post-mutation: Mutating internal state without dispatching re-render calls leaves the interface stale.',
      'Using array indices as unique identifiers: Filtering or sorting causes index shifts deleting wrong items; always rely on persistent unique IDs like Date.now().',
      'Case-sensitive search lookups: Omitting .toLowerCase() normalization breaks search matching whenever capitalization differs.'
    ]
  }
];
