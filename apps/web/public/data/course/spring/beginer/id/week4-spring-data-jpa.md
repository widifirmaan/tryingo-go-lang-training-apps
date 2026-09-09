# Spring Data JPA — Rak Otomatis Tanpa SQL

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 4:** Spring Data JPA
> **Prasyarat:** Minggu 3 — **REST Controller**.

## Tujuan Pembelajaran

- `@Entity` + `@Id @GeneratedValue` cetak biru rak (sumber: docs.spring.io/spring-data/jpa)
- `interface ProdukRepo extends JpaRepository<Produk, Long>` → `findAll()`, `save()`, `findByKategori()` otomatis (tanpa tulis SQL!)
- `spring.datasource.url` sambung Postgres di `application.properties`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa JPA, tulis `INSERT INTO produks ...` + koneksi manual 30 baris per aksi. Dengan `repo.save(p)` 1 baris. `findByKategori("Sayur")` otomatis jadi `SELECT ... WHERE kategori=?` — tanpa SQL!

---

## Program: Rak JPA Warung

```properties
# application.properties — sambung gudang
spring.datasource.url=jdbc:postgresql://localhost:5432/warung
spring.datasource.username=postgres
spring.datasource.password=rahasia
spring.jpa.hibernate.ddl-auto=update
```

```java
// Produk.java — cetak biru
import jakarta.persistence.*;

@Entity // tabel produks otomatis!
public class Produk {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nama;
  private Integer harga;
  // getter/setter (atau @Data Lombok)
  public Long getId() { return id; }
  public String getNama() { return nama; }
  public void setNama(String n) { nama = n; }
  public Integer getHarga() { return harga; }
  public void setHarga(Integer h) { harga = h; }
}
```

```java
// ProdukRepo.java — tukang (TANPA ISI! Spring buatkan)
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProdukRepo extends JpaRepository<Produk, Long> {
  List<Produk> findByNamaContaining(String cari); // otomatis LIKE!
  List<Produk> findByHargaGreaterThan(Integer min);
}
```

```java
// Controller pakai repo
private final ProdukRepo repo;
public ProdukController(ProdukRepo repo) { this.repo = repo; }

@GetMapping
public List<Produk> semua(@RequestParam(required = false) String cari) {
  return cari == null ? repo.findAll() : repo.findByNamaContaining(cari);
}
@PostMapping
public Produk tambah(@RequestBody Produk p) { return repo.save(p); }
```

---

## Konsep Kunci

### `@Entity` + `@Id` = Cetak Biru Rak
`@Entity` → tabel, `@Id @GeneratedValue` → nomor otomatis.

### `JpaRepository` = Tukang Ajaib
`extends JpaRepository<Produk, Long>` → dapat `findAll/save/findById/delete` + `findBy...` turunan nama method!

### `@Transactional` = Paket All-or-Nothing (wajib data uang!)

Jual = kurang stok + tambah pesanan. Gagal 1 tanpa transaksi = stok hilang, pesanan tak ada (SELISIH!). 1 anotasi = 2 tulis 1 paket:

```java
import org.springframework.transaction.annotation.Transactional;

@Transactional // gagal di tengah? ROLLBACK semua otomatis!
public void jual(Long id, int qty) {
  Produk p = repo.findById(id).orElseThrow();
  p.setStok(p.getStok() - qty);
  repo.save(p);
  pesananRepo.save(new Pesanan(p.getNama(), qty)); // gagal di sini → stok KEMBALI!
}
```
- Tanpa `@Transactional`, baris 1 sukses + baris 2 gagal = data rusak. Dengan ini = semua atau tidak sama sekali!

### `ddl-auto=update` = Bangun Otomatis (Dev)
Buat/ubah tabel ikut entity. Produksi pakai `validate` + migration!

---

## Penjelasan untuk Pemula

### Analogi: Rak dengan Tukang Ajaib
- **Entity = gambar rak**, **JpaRepository = tukang** yang paham perintah `findByNama` tanpa diajari SQL.

### Langkah 0 — Siapkan Device
- Postgres jalan + DB `warung` + `spring-boot-starter-data-jpa` + `postgresql` di `pom.xml` (via start.spring.io centang JPA + PostgreSQL).

### Cara Komputer Membaca
1. Start → `ddl-auto=update` → `CREATE TABLE produks` jika belum ada.
2. `repo.findByNamaContaining("beras")` → `SELECT ... WHERE nama LIKE %beras%`.

### 3 Istilah Wajib
1. **Entity/Repository**: biru/tukang
2. **ddl-auto**: bangun otomatis

---

## Eksperimen

- **Hijau:** `POST` 2 produk → restart → `GET` masih ada? (awet!)
- **Kuning:** Tambah field `stok` di entity → restart → kolom muncul?
- **Merah:** `ddl-auto=create-drop` → restart data hilang? Ganti `update`.

---

## Tantangan

**Rak Lengkap:** `Produk` + `Pelanggan` entity + 2 repo + `GET/POST` keduanya + restart cek awet.
- **Sambungan (Minggu 3 — REST Controller):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Entity/Id/Repository**: biru/nomor/tukang
- **ddl-auto**: bangun

---

## Ringkasan

Minggu 4 dari 5: **Rak Otomatis** (Level: Pemula). Tanpa SQL. Minggu depan: **Best Practices**.
