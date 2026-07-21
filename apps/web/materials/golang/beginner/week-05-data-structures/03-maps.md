# Maps

A map is an unordered collection of **key-value pairs**. Maps in Go are implemented as hash tables.

## Declaration

```go
var scores map[string]int // nil map — cannot add elements
```

A declared map is `nil` until initialized. Reading from a nil map returns the zero value, but writing to one causes a panic.

## Initialization

### Using make

```go
scores := make(map[string]int) // empty map, ready to use
```

### Map Literal

```go
scores := map[string]int{
    "Alice": 95,
    "Bob":   88,
    "Carol": 92,
}
```

### Empty Map Literal

```go
scores := map[string]int{} // non-nil, empty map
```

## CRUD Operations

### Create / Update

```go
scores := make(map[string]int)
scores["Alice"] = 95   // create
scores["Bob"] = 88     // create
scores["Alice"] = 97   // update (key exists)
```

### Read

```go
fmt.Println(scores["Alice"]) // 97
fmt.Println(scores["Eve"])   // 0 (zero value, key doesn't exist)
```

### Comma-OK Idiom

Check whether a key exists:

```go
value, ok := scores["Eve"]
if ok {
    fmt.Println("Eve's score:", value)
} else {
    fmt.Println("Eve not found")
}
```

- `ok` is `true` if the key exists, `false` otherwise
- Always use this idiom when you need to distinguish between a zero value and a missing key

### Delete

```go
delete(scores, "Bob")
```

`delete` does nothing if the key doesn't exist.

### Check Length

```go
fmt.Println(len(scores)) // number of key-value pairs
```

## Iteration

Use `range` to iterate over all key-value pairs:

```go
for key, value := range scores {
    fmt.Printf("%s: %d\n", key, value)
}
```

**Important:** Map iteration order is **not guaranteed** and can vary between runs.

```go
// Iterate over keys only
for key := range scores {
    fmt.Println(key)
}

// Iterate over values only
for _, value := range scores {
    fmt.Println(value)
}
```

## Maps as Reference Types

Maps are **reference types**. Assigning or passing a map shares the underlying data:

```go
original := map[string]int{"a": 1}
ref := original
ref["a"] = 999

fmt.Println(original["a"]) // 999 — modified!
```

But maps still need `make` (or literal) initialization:

```go
var m map[string]int
m["key"] = 1 // ❌ panic: assignment to entry in nil map
```

## Using Maps as Sets

Go doesn't have a built-in set type. Use `map[Type]struct{}` instead:

```go
set := make(map[string]struct{})
set["apple"] = struct{}{}
set["banana"] = struct{}{}

// Check membership
_, ok := set["apple"]
fmt.Println(ok) // true

// Delete
delete(set, "apple")

// Size
fmt.Println(len(set))
```

Using `struct{}` as the value type uses zero memory for the value.

## Nested Maps

```go
users := map[string]map[string]string{
    "alice": {
        "email": "alice@example.com",
        "role":  "admin",
    },
    "bob": {
        "email": "bob@example.com",
        "role":  "user",
    },
}

fmt.Println(users["alice"]["email"]) // alice@example.com
```

## Common Map Operations

```go
// Merge map b into map a
for k, v := range b {
    a[k] = v
}

// Clear a map
for k := range m {
    delete(m, k)
}

// Copy a map
dest := make(map[string]int)
for k, v := range src {
    dest[k] = v
}
```

## Comparing Maps

Maps cannot be compared with `==` (except with `nil`):

```go
a := map[string]int{"x": 1}
b := map[string]int{"x": 1}

// fmt.Println(a == b) // ❌ compile error
```

Use `reflect.DeepEqual` or write a custom comparison:

```go
import "reflect"

fmt.Println(reflect.DeepEqual(a, b)) // true
```

## Common Mistakes

```go
// ❌ Wrong: writing to nil map
var m map[string]int
m["key"] = 42 // panic

// ✅ Correct: initialize first
m := make(map[string]int)
m["key"] = 42

// ❌ Wrong: relying on iteration order
for k, v := range m {
    // order not guaranteed!
}

// ✅ Correct: if order matters, collect and sort keys
keys := make([]string, 0, len(m))
for k := range m {
    keys = append(keys, k)
}
sort.Strings(keys)
for _, k := range keys {
    fmt.Println(k, m[k])
}
```

## Practice

1. Create a map that stores the names and ages of 5 people.
2. Write a function that counts the frequency of each word in a string (return `map[string]int`).
3. Use the comma-ok idiom to safely check for a key in a map.
4. Write a program that removes all entries from a map with a value less than a threshold.
5. Implement a simple phone book: `map[string]string` with add, lookup, delete, and list operations.
6. Use a `map[string]struct{}` as a set to find duplicates in a slice of strings.
7. Write a function that merges two maps (if keys collide, prefer the second map's value).
