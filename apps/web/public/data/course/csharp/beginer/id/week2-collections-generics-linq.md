# Generic Collections & Query Data Deklaratif dengan LINQ

> **Kategori:** C# & .NET | **Level:** Pemula | **Minggu 2:** Generic Collections & Query Data Deklaratif dengan LINQ
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

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

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan deklarasi pendek (Short Declaration).
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.
- **Contoh Penggunaan Praktis:**
```javascript
age := 25
name := "Alex Iskandar"
fmt.Printf("%s berusia %d tahun
", name, age);
```
- **Hasil Output yang Diharapkan:**
```text
Alex Iskandar berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.
- **Contoh Penggunaan Praktis:**
```javascript
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / fungsi bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).
- **Contoh Penggunaan Praktis:**
```javascript
go func() {
  fmt.Println("Berjalan konkuren di goroutine terpisah!")
}()
```
- **Hasil Output yang Diharapkan:**
```text
Dieksekusi asinkron tanpa memblokir alur utama program
```

### 4. `ch := make(chan string); ch <- val; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.
- **Contoh Penggunaan Praktis:**
```javascript
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result);
```
- **Hasil Output yang Diharapkan:**
```text
Diterima: 100
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. NullReferenceException
- **Gejala / Masalah:** Aplikasi melempar exception fatal saat mengakses method dari object yang bernilai null.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Aktifkan `<Nullable>enable</Nullable>` di csproj dan gunakan operator null-conditional `?.` atau null-coalescing `??`.

### 2. Async Void pada Method Biasa
- **Gejala / Masalah:** Exception yang terjadi di dalam method `async void` tidak bisa ditangkap oleh blok try-catch luar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan `async Task` untuk method asynchronous, kecuali pada event handler UI.

### 3. Lupa Melakukan Dispose pada Objek IDisposable
- **Gejala / Masalah:** Koneksi database atau file handle tertahan di memori sistem.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan statement `using var resource = new ...` agar pembersihan resource berjalan otomatis.

---

## Ringkasan

Kamu telah menguasai Generic Collections dan kekuatan kueri deklaratif LINQ. Minggu depan kita akan mendesain arsitektur berbasis Interface dan Dependency Injection.
