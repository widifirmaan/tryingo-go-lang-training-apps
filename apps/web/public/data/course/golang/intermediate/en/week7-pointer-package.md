# Pointer & Package — Alamat Gudang

> **Kategori:** Go | **Level:** Menengah | **Minggu 7:** Pointer, Memory & Package

## Tujuan Pembelajaran

- `&` alamat, `*` buka — `p := &x` alamat kotak, `*p` isi kotak
- `package warung` — bagi file per rak

---

## Program

```go
package main
import "fmt"

func tambah(p *int){ *p += 10 }

func main(){
  stok := 10
  tambah(&stok) // kirim alamat, bukan salinan
  fmt.Println("Stok setelah tambah:", stok) // 20

  // package: go mod init warung
  // warung/produk.go → package warung, func Harga() int
  // main.go → import "warung"
}
```

---

## Ringkasan

Minggu 7: **Alamat** — `&` dan `*` untuk ubah asli.
