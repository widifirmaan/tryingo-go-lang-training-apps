# JavaScript Dasar

> JavaScript | Modul 1

## Tujuan Pembelajaran

- Memahami variabel let, const, dan perbedaannya
- Mengenal tipe data: string, number, boolean, null, undefined
- Menggunakan console.log untuk debugging
- Menulis komentar dan sintaks dasar JavaScript
- Memahami case sensitivity dan aturan penamaan

---

## Program: Halo JavaScript

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Dasar JavaScript</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem;line-height:1.6}h2{color:#B8860B;border-bottom:2px solid #F7DF1E;padding-bottom:.3rem}pre{background:#1e1e1e;color:#f8f8f2;padding:1rem;border-radius:8px;overflow-x:auto}.output{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}button{background:#F7DF1E;color:#000;border:none;padding:.5rem 1.2rem;border-radius:6px;cursor:pointer;font-weight:bold}button:hover{background:#e6cf1a}</style></head>
<body>
<h1>Hello JavaScript!</h1>
<p>Buka <strong>Console</strong> (F12) untuk melihat output.</p>
<script>
  // VARIABEL
  let nama = "Aulia";
  const umur = 20;
  var kota = "Jakarta";

  // TIPE DATA
  let teks = "Halo Dunia";
  let angka = 42;
  let desimal = 3.14;
  let isActive = true;
  let kosong = null;
  let tidakDidefinisikan;

  console.log("Nama:", nama, "| Tipe:", typeof nama);
  console.log("Umur:", umur, "| Tipe:", typeof umur);
  console.log("Aktif:", isActive, "| Tipe:", typeof isActive);
  console.log("Null:", kosong, "| Tipe:", typeof kosong);
  console.log("Undefined:", tidakDidefinisikan, "| Tipe:", typeof tidakDidefinisikan);

  // OUTPUT KE HALAMAN
  document.getElementById("output").innerHTML = `
    <p><strong>Nama:</strong> ${nama}</p>
    <p><strong>Umur:</strong> ${umur}</p>
    <p><strong>Kota:</strong> ${kota}</p>
    <p><strong>Angka favorit:</strong> ${angka}</p>
  `;
</script>
<h2>Output</h2>
<div class="output" id="output"></div>
<button onclick="document.getElementById('output').innerHTML += '<p>Tombol diklik!</p>'">Klik Saya</button>
</body>
</html>
```

---

## Penjelasan

### Variabel
Gunakan `let` untuk nilai yang bisa berubah, `const` untuk nilai tetap. Hindari `var` karena masalah scope.

### Tipe Data
JavaScript memiliki 7 tipe data primitif: string, number, boolean, null, undefined, symbol, bigint. Sisanya adalah object.

### Console
`console.log()` adalah alat debugging utama. Buka DevTools (F12) untuk melihat output.

### Aturan Penamaan
Gunakan camelCase untuk variabel dan fungsi. Nama harus dimulai dengan huruf, `$`, atau `_`.

---

## Eksperimen

1. **Ganti nilai variabel `nama` dengan nama Anda**
1. **Tambahkan variabel baru: `hobi` bertipe string**
1. **Coba `console.table()` untuk menampilkan data**
1. **Ubah `const` jadi `let`** — apa yang terjadi?

---

## Tantangan

Buat halaman profil pribadi yang menampilkan nama, umur, hobi, dan pendidikan menggunakan variabel JavaScript. Tampilkan data tersebut di halaman HTML dan juga di console browser. Gunakan minimal 3 tipe data berbeda.

---

## Ringkasan

JavaScript adalah bahasa yang dinamis dan fleksibel. Anda telah mempelajari variabel, tipe data, dan sintaks dasar. Modul selanjutnya: **Operator & Control Flow** — cara membuat keputusan dan perulangan dalam kode.
