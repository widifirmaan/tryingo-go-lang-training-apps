# Module, Crate & Testing

> Kategori: Rust, Bahasa Pemrograman | Level: Menengah | Week 7

## Tujuan Pembelajaran

- Membuat hierarki module dengan mod dan pub
- Mengimpor path dengan use dan super
- Menulis unit test dengan #[test] dan assert_eq!
- Menggunakan #[cfg(test)] untuk test module
- Menulis dokumentasi dengan komentar ///

---

## Program: Organisasi Kode

```rust
/// Modul utilitas berisi fungsi-fungsi bantuan
mod utils {
    /// Modul operasi matematika
    pub mod math {
        pub fn tambah(a: i32, b: i32) -> i32 { a + b }
        pub fn kali(a: i32, b: i32) -> i32 { a * b }
    }

    /// Modul manipulasi string
    pub mod str_utils {
        pub fn sapa(nama: &str) -> String { format!("Halo, {}!", nama) }
    }
}

use utils::math;
use utils::str_utils;

fn main() {
    println!("3 + 4 = {}", math::tambah(3, 4));
    println!("5 * 6 = {}", math::kali(5, 6));
    println!("{}", str_utils::sapa("Budi"));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_tambah() {
        assert_eq!(math::tambah(2, 3), 5);
    }

    #[test]
    fn test_kali() {
        assert_eq!(math::kali(4, 5), 20);
    }

    #[test]
    fn test_sapa() {
        assert_eq!(str_utils::sapa("Budi"), "Halo, Budi!");
    }
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Module

`mod utils { pub mod math { ... } }` — hierarki kode. `pub` membuat item visible di luar module. `use` untuk membawa path ke scope.

### Testing

`#[cfg(test)]` — kode test hanya dikompilasi saat testing. `#[test]` menandai fungsi test. `assert_eq!`, `assert!` untuk assertions.

### Dokumentasi

`///` komentar dokumentasi. `cargo doc` generates HTML docs. Module bisa mengandung docs untuk organisasi kode.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Fungsi baru** — tambahkan `pub fn kurang(a: i32, b: i32) -> i32` di mod math
2. **Test baru** — tambahkan test untuk fungsi baru
3. **Module baru** — buat submodule `pub mod statistik` dengan fungsi rata-rata

---

## Tantangan

Buat module `geometri` dengan submodule `dua_d` (fungsi luas lingkaran, persegi) dan `tiga_d` (fungsi volume kubus, bola). Tulis minimal 3 unit test. Gunakan komentar dokumentasi ///.

---

## Ringkasan

Module mengorganisir kode dengan mod/pub/use. Unit test dengan #[test] dan #[cfg(test)]. assert_eq! dan assert! untuk assertions. Komentar /// untuk dokumentasi. cargo test menjalankan semua test. Minggu depan: generics dan trait.
