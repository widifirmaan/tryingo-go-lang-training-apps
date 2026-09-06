# REST Controller — Pelayan Pintu Spring

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 3:** REST Controller

## Tujuan Pembelajaran

- `@RestController` + `@RequestMapping("/produk")` + `@GetMapping/@PostMapping/@DeleteMapping("/{id}")` pintu REST (sumber: docs.spring.io/spring-framework/reference/web/webmvc)
- `@PathVariable` ambil `{id}`, `@RequestParam` ambil `?cari=`, `@RequestBody` amplop JSON

---

## Kenapa Ini Penting Buat Kamu?

HP butuh `GET /produk` daftar + `POST` tambah + `DELETE /produk/1` hapus. Tanpa `@RestController`, return `String` dianggap nama file HTML (404 membingungkan!). Dengan `@RestController`, otomatis JSON.

---

## Program: Pintu CRUD Warung

```java
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController // otomatis JSON (bukan HTML)!
@RequestMapping("/produk")
public class ProdukController {
  private List<Map<String, Object>> daftar = new ArrayList<>(List.of(
    Map.of("id", 1, "nama", "Beras", "harga", 62000)
  ));

  @GetMapping
  public List<?> semua(@RequestParam(required = false) String cari) {
    if (cari == null) return daftar;
    return daftar.stream().filter(p -> p.get("nama").toString().contains(cari)).toList();
  }

  @GetMapping("/{id}")
  public Object satu(@PathVariable int id) {
    return daftar.stream().filter(p -> (int) p.get("id") == id).findFirst().orElse(Map.of("error", "Tidak ada"));
  }

  @PostMapping
  public Object tambah(@RequestBody Map<String, Object> body) {
    body.put("id", daftar.size() + 1);
    daftar.add(body);
    return body;
  }

  @DeleteMapping("/{id}")
  public Object hapus(@PathVariable int id) {
    daftar.removeIf(p -> (int) p.get("id") == id);
    return Map.of("ok", true);
  }
}
```

Test: `curl localhost:8080/produk` → `curl -X POST -H "Content-Type: application/json" -d '{"nama":"Gula","harga":15000}' localhost:8080/produk`.

---

## Konsep Kunci

### `@RestController` = Pelayan JSON
`@Controller` return nama view (HTML), `@RestController` return JSON langsung.

### `@GetMapping/@PostMapping/@DeleteMapping` = Pintu per Aksi
`@GetMapping("/{id}")` + `@PathVariable int id` ambil dari URL.

### `@RequestParam` vs `@RequestBody` = Kertas vs Amplop
`?cari=beras` kertas tempel (`@RequestParam`), JSON body amplop (`@RequestBody`).

---

## Penjelasan untuk Pemula

### Analogi: Pelayan 4 Pintu
- **GET = lihat etalase**, **POST = titip barang**, **DELETE = buang**.

### Langkah 0 — Siapkan Device
- Sama W1 + `curl` atau Postman untuk test POST.

### Cara Komputer Membaca
1. `POST /produk` + JSON → `@RequestBody Map` → `daftar.add` → balas JSON baru.
2. `GET /produk/99` → tidak ketemu → `{"error": ...}`.

### 3 Istilah Wajib
1. **RestController/RequestMapping**: pelayan JSON/pintu
2. **PathVariable/RequestParam**: dari-URL/dari-? 
3. **RequestBody**: amplop JSON

---

## Eksperimen

- **Hijau:** `GET /produk/1` → Beras? `/produk/99` → error JSON?
- **Kuning:** POST tanpa `Content-Type: application/json` → error 415? Tambah header.
- **Merah:** Ganti `@RestController` jadi `@Controller` → return JSON dianggap nama view → error? Kembalikan.

---

## Tantangan

**Warung CRUD Lengkap:** `GET` + `?cari` + `GET {id}` + `POST` + `DELETE` → `curl` 5 perintah lulus semua.

---

## Glosarium Mini

- **RestController/GetMapping**: pelayan JSON/pintu-ambil
- **PathVariable/RequestBody**: URL/amplop

---

## Ringkasan

Minggu 3 dari 5: **Pelayan Pintu** (Level: Pemula). CRUD JSON. Minggu depan: **JPA** — rak permanen.
