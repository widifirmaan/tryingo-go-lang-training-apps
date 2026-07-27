import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'public', 'data', 'course', 'rust');

const weeks = [
  { w: 1, f: 'pengenalan-rust', lid: 'Pengenalan Rust & Toolchain', len: 'Introduction to Rust & Toolchain', cid: 'Halo Rust' },
  { w: 2, f: 'kontrol-ownership', lid: 'Control Flow & Konsep Ownership', len: 'Control Flow & Ownership Concept', cid: 'Alur & Kepemilikan' },
  { w: 3, f: 'borrowing-slice', lid: 'Borrowing, Referensi & Slice', len: 'Borrowing, References & Slices', cid: 'Pinjaman & Irisan' },
  { w: 4, f: 'struct-method', lid: 'Struct, Method & Associated Function', len: 'Structs, Methods & Associated Functions', cid: 'Data & Perilaku' },
  { w: 5, f: 'enum-pattern', lid: 'Enum & Pattern Matching', len: 'Enums & Pattern Matching', cid: 'Pencocokan Pola' },
  { w: 6, f: 'koleksi-error', lid: 'Koleksi (Vec, String, HashMap) & Error Handling', len: 'Collections (Vec, String, HashMap) & Error Handling', cid: 'Koleksi & Error' },
  { w: 7, f: 'module-test', lid: 'Module, Crate & Testing', len: 'Modules, Crates & Testing', cid: 'Organisasi Kode' },
  { w: 8, f: 'generics-trait', lid: 'Generics & Trait', len: 'Generics & Traits', cid: 'Kode Generik' },
  { w: 9, f: 'closure-iterator', lid: 'Closure & Iterator', len: 'Closures & Iterators', cid: 'Gaya Fungsional' },
  { w: 10, f: 'cli-project', lid: 'Proyek CLI: Alat Baris Perintah', len: 'CLI Project: Command-Line Tool', cid: 'CLI App' },
  { w: 11, f: 'smart-pointer', lid: 'Smart Pointer: Box, Rc, RefCell', len: 'Smart Pointers: Box, Rc, RefCell', cid: 'Manajemen Memori' },
  { w: 12, f: 'concurrency', lid: 'Concurrency: Thread, Arc, Mutex', len: 'Concurrency: Thread, Arc, Mutex', cid: 'Parallel' },
  { w: 13, f: 'unsafe-macro', lid: 'Unsafe Rust & Macro', len: 'Unsafe Rust & Macros', cid: 'Unsafe' },
  { w: 14, f: 'async-final', lid: 'Async/Await & Proyek Akhir', len: 'Async/Await & Final Project', cid: 'Async Final' },
];

const levels = {
  beginer: { nid: 'Pemula', nen: 'Beginner', first: 1, last: 6 },
  intermediate: { nid: 'Menengah', nen: 'Intermediate', first: 7, last: 10 },
  advanced: { nid: 'Lanjutan', nen: 'Advanced', first: 11, last: 14 },
};

function getLevel(weekNum) {
  for (const [lv, info] of Object.entries(levels)) {
    if (weekNum >= info.first && weekNum <= info.last) return lv;
  }
  return 'beginer';
}

// ── Content: Objectives ──

const OBJ = {
  1: { id: ['Memahami toolchain Rust: rustup, cargo, rustc', 'Menulis program pertama dengan fn main() dan println!', 'Mendeklarasikan variabel dengan let dan let mut', 'Mengenal tipe dasar: i32, f64, bool, char', 'Menerapkan shadowing dan konstanta'], en: ['Understand the Rust toolchain: rustup, cargo, rustc', 'Write your first program with fn main() and println!', 'Declare variables with let and let mut', 'Learn basic types: i32, f64, bool, char', 'Apply shadowing and constants'] },
  2: { id: ['Menggunakan if/else untuk percabangan', 'Menerapkan loop, while, dan for untuk perulangan', 'Memahami konsep ownership: move semantics', 'Membedakan String dan &str', 'Menggunakan match sederhana pada integer'], en: ['Use if/else for branching', 'Apply loop, while, and for for iteration', 'Understand ownership concept: move semantics', 'Distinguish String and &str', 'Use basic match on integers'] },
  3: { id: ['Membuat referensi shared dengan &T', 'Menggunakan mutable reference &mut T', 'Memahami aturan borrowing Rust', 'Menggunakan slice &[T] dan &str', 'Mencegah dangling reference di compile time'], en: ['Create shared references with &T', 'Use mutable references &mut T', 'Understand Rust borrowing rules', 'Use slices &[T] and &str', 'Prevent dangling references at compile time'] },
  4: { id: ['Mendefinisikan struct dengan named fields', 'Mengimplementasikan method dalam impl block', 'Menggunakan &self dan &mut self', 'Membuat associated function (constructor pattern)', 'Mengenal tuple struct'], en: ['Define structs with named fields', 'Implement methods in impl blocks', 'Use &self and &mut self', 'Create associated functions (constructor pattern)', 'Learn about tuple structs'] },
  5: { id: ['Mendefinisikan enum dengan varian yang membawa data', 'Menggunakan match dengan exhaustiveness checking', 'Menerapkan if let untuk pencocokan singkat', 'Menggunakan Option<T> (Some, None)', 'Menulis kode yang aman tanpa null pointer'], en: ['Define enums with data-carrying variants', 'Use match with exhaustiveness checking', 'Apply if let for concise matching', 'Use Option<T> (Some, None)', 'Write safe code without null pointers'] },
  6: { id: ['Menggunakan Vec<T>: push, pop, iterasi, indexing', 'Memanipulasi String: push_str, format!, concatenation', 'Menggunakan HashMap: insert, get, entry API', 'Menangani error dengan Result<T, E>: Ok, Err', 'Menggunakan unwrap, expect, dan operator ?'], en: ['Use Vec<T>: push, pop, iteration, indexing', 'Manipulate String: push_str, format!, concatenation', 'Use HashMap: insert, get, entry API', 'Handle errors with Result<T, E>: Ok, Err', 'Use unwrap, expect, and the ? operator'] },
  7: { id: ['Membuat hierarki module dengan mod dan pub', 'Mengimpor path dengan use dan super', 'Menulis unit test dengan #[test] dan assert_eq!', 'Menggunakan #[cfg(test)] untuk test module', 'Menulis dokumentasi dengan komentar ///'], en: ['Create module hierarchy with mod and pub', 'Import paths with use and super', 'Write unit tests with #[test] and assert_eq!', 'Use #[cfg(test)] for test modules', 'Write documentation with /// comments'] },
  8: { id: ['Membuat fungsi generik dengan parameter tipe <T>', 'Mendefinisikan struct generik', 'Membuat trait dengan method', 'Mengimplementasikan trait untuk tipe kustom', 'Menggunakan trait bounds dan derive attributes'], en: ['Create generic functions with type parameter <T>', 'Define generic structs', 'Create traits with methods', 'Implement traits for custom types', 'Use trait bounds and derive attributes'] },
  9: { id: ['Membuat closure dengan sintaks |args| body', 'Memahami environment capture oleh closure', 'Menggunakan Iterator trait: next, map, filter', 'Menerapkan collect dan fold untuk agregasi', 'Menggabungkan iterator adapter secara berantai'], en: ['Create closures with |args| body syntax', 'Understand environment capture by closures', 'Use Iterator trait: next, map, filter', 'Apply collect and fold for aggregation', 'Chain iterator adapters together'] },
  10: { id: ['Membaca argumen command line dengan std::env::args', 'Membaca file dengan std::fs::read_to_string', 'Menulis output ke stdout dan stderr', 'Menangani error dengan operator ? di aplikasi nyata', 'Membangun alat grep sederhana'], en: ['Read command-line arguments with std::env::args', 'Read files with std::fs::read_to_string', 'Write output to stdout and stderr', 'Handle errors with ? operator in real applications', 'Build a simple grep-like tool'] },
  11: { id: ['Menggunakan Box<T> untuk alokasi heap', 'Membuat tipe rekursif dengan Box', 'Menerapkan Rc<T> untuk reference counting', 'Menggunakan RefCell<T> untuk interior mutability', 'Memahami trait Drop untuk cleanup'], en: ['Use Box<T> for heap allocation', 'Create recursive types with Box', 'Apply Rc<T> for reference counting', 'Use RefCell<T> for interior mutability', 'Understand the Drop trait for cleanup'] },
  12: { id: ['Membuat thread dengan thread::spawn dan JoinHandle', 'Menggunakan closure move dengan thread', 'Menerapkan Arc<T> untuk atomic reference counting', 'Menggunakan Mutex<T> untuk mutual exclusion', 'Mengirim pesan dengan mpsc::channel'], en: ['Create threads with thread::spawn and JoinHandle', 'Use move closures with threads', 'Apply Arc<T> for atomic reference counting', 'Use Mutex<T> for mutual exclusion', 'Send messages with mpsc::channel'] },
  13: { id: ['Memahami blok dan fungsi unsafe', 'Menggunakan raw pointer *const T dan *mut T', 'Mengetahui unsafe superpowers (dereference, FFI)', 'Membuat deklaratif macro dengan macro_rules!', 'Menulis macro sederhana untuk code generation'], en: ['Understand unsafe blocks and functions', 'Use raw pointers *const T and *mut T', 'Know unsafe superpowers (dereference, FFI)', 'Create declarative macros with macro_rules!', 'Write simple macros for code generation'] },
  14: { id: ['Mendefinisikan async function dan menggunakan .await', 'Menggunakan tokio runtime dengan #[tokio::main]', 'Menjalankan tugas konkuren dengan tokio::spawn', 'Menggunakan tokio::time::sleep untuk delay async', 'Membangun concurrent task runner sebagai proyek akhir'], en: ['Define async functions and use .await', 'Use the tokio runtime with #[tokio::main]', 'Run concurrent tasks with tokio::spawn', 'Use tokio::time::sleep for async delay', 'Build a concurrent task runner as final project'] },
};

