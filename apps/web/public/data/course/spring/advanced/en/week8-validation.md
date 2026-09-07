# Validation — Satpam Spring Lanjutan

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 8:** Validation

## Tujuan Pembelajaran

- `@Valid` + `@NotBlank` `message = "Nama wajib"` di `Produk`, `BindingResult` cek

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `@Valid`, nama kosong + harga minus masuk DB → laporan rusak. Dengan stempel + `BindingResult`, tolak 400 rapi sebelum simpan.

---

## Program

```java
public class Produk {
  @NotBlank(message = "Nama wajib") String nama;
  @Min(1) Integer harga;
}

@PostMapping("/produk")
public String tambah(@Valid @ModelAttribute Produk p, BindingResult br){
  if(br.hasErrors()) return "form";
  repo.save(p);
  return "redirect:/produk";
}
```

View: `<span th:errors="*{nama}"></span>`.


---

## Penjelasan untuk Pemula

### Analogi: Satpam Stempel Spring
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Spring W1 + `./mvnw test` untuk W7.

### Cara Komputer Membaca
- `@NotBlank` stempel; `@Valid` picu; `BindingResult` tampung; gagal → 400.

### 3 Istilah Wajib
- 1. **NotBlank/Valid**: stempel/picu

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 8: **Satpam Lanjutan** — `@Valid`.
