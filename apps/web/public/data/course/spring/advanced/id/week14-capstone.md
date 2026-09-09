# Capstone: E-Commerce API — Warung Spring Grand Opening

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 14:** Capstone: E-Commerce API
> **Prasyarat:** Minggu 13 — **Deployment**.

## Tujuan Pembelajaran

- Gabung W1-W13: `JPA` rak + `Security` satpam + `REST` pintu + `Cache` laci + `Actuator` panel + `Docker` peti jadi 1 toko online

---

## Kenapa Ini Penting Buat Kamu?

13 minggu terpisah — capstone buktikan gabung jadi produk: daftar → login → pesan → bayar → notif. Ini portfolio "Spring production-ready" untuk kerja.

---

## Program: Toko Spring Lengkap (Checklist Capstone)

Struktur gabungan semua minggu:
```
src/main/java/com/warung/
  WarungApplication.java     (W1: @SpringBootApplication + @EnableCaching + @EnableScheduling + @EnableAsync)
  produk/ (W4: Entity + Repo + W3: Controller + W5: DTO)
  keamanan/ (W6: SecurityConfig)
  pesanan/ (W10: Event + Async)
  laporan/ (W12: @Scheduled)
```

Fitur wajib (cek 1 per 1):
- [ ] `GET /api/v1/produk` + `POST` (W3+W5) + `validasi` (W8)
- [ ] `SecurityConfig` `/admin` login (W6) + `test` hijau (W7)
- [ ] `@Cacheable` daftar (W11) + `/actuator/health` UP (W9)
- [ ] `Dockerfile` + `docker run` (W13) + deploy `Railway`
- [ ] `README.md` cara jalan + screenshot

```bash
./mvnw test          # hijau semua?
./mvnw package       # jar jadi?
docker build -t warung:1.0 . && docker run -p 8080:8080 warung:1.0
curl localhost:8080/actuator/health  # {"status":"UP"}?
```

**Tugas capstone:** Deploy publik + video 2 menit (daftar → login → pesan → cek health) + `README`.

---

## Konsep Kunci

### Capstone = Gabung 13 Minggu
Rak + satpam + pintu + laci + panel + peti = 1 toko.

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Mal
- **W1-W5 fondasi** (gedung, rak), **W6-W10 mesin** (satpam, pesan), **W11-W13 finishing** (laci, peti), **W14 = buka mal**.

### 3 Istilah Wajib
1. **Capstone/deploy/README**: gabung/buka/panduan

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Grand Opening:** Semua checklist hijau + URL publik + video. **Selesai Spring 0→Ahli!** 🎉

---
- **Checklist integrasi:** **Setup Spring Boot** (Minggu 1) + **Dependency Injection** (Minggu 2) + **REST Controller** (Minggu 3) + **Spring Data JPA** (Minggu 4) + **REST API Best Practices** (Minggu 5) + **Spring Security** (Minggu 6) + **Testing** (Minggu 7) + **Validation** (Minggu 8) + **Actuator & Monitoring** (Minggu 9) + **Messaging** (Minggu 10) + **Caching** (Minggu 11) + **Async & Scheduling** (Minggu 12) + **Deployment** (Minggu 13) → semua bagian di atas jalan bareng saat grand opening.
## Glosarium Mini

- **Capstone/deploy**: gabung/buka

---

## Ringkasan

Minggu 14 dari 14: **Grand Opening** (Level: Lanjutan). **Selesai Spring 0→Ahli dari nol!** 🎉
