# Lifetimes — KTP Pinjaman Rust

> **Kategori:** Rust | **Level:** Menengah | **Minggu 9:** Lifetimes
> **Prasyarat:** Minggu 8 — **Generics**.

## Tujuan Pembelajaran

- `fn terpanjang<'a>(x: &'a str, y: &'a str) -> &'a str` — hasil hidup selama yang TERPENDEK (sumber: doc.rust-lang.org/book/ch10-03-lifetime-syntax)
- Elision: 1 input → output ikut itu (tak perlu tulis `'a`)

---

## Kenapa Ini Penting Buat Kamu?

Pinjam buku A (balik Senin) + B (balik Jumat) → fotokopi gabungan berlaku sampai... Senin (terpendek!). Tanpa lifetimes, Rust tolak (takut fotokopi basi Jumat!). Dengan `'a`, compiler buktikan aman SEBELUM run (bukan segfault saat run seperti C!).

---

## Program: Fotokopi Terpendek (Contoh Resmi Book)

```rust
// 'a = umur pinjaman. Hasil hidup selama yang TERPENDEK dari x, y.
fn terpanjang<'a>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() { x } else { y }
}

fn main() {
  let s1 = String::from("beras pulen"); // hidup sampai akhir main
  let hasil;
  {
    let s2 = String::from("gula"); // hidup sampai akhir blok ini
    hasil = terpanjang(s1.as_str(), s2.as_str());
    println!("Terpanjang: {}", hasil); // OK: s2 masih hidup!
  }
  // println!("{}", hasil); // ERROR! s2 sudah mati (borrow checker jaga)
}
```

Elision (tak perlu tulis — compiler tebak):
```rust
fn pertama(teks: &str) -> &str { teks } // 1 input → output ikut umurnya
```

---

## Konsep Kunci

### `'a` = Cap Umur Pinjaman
`fn f<'a>(x: &'a str) -> &'a str` — output hidup selama `x`.

### Terpendek Menang
2 input beda umur → hasil ikut yang pendek. Compiler tolak jika dipakai lewat itu.

### Elision = Tak Perlu Tulis
1 input → otomatis. Tulis `'a` jika 2+ input atau struct simpan reference.

---

## Penjelasan untuk Pemula

### Analogi: Fotokopi 2 Buku Beda Jatuh Tempo
- **'a = masa berlaku fotokopi** = min(Senin, Jumat) = Senin.
- **Borrow checker = pustakawan galak**: tolak sebelum buku basi (compile-time, bukan saat baca!).

### Langkah 0 — Siapkan Device
- Sama W1. Baca error `borrowed value does not live long enough` — itu PETUNJUK, bukan musuh!

### Cara Komputer Membaca
1. `terpanjang(s1, s2)` → umur hasil = min(umur s1, umur s2).
2. Pakai `hasil` setelah s2 mati → DITOLAK.

### 3 Istilah Wajib
1. **Lifetime/'a/elision**: umur/cap/otomatis

---

## Eksperimen

- **Hijau:** Pakai `hasil` DI DALAM blok → jalan?
- **Kuning:** Hapus `<'a>` → error `missing lifetime specifier`? (Butuh karena 2 input!)
- **Merah:** Baca error `does not live long enough` → tunjuk baris s2 mati? Pahami!

---

## Tantangan

**Perpustakaan Aman:** `fn pinjam<'a>(a: &'a str, b: &'a str) -> &'a str` + 2 umur beda + buktikan pakai-lewat-mati ditolak + elision 1-input.
- **Sambungan (Minggu 8 — Generics):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Lifetime/elision/borrow-checker**: umur/otomatis/pustakawan

---

## Ringkasan

Minggu 9 dari 14: **KTP Pinjaman** (Level: Menengah). Aman sebelum run. Minggu depan: **Testing**.
