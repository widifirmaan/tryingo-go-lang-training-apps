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

Kamu telah menguasai Task, async/await, CancellationToken, dan streaming JSON. Level 1 selesai! Level 2 akan membawa kita ke Entity Framework Core dan Web API.
