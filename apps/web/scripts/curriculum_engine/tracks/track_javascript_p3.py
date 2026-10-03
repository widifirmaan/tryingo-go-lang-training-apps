# JavaScript Track: Level 3 (Weeks 9-12)
# Asinkron, Storage & Proyek Kanban

MODULES_P3 = [
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'event-loop-dan-asinkron',
        'titleId': 'Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues',
        'titleEn': 'Asynchronous Architecture: The V8 Event Loop, Stack & Queues',
        'programId': 'Simulasi Alur Antrean Event Loop (Microtasks vs Macrotasks)',
        'programEn': 'V8 Event Loop Queue Simulation (Microtasks vs Macrotasks)',
        'levelNameId': 'Asinkron, Storage & Proyek Kanban',
        'levelNameEn': 'Asynchronous, Storage & Kanban Project',
        'language': 'javascript',
        'code': """console.log("1. [Synchronous] Kode sinkron Call Stack dimulai.");

setTimeout(() => {
  console.log("4. [Macrotask - setTimeout] Berjalan di antrean macrotask.");
}, 0);

Promise.resolve().then(() => {
  console.log("3. [Microtask - Promise] Diproses sebelum Macrotask!");
});

console.log("2. [Synchronous] Kode sinkron Call Stack selesai.");""",
        'objectivesId': [
            'Memahami bahwa JavaScript adalah Single-Threaded berbasis Call Stack non-blocking',
            'Menguasai anatomi Event Loop: Call Stack, Microtasks, dan Macrotasks',
            'Memahami prioritas eksekusi Promise (Microtask) di atas setTimeout (Macrotask)',
            'Mencegah pembekuan thread browser (UI freeze) dengan pemrosesan asinkron',
            'Memanfaatkan queueMicrotask() untuk penjadwalan tugas prioritas tinggi',
        ],
        'objectivesEn': [
            'Understand JavaScript as a single-threaded non-blocking runtime',
            'Deconstruct the Event Loop: Call Stack, Microtasks, and Macrotasks',
            'Understand Promise microtask precedence over setTimeout macrotasks',
            'Prevent browser UI thread freezes with asynchronous offloading',
            'Leverage queueMicrotask() for explicit priority task scheduling',
        ],
        'explanationId': """### Event Loop V8
JavaScript mengeksekusi kode sinkron pada Call Stack. Saat operasi asinkron selesai:
- Callback **Promise** masuk ke **Microtask Queue** (prioritas tertinggi).
- Callback **setTimeout** masuk ke **Macrotask Queue** (prioritas standar).
Seluruh antrean Microtask wajib dikosongkan terlebih dahulu sebelum browser beralih ke Macrotask berikutnya.""",
        'explanationEn': """### The V8 Event Loop
JavaScript evaluates synchronous code on the Call Stack. When asynchronous tasks settle:
- **Promise** callbacks queue into the **Microtask Queue** (high priority).
- **setTimeout** callbacks queue into the **Macrotask Queue** (standard priority).
All microtasks drain to exhaustion before the next macrotask is processed.""",
        'beginnerId': """### Analogi: Dokter dan Pasien Gawat Darurat
Call Stack adalah dokter yang sedang memeriksa pasien. Microtask adalah ambulans gawat darurat yang langsung ditangani dokter lebih dulu. Macrotask (setTimeout) adalah pasien antrean umum yang menunggu giliran dengan tertib.""",
        'beginnerEn': """### Analogy: Emergency Room Triage
The Call Stack is the physician in the examination room. Microtasks are arriving trauma cases treated immediately. Macrotasks (setTimeout) are standard clinic ticket holders waiting their turn.""",
        'experimentsId': [
            'Jalankan kode dan amati urutan pencetakan 1 -> 2 -> 3 -> 4.',
            'Ubah waktu setTimeout dari 0 ke 500ms untuk melihat penundaan.',
            'Uji pemanggilan queueMicrotask() untuk verifikasi prioritas.',
            'Bandingkan waktu eksekusi kode sinkron vs asinkron di konsol.',
        ],
        'experimentsEn': [
            'Run the snippet to confirm the execution sequence: 1 -> 2 -> 3 -> 4.',
            'Increase setTimeout delay from 0 to 500ms.',
            'Test queueMicrotask() to observe execution order.',
            'Compare synchronous versus asynchronous execution times.',
        ],
        'challengeId': 'Buat fungsi `delay(ms)` berbasis Promise yang me-resolve setelah `ms` milidetik menggunakan setTimeout.',
        'challengeEn': 'Author a Promise-based `delay(ms)` helper that resolves after `ms` milliseconds via setTimeout.',
        'summaryId': 'Kamu telah menguasai arsitektur V8 Event Loop. Minggu depan kita akan mendalami pemanggilan API HTTP dengan Promises, async/await, dan Fetch API.',
        'summaryEn': 'You have mastered the V8 Event Loop. Next week, we consume live HTTP network APIs via Promises, async/await, and the Fetch API.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'promises-async-await-dan-fetch',
        'titleId': 'Promises, Async/Await & Konsumsi HTTP REST API dengan Fetch',
        'titleEn': 'Promises, Async/Await & HTTP REST API Consumption via Fetch',
        'programId': 'Klien Pemanggil API Publik GitHub dengan Penanganan Error Kuat',
        'programEn': 'Resilient GitHub Public API Client with Comprehensive Error Handling',
        'levelNameId': 'Asinkron, Storage & Proyek Kanban',
        'levelNameEn': 'Asynchronous, Storage & Kanban Project',
        'language': 'javascript',
        'code': """async function ambilProfilGithub(username) {
  const url = "https://api.github.com/users/" + encodeURIComponent(username);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Gagal dengan status: " + response.status);
    }
    const data = await response.json();
    console.log("Nama Pengguna:", data.name || data.login);
    console.log("Repositori   :", data.public_repos, "repositori");
    return data;
  } catch (error) {
    console.error("[ERROR]", error.message);
    return null;
  } finally {
    console.log("[SELESAI] Request jaringan ditutup.");
  }
}

ambilProfilGithub("torvalds");""",
        'objectivesId': [
            'Memahami 3 status Promise: Pending, Fulfilled, dan Rejected',
            'Menggunakan async/await untuk penulisan kode asinkron yang bersih',
            'Memahami bahwa fetch() tidak reject pada status HTTP 404/500',
            'Selalu memeriksa response.ok sebelum parsing JSON',
            'Menerapkan blok try-catch-finally untuk penanganan error tangguh',
        ],
        'objectivesEn': [
            'Master the three Promise states: Pending, Fulfilled, and Rejected',
            'Deploy async/await for clear and maintainable asynchronous code',
            'Understand that fetch() does not reject on HTTP 404/500 errors',
            'Always validate response.ok before parsing JSON data',
            'Deploy try-catch-finally for robust network resilience',
        ],
        'explanationId': """### Async/Await & Fetch API
Kata kunci `async` menandai fungsi mengembalikan Promise, sementara `await` menjeda eksekusi fungsi secara non-blocking hingga Promise selesai.
Ingat: `fetch()` hanya melempar reject saat koneksi jaringan putus total, bukan saat server membalas dengan status 404 atau 500. Selalu periksa `response.ok`!""",
        'explanationEn': """### Async/Await & Fetch API
The `async` keyword ensures a function returns a Promise, while `await` pauses execution non-blockingly until resolution.
Remember: `fetch()` only rejects on total network failure, not on HTTP 404 or 500 responses. Always verify `response.ok`!""",
        'beginnerId': """### Analogi: Bel Getar di Kafe
Promise seperti bel pager nirkabel yang diberikan kasir kafe: saat menunggu kopi diracik (**Pending**), saat kopi siap bel bergetar (**Fulfilled**), dan jika kopi habis barista mengembalikan uang (**Rejected**).""",
        'beginnerEn': """### Analogy: The Coffee Pager Disc
A Promise is the wireless buzzer handed to you at a cafe: while waiting it is **Pending**, when ready it buzzes (**Fulfilled**), and if out of stock it is cancelled (**Rejected**).""",
        'experimentsId': [
            'Panggil username yang tidak ada dan amati pesan error status 404.',
            'Gunakan Promise.all untuk mengambil dua profil sekaligus secara paralel.',
            'Matikan koneksi internet untuk melihat TypeError yang ditangkap blok catch.',
            'Perhatikan bahwa blok finally selalu berjalan di akhir.',
        ],
        'experimentsEn': [
            'Query a nonexistent username to inspect the 404 error message.',
            'Use Promise.all to fetch two profiles in parallel.',
            'Disconnect network to observe TypeError in the catch block.',
            'Confirm that the finally block runs in all scenarios.',
        ],
        'challengeId': 'Buat fungsi `cariRepo(keyword)` yang mengambil repositori terpopuler dari GitHub API dan mengembalikan array 3 proyek teratas.',
        'challengeEn': 'Build a `cariRepo(keyword)` function that retrieves top repositories from GitHub API and returns the top 3 projects.',
        'summaryId': 'Kamu telah menguasai konsumsi API jaringan dengan async/await dan Fetch API. Minggu depan kita akan mendalami penyimpanan data lokal browser.',
        'summaryEn': 'You have mastered network API consumption with async/await and Fetch API. Next week, we examine browser local data storage.',
    },
    {
        'week': 11,
        'level': 'advanced',
        'topicId': 'browser-storage-dan-state-persistence',
        'titleId': 'Penyimpanan Browser: LocalStorage, SessionStorage & Serialisasi JSON',
        'titleEn': 'Browser Storage: LocalStorage, SessionStorage & JSON Persistence',
        'programId': 'Engine Penyimpanan State Aplikasi dengan Enkapsulasi LocalStorage',
        'programEn': 'Application State Persistence Engine with LocalStorage Encapsulation',
        'levelNameId': 'Asinkron, Storage & Proyek Kanban',
        'levelNameEn': 'Asynchronous, Storage & Kanban Project',
        'language': 'javascript',
        'code': """class StorageManager {
  static simpan(kunci, nilai) {
    try {
      localStorage.setItem(kunci, JSON.stringify(nilai));
      return true;
    } catch (e) {
      console.error("Gagal menyimpan ke storage:", e);
      return false;
    }
  }

  static ambil(kunci, fallback = null) {
    try {
      const data = localStorage.getItem(kunci);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }
}

// Uji Simpan dan Baca
StorageManager.simpan("preferensi_user", { tema: "dark", fontSize: 16 });
const saved = StorageManager.ambil("preferensi_user");
console.log("Tema tersimpan:", saved.tema);""",
        'objectivesId': [
            'Membedakan LocalStorage (permanen) vs SessionStorage (sementara per tab)',
            'Memahami kuota penyimpanan Web Storage (~5MB) dan batasan tipe data teks',
            'Menguasai serialisasi JSON.stringify() dan deserialisasi JSON.parse()',
            'Membangun kelas abstraksi penyimpanan untuk mencegah bentrokan kunci',
            'Menangani error kuota penuh dengan blok try-catch pelindung',
        ],
        'objectivesEn': [
            'Differentiate LocalStorage (persistent) from SessionStorage (session-bound)',
            'Understand Web Storage quotas (~5MB) and string-only data restrictions',
            'Master JSON.stringify() serialization and JSON.parse() deserialization',
            'Build a storage abstraction helper to eliminate key collision issues',
            'Safely handle quota exceeded errors with defensive try-catch blocks',
        ],
        'explanationId': """### Web Storage & Serialisasi JSON
LocalStorage menyimpan data permanen di browser pengguna. Karena Web Storage hanya menerima tipe teks string murni, data objek atau array wajib diserialisasi menggunakan `JSON.stringify()` sebelum disimpan dan dibaca kembali dengan `JSON.parse()`.""",
        'explanationEn': """### Web Storage & JSON Serialization
LocalStorage retains data across browser restarts. Because it accepts only raw string tokens, rich objects or arrays must be serialized with `JSON.stringify()` on save and deserialized with `JSON.parse()` on load.""",
        'beginnerId': """### Analogi: Lemari Arsip Pribadi
LocalStorage seperti lemari brankas di rumah: dokumen penting yang Anda simpan di lemari tetap aman ada di sana meskipun Anda mematikan lampu dan tidur nyenyak.""",
        'beginnerEn': """### Analogy: Home Safe
LocalStorage is a home steel safe: important documents placed inside remain securely preserved even when the power is turned off.""",
        'experimentsId': [
            'Buka tab Application -> Local Storage di DevTools untuk melihat data tersimpan.',
            'Coba simpan objek tanpa JSON.stringify dan amati string [object Object] yang rusak.',
            'Gunakan localStorage.removeItem() untuk menghapus data tertentu.',
            'Gunakan localStorage.clear() untuk membersihkan seluruh penyimpanan.',
        ],
        'experimentsEn': [
            'Open DevTools Application -> Local Storage to inspect persisted key-value pairs.',
            'Save an object without JSON.stringify to see the broken [object Object] string.',
            'Use localStorage.removeItem() to delete a specific key.',
            'Use localStorage.clear() to wipe all storage.',
        ],
        'challengeId': 'Buat fungsi cache sederhana yang menyimpan hasil panggilan API ke LocalStorage dengan timestamp kadaluarsa (TTL) 5 menit.',
        'challengeEn': 'Build a simple cache helper that stores API results in LocalStorage with a 5-minute time-to-live (TTL) expiration.',
        'summaryId': 'Kamu telah menguasai penyimpanan lokal persisten di browser. Minggu depan adalah proyek capstone: membangun aplikasi Kanban Board interaktif lengkap!',
        'summaryEn': 'You have mastered persistent browser storage. Next week is the capstone project: building a full-featured interactive Kanban Board!',
    },
    {
        'week': 12,
        'level': 'advanced',
        'topicId': 'proyek-akhir-kanban-board-lengkap',
        'titleId': 'Proyek Akhir: Aplikasi Papan Tugas Kanban Interaktif Lengkap',
        'titleEn': 'Capstone Project: Full Interactive Kanban Task Management Board',
        'programId': 'Aplikasi Kanban Task Board dengan Drag-and-Drop & Persistence',
        'programEn': 'Full Interactive Kanban Board with Drag-and-Drop & Local Persistence',
        'levelNameId': 'Asinkron, Storage & Proyek Kanban',
        'levelNameEn': 'Asynchronous, Storage & Kanban Project',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tryngo Kanban Studio</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #0F172A; color: #F8FAFC; padding: 24px; }
    header { max-width: 1000px; margin: 0 auto 24px; display: flex; justify-content: space-between; align-items: center; }
    h1 { font-size: 1.5rem; color: #38BDF8; font-weight: 800; }
    .btn-add { background: #0284C7; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .board { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1000px; margin: 0 auto; }
    .col { background: #1E293B; border-radius: 14px; padding: 16px; min-height: 400px; border: 1px solid #334155; }
    .col-header { display: flex; justify-content: space-between; margin-bottom: 12px; font-weight: bold; font-size: 0.9rem; }
    .task-list { min-height: 320px; display: flex; flex-direction: column; gap: 10px; }
    .task-card { background: #0F172A; border: 1px solid #334155; border-radius: 10px; padding: 12px; cursor: grab; }
    .task-card:active { cursor: grabbing; }
    .task-card.dragging { opacity: 0.4; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>Tryngo Kanban Studio</h1>
      <p style="color: #94A3B8; font-size: 0.85rem;">Papan tugas berbasis JavaScript murni dengan Drag & Drop dan LocalStorage.</p>
    </div>
    <button class="btn-add" id="btn-add">+ Tambah Tugas</button>
  </header>

  <div class="board">
    <div class="col" data-status="TODO">
      <div class="col-header"><span style="color: #FBBF24;">Rencana</span><span id="cnt-TODO">0</span></div>
      <div class="task-list" id="list-TODO"></div>
    </div>
    <div class="col" data-status="PROGRESS">
      <div class="col-header"><span style="color: #38BDF8;">Dikerjakan</span><span id="cnt-PROGRESS">0</span></div>
      <div class="task-list" id="list-PROGRESS"></div>
    </div>
    <div class="col" data-status="DONE">
      <div class="col-header"><span style="color: #34D399;">Selesai</span><span id="cnt-DONE">0</span></div>
      <div class="task-list" id="list-DONE"></div>
    </div>
  </div>

  <script>
    const KEY = "tryngo_kanban_data";
    let tasks = JSON.parse(localStorage.getItem(KEY)) || [
      { id: "1", title: "Setup WebAssembly Runner", status: "DONE" },
      { id: "2", title: "Drag & Drop Interface", status: "PROGRESS" },
      { id: "3", title: "Automated Quiz Generator", status: "TODO" }
    ];

    function saveAndRender() {
      localStorage.setItem(KEY, JSON.stringify(tasks));
      ["TODO", "PROGRESS", "DONE"].forEach(st => {
        const list = document.getElementById("list-" + st);
        const cnt = document.getElementById("cnt-" + st);
        const items = tasks.filter(t => t.status === st);
        cnt.textContent = items.length;
        list.innerHTML = "";
        items.forEach(t => {
          const el = document.createElement("div");
          el.className = "task-card";
          el.draggable = true;
          el.textContent = t.title;
          el.dataset.id = t.id;
          el.addEventListener("dragstart", e => {
            el.classList.add("dragging");
            e.dataTransfer.setData("text/plain", t.id);
          });
          el.addEventListener("dragend", () => el.classList.remove("dragging"));
          list.appendChild(el);
        });
      });
    }

    document.querySelectorAll(".task-list").forEach(zone => {
      zone.addEventListener("dragover", e => e.preventDefault());
      zone.addEventListener("drop", e => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const newStatus = zone.closest(".col").dataset.status;
        const task = tasks.find(t => t.id === id);
        if (task) { task.status = newStatus; saveAndRender(); }
      });
    });

    document.getElementById("btn-add").addEventListener("click", () => {
      const title = prompt("Nama tugas baru:");
      if (title && title.trim()) {
        tasks.push({ id: Date.now().toString(), title: title.trim(), status: "TODO" });
        saveAndRender();
      }
    });

    saveAndRender();
  </script>
</body>
</html>""",
        'objectivesId': [
            'Mengintegrasikan seluruh kurikulum JavaScript: fungsi, array fungsional, objek, DOM, event, dan LocalStorage',
            'Menerapkan HTML5 Drag and Drop API (dragstart, dragover, drop, dragend) secara interaktif',
            'Mengelola State terpusat (Single Source of Truth) dan merender ulang tampilan secara deklaratif',
            'Menyimpan dan memulihkan state antarmuka secara permanen di LocalStorage browser',
            'Menerapkan sanitasi input pengguna untuk mencegah celah keamanan injeksi XSS',
        ],
        'objectivesEn': [
            'Synthesize the full JavaScript curriculum: functions, array pipelines, objects, DOM, events, and LocalStorage',
            'Implement native HTML5 Drag and Drop APIs (dragstart, dragover, drop, dragend) fluidly',
            'Enforce a Single Source of Truth application state model with declarative DOM re-rendering',
            'Persist and restore comprehensive UI workspace graphs across browser sessions via LocalStorage',
            'Sanitize user inputs to eradicate Cross-Site Scripting (XSS) attack vectors',
        ],
        'explanationId': """### Arsitektur Aplikasi Kanban Modern
Aplikasi capstone ini mengintegrasikan seluruh konsep JavaScript:
1. **Single Source of Truth**: Array `tasks` adalah satu-satunya acuan data aplikasi.
2. **HTML5 Drag & Drop**: Penggunaan `e.dataTransfer.setData` dan `dragover` dengan `preventDefault()` untuk memungkinkan pemindahan kartu antar kolom.
3. **Persistensi State**: Setiap perpindahan kartu langsung diserialisasi ke `localStorage` dan merender ulang tampilan secara otomatis.""",
        'explanationEn': """### Modern Kanban Architecture
This capstone integrates all core JavaScript concepts:
1. **Single Source of Truth**: The `tasks` array serves as the central data store.
2. **HTML5 Drag & Drop**: Leveraging `dataTransfer.setData` and `preventDefault()` on `dragover` allows smooth cross-column card relocation.
3. **State Persistence**: Every drop event automatically writes state to `localStorage` and triggers a clean re-render.""",
        'beginnerId': """### Analogi: Papan Kanban Kantor
Array `tasks` adalah buku catatan manajer kantor. Menyeret kartu seperti memindahkan kertas Post-It kuning dari kolom "Rencana" ke kolom "Selesai" di papan tulis kantor.""",
        'beginnerEn': """### Analogy: The Office Whiteboard
The `tasks` array is the project manager's logbook. Dragging cards is peeling a sticky note from the "To Do" column and moving it to "Done" on the glass whiteboard.""",
        'experimentsId': [
            'Seret kartu dari kolom Rencana ke Dikerjakan dan refresh browser untuk melihat data tetap tersimpan.',
            'Tambah tugas baru menggunakan tombol "+ Tambah Tugas".',
            'Buka DevTools Application -> Local Storage untuk melihat pembaruan data secara langsung.',
            'Coba ubah status kolom langsung di array tasks dan panggil saveAndRender().',
        ],
        'experimentsEn': [
            'Drag a card across columns and refresh the browser to confirm state persistence.',
            'Add a new task using the "+ Add Task" button.',
            'Check DevTools Application -> Local Storage to view live updates.',
            'Mutate a task status programmatically and call saveAndRender().',
        ],
        'challengeId': 'Tambahkan tombol "Hapus" pada setiap kartu tugas dengan konfirmasi dialog sebelum menghapus.',
        'challengeEn': 'Add a "Delete" button to each task card with a confirmation prompt before deletion.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh 12 minggu kurikulum JavaScript dari nol hingga aplikasi Kanban interaktif produksi. Kamu sekarang siap melangkah ke TypeScript!',
        'summaryEn': 'Congratulations! You have completed the entire 12-week JavaScript curriculum from zero to an interactive production Kanban app. You are now prepared to advance to TypeScript!',
    },
]
