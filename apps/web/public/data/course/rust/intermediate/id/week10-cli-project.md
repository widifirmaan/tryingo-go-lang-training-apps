# Proyek CLI: Alat Baris Perintah

> Kategori: Rust, Bahasa Pemrograman | Level: Menengah | Week 10

## Tujuan Pembelajaran

- Membaca argumen command line dengan std::env::args
- Membaca file dengan std::fs::read_to_string
- Menulis output ke stdout dan stderr
- Menangani error dengan operator ? di aplikasi nyata
- Membangun alat grep sederhana

---

## Program: CLI App

```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let perintah = args.get(1).map(|s| s.as_str()).unwrap_or("help");

    match perintah {
        "grep" => cmd_grep(args.get(2)),
        "hello" => cmd_hello(args.get(2)),
        _ => bantuan(),
    }
}

fn bantuan() {
    eprintln!("Usage: cli <command> [args]");
    eprintln!("Commands:");
    eprintln!("  grep <pola>  - Cari teks dalam konten (simulasi)");
    eprintln!("  hello <nama> - Sapa pengguna");
}

fn cmd_grep(pola: Option<&String>) {
    let pola = pola.map(|s| s.as_str()).unwrap_or("Rust");
    let konten = "Rust adalah bahasa systems programming.
Belajar Rust itu menyenangkan.
Go juga bahasa yang bagus.";

    for (i, baris) in konten.lines().enumerate() {
        if baris.contains(pola) {
            println!("{}: {}", i + 1, baris);
        }
    }
}

fn cmd_hello(nama: Option<&String>) {
    let nama = nama.map(|s| s.as_str()).unwrap_or("Dunia");
    println!("Halo, {}! Selamat belajar Rust CLI!", nama);
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Command-Line Arguments

`env::args()` mengembalikan iterator. `args[0]` nama program. `match` untuk routing perintah. Pattern umum CLI Rust.

### File I/O (Simulasi)

`fs::read_to_string` membaca file. `? operator` untuk error propagation. Di kode ini, konten di-hardcode untuk demonstrasi.

### Stderr

`eprintln!` mencetak ke stderr — untuk pesan error dan usage. `println!` ke stdout untuk output normal.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Perintah baru** — tambahkan perintah `upper <teks>` yang mencetak teks uppercase
2. **Pola grep** — coba grep dengan pola "Go" atau "belajar"
3. **Error handling** — tambahkan validasi argumen kosong

---

## Tantangan

Buat CLI app sederhana dengan perintah: `hitung <a> <b>` (menjumlah dua angka) dan `sapa <nama>` (menyapa). Tangani error jika argumen kurang. Simulasi pembacaan file dengan konten hardcoded.

---

## Ringkasan

CLI app dengan env::args, match untuk routing perintah, eprintln! untuk error, println! untuk output. Error handling dengan ? untuk aplikasi nyata. Struktur modular dengan fungsi terpisah per perintah. Minggu depan: smart pointer: Box, Rc, RefCell.
