# Slices

A slice is a **dynamic**, flexible view into an array. Unlike arrays, slices can grow and shrink. They are the most common way to work with collections in Go.

## Slice vs Array

| Feature | Array | Slice |
|---------|-------|-------|
| Size | Fixed at compile time | Dynamic |
| Type includes size | Yes `[3]int` | No `[]int` |
| Passed by | Value (copies) | Reference (shares underlying array) |
| Resizable | No | Yes |
| Zero value | Fixed-size zero array | `nil` |

## Creating Slices

### From an Array

```go
arr := [5]int{1, 2, 3, 4, 5}
slice := arr[1:4]   // [2 3 4] — start inclusive, end exclusive
```

### Slice Literal

```go
numbers := []int{1, 2, 3, 4, 5}
letters := []string{"a", "b", "c"}
```

### Using make

```go
// make([]T, length, capacity)
s := make([]int, 5)        // len=5, cap=5, all zeros
s := make([]int, 3, 5)     // len=3, cap=5, all zeros
```

### Nil Slice

```go
var s []int                // nil slice, len=0, cap=0
fmt.Println(s == nil)      // true
```

A nil slice has no underlying array. You can still append to it:

```go
var s []int
s = append(s, 1) // ✅ works fine
```

## Length and Capacity

```go
s := make([]int, 3, 5)

fmt.Println(len(s)) // 3 — number of elements
fmt.Println(cap(s)) // 5 — number of elements in underlying array
```

- `len(s)` — number of accessible elements
- `cap(s)` — total space available before reallocation

## Slicing Operations

```go
numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

a := numbers[3:7]  // [3 4 5 6]
b := numbers[:5]   // [0 1 2 3 4]  — from start
c := numbers[5:]   // [5 6 7 8 9]  — to end
d := numbers[:]    // [0..9]       — entire slice
```

Slicing does **not** copy data — it creates a new slice header pointing to the same underlying array.

## append

```go
var s []int
s = append(s, 10)            // [10]
s = append(s, 20, 30)        // [10 20 30]
s = append(s, []int{40, 50}...) // [10 20 30 40 50]
```

- `append` always returns a **new** slice
- If capacity is exceeded, Go allocates a **new** underlying array (usually doubling capacity)

## copy

```go
src := []int{1, 2, 3}
dst := make([]int, len(src))
n := copy(dst, src)

fmt.Println(dst) // [1 2 3]
fmt.Println(n)   // 3 — number of elements copied
```

- `copy` copies **min(len(dst), len(src))** elements
- It returns the number of elements copied

## Slice Internals

A slice is a small data structure with three fields:

```
+----------+--------+--------+
| Pointer  | Length | Cap    |
+----------+--------+--------+
```

Multiple slices can share the same underlying array:

```go
data := []int{0, 1, 2, 3, 4}
s1 := data[1:4]  // [1 2 3]
s2 := data[2:5]  // [2 3 4]

s1[1] = 99
fmt.Println(data) // [0 1 99 3 4]
fmt.Println(s2)   // [99 3 4] — affected!
```

## Append Growth

```go
s := make([]int, 0, 2)
fmt.Println(cap(s)) // 2

s = append(s, 1)
fmt.Println(cap(s)) // 2

s = append(s, 2)
fmt.Println(cap(s)) // 2

s = append(s, 3)    // exceeds capacity!
fmt.Println(cap(s)) // 4 — Go doubled it
```

Growth algorithm: doubles capacity until ~1024, then grows by ~25%.

## Common Slice Patterns

### Filter

```go
func filter(s []int, keep func(int) bool) []int {
    var result []int
    for _, v := range s {
        if keep(v) {
            result = append(result, v)
        }
    }
    return result
}
```

### Remove by Index

```go
// Remove element at index i (preserve order)
s := []int{1, 2, 3, 4, 5}
i := 2
s = append(s[:i], s[i+1:]...)
fmt.Println(s) // [1 2 4 5]
```

### Remove by Index (fast, no order)

```go
s := []int{1, 2, 3, 4, 5}
i := 2
s[i] = s[len(s)-1]
s = s[:len(s)-1]
fmt.Println(s) // [1 2 5 4]
```

## Slice of Slices (2D Slice)

```go
matrix := make([][]int, 3)
for i := range matrix {
    matrix[i] = make([]int, 3)
    for j := range matrix[i] {
        matrix[i][j] = i*3 + j + 1
    }
}
fmt.Println(matrix) // [[1 2 3] [4 5 6] [7 8 9]]
```

## Common Mistakes

```go
// ❌ Wrong: sharing underlying array unintentionally
s1 := []int{1, 2, 3, 4, 5}
s2 := s1[0:3]
s2[0] = 99 // modifies s1 too

// ✅ Correct: use copy for independent slice
s2 := make([]int, 3)
copy(s2, s1[0:3])

// ❌ Wrong: forgetting append returns a new slice
s := []int{1, 2, 3}
append(s, 4)  // discarded! original s unchanged
// s is still [1 2 3]

// ✅ Correct: assign the result
s = append(s, 4)
```

## Practice

1. Create a slice of 10 integers using `make`, then fill it with values 1-10.
2. Write a function that removes all even numbers from a slice.
3. Use `append` to combine two slices into one.
4. Show the difference between a nil slice, an empty slice `[]int{}`, and `make([]int, 0)`.
5. Write a function that returns a copy of a slice (so modifications don't affect the original).
6. Create a 2D slice representing a multiplication table (10x10).
7. Demonstrate how slicing affects the underlying array by modifying a sub-slice.
