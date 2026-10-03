# CSS Grid: Tata Letak Dua Dimensi, Unit Fr & Template Areas

> **Kategori:** CSS3 | **Level:** CSS Grid & Sistem Responsif Modern | **Minggu 4:** CSS Grid: Tata Letak Dua Dimensi, Unit Fr & Template Areas
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan fundamental antara Flexbox (satu dimensi) dan CSS Grid (dua dimensi: baris dan kolom simultan)
- Menggunakan unit fraksional (fr) untuk pembagian ruang proporsional yang elastis
- Membuat arsitektur tata letak visual deklaratif menggunakan grid-template-areas
- Membangun kartu responsif otomatis tanpa media queries dengan repeat(auto-fit, minmax(200px, 1fr))
- Menempatkan elemen secara eksplisit pada garis koordinat grid (grid-column: 1 / -1)

---

## Program: Dashboard Kompleks dengan CSS Grid Template Areas

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid Master Dashboard</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F0F2F5;
      --surface: #FFFFFF;
      --text: #1E293B;
      --border: #E2E8F0;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 16px;
    }

    /* Layout Dashboard 2D dengan CSS Grid */
    .dashboard-grid {
      display: grid;
      min-height: calc(100vh - 32px);
      gap: 16px;
      grid-template-columns: 240px 1fr 300px;
      grid-template-rows: 64px 1fr 48px;
      grid-template-areas:
        "header  header  header"
        "sidebar content stats"
        "footer  footer  footer";
    }

    .grid-header  { grid-area: header;  background: var(--surface); border-radius: 12px; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border); }
    .grid-sidebar { grid-area: sidebar; background: var(--surface); border-radius: 12px; padding: 20px; border: 1px solid var(--border); }
    .grid-content { grid-area: content; background: var(--surface); border-radius: 12px; padding: 24px; border: 1px solid var(--border); overflow-y: auto; }
    .grid-stats   { grid-area: stats;   background: var(--surface); border-radius: 12px; padding: 20px; border: 1px solid var(--border); }
    .grid-footer  { grid-area: footer;  background: var(--surface); border-radius: 12px; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #64748B; border: 1px solid var(--border); }

    /* Nested Grid Responsif untuk Metrik */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .metric-card {
      background: var(--bg);
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid var(--primary);
    }
  </style>
</head>
<body>
  <div class="dashboard-grid">
    <header class="grid-header">
      <h2>Tryngo Cloud Admin</h2>
      <span>Status: Operasional 99.9%</span>
    </header>

    <nav class="grid-sidebar">
      <h3>Navigasi</h3>
      <ul style="list-style: none; margin-top: 12px; line-height: 2;">
        <li><a href="#" style="color: var(--primary); font-weight: 600;">Ringkasan</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Pengguna Aktif</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Database Cluster</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Pengaturan</a></li>
      </ul>
    </nav>

    <main class="grid-content">
      <h1>Kinerja Sistem & Analisis Beban</h1>
      <p style="color: #64748B; margin-top: 4px;">Metrik performa real-time seluruh node server di wilayah Asia Tenggara.</p>

      <div class="metrics-grid">
        <div class="metric-card">
          <small>Total Request / Detik</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px;">42.850</h3>
        </div>
        <div class="metric-card">
          <small>Latensi Rata-rata</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px; color: var(--primary);">8.2 ms</h3>
        </div>
        <div class="metric-card">
          <small>Utilisasi CPU</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px;">34.2%</h3>
        </div>
      </div>
    </main>

    <aside class="grid-stats">
      <h3>Aktivitas Terbaru</h3>
      <p style="margin-top: 12px; font-size: 0.9rem; color: #64748B;">Autoscaling berhasil menambahkan 2 pod baru di zona ap-southeast-1.</p>
    </aside>

    <footer class="grid-footer">
      <span>&copy; 2026 Tryngo Enterprise. Hak cipta dilindungi.</span>
      <span>Versi 3.8.4-prod</span>
    </footer>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Filosofi Dua Dimensi CSS Grid
Sementara Flexbox mengatur tata letak per baris **atau** per kolom secara mandiri, CSS Grid mengendalikan **baris dan kolom secara bersamaan**. Elemen anak terikat pada koordinat horizontal dan vertikal yang seragam.

### Unit Fraksi (fr)
Unit `fr` (*fractional unit*) merepresentasikan pecahan dari sisa ruang yang tersedia di dalam grid container:
- `grid-template-columns: 1fr 2fr 1fr;` membagi ruang menjadi 4 bagian sama besar, di mana kolom tengah mendapatkan 2 bagian (50%) dan kolom kiri-kanan masing-masing 1 bagian (25%).

### Grid Template Areas
Properti `grid-template-areas` memungkinkan developer memetakan layout seperti sketsa visual ASCII di dalam CSS:
```css
grid-template-areas:
  "header  header"
  "sidebar content";
```
Elemen anak cukup dipasangkan dengan `grid-area: header` atau `grid-area: sidebar` untuk langsung menempati zona tersebut.

### Pola Keramat auto-fit & minmax
Sintaks `repeat(auto-fit, minmax(180px, 1fr))` menciptakan tata letak kartu ajaib yang responsif: kolom akan bertambah otomatis saat layar melebar, dan membungkus rapi saat layar mengecil tanpa perlu sebaris pun `@media` query!

---

---

## Penjelasan untuk Pemula

### Analogi: Lemari Rak Bertingkat
1. **Flexbox** seperti menggantung baju di gantungan jemuran: baju tersusun rapi berjejer ke samping, tapi kalau jemuran ditarik ke bawah bajunya tidak otomatis tersusun berpetak-petak.
2. **CSS Grid** seperti lemari rak buku IKEA Kallax: Anda sudah membagi lemari menjadi 3 baris x 3 kolom kotak permanen.
3. **`grid-template-areas`** seperti menempel stiker label di laci rak: "Kotak atas untuk Topi, kotak tengah untuk Baju, kotak bawah untuk Sepatu".
4. **`repeat(auto-fit, minmax(...))`** seperti rak sepatu pintar yang otomatis merapatkan slot jika sepatunya sedikit, dan menambah slot baru begitu ada ruang kosong tersisa.

## Eksperimen

- Ubah ukuran jendela browser dan amati bagaimana baris kartu metrik auto-fit otomatis berpindah dari 3 kolom menjadi 1 kolom tanpa media query.
- Tukar posisi "sidebar" dan "stats" di grid-template-areas dan perhatikan tata letak UI yang langsung bertukar tempat seketika.
- Ubah grid-template-columns: 240px 1fr 300px menjadi 1fr 3fr 1fr dan perhatikan bagaimana sidebar kini elastis mengikuti ukuran layar.
- Coba berikan grid-column: span 2 pada salah satu kartu metrik untuk melihat kartu tersebut melebar mengambil 2 slot kolom.

---

## Tantangan

Bangun layout galeri foto majalah (editorial mosaic grid): gunakan CSS Grid untuk membuat galeri 6 foto di mana foto pertama berukuran besar (mengambil 2 baris dan 2 kolom menggunakan `grid-column: span 2; grid-row: span 2`), dan 5 foto lainnya mengisi ruang di sekelilingnya.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Masalah Box Model: Padding Menambah Lebar Elemen
- **Gejala / Masalah:** Elemen melebar melebihi kontainer induk dan merusak grid.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `box-sizing: border-box;` secara global di selector `*`.

### 2. Specificity War (!important overuse)
- **Gejala / Masalah:** CSS sulit di-override dan kode menjadi rapuh saat aplikasi bertambah besar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Patuhi metodologi BEM atau gunakan selector class sederhana, hindari chaining ID selector dan `!important`.

### 3. Z-Index Tidak Bekerja
- **Gejala / Masalah:** Elemen tetap berada di bawah elemen lain meski z-index sudah disetel ke 9999.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan elemen memiliki properti `position: relative`, `absolute`, atau `fixed` untuk membentuk Stacking Context.

---

## Ringkasan

Kamu telah menguasai penataan tata letak dua dimensi yang presisi menggunakan CSS Grid dan unit fraksi fr. Minggu depan kita akan mendalami desain responsif modern dan tipografi dinamis fluid dengan clamp().
