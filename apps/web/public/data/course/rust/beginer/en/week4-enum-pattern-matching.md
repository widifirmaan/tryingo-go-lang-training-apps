# Enum & Pattern Matching — Pilihan Warung

> **Kategori:** Rust | **Level:** Pemula | **Minggu 4:** Enum & Pattern Matching

## Tujuan Pembelajaran

- `enum Status { Ada, Habis, Preorder }` pilihan, `match` seperti `switch` tapi wajib lengkap

---

## Program

```rust
enum Status { Ada, Habis, Preorder }

fn label(s: Status) -> String {
  match s {
    Status::Ada => "✅ Tersedia".to_string(),
    Status::Habis => "❌ Habis".to_string(),
    Status::Preorder => "⏳ Preorder".to_string(),
  }
}

fn main(){
  println!("{}", label(Status::Ada));
  let s = Status::Habis;
  if let Status::Ada = s { println!("Ada"); } else { println!("Tidak ada"); }
}
```

---

## Ringkasan

Minggu 4: **Pilihan** — enum & match wajib lengkap.
