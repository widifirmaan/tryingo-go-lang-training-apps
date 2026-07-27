# Structs, Methods & Pointers

> Category: Go, Programming Language | Level: Beginner | Week 5

## Learning Objectives

- Define structs as custom data types
- Add methods with value vs pointer receivers
- Understand pointers (& and *)
- Use constructor functions
- Apply method chaining

---

## Program: Data Pengguna

```go
package main

import "fmt"

type User struct {
    ID       int
    Name     string
    Email    string
    IsActive bool
}

func NewUser(id int, name, email string) User {
    return User{ID: id, Name: name, Email: email, IsActive: true}
}

func (u User) Greet() string { return "Hello, I'm " + u.Name }
func (u *User) Deactivate() { u.IsActive = false }

type Counter struct{ Value int }
func (c *Counter) Add(n int) *Counter { c.Value += n; return c }

func main() {
    x := 42; p := &x
    fmt.Println("x:", x, "*p:", *p)
    *p = 21; fmt.Println("After *p=21, x:", x)

    u1 := NewUser(1, "Alice", "alice@example.com")
    fmt.Println(u1.Greet())
    fmt.Println("Active:", u1.IsActive)
    u1.Deactivate()
    fmt.Println("After deactivate:", u1.IsActive)

    c := &Counter{}
    c.Add(5).Add(10).Add(3)
    fmt.Println("Counter:", c.Value)
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Struct

`type User struct { ... }` -- groups related data. Like classes without inheritance.

### Methods

Functions with `receiver`: **value receiver** can't modify, **pointer receiver** can.

### Pointers

`&` creates pointer, `*` dereferences. Efficient and enables mutation.

### Method Chaining

Return `*Counter` to chain: `c.Add(5).Add(10)`.

---

## Experiments

Try modifying the code:

1. **Add field** -- add `Age int` to User struct
2. **New method** -- create `(u User) Info() string` for all fields
3. **Longer chain** -- add `.Add(7)` to chaining

---

## Challenge

Create `Product` struct (ID, Name, Price, Stock). Add `ApplyDiscount(percent)` method. Implement method chaining.

---

## Summary

Structs group data, methods add behavior. Pointer receivers enable mutation. Method chaining. Constructors (New...) are Go standard. Next week: interfaces and packages.