// ── Content: Code (ID) ──

const CODE_ID = {
  1: `fn main() {
    println!("Selamat datang di Rust!");
    println!("Program Rust pertama Anda.");

    let nama: &str = "Rustacean";
    let mut usia: i32 = 25;
    let tinggi: f64 = 175.5;
    let aktif: bool = true;
    let inisial: char = 'R';

    println!("Nama: {}", nama);
    println!("Usia: {}", usia);
    println!("Tinggi: {} cm", tinggi);
    println!("Aktif: {}", aktif);
    println!("Inisial: {}", inisial);

    usia += 1;
    println!("Tahun depan usia: {}", usia);

    let x = 5;
    let x = x + 2;
    println!("Shadowing x: {}", x);

    const VERSI: &str = "1.82";
    println!("Versi Rust: {}", VERSI);
}`,

  2: `fn main() {
    let nilai = 85;
    if nilai >= 90 {
        println!("Grade: A");
    } else if nilai >= 75 {
        println!("Grade: B");
    } else {
        println!("Grade: C");
    }

    let mut count = 0;
    loop {
        count += 1;
        print!("loop{} ", count);
        if count >= 3 {
            break;
        }
    }
    println!();

    for i in 0..3 {
        print!("for{} ", i);
    }
    println!();

    let s1 = String::from("halo");
    let s2 = s1;
    println!("s2: {}", s2);

    let angka = 2;
    match angka {
        1 => println!("satu"),
        2 => println!("dua"),
        _ => println!("lainnya"),
    }
}`,

  3: `fn main() {
    let s = String::from("halo dunia");
    let len = panjang(&s);
    println!("'{}' panjang: {}", s, len);

    let mut teks = String::from("Rust");
    tambah(&mut teks);
    println!("{}", teks);

    let arr = [1, 2, 3, 4, 5];
    let potong = &arr[1..4];
    println!("Slice array: {:?}", potong);

    let kata = String::from("pemrograman");
    let potong_str = &kata[0..5];
    println!("Slice string: {}", potong_str);
}

fn panjang(s: &str) -> usize {
    s.len()
}

fn tambah(s: &mut String) {
    s.push_str(" hebat");
}`,

  4: `struct Buku {
    judul: String,
    penulis: String,
    tahun: u32,
}

impl Buku {
    fn baru(judul: &str, penulis: &str, tahun: u32) -> Buku {
        Buku {
            judul: String::from(judul),
            penulis: String::from(penulis),
            tahun,
        }
    }

    fn info(&self) -> String {
        format!("{} oleh {} ({})", self.judul, self.penulis, self.tahun)
    }

    fn terbitkan(&mut self, tahun_baru: u32) {
        self.tahun = tahun_baru;
    }
}

struct Warna(u8, u8, u8);

fn main() {
    let mut buku = Buku::baru("Pemrograman Rust", "Anna", 2024);
    println!("{}", buku.info());

    buku.terbitkan(2025);
    println!("Setelah revisi: {}", buku.info());

    let hitam = Warna(0, 0, 0);
    println!("Warna hitam: RGB({}, {}, {})", hitam.0, hitam.1, hitam.2);
}`,

  5: `enum Pesan {
    Teks(String),
    Koordinat(i32, i32),
    Diam,
}

fn main() {
    let daftar = vec![
        Pesan::Teks(String::from("halo dunia")),
        Pesan::Koordinat(10, 20),
        Pesan::Diam,
    ];

    for p in &daftar {
        match p {
            Pesan::Teks(t) => println!("Teks: {}", t),
            Pesan::Koordinat(x, y) => println!("Posisi: ({}, {})", x, y),
            Pesan::Diam => println!("diam..."),
        }
    }

    let angka: Option<i32> = Some(42);
    if let Some(n) = angka {
        println!("Angka dalam Option: {}", n);
    }

    let kosong: Option<i32> = None;
    println!("Nilai default: {}", kosong.unwrap_or(0));
}`,

  6: `use std::collections::HashMap;

fn bagi(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("tidak bisa membagi dengan nol"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let mut angka: Vec<i32> = vec![1, 2, 3];
    angka.push(4);
    println!("Vec: {:?}", angka);
    if let Some(akhir) = angka.pop() {
        println!("Pop: {}", akhir);
    }

    let mut s = String::from("Halo");
    s.push_str(" Rust");
    println!("String: {}", s);
    let gabung = format!("{} {}!", s, "hebat");
    println!("Format: {}", gabung);

    let mut map = HashMap::new();
    map.insert("nama", "Alice");
    map.insert("kota", "Jakarta");
    println!("Map entry: {:?}", map.get("nama"));

    match bagi(10.0, 2.0) {
        Ok(h) => println!("10 / 2 = {}", h),
        Err(e) => println!("Error: {}", e),
    }
    match bagi(1.0, 0.0) {
        Ok(_) => {}
        Err(e) => println!("Error: {}", e),
    }

    let hasil = bagi(8.0, 4.0).unwrap();
    println!("8 / 4 = {}", hasil);

    let parsed = "42".parse::<i32>().expect("gagal parse");
    println!("Parsed: {}", parsed);
}`,

  7: `/// Modul utilitas berisi fungsi-fungsi bantuan
mod utils {
    /// Modul operasi matematika
    pub mod math {
        pub fn tambah(a: i32, b: i32) -> i32 { a + b }
        pub fn kali(a: i32, b: i32) -> i32 { a * b }
    }

    /// Modul manipulasi string
    pub mod str_utils {
        pub fn sapa(nama: &str) -> String { format!("Halo, {}!", nama) }
    }
}

use utils::math;
use utils::str_utils;

fn main() {
    println!("3 + 4 = {}", math::tambah(3, 4));
    println!("5 * 6 = {}", math::kali(5, 6));
    println!("{}", str_utils::sapa("Budi"));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_tambah() {
        assert_eq!(math::tambah(2, 3), 5);
    }

    #[test]
    fn test_kali() {
        assert_eq!(math::kali(4, 5), 20);
    }

    #[test]
    fn test_sapa() {
        assert_eq!(str_utils::sapa("Budi"), "Halo, Budi!");
    }
}`,

  8: `use std::fmt::Debug;

#[derive(Debug, Clone, PartialEq)]
struct Titik<T> {
    x: T,
    y: T,
}

impl<T: Debug> Titik<T> {
    fn baru(x: T, y: T) -> Titik<T> {
        Titik { x, y }
    }
}

trait Luas {
    fn luas(&self) -> f64;
}

struct Lingkaran { r: f64 }

impl Luas for Lingkaran {
    fn luas(&self) -> f64 { 3.14159 * self.r * self.r }
}

struct Persegi { s: f64 }

impl Luas for Persegi {
    fn luas(&self) -> f64 { self.s * self.s }
}

fn cetak_luas<T: Luas>(b: &T) {
    println!("Luas: {}", b.luas());
}

fn main() {
    let t = Titik::baru(3, 4);
    println!("Titik: {:?}", t);
    println!("Clone: {:?}", t.clone());
    println!("Equal: {}", t == Titik::baru(3, 4));

    let lingkaran = Lingkaran { r: 5.0 };
    let persegi = Persegi { s: 4.0 };
    cetak_luas(&lingkaran);
    cetak_luas(&persegi);
}`,

  9: `fn main() {
    let tambah = |a: i32, b: i32| a + b;
    println!("5 + 3 = {}", tambah(5, 3));

    let faktor = 3;
    let kali = |n: i32| n * faktor;
    println!("4 * 3 = {}", kali(4));

    let angka = vec![1, 2, 3, 4, 5, 6];
    let genap: Vec<i32> = angka.iter()
        .filter(|&&x| x % 2 == 0)
        .copied()
        .collect();
    println!("Genap: {:?}", genap);

    let kuadrat: Vec<i32> = angka.iter()
        .map(|&x| x * x)
        .collect();
    println!("Kuadrat: {:?}", kuadrat);

    let jumlah: i32 = angka.iter()
        .fold(0, |acc, &x| acc + x);
    println!("Jumlah: {}", jumlah);

    let mut counter = 0;
    let mut increment = || { counter += 1; counter };
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
}`,

  10: `use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let perintah = args.get(1).map(|s| s.as_str()).unwrap_or("help");

    match perintah {
        "grep" => cmd_grep(args.get(2)),
        "hello" => cmd_hello(args.get(2)),
        _ => bantuan(),
    }
}

fn bantuan() {
    eprintln!("Usage: cli <command> [args]");
    eprintln!("Commands:");
    eprintln!("  grep <pola>  - Cari teks dalam konten (simulasi)");
    eprintln!("  hello <nama> - Sapa pengguna");
}

fn cmd_grep(pola: Option<&String>) {
    let pola = pola.map(|s| s.as_str()).unwrap_or("Rust");
    let konten = "\
Rust adalah bahasa systems programming.
Belajar Rust itu menyenangkan.
Go juga bahasa yang bagus.";

    for (i, baris) in konten.lines().enumerate() {
        if baris.contains(pola) {
            println!("{}: {}", i + 1, baris);
        }
    }
}

fn cmd_hello(nama: Option<&String>) {
    let nama = nama.map(|s| s.as_str()).unwrap_or("Dunia");
    println!("Halo, {}! Selamat belajar Rust CLI!", nama);
}`,

  11: `use std::rc::Rc;
use std::cell::RefCell;

struct Node {
    nama: String,
    children: Vec<Rc<RefCell<Node>>>,
}

impl Node {
    fn baru(nama: &str) -> Rc<RefCell<Node>> {
        Rc::new(RefCell::new(Node {
            nama: String::from(nama),
            children: vec![],
        }))
    }

    fn tambah_anak(parent: &Rc<RefCell<Node>>, child: Rc<RefCell<Node>>) {
        parent.borrow_mut().children.push(child);
    }
}

fn main() {
    let root = Node::baru("root");
    let a = Node::baru("A");
    let b = Node::baru("B");

    Node::tambah_anak(&root, a);
    Node::tambah_anak(&root, b);

    println!("Jumlah anak node root: {}", root.borrow().children.len());
    println!("Reference count root: {}", Rc::strong_count(&root));

    let data = RefCell::new(42);
    *data.borrow_mut() += 10;
    println!("Nilai RefCell: {}", data.borrow());
}

impl Drop for Node {
    fn drop(&mut self) {
        println!("Drop node: {}", self.nama);
    }
}`,

  12: `use std::sync::{Arc, Mutex, mpsc};
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..=3 {
            println!("Thread anak: {}", i);
            thread::sleep(Duration::from_millis(10));
        }
    });
    handle.join().unwrap();

    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let c = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = c.lock().unwrap();
            *num += 1;
        }));
    }

    for h in handles {
        h.join().unwrap();
    }
    println!("Counter final: {}", *counter.lock().unwrap());

    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        let pesan = String::from("Halo dari thread!");
        tx.send(pesan).unwrap();
    });

    let terima = rx.recv().unwrap();
    println!("Pesan diterima: {}", terima);
}`,

  13: `macro_rules! halo {
    ($nama:expr) => {
        println!("Halo, {}!", $nama);
    };
    ($nama:expr, $tahun:expr) => {
        println!("Halo, {}! Tahun {}", $nama, $tahun);
    };
}

fn main() {
    halo!("Dunia");
    halo!("Rustacean", 2025);

    let mut x = 42;
    let r1: *const i32 = &x as *const i32;
    let r2: *mut i32 = &mut x as *mut i32;

    unsafe {
        println!("Nilai dari raw pointer: {}", *r1);
        *r2 = 100;
        println!("Setelah unsafe write: {}", *r2);
    }

    println!("Nilai x final: {}", x);

    let arr = [10, 20, 30, 40, 50];
    let p = arr.as_ptr();
    unsafe {
        for i in 0..3 {
            println!("arr[{}] = {}", i, *p.add(i));
        }
    }
}`,

  14: `use tokio::time::{sleep, Duration};

struct Tugas {
    id: u32,
    nama: String,
}

async fn jalankan_tugas(tugas: Tugas) -> String {
    println!("Mulai: {} (ID {})", tugas.nama, tugas.id);
    sleep(Duration::from_millis(50)).await;
    format!("Selesai: {} (ID {})", tugas.nama, tugas.id)
}

#[tokio::main]
async fn main() {
    println!("=== Concurrent Task Runner ===");

    let t1 = tokio::spawn(jalankan_tugas(Tugas {
        id: 1,
        nama: String::from("Download data"),
    }));
    let t2 = tokio::spawn(jalankan_tugas(Tugas {
        id: 2,
        nama: String::from("Proses data"),
    }));
    let t3 = tokio::spawn(jalankan_tugas(Tugas {
        id: 3,
        nama: String::from("Simpan hasil"),
    }));

    println!("{}", t1.await.unwrap());
    println!("{}", t2.await.unwrap());
    println!("{}", t3.await.unwrap());

    println!("=== Semua tugas selesai! ===");
}`,
};

