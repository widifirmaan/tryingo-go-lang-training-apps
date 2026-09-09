# Generics — Rak Serbaguna Rust

> **Kategori:** Rust | **Level:** Menengah | **Minggu 8:** Generics
> **Prasyarat:** Minggu 7 — **Trait**.

## Tujuan Pembelajaran

- `struct Keranjang<T> { items: Vec<T> }` rak tipe apa saja + `fn pertama<T>(v: &[T]) -> &T` (sumber: doc.rust-lang.org/book/ch10-01-syntax)
- `T: Kasir` batas (trait bound) — hanya yang berkontrak!

---

## Kenapa Ini Penting Buat Kamu?

Tanpa generics, `KeranjangString` + `KeranjangInt` duplikat. Dengan `<T>` 1 rak + tetap ketat (tidak `Any` longgar). `T: Kasir` cegah rak isi barang tak-berkontrak.

---

## Program: Rak Generik Warung

```rust
struct Keranjang<T> {
  items: Vec<T>,
}

impl<T> Keranjang<T> {
  fn new() -> Self { Self { items: Vec::new() } }
  fn tambah(&mut self, item: T) { self.items.push(item); }
  fn pertama(&self) -> Option<&T> { self.items.first() }
}

fn main() {
  let mut ks = Keranjang { items: vec!["Beras", "Gula"] };
  ks.tambah("Kopi");
  println!("Pertama: {:?}", ks.pertama());

  let mut ki: Keranjang<i32> = Keranjang::new();
  ki.tambah(62000);
  // ki.tambah("x"); // ERROR: bukan i32!

  // Batas trait: hanya yang berkontrak (trait Kasir W7 diringkas di sini agar contoh jalan!)
  trait Kasir { fn hitung(&self) -> u32; }
  struct Beras;
  impl Kasir for Beras {
    fn hitung(&self) -> u32 { 25000 }
  }
  fn bayar_termahal<T: Kasir>(a: &T, b: &T) -> u32 {
    a.hitung().max(b.hitung())
  }
  println!("Termahal: {}", bayar_termahal(&Beras, &Beras));
}
```

---

## Konsep Kunci

### `<T>` = Label Sementara
`Keranjang<String>` → `T` jadi `String` di mana-mana.

### `T: Kasir` = Syarat Rak
Hanya tipe berkontrak boleh masuk fungsi.

### `Option<&T>` = Aman Kosong
`first()` → `Some`/`None` (bukan panic!).

---

## Penjelasan untuk Pemula

### Analogi: Rak Adjustable
- **Generics = rak adjustable**: setel `String`/`i32` — 1 rak.

### Langkah 0 — Siapkan Device
- Sama W1: `cargo run`.

### Cara Komputer Membaca
1. `Keranjang { items: vec!["Beras"] }` → tebak `T = &str`.
2. `tambah(123)` → error tipe!

### 3 Istilah Wajib
1. **Generics/<T>/bound**: serbaguna/label/syarat

---

## Eksperimen

- **Hijau:** `Keranjang::new()` + tebak tipe dari `tambah`?
- **Kuning:** `pertama()` rak kosong → `None`? (Aman, tidak panic!)
- **Merah:** Hapus `: Kasir` bound → panggil `hitung` di dalam → error?

---

## Tantangan

**Gudang Generik:** `Keranjang<T>` + `total<T: Harga>()` + 2 tipe + `Option` tangani kosong.

---

## Glosarium Mini

- **Generics/bound/Option**: serbaguna/syarat/aman

---

## Ringkasan

Minggu 8 dari 14: **Rak Serbaguna** (Level: Menengah). 1 rak ketat. Minggu depan: **Lifetimes**.
