# Encoding: JSON & Data

> Go | Module 14

## Learning Objectives

- Marshal and Unmarshal JSON
- Use JSON struct tags
- Work with encoding/csv
- Use the sort package
- Apply encoding/base64

---

## Program: Data Marshal

```go
package main

import (
    "encoding/json"
    "fmt"
    "sort"
)

type Task struct {
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Done   bool   `json:"done"`
    Priority int  `json:"priority"`
}

func main() {
    // Marshal (struct -> JSON)
    tasks := []Task{
        {ID: 1, Title: "Belajar Go", Done: false, Priority: 1},
        {ID: 2, Title: "Membuat API", Done: true, Priority: 2},
    }

    jsonData, err := json.MarshalIndent(tasks, "", "  ")
    if err != nil {
        fmt.Println("Error marshaling:", err)
        return
    }
    fmt.Println("=== JSON Output ===")
    fmt.Println(string(jsonData))

    // Unmarshal (JSON -> struct)
    jsonInput := `[{"id":3,"title":"Testing","done":false,"priority":3}]`
    var newTasks []Task
    err = json.Unmarshal([]byte(jsonInput), &newTasks)
    if err != nil {
        fmt.Println("Error unmarshaling:", err)
        return
    }
    fmt.Println("\n=== Parsed JSON ===")
    for _, t := range newTasks {
        fmt.Printf("Task %d: %s (done: %v)\n", t.ID, t.Title, t.Done)
    }

    // Sort
    nums := []int{5, 2, 8, 1, 9}
    sort.Ints(nums)
    fmt.Println("\nSorted:", nums)

    names := []string{"Budi", "Alex", "Siti"}
    sort.Strings(names)
    fmt.Println("Sorted names:", names)

    // Custom sort by priority
    sort.Slice(tasks, func(i, j int) bool {
        return tasks[i].Priority < tasks[j].Priority
    })
    fmt.Println("By priority:")
    for _, t := range tasks {
        fmt.Printf("  %s (prioritas %d)\n", t.Title, t.Priority)
    }
}
```

---

## Explanation

`encoding/json` — Marshal for Go→JSON, Unmarshal for JSON→Go. Struct tags ``json:"name"`` control field names. `sort` package: `sort.Ints`, `sort.Strings`, `sort.Slice` with custom comparators. `encoding/csv` for tabular data.

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

Module 14 of 16: **Encoding: JSON & Data**. Go delivers high performance with simple syntax. Next week: **HTTP Server & Testing**.
