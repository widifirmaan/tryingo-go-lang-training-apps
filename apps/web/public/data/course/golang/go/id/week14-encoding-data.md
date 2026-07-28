# Encoding: JSON & Data

> Go | Modul 14

## Tujuan Pembelajaran

- Marshaling dan Unmarshaling JSON
- Menggunakan JSON struct tags
- Bekerja dengan encoding/csv
- Menggunakan sort package
- Menerapkan encoding/base64

---

## Program: Marshal Data

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

## Penjelasan

`encoding/json` — Marshal untuk Go→JSON, Unmarshal untuk JSON→Go. Struct tags ``json:"name"`` mengontrol nama field. `sort` package: `sort.Ints`, `sort.Strings`, `sort.Slice` dengan custom comparator. `encoding/csv` untuk data tabular.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah fungsi baru dengan tipe return berbeda
- Ganti for loop dengan range
- Coba tipe data yang belum dicoba

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.

---

## Ringkasan

Modul 14 dari 16: **Encoding: JSON & Data**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **15. HTTP Server & Testing**.
