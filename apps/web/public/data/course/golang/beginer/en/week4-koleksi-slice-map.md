# Collections: Slices, Maps & Strings

> **Kategori:** Go | **Level:** Beginner | **Minggu 4:** Collections: Slices, Maps & Strings

## Learning Objectives

- Distinguish fixed-size arrays [N]T vs dynamic slices []T
- Use append, make, len, cap for slice manipulation
- Maps: map[string]int with ok idiom for existence checks
- String manipulation: TrimSpace, ReplaceAll, Fields, Split
- Iterate with range over slices, maps, and strings

---

## Program: Data Manager

```go
package main

import "fmt"

func main() {
    fruits := []string{"apel", "mangga", "pisang"}
    fruits = append(fruits, "jeruk")
    fmt.Println("Slice:", fruits)
    fmt.Printf("Len: %d, Cap: %d\n", len(fruits), cap(fruits))

    angka := []int{10, 20, 30, 40, 50}
    sub := angka[1:4]
    fmt.Println("Sub-slice [1:4]:", sub)

    ages := make(map[string]int)
    ages["Budi"] = 25
    ages["Siti"] = 23

    val, ok := ages["Budi"]
    if ok {
        fmt.Printf("Umur Budi: %d\n", val)
    }

    delete(ages, "Siti")

    text := "  Go Programming Language  "
    fmt.Println("Trimmed:", len(text), "->", len(text))
    fmt.Println("Fields:", len(text))

    fmt.Println("\n=== Range ===")
    for i, v := range fruits {
        fmt.Printf("%d: %s\n", i, v)
    }
    for key, val := range ages {
        fmt.Printf("%s -> %d\n", key, val)
    }
}
```

---

## Key Concepts

### Slice vs Array
Array fixed, slice dynamic. `append`, `make`, `len`, `cap`.

### Maps
`map[string]int` with ok idiom.

### Strings & Range
String methods and range iteration.

---

## Experiments

- Create 2D slice (matrix) and iterate with nested range
- Add and remove multiple keys in map
- Try strings.HasPrefix, HasSuffix, Contains
- Sort slice with sort.Strings

---

## Challenge

Build an inventory program: add/remove products (map), list products (slice), search products (range + if).

---

## Summary

Week 4 of 13: **Collections: Slices, Maps & Strings** (Level: Beginner). Daily data structures in Go. Next week: **Structs & Methods**.
