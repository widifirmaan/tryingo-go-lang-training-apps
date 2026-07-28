import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/javascript/js');

const MODULES = [
  { id: 1,  f: 'dasar-javascript',    lid: 'JavaScript Dasar',           len: 'JavaScript Basics',         cid: 'Halo JavaScript',        cen: 'Hello JavaScript' },
  { id: 2,  f: 'operator-dan-kontrol', lid: 'Operator & Control Flow',   len: 'Operators & Control Flow',  cid: 'Kalkulator Sederhana',   cen: 'Simple Calculator' },
  { id: 3,  f: 'fungsi',               lid: 'Fungsi',                    len: 'Functions',                 cid: 'Manajemen Nilai',        cen: 'Grade Manager' },
  { id: 4,  f: 'array-dan-metode',     lid: 'Array & Metode',            len: 'Arrays & Methods',          cid: 'Daftar Belanja',         cen: 'Shopping List' },
  { id: 5,  f: 'objek-dan-data',       lid: 'Objek & Data',              len: 'Objects & Data',            cid: 'Buku Alamat',            cen: 'Address Book' },
  { id: 6,  f: 'dom-manipulasi',       lid: 'DOM Manipulation',          len: 'DOM Manipulation',          cid: 'Pengubah Halaman',       cen: 'Page Modifier' },
  { id: 7,  f: 'event-dan-form',       lid: 'Event & Form',              len: 'Events & Forms',            cid: 'Form Cerdas',            cen: 'Smart Form' },
  { id: 8,  f: 'javascript-modern',    lid: 'JavaScript Modern',         len: 'Modern JavaScript',         cid: 'Demo Fitur ES6+',        cen: 'ES6+ Features Demo' },
  { id: 9,  f: 'async-javascript',     lid: 'Async JavaScript',          len: 'Asynchronous JavaScript',   cid: 'Pengambil Data',         cen: 'Data Fetcher' },
  { id: 10, f: 'browser-api',          lid: 'Browser API',               len: 'Browser APIs',              cid: 'Toolkit Pribadi',        cen: 'Personal Toolkit' },
  { id: 11, f: 'konsep-lanjutan',      lid: 'Konsep Lanjutan',           len: 'Advanced Concepts',         cid: 'Aplikasi Catatan',       cen: 'Notes App' },
  { id: 12, f: 'proyek-akhir',         lid: 'Proyek Akhir',              len: 'Final Project',             cid: 'Dashboard Interaktif',   cen: 'Interactive Dashboard' },
];

const OBJ = {
  1: { id: ['Memahami variabel let, const, dan perbedaannya', 'Mengenal tipe data: string, number, boolean, null, undefined', 'Menggunakan console.log untuk debugging', 'Menulis komentar dan sintaks dasar JavaScript', 'Memahami case sensitivity dan aturan penamaan'], en: ['Understand let, const variables and their differences', 'Learn data types: string, number, boolean, null, undefined', 'Use console.log for debugging', 'Write comments and basic JavaScript syntax', 'Understand case sensitivity and naming conventions'] },
  2: { id: ['Menguasai operator aritmatika, perbandingan, dan logika', 'Menggunakan if/else dan switch untuk pengambilan keputusan', 'Memahami perulangan for, while, dan for...of', 'Membedakan == vs === serta truthy/falsy', 'Menggabungkan kontrol flow dalam program sederhana'], en: ['Master arithmetic, comparison, and logical operators', 'Use if/else and switch for decision making', 'Understand for, while, and for...of loops', 'Distinguish == vs === and truthy/falsy values', 'Combine control flow in simple programs'] },
  3: { id: ['Membuat fungsi dengan deklarasi, ekspresi, dan arrow', 'Memahami parameter, return value, dan default parameter', 'Mengenal scope global, lokal, dan block scope', 'Menggunakan callback function', 'Menerapkan fungsi sebagai warga kelas satu'], en: ['Create functions with declarations, expressions, and arrows', 'Understand parameters, return values, and default parameters', 'Learn global, local, and block scope', 'Use callback functions', 'Apply functions as first-class citizens'] },
  4: { id: ['Membuat dan memanipulasi array', 'Menggunakan method: push, pop, shift, unshift', 'Mengiterasi array dengan forEach, map, filter, reduce', 'Menggunakan spread operator dan destructuring', 'Memahami metode pencarian: find, some, every'], en: ['Create and manipulate arrays', 'Use methods: push, pop, shift, unshift', 'Iterate arrays with forEach, map, filter, reduce', 'Use spread operator and destructuring', 'Understand search methods: find, some, every'] },
  5: { id: ['Membuat dan mengelola objek JavaScript', 'Mengakses properti dengan dot dan bracket notation', 'Menggunakan destrukturisasi objek', 'Memahami JSON.parse dan JSON.stringify', 'Menerapkan object spread dan computed keys'], en: ['Create and manage JavaScript objects', 'Access properties with dot and bracket notation', 'Use object destructuring', 'Understand JSON.parse and JSON.stringify', 'Apply object spread and computed keys'] },
  6: { id: ['Memilih elemen dengan querySelector dan getElementById', 'Membuat dan menyisipkan elemen baru', 'Mengubah konten, atribut, dan style elemen', 'Mengelola class dengan classList', 'Menghapus elemen dari DOM'], en: ['Select elements with querySelector and getElementById', 'Create and insert new elements', 'Modify content, attributes, and styles', 'Manage classes with classList', 'Remove elements from the DOM'] },
  7: { id: ['Mendengarkan event dengan addEventListener', 'Mengenal jenis event: click, submit, input, keydown', 'Mengakses event object dan target', 'Mencegah perilaku default form', 'Memahami event bubbling dan delegation'], en: ['Listen to events with addEventListener', 'Learn event types: click, submit, input, keydown', 'Access the event object and target', 'Prevent default form behavior', 'Understand event bubbling and delegation'] },
  8: { id: ['Mengimpor dan mengekspor modul ES6', 'Membuat class dengan constructor dan method', 'Menggunakan template literal untuk string', 'Menerapkan optional chaining dan nullish coalescing', 'Memahami Map, Set, dan struktur data modern'], en: ['Import and export ES6 modules', 'Create classes with constructor and methods', 'Use template literals for strings', 'Apply optional chaining and nullish coalescing', 'Understand Map, Set, and modern data structures'] },
  9: { id: ['Memahami konsep synchronous vs asynchronous', 'Membuat dan menggunakan Promise', 'Menulis async/await untuk kode asinkron', 'Mengambil data dengan Fetch API', 'Menangani error dengan try/catch'], en: ['Understand synchronous vs asynchronous concepts', 'Create and use Promises', 'Write async/await for asynchronous code', 'Fetch data with the Fetch API', 'Handle errors with try/catch'] },
  10: { id: ['Menyimpan data dengan localStorage dan sessionStorage', 'Menggunakan Geolocation API', 'Membuat animasi dengan requestAnimationFrame', 'Mengelola waktu dengan setTimeout dan setInterval', 'Memanfaatkan Notification API'], en: ['Store data with localStorage and sessionStorage', 'Use the Geolocation API', 'Create animations with requestAnimationFrame', 'Manage time with setTimeout and setInterval', 'Leverage the Notification API'] },
  11: { id: ['Memahami closure dan penggunaannya', 'Menguasai binding this: call, apply, bind', 'Mengenal prototype chain dan inheritance', 'Menerapkan debounce dan throttle', 'Menggunakan pola Module dan IIFE'], en: ['Understand closures and their use cases', 'Master this binding: call, apply, bind', 'Learn prototype chain and inheritance', 'Apply debounce and throttle', 'Use Module pattern and IIFE'] },
  12: { id: ['Menggabungkan semua konsep JavaScript dalam satu proyek', 'Mendesain arsitektur aplikasi yang terstruktur', 'Mengelola state aplikasi secara efektif', 'Membangun UI yang responsif dan interaktif', 'Men-deploy project JavaScript vanilla'], en: ['Combine all JavaScript concepts in one project', 'Design structured application architecture', 'Manage application state effectively', 'Build responsive and interactive UI', 'Deploy a vanilla JavaScript project'] },
};