// ── Content: Code (EN) ──

const CODE_EN = {
  1: `fn main() {
    println!("Welcome to Rust!");
    println!("Your first Rust program.");

    let name: &str = "Rustacean";
    let mut age: i32 = 25;
    let height: f64 = 175.5;
    let active: bool = true;
    let initial: char = 'R';

    println!("Name: {}", name);
    println!("Age: {}", age);
    println!("Height: {} cm", height);
    println!("Active: {}", active);
    println!("Initial: {}", initial);

    age += 1;
    println!("Next year age: {}", age);

    let x = 5;
    let x = x + 2;
    println!("Shadowing x: {}", x);

    const VERSION: &str = "1.82";
    println!("Rust version: {}", VERSION);
}`,

  2: `fn main() {
    let score = 85;
    if score >= 90 {
        println!("Grade: A");
    } else if score >= 75 {
        println!("Grade: B");
    } else {
        println!("Grade: C");
    }

    let mut count = 0;
    loop {
        count += 1;
        print!("loop{} ", count);
        if count >= 3 {
            break;
        }
    }
    println!();

    for i in 0..3 {
        print!("for{} ", i);
    }
    println!();

    let s1 = String::from("hello");
    let s2 = s1;
    println!("s2: {}", s2);

    let num = 2;
    match num {
        1 => println!("one"),
        2 => println!("two"),
        _ => println!("other"),
    }
}`,

  3: `fn main() {
    let s = String::from("hello world");
    let len = length(&s);
    println!("'{}' length: {}", s, len);

    let mut text = String::from("Rust");
    append(&mut text);
    println!("{}", text);

    let arr = [1, 2, 3, 4, 5];
    let slice = &arr[1..4];
    println!("Array slice: {:?}", slice);

    let word = String::from("programming");
    let slice_str = &word[0..5];
    println!("String slice: {}", slice_str);
}

fn length(s: &str) -> usize {
    s.len()
}

fn append(s: &mut String) {
    s.push_str(" is great");
}`,

  4: `struct Book {
    title: String,
    author: String,
    year: u32,
}

impl Book {
    fn new(title: &str, author: &str, year: u32) -> Book {
        Book {
            title: String::from(title),
            author: String::from(author),
            year,
        }
    }

    fn info(&self) -> String {
        format!("{} by {} ({})", self.title, self.author, self.year)
    }

    fn revise(&mut self, new_year: u32) {
        self.year = new_year;
    }
}

struct Color(u8, u8, u8);

fn main() {
    let mut book = Book::new("Rust Programming", "Anna", 2024);
    println!("{}", book.info());

    book.revise(2025);
    println!("After revision: {}", book.info());

    let black = Color(0, 0, 0);
    println!("Black: RGB({}, {}, {})", black.0, black.1, black.2);
}`,

  5: `enum Message {
    Text(String),
    Coordinate(i32, i32),
    Silent,
}

fn main() {
    let list = vec![
        Message::Text(String::from("hello world")),
        Message::Coordinate(10, 20),
        Message::Silent,
    ];

    for m in &list {
        match m {
            Message::Text(t) => println!("Text: {}", t),
            Message::Coordinate(x, y) => println!("Position: ({}, {})", x, y),
            Message::Silent => println!("silent..."),
        }
    }

    let number: Option<i32> = Some(42);
    if let Some(n) = number {
        println!("Number in Option: {}", n);
    }

    let empty: Option<i32> = None;
    println!("Default value: {}", empty.unwrap_or(0));
}`,

  6: `use std::collections::HashMap;

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let mut numbers: Vec<i32> = vec![1, 2, 3];
    numbers.push(4);
    println!("Vec: {:?}", numbers);
    if let Some(last) = numbers.pop() {
        println!("Pop: {}", last);
    }

    let mut s = String::from("Hello");
    s.push_str(" Rust");
    println!("String: {}", s);
    let combined = format!("{} {}!", s, "world");
    println!("Format: {}", combined);

    let mut map = HashMap::new();
    map.insert("name", "Alice");
    map.insert("city", "Jakarta");
    println!("Map entry: {:?}", map.get("name"));

    match divide(10.0, 2.0) {
        Ok(h) => println!("10 / 2 = {}", h),
        Err(e) => println!("Error: {}", e),
    }
    match divide(1.0, 0.0) {
        Ok(_) => {}
        Err(e) => println!("Error: {}", e),
    }

    let result = divide(8.0, 4.0).unwrap();
    println!("8 / 4 = {}", result);

    let parsed = "42".parse::<i32>().expect("parse failed");
    println!("Parsed: {}", parsed);
}`,

  7: `/// Utility module containing helper functions
mod utils {
    /// Math operation module
    pub mod math {
        pub fn add(a: i32, b: i32) -> i32 { a + b }
        pub fn multiply(a: i32, b: i32) -> i32 { a * b }
    }

    /// String manipulation module
    pub mod str_utils {
        pub fn greet(name: &str) -> String { format!("Hello, {}!", name) }
    }
}

use utils::math;
use utils::str_utils;

fn main() {
    println!("3 + 4 = {}", math::add(3, 4));
    println!("5 * 6 = {}", math::multiply(5, 6));
    println!("{}", str_utils::greet("John"));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(math::add(2, 3), 5);
    }

    #[test]
    fn test_multiply() {
        assert_eq!(math::multiply(4, 5), 20);
    }

    #[test]
    fn test_greet() {
        assert_eq!(str_utils::greet("John"), "Hello, John!");
    }
}`,

  8: `use std::fmt::Debug;

#[derive(Debug, Clone, PartialEq)]
struct Point<T> {
    x: T,
    y: T,
}

impl<T: Debug> Point<T> {
    fn new(x: T, y: T) -> Point<T> {
        Point { x, y }
    }
}

trait Area {
    fn area(&self) -> f64;
}

struct Circle { r: f64 }

impl Area for Circle {
    fn area(&self) -> f64 { 3.14159 * self.r * self.r }
}

struct Square { s: f64 }

impl Area for Square {
    fn area(&self) -> f64 { self.s * self.s }
}

fn print_area<T: Area>(shape: &T) {
    println!("Area: {}", shape.area());
}

fn main() {
    let p = Point::new(3, 4);
    println!("Point: {:?}", p);
    println!("Clone: {:?}", p.clone());
    println!("Equal: {}", p == Point::new(3, 4));

    let circle = Circle { r: 5.0 };
    let square = Square { s: 4.0 };
    print_area(&circle);
    print_area(&square);
}`,

  9: `fn main() {
    let add = |a: i32, b: i32| a + b;
    println!("5 + 3 = {}", add(5, 3));

    let factor = 3;
    let multiply = |n: i32| n * factor;
    println!("4 * 3 = {}", multiply(4));

    let numbers = vec![1, 2, 3, 4, 5, 6];
    let evens: Vec<i32> = numbers.iter()
        .filter(|&&x| x % 2 == 0)
        .copied()
        .collect();
    println!("Evens: {:?}", evens);

    let squares: Vec<i32> = numbers.iter()
        .map(|&x| x * x)
        .collect();
    println!("Squares: {:?}", squares);

    let sum: i32 = numbers.iter()
        .fold(0, |acc, &x| acc + x);
    println!("Sum: {}", sum);

    let mut counter = 0;
    let mut increment = || { counter += 1; counter };
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
    println!("Counter: {}", increment());
}`,

  10: `use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let command = args.get(1).map(|s| s.as_str()).unwrap_or("help");

    match command {
        "grep" => cmd_grep(args.get(2)),
        "hello" => cmd_hello(args.get(2)),
        _ => help(),
    }
}

fn help() {
    eprintln!("Usage: cli <command> [args]");
    eprintln!("Commands:");
    eprintln!("  grep <pattern> - Search text in content (simulated)");
    eprintln!("  hello <name>   - Greet the user");
}

fn cmd_grep(pattern: Option<&String>) {
    let pattern = pattern.map(|s| s.as_str()).unwrap_or("Rust");
    let content = "\
Rust is a systems programming language.
Learning Rust is fun.
Go is also a good language.";

    for (i, line) in content.lines().enumerate() {
        if line.contains(pattern) {
            println!("{}: {}", i + 1, line);
        }
    }
}

fn cmd_hello(name: Option<&String>) {
    let name = name.map(|s| s.as_str()).unwrap_or("World");
    println!("Hello, {}! Welcome to Rust CLI!", name);
}`,

  11: `use std::rc::Rc;
use std::cell::RefCell;

struct Node {
    name: String,
    children: Vec<Rc<RefCell<Node>>>,
}

impl Node {
    fn new(name: &str) -> Rc<RefCell<Node>> {
        Rc::new(RefCell::new(Node {
            name: String::from(name),
            children: vec![],
        }))
    }

    fn add_child(parent: &Rc<RefCell<Node>>, child: Rc<RefCell<Node>>) {
        parent.borrow_mut().children.push(child);
    }
}

fn main() {
    let root = Node::new("root");
    let a = Node::new("A");
    let b = Node::new("B");

    Node::add_child(&root, a);
    Node::add_child(&root, b);

    println!("Root children count: {}", root.borrow().children.len());
    println!("Reference count root: {}", Rc::strong_count(&root));

    let data = RefCell::new(42);
    *data.borrow_mut() += 10;
    println!("RefCell value: {}", data.borrow());
}

impl Drop for Node {
    fn drop(&mut self) {
        println!("Dropping node: {}", self.name);
    }
}`,

  12: `use std::sync::{Arc, Mutex, mpsc};
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..=3 {
            println!("Child thread: {}", i);
            thread::sleep(Duration::from_millis(10));
        }
    });
    handle.join().unwrap();

    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let c = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = c.lock().unwrap();
            *num += 1;
        }));
    }

    for h in handles {
        h.join().unwrap();
    }
    println!("Final counter: {}", *counter.lock().unwrap());

    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        let msg = String::from("Hello from thread!");
        tx.send(msg).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Message received: {}", received);
}`,

  13: `macro_rules! greet {
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
    ($name:expr, $year:expr) => {
        println!("Hello, {}! Year {}", $name, $year);
    };
}

fn main() {
    greet!("World");
    greet!("Rustacean", 2025);

    let mut x = 42;
    let r1: *const i32 = &x as *const i32;
    let r2: *mut i32 = &mut x as *mut i32;

    unsafe {
        println!("Value from raw pointer: {}", *r1);
        *r2 = 100;
        println!("After unsafe write: {}", *r2);
    }

    println!("Final x value: {}", x);

    let arr = [10, 20, 30, 40, 50];
    let p = arr.as_ptr();
    unsafe {
        for i in 0..3 {
            println!("arr[{}] = {}", i, *p.add(i));
        }
    }
}`,

  14: `use tokio::time::{sleep, Duration};

struct Task {
    id: u32,
    name: String,
}

async fn run_task(task: Task) -> String {
    println!("Starting: {} (ID {})", task.name, task.id);
    sleep(Duration::from_millis(50)).await;
    format!("Completed: {} (ID {})", task.name, task.id)
}

#[tokio::main]
async fn main() {
    println!("=== Concurrent Task Runner ===");

    let t1 = tokio::spawn(run_task(Task {
        id: 1,
        name: String::from("Download data"),
    }));
    let t2 = tokio::spawn(run_task(Task {
        id: 2,
        name: String::from("Process data"),
    }));
    let t3 = tokio::spawn(run_task(Task {
        id: 3,
        name: String::from("Save results"),
    }));

    println!("{}", t1.await.unwrap());
    println!("{}", t2.await.unwrap());
    println!("{}", t3.await.unwrap());

    println!("=== All tasks completed! ===");
}`,
};

