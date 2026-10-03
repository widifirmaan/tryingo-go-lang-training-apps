# Sintaks Modern C# 13, Primary Constructors & Record Types

> **Kategori:** C# & .NET | **Level:** Pemula | **Minggu 1:** Sintaks Modern C# 13, Primary Constructors & Record Types
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami evolusi C# modern (C# 12/13) dengan top-level statements dan primary constructors.
- Menggunakan record types untuk data domain yang immutable dengan dukungan built-in value equality.
- Menerapkan non-destructive mutation menggunakan ekspresi `with`.
- Menguasai pattern matching modern dengan switch expressions untuk logika bisnis yang bersih.

---

## Program: Domain Model Inventaris Gudang dengan Record & Pattern Matching

```csharp
using System;

// C# 13: Top-level statements & Primary Constructors on Records
var itemA = new InventoryItem("SKU-LOGI-M720", "Wireless Mouse M720", 450_000m, 45, ItemCategory.Peripherals);
var itemB = itemA with { Sku = "SKU-LOGI-M720-B", Stock = 12 }; // Non-destructive mutation

Console.WriteLine($"[Item Created] {itemA.Name} | Sku: {itemA.Sku} | Stock: {itemA.Stock}");
Console.WriteLine($"[Cloned Item]  {itemB.Name} | Sku: {itemB.Sku} | Stock: {itemB.Stock}");

StockStatus status = EvaluateStock(itemB);
Console.WriteLine($"[Stock Status] {itemB.Sku} -> {status.Message} (Urgency: {status.Urgency})");

static StockStatus EvaluateStock(InventoryItem item) => item.Stock switch
{
    0 => new StockStatus("Out of Stock! Immediate reorder required.", UrgencyLevel.Critical),
    <= 15 => new StockStatus($"Low Stock Warning ({item.Stock} units left).", UrgencyLevel.High),
    <= 50 => new StockStatus("Optimal stock level.", UrgencyLevel.Normal),
    _ => new StockStatus("Surplus inventory in warehouse.", UrgencyLevel.Low)
};

// Immutability with Record Types & Primary Constructors
public record InventoryItem(
    string Sku,
    string Name,
    decimal UnitPrice,
    int Stock,
    ItemCategory Category
);

public record StockStatus(string Message, UrgencyLevel Urgency);

public enum ItemCategory { Peripherals, Storage, Network, Displays }
public enum UrgencyLevel { Low, Normal, High, Critical }
```

---

## Konsep Kunci

Modern C# 13 mengeliminasi boilerplate kode lama (seperti class Program, method Main berulang) sambil mempertahankan sistem tipe statis dan performa runtime .NET yang sangat kencang.

### Primary Constructors dan Top-Level Statements
Dengan C# modern, Anda dapat langsung mengeksekusi kode di baris pertama tanpa membungkusnya dalam class dan namespace secara manual. Fitur **Primary Constructors** pada class maupun record memungkinkan kita mendefinisikan parameter constructor langsung di samping nama tipe data, menghemat puluhan baris kode assignment `this._field = field`.

### Record Types dan Immutability
`record` adalah tipe referensi khusus yang dirancang untuk data immutable (tidak dapat diubah setelah dibuat). Dua record dengan nilai properti yang sama akan dianggap identik (`item1 == item2` bernilai true), berbeda dengan `class` standar yang membandingkan alamat pointer referensi memori. Untuk mengubah salah satu properti, kita menggunakan ekspresi `with` yang membuat salinan baru secara aman tanpa efek samping race condition.

### Pattern Matching dengan Switch Expressions
Switch expression di C# bukan sekadar switch-case biasa. Fitur ini mendukung perbandingan range (`<= 15`), perbandingan tipe data, hingga tuple pattern matching, menghasilkan kode evaluasi status inventaris yang ringkas, deklaratif, dan aman dari bug percabangan yang terlewat.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah tiket manifest kargo di bandara. Begitu dicetak, lembaran tiket itu tidak boleh dicoret-coret sembarangan (itu adalah sifat `record` yang immutable). Jika ada barang baru yang ditambahkan, petugas tidak mengubah tiket lama, melainkan mencetak tiket revisi baru yang menduplikasi tiket lama ditambah perubahan baru (inilah konsep ekspresi `with`).

## Eksperimen

- Ubah nilai itemA.Stock menjadi 0 dan amati bagaimana switch expression langsung memberikan status UrgencyLevel.Critical.
- Coba bandingkan dua record dengan nilai yang sama persis: periksa apakah itemA == itemCopy bernilai True.
- Tambahkan properti baru ReorderThreshold pada record InventoryItem dan perbarui pattern matching.

---

## Tantangan

Buat record `StockAdjustment(string Sku, int QuantityChange, string Reason, DateTime Timestamp)` dan buat fungsi yang mengembalikan record `InventoryItem` baru dengan stok yang sudah disesuaikan tanpa memutasi record awal.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Kamu telah memahami sintaks C# 13 modern, record types, non-destructive mutation dengan `with`, dan pattern matching. Minggu depan kita masuk ke LINQ dan Generics.
