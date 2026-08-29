# Stdlib: I/O & Encoding — Baca Tulis Gudang

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 10:** Stdlib: I/O, Time & Encoding

## Tujuan Pembelajaran

- `io.Reader`/`Writer` seperti selang air, `bufio.Scanner` baca baris, `time.Now().Format("2006-01-02")` stempel, `json.Marshal` bungkus JSON

---

## Kenapa Ini Penting Buat Kamu?

Warung simpan nota ke `nota.json` dan baca lagi besok — butuh `json` + `os.WriteFile`.

---

## Program: Nota JSON

```go
package main
import ("encoding/json"; "fmt"; "os"; "time")

type Nota struct {
  ID int `json:"id"`
  Nama string `json:"nama"`
  Total int `json:"total"`
  Tanggal string `json:"tanggal"`
}

func main(){
  nota := Nota{ID:1, Nama:"Budi", Total:62000, Tanggal: time.Now().Format("2006-01-02")}
  data, _ := json.MarshalIndent(nota, "", "  ")
  os.WriteFile("nota.json", data, 0644)
  fmt.Println(string(data))

  // Baca lagi
  b, _ := os.ReadFile("nota.json")
  var n Nota
  json.Unmarshal(b, &n)
  fmt.Printf("Baca: %+v\n", n)
}
```

`go run nota.go` → buat `nota.json` → baca lagi.

---

## Konsep Kunci

### `json.Marshal`/`Unmarshal` + Tag
`json:"nama"` label di JSON.

### `time.Now().Format("2006-01-02")` = Stempel
Format Go pakai tanggal referensi `2006-01-02 15:04:05`.

---

## Ringkasan

Minggu 10: **I/O & JSON** — tulis & baca nota.
