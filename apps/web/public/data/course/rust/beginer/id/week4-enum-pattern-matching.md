# Enum & Pattern Matching — Pilihan Warung yang Wajib Lengkap

> **Kategori:** Rust | **Level:** Pemula | **Minggu 4:** Enum & Pattern Matching
> **Prasyarat:** Minggu 3 — **Struct & Method**.

## Tujuan Pembelajaran

- `enum Status { Ada, Habis, Preorder }` pilihan terbatas (sumber: doc.rust-lang.org/book/ch06)
- `match` wajib tangani SEMUA varian (compiler cegah lupa), `if let` untuk 1 kasus

---

## Kenapa Ini Penting Buat Kamu?

Status warung hanya 3: ada/habis/preorder. Dengan `String` bebas, typo `"adA"` lolos → bug. Dengan `enum`, typo = error compile. `match` wajib lengkap = tambah varian `Rusak` tanpa update `match` → error, tidak ada cabang terlupakan.

---

## Program: Status Warung Anti-Lupa

```rust
enum Status { Ada, Habis, Preorder }

fn label(s: Status) -> String {
  match s {
    Status::Ada => "Tersedia".to_string(),
    Status::Habis => "Habis".to_string(),
    Status::Preorder => "Preorder".to_string(),
    // Hapus 1 baris di atas → ERROR: non-exhaustive patterns! (compiler jaga)
  }
}

fn main() {
  println!("{}", label(Status::Ada));

  let s = Status::Habis;
  if let Status::Ada = s {
    println!("Ada");
  } else {
    println!("Tidak ada");
  }

  // Enum bawa data (khas Rust!)
  enum Bayar { Tunai(u32), Transfer { bank: String, nominal: u32 } }
  let b = Bayar::Transfer { bank: "BCA".to_string(), nominal: 62000 };
  match b {
    Bayar::Tunai(n) => println!("Tunai Rp{}", n),
    Bayar::Transfer { bank, nominal } => println!("{} Rp{}", bank, nominal),
  }
}
```

---

## Konsep Kunci

### `enum` = Pilihan Terbatas
`enum Status { Ada, Habis }` — hanya itu, tidak bisa `"adA"`.

### `match` Wajib Lengkap (Exhaustive)
Semua varian harus ada cabang. Compiler tolak jika kurang — tidak ada `default` yang sembunyikan bug.

### `if let` = 1 Kasus
`if let Status::Ada = s` untuk peduli 1 varian saja.

### Enum Bawa Data
`Tunai(u32)` / `Transfer { bank, nominal }` — pilihan + data sekaligus.

---

## Penjelasan untuk Pemula

### Analogi: Stempel 3 Pilihan
- **enum = kotak stempel 3**: Ada/Habis/Preorder, tidak bisa stempel ke-4.
- **match = petugas wajib cap semua**: tambah stempel ke-4 tanpa update petugas → ditolak.

### Langkah 0 — Siapkan Device
- Sama W1: `cargo run`.

### Cara Komputer Membaca
1. `label(Status::Ada)` → cocokkan cabang 1 → "Tersedia".
2. Hapus cabang `Preorder` → compile error `non-exhaustive`.

### 3 Istilah Wajib
1. **Enum**: pilihan terbatas
2. **match**: wajib lengkap
3. **if let**: 1 kasus

---

## Eksperimen

- **Hijau:** Tambah varian `Rusak` → error? Tambah cabang → jalan?
- **Kuning:** `Bayar::Tunai(50000)` → "Tunai Rp50000"?
- **Merah:** `match` tanpa cabang `Preorder` → error compile (baca pesannya!)?

---

## Tantangan

**Status Pesanan:** `enum Pesanan { Baru, Kirim(String), Selesai }` (`Kirim` bawa resi!) + `match` info tiap status + `if let Pesanan::Kirim(resi)`.
- **Sambungan (Minggu 3 — Struct & Method):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **enum/match/if let**: pilihan/lengkap/satu
- **Exhaustive**: wajib semua

---

## Ringkasan

Minggu 4 dari 6: **Pilihan Anti-Lupa** (Level: Pemula). Compiler jaga cabang. Minggu depan: **Collections** — rak.
