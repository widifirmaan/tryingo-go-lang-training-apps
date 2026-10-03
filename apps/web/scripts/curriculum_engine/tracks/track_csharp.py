"""
C# Track Curriculum Generator (10 Weeks, 3 Levels)
Product: Enterprise Warehouse Inventory & Order Fulfillment Microservice (.NET 9 / C# 13)
"""

def get_track():
    return {
        'slug': 'csharp',
        'track_name': 'C# & .NET',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (C# Fundamentals & OOP)',
                'nameEn': 'Beginner (C# Fundamentals & OOP)',
                'descId': 'Fondasi sintaks C# 13 modern, records, pattern matching, LINQ, interfaces, DI, dan async/await.',
                'descEn': 'Modern C# 13 syntax fundamentals, records, pattern matching, LINQ, interfaces, DI, and async/await.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (Entity Framework Core & ASP.NET Core)',
                'nameEn': 'Intermediate (Entity Framework Core & ASP.NET Core)',
                'descId': 'Membangun Web API modern dengan Minimal APIs, relasi database EF Core 9, middleware, dan autentikasi.',
                'descEn': 'Building modern Web APIs with Minimal APIs, EF Core 9 relational persistence, middleware, and authentication.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (Resilience, Concurrency & Microservice Capstone)',
                'nameEn': 'Advanced (Resilience, Concurrency & Microservice Capstone)',
                'descId': 'Background workers, System.Threading.Channels, resilience Polly, Redis caching, dan microservice pergudangan production-ready.',
                'descEn': 'Background workers, System.Threading.Channels, Polly resilience, Redis caching, and production-ready warehouse microservice.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'syntax-oop-records',
                'titleId': 'Sintaks Modern C# 13, Primary Constructors & Record Types',
                'titleEn': 'Modern C# 13 Syntax, Primary Constructors & Record Types',
                'programId': 'Domain Model Inventaris Gudang dengan Record & Pattern Matching',
                'programEn': 'Warehouse Inventory Domain Models with Records & Pattern Matching',
                'language': 'csharp',
                'code': '''using System;

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
''',
                'objectivesId': [
                    'Memahami evolusi C# modern (C# 12/13) dengan top-level statements dan primary constructors.',
                    'Menggunakan record types untuk data domain yang immutable dengan dukungan built-in value equality.',
                    'Menerapkan non-destructive mutation menggunakan ekspresi `with`.',
                    'Menguasai pattern matching modern dengan switch expressions untuk logika bisnis yang bersih.',
                ],
                'objectivesEn': [
                    'Understand modern C# 12/13 features including top-level statements and primary constructors.',
                    'Use record types for immutable domain entities with built-in value-based equality.',
                    'Apply non-destructive mutation using the `with` expression.',
                    'Master pattern matching with switch expressions for clear and expressive business logic.',
                ],
                'explanationId': '''Modern C# 13 mengeliminasi boilerplate kode lama (seperti class Program, method Main berulang) sambil mempertahankan sistem tipe statis dan performa runtime .NET yang sangat kencang.

### Primary Constructors dan Top-Level Statements
Dengan C# modern, Anda dapat langsung mengeksekusi kode di baris pertama tanpa membungkusnya dalam class dan namespace secara manual. Fitur **Primary Constructors** pada class maupun record memungkinkan kita mendefinisikan parameter constructor langsung di samping nama tipe data, menghemat puluhan baris kode assignment `this._field = field`.

### Record Types dan Immutability
`record` adalah tipe referensi khusus yang dirancang untuk data immutable (tidak dapat diubah setelah dibuat). Dua record dengan nilai properti yang sama akan dianggap identik (`item1 == item2` bernilai true), berbeda dengan `class` standar yang membandingkan alamat pointer referensi memori. Untuk mengubah salah satu properti, kita menggunakan ekspresi `with` yang membuat salinan baru secara aman tanpa efek samping race condition.

### Pattern Matching dengan Switch Expressions
Switch expression di C# bukan sekadar switch-case biasa. Fitur ini mendukung perbandingan range (`<= 15`), perbandingan tipe data, hingga tuple pattern matching, menghasilkan kode evaluasi status inventaris yang ringkas, deklaratif, dan aman dari bug percabangan yang terlewat.
''',
                'explanationEn': '''Modern C# 13 eliminates legacy boilerplate (such as manual class definitions and static void Main methods) while preserving strict static typing and top-tier .NET runtime throughput.

### Primary Constructors and Top-Level Statements
With modern C#, executable code begins directly on the first line. **Primary Constructors** allow developers to declare constructor parameters directly adjacent to the type definition, eliminating dozens of lines of repetitive constructor assignment fields.

### Record Types and Immutability
A `record` is a reference type designed specifically for immutable data modeling. Two separate record instances containing identical values are treated as equal (`item1 == item2` evaluates to true), in contrast to standard classes which evaluate memory address reference identity. Modifying a record relies on the `with` expression, safely generating an altered shallow copy.

### Pattern Matching with Switch Expressions
Switch expressions in C# provide concise, declarative condition handling. By supporting relational patterns (`<= 15`), type patterns, and tuple checks, business logic such as warehouse stock evaluation remains bug-free and expressive.
''',
                'beginnerId': '''Bayangkan sebuah tiket manifest kargo di bandara. Begitu dicetak, lembaran tiket itu tidak boleh dicoret-coret sembarangan (itu adalah sifat `record` yang immutable). Jika ada barang baru yang ditambahkan, petugas tidak mengubah tiket lama, melainkan mencetak tiket revisi baru yang menduplikasi tiket lama ditambah perubahan baru (inilah konsep ekspresi `with`).''',
                'beginnerEn': '''Think of an airport cargo manifest sheet. Once printed, you do not scribble over it (it behaves as an immutable `record`). If an item changes, the officer prints a revised manifest that duplicates the previous one with the new changes incorporated (this is the `with` expression).''',
                'experimentsId': [
                    'Ubah nilai itemA.Stock menjadi 0 dan amati bagaimana switch expression langsung memberikan status UrgencyLevel.Critical.',
                    'Coba bandingkan dua record dengan nilai yang sama persis: periksa apakah itemA == itemCopy bernilai True.',
                    'Tambahkan properti baru ReorderThreshold pada record InventoryItem dan perbarui pattern matching.',
                ],
                'experimentsEn': [
                    'Change itemA.Stock to 0 and observe the switch expression triggering UrgencyLevel.Critical.',
                    'Compare two distinct record instances containing identical field values: verify whether itemA == itemCopy yields True.',
                    'Introduce a ReorderThreshold property to InventoryItem and incorporate it into the pattern matching logic.',
                ],
                'challengeId': 'Buat record `StockAdjustment(string Sku, int QuantityChange, string Reason, DateTime Timestamp)` dan buat fungsi yang mengembalikan record `InventoryItem` baru dengan stok yang sudah disesuaikan tanpa memutasi record awal.',
                'challengeEn': 'Create a record `StockAdjustment(string Sku, int QuantityChange, string Reason, DateTime Timestamp)` and author a function that yields a newly updated `InventoryItem` without mutating the original record.',
                'summaryId': 'Kamu telah memahami sintaks C# 13 modern, record types, non-destructive mutation dengan `with`, dan pattern matching. Minggu depan kita masuk ke LINQ dan Generics.',
                'summaryEn': 'You have mastered modern C# 13 syntax, record types, non-destructive mutation with `with`, and pattern matching. Next week we explore LINQ and Generics.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'collections-generics-linq',
                'titleId': 'Generic Collections & Query Data Deklaratif dengan LINQ',
                'titleEn': 'Generic Collections & Declarative Data Queries with LINQ',
                'programId': 'Pipeline Pemrosesan Stok & Peringatan Reorder dengan LINQ',
                'programEn': 'Inventory Stock Processing Pipeline & Reorder Alerts with LINQ',
                'language': 'csharp',
                'code': '''using System;
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

Console.WriteLine("\\n=== PRIORITAS PENGELUARAN FIFO (Batch Terdekat Kadaluarsa) ===");
var fifoQueue = inventory
    .Where(b => b.Quantity > 0)
    .OrderBy(b => b.ExpiryDate)
    .ToList();

foreach (var batch in fifoQueue.Take(3))
{
    Console.WriteLine($"-> Batch {batch.BatchId} ({batch.Sku}): {batch.Quantity} unit (Exp: {batch.ExpiryDate:yyyy-MM-dd})");
}

public record StockBatch(string BatchId, string Sku, int Quantity, DateTime ExpiryDate, decimal UnitCost);
''',
                'objectivesId': [
                    'Menguasai Generic Collections seperti `List<T>`, `Dictionary<TKey, TValue>`, dan `Queue<T>`.',
                    'Memahami konsep eksekusi tertunda (Deferred Execution) pada LINQ.',
                    'Menggunakan operator LINQ esensial: `Where`, `Select`, `GroupBy`, `Sum`, `OrderBy`, dan anonymous types.',
                    'Mengimplementasikan logika rotasi batch stok gudang (FIFO) berbasis kueri fungsional.',
                ],
                'objectivesEn': [
                    'Master Generic Collections including `List<T>`, `Dictionary<TKey, TValue>`, and `Queue<T>`.',
                    'Understand deferred execution mechanics in LINQ.',
                    'Use essential LINQ operators: `Where`, `Select`, `GroupBy`, `Sum`, `OrderBy`, and anonymous types.',
                    'Implement warehouse batch rotation logic (FIFO) using declarative queries.',
                ],
                'explanationId': '''LINQ (Language Integrated Query) adalah salah satu fitur paling revolusioner di ekosistem .NET, memungkinkan developer melakukan kueri data dari koleksi memori, database SQL, atau file XML menggunakan sintaks seragam yang type-safe.

### Generic Collections
C# menyediakan koleksi bertipe aman (`System.Collections.Generic`). `List<T>` memberikan akses array dinamis, `Dictionary<TKey, TValue>` memberikan pencarian instan O(1) berbasis hash table, dan `Queue<T>` sangat ideal untuk urutan pesanan FIFO (First In, First Out).

### Deferred Execution pada LINQ
Metode LINQ seperti `Where` dan `Select` tidak langsung mengeksekusi iterasi data saat dideklarasikan. Kueri hanya benar-benar dievaluasi saat kita melakukan iterasi (misal dengan `foreach`) atau memanggil terminal operator seperti `.ToList()`, `.ToArray()`, atau `.Count()`. Karakteristik ini membuat pipeline kueri sangat efisien dalam penggunaan CPU dan memori.

### Agregasi Data Kompleks dengan GroupBy
Dalam sistem pergudangan, satu SKU barang sering kali tersebar di banyak batch penerimaan yang berbeda harga beli dan tanggal kedaluwarsanya. Dengan `GroupBy(b => b.Sku)`, kita dapat mengelompokkan data berdasarkan SKU, lalu menghitung total stok dan valuasi finansial secara deklaratif tanpa nested loop manual yang rawan bug.
''',
                'explanationEn': '''LINQ (Language Integrated Query) represents one of the most powerful paradigms in .NET, enabling developers to query in-memory collections, SQL databases, or XML payloads using unified, strongly typed syntax.

### Generic Collections
C# delivers type-safe collections in `System.Collections.Generic`. `List<T>` provides dynamic arrays, `Dictionary<TKey, TValue>` offers O(1) key lookups via hashtables, and `Queue<T>` coordinates FIFO ordering.

### Deferred Execution in LINQ
LINQ query methods such as `Where` and `Select` do not execute immediately when defined. The pipeline is only evaluated when iterated over (e.g., within a `foreach` loop) or materialized through terminal methods like `.ToList()`, `.ToArray()`, or `.Count()`. This eliminates unnecessary allocations and maximizes CPU cache locality.

### GroupBy Aggregations
In inventory architectures, a single SKU is frequently distributed across diverse procurement batches with differing acquisition costs and expiry windows. Invoking `GroupBy(b => b.Sku)` organizes collections by SKU, computing totals and financial valuations without nested loops.
''',
                'beginnerId': '''Bayangkan Anda adalah manajer gudang yang memiliki ribuan kartu stok di meja. Jika Anda menyortirnya satu per satu dengan tangan, Anda akan kelelahan. LINQ seperti mesin sortir otomatis: Anda cukup menekan tombol "Kelompokkan berdasarkan Nama Barang" dan "Hitung Total Harga", mesin akan langsung menyajikan laporannya dalam hitungan detik.''',
                'beginnerEn': '''Imagine you are a warehouse manager with thousands of inventory index cards on your desk. Sorting through them manually is exhausting. LINQ acts as an automated sorting machine: you specify "Group by Product Name" and "Sum Values", and the machine compiles the report instantly.''',
                'experimentsId': [
                    'Tambahkan batch baru dengan Quantity 0 dan pastikan filter `Where(b => b.Quantity > 0)` mengabaikannya.',
                    'Hitung rata-rata harga beli (Weighted Average Cost) untuk setiap SKU menggunakan LINQ.',
                    'Ubah `.OrderBy(b => b.ExpiryDate)` menjadi `.OrderByDescending` dan amati dampaknya terhadap urutan FIFO.',
                ],
                'experimentsEn': [
                    'Add a new batch with Quantity 0 and ensure the `Where(b => b.Quantity > 0)` clause excludes it.',
                    'Calculate the Weighted Average Cost for each SKU using LINQ aggregation methods.',
                    'Switch `.OrderBy` to `.OrderByDescending` and examine how the queue order changes.',
                ],
                'challengeId': 'Tulis fungsi LINQ `AllocateStock(List<StockBatch> batches, string sku, int requestedQty)` yang mengurangi quantity dari batch terlama (FIFO) sampai requestedQty terpenuhi, atau melempar pengecualian jika total stok tidak mencukupi.',
                'challengeEn': 'Author a LINQ function `AllocateStock(List<StockBatch> batches, string sku, int requestedQty)` that deducts quantity from the oldest batches (FIFO) until requestedQty is satisfied, throwing an exception if stock is insufficient.',
                'summaryId': 'Kamu telah menguasai Generic Collections dan kekuatan kueri deklaratif LINQ. Minggu depan kita akan mendesain arsitektur berbasis Interface dan Dependency Injection.',
                'summaryEn': 'You have mastered Generic Collections and declarative LINQ querying. Next week we will design modular architectures using Interfaces and Dependency Injection.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'interfaces-di-patterns',
                'titleId': 'Interfaces, Loose Coupling & Dependency Injection di .NET',
                'titleEn': 'Interfaces, Loose Coupling & Dependency Injection in .NET',
                'programId': 'Arsitektur Repository & Service Inventaris dengan Microsoft.Extensions.DependencyInjection',
                'programEn': 'Inventory Repository & Service Architecture with Microsoft.Extensions.DependencyInjection',
                'language': 'csharp',
                'code': '''using System;
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
''',
                'objectivesId': [
                    'Memahami prinsip Loose Coupling dan Inversion of Control (IoC).',
                    'Mendefinisikan kontrak interface yang bersih untuk abstraksi akses data (Repository Pattern).',
                    'Menggunakan IoC container bawaan .NET (`Microsoft.Extensions.DependencyInjection`).',
                    'Memahami perbedaan Service Lifetimes: `Transient`, `Scoped`, dan `Singleton`.',
                ],
                'objectivesEn': [
                    'Understand Loose Coupling and Inversion of Control (IoC) principles.',
                    'Define clean interface contracts for data access abstraction (Repository Pattern).',
                    'Use the built-in .NET IoC container (`Microsoft.Extensions.DependencyInjection`).',
                    'Understand Service Lifetimes: `Transient`, `Scoped`, and `Singleton`.',
                ],
                'explanationId': '''Aplikasi enterprise modern tidak boleh menginstansiasi dependensi secara langsung dengan kata kunci `new` di dalam logika bisnis (`tight coupling`). Pendekatan ini membuat kode mustahil untuk diuji dengan unit test (mocking) dan sulit dimodifikasi.

### Abstraksi Interface dan Inversion of Control
Dengan mendefinisikan interface seperti `IInventoryRepository`, kelas bisnis `StockAuditService` hanya bergantung pada kontrak fungsi, bukan implementasi konkretnya. Kita bisa mengganti penyimpanan dari in-memory menjadi PostgreSQL atau SQL Server tanpa mengubah satu baris pun kode logika di `StockAuditService`.

### Siklus Hidup Layanan (Service Lifetimes)
DI container di .NET mengelola tiga siklus hidup objek:
1. **Transient**: Instance baru dibuat setiap kali dependensi diminta. Cocok untuk layanan ringan stateless.
2. **Scoped**: Satu instance dibuat untuk setiap siklus HTTP request. Sangat ideal untuk `DbContext` database.
3. **Singleton**: Instance dibuat sekali saat startup aplikasi dan digunakan bersama oleh seluruh request selama aplikasi berjalan. Digunakan untuk caching atau koneksi thread-safe.

### Constructor Injection di C# Modern
Dengan C# 12/13 Primary Constructors, kita dapat menulis `public class StockAuditService(IInventoryRepository repository)` secara langsung. Parameter tersebut otomatis menjadi private field yang dapat diakses di seluruh method kelas, mengeliminasi boilerplate field assignment.
''',
                'explanationEn': '''Modern enterprise systems avoid instantiating dependencies directly using `new` within core business logic (`tight coupling`). Direct instantiation prevents modular unit testing with mock objects and hinders refactoring.

### Interface Abstractions & IoC
By defining interfaces like `IInventoryRepository`, the domain service `StockAuditService` depends strictly on contract abstractions rather than concrete classes. We can switch storage backends from in-memory stores to PostgreSQL or SQL Server without modifying domain logic.

### Service Lifetimes in .NET
The built-in .NET DI container manages three fundamental lifetimes:
1. **Transient**: A fresh instance is created every time the dependency is requested. Ideal for lightweight, stateless services.
2. **Scoped**: An instance is instantiated once per HTTP request lifecycle. Essential for database contexts (`DbContext`).
3. **Singleton**: An instance is created once upon startup and shared across all consumers for the application lifecycle.

### Primary Constructor Dependency Injection
With C# 12/13, `public class StockAuditService(IInventoryRepository repository)` concisely captures dependencies as class-scoped fields without boilerplate private readonly assignments.
''',
                'beginnerId': '''Bayangkan stopkontak listrik di dinding rumah Anda (Interface). Anda bisa mencolokkan kipas angin, laptop, atau lampu (Implementasi Konkret) ke lubang stopkontak yang sama asalkan stekernya sesuai standar. Rumah Anda tidak perlu dibongkar setiap kali Anda ingin mengganti peralatan listrik.''',
                'beginnerEn': '''Think of a standard wall electrical outlet (the Interface). You can plug in a fan, laptop, or lamp (Concrete Implementations) into the same socket as long as the plug meets the standard. You do not rewire your house whenever you purchase a new appliance.''',
                'experimentsId': [
                    'Ubah registrasi repository dari `AddSingleton` menjadi `AddTransient` dan amati perilakunya saat menyimpan state.',
                    'Buat implementasi kedua `PostgreSqlInventoryRepository` dan ubah pendaftaran di container DI.',
                    'Coba buat Circular Dependency (Layanan A butuh B, Layanan B butuh A) dan perhatikan error yang dilempar oleh .NET.',
                ],
                'experimentsEn': [
                    'Change repository registration from `AddSingleton` to `AddTransient` and observe state persistence behavior.',
                    'Author a second implementation `PostgreSqlInventoryRepository` and swap it in the DI container.',
                    'Simulate a circular dependency (Service A requires B, Service B requires A) and observe the runtime exception thrown by .NET.',
                ],
                'challengeId': 'Tambahkan decorator class `CachedInventoryRepository(IInventoryRepository inner)` yang mengimplementasikan `IInventoryRepository` dan menyimpan data di memory cache lokal sebelum memanggil inner repository.',
                'challengeEn': 'Implement a decorator class `CachedInventoryRepository(IInventoryRepository inner)` that implements `IInventoryRepository` and caches stock lookups in local memory before delegating to the inner repository.',
                'summaryId': 'Kamu telah menguasai Interface, Inversion of Control, dan Dependency Injection container .NET. Minggu depan kita mempelajari Async/Await dan I/O.',
                'summaryEn': 'You have mastered Interfaces, Inversion of Control, and .NET Dependency Injection. Next week we explore Async/Await and I/O.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'async-tasks-io',
                'titleId': 'Pemrograman Asynchronous: Task, ValueTask & Stream I/O',
                'titleEn': 'Asynchronous Programming: Task, ValueTask & Stream I/O',
                'programId': 'Import Manifest Katalog Stok Asinkron dengan CancellationToken',
                'programEn': 'Asynchronous Stock Catalog Importer with CancellationToken',
                'language': 'csharp',
                'code': '''using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

Console.WriteLine("[START] Memulai simulasi import data stok...");
var catalogData = new List<CatalogRecord>
{
    new("SKU-LOGI-M720", "Logitech M720 Triathlon", 450_000m),
    new("SKU-DELL-U2723", "Dell UltraSharp U2723QE", 7_200_000m),
    new("SKU-KEYCH-K2", "Keychron K2 Mechanical Keyboard", 1_350_000m)
};

var memoryStream = new MemoryStream();
await JsonSerializer.SerializeAsync(memoryStream, catalogData, cancellationToken: cts.Token);
memoryStream.Position = 0;

var importer = new CatalogImporter();
var count = await importer.ProcessStreamAsync(memoryStream, cts.Token);
Console.WriteLine($"[COMPLETE] Berhasil mengimpor {count} item katalog!");

public record CatalogRecord(string Sku, string Name, decimal Price);

public class CatalogImporter
{
    public async Task<int> ProcessStreamAsync(Stream stream, CancellationToken cancellationToken)
    {
        var records = await JsonSerializer.DeserializeAsync<List<CatalogRecord>>(stream, cancellationToken: cancellationToken);
        if (records == null) return 0;

        int processed = 0;
        foreach (var record in records)
        {
            // Periksa pembatalan sebelum operasi berat
            cancellationToken.ThrowIfCancellationRequested();

            await ProcessItemWithNetworkSimulationAsync(record, cancellationToken);
            processed++;
            Console.WriteLine($" -> [{processed}/{records.Count}] Tersimpan: {record.Sku} ({record.Name})");
        }

        return processed;
    }

    private async Task ProcessItemWithNetworkSimulationAsync(CatalogRecord record, CancellationToken ct)
    {
        // Simulasi latensi database I/O non-blocking
        await Task.Delay(150, ct);
    }
}
''',
                'objectivesId': [
                    'Memahami Thread Pool, State Machine Async/Await, dan non-blocking I/O di .NET.',
                    'Mengetahui perbedaan performa antara `Task` dan `ValueTask`.',
                    'Menerapkan `CancellationToken` untuk membatalkan operasi asinkron yang memakan waktu lama.',
                    'Melakukan streaming serialisasi dan deserialisasi JSON dengan `System.Text.Json`.',
                ],
                'objectivesEn': [
                    'Understand Thread Pool execution, Async/Await state machines, and non-blocking I/O in .NET.',
                    'Differentiate performance characteristics between `Task` and `ValueTask`.',
                    'Apply `CancellationToken` for cooperative cancellation of long-running operations.',
                    'Stream JSON serialization and deserialization using high-throughput `System.Text.Json`.',
                ],
                'explanationId': '''Pemrograman asinkron di .NET bukan berarti membuat thread baru secara manual, melainkan melepaskan thread yang ada ke ThreadPool saat menunggu operasi I/O (seperti panggilan jaringan, database, atau pembacaan disk).

### Async/Await dan State Machine
Ketika kata kunci `await` dipanggil pada sebuah `Task`, kompilator C# mengubah method tersebut menjadi state machine internal. Thread saat ini dikembalikan ke pool untuk melayani request pengguna lain. Ketika operasi I/O selesai, thread pool mengambil kelanjutan kode (continuation) dan melanjutkannya secara mulus.

### Nilai Task vs ValueTask
`Task` adalah objek referensi heap yang dialokasikan setiap kali method async dipanggil. Untuk operasi intensif yang sering kali selesai secara synchronous (misalnya pembacaan data dari in-memory cache), .NET menyediakan `ValueTask<T>`. `ValueTask` adalah struct berbasis stack yang mengeliminasi alokasi garbage collection saat hasil sudah tersedia langsung di memori.

### Pembatalan Kooperatif (CancellationToken)
Dalam sistem backend production, pengguna bisa menutup browser atau API Gateway bisa mengalami timeout. Jika backend terus melanjutkan operasi berat setelah request dibatalkan, sumber daya server terbuang sia-sia. Dengan menyertakan `CancellationToken`, operasi dapat dihentikan di tengah jalan secara anggun menggunakan `cancellationToken.ThrowIfCancellationRequested()`.
''',
                'explanationEn': '''Asynchronous programming in .NET does not entail spawning raw OS threads manually; it yields threads back to the .NET ThreadPool while awaiting I/O operations (network requests, database queries, disk operations).

### Async/Await State Machines
When `await` is called on a `Task`, the C# compiler transforms the method into an underlying state machine. The current thread is released back to the ThreadPool to service concurrent workloads. Once the I/O completion port signals readiness, a thread resumes execution seamlessly.

### Task vs ValueTask
A `Task` is a heap-allocated reference object. For high-throughput scenarios where results are frequently computed synchronously (e.g., retrieving cached entries), .NET provides `ValueTask<T>`. Being a stack-allocated struct, `ValueTask` eliminates unnecessary Garbage Collector allocations.

### Cooperative Cancellation
In production backends, clients may abort connections or gateways may enforce timeouts. Passing a `CancellationToken` through asynchronous pipelines ensures servers immediately halt redundant processing via `ThrowIfCancellationRequested()`.
''',
                'beginnerId': '''Bayangkan Anda memesan kopi di kafe. Kasir memberikan Anda nomor antrean (Task) dan Anda bisa duduk membaca buku (thread tidak terblokir). Saat kopi siap, nomor Anda dipanggil dan Anda mengambil kopi Anda. Anda tidak perlu berdiri kaku di depan kasir selama 10 menit menunggu barista selesai meracik.''',
                'beginnerEn': '''Imagine ordering coffee at a cafe. The cashier hands you a buzzer (the Task), and you sit down to read a book (the thread is not blocked). When your coffee is ready, the buzzer rings and you collect it. You do not freeze stiff at the counter for ten minutes waiting on the barista.''',
                'experimentsId': [
                    'Ubah timeout CancellationTokenSource menjadi 100ms dan perhatikan `OperationCanceledException` yang ditangkap.',
                    'Gunakan `Task.WhenAll` untuk memproses複数の catalog records secara paralel.',
                    'Bandingkan waktu eksekusi sekuensial vs paralel menggunakan `Stopwatch`.',
                ],
                'experimentsEn': [
                    'Adjust CancellationTokenSource timeout to 100ms and observe the `OperationCanceledException` raised.',
                    'Use `Task.WhenAll` to process multiple catalog records concurrently.',
                    'Compare sequential versus concurrent processing runtimes using `Stopwatch`.',
                ],
                'challengeId': 'Buat method `Task ProcessInBatchesAsync<T>(IEnumerable<T> items, int batchSize, Func<T, Task> processor, CancellationToken ct)` yang memproses item dalam kelompok paralel terbatas menggunakan `SemaphoreSlim`.',
                'challengeEn': 'Build `Task ProcessInBatchesAsync<T>(IEnumerable<T> items, int batchSize, Func<T, Task> processor, CancellationToken ct)` processing items in bounded concurrent batches using `SemaphoreSlim`.',
                'summaryId': 'Kamu telah menguasai Task, async/await, CancellationToken, dan streaming JSON. Level 1 selesai! Level 2 akan membawa kita ke Entity Framework Core dan Web API.',
                'summaryEn': 'You have mastered Task, async/await, CancellationToken, and JSON streaming. Level 1 complete! Level 2 moves us into Entity Framework Core and Web APIs.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'efcore-database-migrations',
                'titleId': 'Persistensi Data Relasional dengan Entity Framework Core 9',
                'titleEn': 'Relational Data Persistence with Entity Framework Core 9',
                'programId': 'Konfigurasi DbContext, Fluent API & Transaksi Stok Atomik',
                'programEn': 'DbContext Configuration, Fluent API & Atomic Stock Transactions',
                'language': 'csharp',
                'code': '''using System;
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
''',
                'objectivesId': [
                    'Memahami peran ORM (Object-Relational Mapping) dan arsitektur DbContext di EF Core 9.',
                    'Mengonfigurasi skema database relasional menggunakan Fluent API daripada data annotations kaku.',
                    'Menguasai mekanisme Change Tracker dan penyimpanan data atomik dengan `SaveChangesAsync`.',
                    'Memahami konsep migrasi database (`dotnet ef migrations add`) untuk evolusi skema produksi.',
                ],
                'objectivesEn': [
                    'Understand ORM architecture and DbContext mechanics in EF Core 9.',
                    'Configure relational schemas declaratively via Fluent API rather than brittle attributes.',
                    'Master the EF Core Change Tracker and atomic commits with `SaveChangesAsync`.',
                    'Understand database migration lifecycles (`dotnet ef migrations add`) for production evolutions.',
                ],
                'explanationId': '''Entity Framework Core (EF Core) adalah ORM resmi berkinerja tinggi dari Microsoft untuk .NET. EF Core memetakan kelas-kelas C# ke tabel-tabel database relasional (PostgreSQL, SQL Server, MySQL, SQLite) secara otomatis.

### Peran DbContext dan DbSet
`DbContext` mewakili satu sesi koneksi ke database yang bertanggung jawab untuk mengkueri dan menyimpan data. Setiap `DbSet<T>` bertindak sebagai representasi koleksi tabel yang dapat dikueri langsung menggunakan sintaks LINQ yang kemudian diterjemahkan menjadi perintah SQL asli oleh query compilation engine EF Core.

### Keunggulan Fluent API
Meskipun EF Core mendukung atribut (Data Annotations seperti `[Required]`), enterprise architecture lebih menyukai **Fluent API** di dalam method `OnModelCreating`. Fluent API memisahkan aturan skema basis data dari model domain, memungkinkan konfigurasi indeks unik, batasan panjang string, composite keys, dan foreign key constraints secara bersih dan fleksibel.

### Change Tracker dan Transaksi Implisit
EF Core melacak setiap perubahan pada entitas yang diambil dari database melalui `Change Tracker`. Ketika Anda memanggil `await db.SaveChangesAsync()`, EF Core secara otomatis membungkus semua operasi INSERT, UPDATE, dan DELETE yang tertunda ke dalam satu transaksi database atomik (ACID). Jika salah satu operasi gagal, seluruh transaksi di-rollback secara otomatis.
''',
                'explanationEn': '''Entity Framework Core (EF Core) is Microsoft's official high-performance ORM for .NET. EF Core maps strongly-typed C# domain models directly to relational schemas across PostgreSQL, SQL Server, MySQL, and SQLite.

### DbContext and DbSet Roles
`DbContext` represents an active unit of work session with the underlying database engine. Each `DbSet<T>` functions as a queryable table entity, evaluating LINQ expressions and translating them into optimized native SQL queries.

### Fluent API Schema Design
While EF Core supports attributes (Data Annotations), modern enterprise systems advocate configuring entities via the **Fluent API** within `OnModelCreating`. This pattern decouples database concerns from pure domain logic, offering expressive control over unique constraints, column lengths, and relational cascades.

### Change Tracking & Implicit Transactions
The EF Core `Change Tracker` continuously monitors modifications across tracked entities. Invoking `await db.SaveChangesAsync()` automatically wraps all staged INSERT, UPDATE, and DELETE operations within an atomic ACID database transaction.
''',
                'beginnerId': '''Bayangkan DbContext seperti buku akuntansi resmi perusahaan. Anda bisa mencatat barang masuk di halaman satu dan pengurangan uang di halaman dua. Selama Anda belum membubuhkan cap stempel resmi (SaveChangesAsync), catatan itu masih berupa draf. Begitu dicap stempel, seluruh transaksi dicatat permanen dalam lemari besi bank.''',
                'beginnerEn': '''Think of DbContext as a company accounting ledger. You write an inbound shipment on page one and a ledger deduction on page two. Until you press the official wax seal (`SaveChangesAsync`), entries remain drafts. Once sealed, all changes are committed permanently to the bank vault.''',
                'experimentsId': [
                    'Coba query produk menggunakan LINQ `.FirstOrDefaultAsync(p => p.Sku == "SKU-MON-4K")` dan amati Change Tracker.',
                    'Tambahkan relasi satu-ke-banyak (One-to-Many) antara ProductEntity dan StockAuditLog menggunakan Fluent API.',
                    'Gunakan method `.AsNoTracking()` pada query pembacaan dan amati penghematan alokasi memori.',
                ],
                'experimentsEn': [
                    'Query an entity using LINQ `.FirstOrDefaultAsync(p => p.Sku == "SKU-MON-4K")` and inspect the Change Tracker.',
                    'Add a One-to-Many relational relationship between ProductEntity and StockAuditLog via Fluent API.',
                    'Invoke `.AsNoTracking()` on read-only queries and note the reduced memory allocations.',
                ],
                'challengeId': 'Tambahkan properti konkurensi optimistik `[Timestamp] byte[] RowVersion` pada ProductEntity dan tangani pengecualian `DbUpdateConcurrencyException` saat dua transaksi mencoba mengurangi stok secara bersamaan.',
                'challengeEn': 'Add an optimistic concurrency property `[Timestamp] byte[] RowVersion` to ProductEntity and gracefully handle `DbUpdateConcurrencyException` during simulated race conditions.',
                'summaryId': 'Kamu telah menguasai EF Core 9, Fluent API, dan transaksi atomik. Minggu depan kita membangun HTTP endpoints berkecepatan tinggi dengan Minimal APIs.',
                'summaryEn': 'You have mastered EF Core 9, Fluent API, and atomic transactions. Next week we construct high-throughput HTTP endpoints with Minimal APIs.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'aspnetcore-minimal-apis',
                'titleId': 'Membangun Web API Berkecepatan Tinggi dengan ASP.NET Core Minimal APIs',
                'titleEn': 'Building High-Throughput Web APIs with ASP.NET Core Minimal APIs',
                'programId': 'RESTful Inventory Endpoints dengan Minimal APIs & OpenAPI Swagger',
                'programEn': 'RESTful Inventory Endpoints with Minimal APIs & OpenAPI Swagger',
                'language': 'csharp',
                'code': '''using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

// Registrasi Swagger / OpenAPI & Layanan
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// In-Memory Thread-Safe Data Store untuk Endpoint Demo
var itemDb = new ConcurrentDictionary<string, InventoryDto>();
itemDb.TryAdd("SKU-100", new InventoryDto("SKU-100", "Ergonomic Chair", 50, 2_400_000m));

// Endpoint Route Grouping
var inventoryApi = app.MapGroup("/api/inventory").WithTags("Inventory");

// 1. GET: Ambil semua stok
inventoryApi.MapGet("/", () => Results.Ok(itemDb.Values));

// 2. GET: Ambil detail berdasarkan SKU
inventoryApi.MapGet("/{sku}", (string sku) =>
    itemDb.TryGetValue(sku, out var item)
        ? Results.Ok(item)
        : Results.NotFound(new { Message = $"Barang dengan SKU '{sku}' tidak ditemukan." }));

// 3. POST: Buat item inventaris baru
inventoryApi.MapPost("/", (CreateInventoryRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Sku) || req.InitialStock < 0)
        return Results.BadRequest(new { Message = "SKU wajib diisi dan stok tidak boleh negatif." });

    var newItem = new InventoryDto(req.Sku, req.Name, req.InitialStock, req.UnitPrice);
    if (!itemDb.TryAdd(req.Sku, newItem))
        return Results.Conflict(new { Message = $"SKU '{req.Sku}' sudah terdaftar." });

    return Results.Created($"/api/inventory/{req.Sku}", newItem);
});

// Jalankan Web API
app.Run();

// DTO Models
public record InventoryDto(string Sku, string Name, int Stock, decimal UnitPrice);
public record CreateInventoryRequest(string Sku, string Name, int InitialStock, decimal UnitPrice);
''',
                'objectivesId': [
                    'Memahami filosofi arsitektur ASP.NET Core Minimal APIs dibandingkan Controller lama.',
                    'Menggunakan `WebApplicationBuilder` dan `MapGroup` untuk pengelompokan endpoint REST yang rapi.',
                    'Menerapkan Typed Results (`Results.Ok`, `Results.NotFound`, `Results.Created`) untuk respons HTTP standar.',
                    'Mengintegrasikan dokumentasi OpenAPI (Swagger) secara otomatis pada endpoint API.',
                ],
                'objectivesEn': [
                    'Understand ASP.NET Core Minimal APIs architectural philosophy over legacy MVC Controllers.',
                    'Use `WebApplicationBuilder` and `MapGroup` for modular REST endpoint structuring.',
                    'Apply Typed Results (`Results.Ok`, `Results.NotFound`, `Results.Created`) for standardized HTTP responses.',
                    'Integrate automated OpenAPI (Swagger) documentation natively.',
                ],
                'explanationId': '''Minimal APIs diperkenalkan pada .NET 6 dan terus disempurnakan di .NET 8 dan 9. Fitur ini dirancang untuk microservices berkecepatan tinggi yang mengutamakan latensi rendah dan konsumsi memori minimal.

### Minimal APIs vs Traditional Controllers
Controller tradisional di ASP.NET Core memerlukan banyak dependensi MVC, refleksi controller routing, dan overhead inisialisasi class. Minimal APIs menggunakan lambda mapping langsung ke routing engine ASP.NET Core, memotong latensi hingga 30-40% dan memungkinkan penulisan ratusan request per detik dengan konsumsi RAM yang jauh lebih hemat.

### Route Groups dan Modularitas
Untuk mencegah file `Program.cs` menjadi terlalu panjang di aplikasi berskala besar, Minimal APIs menyediakan method `MapGroup("/api/inventory")`. Route Groups memungkinkan kita menerapkan prefix URL, otorisasi, rate limiting, dan metadata OpenAPI sekaligus pada sekelompok endpoint terkait.

### Typed Results dan Status Code Standar
Penggunaan class `Results` (seperti `Results.Created`, `Results.BadRequest`, `Results.NotFound`) memastikan API mengembalikan HTTP Status Code yang semantik sesuai standar RESTful. Selain itu, Typed Results mempermudah pembuatan automated integration test karena tipe balikan dapat diuji secara type-safe.
''',
                'explanationEn': '''Minimal APIs, introduced in .NET 6 and optimized in .NET 8/9, cater specifically to cloud-native microservices requiring ultra-low latency and minimal memory footprint.

### Minimal APIs vs Traditional Controllers
Legacy MVC controllers carry reflection overhead and model metadata plumbing. Minimal APIs bind lambda handlers directly to ASP.NET Core's routing tree, cutting latency by 30-40% and servicing higher request volumes per second with minimal RAM consumption.

### Route Groups and Modular Architecture
To prevent `Program.cs` from becoming monolithic, Minimal APIs offer `MapGroup("/api/inventory")`. Route groups allow centralized application of URL prefixes, authorization policies, rate-limiting rules, and OpenAPI metadata across collections of endpoints.

### Typed Results & Semantics
Utilizing `Results` helpers (`Results.Created`, `Results.BadRequest`, `Results.NotFound`) ensures adherence to RESTful conventions. Typed Results facilitate robust integration testing through strongly-typed assertions.
''',
                'beginnerId': '''Bayangkan perbedaan antara restoran formal besar dengan pelayan berdasi (Controller MVC) vs kedai kopi drive-thru kilat (Minimal APIs). Jika Anda hanya butuh segelas espresso cepat, kedai drive-thru langsung menyajikannya ke jendela mobil Anda tanpa perlu duduk di meja formal dan menunggu pelayan mencatat pesanan Anda.''',
                'beginnerEn': '''Consider the difference between a fine-dining establishment with multi-course table service (MVC Controllers) versus a high-speed drive-thru kiosk (Minimal APIs). If your goal is a quick espresso, the drive-thru serves you directly at the window without formal table reservation rituals.''',
                'experimentsId': [
                    'Tambahkan endpoint `DELETE /api/inventory/{sku}` dan kembalikan `Results.NoContent()` jika berhasil.',
                    'Implementasikan Endpoint Filter menggunakan `.AddEndpointFilter()` untuk memvalidasi panjang karakter SKU.',
                    'Uji coba endpoint melalui antarmuka Swagger UI di browser pada `/swagger`.',
                ],
                'experimentsEn': [
                    'Add a `DELETE /api/inventory/{sku}` endpoint returning `Results.NoContent()` on success.',
                    'Implement an Endpoint Filter via `.AddEndpointFilter()` to validate minimum SKU length.',
                    'Test endpoints interactively via the built-in Swagger UI at `/swagger`.',
                ],
                'challengeId': 'Buat Endpoint Filter reusable `ValidationFilter<TRequest>` yang menggunakan library `FluentValidation` untuk memvalidasi payload request secara otomatis sebelum mengeksekusi route handler.',
                'challengeEn': 'Build a reusable `ValidationFilter<TRequest>` using `FluentValidation` to automatically validate incoming request bodies before executing the route handler.',
                'summaryId': 'Kamu telah menguasai ASP.NET Core Minimal APIs dan Typed Results. Minggu depan kita memperkuat API dengan Middleware, JWT Auth, dan ProblemDetails.',
                'summaryEn': 'You have mastered ASP.NET Core Minimal APIs and Typed Results. Next week we harden our API with Middleware, JWT Auth, and ProblemDetails.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'middleware-auth-error-handling',
                'titleId': 'HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails',
                'titleEn': 'HTTP Pipeline: Custom Middleware, JWT Auth & RFC 7807 ProblemDetails',
                'programId': 'Pipeline Keamanan API Gudang dengan JWT & Global Exception Handling',
                'programEn': 'Warehouse API Security Pipeline with JWT & Global Exception Handling',
                'language': 'csharp',
                'code': '''using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Konfigurasi Autentikasi JWT
var jwtKey = "KunciRahasiaSuperAmanGudangTryngo2026Minimal32Karakter!";
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("WarehouseManagerOnly", policy => policy.RequireRole("Manager"));
});

// Standar Error RFC 7807
builder.Services.AddProblemDetails();

var app = builder.Build();

// 1. Global Exception Handler Middleware
app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        var ex = exceptionHandlerPathFeature?.Error;

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/problem+json";

        var problem = Results.Problem(
            title: "Terjadi kesalahan internal server.",
            detail: ex?.Message,
            statusCode: StatusCodes.Status500InternalServerError
        );

        await problem.ExecuteAsync(context);
    });
});

// 2. Custom Logging & Timing Middleware
app.Use(async (context, next) =>
{
    var sw = System.Diagnostics.Stopwatch.StartNew();
    await next(context);
    sw.Stop();
    Console.WriteLine($"[HTTP AUDIT] {context.Request.Method} {context.Request.Path} -> {context.Response.StatusCode} in {sw.ElapsedMilliseconds}ms");
});

app.UseAuthentication();
app.UseAuthorization();

// Protected Endpoint
app.MapGet("/api/warehouse/secret-audit", (ClaimsPrincipal user) =>
{
    var username = user.Identity?.Name ?? "Unknown";
    return Results.Ok(new { Message = $"Akses diizinkan untuk Manager: {username}", Timestamp = DateTime.UtcNow });
}).RequireAuthorization("WarehouseManagerOnly");

app.Run();
''',
                'objectivesId': [
                    'Memahami urutan eksekusi HTTP Pipeline Middleware di ASP.NET Core.',
                    'Mengamankan Web API menggunakan JSON Web Tokens (JWT) dan Role-Based Access Control (RBAC).',
                    'Mengimplementasikan Global Error Handling terpusat berstandar RFC 7807 (ProblemDetails).',
                    'Membangun Custom Middleware untuk logging audit dan tracing durasi request.',
                ],
                'objectivesEn': [
                    'Understand HTTP Middleware pipeline execution ordering in ASP.NET Core.',
                    'Secure Web APIs using JSON Web Tokens (JWT) and Role-Based Access Control (RBAC).',
                    'Implement centralized Global Error Handling complying with RFC 7807 ProblemDetails.',
                    'Build custom middleware for audit logging and request execution timing.',
                ],
                'explanationId': '''Setiap HTTP request yang masuk ke ASP.NET Core melewati serangkaian komponen yang disebut **Middleware Pipeline**. Setiap middleware dapat memeriksa request, memutuskan apakah akan meneruskannya ke middleware berikutnya (`next()`), atau langsung menghentikan request (short-circuiting).

### Urutan Middleware (Order of Execution)
Urutan pemanggilan method `app.Use...` sangat krusial. Middleware penanganan error harus diletakkan paling awal agar dapat menangkap error yang dilempar oleh middleware di bawahnya. Middleware Autentikasi (`app.UseAuthentication`) harus selalu dipanggil sebelum Otorisasi (`app.UseAuthorization`) agar identitas pengguna sudah tervalidasi sebelum hak aksesnya diperiksa.

### Standar RFC 7807 Problem Details
Alih-alih mengembalikan pesan string mentah atau stack trace berbahaya ke klien saat terjadi error, aplikasi enterprise modern menggunakan spesifikasi standar **RFC 7807 Problem Details**. Standar ini menyediakan format JSON terstruktur yang memuat status code, judul error, detail penyebab, dan URI instans error yang ramah bagi consumer API.

### Keamanan JWT dan Claims
JWT memungkinkan sistem backend memverifikasi identitas pengguna tanpa perlu melakukan query database pada setiap request. Token ditandatangani secara kriptografis menggunakan algoritma HMAC-SHA256, dan memuat klaim peran (Role) yang langsung dievaluasi oleh policy otorisasi .NET.
''',
                'explanationEn': '''Every incoming HTTP request in ASP.NET Core traverses a sequence of delegates known as the **Middleware Pipeline**. Each middleware inspects the context, optionally passing execution downstream via `next()` or short-circuiting the request.

### Pipeline Order of Execution
The registration sequence of `app.Use...` delegates is critical. Exception handlers must reside at the very top to intercept downstream errors. Authentication (`app.UseAuthentication`) must precede Authorization (`app.UseAuthorization`) so claims identities are resolved prior to policy evaluation.

### RFC 7807 Problem Details Standard
Rather than returning raw stack traces or plain text errors upon exceptions, enterprise backends conform to the **RFC 7807 Problem Details** standard. It returns structured JSON containing status codes, title, error details, and instance URIs.

### JWT Security and Role Claims
JWT enables stateless identity verification without hitting authentication databases on every request. Tokens are cryptographically signed using HMAC-SHA256, carrying user role claims evaluated by ASP.NET Core authorization policies.
''',
                'beginnerId': '''Bayangkan pintu gerbang keamanan bandara internasional. Anda harus melewati: (1) Mesin X-Ray pendeteksi logam (Error Handler), (2) Petugas pemeriksa tiket dan paspor (Authentication Middleware), dan (3) Pintu ruang tunggu VIP yang hanya boleh dimasuki pemegang tiket kelas satu (Authorization Policy).''',
                'beginnerEn': '''Think of airport security checkpoints. You pass through: (1) Metal detectors (Error Handling Middleware), (2) Passport and ticket verification (Authentication Middleware), and (3) The VIP First-Class lounge door requiring special boarding passes (Authorization Policies).''',
                'experimentsId': [
                    'Kirim request ke `/api/warehouse/secret-audit` tanpa header Authorization dan perhatikan respons 401 Unauthorized.',
                    'Buat token JWT tiruan menggunakan `JwtSecurityTokenHandler` dan uji endpoint dengan header `Authorization: Bearer <token>`.',
                    'Lemparkan `throw new InvalidOperationException("Gudang terkunci!")` di dalam endpoint dan amati format JSON ProblemDetails.',
                ],
                'experimentsEn': [
                    'Issue a request to `/api/warehouse/secret-audit` without an Authorization header and verify the 401 Unauthorized status.',
                    'Generate a test JWT using `JwtSecurityTokenHandler` and access the endpoint with `Authorization: Bearer <token>`.',
                    'Throw an unhandled exception within the handler and verify the resulting RFC 7807 JSON structure.',
                ],
                'challengeId': 'Buat Custom Middleware `ApiKeyMiddleware` yang memeriksa header `X-API-KEY` pada setiap request webhook supplier eksternal dan menolak request dengan status 403 Forbidden jika key tidak cocok.',
                'challengeEn': 'Build a custom `ApiKeyMiddleware` that validates an `X-API-KEY` header on external supplier webhook calls, rejecting invalid requests with 403 Forbidden.',
                'summaryId': 'Kamu telah menguasai Middleware pipeline, JWT, dan RFC 7807 ProblemDetails. Level 2 selesai! Di Level 3 kita menaklukkan Concurrency, Resilience, dan Microservice Capstone.',
                'summaryEn': 'You have mastered Middleware pipelines, JWT, and RFC 7807 ProblemDetails. Level 2 complete! Level 3 takes us through Concurrency, Resilience, and our Microservice Capstone.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'background-services-channels',
                'titleId': 'Background Services, Hosted Workers & System.Threading.Channels',
                'titleEn': 'Background Services, Hosted Workers & System.Threading.Channels',
                'programId': 'Antrean Pemrosesan Pesanan Gudang Asinkron dengan Bounded Channels',
                'programEn': 'Asynchronous Warehouse Order Queue with Bounded Channels',
                'language': 'csharp',
                'code': '''using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Setup Hosted Application
var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((_, services) =>
    {
        // Daftarkan Channel sebagai Singleton (Maksimal 100 antrean di buffer)
        var channel = Channel.CreateBounded<FulfillmentTask>(new BoundedChannelOptions(100)
        {
            FullMode = BoundedChannelFullMode.Wait
        });
        services.AddSingleton(channel);
        services.AddSingleton(channel.Writer);
        services.AddSingleton(channel.Reader);

        // Daftarkan Worker Background Service
        services.AddHostedService<OrderFulfillmentWorker>();
    })
    .Build();

var channelWriter = host.Services.GetRequiredService<ChannelWriter<FulfillmentTask>>();

// Jalankan host di background
_ = host.RunAsync();

// Simulasi Produsen: Kirim 5 pesanan ke antrean
Console.WriteLine("[PRODUCER] Mengirim 5 pesanan pemenuhan gudang ke antrean channel...");
for (int i = 1; i <= 5; i++)
{
    var task = new FulfillmentTask($"ORD-2026-{i:D3}", $"SKU-M720-{i}", i * 2);
    await channelWriter.WriteAsync(task);
    Console.WriteLine($" -> [ENQUEUED] Pesanan {task.OrderId} berhasil masuk antrean.");
}

// Tunggu worker memproses beberapa detik
await Task.Delay(2000);
channelWriter.Complete();

public record FulfillmentTask(string OrderId, string Sku, int Quantity);

// Konsumen: BackgroundService berjalan terus-menerus
public class OrderFulfillmentWorker(ChannelReader<FulfillmentTask> reader) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Console.WriteLine("[WORKER START] OrderFulfillmentWorker aktif memantau channel antrean.");

        try
        {
            // Baca item secara non-blocking saat tersedia
            await foreach (var task in reader.ReadAllAsync(stoppingToken))
            {
                Console.WriteLine($"[WORKER PROCESSING] Memulai picking barang untuk Pesanan {task.OrderId} ({task.Quantity} unit)...");
                await Task.Delay(300, stoppingToken); // Simulasi kerja fisik
                Console.WriteLine($"[WORKER DONE] Pesanan {task.OrderId} siap dipacking!");
            }
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("[WORKER STOPPING] Worker dihentikan secara anggun (Graceful Shutdown).");
        }
    }
}
''',
                'objectivesId': [
                    'Memahami arsitektur `IHostedService` dan `BackgroundService` di .NET.',
                    'Menguasai pola Producer-Consumer thread-safe berkecepatan tinggi menggunakan `System.Threading.Channels`.',
                    'Mengatur backpressure menggunakan `BoundedChannelOptions` untuk mencegah kehabisan memori server.',
                    'Menerapkan Graceful Shutdown pada background worker saat aplikasi dihentikan.',
                ],
                'objectivesEn': [
                    'Understand `IHostedService` and `BackgroundService` architecture in .NET.',
                    'Master high-throughput thread-safe Producer-Consumer patterns with `System.Threading.Channels`.',
                    'Manage backpressure using `BoundedChannelOptions` to protect server memory boundaries.',
                    'Implement graceful shutdown mechanics across long-running background workers.',
                ],
                'explanationId': '''Dalam sistem e-commerce pergudangan skala enterprise, request pemesanan barang dari user tidak boleh menunggu proses fisik (picking, packing, cetak label barcode) selesai sebelum mengembalikan respons HTTP 200. Operasi berat harus didelegasikan ke background worker.

### Pola Producer-Consumer dengan System.Threading.Channels
`System.Threading.Channels` adalah fitur bawaan .NET berkinerja sangat tinggi yang mengungguli `BlockingCollection` lama. Channel dirancang khusus untuk async/await tanpa lock locking CPU yang berat. Produsen (HTTP endpoint) menulis ke `ChannelWriter`, sedangkan konsumen (Background Service) membaca dari `ChannelReader` secara asynchronous menggunakan `await foreach`.

### Menangani Backpressure dengan Bounded Channels
Jika ribuan pesanan masuk bersamaan sedangkan pekerja gudang hanya mampu memproses puluhan per detik, antrean memori tanpa batas (`UnboundedChannel`) bisa menyebabkan server kehabisan RAM (Out-Of-Memory Crash). Dengan `BoundedChannel(100)`, channel menerapkan **Backpressure**: produsen akan dipaksa menunggu secara asinkron (`BoundedChannelFullMode.Wait`) sampai ada slot antrean yang kosong.

### Siklus Hidup BackgroundService
`BackgroundService` mengimplementasikan `IHostedService`. Method `ExecuteAsync` dieksekusi di background thread saat aplikasi .NET menyala. Ketika aplikasi dimatikan (misal saat rolling deployment di Kubernetes), .NET memicu pembatalan pada `CancellationToken` sehingga worker dapat menyelesaikan tugas yang sedang berjalan sebelum proses benar-benar keluar (Graceful Shutdown).
''',
                'explanationEn': '''In high-scale warehouse architectures, incoming customer checkout requests must not block on physical fulfillment workflows (order picking, packaging, airway bill generation) before returning HTTP 200. Long-running workloads must be offloaded to asynchronous background workers.

### Producer-Consumer with System.Threading.Channels
`System.Threading.Channels` provides an ultra-low-allocation, lock-free communication pipeline tailored for async/await. HTTP endpoints push tasks into the `ChannelWriter`, while background workers consume tasks from the `ChannelReader` asynchronously via `await foreach`.

### Backpressure Management via Bounded Channels
If order bursts arrive faster than backend workers can process them, unbounded queues can trigger Out-Of-Memory (OOM) fatal crashes. Utilizing `BoundedChannel(capacity)` enforces **Backpressure**: producers pause asynchronously (`BoundedChannelFullMode.Wait`) until buffer slots become available.

### BackgroundService Lifecycle & Graceful Shutdown
`BackgroundService` implements `IHostedService`. When .NET receives a termination signal (SIGTERM in Kubernetes), the framework signals the `stoppingToken`, allowing workers to complete in-flight batches before terminating cleanly.
''',
                'beginnerId': '''Bayangkan loket restoran burger cepat saji. Kasir menerima pesanan Anda dan langsung memberikan struk dalam 5 detik, lalu meletakkan kertas pesanan ke atas rel ban berjalan menuju dapur (Channel). Koki di dapur (Background Worker) mengambil pesanan satu per satu dan memasaknya tanpa membuat antrean kasir di depan macet.''',
                'beginnerEn': '''Think of a fast-food drive-thru. The cashier takes your order and hands you a receipt in seconds, placing the ticket onto a motorized kitchen slip belt (the Channel). The kitchen line chefs (Background Workers) prepare the burgers independently without blocking the cash register.''',
                'experimentsId': [
                    'Ubah kapasitas BoundedChannel menjadi 2 dan amati bagaimana produsen menunggu saat buffer penuh.',
                    'Daftarkan dua instance `OrderFulfillmentWorker` sekaligus untuk memproses antrean secara paralel.',
                    'Kirim sinyal CTRL+C pada aplikasi host dan perhatikan penangkapan `OperationCanceledException`.',
                ],
                'experimentsEn': [
                    'Shrink BoundedChannel capacity to 2 and observe the writer waiting when the queue fills.',
                    'Register multiple `OrderFulfillmentWorker` instances to process the channel tasks concurrently.',
                    'Simulate a cancellation event and verify graceful shutdown execution.',
                ],
                'challengeId': 'Buat Background Worker yang membaca event dead-letter (pesanan yang gagal diproses setelah 3 kali percobaan) dan menyimpannya ke tabel audit log kegagalan database.',
                'challengeEn': 'Build a Dead-Letter Background Worker that intercepts orders failing after 3 attempts, routing them to a database error audit table.',
                'summaryId': 'Kamu telah menguasai BackgroundService, System.Threading.Channels, dan manajemen backpressure. Minggu depan kita membahas Caching dan Ketahanan Sistem dengan Polly.',
                'summaryEn': 'You have mastered BackgroundService, System.Threading.Channels, and backpressure management. Next week we cover Caching and System Resilience with Polly.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'caching-resilience-polly',
                'titleId': 'Distributed Caching (Redis) & Ketahanan Sistem dengan Polly v8',
                'titleEn': 'Distributed Caching (Redis) & System Resilience with Polly v8',
                'programId': 'Pipeline Resilient Supplier API dengan Retry, Circuit Breaker & Caching',
                'programEn': 'Resilient Supplier API Pipeline with Retry, Circuit Breaker & Caching',
                'language': 'csharp',
                'code': '''using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Polly;
using Polly.CircuitBreaker;
using Polly.Retry;

// 1. Setup Memory Cache
var cache = new MemoryCache(new MemoryCacheOptions());

// 2. Setup Polly v8 Resilience Pipeline (Retry + Circuit Breaker)
var pipeline = new ResiliencePipelineBuilder<string>()
    .AddRetry(new RetryStrategyOptions<string>
    {
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromMilliseconds(100),
        BackoffType = DelayBackoffType.Exponential,
        OnRetry = args =>
        {
            Console.WriteLine($"[POLLY RETRY] Percobaan ke-{args.AttemptNumber + 1} gagal! Menunggu {args.RetryDelay.TotalMilliseconds}ms...");
            return default;
        }
    })
    .AddCircuitBreaker(new CircuitBreakerStrategyOptions<string>
    {
        FailureRatio = 0.5,
        SamplingDuration = TimeSpan.FromSeconds(5),
        MinimumThroughput = 2,
        BreakDuration = TimeSpan.FromSeconds(3),
        OnOpened = _ => { Console.WriteLine("[CIRCUIT BREAKER] Sirkuit TERBUKA! Supplier ERP sedang down."); return default; },
        OnClosed = _ => { Console.WriteLine("[CIRCUIT BREAKER] Sirkuit TERTUTUP normal kembali."); return default; }
    })
    .Build();

var supplierClient = new SupplierApiClient();

// Simulasi Pemanggilan dengan Perlindungan Caching + Polly
string skuTarget = "SKU-LOGI-M720";
Console.WriteLine($"[STEP 1] Meminta data stok supplier untuk {skuTarget}...");

string stockInfo = await cache.GetOrCreateAsync(skuTarget, async entry =>
{
    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
    Console.WriteLine(" -> Cache miss! Memanggil Supplier API melalui Polly Resilience Pipeline...");
    
    return await pipeline.ExecuteAsync(async state =>
        await supplierClient.FetchStockFromRemoteSupplierAsync(skuTarget)
    );
}) ?? "Unknown";

Console.WriteLine($"[RESULT 1] Stok Supplier: {stockInfo}");

// Panggilan kedua: harus langsung dari cache tanpa menyentuh supplier
Console.WriteLine("\\n[STEP 2] Meminta ulang data yang sama (Harus Cache HIT):");
string cachedInfo = cache.Get<string>(skuTarget) ?? "Empty";
Console.WriteLine($"[RESULT 2 - CACHE HIT]: {cachedInfo}");

public class SupplierApiClient
{
    private int _attempts = 0;
    public Task<string> FetchStockFromRemoteSupplierAsync(string sku)
    {
        _attempts++;
        if (_attempts < 2)
        {
            // Simulasi kegagalan jaringan sementara
            throw new HttpRequestException("Koneksi timeout ke Supplier ERP!");
        }
        return Task.FromResult($"Stok Tersedia: 150 unit (Supplier Batam)");
    }
}
''',
                'objectivesId': [
                    'Menguasai strategi caching: In-Memory Caching vs Distributed Caching (`IDistributedCache` / Redis).',
                    'Mengonfigurasi Cache Eviction Policies (`AbsoluteExpiration` vs `SlidingExpiration`).',
                    'Memahami arsitektur Polly v8: Resilience Pipelines, Exponential Backoff, dan Jitter.',
                    'Menerapkan pola Circuit Breaker untuk mencegah cascading failures pada layanan pihak ketiga.',
                ],
                'objectivesEn': [
                    'Master caching architectures: In-Memory Caching vs Distributed Caching (`IDistributedCache` / Redis).',
                    'Configure Cache Eviction Policies (`AbsoluteExpiration` vs `SlidingExpiration`).',
                    'Understand Polly v8 architecture: Resilience Pipelines, Exponential Backoff, and Jitter.',
                    'Implement the Circuit Breaker pattern to avert cascading microservice failures.',
                ],
                'explanationId': '''Dalam arsitektur microservices terdistribusi, kegagalan jaringan atau keterlambatan respon dari sistem eksternal (seperti ERP supplier atau payment gateway) adalah hal yang tidak dapat dihindari. Dua pilar utama untuk menjaga ketersediaan sistem adalah **Caching** dan **Resilience Engineering**.

### In-Memory vs Distributed Caching
`IMemoryCache` menyimpan data di RAM proses aplikasi lokal, memberikan latensi sub-milidetik. Namun pada klaster multi-instance di cloud, setiap node memiliki cache berbeda. `IDistributedCache` (dengan Redis) memungkinkan ratusan pod/container berbagi satu penyimpanan cache yang konsisten.

### Ketahanan Sistem dengan Polly v8
Polly adalah pustaka ketahanan (resilience and transient-fault-handling) standar industri untuk .NET. Di Polly v8, pipeline ketahanan dibangun menggunakan `ResiliencePipelineBuilder` yang sangat modular dan hemat alokasi memori.

### Strategi Retry dan Circuit Breaker
- **Exponential Backoff Retry**: Ketika terjadi error sementara (transient error seperti timeout 504), Polly mencoba ulang dengan jeda waktu yang meningkat secara eksponensial (100ms, 200ms, 400ms) agar tidak membebani server yang sedang down.
- **Circuit Breaker**: Jika persentase kegagalan melebihi ambang batas, sirkuit "terbuka" (Open). Semua request berikutnya langsung ditolak seketika (Fast Fail) tanpa mengirim paket jaringan ke server target, memberi waktu bagi sistem downstream untuk pulih.
''',
                'explanationEn': '''In distributed microservice topologies, network blips and downstream latency from third-party systems (such as supplier ERPs or banking gateways) are inevitable. Maintaining high availability rests on two pillars: **Caching** and **Resilience Engineering**.

### In-Memory vs Distributed Caching
`IMemoryCache` stores state in local process memory, delivering sub-millisecond lookups. However, in containerized cloud clusters with autoscaling, instances drift out of sync. `IDistributedCache` backed by Redis coordinates a shared, synchronized cache tier across dozens of microservice pods.

### System Resilience with Polly v8
Polly is .NET's flagship resilience framework. In Polly v8, pipelines are declared composably via `ResiliencePipelineBuilder`, dramatically reducing memory allocations and streamlining policy orchestration.

### Retry & Circuit Breaker Dynamics
- **Exponential Backoff Retry**: When transient faults arise (e.g., 504 Gateway Timeouts), Polly retries requests with progressively increasing delays (100ms, 200ms, 400ms), mitigating thundering herd problems.
- **Circuit Breaker**: When failure rates exceed defined thresholds, the breaker trips to the Open state. Subsequent calls fail immediately without touching downstream networks, granting target systems breathing room to recover.
''',
                'beginnerId': '''Bayangkan Anda sedang menelpon teman yang sinyalnya putus-putus. Jika langsung gagal, Anda menunggu beberapa detik sebelum mencoba menelpon lagi (Retry dengan Backoff). Namun jika operator mengatakan "Nomor yang Anda tuju sedang tidak aktif", Anda berhenti menelpon selama 1 jam daripada menghabiskan baterai Anda terus-menerus (Circuit Breaker).''',
                'beginnerEn': '''Imagine calling a colleague whose cellular reception is intermittent. You pause several seconds before redialing (Retry with Backoff). But if the operator automated message states the cell tower is offline, you cease dialing for an hour rather than draining your phone battery futilely (Circuit Breaker).''',
                'experimentsId': [
                    'Ubah kegagalan supplier menjadi 5 kali dan perhatikan bagaimana Polly melempar pengecualian setelah retry habis.',
                    'Kombinasikan sliding expiration dengan absolute expiration pada cache entry.',
                    'Tambahkan fallback strategy di Polly untuk mengembalikan data stok offline default ketika Circuit Breaker terbuka.',
                ],
                'experimentsEn': [
                    'Simulate 5 continuous supplier failures and observe Polly exhausting retry attempts.',
                    'Combine sliding expiration with absolute expiration on the cache entry.',
                    'Add a fallback strategy in Polly returning stale/cached fallback data when the circuit opens.',
                ],
                'challengeId': 'Bangun decorator `ResilientSupplierService` yang mengombinasikan Polly v8 pipeline dengan `IDistributedCache` Redis dan metrik OpenTelemetry untuk memantau waktu respons eksternal.',
                'challengeEn': 'Build a `ResilientSupplierService` decorator combining a Polly v8 pipeline with Redis `IDistributedCache` and OpenTelemetry metrics tracking downstream latencies.',
                'summaryId': 'Kamu telah menguasai Caching dan ketahanan sistem terdistribusi dengan Polly v8. Minggu depan adalah Capstone Final: Microservice Pergudangan Enterprise Production-Ready!',
                'summaryEn': 'You have mastered Caching and distributed resilience with Polly v8. Next week is our Final Capstone: Production-Ready Enterprise Warehouse Microservice!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-inventory-microservice',
                'titleId': 'Capstone: Microservice Pergudangan & Pemenuhan Pesanan Enterprise Production-Ready',
                'titleEn': 'Capstone: Production-Ready Enterprise Warehouse & Order Fulfillment Microservice',
                'programId': 'Layanan Microservice Gudang Lengkap (.NET 9, Minimal API, EF Core, Health Checks & Channels)',
                'programEn': 'Complete Warehouse Microservice (.NET 9, Minimal API, EF Core, Health Checks & Channels)',
                'language': 'csharp',
                'code': '''using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Channels;

var builder = WebApplication.CreateBuilder(args);

// 1. Database Context
builder.Services.AddDbContext<WarehouseDbContext>(opt => opt.UseInMemoryDatabase("ProdWarehouseDb"));

// 2. High-Throughput Queue Channel
var orderChannel = Channel.CreateBounded<OrderReservationEvent>(new BoundedChannelOptions(500)
{
    FullMode = BoundedChannelFullMode.Wait
});
builder.Services.AddSingleton(orderChannel);
builder.Services.AddSingleton(orderChannel.Writer);
builder.Services.AddSingleton(orderChannel.Reader);

// 3. Background Processing Worker
builder.Services.AddHostedService<WarehouseFulfillmentProcessor>();

// 4. Health Checks & OpenAPI
builder.Services.AddHealthChecks();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapHealthChecks("/healthz");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// REST Endpoints
var api = app.MapGroup("/api/v1/warehouse").WithTags("Warehouse Management");

// Query Stok
api.MapGet("/stocks", async (WarehouseDbContext db) =>
    Results.Ok(await db.Items.AsNoTracking().ToListAsync()));

// Buat Reservasi Pesanan (Non-blocking ke background worker)
api.MapPost("/reservations", async (
    ReserveStockRequest req,
    WarehouseDbContext db,
    ChannelWriter<OrderReservationEvent> writer) =>
{
    var item = await db.Items.FirstOrDefaultAsync(i => i.Sku == req.Sku);
    if (item == null)
        return Results.NotFound(new { Message = $"Barang dengan SKU {req.Sku} tidak ditemukan." });

    if (item.Stock < req.Quantity)
        return Results.BadRequest(new { Message = "Stok barang tidak mencukupi untuk reservasi." });

    // Deduksi stok secara atomik
    item.Stock -= req.Quantity;
    await db.SaveChangesAsync();

    // Teruskan event ke worker pemrosesan fisik via channel
    var reservationEvent = new OrderReservationEvent(Guid.NewGuid(), req.OrderId, req.Sku, req.Quantity, DateTime.UtcNow);
    await writer.WriteAsync(reservationEvent);

    return Results.Accepted($"/api/v1/warehouse/orders/{req.OrderId}", new
    {
        Status = "Reserved",
        RemainingStock = item.Stock,
        Event = reservationEvent
    });
});

// Seed data awal
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<WarehouseDbContext>();
    db.Items.AddRange(
        new InventoryItemEntity { Id = 1, Sku = "SKU-LOGI-M720", Name = "Logitech M720 Triathlon", Stock = 50 },
        new InventoryItemEntity { Id = 2, Sku = "SKU-DELL-U2723", Name = "Dell UltraSharp 27 4K", Stock = 20 }
    );
    db.SaveChanges();
}

app.Run();

// Data Models & Database Context
public class WarehouseDbContext(DbContextOptions<WarehouseDbContext> opt) : DbContext(opt)
{
    public DbSet<InventoryItemEntity> Items => Set<InventoryItemEntity>();
}

public class InventoryItemEntity
{
    public int Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Stock { get; set; }
}

public record ReserveStockRequest(string OrderId, string Sku, int Quantity);
public record OrderReservationEvent(Guid EventId, string OrderId, string Sku, int Quantity, DateTime OccurredAtUtc);

// Background Worker
public class WarehouseFulfillmentProcessor(ChannelReader<OrderReservationEvent> reader) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var evt in reader.ReadAllAsync(stoppingToken))
        {
            Console.WriteLine($"[FULFILLMENT WORKER] Memproses picking untuk Order {evt.OrderId}: {evt.Quantity}x {evt.Sku}...");
            await Task.Delay(250, stoppingToken);
            Console.WriteLine($"[FULFILLMENT WORKER] Selesai! Resi pengiriman dibuat untuk Order {evt.OrderId}.");
        }
    }
}
''',
                'objectivesId': [
                    'Menyatukan seluruh konsep: Minimal APIs, EF Core 9, Channels, BackgroundService, dan Health Checks.',
                    'Menerapkan pola Asynchronous Request-Reply (`202 Accepted`) untuk pemrosesan order skala besar.',
                    'Mengonfigurasi endpoint `/healthz` untuk probe liveness dan readiness di lingkungan Kubernetes/Docker.',
                    'Menyiapkan arsitektur microservice C# yang siap diproduksi dan diuji secara komprehensif.',
                ],
                'objectivesEn': [
                    'Unify all learned concepts: Minimal APIs, EF Core 9, Channels, BackgroundService, and Health Checks.',
                    'Implement the Asynchronous Request-Reply (`202 Accepted`) pattern for high-scale order fulfillment.',
                    'Configure `/healthz` endpoints for Kubernetes/Docker liveness and readiness probes.',
                    'Ship an enterprise-grade C# microservice architecture ready for production deployment.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir. Aplikasi ini menyatukan semua fondasi teknik C# dan .NET modern ke dalam satu arsitektur microservice pergudangan yang tangguh, modular, dan berkinerja tinggi.

### Pola Asynchronous Request-Reply (HTTP 202 Accepted)
Ketika klien mengirim request pemesanan barang ke `/reservations`, API tidak memblokir koneksi HTTP sampai proses fisik pergudangan selesai. API langsung memvalidasi stok, memperbarui database secara atomik, menerbitkan event ke `System.Threading.Channels`, dan langsung mengembalikan respons `HTTP 202 Accepted` bersama URI status pesanan. Pola ini memungkinkan sistem menangani lonjakan ribuan transaksi per detik (Flash Sale) tanpa downtime.

### Kubernetes Health Checks (/healthz)
Microservice modern yang dijalankan di dalam container Docker atau klaster Kubernetes membutuhkan mekanisme pemantauan kesehatan otomatis. Dengan `builder.Services.AddHealthChecks()` dan `app.MapHealthChecks("/healthz")`, orchestrator Kubernetes dapat mendeteksi apabila database terputus atau thread mengalami deadlock, lalu me-restart pod secara otomatis.

### Kemudahan Integrasi Testing
Karena arsitektur menggunakan Inversion of Control dan DbContext berbasis opsi, sistem ini sangat mudah diuji menggunakan `WebApplicationFactory<Program>` di pustaka pengujian `xUnit`. Developer dapat menjalankan end-to-end integration test tanpa memerlukan database fisik eksternal.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern C# and .NET engineering patterns into a resilient, production-ready warehouse fulfillment microservice.

### Asynchronous Request-Reply Pattern (HTTP 202 Accepted)
When clients submit order reservations to `/reservations`, the service avoids blocking the client connection on warehouse physical processing. It validates inventory, commits database updates atomically, pushes an event to `System.Threading.Channels`, and immediately yields an `HTTP 202 Accepted` response. This architecture sustains massive flash-sale checkout spikes effortlessly.

### Kubernetes Health Checks (/healthz)
Cloud-native microservices running in Docker containers and Kubernetes clusters require automated health probes. Utilizing `builder.Services.AddHealthChecks()` and `app.MapHealthChecks("/healthz")`, Kubernetes orchestrators monitor container health, automatically restarting pods if database pools or threads stall.

### Integration Testability
Because the architecture strictly decouples dependencies via Inversion of Control and configurable DbContext options, the service seamlessly integrates with `WebApplicationFactory<Program>` in `xUnit` suites for automated continuous integration testing.
''',
                'beginnerId': '''Proyek ini ibarat pabrik modern yang sepenuhnya terotomatisasi. Bagian depan adalah meja penerima tamu yang ramah dan cepat (Minimal API). Di belakangnya ada buku besar otomatis yang selalu akurat (EF Core), ban berjalan berkecepatan tinggi yang mengatur antrean barang (Channels), dan robot-robot pekerja yang bekerja tanpa henti di gudang (Background Services).''',
                'beginnerEn': '''This project mirrors a fully automated modern distribution facility. The front entrance features high-speed reception counters (Minimal APIs). Behind it lies an infallible digital balance ledger (EF Core), an automated motorized conveyor sorting packages (Channels), and relentless autonomous sorting robots (Background Services).''',
                'experimentsId': [
                    'Jalankan aplikasi dan uji coba alur reservasi pesanan lengkap melalui Swagger UI.',
                    'Buka browser ke `/healthz` dan pastikan status "Healthy" dikembalikan.',
                    'Kirim 10 reservasi secara beruntun dan amati bagaimana worker memprosesnya secara asinkron tanpa memblokir respons HTTP.',
                ],
                'experimentsEn': [
                    'Run the application and verify the entire order reservation workflow via Swagger UI.',
                    'Navigate to `/healthz` in your browser and verify the "Healthy" HTTP 200 payload.',
                    'Trigger 10 concurrent reservations and observe the worker processing tasks asynchronously without stalling responses.',
                ],
                'challengeId': 'Tambahkan autentikasi JWT pada endpoint `/reservations` dan simpan log audit pemenuhan ke tabel PostgreSQL menggunakan EF Core.',
                'challengeEn': 'Add JWT authorization to the `/reservations` endpoint and persist fulfillment audit logs into a PostgreSQL table using EF Core.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum C# & .NET dari nol hingga microservice pergudangan enterprise berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire C# & .NET curriculum from zero to an enterprise production-ready warehouse microservice!',
            },
        ]
    }
