# Range

The `range` keyword iterates over elements of various data structures. It produces **two values** per iteration: an index/key and a value.

## Syntax

```go
for index, value := range collection {
    // use index and value
}
```

## Range Over Slices

```go
numbers := []int{10, 20, 30, 40}

// Both index and value
for i, v := range numbers {
    fmt.Printf("numbers[%d] = %d\n", i, v)
}

// Index only
for i := range numbers {
    fmt.Println(i)
}

// Value only
for _, v := range numbers {
    fmt.Println(v)
}
```

## Range Over Arrays

Works identically to slices:

```go
arr := [4]string{"a", "b", "c", "d"}
for i, s := range arr {
    fmt.Printf("arr[%d] = %s\n", i, s)
}
```

## Range Over Maps

Iterates over key-value pairs in **unspecified order**:

```go
scores := map[string]int{
    "Alice": 95,
    "Bob":   88,
    "Carol": 92,
}

for name, score := range scores {
    fmt.Printf("%s: %d\n", name, score)
}
```

If you add or delete map entries during iteration, behavior is undefined (may or may not be visited).

## Range Over Strings

Ranging over a string iterates over **runes** (Unicode code points), not bytes:

```go
s := "Hello, 世界"

for i, r := range s {
    fmt.Printf("byte=%d, rune=%c (code=U+%04X)\n", i, r, r)
}
```

Output:
```
byte=0, rune=H (code=U+0048)
byte=1, rune=e (code=U+0065)
...
byte=7, rune=世 (code=U+4E16)
byte=10, rune=界 (code=U+754C)
```

- Index jumps by more than 1 for multi-byte characters
- The rune value is the Unicode code point
- Malformed UTF-8 produces `U+FFFD` (replacement character)

## Range Over Channels

Ranging over a channel reads values until the channel is closed:

```go
ch := make(chan int)

go func() {
    for i := 1; i <= 3; i++ {
        ch <- i
    }
    close(ch)
}()

for v := range ch {
    fmt.Println(v)
}
// Output: 1 2 3
```

If the channel is never closed, the range loop blocks forever.

## Copy During Range

The iteration variable is **reused** — it gets a copy of each value:

```go
items := []struct{ id int }{{1}, {2}, {3}}
for _, item := range items {
    item.id = 999 // modifies the COPY, not the original
}
fmt.Println(items[0].id) // 1 — unchanged
```

To modify the original, access by index:

```go
for i := range items {
    items[i].id = 999
}
fmt.Println(items[0].id) // 999
```

## Range with Struct Pointers

```go
type User struct {
    Name string
    Age  int
}

users := []User{
    {"Alice", 30},
    {"Bob", 25},
}

for i := range users {
    users[i].Age++ // ✅ modifies original
}

for _, u := range users {
    fmt.Printf("%s is %d\n", u.Name, u.Age)
}
// Alice is 31
// Bob is 26
```

## Data Structures Comparison

| Data Structure | Index/Key Type | Value Type | Order Guaranteed | Can Modify Element |
|----------------|----------------|-------------|------------------|--------------------|
| Array | `int` | Element | Yes (index order) | Via index only |
| Slice | `int` | Element | Yes (index order) | Via index only |
| Map | Key type | Value type | **No** | Via key only |
| String | `int` (byte index) | `rune` | Yes | N/A (immutable) |
| Channel | N/A | Element | Yes (FIFO) | N/A |

## Common Patterns

### Enumerate with Index

```go
for i, v := range slice {
    // i = index, v = value
}
```

### Zip Two Slices

```go
names := []string{"a", "b", "c"}
values := []int{1, 2, 3}

for i := range names {
    if i < len(values) {
        fmt.Println(names[i], values[i])
    }
}
```

### Reverse a Slice Using Range

```go
s := []int{1, 2, 3, 4, 5}
for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
    s[i], s[j] = s[j], s[i]
}
fmt.Println(s) // [5 4 3 2 1]
```

## Practice

1. Use `range` to print all elements of a slice in reverse order.
2. Write a program that uses `range` to count the frequency of each character in a string.
3. Iterate over a map using `range` and print keys sorted alphabetically (collect keys, sort, then range).
4. Use `range` over a channel to consume values from a producer goroutine.
5. Write a function `findDuplicates` that uses `range` to find duplicate values in a slice.
6. Show the difference between `for i, v := range slice` and `for i := range slice` with element modification.
7. Use a nested `range` loop to print a multiplication table stored as a 2D slice.
