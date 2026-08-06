# Macros

> **Kategori:** Rust | **Level:** Lanjutan | **Minggu 13:** Macros

## Tujuan Pembelajaran

- macro_rules! untuk declarative macro
- Pattern matching pada macro: $expr, $ident, $ty
- Repetition: $(...)* untuk handle multiple argumen
- Custom derive macro (konseptual)
- Macro built-in: format!, println!, vec!, include_str!

---

## Program: Metaprogramming

```rust
// Declarative macro (macro_rules!)
macro_rules! say_hello {
    () => {
        println!("Halo dari macro!");
    };
}

macro_rules! create_function {
    ($func_name:ident) => {
        fn $func_name() {
            println!("Fungsi {} dipanggil", stringify!($func_name));
        }
    };
}

macro_rules! calculate {
    ($a:expr + $b:expr) => {
        $a + $b
    };
    ($a:expr * $b:expr) => {
        $a * $b
    };
}

// Vec! macro
macro_rules! my_vec {
    ($($x:expr),*) => {
        {
            let mut temp_vec = Vec::new();
            $(temp_vec.push($x);)*
            temp_vec
        }
    };
}

// Custom derive (konseptual)
// #[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl std::fmt::Debug for Point {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Point {{ x: {}, y: {} }}", self.x, self.y)
    }
}

fn main() {
    // Panggil macro
    say_hello!();

    // Macro buat fungsi
    create_function!(foo);
    foo();

    // Calculate macro
    let sum = calculate!(5 + 3);
    let product = calculate!(4 * 7);
    println!("5 + 3 = {}", sum);
    println!("4 * 7 = {}", product);

    // Vec macro
    let v = my_vec![1, 2, 3, 4, 5];
    println!("my_vec: {:?}", v);

    // Debug
    let p = Point { x: 10, y: 20 };
    println!("{:?}", p);

    // format! macro
    let s = format!("x={}, y={}", p.x, p.y);
    println!("format!: {}", s);

    // println! dan print!
    println!("println! dengan {} argumen", 2);
    print!("print! tanpa newline");
    println!();

    // stringify! dan concat!
    let ident = stringify!(hello_world);
    println!("stringify!: {}", ident);

    // include_str! (konseptual)
    // let content = include_str!("file.txt");
}
```

---

## Konsep Kunci

### Declarative Macro
`macro_rules!` — pattern matching untuk generate kode.

### Fragment Specifier
`$expr:expr` expression, `$ident:ident` identifier, `$ty:ty` type.

### Repetition
`$(...),*` — ulangi pattern, dipisahkan koma.

### Custom Derive
`#[derive(Debug)]` — auto-generate trait implementation.

### Built-in Macro
`format!`, `println!`, `vec!`, `include_str!` — macro standar Rust.

---

## Eksperimen

- Buat macro untuk generate struct
- Eksperimen dengan macro untuk DSL
- Coba macro dengan multiple pattern arms
- Buat macro untuk generate test
- Eksperimen dengan macro untuk logging

---

## Tantangan

Buat macro untuk generate builder pattern: builder_struct!(Name, field1: Type1, field2: Type2). Generate struct + impl + build method.

---

## Ringkasan

Minggu 13 dari 14: **Macros** (Level: Lanjutan). Metaprogramming di Rust. Minggu depan: **Capstone Project**!
