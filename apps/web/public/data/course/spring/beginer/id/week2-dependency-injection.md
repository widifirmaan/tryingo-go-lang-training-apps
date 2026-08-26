# Dependency Injection — Gudang Otomatis Spring

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 2:** Dependency Injection

## Tujuan Pembelajaran

- `@Service` dapur, `@Autowired` pinjam otomatis — tidak `new` manual

---

## Program

```java
@Service
public class ProdukService {
  public List<String> daftar(){ return List.of("Beras","Bayam"); }
}

@RestController
public class ProdukController {
  @Autowired private ProdukService service; // Spring suntik otomatis
  @GetMapping("/produk")
  public List<String> semua(){ return service.daftar(); }
}
```

---

## Ringkasan

Minggu 2: **Gudang Otomatis** — DI suntik.
