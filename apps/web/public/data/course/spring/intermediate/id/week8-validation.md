# Validation — Satpam Input Warung Spring

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 8:** Validation

## Tujuan Pembelajaran

- `@NotBlank`/`@Min(1)` stempel wajib di entity + `@Valid` di controller picu cek (sumber: beanvalidation.org + docs.spring.io)
- `BindingResult`/`MethodArgumentNotValidException` tangkap → balas 400 rapi

---

## Kenapa Ini Penting Buat Kamu?

Tanpa validasi, `nama: ""` + `harga: -5` masuk DB → struk minus, laporan rusak. Dengan `@NotBlank`, Spring tolak SEBELUM simpan + pesan "Nama wajib" otomatis.

---

## Program: Satpam Stempel Spring

```java
// Produk.java — stempel di entity
import jakarta.validation.constraints.*;

public class Produk {
  @NotBlank(message = "Nama wajib")
  private String nama;

  @Min(value = 1, message = "Harga minimal 1")
  private Integer harga;
  // getter/setter...
}

// Controller — picu dengan @Valid
@PostMapping
public Object tambah(@Valid @RequestBody Produk p, BindingResult br) {
  if (br.hasErrors()) {
    return Map.of("error", br.getFieldError().getDefaultMessage());
  }
  return repo.save(p);
}
```

Test: `curl -X POST ... -d '{"nama":"","harga":-5}'` → `{"error":"Nama wajib"}` status 400 (bukan 500!).

---

## Konsep Kunci

### `@NotBlank/@Min/...` = Stempel Wajib
`@NotBlank` tolak kosong, `@Min(1)` tolak <1, `@Email` cek email.

### `@Valid` = Picu Cek
Tanpa `@Valid`, stempel tidak dibaca! `BindingResult` tampung hasil.

---

## Penjelasan untuk Pemula

### Analogi: Satpam Pintu Masuk
- **Stempel = syarat**: "Nama wajib" cap di barang.
- **@Valid = satpam baca cap**: tidak lolos → tolak 400.

### Langkah 0 — Siapkan Device
- `spring-boot-starter-validation` di `pom.xml` (atau centang Validation di start.spring.io).

### Cara Komputer Membaca
1. `POST` JSON → `Produk` → cek tiap stempel → gagal? Kumpulkan error.
2. `BindingResult` ada error → balas 400 + pesan.

### 3 Istilah Wajib
1. **NotBlank/Min**: wajib/minimal
2. **Valid/BindingResult**: picu/tampung

---

## Eksperimen

- **Hijau:** POST `nama:""` → "Nama wajib"?
- **Kuning:** Hapus `@Valid` → data jelek lolos? (Itulah kenapa wajib!)
- **Merah:** `harga: -5` → "Harga minimal 1"?

---

## Tantangan

**Warung Bersatpam:** `nama` + `harga` + `stok` (`@Min(0)`) + `POST` 3 kasus (lolos/kosong/minus) → 400 rapi semua.

---

## Glosarium Mini

- **NotBlank/Min/Valid**: wajib/minimal/picu

---

## Ringkasan

Minggu 8 dari 10: **Satpam Input** (Level: Menengah). Data kotor ditolak. Minggu depan: **Actuator** — dasbor sehat.
