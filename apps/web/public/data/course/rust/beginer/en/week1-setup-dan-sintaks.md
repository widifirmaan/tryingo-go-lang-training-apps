# Setup & Sintaks Rust — Buku Perpustakaan yang Ketat

> **Kategori:** Rust | **Level:** Pemula | **Minggu 1:** Setup & Sintaks Dasar

## Tujuan Pembelajaran

- Instal Rust `rustup`, cek `cargo --version`, buat `cargo new warung --bin`, jalankan `cargo run`
- Paham `let` (kotak kunci) vs `let mut` (kotak bisa ubah) — Rust **default tidak bisa ubah**
- Tipe harus jelas atau tebak: `let x: i32 = 5`, `let y = 5` (tebak i32), `String` vs `&str`
- `println!` dengan `{}`, `{:?}` debug, dan `cargo fmt` rapikan

---

## Kenapa Ini Penting Buat Kamu?

Rust = perpustakaan yang **sangat ketat**: tiap buku ada 1 pemilik, jika pinjam harus balik. Awal terasa ribet, tapi **tidak ada buku hilang** (memory safety tanpa sampah). Cocok untuk warung yang tidak mau rugi karena bug.

Hari ini pasang perpustakaan, tulis struk pertama.

---

## Program: Struk Rust Pertama

Simpan di `src/main.rs` setelah `cargo new warung`

```rust
fn main() {
    println!("Warung Bu Siti — Rust Perpustakaan");

    // 1. let = kotak kunci (tidak bisa ubah)
    let nama = "Budi"; // &str, tebak otomatis
    let beras_kg: i32 = 2; // i32 = integer 32-bit
    let harga: i32 = 12500;
    
    // let mut = kotak bisa ubah
    let mut total = beras_kg * harga;
    println!("Pelanggan: {}, Total: Rp {}", nama, total);

    // Ubah mut
    total = total + 5000; // tambah ongkir
    println!("Setelah ongkir: Rp {}", total);

    // let tidak bisa ubah: let x = 5; x = 6; // ❌ error: cannot assign twice

    // 2. String vs &str
    let s1: &str = "halo"; // pinjam teks (tidak punya)
    let s2: String = String::from("halo"); // punya teks (di heap)
    println!("s1: {}, s2: {}", s1, s2);

    // 3. Shadowing — pakai nama sama, kotak baru
    let x = 5;
    let x = x + 1; // kotak baru, bukan ubah
    println!("x shadow: {}", x);

    println!("\nTool: cargo run (jalan), cargo fmt (rapikan), cargo build (cetak binary)");
}
```

**Cara jalankan (5 menit):**
1. Install dari `rustup.rs` → `rustup` → Next → cek `cargo --version` + `rustc --version`
2. `cargo new warung --bin; cd warung`
3. Ganti `src/main.rs` dengan kode → `cargo run` → lihat struk
4. Acak spasi → `cargo fmt` → rapi

---

## Konsep Kunci

### `let` vs `let mut`
- `let x = 5` → **kunci**, tidak bisa `x = 6` (error)
- `let mut x = 5` → bisa `x = 6` → pakai `mut` jika perlu ubah

### Tipe Tebak vs Jelas
`let x = 5` tebak `i32`, `let x: i32 = 5` jelas. `String` punya heap, `&str` pinjam.

### `println!("Halo {}", nama)`
`!` macro, `{}` isi variabel. `{:?}` debug.

### `cargo` — Tukang Perpustakaan
`cargo new`, `cargo run`, `cargo fmt`, `cargo build --release` (cepat).

---

## Penjelasan untuk Pemula

### Analogi: Perpustakaan Ketat

- **Rust = perpustakaan**: tiap buku 1 pemilik. `let` = buku dikunci di rak, `let mut` = buku boleh tulis.
- **`cargo` = pustakawan**: `cargo new` bikin perpustakaan baru, `cargo run` buka dan baca.

### 3 Istilah Wajib

1. **let/mut**: kunci/bisa ubah
2. **String/&str**: punya/pinjam
3. **cargo**: tukang

---

## Eksperimen

- **Hijau:** `let mut beras = 2; beras += 3` → berapa?
- **Kuning:** `let x = 5; let x = x+1` → shadowing 6?
- **Merah:** `let x = 5; x = 6` tanpa mut → error `cannot assign`.

---

## Tantangan

**Struk Ongkir Rust:** `let berat: f64 = 2.5; let jarak: i32 = 8; let ongkir = (berat * 5000.0) as i32 + jarak * 2000; println!("Berat {}kg jarak {}km → Rp {}", berat, jarak, ongkir)` + `cargo fmt`.

---

## Glosarium Mini

- **Rust/cargo**: bahasa/pustakawan
- **let/mut**: kunci/bisa
- **i32/f64**: angka

---

## Ringkasan

Minggu 1 dari 14: **Setup Rust** (Level: Pemula). Perpustakaan menyala, struk pertama jadi. Minggu depan: **Ownership** — pinjam buku harus balik.
