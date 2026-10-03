# Durabilitas Basis Data: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery Replay

> **Kategori:** Rust | **Level:** Async Tokio, Durabilitas WAL & Capstone Engine | **Minggu 10:** Durabilitas Basis Data: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery Replay
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami prinsip Durabilitas (D dalam ACID) pada sistem database modern melalui Write-Ahead Logging (WAL)
- Memahami bahaya Write Buffering sistem operasi dan peran krusial pemanggilan fsync (sync_data / sync_all)
- Merancang protokol serialisasi biner kompak (Binary Encoding) dengan endianness eksplisit (Big-Endian)
- Membangun algoritma Crash Recovery Replay: memulihkan seluruh state memori in-memory setelah server mati mendadak
- Mencegah korupsi data berkas parsial dengan penyematan checksum CRC32 pada setiap frame WAL

---

## Program: Mesin Pencatat WAL Berdurabilitas Tinggi dengan Sinkronisasi Fisik Disk

```rust
use std::fs::{File, OpenOptions};
use std::io::{self, BufReader, Read, Write};
use std::path::Path;

// Format Biner Catatan WAL: [Tipe(1B)] [PanjangKunci(2B)] [Kunci] [PanjangNilai(4B)] [Nilai]
struct WalLogger {
    file: File,
}

impl WalLogger {
    fn open_or_create<P: AsRef<Path>>(path: P) -> io::Result<Self> {
        let file = OpenOptions::new()
            .create(true)
            .append(true)
            .read(true)
            .open(path)?;
        Ok(WalLogger { file })
    }

    // Penulisan Log Transaksi Sebelum State Memori Diubah (Write-Ahead Logging)
    fn log_set(&mut self, key: &str, val: &[u8]) -> io::Result<()> {
        let mut buffer = Vec::new();
        buffer.push(1u8); // OpCode 1 = SET

        // Tulis panjang kunci (u16 big-endian) dan kunci
        let key_bytes = key.as_bytes();
        buffer.extend_from_slice(&(key_bytes.len() as u16).to_be_bytes());
        buffer.extend_from_slice(key_bytes);

        // Tulis panjang nilai (u32 big-endian) dan nilai
        buffer.extend_from_slice(&(val.len() as u32).to_be_bytes());
        buffer.extend_from_slice(val);

        // Tulis ke buffer berkas
        self.file.write_all(&buffer)?;

        // FSYNC KRUSIAL: Memaksa kernel OS mengosongkan cache disk ke piringan SSD fisik!
        // Tanpa sync_all(), data bisa hilang jika listrik server mati mendadak!
        self.file.sync_data()?;

        Ok(())
    }
}

// Simulasi Pemulihan Bencana (Crash Recovery Replay)
fn replay_wal_log(raw_bytes: &[u8]) -> Vec<(String, String)> {
    println!("[Crash Recovery] Memulai pembacaan ulang berkas WAL untuk membangun kembali memori...");
    let mut hasil = Vec::new();
    let mut cursor = 0;

    while cursor < raw_bytes.len() {
        let opcode = raw_bytes[cursor];
        cursor += 1;

        if opcode == 1 { // SET
            let k_len = u16::from_be_bytes([raw_bytes[cursor], raw_bytes[cursor + 1]]) as usize;
            cursor += 2;
            let key = String::from_utf8_lossy(&raw_bytes[cursor..cursor + k_len]).to_string();
            cursor += k_len;

            let v_len = u32::from_be_bytes([
                raw_bytes[cursor], raw_bytes[cursor + 1], raw_bytes[cursor + 2], raw_bytes[cursor + 3]
            ]) as usize;
            cursor += 4;
            let val = String::from_utf8_lossy(&raw_bytes[cursor..cursor + v_len]).to_string();
            cursor += v_len;

            println!("  --> [REPLAY SET] Kunci: '{}' = '{}'", key, val);
            hasil.push((key, val));
        }
    }

    hasil
}

fn main() {
    println!("=== Durabilitas Transaksi Database: WAL & Crash Replay ===");

    // Simulasi byte stream WAL hasil penulisan
    let mut mock_wal_stream = Vec::new();

    // Entri 1: SET user=admin
    mock_wal_stream.push(1);
    mock_wal_stream.extend_from_slice(&(4u16).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"user");
    mock_wal_stream.extend_from_slice(&(5u32).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"admin");

    // Entri 2: SET quota=5000
    mock_wal_stream.push(1);
    mock_wal_stream.extend_from_slice(&(5u16).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"quota");
    mock_wal_stream.extend_from_slice(&(4u32).to_be_bytes());
    mock_wal_stream.extend_from_slice(b"5000");

    let restored = replay_wal_log(&mock_wal_stream);
    println!("\nTotal State Pulih Setelah Crash: {} record terselamatkan!", restored.len());
}
```

---

## Konsep Kunci

### Mengapa Membutuhkan Write-Ahead Log (WAL)?
Jika database Anda (seperti Redis atau Postgres) hanya menyimpan data di RAM:
Saat listrik server padam tiba-tiba, seluruh data transaksi perbankan pengguna **akan hilang selamanya dalam sekejap**!

