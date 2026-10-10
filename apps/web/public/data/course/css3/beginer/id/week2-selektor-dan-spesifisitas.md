# Selektor dan Spesifisitas

> **Kategori:** CSS3 | **Level:** Dasar CSS & Model Kotak | **Minggu 2:** Selektor dan Spesifisitas
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menguasai tipe-tipe selektor dasar: element/tag, class (.), dan ID (#)
- Memahami selektor kombinator: descendant selector (spasi) dan direct child selector (>)
- Menerapkan pseudo-class interaktif untuk interaksi pengguna (:hover, :focus, :active)
- Memahami hierarki kalkulasi spesifisitas CSS dan aturan cascade (tingkat prioritas)
- Menghindari penggunaan !important dengan merancang arsitektur selektor yang tertata

---

## 1. Jenis-Jenis Selektor CSS

Selektor adalah instrumen utama untuk memilih elemen HTML mana yang hendak diberi aturan gaya.

### A. Selektor Dasar
- **Element Selector**: Memilih berdasarkan nama tag HTML (`p`, `button`, `h2`).
- **Class Selector (`.`)**: Memilih elemen yang memiliki atribut `class`. Dapat digunakan berulang kali pada banyak elemen.
- **ID Selector (`#`)**: Memilih satu elemen spesifik dengan atribut `id`. Harus unik per halaman.

### B. Selektor Kombinator
- **Descendant (`A B`)**: Memilih semua elemen `B` yang berada di dalam elemen `A` pada level kedalaman apa pun:
  ```css
  .navigasi a { color: #2E5B44; }
  ```
- **Child (`A > B`)**: Memilih elemen `B` yang merupakan anak langsung (*direct child*) dari elemen `A`:
  ```css
  .daftar-menu > li { list-style: none; }
  ```

---

## 2. Pseudo-Class Interaksi Pengguna

Pseudo-class menargetkan keadaan khusus dari suatu elemen saat berinteraksi:
- `:hover`: Saat kursor mouse berada di atas elemen.
- `:focus`: Saat elemen menerima fokus navigasi keyboard atau kursor ketik.
- `:active`: Saat elemen sedang ditekan atau diklik.

```css
.btn {
  background-color: #2E5B44;
  color: white;
}
.btn:hover {
  background-color: #234634;
}
.btn:active {
  background-color: #1A3427;
}
```

---

## 3. Spesifisitas: Cara Browser Menentukan Pemenang Aturan

Jika dua aturan bertentangan menargetkan elemen yang sama, browser menghitung skor spesifisitas:

```text
Tingkat Hierarki Spesifisitas:
┌─────────────────┬───────────────────┬──────────────────┬─────────────────┐
│ Inline Style    │ ID Selector       │ Class & Pseudo   │ Element / Tag   │
│ (style="...")   │ (#header)         │ (.btn, :hover)   │ (button, p)     │
│ Skor: 1,0,0,0   │ Skor: 0,1,0,0     │ Skor: 0,0,1,0    │ Skor: 0,0,0,1   │
└─────────────────┴───────────────────┴──────────────────┴─────────────────┘
```

- `button` = skor `0,0,0,1`
- `.btn` = skor `0,0,1,0` (Menang atas element)
- `.nav .btn` = skor `0,0,2,0`
- `#btn-utama` = skor `0,1,0,0` (Menang atas class)

---

## Program: Penerapan Selektor Kombinasi dan Tombol Interaktif

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Selektor dan Spesifisitas</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    /* 1. Class Selector untuk Kartu */
    .card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      max-width: 480px;
      margin: 0 auto 24px auto;
    }

    /* 2. Descendant Selector */
    .card h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 8px;
    }

    .card p {
      color: #718096;
      font-size: 14px;
      margin-bottom: 20px;
    }

    /* 3. Class Tombol Dasar */
    .btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    /* 4. Modifier Class: Tombol Primer */
    .btn-primer {
      background-color: #2E5B44;
      color: #FFFFFF;
    }

    .btn-primer:hover {
      background-color: #234634;
      transform: translateY(-1px);
    }

    .btn-primer:active {
      background-color: #1A3427;
      transform: translateY(1px);
    }

    /* 5. Modifier Class: Tombol Sekunder */
    .btn-sekunder {
      background-color: #EDF2F7;
      color: #4A5568;
      margin-left: 8px;
    }

    .btn-sekunder:hover {
      background-color: #E2E8F0;
      color: #2D3748;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Pengaturan Notifikasi Akun</h3>
    <p>Pilih preferensi notifikasi Anda untuk menerima pembaruan berkala langsung ke email.</p>
    <div>
      <a href="#" class="btn btn-primer">Simpan Preferensi</a>
      <a href="#" class="btn btn-sekunder">Batal</a>
    </div>
  </div>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `.card`: Class selector yang membungkus komponen dalam panel kartu terisolasi dengan batas abu-abu lembut.
- `.card h3`: Descendant selector yang menargetkan hanya judul `h3` yang berada di dalam kontainer `.card`.
- `.btn`: Base class yang menentukan ukuran padding, border-radius, dan perilaku cursor umum untuk semua tombol.
- `.btn-primer` dan `.btn-sekunder`: Modifier classes yang memberikan skema warna berbeda sesuai fungsinya.
- `:hover` dan `:active`: Pseudo-classes yang memberikan umpan balik visual instan saat kursor melayang atau mengklik tombol.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 2 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Ketergantungan pada !important: Menyisipkan !important merusak aturan cascade alami dan menyebabkan konflik gaya di masa mendatang.
- Menggunakan ID selector untuk styling: ID memiliki spesifisitas terlalu tinggi (0,1,0,0) yang sulit ditimpa oleh class lain.
- Spesifisitas terlalu dalam: Menulis selektor panjang seperti body div.main ul li a membuat kode kaku dan lambat diproses browser.
- Lupa tanda titik pada class selector: Menulis card alih-alih .card akan membuat browser mencari tag kustom <card> bukannya class="card".

---

## Ringkasan

- Modul Minggu 2 (Selektor dan Spesifisitas) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
