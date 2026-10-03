# Ownership & Move Semantics: Keamanan Memori Tanpa Garbage Collector

> **Kategori:** Rust | **Level:** Ownership, Borrowing & Sistem Tipe Aman | **Minggu 1:** Ownership & Move Semantics: Keamanan Memori Tanpa Garbage Collector
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 3 Hukum Keramat Ownership di Rust yang memecahkan masalah memory leak dan segmentation faults
- Membedakan alokasi memori Stack (cepat, ukuran tetap) vs Heap (dinamis, dikelola pointer)
- Memahami Move Semantics: pemindahan kepemilikan pointer yang mencegah celah keamanan Double-Free
- Membedakan tipe data Copy (primitif skalar) vs tipe data non-Copy (String, Vec)
- Menghargai fitur kompilator rustc dan borrow checker yang menjamin keamanan memori sebelum kode pernah dirilis

---

## Program: Alokator Memori Key-Value & Pelacak Kepemilikan String

```rust
// 1. Tipe Primitif di Stack (Mengimplementasikan Copy Trait Otomatis)
fn demonstrasi_stack_copy() {
    let port: u16 = 6379;
    let salinan_port = port; // Copy: Data 2 byte disalin langsung di Stack

    println!("Stack: Port Asli = {}, Salinan = {}", port, salinan_port);
}

// 2. Tipe Dinamis di Heap (String, Vec) yang Tunduk pada Hukum Ownership
fn proses_kunci_database(kunci: String) {
    println!("Fungsi mengambil alih kepemilikan kunci: '{}'", kunci);
} // Di sini 'kunci' keluar dari scope: Memori Heap dibebaskan seketika via drop()!

fn main() {
    println!("=== Rust Engine: Demonstrasi Ownership & Move Semantics ===");
    demonstrasi_stack_copy();

    // Alokasi memori dinamis di Heap
    let user_token = String::from("usr_session_9921_secret");
    println!("Token awal dibuat di Heap: {}", user_token);

    // MOVE SEMANTICS: Kepemilikan pointer berpindah dari 'user_token' ke fungsi!
    proses_kunci_database(user_token);

    // KODE DI BAWAH INI AKAN DITOLAK COMPILER RUST DENGAN EROR KERAS:
    // println!("Coba akses token lagi: {}", user_token);
    // Eror: "borrow of moved value: `user_token`"
    
    println!("Memori Heap telah dibersihkan otomatis tanpa Garbage Collector!");
}
```

---

## Konsep Kunci

### Mengapa Rust Terpilih Sebagai Bahasa Paling Dicintai di Dunia?
Sebelum Rust, programmer sistem hanya memiliki dua pilihan pahit:
1. **Bahasa C / C++**: Kecepatan puncak tanpa batas, tetapi **sangat berbahaya**. Kesalahan pointer kecil menyebabkan *Segmentation Fault*, *Buffer Overflow*, atau peretasan keamanan memori bernilai miliaran rupiah.
2. **Bahasa Garbage Collector (Go, Java, C#)**: Aman dari kebocoran memori, tetapi **memiliki overhead runtime dan jeda GC** yang memakan memori RAM besar dan tidak cocok untuk sistem embedded atau OS kernel.

**Rust memecahkan dilema 50 tahun ini**:
Rust memberikan **kecepatan setara C/C++ dengan keamanan memori 100% TANPA GARBAGE COLLECTOR**, berkat sistem **Ownership**!

### Tiga Aturan Mutlak Ownership:
1. Setiap nilai di Rust memiliki satu variabel yang menjadi **pemiliknya (*owner*)**.
2. Hanya boleh ada **satu pemilik pada satu waktu**.
3. Ketika pemiliknya keluar dari cakupan kurung kurawal (*scope* `{}`), **nilai tersebut otomatis dihancurkan dan memorinya dikembalikan seketika (*drop*)**!

### Move Semantics (Bukan Shallow Copy)
Saat Anda menulis:
`let s1 = String::from("halo"); let s2 = s1;`
Rust **TIDAK menyalin data teks di heap** (karena boros memori). Rust hanya memindahkan pointer kepemilikan dari `s1` ke `s2`. Setelah baris tersebut, `s1` **dianggap mati dan dilarang diakses lagi oleh compiler**! Ini mencegah bug berbahaya di mana dua variabel mencoba menghapus memori yang sama dua kali (*Double Free Bug*).

---

---

## Penjelasan untuk Pemula

### Analogi: Sertifikat BPKB Mobil Asli
1. **Move Semantics** seperti sertifikat BPKB kendaraan asli: sebuah mobil hanya boleh memiliki 1 BPKB sah pada satu waktu. Jika Anda menjual mobil ke pembeli (*memanggil fungsi*), BPKB asli diserahkan ke pembeli. Anda (*variabel s1*) tidak lagi memiliki mobil tersebut dan dilarang mengendarainya.
2. **Copy Trait** seperti selembar uang kertas pecahan 5 ribu rupiah: Anda bisa memfotokopi atau memberikan uang receh tanpa perlu mencatat sertifikat kepemilikan rumit di kantor kepolisian.

## Eksperimen

- Buka komentar pada baris println!("Coba akses token lagi: {}", user_token) dan amati pesan eror compile-time yang sangat mendidik dari rustc.
- Gunakan user_token.clone() jika Anda memang berniat menyalin seluruh data heap secara eksplisit.
- Cetak ukuran memori pointer String menggunakan std::mem::size_of::<String>() (hanya 24 byte di Stack!).
- Perhatikan bahwa integer primitif i32 tidak mengalami Move karena mengimplementasikan Copy trait.

---

## Tantangan

Buat fungsi `hitung_panjang_dan_kembalikan(s: String) -> (String, usize)` yang menerima kepemilikan String, mengukur panjang karakternya, lalu mengembalikan kepemilikan string tersebut bersama angka panjangnya.

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

Kamu telah menguasai tiga hukum Ownership, alokasi Stack vs Heap, dan Move Semantics. Minggu depan kita mempelajari Borrowing dan References (& dan &mut).
