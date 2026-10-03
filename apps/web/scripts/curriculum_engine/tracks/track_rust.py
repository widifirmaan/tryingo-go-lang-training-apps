# Rust Track: 12 Weeks (3 Levels)
# Final Product: Blazing-Fast In-Memory Key-Value Store with Write-Ahead Log (WAL) & Crash Recovery

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Ownership, Borrowing & Sistem Tipe Aman',
        'nameEn': 'Ownership, Borrowing & Safe Types',
        'descId': 'Pondasi keamanan memori tanpa Garbage Collector: Ownership, Move Semantics, Borrowing (& vs &mut), Structs, Enums, dan match.',
        'descEn': 'Memory safety without Garbage Collection: Ownership, Move Semantics, Borrowing (& vs &mut), Structs, Enums, and match.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'Traits, Smart Pointers & Konkurensi Tanpa Takut',
        'nameEn': 'Traits, Smart Pointers & Fearless Concurrency',
        'descId': 'Polimorfisme Trait, operator ?, Smart Pointers (Box, Rc, Arc, Mutex), dan Fearless Concurrency dengan Send/Sync threads.',
        'descEn': 'Trait polymorphism, ? operator, Smart Pointers (Box, Rc, Arc, Mutex), and Fearless Concurrency with Send/Sync threads.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Async Tokio, Durabilitas WAL & Capstone KV Engine',
        'nameEn': 'Async Tokio, WAL Durability & KV Engine Capstone',
        'descId': 'Pemrograman asinkron dengan runtime Tokio, Write-Ahead Log (WAL) file durability, fsync crash recovery, dan proyek capstone KV Store.',
        'descEn': 'Asynchronous programming with Tokio, Write-Ahead Log (WAL) file durability, fsync crash recovery, and the KV Store capstone.',
    },
]

