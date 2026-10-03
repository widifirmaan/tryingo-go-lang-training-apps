# Fitur Mutakhir: Container Queries (@container) & Subgrid

> **Kategori:** CSS3 | **Level:** Design System, Animasi & Fitur Mutakhir | **Minggu 9:** Fitur Mutakhir: Container Queries (@container) & Subgrid
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami paradigma pergeseran dari Media Queries (lebar viewport) ke Container Queries (lebar kontainer induk)
- Mendaftarkan konteks kontainer menggunakan properti container-type: inline-size dan container-name
- Menulis aturan gaya kondisional modular dengan @container (min-width: ...)
- Memahami cara kerja subgrid (grid-template-rows: subgrid) untuk menyelaraskan elemen di dalam kartu berbeda
- Membangun komponen UI yang benar-benar modular dan dapat ditempatkan di mana saja (sidebar, modal, main grid)

---

## Program: Komponen Kartu Adaptif Berdasarkan Lebar Kontainer

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Container Queries & Subgrid</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: system-ui, sans-serif;
      background: #F1F5F9;
      padding: 24px;
    }

    /* Layout Induk: Kolom Sempit & Kolom Lebar */
    .showcase-layout {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 32px;
      max-width: 1100px;
      margin: 0 auto;
    }

    /* 1. Mendaftarkan Elemen sebagai Container */
    .card-wrapper {
      container-type: inline-size;
      container-name: product-card;
    }

    /* 2. Komponen Kartu yang Merespon Ukuran Kontainernya Sendiri */
    .product-widget {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 20px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .widget-image {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #CBD5E1;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #475569;
    }

    /* 3. Container Query: Jika lebar kontainer > 450px, ubah jadi horizontal! */
    @container product-card (min-width: 450px) {
      .product-widget {
        flex-direction: row;
        align-items: center;
      }
      .widget-image {
        width: 180px;
        aspect-ratio: 1 / 1;
      }
    }
  </style>
</head>
<body>
  <h1 style="text-align: center; margin-bottom: 24px;">Komponen Identik di Dua Ukuran Kontainer Berbeda</h1>

  <div class="showcase-layout">
    <!-- Slot 1: Di sidebar sempit (320px) -> Merender vertikal otomatis -->
    <div>
      <h3 style="margin-bottom: 12px;">Di Kolom Sempit (Sidebar 320px)</h3>
      <div class="card-wrapper">
        <div class="product-widget">
          <div class="widget-image">Foto Produk</div>
          <div>
            <h4>Paket Mini Cloud</h4>
            <p style="color: #64748B; font-size: 0.9rem;">Cocok untuk proyek uji coba.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Slot 2: Di area utama lebar -> Otomatis beradaptasi horizontal! -->
    <div>
      <h3 style="margin-bottom: 12px;">Di Kolom Lebar (Main Area)</h3>
      <div class="card-wrapper">
        <div class="product-widget">
          <div class="widget-image">Foto Produk</div>
          <div>
            <h4>Paket Mini Cloud</h4>
            <p style="color: #64748B; font-size: 0.9rem;">Komponen yang sama persis secara otomatis beralih menjadi tata letak horizontal karena lebar kontainernya melebihi 450px.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Era Baru: Container Queries (@container)
Selama 15 tahun, responsive design terikat pada ukuran layar monitor (`@media (min-width: 768px)`). Kelemahannya: jika sebuah kartu produk diletakkan di sidebar yang sempit pada monitor desktop lebar, kartu tersebut akan dipaksa melebar hancur karena browser mendeteksi layar monitornya lebar.

Dengan **Container Queries (`@container`)**:
- Komponen merespons **lebar induknya sendiri**, bukan lebar layar monitor.
- Komponen yang sama dapat diletakkan di sidebar (merender vertikal) atau di area utama (merender horizontal) tanpa membuat class CSS baru!

### Properti container-type
- `container-type: inline-size`: Menginstruksikan browser untuk memantau perubahan ukuran elemen pada sumbu horizontal (lebar).

### Kekuatan Subgrid
Pada CSS Grid konvensional, elemen anak dari kartu tidak bisa sejajar dengan elemen anak di kartu sebelahnya jika teks judulnya memiliki panjang baris berbeda. Dengan `grid-template-rows: subgrid`, kartu anak mewarisi grid baris induknya sehingga tombol dan judul selalu sejajar rapi di satu garis lurus horizontal.

---

---

## Penjelasan untuk Pemula

### Analogi: Air yang Menyesuaikan Bentuk Gelas
1. **Media Query lama** seperti menentukan bentuk air berdasarkan cuaca di luar rumah: "Jika hari ini cerah di kota Jakarta, air harus berbentuk kotak". Padahal airnya sedang dimasukkan ke dalam botol bulat!
2. **Container Query** seperti sifat asli air: air di dalam cangkir kecil otomatis berbentuk cangkir, dan air yang dituang ke dalam baskom lebar otomatis melebar mengikuti baskom tersebut.
3. Komponen Anda menjadi mandiri dan cerdas di manapun Anda meletakkannya.

## Eksperimen

- Ubah lebar kolom sidebar di showcase-layout dari 320px menjadi 500px dan perhatikan kartu di sidebar langsung beralih ke layout horizontal secara mandiri.
- Hapus baris container-type: inline-size dan amati bagaimana @container query langsung berhenti bekerja.
- Coba letakkan kartu ketiga di dalam kontainer berukuran 600px dan buktikan fleksibilitas modularitasnya.
- Uji komponen ini di berbagai browser modern dan periksa dukungan native container queries di panel DevTools.

---

## Tantangan

Bangun komponen kartu profil pengguna (User Card) dengan Container Queries: jika lebar kontainer < 350px tampilkan avatar di atas teks, jika 350px-600px tampilkan avatar di samping teks, dan jika > 600px tambahkan bilah tombol aksi lengkap di sisi kanan.

---

## Model Mental & Diagram Alur Visual

![Diagram CSS Box Model (Margin, Border, Padding, Content)](/diagrams/box-model.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Jarak Luar Transparan)                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Garis Tepi & Bingkai)                    │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Ruang Bantalan Internal)        │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Lebar x Tinggi Teks/UI) │   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `box-sizing: border-box;`
- **Fungsi Utama:** Pengubah kalkulasi Box Model universal.
- **Parameter / Atribut:** `border-box | content-box`.
- **Perilaku & Efek Sistem:** Memasukkan padding dan border ke dalam kalkulasi total lebar (width) elemen sehingga elemen tidak meluap keluar kontainer.
- **Contoh Penggunaan Praktis:**
```javascript
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- **Hasil Output yang Diharapkan:**
```text
Elemen berukuran presisi tanpa kalkulasi manual tambahan
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Fungsi Utama:** Penyusunan tata letak satu dimensi (Flexbox).
- **Parameter / Atribut:** `flex-direction, justify-content, align-items`.
- **Perilaku & Efek Sistem:** Mengatur perataan dan distribusi ruang kosong antar item anak secara fleksibel di sumbu utama dan sumbu silang.
- **Contoh Penggunaan Praktis:**
```javascript
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
```
- **Hasil Output yang Diharapkan:**
```text
Item navbar terdistribusi rapi di ujung kiri dan kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`
- **Fungsi Utama:** Sistem kisi dua dimensi responsif.
- **Parameter / Atribut:** `grid-template-columns, gap`.
- **Perilaku & Efek Sistem:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom berdasarkan lebar layar tanpa media query.
- **Contoh Penggunaan Praktis:**
```javascript
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```
- **Hasil Output yang Diharapkan:**
```text
Kartu otomatis menyusun 1, 2, atau 3 kolom sesuai layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Fungsi Utama:** Animasi transisi status interaktif.
- **Parameter / Atribut:** `property, duration, timing-function`.
- **Perilaku & Efek Sistem:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status (misal hover/focus).
- **Contoh Penggunaan Praktis:**
```javascript
.btn {
  background-color: #2E5B44;
  transition: transform 0.2s ease, background 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
  background-color: #1f3d2e;
}
```
- **Hasil Output yang Diharapkan:**
```text
Tombol terangkat halus 2px saat kursor mouse diarahkan
```


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

Kamu telah menguasai fitur paling mutakhir dalam sejarah CSS: Container Queries dan Subgrid. Minggu depan adalah proyek capstone: membangun E-Commerce Design System & Responsive Storefront kelas dunia!
