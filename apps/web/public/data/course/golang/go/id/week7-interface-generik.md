# Interface & Generik

> Go | Modul 7

## Tujuan Pembelajaran

- Mendefinisikan interface implisit
- Menggunakan interface sebagai parameter
- Menerapkan empty interface (any)
- Melakukan type assertion dan type switch
- Menggunakan generics (type parameters)

---

## Program: Polimorfisme

```go
package main

import "fmt"

// Interface definition — implemented implicitly
type Speaker interface {
    Speak() string
}

type Dog struct{ Name string }
func (d Dog) Speak() string { return "Woof! I'm " + d.Name }

type Cat struct{ Name string }
func (c Cat) Speak() string { return "Meow! I'm " + c.Name }

// Interface as parameter
func MakeSound(s Speaker) {
    fmt.Println(s.Speak())
}

// Empty interface (any)
func PrintAny(v any) {
    switch val := v.(type) {
    case int:
        fmt.Printf("Integer: %d\n", val)
    case string:
        fmt.Printf("String: %s\n", val)
    default:
        fmt.Printf("Unknown: %T - %v\n", val, val)
    }
}

// Generics
func First[T any](items []T) T {
    return items[0]
}

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

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

## Penjelasan

Interface di Go bersifat implisit — struct cukup implement method interface tanpa kata kunci `implements`. Interface kosong `any` bisa menampung tipe apapun. Type assertion `x.(T)` dan type switch untuk memeriksa tipe konkret. Generics (Go 1.18+) membuat fungsi dan tipe reusable dengan type parameters.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah fungsi baru dengan tipe return berbeda
- Ganti for loop dengan range
- Coba tipe data yang belum dicoba

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.

---

## Ringkasan

Modul 7 dari 16: **Interface & Generik**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **8. Pointer & Memory Model**.
