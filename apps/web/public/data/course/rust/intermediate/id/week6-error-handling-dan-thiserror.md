# Error Handling Produksi: Operator ?, Result<T, E> & Custom Errors dengan thiserror

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Konkurensi Tanpa Takut | **Minggu 6:** Error Handling Produksi: Operator ?, Result<T, E> & Custom Errors dengan thiserror
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi Error Handling di Rust: Eror yang dapat dipulihkan (Result<T, E>) vs Panic tak terpulihkan (panic!)
- Menguasai kekuatan Operator Tanya (?) untuk propagasi eror otomatis tanpa boilerplate if err != nil
- Merancang Enum Custom Error yang mengimplementasikan trait std::error::Error
- Memahami konversi tipe eror implisit menggunakan trait From (From<A> for B)
- Membedakan penggunaan pustaka thiserror (untuk library/domain types) vs anyhow (untuk binary application)

---

## Program: Sistem Validasi dan Persistensi Berkas Write-Ahead Log (WAL)

```rust
use std::fmt;

// 1. Definisi Custom Error Enum (Meniru pola pustaka thiserror standar industri)
#[derive(Debug)]
pub enum WalError {
    KunciTerlaluPanjang { kunci: String, panjang: usize },
    PayloadKosong,
    DiskPenuh { sisa_bytes: u64 },
    IoGagal(String),
}

// Implementasi Display untuk pesan eror ramah pengguna
impl fmt::Display for WalError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            WalError::KunciTerlaluPanjang { kunci, panjang } => {
                write!(f, "Kunci '{}' melebihi batas maksimal 64 bytes (panjang: {})", kunci, panjang)
            }
            WalError::PayloadKosong => write!(f, "Payload data tidak boleh kosong"),
            WalError::DiskPenuh { sisa_bytes } => {
                write!(f, "Kapasitas disk penyimpanan kritis: tersisa {} bytes", sisa_bytes)
            }
            WalError::IoGagal(pesan) => write!(f, "I/O Disk error: {}", pesan),
        }
    }
}

impl std::error::Error for WalError {}

// 2. Fungsi Validasi Menggunakan Result<T, WalError>
fn validasi_record_wal(kunci: &str, nilai: &[u8]) -> Result<(), WalError> {
    if kunci.len() > 64 {
        return Err(WalError::KunciTerlaluPanjang {
            kunci: kunci.to_string(),
            panjang: kunci.len(),
        });
    }

    if nilai.is_empty() {
        return Err(WalError::PayloadKosong);
    }

    Ok(())
}

// 3. Operator Sakral Tanya (?): Propagasi Eror Bersih Seketika!
fn tulis_ke_wal_pipeline(kunci: &str, nilai: &[u8]) -> Result<u64, WalError> {
    // Jika validasi_record_wal gagal (Err), operator ? langsung me-return Err ke pemanggil!
    // Jika sukses (Ok), eksekusi lanjut ke baris berikutnya tanpa indentasi nested if!
    validasi_record_wal(kunci, nilai)?;

    println!("[WAL Pipeline] Menulis record '{}' ({} bytes) ke berkas log...", kunci, nilai.len());
    let offset_bytes = 1048576; // Simulasi offset penulisan
    Ok(offset_bytes)
}

fn main() {
    println!("=== WAL Error Pipeline Demonstration ===");

    // Uji 1: Sukses
    match tulis_ke_wal_pipeline("user:session_1", b"valid_token_data") {
        Ok(offset) => println!("[OK] Berhasil ditulis pada offset byte: {}", offset),
        Err(e) => println!("[ERROR] {}", e),
    }

    // Uji 2: Validasi Gagal (Kunci Terlalu Panjang)
    let kunci_raksasa = "a".repeat(80);
    match tulis_ke_wal_pipeline(&kunci_raksasa, b"data") {
        Ok(offset) => println!("[OK] Berhasil pada offset: {}", offset),
        Err(e) => println!("[DITOLAK] Terjadi kesalahan: {}", e),
    }
}
```

