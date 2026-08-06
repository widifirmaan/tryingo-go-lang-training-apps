# Ownership & Borrowing

> **Kategori:** Rust | **Level:** Pemula | **Minggu 2:** Ownership & Borrowing

## Tujuan Pembelajaran

- Memahami ownership: setiap value punya satu owner
- Move semantics: transfer ownership saat assignment
- Clone: deep copy untuk duplikasi value
- Borrowing: pinjam dengan & (immutable) dan &mut (mutable)
- Aturan borrowing: satu mutable borrow ATAU banyak immutable borrow

---

## Program: Manajemen Memori

```rust
fn main() {
    // Ownership: setiap value punya satu owner
    let s1 = String::from("Halo");
    let s2 = s1; // s1 dipindahkan ke s2 (move)
    // println!("{}", s1); // ERROR: s1 sudah tidak valid
    println!("s2 = {}", s2);

    // Clone: deep copy
    let s3 = String::from("Dunia");
    let s4 = s3.clone();
    println!("s3 = {}, s4 = {}", s3, s4);

    // Borrowing: pinjam dengan &
    let s5 = String::from("Rust");
    let len = hitung_panjang(&s5);
    println!("Panjang '{}' = {}", s5, len);

    // Mutable borrow
    let mut s6 = String::from("Halo");
    ubah_string(&mut s6);
    println!("Setelah diubah: {}", s6);

    // Aturan borrowing
    let mut s = String::from("Halo");
    let r1 = &s;
    let r2 = &s;
    println!("r1 = {}, r2 = {}", r1, r2);
    // let r3 = &mut s; // ERROR: tidak bisa mutable borrow saat immutable borrow aktif

    // Dangling reference prevention
    // let reference_to_nothing = dangle(); // ERROR: tidak bisa return reference ke local
}

fn hitung_panjang(s: &String) -> usize {
    s.len()
}

fn ubah_string(s: &mut String) {
    s.push_str(", Dunia!");
}
```

---

## Konsep Kunci

### Ownership
Setiap value di Rust punya satu owner. Saat owner keluar scope, value di-drop.

### Move
Assignment `let s2 = s1` untuk tipe non-Copy akan memindahkan ownership. s1 tidak bisa digunakan lagi.

### Clone
`s3.clone()` membuat deep copy. s3 dan s4 independen.

### Borrowing
`&s` immutable borrow, `&mut s` mutable borrow. Aturan: satu mutable ATAU banyak immutable.

### Dangling Reference
Rust mencegah dangling reference di compile time.

---

## Eksperimen

- Coba println! s1 setelah move — lihat error
- Buat fungsi yang return ownership
- Eksperimen dengan multiple mutable borrow
- Buat struct dengan String field dan test ownership
- Coba Copy trait pada tipe primitif

---

## Tantangan

Buat program manajemen buku: struct Book dengan title (String), fungsi new(), display(), dan clone(). Demonstrasikan ownership dan borrowing.

---

## Ringkasan

Minggu 2 dari 14: **Ownership & Borrowing** (Level: Pemula). Ini yang membuat Rust unik. Minggu depan: **Struct & Method**.
