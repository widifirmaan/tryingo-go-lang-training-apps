# State Modifiers: Hover, Focus-Visible, Active & Group-Hover

> **Kategori:** Tailwind CSS | **Level:** Pondasi Utility-First & Tata Letak | **Minggu 4:** State Modifiers: Hover, Focus-Visible, Active & Group-Hover

## Tujuan Pembelajaran

- Menguasai modifier interaksi pengguna: hover:*, active:*, dan focus:*
- Menerapkan cincin fokus aksesibel (focus rings) menggunakan focus:ring-4 dan focus:ring-offset-2
- Memahami pola group dan group-hover:* untuk memicu animasi anak saat elemen induk di-hover
- Menerapkan efek penekanan tombol tactile menggunakan active:scale-95
- Menjaga navigasi keyboard tetap inklusif dengan focus-visible:* tanpa outline kasar saat klik mouse

---

## Program: Daftar Tugas Interaktif dengan Group Hover & Focus Ring

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind State Modifiers</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen flex items-center justify-center p-6 font-sans">

  <div class="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-900">Sprint Backlog Rekayasa</h2>
      <p class="text-sm text-slate-500">Arahkan kursor dan gunakan tombol TAB untuk melihat interaksi state.</p>
    </div>

    <!-- Daftar Item Interaktif dengan group hover -->
    <div class="space-y-3">
      <!-- Item 1 -->
      <div class="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer">
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 border-slate-300 cursor-pointer">
          <span class="text-sm font-semibold text-slate-700 group-hover:text-emerald-900 transition-colors">
            Optimasi WASM Compiler Binary Size
          </span>
        </div>
        <button class="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs font-semibold text-slate-400 hover:text-red-600 p-1.5 transition-all">
          Hapus
        </button>
      </div>

      <!-- Item 2 -->
      <div class="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer">
        <div class="flex items-center space-x-3">
          <input type="checkbox" checked class="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 border-slate-300 cursor-pointer">
          <span class="text-sm font-semibold text-slate-400 line-through group-hover:text-emerald-700 transition-colors">
            Audit Aksesibilitas WCAG 2.1 AA
          </span>
        </div>
        <button class="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs font-semibold text-slate-400 hover:text-red-600 p-1.5 transition-all">
          Hapus
        </button>
      </div>
    </div>

    <!-- Input Form dengan Focus Rings Aksesibel -->
    <div class="pt-4 border-t border-slate-100 flex gap-3">
      <input type="text" placeholder="Tambah tugas sprint baru..." 
             class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
      <button class="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm">
        Tambah
      </button>
    </div>
  </div>

</body>
</html>
```

---

## Konsep Kunci

### State Modifiers di Tailwind
Tailwind mengubah pseudo-class CSS menjadi prefix sederhana:
- `hover:bg-emerald-900`: Mengubah warna saat kursor mouse melayang di atas elemen.
- `active:scale-95`: Memberi efek membal mengecil (tactile press) saat tombol ditekan.
- `focus:ring-4`: Menampilkan cincin fokus tebal saat pengguna berpindah menggunakan keyboard.

### Pola Magis group dan group-hover:*
Seringkali kita ingin tombol "Hapus" yang tersembunyi (`opacity-0`) otomatis muncul saat baris tugas di-hover oleh mouse:
1. Berikan kelas `group` pada kontainer baris terluar.
2. Berikan kelas `group-hover:opacity-100` pada tombol anak di dalamnya!
Ketika induk disentuh mouse, elemen anak otomatis merespons tanpa sebaris pun JavaScript.

---

---

## Penjelasan untuk Pemula

### Analogi: Saklar Sensor Pintu Otomatis
1. **`hover:`** seperti lampu beranda rumah yang menyala begitu sensor mendeteksi orang mendekat.
2. **`active:scale-95`** seperti tuts keyboard mekanikal yang terasa membal turun saat jari Anda menekannya ke bawah.
3. **`group` & `group-hover`** seperti pintu gerbang otomatis: begitu mobil Anda menyentuh gerbang depan (`group`), lampu garasi di halaman belakang (`group-hover`) otomatis ikut menyala menyambut Anda.

## Eksperimen

- Arahkan kursor mouse ke salah satu baris tugas dan perhatikan tombol "Hapus" yang muncul mulus dari transparan ke terlihat (opacity-0 ke 100).
- Klik dan tahan tombol "Tambah" untuk merasakan efek membal tombol (active:scale-95).
- Tekan tombol TAB pada keyboard dan perhatikan cincin fokus zamrud (ring-4) yang membingkai kotak input teks secara elegan.
- Hapus kelas group pada pembungkus baris dan amati bagaimana tombol Hapus berhenti merespons hover induknya.

---

## Tantangan

Bangun kartu katalog kursus dengan efek `group`: saat kartu di-hover, gambar thumbnail kursus sedikit membesar (`group-hover:scale-105 overflow-hidden`), judul berubah warna menjadi hijau, dan tombol "Mulai Belajar" bertambah terang.

---

## Ringkasan

Kamu telah menguasai state modifiers, cincin fokus aksesibilitas, dan pola group-hover. Minggu depan kita memasuki Level 2: formulir modern, transisi mikro-interaktif, dan proyek capstone SaaS Dashboard!
