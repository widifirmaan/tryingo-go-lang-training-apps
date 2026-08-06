# Capstone: REST API + CLI

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 13:** Capstone: REST API + CLI

## Tujuan Pembelajaran

- Menggabungkan semua konsep: struct, interface, concurrency, HTTP
- Repository pattern: pemisahan data access dan business logic
- CLI dengan flag + REST API dengan net/http
- Penyimpanan data JSON file dan in-memory
- Testing: unit test, table-driven test, HTTP test

---

## Program: Manajemen Catatan

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

## Konsep Kunci

### Repository Pattern
Pemisahan data access dan business logic.

### CLI + REST API
Satu binary untuk server dan CLI tool.

### Testing Integration
Unit test, table-driven test, HTTP test, coverage.

---

## Eksperimen

- Tambah method Update untuk NoteManager
- Implementasikan LoadJSON untuk load dari file
- Buat HTTP handler untuk NoteManager
- Tambah unit test untuk semua method

---

## Tantangan

Buat aplikasi capstone lengkap: REST API + CLI + JSON storage + testing. Pilih domain: Task Manager, Blog, atau Inventory.

---

## Ringkasan

Minggu 13 dari 13: **Capstone: REST API + CLI** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Go dari nol hingga production-ready.
