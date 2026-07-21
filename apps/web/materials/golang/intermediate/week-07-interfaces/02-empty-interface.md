# Empty Interface

## What is the Empty Interface?
The empty interface `interface{}` (also `any` in Go 1.18+) specifies **zero methods**, so every type satisfies it.

```go
var x interface{}
x = 42
x = "hello"
x = 3.14
x = struct{ Name string }{"Alice"}
```

## Using `any` (Go 1.18+)
Go 1.18 introduced `any` as an alias for `interface{}`.

```go
func PrintValue(v any) {
    fmt.Printf("Value: %v, Type: %T\n", v, v)
}

PrintValue(42)       // Value: 42, Type: int
PrintValue("hello")  // Value: hello, Type: string
PrintValue(3.14)     // Value: 3.14, Type: float64
```

## Common Use Cases

### Mixed-Type Containers
```go
func main() {
    items := []any{42, "hello", 3.14, true}
    for _, item := range items {
        fmt.Printf("%v (%T)\n", item, item)
    }
}
```

### Flexible Function Parameters
```go
func Log(key string, value any) {
    fmt.Printf("[LOG] %s = %v\n", key, value)
}

func main() {
    Log("count", 100)
    Log("name", "Alice")
    Log("pi", 3.14159)
}
```

## Type Assertion
Extract the concrete value from an interface.

```go
var v any = "hello world"

s := v.(string)
fmt.Println(s) // hello world

// n := v.(int) // PANIC: interface conversion
```

### Safe Assertion
```go
s, ok := v.(string)
if ok {
    fmt.Println("It's a string:", s)
} else {
    fmt.Println("Not a string")
}
```

## Pitfalls

### Nil Interface vs Nil Pointer
A nil pointer stored in an interface is **not** a nil interface.

```go
var p *int = nil
var i any = p

fmt.Println(p == nil) // true
fmt.Println(i == nil) // false — interface has type *int
```

### When to Use Empty Interface
| Use | Avoid |
|-----|-------|
| JSON decoding | General-purpose containers |
| Logging utilities | Replacing proper interfaces |
| Wrapper/Adapter patterns | Performance-critical paths |

## Exercises

1. **Type Inspector**: Write a function that takes `any` and prints the concrete type.

2. **Mixed Slice**: Create a slice of `any` with different types, iterate and print each.

3. **Safe JSON**: Write a function `GetString(data map[string]any, key string) (string, error)` that safely extracts a string value.

4. **Debug Printer**: Build a `debugPrint` function that accepts `any` and prints type-specific info (length for strings/slices, keys for maps).
