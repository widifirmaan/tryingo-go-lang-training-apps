# Generic Collections & Query Data Deklaratif dengan LINQ

> **Kategori:** C# & .NET | **Level:** Pemula | **Minggu 2:** Generic Collections & Query Data Deklaratif dengan LINQ

## Tujuan Pembelajaran

- Menguasai Generic Collections seperti `List<T>`, `Dictionary<TKey, TValue>`, dan `Queue<T>`.
- Memahami konsep eksekusi tertunda (Deferred Execution) pada LINQ.
- Menggunakan operator LINQ esensial: `Where`, `Select`, `GroupBy`, `Sum`, `OrderBy`, dan anonymous types.
- Mengimplementasikan logika rotasi batch stok gudang (FIFO) berbasis kueri fungsional.

---

## Program: Pipeline Pemrosesan Stok & Peringatan Reorder dengan LINQ

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

var inventory = new List<StockBatch>
{
    new("BAT-01", "SKU-LOGI-M720", 50, new DateTime(2026, 12, 1), 350_000m),
    new("BAT-02", "SKU-LOGI-M720", 25, new DateTime(2026, 10, 15), 340_000m),
    new("BAT-03", "SKU-DELL-U2723", 8,  new DateTime(2027, 5, 20), 7_200_000m),
    new("BAT-04", "SKU-KING-RAM32", 14, new DateTime(2026, 8, 30), 1_100_000m),
    new("BAT-05", "SKU-DELL-U2723", 12, new DateTime(2027, 1, 10), 7_150_000m),
};

Console.WriteLine("=== REKAP TOTAL VALUASI STOK PER SKU ===");
var stockSummary = inventory
    .GroupBy(b => b.Sku)
    .Select(g => new
    {
        Sku = g.Key,
        TotalUnits = g.Sum(b => b.Quantity),
        TotalValuation = g.Sum(b => b.Quantity * b.UnitCost),
        BatchesCount = g.Count()
    })
    .OrderByDescending(s => s.TotalValuation);

foreach (var s in stockSummary)
{
    Console.WriteLine($"[SKU: {s.Sku}] Units: {s.TotalUnits,-4} | Batches: {s.BatchesCount} | Val: Rp {s.TotalValuation:N0}");
}

Console.WriteLine("\n=== PRIORITAS PENGELUARAN FIFO (Batch Terdekat Kadaluarsa) ===");
var fifoQueue = inventory
    .Where(b => b.Quantity > 0)
    .OrderBy(b => b.ExpiryDate)
    .ToList();

foreach (var batch in fifoQueue.Take(3))
{
    Console.WriteLine($"-> Batch {batch.BatchId} ({batch.Sku}): {batch.Quantity} unit (Exp: {batch.ExpiryDate:yyyy-MM-dd})");
}

public record StockBatch(string BatchId, string Sku, int Quantity, DateTime ExpiryDate, decimal UnitCost);
```

---

## Konsep Kunci

LINQ (Language Integrated Query) adalah salah satu fitur paling revolusioner di ekosistem .NET, memungkinkan developer melakukan kueri data dari koleksi memori, database SQL, atau file XML menggunakan sintaks seragam yang type-safe.

### Generic Collections
C# menyediakan koleksi bertipe aman (`System.Collections.Generic`). `List<T>` memberikan akses array dinamis, `Dictionary<TKey, TValue>` memberikan pencarian instan O(1) berbasis hash table, dan `Queue<T>` sangat ideal untuk urutan pesanan FIFO (First In, First Out).

### Deferred Execution pada LINQ
Metode LINQ seperti `Where` dan `Select` tidak langsung mengeksekusi iterasi data saat dideklarasikan. Kueri hanya benar-benar dievaluasi saat kita melakukan iterasi (misal dengan `foreach`) atau memanggil terminal operator seperti `.ToList()`, `.ToArray()`, atau `.Count()`. Karakteristik ini membuat pipeline kueri sangat efisien dalam penggunaan CPU dan memori.

### Agregasi Data Kompleks dengan GroupBy
Dalam sistem pergudangan, satu SKU barang sering kali tersebar di banyak batch penerimaan yang berbeda harga beli dan tanggal kedaluwarsanya. Dengan `GroupBy(b => b.Sku)`, kita dapat mengelompokkan data berdasarkan SKU, lalu menghitung total stok dan valuasi finansial secara deklaratif tanpa nested loop manual yang rawan bug.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda adalah manajer gudang yang memiliki ribuan kartu stok di meja. Jika Anda menyortirnya satu per satu dengan tangan, Anda akan kelelahan. LINQ seperti mesin sortir otomatis: Anda cukup menekan tombol "Kelompokkan berdasarkan Nama Barang" dan "Hitung Total Harga", mesin akan langsung menyajikan laporannya dalam hitungan detik.

## Eksperimen

- Tambahkan batch baru dengan Quantity 0 dan pastikan filter `Where(b => b.Quantity > 0)` mengabaikannya.
- Hitung rata-rata harga beli (Weighted Average Cost) untuk setiap SKU menggunakan LINQ.
- Ubah `.OrderBy(b => b.ExpiryDate)` menjadi `.OrderByDescending` dan amati dampaknya terhadap urutan FIFO.

---

## Tantangan

Tulis fungsi LINQ `AllocateStock(List<StockBatch> batches, string sku, int requestedQty)` yang mengurangi quantity dari batch terlama (FIFO) sampai requestedQty terpenuhi, atau melempar pengecualian jika total stok tidak mencukupi.

---

## Ringkasan

Kamu telah menguasai Generic Collections dan kekuatan kueri deklaratif LINQ. Minggu depan kita akan mendesain arsitektur berbasis Interface dan Dependency Injection.
