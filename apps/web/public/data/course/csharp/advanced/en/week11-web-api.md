# Web API — Warung Online C#

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 11:** Web API

## Tujuan Pembelajaran

- `dotnet new webapi` + `[ApiController]` + `[HttpGet/Post/Delete]` pintu JSON (sumber: Microsoft Learn web-api)
- `[FromBody]` amplop, `Results.Ok/NotFound` balas (minimal API alternatif)

---

## Kenapa Ini Penting Buat Kamu?

HP butuh JSON, bukan console. Web API = `console` jadi `http://localhost:5000/produk` — 1 codebase C# melayani HP + web.

---

## Program: API Warung C#

```bash
dotnet new webapi -n WarungApi
cd WarungApi
dotnet run  # https://localhost:7000/swagger !
```

```csharp
// Controllers/ProdukController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")] // → api/produk
public class ProdukController : ControllerBase {
  private static List<Produk> daftar = new() {
    new() { Id = 1, Nama = "Beras", Harga = 62000 }
  };

  [HttpGet]
  public ActionResult<List<Produk>> Semua() => daftar;

  [HttpGet("{id}")]
  public ActionResult<Produk> Satu(int id) {
    var p = daftar.FirstOrDefault(x => x.Id == id);
    return p is null ? NotFound() : p;
  }

  [HttpPost]
  public ActionResult<Produk> Tambah(Produk p) { // [FromBody] otomatis!
    p.Id = daftar.Count + 1;
    daftar.Add(p);
    return CreatedAtAction(nameof(Satu), new { id = p.Id }, p);
  }

  [HttpDelete("{id}")]
  public IActionResult Hapus(int id) {
    daftar.RemoveAll(x => x.Id == id);
    return NoContent();
  }
}
```

Buka `https://localhost:7000/swagger` → coba langsung dari browser! `curl` juga bisa.

---

## Konsep Kunci

### `[ApiController]` + `[Route]` = Pelayan JSON
Otomatis validasi + JSON (tanpa `View`).

### `[HttpGet/Post/Delete]` = Pintu per Aksi
`[HttpGet("{id}")]` + `(int id)` ambil dari URL.

### Swagger = Menu Coba
`/swagger` UI coba API tanpa `curl`.

---

## Penjelasan untuk Pemula

### Analogi: Drive-Thru JSON
- **Controller = 5 jendela**, **Swagger = menu coba**.

### Langkah 0 — Siapkan Device
- `.NET SDK` + `dotnet new webapi` + `dotnet run` + buka `/swagger`.

### Cara Komputer Membaca
1. `POST /api/produk` JSON → `[FromBody]` (otomatis!) → `Tambah` → `201 + Location`.
2. `GET /api/produk/99` → null → `404`.

### 3 Istilah Wajib
1. **ApiController/Route**: pelayan-JSON/pintu
2. **Swagger/FromBody**: coba/amplop

---

## Eksperimen

- **Hijau:** Swagger coba POST → 201 + `Location` header?
- **Kuning:** GET 99 → 404 JSON?
- **Merah:** Hapus `[ApiController]` → validasi otomatis hilang? Pasang.

---

## Tantangan

**Warung Online Lengkap:** CRUD 4 pintu + Swagger screenshot + `curl` 5 perintah lulus.

---

## Glosarium Mini

- **ApiController/Swagger**: JSON/coba

---

## Ringkasan

Minggu 11 dari 12: **Drive-Thru JSON** (Level: Lanjutan). HP bisa belanja. Minggu depan: **Capstone**.
