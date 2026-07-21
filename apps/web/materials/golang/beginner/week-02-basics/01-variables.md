# Variables & Declaration

## Introduction
Variables are containers for storing data. Go provides several ways to declare and initialize variables.

## Variable Declaration

### 1. var Declaration (with type)
```go
var name string
var age int
var price float64
var active bool
```

### 2. var Declaration (with initialization)
```go
var name string = "Alice"
var age int = 30
var price float64 = 19.99
var active bool = true
```

### 3. Type Inference
When you provide an initial value, Go can infer the type:
```go
var name = "Alice"      // string
var age = 30            // int
var price = 19.99       // float64
var active = true       // bool
```

### 4. Short Declaration (:=) - Most Common
```go
name := "Alice"
age := 30
price := 19.99
active := true
```

**Rules for short declaration:**
- Can only be used inside functions
- Must declare at least one new variable
- Cannot be used for package-level variables

## Multiple Variables

### Declare multiple variables at once:
```go
var x, y int = 10, 20
var name, age = "Alice", 30
x, y := 100, 200
```

### Swap values:
```go
a, b := 10, 20
a, b = b, a  // a=20, b=10
```

## Package-Level Variables

```go
package main

var GlobalSetting = "prod"  // Exported (uppercase)
var localSetting = "cache"  // Unexported (lowercase)

func main() {
    version := "1.0"  // Local variable
}
```

## Variable Scope

| Scope | Location | Visibility |
|-------|----------|------------|
| Package | Outside any function | Entire package |
| Function | Inside a function | That function only |
| Block | Inside {} | That block only |

```go
package main

var x = 10  // package scope

func main() {
    y := 20  // function scope
    if true {
        z := 30  // block scope
        fmt.Println(x, y, z)
    }
    // fmt.Println(z)  // Error: undefined
}
```

## Underscore (_) - Blank Identifier

Use `_` to ignore values you don't need:
```go
result, _ := divide(10, 3)  // Ignore the error
_, err := doSomething()      // Ignore the result
```

## Practice

```go
// 1. Declare a variable for your name
var myName string = "Your Name"

// 2. Use short declaration for your age
myAge := 25

// 3. Declare multiple variables in one line
var city, country string = "Jakarta", "Indonesia"

// 4. Swap two values
a, b := 1, 2
a, b = b, a
```

## Common Mistakes

```go
// ❌ Wrong: re-declaration without new variable
x := 10
x := 20  // Error: no new variables

// ✅ Correct: use =
x := 10
x = 20

// ✅ Correct: at least one new variable
x, y := 10, 20
x, z := 30, 40  // x is existing, z is new
```
