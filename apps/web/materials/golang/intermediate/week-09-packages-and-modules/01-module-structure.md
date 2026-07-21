# Module Structure

## What is a Module?
A module is a collection of Go packages with a `go.mod` file defining the module path and dependencies.

## Initializing a Module

```bash
go mod init github.com/username/myproject
```

This creates `go.mod`:

```
module github.com/username/myproject

go 1.22
```

## Recommended Project Layout

```
myproject/
├── cmd/
│   ├── app/
│   │   └── main.go
│   └── cli/
│       └── main.go
├── internal/
│   ├── database/
│   │   └── db.go
│   └── auth/
│       └── auth.go
├── pkg/
│   ├── api/
│   │   └── handler.go
│   └── models/
│       └── user.go
├── go.mod
└── go.sum
```

## Directory Conventions

| Directory | Purpose | Import Visibility |
|-----------|---------|-------------------|
| `cmd/` | Entry points (main packages) | Executable binaries |
| `internal/` | Private packages | Only parent module |
| `pkg/` | Shared library code | External consumption |
| `api/` | API definitions | Protocol buffers, specs |
| `config/` | Configuration | Internal configuration |

## Package Declaration
Every Go file starts with a `package` declaration.

```go
// cmd/app/main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

## Importing Packages

```go
// pkg/api/handler.go
package api

import (
    "fmt"
    "net/http"

    "github.com/username/myproject/pkg/models"
)
```

## The `main` Package
The `main` package produces an executable. It must have a `main()` function.

```go
package main

import (
    "flag"
    "log"

    "github.com/username/myproject/internal/database"
)

func main() {
    port := flag.Int("port", 8080, "server port")
    flag.Parse()

    db := database.Connect()
    log.Printf("Starting server on port %d", *port)
    // ...
}
```

## Package Naming

| Convention | Good | Bad |
|------------|------|-----|
| Lowercase only | `http` | `HTTP` |
| Short and clear | `strutil` | `stringutility` |
| No underscores | `base64` | `base_64` |
| No stuttering | `client` | `httpclient` (within `http` package) |

## Exercises

1. **Init Project**: Create a module `github.com/learn/calculator` with `cmd/calc/main.go`.

2. **Split Package**: Move math functions into `internal/math/math.go` and call from `main`.

3. **Multi-Binary**: Create two `cmd/` binaries: `server` and `worker` sharing internal packages.

4. **Module Rename**: Initialize a module, then rename the module path and update all imports.
