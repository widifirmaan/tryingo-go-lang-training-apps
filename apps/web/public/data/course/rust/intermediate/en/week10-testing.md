# Testing — Cicip Warung Rust Beneran

> **Kategori:** Rust | **Level:** Menengah | **Minggu 10:** Testing

## Tujuan Pembelajaran

- `#[test]` + `assert_eq!` cicip beneran + `cargo test` jalan (sumber: doc.rust-lang.org/book/ch11)
- `#[should_panic]` harapkan meledak + doc-test di `///` otomatis jalan!

---

## Kenapa Ini Penting Buat Kamu?

Simulasi `println` tidak dicek mesin. `cargo test` beneran: ubah rumus → merah → perbaiki. Doc-test (contoh di `///`) ikut jalan — dokumentasi tidak basi!

---

## Program: Cicip Kasir Beneran

```rust
fn hitung(a: i32, b: i32) -> i32 { a + b }

/// Bagi aman.
/// /// Contoh (JALAN OTOMATIS sebagai test!):
/// ```
/// assert_eq!(bagi(10.0, 2.0), Ok(5.0));
/// ```
fn bagi(a: f64, b: f64) -> Result<f64, String> {
  if b == 0.0 { Err("tidak bisa bagi 0".to_string()) } else { Ok(a / b) }
}

#[cfg(test)]
mod test {
  use super::*;

  #[test]
  fn hitung_benar() {
    assert_eq!(hitung(2, 3), 5);
  }

  #[test]
  fn bagi_nol_meledak() {
    assert!(bagi(5.0, 0.0).is_err());
  }

  #[test]
  #[should_panic]
  fn index_lewat_meledak() {
    let v = vec![1];
    let _ = v[5]; // panic diharapkan!
  }
}
```

```bash
cargo test
# test result: ok. 3 passed + 1 doc-test — HIJAU beneran
```

---

## Konsep Kunci

### `#[test]` + `assert_eq!` = Cicip Mesin
`assert_eq!(hitung(2,3), 5)` — beda → merah + nilai kiri-kanan.

### `#[should_panic]` = Harapkan Meledak
Untuk kode yang SEHARUSNYA panic.

### Doc-Test = Contoh Hidup
`/// ``` ` ikut `cargo test` — contoh basi langsung ketahuan!

---

## Penjelasan untuk Pemula

### Analogi: Cicip Dapur
- **test = cicip**: masak → cicip mesin.

### Langkah 0 — Siapkan Device
- Sama W1: `cargo test` (tanpa install tambahan!).

### Cara Komputer Membaca
1. `cargo test` → compile mode test → jalankan tiap `#[test]` paralel → lapor.

### 3 Istilah Wajib
1. **test/assert/doc-test**: cicip/harap/contoh-hidup

---

## Eksperimen

- **Hijau:** Ubah rumus → merah? Betulkan.
- **Kuning:** Doc `///` salah → doc-test merah? (Dokumentasi basi ketahuan!)
- **Merah:** Test tanpa `#[test]` → tidak jalan? Tambah atribut.

---

## Tantangan

**Warung Teruji:** `hitung/diskon/bagi` + 4 test + 1 doc-test HIJAU + screenshot. **Selesai Menengah Rust!**

---

## Glosarium Mini

- **test/assert/doc-test**: cicip/harap/contoh

---

## Ringkasan

Minggu 10 dari 14: **Cicip Beneran** (Level: Menengah). **Selesai Menengah Rust!** Lanjut: **Smart Pointers** (Lanjutan).
