# Ownership & Borrowing — Pinjam Buku Harus Balik

> **Kategori:** Rust | **Level:** Pemula | **Minggu 2:** Ownership & Borrowing

## Tujuan Pembelajaran

- 1 pemilik 1 buku — `let s = String::from("halo"); let s2 = s;` → `s` tidak bisa dipakai lagi (pindah milik)
- Pinjam `&s` (baca) dan `&mut s` (baca+tulis) — buku dipinjam, balik lagi
- Aturan: 1 pinjam mut **atau** banyak pinjam baca, tidak boleh campur
- `s.len()` pinjam baca, `s.push_str()` pinjam mut

---

## Kenapa Ini Penting Buat Kamu?

Warung pinjam buku kas ke cabang — jika 2 cabang tulis bersamaan, catat tumpang tindih. Rust cegah **data race** sejak kompilasi — tidak ada buku hilang. Awal ribet, tapi aman.

---

## Program: Perpustakaan Pinjam

```rust
fn main() {
    // 1. Pindah milik (move)
    let s1 = String::from("Warung");
    let s2 = s1; // s1 pindah ke s2, s1 hangus
    // println!("{}", s1); // ❌ error: value borrowed after move
    println!("s2: {}", s2);

    // 2. Pinjam baca &s
    let s = String::from("Bu Siti");
    let len = hitung_panjang(&s); // pinjam, s tetap
    println!("'{}' panjang {}", s, len);

    // 3. Pinjam tulis &mut
    let mut t = String::from("Beras");
    tambah_gula(&mut t);
    println!("Setelah tambah: {}", t);

    // 4. Aturan pinjam
    let mut u = String::from("kopi");
    let r1 = &u; // pinjam baca
    let r2 = &u;
    println!("{} dan {}", r1, r2); // boleh banyak baca
    // let r3 = &mut u; // ❌ tidak boleh mut saat ada baca

    let mut v = String::from("teh");
    let w = &mut v; // 1 pinjam mut
    // let w2 = &mut v; // ❌ tidak boleh 2 mut
    w.push_str(" manis");
    println!("{}", w);
}

fn hitung_panjang(s: &String) -> usize {
    s.len() // pinjam baca
}

fn tambah_gula(s: &mut String) {
    s.push_str(" + Gula");
}
```

---

## Konsep Kunci

### Move = Pindah Milik
`let s2 = s1` → `s1` mati. Untuk copy, `let s2 = s1.clone()`.

### `&` vs `&mut`
- `&String` pinjam baca (banyak boleh)
- `&mut String` pinjam tulis (1 saja, tidak boleh bareng baca)

### Aturan Emas
Banyak baca **atau** 1 tulis, tidak campur — cegah tumpang tindih.

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Cabang

- **Move = serah terima buku**: cabang A serah ke B, A tidak punya lagi.
- **`&` = fotokopi baca**: cabang pinjam fotokopi, buku asli tetap di pusat.
- **`&mut` = pinjam asli untuk tulis**: hanya 1 yang boleh tulis.

---

## Eksperimen

- **Hijau:** `let s1 = String::from("halo"); let s2 = s1.clone(); println!("{} {}", s1, s2)` → keduanya hidup?
- **Kuning:** `hitung_panjang(&s)` setelah itu `s` masih bisa dipakai? Ya.
- **Merah:** `let r1=&s; let r2=&mut s;` → error?

---

## Tantangan

**Warung Pinjam:** Buat `fn cetak(s: &String)`, `fn tambah_stok(s: &mut String)`, panggil `cetak(&warung)` lalu `tambah_stok(&mut warung)` → urutan harus benar (baca dulu baru mut).

---

## Glosarium Mini

- **Ownership/move**: pemilik/pindah
- **Borrow &/&mut**: pinjam
- **Clone**: fotokopi

---

## Ringkasan

Minggu 2: **Ownership** — pinjam harus balik. Minggu depan: **Struct** — kartu Rust.