MODULES = [
    # Level 1: Ownership, Borrowing & Sistem Tipe Aman (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'ownership-dan-move-semantics',
        'titleId': 'Ownership & Move Semantics: Keamanan Memori Tanpa Garbage Collector',
        'titleEn': 'Ownership & Move Semantics: Memory Safety Without Garbage Collection',
        'programId': 'Alokator Memori Key-Value & Pelacak Kepemilikan String',
        'programEn': 'Key-Value Memory Allocator & Ownership Tracking in Pure Rust',
        'levelNameId': 'Ownership, Borrowing & Sistem Tipe Aman',
        'levelNameEn': 'Ownership, Borrowing & Safe Types',
        'language': 'rust',
        'code': """// 1. Tipe Primitif di Stack (Mengimplementasikan Copy Trait Otomatis)
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
""",
        'objectivesId': [
            'Memahami 3 Hukum Keramat Ownership di Rust yang memecahkan masalah memory leak dan segmentation faults',
            'Membedakan alokasi memori Stack (cepat, ukuran tetap) vs Heap (dinamis, dikelola pointer)',
            'Memahami Move Semantics: pemindahan kepemilikan pointer yang mencegah celah keamanan Double-Free',
            'Membedakan tipe data Copy (primitif skalar) vs tipe data non-Copy (String, Vec)',
            'Menghargai fitur kompilator rustc dan borrow checker yang menjamin keamanan memori sebelum kode pernah dirilis',
        ],
        'objectivesEn': [
            'Master the Three Inviolable Laws of Ownership in Rust eliminating memory leaks and segfaults',
            'Distinguish Stack allocations (contiguous, compile-time fixed) from Heap allocations (dynamic pointers)',
            'Understand Move Semantics: pointer ownership transfers eliminating Double-Free vulnerabilities',
            'Differentiate Copy types (stack primitives) from non-Copy heap types (String, Vec)',
            'Appreciate the rustc borrow checker guaranteeing absolute memory safety at compile time',
        ],
        'explanationId': """### Mengapa Rust Terpilih Sebagai Bahasa Paling Dicintai di Dunia?
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
Rust **TIDAK menyalin data teks di heap** (karena boros memori). Rust hanya memindahkan pointer kepemilikan dari `s1` ke `s2`. Setelah baris tersebut, `s1` **dianggap mati dan dilarang diakses lagi oleh compiler**! Ini mencegah bug berbahaya di mana dua variabel mencoba menghapus memori yang sama dua kali (*Double Free Bug*).""",
        'explanationEn': """### Why Rust Conquered Systems Engineering
Historically, systems engineers faced a frustrating compromise:
1. **C / C++**: Raw native performance, yet plagued by catastrophic **memory safety vulnerabilities**: Segmentation Faults, Buffer Overflows, and Use-After-Free security exploits.
2. **Garbage Collected Languages (Go, Java, C#)**: Memory safe, yet encumbered by **runtime memory overhead and GC pauses** unsuitable for kernels, game engines, or hyper-scale databases.

**Rust solved this 50-year dilemma**:
Rust delivers **bare-metal C/C++ execution speeds with provable 100% memory safety WITHOUT a Garbage Collector**, powered by **Ownership**!

### The Three Inviolable Rules of Ownership:
1. Each value in Rust has an owner variable.
2. There can only be **one owner at a time**.
3. When the owner goes out of scope, Rust **reclaims memory immediately via the `drop()` destructor**!

### Move Semantics (Zero-Cost Ownership Transfer)
When executing:
`let s1 = String::from("hello"); let s2 = s1;`
Rust avoids deep heap copying. It transfers pointer ownership metadata from `s1` to `s2`. Crucially, `s1` **is invalidated at compile time**! This completely eliminates Double-Free memory corruption attacks at zero runtime cost.""",
        'beginnerId': """### Analogi: Sertifikat BPKB Mobil Asli
1. **Move Semantics** seperti sertifikat BPKB kendaraan asli: sebuah mobil hanya boleh memiliki 1 BPKB sah pada satu waktu. Jika Anda menjual mobil ke pembeli (*memanggil fungsi*), BPKB asli diserahkan ke pembeli. Anda (*variabel s1*) tidak lagi memiliki mobil tersebut dan dilarang mengendarainya.
2. **Copy Trait** seperti selembar uang kertas pecahan 5 ribu rupiah: Anda bisa memfotokopi atau memberikan uang receh tanpa perlu mencatat sertifikat kepemilikan rumit di kantor kepolisian.""",
        'beginnerEn': """### Analogy: Real Estate Master Deeds vs Cash Bills
1. **Move Semantics** is a master physical land title deed: a parcel of land maintains exactly one legal deed. When you deed the property to a buyer (*passing to a function*), the title transfers completely. You (*variable s1*) no longer hold legal ownership and are trespassing if you attempt entry.
2. **The Copy Trait** is loose change in your pocket: handing over a five-dollar coin requires no formal title transfer registry; integers and booleans copy instantly on the stack.""",
        'experimentsId': [
            'Buka komentar pada baris println!("Coba akses token lagi: {}", user_token) dan amati pesan eror compile-time yang sangat mendidik dari rustc.',
            'Gunakan user_token.clone() jika Anda memang berniat menyalin seluruh data heap secara eksplisit.',
            'Cetak ukuran memori pointer String menggunakan std::mem::size_of::<String>() (hanya 24 byte di Stack!).',
            'Perhatikan bahwa integer primitif i32 tidak mengalami Move karena mengimplementasikan Copy trait.',
        ],
        'experimentsEn': [
            'Uncomment the println referencing moved user_token to inspect rustc\'s instructional compile diagnostic.',
            'Deploy user_token.clone() to deliberately allocate an explicit independent deep heap copy.',
            'Inspect stack memory sizes with std::mem::size_of::<String>() confirming it holds exactly 24 bytes.',
            'Confirm that primitive i32 integers never move because they implement the stack Copy trait.',
        ],
        'challengeId': 'Buat fungsi `hitung_panjang_dan_kembalikan(s: String) -> (String, usize)` yang menerima kepemilikan String, mengukur panjang karakternya, lalu mengembalikan kepemilikan string tersebut bersama angka panjangnya.',
        'challengeEn': 'Author a `calculate_length_and_return(s: String) -> (String, usize)` returning ownership of the original String alongside its character length tuple.',
        'summaryId': 'Kamu telah menguasai tiga hukum Ownership, alokasi Stack vs Heap, dan Move Semantics. Minggu depan kita mempelajari Borrowing dan References (& dan &mut).',
        'summaryEn': 'You have mastered the Three Laws of Ownership, Stack vs Heap, and Move Semantics. Next week, we examine Borrowing and References (& and &mut).',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'borrowing-dan-references',
        'titleId': 'Borrowing & References: Peminjaman Aman (&T), Mutasi (&mut T) & Aturan Aliasing XOR Mutability',
        'titleEn': 'Borrowing & References: Shared (&T), Mutable (&mut T) & Aliasing Rules',
        'programId': 'Pembaca Catatan Log Transaksi WAL (Write-Ahead Log Reader)',
        'programEn': 'Write-Ahead Log (WAL) Record Reader with References & Zero Allocations',
        'levelNameId': 'Ownership, Borrowing & Sistem Tipe Aman',
        'levelNameEn': 'Ownership, Borrowing & Safe Types',
        'language': 'rust',
        'code': """// 1. Immutable Borrow (&T): Membaca data tanpa mengambil alih kepemilikan
fn hitung_panjang_catatan(log_entry: &String) -> usize {
    // log_entry hanya dipinjam! Pemilik aslinya di main() tetap memiliki memori
    log_entry.len()
}

// 2. Mutable Borrow (&mut T): Meminjam dengan hak akses untuk memutasi data
fn tambahkan_checksum(log_entry: &mut String, id_transaksi: u64) {
    let checksum = id_transaksi * 31 % 1000;
    log_entry.push_str(&format!(" | CRC:{:03}", checksum));
}

fn main() {
    println!("=== WAL Record Processor: Zero-Copy References ===");

    // String yang dapat dimutasi (mut)
    let mut catatan_wal = String::from("OP:SET key=session_user val=8829");
    println!("Catatan Awal: '{}'", catatan_wal);

    // Peminjaman Read-Only (Bisa banyak peminjam sekaligus)
    let ref1 = &catatan_wal;
    let ref2 = &catatan_wal;
    println!("Panjang via Ref1: {} bytes, Ref2: {} bytes", hitung_panjang_catatan(ref1), hitung_panjang_catatan(ref2));

    // ATURAN EMAS RUST: ALIASING XOR MUTABILITY
    // Peminjaman Mutable (&mut) HANYA boleh ada TEPAT SATU pada satu waktu!
    tambahkan_checksum(&mut catatan_wal, 1042);
    println!("Catatan Setelah Ditambah Checksum: '{}'", catatan_wal);

    // String Slice (&str): Referensi efisien ke sebagian potongan teks di memori
    let potongan_op = &catatan_wal[0..6]; // "OP:SET"
    println!("Operasi Terdeteksi: '{}' (Nol Alokasi Heap!)", potongan_op);
}
""",
        'objectivesId': [
            'Memahami konsep Borrowing (meminjam data tanpa memindahkan kepemilikan) menggunakan referensi (&)',
            'Membedakan Immutable Reference (&T) vs Mutable Reference (&mut T)',
            'Menguasai Hukum Sakral Rust: Aliasing XOR Mutability (Boleh banyak pembaca, ATAU tepat 1 penulis, tidak boleh keduanya bersamaan)',
            'Menghilangkan bug klasik sistem operasi: Data Races dan Dangling Pointers secara kompilasi',
            'Menggunakan String Slices (&str) untuk manipulasi teks berkecepatan tinggi dengan nol alokasi heap (*zero-copy*)',
        ],
        'objectivesEn': [
            'Master Borrowing semantics (reading data without relinquishing ownership) via references (&)',
            'Differentiate Immutable References (&T) from exclusive Mutable References (&mut T)',
            'Master the Fundamental Rust Law: Aliasing XOR Mutability (Many readers OR exactly one writer, never both concurrently)',
            'Eliminate Data Races and Dangling Pointers at compile time before execution',
            'Deploy String Slices (&str) for zero-copy string parsing without triggering heap allocations',
        ],
        'explanationId': """### Mengapa Memindahkan Kepemilikan (Move) Tidak Cukup?
Jika setiap fungsi yang ingin membaca panjang string harus mengambil alih kepemilikan data, Anda terpaksa mengembalikan string tersebut berulang kali. Ini sangat merepotkan.
Rust menyediakan fitur **Borrowing (Peminjaman)** menggunakan simbol ampersand `&`.

### Aturan Emas Peminjaman di Rust (Aliasing XOR Mutability):
Anda boleh memilih salah satu dari dua kondisi ini pada satu waktu:
1. **Banyak referensi read-only (`&T`)** secara bersamaan. Siapa saja boleh membaca, karena membaca tidak akan merusak data.
2. **HANYA SATU referensi mutable (`&mut T`)** pada satu waktu. Jika ada yang sedang menulis, tidak boleh ada pihak lain yang membaca atau menulis!

### Mengapa Aturan Ini Menyelamatkan Industri Software?
Di C++ atau Java, jika Thread A sedang membaca array sementara Thread B menghapus elemen array tersebut di tengah jalan, terjadi *Race Condition* atau *Crash Memory Corrupt*.
Aturan kaku Rust menjamin 100% secara kompilasi bahwa **Data Race tidak akan pernah mungkin terjadi di kode safe Rust!**

### Apa itu String Slice (`&str`)?
`String` adalah buffer dinamis di heap yang memiliki kapasitas dan bisa membesar.
`&str` (*string slice*) adalah **pandangan read-only (*view*)** ke rentang memori teks tertentu. Memotong string dengan `&catatan[0..6]` tidak menyalin memori sama sekali (*Zero Copy*), menjadikannya instan secepat kecepatan cahaya!""",
        'explanationEn': """### Why Pure Ownership Is Insufficient
If every utility function calculating string lengths forced full ownership transfers, functions would endlessly return data tuples just to hand ownership back.
Rust introduces **Borrowing** through reference pointers (`&`).

### The Fundamental Rule: Aliasing XOR Mutability
At any given instant, you may hold EITHER:
1. **Arbitrary count of immutable references (`&T`)**. Multiple observers can read concurrently without corrupting state.
2. **EXACTLY ONE mutable reference (`&mut T`)**. While a writer mutates memory, no other readers or writers may exist concurrently.

### How This Rule Eradicates Concurrency Bugs
In C++ or Java, if Thread A iterates an ArrayList while Thread B prunes elements concurrently, the runtime corrupts pointers.
Rust's Aliasing XOR Mutability compile-time rule guarantees **Data Races are mathematically impossible in safe Rust!**

### The Power of String Slices (`&str`)
`String` is an expandable heap-allocated buffer.
`&str` is an immutable **window pointer view** into a slice of UTF-8 memory. Slicing with `&record[0..6]` allocates zero heap bytes (*Zero-Copy Architecture*), executing at bare-metal memory speeds!""",
        'beginnerId': """### Analogi: Membaca Koran di Perpustakaan Kota
1. **Immutable Borrow (`&T`)** seperti membaca koran yang ditempel di dinding perpustakaan: 50 orang boleh berdiri bersamaan membaca berita koran tersebut (*banyak pembaca*). Tidak ada yang bertengkar karena tidak ada yang mengubah tulisan koran.
2. **Mutable Borrow (`&mut T`)** seperti petugas perpustakaan yang sedang mencoret-coret dan mengganti lembaran koran dengan spidol hitam (*satu penulis*): petugas meminta 50 pengunjung mundur menjauh. Tidak boleh ada yang membaca koran saat spidol sedang digoreskan.""",
        'beginnerEn': """### Analogy: Public Library Newspaper Displays
1. **Immutable Borrowing (`&T`)** is a broadsheet newspaper pinned to a public library board: 50 patrons can read the identical page concurrently (*many readers*). Zero conflict arises because readers do not alter the print.
2. **Mutable Borrowing (`&mut T`)** is the conservator restoring the document with permanent ink (*exclusive writer*): the conservator requests readers step behind the velvet rope. Zero reading occurs until the ink dries.""",
        'experimentsId': [
            'Coba buat let r1 = &mut catatan_wal dan let r2 = &catatan_wal bersamaan di scope yang sama; amati rustc menolak kompilasi.',
            'Coba buat fungsi yang mengembalikan referensi ke variabel lokal (dangling pointer) dan saksikan compiler menyelamatkan Anda.',
            'Ubah fungsi hitung_panjang_catatan agar menerima &str alih-alih &String (idiom terbaik Rust).',
            'Potong slice teks di tengah karakter UTF-8 multi-byte (misal huruf Mandarin/Emoji) dan pelajari bagaimana Rust memvalidasi batas UTF-8.',
        ],
        'experimentsEn': [
            'Attempt declaring let r1 = &mut record alongside let r2 = &record concurrently to witness compile rejection.',
            'Author a function returning a reference to a stack-local variable to watch the borrow checker prevent a dangling pointer.',
            'Refactor hitung_panjang_catatan to accept &str instead of &String (the idiomatic Rust string parameter pattern).',
            'Attempt slicing across multi-byte UTF-8 boundaries observing Rust panic safety validations.',
        ],
        'challengeId': 'Buat fungsi `bersihkan_whitespace_mut(teks: &mut String)` yang memotong spasi di awal dan akhir secara langsung pada memori teks asli tanpa membuat alokasi heap baru.',
        'challengeEn': 'Author a `trim_whitespace_mut(text: &mut String)` function trimming leading and trailing spaces in-place on the mutable buffer with zero fresh allocations.',
        'summaryId': 'Kamu telah menguasai Borrowing, referensi eksklusif vs bersama, dan string slices &str. Minggu depan kita mempelajari Structs, Enums, dan Pattern Matching.',
        'summaryEn': 'You have mastered Borrowing, references, and string slices. Next week, we examine Structs, Enums with data payloads, and exhaustive Pattern Matching.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'structs-enums-dan-pattern-matching',
        'titleId': 'Structs, Enums dengan Payload Data & Pattern Matching Eksklusif (match)',
        'titleEn': 'Structs, Enums with Payloads & Exhaustive Pattern Matching (match)',
        'programId': 'Parser Perintah Protokol Key-Value (GET, SET, DEL, PING)',
        'programEn': 'Custom Key-Value Protocol Command Parser with Algebraic Enums',
        'levelNameId': 'Ownership, Borrowing & Sistem Tipe Aman',
        'levelNameEn': 'Ownership, Borrowing & Safe Types',
        'language': 'rust',
        'code': """// 1. Enum Aljabar Modern: Setiap Varian Dapat Membawa Payload Tipe Data Berbeda!
#[derive(Debug)]
enum PerintahKV {
    Ping,
    Get { kunci: String },
    Set { kunci: String, nilai: Vec<u8> },
    Del { kunci: String },
    Flush,
}

// 2. Struct untuk Hasil Eksekusi
#[derive(Debug)]
struct ResponsKV {
    sukses: bool,
    pesan: String,
    durasi_mikrodetik: u64,
}

// 3. Pattern Matching Eksklusif (Exhaustive match)
fn eksekusi_perintah(cmd: PerintahKV) -> ResponsKV {
    // Rust mewajibkan SETIAP varian enum ditangani; lupa 1 varian = kompilasi gagal!
    match cmd {
        PerintahKV::Ping => ResponsKV {
            sukses: true,
            pesan: String::from("PONG"),
            durasi_mikrodetik: 5,
        },
        PerintahKV::Get { kunci } => ResponsKV {
            sukses: true,
            pesan: format!("Nilai dari '{}' ditemukan di cache", kunci),
            durasi_mikrodetik: 12,
        },
        PerintahKV::Set { kunci, nilai } => ResponsKV {
            sukses: true,
            pesan: format!("Tersimpan '{}' dengan ukuran {} bytes", kunci, nilai.len()),
            durasi_mikrodetik: 25,
        },
        PerintahKV::Del { kunci } => ResponsKV {
            sukses: true,
            pesan: format!("Kunci '{}' telah dihapus dari database", kunci),
            durasi_mikrodetik: 18,
        },
        PerintahKV::Flush => ResponsKV {
            sukses: true,
            pesan: String::from("Seluruh memori database telah dikosongkan"),
            durasi_mikrodetik: 150,
        },
    }
}

fn main() {
    println!("=== Parser Perintah Mesin Key-Value Rust ===");

    let cmd1 = PerintahKV::Set {
        kunci: String::from("session:token_901"),
        nilai: vec![0xDE, 0xAD, 0xBE, 0xEF],
    };
    let cmd2 = PerintahKV::Ping;

    let res1 = eksekusi_perintah(cmd1);
    let res2 = eksekusi_perintah(cmd2);

    println!("Hasil Eksekusi 1: {:?} ({} µs)", res1.pesan, res1.durasi_mikrodetik);
    println!("Hasil Eksekusi 2: {:?} ({} µs)", res2.pesan, res2.durasi_mikrodetik);
}
""",
        'objectivesId': [
            'Memahami kekuatan Enums Aljabar di Rust yang dapat membawa payload data berbeda pada setiap variannya',
            'Menguasai pattern matching menggunakan keyword match yang dijamin kompilator bersifat menyeluruh (*exhaustive*)',
            'Memahami tipe sakral Option<T> (Some(T) vs None) yang menghapus konsep Null Pointer Exception di Rust',
            'Memahami tipe Result<T, E> (Ok(T) vs Err(E)) untuk representasi keberhasilan atau kegagalan operasi',
            'Menggunakan ekspresi if let dan match guard untuk percabangan kondisional ekspresif',
        ],
        'objectivesEn': [
            'Master Algebraic Data Types (Enums) in Rust encapsulating rich data payloads within each variant',
            'Master the exhaustive pattern matching semantics of the match keyword enforced by rustc',
            'Understand Option<T> (Some(T) vs None) eradicating Null Pointer Exceptions from the language',
            'Understand Result<T, E> (Ok(T) vs Err(E)) modeling explicit operational success or failure outcomes',
            'Deploy ergonomic if let idioms and pattern match guards for expressive conditional branches',
        ],
        'explanationId': """### Mengapa Enum di Rust Jauh Lebih Kuat dari Bahasa Lain?
Di C, Java, atau TypeScript, `enum` hanyalah kumpulan angka atau string sederhana (`enum Color { Red, Green }`).
**Di Rust, Enum adalah Algebraic Data Type (ADT)**:
Setiap varian enum bisa membawa struktur data yang berbeda sama sekali:
- `Ping` (tanpa data)
- `Get { kunci: String }` (membawa string)
- `Set { kunci: String, nilai: Vec<u8> }` (membawa string dan array byte)

### Pembunuhan Terbesar Rust: Kematian `NULL`
Pencipta pointer null (Tony Hoare) menyebut null sebagai *"The Billion Dollar Mistake"* karena menyebabkan miliaran kerugian akibat crash null pointer di production.
**Rust sama sekali tidak memiliki nilai `null`!**
Sebagai gantinya, Rust menggunakan enum bawaan:
```rust
enum Option<T> {
    Some(T),
    None,
}
```
Jika Anda ingin variabel bernilai kosong, tipenya adalah `Option<User>`.
Compiler **memaksa Anda menangani kasus `None` sebelum Anda diizinkan membaca nilai `User`-nya**! Anda tidak akan pernah bisa mengalami crash null pointer di Rust!

### Exhaustive Pattern Matching
Ketika Anda melakukan `match cmd`, Anda **wajib menangani semua kemungkinan varian**.
Jika di masa depan rekan tim Anda menambahkan varian baru `PerintahKV::Backup`, compiler akan **langsung menolak kompilasi di semua tempat yang menggunakan match**, memberi tahu Anda file dan baris mana saja yang belum menangani perintah Backup!""",
        'explanationEn': """### Why Rust Enums Surpass All Other Languages
In C or TypeScript, enums are scalar integers or static strings (`enum Color { Red, Green }`).
**In Rust, Enums are Algebraic Data Types (Tagged Unions)**:
Each variant encapsulates completely disparate data schemas:
- `Ping` (zero-sized unit)
- `Get { key: String }` (holds a string payload)
- `Set { key: String, val: Vec<u8> }` (holds strings and raw byte buffers)

### Eradicating the Billion-Dollar Mistake: No Null
Tony Hoare called null pointers his *"Billion Dollar Mistake"* due to decades of production crashes.
**Rust has no `null` keyword!**
Instead, missing values model through the standard enum:
```rust
enum Option<T> {
    Some(T),
    None,
}
```
If an entity might be absent, its type is `Option<User>`.
The compiler **mandates unpacking the `None` branch before permitting access to the inner `User`**! Null dereference crashes are completely impossible.

### Exhaustive Pattern Matching
Evaluating `match cmd` mandates handling **every declared enum variant**.
If a teammate later introduces `PerintahKV::Backup`, the compiler halts with an explicit error identifying every unhandled match block across your codebase!""",
        'beginnerId': """### Analogi: Sakelar Lampu Ber-Kunci Pengaman
1. **Enum dengan Payload** seperti laci berkas kantor dengan label stempel berbeda: laci bertuliskan 'Kirim Dokumen' berisi amplop surat (*payload String*), laci bertuliskan 'Kirim Paket' berisi kotak kardus berat (*payload Vec<u8>*), dan laci bertuliskan 'Bunyikan Bel' tidak berisi barang apapun selain tombol sakelar.
2. **Exhaustive Match** seperti pemeriksa tiket bioskop yang wajib memeriksa semua pintu keluar darurat: juri tidak boleh meninggalkan gedung sebelum memastikan semua 5 pintu darurat telah diperiksa kuncinya.""",
        'beginnerEn': """### Analogy: Industrial Dispatch Slips & Fire Exit Inspections
1. **Enums with Payloads** are dispatch boxes in an operations center: the slot stamped 'Letter Dispatch' holds paper envelopes (*String payload*), the slot stamped 'Cargo Dispatch' holds a pallet manifest (*Vec<u8> payload*), and the slot stamped 'Emergency Alarm' holds purely a button.
2. **Exhaustive Pattern Matching** is a certified fire inspector: inspectors are legally prohibited from signing facility occupancy permits until every single emergency hatch has an explicit inspected status on the clipboard.""",
        'experimentsId': [
            'Hapus cabang PerintahKV::Flush dari fungsi eksekusi_perintah dan amati pesan eror rustc: "pattern `Flush` not covered".',
            'Tambahkan varian baru PerintahKV::Exists { kunci: String } dan perbaiki pattern match-nya.',
            'Bungkus hasil eksekusi dalam Result<ResponsKV, String> dan uji penanganan kasus eror.',
            'Gunakan sintaks if let PerintahKV::Get { kunci } = cmd untuk menangani hanya satu varian spesifik secara ringkas.',
        ],
        'experimentsEn': [
            'Delete the PerintahKV::Flush arm from eksekusi_perintah observing rustc: "pattern `Flush` not covered".',
            'Add a new PerintahKV::Exists { key: String } variant and update the exhaustive pattern match.',
            'Wrap command execution inside Result<ResponsKV, String> exploring error handling branches.',
            'Deploy the concise if let PerintahKV::Get { key } = cmd syntax matching single variants cleanly.',
        ],
        'challengeId': 'Rancang parser string sederhana: buat fungsi `parse_command(teks: &str) -> Option<PerintahKV>` yang mengubah string "PING" menjadi `Some(PerintahKV::Ping)` dan "DEL token" menjadi `Some(PerintahKV::Del { kunci: "token" })`.',
        'challengeEn': 'Author a `parse_command(text: &str) -> Option<PerintahKV>` parser converting "PING" to `Some(PerintahKV::Ping)` and "DEL token" to `Some(PerintahKV::Del { key: "token" })`.',
        'summaryId': 'Kamu telah menguasai Structs, Algebraic Enums, Option/Result, dan pattern matching exhaustive. Minggu depan kita mempelajari Koleksi: Vectors, Strings, dan HashMaps.',
        'summaryEn': 'You have mastered Structs, Algebraic Enums, Option/Result, and exhaustive matching. Next week, we examine Collections: Vectors, Strings, and HashMaps.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'collections-vectors-dan-strings',
        'titleId': 'Koleksi Inti: Vec<T>, String vs &str & HashMap In-Memory Storage',
        'titleEn': 'Core Collections: Vec<T>, String vs &str & In-Memory HashMaps',
        'programId': 'Mesin Penyimpanan Data Key-Value In-Memory Berbasis HashMap',
        'programEn': 'In-Memory Key-Value Storage Engine with HashMap & Vector Buffers',
        'levelNameId': 'Ownership, Borrowing & Sistem Tipe Aman',
        'levelNameEn': 'Ownership, Borrowing & Safe Types',
        'language': 'rust',
        'code': """use std::collections::HashMap;

// Struktur Penyimpanan Inti Key-Value Engine
struct InMemStore {
    // Kunci bertipe String, Nilai berupa kumpulan byte mentah (Vec<u8>)
    tabel: HashMap<String, Vec<u8>>,
    total_operasi: u64,
}

impl InMemStore {
    // Konstruktor Baru
    fn new() -> Self {
        InMemStore {
            tabel: HashMap::new(),
            total_operasi: 0,
        }
    }

    // Operasi SET: Mengambil kepemilikan kunci dan nilai untuk disimpan ke HashMap
    fn set(&mut self, kunci: String, nilai: Vec<u8>) {
        self.tabel.insert(kunci, nilai);
        self.total_operasi += 1;
    }

    // Operasi GET: Mengembalikan referensi peminjaman (&[u8]) tanpa alokasi memori baru!
    fn get(&self, kunci: &str) -> Option<&[u8]> {
        // as_deref() atau meminjam nilai dari Option<&Vec<u8>> menjadi Option<&[u8]>
        self.tabel.get(kunci).map(|vec| vec.as_slice())
    }

    // Operasi DEL: Menghapus data dan mengembalikan nilai yang dihapus jika ada
    fn del(&mut self, kunci: &str) -> bool {
        self.total_operasi += 1;
        self.tabel.remove(kunci).is_some()
    }
}

fn main() {
    println!("=== In-Memory Key-Value Engine (Rust Collections) ===");

    let mut db = InMemStore::new();

    // 1. Simpan data biner (misal: JSON string yang dikonversi ke bytes)
    db.set(String::from("config:cluster_name"), b"nusa-asia-southeast1".to_vec());
    db.set(String::from("metrics:cpu_usage"), vec![42, 85, 91]);

    // 2. Ambil data dengan referensi slice (&[u8])
    if let Some(bytes) = db.get("config:cluster_name") {
        let teks = String::from_utf8_lossy(bytes);
        println!("[HIT] config:cluster_name = '{}'", teks);
    } else {
        println!("[MISS] Kunci tidak ditemukan.");
    }

    // 3. Hapus data
    let terhapus = db.del("metrics:cpu_usage");
    println!("Apakah metrics:cpu_usage terhapus? {}", terhapus);
    println!("Total Operasi Mutasi DB: {}", db.total_operasi);
}
""",
        'objectivesId': [
            'Menguasai 3 koleksi data fundamental Rust: Vec<T> (array dinamis), String (teks dinamis), dan HashMap<K, V>',
            'Memahami perbedaan memori antara String (pemilik buffer di heap) vs &str (pinjaman window slice)',
            'Menggunakan metode idiomatik HashMap: insert(), get(), remove(), dan entry() API',
            'Mengonversi kumpulan byte Vec<u8> menjadi representasi string yang aman via String::from_utf8_lossy',
            'Membangun abstraksi mesin database penyimpanan in-memory dengan metode impl struct yang modular',
        ],
        'objectivesEn': [
            'Master the foundational triad of Rust collections: Vec<T>, String, and HashMap<K, V>',
            'Internalize memory distinctions between String (heap-allocated buffer owner) and &str (borrowed slice view)',
            'Deploy idiomatic HashMap patterns: insert(), get(), remove(), and the atomic entry() API',
            'Convert raw byte streams Vec<u8> into UTF-8 strings safely via String::from_utf8_lossy',
            'Construct modular in-memory database storage engines using impl struct methods',
        ],
        'explanationId': """### Tiga Koleksi Utama Standar Library Rust
1. **`Vec<T>`**: Array dinamis yang disimpan berurutan di heap. Elemen baru ditambahkan dengan `.push(item)`. Mendukung pengindeksan cepat dan alokasi memori beruntun (*cache locality* terbaik).
2. **`String`**: Pada dasarnya adalah pembungkus tipis di atas `Vec<u8>` yang dijamin **100% selalu berformat UTF-8 valid**. Anda tidak bisa sembarangan mengindeks string dengan angka `s[0]` karena karakter bahasa dunia memiliki ukuran byte yang berbeda (1 sampai 4 byte).
3. **`HashMap<K, V>`**: Tabel hash pencarian cepat berkecepatan *O(1)*. Secara bawaan menggunakan algoritma hashing *SipHash 1-3* yang kebal terhadap serangan keamanan siber *HashDoS (Denial of Service)*.

### Pola Emas: `entry()` API pada HashMap
Untuk menghindari dua kali lookup (cek ada tidaknya kunci lalu baru insert), Rust memiliki `entry()` API:
```rust
db.tabel.entry(kunci).or_insert_with(|| vec![0]);
```
Baris ini memeriksa apakah kunci ada; jika tidak ada, ia menginisialisasi nilai baru dalam satu operasi komputasi tunggal yang sangat efisien!""",
        'explanationEn': """### The Triad of Standard Collections in Rust
1. **`Vec<T>`**: Contiguous expandable heap array. Appending via `.push(item)` enjoys excellent CPU cache locality.
2. **`String`**: Architecturally a zero-cost wrapper over `Vec<u8>` guaranteed to maintain **100% valid UTF-8 invariants**. Arbitrary numeric indexing `s[0]` is forbidden because variable-length UTF-8 glyphs span 1 to 4 bytes.
3. **`HashMap<K, V>`**: O(1) key-value hash table. Defaults to cryptographic *SipHash 1-3* algorithms, providing native immunity against HashDoS collision attacks.

### The Idiomatic `entry()` API
Avoid duplicate lookups (checking key existence followed by inserts). Deploy the atomic `entry()` API:
```rust
db.table.entry(key).or_insert_with(|| vec![0]);
```
This inspects and conditionally initializes entries in a single optimized pass!""",
        'beginnerId': """### Analogi: Rak Buku Dokumen & Kamus Istilah Tebal
1. **`Vec<T>`** seperti rak buku horizontal: Anda meletakkan buku-buku berjejer dari kiri ke kanan. Anda bisa menambah buku baru di ujung kanan (*push*).
2. **`HashMap<K, V>`** seperti kamus istilah tebal: jika Anda ingin mencari arti kata 'Kriptografi' (*key*), Anda langsung membuka huruf K dan membaca definisinya (*value*) tanpa harus membaca seluruh kamus dari halaman pertama.""",
        'beginnerEn': """### Analogy: Bookcase Shelves & Hardcover Dictionaries
1. **`Vec<T>`** is an expanding horizontal shelf: books stack from left to right; appending puts fresh volumes onto the right end (*push*).
2. **`HashMap<K, V>`** is an unabridged encyclopedic dictionary: looking up the term 'Cryptography' (*key*) navigates directly to letter C to read the definition (*value*) without paging through the entire book.""",
        'experimentsId': [
            'Gunakan entry API: db.tabel.entry(kunci).or_insert(nilai_default) untuk memasukkan data hanya jika kunci belum ada.',
            'Coba simpan nilai string sembarangan yang bukan UTF-8 valid dan amati bagaimana String::from_utf8 memvalidasi byte.',
            'Ukur penggunaan memori tabel dengan memeriksa db.tabel.capacity().',
            'Iterasi seluruh data database menggunakan for (k, v) in &db.tabel dan cetak pasangan key-value.',
        ],
        'experimentsEn': [
            'Deploy the entry API: db.table.entry(key).or_insert(default_val) inserting records conditionally.',
            'Inject invalid UTF-8 byte sequences observing String::from_utf8 return an explicit Err variant.',
            'Audit memory bucket allocations by inspecting db.table.capacity().',
            'Iterate through the database via for (k, v) in &db.table printing all key-value entries.',
        ],
        'challengeId': 'Tambahkan operasi `mget(&self, keys: &[&str]) -> Vec<Option<&[u8]>>` pada `InMemStore` yang dapat mengambil banyak nilai kunci sekaligus dalam satu panggilan efisien.',
        'challengeEn': 'Add an `mget(&self, keys: &[&str]) -> Vec<Option<&[u8]>>` method to `InMemStore` retrieving multiple values concurrently in a single call.',
        'summaryId': 'Kamu telah menguasai Vec, String vs &str, dan HashMap in-memory storage. Minggu depan kita memasuki Level 2: Traits, Generics, dan Error Handling.',
        'summaryEn': 'You have mastered Vec, String vs &str, and HashMap storage. Next week, we enter Level 2: Traits, Generics, and Error Handling.',
    },

    # Level 2: Traits, Smart Pointers & Konkurensi Tanpa Takut (Weeks 5-8)
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'traits-dan-generics',
        'titleId': 'Traits & Generics: Polimorfisme Nol Biaya (Zero-Cost Abstractions) & Trait Bounds',
        'titleEn': 'Traits & Generics: Zero-Cost Abstractions & Trait Bounds',
        'programId': 'Abstraksi Antarmuka Mesin Penyimpanan (Storage Engine Trait)',
        'programEn': 'Pluggable Storage Engine Trait with Static & Dynamic Dispatch',
        'levelNameId': 'Traits, Smart Pointers & Konkurensi Tanpa Takut',
        'levelNameEn': 'Traits, Smart Pointers & Fearless Concurrency',
        'language': 'rust',
        'code': """// 1. Definisi Trait: Kontrak Kemampuan yang Dapat Diimplementasikan oleh Tipe Apapun
pub trait MesinPenyimpan {
    fn tulis(&mut self, kunci: &str, nilai: &[u8]) -> Result<(), String>;
    fn baca(&self, kunci: &str) -> Option<Vec<u8>>;
    fn nama_engine(&self) -> &'static str;
}

// 2. Implementasi Trait pada Struct Memori
pub struct RamEngine {
    data: std::collections::HashMap<String, Vec<u8>>,
}

impl RamEngine {
    pub fn new() -> Self {
        RamEngine { data: std::collections::HashMap::new() }
    }
}

impl MesinPenyimpan for RamEngine {
    fn tulis(&mut self, kunci: &str, nilai: &[u8]) -> Result<(), String> {
        self.data.insert(kunci.to_string(), nilai.to_vec());
        Ok(())
    }

    fn baca(&self, kunci: &str) -> Option<Vec<u8>> {
        self.data.get(kunci).cloned()
    }

    fn nama_engine(&self) -> &'static str {
        "High-Speed In-Memory RAM Engine"
    }
}

// 3. Static Dispatch (Generics + Trait Bounds: T: MesinPenyimpan)
// Zero-Cost Abstraction: Compiler menghasilkan kode mesin khusus per tipe tanpa overhead runtime!
fn simpan_konfigurasi_server<T: MesinPenyimpan>(engine: &mut T, cluster_id: &str) {
    println!("Menggunakan Engine: {}", engine.nama_engine());
    let _ = engine.tulis("cluster_id", cluster_id.as_bytes());
}

fn main() {
    println!("=== Rust Trait Architecture: Zero-Cost Abstractions ===");

    let mut ram = RamEngine::new();
    simpan_konfigurasi_server(&mut ram, "nusa-cluster-alpha-01");

    if let Some(val) = ram.baca("cluster_id") {
        println!("Verifikasi Baca: {}", String::from_utf8_lossy(&val));
    }
}
""",
        'objectivesId': [
            'Memahami konsep Trait di Rust sebagai pendefinisian perilaku bersama yang mirip interface',
            'Menguasai konsep Zero-Cost Abstractions: abstraksi tingkat tinggi tanpa penalti performa saat dieksekusi',
            'Memahami Monomorphization pada Static Dispatch (<T: Trait>): compiler menggandakan kode biner tercepat untuk setiap tipe konkret',
            'Memahami Dynamic Dispatch menggunakan Trait Objects (Box<dyn Trait>) saat tipe baru diketahui pada runtime',
            'Menggunakan Derive Macros bawaan (#[derive(Clone, Debug, PartialEq)]) untuk implementasi trait otomatis',
        ],
        'objectivesEn': [
            'Master Traits in Rust as contracts defining shared capabilities across heterogeneous types',
            'Internalize Zero-Cost Abstractions: high-level ergonomic constructs incurring zero runtime performance penalty',
            'Understand Monomorphization in Static Dispatch (<T: Trait>): compiler code duplication yielding native machine speed',
            'Understand Dynamic Dispatch utilizing Trait Objects (Box<dyn Trait>) for heterogenous runtime polymorphism',
            'Deploy native Derive Macros (#[derive(Clone, Debug, PartialEq)]) generating boilerplate trait implementations',
        ],
        'explanationId': """### Apa itu Trait di Rust?
Trait memberi tahu compiler Rust tentang fungsionalitas apa yang dimiliki oleh suatu tipe data.
Jika Anda pernah menggunakan interface di bahasa lain, Trait mirip dengan interface, namun **jauh lebih kuat**:
1. Trait dapat memiliki implementasi method bawaan (*Default Methods*).
2. Trait dapat diimplementasikan pada tipe data yang sudah ada (bahkan tipe data bawaan Rust seperti `i32`!).

### Keajaiban Zero-Cost Abstractions & Monomorphization
Di bahasa seperti Java, pemanggilan method interface selalu melalui *Virtual Method Table (vtable)* yang memiliki penalti kinerja *pointer chasing*.
Di Rust:
Ketika Anda menulis fungsi generic `fn simpan<T: MesinPenyimpan>(engine: &mut T)`:
Pada waktu kompilasi, compiler melakukan **Monomorphization**. Compiler menyalin fungsi tersebut dan membuat versi kode mesin khusus untuk `RamEngine`!
Ketika kode berjalan di CPU, **tidak ada overhead interface sama sekali**, eksekusi langsung melompat ke alamat fungsi asli secepat pemanggilan fungsi manual biasa!

### Static Dispatch vs Dynamic Dispatch (`dyn Trait`)
- **Static Dispatch (`<T: Trait>`)**: Default di Rust. Sangat cepat, ukuran binary sedikit lebih besar karena duplikasi kode mesin khusus.
- **Dynamic Dispatch (`&dyn Trait` atau `Box<dyn Trait>`)**: Digunakan jika Anda ingin menyimpan kumpulan engine yang berbeda dalam satu array: `Vec<Box<dyn MesinPenyimpan>>`.""",
        'explanationEn': """### Demystifying Rust Traits
A Trait instructs the compiler regarding capabilities an entity exposes.
While conceptually analogous to interfaces in other languages, Traits are **substantially more expressive**:
1. Traits support Default Method Implementations.
2. Traits can be grafted onto existing types (even built-in primitives like `i32` or third-party structs!).

### The Magic of Zero-Cost Abstractions: Monomorphization
In Java, interface dispatches incur runtime indirection penalties via *Virtual Method Tables (vtables)*.
In Rust:
When declaring generic bounds `fn save<T: StorageEngine>(engine: &mut T)`:
During compilation, rustc executes **Monomorphization**. It stamps out dedicated machine code for `RamEngine` directly!
At runtime, **zero dynamic dispatch overhead exists**; executions call native assembly addresses as fast as raw function calls!

### Static vs Dynamic Dispatch (`dyn Trait`)
- **Static Dispatch (`<T: Trait>`)**: Rust default. Fastest execution, slightly larger binary footprints due to specialized monomorphized code.
- **Dynamic Dispatch (`Box<dyn Trait>`)**: Deployed when storing heterogenous implementations inside dynamic collections: `Vec<Box<dyn StorageEngine>>`.""",
        'beginnerId': """### Analogi: Kartu SIM Card Telepon & Mesin Cetak Khusus
1. **Trait** seperti ukuran standar micro-SIM card: kartu SIM apa pun yang memiliki ukuran micro-SIM bisa dipasang ke smartphone apa saja (*implementasi trait*).
2. **Monomorphization (Static Dispatch)** seperti pabrik mobil pintar: jika Anda memesan mobil bermesin diesel, pabrik mencetak bodi khusus diesel; jika memesan bensin, pabrik mencetak bodi khusus bensin. Hasilnya adalah mobil yang dirancang sempurna tanpa baut adaptor tambahan yang longgar.""",
        'beginnerEn': """### Analogy: Universal SIM Cards & Automated Tooling
1. **Traits** are Nano-SIM card dimensional standards: any cellular carrier manufacturing cards adhering to Nano-SIM geometry slots into any compliant smartphone (*trait implementation*).
2. **Monomorphization (Static Dispatch)** is an automated bespoke robotics line: if ordering an aluminum chassis, robots weld dedicated aluminum brackets; if titanium, dedicated titanium welds. Output cars perform flawlessly without rattle-prone adapter bolts.""",
        'experimentsId': [
            'Buat struct DiskEngine dan implementasikan MesinPenyimpan; buktikan simpan_konfigurasi_server dapat menerima DiskEngine tanpa perubahan.',
            'Gunakan trait bawaan std::fmt::Display untuk memformat struct InMemStore agar bisa di-print dengan println!("{}", store).',
            'Buat vektor berisi Trait Objects: let engines: Vec<Box<dyn MesinPenyimpan>> = vec![...].',
            'Tambahkan default method fn ping(&self) -> bool { true } pada trait MesinPenyimpan.',
        ],
        'experimentsEn': [
            'Create a DiskEngine struct implementing MesinPenyimpan, passing it to simpan_konfigurasi_server seamlessly.',
            'Implement std::fmt::Display for InMemStore enabling pretty printing via println!("{}", store).',
            'Construct a heterogeneous collection of Trait Objects: let engines: Vec<Box<dyn MesinPenyimpan>> = vec![...].',
            'Inject a default trait method fn ping(&self) -> bool { true } onto the MesinPenyimpan trait.',
        ],
        'challengeId': 'Implementasikan trait bawaan `std::ops::Drop` pada `RamEngine` yang mencetak pesan otomatis "[Engine Shutdown] Membersihkan memori RAM..." saat objek ram keluar dari scope main.',
        'challengeEn': 'Implement `std::ops::Drop` for `RamEngine` printing "[Engine Shutdown] Clearing RAM memory..." when the instance leaves scope.',
        'summaryId': 'Kamu telah menguasai Traits, Static Dispatch monomorphization, dan Dynamic Dispatch dyn Trait. Minggu depan kita mempelajari Error Handling modern dan operator ?.',
        'summaryEn': 'You have mastered Traits, Monomorphization, and dynamic Trait Objects. Next week, we examine modern Error Handling with the ? operator.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'error-handling-dan-thiserror',
        'titleId': 'Error Handling Produksi: Operator ?, Result<T, E> & Custom Errors dengan thiserror',
        'titleEn': 'Production Error Handling: The ? Operator, Result<T, E> & thiserror',
        'programId': 'Sistem Validasi dan Persistensi Berkas Write-Ahead Log (WAL)',
        'programEn': 'WAL Persistence Engine with Custom Typed Errors & ? Operator',
        'levelNameId': 'Traits, Smart Pointers & Konkurensi Tanpa Takut',
        'levelNameEn': 'Traits, Smart Pointers & Fearless Concurrency',
        'language': 'rust',
        'code': """use std::fmt;

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
""",
        'objectivesId': [
            'Memahami filosofi Error Handling di Rust: Eror yang dapat dipulihkan (Result<T, E>) vs Panic tak terpulihkan (panic!)',
            'Menguasai kekuatan Operator Tanya (?) untuk propagasi eror otomatis tanpa boilerplate if err != nil',
            'Merancang Enum Custom Error yang mengimplementasikan trait std::error::Error',
            'Memahami konversi tipe eror implisit menggunakan trait From (From<A> for B)',
            'Membedakan penggunaan pustaka thiserror (untuk library/domain types) vs anyhow (untuk binary application)',
        ],
        'objectivesEn': [
            'Master Rust error classification: Recoverable Errors (Result<T, E>) versus Unrecoverable Panics (panic!)',
            'Master the ergonomic question mark operator (?) for clean automated error propagation',
            'Design custom domain Error Enums satisfying the standard std::error::Error trait contract',
            'Understand implicit error conversions governed by the native From trait (From<A> for B)',
            'Distinguish when to deploy `thiserror` (structured library errors) versus `anyhow` (application CLI binaries)',
        ],
        'explanationId': """### Mengapa Operator Tanya (`?`) Sangat Dicintai?
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
2. **`anyhow`**: Digunakan di tingkat **aplikasi akhir / main binary** di mana Anda hanya ingin mencetak pesan eror lengkap dengan jejak tumpukan (*stack trace*) tanpa peduli mencocokkan jenis enum spesifik.""",
        'explanationEn': """### Why Developers Revere the Question Mark Operator (`?`)
In Go, handling errors demands repeating 3 boilerplate lines at every step:
`if err != nil { return nil, err }`.
In **Rust**, you simply append the **`?`** symbol to any `Result` expression:
`let mut file = File::open("db.wal")?;`

**The semantics of `?`**:
- If the result resolves to `Ok(val)`: The operator unwraps the inner value, binding it cleanly to `file`.
- If the result resolves to `Err(e)`: The calling function **short-circuits immediately, returning `Err(From::from(e))` up the call stack**!
Your code reads as a clean, linear, un-nested happy path!

### `thiserror` vs `anyhow` Architecture
1. **`thiserror`**: Tailored for **libraries and core systems domain types** (like our database storage engine). Author strongly-typed enum variants enabling callers to match on discrete failure cases.
2. **`anyhow`**: Tailored for **application binaries / CLI entrypoints** where capturing dynamic error strings alongside rich contextual stack traces takes precedence over matching discrete enum types.""",
        'beginnerId': """### Analogi: Jalur Perakitan Pabrik Mobil & Tombol Darurat
1. **Operator `?`** seperti kabel darurat di pabrik mobil modern: jika satu baut ban mobil gagal terpasang (*Err*), perakitan mobil tersebut langsung dihentikan detik itu juga dan mobil cacat diarahkan ke jalur perbaikan (*return Err*), tanpa pekerja membuang waktu memasang pintu pada mobil yang bannya sudah cacat.
2. **Result<T, E>** seperti kotak surat ekspres: jika paket sampai dengan selamat, ada stempel hijau 'Diterima' (*Ok*); jika kurir tersesat, ada stempel merah berisi alasan keterlambatan (*Err*).""",
        'beginnerEn': """### Analogy: Factory Assembly Line Emergency Pull-Cords
1. **The `?` Operator** is an automated assembly line emergency pull-cord: if a robotic arm detects a stripped wheel bolt (*Err*), the station halts downstream operations instantly, routing the defective chassis off the line (*early return Err*). Workers never waste labor installing windshields onto a cracked chassis.
2. **Result<T, E>** is a tamper-evident courier box: if delivered safely, a green stamp confirms transit (*Ok*); if damaged, a red customs claim slip explains failure causes (*Err*).""",
        'experimentsId': [
            'Panggil tulis_ke_wal_pipeline dengan payload kosong b"" dan amati pesan eror PayloadKosong tercetak di terminal.',
            'Tambahkan varian eror baru WalError::IzinDitolak dan pemicunya di dalam fungsi validasi.',
            'Gunakan unwrap() atau expect("Pesan khusus") untuk melihat bagaimana Rust melempar panic jika Result bernilai Err.',
            'Rangkai 3 fungsi yang menggunakan operator ? secara berurutan untuk melihat keindahan alur linier.',
        ],
        'experimentsEn': [
            'Invoke tulis_ke_wal_pipeline passing an empty byte buffer b"" verifying the PayloadKosong error branch.',
            'Add a new WalError::PermissionDenied variant and trigger it within the validation pipeline.',
            'Deploy unwrap() or expect("Custom message") to observe how Rust panics when encountering unhandled Err states.',
            'Chain 3 consecutive functions deploying ? operators to appreciate linear pipeline readability.',
        ],
        'challengeId': 'Implementasikan trait `From<std::io::Error> for WalError` yang secara otomatis mengonversi eror I/O bawaan Rust menjadi varian `WalError::IoGagal`.',
        'challengeEn': 'Implement `From<std::io::Error> for WalError` enabling automated conversion of standard std::io::Error instances into `WalError::IoGagal`.',
        'summaryId': 'Kamu telah menguasai Result<T, E>, operator tanya ?, dan perancangan custom error. Minggu depan kita mempelajari Smart Pointers: Box, Rc, Arc, dan Mutex.',
        'summaryEn': 'You have mastered Result<T, E>, the ? operator, and custom error design. Next week, we examine Smart Pointers: Box, Rc, Arc, and Mutex.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'smart-pointers-box-rc-arc',
        'titleId': 'Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>',
        'titleEn': 'Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>',
        'programId': 'Indeks Memori Bersama Terproteksi Multi-Thread (Thread-Safe Shared Index)',
        'programEn': 'Thread-Safe Shared Key-Value Index with Arc<RwLock<T>> Architecture',
        'levelNameId': 'Traits, Smart Pointers & Konkurensi Tanpa Takut',
        'levelNameEn': 'Traits, Smart Pointers & Fearless Concurrency',
        'language': 'rust',
        'code': """use std::collections::HashMap;
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
    println!("\\nStatus Akhir Database: {:?}", *reader_akhir);
}
""",
        'objectivesId': [
            'Memahami mengapa pointer biasa tidak cukup dan bagaimana Smart Pointers mengelola metadata kepemilikan',
            'Menggunakan Box<T> untuk alokasi memori heap eksplisit dan struktur data rekursif',
            'Memahami Arc<T> (Atomic Reference Counting) untuk berbagi kepemilikan data antar banyak thread',
            'Menguasai konsep Interior Mutability: memutasi data di dalam struktur yang dibungkus referensi immutable',
            'Mengkombinasikan Arc<RwLock<T>> atau Arc<Mutex<T>> untuk arsitektur database multi-thread yang 100% aman',
        ],
        'objectivesEn': [
            'Understand why raw references fall short and how Smart Pointers govern complex ownership lifecycles',
            'Deploy Box<T> for explicit heap allocations and recursive data structures',
            'Master Arc<T> (Atomic Reference Counting) enabling shared immutable ownership across threads',
            'Master Interior Mutability: safely mutating data wrapped inside shared references',
            'Combine Arc<RwLock<T>> or Arc<Mutex<T>> patterns for bulletproof thread-safe database architectures',
        ],
        'explanationId': """### Mengapa Membutuhkan Smart Pointers?
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
- Thread yang ingin mengubah data memanggil `.write()` yang secara aman mengunci akses hingga penulisan selesai.""",
        'explanationEn': """### Why Multi-Threaded Architectures Require Smart Pointers
Rust's primary law states: *"Exactly ONE owner exists at a time"*.
Yet in production server runtimes:
A master Database Index or Cache must be read by **dozens of concurrent worker threads**. Who holds ownership?
**Smart Pointers solve this architectural dilemma**:

### The Essential Smart Pointer Triad:
1. **`Box<T>`**: Allocates memory onto the Heap with singular exclusive ownership. Crucial for recursive data structures (e.g. B-Trees).
2. **`Rc<T>` (Reference Counted)**: Enables **shared ownership** within a *single thread*. Automatically drops heap memory when the reference counter decrements to 0.
3. **`Arc<T>` (Atomic Reference Counted)**: The thread-safe evolution of `Rc`. Employs hardware-level atomic CPU instructions to synchronize counters safely across multiple threads.

### Interior Mutability: The `Arc<RwLock<T>>` Pattern
`Arc<T>` distributes read-only shared access. How do threads mutate shared state?
We envelop the inner collection in **`RwLock<T>`** or **`Mutex<T>`**!
The **`Arc<RwLock<HashMap<K, V>>>`** architecture is the **industry standard in Rust backend systems**:
- Countless threads invoke `.read()` concurrently without contention (*high read throughput*).
- Writers invoke `.write()` acquiring exclusive locks, mutating state safely before releasing locks upon drop.""",
        'beginnerId': """### Analogi: Buku Tamu Hotel dengan Penjilid Magnetik
1. **`Arc<T>`** seperti kartu izin fotokopi dokumen rahasia hotel: setiap manajer divisi memegang kartu duplikat yang sama. Selama masih ada 1 manajer yang memegang kartu (*penghitung referensi > 0*), dokumen asli tidak boleh dihancurkan dari brankas.
2. **`RwLock`** seperti papan tulis pengumuman di dinding lobi: 100 tamu boleh berdiri membaca papan bersamaan (*read lock*). Jika resepsionis ingin menghapus tulisan di papan tulis (*write lock*), ia berdiri menutupi papan sebentar sampai tulisan selesai diperbarui.""",
        'beginnerEn': """### Analogy: Shared Hotel Guest Registers & Dry-Erase Boards
1. **`Arc<T>`** is a master corporate vault deed with authorized keycards: every department head carries a verified keycard. As long as at least one manager holds a card (*reference counter > 0*), the corporate vault cannot be decommissioned.
2. **`RwLock`** is a central announcement dry-erase whiteboard: 100 hotel guests read posted notifications simultaneously (*read lock*). When staff erase and write fresh flight announcements (*write lock*), patrons pause reading until the marker caps close.""",
        'experimentsId': [
            'Coba ganti Arc dengan Rc biasa pada kode multi-thread di atas dan amati pesan eror compiler: "`Rc` cannot be sent between threads safely (missing Send trait)".',
            'Uji terjadinya Deadlock dengan sengaja memanggil index.write() dua kali di thread yang sama tanpa melepas lock pertama.',
            'Cetak jumlah referensi aktif menggunakan Arc::strong_count(&index).',
            'Bandingkan performa throughput antara Mutex murni vs RwLock pada rasio 90% baca dan 10% tulis.',
        ],
        'experimentsEn': [
            'Replace Arc with plain Rc in the multi-threaded sample observing compiler rejection: "`Rc` cannot be sent between threads safely (lacks Send)".',
            'Induce a deadlock by calling index.write() twice consecutively within identical threads without releasing locks.',
            'Inspect active ownership reference counts deploying Arc::strong_count(&index).',
            'Benchmark read-heavy workloads comparing pure Mutex locking versus RwLock read concurrency.',
        ],
        'challengeId': 'Bangun struct `ConcurrentCache<K, V>` yang mengkapsulasi `Arc<RwLock<HashMap<K, V>>>` dan menyediakan method publik `get(&self, key: &K) -> Option<V>` dan `set(&self, key: K, val: V)`.',
        'challengeEn': 'Author a `ConcurrentCache<K, V>` struct encapsulating `Arc<RwLock<HashMap<K, V>>>` exposing clean `get(&self, key: &K)` and `set(&self, key: K, val: V)` APIs.',
        'summaryId': 'Kamu telah menguasai Box, Arc, RwLock, dan interior mutability thread-safe. Minggu depan kita mempelajari Fearless Concurrency dengan Threads dan Channels.',
        'summaryEn': 'You have mastered Box, Arc, RwLock, and interior mutability. Next week, we examine Fearless Concurrency with OS Threads and Channels.',
    },
    {
        'week': 8,
        'level': 'intermediate',
        'topicId': 'concurrency-threads-dan-channels',
        'titleId': 'Fearless Concurrency: std::thread, Send & Sync Traits serta mpsc Message Channels',
        'titleEn': 'Fearless Concurrency: std::thread, Send/Sync & mpsc Channels',
        'programId': 'Pengelompok Flusher Latar Belakang WAL (Background WAL Flusher)',
        'programEn': 'Background WAL Disk Flusher with Cross-Thread mpsc Message Pipelines',
        'levelNameId': 'Traits, Smart Pointers & Konkurensi Tanpa Takut',
        'levelNameEn': 'Traits, Smart Pointers & Fearless Concurrency',
        'language': 'rust',
        'code': """use std::sync::mpsc;
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
    println!("\\nPipeline konkurensi selesai dengan keamanan memori 100%!");
}
""",
        'objectivesId': [
            'Memahami konsep "Fearless Concurrency" di Rust: kompilator menjamin ketiadaan race condition sebelum program berjalan',
            'Meluncurkan OS threads berkecepatan tinggi menggunakan std::thread::spawn dengan penutupan move',
            'Memahami Trait penanda Send (tipe aman dipindahkan antar-thread) dan Sync (tipe aman diakses bersama via referensi)',
            'Membangun pipa komunikasi antar-thread menggunakan mpsc (Multi-Producer, Single-Consumer)',
            'Merancang arsitektur Dedicated Background Worker untuk operasi I/O disk non-blocking',
        ],
        'objectivesEn': [
            'Internalize Rust\'s "Fearless Concurrency" guarantee: compile-time proof of data-race freedom',
            'Spawn native operating system threads via std::thread::spawn utilizing move closures',
            'Master marker traits Send (ownership safe to transfer across threads) and Sync (safe to share references across threads)',
            'Construct inter-thread communication pipelines deploying mpsc channels (Multi-Producer, Single-Consumer)',
            'Architect a Dedicated Background Worker pattern isolating non-blocking disk I/O operations',
        ],
        'explanationId': """### Apa itu "Fearless Concurrency"?
Di bahasa lain, menulis kode multi-thread adalah hal yang menakutkan karena rawan *Data Races*, *Heisenbugs* (bug misterius yang hilang saat di-debug), dan kerusakan memori acak.
Di **Rust**, Anda bisa memprogram multi-thread tanpa rasa takut (**Fearless Concurrency**).
Jika kode Anda memiliki potensi data race, **kodenya tidak akan pernah bisa dikompilasi!** Compiler menolaknya dengan tegas di awal.

### Dua Trait Gaib Penjaga Pintu: `Send` dan `Sync`
Rust tidak memiliki aturan konkurensi bawaan yang rumit di runtime. Seluruh sistem keamanannya dikendalikan oleh dua **Marker Traits**:
1. **`Send`**: Menandai bahwa kepemilikan tipe data ini aman **dipindahkan (*moved*) ke thread lain**. Hampir semua tipe di Rust adalah `Send`, kecuali tipe yang memiliki pointer mentah thread-lokal (seperti `Rc<T>`).
2. **`Sync`**: Menandai bahwa tipe data ini aman **diakses secara bersamaan oleh banyak thread melalui referensi `&T`**. Suatu tipe `T` adalah `Sync` jika dan hanya jika `&T` adalah `Send`.

### Pola mpsc (Multi-Producer, Single-Consumer)
Kanal pesan `mpsc::channel()` memungkinkan banyak thread produser mengirimkan tugas ke satu saluran antrean yang diproses secara berurutan oleh satu thread pekerja (*worker thread*). Ini adalah fondasi mesin Write-Ahead Log (WAL) di database modern!""",
        'explanationEn': """### The Concept of "Fearless Concurrency"
In legacy languages, multi-threaded programming triggers dread over undetected Data Races, intermittent Heisenbugs, and silent memory corruption.
In **Rust**, concurrency is termed **Fearless Concurrency**.
If concurrent routines introduce data races, **the program will never compile!** The compiler proves concurrency invariants mathematically during compilation.

### The Guardian Marker Traits: `Send` and `Sync`
Rust enforces thread safety through two core **Marker Traits**:
1. **`Send`**: Declares that ownership of this type can safely **transfer across thread boundaries**. Nearly all standard types satisfy `Send`, excluding thread-local raw pointers (e.g. `Rc<T>`).
2. **`Sync`**: Declares that references `&T` can safely **share across multiple concurrent threads**. A type `T` is `Sync` if and only if `&T` satisfies `Send`.

### The mpsc Pipeline (Multi-Producer, Single-Consumer)
The `mpsc::channel()` pattern enables multiple concurrent worker threads to dispatch tasks into a unified pipeline consumed sequentially by a dedicated background worker. This constitutes the architecture of high-performance database WAL logging engines!""",
        'beginnerId': """### Analogi: Jalur Pipa Saluran Tabung Kasir Swalayan
Bayangkan kasir swalayan besar:
1. **Multi-Producer (tx.clone())** adalah 10 kasir di lantai toko: setiap kasir memasukkan nota belanjaan (*WalCommand*) ke dalam tabung kapsul pipa masing-masing.
2. **Single-Consumer (rx.recv())** adalah brankas pusat di lantai bawah: ada 1 petugas akuntan yang duduk menerima kapsul pipa satu per satu (*flusher thread*), mencatatnya ke buku besar, dan mengunci brankas (*SyncDisk*). Tidak ada kasir yang berebut kunci brankas.""",
        'beginnerEn': """### Analogy: Supermarket Pneumatic Cash Chutes
Consider a massive multi-level supermarket:
1. **Multi-Producer (tx.clone())** are 10 checkout registers across the sales floor: each cashier inserts completed receipt envelopes (*WalCommand*) into dedicated pneumatic chutes.
2. **Single-Consumer (rx.recv())** is the secure accounting vault in the basement: a single dedicated clerk reads arriving canisters sequentially (*flusher thread*), ledgering transactions into the master register (*SyncDisk*). Cashiers never brawl over the vault keys.""",
        'experimentsId': [
            'Hapus instruksi move pada thread::spawn dan amati compiler menolak karena variabel lingkungan berisiko outlive closure.',
            'Uji pengiriman 100 pesan konkuren dari 10 thread produser berbeda secara bersamaan.',
            'Gunakan mpsc::sync_channel(bound) untuk membuat bounded channel yang memberikan tekanan balik (backpressure) jika antrean penuh.',
            'Amati bahwa pesan WAL diproses secara tertib dan aman tanpa satupun Mutex manual yang diekspos ke produser.',
        ],
        'experimentsEn': [
            'Omit the move keyword on thread::spawn observing the compiler reject the closure for potentially outliving stack frames.',
            'Spawn 10 producer threads dispatching 100 concurrent messages into the shared channel.',
            'Deploy mpsc::sync_channel(bound) experimenting with bounded channels providing backpressure.',
            'Observe that all WAL records serialize smoothly without exposing raw Mutex primitives to producers.',
        ],
        'challengeId': 'Kembangkan flusher thread agar secara otomatis memicu `SyncDisk` setiap kali buffer mencapai 10 item, tanpa menunggu instruksi eksplisit dari klien.',
        'challengeEn': 'Enhance the flusher thread to trigger automated `SyncDisk` flushes whenever internal buffers accumulate 10 records.',
        'summaryId': 'Kamu telah menguasai Fearless Concurrency, Send/Sync traits, dan mpsc message channels. Minggu depan kita memasuki Level 3: Pemrograman Asinkron dengan Tokio.',
        'summaryEn': 'You have mastered Fearless Concurrency, Send/Sync traits, and mpsc channels. Next week, we enter Level 3: Asynchronous Systems with Tokio.',
    },

    # Level 3: Async Tokio, Durabilitas WAL & Capstone Engine (Weeks 9-12)
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'async-tokio-dan-futures',
        'titleId': 'Asynchronous Rust: Runtime Tokio, async/await, Futures & Non-Blocking TCP',
        'titleEn': 'Asynchronous Rust: The Tokio Runtime, async/await & Non-Blocking TCP',
        'programId': 'Server Listener TCP Berkecepatan Tinggi untuk Protokol Key-Value',
        'programEn': 'High-Throughput Asynchronous TCP Key-Value Server with Tokio',
        'levelNameId': 'Async Tokio, Durabilitas WAL & Capstone Engine',
        'levelNameEn': 'Async Tokio, WAL Durability & KV Engine Capstone',
        'language': 'rust',
        'code': """// Catatan: Di proyek nyata, tambahkan tokio = { version = "1", features = ["full"] } di Cargo.toml

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
""",
        'objectivesId': [
            'Memahami filosofi asinkron Rust: Zero-Cost Futures yang bersifat pasif (tidak melakukan apapun sampai di-poll)',
            'Membedakan model thread-per-connection (boros OS thread) vs asynchronous task-based (jutaan task di sedikit thread)',
            'Menguasai peran runtime asinkron Tokio: multi-threaded work-stealing scheduler untuk I/O jaringan berkecepatan tinggi',
            'Memahami cara kerja kata kunci `.await` yang menghentikan eksekusi sementara (*yield*) tanpa memblokir OS thread',
            'Menangani pembatalan Future yang aman secara bawaan di Rust saat koneksi klien terputus mendadak',
        ],
        'objectivesEn': [
            'Master Rust\'s asynchronous philosophy: Zero-Cost Futures that remain completely passive until explicitly polled',
            'Contrast thread-per-connection models against asynchronous task topologies multiplexing millions of clients',
            'Deploy the Tokio runtime: a multi-threaded work-stealing scheduler powering low-latency network I/O',
            'Understand `.await` suspension mechanics yielding CPU execution cooperatively without halting native threads',
            'Appreciate Rust\'s cancellation safety: dropping a Future tears down associated async tasks immediately',
        ],
        'explanationId': """### Mengapa Async di Rust Berbeda dari JavaScript / Go?
1. **Di JavaScript/Node.js**: Promises bersifat *eager* (langsung dieksekusi begitu dibuat di background event loop).
2. **Di Go**: Konkurensi dikelola oleh runtime bahasa menggunakan goroutine blocking yang dialihkan secara otomatis oleh scheduler internal.
3. **Di Rust**: **Futures bersifat 100% LAZY (Pasif)!**
   Sebuah `async fn` tidak melakukan apa-apa sama sekali sampai Anda memanggil `.await` atau menyerahkannya ke executor runtime (seperti Tokio). Jika Anda tidak me-`.await` sebuah Future, tidak ada satupun baris kode yang dieksekusi!

### Peran Runtime Tokio
Rust sengaja **tidak memasukkan async runtime ke dalam bahasa inti** agar binary Rust tetap bisa berjalan di mikrokontroler kulkas tanpa sistem operasi.
Untuk aplikasi server jaringan, komunitas menggunakan **Tokio**:
- Multi-threaded Work-Stealing Task Scheduler.
- Non-blocking Network I/O (`tokio::net::TcpListener`).
- Timer dan saluran komunikasi asinkron berkecepatan monster yang melayani puluhan juta permintaan per detik.""",
        'explanationEn': """### Why Async Rust Differs from JavaScript and Go
1. **JavaScript**: Promises are *eager* (executing immediately upon instantiation inside the V8 engine loop).
2. **Go**: Concurrency is managed via the language runtime, transparently multiplexing blocking code across M:N scheduler threads.
3. **In Rust**: **Futures are 100% LAZY (Pull-Based)!**
   Invoking an `async fn` constructs a passive state machine. It executes zero instructions until polled by `.await` or spawned onto an executor (Tokio). If an async block is dropped before completion, execution ceases instantly!

### The Role of Tokio
Rust deliberately **omitted an async runtime from its standard library**, preserving bare-metal deployment on microcontrollers without operating systems.
For high-scale cloud servers, the industry standard is **Tokio**:
- Work-Stealing Multi-Threaded Task Schedulers.
- Asynchronous Non-Blocking Networking (`tokio::net::TcpListener`).
- High-throughput asynchronous timers sustaining millions of concurrent TCP streams.""",
        'beginnerId': """### Analogi: Kasir Restoran Cepat Saji dengan Nomor Antrean
1. **Model Thread Tradisional (Blocking)** seperti 1 kasir melayani 1 pelanggan: kasir diam membeku menunggu daging matang dipanggang di dapur selama 5 menit. Pelanggan lain di belakangnya antre panjang (*thread terblokir*).
2. **Async Tokio (`.await`)** seperti kasir cerdas: setelah Anda memesan burger, kasir memberikan struk nomor antrean (*Future*) lalu berkata "Silakan duduk (*await*)". Kasir langsung melayani pelanggan berikutnya dalam 1 detik. Begitu burger matang (*Poll::Ready*), nomor Anda dipanggil.""",
        'beginnerEn': """### Analogy: Drive-Thru Buzzers vs Frozen Cashiers
1. **Thread-per-Connection (Blocking)** is a cashier refusing to take the next customer order until kitchen chefs hand-toss, bake, and box a pizza: the line stalls for 20 minutes (*thread blocks on I/O*).
2. **Async Tokio (`.await`)** is an automated buzzer system: the clerk rings your order, hands you an electronic pager (*Future*), and serves the next 50 customers. When your meal clears the oven (*Poll::Ready*), the buzzer pulses, and you retrieve your tray without halting the counter line.""",
        'experimentsId': [
            'Pelajari struktur makro #[tokio::main] yang secara otomatis membuat multi-threaded runtime executor.',
            'Amati bahwa memanggil fungsi async tanpa .await memunculkan peringatan warning: unused implementor of `Future` that must be used.',
            'Uji tokio::spawn untuk meluncurkan 100.000 task asinkron konkuren dan ukur penggunaan memori RAM.',
            'Pelajari perbedaan tokio::select! dengan select di Go untuk multiplexing Future asinkron.',
        ],
        'experimentsEn': [
            'Explore the #[tokio::main] attribute macro bootstrapping a multi-threaded async runtime under the hood.',
            'Observe that invoking async functions without .await generates: warning: unused implementor of `Future`.',
            'Evaluate tokio::spawn launching 100,000 concurrent async tasks auditing low RAM consumption.',
            'Compare tokio::select! multiplexing with Go select semantics.',
        ],
        'challengeId': 'Rancang state machine sederhana yang mengimplementasikan `Future` untuk membaca stream 4 blok data biner bertahap hingga seluruh paket lengkap (Poll::Ready).',
        'challengeEn': 'Author a custom `Future` state machine incrementally accumulating 4 binary data packets until emitting Poll::Ready upon completion.',
        'summaryId': 'Kamu telah menguasai asinkron Rust, lazy Futures, polling context, dan runtime Tokio. Minggu depan kita mempelajari Durabilitas Berkas WAL dan fsync.',
        'summaryEn': 'You have mastered async Rust, lazy Futures, polling semantics, and Tokio. Next week, we examine Write-Ahead Log (WAL) file durability and fsync.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'file-io-dan-wal-durability',
        'titleId': 'Durabilitas Basis Data: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery Replay',
        'titleEn': 'Database Durability: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery',
        'programId': 'Mesin Pencatat WAL Berdurabilitas Tinggi dengan Sinkronisasi Fisik Disk',
        'programEn': 'High-Durability WAL File Engine with Disk Sync (fsync) & Log Replay',
        'levelNameId': 'Async Tokio, Durabilitas WAL & Capstone Engine',
        'levelNameEn': 'Async Tokio, WAL Durability & KV Engine Capstone',
        'language': 'rust',
        'code': """use std::fs::{File, OpenOptions};
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
    println!("\\nTotal State Pulih Setelah Crash: {} record terselamatkan!", restored.len());
}
""",
        'objectivesId': [
            'Memahami prinsip Durabilitas (D dalam ACID) pada sistem database modern melalui Write-Ahead Logging (WAL)',
            'Memahami bahaya Write Buffering sistem operasi dan peran krusial pemanggilan fsync (sync_data / sync_all)',
            'Merancang protokol serialisasi biner kompak (Binary Encoding) dengan endianness eksplisit (Big-Endian)',
            'Membangun algoritma Crash Recovery Replay: memulihkan seluruh state memori in-memory setelah server mati mendadak',
            'Mencegah korupsi data berkas parsial dengan penyematan checksum CRC32 pada setiap frame WAL',
        ],
        'objectivesEn': [
            'Master Database Durability (the D in ACID) via Write-Ahead Logging (WAL) architectures',
            'Understand OS write-buffer caching vulnerabilities and the critical role of fsync (sync_data / sync_all)',
            'Design compact binary serialization protocols specifying explicit byte-order endianness (Big-Endian)',
            'Construct Crash Recovery Replay algorithms: reconstituting in-memory indexes following sudden power losses',
            'Prevent partial write corruptions using CRC32 checksum frames appended to log entries',
        ],
        'explanationId': """### Mengapa Membutuhkan Write-Ahead Log (WAL)?
Jika database Anda (seperti Redis atau Postgres) hanya menyimpan data di RAM:
Saat listrik server padam tiba-tiba, seluruh data transaksi perbankan pengguna **akan hilang selamanya dalam sekejap**!

**Prinsip Write-Ahead Logging (WAL)**:
1. Sebelum memori RAM diubah, server **wajib menulis catatan mutasi transaksi ke dalam berkas log append-only di disk terlebih dahulu**.
2. Format penulisan berkas dibuat sekuensial murni (*sequential append*), sehingga disk SSD bisa menulis ribuan catatan per detik tanpa jeda.
3. Setelah catatan aman di disk, barulah state RAM diperbarui dan klien diberi tahu: "Transaksi Sukses".

### Bahaya Fatal Tanpa `fsync` (`sync_all()`)
Saat Anda memanggil `file.write()`, sistem operasi (Linux/Windows) **TIDAK langsung menulis data ke piringan fisik SSD**, melainkan menyimpannya sementara di Page Cache RAM kernel.
Jika server mati listrik 1 detik kemudian, data di Page Cache menguap!
Fungsi **`file.sync_data()` (fsync)** adalah perintah militer ke kernel: *"Tahan eksekusi sampai SSD benar-benar mengonfirmasi bahwa bit data telah tertulis secara magnetik/elektronik di chip penyimpanan fisik!"*""",
        'explanationEn': """### Why Databases Mandate Write-Ahead Logging (WAL)
If an in-memory database holds state exclusively in volatile RAM:
Sudden power interruptions mean customer financial records **evaporate irreversibly**!

**The Write-Ahead Logging (WAL) Contract**:
1. Before mutating in-memory indexes, the engine **must append an immutable audit log record to persistent disk storage first**.
2. Appends execute sequentially (*sequential disk I/O*), allowing NVMe SSDs to sustain hundreds of thousands of write IOPS.
3. Only after the append commits to disk does the engine mutate memory and acknowledge: "Transaction Committed".

### The Peril of Omitting `fsync` (`sync_data()`)
Invoking standard `file.write()` does NOT flush bytes directly to physical SSD flash cells; Linux buffers them in the OS Page Cache.
A power outage 500ms later vaporizes unwritten page caches!
Calling **`file.sync_data()` (fsync)** issues an uncompromising hardware directive: *"Halt execution until the SSD controller confirms bytes have committed to non-volatile flash cells!"*""",
        'beginnerId': """### Analogi: Buku Kas Tulisan Tangan Notaris vs Papan Tulis Toko
1. **RAM Database** seperti papan tulis toko: angka penjualan ditulis dengan spidol. Begitu hujan lebat membasahi toko (*listrik mati*), seluruh tulisan di papan tulis terhapus licin.
2. **Write-Ahead Log (WAL)** seperti buku kas notaris bertinta permanen: sebelum kasir menghapus papan tulis, kasir mencatat transaksi di buku kas dengan tinta abadi (*tulis log ke disk*).
3. **Crash Recovery Replay** seperti pagi hari setelah toko buka kembali: pemilik toko membaca kembali buku kas dari halaman pertama (*replay WAL*) dan menuliskan kembali angka-angka di papan tulis toko persis seperti kemarin.""",
        'beginnerEn': """### Analogy: Notary Indelible Ledgers vs Classroom Chalkboards
1. **In-Memory RAM** is an erasable classroom chalkboard: sales totals are written with chalk dust. A sudden burst of rain (*power cut*) washes the board clean.
2. **Write-Ahead Logging (WAL)** is an indelible notary ledger: before chalk dust is wiped, the notary records the transaction in permanent ink (*append to disk*).
3. **Crash Recovery Replay** is opening the shop the following morning: the clerk reads the notary ledger from line one (*replay log*), reconstructing the chalkboard totals to the exact state before the storm.""",
        'experimentsId': [
            'Buka file WAL yang dihasilkan menggunakan hex editor untuk memeriksa header OpCode dan byte encoding.',
            'Ukur perbedaan kecepatan penulisan disk dengan fsync aktif vs tanpa fsync (perbedaan latensi ~100x lipat!).',
            'Simulasikan file log yang terpotong di tengah jalan (partial write) dan amati bagaimana parser mendeteksi error tak lengkap.',
            'Implementasikan rotasi file log (Log Compaction) saat ukuran file WAL melebihi 100 Megabyte.',
        ],
        'experimentsEn': [
            'Inspect the generated WAL file with a hex viewer examining OpCodes and big-endian lengths.',
            'Benchmark disk write throughput with fsync toggled on versus off (~100x latency divergence!).',
            'Simulate corrupted half-written log records observing how safe parsers catch truncated frames.',
            'Explore Log Compaction snapshots pruning WAL files exceeding 100 Megabytes.',
        ],
        'challengeId': 'Tambahkan OpCode `2` untuk operasi `DEL` pada logger WAL dan perbarui fungsi `replay_wal_log` agar menghapus kunci dari memori jika menemukan catatan DEL.',
        'challengeEn': 'Add OpCode `2` for `DEL` operations in the WAL logger, updating `replay_wal_log` to remove keys when processing deletion logs.',
        'summaryId': 'Kamu telah menguasai durabilitas database, file I/O append-only, fsync, dan crash recovery replay. Minggu depan kita mempelajari Unsafe Rust dan optimasi zero-copy.',
        'summaryEn': 'You have mastered database durability, append-only I/O, fsync, and crash recovery. Next week, we examine Unsafe Rust boundaries and zero-copy performance.',
    },
    {
        'week': 11,
        'level': 'advanced',
        'topicId': 'unsafe-dan-performance-tuning',
        'titleId': 'Unsafe Rust & Optimasi Tingkat Ekstrem: Pointer Mentah (*const/*mut) & Zero-Copy',
        'titleEn': 'Unsafe Rust & Performance Tuning: Raw Pointers & Zero-Copy Deserialization',
        'programId': 'Deserializer Protokol Biner Kinerja Ekstrem dengan Nol Salinan (Zero-Copy)',
        'programEn': 'High-Performance Zero-Copy Binary Protocol Deserializer in Rust',
        'levelNameId': 'Async Tokio, Durabilitas WAL & Capstone Engine',
        'levelNameEn': 'Async Tokio, WAL Durability & KV Engine Capstone',
        'language': 'rust',
        'code': """// Peringatan: Blok 'unsafe' hanya digunakan untuk optimasi khusus di mana compiler tidak dapat membuktikan keamanan secara statis!

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
""",
        'objectivesId': [
            'Memahami filosofi kata kunci `unsafe`: batas isolasi di mana pengembang memegang tanggung jawab kontrak memori',
            'Membedakan referensi aman (&T) vs Pointer Mentah (*const T dan *mut T)',
            'Menggunakan atribut `#[repr(C)]` untuk mengunci tata letak memori struct (*memory layout*) sesuai standar ABI C',
            'Menerapkan teknik Zero-Copy Deserialization: mem-parsing paket jaringan tanpa menyalin satupun byte di memori',
            'Menjaga batas isolasi (*Encapsulation of Unsafe*): membungkus kode unsafe di dalam antarmuka publik yang 100% aman (*safe wrapper*)',
        ],
        'objectivesEn': [
            'Master the `unsafe` keyword contract: isolating regions where developers uphold memory invariants manually',
            'Distinguish safe references (&T) from Raw Pointers (*const T and *mut T)',
            'Deploy `#[repr(C)]` attributes enforcing C-ABI deterministic struct memory layouts without padding drift',
            'Implement Zero-Copy Deserialization: parsing network frames without allocating or copying single bytes',
            'Enforce Unsafe Encapsulation boundaries: wrapping unsafe internals inside impenetrable 100% safe public APIs',
        ],
        'explanationId': """### Mengapa Rust Memiliki Kata Kunci `unsafe`?
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
Waktu pemrosesan menjadi **0 milidetik**, memungkinkan sistem Anda memproses jutaan paket per detik dengan throughput jaringan kabel penuh!""",
        'explanationEn': """### Why Rust Ships the `unsafe` Escape Hatch
The rustc borrow checker is strictly conservative. Yet certain bare-metal primitives **cannot be mathematically proven at compile time**:
1. Interacting with hardware memory-mapped I/O registers (`0x0000FFFF`).
2. Interfacing with foreign C libraries (*Foreign Function Interface - FFI*).
3. Extreme zero-copy memory transmutes across binary network buffers.

Hence, Rust provides the **`unsafe`** boundary.
`unsafe` does NOT mean code is buggy!
It states: *"Compiler, step aside. The borrow checker cannot verify this pointer arithmetic. I, the systems architect, guarantee that this pointer is aligned, non-null, and bounds-checked."*

### The Superpower of Zero-Copy Deserialization
In traditional serialization (JSON, Protobuf), parsing a 1GB payload forces the CPU to allocate fresh heap buffers and deep-copy bytes (*saturating memory bandwidth*).
With **Zero-Copy (`#[repr(C)]`)**:
The engine interprets incoming network slice buffers **directly as the target struct in-place**!
Processing overhead drops to **zero milliseconds**, enabling saturating 100-Gigabit line rates!""",
        'beginnerId': """### Analogi: Meja Kasir VIP Bebas Buka Tas
1. **Safe Rust** seperti pemeriksaan keamanan bandara standar: setiap tas dibuka, disinari X-ray, dan diverifikasi petugas (*compiler memeriksa setiap variabel*). Sangat aman, tidak ada barang berbahaya yang bisa lolos.
2. **Unsafe Rust** seperti jalur diplomatik kepresidenan: petugas bandara mengizinkan koper diplomat lewat tanpa dibuka (*blok unsafe*), karena duta besar telah menjamin dengan sumpah negara bahwa koper tersebut aman. Jika duta besar berbohong (*ada bug pointer*), seluruh pesawat bisa celaka.""",
        'beginnerEn': """### Analogy: Presidential Diplomatic Pouches vs Standard Security
1. **Safe Rust** is airport TSA baggage screening: every luggage piece opens, scans under X-ray, and undergoes manual inspection (*compiler verifies every lifetime and reference*). Impossibly secure; zero exploits pass.
2. **Unsafe Rust** is a diplomatic courier pouch: customs clears the pouch without unzipping seals (*unsafe block*), relying upon diplomatic oaths guaranteeing safety. If the diplomat makes an error (*pointer bug*), the security perimeter is breached.""",
        'experimentsId': [
            'Ubah ukuran raw_packet menjadi 10 byte (kurang dari 16 byte) dan amati fungsi mengembalikan None secara aman tanpa crash.',
            'Ubah byte magic number dan perhatikan parser menolak paket palsu.',
            'Gunakan miri (cargo miri run) untuk memverifikasi apakah ada undefined behavior pada blok unsafe Anda.',
            'Bandingkan benchmark kecepatan deserialisasi zero-copy vs serde_json pada paket 10.000 data.',
        ],
        'experimentsEn': [
            'Shorten raw_packet to 10 bytes verifying the function gracefully yields None without memory faults.',
            'Tamper with the magic bytes observing immediate packet rejection.',
            'Execute under Miri (cargo miri test) auditing your unsafe block for undefined behavior.',
            'Benchmark zero-copy parsing against serde_json over 10,000 serialized payloads.',
        ],
        'challengeId': 'Buat fungsi aman `ekstrak_payload_slice<\'a>(bytes: &\'a [u8], header: &PaketHeaderKV) -> Option<(&\'a [u8])>` yang mengembalikan slice byte isi payload dengan validasi panjang buffer agar tidak membaca memori di luar batas.',
        'challengeEn': 'Author a safe `extract_payload_slice<\'a>(bytes: &\'a [u8], header: &PaketHeaderKV) -> Option<&\'a [u8]>` returning payload slices bounded within memory limits.',
        'summaryId': 'Kamu telah menguasai batas unsafe, pointer mentah, layout #[repr(C)], dan deserialisasi zero-copy. Minggu depan adalah Capstone Final: In-Memory Key-Value Store dengan WAL.',
        'summaryEn': 'You have mastered unsafe boundaries, raw pointers, #[repr(C)], and zero-copy parsing. Next week is our Capstone Project: In-Memory Key-Value Store with WAL.',
    },
    {
        'week': 12,
        'level': 'advanced',
        'topicId': 'capstone-kv-store-wal',
        'titleId': 'Capstone: Blazing-Fast In-Memory Key-Value Store dengan Write-Ahead Log & Crash Recovery',
        'titleEn': 'Capstone: Production In-Memory Key-Value Store with WAL Durability & Crash Recovery',
        'programId': 'Mesin Penyimpanan Data Key-Value Berdurabilitas Penuh dengan Protokol Biner',
        'programEn': 'Production-Grade Key-Value Engine with WAL Durability, Mutex & Crash Recovery',
        'levelNameId': 'Async Tokio, Durabilitas WAL & Capstone Engine',
        'levelNameEn': 'Async Tokio, WAL Durability & KV Engine Capstone',
        'language': 'rust',
        'code': """// ============================================================================
// CAPSTONE PROJECT: NUSA-KV PRODUCTION STORAGE ENGINE IN PURE RUST
// ============================================================================
use std::collections::HashMap;
use std::sync::{Arc, RwLock};

// 1. Perintah Transaksional
#[derive(Debug, Clone)]
pub enum KvCommand {
    Set { key: String, val: Vec<u8> },
    Del { key: String },
}

// 2. Mesin Log WAL Dalam-Memori dengan Serialisasi Biner
pub struct MockWalEngine {
    log_buffer: Vec<u8>,
}

impl MockWalEngine {
    pub fn new() -> Self {
        MockWalEngine { log_buffer: Vec::new() }
    }

    pub fn append(&mut self, cmd: &KvCommand) {
        match cmd {
            KvCommand::Set { key, val } => {
                self.log_buffer.push(1); // OpCode 1 = SET
                self.log_buffer.extend_from_slice(&(key.len() as u16).to_be_bytes());
                self.log_buffer.extend_from_slice(key.as_bytes());
                self.log_buffer.extend_from_slice(&(val.len() as u32).to_be_bytes());
                self.log_buffer.extend_from_slice(val);
            }
            KvCommand::Del { key } => {
                self.log_buffer.push(2); // OpCode 2 = DEL
                self.log_buffer.extend_from_slice(&(key.len() as u16).to_be_bytes());
                self.log_buffer.extend_from_slice(key.as_bytes());
            }
        }
    }

    pub fn get_raw_bytes(&self) -> &[u8] {
        &self.log_buffer
    }
}

// 3. Mesin Key-Value Store Terpadu (Thread-Safe Shared Memory + Durability)
pub struct NusaKvStore {
    index: Arc<RwLock<HashMap<String, Vec<u8>>>>,
    wal: Arc<RwLock<MockWalEngine>>,
}

impl NusaKvStore {
    pub fn new() -> Self {
        NusaKvStore {
            index: Arc::new(RwLock::new(HashMap::new())),
            wal: Arc::new(RwLock::new(MockWalEngine::new())),
        }
    }

    // SET: Tulis ke WAL terlebih dahulu, baru perbarui memori RAM!
    pub fn set(&self, key: String, val: Vec<u8>) {
        let cmd = KvCommand::Set { key: key.clone(), val: val.clone() };

        // 1. Write-Ahead: Catat ke WAL
        {
            let mut wal_writer = self.wal.write().unwrap();
            wal_writer.append(&cmd);
        }

        // 2. Mutasi RAM Index
        {
            let mut idx_writer = self.index.write().unwrap();
            idx_writer.insert(key, val);
        }
    }

    // GET: Zero-Allocation Lookup melalui Read-Lock
    pub fn get(&self, key: &str) -> Option<Vec<u8>> {
        let reader = self.index.read().unwrap();
        reader.get(key).cloned()
    }

    // DEL: Tulis tombstone ke WAL, lalu hapus dari RAM
    pub fn del(&self, key: &str) -> bool {
        let cmd = KvCommand::Del { key: key.to_string() };

        {
            let mut wal_writer = self.wal.write().unwrap();
            wal_writer.append(&cmd);
        }

        {
            let mut idx_writer = self.index.write().unwrap();
            idx_writer.remove(key).is_some()
        }
    }

    // Crash Recovery: Memulihkan database dari nol dengan membaca ulang seluruh log WAL
    pub fn recover_from_wal(&self, raw_wal_bytes: &[u8]) {
        let mut cursor = 0;
        let mut idx_writer = self.index.write().unwrap();

        while cursor < raw_wal_bytes.len() {
            let opcode = raw_wal_bytes[cursor];
            cursor += 1;

            if opcode == 1 { // SET
                let k_len = u16::from_be_bytes([raw_wal_bytes[cursor], raw_wal_bytes[cursor + 1]]) as usize;
                cursor += 2;
                let key = String::from_utf8_lossy(&raw_wal_bytes[cursor..cursor + k_len]).to_string();
                cursor += k_len;

                let v_len = u32::from_be_bytes([
                    raw_wal_bytes[cursor], raw_wal_bytes[cursor + 1], raw_wal_bytes[cursor + 2], raw_wal_bytes[cursor + 3]
                ]) as usize;
                cursor += 4;
                let val = raw_wal_bytes[cursor..cursor + v_len].to_vec();
                cursor += v_len;

                idx_writer.insert(key, val);
            } else if opcode == 2 { // DEL
                let k_len = u16::from_be_bytes([raw_wal_bytes[cursor], raw_wal_bytes[cursor + 1]]) as usize;
                cursor += 2;
                let key = String::from_utf8_lossy(&raw_wal_bytes[cursor..cursor + k_len]).to_string();
                cursor += k_len;

                idx_writer.remove(&key);
            }
        }
    }
}

fn main() {
    println!("=================================================================");
    println!("NUSA-KV: HIGH-PERFORMANCE RUST KEY-VALUE STORAGE ENGINE");
    println!("=================================================================");

    let db = NusaKvStore::new();

    // 1. Transaksi Produksi
    println!("--> Menjalankan Transaksi...");
    db.set(String::from("user:101"), b"{\"nama\": \"Budi\", \"tier\": \"PRO\"}".to_vec());
    db.set(String::from("user:102"), b"{\"nama\": \"Dewi\", \"tier\": \"VIP\"}".to_vec());
    db.set(String::from("token:temp"), b"secret_session_xyz".to_vec());
    db.del("token:temp");

    // 2. Verifikasi Data Aktif
    if let Some(data) = db.get("user:101") {
        println!("[GET HIT] user:101 = {}", String::from_utf8_lossy(&data));
    }

    // 3. Simulasikan Bencana (Crash Simulasi): Salin byte WAL dan buat database baru dari nol!
    let raw_wal = {
        let wal_reader = db.wal.read().unwrap();
        wal_reader.get_raw_bytes().to_vec()
    };

    println!("\\n[SIMULASI CRASH] Server padam mendadak! Memori RAM lenyap.");
    println!("Ukuran Berkas WAL Terselamatkan: {} bytes", raw_wal.len());

    // Bangkitkan database baru yang kosong
    let db_pulih = NusaKvStore::new();
    db_pulih.recover_from_wal(&raw_wal);

    println!("\\n--> Memeriksa Hasil Pemulihan Pasca-Crash:");
    if let Some(data) = db_pulih.get("user:102") {
        println!("[RECOVERED OK] user:102 = {}", String::from_utf8_lossy(&data));
    }
    if db_pulih.get("token:temp").is_none() {
        println!("[RECOVERED OK] token:temp terbukti tetap terhapus sesuai catatan WAL!");
    }

    println!("\\nSelamat! Seluruh sistem beroperasi dengan keamanan memori 100% tanpa Garbage Collector!");
}
""",
        'objectivesId': [
            'Mengintegrasikan seluruh pilar bahasa Rust dari nol (Ownership, Borrowing, Structs, Enums, Traits, Arc/RwLock, WAL Durability) dalam satu sistem database produksi',
            'Menerapkan prinsip ACID Durability melalui pola Write-Ahead Logging biner sebelum memutasi state in-memory',
            'Membangun sistem pemulihan bencana otomatis (Crash Recovery Engine) dengan pembacaan ulang byte stream WAL',
            'Menjamin ketiadaan Data Race dan Memory Leak berkat perlindungan borrow checker Rust di waktu kompilasi',
            'Menghasilkan sistem penyimpanan berkecepatan monster kelas industri siap bersaing dengan Redis atau RocksDB',
        ],
        'objectivesEn': [
            'Synthesize all Rust pillars (Ownership, Borrowing, Structs, Enums, Traits, Arc/RwLock, WAL Durability) into an industrial-grade production database engine',
            'Enforce ACID Durability guarantees via binary Write-Ahead Logging committed prior to in-memory index mutations',
            'Construct an automated Crash Recovery Replay engine reconstituting runtime state from raw WAL byte streams',
            'Guarantee total absence of Data Races and Memory Leaks through compile-time borrow checker verification',
            'Deliver a high-throughput systems storage engine ready to rival performance benchmarks of Redis or RocksDB',
        ],
        'explanationId': """### Arsitektur Capstone Nusa-KV Storage Engine
Proyek capstone ini adalah mahakarya rekayasa sistem perangkat lunak modern:
1. **Pemisahan Logika & Durabilitas**: Setiap operasi mutasi (`set`, `del`) dijamin menulis ke dalam buffer Write-Ahead Log (WAL) terlebih dahulu. Jika server mati di tengah jalan, data tidak pernah hilang!
2. **Keamanan Konkurensi Tanpa Takut (`Arc<RwLock<T>>`)**: Database dilindungi oleh kunci pembaca-penulis atomik. Ratusan thread dapat melakukan pembacaan `get()` secara paralel tanpa jeda, sementara thread penulis mendapatkan kunci eksklusif sesaat saat melakukan update.
3. **Penyimpanan Biner Kompak**: Alih-alih menggunakan teks JSON yang lambat, berkas WAL menggunakan format biner murni dengan representasi Big-Endian untuk panjang kunci dan panjang nilai, menghemat bandwidth disk hingga 80%.
4. **Crash Recovery Deterministic**: Algoritma `recover_from_wal` membaca ulang byte mentah dari awal dan merekonstruksi seluruh state memori secara deterministik.

### Anda Kini Adalah Seorang Rustacean Sejati!
Dengan menyelesaikan kurikulum Rust dari nol hingga membangun database engine ini, Anda telah menguasai salah satu bahasa pemrograman paling bergengsi, paling aman, dan paling berkinerja tinggi dalam sejarah peradaban komputer modern!""",
        'explanationEn': """### Capstone Nusa-KV Storage Engine Architecture
This capstone stands as a tour de force in modern systems software engineering:
1. **Segregation of State & Durability**: Mutations (`set`, `del`) strictly commit to the Write-Ahead Log (WAL) before touching volatile memory. Unplanned outages leave zero committed transactions behind!
2. **Fearless Thread-Safe Concurrency (`Arc<RwLock<T>>`)**: The memory index is fortified by atomic reader-writer locks. Countless threads query `get()` concurrently without contention, while writers acquire temporary exclusive locks for state updates.
3. **Compact Binary Encoding**: Eschewing bloated JSON strings, the WAL frames transactions into packed binary buffers utilizing explicit Big-Endian byte orders, slashing disk I/O overhead by 80%.
4. **Deterministic Crash Recovery**: The `recover_from_wal` pipeline parses raw byte streams systematically, reconstituting active index state deterministically.

### You Are Now an Accomplished Rustacean!
By conquering the complete Rust curriculum from fundamental Ownership up to this persistent database engine, you have mastered the most prestigious, safe, and performant systems programming language in computer science!""",
        'beginnerId': """### Analogi: Brankas Emas Bank Sentral dengan CCTV Abadi
Nusa-KV bekerja seperti brankas emas bank sentral:
1. **Memori RAM Index** adalah etalase kaca tempat emas dipajang agar nasabah bisa melihat seketika (*pembacaan super cepat*).
2. **Write-Ahead Log (WAL)** adalah rekaman video CCTV dan buku akta notaris bersandi: sebelum emas ditaruh di etalase, petugas mencatat nomor seri emas di buku akta permanen.
3. **Crash Recovery** seperti saat gempa bumi meruntuhkan etalase kaca (*server crash*): keesokan harinya, notaris membuka buku akta bersandi (*replay WAL*), memesan emas baru sesuai nomor seri di buku, dan etalase kaca bank pulih 100% seperti sediakala tanpa ada emas yang hilang.""",
        'beginnerEn': """### Analogy: Central Depository Vaults with Notarized Ledgers
Nusa-KV operates like an institutional bullion depository:
1. **The RAM Index** is the illuminated glass showcase where bullion is displayed for instant verification (*sub-microsecond reads*).
2. **The Write-Ahead Log (WAL)** is an indelible notarized ledger: before placing bullion into the showcase, officers stamp serial numbers into permanent parchment (*binary log append*).
3. **Crash Recovery** is an earthquake shattering the display case (*server crash*): the following morning, auditors review the notarized parchment (*replay WAL*), restocking display cases to the exact inventory recorded prior to the tremor.""",
        'experimentsId': [
            'Simulasikan transaksi 1000 item, cetak ukuran byte buffer WAL, dan amati seberapa kompak format biner yang dihasilkan.',
            'Uji pemulihan data setelah menambahkan perintah DEL; buktikan kunci yang dihapus tetap terhapus pada database baru.',
            'Luncurkan beberapa thread konkuren yang memanggil db.set dan db.get secara paralel untuk membuktikan keamanan thread-safe.',
            'Kompilasi dengan bendera optimasi rilis: cargo build --release untuk melihat performa puncak kompilator LLVM.',
        ],
        'experimentsEn': [
            'Simulate 1,000 transactions printing raw WAL byte sizes to evaluate binary compaction efficiency.',
            'Verify crash recovery behavior following DEL commands confirming pruned keys remain absent in reconstituted stores.',
            'Spawn concurrent worker threads issuing db.set and db.get in parallel confirming thread-safe data race freedom.',
            'Compile with release optimizations: cargo build --release observing peak LLVM code generation performance.',
        ],
        'challengeId': 'Tambahkan verifikasi Checksum CRC32 (4 byte) di akhir setiap frame transaksi WAL; jika ada 1 byte yang korup atau rusak di tengah berkas, algoritma `recover_from_wal` harus mendeteksi korupsi dan menolak melanjutkan.',
        'challengeEn': 'Integrate a 4-byte CRC32 Checksum trailer on each WAL frame; if single bytes corrupt during transit, `recover_from_wal` halts and flags corruption.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Rust dari nol hingga membangun In-Memory Key-Value Store dengan Write-Ahead Log dan Crash Recovery tingkat produksi.',
        'summaryEn': 'Congratulations! You have completed the comprehensive Rust curriculum from zero to an enterprise-grade In-Memory Key-Value Store with WAL Durability and Crash Recovery.',
    },
]

def get_track():
    return {
        'slug': 'rust',
        'track_name': 'Rust',
        'levels': LEVELS,
        'modules': MODULES,
    }
