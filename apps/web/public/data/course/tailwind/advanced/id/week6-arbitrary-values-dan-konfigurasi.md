# Arbitrary Values, Desain Token & Ekstensi Konfigurasi

> **Kategori:** Tailwind CSS | **Level:** Komponen Kustom, Desain Sistem & Produksi | **Minggu 6:** Arbitrary Values, Desain Token & Ekstensi Konfigurasi

## Tujuan Pembelajaran

- Memanfaatkan sintaks Arbitrary Values ([...]) saat membutuhkan nilai presisi di luar skala default
- Mengonfigurasi tema kustom di tailwind.config: memperluas fontFamily dan boxShadow kustom
- Menerapkan gradient modern: bg-gradient-to-r, from-emerald-600, dan to-teal-400
- Menggunakan backdrop-blur-md dan opasitas warna (bg-stone-800/90) untuk efek glassmorphism modern
- Mengendalikan interaksi kursor dengan pointer-events-none pada elemen dekoratif latar belakang

---

## Program: Komponen Grafis Kustom dengan Nilai Arbitrer & Desain Token

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Arbitrary Values & Config</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            display: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
          },
          boxShadow: {
            'glow-emerald': '0 0 25px -5px rgba(46, 91, 68, 0.4)',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-stone-900 text-stone-100 min-h-screen p-8 flex items-center justify-center font-sans">

  <!-- Komponen Menggunakan Nilai Arbitrer ([...]) dan Token Kustom -->
  <div class="max-w-md w-full bg-stone-800/90 backdrop-blur-md rounded-[28px] p-[32px] border border-stone-700 shadow-glow-emerald relative overflow-hidden">
    
    <!-- Elemen Dekoratif dengan Nilai Arbitrer Presisi -->
    <div class="absolute -right-12 -top-12 w-[160px] h-[160px] bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>

    <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/60 inline-block">
      Hardware Cluster
    </span>

    <h2 class="text-[28px] leading-[1.2] font-black mt-4 font-display text-white">
      Node Dedicated Bare-Metal 64-Core
    </h2>

    <p class="text-stone-400 text-[14px] mt-3 leading-[1.6]">
      Server komputasi berperforma tinggi dengan konektivitas jaringan terisolasi 100 Gbps dan latensi sub-milidetik.
    </p>

    <!-- Bar Utilisasi dengan Nilai Arbitrer w-[78%] -->
    <div class="mt-6 space-y-2">
      <div class="flex justify-between text-xs font-semibold">
        <span class="text-stone-300">Kapasitas RAM Terpakai</span>
        <span class="text-emerald-400">78%</span>
      </div>
      <div class="w-full h-[8px] bg-stone-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-emerald-600 to-teal-400 w-[78%] rounded-full transition-all duration-1000"></div>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between pt-6 border-t border-stone-700/60">
      <div>
        <span class="text-[11px] text-stone-400 uppercase tracking-wider block">Biaya Operasional</span>
        <span class="text-xl font-bold text-white">Rp 4.250.000<span class="text-xs text-stone-400 font-normal">/bln</span></span>
      </div>
      <button class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs px-5 py-3 rounded-[14px] transition-all shadow-lg shadow-emerald-900/30">
        Deploy Instance
      </button>
    </div>
  </div>

</body>
</html>
```

---

## Konsep Kunci

### Sintaks Nilai Arbitrer ([...])
Terkadang desain UI membutuhkan nilai presisi seperti lebar persis 78% atau radius 28px. Alih-alih membuat file CSS baru, Tailwind menyediakan **Arbitrary Values**:
- `w-[78%]`: Menghasilkan CSS `width: 78%;`
- `rounded-[28px]`: Menghasilkan CSS `border-radius: 28px;`
- `bg-[#2E5B44]`: Menghasilkan warna hex spesifik.

### Ekstensi Konfigurasi (theme.extend)
Di file `tailwind.config.js`, Anda dapat memperluas desain token bawaan di dalam objek `extend`:
- Menambahkan font kustom (`font-display`).
- Menambahkan efek bayangan neon glow (`shadow-glow-emerald`).
Dengan cara ini, token baru Anda dapat digunakan seperti kelas Tailwind bawaan lainnya.

---

---

## Penjelasan untuk Pemula

### Analogi: Menjahit Jas Custom
1. **Kelas standar Tailwind** seperti membeli baju ukuran standar (S, M, L, XL).
2. **Arbitrary Values `w-[78%]`** seperti meminta penjahit mengecilkan lengan baju tepat 2.3 sentimeter agar pas di pergelangan tangan Anda.
3. Anda mendapatkan kecepatan pakaian siap pakai, dengan kebebasan penuh baju tailor-made kapan pun dibutuhkan.

## Eksperimen

- Ubah w-[78%] menjadi w-[95%] dan amati bagaimana bilah progres RAM meregang lebih panjang.
- Coba ubah radius rounded-[28px] menjadi rounded-[8px] untuk melihat perbedaan sudut kartu.
- Ganti warna bayangan glow-emerald di config dan saksikan pendaran lampu di belakang kartu berubah warna.
- Hapus pointer-events-none pada lingkaran dekorasi blur dan amati apakah lingkaran tersebut menghalangi seleksi teks di bawahnya.

---

## Tantangan

Bangun kartu statistik bandwidth jaringan: gunakan arbitrary values untuk membuat grafik donat sederhana atau bar progres dengan `w-[64%]`, efek glow warna biru safir (`shadow-glow-blue`), dan tipografi display kustom.

---

## Ringkasan

Kamu telah menguasai arbitrary values dan ekstensi konfigurasi tema Tailwind. Minggu depan kita akan mendalami pola abstraksi komponen `@apply` dan persiapan proyek capstone!
