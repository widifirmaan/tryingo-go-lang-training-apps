# Testing & Standard Library

> Category: Go, Programming Language | Level: Intermediate | Week 10

## Learning Objectives

- Write unit tests with testing package
- Apply table-driven tests
- Use encoding/json
- Manipulate strings with strings package
- Write benchmark tests

---

## Program: Pengujian & JSON

```go
package main

import (
    "fmt"
    "strings"
    "encoding/json"
)

func Add(a, b int) int { return a + b }

func Divide(a, b float64) (float64, error) {
    if b == 0 { return 0, fmt.Errorf("cannot divide by zero") }
    return a / b, nil
}

type Person struct {
    Name   string `json:"name"`
    Age    int    `json:"age"`
    Active bool   `json:"active"`
}

func main() {
    fmt.Println("2 + 3 =", Add(2, 3))
    fmt.Println("7 + 12 =", Add(7, 12))
    r, err := Divide(10, 3)
    if err == nil { fmt.Printf("10 / 3 = %.2f\n", r) }

    word := "  hello, Go!  "
    fmt.Println("Trim:", strings.TrimSpace(word))
    fmt.Println("Upper:", strings.ToUpper(word))
    fmt.Println("Contains Go:", strings.Contains(word, "Go"))
    fmt.Println("Split:", strings.Split("a,b,c", ","))

    p := Person{Name: "Alice", Age: 30, Active: true}
    jsonData, _ := json.MarshalIndent(p, "", "  ")
    fmt.Println("JSON output:")
    fmt.Println(string(jsonData))

    jsonStr := `{"name":"Bob","age":25,"active":false}`
    var p2 Person
    json.Unmarshal([]byte(jsonStr), &p2)
    fmt.Printf("Decoded: %+v\n", p2)
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Unit Testing

Test files: `*_test.go`. Functions: `func TestXxx(t *testing.T)`. Run: `go test`.

**Table-driven tests**: slice of structs with inputs and expected outputs -- Go standard.

### JSON

`encoding/json`: `Marshal` struct to JSON, `Unmarshal` back. Use `json:"field"` tags.

### Strings

`strings` package: `TrimSpace`, `ToUpper`, `Contains`, `Split`, etc.

---

## Experiments

Try modifying the code:

1. **Change Add input** -- try `Add(-5, 3)` or `Add(0, 0)`
2. **Modify JSON** -- add `Email string` field to Person struct
3. **String experiments** -- try `strings.ReplaceAll(word, "Go", "Golang")`

---

## Challenge

Write `FilterEven(numbers []int) []int` (return even numbers). Write table-driven test with 5 cases.

---

## Summary

Testing is integral to Go. Table-driven tests are standard. JSON with struct tags. Strings package for text. Benchmarks for optimization. Next week: CLI tools and HTTP server.
