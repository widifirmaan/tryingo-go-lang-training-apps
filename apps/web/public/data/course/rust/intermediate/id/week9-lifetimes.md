# Lifetimes

> **Kategori:** Rust | **Level:** Menengah | **Minggu 9:** Lifetimes

## Tujuan Pembelajaran

- Lifetime annotation: 'a untuk menandai umur reference
- Compiler infer lifetime dengan lifetime elision rules
- Lifetime pada struct: struct yang menyimpan reference
- Static lifetime: 'static untuk string literal dan global data
- Multiple lifetime: 'a, 'b untuk reference dengan umur berbeda

---

## Program: Validasi Referensi

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

## Konsep Kunci

### Lifetime Annotation
`'a` menandai bahwa reference hidup setidaknya selama 'a. `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str`.

### Elision Rules
Compiler bisa infer lifetime jika: 1 param input, atau 1 param + &self.

### Struct Lifetime
Struct yang punya reference field perlu lifetime annotation.

### Static Lifetime
`'static` — hidup selama program berjalan. String literal selalu 'static.

### Multiple Lifetimes
`fn mix<'a, 'b>(x: &'a str, y: &'b str)` — dua lifetime berbeda.

---

## Eksperimen

- Buat fungsi dengan explicit lifetime annotation
- Coba struct dengan reference field
- Eksperimen dengan lifetime di method
- Buat fungsi dengan multiple lifetime params
- Coba break lifetime rules dan lihat error

---

## Tantangan

Buat struct Document dengan title (String) dan excerpt (&str). Method: summary(), word_count(). Gunakan lifetime annotation.

---

## Ringkasan

Minggu 9 dari 14: **Lifetimes** (Level: Menengah). Memastikan reference aman. Minggu depan: **Testing**.
