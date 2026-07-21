# Function Basics

Functions are declared with the `func` keyword, followed by a name, parameters, and a return type.

## Function Syntax

```go
func functionName(parameterName type) returnType {
    // body
    return value
}
```

## Simple Function

```go
func greet() {
    fmt.Println("Hello!")
}
```

Call it:

```go
greet() // Hello!
```

## Function with Parameters

```go
func greetPerson(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

greetPerson("Alice") // Hello, Alice!
```

## Multiple Parameters — Same Type

When consecutive parameters share a type, you can specify the type once:

```go
func add(a, b int) int {
    return a + b
}
```

```go
func subtract(a int, b int) int {
    return a - b
}
```

Both are valid. The shorter form (`a, b int`) is idiomatic.

## Parameters of Different Types

```go
func describe(name string, age int) {
    fmt.Printf("%s is %d years old\n", name, age)
}
```

## Return Values

```go
func multiply(x, y int) int {
    return x * y
}

result := multiply(4, 5)
fmt.Println(result) // 20
```

## Pass by Value

Go passes arguments **by value** — the function receives a copy:

```go
func update(x int) {
    x = 100
}

func main() {
    n := 10
    update(n)
    fmt.Println(n) // 10 (unchanged)
}
```

To modify the original, use pointers (covered in Week 6).

## Variable Scope

- Parameters and variables declared inside a function are **local** to that function
- They are not accessible from outside

```go
func foo() {
    x := 10
}

func bar() {
    fmt.Println(x) // ❌ compile error: undefined: x
}
```

## Function That Returns Nothing

A function with no return type simply performs an action:

```go
func printSum(a, b int) {
    fmt.Println(a + b)
}
```

## Early Return

Use `return` to exit a function early:

```go
func checkPositive(n int) string {
    if n <= 0 {
        return "not positive"
    }
    return "positive"
}
```

## Blank Identifier

Use `_` to ignore a return value you don't need:

```go
result, _ := someFunction() // ignore second return value
```

## Practice

1. Write a function `greet` that takes a name and prints a greeting.
2. Write a function `rectangleArea` that takes width and height and returns the area.
3. Write a function `isEven` that takes an int and returns a bool.
4. Write a function `max` that takes two ints and returns the larger one.
5. Write a function that converts Celsius to Fahrenheit.
6. Write a function that takes a string and returns its length.
