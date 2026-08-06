import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// RUST CURRICULUM — pure research, zero framework influence
// Sources: The Rust Book, Rust by Example, Rustlings, Too Many Linked Lists,
//          Zero To Mastery Rust, Official Rust Docs, Rust Cookbook
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 14 weeks total
//   Beginner (6w): basics → ownership → structs → enums → collections → errors
//   Intermediate (4w): traits → generics → lifetimes → testing
//   Advanced (4w): smart pointers → concurrency → macros → project
// Total: 14 weeks
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('rust', 'Rust');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Fundamental Rust: sintaks, ownership, struct, enum, pattern matching — urutan resmi The Rust Book.',
    descEn: 'Rust fundamentals: syntax, ownership, structs, enums, pattern matching — official Rust Book order.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Idiomatic Rust: trait, generics, lifetimes, testing, iterator — Rust by Example pathway.',
    descEn: 'Idiomatic Rust: traits, generics, lifetimes, testing, iterators — Rust by Example pathway.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Production Rust: smart pointer, concurrency, macro, unsafe, capstone project.',
    descEn: 'Production Rust: smart pointers, concurrency, macros, unsafe, capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-6) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'setup-dan-sintaks',
    titleId: 'Setup, Toolchain & Sintaks Dasar', titleEn: 'Setup, Toolchain & Basic Syntax',
    programId: 'Halo, Rust!', programEn: 'Hello, Rust!',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'rust',
    code: `fn main() {
    println!("Selamat datang di Rust!");
    println!("Rust adalah bahasa systems programming yang aman dan cepat.");

    let nama: &str = "Ferris";
    let versi: f64 = 1.78;
    let aktif: bool = true;

    println!("Nama: {}", nama);
    println!("Versi: {:.2}", versi);
    println!("Aktif: {}", aktif);

    let x = 42;
    let y: i32 = 100;
    println!("Tipe x: i32 (inferensi)");
    println!("x + y = {}", x + y);

    let tuple: (i32, f64, &str) = (42, 3.14, "halo");
    println!("Tuple: {:?}", tuple);
    println!("Tuple.0 = {}", tuple.0);

    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    println!("Array: {:?}", arr);
    println!("arr[0] = {}", arr[0]);
}`,
    objectivesId: [
      'Memahami peran Rust sebagai bahasa systems programming yang aman memori',
      'Menginstall Rust (rustup) dan toolchain: cargo, rustc, rustfmt',
      'Memahami struktur file .rs: fn main, println!, macro vs fungsi',
      'Mengenal tipe dasar: i32, f64, bool, char, &str, tuple, array',
      'Immutability by default dan type inference',
    ],
    objectivesEn: [
      'Understand Rust as a memory-safe systems programming language',
      'Install Rust (rustup) and toolchain: cargo, rustc, rustfmt',
      'Understand .rs file structure: fn main, println!, macros vs functions',
      'Learn basic types: i32, f64, bool, char, &str, tuples, arrays',
      'Immutability by default and type inference',
    ],
    explanationId: '### Peran Rust\nRust adalah bahasa systems programming yang menjamin memory safety tanpa garbage collector. Menggunakan ownership system untuk mencegah data race, dangling pointer, dan buffer overflow.\n\n### Toolchain Utama\n- `rustc`: kompilasi file .rs\n- `cargo`: package manager & build system\n- `rustfmt`: format kode\n- `clippy`: linter\n\n### Macro vs Fungsi\n`println!` adalah macro (tanda `!`). Macro menghasilkan kode saat compile time.\n\n### Tipe Dasar\n- Integer: i8, i16, i32, i64, i128, u8, u16, dll\n- Float: f32, f64\n- Boolean: bool\n- Char: char (4 bytes, Unicode)\n- Tuple: (i32, f64, &str)\n- Array: [T; N] fixed-size\n\n### Immutability\nVariabel immutable by default. Tambah `mut` untuk mutable.',
    explanationEn: '### Rust\'s Role\nSystems programming language with memory safety via ownership system — no garbage collector needed.\n\n### Toolchain\n`rustc`, `cargo`, `rustfmt`, `clippy`\n\n### Macros vs Functions\n`println!` is a macro (note `!`). Macros generate code at compile time.\n\n### Basic Types\nIntegers (i8-i128, u8-u128), floats (f32, f64), bool, char, tuples, arrays.\n\n### Immutability\nImmutable by default. Add `mut` for mutability.',
    experimentsId: [
      'Ubah nilai variabel mutable dan lihat perubahannya',
      'Buat tuple dengan tipe berbeda',
      'Coba operasi aritmatika dengan tipe berbeda',
      'Buat array 10 elemen dan akses dengan index',
      'Eksperimen dengan type annotation vs inference',
    ],
    experimentsEn: [
      'Change mutable variable values and observe',
      'Create tuples with different types',
      'Try arithmetic operations with different types',
      'Create 10-element array and access by index',
      'Experiment with type annotation vs inference',
    ],
    challengeId: 'Buat program konversi suhu (Celsius ↔ Fahrenheit ↔ Kelvin) dengan menu. Gunakan tuple untuk menyimpan data konversi.',
    challengeEn: 'Build a temperature converter (Celsius ↔ Fahrenheit ↔ Kelvin) with menu. Use tuples to store conversion data.',
    summaryId: 'Minggu 1 dari 14: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). Rust memberikan memory safety tanpa GC. Minggu depan: **Ownership & Borrowing**.',
    summaryEn: 'Week 1 of 14: **Setup, Toolchain & Basic Syntax** (Level: Beginner). Rust provides memory safety without GC. Next week: **Ownership & Borrowing**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'ownership-borrowing',
    titleId: 'Ownership & Borrowing', titleEn: 'Ownership & Borrowing',
    programId: 'Manajemen Memori', programEn: 'Memory Management',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'rust',
    code: `fn main() {
    // Ownership: setiap value punya satu owner
    let s1 = String::from("Halo");
    let s2 = s1; // s1 dipindahkan ke s2 (move)
    // println!("{}", s1); // ERROR: s1 sudah tidak valid
    println!("s2 = {}", s2);

    // Clone: deep copy
    let s3 = String::from("Dunia");
    let s4 = s3.clone();
    println!("s3 = {}, s4 = {}", s3, s4);

    // Borrowing: pinjam dengan &
    let s5 = String::from("Rust");
    let len = hitung_panjang(&s5);
    println!("Panjang '{}' = {}", s5, len);

    // Mutable borrow
    let mut s6 = String::from("Halo");
    ubah_string(&mut s6);
    println!("Setelah diubah: {}", s6);

    // Aturan borrowing
    let mut s = String::from("Halo");
    let r1 = &s;
    let r2 = &s;
    println!("r1 = {}, r2 = {}", r1, r2);
    // let r3 = &mut s; // ERROR: tidak bisa mutable borrow saat immutable borrow aktif

    // Dangling reference prevention
    // let reference_to_nothing = dangle(); // ERROR: tidak bisa return reference ke local
}

fn hitung_panjang(s: &String) -> usize {
    s.len()
}

fn ubah_string(s: &mut String) {
    s.push_str(", Dunia!");
}`,
    objectivesId: [
      'Memahami ownership: setiap value punya satu owner',
      'Move semantics: transfer ownership saat assignment',
      'Clone: deep copy untuk duplikasi value',
      'Borrowing: pinjam dengan & (immutable) dan &mut (mutable)',
      'Aturan borrowing: satu mutable borrow ATAU banyak immutable borrow',
    ],
    objectivesEn: [
      'Understand ownership: each value has one owner',
      'Move semantics: transfer ownership on assignment',
      'Clone: deep copy for value duplication',
      'Borrowing: borrow with & (immutable) and &mut (mutable)',
      'Borrowing rules: one mutable borrow OR many immutable borrows',
    ],
    explanationId: '### Ownership\nSetiap value di Rust punya satu owner. Saat owner keluar scope, value di-drop.\n\n### Move\nAssignment `let s2 = s1` untuk tipe non-Copy akan memindahkan ownership. s1 tidak bisa digunakan lagi.\n\n### Clone\n`s3.clone()` membuat deep copy. s3 dan s4 independen.\n\n### Borrowing\n`&s` immutable borrow, `&mut s` mutable borrow. Aturan: satu mutable ATAU banyak immutable.\n\n### Dangling Reference\nRust mencegah dangling reference di compile time.',
    explanationEn: '### Ownership\nEach value has one owner. When owner goes out of scope, value is dropped.\n\n### Move\nAssignment moves ownership for non-Copy types. Original variable becomes invalid.\n\n### Clone\nDeep copy creates independent duplicate.\n\n### Borrowing\n`&s` immutable, `&mut s` mutable. Rule: one mutable OR many immutable.\n\n### Dangling References\nPrevented at compile time.',
    experimentsId: [
      'Coba println! s1 setelah move — lihat error',
      'Buat fungsi yang return ownership',
      'Eksperimen dengan multiple mutable borrow',
      'Buat struct dengan String field dan test ownership',
      'Coba Copy trait pada tipe primitif',
    ],
    experimentsEn: [
      'Try println! s1 after move — observe error',
      'Create function that returns ownership',
      'Experiment with multiple mutable borrows',
      'Create struct with String field and test ownership',
      'Try Copy trait on primitive types',
    ],
    challengeId: 'Buat program manajemen buku: struct Book dengan title (String), fungsi new(), display(), dan clone(). Demonstrasikan ownership dan borrowing.',
    challengeEn: 'Build a book management program: struct Book with title (String), functions new(), display(), and clone(). Demonstrate ownership and borrowing.',
    summaryId: 'Minggu 2 dari 14: **Ownership & Borrowing** (Level: Pemula). Ini yang membuat Rust unik. Minggu depan: **Struct & Method**.',
    summaryEn: 'Week 2 of 14: **Ownership & Borrowing** (Level: Beginner). This is what makes Rust unique. Next week: **Structs & Methods**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'struct-method',
    titleId: 'Struct & Method', titleEn: 'Structs & Methods',
    programId: 'Data Produk', programEn: 'Product Data',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'rust',
    code: `#[derive(Debug, Clone)]
struct Product {
    id: u32,
    name: String,
    price: f64,
    stock: u32,
}

impl Product {
    fn new(id: u32, name: &str, price: f64) -> Product {
        Product {
            id,
            name: name.to_string(),
            price,
            stock: 0,
        }
    }

    fn info(&self) -> String {
        format!("{}: Rp{:.0} (stok: {})", self.name, self.price, self.stock)
    }

    fn apply_discount(&mut self, percent: f64) {
        self.price -= self.price * (percent / 100.0);
    }

    fn restock(&mut self, amount: u32) {
        self.stock += amount;
    }
}

#[derive(Debug)]
struct Electronics {
    product: Product,
    warranty_years: u32,
}

fn main() {
    let mut p1 = Product::new(1, "Laptop", 15000000.0);
    p1.restock(10);
    println!("{}", p1.info());

    p1.apply_discount(10.0);
    println!("Setelah diskon: {}", p1.info());

    let laptop = Electronics {
        product: Product::new(2, "Laptop Pro", 20000000.0),
        warranty_years: 3,
    };
    println!("{:?}", laptop);
    println!("Garansi: {} tahun", laptop.warranty_years);

    let p2 = Product::new(3, "Mouse", 250000.0);
    println!("{}", p2.info());
}`,
    objectivesId: [
      'Mendefinisikan struct dengan field bertipe',
      'Method dengan impl block: &self, &mut self, self',
      'Associated function: Struct::new() sebagai constructor',
      'Derive trait: Debug, Clone, PartialEq',
      'Struct composition: nested struct',
    ],
    objectivesEn: [
      'Define structs with typed fields',
      'Methods with impl block: &self, &mut self, self',
      'Associated functions: Struct::new() as constructor',
      'Derive traits: Debug, Clone, PartialEq',
      'Struct composition: nested structs',
    ],
    explanationId: '### Struct\nMengelompokkan field. Mirip class tapi tanpa inheritance.\n\n### Method\n`impl Product { fn method(&self) }`. `&self` read-only, `&mut self` mutable, `self` consume.\n\n### Associated Function\n`Product::new()` — tidak punya self, mirip static method.\n\n### Derive\n`#[derive(Debug)]` auto-implement trait. `Debug` untuk `{:?}`, `Clone` untuk `.clone()`.\n\n### Composition\nStruct bisa punya field struct lain (composition over inheritance).',
    explanationEn: '### Structs\nGroup fields. Like classes but without inheritance.\n\n### Methods\n`impl Block { fn method(&self) }`. `&self` read-only, `&mut self` mutable, `self` consume.\n\n### Associated Functions\n`Struct::new()` — no self parameter, like static methods.\n\n### Derive\nAuto-implement traits. `Debug` for `{:?}`, `Clone` for `.clone()`.\n\n### Composition\nStructs can contain other structs (composition over inheritance).',
    experimentsId: [
      'Tambah method update_price pada Product',
      'Buat struct baru dengan nested Product',
      'Coba derive PartialEq dan bandingkan dua struct',
      'Buat method yang consume self (fn into(self))',
      'Tambah associated function lain',
    ],
    experimentsEn: [
      'Add update_price method to Product',
      'Create new struct with nested Product',
      'Try derive PartialEq and compare two structs',
      'Create method that consumes self (fn into(self))',
      'Add another associated function',
    ],
    challengeId: 'Buat sistem toko: struct Product, Cart, Customer. Method: add_to_cart, checkout, apply_discount. Gunakan constructor.',
    challengeEn: 'Build a store system: struct Product, Cart, Customer. Methods: add_to_cart, checkout, apply_discount. Use constructors.',
    summaryId: 'Minggu 3 dari 14: **Struct & Method** (Level: Pemula). Tipe data custom di Rust. Minggu depan: **Enum & Pattern Matching**.',
    summaryEn: 'Week 3 of 14: **Structs & Methods** (Level: Beginner). Custom data types in Rust. Next week: **Enums & Pattern Matching**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'enum-pattern-matching',
    titleId: 'Enum & Pattern Matching', titleEn: 'Enums & Pattern Matching',
    programId: 'Status Pesanan', programEn: 'Order Status',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'rust',
    code: `#[derive(Debug)]
enum OrderStatus {
    Pending,
    Processing { started_at: String },
    Shipped { tracking_number: String },
    Delivered,
    Cancelled { reason: String },
}

impl OrderStatus {
    fn description(&self) -> String {
        match self {
            OrderStatus::Pending => "Menunggu pembayaran".to_string(),
            OrderStatus::Processing { started_at } => {
                format!("Diproses sejak {}", started_at)
            }
            OrderStatus::Shipped { tracking_number } => {
                format!("Dikirim, resi: {}", tracking_number)
            }
            OrderStatus::Delivered => "Terkirim".to_string(),
            OrderStatus::Cancelled { reason } => {
                format!("Dibatalkan: {}", reason)
            }
        }
    }

    fn is_terminal(&self) -> bool {
        matches!(self, OrderStatus::Delivered | OrderStatus::Cancelled { .. })
    }
}

fn main() {
    let orders = vec![
        OrderStatus::Pending,
        OrderStatus::Processing { started_at: "2024-01-15".to_string() },
        OrderStatus::Shipped { tracking_number: "JNE123".to_string() },
        OrderStatus::Delivered,
        OrderStatus::Cancelled { reason: "Stok habis".to_string() },
    ];

    for order in &orders {
        println!("{:?}", order);
        println!("  Status: {}", order.description());
        println!("  Terminal: {}", order.is_terminal());
        println!();
    }

    // if let pattern
    if let OrderStatus::Shipped { tracking_number } = &orders[2] {
        println!("Nomor resi: {}", tracking_number);
    }

    // Option enum
    let some_value: Option<i32> = Some(42);
    let none_value: Option<i32> = None;

    match some_value {
        Some(v) => println!("Value: {}", v),
        None => println!("No value"),
    }

    // unwrap_or
    let result = none_value.unwrap_or(0);
    println!("unwrap_or: {}", result);
}`,
    objectivesId: [
      'Enum dengan variant dan data payload',
      'Pattern matching dengan match expression',
      'Destructuring: ekstrak data dari enum variant',
      'Option<T> dan Result<T, E> enum standar',
      'if let dan matches! macro untuk pattern matching singkat',
    ],
    objectivesEn: [
      'Enums with variants and data payloads',
      'Pattern matching with match expressions',
      'Destructuring: extract data from enum variants',
      'Option<T> and Result<T, E> standard enums',
      'if let and matches! macro for concise pattern matching',
    ],
    explanationId: '### Enum\nVariant bisa membawa data: `Processing { started_at: String }`.\n\n### Match\nExhaustive — harus handle semua variant. `_` untuk catch-all.\n\n### Destructuring\n`OrderStatus::Shipped { tracking_number }` — ekstrak field.\n\n### Option<T>\n`Some(T)` atau `None`. Tidak ada null di Rust.\n\n### if let & matches!\n`if let Some(v) = opt` — match satu pattern. `matches!(x, Pattern)` — boolean check.',
    explanationEn: '### Enums\nVariants can carry data: `Processing { field: Type }`.\n\n### Match\nExhaustive — must handle all variants. `_` for catch-all.\n\n### Destructuring\nExtract fields from enum variants.\n\n### Option<T>\n`Some(T)` or `None`. No null in Rust.\n\n### if let & matches!\nConcis pattern matching shortcuts.',
    experimentsId: [
      'Buat enum baru dengan 5+ variant',
      'Tambah method pada enum dengan match',
      'Eksperimen dengan nested match',
      'Coba matches! dengan guard clause',
      'Buat Result<T, E> dan handle dengan match',
    ],
    experimentsEn: [
      'Create new enum with 5+ variants',
      'Add method to enum using match',
      'Experiment with nested match',
      'Try matches! with guard clauses',
      'Create Result<T, E> and handle with match',
    ],
    challengeId: 'Buat sistem state machine: enum GameState (Menu, Playing, Paused, GameOver). Method: transition, is_valid_transition. Gunakan match untuk validasi.',
    challengeEn: 'Build a state machine: enum GameState (Menu, Playing, Paused, GameOver). Methods: transition, is_valid_transition. Use match for validation.',
    summaryId: 'Minggu 4 dari 14: **Enum & Pattern Matching** (Level: Pemula). Kekuatan utama Rust. Minggu depan: **Collections: Vec, HashMap, String**.',
    summaryEn: 'Week 4 of 14: **Enums & Pattern Matching** (Level: Beginner). Rust\'s core strength. Next week: **Collections: Vec, HashMap, String**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'collections-vec-hashmap',
    titleId: 'Collections: Vec, HashMap & String', titleEn: 'Collections: Vec, HashMap & String',
    programId: 'Manajemen Data', programEn: 'Data Manager',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'rust',
    code: `use std::collections::HashMap;

fn main() {
    // Vec<T> — dynamic array
    let mut fruits: Vec<String> = Vec::new();
    fruits.push("apel".to_string());
    fruits.push("mangga".to_string());
    fruits.push("pisang".to_string());
    fruits.push("jeruk".to_string());

    println!("Vec: {:?}", fruits);
    println!("Len: {}, Cap: {}", fruits.len(), fruits.capacity());

    // Slice
    let sub = &fruits[1..3];
    println!("Sub-slice [1..3]: {:?}", sub);

    // Iterasi
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", i, fruit);
    }

    // HashMap<K, V>
    let mut ages: HashMap<&str, u32> = HashMap::new();
    ages.insert("Budi", 25);
    ages.insert("Siti", 23);
    ages.insert("Andi", 30);

    // Cek keberadaan
    match ages.get("Budi") {
        Some(age) => println!("Umur Budi: {}", age),
        None => println!("Budi tidak ditemukan"),
    }

    // Entry API
    ages.entry("Dewi").or_insert(28);

    // Iterasi HashMap
    for (name, age) in &ages {
        println!("{} -> {}", name, age);
    }

    // String manipulation
    let text = "  Rust Programming Language  ";
    let trimmed = text.trim();
    println!("Trimmed: '{}'", trimmed);
    println!("Contains 'Rust': {}", text.contains("Rust"));
    println!("Replace: {}", text.replace("Rust", "Go"));

    // Iterasi string
    let word = "Halo";
    for c in word.chars() {
        print!("{} ", c);
    }
    println!();
}`,
    objectivesId: [
      'Vec<T>: dynamic array dengan push, pop, len, capacity',
      'Slice: &vec[a..b] untuk akses sub-array',
      'HashMap<K, V>: key-value store dengan insert, get, entry',
      'String: trim, contains, replace, chars iteration',
      'Iterasi dengan iter(), enumerate(), for loop',
    ],
    objectivesEn: [
      'Vec<T>: dynamic array with push, pop, len, capacity',
      'Slice: &vec[a..b] for sub-array access',
      'HashMap<K, V>: key-value store with insert, get, entry',
      'String: trim, contains, replace, chars iteration',
      'Iteration with iter(), enumerate(), for loops',
    ],
    explanationId: '### Vec<T>\nDynamic array. `push`, `pop`, `len`, `capacity`. Auto-grow saat penuh.\n\n### Slice\n`&vec[1..3]` — reference ke sub-array. Tidak punya ownership.\n\n### HashMap\n`HashMap::new()`, `insert`, `get` returns `Option<&V>`. `entry().or_insert()` untuk upsert.\n\n### String\n`trim`, `contains`, `replace`, `chars()` untuk iterasi karakter.\n\n### Iterasi\n`vec.iter()` immutable, `vec.iter_mut()` mutable, `for item in &vec`.',
    explanationEn: '### Vec<T>\nDynamic array with push, pop, len, capacity.\n\n### Slices\n`&vec[a..b]` — reference to sub-array.\n\n### HashMap\nKey-value store with insert, get (returns Option), entry API.\n\n### String\ntrim, contains, replace, chars iteration.\n\n### Iteration\niter(), iter_mut(), for loops.',
    experimentsId: [
      'Buat Vec 2D (matrix) dan iterasi nested',
      'Tambah dan hapus multiple key di HashMap',
      'Coba HashMap dengan custom key type',
      'Eksperimen dengan VecDeque',
      'Buat word counter dengan HashMap',
    ],
    experimentsEn: [
      'Create 2D Vec (matrix) and nested iteration',
      'Add and remove multiple keys in HashMap',
      'Try HashMap with custom key type',
      'Experiment with VecDeque',
      'Build word counter with HashMap',
    ],
    challengeId: 'Buat program inventory: tambah/hapus produk (HashMap), daftar produk (Vec), cari produk (iter + if).',
    challengeEn: 'Build an inventory program: add/remove products (HashMap), list products (Vec), search products (iter + if).',
    summaryId: 'Minggu 5 dari 14: **Collections: Vec, HashMap & String** (Level: Pemula). Struktur data harian Rust. Minggu depan: **Error Handling**.',
    summaryEn: 'Week 5 of 14: **Collections: Vec, HashMap & String** (Level: Beginner). Daily data structures in Rust. Next week: **Error Handling**.',
  },
  {
    week: 6, level: 'beginer', topicId: 'error-handling',
    titleId: 'Error Handling', titleEn: 'Error Handling',
    programId: 'Penanganan Error', programEn: 'Error Handling',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'rust',
    code: `use std::fmt;

#[derive(Debug)]
enum AppError {
    NotFound(String),
    InvalidInput(String),
    IoError(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::NotFound(msg) => write!(f, "Not Found: {}", msg),
            AppError::InvalidInput(msg) => write!(f, "Invalid Input: {}", msg),
            AppError::IoError(msg) => write!(f, "IO Error: {}", msg),
        }
    }
}

fn bagi(a: f64, b: f64) -> Result<f64, AppError> {
    if b == 0.0 {
        Err(AppError::InvalidInput("tidak bisa dibagi nol".to_string()))
    } else {
        Ok(a / b)
    }
}

fn cari_produk(id: u32) -> Result<String, AppError> {
    if id == 0 {
        Err(AppError::InvalidInput("ID tidak valid".to_string()))
    } else if id > 100 {
        Err(AppError::NotFound(format!("Produk {} tidak ditemukan", id)))
    } else {
        Ok(format!("Produk {}", id))
    }
}

fn main() {
    // Result dengan match
    match bagi(10.0, 2.0) {
        Ok(hasil) => println!("10 / 2 = {:.1}", hasil),
        Err(e) => println!("Error: {}", e),
    }

    match bagi(5.0, 0.0) {
        Ok(hasil) => println!("Hasil: {}", hasil),
        Err(e) => println!("Error: {}", e),
    }

    // ? operator (propagasi error)
    fn hitung() -> Result<f64, AppError> {
        let a = bagi(10.0, 2.0)?;
        let b = bagi(a, 5.0)?;
        Ok(b)
    }

    match hitung() {
        Ok(v) => println!("Hitung: {}", v),
        Err(e) => println!("Error: {}", e),
    }

    // unwrap_or dan expect
    let hasil = bagi(10.0, 0.0).unwrap_or(0.0);
    println!("unwrap_or: {}", hasil);

    // Option ke Result
    let opt: Option<i32> = Some(42);
    let result: Result<i32, &str> = opt.ok_or("tidak ada nilai");
    println!("ok_or: {:?}", result);

    // cari_produk
    for id in [0, 50, 200] {
        match cari_produk(id) {
            Ok(nama) => println!("ID {}: {}", id, nama),
            Err(e) => println!("ID {}: Error: {}", id, e),
        }
    }
}`,
    objectivesId: [
      'Result<T, E>: Ok(T) untuk sukses, Err(E) untuk error',
      'Custom error enum dengan Debug dan Display trait',
      '? operator untuk propagasi error otomatis',
      'unwrap_or, expect, unwrap untuk handle Option/Result',
      'Konversi Option ke Result dengan ok_or',
    ],
    objectivesEn: [
      'Result<T, E>: Ok(T) for success, Err(E) for error',
      'Custom error enums with Debug and Display traits',
      '? operator for automatic error propagation',
      'unwrap_or, expect, unwrap for Option/Result handling',
      'Convert Option to Result with ok_or',
    ],
    explanationId: '### Result<T, E>\n`Ok(T)` sukses, `Err(E)` error. Tidak ada exception di Rust.\n\n### Custom Error\nEnum dengan variant. Implement `Debug` dan `Display`.\n\n### ? Operator\n`let x = func()?;` — jika Err, return langsung. Jika Ok, unwrap.\n\n### unwrap_or\n`opt.unwrap_or(default)` — nilai default jika None.\n\n### ok_or\n`opt.ok_or("msg")` — konversi Option ke Result.',
    explanationEn: '### Result<T, E>\n`Ok(T)` success, `Err(E)` error. No exceptions in Rust.\n\n### Custom Errors\nEnums with variants. Implement Debug and Display.\n\n### ? Operator\nAuto-propagate errors. If Err, return immediately.\n\n### unwrap_or\nProvide default value for None.\n\n### ok_or\nConvert Option to Result.',
    experimentsId: [
      'Buat custom error baru dengan 3+ variant',
      'Eksperimen dengan ? di fungsi bersarang',
      'Coba thiserror crate (konseptual)',
      'Buat fungsi yang return Result dengan multiple error type',
      'Eksperimen dengan anyhow::Error',
    ],
    experimentsEn: [
      'Create new custom error with 3+ variants',
      'Experiment with ? in nested functions',
      'Try thiserror crate (conceptual)',
      'Create function returning Result with multiple error types',
      'Experiment with anyhow::Error',
    ],
    challengeId: 'Buat program kalkulator dengan error handling: bagi, akar, pangkat. Custom error enum untuk setiap jenis error.',
    challengeEn: 'Build a calculator with error handling: divide, sqrt, power. Custom error enum for each error type.',
    summaryId: 'Minggu 6 dari 14: **Error Handling** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Trait** (Intermediate).',
    summaryEn: 'Week 6 of 14: **Error Handling** (Level: Beginner). Beginner phase complete! Next week: **Traits** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 7-10) ──────────────────────────────────────────────
  {
    week: 7, level: 'intermediate', topicId: 'trait',
    titleId: 'Trait', titleEn: 'Traits',
    programId: 'Polimorfisme', programEn: 'Polymorphism',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'rust',
    code: `trait Speak {
    fn speak(&self) -> String;
    fn name(&self) -> &str;
}

struct Dog {
    name: String,
}

impl Speak for Dog {
    fn speak(&self) -> String {
        format!("Woof! I'm {}", self.name)
    }
    fn name(&self) -> &str {
        &self.name
    }
}

struct Cat {
    name: String,
}

impl Speak for Cat {
    fn speak(&self) -> String {
        format!("Meow! I'm {}", self.name)
    }
    fn name(&self) -> &str {
        &self.name
    }
}

fn make_sound(s: &dyn Speak) {
    println!("{}", s.speak());
}

// Trait bound
fn announce<T: Speak>(item: &T) {
    println!("{} says: {}", item.name(), item.speak());
}

// Multiple trait bounds
fn describe(item: &dyn Speak) {
    println!("{}: {}", item.name(), item.speak());
}

// Trait sebagai return type
fn get_speaker(name: &str, is_dog: bool) -> Box<dyn Speak> {
    if is_dog {
        Box::new(Dog { name: name.to_string() })
    } else {
        Box::new(Cat { name: name.to_string() })
    }
}

fn main() {
    let dog = Dog { name: "Buddy".to_string() };
    let cat = Cat { name: "Kitty".to_string() };

    make_sound(&dog);
    make_sound(&cat);

    announce(&dog);
    announce(&cat);

    // Dynamic dispatch
    let speakers: Vec<Box<dyn Speak>> = vec![
        get_speaker("Rex", true),
        get_speaker("Whiskers", false),
    ];

    for s in &speakers {
        describe(s);
    }

    // Default method
    trait Greet {
        fn name(&self) -> &str;
        fn greet(&self) -> String {
            format!("Hello, I'm {}", self.name())
        }
    }

    struct Person { name: String }
    impl Greet for Person {
        fn name(&self) -> &str { &self.name }
    }

    let person = Person { name: "Budi".to_string() };
    println!("{}", person.greet());
}`,
    objectivesId: [
      'Trait: definisi interface/behavior yang bisa diimplement struct',
      'impl Trait for Struct: implementasi trait pada tipe',
      'Trait bound: <T: Speak> untuk generic constraint',
      'Dynamic dispatch: &dyn Trait dan Box<dyn Trait>',
      'Default method implementation pada trait',
    ],
    objectivesEn: [
      'Traits: define interfaces/behaviors that structs can implement',
      'impl Trait for Struct: implement trait on types',
      'Trait bounds: <T: Trait> for generic constraints',
      'Dynamic dispatch: &dyn Trait and Box<dyn Trait>',
      'Default method implementations on traits',
    ],
    explanationId: '### Trait\nDefinisi method yang harus diimplement struct. Mirip interface di bahasa lain.\n\n### impl Trait\n`impl Speak for Dog { fn speak(&self) }` — implement trait untuk tipe.\n\n### Trait Bound\n`fn announce<T: Speak>(item: &T)` — generic dengan constraint.\n\n### Dynamic Dispatch\n`&dyn Speak` — runtime polymorphism. `Box<dyn Speak>` — heap allocation.\n\n### Default Method\nTrait bisa punya default implementation. Struct bisa override.',
    explanationEn: '### Traits\nDefine methods that structs must implement. Like interfaces.\n\n### impl Trait\nImplement traits for specific types.\n\n### Trait Bounds\nGeneric functions with trait constraints.\n\n### Dynamic Dispatch\nRuntime polymorphism with &dyn Trait and Box<dyn Trait>.\n\n### Default Methods\nTraits can provide default implementations.',
    experimentsId: [
      'Buat trait Shape dengan method area() — implement Circle, Rectangle',
      'Coba multiple trait bounds: T: Speak + Clone',
      'Buat trait dengan associated type',
      'Eksperimen dengan trait object di Vec',
      'Buat trait inheritance (supertrait)',
    ],
    experimentsEn: [
      'Create Shape trait with area() — implement Circle, Rectangle',
      'Try multiple trait bounds: T: Trait1 + Trait2',
      'Create trait with associated types',
      'Experiment with trait objects in Vec',
      'Create trait inheritance (supertraits)',
    ],
    challengeId: 'Buat sistem pembayaran: trait PaymentMethod (process_payment), implement CreditCard, PayPal, BankTransfer. Gunakan trait bound untuk repository.',
    challengeEn: 'Build a payment system: trait PaymentMethod (process_payment), implement CreditCard, PayPal, BankTransfer. Use trait bounds for repository.',
    summaryId: 'Minggu 7 dari 14: **Trait** (Level: Menengah). Polimorfisme di Rust. Minggu depan: **Generics**.',
    summaryEn: 'Week 7 of 14: **Traits** (Level: Intermediate). Polymorphism in Rust. Next week: **Generics**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'generics',
    titleId: 'Generics', titleEn: 'Generics',
    programId: 'Fungsi Generik', programEn: 'Generic Functions',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'rust',
    code: `use std::fmt::Debug;

// Generic function
fn first<T>(items: &[T]) -> Option<&T> {
    items.first()
}

// Generic struct
struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { items: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.items.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }

    fn peek(&self) -> Option<&T> {
        self.items.last()
    }

    fn is_empty(&self) -> bool {
        self.items.is_empty()
    }
}

// Generic dengan trait bound
fn largest<T: PartialOrd + Debug>(items: &[T]) -> Option<&T> {
    items.iter().reduce(|a, b| if a > b { a } else { b })
}

// Generic enum
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

// Multiple type parameters
struct Pair<T, U> {
    first: T,
    second: U,
}

impl<T: Debug, U: Debug> Pair<T, U> {
    fn display(&self) {
        println!("{:?} {:?}", self.first, self.second);
    }
}

fn main() {
    // Generic function
    let numbers = vec![10, 20, 30];
    println!("First int: {:?}", first(&numbers));

    let words = vec!["a", "b", "c"];
    println!("First str: {:?}", first(&words));

    // Generic struct
    let mut stack: Stack<String> = Stack::new();
    stack.push("Rust".to_string());
    stack.push("Go".to_string());
    stack.push("Python".to_string());

    println!("Stack peek: {:?}", stack.peek());
    while let Some(item) = stack.pop() {
        println!("Pop: {}", item);
    }

    // largest
    let nums = vec![3, 1, 4, 1, 5, 9, 2, 6];
    println!("Largest: {:?}", largest(&nums));

    let chars = vec!['a', 'z', 'm'];
    println!("Largest char: {:?}", largest(&chars));

    // Pair
    let pair = Pair { first: 42, second: "hello" };
    pair.display();
}`,
    objectivesId: [
      'Generic function: fn name<T>(param: T)',
      'Generic struct: struct Stack<T> { items: Vec<T> }',
      'Trait bound pada generics: T: PartialOrd + Debug',
      'Multiple type parameters: struct Pair<T, U>',
      'Option<T> dan Result<T, E> sebagai generic enum',
    ],
    objectivesEn: [
      'Generic functions: fn name<T>(param: T)',
      'Generic structs: struct Stack<T> { items: Vec<T> }',
      'Trait bounds on generics: T: PartialOrd + Debug',
      'Multiple type parameters: struct Pair<T, U>',
      'Option<T> and Result<T, E> as generic enums',
    ],
    explanationId: '### Generic Function\n`fn first<T>(items: &[T])` — tipe T ditentukan saat dipanggil.\n\n### Generic Struct\n`struct Stack<T>` — struct dengan tipe parameter.\n\n### Trait Bound\n`T: PartialOrd` — T harus mengimplement PartialOrd. Bisa multiple: `T: A + B`.\n\n### Multiple Type Params\n`struct Pair<T, U>` — dua tipe berbeda.\n\n### Option & Result\n`Option<T>` dan `Result<T, E>` adalah generic enum standar Rust.',
    explanationEn: '### Generic Functions\nType T determined at call site.\n\n### Generic Structs\nStructs with type parameters.\n\n### Trait Bounds\nConstrain generics with required traits.\n\n### Multiple Type Parameters\nDifferent types in one struct.\n\n### Option & Result\nStandard library generic enums.',
    experimentsId: [
      'Buat generic function max<T: PartialOrd>',
      'Buat generic struct Queue<T>',
      'Coba generic dengan where clause',
      'Buat trait dengan generic method',
      'Eksperimen dengan PhantomData',
    ],
    experimentsEn: [
      'Create generic function max<T: PartialOrd>',
      'Create generic struct Queue<T>',
      'Try generics with where clauses',
      'Create trait with generic methods',
      'Experiment with PhantomData',
    ],
    challengeId: 'Buat generic Repository<T> dengan method: find_all, find_by_id, save, delete. Implement untuk Product dan User.',
    challengeEn: 'Build generic Repository<T> with methods: find_all, find_by_id, save, delete. Implement for Product and User.',
    summaryId: 'Minggu 8 dari 14: **Generics** (Level: Menengah). Reusable code dengan type safety. Minggu depan: **Lifetimes**.',
    summaryEn: 'Week 8 of 14: **Generics** (Level: Intermediate). Reusable code with type safety. Next week: **Lifetimes**.',
  },
  {
    week: 9, level: 'intermediate', topicId: 'lifetimes',
    titleId: 'Lifetimes', titleEn: 'Lifetimes',
    programId: 'Validasi Referensi', programEn: 'Reference Validation',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'rust',
    code: `fn main() {\n    // Lifetime: memastikan reference valid selama masih digunakan\n    let string1 = String::from("livedan string yang panjang");\n    let result;\n    {\n        let string2 = String::from("xyz");\n        result = longest(string1.as_str(), string2.as_str());\n        println!("String terpanjang: {}", result);\n    }\n    // println!("{}", result); // ERROR: result tidak valid di sini\n\n    // Lifetime pada struct\n    #[derive(Debug)]\n    struct Excerpt {\n        part: String,\n    }\n\n    let novel = String::from("Call me Ishmael. Some years ago...");\n    let first_sentence = novel.split('.').next().unwrap();\n    let excerpt = Excerpt {\n        part: first_sentence.to_string(),\n    };\n    println!("{:?}", excerpt);\n\n    // Static lifetime\n    let s: &'static str = "ini string literal, hidup selamanya";\n    println!("Static: {}", s);\n\n    // Lifetime omission (compiler infer)\n    fn first_word(s: &str) -> &str {\n        s.split_whitespace().next().unwrap_or("")\n    }\n\n    let sentence = "Halo Dunia Rust";\n    println!("First word: {}", first_word(sentence));\n\n    // Multiple lifetimes\n    fn mix<'a, 'b>(x: &'a str, y: &'b str) -> &'a str {\n        println!("y: {}", y);\n        x\n    }\n\n    let a = "halo";\n    let b = "dunia";\n    let r = mix(a, b);\n    println!("Result: {}", r);\n}\n\nfn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}`,
    objectivesId: [
      'Lifetime annotation: \'a untuk menandai umur reference',
      'Compiler infer lifetime dengan lifetime elision rules',
      'Lifetime pada struct: struct yang menyimpan reference',
      'Static lifetime: \'static untuk string literal dan global data',
      'Multiple lifetime: \'a, \'b untuk reference dengan umur berbeda',
    ],
    objectivesEn: [
      'Lifetime annotations: \'a to mark reference lifetimes',
      'Compiler infers lifetimes with elision rules',
      'Lifetimes on structs: structs holding references',
      'Static lifetime: \'static for string literals and global data',
      'Multiple lifetimes: \'a, \'b for references with different lifetimes',
    ],
    explanationId: '### Lifetime Annotation\n`\'a` menandai bahwa reference hidup setidaknya selama \'a. `fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str`.\n\n### Elision Rules\nCompiler bisa infer lifetime jika: 1 param input, atau 1 param + &self.\n\n### Struct Lifetime\nStruct yang punya reference field perlu lifetime annotation.\n\n### Static Lifetime\n`\'static` — hidup selama program berjalan. String literal selalu \'static.\n\n### Multiple Lifetimes\n`fn mix<\'a, \'b>(x: &\'a str, y: &\'b str)` — dua lifetime berbeda.',
    explanationEn: '### Lifetime Annotations\n`\'a` marks reference lifetimes. Ensures references are valid.\n\n### Elision Rules\nCompiler infers lifetimes for simple cases.\n\n### Struct Lifetimes\nStructs with reference fields need lifetime annotations.\n\n### Static Lifetime\n`\'static` — lives for entire program duration.\n\n### Multiple Lifetimes\nDifferent lifetimes for different references.',
    experimentsId: [
      'Buat fungsi dengan explicit lifetime annotation',
      'Coba struct dengan reference field',
      'Eksperimen dengan lifetime di method',
      'Buat fungsi dengan multiple lifetime params',
      'Coba break lifetime rules dan lihat error',
    ],
    experimentsEn: [
      'Create function with explicit lifetime annotation',
      'Try struct with reference field',
      'Experiment with lifetimes in methods',
      'Create function with multiple lifetime params',
      'Try breaking lifetime rules and observe errors',
    ],
    challengeId: 'Buat struct Document dengan title (String) dan excerpt (&str). Method: summary(), word_count(). Gunakan lifetime annotation.',
    challengeEn: 'Build struct Document with title (String) and excerpt (&str). Methods: summary(), word_count(). Use lifetime annotations.',
    summaryId: 'Minggu 9 dari 14: **Lifetimes** (Level: Menengah). Memastikan reference aman. Minggu depan: **Testing**.',
    summaryEn: 'Week 9 of 14: **Lifetimes** (Level: Intermediate). Ensuring reference safety. Next week: **Testing**.',
  },
  {
    week: 10, level: 'intermediate', topicId: 'testing',
    titleId: 'Testing', titleEn: 'Testing',
    programId: 'Unit Test & Integration', programEn: 'Unit & Integration Tests',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'rust',
    code: `// Fungsi yang akan diuji
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("tidak bisa dibagi nol".to_string())
    } else {
        Ok(a / b)
    }
}

fn is_even(n: i32) -> bool {
    n % 2 == 0
}

fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a = 0u64;
            let mut b = 1u64;
            for _ in 2..=n {
                let temp = a + b;
                a = b;
                b = temp;
            }
            b
        }
    }
}

fn main() {
    // Simulasi test
    println!("=== Simulasi Unit Test ===");

    // Test add
    let result = add(2, 3);
    assert_eq!(result, 5, "add(2,3) harus 5");
    println!("✓ add(2,3) = {}", result);

    let result = add(-1, -1);
    assert_eq!(result, -2, "add(-1,-1) harus -2");
    println!("✓ add(-1,-1) = {}", result);

    // Test divide
    let result = divide(10.0, 2.0);
    assert!(result.is_ok());
    println!("✓ divide(10,2) = {:?}", result);

    let result = divide(5.0, 0.0);
    assert!(result.is_err());
    println!("✓ divide(5,0) = {:?}", result);

    // Test is_even
    assert!(is_even(4));
    assert!(!is_even(3));
    println!("✓ is_even tests passed");

    // Test fibonacci
    assert_eq!(fibonacci(0), 0);
    assert_eq!(fibonacci(1), 1);
    assert_eq!(fibonacci(10), 55);
    println!("✓ fibonacci tests passed");

    println!("\n=== Semua test passed! ===");
    println!("Cargo test: cargo test");
    println!("Doc test: cargo test --doc");
}`,
    objectivesId: [
      '#[test] attribute untuk menandai fungsi test',
      'assert!, assert_eq!, assert_ne! macro untuk verifikasi',
      '#[cfg(test)] module untuk kumpulan test',
      'Doc test: test di dalam dokumentasi kode',
      'cargo test untuk menjalankan semua test',
    ],
    objectivesEn: [
      '#[test] attribute to mark test functions',
      'assert!, assert_eq!, assert_ne! macros for verification',
      '#[cfg(test)] module for test collections',
      'Doc tests: tests inside code documentation',
      'cargo test to run all tests',
    ],
    explanationId: '### Unit Test\n`#[test]` attribute. `assert_eq!(a, b)` untuk verifikasi equality.\n\n### Test Module\n`#[cfg(test)] mod tests { ... }` — module khusus test.\n\n### Doc Test\nTest di dalam /// comment. Dijalankan dengan `cargo test --doc`.\n\n### cargo test\nMenjalankan semua test. `cargo test nama_filter` untuk test spesifik.',
    explanationEn: '### Unit Tests\n`#[test]` attribute. `assert_eq!` for equality checks.\n\n### Test Modules\n`#[cfg(test)] mod tests { ... }` — dedicated test module.\n\n### Doc Tests\nTests inside documentation comments.\n\n### cargo test\nRun all tests. Filter with name.',
    experimentsId: [
      'Buat test untuk fungsi add dengan edge cases',
      'Coba assert_ne! dan assert! dengan custom message',
      'Buat test module dengan setup/teardown',
      'Eksperimen dengan should_panic',
      'Buat doc test untuk fungsi publik',
    ],
    experimentsEn: [
      'Create tests for add function with edge cases',
      'Try assert_ne! and assert! with custom messages',
      'Create test module with setup/teardown',
      'Experiment with should_panic',
      'Create doc tests for public functions',
    ],
    challengeId: 'Buat library calculator dengan unit test: add, subtract, multiply, divide, power, factorial. Minimal 10 test cases.',
    challengeEn: 'Build a calculator library with unit tests: add, subtract, multiply, divide, power, factorial. Minimum 10 test cases.',
    summaryId: 'Minggu 10 dari 14: **Testing** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Smart Pointers** (Advanced).',
    summaryEn: 'Week 10 of 14: **Testing** (Level: Intermediate). Intermediate phase complete! Next week: **Smart Pointers** (Advanced).',
  },
  // ── ADVANCED (weeks 11-14) ────────────────────────────────────────────────
  {
    week: 11, level: 'advanced', topicId: 'smart-pointers',
    titleId: 'Smart Pointers', titleEn: 'Smart Pointers',
    programId: 'Manajemen Memori Lanjutan', programEn: 'Advanced Memory Management',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'rust',
    code: `use std::rc::Rc;
use std::cell::RefCell;
use std::sync::Arc;

// Box<T> — heap allocation
fn box_example() {
    let b = Box::new(42);
    println!("Box: {}", b);

    // Recursive type dengan Box
    #[derive(Debug)]
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }

    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
    println!("List: {:?}", list);
}

// Rc<T> — reference counting
fn rc_example() {
    let a = Rc::new(42);
    let b = Rc::clone(&a);
    let c = Rc::clone(&a);

    println!("a = {}, b = {}, c = {}", a, b, c);
    println!("Reference count: {}", Rc::strong_count(&a));
}

// RefCell<T> — interior mutability
fn refcell_example() {
    let data = RefCell::new(42);

    // Borrow immutable
    println!("data = {}", data.borrow());

    // Borrow mutable
    *data.borrow_mut() = 100;
    println!("data after mutation = {}", data.borrow());
}

// Arc<T> — atomic reference counting (thread-safe)
fn arc_example() {
    let val = Arc::new(42);
    let val2 = Arc::clone(&val);
    println!("Arc: val={}, val2={}", val, val2);
    println!("Arc count: {}", Arc::strong_count(&val));
}

fn main() {
    println!("=== Box<T> ===");
    box_example();

    println!("\n=== Rc<T> ===");
    rc_example();

    println!("\n=== RefCell<T> ===");
    refcell_example();

    println!("\n=== Arc<T> ===");
    arc_example();

    // Deref trait
    let x = Box::new(5);
    println!("\nDeref: *x = {}", *x);

    // Drop trait
    struct CustomSmartPointer {
        data: String,
    }

    impl Drop for CustomSmartPointer {
        fn drop(&mut self) {
            println!("Dropping CustomSmartPointer with data: {}", self.data);
        }
    }

    let c = CustomSmartPointer { data: "my stuff".to_string() };
    let d = CustomSmartPointer { data: "other stuff".to_string() };
    println!("Created pointers");
    drop(c);
    println!("Dropped c");
}`,
    objectivesId: [
      'Box<T>: heap allocation untuk tipe dinamis dan recursive type',
      'Rc<T>: reference counting untuk multiple ownership',
      'RefCell<T>: interior mutability — mutable borrow saat immutable',
      'Arc<T>: atomic reference counting untuk thread-safe sharing',
      'Deref dan Drop trait untuk custom smart pointer',
    ],
    objectivesEn: [
      'Box<T>: heap allocation for dynamic types and recursive types',
      'Rc<T>: reference counting for multiple ownership',
      'RefCell<T>: interior mutability — mutable borrow while immutable',
      'Arc<T>: atomic reference counting for thread-safe sharing',
      'Deref and Drop traits for custom smart pointers',
    ],
    explanationId: '### Box<T>\nHeap allocation. Dipakai untuk: tipe dinamis (trait object), recursive type, large data.\n\n### Rc<T>\nReference counting. Multiple owner, single-thread. `Rc::clone()` increment count.\n\n### RefCell<T>\nInterior mutability. Borrow rules dijalankan saat runtime, bukan compile time.\n\n### Arc<T>\nAtomic Rc — thread-safe. Dipakai bersama Mutex untuk shared mutable state.\n\n### Deref & Drop\n`Deref` untuk `*x`. `Drop` untuk cleanup saat keluar scope.',
    explanationEn: '### Box<T>\nHeap allocation for dynamic types, recursive types, large data.\n\n### Rc<T>\nReference counting for multiple ownership, single-threaded.\n\n### RefCell<T>\nInterior mutability with runtime borrow checking.\n\n### Arc<T>\nAtomic reference counting for thread-safe sharing.\n\n### Deref & Drop\nDeref for dereference operator, Drop for cleanup.',
    experimentsId: [
      'Buat linked list dengan Box<Cons>',
      'Eksperimen dengan Rc<RefCell<T>>',
      'Coba RefCell borrow saat sudah borrowed — lihat panic',
      'Buat custom smart pointer dengan Drop',
      'Eksperimen dengan Weak<T> untuk break cycle',
    ],
    experimentsEn: [
      'Create linked list with Box<Cons>',
      'Experiment with Rc<RefCell<T>>',
      'Try RefCell borrow while already borrowed — observe panic',
      'Create custom smart pointer with Drop',
      'Experiment with Weak<T> to break cycles',
    ],
    challengeId: 'Buat graph structure: Node dengan Rc<RefCell<Node>> untuk edges. Method: add_edge, dfs, bfs.',
    challengeEn: 'Build graph structure: Node with Rc<RefCell<Node>> for edges. Methods: add_edge, dfs, bfs.',
    summaryId: 'Minggu 11 dari 14: **Smart Pointers** (Level: Lanjutan). Manajemen memori lanjutan. Minggu depan: **Concurrency**.',
    summaryEn: 'Week 11 of 14: **Smart Pointers** (Level: Advanced). Advanced memory management. Next week: **Concurrency**.',
  },
  {
    week: 12, level: 'advanced', topicId: 'concurrency',
    titleId: 'Concurrency', titleEn: 'Concurrency',
    programId: 'Thread & Channel', programEn: 'Threads & Channels',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'rust',
    code: `use std::thread;
use std::sync::mpsc;
use std::sync::{Arc, Mutex};
use std::time::Duration;

fn main() {
    // Thread sederhana
    let handle = thread::spawn(|| {
        for i in 1..=5 {
            println!("Thread: {}", i);
        }
    });

    for i in 1..=3 {
        println!("Main: {}", i);
    }

    handle.join().unwrap();

    // Move closure
    let data = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        println!("Moved data: {:?}", data);
    });
    handle.join().unwrap();

    // Channel (mpsc)
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let messages = vec!["halo", "dari", "thread"];
        for msg in messages {
            tx.send(msg.to_string()).unwrap();
        }
    });

    for _ in 0..3 {
        let received = rx.recv().unwrap();
        println!("Received: {}", received);
    }

    // Arc + Mutex untuk shared state
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Counter: {}", *counter.lock().unwrap());

    // Multiple producers
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.clone();

    thread::spawn(move || {
        tx.send("from thread 1").unwrap();
    });

    thread::spawn(move || {
        tx2.send("from thread 2").unwrap();
    });

    for _ in 0..2 {
        println!("Multi-producer: {}", rx.recv().unwrap());
    }
}`,
    objectivesId: [
      'thread::spawn untuk membuat thread baru',
      'move closure untuk transfer ownership ke thread',
      'mpsc::channel untuk komunikasi antar thread',
      'Arc<Mutex<T>> untuk shared mutable state yang aman',
      'join() untuk menunggu thread selesai',
    ],
    objectivesEn: [
      'thread::spawn to create new threads',
      'move closures to transfer ownership to threads',
      'mpsc::channels for inter-thread communication',
      'Arc<Mutex<T>> for safe shared mutable state',
      'join() to wait for threads to finish',
    ],
    explanationId: '### Thread\n`thread::spawn(|| { ... })` — buat thread baru. `join()` untuk tunggu.\n\n### Move Closure\n`move ||` — transfer ownership variabel ke closure/thread.\n\n### Channel\n`mpsc::channel()` — multiple producer, single consumer. `send()` dan `recv()`.\n\n### Arc<Mutex<T>>\n`Arc` untuk shared ownership, `Mutex` untuk mutual exclusion. `lock()` untuk akses.\n\n### Thread Safety\nRust menjamin thread safety di compile time dengan Send dan Sync trait.',
    explanationEn: '### Threads\n`thread::spawn()` creates new threads. `join()` waits for completion.\n\n### Move Closures\nTransfer ownership to threads with `move`.\n\n### Channels\n`mpsc::channel()` for message passing between threads.\n\n### Arc<Mutex<T>>\nShared ownership with Arc, mutual exclusion with Mutex.\n\n### Thread Safety\nRust guarantees thread safety at compile time via Send and Sync traits.',
    experimentsId: [
      'Buat thread pool sederhana',
      'Eksperimen dengan channel timeout',
      'Coba deadlock dengan nested Mutex lock',
      'Buat producer-consumer pattern',
      'Eksperimen dengan scoped threads',
    ],
    experimentsEn: [
      'Create simple thread pool',
      'Experiment with channel timeouts',
      'Try deadlock with nested Mutex locks',
      'Create producer-consumer pattern',
      'Experiment with scoped threads',
    ],
    challengeId: 'Buat web crawler concurrent: fetch multiple URLs secara paralel dengan thread + channel. Batasi concurrency.',
    challengeEn: 'Build a concurrent web crawler: fetch multiple URLs in parallel with threads + channels. Limit concurrency.',
    summaryId: 'Minggu 12 dari 14: **Concurrency** (Level: Lanjutan). Fearless concurrency ala Rust. Minggu depan: **Macros**.',
    summaryEn: 'Week 12 of 14: **Concurrency** (Level: Advanced). Rust\'s fearless concurrency. Next week: **Macros**.',
  },
  {
    week: 13, level: 'advanced', topicId: 'macros',
    titleId: 'Macros', titleEn: 'Macros',
    programId: 'Metaprogramming', programEn: 'Metaprogramming',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'rust',
    code: `// Declarative macro (macro_rules!)
macro_rules! say_hello {
    () => {
        println!("Halo dari macro!");
    };
}

macro_rules! create_function {
    ($func_name:ident) => {
        fn $func_name() {
            println!("Fungsi {} dipanggil", stringify!($func_name));
        }
    };
}

macro_rules! calculate {
    ($a:expr + $b:expr) => {
        $a + $b
    };
    ($a:expr * $b:expr) => {
        $a * $b
    };
}

// Vec! macro
macro_rules! my_vec {
    ($($x:expr),*) => {
        {
            let mut temp_vec = Vec::new();
            $(temp_vec.push($x);)*
            temp_vec
        }
    };
}

// Custom derive (konseptual)
// #[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl std::fmt::Debug for Point {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Point {{ x: {}, y: {} }}", self.x, self.y)
    }
}

fn main() {
    // Panggil macro
    say_hello!();

    // Macro buat fungsi
    create_function!(foo);
    foo();

    // Calculate macro
    let sum = calculate!(5 + 3);
    let product = calculate!(4 * 7);
    println!("5 + 3 = {}", sum);
    println!("4 * 7 = {}", product);

    // Vec macro
    let v = my_vec![1, 2, 3, 4, 5];
    println!("my_vec: {:?}", v);

    // Debug
    let p = Point { x: 10, y: 20 };
    println!("{:?}", p);

    // format! macro
    let s = format!("x={}, y={}", p.x, p.y);
    println!("format!: {}", s);

    // println! dan print!
    println!("println! dengan {} argumen", 2);
    print!("print! tanpa newline");
    println!();

    // stringify! dan concat!
    let ident = stringify!(hello_world);
    println!("stringify!: {}", ident);

    // include_str! (konseptual)
    // let content = include_str!("file.txt");
}`,
    objectivesId: [
      'macro_rules! untuk declarative macro',
      'Pattern matching pada macro: $expr, $ident, $ty',
      'Repetition: $(...)* untuk handle multiple argumen',
      'Custom derive macro (konseptual)',
      'Macro built-in: format!, println!, vec!, include_str!',
    ],
    objectivesEn: [
      'macro_rules! for declarative macros',
      'Pattern matching in macros: $expr, $ident, $ty',
      'Repetition: $(...)* for multiple arguments',
      'Custom derive macros (conceptual)',
      'Built-in macros: format!, println!, vec!, include_str!',
    ],
    explanationId: '### Declarative Macro\n`macro_rules!` — pattern matching untuk generate kode.\n\n### Fragment Specifier\n`$expr:expr` expression, `$ident:ident` identifier, `$ty:ty` type.\n\n### Repetition\n`$(...),*` — ulangi pattern, dipisahkan koma.\n\n### Custom Derive\n`#[derive(Debug)]` — auto-generate trait implementation.\n\n### Built-in Macro\n`format!`, `println!`, `vec!`, `include_str!` — macro standar Rust.',
    explanationEn: '### Declarative Macros\n`macro_rules!` for code generation via pattern matching.\n\n### Fragment Specifiers\n`$expr`, `$ident`, `$ty` for different token types.\n\n### Repetition\n`$(...),*` for repeating patterns.\n\n### Custom Derive\nAuto-generate trait implementations.\n\n### Built-in Macros\nStandard library macros for common tasks.',
    experimentsId: [
      'Buat macro untuk generate struct',
      'Eksperimen dengan macro untuk DSL',
      'Coba macro dengan multiple pattern arms',
      'Buat macro untuk generate test',
      'Eksperimen dengan macro untuk logging',
    ],
    experimentsEn: [
      'Create macro to generate structs',
      'Experiment with macros for DSL',
      'Try macro with multiple pattern arms',
      'Create macro to generate tests',
      'Experiment with macros for logging',
    ],
    challengeId: 'Buat macro untuk generate builder pattern: builder_struct!(Name, field1: Type1, field2: Type2). Generate struct + impl + build method.',
    challengeEn: 'Create macro to generate builder pattern: builder_struct!(Name, field1: Type1, field2: Type2). Generate struct + impl + build method.',
    summaryId: 'Minggu 13 dari 14: **Macros** (Level: Lanjutan). Metaprogramming di Rust. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 13 of 14: **Macros** (Level: Advanced). Metaprogramming in Rust. Next week: **Capstone Project**!',
  },
  {
    week: 14, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: CLI + Library', titleEn: 'Capstone: CLI + Library',
    programId: 'Manajemen Catatan', programEn: 'Note Manager',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'rust',
    code: `use std::fmt;

#[derive(Debug, Clone)]
struct Note {
    id: u32,
    title: String,
    content: String,
}

impl fmt::Display for Note {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}. {}\n   {}", self.id, self.title, self.content)
    }
}

struct NoteManager {
    notes: Vec<Note>,
    next_id: u32,
}

impl NoteManager {
    fn new() -> Self {
        NoteManager { notes: Vec::new(), next_id: 1 }
    }

    fn add(&mut self, title: &str, content: &str) -> Note {
        let note = Note {
            id: self.next_id,
            title: title.to_string(),
            content: content.to_string(),
        };
        self.next_id += 1;
        self.notes.push(note.clone());
        note
    }

    fn get(&self, id: u32) -> Option<&Note> {
        self.notes.iter().find(|n| n.id == id)
    }

    fn delete(&mut self, id: u32) -> bool {
        if let Some(pos) = self.notes.iter().position(|n| n.id == id) {
            self.notes.remove(pos);
            true
        } else {
            false
        }
    }

    fn list(&self) -> &[Note] {
        &self.notes
    }

    fn search(&self, query: &str) -> Vec<&Note> {
        self.notes
            .iter()
            .filter(|n| n.title.contains(query) || n.content.contains(query))
            .collect()
    }
}

fn main() {
    let mut nm = NoteManager::new();

    nm.add("Belajar Rust", "Ownership, borrowing, lifetimes");
    nm.add("Trait & Generics", "Polimorfisme dan reusable code");
    nm.add("Concurrency", "Thread, channel, Arc<Mutex<T>>");

    println!("=== Daftar Catatan ===");
    for note in nm.list() {
        println!("{}", note);
    }

    println!("\n=== Cari: 'Rust' ===");
    for note in nm.search("Rust") {
        println!("{}", note);
    }

    println!("\n=== Get ID 2 ===");
    if let Some(note) = nm.get(2) {
        println!("{}", note);
    }

    println!("\n=== Delete ID 1 ===");
    if nm.delete(1) {
        println!("Catatan 1 dihapus");
    }

    println!("\n=== Daftar Akhir ===");
    for note in nm.list() {
        println!("{}", note);
    }

    println!("\n=== CLI Simulation ===");
    println!("cargo run -- add 'Judul Baru' 'Konten'");
    println!("cargo run -- list");
    println!("cargo run -- search 'query'");
    println!("cargo run -- delete 1");
}`,
    objectivesId: [
      'Menggabungkan semua konsep: struct, enum, trait, generics, error handling',
      'Repository pattern: pemisahan data access dan business logic',
      'CLI dengan argument parsing',
      'Search dan filter dengan iterator',
      'Testing: unit test, integration test',
    ],
    objectivesEn: [
      'Combine all concepts: structs, enums, traits, generics, error handling',
      'Repository pattern: separate data access and business logic',
      'CLI with argument parsing',
      'Search and filter with iterators',
      'Testing: unit tests, integration tests',
    ],
    explanationId: '### Repository Pattern\nPemisahan data access dan business logic.\n\n### Iterator & Filter\n`iter().filter().collect()` untuk search.\n\n### CLI\n`std::env::args()` untuk argument parsing.\n\n### Testing\nUnit test, integration test, doc test.\n\n### Error Handling\nResult, Option, custom error type.',
    explanationEn: '### Repository Pattern\nSeparate data access from business logic.\n\n### Iterators & Filter\nSearch with iterator combinators.\n\n### CLI\nArgument parsing with std::env::args().\n\n### Testing\nUnit, integration, and doc tests.\n\n### Error Handling\nResult, Option, custom errors.',
    experimentsId: [
      'Tambah method update untuk NoteManager',
      'Implementasikan save/load dari file JSON',
      'Buat CLI dengan clap crate',
      'Tambah unit test untuk semua method',
      'Implementasikan error handling dengan custom error',
    ],
    experimentsEn: [
      'Add update method for NoteManager',
      'Implement save/load from JSON file',
      'Create CLI with clap crate',
      'Add unit tests for all methods',
      'Implement error handling with custom errors',
    ],
    challengeId: 'Buat aplikasi capstone lengkap: CLI + library + JSON storage + testing. Pilih domain: Task Manager, Blog, atau Inventory.',
    challengeEn: 'Build a complete capstone application: CLI + library + JSON storage + testing. Choose domain: Task Manager, Blog, or Inventory.',
    summaryId: 'Minggu 14 dari 14: **Capstone: CLI + Library** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Rust dari nol hingga production-ready.',
    summaryEn: 'Week 14 of 14: **Capstone: CLI + Library** (Level: Advanced). Complete! 🎉 You\'ve mastered Rust from scratch to production-ready.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
