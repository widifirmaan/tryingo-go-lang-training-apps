# Setup, Toolchain & Sintaks Dasar

> **Kategori:** C# | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Tujuan Pembelajaran

- Memahami peran C# sebagai bahasa modern untuk ekosistem .NET
- Menginstall .NET SDK dan menulis program pertama
- Mengenal tipe dasar: int, double, string, bool, var
- String interpolation dengan $ dan verbatim string dengan @
- Nullable types: T? untuk value type yang bisa null

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

## Program: Halo, C#!

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Selamat datang di C#!");
        Console.WriteLine("C# adalah bahasa modern dari Microsoft untuk .NET.");

        // Variabel dan tipe data
        string nama = "Budi";
        int umur = 25;
        double tinggi = 175.5;
        bool aktif = true;

        Console.WriteLine($"Nama: {nama}");
        Console.WriteLine($"Umur: {umur}");
        Console.WriteLine($"Tinggi: {tinggi}");
        Console.WriteLine($"Aktif: {aktif}");

        // Implicit typing
        var pesan = "Halo, Dunia!";
        var angka = 42;
        Console.WriteLine($"Pesan: {pesan}, Angka: {angka}");

        // Null dan nullable
        string? nullableStr = null;
        int? nullableInt = null;
        Console.WriteLine($"Nullable: {nullableStr ?? "kosong"}");

        // String interpolation
        Console.WriteLine($"{nama} berumur {umur} tahun");

        // Verbatim string
        string path = @"C:\Users\Budi\Documents";
        Console.WriteLine($"Path: {path}");
    }
}
```

---

## Konsep Kunci

### Peran C#
C# adalah bahasa modern, object-oriented dari Microsoft. Berjalan di .NET runtime — cross-platform, high-performance.

### Toolchain
- `dotnet new`: buat project baru
- `dotnet run`: jalankan program
- `dotnet build`: kompilasi
- `dotnet test`: jalankan test

### Tipe Dasar
- Value type: int, double, bool, char, struct
- Reference type: string, class, array, interface
- `var`: implicit typing dengan type inference

### String Interpolation
`$"Hello {name}"` — lebih readable dari string concatenation.

### Nullable
`int?` atau `Nullable<int>` — value type yang bisa null.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Coba tipe data yang belum dicoba: decimal, long, char
- Eksperimen dengan string interpolation
- Buat nullable int dan cek HasValue
- Buat program kecil gabungan 2-3 konsep

---

## Tantangan

Buat program profil pengguna: nama, umur, email, alamat. Gunakan string interpolation untuk display. Validasi dengan if.

---

## Ringkasan

Minggu 1 dari 12: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). C# memberikan produktivitas tinggi dengan type safety. Minggu depan: **Tipe Data & Variabel**.
