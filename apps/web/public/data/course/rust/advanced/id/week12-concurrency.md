# Concurrency: Thread, Arc, Mutex

> Kategori: Rust, Bahasa Pemrograman | Level: Lanjutan | Week 12

## Tujuan Pembelajaran

- Membuat thread dengan thread::spawn dan JoinHandle
- Menggunakan closure move dengan thread
- Menerapkan Arc<T> untuk atomic reference counting
- Menggunakan Mutex<T> untuk mutual exclusion
- Mengirim pesan dengan mpsc::channel

---

## Program: Parallel

```rust
use std::sync::{Arc, Mutex, mpsc};
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
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Thread

`thread::spawn(|| { ... })` — membuat OS thread baru. `JoinHandle::join()` menunggu thread selesai. `move` untuk memindahkan ownership ke closure thread.

### Arc<T>

`Arc` — Atomic Reference Counting. Thread-safe version of Rc. `Arc::clone()` untuk sharing data antar thread.

### Mutex<T>

`lock()` — mutual exclusion. Hanya satu thread bisa mengakses data pada satu waktu. `unwrap()` karena lock bisa poison.

### Channel

`mpsc::channel()` — Multiple Producer, Single Consumer. `send()` mengirim, `recv()` menerima. Cloning tx untuk multiple producers.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah jumlah thread** — dari 10 jadi 100 thread dan lihat hasil counter
2. **Hapus Arc** — coba tanpa Arc (kompilasi akan gagal karena Send trait)
3. **Channel multi-producer** — clone tx dan buat 3 producer

---

## Tantangan

Buat worker pool: 5 thread membaca dari channel job (angka 1-20), menghitung faktorial, kirim hasil ke channel results. Gunakan Arc<Mutex<>> untuk shared counter task.

---

## Ringkasan

Thread dengan thread::spawn dan JoinHandle. Arc<T> untuk sharing data thread-safe. Mutex<T> untuk akses eksklusif. mpsc::channel untuk komunikasi antar thread. Minggu depan: unsafe Rust dan macro.
