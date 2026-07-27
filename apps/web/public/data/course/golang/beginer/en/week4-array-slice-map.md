# Arrays, Slices & Maps

> Category: Go, Programming Language | Level: Beginner | Week 4

## Learning Objectives

- Distinguish arrays (fixed) vs slices (dynamic)
- Use append, make, len, cap on slices
- Create and manipulate maps
- Iterate with range
- Understand slice operations

---

## Program: Manajemen Koleksi

```go
package main

import "fmt"

func main() {
    var days [5]string
    days[0] = "Monday"; days[1] = "Tuesday"
    fmt.Println("Array:", days)

    fruits := []string{"apple", "mango", "banana"}
    fruits = append(fruits, "orange", "grape")
    fmt.Println("Slice:", fruits)
    fmt.Println("Len:", len(fruits), "Cap:", cap(fruits))
    fmt.Println("Fruits[1:3]:", fruits[1:3])

    scores := map[string]int{"Alice": 90, "Bob": 78, "Eve": 85}
    fmt.Println("Scores:")
    for name, s := range scores { fmt.Printf("  %s: %d\n", name, s) }
    if s, ok := scores["Alice"]; ok { fmt.Println("Alice score:", s) }
    delete(scores, "Bob")

    fmt.Print("Fruits: ")
    for i, f := range fruits { fmt.Printf("%d:%s ", i, f) }
    fmt.Println()
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Array vs Slice

**Array**: fixed size. **Slice**: dynamic, more common. Supports `append`, `len`, `cap`.

**Slicing**: `fruits[1:3]` -- elements at index 1 through 2.

### Map

Key-value collection. `map[string]int`. Check: `score, ok := map["key"]`.

### Range

`for i, v := range collection` -- iterate arrays, slices, maps.

---

## Experiments

Try modifying the code:

1. **Add fruit** -- `fruits = append(fruits, "durian")`
2. **Change slicing** -- try `fruits[2:]` or `fruits[:2]`
3. **Add map data** -- add "Charlie" with score 88

---

## Challenge

Create a word frequency counter (use maps), then print the most frequent word.

---

## Summary

Slices and maps are the backbone of Go collections. `append`, `make`, `range` are key tools. Maps for fast key-value lookup. Next week: structs, methods, pointers.
