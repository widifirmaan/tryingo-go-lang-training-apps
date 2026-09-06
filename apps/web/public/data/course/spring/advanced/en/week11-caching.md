# Caching — Laci Cepat Warung Spring

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 11:** Caching

## Tujuan Pembelajaran

- `@EnableCaching` + `@Cacheable("produk")` simpan hasil di laci, `@CacheEvict` buang saat ubah (sumber: docs.spring.io/spring-framework/integration/cache)
- Laci default (memori) vs Redis (laci bersama)

---

## Kenapa Ini Penting Buat Kamu?

Daftar produk dihitung 100x/menit dari DB → DB kepanasan. Dengan `@Cacheable`, hitung 1x, 99x ambil laci (0.1ms). Tanpa `@CacheEvict` saat ubah harga, pelanggan lihat harga lama (basi!).

---

## Program: Laci Produk Spring

```java
// Aktifkan di main: @EnableCaching

import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

@Service
public class ProdukService {
  // Hitung 1x, simpan laci "produk". Panggil lagi → dari laci!
  @Cacheable("produk")
  public List<Produk> mahal() {
    System.out.println("HITUNG dari DB..."); // hanya 1x terlihat!
    return repo.findAll();
  }

  // Ubah → buang laci biar tidak basi
  @CacheEvict(value = "produk", allEntries = true)
  public Produk tambah(Produk p) { return repo.save(p); }
}
```

`GET /produk` 1 → log "HITUNG". `GET` 2 → tanpa log (dari laci!). `POST` → laci dibuang → `GET` hitung lagi.

---

## Konsep Kunci

### `@Cacheable` / `@CacheEvict` = Simpan/Buang Laci
`@Cacheable("produk")` simpan hasil per argumen. `@CacheEvict(allEntries=true)` buang semua saat tulis.

### Laci Memori vs Redis
Default: memori (hilang restart). Redis (`spring-boot-starter-data-redis`): laci bersama 2 server.

---

## Penjelasan untuk Pemula

### Analogi: Laci Kasir
- **@Cacheable = fotokopi struk**: pelanggan tanya lagi → kasih fotokopi, tidak hitung ulang.
- **@CacheEvict = buang fotokopi lama** saat harga berubah.

### Langkah 0 — Siapkan Device
- Sama W1 + `spring-boot-starter-cache` (atau Redis + `docker run redis`).

### Cara Komputer Membaca
1. `mahal()` pertama → tidak ada di laci → jalankan → simpan.
2. Kedua → ada → langsung balas tanpa jalankan.

### 3 Istilah Wajib
1. **Cacheable/Evict**: simpan/buang
2. **TTL**: kadaluarsa (opsional)

---

## Eksperimen

- **Hijau:** `GET` 2x → log "HITUNG" 1x?
- **Kuning:** `POST` lalu `GET` → "HITUNG" lagi (laci dibuang)?
- **Merah:** Hapus `@CacheEvict` → POST lalu GET harga lama (basi)? Pasang.

---

## Tantangan

**Warung Cepat:** `@Cacheable` daftar + `@CacheEvict` tambah/hapus + `GET/POST/GET` buktikan hitung 2x (bukan 3x).

---

## Glosarium Mini

- **Cacheable/Evict**: simpan/buang laci

---

## Ringkasan

Minggu 11 dari 14: **Laci Cepat** (Level: Lanjutan). DB adem. Minggu depan: **Async & Jadwal**.