**Prinsip Write-Ahead Logging (WAL)**:
1. Sebelum memori RAM diubah, server **wajib menulis catatan mutasi transaksi ke dalam berkas log append-only di disk terlebih dahulu**.
2. Format penulisan berkas dibuat sekuensial murni (*sequential append*), sehingga disk SSD bisa menulis ribuan catatan per detik tanpa jeda.
3. Setelah catatan aman di disk, barulah state RAM diperbarui dan klien diberi tahu: "Transaksi Sukses".

### Bahaya Fatal Tanpa `fsync` (`sync_all()`)
Saat Anda memanggil `file.write()`, sistem operasi (Linux/Windows) **TIDAK langsung menulis data ke piringan fisik SSD**, melainkan menyimpannya sementara di Page Cache RAM kernel.
Jika server mati listrik 1 detik kemudian, data di Page Cache menguap!
Fungsi **`file.sync_data()` (fsync)** adalah perintah militer ke kernel: *"Tahan eksekusi sampai SSD benar-benar mengonfirmasi bahwa bit data telah tertulis secara magnetik/elektronik di chip penyimpanan fisik!"*

---

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Tulisan Tangan Notaris vs Papan Tulis Toko
1. **RAM Database** seperti papan tulis toko: angka penjualan ditulis dengan spidol. Begitu hujan lebat membasahi toko (*listrik mati*), seluruh tulisan di papan tulis terhapus licin.
2. **Write-Ahead Log (WAL)** seperti buku kas notaris bertinta permanen: sebelum kasir menghapus papan tulis, kasir mencatat transaksi di buku kas dengan tinta abadi (*tulis log ke disk*).
3. **Crash Recovery Replay** seperti pagi hari setelah toko buka kembali: pemilik toko membaca kembali buku kas dari halaman pertama (*replay WAL*) dan menuliskan kembali angka-angka di papan tulis toko persis seperti kemarin.

## Eksperimen

- Buka file WAL yang dihasilkan menggunakan hex editor untuk memeriksa header OpCode dan byte encoding.
- Ukur perbedaan kecepatan penulisan disk dengan fsync aktif vs tanpa fsync (perbedaan latensi ~100x lipat!).
- Simulasikan file log yang terpotong di tengah jalan (partial write) dan amati bagaimana parser mendeteksi error tak lengkap.
- Implementasikan rotasi file log (Log Compaction) saat ukuran file WAL melebihi 100 Megabyte.

---

## Tantangan

Tambahkan OpCode `2` untuk operasi `DEL` pada logger WAL dan perbarui fungsi `replay_wal_log` agar menghapus kunci dari memori jika menemukan catatan DEL.

---

## Model Mental & Diagram Alur Visual

![Diagram Rust Ownership, Move Semantics & Borrowing Memory](/diagrams/rust-ownership.svg)

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `let x: i32 = 5; let mut y = 10;`
- **Fungsi Utama:** Deklarasi variabel immutable default & mutable.
- **Parameter / Atribut:** `Tipe data (i32, f64, String), mut keyword`.
- **Perilaku & Efek Sistem:** Rust secara default mengunci variabel agar tidak bisa diubah guna menjamin keamanan memori tanpa garbage collector.
- **Contoh Penggunaan Praktis:**
```javascript
let mut score = 50;
score += 25;
println!("Score: {}", score);
```
- **Hasil Output yang Diharapkan:**
```text
Score: 75
```

### 2. `&T (Immutable Borrow) vs &mut T (Mutable Borrow)`
- **Fungsi Utama:** Peminjaman referensi memori (Borrowing).
- **Parameter / Atribut:** `Referensi variabel`.
- **Perilaku & Efek Sistem:** Mengizinkan pembacaan data tanpa memindahkan kepemilikan (ownership) dengan aturan ketat: 1 mutable borrow ATAU banyak immutable borrow.
- **Contoh Penggunaan Praktis:**
```javascript
fn print_len(s: &String) {
  println!("Panjang: {}", s.len());
}
```
- **Hasil Output yang Diharapkan:**
```text
Membaca panjang string tanpa menghapus variabel asal
```

### 3. `match value { Pattern => Action }`
- **Fungsi Utama:** Pencocokan pola menyeluruh (Pattern Matching).
- **Parameter / Atribut:** `Ekspresi, Arms`.
- **Perilaku & Efek Sistem:** Mengevaluasi setiap kemungkinan kondisi secara lengkap (kompiler memaksa semua cabang tertangani).
- **Contoh Penggunaan Praktis:**
```javascript
let status = Some(200);
match status {
  Some(code) => println!("Status OK: {}", code),
  None => println!("Tidak ada data"),
}
```
- **Hasil Output yang Diharapkan:**
```text
Status OK: 200
```

### 4. `Result<T, E> & Operator ?`
- **Fungsi Utama:** Penanganan kegagalan idiomatik tanpa exception.
- **Parameter / Atribut:** `Ok(T), Err(E)`.
- **Perilaku & Efek Sistem:** Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk meneruskan error ke pemanggil.
- **Contoh Penggunaan Praktis:**
```javascript
fn read_data() -> Result<String, std::io::Error> {
  let content = std::fs::read_to_string("config.txt")?;
  Ok(content)
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan isi file atau meneruskan kegagalan I/O
```


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

Kamu telah menguasai durabilitas database, file I/O append-only, fsync, dan crash recovery replay. Minggu depan kita mempelajari Unsafe Rust dan optimasi zero-copy.
