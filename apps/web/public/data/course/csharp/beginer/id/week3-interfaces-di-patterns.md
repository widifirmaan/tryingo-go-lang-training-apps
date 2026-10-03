# Interfaces, Loose Coupling & Dependency Injection di .NET

> **Kategori:** C# & .NET | **Level:** Pemula | **Minggu 3:** Interfaces, Loose Coupling & Dependency Injection di .NET

## Tujuan Pembelajaran

- Memahami prinsip Loose Coupling dan Inversion of Control (IoC).
- Mendefinisikan kontrak interface yang bersih untuk abstraksi akses data (Repository Pattern).
- Menggunakan IoC container bawaan .NET (`Microsoft.Extensions.DependencyInjection`).
- Memahami perbedaan Service Lifetimes: `Transient`, `Scoped`, dan `Singleton`.

---

## Program: Arsitektur Repository & Service Inventaris dengan Microsoft.Extensions.DependencyInjection

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

// Setup Service Collection (DI Container bawaan .NET)
var services = new ServiceCollection();
services.AddSingleton<IInventoryRepository, InMemoryInventoryRepository>();
services.AddTransient<IStockAuditService, StockAuditService>();

var provider = services.BuildServiceProvider();

// Resolusi dependency dari container
var auditService = provider.GetRequiredService<IStockAuditService>();
await auditService.RunAuditAsync("SKU-LOGI-M720");

// 1. Kontrak Interface
public interface IInventoryRepository
{
    Task<int> GetStockLevelAsync(string sku);
    Task UpdateStockAsync(string sku, int delta);
}

public interface IStockAuditService
{
    Task RunAuditAsync(string sku);
}

// 2. Implementasi Repository
public class InMemoryInventoryRepository : IInventoryRepository
{
    private readonly Dictionary<string, int> _storage = new()
    {
        ["SKU-LOGI-M720"] = 42,
        ["SKU-DELL-U2723"] = 15
    };

    public Task<int> GetStockLevelAsync(string sku) =>
        Task.FromResult(_storage.TryGetValue(sku, out var stock) ? stock : 0);

    public Task UpdateStockAsync(string sku, int delta)
    {
        _storage[sku] = (_storage.TryGetValue(sku, out var s) ? s : 0) + delta;
        return Task.CompletedTask;
    }
}

// 3. Domain Service dengan Injeksi Constructor
public class StockAuditService(IInventoryRepository repository) : IStockAuditService
{
    public async Task RunAuditAsync(string sku)
    {
        Console.WriteLine($"[AUDIT START] Auditing SKU: {sku}");
        var currentStock = await repository.GetStockLevelAsync(sku);
        Console.WriteLine($"[AUDIT RESULT] Current on-hand stock for {sku}: {currentStock} units");
        
        if (currentStock < 20)
        {
            Console.WriteLine("[AUDIT ALERT] Stock is below standard threshold! Triggering reorder.");
        }
    }
}
```

---

## Konsep Kunci

Aplikasi enterprise modern tidak boleh menginstansiasi dependensi secara langsung dengan kata kunci `new` di dalam logika bisnis (`tight coupling`). Pendekatan ini membuat kode mustahil untuk diuji dengan unit test (mocking) dan sulit dimodifikasi.

### Abstraksi Interface dan Inversion of Control
Dengan mendefinisikan interface seperti `IInventoryRepository`, kelas bisnis `StockAuditService` hanya bergantung pada kontrak fungsi, bukan implementasi konkretnya. Kita bisa mengganti penyimpanan dari in-memory menjadi PostgreSQL atau SQL Server tanpa mengubah satu baris pun kode logika di `StockAuditService`.

### Siklus Hidup Layanan (Service Lifetimes)
DI container di .NET mengelola tiga siklus hidup objek:
1. **Transient**: Instance baru dibuat setiap kali dependensi diminta. Cocok untuk layanan ringan stateless.
2. **Scoped**: Satu instance dibuat untuk setiap siklus HTTP request. Sangat ideal untuk `DbContext` database.
3. **Singleton**: Instance dibuat sekali saat startup aplikasi dan digunakan bersama oleh seluruh request selama aplikasi berjalan. Digunakan untuk caching atau koneksi thread-safe.

### Constructor Injection di C# Modern
Dengan C# 12/13 Primary Constructors, kita dapat menulis `public class StockAuditService(IInventoryRepository repository)` secara langsung. Parameter tersebut otomatis menjadi private field yang dapat diakses di seluruh method kelas, mengeliminasi boilerplate field assignment.


---

---

## Penjelasan untuk Pemula

Bayangkan stopkontak listrik di dinding rumah Anda (Interface). Anda bisa mencolokkan kipas angin, laptop, atau lampu (Implementasi Konkret) ke lubang stopkontak yang sama asalkan stekernya sesuai standar. Rumah Anda tidak perlu dibongkar setiap kali Anda ingin mengganti peralatan listrik.

## Eksperimen

- Ubah registrasi repository dari `AddSingleton` menjadi `AddTransient` dan amati perilakunya saat menyimpan state.
- Buat implementasi kedua `PostgreSqlInventoryRepository` dan ubah pendaftaran di container DI.
- Coba buat Circular Dependency (Layanan A butuh B, Layanan B butuh A) dan perhatikan error yang dilempar oleh .NET.

---

## Tantangan

Tambahkan decorator class `CachedInventoryRepository(IInventoryRepository inner)` yang mengimplementasikan `IInventoryRepository` dan menyimpan data di memory cache lokal sebelum memanggil inner repository.

---

## Ringkasan

Kamu telah menguasai Interface, Inversion of Control, dan Dependency Injection container .NET. Minggu depan kita mempelajari Async/Await dan I/O.
