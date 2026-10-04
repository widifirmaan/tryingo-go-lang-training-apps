# Asynchronous Rust: Runtime Tokio, async/await, Futures & Non-Blocking TCP

> **Kategori:** Rust | **Level:** Async Tokio, Durabilitas WAL & Capstone Engine | **Minggu 9:** Asynchronous Rust: Runtime Tokio, async/await, Futures & Non-Blocking TCP
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi asinkron Rust: Zero-Cost Futures yang bersifat pasif (tidak melakukan apapun sampai di-poll)
- Membedakan model thread-per-connection (boros OS thread) vs asynchronous task-based (jutaan task di sedikit thread)
- Menguasai peran runtime asinkron Tokio: multi-threaded work-stealing scheduler untuk I/O jaringan berkecepatan tinggi
- Memahami cara kerja kata kunci `.await` yang menghentikan eksekusi sementara (*yield*) tanpa memblokir OS thread
- Menangani pembatalan Future yang aman secara bawaan di Rust saat koneksi klien terputus mendadak

---

## Program: Server Listener TCP Berkecepatan Tinggi untuk Protokol Key-Value

```rust
// Catatan: Di proyek nyata, tambahkan tokio = { version = "1", features = ["full"] } di Cargo.toml

// Simulasi Arsitektur Asinkron Tokio Tanpa Ketergantungan Eksternal di Playground
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::Duration;

// 1. Anatomi Inti Future di Rust: Trait yang Di-poll oleh Async Runtime
struct TimerAsync {
    waktu_selesai: std::time::Instant,
}

impl Future for TimerAsync {
    type Output = String;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        if std::time::Instant::now() >= self.waktu_selesai {
            Poll::Ready(String::from("Operasi I/O TCP Asinkron Selesai."))
        } else {
            Poll::Pending // Runtime akan menidurkan task ini dan memproses koneksi lain!
        }
    }
}

// 2. Fungsi async fn (Menghasilkan Future di Balik Layar)
async fn tangani_koneksi_client(client_id: u32) -> Result<String, String> {
    println!("[Tokio Worker] Menerima koneksi TCP dari Klien #{}...", client_id);
    
    // Simulasi non-blocking I/O
    let timer = TimerAsync {
        waktu_selesai: std::time::Instant::now() + Duration::from_millis(50),
    };

    // Kata kunci .await: Menyerahkan kendali CPU ke task lain jika I/O belum selesai!
    let hasil = timer.await;
    Ok(format!("Klien #{} diproses: {}", client_id, hasil))
}

fn main() {
    println!("=== Asynchronous Systems: Tokio Runtime & Futures ===");
    println!("Rust async tidak memerlukan OS thread per koneksi: jutaan koneksi berjalan di sedikit worker!");

    // Eksekusi blocking untuk mensimulasikan runner
    let mut timer = TimerAsync {
        waktu_selesai: std::time::Instant::now() + Duration::from_millis(10),
    };
    
    // Demonstrasi poll manual
    let waker = futures_lite_waker();
    let mut cx = Context::from_waker(&waker);
    let mut pin_timer = Pin::new(&mut timer);
    
    match pin_timer.as_mut().poll(&mut cx) {
        Poll::Ready(val) => println!("Hasil Poll: {}", val),
        Poll::Pending => println!("Status: Pending (I/O non-blocking sedang berjalan)"),
    }
}

// Helper stub waker sederhana
fn futures_lite_waker() -> std::task::Waker {
    use std::task::{RawWaker, RawWakerVTable};
    unsafe fn clone(_: *const ()) -> RawWaker { RawWaker::new(std::ptr::null(), &VTABLE) }
    unsafe fn wake(_: *const ()) {}
    unsafe fn wake_by_ref(_: *const ()) {}
    unsafe fn drop(_: *const ()) {}
    static VTABLE: RawWakerVTable = RawWakerVTable::new(clone, wake, wake_by_ref, drop);
    unsafe { std::task::Waker::from_raw(RawWaker::new(std::ptr::null(), &VTABLE)) }
}
```

---

## Konsep Kunci

### Mengapa Async di Rust Berbeda dari JavaScript / Go?
1. **Di JavaScript/Node.js**: Promises bersifat *eager* (langsung dieksekusi begitu dibuat di background event loop).
2. **Di Go**: Konkurensi dikelola oleh runtime bahasa menggunakan goroutine blocking yang dialihkan secara otomatis oleh scheduler internal.
3. **Di Rust**: **Futures bersifat 100% LAZY (Pasif)!**
   Sebuah `async fn` tidak melakukan apa-apa sama sekali sampai Anda memanggil `.await` atau menyerahkannya ke executor runtime (seperti Tokio). Jika Anda tidak me-`.await` sebuah Future, tidak ada satupun baris kode yang dieksekusi!

### Peran Runtime Tokio
Rust sengaja **tidak memasukkan async runtime ke dalam bahasa inti** agar binary Rust tetap bisa berjalan di mikrokontroler kulkas tanpa sistem operasi.
Untuk aplikasi server jaringan, komunitas menggunakan **Tokio**:
- Multi-threaded Work-Stealing Task Scheduler.
- Non-blocking Network I/O (`tokio::net::TcpListener`).
- Timer dan saluran komunikasi asinkron berkecepatan monster yang melayani puluhan juta permintaan per detik.

---

---

## Penjelasan untuk Pemula

### Analogi: Kasir Restoran Cepat Saji dengan Nomor Antrean
1. **Model Thread Tradisional (Blocking)** seperti 1 kasir melayani 1 pelanggan: kasir diam membeku menunggu daging matang dipanggang di dapur selama 5 menit. Pelanggan lain di belakangnya antre panjang (*thread terblokir*).
2. **Async Tokio (`.await`)** seperti kasir cerdas: setelah Anda memesan burger, kasir memberikan struk nomor antrean (*Future*) lalu berkata "Silakan duduk (*await*)". Kasir langsung melayani pelanggan berikutnya dalam 1 detik. Begitu burger matang (*Poll::Ready*), nomor Anda dipanggil.

## Eksperimen

- Pelajari struktur makro #[tokio::main] yang secara otomatis membuat multi-threaded runtime executor.
- Amati bahwa memanggil fungsi async tanpa .await memunculkan peringatan warning: unused implementor of `Future` that must be used.
- Uji tokio::spawn untuk meluncurkan 100.000 task asinkron konkuren dan ukur penggunaan memori RAM.
- Pelajari perbedaan tokio::select! dengan select di Go untuk multiplexing Future asinkron.

---

## Tantangan

Rancang state machine sederhana yang mengimplementasikan `Future` untuk membaca stream 4 blok data biner bertahap hingga seluruh paket lengkap (Poll::Ready).

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

Kamu telah menguasai asinkron Rust, lazy Futures, polling context, dan runtime Tokio. Minggu depan kita mempelajari Durabilitas Berkas WAL dan fsync.
