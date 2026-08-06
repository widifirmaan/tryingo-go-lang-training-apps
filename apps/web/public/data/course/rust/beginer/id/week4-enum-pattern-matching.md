# Enum & Pattern Matching

> **Kategori:** Rust | **Level:** Pemula | **Minggu 4:** Enum & Pattern Matching

## Tujuan Pembelajaran

- Enum dengan variant dan data payload
- Pattern matching dengan match expression
- Destructuring: ekstrak data dari enum variant
- Option<T> dan Result<T, E> enum standar
- if let dan matches! macro untuk pattern matching singkat

---

## Program: Status Pesanan

```rust
#[derive(Debug)]
enum OrderStatus {
    Pending,
    Processing { started_at: String },
    Shipped { tracking_number: String },
    Delivered,
    Cancelled { reason: String },
}

impl OrderStatus {
    fn description(&self) -> String {
        match self {
            OrderStatus::Pending => "Menunggu pembayaran".to_string(),
            OrderStatus::Processing { started_at } => {
                format!("Diproses sejak {}", started_at)
            }
            OrderStatus::Shipped { tracking_number } => {
                format!("Dikirim, resi: {}", tracking_number)
            }
            OrderStatus::Delivered => "Terkirim".to_string(),
            OrderStatus::Cancelled { reason } => {
                format!("Dibatalkan: {}", reason)
            }
        }
    }

    fn is_terminal(&self) -> bool {
        matches!(self, OrderStatus::Delivered | OrderStatus::Cancelled { .. })
    }
}

fn main() {
    let orders = vec![
        OrderStatus::Pending,
        OrderStatus::Processing { started_at: "2024-01-15".to_string() },
        OrderStatus::Shipped { tracking_number: "JNE123".to_string() },
        OrderStatus::Delivered,
        OrderStatus::Cancelled { reason: "Stok habis".to_string() },
    ];

    for order in &orders {
        println!("{:?}", order);
        println!("  Status: {}", order.description());
        println!("  Terminal: {}", order.is_terminal());
        println!();
    }

    // if let pattern
    if let OrderStatus::Shipped { tracking_number } = &orders[2] {
        println!("Nomor resi: {}", tracking_number);
    }

    // Option enum
    let some_value: Option<i32> = Some(42);
    let none_value: Option<i32> = None;

    match some_value {
        Some(v) => println!("Value: {}", v),
        None => println!("No value"),
    }

    // unwrap_or
    let result = none_value.unwrap_or(0);
    println!("unwrap_or: {}", result);
}
```

---

## Konsep Kunci

### Enum
Variant bisa membawa data: `Processing { started_at: String }`.

### Match
Exhaustive — harus handle semua variant. `_` untuk catch-all.

### Destructuring
`OrderStatus::Shipped { tracking_number }` — ekstrak field.

### Option<T>
`Some(T)` atau `None`. Tidak ada null di Rust.

### if let & matches!
`if let Some(v) = opt` — match satu pattern. `matches!(x, Pattern)` — boolean check.

---

## Eksperimen

- Buat enum baru dengan 5+ variant
- Tambah method pada enum dengan match
- Eksperimen dengan nested match
- Coba matches! dengan guard clause
- Buat Result<T, E> dan handle dengan match

---

## Tantangan

Buat sistem state machine: enum GameState (Menu, Playing, Paused, GameOver). Method: transition, is_valid_transition. Gunakan match untuk validasi.

---

## Ringkasan

Minggu 4 dari 14: **Enum & Pattern Matching** (Level: Pemula). Kekuatan utama Rust. Minggu depan: **Collections: Vec, HashMap, String**.
