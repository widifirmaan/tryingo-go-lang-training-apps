# Setup, Toolchain & Basic Syntax

> **Kategori:** Go | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Basic Syntax

## Why This Matters

Go powers Docker, Kubernetes, and many high-traffic backends (Gojek, Tokopedia ship Go services). The language is small and honest: few keywords, strong focus on concurrency, and fast programs that deploy as a single binary.

Practice program: *"Hello, Go!"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand Go as a compiled backend language (roadmap.sh phase 1)
- Install Go and write your first program (Go Tour: Basics)
- Learn the toolchain: go run, build, fmt, test, vet (Effective Go)
- Understand .go file structure: package, import, func main (Go Tour)
- Use fmt.Println, fmt.Printf with format verbs %v, %s, %d, %T


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Go Toolchain (1.23+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install GoLang.Go
```

**macOS (Terminal / Homebrew):**
```bash
brew install go
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install golang-go
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
go version
```

Expected output:
```output
go version go1.23.x ...
```

> **Prerequisite Note:** Open a fresh terminal window after installation so the Go binary path is recognized.

---

### 2. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-go-app && cd my-go-app
go mod init my-go-app
touch main.go
```
- **Details:** Generates go.mod for official dependency tracking and module declaration.
- **Navigate to the project directory:**
```bash
cd my-go-app
```

---

### 3. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
go run main.go
```
Open in browser or terminal: `Terminal / http://localhost:8080 (jika HTTP server)`

> ℹ️ `go run` compiles and runs your program in memory instantly.

**Initial Entry File (`main.go`):**
```go
package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"active","time":"%s","runtime":"Go 1.23"}`, time.Now().Format(time.RFC3339))
	})

	port := ":8080"
	fmt.Printf("Server Go aktif di http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error server: %v\n", err)
	}
}
```
Native Go HTTP server with zero third-party dependencies.

---

### 4. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-go-app/
├── cmd/
│   └── api/
│       └── main.go      # Titik masuk aplikasi
├── internal/            # Kode internal privat yang aman
│   ├── handler/         # HTTP handlers
│   └── service/         # Logika domain
├── go.mod               # Definisi modul & versi Go
└── go.sum               # Hash checksum dependensi
```
Standard Go Project Layout recommended by the ecosystem.

---

### 5. Beginner Tips & Best Practices
- Use `go build` to generate a single self-contained binary ready for zero-dependency deployment.
- Run `go fmt ./...` before committing to adhere to official Go formatting standards.

---

## Program: Hello, Go!

```go
package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    fmt.Printf("Nama: %s\n", nama)
    fmt.Printf("Versi: %.2f\n", versi)
    fmt.Printf("Aktif: %t\n", aktif)
    fmt.Printf("Tipe: %T %T %T\n", nama, versi, aktif)
}
```

---

## Key Concepts

### Go's Role\nGo is a compiled, statically typed language by Google. Compiles directly to machine binary - fast execution, easy distribution.\n\n### Main Toolchain\n`go run`, `go build`, `go fmt`, `go test`, `go vet`\n\n### File Structure\n`package`, `import`, `func main()` entry point.\n\n### Format Verbs\n`%s` string, `%d` int, `%f` float, `%t` bool, `%T` type, `%v` default.

---

## Experiments

- Change variable values and observe
- Add a new function with different return types
- Replace for loops with range
- Try data types you haven't used
- Build a small program combining 2-3 concepts

---

## Challenge

Build a program applying this week's concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.

---

## Summary

Week 1 of 13: **Setup, Toolchain & Basic Syntax** (Level: Beginner). Go delivers high performance with simple syntax. Next week: **Variables, Types & Control Flow**.
