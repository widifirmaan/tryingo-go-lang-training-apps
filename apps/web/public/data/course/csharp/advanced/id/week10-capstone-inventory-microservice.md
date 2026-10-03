# Capstone: Microservice Pergudangan & Pemenuhan Pesanan Enterprise Production-Ready

> **Kategori:** C# & .NET | **Level:** Lanjutan | **Minggu 10:** Capstone: Microservice Pergudangan & Pemenuhan Pesanan Enterprise Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menyatukan seluruh konsep: Minimal APIs, EF Core 9, Channels, BackgroundService, dan Health Checks.
- Menerapkan pola Asynchronous Request-Reply (`202 Accepted`) untuk pemrosesan order skala besar.
- Mengonfigurasi endpoint `/healthz` untuk probe liveness dan readiness di lingkungan Kubernetes/Docker.
- Menyiapkan arsitektur microservice C# yang siap diproduksi dan diuji secara komprehensif.

---

## Program: Layanan Microservice Gudang Lengkap (.NET 9, Minimal API, EF Core, Health Checks & Channels)

```csharp
using Microsoft.AspNetCore.Builder;
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
```

---

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir. Aplikasi ini menyatukan semua fondasi teknik C# dan .NET modern ke dalam satu arsitektur microservice pergudangan yang tangguh, modular, dan berkinerja tinggi.

### Pola Asynchronous Request-Reply (HTTP 202 Accepted)
Ketika klien mengirim request pemesanan barang ke `/reservations`, API tidak memblokir koneksi HTTP sampai proses fisik pergudangan selesai. API langsung memvalidasi stok, memperbarui database secara atomik, menerbitkan event ke `System.Threading.Channels`, dan langsung mengembalikan respons `HTTP 202 Accepted` bersama URI status pesanan. Pola ini memungkinkan sistem menangani lonjakan ribuan transaksi per detik (Flash Sale) tanpa downtime.

### Kubernetes Health Checks (/healthz)
Microservice modern yang dijalankan di dalam container Docker atau klaster Kubernetes membutuhkan mekanisme pemantauan kesehatan otomatis. Dengan `builder.Services.AddHealthChecks()` dan `app.MapHealthChecks("/healthz")`, orchestrator Kubernetes dapat mendeteksi apabila database terputus atau thread mengalami deadlock, lalu me-restart pod secara otomatis.

### Kemudahan Integrasi Testing
Karena arsitektur menggunakan Inversion of Control dan DbContext berbasis opsi, sistem ini sangat mudah diuji menggunakan `WebApplicationFactory<Program>` di pustaka pengujian `xUnit`. Developer dapat menjalankan end-to-end integration test tanpa memerlukan database fisik eksternal.


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat pabrik modern yang sepenuhnya terotomatisasi. Bagian depan adalah meja penerima tamu yang ramah dan cepat (Minimal API). Di belakangnya ada buku besar otomatis yang selalu akurat (EF Core), ban berjalan berkecepatan tinggi yang mengatur antrean barang (Channels), dan robot-robot pekerja yang bekerja tanpa henti di gudang (Background Services).

## Eksperimen

- Jalankan aplikasi dan uji coba alur reservasi pesanan lengkap melalui Swagger UI.
- Buka browser ke `/healthz` dan pastikan status "Healthy" dikembalikan.
- Kirim 10 reservasi secara beruntun dan amati bagaimana worker memprosesnya secara asinkron tanpa memblokir respons HTTP.

---

## Tantangan

Tambahkan autentikasi JWT pada endpoint `/reservations` dan simpan log audit pemenuhan ke tabel PostgreSQL menggunakan EF Core.

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum C# & .NET dari nol hingga microservice pergudangan enterprise berskala produksi!
