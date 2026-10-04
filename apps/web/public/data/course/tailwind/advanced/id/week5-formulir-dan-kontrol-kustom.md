# Formulir Modern, Kontrol Input & Transisi Halus

> **Kategori:** Tailwind CSS | **Level:** Komponen Kustom, Desain Sistem & Produksi | **Minggu 5:** Formulir Modern, Kontrol Input & Transisi Halus
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Membangun input formulir yang konsisten dan rapi menggunakan utilitas Tailwind murni
- Membuat saklar toggle switch interaktif menggunakan modifier peer dan pseudo-elemen peer-checked
- Memanfaatkan utilitas sr-only (Screen Reader Only) untuk menjaga aksesibilitas kontrol kustom
- Menerapkan transisi visual transparan pada cincin fokus dan border input
- Mengatur tombol aksi sekunder dan primer dengan penataan Flexbox rapi

---

## Program: Formulir Pengaturan Profil Pengguna dengan Validasi Visual

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Form & Input Controls</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen p-8 font-sans flex items-center justify-center">

  <div class="max-w-xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
    <div class="border-b border-slate-100 pb-4">
      <h2 class="text-xl font-bold text-slate-900">Pengaturan Akun Insinyur</h2>
      <p class="text-sm text-slate-500">Perbarui informasi profil dan preferensi notifikasi cloud Anda.</p>
    </div>

    <form class="space-y-5">
      <!-- Input Teks Biasa -->
      <div>
        <label for="name" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
        <input type="text" id="name" value="Budi Pratama"
               class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
      </div>

      <!-- Select Dropdown -->
      <div>
        <label for="role" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Spesialisasi Rekayasa</label>
        <select id="role" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
          <option>Backend Systems (Go & Rust)</option>
          <option>Frontend Engineering (React & Tailwind)</option>
          <option>DevOps & Cloud Architecture</option>
        </select>
      </div>

      <!-- Toggle Switch Murni CSS Tailwind -->
      <div class="flex items-center justify-between pt-2">
        <div>
          <span class="text-sm font-semibold text-slate-900 block">Notifikasi Email Deployment</span>
          <span class="text-xs text-slate-500">Terima ringkasan log setiap kali pipeline produksi berhasil.</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked class="sr-only peer">
          <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-emerald-700"></div>
        </label>
      </div>

      <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
        <button type="button" class="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Batal
        </button>
        <button type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold shadow-md transition-all active:scale-95">
          Simpan Perubahan
        </button>
      </div>
    </form>
  </div>

</body>
</html>
```

---

## Konsep Kunci

### Kekuatan Modifier peer di Tailwind
Sama seperti `group` yang mendengarkan state elemen induk, modifier `peer` mendengarkan **elemen saudara kandung sebelumnya**:
1. Berikan class `peer` pada input checkbox tersembunyi (`sr-only peer`).
2. Pada elemen visual di sebelahnya, gunakan `peer-checked:bg-emerald-700` dan `peer-checked:after:translate-x-full`.
Ketika pengguna mengklik checkbox, elemen di sebelahnya langsung bergeser mulus menjadi saklar toggle yang aktif tanpa sebaris JavaScript!

### Utilitas Aksesibilitas sr-only
Kelas `sr-only` menyembunyikan elemen secara visual dari layar pengguna, namun **tetap terbaca secara sempurna oleh teknologi pembaca layar**. Ini adalah standar industri untuk membuat tombol kustom yang tetap ramah disabilitas.

---

---

## Penjelasan untuk Pemula

### Analogi: Pengungkit Saklar Lampu Rahasia
1. **`sr-only`** seperti menyembunyikan saklar listrik di balik lukisan dinding: saklarnya tetap ada dan terhubung ke kabel listrik, hanya saja matanya tidak melihat kotak plastiknya.
2. **`peer`** seperti memasang tuas kayu yang indah di depan lukisan tersebut: begitu Anda menyenggol tuas kayu, saklar di baliknya ikut tertekan dan lampu menyala hijau.

## Eksperimen

- Klik tombol toggle switch dan amati bagaimana lingkaran putih bergeser ke kanan dan warna trek berubah hijau.
- Hapus kelas sr-only pada checkbox dan perhatikan checkbox kotak native browser yang kini muncul di layar.
- Ubah peer-checked:bg-emerald-700 menjadi peer-checked:bg-blue-600 untuk mengubah warna saklar.
- Uji navigasi keyboard dengan menekan TAB ke toggle switch dan tekan tombol Spasi untuk mengaktifkannya.

---

## Tantangan

Bangun formulir "Ubah Kata Sandi": buat input kata sandi lama dan baru, sertakan meteran kekuatan sandi visual (3 baris balok warna yang berubah dari merah, kuning, hingga hijau), dan checkbox "Ingat perangkat ini" dengan toggle kustom.

---

## Model Mental & Diagram Alur Visual

![Diagram Flexbox & Grid Axis Sumbu Layout](/diagrams/flexbox-axis.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ KONTROL UTILITY TAILWIND                                 │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ flex items-center justify-between (Flexbox)          │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌────────────────┐ │ │
│ │ │ w-1/3 p-4    │ │ w-1/3 p-4    │ │ w-1/3 p-4      │ │ │
│ │ │ bg-zinc-900  │ │ bg-emerald-600│ │ bg-zinc-800   │ │ │
│ │ │ text-white   │ │ hover:scale-105│ │ rounded-2xl   │ │ │
│ │ └──────────────┘ └──────────────┘ └────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `flex items-center justify-between`
- **Fungsi Utama:** Utility tata letak Flexbox instan.
- **Parameter / Atribut:** `Display flex, alignment, distribution`.
- **Perilaku & Efek Sistem:** Menyusun kontainer fleksibel dengan pemusatan vertikal dan pemisahan horizontal antar elemen..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-900">
  <div class="flex items-center justify-between p-4 bg-slate-800 text-white rounded-xl shadow-lg">
    <span class="font-bold text-emerald-400">Tryngo Brand</span>
    <button class="px-4 py-2 bg-emerald-600 rounded-lg text-sm font-semibold">Menu</button>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Elemen tersusun rapi di ujung kiri dan kanan
```

