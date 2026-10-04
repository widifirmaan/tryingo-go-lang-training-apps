# Fearless Concurrency: std::thread, Send & Sync Traits serta mpsc Message Channels

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Konkurensi Tanpa Takut | **Minggu 8:** Fearless Concurrency: std::thread, Send & Sync Traits serta mpsc Message Channels
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep "Fearless Concurrency" di Rust: kompilator menjamin ketiadaan race condition sebelum program berjalan
- Meluncurkan OS threads berkecepatan tinggi menggunakan std::thread::spawn dengan penutupan move
- Memahami Trait penanda Send (tipe aman dipindahkan antar-thread) dan Sync (tipe aman diakses bersama via referensi)
- Membangun pipa komunikasi antar-thread menggunakan mpsc (Multi-Producer, Single-Consumer)
- Merancang arsitektur Dedicated Background Worker untuk operasi I/O disk non-blocking

---

## Program: Pengelompok Flusher Latar Belakang WAL (Background WAL Flusher)

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

// Pesan Transaksional yang Dikirim Melalui Saluran Pipa Antar-Thread
enum WalCommand {
    AppendRecord { id: u64, data: String },
    SyncDisk,
    Shutdown,
}

fn main() {
    println!("=== Fearless Concurrency: Background WAL Flusher Pipeline ===");

    // 1. mpsc: Multi-Producer, Single-Consumer Channel
    // tx = Transmitter (Pengirim), rx = Receiver (Penerima)
    let (tx, rx) = mpsc::channel::<WalCommand>();

    // 2. Thread Pekerja Latar Belakang (Dedicated Background Disk Flusher)
    let flusher_thread = thread::spawn(move || {
        println!("[Flusher Thread] Siaga mendengarkan instruksi penulisan...");

        let mut buffer = Vec::new();

        // Loop menerima pesan sampai channel ditutup atau menerima sinyal Shutdown
        while let Ok(cmd) = rx.recv() {
            match cmd {
                WalCommand::AppendRecord { id, data } => {
                    println!("[Flusher Disk] Menampung record #{}: '{}' ke buffer", id, data);
                    buffer.push((id, data));
                }
                WalCommand::SyncDisk => {
                    println!("[Flusher Disk] MELAKUKAN FSYNC KE DISK FISIK ({} records diamankan)!", buffer.len());
                    buffer.clear();
                }
                WalCommand::Shutdown => {
                    println!("[Flusher Disk] Sinyal shutdown diterima. Mengosongkan buffer akhir & keluar.");
                    break;
                }
            }
        }
    });

    // 3. Thread Klien Produser (Multi-Producer: Clone Transmitter tx)
    let tx1 = tx.clone();
    let client_1 = thread::spawn(move || {
        tx1.send(WalCommand::AppendRecord { id: 101, data: String::from("SET user=budi") }).unwrap();
        thread::sleep(Duration::from_millis(50));
        tx1.send(WalCommand::AppendRecord { id: 102, data: String::from("SET role=admin") }).unwrap();
    });

    let tx2 = tx.clone();
    let client_2 = thread::spawn(move || {
        thread::sleep(Duration::from_millis(20));
        tx2.send(WalCommand::AppendRecord { id: 103, data: String::from("DEL session_token") }).unwrap();
    });

    // Tunggu semua produser selesai mengirim
    client_1.join().unwrap();
    client_2.join().unwrap();

    // Perintahkan sinkronisasi dan shutdown
    tx.send(WalCommand::SyncDisk).unwrap();
    tx.send(WalCommand::Shutdown).unwrap();

    // Tunggu thread flusher selesai merapikan disk
    flusher_thread.join().unwrap();
    println!("\nPipeline konkurensi selesai dengan keamanan memori 100%!");
}
```

---

## Konsep Kunci

### Apa itu "Fearless Concurrency"?
Di bahasa lain, menulis kode multi-thread adalah hal yang menakutkan karena rawan *Data Races*, *Heisenbugs* (bug misterius yang hilang saat di-debug), dan kerusakan memori acak.
Di **Rust**, Anda bisa memprogram multi-thread tanpa rasa takut (**Fearless Concurrency**).
Jika kode Anda memiliki potensi data race, **kodenya tidak akan pernah bisa dikompilasi!** Compiler menolaknya dengan tegas di awal.

### Dua Trait Gaib Penjaga Pintu: `Send` dan `Sync`
Rust tidak memiliki aturan konkurensi bawaan yang rumit di runtime. Seluruh sistem keamanannya dikendalikan oleh dua **Marker Traits**:
1. **`Send`**: Menandai bahwa kepemilikan tipe data ini aman **dipindahkan (*moved*) ke thread lain**. Hampir semua tipe di Rust adalah `Send`, kecuali tipe yang memiliki pointer mentah thread-lokal (seperti `Rc<T>`).
2. **`Sync`**: Menandai bahwa tipe data ini aman **diakses secara bersamaan oleh banyak thread melalui referensi `&T`**. Suatu tipe `T` adalah `Sync` jika dan hanya jika `&T` adalah `Send`.

### Pola mpsc (Multi-Producer, Single-Consumer)
Kanal pesan `mpsc::channel()` memungkinkan banyak thread produser mengirimkan tugas ke satu saluran antrean yang diproses secara berurutan oleh satu thread pekerja (*worker thread*). Ini adalah fondasi mesin Write-Ahead Log (WAL) di database modern!

---

---

## Penjelasan untuk Pemula

### Analogi: Jalur Pipa Saluran Tabung Kasir Swalayan
Bayangkan kasir swalayan besar:
1. **Multi-Producer (tx.clone())** adalah 10 kasir di lantai toko: setiap kasir memasukkan nota belanjaan (*WalCommand*) ke dalam tabung kapsul pipa masing-masing.
2. **Single-Consumer (rx.recv())** adalah brankas pusat di lantai bawah: ada 1 petugas akuntan yang duduk menerima kapsul pipa satu per satu (*flusher thread*), mencatatnya ke buku besar, dan mengunci brankas (*SyncDisk*). Tidak ada kasir yang berebut kunci brankas.

## Eksperimen

- Hapus instruksi move pada thread::spawn dan amati compiler menolak karena variabel lingkungan berisiko outlive closure.
- Uji pengiriman 100 pesan konkuren dari 10 thread produser berbeda secara bersamaan.
- Gunakan mpsc::sync_channel(bound) untuk membuat bounded channel yang memberikan tekanan balik (backpressure) jika antrean penuh.
- Amati bahwa pesan WAL diproses secara tertib dan aman tanpa satupun Mutex manual yang diekspos ke produser.

---

## Tantangan

Kembangkan flusher thread agar secara otomatis memicu `SyncDisk` setiap kali buffer mencapai 10 item, tanpa menunggu instruksi eksplisit dari klien.

---

## Model Mental & Diagram Alur Visual

![Diagram Rust Ownership, Move Semantics & Borrowing Memory](/diagrams/rust-ownership.svg)

```diagram
┌──────────────────────────────┐
│ KEPEMILIKAN MEMORI (OWNERSHIP)│
│ let s1 = String::from("Hi"); │
│       │                      │
│       ▼ (Move Semantics)     │
│ let s2 = s1;                 │
│ • s1 menjadi INVALID         │
│ • s2 menjadi pemilik sah     │
│ • Bebas Data Race & Null     │
└──────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `let x = 5; let mut y = 10;`
- **Fungsi Utama:** Deklarasi variabel immutable & mutable.
- **Parameter / Atribut:** `Identifier, mut keyword`.
- **Perilaku & Efek Sistem:** Rust secara default mengunci variabel agar tidak bisa diubah demi keamanan memori..
- **Contoh Penggunaan Praktis:**
```rust
let mut score = 50;
score += 25;
println!("Score: {}", score);
```
- **Hasil Output yang Diharapkan:**
```text
Score: 75
```

