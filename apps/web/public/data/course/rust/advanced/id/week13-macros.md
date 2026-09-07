# Macros — Stempel Kode Rust

> **Kategori:** Rust | **Level:** Lanjutan | **Minggu 13:** Macros

## Tujuan Pembelajaran

- `macro_rules!` stempel kode: tulis pola → hasilkan kode (sumber: doc.rust-lang.org/book/ch19-06-macros + The Little Book of Rust Macros)
- `vec!`, `println!`, `format!` yang dipakai tiap hari = macro bawaan (`!` tandanya!)

---

## Kenapa Ini Penting Buat Kamu?

Tulis `vec![1,2,3]` vs `Vec::new(); push; push; push` — macro hemat 4 baris. `println!("Halo {}", nama)` cek jumlah `{}` vs argumen SAAT COMPILE (bukan runtime!). Buat stempel sendiri untuk pola berulang (misal `hashmap!`).

---

## Program: Stempel Warung Rust

```rust
// Stempel sendiri: hashmap! (tidak ada di std!)
macro_rules! stok {
  ($( $nama:expr => $jumlah:expr ),*) => {{
    let mut m = std::collections::HashMap::new();
    $( m.insert($nama, $jumlah); )*
    m
  }};
}

fn main() {
  let s = stok! { "beras" => 10, "gula" => 5 };
  println!("{:?}", s);

  // Bawaan yang tiap hari dipakai (semua macro!):
  let v = vec![1, 2, 3];                    // vec!
  println!("Halo {}!", "Budi");             // println!
  let teks = format!("Rp{}", 62000);        // format!
  println!("{}", teks);
}
```

---

## Konsep Kunci

### `macro_rules!` + `$nama:expr` = Pola + Tangkap
`$( ... ),*` ulang koma-pisah. `$nama:expr` tangkap ekspresi.

### `!` = Tanda Macro
`vec!`, `println!` — bukan fungsi (jumlah argumen bebas!).

---

## Penjelasan untuk Pemula

### Analogi: Stempel Kode
- **Macro = stempel**: `stok!{...}` cap → jadi 10 baris kode.

### Langkah 0 — Siapkan Device
- Sama W1. `cargo expand` (opsional) intip hasil stempel.

### Cara Komputer Membaca
1. Compile → macro jalan DULUAN → hasilkan kode → baru compile kode hasil.

### 3 Istilah Wajib
1. **macro_rules/!**: stempel/tanda
2. **$expr/$( )*:** tangkap/ulang

---

## Eksperimen

- **Hijau:** `stok!{}` kosong → HashMap kosong?
- **Kuning:** Pola tanpa koma terakhir → error pola? Tambah.
- **Merah:** Fungsi biasa ganti `vec!` (argumen bebas)? Tidak bisa! (Itulah kenapa macro.)

---

## Tantangan

**Stempel Toko:** `tambah_stok!(map, "beras", 5)` macro tambah-atau-buat + `vec!` bandingkan baris hemat.

---

## Glosarium Mini

- **macro/!/expand**: stempel/tanda/intip

---

## Ringkasan

Minggu 13 dari 14: **Stempel Kode** (Level: Lanjutan). Hemat baris aman. Minggu depan: **Capstone**.