// ── Content: Explanations ──

const EXP_ID = {
  1: `### Struktur Program Rust

Setiap file .rs dimulai dengan \`fn main()\` sebagai entry point. \`println!\` adalah macro untuk mencetak teks dengan baris baru.

### Variabel dan Tipe Data

\`let\` mendeklarasikan variabel immutable. \`let mut\` untuk mutable. Rust punya type inference, tipe dasar: \`i32\`, \`f64\`, \`bool\`, \`char\`.

### Shadowing dan Konstanta

Shadowing: \`let x = 5; let x = x + 2;\` — deklarasi ulang dengan nama sama. \`const\` untuk konstanta compile-time dengan huruf besar.`,

  2: `### Control Flow

\`if/else\` untuk percabangan. \`loop\` untuk perulangan tak terbatas, \`while\` dan \`for\` untuk iterasi terkontrol.

### Ownership Dasar

Setiap nilai punya satu pemilik. \`let s2 = s1;\` memindahkan ownership — \`s1\` tidak bisa dipakai lagi. \`String\` di-heap, \`&str\` di-stack.

### Match

\`match\` pada integer: pola dicocokkan dari atas ke bawah. Wajib exhaustive.`,

  3: `### Referensi (&T dan &mut T)

\`&\` membuat referensi shared (borrow). \`&mut\` untuk mutable reference. Dua aturan: satu &mut ATAU banyak &.

### Slice

\`&arr[1..4]\` — referensi ke sebagian data. \`&str\` adalah slice dari String. Aman karena dicek di compile time.

### Dangling Reference

Compiler Rust mencegah dangling reference dengan memeriksa lifetime — referensi tidak bisa hidup lebih lama dari datanya.`,

  4: `### Struct

\`struct Buku { judul: String, penulis: String }\` — mengelompokkan field. \`impl\` untuk method. \`&self\` untuk immutable method, \`&mut self\` untuk mutable.

### Associated Function

Fungsi tanpa \`self\` — pola constructor: \`Buku::baru(...)\`. Dipanggil dengan \`::\`.

### Tuple Struct

\`struct Warna(u8, u8, u8)\` — struct dengan field tanpa nama. Diakses dengan \`warna.0\`, \`warna.1\`, dll.`,

  5: `### Enum

\`enum Pesan { Teks(String), Koordinat(i32, i32), Diam }\` — setiap varian bisa membawa data berbeda. \`match\` memeriksa exhaustiveness.

### if let

\`if let Some(n) = angka\` — pattern matching singkat untuk satu pola. Lebih ringkas dari \`match\` untuk kasus sederhana.

### Option<T>

\`Some(T)\` atau \`None\` — pengganti null yang aman. \`unwrap_or(default)\` memberikan nilai default. Tidak ada NullPointerException di Rust.`,

  6: `### Vec<T>

\`vec![]\` macro. \`push\` menambah, \`pop\` menghapus dari akhir. \`get(index)\` mengembalikan \`Option\`, aman dari out-of-bounds.

### String

\`push_str\` menambah string. \`format!\` menggabungkan dengan format. \`String\` di-heap, bisa dimodifikasi.

### HashMap

Key-value storage. \`insert\`, \`get\` mengembalikan \`Option<&V>\`. \`entry().or_insert()\` API yang powerful.

### Result<T, E>

\`Ok(T)\` untuk sukses, \`Err(E)\` untuk error. \`unwrap()\` panik jika Err. \`expect("pesan")\` dengan pesan kustom. Operator \`?\` propagasi error singkat.`,

  7: `### Module

\`mod utils { pub mod math { ... } }\` — hierarki kode. \`pub\` membuat item visible di luar module. \`use\` untuk membawa path ke scope.

### Testing

\`#[cfg(test)]\` — kode test hanya dikompilasi saat testing. \`#[test]\` menandai fungsi test. \`assert_eq!\`, \`assert!\` untuk assertions.

### Dokumentasi

\`///\` komentar dokumentasi. \`cargo doc\` generates HTML docs. Module bisa mengandung docs untuk organisasi kode.`,

  8: `### Generic

\`Titik<T>\` — struct generik dengan satu parameter tipe. \`fn cetak_luas<T: Luas>(b: &T)\` — fungsi generik dengan trait bound.

### Trait

\`trait Luas { fn luas(&self) -> f64; }\` — kumpulan method yang bisa diimplementasikan oleh berbagai tipe. Mirip interface di bahasa lain.

### Derive

\`#[derive(Debug, Clone, PartialEq)]\` — implementasi otomatis trait standar. Debug untuk formatting, Clone untuk duplikasi, PartialEq untuk perbandingan.`,

  9: `### Closure

\`|a, b| a + b\` — fungsi anonim yang bisa menangkap lingkungan sekitar. \`|n| n * faktor\` — menangkap \`faktor\` dari scope luar. Tiga jenis: \`Fn\`, \`FnMut\`, \`FnOnce\`.

### Iterator

\`.iter()\` membuat iterator. \`filter()\` menyaring, \`map()\` mentransformasi, \`fold()\` mengakumulasi, \`collect()\` mengumpulkan. Semua lazy — dieksekusi saat \`collect\` dipanggil.

### For Loop

\`for x in vec.iter()\` — desugaring dari \`into_iter().next()\`. Setiap koleksi bisa di-loop.`,

  10: `### Command-Line Arguments

\`env::args()\` mengembalikan iterator. \`args[0]\` nama program. \`match\` untuk routing perintah. Pattern umum CLI Rust.

### File I/O (Simulasi)

\`fs::read_to_string\` membaca file. \`? operator\` untuk error propagation. Di kode ini, konten di-hardcode untuk demonstrasi.

### Stderr

\`eprintln!\` mencetak ke stderr — untuk pesan error dan usage. \`println!\` ke stdout untuk output normal.`,

  11: `### Box<T>

\`Box::new()\` — alokasi heap. Esensial untuk tipe rekursif dan data besar. \`Deref\` trait memungkinkan penggunaan seperti referensi biasa.

### Rc<T>

\`Rc\` — Reference Counting untuk multiple ownership di single thread. \`clone()\` increment reference counter. \`strong_count()\` untuk melihat jumlah referensi.

### RefCell<T>

Interior mutability: mutasi melalui referensi immutable. \`borrow()\` dan \`borrow_mut()\` dengan runtime check. Panik jika aturan borrowing dilanggar di runtime.

### Drop

\`Drop\` trait — cleanup saat nilai keluar scope. \`drop()\` dipanggil otomatis. Berguna untuk resource management.`,

  12: `### Thread

\`thread::spawn(|| { ... })\` — membuat OS thread baru. \`JoinHandle::join()\` menunggu thread selesai. \`move\` untuk memindahkan ownership ke closure thread.

### Arc<T>

\`Arc\` — Atomic Reference Counting. Thread-safe version of Rc. \`Arc::clone()\` untuk sharing data antar thread.

### Mutex<T>

\`lock()\` — mutual exclusion. Hanya satu thread bisa mengakses data pada satu waktu. \`unwrap()\` karena lock bisa poison.

### Channel

\`mpsc::channel()\` — Multiple Producer, Single Consumer. \`send()\` mengirim, \`recv()\` menerima. Cloning tx untuk multiple producers.`,

  13: `### Unsafe

\`unsafe {}\` — blok untuk operasi yang Rust tidak bisa jamin safety. Superpowers: dereference raw pointer, panggil FFI, akses union, inline assembly.

### Raw Pointer

\`*const T\` (immutable) dan \`*mut T\` (mutable). Bisa null, dangling, alias. Hanya bisa di-dereference di dalam unsafe block.

### Macro

\`macro_rules!\` — declarative macro untuk code generation. Pola \`$nama:expr\` mencocokkan expression. Berguna untuk mengurangi boilerplate.`,

  14: `### Async/Await

\`async fn\` mengembalikan Future. \`.await\` menunggu hasil tanpa blocking thread. \`tokio::spawn\` menjalankan task secara konkuren.

### Tokio Runtime

\`#[tokio::main]\` — macro yang setup async runtime. \`tokio::time::sleep\` — delay async yang tidak blocking thread.

### Concurrent Task Runner

\`tokio::spawn\` — multiple task berjalan konkuren. \`await\` mengumpulkan hasil. Pola dasar aplikasi async production.`,

};

