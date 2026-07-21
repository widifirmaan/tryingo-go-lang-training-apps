# Exporting

## Exported vs Unexported
Go uses **capitalization** to control visibility.

| Convention | Visibility | Example |
|------------|------------|---------|
| Capital letter | Exported (public) | `Printf`, `User`, `GetName` |
| Lowercase letter | Unexported (private) | `printf`, `user`, `getName` |

## Exported Identifiers
```go
package user

// Exported types
type User struct {
    Name   string // Exported field
    age    int    // Unexported field
    Email  string // Exported field
}

// Exported function
func New(name string, age int) User {
    return User{Name: name, age: age}
}

// Unexported function
func validate(u User) bool {
    return u.Name != ""
}

// Exported method
func (u User) GetAge() int {
    return u.age // can access unexported fields internally
}
```

## Using Exported Identifiers

```go
package main

import "github.com/learn/app/user"

func main() {
    u := user.New("Alice", 30)
    fmt.Println(u.Name)      // OK: exported field
    fmt.Println(u.GetAge())  // OK: exported method
    // fmt.Println(u.age)    // ERROR: unexported field
    // user.validate(u)      // ERROR: unexported function
}
```

## Constructor Functions
Use exported constructors for types with unexported fields.

```go
package config

type Config struct {
    host string // unexported
    port int    // unexported
}

func New(host string, port int) Config {
    if host == "" {
        host = "localhost"
    }
    if port == 0 {
        port = 8080
    }
    return Config{host: host, port: port}
}

func (c Config) Addr() string {
    return fmt.Sprintf("%s:%d", c.host, c.port)
}
```

## Interface Exporting
```go
package store

// Exported interface
type Storer interface {
    Get(id string) (Item, error)
    Save(item Item) error
}

// Exported constructor returns interface
func NewMemoryStore() Storer {
    return &memoryStore{items: make(map[string]Item)}
}

// Unexported implementation
type memoryStore struct {
    items map[string]Item
}

func (s *memoryStore) Get(id string) (Item, error) {
    item, ok := s.items[id]
    if !ok { return Item{}, ErrNotFound }
    return item, nil
}

func (s *memoryStore) Save(item Item) error {
    s.items[item.ID] = item
    return nil
}
```

## Package Documentation
```go
// Package user provides types and functions for managing users.
//
// It handles user creation, validation, and serialization.
package user
```

## Exercises

1. **Bank Account**: Create a `bank` package with exported `Account` type but unexported `balance` field. Provide `Deposit`, `Withdraw`, `Balance` methods.

2. **API Client**: Build an `api` package with exported `Client` struct but unexported `httpClient` and `baseURL` fields.

3. **Logger Package**: Create a `logger` package with exported `Info`, `Warn`, `Error` functions and unexported configuration.

4. **Factory Pattern**: Implement exported `NewXxx` constructors for types with unexported fields (e.g., `NewServer`, `NewCache`).
