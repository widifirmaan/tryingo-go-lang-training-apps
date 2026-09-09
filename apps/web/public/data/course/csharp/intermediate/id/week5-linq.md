# LINQ — Saringan Warung C#

> **Kategori:** C# | **Level:** Menengah | **Minggu 5:** LINQ
> **Prasyarat:** Minggu 4 — **OOP Class & Object**.

## Tujuan Pembelajaran

- `Where`, `Select`, `OrderBy` — saring rak seperti `map/filter` JS

---

## Kenapa Ini Penting Buat Kamu?

Saring "hanya yang murah" tanpa LINQ = `foreach` + `if` + list baru 6 baris tiap kali. Dengan `Where`, 1 baris. `OrderBy` urut harga tanpa tulis sort manual. 90% olah data C# = LINQ.

---

## Program

```csharp
var produk = new[] { new { Nama="Beras", Harga=62000 }, new { Nama="Bayam", Harga=5000 } };
var murah = produk.Where(p => p.Harga < 20000).ToList();
var nama = produk.Select(p => p.Nama).ToList();
var urut = produk.OrderBy(p => p.Harga).ToList();

foreach(var p in murah) Console.WriteLine(p.Nama);
```


---

## Konsep Kunci

### `Where` / `Select` / `OrderBy` = Saring/Pilih/Urut
- `Where(p => p.Harga < 20000)` saring (seperti `filter` JS).
- `Select(p => p.Nama)` pilih kolom (seperti `map`).
- `OrderBy(p => p.Harga)` urut naik, `OrderByDescending` turun.

### `ToList()` = Eksekusi
LINQ malas (deferred) — tanpa `ToList()`/`foreach`, query belum jalan!

---

## Penjelasan untuk Pemula

### Analogi: Saringan Bertingkat
- **Where = saringan**: hanya murah lolos.
- **Select = cetak ulang**: ambil nama saja.

### Langkah 0 — Siapkan Device
- Sama C# W1: `dotnet run`.

### Cara Komputer Membaca
1. `produk.Where(p => p.Harga < 20000)` → buat query (belum jalan).
2. `.ToList()` → jalankan → list baru.

### 3 Istilah Wajib
1. **LINQ/Where/Select**: saring semesta/saring/pilih
2. **Deferred/ToList**: malas/eksekusi

---

## Eksperimen

- **Hijau:** `Where(p => p.Harga >= 20000)` → mahal?
- **Kuning:** Tanpa `ToList()`, ubah `produk` dulu baru `foreach` query → ikut berubah? (Deferred!)
- **Merah:** `Select` sebelum `Where` → tetap jalan tapi buang kerja? Urutkan `Where` dulu.

---

## Tantangan

**Rak Saring Lengkap:** 5 produk → `Where` stok > 0 → `OrderBy` harga → `Select` nama → `ToList` cetak. Tambah `FirstOrDefault` ambil termurah.
- **Sambungan (Minggu 4 — OOP Class & Object):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Where/Select/OrderBy**: saring/pilih/urut
- **ToList/First**: eksekusi/pertama

---

## Ringkasan

Minggu 5: **Saringan C#** — LINQ `Where/Select`. Minggu depan: **Async/Await**.
