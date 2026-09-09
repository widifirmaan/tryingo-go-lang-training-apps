# Messaging — Pesan Antar Dapur Spring

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 10:** Messaging
> **Prasyarat:** Minggu 9 — **Actuator & Monitoring**.

## Tujuan Pembelajaran

- `ApplicationEventPublisher` + `@EventListener` pesan dalam Warung (tanpa RabbitMQ dulu)
- `@Async` + `@EnableAsync` kerja background (kirim WA tanpa tunggu)

---

## Kenapa Ini Penting Buat Kamu?

Checkout kirim WA 5 detik → pelanggan tunggu loading 5 detik. Dengan event + `@Async`, simpan pesanan langsung balas "OK", WA kirim background. Tanpa ini, 10 pesanan bareng = antre 50 detik.

---

## Program: Pesan Warung Background

```java
// 1. Event = surat
public record PesananDibuat(Long id, String nama) {}

// 2. Penerbit di service pesanan
import org.springframework.context.ApplicationEventPublisher;

@Service
public class PesananService {
  private final ApplicationEventPublisher penerbit;
  public PesananService(ApplicationEventPublisher p) { penerbit = p; }

  public Pesanan buat(String nama) {
    Pesanan s = repo.save(new Pesanan(nama)); // simpan cepat
    penerbit.publishEvent(new PesananDibuat(s.getId(), nama)); // kirim surat
    return s; // langsung balas (tidak tunggu WA!)
  }
}

// 3. Pendengar kirim WA di background
import org.springframework.scheduling.annotation.Async;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class Notifikasi {
  @Async // jalan background!
  @EventListener
  public void kirimWA(PesananDibuat e) throws Exception {
    Thread.sleep(5000); // simulasi WA 5 detik
    System.out.println("WA terkirim untuk pesanan " + e.id());
  }
}

// 4. Aktifkan async
// @EnableAsync di main class!
```

---

## Konsep Kunci

### `publishEvent` + `@EventListener` = Surat + Penerima
Terbitkan surat, yang dengar (`@EventListener`) kerja. Pengirim tidak tunggu.

### `@Async` + `@EnableAsync` = Background
Tanpa `@Async`, pendengar blokir pengirim 5 detik. Dengan `@Async`, langsung balik.

---

## Penjelasan untuk Pemula

### Analogi: Surat & Kurir
- **Event = surat**: "pesanan 5 jadi".
- **@EventListener = kurir**: ambil surat, antar WA.
- **@Async = kurir motor**: tidak ikut antre kasir.

### Langkah 0 — Siapkan Device
- Sama W1 + `@EnableAsync` di main.

### Cara Komputer Membaca
1. `buat()` → simpan → `publishEvent` → balas HTTP langsung.
2. Background thread → `kirimWA` → 5 detik → log.

### 3 Istilah Wajib
1. **Event/Listener**: surat/penerima
2. **Async**: background

---

## Eksperimen

- **Hijau:** POST pesanan → balas <1 detik meski WA 5 detik?
- **Kuning:** Hapus `@Async` → balas 5 detik? (Blokir! Pasang lagi.)
- **Merah:** Hapus `@EnableAsync` → `@Async` tidak jalan? (Butuh saklar utama!)

---

## Tantangan

**Warung Cepat:** `buat()` + event + `@Async` WA + log waktu balas <1s. **Selesai Menengah Spring!**
- **Sambungan (Minggu 9 — Actuator & Monitoring):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Event/Listener/Async**: surat/penerima/background

---

## Ringkasan

Minggu 10 dari 10: **Pesan Background** (Level: Menengah). **Selesai Menengah Spring!** Lanjut: **Caching** (Lanjutan).
