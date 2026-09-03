# Testing — Uji Pabrik Spring

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 7:** Testing

## Tujuan Pembelajaran

- `@SpringBootTest` + `MockMvc` `perform(get("/produk")).andExpect(status().isOk())`

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

## Ringkasan

Minggu 7: **Uji Pabrik** — `MockMvc`.
