# Structs & Methods

> **Kategori:** Rust | **Level:** Beginner | **Minggu 3:** Structs & Methods

## Learning Objectives

- Define structs with typed fields
- Methods with impl block: &self, &mut self, self
- Associated functions: Struct::new() as constructor
- Derive traits: Debug, Clone, PartialEq
- Struct composition: nested structs

---

## Program: Product Data

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

## Key Concepts

### Structs
Group fields. Like classes but without inheritance.

### Methods
`impl Block { fn method(&self) }`. `&self` read-only, `&mut self` mutable, `self` consume.

### Associated Functions
`Struct::new()` — no self parameter, like static methods.

### Derive
Auto-implement traits. `Debug` for `{:?}`, `Clone` for `.clone()`.

### Composition
Structs can contain other structs (composition over inheritance).

---

## Experiments

- Add update_price method to Product
- Create new struct with nested Product
- Try derive PartialEq and compare two structs
- Create method that consumes self (fn into(self))
- Add another associated function

---

## Challenge

Build a store system: struct Product, Cart, Customer. Methods: add_to_cart, checkout, apply_discount. Use constructors.

---

## Summary

Week 3 of 14: **Structs & Methods** (Level: Beginner). Custom data types in Rust. Next week: **Enums & Pattern Matching**.
