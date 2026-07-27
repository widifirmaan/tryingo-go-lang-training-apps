# Defer, Panic & File I/O

> Category: Go, Programming Language | Level: Intermediate | Week 7

## Learning Objectives

- Use defer to schedule execution
- Understand LIFO stack with multiple defers
- Apply panic and recover
- Read and write files with the os package
- Use bufio.Scanner

---

## Program: Manajemen Sumber Daya

```go
package main

import "fmt"

func main() {
    fmt.Println("Start")
    defer fmt.Println("1. defer: first")
    defer fmt.Println("2. defer: second")
    defer fmt.Println("3. defer: third")
    fmt.Println("End -- defers will run:")

    result := safeDivide(10, 2)
    fmt.Println("10 / 2 =", result)
    result = safeDivide(10, 0)
    fmt.Println("10 / 0 =", result)

    data := readFile("example.txt")
    fmt.Println("File contents:", data)
    fmt.Println("Program finished without crash!")
}

func safeDivide(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r); result = 0
        }
    }()
    return a / b
}

func readFile(name string) string {
    defer fmt.Println("(file closed here)")
    if name == "" { return "Error: empty filename" }
    return "[simulated file content]"
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Defer

`defer` schedules a call after the parent function. Used for cleanup. **LIFO**: last deferred runs first.

### Panic & Recover

`panic` stops execution. `recover()` inside `defer` catches panics.

### File I/O

`os.ReadFile()`, `os.WriteFile()`, `bufio.NewScanner()`. Code here is simulated (no filesystem in playground).

---

## Experiments

Try modifying the code:

1. **Change defer order** -- move defer positions and see output order
2. **Divide by 0** -- try another panic-inducing division
3. **Empty filename** -- call `readFile("")` and see error handling

---

## Challenge

Simulate file ops: `saveData(filename, content string) error` with defer, `loadData(filename string) (string, error)` with error handling. Use panic/recover for validation.

---

## Summary

Defer guarantees resource cleanup. Panic/recover for unexpected errors. `defer f.Close()` is Go standard. Next week: goroutines and concurrency.
