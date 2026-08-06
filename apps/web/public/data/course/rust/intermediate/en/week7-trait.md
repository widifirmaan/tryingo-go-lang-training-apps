# Traits

> **Kategori:** Rust | **Level:** Intermediate | **Minggu 7:** Traits

## Learning Objectives

- Traits: define interfaces/behaviors that structs can implement
- impl Trait for Struct: implement trait on types
- Trait bounds: <T: Trait> for generic constraints
- Dynamic dispatch: &dyn Trait and Box<dyn Trait>
- Default method implementations on traits

---

## Program: Polymorphism

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

## Key Concepts

### Traits
Define methods that structs must implement. Like interfaces.

### impl Trait
Implement traits for specific types.

### Trait Bounds
Generic functions with trait constraints.

### Dynamic Dispatch
Runtime polymorphism with &dyn Trait and Box<dyn Trait>.

### Default Methods
Traits can provide default implementations.

---

## Experiments

- Create Shape trait with area() — implement Circle, Rectangle
- Try multiple trait bounds: T: Trait1 + Trait2
- Create trait with associated types
- Experiment with trait objects in Vec
- Create trait inheritance (supertraits)

---

## Challenge

Build a payment system: trait PaymentMethod (process_payment), implement CreditCard, PayPal, BankTransfer. Use trait bounds for repository.

---

## Summary

Week 7 of 14: **Traits** (Level: Intermediate). Polymorphism in Rust. Next week: **Generics**.
