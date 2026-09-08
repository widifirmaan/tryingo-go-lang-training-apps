# Capstone: CLI Warung + Library — Grand Opening Rust

> **Kategori:** Rust | **Level:** Lanjutan | **Minggu 14:** Capstone: CLI + Library

## Tujuan Pembelajaran

- Gabung W1-W13: `struct` + `enum` + `trait` + `Result` + `Vec` + `test` jadi CLI kasir + library teruji

---

## Kenapa Ini Penting Buat Kamu?

13 minggu terpisah — capstone buktikan gabung: kasir terminal anti-crash + teruji + 1 binary kecil. Portfolio "Rust production-ready".

---

## Program: Kasir CLI Grand Opening (Checklist)

```bash
cargo new warung --bin
```

```rust
// src/main.rs — gabung semua (W3 struct, W4 enum, W6 Result)
use std::env;

#[derive(Debug)]
struct Produk { nama: String, harga: u32 }

enum Aksi { Tambah(String, u32), List }

fn parse(arg: &[String]) -> Result<Aksi, String> {
  match arg.get(1).map(|s| s.as_str()) {
    Some("--tambah") => Ok(Aksi::Tambah(
      arg.get(2).cloned().unwrap_or_default(),
      arg.get(3).and_then(|h| h.parse().ok()).unwrap_or(0),
    )),
    _ => Ok(Aksi::List),
  }
}

fn main() -> Result<(), String> {
  let arg: Vec<String> = env::args().collect();
  match parse(&arg)? {
    Aksi::Tambah(n, h) => println!("Tambah {} Rp{}", n, h),
    Aksi::List => println!("Daftar..."),
  }
  Ok(())
}
```

```bash
cargo test   # HIJAU? (W10: tambah 3 test!)
cargo build --release  # 1 binary kecil!
./target/release/warung --tambah Beras 62000
```

**Tugas capstone:** CLI jalan + 3 test hijau + binary release + video 1 menit. **Selesai Rust 0→Ahli!**

---

## Konsep Kunci

### Capstone = Gabung 13 Minggu
Struct + enum + trait + Result + test = kasir.

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening
- **W1-W6 fondasi** + **W7-W13 mesin** = toko. **W14 = buka**.

### 3 Istilah Wajib
1. **Capstone/binary**: gabung/jadi

---

### Bonus: Pecah Modul (ala Rust Book Ch7 — wajib proyek asli!)

1 file 500 baris = sesat. Pecah: `mod kasir;` sambung `src/kasir.rs`.

```rust
// src/kasir.rs — modul dapur
pub struct Produk { pub nama: String, pub harga: u32 }

pub fn total(items: &[Produk]) -> u32 {
    items.iter().map(|p| p.harga).sum()
}
```

```rust
// src/main.rs — pakai modul
mod kasir; // sambung file kasir.rs! (tanpa ini: unresolved module)
use kasir::{Produk, total};

fn main() {
    let rak = vec![
        Produk { nama: "Beras".to_string(), harga: 62000 },
        Produk { nama: "Bayam".to_string(), harga: 5000 },
    ];
    println!("Total: Rp{}", total(&rak)); // Total: Rp67000
}
```

- `mod kasir;` = colok file. `pub` = boleh dipakai luar (tanpa `pub` = private, error!).
- `use kasir::{Produk, total};` = impor biar pendek.

---

## Tantangan

**Grand Opening:** Semua checklist + README + video. **Selesai Rust 0→Ahli!**

---

## Glosarium Mini

- **Capstone/env-args**: gabung/argumen

---

## Ringkasan

Minggu 14 dari 14: **Grand Opening** (Level: Lanjutan). **Selesai Rust 0→Ahli dari nol!**
