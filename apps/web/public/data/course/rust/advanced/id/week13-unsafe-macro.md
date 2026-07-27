# Unsafe Rust & Macro

> Kategori: Rust, Bahasa Pemrograman | Level: Lanjutan | Week 13

## Tujuan Pembelajaran

- Memahami blok dan fungsi unsafe
- Menggunakan raw pointer *const T dan *mut T
- Mengetahui unsafe superpowers (dereference, FFI)
- Membuat deklaratif macro dengan macro_rules!
- Menulis macro sederhana untuk code generation

---

## Program: Unsafe

```rust
macro_rules! halo {
    ($nama:expr) => {
        println!("Halo, {}!", $nama);
    };
    ($nama:expr, $tahun:expr) => {
        println!("Halo, {}! Tahun {}", $nama, $tahun);
    };
}

fn main() {
    halo!("Dunia");
    halo!("Rustacean", 2025);

    let mut x = 42;
    let r1: *const i32 = &x as *const i32;
    let r2: *mut i32 = &mut x as *mut i32;

    unsafe {
        println!("Nilai dari raw pointer: {}", *r1);
        *r2 = 100;
        println!("Setelah unsafe write: {}", *r2);
    }

    println!("Nilai x final: {}", x);

    let arr = [10, 20, 30, 40, 50];
    let p = arr.as_ptr();
    unsafe {
        for i in 0..3 {
            println!("arr[{}] = {}", i, *p.add(i));
        }
    }
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Unsafe

`unsafe {}` — blok untuk operasi yang Rust tidak bisa jamin safety. Superpowers: dereference raw pointer, panggil FFI, akses union, inline assembly.

### Raw Pointer

`*const T` (immutable) dan `*mut T` (mutable). Bisa null, dangling, alias. Hanya bisa di-dereference di dalam unsafe block.

### Macro

`macro_rules!` — declarative macro untuk code generation. Pola `$nama:expr` mencocokkan expression. Berguna untuk mengurangi boilerplate.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Macro baru** — buat macro `tambah!(a, b)` yang menghasilkan a + b
2. **Array pointer** — akses arr[4] dan arr[5] via pointer unsafe
3. **Tanpa unsafe** — coba dereference raw pointer di luar unsafe (gagal kompilasi)

---

## Tantangan

Buat macro `vektor![]` yang membuat Vec dengan elemen yang diberikan. Gunakan unsafe untuk mengakses elemen array via raw pointer. Implementasi fungsi unsafe `kecepatan` yang menghitung dari raw pointer.

---

## Ringkasan

Unsafe block memberikan akses ke raw pointer dan FFI — tanggung jawab keamanan ada di programmer. macro_rules! untuk deklaratif macro yang mengurangi boilerplate. Kombinasi unsafe + macro untuk low-level abstraksi. Minggu depan: async/await dan proyek akhir.
