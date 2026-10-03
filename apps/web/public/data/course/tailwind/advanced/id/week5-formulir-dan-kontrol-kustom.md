# Formulir Modern, Kontrol Input & Transisi Halus

> **Kategori:** Tailwind CSS | **Level:** Komponen Kustom, Desain Sistem & Produksi | **Minggu 5:** Formulir Modern, Kontrol Input & Transisi Halus

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

## Ringkasan

Kamu telah menguasai pembuatan formulir interaktif dan toggle kustom menggunakan modifier peer. Minggu depan kita akan mendalami kustomisasi tema arbitrer dan konfigurasi Tailwind tingkat lanjut.
