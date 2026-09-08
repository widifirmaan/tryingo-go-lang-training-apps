# Collections — Rak Dinamis dan Buku Alamat Rust

> **Kategori:** Rust | **Level:** Pemula | **Minggu 5:** Collections

## Tujuan Pembelajaran

- `Vec` rak dinamis `vec![]` + `push`, `HashMap` buku alamat `insert`/`get` (sumber: doc.rust-lang.org/book/ch08)
- `harga["beras"]` vs `harga.get("kopi")` (`Option`, aman vs panic)

---

## Kenapa Ini Penting Buat Kamu?

Daftar 30 produk tidak muat di variabel manual. `Vec` = rak geser, `HashMap` = buku harga. `get()` kembalikan `Option` (ada/tidak) — paksa tangani "tidak ada", tidak diam-diam `null`.

---

## Program: Rak & Buku Warung

```rust
use std::collections::HashMap;

fn main() {
  // Vec rak dinamis (mut agar bisa push)
  let mut stok = vec!["beras", "minyak"];
  stok.push("gula");
  println!("{:?} panjang {}", stok, stok.len());
  println!("Pertama: {}", stok[0]);

  // HashMap buku alamat
  let mut harga = HashMap::new();
  harga.insert("beras", 62000);
  harga.insert("gula", 15000);
  println!("Harga beras: Rp{}", harga["beras"]);

  // Aman: get() → Option
  match harga.get("kopi") {
    Some(h) => println!("Kopi Rp{}", h),
    None => println!("Kopi belum ada"),
  }

  // Loop rak & buku
  for (i, b) in stok.iter().enumerate() {
    println!("{}. {}", i + 1, b);
  }
  for (nama, h) in &harga {
    println!("{}: Rp{}", nama, h);
  }

  // Slice — pinjam sebagian (ala Rust Book 4.3)!
  let semua = vec![10, 20, 30, 40];
  let tengah: &[i32] = &semua[1..3]; // pinjam index 1-2 → [20, 30]
  println!("Tengah: {:?}", tengah);

  // String dalam — tambah, gabung, hati-hati potong!
  let mut sapa = String::from("Halo");
  sapa.push_str(", Budi"); // tambah di belakang
  sapa.push('!');          // 1 huruf
  let gabung = sapa + " Sip!"; // + PINDAH milik sapa!
  println!("{}", gabung);
  // &sapa[0..4] → "Halo" aman; potong tengah huruf aneh (misal é 2-byte) = PANIC!

  // Iterator + closure — ban berjalan fungsional (ala Rust Book Ch13)!
  let angka = vec![1, 2, 3, 4];
  let genap_dobel: Vec<i32> = angka.iter().filter(|&&x| x % 2 == 0).map(|&x| x * 2).collect();
  println!("Genap dobel: {:?}", genap_dobel); // [4, 8]
}
```

---

## Konsep Kunci

### `Vec` vs Array
`[&str; 2]` tetap, `vec![]` geser + `push`. Butuh `mut` untuk ubah.

### `HashMap` + `Option`
`insert` isi, `["kunci"]` langsung (panic jika tidak ada!), `get()` aman → `Some`/`None`.

### `{:?}` Debug
`println!("{:?}", stok)` cetak array untuk debug.

### Slice `&semua[1..3]` = Pinjam Sebagian
`&[i32]` tanpa punya. Batas ikut panjang (`1..3` = index 1,2).

### String: `push_str`/`push`/`+`
`+` PINDAH milik kiri! Potong string HANYA di batas huruf (é = 2 byte, potong tengah = panic).

### Iterator + Closure `|x| ...`
`.iter().filter().map().collect()` ban berjalan tanpa `for`. Closure `|&x| x*2` fungsi kilat tangkap sekitar.

---

## Penjelasan untuk Pemula

### Analogi: Rak Geser & Buku Alamat
- **Vec = rak IKEA geser**: `push` tambah tanpa beli rak baru.
- **HashMap = buku alamat**: cari "Budi" → nomor. `get` = "ada? → nomor / tidak ada".

### Langkah 0 — Siapkan Device
- Sama W1: `cargo run`.

### Cara Komputer Membaca
1. `stok.push("gula")` → tambah belakang (perlu `mut`!).
2. `harga.get("kopi")` → tidak ada → `None` → cabang `None`.

### 3 Istilah Wajib
1. **Vec/HashMap**: rak/buku
2. **mut**: izin ubah
3. **Option Some/None**: ada/tidak

---

## Eksperimen

- **Hijau:** `stok.push("kopi")` → len 4?
- **Kuning:** `harga["kopi"]` langsung → panic `no entry`? Ganti `get` + `match`.
- **Merah:** `let stok = vec![...]` tanpa `mut` + `push` → error `cannot borrow as mutable`?

---

## Tantangan

**Inventaris:** `Vec` 5 produk + `HashMap` harga → loop cetak + `get` 1 yang tidak ada (tangani `None`) + hapus `harga.remove("gula")`.

---

## Glosarium Mini

- **Vec/HashMap/mut**: rak/buku/izin
- **Option/get**: aman/cek

---

## Ringkasan

Minggu 5 dari 6: **Rak & Buku** (Level: Pemula). Dinamis + aman. Minggu depan: **Error** — alarm `Result`.
