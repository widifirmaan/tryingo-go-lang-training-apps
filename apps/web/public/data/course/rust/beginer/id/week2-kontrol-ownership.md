# Control Flow & Konsep Ownership

> Kategori: Rust, Bahasa Pemrograman | Level: Pemula | Week 2

## Tujuan Pembelajaran

- Menggunakan if/else untuk percabangan
- Menerapkan loop, while, dan for untuk perulangan
- Memahami konsep ownership: move semantics
- Membedakan String dan &str
- Menggunakan match sederhana pada integer

---

## Program: Alur & Kepemilikan

```rust
fn main() {
    let nilai = 85;
    if nilai >= 90 {
        println!("Grade: A");
    } else if nilai >= 75 {
        println!("Grade: B");
    } else {
        println!("Grade: C");
    }

    let mut count = 0;
    loop {
        count += 1;
        print!("loop{} ", count);
        if count >= 3 {
            break;
        }
    }
    println!();

    for i in 0..3 {
        print!("for{} ", i);
    }
    println!();

    let s1 = String::from("halo");
    let s2 = s1;
    println!("s2: {}", s2);

    let angka = 2;
    match angka {
        1 => println!("satu"),
        2 => println!("dua"),
        _ => println!("lainnya"),
    }
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Control Flow

`if/else` untuk percabangan. `loop` untuk perulangan tak terbatas, `while` dan `for` untuk iterasi terkontrol.

### Ownership Dasar

Setiap nilai punya satu pemilik. `let s2 = s1;` memindahkan ownership — `s1` tidak bisa dipakai lagi. `String` di-heap, `&str` di-stack.

### Match

`match` pada integer: pola dicocokkan dari atas ke bawah. Wajib exhaustive.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah nilai** — coba nilai 92, 70, 45 dan lihat grade berbeda
2. **Match angka** — ganti angka match jadi 1 atau 3
3. **Ownership** — coba akses `s1` setelah move ke `s2` (akan error kompilasi)

---

## Tantangan

Buat program kalkulator sederhana dengan menu: input dua angka, pilih operasi (tambah/kurang/kali/bagi) via match. Gunakan if/else untuk validasi pembagian dengan nol. Simulasikan ownership dengan memindahkan String.

---

## Ringkasan

Control flow: if/else, loop, while, for. Ownership: setiap nilai punya satu pemilik, move memoryindahkan kepemilikan. String vs &str. match untuk pattern matching. Minggu depan: borrowing, referensi, dan slice.
