# Interface & Generics

> **Kategori:** Go | **Level:** Menengah | **Minggu 6:** Interface & Generics

## Tujuan Pembelajaran

- Interface implisit — struct implement tanpa kata kunci implements
- Interface sebagai parameter polimorfik (Go Tour: Interfaces)
- Type assertion x.(T) dan type switch untuk cek tipe konkret
- Generics Go 1.18+: type parameters [T any], constraints
- Empty interface any / interface{} untuk tipe apapun

---

## Program: Polimorfisme

```go
package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Dog struct{ Name string }
func (d Dog) Speak() string { return "Woof! I'm " + d.Name }

type Cat struct{ Name string }
func (c Cat) Speak() string { return "Meow! I'm " + c.Name }

func MakeSound(s Speaker) {
    fmt.Println(s.Speak())
}

func PrintAny(v any) {
    switch val := v.(type) {
    case int: fmt.Printf("Integer: %d\n", val)
    case string: fmt.Printf("String: %s\n", val)
    default: fmt.Printf("Unknown: %T - %v\n", val, val)
    }
}

func First[T any](items []T) T {
    return items[0]
}

type Stack[T any] struct { items []T }
func (s *Stack[T]) Push(item T) { s.items = append(s.items, item) }

func main() {
    MakeSound(Dog{"Buddy"})
    MakeSound(Cat{"Kitty"})

    PrintAny(42)
    PrintAny("hello")
    PrintAny(3.14)

    fmt.Println("First int:", First([]int{10, 20, 30}))
    fmt.Println("First string:", First([]string{"a", "b"}))

    stack := Stack[string]{}
    stack.Push("Go")
    stack.Push("Rust")
    fmt.Println("Stack:", stack.items)
}
```

---

## Konsep Kunci

### Interface Implisit
Tidak perlu `implement` — struct otomatis memenuhi jika punya methodnya.

### Type Assertion & Switch
`x.(T)` dan `switch v := x.(type)`.

### Generics
`[T any]` type parameter. Constraints: `comparable`, `ordered`.

---

## Eksperimen

- Buat interface Shape dengan method Area() — implement Circle, Rectangle
- Coba type assertion dengan ok idiom: v, ok := x.(T)
- Buat generic function Min[T constraints.Ordered]
- Buat generic Map function: Map[T, U]([]T, func(T) U) []U

---

## Tantangan

Buat sistem pembayaran: interface PaymentMethod (ProcessPayment), implement CreditCard, PayPal, BankTransfer. Gunakan generics untuk repository.

---

## Ringkasan

Minggu 6 dari 13: **Interface & Generics** (Level: Menengah). Go bukan OOP klasik — ini kekuatan utamanya. Minggu depan: **Pointer, Memory & Package**.
