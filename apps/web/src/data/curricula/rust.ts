import type { LevelInfo } from '../curriculum';

// Rust curriculum — product-driven research-backed structure
export const rustCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Ownership, Borrowing & Sistem Tipe Aman',
    nameEn: 'Ownership, Borrowing & Safe Types',
    descId: 'Pondasi keamanan memori tanpa Garbage Collector: Ownership, Move Semantics, Borrowing (& vs &mut), Structs, Enums, dan match.',
    descEn: 'Memory safety without Garbage Collection: Ownership, Move Semantics, Borrowing (& vs &mut), Structs, Enums, and match.',
    weeks: [
      { week: 1, topicId: 'ownership-dan-move-semantics', titleId: 'Ownership & Move Semantics: Keamanan Memori Tanpa Garbage Collector', titleEn: 'Ownership & Move Semantics: Memory Safety Without Garbage Collection' },
      { week: 2, topicId: 'borrowing-dan-references', titleId: 'Borrowing & References: Peminjaman Aman (&T), Mutasi (&mut T) & Aturan Aliasing XOR Mutability', titleEn: 'Borrowing & References: Shared (&T), Mutable (&mut T) & Aliasing Rules' },
      { week: 3, topicId: 'structs-enums-dan-pattern-matching', titleId: 'Structs, Enums dengan Payload Data & Pattern Matching Eksklusif (match)', titleEn: 'Structs, Enums with Payloads & Exhaustive Pattern Matching (match)' },
      { week: 4, topicId: 'collections-vectors-dan-strings', titleId: 'Koleksi Inti: Vec<T>, String vs &str & HashMap In-Memory Storage', titleEn: 'Core Collections: Vec<T>, String vs &str & In-Memory HashMaps' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Traits, Smart Pointers & Konkurensi Tanpa Takut',
    nameEn: 'Traits, Smart Pointers & Fearless Concurrency',
    descId: 'Polimorfisme Trait, operator ?, Smart Pointers (Box, Rc, Arc, Mutex), dan Fearless Concurrency dengan Send/Sync threads.',
    descEn: 'Trait polymorphism, ? operator, Smart Pointers (Box, Rc, Arc, Mutex), and Fearless Concurrency with Send/Sync threads.',
    weeks: [
      { week: 5, topicId: 'traits-dan-generics', titleId: 'Traits & Generics: Polimorfisme Nol Biaya (Zero-Cost Abstractions) & Trait Bounds', titleEn: 'Traits & Generics: Zero-Cost Abstractions & Trait Bounds' },
      { week: 6, topicId: 'error-handling-dan-thiserror', titleId: 'Error Handling Produksi: Operator ?, Result<T, E> & Custom Errors dengan thiserror', titleEn: 'Production Error Handling: The ? Operator, Result<T, E> & thiserror' },
      { week: 7, topicId: 'smart-pointers-box-rc-arc', titleId: 'Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>', titleEn: 'Smart Pointers & Interior Mutability: Box<T>, Arc<T>, Mutex<T> & RwLock<T>' },
      { week: 8, topicId: 'concurrency-threads-dan-channels', titleId: 'Fearless Concurrency: std::thread, Send & Sync Traits serta mpsc Message Channels', titleEn: 'Fearless Concurrency: std::thread, Send/Sync & mpsc Channels' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Async Tokio, Durabilitas WAL & Capstone KV Engine',
    nameEn: 'Async Tokio, WAL Durability & KV Engine Capstone',
    descId: 'Pemrograman asinkron dengan runtime Tokio, Write-Ahead Log (WAL) file durability, fsync crash recovery, dan proyek capstone KV Store.',
    descEn: 'Asynchronous programming with Tokio, Write-Ahead Log (WAL) file durability, fsync crash recovery, and the KV Store capstone.',
    weeks: [
      { week: 9, topicId: 'async-tokio-dan-futures', titleId: 'Asynchronous Rust: Runtime Tokio, async/await, Futures & Non-Blocking TCP', titleEn: 'Asynchronous Rust: The Tokio Runtime, async/await & Non-Blocking TCP' },
      { week: 10, topicId: 'file-io-dan-wal-durability', titleId: 'Durabilitas Basis Data: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery Replay', titleEn: 'Database Durability: File I/O, Write-Ahead Log (WAL), fsync & Crash Recovery' },
      { week: 11, topicId: 'unsafe-dan-performance-tuning', titleId: 'Unsafe Rust & Optimasi Tingkat Ekstrem: Pointer Mentah (*const/*mut) & Zero-Copy', titleEn: 'Unsafe Rust & Performance Tuning: Raw Pointers & Zero-Copy Deserialization' },
      { week: 12, topicId: 'capstone-kv-store-wal', titleId: 'Capstone: Blazing-Fast In-Memory Key-Value Store dengan Write-Ahead Log & Crash Recovery', titleEn: 'Capstone: Production In-Memory Key-Value Store with WAL Durability & Crash Recovery' }
    ],
  }
];
