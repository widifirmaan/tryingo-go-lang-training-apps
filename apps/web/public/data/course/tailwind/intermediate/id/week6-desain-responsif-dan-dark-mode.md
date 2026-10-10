# Desain Responsif & Arsitektur Dark Mode

> **Kategori:** Tailwind CSS | **Level:** Tata Letak & Responsivitas | **Minggu 6:** Desain Responsif & Arsitektur Dark Mode

## Tujuan Pembelajaran

- Memahami filosofi mobile-first (gaya default tanpa prefix berlaku untuk HP)
- Menguasai breakpoint bawaan: sm (640px), md (768px), lg (1024px), xl (1280px)
- Menerapkan tata letak responsif: flex-col md:flex-row, grid-cols-1 md:grid-cols-3
- Mengonfigurasi dan menerapkan prefix dark: untuk warna teks, latar, dan border
- Menguji pergantian tema terang dan gelap secara dinamis

---

## Program: Komponen Responsif Mobile-First dengan Dukungan Dark Mode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
    }
  </script>
</head>
<body class="bg-slate-100 dark:bg-slate-900 p-6 min-h-screen transition-colors duration-200">
  <div class="max-w-2xl mx-auto">
    <!-- Toggle Button Simulator -->
    <div class="flex justify-end mb-4">
      <button onclick="document.documentElement.classList.toggle('dark')" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
        Beralih Mode (Terang / Gelap)
      </button>
    </div>

    <!-- Responsive Card (1 col on mobile, 2 cols on md+) -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">
      <!-- Image / Icon side -->
      <div class="w-full md:w-1/3 bg-indigo-600 dark:bg-indigo-700 p-6 flex flex-col justify-center items-center text-white text-center">
        <div class="text-3xl font-extrabold mb-1">PRO</div>
        <div class="text-xs uppercase tracking-wider text-indigo-200">Paket Langganan</div>
      </div>

      <!-- Content side -->
      <div class="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Akses Penuh Semua Modul
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            Layout ini otomatis berubah: 1 kolom tumpuk pada layar HP, dan 2 kolom horizontal berdampingan pada layar tablet/desktop (md:).
          </p>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">md:flex-row dark:bg-slate-800</span>
          <button class="bg-indigo-600 dark:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg font-medium">
            Mulai
          </button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Breakpoint Mobile-First
Di Tailwind, tidak ada prefix untuk mobile. Aturan dasar ditulis langsung, lalu prefix breakpoint menimpa aturan pada layar yang lebih lebar:
- `sm:` >= 640px (ponsel lanskap / tablet kecil)
- `md:` >= 768px (tablet portrait / laptop kecil)
- `lg:` >= 1024px (desktop)
- `xl:` >= 1280px (layar lebar)

### Dark Mode
Prefix `dark:` hanya aktif ketika mode gelap dinyalakan (baik melalui class `dark` pada elemen `<html>` atau preferensi sistem operasi).
Contoh: `bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100`

---

## Eksperimen

- Ubah md:flex-row menjadi lg:flex-row dan amati perbedaannya
- Klik tombol "Beralih Mode" untuk melihat perubahan tema secara langsung
- Ubah dark:bg-slate-800 menjadi dark:bg-slate-950 untuk tema lebih gelap
- Tambahkan text-center md:text-left pada judul untuk melihat teks rata tengah di HP

---

## Tantangan

Buat navigasi yang menampilkan tombol hamburger di HP (block md:hidden) dan menampilkan link menu lengkap di desktop (hidden md:flex).

---

## Ringkasan

Minggu 6 dari 9: **Desain Responsif & Arsitektur Dark Mode**. Anda menguasai breakpoint dan tema warna. Minggu depan: **State Modifiers, Pseudo-Classes & Transisi**.
