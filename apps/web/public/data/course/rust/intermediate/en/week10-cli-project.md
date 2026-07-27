# CLI Project: Command-Line Tool

> Category: Rust, Programming Language | Level: Intermediate | Week 10

## Learning Objectives

- Read command-line arguments with std::env::args
- Read files with std::fs::read_to_string
- Write output to stdout and stderr
- Handle errors with ? operator in real applications
- Build a simple grep-like tool

---

## Program: CLI App

```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let command = args.get(1).map(|s| s.as_str()).unwrap_or("help");

    match command {
        "grep" => cmd_grep(args.get(2)),
        "hello" => cmd_hello(args.get(2)),
        _ => help(),
    }
}

fn help() {
    eprintln!("Usage: cli <command> [args]");
    eprintln!("Commands:");
    eprintln!("  grep <pattern> - Search text in content (simulated)");
    eprintln!("  hello <name>   - Greet the user");
}

fn cmd_grep(pattern: Option<&String>) {
    let pattern = pattern.map(|s| s.as_str()).unwrap_or("Rust");
    let content = "Rust is a systems programming language.
Learning Rust is fun.
Go is also a good language.";

    for (i, line) in content.lines().enumerate() {
        if line.contains(pattern) {
            println!("{}: {}", i + 1, line);
        }
    }
}

fn cmd_hello(name: Option<&String>) {
    let name = name.map(|s| s.as_str()).unwrap_or("World");
    println!("Hello, {}! Welcome to Rust CLI!", name);
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Command-Line Arguments

`env::args()` returns an iterator. `args[0]` is the program name. `match` for command routing. A common Rust CLI pattern.

### File I/O (Simulated)

`fs::read_to_string` reads a file. `? operator` for error propagation. In this code, content is hardcoded for demonstration.

### Stderr

`eprintln!` prints to stderr — for error messages and usage. `println!` to stdout for normal output.

---

## Experiments

Try modifying the code:

1. **New command** — add an `upper <text>` command that prints uppercase text
2. **Grep pattern** — try grep with pattern "Go" or "learning"
3. **Error handling** — add empty argument validation

---

## Challenge

Build a simple CLI app with commands: `add <a> <b>` (sum two numbers) and `greet <name>` (greet someone). Handle errors if arguments are missing. Simulate file reading with hardcoded content.

---

## Summary

CLI apps with env::args, match for command routing, eprintln! for errors, println! for output. Error handling with ? for real applications. Modular structure with separate functions per command. Next week: smart pointers: Box, Rc, RefCell.
