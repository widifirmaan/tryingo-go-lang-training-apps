# Testing

> **Kategori:** Rust | **Level:** Menengah | **Minggu 10:** Testing

## Tujuan Pembelajaran

- #[test] attribute untuk menandai fungsi test
- assert!, assert_eq!, assert_ne! macro untuk verifikasi
- #[cfg(test)] module untuk kumpulan test
- Doc test: test di dalam dokumentasi kode
- cargo test untuk menjalankan semua test

---

## Program: Unit Test & Integration

```rust
// Fungsi yang akan diuji
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("tidak bisa dibagi nol".to_string())
    } else {
        Ok(a / b)
    }
}

fn is_even(n: i32) -> bool {
    n % 2 == 0
}

fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a = 0u64;
            let mut b = 1u64;
            for _ in 2..=n {
                let temp = a + b;
                a = b;
                b = temp;
            }
            b
        }
    }
}

fn main() {
    // Simulasi test
    println!("=== Simulasi Unit Test ===");

    // Test add
    let result = add(2, 3);
    assert_eq!(result, 5, "add(2,3) harus 5");
    println!("✓ add(2,3) = {}", result);

    let result = add(-1, -1);
    assert_eq!(result, -2, "add(-1,-1) harus -2");
    println!("✓ add(-1,-1) = {}", result);

    // Test divide
    let result = divide(10.0, 2.0);
    assert!(result.is_ok());
    println!("✓ divide(10,2) = {:?}", result);

    let result = divide(5.0, 0.0);
    assert!(result.is_err());
    println!("✓ divide(5,0) = {:?}", result);

    // Test is_even
    assert!(is_even(4));
    assert!(!is_even(3));
    println!("✓ is_even tests passed");

    // Test fibonacci
    assert_eq!(fibonacci(0), 0);
    assert_eq!(fibonacci(1), 1);
    assert_eq!(fibonacci(10), 55);
    println!("✓ fibonacci tests passed");

    println!("
=== Semua test passed! ===");
    println!("Cargo test: cargo test");
    println!("Doc test: cargo test --doc");
}
```

---

## Konsep Kunci

### Unit Test
`#[test]` attribute. `assert_eq!(a, b)` untuk verifikasi equality.

### Test Module
`#[cfg(test)] mod tests { ... }` — module khusus test.

### Doc Test
Test di dalam /// comment. Dijalankan dengan `cargo test --doc`.

### cargo test
Menjalankan semua test. `cargo test nama_filter` untuk test spesifik.

---

## Eksperimen

- Buat test untuk fungsi add dengan edge cases
- Coba assert_ne! dan assert! dengan custom message
- Buat test module dengan setup/teardown
- Eksperimen dengan should_panic
- Buat doc test untuk fungsi publik

---

## Tantangan

Buat library calculator dengan unit test: add, subtract, multiply, divide, power, factorial. Minimal 10 test cases.

---

## Ringkasan

Minggu 10 dari 14: **Testing** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Smart Pointers** (Advanced).
