# Sintaks Modern C# 13, Primary Constructors & Record Types

> **Kategori:** C# & .NET | **Level:** Pemula | **Minggu 1:** Sintaks Modern C# 13, Primary Constructors & Record Types
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami evolusi C# modern (C# 12/13) dengan top-level statements dan primary constructors.
- Menggunakan record types untuk data domain yang immutable dengan dukungan built-in value equality.
- Menerapkan non-destructive mutation menggunakan ekspresi `with`.
- Menguasai pattern matching modern dengan switch expressions untuk logika bisnis yang bersih.

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **C# Dev Kit** (`ms-dotnettools.csdevkit`): Solusi lengkap manajemen project .NET, testing, dan solution explorer di VS Code
- **C# Extension** (`ms-dotnettools.csharp`): Dukungan bahasa C# & Omnisharp/Roslyn intellisense

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ms-dotnettools.csdevkit --install-extension ms-dotnettools.csharp
```

---

### 2. Instalasi Runtime & Dependency (.NET 9 SDK)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install Microsoft.DotNet.SDK.9
```

**macOS (Terminal / Homebrew):**
```bash
brew install dotnet-sdk
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt-get install -y dotnet-sdk-9.0
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
dotnet --version
```

Output yang diharapkan:
```output
9.0.xxx
```

> 💡 **Tips Prasyarat:** .NET SDK mencakup compiler C#, runtime CLR, dan CLI tools.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
dotnet new webapi -n MyWebApiApp -controllers
cd MyWebApiApp
```
- **Keterangan:** Menghasilkan project Web API modern dengan ASP.NET Core, OpenAPI/Scalar, dan controllers.
- **Pindah ke direktori project:**
```bash
cd MyWebApiApp
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
dotnet run
```
Akses di browser atau terminal: `http://localhost:5000 / https://localhost:5001`

> ℹ️ Server Kestrel akan aktif di port lokal.

**File Titik Masuk Utama (`Program.cs`):**
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/api/greeting", () => Results.Ok(new {
    Message = "Halo dari .NET 9 C#!",
    Status = "Healthy",
    Timestamp = DateTime.UtcNow
}));

app.MapControllers();
app.Run();
```
Minimal API endpoint di Program.cs .NET 9.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
MyWebApiApp/
├── Controllers/         # Endpoint controller API
├── Properties/
│   └── launchSettings.json
├── appsettings.json     # Konfigurasi app & connection string
├── Program.cs           # Titik masuk aplikasi & konfigurasi DI
└── MyWebApiApp.csproj   # File konfigurasi project .NET
```
Struktur project ASP.NET Core dengan Dependency Injection terintegrasi di Program.cs.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan perintah `dotnet watch` untuk mengaktifkan hot reload setiap kali file C# diedit.
- Gunakan record types (`public record User(int Id, string Name);`) untuk data transfer objek (DTO) yang ringkas.

---

## Program: Domain Model Inventaris Gudang dengan Record & Pattern Matching

```csharp
using System;

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
```

---

## Konsep Kunci

Modern C# 13 mengeliminasi boilerplate kode lama (seperti class Program, method Main berulang) sambil mempertahankan sistem tipe statis dan performa runtime .NET yang sangat kencang.

### Primary Constructors dan Top-Level Statements
Dengan C# modern, Anda dapat langsung mengeksekusi kode di baris pertama tanpa membungkusnya dalam class dan namespace secara manual. Fitur **Primary Constructors** pada class maupun record memungkinkan kita mendefinisikan parameter constructor langsung di samping nama tipe data, menghemat puluhan baris kode assignment `this._field = field`.

### Record Types dan Immutability
`record` adalah tipe referensi khusus yang dirancang untuk data immutable (tidak dapat diubah setelah dibuat). Dua record dengan nilai properti yang sama akan dianggap identik (`item1 == item2` bernilai true), berbeda dengan `class` standar yang membandingkan alamat pointer referensi memori. Untuk mengubah salah satu properti, kita menggunakan ekspresi `with` yang membuat salinan baru secara aman tanpa efek samping race condition.

### Pattern Matching dengan Switch Expressions
Switch expression di C# bukan sekadar switch-case biasa. Fitur ini mendukung perbandingan range (`<= 15`), perbandingan tipe data, hingga tuple pattern matching, menghasilkan kode evaluasi status inventaris yang ringkas, deklaratif, dan aman dari bug percabangan yang terlewat.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah tiket manifest kargo di bandara. Begitu dicetak, lembaran tiket itu tidak boleh dicoret-coret sembarangan (itu adalah sifat `record` yang immutable). Jika ada barang baru yang ditambahkan, petugas tidak mengubah tiket lama, melainkan mencetak tiket revisi baru yang menduplikasi tiket lama ditambah perubahan baru (inilah konsep ekspresi `with`).

## Eksperimen

- Ubah nilai itemA.Stock menjadi 0 dan amati bagaimana switch expression langsung memberikan status UrgencyLevel.Critical.
- Coba bandingkan dua record dengan nilai yang sama persis: periksa apakah itemA == itemCopy bernilai True.
- Tambahkan properti baru ReorderThreshold pada record InventoryItem dan perbarui pattern matching.

---

## Tantangan

Buat record `StockAdjustment(string Sku, int QuantityChange, string Reason, DateTime Timestamp)` dan buat fungsi yang mengembalikan record `InventoryItem` baru dengan stok yang sudah disesuaikan tanpa memutasi record awal.

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

Kamu telah memahami sintaks C# 13 modern, record types, non-destructive mutation dengan `with`, dan pattern matching. Minggu depan kita masuk ke LINQ dan Generics.
