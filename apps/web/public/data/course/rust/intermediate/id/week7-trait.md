# Trait

> **Kategori:** Rust | **Level:** Menengah | **Minggu 7:** Trait

## Tujuan Pembelajaran

- Trait: definisi interface/behavior yang bisa diimplement struct
- impl Trait for Struct: implementasi trait pada tipe
- Trait bound: <T: Speak> untuk generic constraint
- Dynamic dispatch: &dyn Trait dan Box<dyn Trait>
- Default method implementation pada trait

---

## Program: Polimorfisme

```rust
trait Speak {
    fn speak(&self) -> String;
    fn name(&self) -> &str;
}

struct Dog {
    name: String,
}

impl Speak for Dog {
    fn speak(&self) -> String {
        format!("Woof! I'm {}", self.name)
    }
    fn name(&self) -> &str {
        &self.name
    }
}

struct Cat {
    name: String,
}

impl Speak for Cat {
    fn speak(&self) -> String {
        format!("Meow! I'm {}", self.name)
    }
    fn name(&self) -> &str {
        &self.name
    }
}

fn make_sound(s: &dyn Speak) {
    println!("{}", s.speak());
}

// Trait bound
fn announce<T: Speak>(item: &T) {
    println!("{} says: {}", item.name(), item.speak());
}

// Multiple trait bounds
fn describe(item: &dyn Speak) {
    println!("{}: {}", item.name(), item.speak());
}

// Trait sebagai return type
fn get_speaker(name: &str, is_dog: bool) -> Box<dyn Speak> {
    if is_dog {
        Box::new(Dog { name: name.to_string() })
    } else {
        Box::new(Cat { name: name.to_string() })
    }
}

fn main() {
    let dog = Dog { name: "Buddy".to_string() };
    let cat = Cat { name: "Kitty".to_string() };

    make_sound(&dog);
    make_sound(&cat);

    announce(&dog);
    announce(&cat);

    // Dynamic dispatch
    let speakers: Vec<Box<dyn Speak>> = vec![
        get_speaker("Rex", true),
        get_speaker("Whiskers", false),
    ];

    for s in &speakers {
        describe(s);
    }

    // Default method
    trait Greet {
        fn name(&self) -> &str;
        fn greet(&self) -> String {
            format!("Hello, I'm {}", self.name())
        }
    }

    struct Person { name: String }
    impl Greet for Person {
        fn name(&self) -> &str { &self.name }
    }

    let person = Person { name: "Budi".to_string() };
    println!("{}", person.greet());
}
```

---

## Konsep Kunci

### Trait
Definisi method yang harus diimplement struct. Mirip interface di bahasa lain.

### impl Trait
`impl Speak for Dog { fn speak(&self) }` — implement trait untuk tipe.

### Trait Bound
`fn announce<T: Speak>(item: &T)` — generic dengan constraint.

### Dynamic Dispatch
`&dyn Speak` — runtime polymorphism. `Box<dyn Speak>` — heap allocation.

### Default Method
Trait bisa punya default implementation. Struct bisa override.

---

## Eksperimen

- Buat trait Shape dengan method area() — implement Circle, Rectangle
- Coba multiple trait bounds: T: Speak + Clone
- Buat trait dengan associated type
- Eksperimen dengan trait object di Vec
- Buat trait inheritance (supertrait)

---

## Tantangan

Buat sistem pembayaran: trait PaymentMethod (process_payment), implement CreditCard, PayPal, BankTransfer. Gunakan trait bound untuk repository.

---

## Ringkasan

Minggu 7 dari 14: **Trait** (Level: Menengah). Polimorfisme di Rust. Minggu depan: **Generics**.