---

## Konsep Kunci

### Mengapa Operator Tanya (`?`) Sangat Dicintai?
Di Go, Anda menulis 3 baris berulang kali untuk setiap panggilan fungsi:
`if err != nil { return nil, err }`.
Di **Rust**, Anda cukup menambahkan karakter **`?`** di akhir ekspresi:
`let file = File::open("db.wal")?;`

**Cara kerja operator `?`**:
- Jika hasilnya `Ok(nilai)`: Operator membongkar nilainya dan memasukkannya ke variabel `file`.
- Jika hasilnya `Err(e)`: Fungsi Anda **langsung berhenti seketika dan me-return `Err(e)` tersebut ke fungsi pemanggil**!
Kode Anda menjadi sangat bersih, linier dari atas ke bawah, tanpa sarang laba-laba *nested if-else*!

### `thiserror` vs `anyhow` (Standar Industri)
1. **`thiserror`**: Digunakan saat Anda membangun **library atau modul inti sistem** (seperti database engine kita). Anda mendefinisikan enum eror berstruktur rapi sehingga pemanggil bisa melakukan `match` terhadap jenis erornya.
2. **`anyhow`**: Digunakan di tingkat **aplikasi akhir / main binary** di mana Anda hanya ingin mencetak pesan eror lengkap dengan jejak tumpukan (*stack trace*) tanpa peduli mencocokkan jenis enum spesifik.

---

---

## Penjelasan untuk Pemula

### Analogi: Jalur Perakitan Pabrik Mobil & Tombol Darurat
1. **Operator `?`** seperti kabel darurat di pabrik mobil modern: jika satu baut ban mobil gagal terpasang (*Err*), perakitan mobil tersebut langsung dihentikan detik itu juga dan mobil cacat diarahkan ke jalur perbaikan (*return Err*), tanpa pekerja membuang waktu memasang pintu pada mobil yang bannya sudah cacat.
2. **Result<T, E>** seperti kotak surat ekspres: jika paket sampai dengan selamat, ada stempel hijau 'Diterima' (*Ok*); jika kurir tersesat, ada stempel merah berisi alasan keterlambatan (*Err*).

## Eksperimen

- Panggil tulis_ke_wal_pipeline dengan payload kosong b"" dan amati pesan eror PayloadKosong tercetak di terminal.
- Tambahkan varian eror baru WalError::IzinDitolak dan pemicunya di dalam fungsi validasi.
- Gunakan unwrap() atau expect("Pesan khusus") untuk melihat bagaimana Rust melempar panic jika Result bernilai Err.
- Rangkai 3 fungsi yang menggunakan operator ? secara berurutan untuk melihat keindahan alur linier.

---

## Tantangan

Implementasikan trait `From<std::io::Error> for WalError` yang secara otomatis mengonversi eror I/O bawaan Rust menjadi varian `WalError::IoGagal`.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Borrow Checker: Borrowing Mutably Lebih dari Sekali
- **Gejala / Masalah:** Kompiler menolak kompilasi dengan pesan `cannot borrow as mutable more than once at a time`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Batasi masa pakai peminjaman (*lifetime/scope*) atau gunakan tipe interior mutability seperti `RefCell`/`Mutex`.

### 2. Penyalahgunaan `.unwrap()` di Kode Produksi
- **Gejala / Masalah:** Program mengalami panic seketika saat menerima `Err` atau `None`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan operator `?` untuk propagasi error idiomatik atau tangani dengan blok `match`.

### 3. Kloning Berlebihan (`.clone()`) untuk Menghindari Lifetime
- **Gejala / Masalah:** Penurunan performa akibat alokasi heap baru secara redundan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan referensi pinjaman `&str` atau `&[T]` alih-alih menduplikasi seluruh data.

---

## Ringkasan

Kamu telah menguasai Result<T, E>, operator tanya ?, dan perancangan custom error. Minggu depan kita mempelajari Smart Pointers: Box, Rc, Arc, dan Mutex.
