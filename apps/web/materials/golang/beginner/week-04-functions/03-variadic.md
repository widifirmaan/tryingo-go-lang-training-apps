# Variadic Functions

Variadic functions accept a **variable number of arguments**. The `fmt.Println` function is variadic — it can take any number of values.

## Syntax

Use `...` before the type to make the parameter variadic:

```go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(1, 2))       // 3
    fmt.Println(sum(1, 2, 3))    // 6
    fmt.Println(sum())           // 0
}
```

## How It Works

Inside the function, `nums` is a **slice** of the given type:

```go
func printAll(items ...string) {
    fmt.Printf("type=%T, len=%d, value=%v\n", items, len(items), items)
}

printAll("a", "b", "c")
// Output: type=[]string, len=3, value=[a b c]
```

## Variadic Parameter Must Be Last

A variadic parameter must be the **last parameter** (or the only one):

```go
// ✅ Correct
func greet(prefix string, names ...string) {
    for _, name := range names {
        fmt.Printf("%s %s\n", prefix, name)
    }
}

// ❌ Wrong: variadic must be last
func bad(names ...string, prefix string) {}
```

## Calling with a Slice — Spread Operator

Use `slice...` to pass a slice as variadic arguments:

```go
numbers := []int{1, 2, 3, 4, 5}
fmt.Println(sum(numbers...)) // 15
```

Without `...`, you get a compile error (type mismatch):

```go
numbers := []int{1, 2, 3}
// sum(numbers)     ❌ cannot use numbers (type []int) as type int
sum(numbers...)    // ✅ correct
```

## Mixed: Regular + Variadic Parameters

```go
func join(sep string, parts ...string) string {
    result := ""
    for i, part := range parts {
        if i > 0 {
            result += sep
        }
        result += part
    }
    return result
}

fmt.Println(join(", ", "a", "b", "c")) // a, b, c
```

## Optional Arguments Pattern

Variadic parameters can simulate optional arguments:

```go
func connect(host string, port ...int) string {
    p := 5432 // default port
    if len(port) > 0 {
        p = port[0]
    }
    return fmt.Sprintf("%s:%d", host, p)
}

func main() {
    fmt.Println(connect("localhost"))        // localhost:5432
    fmt.Println(connect("localhost", 8080))  // localhost:8080
}
```

## Empty Variadic Call

```go
sum() // valid, nums will be empty slice: []int{}
```

## Comparing Variadic and Slice Parameters

| Variadic Parameter | Slice Parameter |
|---|---|
| `func f(nums ...int)` | `func f(nums []int)` |
| Call: `f(1, 2, 3)` | Call: `f([]int{1, 2, 3})` |
| Call: `f(nums...)` | Call: `f(nums)` |
| More flexible at call site | Requires explicit slice |
| Inner type is still `[]int` | Inner type is `[]int` |

## Common Variadic Functions in Go Standard Library

```go
fmt.Println(a ...any)
fmt.Sprintf(format string, a ...any)
append(slice []T, elems ...T) []T
```

## Practice

1. Write a variadic function `max` that returns the maximum of any number of ints.
2. Write a variadic function `concat` that joins all string arguments with a space.
3. Write a function `createLogger(prefix string, messages ...string)` that prints each message with the prefix.
4. Use the spread operator to pass a slice of ints to your `sum` function.
5. Write a variadic function `average` that calculates the average of any number of float64 values.
6. Implement `append` behavior manually: write a function that takes a slice and variadic elements, returning a new slice.
