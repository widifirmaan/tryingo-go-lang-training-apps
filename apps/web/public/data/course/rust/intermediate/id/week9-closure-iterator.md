# Closure & Iterator

> Kategori: Rust, Bahasa Pemrograman | Level: Menengah | Week 9

## Tujuan Pembelajaran

- Membuat closure dengan sintaks |args| body
- Memahami environment capture oleh closure
- Menggunakan Iterator trait: next, map, filter
- Menerapkan collect dan fold untuk agregasi
- Menggabungkan iterator adapter secara berantai

---

## Program: Gaya Fungsional

```rust
fn main() {
    let tambah = |a: i32, b: i32| a + b;
    println!("5 + 3 = {}", tambah(5, 3));

    let faktor = 3;
    let kali = |n: i32| n * faktor;
    println!("4 * 3 = {}", kali(4));

    let angka = vec![1, 2, 3, 4, 5, 6];
    let genap: Vec<i32> = angka.iter()
        .filter(|&&x| x % 2 == 0)
        .copied()
        .collect();
    println!("Genap: {:?}", genap);

    let kuadrat: Vec<i32> = angka.iter()
        .map(|&x| x * x)
        .collect();
    println!("Kuadrat: {:?}", kuadrat);

    let jumlah: i32 = angka.iter()
        .fold(0, |acc, &x| acc + x);
    println!("Jumlah: {}", jumlah);

    let mut counter = 0;
    let mut increment = || { counter += 1; counter };
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Closure

`|a, b| a + b` — fungsi anonim yang bisa menangkap lingkungan sekitar. `|n| n * faktor` — menangkap `faktor` dari scope luar. Tiga jenis: `Fn`, `FnMut`, `FnOnce`.

### Iterator

`.iter()` membuat iterator. `filter()` menyaring, `map()` mentransformasi, `fold()` mengakumulasi, `collect()` mengumpulkan. Semua lazy — dieksekusi saat `collect` dipanggil.

### For Loop

`for x in vec.iter()` — desugaring dari `into_iter().next()`. Setiap koleksi bisa di-loop.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Closure berbeda** — buat closure yang mengalikan tiga angka
2. **Chain iterator** — gabungkan filter, map, dan fold dalam satu chain
3. **Filter prima** — ganti filter genap jadi filter bilangan prima

---

## Tantangan

Buat fungsi `filter_angka` yang menerima Vec<i32> dan closure predicate, mengembalikan Vec<i32> yang difilter. Buat closure `ganjil` dan `genap`. Gunakan iterator chain untuk transformasi data.

---

## Ringkasan

Closure = fungsi anonim yang menangkap lingkungan. Iterator trait dengan map, filter, fold, collect — functional programming idiomatis. Lazy evaluation: chain tidak dieksekusi sampai collect dipanggil. Minggu depan: proyek CLI.
