# Fearless Concurrency: std::thread, Send & Sync Traits serta mpsc Message Channels

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Konkurensi Tanpa Takut | **Minggu 8:** Fearless Concurrency: std::thread, Send & Sync Traits serta mpsc Message Channels

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

## Ringkasan

Kamu telah menguasai Fearless Concurrency, Send/Sync traits, dan mpsc message channels. Minggu depan kita memasuki Level 3: Pemrograman Asinkron dengan Tokio.
