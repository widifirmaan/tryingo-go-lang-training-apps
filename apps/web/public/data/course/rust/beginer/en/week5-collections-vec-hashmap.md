# Collections: Vec, HashMap & String

> **Kategori:** Rust | **Level:** Beginner | **Minggu 5:** Collections: Vec, HashMap & String

## Learning Objectives

- Vec<T>: dynamic array with push, pop, len, capacity
- Slice: &vec[a..b] for sub-array access
- HashMap<K, V>: key-value store with insert, get, entry
- String: trim, contains, replace, chars iteration
- Iteration with iter(), enumerate(), for loops

---

## Program: Data Manager

```rust
use std::collections::HashMap;

fn main() {
    // Vec<T> — dynamic array
    let mut fruits: Vec<String> = Vec::new();
    fruits.push("apel".to_string());
    fruits.push("mangga".to_string());
    fruits.push("pisang".to_string());
    fruits.push("jeruk".to_string());

    println!("Vec: {:?}", fruits);
    println!("Len: {}, Cap: {}", fruits.len(), fruits.capacity());

    // Slice
    let sub = &fruits[1..3];
    println!("Sub-slice [1..3]: {:?}", sub);

    // Iterasi
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", i, fruit);
    }

    // HashMap<K, V>
    let mut ages: HashMap<&str, u32> = HashMap::new();
    ages.insert("Budi", 25);
    ages.insert("Siti", 23);
    ages.insert("Andi", 30);

    // Cek keberadaan
    match ages.get("Budi") {
        Some(age) => println!("Umur Budi: {}", age),
        None => println!("Budi tidak ditemukan"),
    }

    // Entry API
    ages.entry("Dewi").or_insert(28);

    // Iterasi HashMap
    for (name, age) in &ages {
        println!("{} -> {}", name, age);
    }

    // String manipulation
    let text = "  Rust Programming Language  ";
    let trimmed = text.trim();
    println!("Trimmed: '{}'", trimmed);
    println!("Contains 'Rust': {}", text.contains("Rust"));
    println!("Replace: {}", text.replace("Rust", "Go"));

    // Iterasi string
    let word = "Halo";
    for c in word.chars() {
        print!("{} ", c);
    }
    println!();
}
```

---

## Key Concepts

### Vec<T>
Dynamic array with push, pop, len, capacity.

### Slices
`&vec[a..b]` — reference to sub-array.

### HashMap
Key-value store with insert, get (returns Option), entry API.

### String
trim, contains, replace, chars iteration.

### Iteration
iter(), iter_mut(), for loops.

---

## Experiments

- Create 2D Vec (matrix) and nested iteration
- Add and remove multiple keys in HashMap
- Try HashMap with custom key type
- Experiment with VecDeque
- Build word counter with HashMap

---

## Challenge

Build an inventory program: add/remove products (HashMap), list products (Vec), search products (iter + if).

---

## Summary

Week 5 of 14: **Collections: Vec, HashMap & String** (Level: Beginner). Daily data structures in Rust. Next week: **Error Handling**.
