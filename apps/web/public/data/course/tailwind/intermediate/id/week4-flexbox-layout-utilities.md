# Tata Letak Flexbox dengan Tailwind

> **Kategori:** Tailwind CSS | **Level:** Tata Letak & Responsivitas | **Minggu 4:** Tata Letak Flexbox dengan Tailwind

## Tujuan Pembelajaran

- Mengaktifkan display flex dengan class flex
- Mengatur arah tata letak: flex-row vs flex-col
- Mengatur perataan sumbu utama: justify-start, justify-center, justify-between, justify-around
- Mengatur perataan sumbu silang: items-center, items-start, items-end
- Menggunakan gap-* untuk jarak otomatis antar elemen anak tanpa margin manual

---

## Program: Navbar dan Susunan Elemen dengan Flexbox

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-6">
  <!-- Navigasi Bar Flexbox -->
  <nav class="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between mb-6">
    <!-- Brand Logo -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
        T
      </div>
      <span class="font-bold text-slate-800 text-lg">Tryngo App</span>
    </div>

    <!-- Nav Links (Center / Right) -->
    <div class="flex items-center gap-6 text-sm text-slate-600 font-medium">
      <a href="#" class="text-indigo-600 font-semibold">Beranda</a>
      <a href="#">Kursus</a>
      <a href="#">Komunitas</a>
    </div>

    <!-- Action Button -->
    <button class="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg font-medium">
      Masuk
    </button>
  </nav>

  <!-- Baris Status dengan Gap -->
  <div class="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-around text-center">
    <div class="flex-1 border-r border-slate-100">
      <div class="text-2xl font-bold text-slate-800">28</div>
      <div class="text-xs text-slate-400">Total Modul</div>
    </div>
    <div class="flex-1 border-r border-slate-100">
      <div class="text-2xl font-bold text-indigo-600">100%</div>
      <div class="text-xs text-slate-400">Dukungan Web</div>
    </div>
    <div class="flex-1">
      <div class="text-2xl font-bold text-emerald-600">Aktif</div>
      <div class="text-xs text-slate-400">Status Server</div>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Utilitas Flexbox Tailwind
- Display: `flex`, `inline-flex`
- Arah: `flex-row` (default), `flex-col` (vertikal)
- Sumbu Utama (Justify): `justify-between` (meratakan ke tepi), `justify-center` (tengah)
- Sumbu Silang (Items): `items-center` (tengah secara vertikal)
- Jarak (Gap): `gap-2`, `gap-4`, `gap-6` menggantikan margin pada elemen anak

---

## Eksperimen

- Ganti justify-between pada nav menjadi justify-center dan lihat hasilnya
- Ubah items-center menjadi items-start
- Ganti flex-1 pada kotak metrik menjadi w-1/3
- Coba ubah flex-row pada navbar menjadi flex-col untuk simulasi menu mobile

---

## Tantangan

Buat kotak komentar yang memiliki avatar di kiri (flex), teks nama dan isi komentar di tengah (flex-1), serta tombol opsi di kanan.

---

## Ringkasan

Minggu 4 dari 9: **Tata Letak Flexbox dengan Tailwind**. Anda menguasai perataan sumbu horizontal dan vertikal. Minggu depan: **Tata Letak CSS Grid dengan Tailwind**.
