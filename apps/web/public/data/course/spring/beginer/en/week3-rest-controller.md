# REST Controller — Pelayan Spring

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 3:** REST Controller

## Tujuan Pembelajaran

- `@GetMapping`, `@PostMapping`, `@PathVariable`, `@RequestBody` — pintu REST

---

## Program

```java
@RestController
@RequestMapping("/api/produk")
public class ProdukController {
  @GetMapping("/{id}")
  public String satu(@PathVariable Long id){ return "Produk "+id; }

  @PostMapping
  public String tambah(@RequestBody Map<String,String> body){
    return "Tambah "+body.get("nama");
  }
}
```

Test: `curl http://localhost:8080/api/produk/1` dan `curl -X POST -H "Content-Type: application/json" -d '{"nama":"Beras"}' http://localhost:8080/api/produk`

---

## Ringkasan

Minggu 3: **Pelayan REST** — `@GetMapping` dll.
