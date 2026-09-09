# Trait — Kontrak Warung Rust

> **Kategori:** Rust | **Level:** Menengah | **Minggu 7:** Trait
> **Prasyarat:** Minggu 6 — **Error Handling**.

## Tujuan Pembelajaran

- `trait Kasir { fn hitung(&self) -> u32; }` kontrak + `impl Kasir for Beras` penuhi (sumber: doc.rust-lang.org/book/ch10-02-traits)
- `fn bayar(k: &impl Kasir)` terima apa saja yang berkontrak + default method

---

## Kenapa Ini Penting Buat Kamu?

Beras, Minyak, Gula semua harus bisa `hitung()` — tanpa trait, tulis fungsi per tipe (duplikat!). Dengan trait 1 kontrak, 1 fungsi `bayar` untuk semua. Tambah `Kopi` tanpa ubah `bayar`.

---

## Program: Kontrak Kasir Rust

```rust
trait Kasir {
  fn hitung(&self) -> u32;
  fn nama(&self) -> &str;
  // Default method (boleh tidak ditulis ulang!)
  fn struk(&self) -> String {
    format!("{}: Rp{}", self.nama(), self.hitung())
  }
}

struct Beras { kg: u32, harga: u32 }
impl Kasir for Beras {
  fn hitung(&self) -> u32 { self.kg * self.harga }
  fn nama(&self) -> &str { "Beras" }
}

struct Minyak { liter: u32, harga: u32 }
impl Kasir for Minyak {
  fn hitung(&self) -> u32 { self.liter * self.harga }
  fn nama(&self) -> &str { "Minyak" }
}

// Terima APA SAJA yang berkontrak Kasir!
fn bayar(k: &impl Kasir) {
  println!("{}", k.struk());
}

fn main() {
  bayar(&Beras { kg: 2, harga: 12500 });
  bayar(&Minyak { liter: 2, harga: 17000 });
}
```

---

## Konsep Kunci

### `trait` + `impl ... for` = Kontrak + Penuhi
`trait Kasir { fn hitung(...); }` kontrak, `impl Kasir for Beras` penuhi.

### `&impl Kasir` = Terima Semua Berkontrak
Fungsi 1 untuk semua tipe yang penuhi (seperti interface Go).

### Default Method = Isi Bawaan
`struk()` ada isi di trait — boleh pakai langsung.

---

## Penjelasan untuk Pemula

### Analogi: Sertifikat Kasir
- **Trait = sertifikat**: "bisa hitung". Beras & Minyak punya sertifikat → boleh jaga kasir (`bayar`).

### Langkah 0 — Siapkan Device
- Sama Rust W1: `cargo run`.

### Cara Komputer Membaca
1. `bayar(&Beras{...})` → cek: Beras penuhi Kasir? Ya → panggil `hitung` versi Beras.

### 3 Istilah Wajib
1. **Trait/impl**: kontrak/penuhi
2. **impl Trait**: terima-berkontrak

---

## Eksperimen

- **Hijau:** Tambah `Gula` + `impl Kasir` → `bayar` langsung bisa?
- **Kuning:** Hapus 1 method `impl` → error `not all trait items implemented`?
- **Merah:** `fn bayar(k: Beras)` (tipe konkret) → Minyak ditolak? Ganti `&impl Kasir`.

---

## Tantangan

**Kontrak Lengkap:** `trait Diskon { fn total(&self) -> u32; }` + 3 struct + `bayar()` + default `struk()`.

---

## Glosarium Mini

- **Trait/impl**: kontrak/penuhi

---

## Ringkasan

Minggu 7 dari 14: **Kontrak** (Level: Menengah). 1 fungsi semua tipe. Minggu depan: **Generics**.