const CODE = {
  1: `<!DOCTYPE html>
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
  document.getElementById("output").innerHTML = \`
    <p><strong>Nama:</strong> \${nama}</p>
    <p><strong>Umur:</strong> \${umur}</p>
    <p><strong>Kota:</strong> \${kota}</p>
    <p><strong>Angka favorit:</strong> \${angka}</p>
  \`;
</script>
<h2>Output</h2>
<div class="output" id="output"></div>
<button onclick="document.getElementById('output').innerHTML += '<p>Tombol diklik!</p>'">Klik Saya</button>
</body>
</html>`,

  2: `<!DOCTYPE html>
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
      \`\${a} + \${b} = \${a + b}\\n\${a} - \${b} = \${a - b}\\n\${a} × \${b} = \${a * b}\\n\${a} ÷ \${b} = \${(a / b).toFixed(2)}\\n\${a} % \${b} = \${a % b}\`;
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
    document.getElementById("hasilGrade").innerHTML = \`Nilai \${n}: <strong>\${grade}</strong>\`;
  }
  function buatTabel() {
    let n = Number(document.getElementById("tabel").value);
    let out = "";
    for (let i = 1; i <= 10; i++) {
      out += \`\${n} × \${i} = \${n * i}\\n\`;
    }
    document.getElementById("hasilTabel").textContent = out;
  }
</script>
</body>
</html>`,

  3: `<!DOCTYPE html>
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
    alert(\`Siswa lulus: \${lulus.length} orang\`);
  };

  // HIGHER-ORDER FUNCTION
  function resetNilai() {
    daftarNilai = [];
    render();
    console.log("Data direset");
  }

  function render() {
    let out = \`Total siswa: \${daftarNilai.length}\\n\`;
    daftarNilai.forEach((s, i) => {
      out += \`\${i + 1}. \${s.nama}: \${s.nilai}\\n\`;
    });
    if (daftarNilai.length > 0) {
      out += \`\\nRata-rata: \${hitungRata().toFixed(1)}\`;
    }
    document.getElementById("output").textContent = out || "Belum ada data";
  }
</script>
</body>
</html>`,

  4: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Array & Metode</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Daftar Belanja</h1>
<div class="card">
  <input type="text" id="itemBaru" placeholder="Nama item">
  <input type="number" id="qtyBaru" placeholder="Jumlah" value="1" min="1">
  <button onclick="tambahItem()">Tambah</button>
  <button onclick="hapusTerakhir()">Hapus Terakhir</button>
  <button onclick="urutkanItem()">Urutkan A-Z</button>
  <button onclick="filterBeli()">Yang Belum Dibeli</button>
</div>
<pre id="output">Daftar belanjaan akan muncul di sini</pre>
<div class="card">
  <h2>Demo Method Array</h2>
  <button onclick="demoMap()">map() — Nama Saja</button>
  <button onclick="demoFilter()">filter() — Qty > 2</button>
  <button onclick="demoReduce()">reduce() — Total Item</button>
  <button onclick="demoFind()">find() — Cari "Susu"</button>
</div>
<pre id="demoOutput"></pre>
<script>
  let belanja = [
    { nama: "Beras", qty: 2, beli: false },
    { nama: "Telur", qty: 12, beli: true },
  ];
  function render() {
    let out = belanja.map((item, i) =>
      \`\${i + 1}. [\${item.beli ? "✓" : " "}] \${item.nama} × \${item.qty}\`
    ).join("\\n");
    document.getElementById("output").textContent = out || "Kosong";
    console.log("Daftar:", belanja);
  }
  function tambahItem() {
    let nama = document.getElementById("itemBaru").value.trim();
    let qty = Number(document.getElementById("qtyBaru").value);
    if (!nama) return;
    belanja.push({ nama, qty, beli: false });
    render();
  }
  function hapusTerakhir() { belanja.pop(); render(); }
  function urutkanItem() {
    belanja.sort((a, b) => a.nama.localeCompare(b.nama)); render();
  }
  function filterBeli() {
    let belum = belanja.filter(item => !item.beli);
    alert(\`Belum dibeli: \${belum.length} item\`);
  }
  function demoMap() {
    let namaSaja = belanja.map(i => i.nama);
    document.getElementById("demoOutput").textContent = "Nama item: " + namaSaja.join(", ");
  }
  function demoFilter() {
    let banyak = belanja.filter(i => i.qty > 2);
    document.getElementById("demoOutput").textContent = "Qty > 2: " + banyak.map(i => i.nama).join(", ");
  }
  function demoReduce() {
    let total = belanja.reduce((sum, i) => sum + i.qty, 0);
    document.getElementById("demoOutput").textContent = "Total item: " + total;
  }
  function demoFind() {
    let found = belanja.find(i => i.nama.toLowerCase().includes("susu"));
    document.getElementById("demoOutput").textContent = found ? \`Ditemukan: \${found.nama} × \${found.qty}\` : "Tidak ditemukan";
  }
  render();
</script>
</body>
</html>`,

  5: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Objek & Data</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Buku Alamat</h1>
<div class="card">
  <input type="text" id="nama" placeholder="Nama">
  <input type="email" id="email" placeholder="Email">
  <input type="tel" id="telp" placeholder="Telepon">
  <button onclick="simpanKontak()">Simpan</button>
</div>
<pre id="output"></pre>
<div class="card">
  <h2>Demo Objek</h2>
  <button onclick="demoDestructure()">Destructuring</button>
  <button onclick="demoSpread()">Spread Object</button>
  <button onclick="demoJson()">JSON Export</button>
</div>
<pre id="demoOut"></pre>
<script>
  let kontak = [];
  function buatKontak(nama, email, telp) {
    return { nama, email, telp, dibuat: new Date().toLocaleString() };
  }
  function simpanKontak() {
    let n = document.getElementById("nama").value.trim();
    let e = document.getElementById("email").value.trim();
    let t = document.getElementById("telp").value.trim();
    if (!n || !e) { alert("Nama dan email wajib!"); return; }
    kontak.push(buatKontak(n, e, t));
    render();
  }
  function render() {
    let out = kontak.map((k, i) =>
      \`\${i + 1}. \${k.nama} | \${k.email} | \${k.telp} (\${k.dibuat})\`
    ).join("\\n");
    document.getElementById("output").textContent = out || "Belum ada kontak";
  }
  function demoDestructure() {
    if (!kontak.length) return alert("Tambah kontak dulu!");
    let { nama, email } = kontak[0];
    document.getElementById("demoOut").textContent =
      \`Destructure: Nama = \${nama}, Email = \${email}\`;
  }
  function demoSpread() {
    if (!kontak.length) return alert("Tambah kontak dulu!");
    let asli = kontak[0];
    let salinan = { ...asli, dimodifikasi: true };
    document.getElementById("demoOut").textContent =
      "Asli: " + JSON.stringify(asli) + "\\nSalinan (spread): " + JSON.stringify(salinan);
  }
  function demoJson() {
    let json = JSON.stringify(kontak, null, 2);
    document.getElementById("demoOut").textContent = json;
    console.log("JSON export:", json);
  }
</script>
</body>
</html>`,

  6: `<!DOCTYPE html>
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
</html>`,

  7: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Event & Form</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input,select,textarea{padding:.4rem;border:1px solid #ccc;border-radius:4px;width:100%;box-sizing:border-box;margin-bottom:.5rem}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer}.error{border-color:#e63946!important;background:#ffe5e5}.success{border-color:#2ecc71!important}.toast{position:fixed;top:20px;right:20px;background:#333;color:#fff;padding:.8rem 1.2rem;border-radius:8px;opacity:0;transition:opacity .3s;z-index:999}</style></head>
<body>
<h1>Form Cerdas</h1>
<div class="card">
  <form id="myForm">
    <label>Nama Lengkap <span style="color:red">*</span></label>
    <input type="text" id="name" required placeholder="Min. 3 karakter">
    <label>Email <span style="color:red">*</span></label>
    <input type="email" id="email" required placeholder="contoh@email.com">
    <label>Umur</label>
    <input type="number" id="age" min="1" max="150" placeholder="1-150">
    <label>Kategori</label>
    <select id="category">
      <option value="">Pilih...</option>
      <option value="student">Pelajar</option>
      <option value="worker">Pekerja</option>
      <option value="other">Lainnya</option>
    </select>
    <label>Pesan</label>
    <textarea id="message" rows="3" placeholder="Tulis pesan..."></textarea>
    <div style="display:flex;gap:8px;margin-top:.5rem">
      <button type="submit">Kirim</button>
      <button type="reset" style="background:#ccc">Reset</button>
    </div>
  </form>
</div>
<div id="log" class="card">
  <h2>Event Log</h2>
  <pre id="eventLog" style="background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;max-height:150px;overflow-y:auto"></pre>
</div>
<div id="toast" class="toast"></div>
<script>
  function showToast(msg) {
    let t = document.getElementById("toast");
    t.textContent = msg; t.style.opacity = 1;
    setTimeout(() => t.style.opacity = 0, 2000);
  }
  function log(evt) {
    let el = document.getElementById("eventLog");
    el.textContent += \`[\${evt.type}] \${evt.target.id || evt.target.tagName}\\n\`;
    el.scrollTop = el.scrollHeight;
  }
  document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    if (name.length < 3) {
      document.getElementById("name").classList.add("error");
      return showToast("Nama minimal 3 karakter!");
    }
    document.getElementById("name").classList.remove("error");
    showToast(\`Data terkirim! Nama: \${name}, Email: \${email}\`);
    console.log("Form submitted:", { name, email });
  });
  document.getElementById("myForm").addEventListener("reset", function() {
    showToast("Form direset");
    document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
  });
  document.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("focus", log);
    el.addEventListener("blur", log);
    el.addEventListener("input", function() { this.classList.remove("error"); });
  });
  // EVENT DELEGATION
  document.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON" && e.target.type === "submit") {
      console.log("Tombol submit diklik (delegation)");
    }
  });
</script>
</body>
</html>`,

  8: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>JavaScript Modern</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}</style></head>
<body>
<h1>Demo Fitur ES6+</h1>
<div class="card">
  <button onclick="demoTemplate()">Template Literal</button>
  <button onclick="demoClass()">Class & Extends</button>
  <button onclick="demoOptional()">Optional Chaining</button>
  <button onclick="demoMapSet()">Map & Set</button>
  <button onclick="demoDestruct()">Destructuring</button>
</div>
<pre id="output">Klik tombol untuk demo fitur ES6+</pre>
<script>
  // TEMPLATE LITERAL
  function demoTemplate() {
    let name = "Budi", role = "Developer";
    let msg = \`Halo, nama saya \${name}!\\nSaya seorang \${role}.\\nTahun ini saya berusia \${2026 - 2000} tahun.\`;
    document.getElementById("output").textContent = msg;
  }
  // CLASS
  function demoClass() {
    class Animal {
      constructor(nama) { this.nama = nama; }
      bersuara() { return \`\${this.nama} membuat suara\`; }
    }
    class Kucing extends Animal {
      bersuara() { return \`\${this.nama} mengeong: Meow!\`; }
    }
    class Anjing extends Animal {
      bersuara() { return \`\${this.nama} menggonggong: Woof!\`; }
    }
    let kucing = new Kucing("Mimi");
    let anjing = new Anjing("Doggy");
    document.getElementById("output").textContent =
      kucing.bersuara() + "\\n" + anjing.bersuara();
  }
  // OPTIONAL CHAINING
  function demoOptional() {
    let user = { nama: "Siti", alamat: { kota: "Jakarta" } };
    let user2 = { nama: "Ali" };
    let kota1 = user?.alamat?.kota ?? "Tidak diketahui";
    let kota2 = user2?.alamat?.kota ?? "Tidak diketahui";
    document.getElementById("output").textContent =
      \`user.alamat.kota: \${kota1}\\nuser2.alamat.kota: \${kota2}\`;
  }
  // MAP & SET
  function demoMapSet() {
    let skor = new Map();
    skor.set("Budi", 85); skor.set("Siti", 92); skor.set("Ali", 78);
    let nilaiUnik = new Set([85, 92, 78, 85, 92]);
    let out = "Map (Nilai Siswa):\\n";
    skor.forEach((v, k) => { out += \`  \${k}: \${v}\\n\`; });
    out += "\\nSet (Nilai Unik): [" + [...nilaiUnik].join(", ") + "]";
    document.getElementById("output").textContent = out;
  }
  // DESTRUCTURING
  function demoDestruct() {
    let arr = [10, 20, 30, 40];
    let [a, b, ...sisa] = arr;
    let obj = { x: 100, y: 200 };
    let { x, y } = obj;
    document.getElementById("output").textContent =
      \`Array: a=\${a}, b=\${b}, sisa=[\${sisa}]\\nObjek: x=\${x}, y=\${y}\`;
  }
</script>
</body>
</html>`,

  9: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Async JavaScript</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;max-height:200px;overflow-y:auto}.spinner{display:inline-block;width:16px;height:16px;border:2px solid #F7DF1E;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-right:8px}@keyframes spin{to{transform:rotate(360deg)}}</style></head>
<body>
<h1>Async JavaScript Demo</h1>
<div class="card">
  <button onclick="demoPromise()">Promise Sederhana</button>
  <button onclick="demoAsync()">Async/Await</button>
  <button onclick="demoFetch()">Fetch API (JSON)</button>
  <button onclick="demoParallel()">Promise.all</button>
  <button onclick="clearOut()">Clear</button>
</div>
<pre id="status"></pre>
<pre id="output">Klik tombol untuk melihat async JavaScript dalam aksi</pre>
<script>
  function log(msg) {
    document.getElementById("output").textContent += msg + "\\n";
  }
  function setStatus(msg) {
    document.getElementById("status").textContent = msg;
  }
  function clearOut() {
    document.getElementById("output").textContent = "";
    document.getElementById("status").textContent = "";
  }

  // PROMISE
  function demoPromise() {
    setStatus("⏳ Promise berjalan...");
    log("→ Promise dimulai");
    let janji = new Promise((resolve, reject) => {
      setTimeout(() => {
        let berhasil = Math.random() > 0.3;
        if (berhasil) resolve("✅ Data berhasil dimuat!");
        else reject("❌ Gagal memuat data");
      }, 1500);
    });
    janji
      .then(hasil => { log(hasil); setStatus("✅ Promise selesai"); })
      .catch(err => { log(err); setStatus("❌ Promise gagal"); });
  }

  // ASYNC/AWAIT
  function tunda(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
  async function demoAsync() {
    setStatus("⏳ Async/Await berjalan...");
    log("→ Async function dimulai");
    try {
      await tunda(800);
      log("✅ Langkah 1: Koneksi database OK");
      await tunda(800);
      log("✅ Langkah 2: Data ditemukan (42 baris)");
      await tunda(800);
      log("✅ Langkah 3: Data diproses");
      setStatus("✅ Async/Await selesai!");
    } catch (err) {
      log("❌ Error: " + err);
      setStatus("❌ Gagal");
    }
  }

  // FETCH API
  async function demoFetch() {
    setStatus("⏳ Mengambil data...");
    log("→ Fetch API dimulai");
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (!res.ok) throw new Error("HTTP " + res.status);
      let data = await res.json();
      log("✅ Data diterima:");
      log("  ID: " + data.id);
      log("  Judul: " + data.title);
      log("  Selesai: " + data.completed);
      setStatus("✅ Fetch selesai!");
    } catch (err) {
      log("❌ Fetch error: " + err.message);
      setStatus("❌ Fetch gagal (gunakan Live Server atau proxy)");
    }
  }

  // PROMISE.ALL
  async function demoParallel() {
    setStatus("⏳ Eksekusi paralel...");
    log("→ Promise.all dimulai");
    let mulai = Date.now();
    try {
      let hasil = await Promise.all([
        tunda(1000).then(() => "Tugas 1 (1s) selesai"),
        tunda(2000).then(() => "Tugas 2 (2s) selesai"),
        tunda(1500).then(() => "Tugas 3 (1.5s) selesai"),
      ]);
      let waktu = ((Date.now() - mulai) / 1000).toFixed(1);
      hasil.forEach(h => log("  " + h));
      log(\`✅ Semua selesai dalam \${waktu}s (bukan 4.5s!)\`);
      setStatus("✅ Paralel selesai!");
    } catch (err) {
      log("❌ " + err);
      setStatus("❌ Gagal");
    }
  }
</script>
</body>
</html>`,

  10: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Browser API</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input,textarea{padding:.4rem;border:1px solid #ccc;border-radius:4px;width:100%;box-sizing:border-box}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px}#canvas{border:1px solid #ccc;border-radius:8px;display:block;margin:.5rem 0}</style></head>
<body>
<h1>Browser API Toolkit</h1>
<div class="card">
  <h2>📝 Catatan Cepat (localStorage)</h2>
  <textarea id="note" rows="3" placeholder="Tulis catatan..."></textarea>
  <button onclick="simpanNote()">Simpan</button>
  <button onclick="hapusNote()">Hapus</button>
  <p id="noteStatus"></p>
</div>
<div class="card">
  <h2>⏱️ Timer</h2>
  <p>Waktu: <span id="timer">00:00:00</span></p>
  <button onclick="mulaiTimer()">Mulai</button>
  <button onclick="hentikanTimer()">Hentikan</button>
  <button onclick="resetTimer()">Reset</button>
</div>
<div class="card">
  <h2>📍 Geolocation</h2>
  <button onclick="dapatkanLokasi()">Dapatkan Lokasi Saya</button>
  <pre id="lokasi"></pre>
</div>
<div class="card">
  <h2>🎨 Canvas</h2>
  <canvas id="canvas" width="300" height="150"></canvas>
  <button onclick="gambarCanvas()">Gambar</button>
  <button onclick="clearCanvas()">Hapus Canvas</button>
</div>
<script>
  // localStorage
  function simpanNote() {
    let note = document.getElementById("note").value;
    localStorage.setItem("quickNote", note);
    document.getElementById("noteStatus").textContent = "✅ Tersimpan!";
  }
  function hapusNote() {
    localStorage.removeItem("quickNote");
    document.getElementById("note").value = "";
    document.getElementById("noteStatus").textContent = "🗑️ Dihapus";
  }
  (function() {
    let saved = localStorage.getItem("quickNote");
    if (saved) document.getElementById("note").value = saved;
  })();

  // Timer
  let timerInterval, detik = 0;
  function mulaiTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      detik++;
      let h = String(Math.floor(detik / 3600)).padStart(2, "0");
      let m = String(Math.floor((detik % 3600) / 60)).padStart(2, "0");
      let s = String(detik % 60).padStart(2, "0");
      document.getElementById("timer").textContent = \`\${h}:\${m}:\${s}\`;
    }, 1000);
  }
  function hentikanTimer() { clearInterval(timerInterval); timerInterval = null; }
  function resetTimer() { hentikanTimer(); detik = 0; document.getElementById("timer").textContent = "00:00:00"; }

  // Geolocation
  function dapatkanLokasi() {
    if (!navigator.geolocation) return alert("Geolocation tidak didukung");
    navigator.geolocation.getCurrentPosition(
      pos => {
        document.getElementById("lokasi").textContent =
          \`Lat: \${pos.coords.latitude}\\nLng: \${pos.coords.longitude}\\nAkurasi: \${pos.coords.accuracy}m\`;
      },
      err => document.getElementById("lokasi").textContent = "❌ " + err.message
    );
  }

  // Canvas
  function gambarCanvas() {
    let c = document.getElementById("canvas").getContext("2d");
    c.fillStyle = "#F7DF1E";
    c.fillRect(20, 20, 260, 110);
    c.fillStyle = "#000";
    c.font = "bold 20px system-ui";
    c.textAlign = "center";
    c.fillText("Hello Canvas!", 150, 85);
    c.beginPath();
    c.arc(250, 50, 25, 0, Math.PI * 2);
    c.fillStyle = "#e63946";
    c.fill();
  }
  function clearCanvas() {
    let c = document.getElementById("canvas").getContext("2d");
    c.clearRect(0, 0, 300, 150);
  }
</script>
</body>
</html>`,

  11: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Konsep Lanjutan</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc;border-radius:4px}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}pre{background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;min-height:60px}</style></head>
<body>
<h1>Aplikasi Catatan dengan Closure</h1>
<div class="card">
  <p>Catatan ini menggunakan <strong>closure</strong> untuk menyimpan state privat.</p>
  <input type="text" id="noteInput" placeholder="Isi catatan...">
  <button onclick="tambahCatatan()">Tambah</button>
</div>
<pre id="output"></pre>
<div class="card">
  <h2>Demo Konsep Lanjutan</h2>
  <button onclick="demoClosure()">Closure Counter</button>
  <button onclick="demoBind()">this & bind</button>
  <button onclick="demoPrototype()">Prototype</button>
  <button onclick="demoDebounce()">Debounce Input</button>
  <button onclick="demoModule()">Module Pattern</button>
</div>
<pre id="demoOutput"></pre>
<script>
  // CLOSURE: State privat
  function buatPengelolaCatatan() {
    let catatan = [];
    return {
      tambah: function(isi) {
        catatan.push({ isi, waktu: new Date().toLocaleTimeString() });
        return catatan;
      },
      semua: function() { return [...catatan]; },
      hapusSemua: function() { catatan = []; }
    };
  }
  const pengelola = buatPengelolaCatatan();
  function tambahCatatan() {
    let isi = document.getElementById("noteInput").value.trim();
    if (!isi) return;
    pengelola.tambah(isi);
    renderCatatan();
  }
  function renderCatatan() {
    let all = pengelola.semua();
    document.getElementById("output").textContent =
      all.map((c, i) => \`\${i + 1}. [\${c.waktu}] \${c.isi}\`).join("\\n") || "Belum ada catatan";
  }

  // DEMO: Closure Counter
  function buatCounter() {
    let count = 0;
    return function() { return ++count; };
  }
  let counter = buatCounter();
  function demoClosure() {
    document.getElementById("demoOutput").textContent =
      \`Counter dipanggil: \${counter()} | \${counter()} | \${counter()} | \${counter()}\`;
  }

  // DEMO: this & bind
  function demoBind() {
    let user = {
      nama: "Budi", umur: 25,
      perkenalan: function(kota) {
        return \`Halo, saya \${this.nama}, \${this.umur} tahun dari \${kota}\`;
      }
    };
    let user2 = { nama: "Siti", umur: 22 };
    let bound = user.perkenalan.bind(user2, "Bandung");
    document.getElementById("demoOutput").textContent =
      "call: " + user.perkenalan.call(user2, "Jakarta") +
      "\\napply: " + user.perkenalan.apply(user2, ["Surabaya"]) +
      "\\nbind: " + bound();
  }

  // DEMO: Prototype
  function demoPrototype() {
    function Hewan(nama) { this.nama = nama; }
    Hewan.prototype.bersuara = function() {
      return \`\${this.nama} bersuara\`;
    };
    function Kucing(nama) { Hewan.call(this, nama); }
    Kucing.prototype = Object.create(Hewan.prototype);
    Kucing.prototype.bersuara = function() {
      return \`\${this.nama}: Meow!\`;
    };
    let k = new Kucing("Mimi");
    document.getElementById("demoOutput").textContent =
      k.bersuara() + "\\ninstanceof Hewan: " + (k instanceof Hewan);
  }

  // DEMO: Debounce
  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  let counterDebounce = 0;
  const debouncedLog = debounce(() => {
    document.getElementById("demoOutput").textContent += "✅ Eksekusi ke-" + (++counterDebounce) + "\\n";
  }, 1000);
  function demoDebounce() {
    document.getElementById("demoOutput").textContent = "Klik cepat berkali-kali...\\n";
    debouncedLog();
  }

  // DEMO: Module Pattern
  function demoModule() {
    const CounterModule = (function() {
      let _count = 0;
      return {
        increment: function() { return ++_count; },
        decrement: function() { return --_count; },
        getCount: function() { return _count; }
      };
    })();
    document.getElementById("demoOutput").textContent =
      \`Counter: \${CounterModule.increment()} | \${CounterModule.increment()} | \${CounterModule.decrement()}\`;
  }
</script>
</body>
</html>`,

  12: `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Dashboard Interaktif</title><style>body{font-family:system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1rem;background:#f8f9fa}h1{color:#333;border-bottom:3px solid #F7DF1E;padding-bottom:.5rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin:1.5rem 0}.card{background:#fff;padding:1.2rem;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08)}.card h3{color:#F7DF1E;margin:0 0 .8rem 0;font-size:1rem}input,select{padding:.5rem;border:1px solid #ddd;border-radius:6px;width:100%;box-sizing:border-box;margin-bottom:.5rem}button{background:#F7DF1E;color:#000;border:none;padding:.5rem 1rem;border-radius:6px;cursor:pointer;font-weight:bold;transition:opacity .2s}button:hover{opacity:.8}.todo-item{display:flex;align-items:center;gap:8px;padding:.4rem 0;border-bottom:1px solid #eee}.todo-item:last-child{border:0}.done{text-decoration:line-through;color:#999}.stats{display:flex;gap:1rem;flex-wrap:wrap}.stat{padding:.3rem .8rem;background:#f0f0f0;border-radius:20px;font-size:.85rem}.stat span{font-weight:bold}#clock{font-size:2.5rem;font-weight:bold;color:#333;text-align:center}</style></head>
<body>
<h1>Dashboard Interaktif</h1>
<div class="grid">
  <div class="card">
    <h3>⏰ Jam Digital</h3>
    <div id="clock">--:--:--</div>
  </div>
  <div class="card">
    <h3>📝 Todo List</h3>
    <div style="display:flex;gap:4px">
      <input type="text" id="todoInput" placeholder="Tambah tugas...">
      <button onclick="tambahTodo()" style="white-space:nowrap">+</button>
    </div>
    <div id="todoList"></div>
    <div class="stats" style="margin-top:8px">
      <span class="stat">Sisa: <span id="sisaCount">0</span></span>
      <span class="stat">Selesai: <span id="selesaiCount">0</span></span>
    </div>
  </div>
  <div class="card">
    <h3>🌤️ Cuaca (Simulasi)</h3>
    <select id="kotaSelect" onchange="updateCuaca()">
      <option value="Jakarta">Jakarta</option>
      <option value="Bandung">Bandung</option>
      <option value="Surabaya">Surabaya</option>
    </select>
    <div id="cuacaInfo" style="text-align:center;padding:1rem">
      <div style="font-size:3rem" id="cuacaIcon">☀️</div>
      <div style="font-size:1.2rem" id="cuacaTemp">32°C</div>
      <div id="cuacaDesc">Cerah</div>
    </div>
  </div>
  <div class="card">
    <h3>📊 Pengatur Warna</h3>
    <label>Merah <input type="range" min="0" max="255" value="100" oninput="updateBg()" id="red"></label>
    <label>Hijau <input type="range" min="0" max="255" value="180" oninput="updateBg()" id="green"></label>
    <label>Biru <input type="range" min="0" max="255" value="220" oninput="updateBg()" id="blue"></label>
    <div id="colorPreview" style="height:50px;border-radius:8px;margin-top:8px;border:1px solid #ddd"></div>
  </div>
</div>
<script>
  // ====== JAM DIGITAL ======
  function updateJam() {
    let now = new Date();
    document.getElementById("clock").textContent = now.toLocaleTimeString("id-ID");
  }
  setInterval(updateJam, 1000);
  updateJam();

  // ====== TODO LIST ======
  let todos = JSON.parse(localStorage.getItem("dashboardTodos") || "[]");
  function renderTodo() {
    let el = document.getElementById("todoList");
    el.innerHTML = todos.map((t, i) =>
      \`<div class="todo-item">
        <input type="checkbox" \${t.done ? "checked" : ""} onchange="toggleTodo(\${i})">
        <span class="\${t.done ? "done" : ""}">\${t.teks}</span>
        <button onclick="hapusTodo(\${i})" style="margin-left:auto;padding:2px 8px;font-size:.8rem">✕</button>
      </div>\`
    ).join("");
    document.getElementById("sisaCount").textContent = todos.filter(t => !t.done).length;
    document.getElementById("selesaiCount").textContent = todos.filter(t => t.done).length;
    localStorage.setItem("dashboardTodos", JSON.stringify(todos));
  }
  function tambahTodo() {
    let teks = document.getElementById("todoInput").value.trim();
    if (!teks) return;
    todos.push({ teks, done: false });
    document.getElementById("todoInput").value = "";
    renderTodo();
  }
  function toggleTodo(i) { todos[i].done = !todos[i].done; renderTodo(); }
  function hapusTodo(i) { todos.splice(i, 1); renderTodo(); }
  renderTodo();

  // ====== CUACA ======
  const dataCuaca = {
    Jakarta: { icon: "☀️", temp: "32°C", desc: "Cerah" },
    Bandung: { icon: "⛅", temp: "24°C", desc: "Berawan" },
    Surabaya: { icon: "🌤️", temp: "34°C", desc: "Cerah Berawan" },
  };
  function updateCuaca() {
    let kota = document.getElementById("kotaSelect").value;
    let d = dataCuaca[kota];
    document.getElementById("cuacaIcon").textContent = d.icon;
    document.getElementById("cuacaTemp").textContent = d.temp;
    document.getElementById("cuacaDesc").textContent = d.desc;
  }
  updateCuaca();

  // ====== PENGATUR WARNA ======
  function updateBg() {
    let r = document.getElementById("red").value;
    let g = document.getElementById("green").value;
    let b = document.getElementById("blue").value;
    document.getElementById("colorPreview").style.background = \`rgb(\${r},\${g},\${b})\`;
  }
  updateBg();
</script>
</body>
</html>`,
};

const EXP = {
  1: { id: '### Variabel\nGunakan `let` untuk nilai yang bisa berubah, `const` untuk nilai tetap. Hindari `var` karena masalah scope.\n\n### Tipe Data\nJavaScript memiliki 7 tipe data primitif: string, number, boolean, null, undefined, symbol, bigint. Sisanya adalah object.\n\n### Console\n`console.log()` adalah alat debugging utama. Buka DevTools (F12) untuk melihat output.\n\n### Aturan Penamaan\nGunakan camelCase untuk variabel dan fungsi. Nama harus dimulai dengan huruf, `$`, atau `_`.', en: '### Variables\nUse `let` for changeable values, `const` for fixed values. Avoid `var` due to scope issues.\n\n### Data Types\nJavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, bigint. Everything else is an object.\n\n### Console\n`console.log()` is your primary debugging tool. Open DevTools (F12) to see output.\n\n### Naming Conventions\nUse camelCase for variables and functions. Names must start with a letter, `$`, or `_`.' },
  2: { id: '### Operator Aritmatika\n`+`, `-`, `*`, `/`, `%` untuk perhitungan dasar. `%` menghasilkan sisa bagi.\n\n### Operator Perbandingan\n`===` (strict equality) cek nilai DAN tipe. `==` hanya cek nilai (dengan coercion). Selalu gunakan `===`.\n\n### Truthy & Falsy\nNilai falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Sisanya truthy.\n\n### Perulangan\n`for` — iterasi dengan counter. `while` — selama kondisi true. `for...of` — untuk array.', en: '### Arithmetic Operators\n`+`, `-`, `*`, `/`, `%` for basic calculations. `%` gives the remainder.\n\n### Comparison Operators\n`===` (strict equality) checks both value AND type. `==` only checks value (with coercion). Always use `===`.\n\n### Truthy & Falsy\nFalsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy.\n\n### Loops\n`for` — iterate with a counter. `while` — while condition is true. `for...of` — for arrays.' },
  3: { id: '### Function Declaration vs Expression\nDeclaration bisa dipanggil sebelum didefinisikan (hoisting). Expression tidak bisa.\n\n### Arrow Function\nLebih ringkas, tidak memiliki `this` sendiri. Cocok untuk callback.\n\n### Scope\nVariable dalam function hanya bisa diakses di dalam function itu. `let` dan `const` memiliki block scope.\n\n### Callback\nFungsi yang dikirim sebagai argumen ke fungsi lain. Fondasi untuk async JavaScript.', en: '### Declarations vs Expressions\nDeclarations can be called before definition (hoisting). Expressions cannot.\n\n### Arrow Functions\nMore concise, do not have their own `this`. Great for callbacks.\n\n### Scope\nVariables inside a function are only accessible within that function. `let` and `const` have block scope.\n\n### Callbacks\nFunctions passed as arguments to other functions. The foundation for async JavaScript.' },
  4: { id: '### Method Array Penting\n- `push()` / `pop()` — tambah/hapus dari akhir\n- `shift()` / `unshift()` — tambah/hapus dari awal\n- `map()` — transformasi setiap elemen\n- `filter()` — seleksi elemen\n- `reduce()` — akumulasi nilai\n- `find()` — cari elemen pertama\n\n### Spread Operator\n`...array` menyebarkan elemen array. Berguna untuk menggabungkan atau menyalin array.\n\n### Destructuring\nMengambil nilai dari array ke variabel terpisah: `[a, b] = array`', en: '### Important Array Methods\n- `push()` / `pop()` — add/remove from end\n- `shift()` / `unshift()` — add/remove from start\n- `map()` — transform each element\n- `filter()` — select elements\n- `reduce()` — accumulate values\n- `find()` — find first element\n\n### Spread Operator\n`...array` spreads array elements. Useful for merging or copying arrays.\n\n### Destructuring\nExtract array values into separate variables: `[a, b] = array`' },
  5: { id: '### Objek Literal\nCara paling umum membuat objek: `{ key: value }`. Properti bisa diakses dengan dot (`obj.key`) atau bracket (`obj["key"]`).\n\n### Computed Key\n`[variabel]` sebagai nama properti. Berguna untuk properti dinamis.\n\n### JSON\n`JSON.stringify()` mengubah objek ke string JSON. `JSON.parse()` mengembalikan ke objek.\n\n### Object Spread\n`{ ...obj, propertiBaru: nilai }` — menggabungkan dan menyalin objek secara immutable.', en: '### Object Literals\nThe most common way to create objects: `{ key: value }`. Properties can be accessed with dot (`obj.key`) or bracket (`obj["key"]`) notation.\n\n### Computed Keys\n`[variable]` as property name. Useful for dynamic properties.\n\n### JSON\n`JSON.stringify()` converts an object to a JSON string. `JSON.parse()` converts it back.\n\n### Object Spread\n`{ ...obj, newProp: value }` — merges and copies objects immutably.' },
  6: { id: '### Selektor DOM\n`document.querySelector("#id")` — selector CSS. `document.getElementById("id")` — lebih cepat.\n\n### Manipulasi\n`createElement("tag")` — buat elemen baru. `appendChild(el)` — tambahkan ke DOM. `textContent` — ubah teks. `classList.add/remove/toggle` — kelola class.\n\n### Style\nAtur style via `element.style.property = "value"`. Untuk multiple perubahan, lebih baik gunakan class.\n\n### Performance\nBatch perubahan DOM untuk performa lebih baik. Hindari manipulasi DOM berulang dalam loop.', en: '### DOM Selectors\n`document.querySelector("#id")` — CSS selector. `document.getElementById("id")` — faster.\n\n### Manipulation\n`createElement("tag")` — create new element. `appendChild(el)` — add to DOM. `textContent` — change text. `classList.add/remove/toggle` — manage classes.\n\n### Style\nSet style via `element.style.property = "value"`. For multiple changes, use classes instead.\n\n### Performance\nBatch DOM changes for better performance. Avoid repeated DOM manipulation in loops.' },
  7: { id: '### Event Listener\n`element.addEventListener("click", handler)` — cara modern mendaftarkan event. Bisa multiple listener pada satu elemen.\n\n### Event Object\nParameter pertama handler berisi informasi event: `type`, `target`, `preventDefault()`, dll.\n\n### Event Bubbling\nEvent naik dari elemen anak ke induk. Bisa dihentikan dengan `stopPropagation()`.\n\n### Event Delegation\nPasang satu listener di induk untuk menangani event dari banyak anak. Efisien untuk elemen dinamis.', en: '### Event Listener\n`element.addEventListener("click", handler)` — modern way to register events. Can have multiple listeners on one element.\n\n### Event Object\nThe first parameter contains event info: `type`, `target`, `preventDefault()`, etc.\n\n### Event Bubbling\nEvents bubble from child to parent elements. Can be stopped with `stopPropagation()`.\n\n### Event Delegation\nAttach one listener on a parent to handle events from many children. Efficient for dynamic elements.' },
  8: { id: '### Template Literal\nGunakan backtick `` untuk string multi-baris dan interpolasi `${}`.\n\n### Class\nSintaks gula untuk constructor function. Mendukung `extends` untuk inheritance.\n\n### Optional Chaining\n`obj?.prop?.sub` — aman mengakses properti bertingkat tanpa error jika null.\n\n### Nullish Coalescing\n`val ?? defaultValue` — pakai default hanya jika val `null` atau `undefined` (tidak untuk falsy lain).\n\n### Map & Set\n`Map` — objek dengan key apa pun (bukan hanya string). `Set` — koleksi nilai unik.', en: '### Template Literals\nUse backticks `` for multi-line strings and `${}` interpolation.\n\n### Classes\nSyntactic sugar for constructor functions. Supports `extends` for inheritance.\n\n### Optional Chaining\n`obj?.prop?.sub` — safely access nested properties without error on null.\n\n### Nullish Coalescing\n`val ?? defaultValue` — use default only if val is `null` or `undefined` (not other falsy values).\n\n### Map & Set\n`Map` — objects with any key type (not just strings). `Set` — collection of unique values.' },
  9: { id: '### Synchronous vs Asynchronous\nJS single-threaded. Operasi lambat (fetch, timer) tidak boleh memblokir thread utama.\n\n### Promise\nObjek yang mewakili nilai masa depan. Memiliki state: pending, fulfilled, rejected.\n\n### async/await\nGula sintaks untuk Promise. Fungsi `async` selalu mengembalikan Promise. `await` menunggu Promise selesai.\n\n### Fetch API\nFungsi bawaan browser untuk HTTP request. Mengembalikan Promise. Perlu dua `await`: response headers, lalu body.\n\n### Error Handling\nSelalu bungkus kode async dalam `try/catch` untuk menangani error dengan baik.', en: '### Synchronous vs Asynchronous\nJS is single-threaded. Slow operations (fetch, timer) should not block the main thread.\n\n### Promise\nAn object representing a future value. Has states: pending, fulfilled, rejected.\n\n### async/await\nSyntactic sugar for Promises. `async` functions always return a Promise. `await` waits for Promise resolution.\n\n### Fetch API\nBrowser built-in function for HTTP requests. Returns a Promise. Needs two `await`s: response headers, then body.\n\n### Error Handling\nAlways wrap async code in `try/catch` to handle errors gracefully.' },
  10: { id: '### localStorage & sessionStorage\nKeduanya menyimpan data di browser. localStorage — persisten. sessionStorage — hilang saat tab ditutup. Hanya bisa string (gunakan JSON.stringify).\n\n### Geolocation API\nMendapatkan posisi user (dengan izin). `getCurrentPosition()` untuk satu kali, `watchPosition()` untuk real-time.\n\n### setTimeout & setInterval\n`setTimeout(fn, ms)` — jalankan sekali setelah delay. `setInterval(fn, ms)` — jalankan berulang. Simpan return value untuk clear.\n\n### Canvas\nElemen HTML untuk menggambar grafis menggunakan JavaScript. Gunakan `getContext("2d")` untuk rendering.', en: '### localStorage & sessionStorage\nBoth store data in the browser. localStorage — persists. sessionStorage — cleared when tab closes. Can only store strings (use JSON.stringify).\n\n### Geolocation API\nGet user position (with permission). `getCurrentPosition()` for one-time, `watchPosition()` for real-time.\n\n### setTimeout & setInterval\n`setTimeout(fn, ms)` — execute once after delay. `setInterval(fn, ms)` — execute repeatedly. Store the return value to clear.\n\n### Canvas\nHTML element for drawing graphics with JavaScript. Use `getContext("2d")` for rendering.' },
  11: { id: '### Closure\nFungsi yang "mengingat" scope di mana ia dibuat. Berguna untuk data privat, factory functions, dan state persistence.\n\n### this Binding\n`this` tergantung cara fungsi dipanggil: method → objek, fungsi biasa → global/window, arrow → lexical scope. `call`, `apply`, `bind` untuk mengontrol this secara eksplisit.\n\n### Prototype\nMekanisme inheritance JavaScript. Setiap objek memiliki prototype. Method di prototype dibagi antar semua instance (hemat memori).\n\n### Debounce & Throttle\nDebounce — tunggu jeda sebelum eksekusi. Throttle — eksekusi maksimal sekali per interval. Penting untuk performa (input, scroll, resize).', en: '### Closure\nA function that "remembers" the scope where it was created. Useful for private data, factory functions, and state persistence.\n\n### this Binding\n`this` depends on how a function is called: method → object, regular function → global/window, arrow → lexical scope. `call`, `apply`, `bind` to explicitly control this.\n\n### Prototype\nJavaScript\'s inheritance mechanism. Every object has a prototype. Methods on the prototype are shared among all instances (memory efficient).\n\n### Debounce & Throttle\nDebounce — wait for a pause before executing. Throttle — execute at most once per interval. Important for performance (input, scroll, resize).' },
  12: { id: '### Arsitektur Aplikasi\nPisahkan kode menjadi modul-modul: data (state), UI (render), dan logic (handler). Gunakan closure atau class untuk encapsulasi.\n\n### State Management\nSimpan state aplikasi di satu tempat (bukan tersebar di DOM). Gunakan object terpusat. Simpan state persisten di localStorage.\n\n### Reactivity\nGunakan fungsi render() yang membaca state terbaru dan memperbarui UI. Panggil render() setiap kali state berubah.\n\n### Deployment\nProject vanilla JS bisa di-deploy ke GitHub Pages, Netlify, Vercel, atau Cloudflare Pages tanpa build step.', en: '### Application Architecture\nSeparate code into modules: data (state), UI (render), and logic (handlers). Use closures or classes for encapsulation.\n\n### State Management\nStore application state in one place (not scattered across the DOM). Use a centralized object. Store persistent state in localStorage.\n\n### Reactivity\nUse a render() function that reads the latest state and updates the UI. Call render() every time state changes.\n\n### Deployment\nVanilla JS projects can be deployed to GitHub Pages, Netlify, Vercel, or Cloudflare Pages without a build step.' },
};

const EXP_E = {
  1: { id: ['Ganti nilai variabel `nama` dengan nama Anda', 'Tambahkan variabel baru: `hobi` bertipe string', 'Coba `console.table()` untuk menampilkan data', 'Ubah `const` jadi `let` — apa yang terjadi?'], en: ['Change the `nama` variable to your name', 'Add a new variable: `hobi` as a string', 'Try `console.table()` to display data', 'Change `const` to `let` — what happens?'] },
  2: { id: ['Ubah nilai grade: apakah if/else sudah benar?', 'Ganti `===` dengan `==` — lihat perbedaannya', 'Buat loop yang hanya mencetak angka genap', 'Tambahkan operator logika: cek nilai antara 80-100'], en: ['Change grade values: is the if/else correct?', 'Replace `===` with `==` — see the difference', 'Create a loop that only prints even numbers', 'Add logical operators: check values between 80-100'] },
  3: { id: ['Buat fungsi `rataRata(arr)` yang menghitung rata-rata array', 'Ubah arrow function jadi function declaration', 'Tambahkan default parameter pada fungsi tambahNilai', 'Buat fungsi kalkulator yang menerima operator sebagai parameter'], en: ['Create a `average(arr)` function that calculates array average', 'Convert arrow function to function declaration', 'Add default parameters to tambahNilai function', 'Create a calculator function that takes an operator parameter'] },
  4: { id: ['Tambahkan item dengan spread: buat array baru dari array lama', 'Gunakan `some()` untuk cek apakah ada item dengan qty > 5', 'Implementasi undo dengan menyimpan snapshot array', 'Buat tombol random shuffle item'], en: ['Add items with spread: create a new array from old array', 'Use `some()` to check if any item has qty > 5', 'Implement undo by saving array snapshots', 'Create a random shuffle button'] },
  5: { id: ['Tambahkan properti `alamat` sebagai objek bersarang', 'Gunakan computed keys: buat properti dengan nama dari input', 'Coba Object.keys(), Object.values(), Object.entries()', 'Clone objek dengan spread lalu ubah salah satu properti'], en: ['Add an `address` property as a nested object', 'Use computed keys: create a property with a name from input', 'Try Object.keys(), Object.values(), Object.entries()', 'Clone an object with spread then modify one property'] },
  6: { id: ['Ganti `querySelector` dengan `getElementById` dan bandingkan', 'Implementasi tombol yang mengganti gambar (src)', 'Buat fungsi yang menghapus semua elemen di targetArea', 'Animasi sederhana: ubah opacity bertahap dengan setInterval'], en: ['Replace `querySelector` with `getElementById` and compare', 'Implement a button that changes an image (src)', 'Create a function that removes all elements in targetArea', 'Simple animation: change opacity gradually with setInterval'] },
  7: { id: ['Tambahkan validasi: email harus mengandung @', 'Implementasi counter klik pada tombol submit', 'Gunakan event delegation untuk menangani klik pada semua tombol', 'Buat form registrasi dengan 5 field berbeda'], en: ['Add validation: email must contain @', 'Implement a click counter on the submit button', 'Use event delegation to handle clicks on all buttons', 'Create a registration form with 5 different fields'] },
  8: { id: ['Buat class `Mobil` dengan properti merek, tahun, dan method info()', 'Gunakan template literal untuk membuat HTML dinamis', 'Implementasi private class field (#) untuk data sensitif', 'Buat chain method pada class (method mengembalikan this)'], en: ['Create a `Car` class with brand, year properties and info() method', 'Use template literals to create dynamic HTML', 'Implement private class fields (#) for sensitive data', 'Create method chaining on a class (methods return this)'] },
  9: { id: ['Ganti Promise `.then()` dengan async/await', 'Tambahkan loading state sebelum fetch', 'Coba Promise.allSettled() dan bedakan dengan Promise.all()', 'Buat countdown timer menggunakan Promise dan setTimeout'], en: ['Replace Promise `.then()` with async/await', 'Add a loading state before fetching', 'Try Promise.allSettled() and compare with Promise.all()', 'Create a countdown timer using Promise and setTimeout'] },
  10: { id: ['Simpan preferensi tema (terang/gelap) di localStorage', 'Buat kompas sederhana dengan DeviceOrientation API', 'Implementasi stopwatch dengan precision 10ms', 'Gambar diagram batang di canvas dari data array'], en: ['Save theme preference (light/dark) in localStorage', 'Create a simple compass with DeviceOrientation API', 'Implement a stopwatch with 10ms precision', 'Draw a bar chart on canvas from array data'] },
  11: { id: ['Buat closure counter dengan fungsi increment, decrement, reset', 'Implementasi memoize function untuk caching', 'Gunakan prototype untuk menambah method ke built-in Array', 'Buat fungsi throttle (beda dengan debounce)'], en: ['Create a closure counter with increment, decrement, reset functions', 'Implement a memoize function for caching', 'Use prototype to add a method to built-in Array', 'Create a throttle function (different from debounce)'] },
  12: { id: ['Tambah fitur edit todo (klik dua kali untuk edit)', 'Implementasi filter: Semua / Aktif / Selesai', 'Tambahkan grafik batang di dashboard (canvas)', 'Simpan seluruh state dashboard ke localStorage dan restore saat load'], en: ['Add todo edit feature (double-click to edit)', 'Implement filter: All / Active / Completed', 'Add a bar chart to the dashboard (canvas)', 'Save entire dashboard state to localStorage and restore on load'] },
};

const CHALL = {
  1: { id: 'Buat halaman profil pribadi yang menampilkan nama, umur, hobi, dan pendidikan menggunakan variabel JavaScript. Tampilkan data tersebut di halaman HTML dan juga di console browser. Gunakan minimal 3 tipe data berbeda.', en: 'Create a personal profile page that displays name, age, hobbies, and education using JavaScript variables. Display the data on the HTML page and in the browser console. Use at least 3 different data types.' },
  2: { id: 'Buat program "Tebak Angka": komputer memilih angka acak 1-100, user menebak. Beri petunjuk "lebih besar" atau "lebih kecil". Hitung jumlah percobaan. Gunakan loop dan conditional.', en: 'Create a "Number Guessing" game: the computer picks a random number 1-100, user guesses. Give hints "higher" or "lower". Count the number of attempts. Use loops and conditionals.' },
  3: { id: 'Buat kalkulator ilmiah dengan fungsi: tambah, kurang, kali, bagi, pangkat, akar kuadrat, dan faktorial. Gunakan function declaration, arrow function, dan callback. Tampilkan hasil di halaman.', en: 'Create a scientific calculator with functions: add, subtract, multiply, divide, power, square root, and factorial. Use function declarations, arrow functions, and callbacks. Display results on the page.' },
  4: { id: 'Buat aplikasi "Playlist Musik": array of objects dengan judul, artis, durasi. Fitur: tambah lagu, hapus, cari, urutkan berdasarkan artis, hitung total durasi dengan reduce. Tampilkan sebagai daftar di HTML.', en: 'Create a "Music Playlist" app: array of objects with title, artist, duration. Features: add song, delete, search, sort by artist, calculate total duration with reduce. Display as a list in HTML.' },
  5: { id: 'Buat aplikasi "Manajemen Buku": array of book objects (judul, penulis, tahun, genre). Fitur: tambah, cari berdasarkan judul/penulis, filter berdasarkan genre, statistik (total buku, buku per genre). Gunakan spread operator untuk edit buku.', en: 'Create a "Book Management" app: array of book objects (title, author, year, genre). Features: add, search by title/author, filter by genre, statistics (total books, books per genre). Use spread operator for editing books.' },
  6: { id: 'Buat halaman "Gallery Builder": user bisa menambahkan gambar (via URL), memberi caption, mengatur ukuran, dan menghapus. Semua elemen dibuat dan dimanipulasi melalui DOM. Gunakan classList untuk efek hover.', en: 'Create a "Gallery Builder" page: users can add images (via URL), add captions, set sizes, and delete. All elements are created and manipulated through the DOM. Use classList for hover effects.' },
  7: { id: 'Buat form "Pendaftaran Event" dengan validasi lengkap: nama (min 3 char), email (valid format), nomor telepon (angka, 10-13 digit), tanggal lahir (date picker). Tampilkan ringkasan data sebelum submit. Gunakan event delegation untuk tooltip.', en: 'Create an "Event Registration" form with full validation: name (min 3 chars), email (valid format), phone (digits, 10-13 digits), date of birth (date picker). Show data summary before submit. Use event delegation for tooltips.' },
  8: { id: 'Buat class `RekeningBank` dengan properti: namaPemilik, nomorRekening, saldo. Method: setor(tambah), tarik(kurang), cekSaldo(). Buat class `RekeningTabungan` yang extends dengan method hitungBunga(). Implementasikan private field untuk saldo.', en: 'Create a `BankAccount` class with properties: ownerName, accountNumber, balance. Methods: deposit(add), withdraw(subtract), checkBalance(). Create a `SavingsAccount` class that extends with a calculateInterest() method. Implement private fields for balance.' },
  9: { id: 'Buat aplikasi "Berita Terkini" yang mengambil data dari News API (atau mock data). Tampilkan daftar berita dengan gambar, judul, dan deskripsi. Fitur: loading state, error handling, refresh, dan infinite scroll (ambil data tambahan saat scroll ke bawah).', en: 'Create a "Latest News" app that fetches data from a News API (or mock data). Display a news list with images, titles, and descriptions. Features: loading state, error handling, refresh, and infinite scroll (load more data on scroll).' },
  10: { id: 'Buat aplikasi "Daily Tracker" yang menggunakan localStorage untuk menyimpan: target harian (teks), progres (checkbox), catatan harian (textarea dengan auto-save), dan statistik (streak, total selesai). Gunakan setInterval untuk pengingat setiap jam.', en: 'Create a "Daily Tracker" app using localStorage to store: daily goals (text), progress (checkboxes), daily notes (textarea with auto-save), and statistics (streak, total completed). Use setInterval for hourly reminders.' },
  11: { id: 'Buat library utilitas menggunakan Module Pattern (IIFE) dengan fungsi: deepClone(obj), isEmpty(obj), formatDate(date), generateId(), dan pipe(...fns). Gunakan closure untuk internal state. Implementasikan debounce untuk search input.', en: 'Create a utility library using the Module Pattern (IIFE) with functions: deepClone(obj), isEmpty(obj), formatDate(date), generateId(), and pipe(...fns). Use closures for internal state. Implement debounce for search input.' },
  12: { id: 'Bangun aplikasi "Personal Finance Dashboard" yang menggabungkan SEMUA konsep: objek untuk transaksi, array methods untuk filter/sort, DOM untuk UI, event untuk interaksi, localStorage untuk persistensi, async untuk export/import data, closure untuk state privat, dan canvas untuk grafik pengeluaran per kategori.', en: 'Build a "Personal Finance Dashboard" that combines ALL concepts: objects for transactions, array methods for filter/sort, DOM for UI, events for interaction, localStorage for persistence, async for data export/import, closures for private state, and canvas for expense-by-category charts.' },
};

const SUM = {
  1: { id: 'JavaScript adalah bahasa yang dinamis dan fleksibel. Anda telah mempelajari variabel, tipe data, dan sintaks dasar. Modul selanjutnya: **Operator & Control Flow** — cara membuat keputusan dan perulangan dalam kode.', en: 'JavaScript is a dynamic and flexible language. You have learned variables, data types, and basic syntax. Next module: **Operators & Control Flow** — how to make decisions and loop in code.' },
  2: { id: 'Operator dan control flow adalah fondasi logika pemrograman. Dengan if/else, switch, dan loop, Anda bisa mengontrol alur eksekusi kode. Modul selanjutnya: **Fungsi** — blok bangunan kode yang dapat digunakan kembali.', en: 'Operators and control flow are the foundation of programming logic. With if/else, switch, and loops, you can control code execution flow. Next module: **Functions** — reusable code building blocks.' },
  3: { id: 'Fungsi adalah warga kelas satu di JavaScript. Anda telah belajar deklarasi, arrow function, scope, dan callback. Modul selanjutnya: **Array & Metode** — struktur data untuk koleksi informasi.', en: 'Functions are first-class citizens in JavaScript. You have learned declarations, arrow functions, scope, and callbacks. Next module: **Arrays & Methods** — data structures for collections of information.' },
  4: { id: 'Array adalah struktur data paling penting di JavaScript. Method seperti map, filter, dan reduce memungkinkan transformasi data yang ekspresif. Modul selanjutnya: **Objek & Data** — cara menyimpan dan mengelola data terstruktur.', en: 'Arrays are the most important data structure in JavaScript. Methods like map, filter, and reduce enable expressive data transformations. Next module: **Objects & Data** — storing and managing structured data.' },
  5: { id: 'Objek adalah fondasi hampir semua struktur data di JavaScript. Dengan destructuring, spread, dan JSON, Anda bisa mengelola data kompleks dengan mudah. Modul selanjutnya: **DOM Manipulation** — cara JavaScript berinteraksi dengan halaman web.', en: 'Objects are the foundation of almost all data structures in JavaScript. With destructuring, spread, and JSON, you can manage complex data easily. Next module: **DOM Manipulation** — how JavaScript interacts with web pages.' },
  6: { id: 'DOM manipulation memungkinkan JavaScript mengubah halaman web secara dinamis. Anda telah belajar membuat, memodifikasi, dan menghapus elemen. Modul selanjutnya: **Event & Form** — cara merespon interaksi pengguna.', en: 'DOM manipulation enables JavaScript to dynamically change web pages. You have learned to create, modify, and delete elements. Next module: **Events & Forms** — how to respond to user interactions.' },
  7: { id: 'Event membuat halaman web menjadi interaktif. Dengan event listener, form validation, dan delegation, Anda bisa menangani interaksi pengguna dengan efisien. Modul selanjutnya: **JavaScript Modern** — fitur-fitur ES6+ yang membuat kode lebih bersih.', en: 'Events make web pages interactive. With event listeners, form validation, and delegation, you can handle user interactions efficiently. Next module: **Modern JavaScript** — ES6+ features that make code cleaner.' },
  8: { id: 'ES6+ membawa banyak fitur baru yang membuat JavaScript lebih ekspresif dan mudah dipelihara: template literal, class, modules, optional chaining. Modul selanjutnya: **Async JavaScript** — menangani operasi asynchronous seperti request jaringan.', en: 'ES6+ brings many new features that make JavaScript more expressive and maintainable: template literals, classes, modules, optional chaining. Next module: **Asynchronous JavaScript** — handling async operations like network requests.' },
  9: { id: 'Async JavaScript adalah konsep kunci untuk aplikasi web modern. Promise, async/await, dan Fetch API memungkinkan Anda bekerja dengan data dari server tanpa memblokir UI. Modul selanjutnya: **Browser API** — memanfaatkan fitur bawaan browser.', en: 'Asynchronous JavaScript is a key concept for modern web applications. Promises, async/await, and the Fetch API let you work with server data without blocking the UI. Next module: **Browser APIs** — leveraging built-in browser features.' },
  10: { id: 'Browser API memberikan akses ke fitur-fitur perangkat: penyimpanan lokal, geolokasi, timer, dan canvas. Dengan API ini, aplikasi web bisa mendekati kemampuan aplikasi native. Modul selanjutnya: **Konsep Lanjutan** — closure, this, prototype, dan pattern penting.', en: 'Browser APIs provide access to device features: local storage, geolocation, timers, and canvas. With these APIs, web apps can approach native app capabilities. Next module: **Advanced Concepts** — closures, this, prototypes, and important patterns.' },
  11: { id: 'Konsep lanjutan seperti closure, this binding, prototype, dan pattern debounce/throttle adalah yang membedakan developer junior dari senior. Pahami ini untuk menulis kode yang lebih profesional. Modul selanjutnya: **Proyek Akhir** — gabungkan semua konsep dalam satu aplikasi.', en: 'Advanced concepts like closures, this binding, prototypes, and debounce/throttle patterns distinguish junior from senior developers. Understand these to write more professional code. Next module: **Final Project** — combine all concepts in one application.' },
  12: { id: 'Selamat! Anda telah menyelesaikan seluruh kurikulum JavaScript. Dari variabel dasar hingga pattern lanjutan, dari DOM hingga async — Anda sekarang memiliki fondasi yang kuat. Langkah selanjutnya: pelajari TypeScript, React, atau Node.js untuk memperluas skill Anda.', en: 'Congratulations! You have completed the entire JavaScript curriculum. From basic variables to advanced patterns, from DOM to async — you now have a strong foundation. Next steps: learn TypeScript, React, or Node.js to expand your skills.' },
};

function generateFile(mod, lang) {
  const isId = lang === 'id';
  const h = isId ? mod.lid : mod.len;
  const progName = isId ? mod.cid : mod.cen;
  const code = CODE[mod.id];
  const obj = OBJ[mod.id];
  const objList = isId ? obj.id : obj.en;
  const exp = EXP[mod.id];
  const explanation = isId ? exp.id : exp.en;
  const expE = EXP_E[mod.id];
  const experiments = isId ? expE.id : expE.en;
  const challenge = isId ? CHALL[mod.id].id : CHALL[mod.id].en;
  const summary = isId ? SUM[mod.id].id : SUM[mod.id].en;

  const moduleLabel = isId ? `Modul ${mod.id}` : `Module ${mod.id}`;

  const objBullets = objList.map(o => `- ${o}`).join('\n');
  const expBullets = experiments.map(e => `1. **${e.split(' — ')[0] || e}**${e.includes(' — ') ? ' — ' + e.split(' — ').slice(1).join(' — ') : ''}`).join('\n');
 
  return `# ${h}

> JavaScript | ${moduleLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objBullets}

---

## ${isId ? `Program: ${progName}` : `Program: ${progName}`}

\`\`\`html
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${explanation}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${expBullets}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${challenge}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${summary}
`;
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, 'id');
  const enContent = generateFile(mod, 'en');
  fs.writeFileSync(path.join(BASE, 'id', `week${mod.id}-${mod.f}.md`), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', `week${mod.id}-${mod.f}.md`), enContent, 'utf8');
  console.log(`  ${mod.id}. ${mod.lid} / ${mod.len}`);
}

console.log(`\\n✓ Generated ${MODULES.length * 2} JavaScript curriculum files (${MODULES.length} modules × 2 languages)`);
console.log(`  Output: ${BASE}`);
