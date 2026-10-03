# Distributed Caching (Redis) & Ketahanan Sistem dengan Polly v8

> **Kategori:** C# & .NET | **Level:** Lanjutan | **Minggu 9:** Distributed Caching (Redis) & Ketahanan Sistem dengan Polly v8
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai strategi caching: In-Memory Caching vs Distributed Caching (`IDistributedCache` / Redis).
- Mengonfigurasi Cache Eviction Policies (`AbsoluteExpiration` vs `SlidingExpiration`).
- Memahami arsitektur Polly v8: Resilience Pipelines, Exponential Backoff, dan Jitter.
- Menerapkan pola Circuit Breaker untuk mencegah cascading failures pada layanan pihak ketiga.

---

## Program: Pipeline Resilient Supplier API dengan Retry, Circuit Breaker & Caching

```csharp
using System;
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
Console.WriteLine("\n[STEP 2] Meminta ulang data yang sama (Harus Cache HIT):");
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
```

---

## Konsep Kunci

Dalam arsitektur microservices terdistribusi, kegagalan jaringan atau keterlambatan respon dari sistem eksternal (seperti ERP supplier atau payment gateway) adalah hal yang tidak dapat dihindari. Dua pilar utama untuk menjaga ketersediaan sistem adalah **Caching** dan **Resilience Engineering**.

### In-Memory vs Distributed Caching
`IMemoryCache` menyimpan data di RAM proses aplikasi lokal, memberikan latensi sub-milidetik. Namun pada klaster multi-instance di cloud, setiap node memiliki cache berbeda. `IDistributedCache` (dengan Redis) memungkinkan ratusan pod/container berbagi satu penyimpanan cache yang konsisten.

### Ketahanan Sistem dengan Polly v8
Polly adalah pustaka ketahanan (resilience and transient-fault-handling) standar industri untuk .NET. Di Polly v8, pipeline ketahanan dibangun menggunakan `ResiliencePipelineBuilder` yang sangat modular dan hemat alokasi memori.

### Strategi Retry dan Circuit Breaker
- **Exponential Backoff Retry**: Ketika terjadi error sementara (transient error seperti timeout 504), Polly mencoba ulang dengan jeda waktu yang meningkat secara eksponensial (100ms, 200ms, 400ms) agar tidak membebani server yang sedang down.
- **Circuit Breaker**: Jika persentase kegagalan melebihi ambang batas, sirkuit "terbuka" (Open). Semua request berikutnya langsung ditolak seketika (Fast Fail) tanpa mengirim paket jaringan ke server target, memberi waktu bagi sistem downstream untuk pulih.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda sedang menelpon teman yang sinyalnya putus-putus. Jika langsung gagal, Anda menunggu beberapa detik sebelum mencoba menelpon lagi (Retry dengan Backoff). Namun jika operator mengatakan "Nomor yang Anda tuju sedang tidak aktif", Anda berhenti menelpon selama 1 jam daripada menghabiskan baterai Anda terus-menerus (Circuit Breaker).

## Eksperimen

- Ubah kegagalan supplier menjadi 5 kali dan perhatikan bagaimana Polly melempar pengecualian setelah retry habis.
- Kombinasikan sliding expiration dengan absolute expiration pada cache entry.
- Tambahkan fallback strategy di Polly untuk mengembalikan data stok offline default ketika Circuit Breaker terbuka.

---

## Tantangan

Bangun decorator `ResilientSupplierService` yang mengombinasikan Polly v8 pipeline dengan `IDistributedCache` Redis dan metrik OpenTelemetry untuk memantau waktu respons eksternal.

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

Kamu telah menguasai Caching dan ketahanan sistem terdistribusi dengan Polly v8. Minggu depan adalah Capstone Final: Microservice Pergudangan Enterprise Production-Ready!