const EXP_EN = {
  1: `### Rust Program Structure

Every .rs file starts with \`fn main()\` as the entry point. \`println!\` is the macro for printing text with a newline.

### Variables and Data Types

\`let\` declares an immutable variable. \`let mut\` for mutable. Rust has type inference; basic types: \`i32\`, \`f64\`, \`bool\`, \`char\`.

### Shadowing and Constants

Shadowing: \`let x = 5; let x = x + 2;\` — re-declaring with the same name. \`const\` for compile-time constants in SCREAMING_CASE.`,

  2: `### Control Flow

\`if/else\` for branching. \`loop\` for infinite iteration, \`while\` and \`for\` for controlled iteration.

### Basic Ownership

Every value has one owner. \`let s2 = s1;\` moves ownership — \`s1\` can no longer be used. \`String\` lives on the heap, \`&str\` on the stack.

### Match

\`match\` on integers: patterns are checked top to bottom. Must be exhaustive (cover all cases).`,

  3: `### References (&T and &mut T)

\`&\` creates a shared reference (borrow). \`&mut\` for mutable reference. Two rules: one &mut OR many &.

### Slices

\`&arr[1..4]\` — a reference to part of data. \`&str\` is a slice of String. Safe because checked at compile time.

### Dangling References

The Rust compiler prevents dangling references by checking lifetimes — references cannot outlive their data.`,

  4: `### Structs

\`struct Book { title: String, author: String }\` — groups related fields. \`impl\` for methods. \`&self\` for immutable methods, \`&mut self\` for mutable.

### Associated Functions

Function without \`self\` — constructor pattern: \`Book::new(...)\`. Called with \`::\` syntax.

### Tuple Structs

\`struct Color(u8, u8, u8)\` — struct with unnamed fields. Accessed via \`color.0\`, \`color.1\`, etc.`,

  5: `### Enums

\`enum Message { Text(String), Coordinate(i32, i32), Silent }\` — each variant can carry different data. \`match\` checks exhaustiveness.

### if let

\`if let Some(n) = number\` — concise pattern matching for one pattern. More compact than \`match\` for simple cases.

### Option<T>

\`Some(T)\` or \`None\` — a safe null alternative. \`unwrap_or(default)\` provides a default value. No NullPointerException in Rust.`,

  6: `### Vec<T>

\`vec![]\` macro. \`push\` adds, \`pop\` removes from the end. \`get(index)\` returns \`Option\`, safe from out-of-bounds.

### String

\`push_str\` appends a string. \`format!\` concatenates with formatting. \`String\` is heap-allocated and mutable.

### HashMap

Key-value storage. \`insert\`, \`get\` returns \`Option<&V>\`. \`entry().or_insert()\` is a powerful API for defaults.

### Result<T, E>

\`Ok(T)\` for success, \`Err(E)\` for errors. \`unwrap()\` panics on Err. \`expect("message")\` with custom message. The \`?\` operator for concise error propagation.`,

  7: `### Modules

\`mod utils { pub mod math { ... } }\` — code hierarchy. \`pub\` makes items visible outside the module. \`use\` brings paths into scope.

### Testing

\`#[cfg(test)]\` — test code only compiled during testing. \`#[test]\` marks a test function. \`assert_eq!\`, \`assert!\` for assertions.

### Documentation

\`///\` documentation comments. \`cargo doc\` generates HTML docs from doc comments. Modules can contain docs for code organization.`,

  8: `### Generics

\`Point<T>\` — generic struct with one type parameter. \`fn print_area<T: Area>(shape: &T)\` — generic function with trait bound.

### Traits

\`trait Area { fn area(&self) -> f64; }\` — collection of methods that multiple types can implement. Similar to interfaces in other languages.

### Derive

\`#[derive(Debug, Clone, PartialEq)]\` — automatic implementation of standard traits. Debug for formatting, Clone for duplication, PartialEq for comparison.`,

  9: `### Closures

\`|a, b| a + b\` — anonymous functions that capture their environment. \`|n| n * factor\` captures \`factor\` from outer scope. Three types: \`Fn\`, \`FnMut\`, \`FnOnce\`.

### Iterators

\`.iter()\` creates an iterator. \`filter()\` selects, \`map()\` transforms, \`fold()\` accumulates, \`collect()\` gathers. All lazy — executed when \`collect\` is called.

### For Loop

\`for x in vec.iter()\` — desugaring of \`into_iter().next()\`. Every collection can be looped over.`,

  10: `### Command-Line Arguments

\`env::args()\` returns an iterator. \`args[0]\` is the program name. \`match\` for command routing. A common Rust CLI pattern.

### File I/O (Simulated)

\`fs::read_to_string\` reads a file. \`? operator\` for error propagation. In this code, content is hardcoded for demonstration.

### Stderr

\`eprintln!\` prints to stderr — for error messages and usage. \`println!\` to stdout for normal output.`,

  11: `### Box<T>

\`Box::new()\` — heap allocation. Essential for recursive types and large data. The \`Deref\` trait allows use like regular references.

### Rc<T>

\`Rc\` — Reference Counting for multiple ownership in single-threaded contexts. \`clone()\` increments the reference counter. \`strong_count()\` to check reference count.

### RefCell<T>

Interior mutability: mutation through immutable references. \`borrow()\` and \`borrow_mut()\` with runtime checks. Panics if borrowing rules are violated at runtime.

### Drop

\`Drop\` trait — cleanup when a value goes out of scope. \`drop()\` is called automatically. Useful for resource management.`,

  12: `### Threads

\`thread::spawn(|| { ... })\` — creates a new OS thread. \`JoinHandle::join()\` waits for thread completion. \`move\` transfers ownership to the thread closure.

### Arc<T>

\`Arc\` — Atomic Reference Counting. Thread-safe version of Rc. \`Arc::clone()\` for sharing data across threads.

### Mutex<T>

\`lock()\` — mutual exclusion. Only one thread can access data at a time. \`unwrap()\` because locks can poison.

### Channels

\`mpsc::channel()\` — Multiple Producer, Single Consumer. \`send()\` sends, \`recv()\` receives. Cloning tx enables multiple producers.`,

  13: `### Unsafe

\`unsafe {}\` — blocks for operations Rust cannot guarantee safety. Superpowers: dereference raw pointers, call FFI, access unions, inline assembly.

### Raw Pointers

\`*const T\` (immutable) and \`*mut T\` (mutable). Can be null, dangling, or aliased. Only dereference inside unsafe blocks.

### Macros

\`macro_rules!\` — declarative macros for code generation. Pattern \`$name:expr\` matches an expression. Useful for reducing boilerplate.`,

  14: `### Async/Await

\`async fn\` returns a Future. \`.await\` waits for the result without blocking the thread. \`tokio::spawn\` runs tasks concurrently.

### Tokio Runtime

\`#[tokio::main]\` — macro that sets up the async runtime. \`tokio::time::sleep\` — async delay that does not block the thread.

### Concurrent Task Runner

\`tokio::spawn\` — multiple tasks run concurrently. \`await\` collects results. The basic pattern for production async applications.`,
};

