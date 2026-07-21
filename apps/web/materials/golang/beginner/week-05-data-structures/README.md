# Week 5: Data Structures

Data structures let you organize and store collections of data. This week covers Go's built-in collection types: arrays, slices, and maps.

## Learning Objectives

- Declare and use fixed-size arrays
- Work with dynamic slices, including `make`, `append`, and `copy`
- Perform slice operations: slicing, reslicing, and capacity
- Create and manipulate maps with CRUD operations
- Iterate over any collection using `range`
- Understand the difference between arrays and slices

## Lessons

| Lesson | Topic | Key Concepts |
|--------|-------|--------------|
| 01 | Arrays | Fixed size, declaration, indexing, iteration, length |
| 02 | Slices | Dynamic length, make, append, copy, slicing, capacity |
| 03 | Maps | Key-value pairs, make, CRUD, nil map, comma-ok idiom |
| 04 | Range | Iterating slices, maps, strings, channels, key-value |

## Weekly Project: Student Grade Tracker

Build a program that manages student grades using all data structures:

- Use a `map[string][]int` to store student names mapped to grade slices
- Add and remove students
- Add grades for students
- Calculate averages per student
- Use `range` to iterate over all students and grades

```go
package main

import "fmt"

func main() {
    grades := make(map[string][]int)

    grades["Alice"] = []int{85, 92, 78}
    grades["Bob"] = []int{90, 88, 95}
    grades["Charlie"] = []int{70, 75, 80}

    for name, scores := range grades {
        total := 0
        for _, score := range scores {
            total += score
        }
        avg := float64(total) / float64(len(scores))
        fmt.Printf("%s: avg=%.1f, scores=%v\n", name, avg, scores)
    }

    // Add a new grade for Alice
    grades["Alice"] = append(grades["Alice"], 95)

    // Delete a student
    delete(grades, "Charlie")

    fmt.Println("\nAfter update:")
    for name, scores := range grades {
        fmt.Printf("%s: %v\n", name, scores)
    }
}
```

## Prerequisites

- Week 4: Functions (parameters, return values)
