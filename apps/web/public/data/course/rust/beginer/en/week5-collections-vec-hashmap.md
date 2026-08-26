# Collections — Rak Rust

> **Kategori:** Rust | **Level:** Pemula | **Minggu 5:** Collections

## Tujuan Pembelajaran

- `Vec` rak dinamis `vec!["beras"]`, `HashMap` buku alamat

---

## Program

```rust
use std::collections::HashMap;

fn main(){
  let mut stok = vec!["beras", "minyak"];
  stok.push("gula");
  println!("{:?} len {}", stok, stok.len());

  let mut harga = HashMap::new();
  harga.insert("beras", 62000);
  harga.insert("gula", 15000);
  println!("Harga beras: {}", harga["beras"]);
  println!("Kopi: {:?}", harga.get("kopi")); // None
}
```

---

## Ringkasan

Minggu 5: **Rak Rust** — Vec & HashMap.
