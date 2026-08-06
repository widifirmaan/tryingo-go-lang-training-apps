# Collections: Vec, HashMap & String

> **Kategori:** Rust | **Level:** Pemula | **Minggu 5:** Collections: Vec, HashMap & String

## Tujuan Pembelajaran

- Vec<T>: dynamic array dengan push, pop, len, capacity
- Slice: &vec[a..b] untuk akses sub-array
- HashMap<K, V>: key-value store dengan insert, get, entry
- String: trim, contains, replace, chars iteration
- Iterasi dengan iter(), enumerate(), for loop

---

## Program: Manajemen Data

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

## Konsep Kunci

### Vec<T>
Dynamic array. `push`, `pop`, `len`, `capacity`. Auto-grow saat penuh.

### Slice
`&vec[1..3]` — reference ke sub-array. Tidak punya ownership.

### HashMap
`HashMap::new()`, `insert`, `get` returns `Option<&V>`. `entry().or_insert()` untuk upsert.

### String
`trim`, `contains`, `replace`, `chars()` untuk iterasi karakter.

### Iterasi
`vec.iter()` immutable, `vec.iter_mut()` mutable, `for item in &vec`.

---

## Eksperimen

- Buat Vec 2D (matrix) dan iterasi nested
- Tambah dan hapus multiple key di HashMap
- Coba HashMap dengan custom key type
- Eksperimen dengan VecDeque
- Buat word counter dengan HashMap

---

## Tantangan

Buat program inventory: tambah/hapus produk (HashMap), daftar produk (Vec), cari produk (iter + if).

---

## Ringkasan

Minggu 5 dari 14: **Collections: Vec, HashMap & String** (Level: Pemula). Struktur data harian Rust. Minggu depan: **Error Handling**.
