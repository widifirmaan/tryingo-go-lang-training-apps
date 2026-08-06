# Lifetimes

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 9:** Lifetimes

## Learning Objectives

- Lifetime annotations: 'a to mark reference lifetimes
- Compiler infers lifetimes with elision rules
- Lifetimes on structs: structs holding references
- Static lifetime: 'static for string literals and global data
- Multiple lifetimes: 'a, 'b for references with different lifetimes

---

## Program: Reference Validation

```rust
fn main() {
    // Lifetime: memastikan reference valid selama masih digunakan
    let string1 = String::from("livedan string yang panjang");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("String terpanjang: {}", result);
    }
    // println!("{}", result); // ERROR: result tidak valid di sini

    // Lifetime pada struct
    #[derive(Debug)]
    struct Excerpt {
        part: String,
    }

    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let excerpt = Excerpt {
        part: first_sentence.to_string(),
    };
    println!("{:?}", excerpt);

    // Static lifetime
    let s: &'static str = "ini string literal, hidup selamanya";
    println!("Static: {}", s);

    // Lifetime omission (compiler infer)
    fn first_word(s: &str) -> &str {
        s.split_whitespace().next().unwrap_or("")
    }

    let sentence = "Halo Dunia Rust";
    println!("First word: {}", first_word(sentence));

    // Multiple lifetimes
    fn mix<'a, 'b>(x: &'a str, y: &'b str) -> &'a str {
        println!("y: {}", y);
        x
    }

    let a = "halo";
    let b = "dunia";
    let r = mix(a, b);
    println!("Result: {}", r);
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

---

## Key Concepts

### Lifetime Annotations
`'a` marks reference lifetimes. Ensures references are valid.

### Elision Rules
Compiler infers lifetimes for simple cases.

### Struct Lifetimes
Structs with reference fields need lifetime annotations.

### Static Lifetime
`'static` — lives for entire program duration.

### Multiple Lifetimes
Different lifetimes for different references.

---

## Experiments

- Create function with explicit lifetime annotation
- Try struct with reference field
- Experiment with lifetimes in methods
- Create function with multiple lifetime params
- Try breaking lifetime rules and observe errors

---

## Challenge

Build struct Document with title (String) and excerpt (&str). Methods: summary(), word_count(). Use lifetime annotations.

---

## Summary

Week 9 of 14: **Lifetimes** (Level: Intermediate). Ensuring reference safety. Next week: **Testing**.
