# Interface & Generics — Kontrak Warung

> **Kategori:** Go | **Level:** Menengah | **Minggu 6:** Interface & Generics

## Tujuan Pembelajaran

- `type Kasir interface { Hitung() int }` — kontrak: siapa pun yang bisa `Hitung()` boleh jadi kasir
- Struct `Beras`, `Minyak` implisit implement — tidak perlu `implements`
- `any` untuk apa saja, `generics [T any]` rak untuk tipe apa saja

---

## Kenapa Ini Penting Buat Kamu?

Warung punya kasir beras, kasir sembako — semua harus bisa `Hitung()`. Interface = **kontrak**: jika bisa `Hitung`, boleh jaga kasir.

---

## Program: Kontrak Kasir

```go
package main
import "fmt"

type Kasir interface { Hitung() int }

type Beras struct{ Kg, Harga int }
func (b Beras) Hitung() int { return b.Kg * b.Harga }

type Minyak struct{ Liter, Harga int }
func (m Minyak) Hitung() int { return m.Liter * m.Harga }

func Bayar(k Kasir){ fmt.Printf("Bayar: Rp %d\n", k.Hitung()) }

func Pertama[T any](list []T) T { return list[0] }

func main(){
  Bayar(Beras{Kg:2, Harga:12500})
  Bayar(Minyak{Liter:2, Harga:17000})
  fmt.Println("Pertama:", Pertama([]string{"Beras","Minyak"}))
}
```

---

## Ringkasan

Minggu 6: **Kontrak** — interface implisit. Minggu depan: **Pointer**.