// ── Content: Experiments ──

const EXP_ID_E = {
  1: `1. **Ubah nama** — ganti "Rustacean" dengan nama Anda
2. **Tambah variabel** — deklarasikan \`let kota = "Jakarta";\` dan cetak
3. **Shadowing** — coba shadowing dengan tipe berbeda: \`let x = "teks";\``,
  2: `1. **Ubah nilai** — coba nilai 92, 70, 45 dan lihat grade berbeda
2. **Match angka** — ganti angka match jadi 1 atau 3
3. **Ownership** — coba akses \`s1\` setelah move ke \`s2\` (akan error kompilasi)`,
  3: `1. **Hapus panjang()** — coba akses \`s\` setelah reference (masih bisa karena borrow)
2. **Ubah slice** — coba \`&arr[..3]\` atau \`&arr[2..]\`
3. **Langgar borrowing** — buat \`&\` dan \`&mut\` bersamaan (akan error)`,
  4: `1. **Tambah field** — tambahkan \`halaman: u32\` ke struct Buku
2. **Method baru** — buat \`fn usia(&self, tahun_sekarang: u32) -> u32\`
3. **Tuple struct** — buat struct \`Koordinat(f64, f64)\` dengan method jarak`,
  5: `1. **Varian baru** — tambahkan \`Gambar(Vec<u8>)\` ke enum Pesan
2. **Match arm baru** — handle varian baru di match
3. **None handling** — ubah \`unwrap_or(0)\` jadi \`unwrap_or_else(|| -1)\``,
  6: `1. **Vec ops** — coba \`angka.insert(0, 0)\` dan \`angka.remove(1)\`
2. **HashMap entry** — gunakan \`entry("nama").or_insert("default")\`
3. **Parse error** — coba \`"xyz".parse::<i32>()\` dan lihat error`,
  7: `1. **Fungsi baru** — tambahkan \`pub fn kurang(a: i32, b: i32) -> i32\` di mod math
2. **Test baru** — tambahkan test untuk fungsi baru
3. **Module baru** — buat submodule \`pub mod statistik\` dengan fungsi rata-rata`,
  8: `1. **Tipe baru** — buat struct \`Segitiga { a: f64, t: f64 }\` impl Luas
2. **Derive lain** — tambahkan \`Default\` dan \`Copy\` ke derive
3. **Generic fungsi** — buat \`terbesar<T: PartialOrd>(a: T, b: T) -> T\``,
  9: `1. **Closure berbeda** — buat closure yang mengalikan tiga angka
2. **Chain iterator** — gabungkan filter, map, dan fold dalam satu chain
3. **Filter prima** — ganti filter genap jadi filter bilangan prima`,
  10: `1. **Perintah baru** — tambahkan perintah \`upper <teks>\` yang mencetak teks uppercase
2. **Pola grep** — coba grep dengan pola "Go" atau "belajar"
3. **Error handling** — tambahkan validasi argumen kosong`,
  11: `1. **Tambah node** — tambahkan anak ketiga ke root tree
2. **RefCell vs Cell** — ubah \`RefCell\` jadi \`Cell\` dan lihat perbedaan API
3. **Tanpa Rc** — coba tanpa Rc (akan gagal karena multiple ownership)`,
  12: `1. **Ubah jumlah thread** — dari 10 jadi 100 thread dan lihat hasil counter
2. **Hapus Arc** — coba tanpa Arc (kompilasi akan gagal karena Send trait)
3. **Channel multi-producer** — clone tx dan buat 3 producer`,
  13: `1. **Macro baru** — buat macro \`tambah!(a, b)\` yang menghasilkan a + b
2. **Array pointer** — akses arr[4] dan arr[5] via pointer unsafe
3. **Tanpa unsafe** — coba dereference raw pointer di luar unsafe (gagal kompilasi)`,
  14: `1. **Tambah tugas** — tambahkan tugas ke-4 dan ke-5
2. **Ubah delay** — ganti Duration::from_millis(50) jadi 200ms
3. **Return value** — buat tugas mengembalikan angka, kumpulkan semua hasil`,
};

