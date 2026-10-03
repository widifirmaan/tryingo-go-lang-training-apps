# Proyek Akhir: Aplikasi Papan Tugas Kanban Interaktif Lengkap

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 12:** Proyek Akhir: Aplikasi Papan Tugas Kanban Interaktif Lengkap

## Tujuan Pembelajaran

- Mengintegrasikan seluruh kurikulum JavaScript: fungsi, array fungsional, objek, DOM, event, dan LocalStorage
- Menerapkan HTML5 Drag and Drop API (dragstart, dragover, drop, dragend) secara interaktif
- Mengelola State terpusat (Single Source of Truth) dan merender ulang tampilan secara deklaratif
- Menyimpan dan memulihkan state antarmuka secara permanen di LocalStorage browser
- Menerapkan sanitasi input pengguna untuk mencegah celah keamanan injeksi XSS

---

## Program: Aplikasi Kanban Task Board dengan Drag-and-Drop & Persistence

```html
<!DOCTYPE html>
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
</html>
```

---

## Konsep Kunci

### Arsitektur Aplikasi Kanban Modern
Aplikasi capstone ini mengintegrasikan seluruh konsep JavaScript:
1. **Single Source of Truth**: Array `tasks` adalah satu-satunya acuan data aplikasi.
2. **HTML5 Drag & Drop**: Penggunaan `e.dataTransfer.setData` dan `dragover` dengan `preventDefault()` untuk memungkinkan pemindahan kartu antar kolom.
3. **Persistensi State**: Setiap perpindahan kartu langsung diserialisasi ke `localStorage` dan merender ulang tampilan secara otomatis.

---

---

## Penjelasan untuk Pemula

### Analogi: Papan Kanban Kantor
Array `tasks` adalah buku catatan manajer kantor. Menyeret kartu seperti memindahkan kertas Post-It kuning dari kolom "Rencana" ke kolom "Selesai" di papan tulis kantor.

## Eksperimen

- Seret kartu dari kolom Rencana ke Dikerjakan dan refresh browser untuk melihat data tetap tersimpan.
- Tambah tugas baru menggunakan tombol "+ Tambah Tugas".
- Buka DevTools Application -> Local Storage untuk melihat pembaruan data secara langsung.
- Coba ubah status kolom langsung di array tasks dan panggil saveAndRender().

---

## Tantangan

Tambahkan tombol "Hapus" pada setiap kartu tugas dengan konfirmasi dialog sebelum menghapus.

---

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh 12 minggu kurikulum JavaScript dari nol hingga aplikasi Kanban interaktif produksi. Kamu sekarang siap melangkah ke TypeScript!
