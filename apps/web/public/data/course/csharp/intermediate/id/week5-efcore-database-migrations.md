# Persistensi Data Relasional dengan Entity Framework Core 9

> **Kategori:** C# & .NET | **Level:** Menengah | **Minggu 5:** Persistensi Data Relasional dengan Entity Framework Core 9
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran ORM (Object-Relational Mapping) dan arsitektur DbContext di EF Core 9.
- Mengonfigurasi skema database relasional menggunakan Fluent API daripada data annotations kaku.
- Menguasai mekanisme Change Tracker dan penyimpanan data atomik dengan `SaveChangesAsync`.
- Memahami konsep migrasi database (`dotnet ef migrations add`) untuk evolusi skema produksi.

---

## Program: Konfigurasi DbContext, Fluent API & Transaksi Stok Atomik

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

// Menggunakan In-Memory Database provider untuk demonstrasi arsitektur
var options = new DbContextOptionsBuilder<WarehouseDbContext>()
    .UseInMemoryDatabase(databaseName: "WarehouseTestDb")
    .Options;

await using var db = new WarehouseDbContext(options);

// Inisialisasi Data Awal (Seed)
var product = new ProductEntity { Sku = "SKU-MON-4K", Name = "4K HDR Monitor", Stock = 10 };
db.Products.Add(product);
await db.SaveChangesAsync();

Console.WriteLine($"[DB INITIALIZED] Produk tersimpan: {product.Name} (Stock: {product.Stock})");

// Operasi Transaksi Atomik: Pengurangan Stok & Pembuatan Audit Log
var order = new StockAuditLog
{
    Sku = "SKU-MON-4K",
    QuantityDelta = -3,
    Reason = "Order #INV-2026-992",
    CreatedAtUtc = DateTime.UtcNow
};

product.Stock += order.QuantityDelta;
db.AuditLogs.Add(order);

await db.SaveChangesAsync();
Console.WriteLine($"[TRANSACTION SUCCESS] Stok baru {product.Sku}: {product.Stock} unit.");

// DbContext & Entitas Relasional
public class WarehouseDbContext(DbContextOptions<WarehouseDbContext> options) : DbContext(options)
{
    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<StockAuditLog> AuditLogs => Set<StockAuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Fluent API Configuration
        modelBuilder.Entity<ProductEntity>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Sku).IsUnique();
            entity.Property(e => e.Sku).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Name).HasMaxLength(150).IsRequired();
        });

        modelBuilder.Entity<StockAuditLog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Reason).HasMaxLength(200);
        });
    }
}

public class ProductEntity
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Stock { get; set; }
}

public class StockAuditLog
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public int QuantityDelta { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; }
}
```

---

## Konsep Kunci

Entity Framework Core (EF Core) adalah ORM resmi berkinerja tinggi dari Microsoft untuk .NET. EF Core memetakan kelas-kelas C# ke tabel-tabel database relasional (PostgreSQL, SQL Server, MySQL, SQLite) secara otomatis.

### Peran DbContext dan DbSet
`DbContext` mewakili satu sesi koneksi ke database yang bertanggung jawab untuk mengkueri dan menyimpan data. Setiap `DbSet<T>` bertindak sebagai representasi koleksi tabel yang dapat dikueri langsung menggunakan sintaks LINQ yang kemudian diterjemahkan menjadi perintah SQL asli oleh query compilation engine EF Core.

### Keunggulan Fluent API
Meskipun EF Core mendukung atribut (Data Annotations seperti `[Required]`), enterprise architecture lebih menyukai **Fluent API** di dalam method `OnModelCreating`. Fluent API memisahkan aturan skema basis data dari model domain, memungkinkan konfigurasi indeks unik, batasan panjang string, composite keys, dan foreign key constraints secara bersih dan fleksibel.

### Change Tracker dan Transaksi Implisit
EF Core melacak setiap perubahan pada entitas yang diambil dari database melalui `Change Tracker`. Ketika Anda memanggil `await db.SaveChangesAsync()`, EF Core secara otomatis membungkus semua operasi INSERT, UPDATE, dan DELETE yang tertunda ke dalam satu transaksi database atomik (ACID). Jika salah satu operasi gagal, seluruh transaksi di-rollback secara otomatis.


---

---

## Penjelasan untuk Pemula

Bayangkan DbContext seperti buku akuntansi resmi perusahaan. Anda bisa mencatat barang masuk di halaman satu dan pengurangan uang di halaman dua. Selama Anda belum membubuhkan cap stempel resmi (SaveChangesAsync), catatan itu masih berupa draf. Begitu dicap stempel, seluruh transaksi dicatat permanen dalam lemari besi bank.

## Eksperimen

- Coba query produk menggunakan LINQ `.FirstOrDefaultAsync(p => p.Sku == "SKU-MON-4K")` dan amati Change Tracker.
- Tambahkan relasi satu-ke-banyak (One-to-Many) antara ProductEntity dan StockAuditLog menggunakan Fluent API.
- Gunakan method `.AsNoTracking()` pada query pembacaan dan amati penghematan alokasi memori.

---

## Tantangan

Tambahkan properti konkurensi optimistik `[Timestamp] byte[] RowVersion` pada ProductEntity dan tangani pengecualian `DbUpdateConcurrencyException` saat dua transaksi mencoba mengurangi stok secara bersamaan.

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

Kamu telah menguasai EF Core 9, Fluent API, dan transaksi atomik. Minggu depan kita membangun HTTP endpoints berkecepatan tinggi dengan Minimal APIs.
