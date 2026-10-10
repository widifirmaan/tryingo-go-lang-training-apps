# Pseudo-Elemen dan Fitur Modern

> **Kategori:** CSS3 | **Level:** Sistem CSS, Animasi & Proyek Akhir | **Minggu 13:** Pseudo-Elemen dan Fitur Modern
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menguasai pseudo-elemen dekoratif ::before dan ::after serta properti wajib content
- Menerapkan seleksi teks kustom dengan ::selection dan placeholder form dengan ::placeholder
- Menggunakan native CSS Nesting (&) untuk hierarki aturan yang ringkas dan teratur
- Menerapkan aspect-ratio untuk mencegah Cumulative Layout Shift (CLS) pada media
- Mengontrol perilaku pemotongan gambar dengan object-fit: cover dan object-position

---

## 1. Pseudo-Elemen ::before dan ::after

Pseudo-elemen menyisipkan elemen virtual ke dalam dokumen tanpa menambah tag HTML baru di file markup:

```css
.kutipan::before {
  content: "“";              /* Properti WAJIB, meski nilainya string kosong "" */
  font-size: 32px;
  color: #2E5B44;
  vertical-align: -8px;
}
```

- **`::before`**: Menyisipkan elemen anak pertama di dalam elemen target.
- **`::after`**: Menyisipkan elemen anak terakhir di dalam elemen target.
- Sangat ideal untuk dekorasi garis bawah tombol, ikon visual, atau latar belakang tambahan.

---

## 2. Fitur Modern: Native CSS Nesting (`&`)

CSS modern sekarang mendukung sarang aturan (*nesting*) secara native tanpa memerlukan preprocessor seperti SASS:

```css
.card {
  background: white;
  padding: 20px;

  /* Menargetkan h3 yang berada di dalam .card */
  h3 {
    color: #2E5B44;
  }

  /* Menggunakan ampersand (&) untuk pseudo-class atau modifier */
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  & .badge {
    background: #E2F2E9;
  }
}
```

---

## 3. Menjaga Proporsi Media: `aspect-ratio` & `object-fit`

Untuk mencegah halaman melompat (*Cumulative Layout Shift*) saat gambar sedang dimuat, gunakan `aspect-ratio`:

```css
.foto-produk {
  width: 100%;
  aspect-ratio: 16 / 9; /* Mengunci rasio lebar berbanding tinggi 16:9 */
  object-fit: cover;    /* Gambar mengisi kotak tanpa mengalami distorsi gepeng */
  object-position: center;
}
```

---

## Program: Komponen Media Card Modern dengan Pseudo-Elemen dan Native Nesting

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Pseudo-Elemen dan Fitur Modern</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 1. Seleksi Teks Kustom */
    ::selection {
      background-color: #2E5B44;
      color: #FFFFFF;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    /* 2. Komponen Kartu dengan Native Nesting */
    .media-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      overflow: hidden;
      max-width: 380px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);

      /* Gambar Responsif dengan aspect-ratio & object-fit */
      .card-media {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
        background-color: #E2E8F0;
      }

      .card-body {
        padding: 24px;
        position: relative;
      }

      /* Pseudo-Elemen ::before untuk Aksen Garis Atas */
      .card-body::before {
        content: "";
        position: absolute;
        top: 0;
        left: 24px;
        width: 48px;
        height: 3px;
        background-color: #2E5B44;
        border-radius: 2px;
      }

      h3 {
        font-size: 18px;
        color: #1A202C;
        margin-top: 6px;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        color: #4A5568;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      /* Tombol Link dengan Pseudo-Elemen ::after untuk Panah */
      .read-more {
        display: inline-flex;
        align-items: center;
        color: #2E5B44;
        font-weight: 700;
        font-size: 13px;
        text-decoration: none;
        transition: gap 0.2s ease;
        gap: 4px;

        &::after {
          content: "→";
          transition: transform 0.2s ease;
        }

        &:hover::after {
          transform: translateX(4px);
        }
      }
    }
  </style>
</head>
<body>

  <article class="media-card">
    <img 
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80" 
      alt="Meja Kerja Pemrogram" 
      class="card-media"
    >
    <div class="card-body">
      <h3>Standar Media Responsif</h3>
      <p>Blok teks ini dilengkapi aksen garis atas melalui ::before dan panah interaktif melalui ::after tanpa merusak semantik HTML.</p>
      <a href="#" class="read-more">Baca Ulasan Selengkapnya</a>
    </div>
  </article>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `::selection`: Mengkustomisasi warna highlight seleksi teks menjadi hijau botol `#2E5B44` dengan teks putih saat pengguna menyorot tulisan.
- `aspect-ratio: 16 / 9`: Mengunci proporsi dimensi gambar sehingga kontainer sudah memiliki tinggi pasti sebelum file gambar selesai diunduh.
- `object-fit: cover`: Memastikan gambar memenuhi bingkai kartu tanpa terdistorsi atau gepeng.
- `.card-body::before`: Menyisipkan aksen garis hijau dekoratif di atas judul murni lewat CSS tanpa tag <div> tambahan di HTML.
- `Native Nesting (&)`: Mengelompokkan aturan `.card-media`, `h3`, `p`, dan `.read-more` langsung di dalam blok `.media-card`.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 13 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa properti content pada ::before/::after: Jika properti content: "" tertinggal, pseudo-elemen tidak akan dirender oleh browser sama sekali.
- Lupa display pada ::before/::after: Pseudo-elemen berstatus inline secara default; jika ingin mengatur width dan height wajib diberi display: block/inline-block atau position: absolute.
- Mengabaikan dukungan nesting pada browser lama: Nesting native didukung penuh di semua browser evergreen terbaru (2023+), namun browser lawas memerlukan preprocessor.
- Menggunakan aspect-ratio tanpa width: 100%: aspect-ratio bekerja paling optimal saat salah satu dimensi (lebar atau tinggi) telah didefinisikan secara tegas.

---

## Ringkasan

- Modul Minggu 13 (Pseudo-Elemen dan Fitur Modern) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
