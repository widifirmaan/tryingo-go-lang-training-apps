# Komposisi Komponen UI: Card, Button, Form, Modal

> **Kategori:** Tailwind CSS | **Level:** Komponen & Proyek Antarmuka | **Minggu 8:** Komposisi Komponen UI: Card, Button, Form, Modal

## Tujuan Pembelajaran

- Menyusun komposisi komponen modal terstruktur (header, body form, footer)
- Mengatur styling elemen form native: text input, select dropdown, checkbox
- Menggunakan grid multi-kolom dalam formulir input
- Membangun sistem tombol yang konsisten (primer, sekunder, ghost)
- Menjaga konsistensi jarak vertikal menggunakan space-y-*

---

## Program: Sistem Komponen Form & Dialog Modal Terpadu

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 min-h-screen flex items-center justify-center">
  <!-- Dialog Modal Container -->
  <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
    <!-- Modal Header -->
    <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-slate-900">Tambah Produk Baru</h3>
        <p class="text-xs text-slate-500">Masukkan rincian item ke katalog</p>
      </div>
      <button class="text-slate-400 hover:text-slate-600 text-lg font-bold">×</button>
    </div>

    <!-- Modal Form Body -->
    <form class="p-6 space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Produk</label>
        <input type="text" value="Mouse Nirkabel Ergonomis" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
          <select class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white">
            <option>Aksesoris</option>
            <option>Komputer</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Harga (IDR)</label>
          <input type="number" value="250000" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Status Publikasi</label>
        <label class="flex items-center gap-2 cursor-pointer mt-1">
          <input type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
          <span class="text-xs text-slate-700 font-medium">Tampilkan langsung di katalog publik</span>
        </label>
      </div>

      <!-- Action Footer -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <button type="button" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg">
          Batal
        </button>
        <button type="submit" class="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition">
          Simpan Data
        </button>
      </div>
    </form>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Pola Komposisi UI
Alih-alih menulis framework CSS raksasa, Tailwind memungkinkan penyusunan blok UI standar melalui kombinasi utilitas:
1. **Modal / Card**: Kontainer dengan `rounded-2xl`, `shadow-xl`, `border`, dan `overflow-hidden`
2. **Form Input**: Konsistensi `px-3 py-2 text-sm rounded-lg border border-slate-300`
3. **Button Hierarchy**:
   - Primary: `bg-indigo-600 text-white hover:bg-indigo-700`
   - Secondary: `border border-slate-300 text-slate-700 hover:bg-slate-50`
   - Ghost: `text-slate-600 hover:text-slate-800`

---

## Eksperimen

- Ubah tombol Simpan menjadi warna emerald-600
- Ganti max-w-md menjadi max-w-lg untuk modal lebih lebar
- Tambahkan field textarea untuk deskripsi produk
- Ubah shadow-xl menjadi shadow-2xl untuk bayangan lebih tebal

---

## Tantangan

Buat komponen kartu notifikasi toast yang melayang di pojok kanan atas dengan ikon centang sukses dan tombol tutup (×).

---

## Ringkasan

Minggu 8 dari 9: **Komposisi Komponen UI**. Anda menguasai pola komponen dialog dan formulir. Minggu depan: **Proyek Akhir: Dashboard Admin Responsif Lengkap**.
