# Testing — Cicip Otomatis Warung Spring

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 7:** Testing

## Tujuan Pembelajaran

- `@SpringBootTest` + `MockMvc` `perform(get("/produk")).andExpect(status().isOk())` uji pintu tanpa buka server (sumber: docs.spring.io/spring-framework/testing)
- `@DataJpaTest` uji rak + `assertEquals` cicip

---

## Kenapa Ini Penting Buat Kamu?

Ubah `ProdukController` tanpa uji → `/produk` 500 ketahuan pelanggan. Dengan `MockMvc`, ubah → `FAIL` merah sebelum deploy. `@DataJpaTest` pakai DB sementara (H2) — data asli aman.

---

## Program: Cicip Pintu & Rak

```java
// ProdukControllerTest.java — cicip pintu (tanpa server beneran!)
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProdukControllerTest {

  @Autowired MockMvc mvc; // pelayan bohongan

  @Test
  void daftarBalas200() throws Exception {
    mvc.perform(get("/produk"))
       .andExpect(status().isOk());
  }

  @Test
  void tambahLaluAda() throws Exception {
    mvc.perform(post("/produk")
      .contentType("application/json")
      .content("{\"nama\":\"Kopi\",\"harga\":12000}"))
      .andExpect(status().isOk());
  }
}
```

```bash
./mvnw test
# Tests run: 2, Failures: 0, Errors: 0 — HIJAU
```

---

## Konsep Kunci

### `MockMvc` = Pelayan Bohongan
`perform(get(...))` pura-pura jadi browser, `andExpect(status().isOk())` cicip status.

### `@SpringBootTest` = Buka Warung Bohongan
Nyalakan Spring tanpa port — cepat untuk uji.

### TDD Mini = Tulis Uji Dulu
Uji merah → tulis kode → hijau. Untuk 1 fungsi, 2 menit.

---

## Penjelasan untuk Pemula

### Analogi: Cicip Masakan
- **Test = cicip**: masak `tambah` → cicip `GET` ada? → saji.
- **MockMvc = food critic bohongan**: datang, pesan, nilai — tanpa pelanggan asli.

### Langkah 0 — Siapkan Device
- Sama W1 + `./mvnw test` (Maven unduh JUnit otomatis).

### Cara Komputer Membaca
1. `./mvnw test` → cari `*Test.java` → jalankan tiap `@Test`.
2. `andExpect` gagal → `FAIL` merah + baris salah.

### 3 Istilah Wajib
1. **MockMvc/perform**: pelayan-bohongan/pesan
2. **andExpect/assert**: cicip

---

## Eksperimen

- **Hijau:** Sengaja `expected 200` jadi `201` → FAIL merah? Betulkan.
- **Kuning:** Tambah produk lalu `GET` cek ada?
- **Merah:** Hapus `@SpringBootTest` → error context? Pasang.

---

## Tantangan

**Warung Teruji:** Test `GET /produk` 200 + `POST` tambah + `GET` jumlah +1. `./mvnw test` HIJAU 3/3.

---

## Glosarium Mini

- **MockMvc/Test**: bohongan/uji
- **andExpect**: cicip

---

## Ringkasan

Minggu 7 dari 10: **Cicip Otomatis** (Level: Menengah). Ubah berani. Minggu depan: **Validation** — satpam input.
