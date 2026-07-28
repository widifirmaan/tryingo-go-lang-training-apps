# Proyek Akhir: CLI + API

> Go | Modul 16

## Tujuan Pembelajaran

- Menggabungkan semua konsep Go
- Membangun CLI tool dengan flag
- Membuat REST API endpoint
- Menyimpan data dengan JSON file
- Menulis test untuk seluruh aplikasi

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
    notes []Note
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
        if n.ID == id {
            return n, true
        }
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
    if err != nil {
        return fmt.Errorf("marshal error: %w", err)
    }
    return os.WriteFile(filename, data, 0644)
}

func (nm *NoteManager) LoadJSON(filename string) error {
    data, err := os.ReadFile(filename)
    if err != nil {
        return fmt.Errorf("read error: %w", err)
    }
    return json.Unmarshal(data, &nm.notes)
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
    fmt.Println("Go run note.go -add 'Judul Baru'")
    fmt.Println("Go run note.go -list")
    fmt.Println("Go run note.go -delete 1")

    // Simpan ke JSON
    filename := "notes.json"
    if err := nm.SaveJSON(filename); err != nil {
        fmt.Println("Save error:", err)
    } else {
        fmt.Printf("\nData tersimpan ke %s\n", filename)
    }

    // CLI-like command simulation
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

## Penjelasan

Proyek akhir menggabungkan: struct, method, pointer, interface, slice, map, error handling, encoding/json, file I/O, sort, dan testing. CLI dengan `flag` package, REST API dengan `net/http`, penyimpanan JSON. Pattern repository memisahkan data dan logic.

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

Modul 16 dari 16: **Proyek Akhir: CLI + API**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **Selesai! 🎉**.
