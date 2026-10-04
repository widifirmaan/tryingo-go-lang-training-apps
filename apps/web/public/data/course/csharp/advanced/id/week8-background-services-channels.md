# Background Services, Hosted Workers & System.Threading.Channels

> **Kategori:** C# & .NET | **Level:** Lanjutan | **Minggu 8:** Background Services, Hosted Workers & System.Threading.Channels
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur `IHostedService` dan `BackgroundService` di .NET.
- Menguasai pola Producer-Consumer thread-safe berkecepatan tinggi menggunakan `System.Threading.Channels`.
- Mengatur backpressure menggunakan `BoundedChannelOptions` untuk mencegah kehabisan memori server.
- Menerapkan Graceful Shutdown pada background worker saat aplikasi dihentikan.

---

## Program: Antrean Pemrosesan Pesanan Gudang Asinkron dengan Bounded Channels

```csharp
using System;
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
```

---

## Konsep Kunci

Dalam sistem e-commerce pergudangan skala enterprise, request pemesanan barang dari user tidak boleh menunggu proses fisik (picking, packing, cetak label barcode) selesai sebelum mengembalikan respons HTTP 200. Operasi berat harus didelegasikan ke background worker.

### Pola Producer-Consumer dengan System.Threading.Channels
`System.Threading.Channels` adalah fitur bawaan .NET berkinerja sangat tinggi yang mengungguli `BlockingCollection` lama. Channel dirancang khusus untuk async/await tanpa lock locking CPU yang berat. Produsen (HTTP endpoint) menulis ke `ChannelWriter`, sedangkan konsumen (Background Service) membaca dari `ChannelReader` secara asynchronous menggunakan `await foreach`.

### Menangani Backpressure dengan Bounded Channels
Jika ribuan pesanan masuk bersamaan sedangkan pekerja gudang hanya mampu memproses puluhan per detik, antrean memori tanpa batas (`UnboundedChannel`) bisa menyebabkan server kehabisan RAM (Out-Of-Memory Crash). Dengan `BoundedChannel(100)`, channel menerapkan **Backpressure**: produsen akan dipaksa menunggu secara asinkron (`BoundedChannelFullMode.Wait`) sampai ada slot antrean yang kosong.

### Siklus Hidup BackgroundService
`BackgroundService` mengimplementasikan `IHostedService`. Method `ExecuteAsync` dieksekusi di background thread saat aplikasi .NET menyala. Ketika aplikasi dimatikan (misal saat rolling deployment di Kubernetes), .NET memicu pembatalan pada `CancellationToken` sehingga worker dapat menyelesaikan tugas yang sedang berjalan sebelum proses benar-benar keluar (Graceful Shutdown).


---

---

## Penjelasan untuk Pemula

Bayangkan loket restoran burger cepat saji. Kasir menerima pesanan Anda dan langsung memberikan struk dalam 5 detik, lalu meletakkan kertas pesanan ke atas rel ban berjalan menuju dapur (Channel). Koki di dapur (Background Worker) mengambil pesanan satu per satu dan memasaknya tanpa membuat antrean kasir di depan macet.

## Eksperimen

- Ubah kapasitas BoundedChannel menjadi 2 dan amati bagaimana produsen menunggu saat buffer penuh.
- Daftarkan dua instance `OrderFulfillmentWorker` sekaligus untuk memproses antrean secara paralel.
- Kirim sinyal CTRL+C pada aplikasi host dan perhatikan penangkapan `OperationCanceledException`.

---

## Tantangan

Buat Background Worker yang membaca event dead-letter (pesanan yang gagal diproses setelah 3 kali percobaan) dan menyimpannya ke tabel audit log kegagalan database.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE MIDDLEWARE ASP.NET CORE (.NET 8/9)              │
│                                                          │
│ Request ──► ExceptionHandler ──► Routing ──► Auth/CORS   │
│                                                │         │
│                                                ▼         │
│                                       Minimal API /      │
│                                       Controllers        │
│                                                │         │
│                                                ▼         │
│                                       Dependency Inject  │
│                                       (Scoped Services)  │
│                                                │         │
│                                                ▼         │
│ Response ◄── Compression ◄── Cache ◄── EF Core / DB      │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `record ProductDto(Guid Id, string Name, decimal Price);`
- **Fungsi Utama:** Tipe data Record Immutable C# 12.
- **Parameter / Atribut:** `Positional parameters`.
- **Perilaku & Efek Sistem:** Mendefinisikan struktur data transfer bernilai tetap dengan kesetaraan berbasis nilai (value equality)..
- **Contoh Penggunaan Praktis:**
```csharp
public record UserRecord(Guid Id, string FullName, string Email);
var user = new UserRecord(Guid.NewGuid(), "Alex", "alex@test.com");
```
- **Hasil Output yang Diharapkan:**
```output
Objek transfer data immutable siap digunakan
```

### 2. `app.MapGet("/api/items", async (AppDbContext db) => ...)`
- **Fungsi Utama:** Endpoint Minimal API ASP.NET Core.
- **Parameter / Atribut:** `Route pattern, Request delegate`.
- **Perilaku & Efek Sistem:** Membangun endpoint API super cepat dan hemat memori tanpa overhead controller konvensional..
- **Contoh Penggunaan Praktis:**
```csharp
app.MapGet("/api/products", async (AppDbContext db) =>
    await db.Products.AsNoTracking().ToListAsync());
```
- **Hasil Output yang Diharapkan:**
```output
Endpoint GET /api/products aktif dengan performa tinggi
```

### 3. `using var connection = new SqlConnection(connStr);`
- **Fungsi Utama:** Pernyataan Using pembersihan resource otomatis.
- **Parameter / Atribut:** `IDisposable resource`.
- **Perilaku & Efek Sistem:** Menjamin koneksi database atau file stream ditutup dan dibebaskan seketika setelah blok fungsi keluar..
- **Contoh Penggunaan Praktis:**
```csharp
using var stream = File.OpenRead("data.json");
var data = await JsonSerializer.DeserializeAsync<Config>(stream);
```
- **Hasil Output yang Diharapkan:**
```output
Resource stream otomatis dibersihkan dari RAM
```

### 4. `items.Where(p => p.Price > 100).OrderBy(p => p.Name)`
- **Fungsi Utama:** Kueri pemrosesan data deklaratif (LINQ).
- **Parameter / Atribut:** `Lambda predicates`.
- **Perilaku & Efek Sistem:** Melakukan filtering, pengurutan, dan transformasi koleksi data dalam memori atau database secara ekspresif..
- **Contoh Penggunaan Praktis:**
```csharp
var premiumProducts = products
    .Where(p => p.InStock && p.Price > 500000)
    .Select(p => p.Name)
    .ToList();
```
- **Hasil Output yang Diharapkan:**
```output
Daftar nama produk premium terfilter rapi
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

Kamu telah menguasai BackgroundService, System.Threading.Channels, dan manajemen backpressure. Minggu depan kita membahas Caching dan Ketahanan Sistem dengan Polly.
