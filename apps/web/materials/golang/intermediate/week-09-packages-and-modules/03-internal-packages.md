# Internal Packages

## The `internal` Package Convention
The `internal` directory restricts package import to the parent module tree.

```
myproject/
├── internal/
│   ├── database/
│   │   └── db.go
│   └── auth/
│       └── token.go
├── cmd/
│   └── server/
│       └── main.go
└── go.mod  (module: github.com/user/myproject)
```

## How It Works
Packages inside `internal/` can only be imported by code rooted at the parent of `internal`.

```go
// cmd/server/main.go — OK (same module)
import "github.com/user/myproject/internal/database"

// external project — ERROR
import "github.com/user/myproject/internal/database"
// use of internal package github.com/user/myproject/internal/database not allowed
```

## Rules of Internal

```
root/
├── internal/
│   └── foo/
│       └── foo.go
├── bar/        → can import internal/foo (same tree)
├── cmd/baz/    → can import internal/foo (same tree)
└── (external)  → cannot import internal/foo
```

## When to Use Internal

| Use Case | Example |
|----------|---------|
| Shared helpers | `internal/database` connection helpers |
| Implementation details | `internal/auth` token generation |
| Preventing external coupling | `internal/config` application settings |
| Testing utilities | `internal/testutil` test helpers |

## Example Structure

```go
// internal/database/db.go
package database

import "database/sql"

var db *sql.DB

func Connect(dsn string) error {
    var err error
    db, err = sql.Open("postgres", dsn)
    return err
}

func Ping() error {
    return db.Ping()
}
```

```go
// internal/auth/token.go
package auth

import (
    "crypto/rand"
    "encoding/hex"
)

func GenerateToken() (string, error) {
    b := make([]byte, 32)
    _, err := rand.Read(b)
    if err != nil {
        return "", err
    }
    return hex.EncodeToString(b), nil
}
```

```go
// cmd/server/main.go
package main

import (
    "github.com/user/myproject/internal/database"
    "github.com/user/myproject/internal/auth"
)

func main() {
    database.Connect("postgres://localhost:5432/db")
    token, _ := auth.GenerateToken()
    fmt.Println(token)
}
```

## Nested Internal Directories
Multiple `internal` directories can exist at different levels.

```
project/
├── internal/          ← level 1
│   └── helpers/
├── pkg/
│   ├── internal/      ← level 2 (restricted to pkg/ subtree)
│   │   └── helpers/
│   └── api/
└── cmd/
```

## Exercises

1. **Web Server Internal**: Create a web server with `internal/handler`, `internal/middleware`, `internal/router` packages.

2. **CLI Tool**: Build a CLI with `internal/command`, `internal/config`, `internal/executor`.

3. **Test Utilities**: Create `internal/testhelper` with mock database and HTTP server utilities.

4. **Library + Application**: Structure a project with `internal/` containing shared code between `cmd/server` and `cmd/worker`.
