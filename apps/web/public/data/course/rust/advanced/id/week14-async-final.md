# Async/Await & Proyek Akhir

> Kategori: Rust, Bahasa Pemrograman | Level: Lanjutan | Week 14

## Tujuan Pembelajaran

- Mendefinisikan async function dan menggunakan .await
- Menggunakan tokio runtime dengan #[tokio::main]
- Menjalankan tugas konkuren dengan tokio::spawn
- Menggunakan tokio::time::sleep untuk delay async
- Membangun concurrent task runner sebagai proyek akhir

---

## Program: Async Final

```rust
use tokio::time::{sleep, Duration};

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
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Async/Await

`async fn` mengembalikan Future. `.await` menunggu hasil tanpa blocking thread. `tokio::spawn` menjalankan task secara konkuren.

### Tokio Runtime

`#[tokio::main]` — macro yang setup async runtime. `tokio::time::sleep` — delay async yang tidak blocking thread.

### Concurrent Task Runner

`tokio::spawn` — multiple task berjalan konkuren. `await` mengumpulkan hasil. Pola dasar aplikasi async production.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah tugas** — tambahkan tugas ke-4 dan ke-5
2. **Ubah delay** — ganti Duration::from_millis(50) jadi 200ms
3. **Return value** — buat tugas mengembalikan angka, kumpulkan semua hasil

---

## Tantangan

Buat concurrent task runner dengan tokio: 5 task async berjalan konkuren, masing-masing dengan delay berbeda (50ms, 100ms, 150ms, 200ms, 250ms). Kumpulkan hasil dan cetak urutan selesai.

---

## Ringkasan

Async/await untuk I/O-bound concurrent programming. Tokio runtime dengan #[tokio::main]. tokio::spawn untuk task konkuren. Proyek akhir: concurrent task runner. Selamat menyelesaikan kurikulum Rust!
