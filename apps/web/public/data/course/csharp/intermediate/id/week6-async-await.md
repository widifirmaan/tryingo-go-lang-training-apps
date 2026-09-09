# Async/Await — Pesan Antar Tanpa Freeze C#

> **Kategori:** C# | **Level:** Menengah | **Minggu 6:** Async/Await
> **Prasyarat:** Minggu 5 — **LINQ**.

## Tujuan Pembelajaran

- `async Task<T>` janji + `await` tunggu tanpa freeze UI/thread (sumber: Microsoft Learn asynchronous programming)
- `Task.WhenAll` pesan bareng, `try/catch` untuk `await` gagal

---

## Kenapa Ini Penting Buat Kamu?

Ambil 3 harga supplier berurutan = 3x tunggu (2.4 detik). Dengan `await` + `WhenAll` = 0.8 detik. Tanpa `async`, UI freeze (toko "hang"). `async void` (kecuali event) = error hilang diam-diam!

---

## Program: Ojek Harga C#

```csharp
async Task<Produk> Ambil(string nama) {
  await Task.Delay(800); // simulasi ojek 0.8 detik
  return new Produk { Nama = nama, Harga = 62000 };
}

async Task Belanja() {
  Console.WriteLine("Pesan Beras...");
  var beras = await Ambil("Beras"); // tunggu tanpa freeze
  Console.WriteLine("Dapat: " + beras.Nama);

  // 3 bareng (bukan berurutan!)
  var tasks = new[] { Ambil("Beras"), Ambil("Bayam"), Ambil("Telur") };
  var semua = await Task.WhenAll(tasks); // 0.8 detik untuk 3!
  Console.WriteLine($"Dapat {semua.Length} sekaligus");
}

await Belanja();
Console.WriteLine("→ Baris ini jalan duluan (tidak tunggu)");
```

---

## Konsep Kunci

### `async` + `await` = Janji + Tunggu
`async Task<T>` kembalikan janji, `await` tunggu tanpa blokir thread.

### `Task.WhenAll` = Pesan Bareng
`await Task.WhenAll(t1, t2)` → 0.8 detik untuk 2 (bukan 1.6).

### `async Task` Bukan `async void`!
`async void` hanya untuk event handler — error di dalamnya hilang!

---

## Penjelasan untuk Pemula

### Analogi: Ojek Makanan
- **Sync = tunggu di warung** sampai ojek datang (freeze).
- **await = pulang dulu**, ojek telpon saat sampai.

### Langkah 0 — Siapkan Device
- Sama C# W1: `dotnet run` (.NET 8+, top-level statements boleh `await` langsung).

### Cara Komputer Membaca
1. `await Ambil()` → kembalikan thread → lanjut baris bawah.
2. Ojek selesai → lanjutkan fungsi setelah `await`.

### 3 Istilah Wajib
1. **async/await/Task**: janji/tunggu/pekerjaan
2. **WhenAll**: bareng

---

## Eksperimen

- **Hijau:** `await` 3 berurutan vs `WhenAll` → waktu beda? (`DateTime.Now` ukur!)
- **Kuning:** Lupa `await` → `Task` mentah (belum jalan)?
- **Merah:** `async void` + `throw` di dalam → crash tanpa pesan? Ganti `async Task`.

---

## Tantangan

**Warung Async:** `Ambil(nama)` 500ms + `Belanja()` `WhenAll` 3 + total + `try/catch` jika `nama` kosong.
- **Sambungan (Minggu 5 — LINQ):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **async/await/WhenAll**: janji/tunggu/bareng

---

## Ringkasan

Minggu 6 dari 12: **Pesan Tanpa Freeze** (Level: Menengah). Cepat 3x. Minggu depan: **Generics** — rak serbaguna.
