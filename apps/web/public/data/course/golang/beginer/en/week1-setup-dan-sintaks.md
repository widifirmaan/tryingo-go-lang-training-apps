# Setup, Toolchain & Basic Syntax

> **Kategori:** Go | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Basic Syntax

## Learning Objectives

- Understand Go as a compiled backend language (roadmap.sh phase 1)
- Install Go and write your first program (Go Tour: Basics)
- Learn the toolchain: go run, build, fmt, test, vet (Effective Go)
- Understand .go file structure: package, import, func main (Go Tour)
- Use fmt.Println, fmt.Printf with format verbs %v, %s, %d, %T

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Go for Visual Studio Code** (`golang.go`): Official Go extension: gopls intellisense, delve debugger, and gofmt

Or install all recommended extensions at once via terminal:
```bash
code --install-extension golang.go
```

---

### 2. Runtime & Dependency Installation (Go Toolchain (1.23+))
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

> 💡 **Prerequisite Note:** Open a fresh terminal window after installation so the Go binary path is recognized.

---

### 3. Initializing a Blank Project (Scaffolding)
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

### 4. Running the Local Dev Server & First Entry File
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
	fmt.Printf("🚀 Server Go aktif di http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error server: %v\n", err)
	}
}
```
Native Go HTTP server with zero third-party dependencies.

---

### 5. New Project Directory Structure
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

### 6. Beginner Tips & Best Practices
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

### Go's Role\nGo is a compiled, statically typed language by Google. Compiles directly to machine binary — fast execution, easy distribution.\n\n### Main Toolchain\n`go run`, `go build`, `go fmt`, `go test`, `go vet`\n\n### File Structure\n`package`, `import`, `func main()` entry point.\n\n### Format Verbs\n`%s` string, `%d` int, `%f` float, `%t` bool, `%T` type, `%v` default.

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
