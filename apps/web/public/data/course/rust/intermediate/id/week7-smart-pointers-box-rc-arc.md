# Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>

> **Kategori:** Rust | **Level:** Traits, Smart Pointers & Konkurensi Tanpa Takut | **Minggu 7:** Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami mengapa pointer biasa tidak cukup dan bagaimana Smart Pointers mengelola metadata kepemilikan
- Menggunakan Box<T> untuk alokasi memori heap eksplisit dan struktur data rekursif
- Memahami Arc<T> (Atomic Reference Counting) untuk berbagi kepemilikan data antar banyak thread
- Menguasai konsep Interior Mutability: memutasi data di dalam struktur yang dibungkus referensi immutable
- Mengkombinasikan Arc<RwLock<T>> atau Arc<Mutex<T>> untuk arsitektur database multi-thread yang 100% aman

---

## Program: Indeks Memori Bersama Terproteksi Multi-Thread (Thread-Safe Shared Index)

```rust
use std::collections::HashMap;
use std::sync::{Arc, RwLock};
use std::thread;

// 1. Arc (Atomic Reference Counting): Mengizinkan BANYAK PEMILIK data di multi-thread!
// 2. RwLock (Read-Write Lock): Mengizinkan banyak pembaca bersamaan, atau 1 penulis eksklusif
type SharedIndex = Arc<RwLock<HashMap<String, String>>>;

fn main() {
    println!("=== Thread-Safe Key-Value Index Engine (Arc + RwLock) ===");

    // Inisialisasi index database yang dibungkus Smart Pointer
    let index: SharedIndex = Arc::new(RwLock::new(HashMap::new()));

    // Masukkan data awal
    {
        let mut writer = index.write().unwrap();
        writer.insert(String::from("config:max_clients"), String::from("10000"));
        writer.insert(String::from("status:health"), String::from("OK"));
    } // writer lock otomatis dilepas (drop) di akhir kurung kurawal ini!

    let mut handles = vec![];

    // Luncurkan 3 thread pembaca konkuren
    for thread_id in 1..=3 {
        // Arc::clone HANYA menyalin pointer atomik dan menaikkan reference counter (Sangat Cepat!)
        let index_clone = Arc::clone(&index);

        let handle = thread::spawn(move || {
            // Peminjaman Read-Lock (Tidak saling memblokir antar pembaca!)
            let reader = index_clone.read().unwrap();
            if let Some(val) = reader.get("status:health") {
                println!("[Thread Pembaca #{}] status:health = '{}'", thread_id, val);
            }
        });
        handles.push(handle);
    }

    // Luncurkan 1 thread penulis konkuren
    {
        let index_clone = Arc::clone(&index);
        let handle = thread::spawn(move || {
            // Write-Lock: Memblokir pembaca lain sesaat saat menulis data
            let mut writer = index_clone.write().unwrap();
            writer.insert(String::from("status:health"), String::from("DEGRADED_HIGH_LOAD"));
            println!("[Thread Penulis] Memperbarui status kesehatan sistem!");
        });
        handles.push(handle);
    }

    // Tunggu semua thread selesai dieksekusi
    for h in handles {
        h.join().unwrap();
    }

    // Cetak status akhir dari thread utama
    let reader_akhir = index.read().unwrap();
    println!("\nStatus Akhir Database: {:?}", *reader_akhir);
}
```

---

## Konsep Kunci

### Mengapa Membutuhkan Smart Pointers?
Hukum awal Rust menyatakan: *"Hanya ada SATU pemilik pada satu waktu"*.
Namun dalam arsitektur server multi-thread nyata:
Database Index atau Cache harus dibaca oleh **puluhan thread worker secara bersamaan**. Siapa pemilik index tersebut?
**Smart Pointers menyelesaikan paradoks ini**:

### Tiga Smart Pointer Terpenting di Rust:
1. **`Box<T>`**: Menyimpan data di Heap dengan pemilik tunggal. Digunakan untuk membuat struktur data berukuran dinamis atau rekursif (misal: Binary Tree).
2. **`Rc<T>` (Reference Counted)**: Mengizinkan data memiliki **banyak pemilik** di *single-thread*. Data otomatis dihapus saat penghitung pemilik mencapai 0.
3. **`Arc<T>` (Atomic Reference Counted)**: Versi aman thread dari `Rc`. Menggunakan operasi atomik CPU agar aman dibagikan ke banyak thread berbeda (*multi-thread*).

### Interior Mutability: `Arc<RwLock<T>>`
`Arc<T>` hanya mengizinkan banyak pemilik membaca secara read-only. Bagaimana cara mengubah isinya?
Kita membungkusnya dengan **`RwLock<T>`** atau **`Mutex<T>`**!
Pola **`Arc<RwLock<HashMap<K, V>>>`** adalah **standar emas industri Rust**:
- Banyak thread dapat memanggil `.read()` secara bersamaan tanpa saling menunggu (*concurrency tinggi*).
- Thread yang ingin mengubah data memanggil `.write()` yang secara aman mengunci akses hingga penulisan selesai.

---

---

## Penjelasan untuk Pemula

### Analogi: Buku Tamu Hotel dengan Penjilid Magnetik
1. **`Arc<T>`** seperti kartu izin fotokopi dokumen rahasia hotel: setiap manajer divisi memegang kartu duplikat yang sama. Selama masih ada 1 manajer yang memegang kartu (*penghitung referensi > 0*), dokumen asli tidak boleh dihancurkan dari brankas.
2. **`RwLock`** seperti papan tulis pengumuman di dinding lobi: 100 tamu boleh berdiri membaca papan bersamaan (*read lock*). Jika resepsionis ingin menghapus tulisan di papan tulis (*write lock*), ia berdiri menutupi papan sebentar sampai tulisan selesai diperbarui.

## Eksperimen

- Coba ganti Arc dengan Rc biasa pada kode multi-thread di atas dan amati pesan eror compiler: "`Rc` cannot be sent between threads safely (missing Send trait)".
- Uji terjadinya Deadlock dengan sengaja memanggil index.write() dua kali di thread yang sama tanpa melepas lock pertama.
- Cetak jumlah referensi aktif menggunakan Arc::strong_count(&index).
- Bandingkan performa throughput antara Mutex murni vs RwLock pada rasio 90% baca dan 10% tulis.

---

## Tantangan

Bangun struct `ConcurrentCache<K, V>` yang mengkapsulasi `Arc<RwLock<HashMap<K, V>>>` dan menyediakan method publik `get(&self, key: &K) -> Option<V>` dan `set(&self, key: K, val: V)`.

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

Kamu telah menguasai Box, Arc, RwLock, dan interior mutability thread-safe. Minggu depan kita mempelajari Fearless Concurrency dengan Threads dan Channels.
