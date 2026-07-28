# Standard Library: I/O & Time

> Go | Module 13

## Learning Objectives

- Understand io.Reader and io.Writer
- Read files with os and bufio
- Manipulate strings and strconv
- Use time (Duration, Format, Ticker)
- Apply log and log/slog

---

## Program: Log Reader

```go
package main

import (
    "bufio"
    "fmt"
    "log"
    "strings"
    "time"
)

// io.Reader with strings
func processData(data string) {
    scanner := bufio.NewScanner(strings.NewReader(data))
    lineNum := 1
    for scanner.Scan() {
        line := scanner.Text()
        fmt.Printf("%d: %s\n", lineNum, line)
        lineNum++
    }
}

func main() {
    // String manipulation
    text := "  Go Programming Language  "
    fmt.Println("Trimmed:", strings.TrimSpace(text))
    fmt.Println("Replace:", strings.ReplaceAll(text, "Go", "Go"))
    fmt.Println("Fields:", strings.Fields(text))

    // strconv (simulasi)
    numStr := "42"
    var num int = 0
    _, _ = fmt.Sscanf(numStr, "%d", &num)
    fmt.Printf("Parsed int: %d\n", num)

    // bufio.Scanner
    data := "baris pertama\nbaris kedua\nbaris ketiga"
    fmt.Println("\n=== Scanner ===")
    processData(data)

    // time
    now := time.Now()
    fmt.Println("\nSekarang:", now.Format("2006-01-02 15:04:05"))
    fmt.Println("Tanggal:", now.Format("Monday, 2 January 2006"))

    duration := 2*time.Hour + 30*time.Minute
    fmt.Printf("Durasi: %v (menit: %.0f)\n", duration, duration.Minutes())

    // log
    log.Println("Aplikasi berjalan")
    log.Printf("Memproses %d item\n", 10)
}
```

---

## Explanation

`io.Reader` and `io.Writer` are fundamental I/O interfaces. `bufio.Scanner` reads line by line. `strings` package for text manipulation. `strconv` for string⇄number conversion. `time` for time, duration, and tickers. `log/slog` for structured logging.

---

## Experiments

- Change variable values and observe the changes
- Add a new function with different return types
- Replace for loops with range
- Try data types you haven't used yet

---

## Challenge

Build a program applying this week's concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.

---

## Summary

Module 13 of 16: **Standard Library: I/O & Time**. Go delivers high performance with simple syntax. Next week: **Encoding: JSON & Data**.
