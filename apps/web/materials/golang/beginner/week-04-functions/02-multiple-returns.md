# Multiple Return Values

Go functions can return **multiple values**. This is used extensively in Go, especially for returning a result and an error.

## Basic Multiple Returns

```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}
```

Calling a function with multiple returns:

```go
result, err := divide(10, 2)
if err != nil {
    fmt.Println("Error:", err)
    return
}
fmt.Println(result)
```

## Ignoring Return Values

Use `_` to ignore values you don't need:

```go
result, _ := divide(10, 2)
fmt.Println(result)
```

Only ignore errors when you are absolutely sure the operation won't fail:

```go
// Only safe if divisor is guaranteed non-zero
result, _ := divide(10, 2)
```

## Common Idiom: result, error

The most common multiple-return pattern in Go:

```go
func readFile(name string) (string, error) {
    data, err := os.ReadFile(name)
    if err != nil {
        return "", err
    }
    return string(data), nil
}
```

```go
func parseInt(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        return 0, err
    }
    return n, nil
}
```

## Named Return Values

You can name the return values at the function signature. They behave as local variables:

```go
func getCoordinates() (x, y int) {
    x = 10
    y = 20
    return // naked return
}
```

Named returns are initialized to their **zero values** by default:

```go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}
```

## Naked Return

A `return` statement without arguments returns the named return values. This is called a **naked return**:

```go
func rectangleProperties(w, h float64) (area, perimeter float64) {
    area = w * h
    perimeter = 2 * (w + h)
    return // returns area, perimeter
}
```

Use naked returns **sparingly** — they can harm readability in longer functions. They are best in short functions.

## Multiple Return Values Work Like Multiple Assignment

```go
a, b := 1, 2
a, b = b, a // swap values — no temp variable needed
```

```go
func swap(x, y int) (int, int) {
    return y, x
}

a, b := swap(3, 7)
fmt.Println(a, b) // 7 3
```

## Returning Multiple Values of the Same Type

```go
func minMax(nums []int) (int, int) {
    min, max := nums[0], nums[0]
    for _, n := range nums {
        if n < min {
            min = n
        }
        if n > max {
            max = n
        }
    }
    return min, max
}
```

## When to Use Named vs Unnamed Returns

| Aspect | Unnamed | Named |
|--------|---------|-------|
| Explicit at call site | Must read function body | Named in signature |
| Zero initialization | Not automatic | Automatic |
| Naked return | Not allowed | Allowed |
| Generates docs | Less descriptive | More descriptive |
| Best for | Short, simple returns | Complex or documented APIs |

## Practice

1. Write a function `stats(nums []int) (int, int, float64)` that returns min, max, and average.
2. Write a function `safeDivide(a, b int) (int, error)` that handles division by zero.
3. Use named returns to write a function `circleProps(radius float64) (area, circumference float64)`.
4. Write a function `swapEnds(s string) (string, error)` that swaps the first and last character.
5. Write a function `timeConvert(seconds int) (hours, minutes, secs int)` using named returns.
6. Create a function that reads a file path and returns `(content string, size int, err error)`.
