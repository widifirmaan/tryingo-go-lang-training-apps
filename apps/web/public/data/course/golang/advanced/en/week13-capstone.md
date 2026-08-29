# Capstone — Warung CLI + API Lengkap

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 13:** Capstone: REST API + CLI

## Tujuan Pembelajaran

- Gabung `struct`, `interface`, `json`, `http`, `flag`, `test` jadi 1 warung CLI+API

---

## Program: Warung Capstone

```go
package main
import ("encoding/json"; "fmt"; "os")

type Produk struct{ ID int `json:"id"`; Nama string `json:"nama"`; Harga int `json:"harga"` }

func simpan(produk []Produk){
  data,_ := json.MarshalIndent(produk, "", "  ")
  os.WriteFile("produk.json", data, 0644)
}

func main(){
  daftar := []Produk{{ID:1, Nama:"Beras", Harga:62000}}
  simpan(daftar)
  fmt.Println("Tersimpan produk.json — siap untuk API & CLI")
  fmt.Println("Lanjut: tambah flag --tambah 'Bayam 5000' dan handler /produk")
}
```

**Tugas capstone:** Tambah `flag`, `http.HandleFunc`, `Test` — gabung semua minggu 1-12 jadi `warung` binary 1 file.

---

## Ringkasan

Minggu 13: **Capstone** — warung CLI+API jadi. **Selesai Go dari nol ke ahli!**
