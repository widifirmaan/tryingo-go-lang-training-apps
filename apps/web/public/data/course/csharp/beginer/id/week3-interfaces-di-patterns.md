# Interfaces, Loose Coupling & Dependency Injection di .NET

> **Kategori:** C# & .NET | **Level:** Pemula | **Minggu 3:** Interfaces, Loose Coupling & Dependency Injection di .NET
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

Kamu telah menguasai Interface, Inversion of Control, dan Dependency Injection container .NET. Minggu depan kita mempelajari Async/Await dan I/O.
