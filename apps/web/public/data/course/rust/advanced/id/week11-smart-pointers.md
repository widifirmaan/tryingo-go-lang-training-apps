# Smart Pointers — Kotak Pintar Rust

> **Kategori:** Rust | **Level:** Lanjutan | **Minggu 11:** Smart Pointers

## Tujuan Pembelajaran

- `Box<T>` kotak heap (untuk rekursif), `Rc<T>` hitung pemilik, `RefCell<T>` ubah-lewat-pinjam, `Arc<T>` versi thread (sumber: doc.rust-lang.org/book/ch15)

---

## Kenapa Ini Penting Buat Kamu?

`enum Daftar { Isi(i32, Daftar) }` tanpa `Box` → error `infinite size` (ukuran tak hingga!). Daftar belanja bersama 2 kasir butuh `Rc`. Ubah lewat `&` butuh `RefCell`.

---

## Program: Kotak Pintar Warung

```rust
use std::rc::Rc;
use std::cell::RefCell;

// 1. Box: ukuran pasti (rekursif butuh!)
#[derive(Debug)]
enum Daftar {
  Kosong,
  Isi(i32, Box<Daftar>), // Box = ukuran pointer (8 byte, pasti!)
}

fn main() {
let d = Daftar::Isi(62000, Box::new(Daftar::Kosong));
println!("{:?}", d);

// 2. Rc: 2 pemilik (hitung!)
let stok = Rc::new(RefCell::new(10));
let kasir1 = Rc::clone(&stok);
let kasir2 = Rc::clone(&stok);
kasir1.borrow_mut(); // ubah lewat pinjam & (RefCell!)
*kasir1.borrow_mut() -= 1;
println!("Stok: {}, pemilik: {}", kasir2.borrow(), Rc::strong_count(&stok)); // 9, 3
}
```

---

## Konsep Kunci

### `Box<T>` = Kotak Heap Pasti
Ukuran pointer tetap → rekursif bisa. `Deref` otomatis (`*b` jarang tulis).

### `Rc<T>` + `RefCell<T>` = Hitung + Ubah-Lewat-Pinjam
`Rc::clone` tambah pemilik (murah, bukan copy data!). `borrow_mut` ubah meski `&`.

### `Arc<T>` = Rc Thread-Safe
`Rc` untuk 1 thread, `Arc` (atomic) untuk banyak thread (W12!).

---

## Penjelasan untuk Pemula

### Analogi: Kotak & Kunci Bersama
- **Box = kardus pasti**: ukuran tahu, bisa susun.
- **Rc = kunci duplikat + hitungan**: 3 pegang, kembali semua baru kunci musnah.
- **RefCell = ganti isi lewat kaca**: pinjam baca tapi bisa tulis (aturan runtime!).

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `Rc::clone(&stok)` → hitungan 2 → 3 (data 1!).
2. Hitungan 0 → data dibuang otomatis.

### 3 Istilah Wajib
1. **Box/Rc/RefCell**: kotak/hitung/ubah-pinjam
2. **Arc**: hitung-thread

---

## Eksperimen

- **Hijau:** `Rc::strong_count` setelah clone 2x → 3?
- **Kuning:** `borrow_mut` 2x bersamaan → panic runtime? (Aturan RefCell!)
- **Merah:** Enum rekursif tanpa `Box` → error `infinite size`? Tambah Box.

---

## Tantangan

**Gudang Bersama:** `Rc<RefCell<Stok>>` + 2 kasir kurang bareng + `strong_count` + cetak sisa.

---

## Glosarium Mini

- **Box/Rc/RefCell/Arc**: kotak/hitung/ubah/antar-thread

---

## Ringkasan

Minggu 11 dari 14: **Kotak Pintar** (Level: Lanjutan). Rekursif + bersama bisa. Minggu depan: **Concurrency**.
