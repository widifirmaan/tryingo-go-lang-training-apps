# Struct & Method — Kartu Produk Rust

> **Kategori:** Rust | **Level:** Pemula | **Minggu 3:** Struct & Method

## Tujuan Pembelajaran

- `struct Produk { nama: String, harga: u32 }` — kartu produk Rust (punya data)
- `impl Produk { fn info(&self) }` — stempel di kartu, `&self` pinjam baca, `&mut self` untuk diskon
- `Produk::new()` constructor

---

## Kenapa Ini Penting Buat Kamu?

50 produk sebagai `String` terpisah berantakan. `struct` = 1 kartu isi 3 baris, `impl` = stempel.

---

## Program: Kartu Warung Rust

```rust
struct Produk {
    nama: String,
    harga: u32,
    stok: u32,
}

impl Produk {
    fn new(nama: String, harga: u32) -> Self {
        Self { nama, harga, stok: 0 }
    }
    fn info(&self) -> String {
        format!("{}: Rp{} (stok {})", self.nama, self.harga, self.stok)
    }
    fn diskon(&mut self, persen: u32) {
        self.harga = self.harga - self.harga * persen / 100;
    }
}

fn main() {
    let mut beras = Produk { nama: "Beras".to_string(), harga: 62000, stok: 10 };
    println!("{}", beras.info());
    beras.diskon(10);
    println!("Setelah diskon: {}", beras.info());

    let gula = Produk::new("Gula".to_string(), 15000);
    println!("{}", gula.info());
}
```

---

## Konsep Kunci

### `struct` = Kartu
`struct Produk { nama: String, harga: u32 }` → `Produk { nama: "Beras".to_string(), harga: 62000 }`

### `impl` + `&self`/`&mut self`
- `&self` baca, `&mut self` tulis. `Self` = Produk.

---

## Penjelasan untuk Pemula

### Analogi: Kartu & Stempel
- `struct` = kartu, `impl` = stempel. `&mut self` stempel potong harga.

---

## Tantangan

**Keranjang:** `struct Keranjang { items: Vec<Produk> }` + `fn tambah(&mut self, p: Produk)` + `fn total(&self) -> u32`.

---

## Ringkasan

Minggu 3: **Struct** — kartu Rust. Minggu depan: **Enum** — pilihan.