const EXP_EN_E = {
  1: `1. **Change name** — replace "Rustacean" with your name
2. **Add variable** — declare \`let city = "Jakarta";\` and print it
3. **Shadowing** — try shadowing with a different type: \`let x = "text";\``,
  2: `1. **Change score** — try scores 92, 70, 45 and see different grades
2. **Match number** — change match number to 1 or 3
3. **Ownership** — try accessing \`s1\` after moving to \`s2\` (will error)`,
  3: `1. **Remove length()** — try accessing \`s\` after the reference (still works)
2. **Change slice** — try \`&arr[..3]\` or \`&arr[2..]\`
3. **Break borrowing** — create both \`&\` and \`&mut\` simultaneously (will error)`,
  4: `1. **Add field** — add \`pages: u32\` to the Book struct
2. **New method** — create \`fn age(&self, current_year: u32) -> u32\`
3. **Tuple struct** — create \`Coordinate(f64, f64)\` struct with a distance method`,
  5: `1. **New variant** — add \`Image(Vec<u8>)\` to the Message enum
2. **New match arm** — handle the new variant in match
3. **None handling** — change \`unwrap_or(0)\` to \`unwrap_or_else(|| -1)\``,
  6: `1. **Vec ops** — try \`numbers.insert(0, 0)\` and \`numbers.remove(1)\`
2. **HashMap entry** — use \`entry("name").or_insert("default")\`
3. **Parse error** — try \`"xyz".parse::<i32>()\` and see the error`,
  7: `1. **New function** — add \`pub fn subtract(a: i32, b: i32) -> i32\` in math module
2. **New test** — add a test for the new function
3. **New module** — create \`pub mod statistics\` submodule with average function`,
  8: `1. **New type** — create \`Triangle { b: f64, h: f64 }\` implementing Area
2. **More derive** — add \`Default\` and \`Copy\` to the derive list
3. **Generic function** — create \`largest<T: PartialOrd>(a: T, b: T) -> T\``,
  9: `1. **Different closure** — create a closure that multiplies three numbers
2. **Chain iterators** — combine filter, map, and fold in one chain
3. **Prime filter** — change even filter to prime number filter`,
  10: `1. **New command** — add an \`upper <text>\` command that prints uppercase text
2. **Grep pattern** — try grep with pattern "Go" or "learning"
3. **Error handling** — add empty argument validation`,
  11: `1. **Add node** — add a third child to the root tree
2. **RefCell vs Cell** — change \`RefCell\` to \`Cell\` and see the API difference
3. **Without Rc** — try without Rc (will fail due to multiple ownership)`,
  12: `1. **Change thread count** — from 10 to 100 threads and see the counter result
2. **Remove Arc** — try without Arc (compilation will fail due to Send trait)
3. **Multi-producer channel** — clone tx and create 3 producers`,
  13: `1. **New macro** — create a \`add!(a, b)\` macro that produces a + b
2. **Array pointer** — access arr[4] and arr[5] via unsafe pointer
3. **Without unsafe** — try dereferencing a raw pointer outside unsafe (fails)`,
  14: `1. **Add tasks** — add a 4th and 5th task
2. **Change delay** — change Duration::from_millis(50) to 200ms
3. **Return value** — make tasks return numbers, collect all results`,
};

// ── Content: Challenges ──

const CHALL_ID = {
  1: 'Buat program yang mencetak biodata singkat: nama, umur, kota, dan hobi. Gunakan variabel dengan tipe berbeda (`&str`, `i32`, `bool`). Gunakan shadowing untuk mengubah nilai.',
  2: 'Buat program kalkulator sederhana dengan menu: input dua angka, pilih operasi (tambah/kurang/kali/bagi) via match. Gunakan if/else untuk validasi pembagian dengan nol. Simulasikan ownership dengan memindahkan String.',
  3: 'Buat fungsi `hitung_panjang(s: &str) -> usize` yang menghitung panjang string tanpa menggunakan .len(). Gunakan slice dan iterasi karakter. Buat fungsi lain yang memodifikasi String via &mut ref.',
  4: 'Buat struct `Produk` (nama, harga, stok) dengan method `total_harga(jumlah: u32) -> f64` dan `diskon(persen: f64) -> f64`. Gunakan associated function `baru` sebagai constructor. Tambahkan tuple struct `Dimensi(f64, f64, f64)`.',
  5: 'Buat enum `Arah` dengan varian `Utara`, `Selatan`, `Timur`, `Barat`. Gunakan match untuk mengembalikan string deskripsi. Buat fungsi yang menerima `Option<Arah>` dan handle kasus None dengan if let.',
  6: 'Buat program yang menerima kalimat, menyimpan kata-kata ke Vec<String>, menghitung frekuensi dengan HashMap, dan menangani error parsing angka. Gunakan Result untuk fungsi bagi yang aman.',
  7: 'Buat module `geometri` dengan submodule `dua_d` (fungsi luas lingkaran, persegi) dan `tiga_d` (fungsi volume kubus, bola). Tulis minimal 3 unit test. Gunakan komentar dokumentasi ///.',
  8: 'Buat trait `Deskripsi` dengan method `ke_string() -> String`. Implementasikan untuk struct `Buku` dan `Majalah`. Buat generic function `cetak_info<T: Deskripsi>(item: &T)`. Gunakan #[derive(Debug)] untuk debugging.',
  9: 'Buat fungsi `filter_angka` yang menerima Vec<i32> dan closure predicate, mengembalikan Vec<i32> yang difilter. Buat closure `ganjil` dan `genap`. Gunakan iterator chain untuk transformasi data.',
  10: 'Buat CLI app sederhana dengan perintah: `hitung <a> <b>` (menjumlah dua angka) dan `sapa <nama>` (menyapa). Tangani error jika argumen kurang. Simulasi pembacaan file dengan konten hardcoded.',
  11: 'Buat binary tree sederhana: struct `Tree<T>` dengan method `insert` dan `contains`. Gunakan Box untuk node anak. Implementasi Drop trait yang mencetak pesan saat node di-drop.',
  12: 'Buat worker pool: 5 thread membaca dari channel job (angka 1-20), menghitung faktorial, kirim hasil ke channel results. Gunakan Arc<Mutex<>> untuk shared counter task.',
  13: 'Buat macro `vektor![]` yang membuat Vec dengan elemen yang diberikan. Gunakan unsafe untuk mengakses elemen array via raw pointer. Implementasi fungsi unsafe `kecepatan` yang menghitung dari raw pointer.',
  14: 'Buat concurrent task runner dengan tokio: 5 task async berjalan konkuren, masing-masing dengan delay berbeda (50ms, 100ms, 150ms, 200ms, 250ms). Kumpulkan hasil dan cetak urutan selesai.',
};

const CHALL_EN = {
  1: 'Create a program that prints a short bio: name, age, city, and hobby. Use different variable types (`&str`, `i32`, `bool`). Use shadowing to change values.',
  2: 'Create a simple calculator with a menu: input two numbers, pick operation (add/subtract/multiply/divide) via match. Use if/else for division-by-zero validation. Simulate ownership by moving a String.',
  3: 'Write a function `count_length(s: &str) -> usize` that counts string length without using .len(). Use slices and character iteration. Create another function that modifies a String via &mut ref.',
  4: 'Create a `Product` struct (name, price, stock) with methods `total_price(quantity: u32) -> f64` and `discount(percent: f64) -> f64`. Use an associated function `new` as constructor. Add a tuple struct `Dimension(f64, f64, f64)`.',
  5: 'Create an `enum Direction` with variants `North`, `South`, `East`, `West`. Use match to return a description string. Create a function that takes `Option<Direction>` and handle the None case with if let.',
  6: 'Create a program that takes a sentence, stores words in Vec<String>, counts frequency with HashMap, and handles number parsing errors. Use Result for a safe division function.',
  7: 'Create a `geometry` module with submodules `two_d` (circle area, square area) and `three_d` (cube volume, sphere volume). Write at least 3 unit tests. Use /// doc comments.',
  8: 'Create a `Description` trait with method `to_string() -> String`. Implement it for `Book` and `Magazine` structs. Create a generic function `print_info<T: Description>(item: &T)`. Use #[derive(Debug)] for debugging.',
  9: 'Create a `filter_numbers` function that takes Vec<i32> and a predicate closure, returns filtered Vec<i32>. Create `odd` and `even` closures. Use iterator chains for data transformation.',
  10: 'Build a simple CLI app with commands: `add <a> <b>` (sum two numbers) and `greet <name>` (greet someone). Handle errors if arguments are missing. Simulate file reading with hardcoded content.',
  11: 'Build a simple binary tree: `Tree<T>` struct with `insert` and `contains` methods. Use Box for child nodes. Implement the Drop trait that prints a message when a node is dropped.',
  12: 'Build a worker pool: 5 threads reading from a job channel (numbers 1-20), calculate factorial, send results to a results channel. Use Arc<Mutex<>> for a shared task counter.',
  13: 'Create a `vector![]` macro that creates a Vec with given elements. Use unsafe to access array elements via raw pointers. Implement an unsafe function `velocity` that calculates from raw pointers.',
  14: 'Build a concurrent task runner with tokio: 5 async tasks running concurrently, each with different delays (50ms, 100ms, 150ms, 200ms, 250ms). Collect results and print completion order.',
};

