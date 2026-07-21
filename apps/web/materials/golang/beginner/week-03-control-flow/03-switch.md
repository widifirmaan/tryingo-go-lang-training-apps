# Switch

Go's `switch` statement is a clean way to write multiple conditionals. It has several unique features: automatic break, expression switches, and type switches.

## Basic Expression Switch

```go
day := "Monday"

switch day {
case "Monday":
    fmt.Println("Start of work week")
case "Friday":
    fmt.Println("Last work day")
case "Saturday", "Sunday":
    fmt.Println("Weekend!")
default:
    fmt.Println("Midweek")
}
```

- Go evaluates `case` expressions from top to bottom
- The matching `case` runs and then the switch **exits automatically** — no `break` needed
- `default` runs if no other case matches (optional)

## No Automatic Fallthrough

Unlike C, Go does **not** fall through to the next case. If you want that, use the `fallthrough` keyword.

```go
switch n {
case 1:
    fmt.Println("one")
    // no break needed — stops here automatically
case 2:
    fmt.Println("two")
}
```

## Multiple Values in One Case

Separate multiple matching values with commas:

```go
switch char {
case 'a', 'e', 'i', 'o', 'u':
    fmt.Println("vowel")
default:
    fmt.Println("consonant")
}
```

## Switch with No Expression (Switch True)

Omit the switch expression to write cleaner if-else chains:

```go
score := 85

switch {
case score >= 90:
    fmt.Println("A")
case score >= 80:
    fmt.Println("B")
case score >= 70:
    fmt.Println("C")
case score >= 60:
    fmt.Println("D")
default:
    fmt.Println("F")
}
```

This is equivalent to `switch true { ... }`.

## Switch with Initialization

Like `if`, `switch` can have an initialization statement:

```go
switch result := calculate(); {
case result > 100:
    fmt.Println("Very high")
case result > 50:
    fmt.Println("High")
default:
    fmt.Println("Low")
}
```

## fallthrough

`fallthrough` forces execution to continue to the next case, even if it doesn't match:

```go
switch num := 2; num {
case 1:
    fmt.Println("one")
    fallthrough
case 2:
    fmt.Println("two")
    fallthrough
case 3:
    fmt.Println("three")
}
// Output:
// two
// three
```

Use `fallthrough` sparingly — it's often a code smell.

## Type Switch

A type switch matches on the **type** of an interface value, not its value.

```go
func describe(i interface{}) {
    switch v := i.(type) {
    case int:
        fmt.Printf("Integer: %d\n", v)
    case string:
        fmt.Printf("String: %q (len=%d)\n", v, len(v))
    case bool:
        fmt.Printf("Boolean: %v\n", v)
    case nil:
        fmt.Println("nil")
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
}

func main() {
    describe(42)
    describe("hello")
    describe(true)
    describe(nil)
    describe(3.14)
}
```

The variable `v` holds the **typed** value inside each case branch.

## Comparing if-else Chains and switch

| Feature | if-else | switch |
|---------|---------|--------|
| Readability | Can get messy with many branches | Cleaner for multiple conditions |
| Expression matching | Manual comparisons | Direct value matching |
| Type matching | Reflection needed | Native type switch |
| Performance | Similar | Similar (compiler optimizations) |
| Fallthrough | Not applicable | Explicit `fallthrough` |

## Common Mistakes

```go
// ❌ Wrong: forgetting comma in multi-value case
switch x {
case 1, 2, 3:  // correct
    fmt.Println("small")
}

// ❌ Wrong: fallthrough when not intended
switch x {
case 1:
    fmt.Println("one")
    // if you meant to stop here, don't add fallthrough
}

// ✅ Correct: relying on automatic break
switch x {
case 1:
    fmt.Println("one")
case 2:
    fmt.Println("two")
}
```

## Practice

1. Write a program that takes a month number (1-12) and prints the season.
2. Write a program that classifies a character as vowel, consonant, digit, or other.
3. Use a switch with no expression to print a rating based on a numeric score.
4. Write a `describe` function that uses a type switch to handle `int`, `string`, `[]int`, and `map[string]int`.
5. Use a switch with initialization to check the parity of a randomly generated number.
6. Write a program that converts a numeric grade (0-100) to a letter grade using switch.
