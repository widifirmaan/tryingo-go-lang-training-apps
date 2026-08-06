# Capstone: REST API + CLI

> **Kategori:** Go | **Level:** Advanced | **Minggu 13:** Capstone: REST API + CLI

## Learning Objectives

- Combine all concepts: structs, interfaces, concurrency, HTTP
- Repository pattern: separate data access and business logic
- CLI with flags + REST API with net/http
- JSON file and in-memory data storage
- Testing: unit tests, table-driven tests, HTTP tests

---

## Program: Note Manager

```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
    "sort"
)

type Note struct {
    ID      int    `json:"id"`
    Title   string `json:"title"`
    Content string `json:"content"`
}

type NoteManager struct {
    notes  []Note
    nextID int
}

func New() *NoteManager {
    return &NoteManager{notes: []Note{}, nextID: 1}
}

func (nm *NoteManager) Add(title, content string) Note {
    n := Note{ID: nm.nextID, Title: title, Content: content}
    nm.nextID++
    nm.notes = append(nm.notes, n)
    return n
}

func (nm *NoteManager) Get(id int) (Note, bool) {
    for _, n := range nm.notes {
        if n.ID == id { return n, true }
    }
    return Note{}, false
}

func (nm *NoteManager) Delete(id int) bool {
    for i, n := range nm.notes {
        if n.ID == id {
            nm.notes = append(nm.notes[:i], nm.notes[i+1:]...)
            return true
        }
    }
    return false
}

func (nm *NoteManager) List() []Note {
    sort.Slice(nm.notes, func(i, j int) bool {
        return nm.notes[i].ID < nm.notes[j].ID
    })
    return nm.notes
}

func (nm *NoteManager) SaveJSON(filename string) error {
    data, err := json.MarshalIndent(nm.notes, "", "  ")
    if err != nil { return fmt.Errorf("marshal error: %w", err) }
    return os.WriteFile(filename, data, 0644)
}

func main() {
    nm := New()
    nm.Add("Belajar Go", "Materi package, function, dan testing")
    nm.Add("REST API", "Buat handler dengan net/http")
    nm.Add("CLI Tool", "Gunakan package flag")

    fmt.Println("=== Daftar Catatan ===")
    for _, n := range nm.List() {
        fmt.Printf("%d. %s\n  %s\n", n.ID, n.Title, n.Content)
    }

    fmt.Println("\n=== CLI Flag (simulasi) ===")
    fmt.Println("go run note.go -add 'Judul Baru'")
    fmt.Println("go run note.go -list")
    fmt.Println("go run note.go -delete 1")

    filename := "notes.json"
    if err := nm.SaveJSON(filename); err != nil {
        fmt.Println("Save error:", err)
    } else {
        fmt.Printf("\nData tersimpan ke %s\n", filename)
    }

    args := []string{"note", "-list"}
    if len(args) > 1 && args[1] == "-list" {
        fmt.Println("\n=== Hasil CLI: -list ===")
        for _, n := range nm.List() {
            fmt.Printf("[%d] %s\n", n.ID, n.Title)
        }
    }
}
```

---

## Key Concepts

### Repository Pattern
Separate data access from business logic.

### CLI + REST API
Single binary for both.

### Testing Integration
Unit, table-driven, HTTP tests.

---

## Experiments

- Add Update method for NoteManager
- Implement LoadJSON to load from file
- Create HTTP handler for NoteManager
- Add unit tests for all methods

---

## Challenge

Build a complete capstone application: REST API + CLI + JSON storage + testing. Choose domain: Task Manager, Blog, or Inventory.

---

## Summary

Week 13 of 13: **Capstone: REST API + CLI** (Level: Advanced). Complete! 🎉 You've mastered Go from scratch to production-ready.
