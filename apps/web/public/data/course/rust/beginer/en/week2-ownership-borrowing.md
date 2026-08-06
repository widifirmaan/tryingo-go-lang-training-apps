# Ownership & Borrowing

> **Kategori:** Rust | **Level:** Beginner | **Minggu 2:** Ownership & Borrowing

## Learning Objectives

- Understand ownership: each value has one owner
- Move semantics: transfer ownership on assignment
- Clone: deep copy for value duplication
- Borrowing: borrow with & (immutable) and &mut (mutable)
- Borrowing rules: one mutable borrow OR many immutable borrows

---

## Program: Memory Management

```rust
fn main() {
    // Ownership: setiap value punya satu owner
    let s1 = String::from("Halo");
    let s2 = s1; // s1 dipindahkan ke s2 (move)
    // println!("{}", s1); // ERROR: s1 sudah tidak valid
    println!("s2 = {}", s2);

    // Clone: deep copy
    let s3 = String::from("Dunia");
    let s4 = s3.clone();
    println!("s3 = {}, s4 = {}", s3, s4);

    // Borrowing: pinjam dengan &
    let s5 = String::from("Rust");
    let len = hitung_panjang(&s5);
    println!("Panjang '{}' = {}", s5, len);

    // Mutable borrow
    let mut s6 = String::from("Halo");
    ubah_string(&mut s6);
    println!("Setelah diubah: {}", s6);

    // Aturan borrowing
    let mut s = String::from("Halo");
    let r1 = &s;
    let r2 = &s;
    println!("r1 = {}, r2 = {}", r1, r2);
    // let r3 = &mut s; // ERROR: tidak bisa mutable borrow saat immutable borrow aktif

    // Dangling reference prevention
    // let reference_to_nothing = dangle(); // ERROR: tidak bisa return reference ke local
}

fn hitung_panjang(s: &String) -> usize {
    s.len()
}

fn ubah_string(s: &mut String) {
    s.push_str(", Dunia!");
}
```

---

## Key Concepts

### Ownership
Each value has one owner. When owner goes out of scope, value is dropped.

### Move
Assignment moves ownership for non-Copy types. Original variable becomes invalid.

### Clone
Deep copy creates independent duplicate.

### Borrowing
`&s` immutable, `&mut s` mutable. Rule: one mutable OR many immutable.

### Dangling References
Prevented at compile time.

---

## Experiments

- Try println! s1 after move — observe error
- Create function that returns ownership
- Experiment with multiple mutable borrows
- Create struct with String field and test ownership
- Try Copy trait on primitive types

---

## Challenge

Build a book management program: struct Book with title (String), functions new(), display(), and clone(). Demonstrate ownership and borrowing.

---

## Summary

Week 2 of 14: **Ownership & Borrowing** (Level: Beginner). This is what makes Rust unique. Next week: **Structs & Methods**.
