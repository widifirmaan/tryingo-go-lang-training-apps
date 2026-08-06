# Stdlib: I/O, Time & Encoding

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 10:** Stdlib: I/O, Time & Encoding

## Tujuan Pembelajaran

- io.Reader dan io.Writer sebagai interface fundamental I/O
- bufio.Scanner untuk membaca baris per baris
- time: Duration, Format layout, Ticker, Timer
- json.Marshal dan json.Unmarshal: Go struct ↔ JSON
- Struct tags: `json:"name,omitempty"` untuk kontrol field

---

## Program: Pembaca Log & JSON

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

## Konsep Kunci

### io.Reader/Writer
Interface fundamental I/O. `bufio.Scanner` untuk baca baris.

### time Package
`time.Now()`, Format layout `2006-01-02 15:04:05`.

### JSON
`Marshal`/`Unmarshal`. Struct tags: `json:"name,omitempty"`.

---

## Eksperimen

- Baca file dengan os.ReadFile dan parse JSON
- Buat custom time format: "Monday, 2 January 2006"
- Coba json.Encoder untuk streaming write
- Buat struct dengan nested JSON dan custom tags

---

## Tantangan

Buat program log parser: baca file log, parse timestamp, filter by level (INFO/ERROR), output sebagai JSON.

---

## Ringkasan

Minggu 10 dari 13: **Stdlib: I/O, Time & Encoding** (Level: Lanjutan). Standard library yang powerful. Minggu depan: **HTTP Server & Middleware**.
