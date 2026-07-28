# DOM Manipulation

> JavaScript | Modul 6

## Tujuan Pembelajaran

- Memilih elemen dengan querySelector dan getElementById
- Membuat dan menyisipkan elemen baru
- Mengubah konten, atribut, dan style elemen
- Mengelola class dengan classList
- Menghapus elemen dari DOM

---

## Program: Pengubah Halaman

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>DOM Manipulation</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}.highlight{background:#fff3cd;border:2px solid #F7DF1E}.box{width:80px;height:80px;background:#F7DF1E;margin:5px;display:inline-flex;align-items:center;justify-content:center;font-weight:bold;border-radius:8px}#targetArea{min-height:60px;border:2px dashed #ccc;padding:.5rem;margin:.5rem 0;border-radius:8px}</style></head>
<body>
<h1>Pengubah Halaman</h1>
<div class="card">
  <button onclick="tambahElemen()">Tambah Elemen</button>
  <button onclick="ubahJudul()">Ubah Judul</button>
  <button onclick="toggleClass()">Toggle Class</button>
  <button onclick="gantiWarna()">Ganti Warna Latar</button>
  <button onclick="hapusElemen()">Hapus Elemen Terakhir</button>
</div>
<div id="targetArea">
  <p class="item">Elemen awal</p>
</div>
<div id="infoPanel" class="card">
  <p><strong>Jumlah elemen:</strong> <span id="jumlahElemen">1</span></p>
</div>
<script>
  function tambahElemen() {
    let div = document.createElement("div");
    div.className = "box";
    div.textContent = "Baru";
    document.getElementById("targetArea").appendChild(div);
    hitungElemen();
  }
  function ubahJudul() {
    let h1 = document.querySelector("h1");
    h1.textContent = "DOM Diubah!";
    h1.style.color = "#e63946";
  }
  function toggleClass() {
    document.getElementById("targetArea").classList.toggle("highlight");
  }
  function gantiWarna() {
    document.body.style.backgroundColor =
      document.body.style.backgroundColor === "lightblue" ? "" : "lightblue";
  }
  function hapusElemen() {
    let area = document.getElementById("targetArea");
    let anak = area.querySelectorAll(".box");
    if (anak.length > 0) area.removeChild(anak[anak.length - 1]);
    hitungElemen();
  }
  function hitungElemen() {
    let total = document.querySelectorAll("#targetArea > *").length;
    document.getElementById("jumlahElemen").textContent = total;
  }
</script>
</body>
</html>
```

---

## Penjelasan

### Selektor DOM
`document.querySelector("#id")` — selector CSS. `document.getElementById("id")` — lebih cepat.

### Manipulasi
`createElement("tag")` — buat elemen baru. `appendChild(el)` — tambahkan ke DOM. `textContent` — ubah teks. `classList.add/remove/toggle` — kelola class.

### Style
Atur style via `element.style.property = "value"`. Untuk multiple perubahan, lebih baik gunakan class.

### Performance
Batch perubahan DOM untuk performa lebih baik. Hindari manipulasi DOM berulang dalam loop.

---

## Eksperimen

1. **Ganti `querySelector` dengan `getElementById` dan bandingkan**
1. **Implementasi tombol yang mengganti gambar (src)**
1. **Buat fungsi yang menghapus semua elemen di targetArea**
1. **Animasi sederhana: ubah opacity bertahap dengan setInterval**

---

## Tantangan

Buat halaman "Gallery Builder": user bisa menambahkan gambar (via URL), memberi caption, mengatur ukuran, dan menghapus. Semua elemen dibuat dan dimanipulasi melalui DOM. Gunakan classList untuk efek hover.

---

## Ringkasan

DOM manipulation memungkinkan JavaScript mengubah halaman web secara dinamis. Anda telah belajar membuat, memodifikasi, dan menghapus elemen. Modul selanjutnya: **Event & Form** — cara merespon interaksi pengguna.
