# Capstone: CLI + Library

> **Kategori:** Rust | **Level:** Advanced | **Minggu 14:** Capstone: CLI + Library

## Learning Objectives

- Combine all concepts: structs, enums, traits, generics, error handling
- Repository pattern: separate data access and business logic
- CLI with argument parsing
- Search and filter with iterators
- Testing: unit tests, integration tests

---

## Program: Note Manager

```rust
use std::fmt;

#[derive(Debug, Clone)]
struct Note {
    id: u32,
    title: String,
    content: String,
}

impl fmt::Display for Note {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}. {}
   {}", self.id, self.title, self.content)
    }
}

struct NoteManager {
    notes: Vec<Note>,
    next_id: u32,
}

impl NoteManager {
    fn new() -> Self {
        NoteManager { notes: Vec::new(), next_id: 1 }
    }

    fn add(&mut self, title: &str, content: &str) -> Note {
        let note = Note {
            id: self.next_id,
            title: title.to_string(),
            content: content.to_string(),
        };
        self.next_id += 1;
        self.notes.push(note.clone());
        note
    }

    fn get(&self, id: u32) -> Option<&Note> {
        self.notes.iter().find(|n| n.id == id)
    }

    fn delete(&mut self, id: u32) -> bool {
        if let Some(pos) = self.notes.iter().position(|n| n.id == id) {
            self.notes.remove(pos);
            true
        } else {
            false
        }
    }

    fn list(&self) -> &[Note] {
        &self.notes
    }

    fn search(&self, query: &str) -> Vec<&Note> {
        self.notes
            .iter()
            .filter(|n| n.title.contains(query) || n.content.contains(query))
            .collect()
    }
}

fn main() {
    let mut nm = NoteManager::new();

    nm.add("Belajar Rust", "Ownership, borrowing, lifetimes");
    nm.add("Trait & Generics", "Polimorfisme dan reusable code");
    nm.add("Concurrency", "Thread, channel, Arc<Mutex<T>>");

    println!("=== Daftar Catatan ===");
    for note in nm.list() {
        println!("{}", note);
    }

    println!("
=== Cari: 'Rust' ===");
    for note in nm.search("Rust") {
        println!("{}", note);
    }

    println!("
=== Get ID 2 ===");
    if let Some(note) = nm.get(2) {
        println!("{}", note);
    }

    println!("
=== Delete ID 1 ===");
    if nm.delete(1) {
        println!("Catatan 1 dihapus");
    }

    println!("
=== Daftar Akhir ===");
    for note in nm.list() {
        println!("{}", note);
    }

    println!("
=== CLI Simulation ===");
    println!("cargo run -- add 'Judul Baru' 'Konten'");
    println!("cargo run -- list");
    println!("cargo run -- search 'query'");
    println!("cargo run -- delete 1");
}
```

---

## Key Concepts

### Repository Pattern
Separate data access from business logic.

### Iterators & Filter
Search with iterator combinators.

### CLI
Argument parsing with std::env::args().

### Testing
Unit, integration, and doc tests.

### Error Handling
Result, Option, custom errors.

---

## Experiments

- Add update method for NoteManager
- Implement save/load from JSON file
- Create CLI with clap crate
- Add unit tests for all methods
- Implement error handling with custom errors

---

## Challenge

Build a complete capstone application: CLI + library + JSON storage + testing. Choose domain: Task Manager, Blog, or Inventory.

---

## Summary

Week 14 of 14: **Capstone: CLI + Library** (Level: Advanced). Complete! 🎉 You've mastered Rust from scratch to production-ready.