### 2. `&T (Borrow) vs &mut T (Mutable Borrow)`
- **Fungsi Utama:** Peminjaman referensi memori (Borrowing).
- **Parameter / Atribut:** `Referensi variabel`.
- **Perilaku & Efek Sistem:** Mengizinkan pembacaan data tanpa memindahkan ownership dengan aturan ketat kompiler..
- **Contoh Penggunaan Praktis:**
```rust
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
- **Parameter / Atribut:** `Expression, Arms`.
- **Perilaku & Efek Sistem:** Mengevaluasi setiap kemungkinan kondisi secara lengkap tanpa ada cabang yang terlewat..
- **Contoh Penggunaan Praktis:**
```rust
let res: Option<i32> = Some(10);
match res {
  Some(v) => println!("Nilai: {}", v),
  None => println!("Kosong"),
}
```
- **Hasil Output yang Diharapkan:**
```text
Nilai: 10
```

### 4. `Result<T, E> & Operator ?`
- **Fungsi Utama:** Penanganan error idiomatik tanpa exception.
- **Parameter / Atribut:** `Ok(T), Err(E)`.
- **Perilaku & Efek Sistem:** Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk propagasi error..
- **Contoh Penggunaan Praktis:**
```rust
fn read_data() -> Result<String, std::io::Error> {
  let content = std::fs::read_to_string("app.log")?;
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

Kamu telah menguasai Fearless Concurrency, Send/Sync traits, dan mpsc message channels. Minggu depan kita memasuki Level 3: Pemrograman Asinkron dengan Tokio.
