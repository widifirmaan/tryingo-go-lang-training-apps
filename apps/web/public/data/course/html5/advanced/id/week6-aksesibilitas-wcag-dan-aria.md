# Aksesibilitas Web: Standar WCAG 2.1 AA, Landmark & Atribut ARIA

> **Kategori:** HTML5 | **Level:** Formulir Modern, Aksesibilitas & Web API | **Minggu 6:** Aksesibilitas Web: Standar WCAG 2.1 AA, Landmark & Atribut ARIA
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 4 pilar WCAG: Perceivable, Operable, Understandable, dan Robust (POUR)
- Menerapkan aturan emas pertama ARIA: gunakan elemen HTML semantik native terlebih dahulu sebelum ARIA
- Menghubungkan teks penjelasan tambahan menggunakan atribut aria-describedby dan aria-labelledby
- Menggunakan live regions (role="alert" dan aria-live="assertive") untuk pembaruan informasi dinamis
- Memastikan seluruh elemen interaktif dapat dioperasikan secara penuh hanya menggunakan keyboard

---

## Program: Antarmuka Portal Inklusif dengan Dukungan Screen Reader & Keyboard

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Pengumuman Inklusif — Nusa Digital</title>
</head>
<body>
  <!-- Landmark Header -->
  <header role="banner">
    <p>Nusa Digital Accessibility Hub</p>
    <nav aria-label="Navigasi Utama">
      <ul>
        <li><a href="#pengumuman">Pengumuman</a></li>
        <li><a href="#status-layanan">Status Layanan</a></li>
      </ul>
    </nav>
  </header>

  <!-- Landmark Main -->
  <main id="main-content" role="main">
    <article>
      <h1>Pusat Informasi & Status Operasional Sistem</h1>

      <!-- Alert Dinamis dengan ARIA live region -->
      <section id="pengumuman" aria-labelledby="heading-pengumuman">
        <h2 id="heading-pengumuman">Pemberitahuan Darurat</h2>
        
        <div role="alert" aria-live="assertive" aria-atomic="true">
          <p><strong>Pemberitahuan Sistem:</strong> Pemeliharaan terjadwal server pusat akan berlangsung pada hari Sabtu pukul 01.00 WIB. Layanan tetap dapat diakses melalui node replika.</p>
        </div>
      </section>

      <!-- Panel Status dengan Elemen Semantik & ARIA -->
      <section id="status-layanan" aria-labelledby="heading-status">
        <h2 id="heading-status">Kondisi Infrastruktur Real-Time</h2>

        <!-- Accordion murni HTML5 semantik tanpa JS -->
        <details>
          <summary>Klaster API Gateway Jakarta (Status: Normal)</summary>
          <p>Seluruh 12 instance aktif dengan utilisasi memori rata-rata 42% dan latensi 8ms.</p>
        </details>

        <details>
          <summary>Database Replika Singapura (Status: Normal)</summary>
          <p>Replikasi transaksi sinkron tanpa lag terdeteksi dalam 24 jam terakhir.</p>
        </details>

        <!-- Elemen interaktif dengan aria-describedby -->
        <p>
          <label for="search-log">Cari Log Insiden:</label><br>
          <input type="search" id="search-log" aria-describedby="search-hint">
          <span id="search-hint"><small>Masukkan kode insiden (contoh: INC-2026-09) atau kata kunci modul.</small></span>
        </p>
      </section>
    </article>
  </main>

  <!-- Landmark Footer -->
  <footer role="contentinfo">
    <p><small>Situs ini dirancang mematuhi pedoman Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</small></p>
  </footer>
