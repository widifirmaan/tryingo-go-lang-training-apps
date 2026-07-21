# Closures and Anonymous Functions

Go supports **anonymous functions** — functions without a name — and **closures** — anonymous functions that capture variables from their surrounding scope.

## Anonymous Function

A function literal with no name:

```go
func main() {
    func() {
        fmt.Println("I am anonymous")
    }() // call immediately
}
```

## Assigning to a Variable

```go
greet := func(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

greet("Alice") // Hello, Alice!
```

## Closures

A closure is an anonymous function that **captures variables** from its enclosing scope:

```go
func main() {
    message := "Hello"
    greet := func(name string) {
        fmt.Println(message, name) // captures "message"
    }
    greet("Bob") // Hello Bob
}
```

The closure "closes over" the variable `message` and can access it even after the outer function returns.

## Stateful Closures

Closures can maintain and modify state:

```go
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    next := counter()
    fmt.Println(next()) // 1
    fmt.Println(next()) // 2
    fmt.Println(next()) // 3

    another := counter() // independent counter
    fmt.Println(another()) // 1
}
```

Each call to `counter()` creates a **new** `count` variable. The closure retains access to it.

## IIFE (Immediately Invoked Function Expression)

```go
result := func(a, b int) int {
    return a + b
}(3, 4)

fmt.Println(result) // 7
```

Use IIFE to scope variables tightly:

```go
func main() {
    // Load config in its own scope
    config := func() map[string]string {
        data, _ := os.ReadFile("config.json")
        // parse and return...
        return map[string]string{"env": "dev"}
    }()

    fmt.Println(config)
}
```

## Closure Gotcha: Loop Variable Capture

A common mistake is capturing loop variables by reference:

```go
func main() {
    var funcs []func()
    for i := 0; i < 3; i++ {
        funcs = append(funcs, func() {
            fmt.Println(i)
        })
    }
    for _, f := range funcs {
        f()
    }
}
// Output: 3 3 3 (all capture the same i at its final value)
```

Fix: create a new variable each iteration:

```go
for i := 0; i < 3; i++ {
    i := i // new variable scoped to this iteration
    funcs = append(funcs, func() {
        fmt.Println(i)
    })
}
// Output: 0 1 2
```

Or pass as argument:

```go
for i := 0; i < 3; i++ {
    funcs = append(funcs, func(n int) func() {
        return func() { fmt.Println(n) }
    }(i))
}
// Output: 0 1 2
```

## Closure as Function Factory

```go
func makeMultiplier(factor int) func(int) int {
    return func(x int) int {
        return x * factor
    }
}

func main() {
    double := makeMultiplier(2)
    triple := makeMultiplier(3)

    fmt.Println(double(5))  // 10
    fmt.Println(triple(5))  // 15
}
```

## Filter / Map Using Closures

```go
func filter(nums []int, predicate func(int) bool) []int {
    var result []int
    for _, n := range nums {
        if predicate(n) {
            result = append(result, n)
        }
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6}
    evens := filter(nums, func(n int) bool {
        return n%2 == 0
    })
    fmt.Println(evens) // [2 4 6]
}
```

## Closures as Function Arguments

```go
func execute(fn func(string)) {
    fn("called from execute")
}

func main() {
    execute(func(msg string) {
        fmt.Println(msg)
    })
}
```

## Closures vs Function Variables

| Aspect | Regular Function | Anonymous Function / Closure |
|--------|-----------------|------------------------------|
| Declaration | `func add(a, b int) int { ... }` | `fn := func(a, b int) int { ... }` |
| Name | Has a name | No name (anonymous) |
| Scope access | Only parameters/globals | Can capture outer variables |
| Reassignable | No | Yes (if assigned to var) |
| Use case | Named, reusable logic | Callbacks, state, short-lived logic |

## Practice

1. Write a closure that counts how many times it has been called.
2. Create a `makeGreeter` function that takes a greeting string and returns a closure that greets a person by name.
3. Fix the loop variable capture issue in a program that creates multiple goroutines.
4. Write a `map` function that takes a slice and a closure, applying the closure to each element.
5. Use an IIFE to initialize a variable with error handling.
6. Implement a `once` function that ensures a closure only executes once (memoize).
