# Error Handling — Alarm Rust

> **Kategori:** Rust | **Level:** Pemula | **Minggu 6:** Error Handling

## Tujuan Pembelajaran

- `Result<T,E>` = `Ok` atau `Err`, `?` lempar error, `match` tangkap

---

## Program

```rust
fn bagi(a: f64, b: f64) -> Result<f64, String> {
  if b == 0.0 { Err("tidak bisa bagi 0".to_string()) } else { Ok(a / b) }
}

fn main(){
  match bagi(10.0, 2.0) {
    Ok(v) => println!("10/2 = {}", v),
    Err(e) => println!("Error: {}", e),
  }
  println!("Bagi 0: {:?}", bagi(5.0, 0.0));

  // ? untuk lempar
  // let v = bagi(10.0, 2.0)?; // jika Err langsung return Err
}
```

---

## Ringkasan

Minggu 6: **Alarm Rust** — `Result` dan `?`. Selesai Beginner Rust!
