# If-Else

Conditional statements let your program make decisions. Go's `if` syntax is similar to other languages but has a unique feature: the initialization statement.

## Basic if Statement

```go
age := 18

if age >= 18 {
    fmt.Println("You are an adult")
}
```

- The condition must be a **boolean expression** (no truthy/falsy — Go is explicit)
- Curly braces `{}` are **required**, even for one-liners
- No parentheses around the condition (unlike C/Java)

## if-else

```go
temperature := 30

if temperature > 25 {
    fmt.Println("It's hot outside")
} else {
    fmt.Println("It's cool outside")
}
```

## if-else if-else

```go
score := 85

if score >= 90 {
    fmt.Println("Grade: A")
} else if score >= 80 {
    fmt.Println("Grade: B")
} else if score >= 70 {
    fmt.Println("Grade: C")
} else if score >= 60 {
    fmt.Println("Grade: D")
} else {
    fmt.Println("Grade: F")
}
```

## Comparison Operators

| Operator | Meaning |
|----------|---------|
| `==` | Equal to |
| `!=` | Not equal to |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal to |
| `>=` | Greater than or equal to |
| `&&` | Logical AND |
| `\|\|` | Logical OR |
| `!` | Logical NOT |

```go
x, y := 10, 20

if x > 5 && y < 30 {
    fmt.Println("Both conditions are true")
}

if !(x == y) {
    fmt.Println("x is not equal to y")
}
```

## if with Initialization Statement

Go lets you run a simple statement **before** the condition, separated by a semicolon. Variables declared here are scoped to the `if`/`else` blocks.

```go
if result := calculateScore(); result > 50 {
    fmt.Printf("You passed with score %d\n", result)
} else {
    fmt.Printf("You failed with score %d\n", result)
}
// result is NOT accessible here — it's out of scope
```

This is especially useful for:

- Capturing function results and checking errors
- Keeping scope narrow and code clean

```go
if err := doSomething(); err != nil {
    fmt.Println("Error:", err)
    return
}
```

```go
if n, err := fmt.Fprintf(w, "hello"); err != nil {
    fmt.Println("Write error:", err)
} else {
    fmt.Printf("%d bytes written\n", n)
}
```

## Short Variable Declaration in if

The variable declared in the `if` statement is available in all branches (`if`, `else if`, `else`) but not outside.

```go
if num := 42; num%2 == 0 {
    fmt.Printf("%d is even\n", num)
} else {
    fmt.Printf("%d is odd\n", num)
}
```

## Common Mistakes

```go
// ❌ Wrong: parentheses around condition
if (x > 5) {
    fmt.Println("x is greater than 5")
}

// ✅ Correct: no parentheses
if x > 5 {
    fmt.Println("x is greater than 5")
}

// ❌ Wrong: condition not boolean
if 1 {
    fmt.Println("this won't compile")
}

// ✅ Correct: explicit comparison
if 1 == 1 {
    fmt.Println("this works")
}
```

## Practice

1. Write a program that checks if a number is positive, negative, or zero.
2. Write a program that takes a year and prints whether it's a leap year.
3. Use `if` with initialization to check if a randomly generated number is even or odd.
4. Write a program that determines the price of a movie ticket based on age (child, adult, senior).
5. Use nested `if` statements to implement a simple login system (check username, then password).
