# Sistem Spasi, Ukuran, dan Box Model

> **Kategori:** Tailwind CSS | **Level:** Dasar Utility-First & Tipografi | **Minggu 2:** Sistem Spasi, Ukuran, dan Box Model

## Tujuan Pembelajaran

- Memahami sistem skala angka 4 pada Tailwind (1 unit = 0.25rem = 4px)
- Menguasai utilitas padding (p, px, py, pt, pb, pl, pr)
- Menguasai utilitas margin (m, mx, my, mt, mb, ml, mr)
- Mengatur lebar (w-full, w-1/2, max-w-md) dan tinggi (h-12, h-screen)
- Menerapkan mx-auto untuk menengahkan kontainer blok secara horizontal

---

## Program: Penerapan Padding, Margin, Width, dan Height

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8">
  <div class="max-w-lg mx-auto bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold text-slate-800 mb-4">Demonstrasi Box Model</h2>
    
    <!-- Outer Container (Margin & Padding) -->
    <div class="bg-amber-50 border-2 border-dashed border-amber-300 p-4 mb-4">
      <p class="text-xs font-mono text-amber-700 mb-2">Padding: p-4 (1rem / 16px)</p>
      
      <!-- Inner Element (Width & Height) -->
      <div class="w-full h-16 bg-amber-500 rounded flex items-center justify-center text-white font-medium text-sm">
        Width: w-full | Height: h-16
      </div>
    </div>

    <!-- Sizing Comparison -->
    <div class="grid grid-cols-3 gap-2 text-center text-xs">
      <div class="w-20 h-12 bg-slate-200 rounded flex items-center justify-center mx-auto">w-20</div>
      <div class="w-28 h-12 bg-slate-300 rounded flex items-center justify-center mx-auto">w-28</div>
      <div class="w-36 h-12 bg-slate-400 text-white rounded flex items-center justify-center mx-auto">w-36</div>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Skala Spasi Tailwind
Setiap angka pada utilitas Tailwind dikalikan 4px:
- `p-1` = 0.25rem (4px)
- `p-2` = 0.5rem (8px)
- `p-4` = 1rem (16px)
- `p-6` = 1.5rem (24px)
- `p-8` = 2rem (32px)

### Sumbu Spasi
- `px-*`: Horizontal (kiri dan kanan)
- `py-*`: Vertikal (atas dan bawah)
- `pt-*`, `pb-*`, `pl-*`, `pr-*`: Sisi individual

---

## Eksperimen

- Ganti padding p-6 menjadi p-10 dan amati ruang dalam kontainer
- Ganti lebar max-w-lg menjadi max-w-xs untuk melihat kontainer mengecil
- Coba hilangkan mx-auto untuk melihat posisi kontainer bergeser ke kiri
- Tambahkan space-y-4 pada parent untuk memberi jarak vertikal otomatis

---

## Tantangan

Buat kotak profil pengguna dengan foto profil persegi berukuran w-24 h-24 di tengah kontainer dengan padding seragam.

---

## Ringkasan

Minggu 2 dari 9: **Sistem Spasi, Ukuran, dan Box Model**. Anda telah memahami rumus skala spasi 4px. Minggu depan: **Warna, Latar Belakang, Border, dan Shadow**.
