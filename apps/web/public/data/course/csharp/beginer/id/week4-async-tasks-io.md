# Pemrograman Asynchronous: Task, ValueTask & Stream I/O

> **Kategori:** C# & .NET | **Level:** Pemula | **Minggu 4:** Pemrograman Asynchronous: Task, ValueTask & Stream I/O
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami Thread Pool, State Machine Async/Await, dan non-blocking I/O di .NET.
- Mengetahui perbedaan performa antara `Task` dan `ValueTask`.
- Menerapkan `CancellationToken` untuk membatalkan operasi asinkron yang memakan waktu lama.
- Melakukan streaming serialisasi dan deserialisasi JSON dengan `System.Text.Json`.

---

## Program: Import Manifest Katalog Stok Asinkron dengan CancellationToken

```csharp
using System;
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
```

---

## Konsep Kunci

Pemrograman asinkron di .NET bukan berarti membuat thread baru secara manual, melainkan melepaskan thread yang ada ke ThreadPool saat menunggu operasi I/O (seperti panggilan jaringan, database, atau pembacaan disk).

### Async/Await dan State Machine
Ketika kata kunci `await` dipanggil pada sebuah `Task`, kompilator C# mengubah method tersebut menjadi state machine internal. Thread saat ini dikembalikan ke pool untuk melayani request pengguna lain. Ketika operasi I/O selesai, thread pool mengambil kelanjutan kode (continuation) dan melanjutkannya secara mulus.

### Nilai Task vs ValueTask
`Task` adalah objek referensi heap yang dialokasikan setiap kali method async dipanggil. Untuk operasi intensif yang sering kali selesai secara synchronous (misalnya pembacaan data dari in-memory cache), .NET menyediakan `ValueTask<T>`. `ValueTask` adalah struct berbasis stack yang mengeliminasi alokasi garbage collection saat hasil sudah tersedia langsung di memori.

### Pembatalan Kooperatif (CancellationToken)
Dalam sistem backend production, pengguna bisa menutup browser atau API Gateway bisa mengalami timeout. Jika backend terus melanjutkan operasi berat setelah request dibatalkan, sumber daya server terbuang sia-sia. Dengan menyertakan `CancellationToken`, operasi dapat dihentikan di tengah jalan secara anggun menggunakan `cancellationToken.ThrowIfCancellationRequested()`.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda memesan kopi di kafe. Kasir memberikan Anda nomor antrean (Task) dan Anda bisa duduk membaca buku (thread tidak terblokir). Saat kopi siap, nomor Anda dipanggil dan Anda mengambil kopi Anda. Anda tidak perlu berdiri kaku di depan kasir selama 10 menit menunggu barista selesai meracik.

## Eksperimen

- Ubah timeout CancellationTokenSource menjadi 100ms dan perhatikan `OperationCanceledException` yang ditangkap.
- Gunakan `Task.WhenAll` untuk memproses複数の catalog records secara paralel.
- Bandingkan waktu eksekusi sekuensial vs paralel menggunakan `Stopwatch`.

---

## Tantangan

Buat method `Task ProcessInBatchesAsync<T>(IEnumerable<T> items, int batchSize, Func<T, Task> processor, CancellationToken ct)` yang memproses item dalam kelompok paralel terbatas menggunakan `SemaphoreSlim`.

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

Kamu telah menguasai Task, async/await, CancellationToken, dan streaming JSON. Level 1 selesai! Level 2 akan membawa kita ke Entity Framework Core dan Web API.
