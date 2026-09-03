# Validation — Satpam Spring Lanjutan

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 8:** Validation

## Tujuan Pembelajaran

- `@Valid` + `@NotBlank` `message = "Nama wajib"` di `Produk`, `BindingResult` cek

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

## Ringkasan

Minggu 8: **Satpam Lanjutan** — `@Valid`.