// ── Content: Summary ──

const SUM_ID = {
  1: 'Rust adalah bahasa systems programming dengan toolchain: rustup (manajemen), cargo (build/run), rustc (kompilator). `let` dan `let mut` untuk variabel. Shadowing memungkinkan reuse nama. Minggu depan: control flow dan konsep ownership.',
  2: 'Control flow: if/else, loop, while, for. Ownership: setiap nilai punya satu pemilik, move memoryindahkan kepemilikan. String vs &str. match untuk pattern matching. Minggu depan: borrowing, referensi, dan slice.',
  3: 'Borrowing: &T untuk shared reference, &mut T untuk mutable. Aturan: satu mutable atau banyak immutable. Slice: &[T] dan &str sebagai referensi ke data tanpa ownership. Compiler mencegah dangling reference. Minggu depan: struct, method, dan associated function.',
  4: 'Struct mengelompokkan data dengan named fields. impl block untuk method (dengan &self atau &mut self). Associated function sebagai constructor. Tuple struct untuk wrapper sederhana. Minggu depan: enum dan pattern matching.',
  5: 'Enum mewakili beberapa kemungkinan varian, masing-masing bisa membawa data. match memeriksa exhaustiveness — semua varian harus di-handle. if let untuk pencocokan singkat. Option<T> menggantikan null dengan aman. Minggu depan: koleksi (Vec, String, HashMap) dan error handling.',
  6: 'Vec, String, HashMap adalah koleksi standar Rust. Result<T, E> untuk error handling yang aman — unwrap, expect, dan operator ?. Tidak ada exception di Rust, semua error explicit. Minggu depan: module, crate, dan testing.',
  7: 'Module mengorganisir kode dengan mod/pub/use. Unit test dengan #[test] dan #[cfg(test)]. assert_eq! dan assert! untuk assertions. Komentar /// untuk dokumentasi. cargo test menjalankan semua test. Minggu depan: generics dan trait.',
  8: 'Generics memungkinkan kode fleksibel dengan parameter tipe <T>. Trait = antarmuka yang bisa diimplementasikan berbagai tipe. Trait bounds membatasi parameter generik. Derive attributes untuk implementasi otomatis trait standar. Minggu depan: closure dan iterator.',
  9: 'Closure = fungsi anonim yang menangkap lingkungan. Iterator trait dengan map, filter, fold, collect — functional programming idiomatis. Lazy evaluation: chain tidak dieksekusi sampai collect dipanggil. Minggu depan: proyek CLI.',
  10: 'CLI app dengan env::args, match untuk routing perintah, eprintln! untuk error, println! untuk output. Error handling dengan ? untuk aplikasi nyata. Struktur modular dengan fungsi terpisah per perintah. Minggu depan: smart pointer: Box, Rc, RefCell.',
  11: 'Box<T> untuk heap allocation dan tipe rekursif. Rc<T> untuk reference counting (multiple ownership). RefCell<T> untuk interior mutability dengan runtime check. Drop trait untuk cleanup otomatis. Minggu depan: concurrency (thread, Arc, Mutex).',
  12: 'Thread dengan thread::spawn dan JoinHandle. Arc<T> untuk sharing data thread-safe. Mutex<T> untuk akses eksklusif. mpsc::channel untuk komunikasi antar thread. Minggu depan: unsafe Rust dan macro.',
  13: 'Unsafe block memberikan akses ke raw pointer dan FFI — tanggung jawab keamanan ada di programmer. macro_rules! untuk deklaratif macro yang mengurangi boilerplate. Kombinasi unsafe + macro untuk low-level abstraksi. Minggu depan: async/await dan proyek akhir.',
  14: 'Async/await untuk I/O-bound concurrent programming. Tokio runtime dengan #[tokio::main]. tokio::spawn untuk task konkuren. Proyek akhir: concurrent task runner. Selamat menyelesaikan kurikulum Rust!',
};

const SUM_EN = {
  1: 'Rust is a systems programming language with toolchain: rustup (management), cargo (build/run), rustc (compiler). `let` and `let mut` for variables. Shadowing allows name reuse. Next week: control flow and ownership concepts.',
  2: 'Control flow: if/else, loop, while, for. Ownership: every value has one owner, move transfers ownership. String vs &str. match for pattern matching. Next week: borrowing, references, and slices.',
  3: 'Borrowing: &T for shared references, &mut T for mutable. Rules: one mutable OR many immutable. Slices: &[T] and &str as references to data without ownership. The compiler prevents dangling references. Next week: structs, methods, and associated functions.',
  4: 'Structs group related data with named fields. impl blocks for methods (with &self or &mut self). Associated functions as constructors. Tuple structs for simple wrappers. Next week: enums and pattern matching.',
  5: 'Enums represent multiple possible variants, each can carry data. match checks exhaustiveness — all variants must be handled. if let for concise matching. Option<T> safely replaces null. Next week: collections (Vec, String, HashMap) and error handling.',
  6: 'Vec, String, HashMap are Rust\'s standard collections. Result<T, E> for safe error handling — unwrap, expect, and the ? operator. No exceptions in Rust, all errors are explicit. Next week: modules, crates, and testing.',
  7: 'Modules organize code with mod/pub/use. Unit tests with #[test] and #[cfg(test)]. assert_eq! and assert! for assertions. /// for documentation comments. cargo test runs all tests. Next week: generics and traits.',
  8: 'Generics enable flexible code with type parameter <T>. Traits = interfaces that multiple types can implement. Trait bounds constrain generic parameters. Derive attributes for automatic standard trait implementations. Next week: closures and iterators.',
  9: 'Closures = anonymous functions that capture their environment. Iterator trait with map, filter, fold, collect — idiomatic functional programming. Lazy evaluation: chains don\'t execute until collect is called. Next week: CLI project.',
  10: 'CLI apps with env::args, match for command routing, eprintln! for errors, println! for output. Error handling with ? for real applications. Modular structure with separate functions per command. Next week: smart pointers: Box, Rc, RefCell.',
  11: 'Box<T> for heap allocation and recursive types. Rc<T> for reference counting (multiple ownership). RefCell<T> for interior mutability with runtime checks. Drop trait for automatic cleanup. Next week: concurrency (thread, Arc, Mutex).',
  12: 'Threads with thread::spawn and JoinHandle. Arc<T> for thread-safe data sharing. Mutex<T> for exclusive access. mpsc::channel for inter-thread communication. Next week: unsafe Rust and macros.',
  13: 'Unsafe blocks provide access to raw pointers and FFI — safety responsibility is on the programmer. macro_rules! for declarative macros reducing boilerplate. Combining unsafe + macros for low-level abstractions. Next week: async/await and final project.',
  14: 'Async/await for I/O-bound concurrent programming. Tokio runtime with #[tokio::main]. tokio::spawn for concurrent tasks. Final project: concurrent task runner. Congratulations on completing the Rust curriculum!',
};

// ── Generate ──

for (const { w, f, lid, len, cid } of weeks) {
  const level = getLevel(w);
  const ln = levels[level];

  const dir = path.join(BASE, level);
  for (const l of ['id', 'en']) {
    const d = path.join(dir, l);
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }

  const idObjs = OBJ[w].id.map(o => `- ${o}`).join('\n');
  const enObjs = OBJ[w].en.map(o => `- ${o}`).join('\n');

  const idContent = `# ${lid}

> Kategori: Rust, Bahasa Pemrograman | Level: ${ln.nid} | Week ${w}

## Tujuan Pembelajaran

${idObjs}

---

## Program: ${cid}

\`\`\`rust
${CODE_ID[w]}
\`\`\`

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

${EXP_ID[w]}

---

## Eksperimen

Coba modifikasi kode di samping:

${EXP_ID_E[w].split('\n').filter(l => l.trim()).join('\n')}

---

## Tantangan

${CHALL_ID[w]}

---

## Ringkasan

${SUM_ID[w]}
`;

  const enContent = `# ${len}

> Category: Rust, Programming Language | Level: ${ln.nen} | Week ${w}

## Learning Objectives

${enObjs}

---

## Program: ${cid}

\`\`\`rust
${CODE_EN[w]}
\`\`\`

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

${EXP_EN[w]}

---

## Experiments

Try modifying the code:

${EXP_EN_E[w].split('\n').filter(l => l.trim()).join('\n')}

---

## Challenge

${CHALL_EN[w]}

---

## Summary

${SUM_EN[w]}
`;

  const idPath = path.join(dir, 'id', `week${w}-${f}.md`);
  const enPath = path.join(dir, 'en', `week${w}-${f}.md`);
  fs.writeFileSync(idPath, idContent, 'utf8');
  fs.writeFileSync(enPath, enContent, 'utf8');
  console.log(`Created week${w} (${level})`);
}

console.log('\nAll 28 Rust curriculum files created!');
