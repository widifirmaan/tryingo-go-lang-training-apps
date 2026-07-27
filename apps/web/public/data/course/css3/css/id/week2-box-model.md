# Box Model

> CSS | Module 2

## Tujuan Pembelajaran

- Memahami Box Model: content, padding, border, dan margin
- Menguasai perbedaan box-sizing: content-box vs border-box
- Mengatur ukuran elemen dengan width, height, dan overflow
- Memahami display: block vs inline dan pengaruhnya pada box
- Mengelola jarak antar elemen dengan margin collapsing

---

## Program: Visualisasi Box

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Box Model</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .box-viz { margin: 1.5rem auto; width: 300px; }
    .box-viz .margin { background: #ffd54f; padding: 1.5rem; border-radius: 8px; }
    .box-viz .border { background: #ff8a65; padding: 1.5rem; border-radius: 4px; }
    .box-viz .padding { background: #81c784; padding: 1.5rem; }
    .box-viz .content { background: #64b5f6; padding: 1.5rem; text-align: center; color: #fff; font-weight: bold; border-radius: 2px; }
    .box-viz .label { text-align: center; font-size: 0.75rem; margin-top: 0.3rem; color: #555; }
    .row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .box { width: 200px; padding: 1.5rem; border: 5px solid #1572B6; margin: 1rem; background: #e3f0fa; text-align: center; }
    .content-box { box-sizing: content-box; background: #ffebee; }
    .border-box { box-sizing: border-box; background: #e8f5e9; }
    .overflow-demo { width: 200px; height: 60px; border: 2px solid #1572B6; padding: 0.5rem; overflow: auto; background: #fff; }
  </style>
</head>
<body>
  <h1>Box Model</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">Anatomi Box Model</h2>
    <div class="box-viz">
      <div class="margin">
        <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Margin</div>
        <div class="border">
          <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Border</div>
          <div class="padding">
            <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Padding</div>
            <div class="content">Content</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">content-box vs border-box</h2>
    <div class="row">
      <div><div class="box content-box">content-box<br>250px total</div><div class="label" style="text-align:center">width + padding + border</div></div>
      <div><div class="box border-box">border-box<br>200px total</div><div class="label" style="text-align:center">width = total termasuk border</div></div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">Overflow</h2>
    <div class="overflow-demo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</div>
    <div class="label" style="margin-top:0.3rem">Gulir untuk melihat konten yang meluap</div>
  </div>
</body>
</html>
```

---

## Penjelasan

### Box Model

Setiap elemen HTML adalah **kotak** yang terdiri dari empat lapisan:

1. **Content** — area tempat teks/gambar ditampilkan. Ukurannya diatur oleh `width` dan `height`.
2. **Padding** — ruang antara konten dan border. Membersihkan area dalam elemen. Transparan terhadap background.
3. **Border** — garis yang mengelilingi padding. Bisa solid, dashed, dotted, dll.
4. **Margin** — ruang di luar border. Membersihkan area antar elemen. Transparan.

### box-sizing

- **content-box** (default): `width` hanya mengukur konten. Total lebar = width + padding + border.
- **border-box**: `width` mencakup konten + padding + border. Total lebar = width.

Gunakan `box-sizing: border-box` pada semua elemen untuk layout yang lebih mudah diprediksi.

### Overflow

Saat konten lebih besar dari box-nya, `overflow` menentukan perilakunya:
- `visible` (default) — konten meluap keluar
- `hidden` — konten terpotong
- `scroll` — scrollbar selalu muncul
- `auto` — scrollbar muncul hanya saat diperlukan

### Margin Collapsing

Margin vertikal antar elemen block tidak dijumlahkan — margin terbesar yang menang.

---

## Eksperimen

1. **Ubah padding** — ganti padding box model dari 1.5rem menjadi 3rem, lihat bagaimana ukuran total berubah
2. **Ganti border** — ubah border solid menjadi `border: 5px dashed #e74c3c` pada box content-box
3. **Coba negative margin** — tambahkan `margin-top: -20px` pada salah satu box
4. **box-sizing toggle** — ganti class content-box ke border-box dan perhatikan perbedaan lebar

---

## Tantangan

Buat halaman "Kartu Harga" (pricing cards) dengan tiga kartu berjajar. Setiap kartu harus memiliki:
- Padding yang berbeda untuk header, body, dan footer
- Border yang membedakan kartu unggulan (featured) dari yang biasa
- Margin antar kartu
- box-sizing: border-box pada semua elemen
- Overflow handling untuk deskripsi yang panjang

---

## Ringkasan

Box Model adalah konsep paling penting dalam CSS layout. Setiap elemen adalah kotak dengan content, padding, border, dan margin. Pilih box-sizing: border-box untuk layout yang mudah diprediksi. Module selanjutnya: **Teks & Warna** — cara mempercantik tipografi dan menggunakan warna secara efektif.
