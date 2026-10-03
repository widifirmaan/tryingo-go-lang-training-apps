# Hierarki Teks, Tipografi Semantik & Navigasi Antar Halaman

> **Kategori:** HTML5 | **Level:** Struktur & Semantik Web | **Minggu 2:** Hierarki Teks, Tipografi Semantik & Navigasi Antar Halaman
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menerapkan aturan hierarki heading tunggal <h1> dan penomoran logis <h2> hingga <h6> tanpa melewatkan tingkatan
- Membedakan penggunaan elemen penekanan makna: <strong> vs <b>, dan <em> vs <i>
- Membangun menu navigasi semantik menggunakan tag <nav> dan unordered list <ul>
- Menghubungkan navigasi internal dengan anchor jump link menggunakan id (#konten-utama)
- Menggunakan atribut aria-current="page" untuk menginformasikan halaman yang sedang aktif

---

## Program: Struktur Konten Berjenjang dengan Navigasi Aksesibel

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layanan Rekayasa — Nusa Digital</title>
</head>
<body>
  <header>
    <a href="#konten-utama" class="skip-link">Lewati ke konten utama</a>
    <p><strong>Nusa Digital</strong></p>
    <nav aria-label="Navigasi Utama">
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="layanan.html" aria-current="page">Layanan</a></li>
        <li><a href="tentang.html">Tentang Kami</a></li>
        <li><a href="kontak.html">Hubungi Kami</a></li>
      </ul>
    </nav>
  </header>

  <main id="konten-utama">
    <article>
      <h1>Solusi Layanan Rekayasa Perangkat Lunak</h1>
      <p>Kami menyediakan arsitektur komputasi modern yang dirancang untuk skala jutaan pengguna aktif harian.</p>

      <section>
        <h2>1. Arsitektur Cloud & Backend Berkecepatan Tinggi</h2>
        <p>Pengembangan sistem terdistribusi menggunakan Go dan Rust dengan protokol <em>gRPC</em> dan penyimpanan terkelola.</p>
        <p>Karakteristik performa layanan kami:</p>
        <ul>
          <li>Latensi respon rata-rata di bawah <strong>15 milidetik</strong></li>
          <li>Uptime operasional tahunan mencapai <strong>99.99%</strong></li>
          <li>Dukungan auto-scaling dinamis berbasis beban CPU</li>
        </ul>
      </section>

      <section>
        <h2>2. Alur Pelaksanaan Proyek</h2>
        <p>Langkah sistematis dari evaluasi kebutuhan hingga deployment produksi:</p>
        <ol>
          <li>Analisis domain dan perancangan kontrak API</li>
          <li>Implementasi kode inti beserta unit testing menyeluruh</li>
          <li>Uji penetrasi keamanan dan benchmarking latensi</li>
          <li>Deployment otomatis menggunakan pipeline CI/CD</li>
        </ol>
      </section>
    </article>
  </main>

  <footer>
    <p><small>&copy; 2026 PT Nusa Digital Teknologi. Dokumen resmi standar ISO 27001.</small></p>
  </footer>
</body>
</html>
```

---

## Konsep Kunci

### Aturan Hierarki Heading (H1-H6)
Heading bukan sekadar pengubah ukuran teks visual, melainkan daftar isi dokumen untuk mesin pencari dan pembaca layar:
- Hanya ada **satu `<h1>`** per halaman yang merepresentasikan topik sentral dokumen.
- Jangan pernah melompati tingkatan (misal dari `<h2>` langsung ke `<h4>`).
- Bagian subtopik dari `<h2>` harus selalu diawali dengan `<h3>`.

### Semantik Teks: Makna vs Tampilan
- `<strong>`: Menyatakan bahwa konten memiliki kepentingan atau urgensi tinggi (dibaca dengan penekanan oleh screen reader).
- `<b>`: Menebalkan huruf semata-mata untuk menarik perhatian visual tanpa memberi arti penting ekstra.
- `<em>`: Memberi tekanan intonasi percakapan pada sebuah kata (*stress emphasis*).
- `<i>`: Digunakan untuk istilah teknis, nama latin, atau idiom asing.

### Navigasi Semantik dan Tautan Lompat
Elemen `<nav>` membungkus tautan navigasi utama. Penggunaan list `<ul>` di dalamnya memberi informasi kepada pembaca layar mengenai jumlah tautan yang tersedia (misal: "List 4 items"). Tautan lompat (*skip link*) `<a href="#konten-utama">` memungkinkan pengguna papan ketik melewati menu panjang langsung ke konten utama.

---

---

## Penjelasan untuk Pemula

### Analogi: Daftar Isi Buku & Rambu Jalan
1. **`<h1>`** adalah judul sampul buku. Tidak mungkin satu buku punya dua judul sampul yang berbeda.
2. **`<h2>`** adalah judul bab, sedangkan **`<h3>`** adalah sub-bab di dalam bab tersebut.
3. **`<nav>`** adalah papan petunjuk arah di stasiun kereta: mengumpulkan nama-nama peron tujuan agar penumpang tidak tersesat.
4. **`<strong>`** seperti mencetak tebal peringatan "DILARANG MEROKOK", sedangkan `<b>` seperti menebalkan kata kunci sekadar agar gampang dicari saat membuka kamus.

## Eksperimen

- Gunakan tombol TAB pada keyboard untuk berpindah dari satu tautan ke tautan berikutnya, dan perhatikan urutan fokus alami browser.
- Coba klik tautan skip-link "#konten-utama" dan amati bagaimana browser menggulir layar langsung ke elemen target.
- Hapus atribut aria-current="page" lalu pasang di halaman yang salah, dan renungkan bagaimana pengguna tunanetra bisa keliru memahami lokasi halaman saat ini.
- Ganti tag <h1> kedua yang sengaja ditambahkan menjadi <h2>, dan periksa peningkatan skor validitas heading di extension Lighthouse.

---

## Tantangan

Buat halaman navigasi dokumentasi teknis bertema "Panduan Arsitektur Cloud". Susun satu <h1>, minimal tiga <h2> (Masing-masing memiliki sub-bab <h3>), daftar berurutan untuk alur instalasi, serta menu navigasi lengkap dengan atribut `aria-current="page"` dan skip-link.

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

Kamu telah menguasai penataan hierarki heading standar industri, pemisahan arti teks semantik, dan navigasi ramah pembaca layar. Minggu depan kita akan mempelajari penanganan media responsif dan optimalisasi aset visual.
