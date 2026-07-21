# Type Constraints

Type constraints restrict which types can be used with generic code.

## Built-in Constraints

```go
// comparable - supports == and !=
func Contains[T comparable](s []T, target T) bool {
    for _, v := range s {
        if v == target {
            return true
        }
    }
    return false
}

// any - no constraints
func Print[T any](v T) {
    fmt.Println(v)
}
```

## Custom Constraints

```go
type Number interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
    ~float32 | ~float64
}

func Sum[T Number](values []T) T {
    var total T
    for _, v := range values {
        total += v
    }
    return total
}

func Average[T Number](values []T) float64 {
    return float64(Sum(values)) / float64(len(values))
}
```

## Approximate Constraint

```go
// ~ allows types with the same underlying type
type MyInt int

type Integer interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64
}

// Works with int and MyInt
func Double[T Integer](v T) T {
    return v * 2
}

func main() {
    fmt.Println(Double(5))      // 10
    fmt.Println(Double(MyInt(3))) // 6
}
```

## Interface as Constraint

```go
type Stringer interface {
    String() string
}

func Join[T Stringer](items []T, sep string) string {
    parts := make([]string, len(items))
    for i, item := range items {
        parts[i] = item.String()
    }
    return strings.Join(parts, sep)
}

type User struct {
    Name string
    Age  int
}

func (u User) String() string {
    return fmt.Sprintf("%s (%d)", u.Name, u.Age)
}
```

## Constraint Inference

```go
func Max[T constraints.Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}

// Type inference works:
Max(3, 5)         // T = int
Max(3.14, 2.71)  // T = float64
Max("a", "b")    // T = string
```

## Practice

1. Create a `Numeric` constraint for math operations
2. Write a constraint for types with `Len() int` method
3. Build a `Comparable` constraint with ordering
4. Create a generic function constrained by multiple interfaces
