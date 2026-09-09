# Async & Scheduling — Alarm Rutin Warung Spring

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 12:** Async & Scheduling
> **Prasyarat:** Minggu 11 — **Caching**.

## Tujuan Pembelajaran

- `@Scheduled(cron = "0 0 7 * * *")` alarm tiap jam 7 pagi + `@EnableScheduling` saklar (sumber: docs.spring.io/spring-framework/integration/scheduling)
- `fixedRate` tiap X vs `cron` jam pasti

---

## Kenapa Ini Penting Buat Kamu?

Laporan harian + cek stok tiap jam 7 tanpa `@Scheduled` = buka laptop manual tiap pagi. Dengan cron, server kerja sendiri. Tanpa `@EnableScheduling`, alarm mati total (diam-diam!).

---

## Program: Alarm Warung Spring

```java
// Aktifkan di main: @EnableScheduling + @EnableAsync

import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Component;

@Component
public class AlarmWarung {

  @Scheduled(cron = "0 0 7 * * *") // tiap jam 07:00:00
  public void laporanPagi() {
    System.out.println("Laporan: " + repo.count() + " produk");
  }

  @Scheduled(fixedRate = 60000) // tiap 60 detik
  public void cekStok() {
    repo.findByStokLessThan(5).forEach(p ->
      System.out.println("STOK TIPIS: " + p.getNama()));
  }

  @Async // jalan background (butuh @EnableAsync!)
  public void kirimLaporan() { /* ... */ }
}
```

Cron `detik menit jam hari bulan hari-minggu`: `0 0 7 * * *` = 07:00 tiap hari.

---

## Konsep Kunci

### `@Scheduled` + `@EnableScheduling` = Alarm + Saklar
Tanpa saklar utama, semua alarm mati.

### `cron` vs `fixedRate` = Jam Pasti vs Tiap X
`cron "0 0 7 * * *"` jam 7 tepat. `fixedRate = 60000` tiap 60 detik dari mulai.

---

## Penjelasan untuk Pemula

### Analogi: Alarm Toko
- **cron = alarm jam 7**: bunyi tiap pagi.
- **fixedRate = timer masak**: tiap 60 detik cek.

### Langkah 0 — Siapkan Device
- Sama W1. Lihat log console (tidak perlu browser).

### Cara Komputer Membaca
1. Start → baca `@Scheduled` → daftarkan timer.
2. Jam 7 → panggil `laporanPagi()`.

### 3 Istilah Wajib
1. **Scheduled/cron**: alarm/jadwal
2. **EnableScheduling**: saklar

---

## Eksperimen

- **Hijau:** `fixedRate = 5000` → log tiap 5 detik?
- **Kuning:** Hapus `@EnableScheduling` → tidak ada log? (Saklar mati!)
- **Merah:** cron `0 * * * * *` (tiap menit detik 0) → tiap menit?

---

## Tantangan

**Warung Otomatis:** `laporanPagi` cron 07:00 + `cekStok` tiap 60 detik + screenshot 2 log.
- **Sambungan (Minggu 11 — Caching):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Scheduled/cron/fixedRate**: alarm/jadwal/tiap-X

---

## Ringkasan

Minggu 12 dari 14: **Alarm Rutin** (Level: Lanjutan). Kerja sendiri. Minggu depan: **Deployment**.
