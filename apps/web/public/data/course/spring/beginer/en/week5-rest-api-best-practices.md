# REST API Best Practices — Warung Rapi & Aman

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 5:** REST API Best Practices

## Tujuan Pembelajaran

- DTO (`ProdukMasuk`/`ProdukKeluar`) amplop khusus — jangan expose entity langsung (sumber: spring.io/guides)
- `@RestControllerAdvice` satpam error global + format `{ "error": "..." }` konsisten
- `/api/v1/produk` versi agar HP lama tidak rusak saat API berubah

---

## Kenapa Ini Penting Buat Kamu?

Expose entity langsung → hacker lihat `password` ikut terkirim! Error mentah `500` → HP crash tidak jelas. Tanpa versi, ubah API → aplikasi pelanggan lama rusak semua.

---

## Program: Warung Rapi Spring

```java
// DTO: amplop masuk & keluar (bukan entity!)
public record ProdukMasuk(String nama, Integer harga) {}
public record ProdukKeluar(Long id, String nama, Integer harga) {}

// Controller pakai DTO
@PostMapping
public ProdukKeluar tambah(@Valid @RequestBody ProdukMasuk masuk) {
  Produk p = new Produk();
  p.setNama(masuk.nama());
  p.setHarga(masuk.harga());
  Produk s = repo.save(p);
  return new ProdukKeluar(s.getId(), s.getNama(), s.getHarga());
}

// Satpam error global
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class Aman {
  @ExceptionHandler(Exception.class)
  public Map<String, String> tangani(Exception e) {
    return Map.of("error", e.getMessage());
  }
}
```

```java
// Versi: /api/v1/produk (tambah di RequestMapping)
@RequestMapping("/api/v1/produk")
```

---

## Konsep Kunci

### DTO = Amplop Khusus
`ProdukMasuk` (tanpa id) ≠ `ProdukKeluar` (dengan id) ≠ `Produk` (entity + password?). Aman + jelas.

### `@RestControllerAdvice` = Satpam Global
Tangkap semua `Exception` → JSON `{ "error": "..." }` rapi, bukan HTML 500.

### `/api/v1` = Versi
Ubah API → buat `/api/v2`, HP lama tetap `/api/v1`.

---

## Penjelasan untuk Pemula

### Analogi: Amplop & Satpam Mal
- **DTO = amplop coklat khusus**: isi sesuai keperluan, tidak campur.
- **Advice = satpam pusat**: semua masalah lapor 1 pintu.

### Langkah 0 — Siapkan Device
- Sama W1 + `spring-boot-starter-validation` untuk `@Valid`.

### Cara Komputer Membaca
1. `POST /api/v1/produk` JSON → `ProdukMasuk` → validasi → simpan → `ProdukKeluar`.
2. Error → `Aman.tangani` → `{"error": "..."}` status 500.

### 3 Istilah Wajib
1. **DTO/VO**: amplop
2. **Advice/Handler**: satpam
3. **Versioning**: versi

---

## Eksperimen

- **Hijau:** POST tanpa `nama` → `{"error": ...}` rapi (bukan HTML)?
- **Kuning:** `GET /api/v1/produk` vs `/api/v2` (belum ada) → 404?
- **Merah:** Return entity langsung berisi field rahasia → terlihat? Ganti DTO.

---

## Tantangan

**Warung Rapi Lengkap:** DTO masuk/keluar + `Advice` + `/api/v1` + `curl` POST cek JSON rapi. **Selesai Beginner Spring!**

---

## Glosarium Mini

- **DTO/Advice/version**: amplop/satpam/versi

---

## Ringkasan

Minggu 5 dari 5: **Rapi & Aman** (Level: Pemula). **Selesai Beginner Spring!** Lanjut: **Security** (Menengah).
