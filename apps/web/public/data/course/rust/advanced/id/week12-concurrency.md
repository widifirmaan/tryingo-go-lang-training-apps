# Concurrency — Kasir Paralel Anti-Rebutan Rust

> **Kategori:** Rust | **Level:** Lanjutan | **Minggu 12:** Concurrency
> **Prasyarat:** Minggu 11 — **Smart Pointers**.

## Tujuan Pembelajaran

- `thread::spawn` kasir baru + `move` pindah milik + `mpsc::channel` ban + `Arc<Mutex<T>>` brankas bersama (sumber: doc.rust-lang.org/book/ch16)
- Aturan: "fearless concurrency" — rebutan DITOLAK compiler!

---

## Kenapa Ini Penting Buat Kamu?

2 kasir kurang stok bareng tanpa kunci = hasil salah (race!). Di C/Go, salah ketahuan saat run (kadang!). Di Rust, `Arc<Mutex>` dipaksa compiler — salah tidak compile. Tidur tenang.

---

## Program: 2 Kasir Brankas Rust

```rust
use std::thread;
use std::sync::{Arc, Mutex, mpsc};

fn main() {
  // Brankas bersama (hitung-thread + kunci)
  let stok = Arc::new(Mutex::new(10));

  // Ban 2 kasir
  let (kirim, terima) = mpsc::channel();

  for kasir in 1..=2 {
    let s = Arc::clone(&stok);      // tambah pemilik
    let k = kirim.clone();          // tambah pengirim
    thread::spawn(move || {         // move: pindah milik ke thread!
      let mut stok = s.lock().unwrap(); // kunci! (1 yang pegang)
      *stok -= 1;
      k.send(format!("Kasir {} jual, sisa {}", kasir, *stok)).unwrap();
    }); // kunci lepas otomatis di sini
  }
  drop(kirim);

  for pesan in terima {
    println!("{}", pesan);
  }
  println!("Stok akhir: {} (tepat 8!)", stok.lock().unwrap());
}
```

---

## Konsep Kunci

### `thread::spawn(move || ...)` = Kasir Baru Bawa Bekal
`move` pindahkan milik ke thread (tanpa ini, pinjam mati duluan → ditolak!).

### `Arc<Mutex<T>>` = Brankas Bersama
`Arc` bagi milik antar thread, `Mutex` kunci (1 pegang). `lock()` tunggu giliran.

### `mpsc::channel` = Ban Pesan
`send` kirim, `for terima` terima sampai pengirim habis.

---

## Penjelasan untuk Pemula

### Analogi: 2 Kasir + 1 Brankas
- **Mutex = kunci brankas**: 1 pegang, lain antre.
- **Arc = kunci duplikat terhitung**: habis dipakai semua → brankas musnah aman.

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `Arc::clone` → hitungan 3 (main + 2 thread).
2. Tiap thread `lock` → kurang → lepas. Hasil TEPAT 8 (tak pernah 9!).

### 3 Istilah Wajib
1. **spawn/move**: kasir-baru/bawa-bekal
2. **Arc/Mutex**: bagi/kunci
3. **mpsc**: ban-pesan

---

## Eksperimen

- **Hijau:** Tanpa `Mutex` (pakai `Rc<RefCell>`)? → error `not Send`! (Compiler jaga! Ganti Arc.)
- **Kuning:** Lupa `move` → error borrow? Tambah.
- **Merah:** Lupa `drop(kirim)` → `for terima` tunggu selamanya? (Pengirim masih ada!)

---

## Tantangan

**Dapur Paralel:** 3 thread masak + `Arc<Mutex<Stok>>` + `channel` lapor + hasil tepat (tidak lebih!).
- **Sambungan (Minggu 11 — Smart Pointers):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **spawn/Mutex/Arc**: kasir/kunci/bagi
- **mpsc/move**: ban/bawa

---

## Ringkasan

Minggu 12 dari 14: **Paralel Anti-Rebutan** (Level: Lanjutan). Compiler jaga. Minggu depan: **Macros**.
