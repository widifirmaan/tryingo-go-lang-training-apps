# DOM Manipulation — Remote untuk Halaman HTML

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 5:** DOM Manipulation

## Tujuan Pembelajaran

- Memahami **DOM**: HTML dibaca browser jadi pohon (seperti silsilah keluarga)
- Ambil elemen: `document.getElementById`, `querySelector` (seperti cari barang di rak pakai label)
- Ubah isi: `textContent`, `innerHTML`, `classList.add/remove`
- Buat & tempel elemen baru: `createElement` + `appendChild`
- Pasang telinga: `addEventListener("click", ...)` agar tombol hidup

---

## Kenapa Ini Penting Buat Kamu?

Selama ini JS hanya di `console.log`. Warung butuh **tombol Tambah Keranjang yang beneran menambah angka di layar**, bukan di console hitam. DOM = **jembatan JS ↔ HTML**. Tanpa ini, JS dan HTML putus.

---

## Program: Warung Interaktif (Bisa di Browser)

Buka file `index.html` sederhana, lalu hubungkan `script.js`.

```html
<!-- index.html — simpan di folder yang sama dengan script.js -->
<input id="input-produk" placeholder="Nama produk" />
<button id="btn-tambah">Tambah</button>
<ul id="daftar"></ul>
<p id="total">Total: 0</p>
```
```javascript
// script.js — hubungkan: <script src="script.js"></script> sebelum </body>
// Ambil elemen (seperti ambil remote tiap alat)
const input = document.getElementById("input-produk");
const btn = document.getElementById("btn-tambah");
const daftar = document.getElementById("daftar");
const totalEl = document.getElementById("total");

let data = [
  { nama: "Beras", harga: 62000 },
  { nama: "Bayam", harga: 5000 },
];

function render() {
  // Kosongkan dulu
  daftar.innerHTML = "";
  let total = 0;

  for (const item of data) {
    const li = document.createElement("li"); // buat <li> baru
    li.textContent = `${item.nama} — Rp ${item.harga.toLocaleString("id-ID")}`;
    li.style.display = "flex";
    li.style.justifyContent = "space-between";

    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";
    hapus.addEventListener("click", () => {
      data = data.filter(d => d !== item);
      render(); // gambar ulang
    });

    li.appendChild(hapus);
    daftar.appendChild(li); // tempel ke <ul>
    total += item.harga;
  }

  totalEl.textContent = `Total: Rp ${total.toLocaleString("id-ID")} | Jumlah: ${data.length}`;
  totalEl.classList.toggle("mahal", total > 50000); // tambah class jika mahal
}

// Pasang telinga klik
btn.addEventListener("click", () => {
  const nama = input.value.trim();
  if (!nama) return;
  data.push({ nama, harga: 10000 }); // harga default 10k untuk demo
  input.value = "";
  render();
});

// Gambar pertama kali
render();
console.log("DOM siap — coba klik Tambah di browser");
```

**Cara coba di Tryngo:** Playground tidak punya DOM nyata, jadi eksperimen di laptop lebih asyik. Atau salin logika `data` + `render` tanpa DOM untuk latihan array.

**Versi tanpa browser (untuk playground):**
```javascript
// Logika sama, tanpa DOM — untuk paham data flow
let data2 = ["Beras", "Bayam"];
function tambah(nama) { data2.push(nama); }
function hapus(nama) { data2 = data2.filter(d => d !== nama); }
tambah("Telur"); hapus("Bayam");
console.log(data2); // ["Beras","Telur"]
```

---

## Konsep Kunci

### DOM = Pohon Silsilah HTML
Browser baca `<ul><li>Beras</li></ul>` jadi object `document` → `ul` punya `children` `[li]`. JS bisa sentuh tiap cabang.

### Ambil Elemen
- `getElementById("daftar")` — tercepat, by id
- `querySelector(".produk")` / `querySelectorAll("li")` — pakai CSS selector, fleksibel

### Ubah Isi
- `el.textContent = "Teks aman"` (tidak eksekusi HTML)
- `el.innerHTML = "<b>Tebal</b>"` (eksekusi HTML, hati-hati)
- `el.classList.add("aktif")` / `remove` / `toggle`

### Buat & Tempel
`const li = document.createElement("li"); li.textContent = "Baru"; daftar.appendChild(li);`

### Event = Telinga
`btn.addEventListener("click", () => { ... })` → saat klik, jalankan fungsi.

---

## Penjelasan untuk Pemula

### Analogi: Remote TV

- **HTML = TV**: tampil gambar
- **DOM = remote + daftar channel**: tiap tombol remote terhubung ke 1 channel
- **`getElementById` = ambil remote berlabel**: `getElementById("daftar")` = ambil remote untuk `<ul>`
- **`createElement` = beli TV baru**, `appendChild` = colok ke stop kontak
- **`addEventListener` = pasang telinga**: "Jika tombol Tambah dipencet, lakukan ini"

### Cara Komputer Membaca

1. `const daftar = document.getElementById("daftar")` → cari `<ul id="daftar">` → simpan objectnya
2. `daftar.appendChild(li)` → masukkan `<li>` baru sebagai anak terakhir `<ul>`
3. `btn.addEventListener("click", fn)` → daftar "nanti kalau klik, panggil fn". Tidak langsung jalan.

### 3 Istilah Wajib

1. **DOM**: versi object dari HTML
2. **querySelector**: cari elemen pakai selektor CSS
3. **Event Listener**: penjaga yang tunggu kejadian (klik, ketik)

### Kesalahan Umum

- Taruh `<script>` di `<head>` tanpa `defer` → DOM belum ada, `getElementById` return `null`. Taruh sebelum `</body>` atau pakai `defer`.
- `innerHTML +=` dalam loop → lambat & hapus event. Pakai `createElement + appendChild`.
- Lupa `render()` setelah `push` → data berubah tapi layar tidak.

---

## Eksperimen

- **Hijau:** Ubah `50000` di `classList.toggle("mahal", total > 50000)` jadi `30000` → kapan warna berubah?
- **Kuning:** Tambah `inputHarga` kedua, saat `Tambah` pakai harga beneran `parseInt(inputHarga.value)`.
- **Merah:** Ganti `textContent` jadi `innerHTML` dan coba `nama = "<b>Bold</b>"` → lihat bedanya (innerHTML jadi tebal, textContent tampil mentah).

---

## Tantangan

**To-Do Warung Interaktif:** HTML punya `input`, `button Tambah`, `ul`, `p total`, `select filter (Semua/Selesai/Belum)`. JS: array `todos = [{id, teks, selesai}]`, fungsi `render()` saring sesuai filter, tiap `<li>` ada checkbox `toggle` dan tombol `Hapus`. Semua via DOM API, tanpa framework.

Kriteria: `getElementById`/`querySelector` + `createElement` + `appendChild` + `addEventListener` dipakai, dan `render()` dipanggil tiap ubah data.

---

## Glosarium Mini

- **DOM**: Document Object Model — pohon HTML
- **getElementById/querySelector**: ambil elemen
- **createElement/appendChild**: buat & tempel
- **textContent/innerHTML/classList**: ubah isi & gaya
- **addEventListener**: pasang aksi klik

---

## Ringkasan

Minggu 5 dari 14: **DOM Manipulation** (Level: Pemula). Kamu sudah sambung JS ke HTML — tombol bukan pajangan. **Selesai Beginner JS!** Minggu depan: **Events & Handling** — tangani form, keyboard, dan delegasi event.
