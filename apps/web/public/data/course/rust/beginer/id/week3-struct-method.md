# Struct & Method

> **Kategori:** Rust | **Level:** Pemula | **Minggu 3:** Struct & Method

## Tujuan Pembelajaran

- Mendefinisikan struct dengan field bertipe
- Method dengan impl block: &self, &mut self, self
- Associated function: Struct::new() sebagai constructor
- Derive trait: Debug, Clone, PartialEq
- Struct composition: nested struct

---

## Program: Data Produk

```rust
#[derive(Debug, Clone)]
struct Product {
    id: u32,
    name: String,
    price: f64,
    stock: u32,
}

impl Product {
    fn new(id: u32, name: &str, price: f64) -> Product {
        Product {
            id,
            name: name.to_string(),
            price,
            stock: 0,
        }
    }

    fn info(&self) -> String {
        format!("{}: Rp{:.0} (stok: {})", self.name, self.price, self.stock)
    }

    fn apply_discount(&mut self, percent: f64) {
        self.price -= self.price * (percent / 100.0);
    }

    fn restock(&mut self, amount: u32) {
        self.stock += amount;
    }
}

#[derive(Debug)]
struct Electronics {
    product: Product,
    warranty_years: u32,
}

fn main() {
    let mut p1 = Product::new(1, "Laptop", 15000000.0);
    p1.restock(10);
    println!("{}", p1.info());

    p1.apply_discount(10.0);
    println!("Setelah diskon: {}", p1.info());

    let laptop = Electronics {
        product: Product::new(2, "Laptop Pro", 20000000.0),
        warranty_years: 3,
    };
    println!("{:?}", laptop);
    println!("Garansi: {} tahun", laptop.warranty_years);

    let p2 = Product::new(3, "Mouse", 250000.0);
    println!("{}", p2.info());
}
```

---

## Konsep Kunci

### Struct
Mengelompokkan field. Mirip class tapi tanpa inheritance.

### Method
`impl Product { fn method(&self) }`. `&self` read-only, `&mut self` mutable, `self` consume.

### Associated Function
`Product::new()` — tidak punya self, mirip static method.

### Derive
`#[derive(Debug)]` auto-implement trait. `Debug` untuk `{:?}`, `Clone` untuk `.clone()`.

### Composition
Struct bisa punya field struct lain (composition over inheritance).

---

## Eksperimen

- Tambah method update_price pada Product
- Buat struct baru dengan nested Product
- Coba derive PartialEq dan bandingkan dua struct
- Buat method yang consume self (fn into(self))
- Tambah associated function lain

---

## Tantangan

Buat sistem toko: struct Product, Cart, Customer. Method: add_to_cart, checkout, apply_discount. Gunakan constructor.

---

## Ringkasan

Minggu 3 dari 14: **Struct & Method** (Level: Pemula). Tipe data custom di Rust. Minggu depan: **Enum & Pattern Matching**.
