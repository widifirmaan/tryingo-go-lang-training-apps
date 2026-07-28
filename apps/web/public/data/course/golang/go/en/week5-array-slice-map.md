# Arrays, Slices & Maps

> Go | Module 5

## Learning Objectives

- Distinguish fixed arrays vs dynamic slices
- Use append, make, len, cap
- Manipulate maps with the ok idiom
- Iterate with range
- Perform slicing and copy

---

## Program: Data Manager

```go
package main

import "fmt"

func main() {
    // Array (fixed size)
    var arr [3]int = [3]int{1, 2, 3}
    fmt.Println("Array:", arr)

    // Slice (dynamic)
    fruits := []string{"apel", "mangga", "pisang"}
    fruits = append(fruits, "jeruk")
    fmt.Println("Slice:", fruits)
    fmt.Printf("Len: %d, Cap: %d\n", len(fruits), cap(fruits))

    // Make slice
    scores := make([]int, 3, 5)
    scores[0] = 85
    scores[1] = 90
    scores[2] = 78
    fmt.Println("Scores:", scores)

    // Slicing
    angka := []int{10, 20, 30, 40, 50}
    sub := angka[1:4]
    fmt.Println("Sub-slice [1:4]:", sub)

    // Map
    ages := make(map[string]int)
    ages["Budi"] = 25
    ages["Siti"] = 23

    // ok idiom
    val, ok := ages["Budi"]
    if ok {
        fmt.Printf("Umur Budi: %d\n", val)
    }

    // Delete
    delete(ages, "Siti")

    // Range
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

## Explanation

Arrays: `[3]int` — fixed size, rarely used directly. Slices: `[]int` — dynamic, Go's backbone. `append` to add, `make` to allocate. Maps: `map[string]int` — key-value, with ok idiom for existence check. `range` for iterating slices, maps, channels.

---

## Experiments

- Change variable values and observe the changes
- Add a new function with different return types
- Replace for loops with range
- Try data types you haven't used yet

---

## Challenge

Build a program applying this week's concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.

---

## Summary

Module 5 of 16: **Arrays, Slices & Maps**. Go delivers high performance with simple syntax. Next week: **Structs & Methods**.
