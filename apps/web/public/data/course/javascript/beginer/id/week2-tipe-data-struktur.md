# Tipe Data & Struktur — Daftar Belanja dan Kartu Pelanggan

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 2:** Tipe Data & Struktur Data

## Tujuan Pembelajaran

- Membuat **daftar** dengan `array`: `["apel","mangga"]`, tambah/hapus `push`/`pop`, `length`
- Mengubah daftar dengan `map` (ubah tiap item), `filter` (pilih), `reduce` (jumlahkan)
- Membuat **kartu** dengan `object`: `{ nama: "Budi", umur: 25 }`, akses `obj.nama` / `obj["nama"]`
- Bongkar isi dengan **destructuring**: `const { nama } = pelanggan`
- Gabung daftar/kartu dengan **spread**: `[...buah, "durian"]`

---

## Kenapa Ini Penting Buat Kamu?

Warung tidak hanya 1 beras. Ada **daftar 30 produk** dan **kartu pelanggan 100 orang**. Tanpa array/object, kamu tulis 30 variabel manual `produk1, produk2...` — capek. Dengan struktur, **1 daftar untuk semua**, bisa saring "hanya yang stok habis" atau jumlahkan total.

---

## Program: Daftar Produk & Kartu Pelanggan

```javascript
// ── 1. Array — daftar belanja (urutan penting) ──
const buah = ["apel", "mangga", "pisang"];
console.log("Awal:", buah, "panjang:", buah.length);
console.log("Paling depan:", buah[0], "paling belakang:", buah[buah.length - 1]);

buah.push("jeruk");   // tambah belakang
console.log("Setelah push jeruk:", buah);
buah.pop();           // hapus belakang
console.log("Setelah pop:", buah);
buah.unshift("anggur"); // tambah depan
console.log("Setelah unshift anggur:", buah);

// ── 2. Ubah daftar — seperti sortir barang di rak ──
const harga = [10000, 15000, 20000, 25000];
const naik10Persen = harga.map(h => h * 1.1);
const murah = harga.filter(h => h < 20000);
const total = harga.reduce((jumlah, h) => jumlah + h, 0);
console.log("\nHarga awal:", harga);
console.log("Naik 10%:", naik10Persen);
console.log("Murah (<20k):", murah);
console.log("Total:", total);

// ── 3. Object — kartu pelanggan (label penting, bukan urutan) ──
const pelanggan = {
  nama: "Budi",
  umur: 25,
  member: true,
  alamat: "Jl. Melati 12"
};
console.log("\nNama:", pelanggan.nama, "| Umur:", pelanggan["umur"]);
pelanggan.hp = "08123456789"; // tambah field baru
delete pelanggan.member;      // hapus field
console.log("Setelah update:", pelanggan);

// ── 4. Destructuring — bongkar kartu langsung jadi variabel ──
const { nama, alamat } = pelanggan;
console.log("\nDestructuring:", nama, "-", alamat);

// ── 5. Spread — fotokopi + tambah ──
const buahLengkap = [...buah, "durian", "manggis"];
console.log("\nSpread buah:", buahLengkap);
const pelangganBaru = { ...pelanggan, poin: 120 };
console.log("Spread pelanggan + poin:", pelangganBaru);
```

---

## Konsep Kunci

### Array = Daftar (Urutan)
`const buah = ["apel","mangga"]` → `buah[0]` apel. `push`/`pop` belakang, `unshift`/`shift` depan, `length` jumlah.

### `map` / `filter` / `reduce` = Mesin Rak
- `map` = **ubah tiap item** (naikkan harga 10%)
- `filter` = **pilih yang lolos** (hanya murah)
- `reduce` = **kumpulkan jadi 1** (total belanja)
- `find` = cari pertama yang cocok.

### Object = Kartu (Label)
`{ nama: "Budi", umur: 25 }` → `pelanggan.nama` atau `pelanggan["nama"]`. Tambah `pelanggan.hp = ...`, hapus `delete pelanggan.member`.

### Destructuring & Spread
- Bongkar: `const { nama, umur } = pelanggan`
- Gabung: `[...lama, "baru"]`, `{...lama, baru: 123}`

---

## Penjelasan untuk Pemula

### Analogi

- **Array = rak buah berbaris**: urutan 0,1,2 penting. `push` taruh di ujung rak, `pop` ambil ujung.
- **Object = kartu anggota**: tidak peduli urutan, yang penting label `nama`, `umur`.
- **`map` = stempel harga**: tiap buah di-stempel harga baru.
- **`filter` = saringan**: hanya buah murah lolos.
- **`spread` = fotokopi rak**: `[...buah, "durian"]` = fotokopi rak lama + tambah durian di fotokopi (rak asli tidak rusak).

### Cara Komputer Membaca

1. `buah.push("jeruk")` → tambah "jeruk" di belakang array → panjang 4
2. `harga.map(h => h*1.1)` → loop 4x, tiap `h` kali 1.1 → array baru `[11000,16500,...]`
3. `const { nama } = pelanggan` → cari key `nama` di object → buat variabel `nama = "Budi"`

### 3 Istilah Wajib

1. **Array**: daftar urut `[a,b,c]`
2. **Object**: kartu label `{nama: "Budi"}`
3. **map/filter**: alat ubah/saring daftar

---

## Eksperimen

- **Hijau:** Buat `const sayur = ["bayam","kangkung"]`, `push` "sawi", `length` berapa?
- **Kuning:** Dari `harga`, buat `mahal = harga.filter(h => h >= 20000)` dan `totalDiskon = harga.map(h=>h*0.9).reduce((a,b)=>a+b,0)`
- **Merah:** Coba `const a = [...buah]; a.push("x"); console.log(buah)` → `buah` asli tetap? Ya, spread fotokopi.

---

## Tantangan

**Buku Kontak Warung:** Buat `kontak = [{nama:"Budi", hp:"081", kategori:"pelanggan"}, ... 5 orang]`. Lalu:
1. `filter` hanya `pelanggan`
2. `map` jadi `["Budi - 081", ...]`
3. `reduce` hitung jumlah kontak
4. Tambah 1 kontak baru pakai `[...kontak, baru]`, jangan `push` langsung di tantangan (latih spread)

Bonus: `destructuring` 1 kontak jadi `const {nama, kategori} = kontak[0]`

---

## Glosarium Mini

- **Array**: daftar urut
- **Object**: pasangan label-nilai
- **map/filter/reduce**: mesin olah daftar
- **Destructuring**: bongkar object/array jadi variabel
- **Spread `...`**: fotokopi + tambah

---

## Ringkasan

Minggu 2 dari 14: **Tipe Data & Struktur Data** (Level: Pemula). Kamu bisa susun daftar (array) dan kartu (object), serta olah dengan map/filter. Minggu depan: **Control Flow** — putuskan "jika stok habis, jangan jual" (`if`, `switch`, `loop`).
