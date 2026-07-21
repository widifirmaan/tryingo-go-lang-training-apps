# Go Modules & Packages

## Overview

Go Modules are the standard dependency management system introduced in Go 1.11. A module is a collection of Go packages with a shared `go.mod` file that tracks dependencies and versions.

## Initializing a Module

```bash
mkdir myproject
cd myproject
go mod init myproject
```

This creates a `go.mod` file:

```
module myproject

go 1.23
```

The module name becomes the import path prefix for all packages inside the module.

## Understanding go.mod

Every module has a `go.mod` file at its root. It contains:

- **module path** — the import path prefix
- **Go version** — the language version used
- **dependencies** — external packages and their versions

Example with a dependency:

```
module myproject

go 1.23

require (
    github.com/google/uuid v1.6.0
)
```

## Adding Dependencies

Use `go get` to add a package:

```bash
go get github.com/google/uuid
```

This downloads the package and updates `go.mod` and creates a `go.sum` file (checksums for verification).

## Using an External Package

Create `main.go`:

```go
package main

import (
    "fmt"
    "github.com/google/uuid"
)

func main() {
    id := uuid.New()
    fmt.Println("Generated UUID:", id)
}
```

Run it:

```bash
go run main.go
```

## Cleaning Up Dependencies

Remove unused dependencies:

```bash
go mod tidy
```

This removes any entries in `go.mod` that are no longer needed and adds any missing ones.

## Organizing Code with Packages

Inside a module, you can create subdirectories as separate packages.

```
myproject/
├── go.mod
├── main.go
└── greeter/
    └── greeter.go
```

`greeter/greeter.go`:

```go
package greeter

import "fmt"

func Hello(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}
```

`main.go`:

```go
package main

import (
    "fmt"
    "myproject/greeter"
)

func main() {
    msg := greeter.Hello("Alice")
    fmt.Println(msg)
}
```

> Notice: exported names start with an uppercase letter (`Hello`, not `hello`).

## go.mod vs go.sum

| File | Purpose |
|------|---------|
| `go.mod` | Declares module identity and direct dependencies |
| `go.sum` | Cryptographic checksums for all dependencies (verification) |

## Common Commands

| Command | Description |
|---------|-------------|
| `go mod init <name>` | Create a new module |
| `go get <pkg>` | Add or update a dependency |
| `go mod tidy` | Clean up go.mod (remove unused, add missing) |
| `go mod verify` | Verify checksums in go.sum |
| `go list -m all` | List all module dependencies |

## Practice

1. Create a new directory, run `go mod init` with a name of your choice
2. Write a program that uses `golang.org/x/example/stringutil` — run `go get` to install it
3. Call `stringutil.Reverse("hello")` and print the result
4. Run `go mod tidy` and examine the `go.mod` file
5. Create a second package `mathutil` with an `Add(a, b int) int` function and use it from `main`
