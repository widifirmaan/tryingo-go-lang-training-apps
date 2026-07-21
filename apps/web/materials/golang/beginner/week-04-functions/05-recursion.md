# Recursion

A function is **recursive** if it calls itself. Recursion is useful for problems that can be broken down into smaller, identical subproblems.

## Structure of a Recursive Function

Every recursive function needs two parts:

1. **Base case** — stops the recursion
2. **Recursive case** — calls itself with a smaller input

```go
func countdown(n int) {
    if n <= 0 { // base case
        return
    }
    fmt.Println(n)
    countdown(n - 1) // recursive case
}
```

## Factorial

The classic recursive example. Factorial of `n` (written `n!`) is the product of all positive integers up to `n`.

- `0! = 1` (base case)
- `n! = n * (n-1)!` (recursive case)

```go
func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    fmt.Println(factorial(5)) // 120 (5*4*3*2*1)
    fmt.Println(factorial(0)) // 1
}
```

## How Recursion Works — The Call Stack

```go
factorial(5)
    = 5 * factorial(4)
    = 5 * (4 * factorial(3))
    = 5 * (4 * (3 * factorial(2)))
    = 5 * (4 * (3 * (2 * factorial(1))))
    = 5 * (4 * (3 * (2 * 1)))
    = 5 * (4 * (3 * 2))
    = 5 * (4 * 6)
    = 5 * 24
    = 120
```

Each call is placed on the **call stack**. When the base case is reached, returns unwind back up.

## Fibonacci Sequence

Each number is the sum of the two preceding ones: `0, 1, 1, 2, 3, 5, 8, 13, ...`

```go
func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    for i := 0; i < 10; i++ {
        fmt.Printf("fib(%d) = %d\n", i, fibonacci(i))
    }
}
```

**Note:** This naive recursive Fibonacci is very slow for large `n` (O(2ⁿ)) because it recomputes the same values repeatedly. Use an iterative approach or memoization for efficiency.

## Recursion vs Iteration

```go
// Recursive factorial
func factorialRecursive(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorialRecursive(n-1)
}

// Iterative factorial
func factorialIterative(n int) int {
    result := 1
    for i := 2; i <= n; i++ {
        result *= i
    }
    return result
}
```

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Code | More elegant for tree-like problems | Often simpler |
| Memory | Uses call stack (risk of stack overflow) | No extra stack frames |
| Performance | Function call overhead | Faster |
| Readability | Natural for mathematical definitions | Straightforward for loops |

## Tail Recursion

A recursive call is **tail-recursive** if it's the last operation in the function. Go does **not** optimize tail calls, but the pattern is still useful for clarity:

```go
func factorialTail(n, acc int) int {
    if n <= 1 {
        return acc
    }
    return factorialTail(n-1, n*acc)
}

func factorial(n int) int {
    return factorialTail(n, 1)
}
```

## Recursive String Reversal

```go
func reverse(s string) string {
    if len(s) <= 1 {
        return s
    }
    return reverse(s[1:]) + string(s[0])
}

fmt.Println(reverse("hello")) // olleh
```

## Recursive Directory Traversal (Real-World)

```go
func walkDir(path string, indent int) {
    entries, err := os.ReadDir(path)
    if err != nil {
        return
    }
    for _, entry := range entries {
        fmt.Printf("%s%s\n", strings.Repeat("  ", indent), entry.Name())
        if entry.IsDir() {
            walkDir(filepath.Join(path, entry.Name()), indent+1)
        }
    }
}
```

## When to Use Recursion

**Good fit for recursion:**
- Tree and graph traversal
- Divide-and-conquer algorithms (quicksort, mergesort)
- Mathematical sequences (factorial, fibonacci)
- Backtracking problems (maze solving, permutations)
- Directory traversal

**Better fit for iteration:**
- Simple linear calculations
- Performance-critical code
- When stack depth may exceed limits

## Stack Overflow Risk

Every recursive call adds a frame to the call stack. If recursion is too deep, you'll get a stack overflow:

```go
func recurseForever(n int) int {
    return recurseForever(n + 1) // will eventually overflow
}
```

Go goroutines start with small stacks (2 KB) that grow as needed, but there is still a limit.

## Practice

1. Write a recursive function `sum` that computes the sum of integers from 1 to `n`.
2. Write a recursive function `power(base, exp int) int` that computes `base^exp`.
3. Write a recursive function to check if a string is a palindrome.
4. Write a recursive function to count the number of digits in an integer.
5. Implement GCD (greatest common divisor) recursively using Euclid's algorithm.
6. Write a recursive binary search function.
7. Compare the performance of recursive vs iterative fibonacci for `n = 40`. Add a simple timing measurement.
