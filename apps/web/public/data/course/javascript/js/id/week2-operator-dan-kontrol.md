# Operator & Control Flow

> JavaScript | Modul 2

## Tujuan Pembelajaran

- Menguasai operator aritmatika, perbandingan, dan logika
- Menggunakan if/else dan switch untuk pengambilan keputusan
- Memahami perulangan for, while, dan for...of
- Membedakan == vs === serta truthy/falsy
- Menggabungkan kontrol flow dalam program sederhana

---

## Program: Kalkulator Sederhana

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Operator & Control Flow</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input,select{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer}</style></head>
<body>
<h1>Kalkulator & Control Flow</h1>
<div class="card">
  <h2>Operator Aritmatika</h2>
  <input type="number" id="num1" value="10">
  <input type="number" id="num2" value="3">
  <button onclick="hitung()">Hitung</button>
  <pre id="hasilArit" style="background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;margin-top:.5rem"></pre>
</div>
<div class="card">
  <h2>Grade Nilai (if/else)</h2>
  <input type="number" id="nilai" placeholder="Masukkan nilai" min="0" max="100">
  <button onclick="cekGrade()">Cek Grade</button>
  <p id="hasilGrade"></p>
</div>
<div class="card">
  <h2>Tabel Perkalian (loop)</h2>
  <input type="number" id="tabel" value="5" min="1" max="10">
  <button onclick="buatTabel()">Buat Tabel</button>
  <pre id="hasilTabel" style="background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px"></pre>
</div>
<script>
  function hitung() {
    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    document.getElementById("hasilArit").textContent =
      `${a} + ${b} = ${a + b}\n${a} - ${b} = ${a - b}\n${a} × ${b} = ${a * b}\n${a} ÷ ${b} = ${(a / b).toFixed(2)}\n${a} % ${b} = ${a % b}`;
    console.log("Operator:", a, b, "→", a + b, a - b, a * b, a / b);
  }
  function cekGrade() {
    let n = Number(document.getElementById("nilai").value);
    let grade;
    if (n >= 90) grade = "A (Sempurna!)";
    else if (n >= 80) grade = "B (Baik)";
    else if (n >= 70) grade = "C (Cukup)";
    else if (n >= 60) grade = "D (Kurang)";
    else grade = "E (Remidi)";
    document.getElementById("hasilGrade").innerHTML = `Nilai ${n}: <strong>${grade}</strong>`;
  }
  function buatTabel() {
    let n = Number(document.getElementById("tabel").value);
    let out = "";
    for (let i = 1; i <= 10; i++) {
      out += `${n} × ${i} = ${n * i}\n`;
    }
    document.getElementById("hasilTabel").textContent = out;
  }
</script>
</body>
</html>
```

---

## Penjelasan

### Operator Aritmatika
`+`, `-`, `*`, `/`, `%` untuk perhitungan dasar. `%` menghasilkan sisa bagi.

### Operator Perbandingan
`===` (strict equality) cek nilai DAN tipe. `==` hanya cek nilai (dengan coercion). Selalu gunakan `===`.

### Truthy & Falsy
Nilai falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Sisanya truthy.

### Perulangan
`for` — iterasi dengan counter. `while` — selama kondisi true. `for...of` — untuk array.

---

## Eksperimen

1. **Ubah nilai grade: apakah if/else sudah benar?**
1. **Ganti `===` dengan `==`** — lihat perbedaannya
1. **Buat loop yang hanya mencetak angka genap**
1. **Tambahkan operator logika: cek nilai antara 80-100**

---

## Tantangan

Buat program "Tebak Angka": komputer memilih angka acak 1-100, user menebak. Beri petunjuk "lebih besar" atau "lebih kecil". Hitung jumlah percobaan. Gunakan loop dan conditional.

---

## Ringkasan

Operator dan control flow adalah fondasi logika pemrograman. Dengan if/else, switch, dan loop, Anda bisa mengontrol alur eksekusi kode. Modul selanjutnya: **Fungsi** — blok bangunan kode yang dapat digunakan kembali.
