# Error Handling — Alarm Anti-Panik Rust

> **Kategori:** Rust | **Level:** Pemula | **Minggu 6:** Error Handling

## Tujuan Pembelajaran

- `Result<T, E>` = `Ok(v)` sukses atau `Err(e)` gagal — wajib tangani, tidak bisa diam (sumber: doc.rust-lang.org/book/ch09)
- `match` tangkap, `?` lempar ke pemanggil, `unwrap` (panik, hindari di produksi)

---

## Kenapa Ini Penting Buat Kamu?

Bagi stok `10/0` tanpa cek → warung crash. Rust paksa: fungsi yang bisa gagal return `Result` — compiler tolak jika tidak ditangani. `?` rambatkan tanpa `if` bertingkat.

---

## Program: Kasir Anti-Crash Rust

```rust
fn bagi(a: f64, b: f64) -> Result<f64, String> {
  if b == 0.0 {
    Err("tidak bisa bagi 0 — cek stok".to_string())
  } else {
    Ok(a / b)
  }
}

fn rata_rata(data: &[f64]) -> Result<f64, String> {
  if data.is_empty() {
    return Err("data kosong".to_string());
  }
  let total: f64 = data.iter().sum();
  Ok(total / data.len() as f64)
}

fn main() {
  // 1. Tangkap dengan match
  match bagi(10.0, 2.0) {
    Ok(v) => println!("10/2 = {}", v),
    Err(e) => println!("Error: {}", e),
  }

  // 2. ? lempar (di main yang return Result)
  println!("Bagi 0: {:?}", bagi(5.0, 0.0));
  println!("Rata kosong: {:?}", rata_rata(&[]));
  println!("Rata: {:?}", rata_rata(&[80.0, 90.0]));

  // 3. unwrap = paksa (panik jika Err — hanya untuk contoh!)
  // println!("{}", bagi(10.0, 2.0).unwrap());
}
```

---

## Konsep Kunci

### `Result<T,E>` = `Ok` atau `Err`
`Ok(v)` sukses bawa nilai, `Err(e)` gagal bawa pesan. Tidak ada `null` diam-diam.

### `match` vs `?` vs `unwrap`
- `match` tangkap di sini.
- `?` lempar ke pemanggil (fungsi harus return `Result`).
- `unwrap` paksa ambil (panik jika `Err` — hindari di produksi).

---

## Penjelasan untuk Pemula

### Analogi: Alarm Kompor
- **`Result` = kompor ber-alarm**: masak `bagi(5,0)` alarm (`Err`) bunyi, wajib matikan (`match`).
- **`?` = teruskan alarm**: "saya tidak tangani, kasih ke bos".

### Langkah 0 — Siapkan Device
- Sama W1: `cargo run`.

### Cara Komputer Membaca
1. `bagi(5.0, 0.0)` → `Err(...)` → `match` cabang `Err` → cetak.
2. `rata_rata(&[])` → `is_empty` → `return Err` dini.

### 3 Istilah Wajib
1. **Result/Ok/Err**: hasil/sukses/gagal
2. **?**: lempar
3. **unwrap**: paksa (bahaya)

---

## Eksperimen

- **Hijau:** `bagi(9.0, 3.0)` → `Ok(3.0)`?
- **Kuning:** `.unwrap()` di `Ok` → nilai? Di `Err` → panic?
- **Merah:** Fungsi pakai `?` tapi return `f64` (bukan `Result`) → error compile?

---

## Tantangan

**Kasir Aman:** `fn diskon(harga: f64, persen: f64) -> Result<f64, String>` tolak `persen > 50` → `match` 3 kasus (normal, tolak, bagi-0) + `?` versi rambatkan. **Selesai Beginner Rust!**

---

## Glosarium Mini

- **Result/Ok/Err/?**: hasil/sukses/gagal/lempar
- **panic/unwrap**: crash/paksa

---

## Ringkasan

Minggu 6 dari 6: **Alarm Anti-Panik** (Level: Pemula). **Selesai Beginner Rust!** Lanjut: **Ownership Lanjutan** (Menengah).
