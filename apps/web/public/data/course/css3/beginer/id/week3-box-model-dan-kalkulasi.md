# Box Model dan Kalkulasi Elemen

> **Kategori:** CSS3 | **Level:** Dasar CSS & Model Kotak | **Minggu 3:** Box Model dan Kalkulasi Elemen
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami anatomi 4 lapisan CSS Box Model: Content, Padding, Border, dan Margin
- Membedakan perilaku box-sizing: content-box vs box-sizing: border-box
- Menguasai fenomena margin collapsing (penggabungan margin vertikal)
- Memahami perbedaan peran antara border dan outline
- Mengatur jarak internal dan eksternal secara konsisten pada tata letak antarmuka

---

## 1. Anatomi CSS Box Model

Setiap elemen HTML yang dirender oleh browser diperlakukan sebagai sebuah kotak persegi panjang (**Box Model**) yang terdiri dari 4 lapisan konsentris:

```text
┌────────────────────────────────────────────────────────┐
│  MARGIN (Jarak luar pemisah dengan elemen lain)        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  BORDER (Garis batas fisik di sekeliling elemen) │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  PADDING (Ruang bernapas dalam elemen)     │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │  CONTENT (Area teks, gambar, objek)  │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

1. **Content**: Area inti tempat teks, gambar, atau elemen anak berada (diatur via `width` & `height`).
2. **Padding**: Ruang kosong transparan di antara konten dan garis batas (border). Mengadopsi warna background elemen.
3. **Border**: Garis tepi yang mengelilingi padding dan konten.
4. **Margin**: Jarak transparan di luar border yang memisahkan elemen ini dari elemen sekitarnya.

---

## 2. Kalkulasi Ukuran: content-box vs border-box

Secara default, browser menghitung ukuran elemen menggunakan `content-box`:

```text
content-box:
Lebar Total = width + padding-left + padding-right + border-left + border-right
Jika width: 300px, padding: 20px, border: 2px
-> Lebar Total Sebenarnya = 300 + 40 + 4 = 344px! (Kotak membesar!)
```

Solusi standar industri adalah menggunakan **`border-box`**:

```css
* {
  box-sizing: border-box;
}
```

Dengan `border-box`, jika Anda menentukan `width: 300px`, browser akan menyusutkan area konten ke dalam sehingga lebar total elemen **tetap tepat 300px**.

---

## 3. Margin Collapsing (Penggabungan Margin Vertikal)

Ketika dua elemen bertumpuk secara vertikal dan masing-masing memiliki margin:
- Elemen atas memiliki `margin-bottom: 20px`
- Elemen bawah memiliki `margin-top: 30px`

Jarak di antara keduanya **bukan 50px**, melainkan **30px** (margin terbesar yang menang). Fenomena ini hanya terjadi pada sumbu vertikal (*top-bottom*), tidak berlaku pada sumbu horizontal (*left-right*).

---

## Program: Visualisasi Interaktif Lapisan Box Model

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Box Model Visualizer</title>
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

    .wrapper {
      max-width: 520px;
      margin: 0 auto;
    }

    h2 {
      color: #2E5B44;
      margin-bottom: 16px;
      text-align: center;
    }

    /* Lapisan 1: Area Margin (Warna Kuning/Oranye) */
    .box-margin {
      background-color: #FEEBC8;
      border: 2px dashed #DD6B20;
      padding: 24px; /* Merepresentasikan margin 24px */
      border-radius: 12px;
      text-align: center;
    }

    .label-layer {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: block;
    }

    /* Lapisan 2: Area Border (Warna Hijau Zaitun) */
    .box-border {
      background-color: #FEFCBF;
      border: 4px solid #D69E2E;
      padding: 20px; /* Merepresentasikan padding 20px */
      border-radius: 8px;
    }

    /* Lapisan 3: Area Padding (Warna Hijau Mint) */
    .box-padding {
      background-color: #C6F6D5;
      border: 1px dashed #38A169;
      padding: 20px;
      border-radius: 6px;
    }

    /* Lapisan 4: Area Content (Warna Biru / Inti) */
    .box-content {
      background-color: #BEE3F8;
      border: 1px solid #3182CE;
      padding: 16px;
      border-radius: 4px;
      color: #2B6CB0;
      font-weight: 600;
      font-size: 14px;
    }
  </style>
</head>
<body>

  <div class="wrapper">
    <h2>Anatomi CSS Box Model</h2>

    <div class="box-margin">
      <span class="label-layer" style="color: #C05621;">Lapisan 1: Margin (Area Eksternal)</span>
      
      <div class="box-border">
        <span class="label-layer" style="color: #B7791F;">Lapisan 2: Border (Garis Batas)</span>
        
        <div class="box-padding">
          <span class="label-layer" style="color: #2F855A;">Lapisan 3: Padding (Jarak Internal)</span>
          
          <div class="box-content">
            Lapisan 4: Content (Teks & Data)
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `box-sizing: border-box`: Memastikan perhitungan dimensi total elemen mencakup padding dan border tanpa mengubah ukuran kotak.
- `.box-margin`: Merepresentasikan ruang luar margin yang mengisolasi komponen dari elemen di sekitarnya.
- `.box-border`: Garis fisik (`border: 4px solid #D69E2E`) yang membingkai elemen dan membedakannya dari latar belakang.
- `.box-padding`: Ruang bernapas internal (`padding: 20px`) yang menjaga agar teks konten tidak menempel pada garis tepi border.
- `.box-content`: Area inti tempat informasi aktual dirender oleh browser.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 3 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Tidak mengaktifkan border-box: Menambahkan padding pada elemen dengan width: 100% tanpa border-box akan menyebabkan overflow horizontal (muncul scrollbar samping).
- Bingung antara padding dan margin: Menggunakan margin saat ingin memperluas area latar belakang elemen (background tidak mencakup area margin).
- Kebingungan margin collapsing: Mengharapkan margin bertumpuk secara matematis (misal: 20px + 20px = 40px), padahal browser menyatukannya menjadi 20px.
- Menggunakan outline untuk membuat ruang: Outline tidak memakan ruang dalam kalkulasi layout dan akan menimpa elemen di dekatnya.

---

## Ringkasan

- Modul Minggu 3 (Box Model dan Kalkulasi Elemen) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
