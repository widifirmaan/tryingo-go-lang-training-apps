# Proyek Akhir: Aplikasi Web Interaktif Lengkap

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Akhir | **Minggu 14:** Proyek Akhir: Aplikasi Web Interaktif Lengkap
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Mengintegrasikan seluruh kompetensi 14 minggu ke dalam 1 arsitektur aplikasi modular utuh
- Menerapkan operasi CRUD penuh (Create, Read, Update status, Delete) berbasis state reaktif
- Membangun fitur pencarian (search) dan filter kategori secara dinamis di antarmuka
- Menerapkan persistensi otomatis ke LocalStorage dengan penanganan data aman
- Menyelesaikan proyek web siap pakai mandiri tanpa ketergantungan library eksternal

---

## 1. Arsitektur Proyek Akhir JavaScript

Dalam minggu penutup ini, Anda merancang sebuah **Aplikasi Manajemen Tugas dan Inventaris Mandiri** lengkap:

```text
final-javascript-project/
├── index.html           # Struktur antarmuka semantik lengkap
├── styles.css           # Penataan gaya visual & tata letak responsif
└── js/
    ├── storage.js       # Logika persistensi dan sinkronisasi LocalStorage
    ├── state.js         # Pengelolaan data state, penambahan, dan filter
    └── app.js           # Titik masuk utama, event listener & render DOM
```

---

## 2. Sintesis Seluruh Modul (Minggu 1-13)

Proyek ini menyatukan seluruh pilar JavaScript:
1. **Pondasi Bahasa (Minggu 1-5):** Variabel `const`/`let`, tipe data primitif, percabangan logika kelayakan data, perulangan pemrosesan, dan fungsi terpisah (*Pure Functions*).
2. **Struktur Data & DOM (Minggu 6-9):** Transformasi array (`map`, `filter`, `reduce`), destrukturisasi objek, seleksi querySelector, manipulasi classList, dan event delegation pada form submit.
3. **Penyimpanan & Keamanan (Minggu 10-13):** Serialisasi JSON, validasi masukan pencegah XSS via `textContent`, dan penyimpanan persisten di LocalStorage.

---

## 3. Alur Data Satu Arah (Unidirectional Data Flow)

```text
[ User Action / Event ] ──► [ Update State (Array Objek) ]
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
     [ Simpan ke LocalStorage ]                    [ Render Ulang DOM ]
```

Dengan memisahkan state data dari elemen HTML di layar, kode menjadi sangat mudah didebug dan dipelihara.

---

## Program: Aplikasi Manajemen Tugas dan Proyek Mandiri Lengkap

```html
<!DOCTYPE html>
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
        `${totalSelesai} dari ${appState.length} tugas selesai (${appState.length === 0 ? 0 : Math.round((totalSelesai/appState.length)*100)}%)`;

      if (filtered.length === 0) {
        listView.innerHTML = '<li style="text-align:center; padding:24px; color:#A0AEC0; font-size:13px;">Tidak ada tugas yang sesuai kriteria pencarian.</li>';
        return;
      }

      listView.innerHTML = filtered.map(item => `
        <li class="task-card ${item.selesai ? 'completed' : ''}" data-id="${item.id}">
          <div class="task-info">
            <input type="checkbox" ${item.selesai ? 'checked' : ''} onchange="toggleStatus(${item.id})">
            <span class="category-badge">${item.kategori}</span>
            <span class="title-text">${item.judul}</span>
          </div>
          <button class="btn-delete-item" onclick="deleteTask(${item.id})" title="Hapus Tugas">&times;</button>
        </li>
      `).join("");
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
</html>
```

---

## Bedah Detail Kode Program

- `Single Source of Truth (appState)`: Seluruh data aplikasi dikelola dalam satu array objek sentral, bukan tersebar di elemen HTML.
- `Unidirectional Data Flow`: Setiap kali terjadi penambahan, penghapusan, atau perubahan status, state diperbarui terlebih dahulu, disimpan ke LocalStorage, lalu tampilan dirender ulang.
- `appState.filter(...)`: Mengombinasikan pencarian teks `includes()` dan penyaringan kategori dropdown secara simultan dan instan.
- `toggleStatus(id)`: Menggunakan `map()` dan spread operator `{ ...item, selesai: !item.selesai }` untuk memperbarui status centang tanpa mutasi langsung.
- `bersihkanSelesai()`: Fitur pembersihan cepat yang membuang seluruh tugas yang sudah selesai dari state dan storage.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 14 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menyimpan state di dalam elemen DOM (DOM as state): Menyimpan status data di atribut HTML membuat sinkronisasi LocalStorage dan pencarian menjadi sangat rumit.
- Lupa memanggil renderApp() setelah mutasi state: Jika state diubah tetapi fungsi render tidak dipanggil, layar pengguna tidak akan menampilkan perubahan apa pun.
- Menggunakan indeks array sebagai ID unik: Jika data diurutkan atau difilter, indeks array akan bergeser dan menghapus item yang salah. Selalu gunakan ID unik seperti Date.now().
- Pencarian case-sensitive: Lupa menggunakan .toLowerCase() pada query dan judul tugas akan membuat pencarian gagal jika huruf besar-kecil tidak sama persis.

---

## Ringkasan

- Modul Minggu 14 (Proyek Akhir: Aplikasi Web Interaktif Lengkap) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
