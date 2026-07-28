# Fungsi

> JavaScript | Modul 3

## Tujuan Pembelajaran

- Membuat fungsi dengan deklarasi, ekspresi, dan arrow
- Memahami parameter, return value, dan default parameter
- Mengenal scope global, lokal, dan block scope
- Menggunakan callback function
- Menerapkan fungsi sebagai warga kelas satu

---

## Program: Manajemen Nilai

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Fungsi</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Manajemen Nilai Siswa</h1>
<div class="card">
  <h2>Tambah Nilai</h2>
  <input type="text" id="namaSiswa" placeholder="Nama siswa">
  <input type="number" id="nilaiSiswa" placeholder="Nilai">
  <button onclick="tambahNilai()">Tambah</button>
</div>
<div class="card">
  <button onclick="hitungRata()">Hitung Rata-rata</button>
  <button onclick="tampilkanLulus()">Siswa Lulus</button>
  <button onclick="resetNilai()">Reset</button>
</div>
<pre id="output">Data siswa akan tampil di sini</pre>
<script>
  let daftarNilai = [];

  // FUNCTION DECLARATION
  function tambahNilai() {
    let nama = document.getElementById("namaSiswa").value.trim();
    let nilai = Number(document.getElementById("nilaiSiswa").value);
    if (!nama || isNaN(nilai)) { alert("Isi nama dan nilai!"); return; }
    daftarNilai.push({ nama, nilai });
    render();
  }

  // ARROW FUNCTION
  const hitungRata = () => {
    if (daftarNilai.length === 0) return 0;
    let total = daftarNilai.reduce((sum, s) => sum + s.nilai, 0);
    return total / daftarNilai.length;
  };

  // FUNCTION WITH CALLBACK
  function filterNilai(kriteria) {
    return daftarNilai.filter(kriteria);
  }

  const tampilkanLulus = () => {
    let lulus = filterNilai(s => s.nilai >= 70);
    console.log("Siswa lulus:", lulus);
    alert(`Siswa lulus: ${lulus.length} orang`);
  };

  // HIGHER-ORDER FUNCTION
  function resetNilai() {
    daftarNilai = [];
    render();
    console.log("Data direset");
  }

  function render() {
    let out = `Total siswa: ${daftarNilai.length}\n`;
    daftarNilai.forEach((s, i) => {
      out += `${i + 1}. ${s.nama}: ${s.nilai}\n`;
    });
    if (daftarNilai.length > 0) {
      out += `\nRata-rata: ${hitungRata().toFixed(1)}`;
    }
    document.getElementById("output").textContent = out || "Belum ada data";
  }
</script>
</body>
</html>
```

---

## Penjelasan

### Function Declaration vs Expression
Declaration bisa dipanggil sebelum didefinisikan (hoisting). Expression tidak bisa.

### Arrow Function
Lebih ringkas, tidak memiliki `this` sendiri. Cocok untuk callback.

### Scope
Variable dalam function hanya bisa diakses di dalam function itu. `let` dan `const` memiliki block scope.

### Callback
Fungsi yang dikirim sebagai argumen ke fungsi lain. Fondasi untuk async JavaScript.

---

## Eksperimen

1. **Buat fungsi `rataRata(arr)` yang menghitung rata-rata array**
1. **Ubah arrow function jadi function declaration**
1. **Tambahkan default parameter pada fungsi tambahNilai**
1. **Buat fungsi kalkulator yang menerima operator sebagai parameter**

---

## Tantangan

Buat kalkulator ilmiah dengan fungsi: tambah, kurang, kali, bagi, pangkat, akar kuadrat, dan faktorial. Gunakan function declaration, arrow function, dan callback. Tampilkan hasil di halaman.

---

## Ringkasan

Fungsi adalah warga kelas satu di JavaScript. Anda telah belajar deklarasi, arrow function, scope, dan callback. Modul selanjutnya: **Array & Metode** — struktur data untuk koleksi informasi.