</body>
</html>
```

---

## Konsep Kunci

### Prinsip Dasar WCAG (POUR)
Pedoman Aksesibilitas Konten Web berpusat pada 4 pilar:
1. **Perceivable (Dapat Dirasakan)**: Informasi dan komponen antarmuka harus dapat disajikan kepada pengguna dalam cara yang dapat mereka rasakan (ada teks alternatif untuk gambar, kontras warna cukup).
2. **Operable (Dapat Dioperasikan)**: Seluruh fungsi harus dapat dijalankan melalui keyboard tanpa perangkap fokus.
3. **Understandable (Dapat Dipahami)**: Konten teks mudah dibaca dan alur interaksi dapat diprediksi.
4. **Robust (Tangguh)**: Konten dapat diinterpretasikan secara andal oleh berbagai teknologi bantu (browser modern, screen reader).

### Aturan Pertama ARIA
*Accessible Rich Internet Applications (ARIA)* adalah jembatan untuk mendeskripsikan elemen interaktif yang kompleks. Aturan utamanya: **"Jika ada elemen HTML semantik bawaan yang tersedia (seperti `<button>`, `<details>`, `<nav>`), jangan pernah membuat elemen tiruan `<div role="button">`"**.

### Live Regions: Mengabarkan Perubahan Dinamis
Atribut `aria-live="polite"` atau `role="alert"` (setara `assertive`) memberitahu pembaca layar untuk langsung menyuarakan pesan penting yang muncul di layar tanpa menunggu pengguna mengarahkan kursor ke pesan tersebut.

---

---

## Penjelasan untuk Pemula

### Analogi: Jalur Kursi Roda dan Lampu Lalu Lintas Bersuara
1. **Aksesibilitas Web** bukan fitur mewah untuk segelintir orang, melainkan fasilitas publik seperti rampa kursi roda di gedung kantor atau ubin pemandu tunanetra di trotoar.
2. **HTML Semantik** adalah jalan tol yang mulus bagi pengguna tunanetra yang mengandalkan suara komputer.
3. **`role="alert"`** seperti sirine ambulans: saat suara sirine berbunyi, orang langsung tahu ada hal darurat tanpa perlu turun memeriksa mobil ambulans tersebut.

## Eksperimen

- Nyalakan pembaca layar bawaan (Windows Narrator dengan Win + Ctrl + Enter, atau Mac VoiceOver dengan Cmd + F5) dan coba dengarkan bagaimana halaman ini dibacakan.
- Tutup mata Anda dan navigasikan halaman hanya menggunakan tombol TAB dan Enter untuk membuka elemen <details>.
- Ubah aria-live="assertive" menjadi aria-live="polite" dan pelajari perbedaan kecepatan interupsi pembaca layar.
- Hapus tag <label> pada input pencarian dan perhatikan pembaca layar yang hanya menyebutkan "Edit box" tanpa tahu nama kolomnya.

---

## Tantangan

Rancang kartu profil produk e-commerce yang sepenuhnya memenuhi standar aksesibilitas: tombol "Beli Sekarang", badge ketersediaan stok menggunakan `aria-live`, label diskon yang deskriptif, dan dialog syarat ketentuan menggunakan `<details>` semantik.

---

## Model Mental & Diagram Alur Visual

![Diagram Struktur DOM Tree HTML5](/diagrams/dom-tree.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="id">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Tampilan)   │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Judul Web</title>│ • <main>            │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `<!DOCTYPE html>`
- **Fungsi Utama:** Deklarasi standar dokumen HTML5.
- **Parameter / Atribut:** `Wajib di baris 1`.
- **Perilaku & Efek Sistem:** Mengaktifkan rendering Standard Mode pada peramban web modern.
- **Contoh Penggunaan Praktis:**
```javascript
<!DOCTYPE html>
<html lang="id">
  <head><title>Tryngo</title></head>
</html>
```
- **Hasil Output yang Diharapkan:**
```text
Halaman dirender sesuai spesifikasi HTML5 W3C
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Fungsi Utama:** Pengaturan viewport perangkat mobile.
- **Parameter / Atribut:** `name, content`.
- **Perilaku & Efek Sistem:** Mengatur skala layar perangkat 1:1 agar website responsif tanpa zoom bawaan yang mengecilkan font.
- **Contoh Penggunaan Praktis:**
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- **Hasil Output yang Diharapkan:**
```text
Tampilan menyesuaikan lebar layar ponsel secara otomatis
```

### 3. `<header>, <main>, <footer>`
- **Fungsi Utama:** Elemen penanda semantik (Landmark Elements).
- **Parameter / Atribut:** `Global attributes (class, id, lang)`.
- **Perilaku & Efek Sistem:** Membagi dokumen menjadi banner navigasi, konten unik utama, dan informasi kaki untuk aksesibilitas screen reader.
- **Contoh Penggunaan Praktis:**
```javascript
<header><h1>Judul Portal</h1></header>
<main><p>Konten artikel utama.</p></main>
<footer>&copy; 2026 Tryngo</footer>
```
- **Hasil Output yang Diharapkan:**
```text
Struktur dokumen terbaca jelas oleh mesin pencari & pembaca tuna netra
```

### 4. `<form action="/api" method="POST">`
- **Fungsi Utama:** Kontainer pengumpulan data pengguna.
- **Parameter / Atribut:** `action (URL), method (GET/POST)`.
- **Perilaku & Efek Sistem:** Menyediakan form interaktif untuk mengirimkan data input ke server endpoint.
- **Contoh Penggunaan Praktis:**
```javascript
<form action="/submit" method="POST">
  <input type="text" name="username" required />
  <button type="submit">Kirim</button>
</form>
```
- **Hasil Output yang Diharapkan:**
```text
Formulir interaktif siap dikirimkan ke backend
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Tag bersarang tidak tertutup (Unclosed/Mismatched Tags)
- **Gejala / Masalah:** Tata letak halaman rusak atau elemen inline menelan elemen block.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu tutup tag berpasangan dan manfaatkan validator HTML5 atau auto-closing tag di VS Code.

### 2. Penggunaan tag <div> berlebihan (Div Soup)
- **Gejala / Masalah:** Website sulit diakses pembaca layar (screen reader) dan skor SEO menurun drastis.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan tag semantik seperti <header>, <nav>, <main>, <article>, dan <footer>.

### 3. Lupa atribut 'alt' pada <img> dan 'for' pada <label>
- **Gejala / Masalah:** Skor aksesibilitas (a11y) merah dan form sulit diklik pada perangkat layar sentuh.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu sertakan deskripsi alt yang bermakna dan hubungkan label dengan id input terkait.

---

## Ringkasan

Kamu telah menguasai standar aksesibilitas web internasional POUR, prinsip ARIA, dan pembuatan dokumen inklusif. Minggu depan kita akan mempelajari elemen modern HTML5 seperti dialog modal, template, dan canvas.
