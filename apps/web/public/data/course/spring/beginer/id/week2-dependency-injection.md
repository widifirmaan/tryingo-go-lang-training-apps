# Dependency Injection — Gudang Otomatis Spring

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 2:** Dependency Injection

## Tujuan Pembelajaran

- `@Service` tandai dapur, `@Autowired`/`constructor` suntik otomatis — tanpa `new` manual (sumber: docs.spring.io/spring-framework/reference/core/beans)
- Bedakan `new ProdukService()` manual (2 gudang beda!) vs suntik (1 gudang sama)

---

## Kenapa Ini Penting Buat Kamu?

10 controller butuh `ProdukService` — `new` manual di 10 tempat = 10 gudang beda data (tambah di 1, 9 lain tidak tahu!). Dengan DI, Spring buatkan 1 (`singleton`) untuk semua.

---

## Program: Gudang Disuntik Spring

```java
// ProdukService.java — dapur (1 untuk semua)
import org.springframework.stereotype.Service;
import java.util.*;

@Service // kartu dapur! tanpa ini Spring tidak kenal
public class ProdukService {
  private List<String> daftar = new ArrayList<>(List.of("Beras", "Bayam"));
  public List<String> semua() { return daftar; }
  public void tambah(String nama) { daftar.add(nama); }
}
```

```java
// ProdukController.java — pelayan disuntik
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/produk")
public class ProdukController {
  private final ProdukService service;

  // Suntik via constructor (cara modern, disarankan Spring)
  public ProdukController(ProdukService service) {
    this.service = service;
  }

  @GetMapping
  public List<String> semua() { return service.semua(); }

  @PostMapping
  public String tambah(@RequestParam String nama) {
    service.tambah(nama);
    return "Tambah " + nama;
  }
}
```

Test: `curl http://localhost:8080/produk` → `["Beras","Bayam"]`.

---

## Konsep Kunci

### `@Service` = Kartu Dapur
Tanpa `@Service`, Spring tidak buatkan → error `NoSuchBeanDefinition`.

### Constructor Inject = Suntik (Modern)
`public ProdukController(ProdukService s)` — Spring isi otomatis. `@Autowired` field cara lama.

### Singleton = 1 Gudang
Default Spring: 1 instance untuk semua (hemat + konsisten).

---

## Penjelasan untuk Pemula

### Analogi: Dapur Sentral Mal
- **Service = dapur sentral**, **controller = pelayan**, **DI = pipa otomatis** (Spring pasang, bukan kamu `new`).

### Langkah 0 — Siapkan Device
- Sama W1: `start.spring.io` + `Spring Web`, `./mvnw spring-boot:run` di `8080`.

### Cara Komputer Membaca
1. Start → scan `@Service` → buat 1 `ProdukService`.
2. `GET /produk` → buat controller + suntik service yang sama.

### 3 Istilah Wajib
1. **Service/Inject**: dapur/suntik
2. **Singleton/Bean**: 1/biji Spring

---

## Eksperimen

- **Hijau:** `POST /produk?nama=Kopi` → `GET` ada 3?
- **Kuning:** Hapus `@Service` → error `NoSuchBean`? Pasang lagi.
- **Merah:** `new ProdukService()` manual di 2 controller → tambah di 1, lain tidak ikut? (Itulah kenapa DI!)

---

## Tantangan

**Mal 2 Pelayan:** `ProdukService` + `ProdukController` (`GET/POST`) + `StokController` (`GET /stok/jumlah` pakai service sama) → tambah via 1, baca via 2 sama?

---

## Glosarium Mini

- **Service/Autowired/singleton**: dapur/suntik/1

---

## Ringkasan

Minggu 2 dari 5: **Gudang Otomatis** (Level: Pemula). 1 data semua. Minggu depan: **REST Controller** — pintu.
