# Event Handling dan Formulir Interaktif

> **Kategori:** JavaScript | **Level:** Struktur Data & Interaksi DOM | **Minggu 9:** Event Handling dan Formulir Interaktif
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menguasai mekanisme penanganan event modern menggunakan addEventListener()
- Memahami Event Object (e) dan metode e.preventDefault() untuk mencegah reload halaman
- Menguasai tipe-tipe event penting: click, submit, input, change, dan keydown
- Memahami konsep Event Propagation: Event Bubbling dan Event Delegation
- Membangun aplikasi Task Manager interaktif dengan validasi form (Level 2 Capstone)

---

## 1. Mekanisme `addEventListener()`

`addEventListener` adalah standar resmi untuk mengikat fungsi pendengar (*listener*) ke aksi pengguna:

```javascript
const tombol = document.querySelector("#btn-simpan");

tombol.addEventListener("click", function(event) {
  console.log("Tombol diklik!");
});
```

Kelebihan dibanding `onclick`:
1. Dapat mendaftarkan lebih dari satu pendengar pada elemen yang sama.
2. Memisahkan logika JavaScript sepenuhnya dari file HTML.

---

## 2. Event Object (`e`) dan `e.preventDefault()`

Ketika suatu event terjadi, browser secara otomatis menyertakan objek informasi event ke dalam fungsi listener:

```javascript
const formulir = document.querySelector("#form-daftar");

formulir.addEventListener("submit", function(e) {
  e.preventDefault(); // Mencegah perilaku bawaan browser (reload halaman)
  
  const emailInput = document.querySelector("#email").value;
  console.log("Mengirim data email:", emailInput);
});
```

- **`e.preventDefault()`**: Wajib digunakan pada event form `submit` agar aplikasi Single Page / JS tidak ter-refresh.
- **`e.target`**: Elemen spesifik tempat event itu pertama kali dipicu.

---

## 3. Event Bubbling & Delegation

Ketika sebuah tombol di dalam kartu diklik, event tersebut naik ke atas menelusuri elemen induknya seperti gelembung udara:

```text
  Button clicked ──► Card parent ──► Grid container ──► Document
```

**Event Delegation**: Alih-alih memasang 100 listener pada 100 item daftar, pasang **1 listener saja** pada kontainer induknya:

```javascript
daftarUl.addEventListener("click", function(e) {
  if (e.target.tagName === "BUTTON") {
    console.log("Tombol daftar diklik:", e.target.textContent);
  }
});
```

---

## Program: Aplikasi Manajemen Tugas dengan Event Delegation dan Form PreventDefault

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Event Handling dan Formulir</title>
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

    .task-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input[type="text"] {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    button[type="submit"] {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    .task-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      background-color: #FFFFFF;
      transition: background-color 0.15s ease;
    }

    .task-item.completed {
      background-color: #F7FAFC;
      text-decoration: line-through;
      color: #A0AEC0;
      border-color: #EDF2F7;
    }

    .task-label {
      cursor: pointer;
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
    }

    .btn-del {
      background: none;
      border: none;
      color: #E53E3E;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .btn-del:hover {
      background-color: #FFF5F5;
    }

    .stats-footer {
      margin-top: 16px;
      font-size: 13px;
      color: #718096;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Aplikasi Tugas Interaktif</h3>

    <!-- 1. Formulir Tugas dengan Event Submit -->
    <form id="task-form" class="task-form">
      <input type="text" id="task-input" placeholder="Tulis tugas baru..." required>
      <button type="submit">Tambah</button>
    </form>

    <!-- 2. Daftar Tugas dengan Event Delegation -->
    <ul id="task-list" class="task-list"></ul>

    <div class="stats-footer">
      <span id="task-counter">0 tugas tersimpan</span>
      <span>Klik teks untuk menandai selesai</span>
    </div>
  </div>

  <script>
    const form = document.getElementById("task-form");
    const input = document.getElementById("task-input");
    const list = document.getElementById("task-list");
    const counter = document.getElementById("task-counter");

    function updateCounter() {
      const total = list.children.length;
      counter.textContent = `${total} tugas aktif`;
    }

    // 1. EVENT SUBMIT FORM (Mencegah reload browser)
    form.addEventListener("submit", function(e) {
      e.preventDefault(); // Wajib! Mencegah halaman refresh
      
      const judulTugas = input.value.trim();
      if (!judulTugas) return;

      // Membuat elemen task item
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-label">${judulTugas}</span>
        <button type="button" class="btn-del" title="Hapus Tugas">&times;</button>
      `;

      list.appendChild(li);
      input.value = "";
      input.focus();
      updateCounter();
    });

    // 2. EVENT DELEGATION PADA ELEMEN INDUK (ul#task-list)
    list.addEventListener("click", function(e) {
      const target = e.target;
      const li = target.closest(".task-item");
      if (!li) return;

      // Aksi A: Tombol Hapus diklik
      if (target.classList.contains("btn-del")) {
        li.remove();
        updateCounter();
        return;
      }

      // Aksi B: Checkbox atau label diklik (Tandai selesai)
      if (target.classList.contains("task-checkbox") || target.classList.contains("task-label")) {
        li.classList.toggle("completed");
        const checkbox = li.querySelector(".task-checkbox");
        if (target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      }
    });
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `e.preventDefault()`: Mencegah browser mengirim data ke server dan me-refresh halaman secara otomatis saat tombol submit ditekan.
- `list.addEventListener("click", ...)`: Pola Event Delegation yang menangani klik tombol hapus atau centang tugas melalui satu listener terpusat di kontainer `<ul>`.
- `e.target.closest(".task-item")`: Menemukan elemen pembungkus `<li>` terdekat dari elemen anak mana pun yang diklik pengguna.
- `li.classList.toggle("completed")`: Mengaktifkan efek coret teks dan warna abu-abu pada tugas yang telah diselesaikan.
- `input.focus()`: Mengembalikan kursor ketik ke input teks form secara otomatis untuk mempercepat pengisian tugas berikutnya.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 9 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa e.preventDefault() pada submit form: Menyebabkan form langsung me-reload seluruh halaman browser dan semua data yang baru diketik langsung hilang.
- Memasang listener individual pada setiap item baru: Menambah ratusan listener di dalam loop dapat membebani penggunaan memori browser (kebocoran memori).
- Menggunakan button tanpa type="button" di dalam form: Elemen <button> di dalam <form> berstatus submit secara default; jika tidak diberi type="button", tombol hapus akan memicu submit form!
- Salah target pada e.target saat elemen bersarang: e.target menunjuk elemen terdalam (misal ikon di dalam tombol); gunakan e.target.closest() untuk mencari tombol pembungkusnya.

---

## Ringkasan

- Modul Minggu 9 (Event Handling dan Formulir Interaktif) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