### 2. `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- **Fungsi Utama:** Grid responsif multi-breakpoint.
- **Parameter / Atribut:** `Breakpoint prefixes (sm:, md:, lg:)`.
- **Perilaku & Efek Sistem:** Mengubah jumlah kolom secara bertahap saat layar membesar dari ponsel ke desktop..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-900">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 1</div>
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 2</div>
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 3</div>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Grid 1 kolom di HP, 3 kolom di desktop
```

### 3. `hover:bg-emerald-600 active:scale-95 transition-all duration-200`
- **Fungsi Utama:** State modifiers interaktif & animasi.
- **Parameter / Atribut:** `hover:, active:, focus:, transition`.
- **Perilaku & Efek Sistem:** Memberikan feedback visual interaktif saat tombol disentuh atau kursor diarahkan..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8 bg-slate-900 flex justify-center">
  <button class="bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all px-6 py-3 rounded-xl text-white font-bold shadow-lg">
    Tombol Interaktif Tailwind
  </button>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Tombol membesar dan berubah warna saat di-hover
```

### 4. `dark:bg-zinc-950 dark:text-zinc-100`
- **Fungsi Utama:** Dukungan tema gelap (Dark Mode).
- **Parameter / Atribut:** `dark: prefix selector`.
- **Perilaku & Efek Sistem:** Menentukan warna khusus saat pengguna mengaktifkan mode gelap di peramban atau sistem..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html class="dark">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-950">
  <div class="bg-slate-900 text-white border border-slate-700 p-6 rounded-2xl shadow-xl">
    <h3 class="text-xl font-bold text-emerald-400">Tema Gelap (Dark Mode)</h3>
    <p class="text-slate-300 mt-2">Warna latar dan kontras otomatis menyesuaikan preferensi sistem.</p>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Warna otomatis menyesuaikan mode gelap pengguna
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. String Interpolation Dinamis pada Nama Class
- **Gejala / Masalah:** Class seperti `text-${color}-500` tidak muncul di hasil build produksi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tuliskan nama class Tailwind secara utuh atau gunakan `safelist` di konfigurasi.

### 2. Urutan Utilitas yang Saling Menimpa
- **Gejala / Masalah:** Menulis `p-4 px-2` vs `px-2 p-4` menghasilkan specificity bentrok.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan ekstensi resmi Prettier Tailwind Plugin untuk merapikan urutan class secara otomatis.

### 3. Arbitrary Values yang Berlebihan
- **Gejala / Masalah:** Menggunakan `w-[347px]` merusak konsistensi design token tema.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Utamakan skala bawaan Tailwind (`w-80`, `w-96`) atau definisikan custom spacing di `theme.extend`.

---

## Ringkasan

Kamu telah menguasai pembuatan formulir interaktif dan toggle kustom menggunakan modifier peer. Minggu depan kita akan mendalami kustomisasi tema arbitrer dan konfigurasi Tailwind tingkat lanjut.
