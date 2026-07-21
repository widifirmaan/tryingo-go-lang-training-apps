# For Loops

Go has only one looping keyword: `for`. But it can be used in several different patterns to cover all iteration needs.

## Basic for Loop (Three-Component)

The classic C-style `for` loop: initialization; condition; post.

```go
for i := 0; i < 5; i++ {
    fmt.Println(i)
}
// Output: 0 1 2 3 4
```

- `i := 0` — runs once before the loop
- `i < 5` — checked before each iteration
- `i++` — runs after each iteration

## While Pattern

Omit the initialization and post statements to get a while loop:

```go
count := 0
for count < 5 {
    fmt.Println(count)
    count++
}
```

## Infinite Loop

Omit the condition entirely:

```go
for {
    fmt.Println("This runs forever")
}
```

Use `break` to exit:

```go
sum := 0
for {
    sum++
    if sum > 10 {
        break
    }
}
```

## For-range Loop

Iterate over elements of a slice, array, map, string, or channel.

```go
numbers := []int{10, 20, 30, 40}
for index, value := range numbers {
    fmt.Printf("index=%d, value=%d\n", index, value)
}
```

If you don't need the index, use underscore to ignore it:

```go
for _, value := range numbers {
    fmt.Println(value)
}
```

If you only need the index, omit the value:

```go
for index := range numbers {
    fmt.Println(index)
}
```

## Iterating Over Strings

Ranging over a string iterates over **runes** (Unicode code points), not bytes:

```go
s := "hello"
for i, r := range s {
    fmt.Printf("byte index=%d, rune=%c\n", i, r)
}
```

For multi-byte characters, the index jumps:

```go
s := "世界"
for i, r := range s {
    fmt.Printf("byte index=%d, rune=%c\n", i, r)
}
// Output:
// byte index=0, rune=世
// byte index=3, rune=界
```

## break

Exit the loop immediately:

```go
for i := 0; i < 10; i++ {
    if i == 5 {
        break
    }
    fmt.Println(i)
}
// Output: 0 1 2 3 4
```

## continue

Skip the rest of the current iteration and move to the next:

```go
for i := 0; i < 10; i++ {
    if i%2 == 0 {
        continue
    }
    fmt.Println(i)
}
// Output: 1 3 5 7 9
```

## Labeled break and continue

Use labels to break out of or continue an outer loop from inside nested loops:

```go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if i == 1 && j == 1 {
            break outer
        }
        fmt.Printf("(%d, %d) ", i, j)
    }
}
// Output: (0, 0) (0, 1) (0, 2) (1, 0)
```

```go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if j == 1 {
            continue outer
        }
        fmt.Printf("(%d, %d) ", i, j)
    }
}
// Output: (0, 0) (1, 0) (2, 0)
```

## Loop Patterns Reference

| Pattern | Syntax | Use Case |
|---------|--------|----------|
| Standard | `for i := 0; i < n; i++` | Known number of iterations |
| While | `for condition` | Unknown iterations, known condition |
| Infinite | `for {}` | Server loops, listeners |
| Range | `for i, v := range coll` | Iterating collections |
| Range (index only) | `for i := range coll` | Need only the index |
| Range (value only) | `for _, v := range coll` | Need only the value |

## Common Mistakes

```go
// ❌ Wrong: using parentheses
for (i := 0; i < 5; i++) {
}

// ✅ Correct: no parentheses
for i := 0; i < 5; i++ {
}

// ❌ Wrong: declaring i outside and using := inside
i := 0
for i := 0; i < 5; i++ { }  // shadows outer i

// ✅ Correct: reuse outer variable
i := 0
for ; i < 5; i++ { }
```

## Practice

1. Print all even numbers from 1 to 100 using a `for` loop.
2. Print the multiplication table for a given number (1 through 10).
3. Use a while-style loop to keep generating random numbers until you get a 7.
4. Iterate over a string containing emoji and print each rune and its index.
5. Write nested loops to print a 5x5 grid of numbers.
6. Use `break` with a label to exit nested loops when a condition is met.
7. Calculate the sum of numbers from 1 to 1000 using a `for` loop.
