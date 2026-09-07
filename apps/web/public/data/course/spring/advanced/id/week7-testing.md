# Testing — Uji Pabrik Spring

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 7:** Testing

## Tujuan Pembelajaran

- `@SpringBootTest` + `MockMvc` `perform(get("/produk")).andExpect(status().isOk())`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `MockMvc`, ubah controller → 500 ketahuan pelanggan. Dengan 2 test, ubah → merah → perbaiki. `MockMvc` tanpa server beneran (cepat!).

---

## Program

```java
@SpringBootTest
@AutoConfigureMockMvc
class ProdukTest {
  @Autowired MockMvc mvc;
  @Test
  void testDaftar() throws Exception {
    mvc.perform(get("/produk"))
      .andExpect(status().isOk());
  }
}
```

`./mvnw test` → PASS.


---

## Penjelasan untuk Pemula

### Analogi: Pabrik Uji Spring
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Spring W1 + `./mvnw test` untuk W7.

### Cara Komputer Membaca
- `perform(get(...))` pura-pura browser; `andExpect(status().isOk())` cicip status.

### 3 Istilah Wajib
- 1. **MockMvc/andExpect**: pura-pura/cicip

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 7: **Uji Pabrik** — `MockMvc`.
