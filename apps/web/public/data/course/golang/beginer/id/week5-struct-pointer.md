# Struct, Method & Pointer

> Kategori: Go, Bahasa Pemrograman | Level: Pemula | Week 5

## Tujuan Pembelajaran

- Mendefinisikan struct sebagai tipe data kustom
- Menambahkan method dengan value vs pointer receiver
- Memahami pointer (& dan *)
- Menggunakan constructor function New...
- Menerapkan method chaining

---

## Program: Data Pengguna

```go
package main

import "fmt"

type User struct {
    ID       int
    Nama     string
    Email    string
    IsActive bool
}

func NewUser(id int, nama, email string) User {
    return User{ID: id, Nama: nama, Email: email, IsActive: true}
}

func (u User) Sapa() string {
    return "Halo, saya " + u.Nama
}

func (u *User) Nonaktifkan() {
    u.IsActive = false
}

type Counter struct {
    Value int
}

func (c *Counter) Tambah(n int) *Counter {
    c.Value += n
    return c
}

func main() {
    x := 42
    p := &x
    fmt.Println("x:", x, "*p:", *p)
    *p = 21
    fmt.Println("Setelah *p = 21, x:", x)

    u1 := NewUser(1, "Alice", "alice@example.com")
    fmt.Println(u1.Sapa())
    fmt.Println("Aktif:", u1.IsActive)
    u1.Nonaktifkan()
    fmt.Println("Setelah dinonaktifkan:", u1.IsActive)

    c := &Counter{}
    c.Tambah(5).Tambah(10).Tambah(3)
    fmt.Println("Counter:", c.Value)
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Struct

`type User struct { ... }` -- mengelompokkan data terkait. Mirip class tanpa inheritance.

### Method

Fungsi dengan `receiver`: **value receiver** (`func (u User)`) tidak bisa mengubah struct asli; **pointer receiver** (`func (u *User)`) bisa.

### Pointer

`&` membuat pointer, `*` mengakses nilai yang ditunjuk. Berguna untuk efisiensi dan mutasi.

### Method Chaining

Dengan mengembalikan `*Counter`, panggilan bisa dirantai: `c.Tambah(5).Tambah(10)`.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah field** -- tambahkan `Umur int` ke struct User
2. **Method baru** -- buat `(u User) Info() string` untuk semua field
3. **Chain lebih panjang** -- tambah `.Tambah(7)` di chaining

---

## Tantangan

Buat struct `Product` (ID, Name, Price, Stock). Tambahkan method `ApplyDiscount(percent)` yang mengurangi Price. Implementasikan method chaining.

---

## Ringkasan

Struct mengelompokkan data, method menambahkan perilaku. Pointer receiver untuk mutasi. Method chaining. Constructor (New...) pola standar Go. Minggu depan: interface dan package.
