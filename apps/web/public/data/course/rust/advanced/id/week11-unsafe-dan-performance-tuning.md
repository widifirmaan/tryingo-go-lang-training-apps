# Unsafe Rust & Optimasi Tingkat Ekstrem: Pointer Mentah (*const/*mut) & Zero-Copy

> **Kategori:** Rust | **Level:** Async Tokio, Durabilitas WAL & Capstone Engine | **Minggu 11:** Unsafe Rust & Optimasi Tingkat Ekstrem: Pointer Mentah (*const/*mut) & Zero-Copy
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi kata kunci `unsafe`: batas isolasi di mana pengembang memegang tanggung jawab kontrak memori
- Membedakan referensi aman (&T) vs Pointer Mentah (*const T dan *mut T)
- Menggunakan atribut `#[repr(C)]` untuk mengunci tata letak memori struct (*memory layout*) sesuai standar ABI C
- Menerapkan teknik Zero-Copy Deserialization: mem-parsing paket jaringan tanpa menyalin satupun byte di memori
- Menjaga batas isolasi (*Encapsulation of Unsafe*): membungkus kode unsafe di dalam antarmuka publik yang 100% aman (*safe wrapper*)

---

## Program: Deserializer Protokol Biner Kinerja Ekstrem dengan Nol Salinan (Zero-Copy)

```rust
// Peringatan: Blok 'unsafe' hanya digunakan untuk optimasi khusus di mana compiler tidak dapat membuktikan keamanan secara statis!

// Header Protokol Biner Transaksi Berukuran Tepat 16 Bytes
#[repr(C)] // Memastikan layout memori persis seperti struct bahasa C tanpa padding acak
#[derive(Debug, Clone, Copy)]
struct PaketHeaderKV {
    magic_number: u32, // 4 bytes (Harus 0x4E555341 = "NUSA")
    version: u16,      // 2 bytes
    command_id: u16,   // 2 bytes
    payload_len: u32,  // 4 bytes
    checksum: u32,     // 4 bytes
}

// Zero-Copy Casting: Mengonversi byte slice mentah langsung menjadi struct tanpa menyalin data!
fn parse_header_zero_copy(bytes: &[u8]) -> Option<&PaketHeaderKV> {
    if bytes.len() < std::mem::size_of::<PaketHeaderKV>() {
        return None;
    }

    // Blok UNSAFE: Pengembang mengambil tanggung jawab penuh atas keamanan pointer
    unsafe {
        // Ambil pointer mentah (*const u8) dan cast menjadi pointer struct (*const PaketHeaderKV)
        let ptr = bytes.as_ptr() as *const PaketHeaderKV;
        
        // Dereference pointer mentah menjadi referensi aman Rust (&PaketHeaderKV)
        let header_ref = &*ptr;

        if header_ref.magic_number != 0x4E555341 {
            return None; // Magic number tidak cocok, paket palsu
        }

        Some(header_ref)
    }
}

fn main() {
    println!("=== Rust Extreme Performance: Zero-Copy Deserializer ===");

    // Paket biner 16 bytes simulasi yang diterima dari soket jaringan
    let mut raw_packet = vec![
        0x41, 0x53, 0x55, 0x4E, // Magic "NUSA" (Little-endian byte order)
        0x01, 0x00,             // Versi 1
        0x02, 0x00,             // Command: SET (2)
        0x20, 0x00, 0x00, 0x00, // Payload Length: 32 bytes
        0x7B, 0x00, 0x00, 0x00, // Checksum: 123
    ];

    println!("Ukuran Buffer Biner: {} bytes", raw_packet.len());

    // Eksekusi parsing berkecepatan 0 nanodetik (Nol Salinan Memori!)
    if let Some(header) = parse_header_zero_copy(&raw_packet) {
        println!("[SUCCESS] Header Berhasil Di-Parse via Zero-Copy!");
        println!("  -> Magic Number: 0x{:X}", header.magic_number);
        println!("  -> Versi Protokol: {}", header.version);
        println!("  -> Command ID: {}", header.command_id);
        println!("  -> Panjang Payload: {} bytes", header.payload_len);
    } else {
        println!("[FAIL] Format paket biner tidak valid!");
    }
}
```

---

## Konsep Kunci

### Mengapa Rust Memiliki Kata Kunci `unsafe`?
Kompilator Rust sangat ketat. Namun ada hal-hal tertentu di tingkat sistem operasi perangkat keras yang **secara matematis tidak dapat dibuktikan oleh kompilator**:
1. Menulis driver perangkat keras pada alamat memori fisik tertentu (`0x0000FFFF`).
2. Melakukan interaksi dengan pustaka C (*Foreign Function Interface - FFI*).
3. Melakukan casting pointer biner berkecepatan ekstrem (*Zero-Copy Deserialization*).

Untuk itu, Rust menyediakan blok **`unsafe`**.
`unsafe` BUKAN berarti kode tersebut buruk atau berbahaya!
`unsafe` berarti: *"Wahai compiler, aturan borrow checker tidak bisa melihat ke dalam sini. Saya sebagai insinyur perangkat lunak menjamin dengan reputasi saya bahwa pointer ini valid, berukuran pas, dan terhindar dari null."*

### Kekuatan Super Zero-Copy
Pada serialisasi tradisional (seperti JSON atau Protobuf), membaca paket 1GB mengharuskan CPU mengalokasikan 1GB memori baru di heap dan menyalin datanya byte per byte (*berat dan boros RAM*).
Dengan **Zero-Copy (`#[repr(C)]`)**:
Kita memperlakukan potongan byte di buffer jaringan **langsung sebagai struct di tempat**!
Waktu pemrosesan menjadi **0 milidetik**, memungkinkan sistem Anda memproses jutaan paket per detik dengan throughput jaringan kabel penuh!

---

---

## Penjelasan untuk Pemula

### Analogi: Meja Kasir VIP Bebas Buka Tas
1. **Safe Rust** seperti pemeriksaan keamanan bandara standar: setiap tas dibuka, disinari X-ray, dan diverifikasi petugas (*compiler memeriksa setiap variabel*). Sangat aman, tidak ada barang berbahaya yang bisa lolos.
2. **Unsafe Rust** seperti jalur diplomatik kepresidenan: petugas bandara mengizinkan koper diplomat lewat tanpa dibuka (*blok unsafe*), karena duta besar telah menjamin dengan sumpah negara bahwa koper tersebut aman. Jika duta besar berbohong (*ada bug pointer*), seluruh pesawat bisa celaka.

## Eksperimen

- Ubah ukuran raw_packet menjadi 10 byte (kurang dari 16 byte) dan amati fungsi mengembalikan None secara aman tanpa crash.
- Ubah byte magic number dan perhatikan parser menolak paket palsu.
- Gunakan miri (cargo miri run) untuk memverifikasi apakah ada undefined behavior pada blok unsafe Anda.
- Bandingkan benchmark kecepatan deserialisasi zero-copy vs serde_json pada paket 10.000 data.

---

## Tantangan

Buat fungsi aman `ekstrak_payload_slice<'a>(bytes: &'a [u8], header: &PaketHeaderKV) -> Option<(&'a [u8])>` yang mengembalikan slice byte isi payload dengan validasi panjang buffer agar tidak membaca memori di luar batas.

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

Kamu telah menguasai batas unsafe, pointer mentah, layout #[repr(C)], dan deserialisasi zero-copy. Minggu depan adalah Capstone Final: In-Memory Key-Value Store dengan WAL.
