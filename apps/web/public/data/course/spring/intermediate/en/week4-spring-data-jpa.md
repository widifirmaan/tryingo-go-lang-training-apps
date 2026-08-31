# Spring Data JPA — Rak Otomatis Spring

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 4:** Spring Data JPA

## Tujuan Pembelajaran

- `interface ProdukRepository extends JpaRepository<Produk, Long>` — tanpa tulis SQL, `findByKategori()`

---

## Program

```java
@Entity
public class Produk {
  @Id @GeneratedValue Long id;
  String nama; Integer harga;
}

public interface ProdukRepository extends JpaRepository<Produk, Long> {
  List<Produk> findByKategori(String kategori);
}

// Controller
@Autowired ProdukRepository repo;
@GetMapping("/produk")
public List<Produk> semua(@RequestParam String kategori){
  return kategori != null ? repo.findByKategori(kategori) : repo.findAll();
}
```

`application.properties`: `spring.datasource.url=jdbc:postgresql://...`

---

## Ringkasan

Minggu 4: **Rak Otomatis** — JPA tanpa SQL.
