# State Modifiers, Pseudo-Classes & Transisi

> **Kategori:** Tailwind CSS | **Level:** Komponen & Proyek Antarmuka | **Minggu 7:** State Modifiers, Pseudo-Classes & Transisi

## Tujuan Pembelajaran

- Menguasai pseudo-class state: hover:, focus:, active:, disabled:
- Mengonfigurasi focus ring untuk aksesibilitas form (focus:ring-2 focus:ring-indigo-200)
- Menggunakan utilitas transisi CSS: transition, duration-*, ease-*
- Menerapkan pola group dan group-hover untuk interaksi turunan
- Menerapkan transformasi mikro: hover:translate-x-1, hover:scale-105

---

## Program: Interaksi Tombol, Input Focus, dan Transisi Halus

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 flex justify-center">
  <div class="w-96 bg-white p-6 rounded-xl shadow-md border border-slate-200">
    <h2 class="text-lg font-bold text-slate-800 mb-4">Interaksi & State Modifiers</h2>

    <!-- Form Input with Focus Ring -->
    <div class="mb-4">
      <label class="block text-xs font-semibold text-slate-700 mb-1">Email Pengguna</label>
      <input 
        type="email" 
        placeholder="nama@email.com"
        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 transition duration-150 ease-in-out focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>

    <!-- Buttons with Hover & Active State -->
    <div class="space-y-2 mb-6">
      <button class="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold py-2.5 rounded-lg transition duration-200 shadow-sm hover:shadow">
        Tombol Utama (Hover & Active)
      </button>

      <button class="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold py-2.5 rounded-lg transition duration-150">
        Tombol Sekunder (Subtle)
      </button>
    </div>

    <!-- Group-Hover Pattern -->
    <div class="group p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition duration-200 cursor-pointer flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition">
          Pola group-hover
        </div>
        <div class="text-[11px] text-slate-500">Sorot kartu ini untuk melihat efek</div>
      </div>
      <span class="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition duration-200">
        →
      </span>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### State Modifiers di Tailwind
- `hover:`: aktif saat kursor berada di atas elemen
- `focus:`: aktif saat elemen formulir menerima fokus input
- `active:`: aktif saat elemen sedang ditekan klik
- `disabled:`: aktif jika elemen form memiliki atribut disabled

### Transisi Halus
- `transition`: mengaktifkan transisi properti umum (warna, bayangan, transform)
- `duration-150`, `duration-200`, `duration-300`: waktu durasi transisi (ms)
- `ease-in-out`: kurva kecepatan transisi

### Pola Group Hover
Tambahkan class `group` pada kontainer induk, lalu gunakan `group-hover:*` pada elemen anak agar anak merespons saat kontainer induk disorot.

---

## Eksperimen

- Ubah hover:bg-indigo-700 menjadi hover:bg-emerald-600
- Tambahkan hover:scale-105 pada tombol utama untuk efek membesar
- Ubah duration-200 menjadi duration-700 untuk transisi lambat
- Ganti focus:ring-indigo-200 menjadi focus:ring-rose-200

---

## Tantangan

Buat kartu link yang memiliki panah ikon di kanan, dan saat kartu disorot, ikon panah bergeser ke kanan dan warnanya menjadi biru.

---

## Ringkasan

Minggu 7 dari 9: **State Modifiers, Pseudo-Classes & Transisi**. Anda telah menguasai interaktivitas antarmuka. Minggu depan: **Komposisi Komponen UI: Card, Button, Form, Modal**.
