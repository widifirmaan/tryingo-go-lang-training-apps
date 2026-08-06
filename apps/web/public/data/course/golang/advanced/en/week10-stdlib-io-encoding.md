# Stdlib: I/O, Time & Encoding

> **Kategori:** Go | **Level:** Advanced | **Minggu 10:** Stdlib: I/O, Time & Encoding

## Learning Objectives

- io.Reader and io.Writer as fundamental I/O interfaces
- bufio.Scanner for line-by-line reading
- time: Duration, Format layout, Ticker, Timer
- json.Marshal and json.Unmarshal: Go struct ↔ JSON
- Struct tags: `json:"name,omitempty"` for field control

---

## Program: Log Reader & JSON

```go
package main

import (
    "bufio"
    "encoding/json"
    "fmt"
    "strings"
    "time"
)

type Task struct {
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Done   bool   `json:"done"`
}

func main() {
    data := "baris pertama\nbaris kedua\nbaris ketiga"
    scanner := bufio.NewScanner(strings.NewReader(data))
    lineNum := 1
    for scanner.Scan() {
        fmt.Printf("%d: %s\n", lineNum, scanner.Text())
        lineNum++
    }

    now := time.Now()
    fmt.Println("\nSekarang:", now.Format("2006-01-02 15:04:05"))

    tasks := []Task{
        {ID: 1, Title: "Belajar Go", Done: false},
        {ID: 2, Title: "Membuat API", Done: true},
    }
    jsonData, _ := json.MarshalIndent(tasks, "", "  ")
    fmt.Println("\n=== JSON Output ===")
    fmt.Println(string(jsonData))

    jsonInput := `[{"id":3,"title":"Testing","done":false}]`
    var newTasks []Task
    json.Unmarshal([]byte(jsonInput), &newTasks)
    fmt.Println("\n=== Parsed JSON ===")
    for _, t := range newTasks {
        fmt.Printf("Task %d: %s (done: %v)\n", t.ID, t.Title, t.Done)
    }
}
```

---

## Key Concepts

### io.Reader/Writer
Fundamental I/O interfaces.

### time Package
Time formatting with reference layout.

### JSON
Marshal/Unmarshal with struct tags.

---

## Experiments

- Read file with os.ReadFile and parse JSON
- Create custom time format: "Monday, 2 January 2006"
- Try json.Encoder for streaming write
- Create struct with nested JSON and custom tags

---

## Challenge

Build a log parser: read log file, parse timestamps, filter by level (INFO/ERROR), output as JSON.

---

## Summary

Week 10 of 13: **Stdlib: I/O, Time & Encoding** (Level: Advanced). Powerful standard library. Next week: **HTTP Server & Middleware**.
