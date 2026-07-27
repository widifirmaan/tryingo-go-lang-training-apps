# Borrowing, Referensi & Slice

> Kategori: Rust, Bahasa Pemrograman | Level: Pemula | Week 3

## Tujuan Pembelajaran

- Membuat referensi shared dengan &T
- Menggunakan mutable reference &mut T
- Memahami aturan borrowing Rust
- Menggunakan slice &[T] dan &str
- Mencegah dangling reference di compile time

---

## Program: Pinjaman & Irisan

```rust
fn main() {
    let s = String::from("halo dunia");
    let len = panjang(&s);
    println!("'{}' panjang: {}", s, len);

    let mut teks = String::from("Rust");
    tambah(&mut teks);
    println!("{}", teks);

    let arr = [1, 2, 3, 4, 5];
    let potong = &arr[1..4];
    println!("Slice array: {:?}", potong);

    let kata = String::from("pemrograman");
    let potong_str = &kata[0..5];
    println!("Slice string: {}", potong_str);
}

fn panjang(s: &str) -> usize {
    s.len()
}

fn tambah(s: &mut String) {
    s.push_str(" hebat");
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Referensi (&T dan &mut T)

`&` membuat referensi shared (borrow). `&mut` untuk mutable reference. Dua aturan: satu &mut ATAU banyak &.

### Slice

`&arr[1..4]` — referensi ke sebagian data. `&str` adalah slice dari String. Aman karena dicek di compile time.

### Dangling Reference

Compiler Rust mencegah dangling reference dengan memeriksa lifetime — referensi tidak bisa hidup lebih lama dari datanya.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Hapus panjang()** — coba akses `s` setelah reference (masih bisa karena borrow)
2. **Ubah slice** — coba `&arr[..3]` atau `&arr[2..]`
3. **Langgar borrowing** — buat `&` dan `&mut` bersamaan (akan error)

---

## Tantangan

Buat fungsi `hitung_panjang(s: &str) -> usize` yang menghitung panjang string tanpa menggunakan .len(). Gunakan slice dan iterasi karakter. Buat fungsi lain yang memodifikasi String via &mut ref.

---

## Ringkasan

Borrowing: &T untuk shared reference, &mut T untuk mutable. Aturan: satu mutable atau banyak immutable. Slice: &[T] dan &str sebagai referensi ke data tanpa ownership. Compiler mencegah dangling reference. Minggu depan: struct, method, dan associated function.
