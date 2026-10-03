# Background Services, Hosted Workers & System.Threading.Channels

> **Kategori:** C# & .NET | **Level:** Lanjutan | **Minggu 8:** Background Services, Hosted Workers & System.Threading.Channels

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

## Ringkasan

Kamu telah menguasai BackgroundService, System.Threading.Channels, dan manajemen backpressure. Minggu depan kita membahas Caching dan Ketahanan Sistem dengan Polly.
