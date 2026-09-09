# Actuator & Monitoring — Dasbor Sehat Warung Spring

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 9:** Actuator & Monitoring
> **Prasyarat:** Minggu 8 — **Validation**.

## Tujuan Pembelajaran

- `spring-boot-starter-actuator` + `/actuator/health` cek sehat, `/actuator/metrics` angka (sumber: docs.spring.io/spring-boot/reference/actuator)
- `management.endpoints.web.exposure.include` buka pintu yang perlu saja

---

## Kenapa Ini Penting Buat Kamu?

Server mati jam 2 pagi tanpa tahu → pelanggan kabur. Dengan `/actuator/health` + monitoring (Prometheus), HP bunyi saat `DOWN`. Tanpa ini, tahu dari komplain.

---

## Program: Dasbor Sehat Warung

```properties
# application.properties — buka pintu perlu saja!
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
info.app.nama=Warung Bu Siti
info.app.versi=1.0.0
```

```bash
curl http://localhost:8080/actuator/health
# {"status":"UP","components":{"db":{"status":"UP"},"diskSpace":{"status":"UP"}}}

curl http://localhost:8080/actuator/info
# {"app":{"nama":"Warung Bu Siti","versi":"1.0.0"}}

curl http://localhost:8080/actuator/metrics/http.server.requests
```

Matikan DB → `/health` jadi `DOWN` (bukti hidup!).

---

## Konsep Kunci

### `/health` / `/info` / `/metrics` = Sehat/Info/Angka
`health` UP/DOWN, `info` info app, `metrics` angka (request, JVM).

### `exposure.include` = Buka Seperlunya
Jangan `*` di produksi (bocor `env` berisi password!). Cukup `health,info`.

---

## Penjelasan untuk Pemula

### Analogi: Panel Kesehatan Warung
- **Actuator = panel di dinding**: lampu hijau UP, merah DOWN.
- **Metrics = spedometer**: berapa request/detik.

### Langkah 0 — Siapkan Device
- Tambah `spring-boot-starter-actuator` + restart + buka `/actuator/health`.

### Cara Komputer Membaca
1. `GET /actuator/health` → cek DB + disk → `{"status":"UP"}`.
2. DB mati → `DOWN`.

### 3 Istilah Wajib
1. **Actuator/health**: panel/sehat
2. **exposure**: buka pintu

---

## Eksperimen

- **Hijau:** Matikan DB → `health` DOWN? Nyalakan → UP?
- **Kuning:** `exposure.include=*` → `/actuator/env` terlihat (bahaya!)? Kembalikan.
- **Merah:** `show-details=never` → detail hilang (produksi aman)?

---

## Tantangan

**Warung Terpantau:** `health` + `info` custom + `metrics` + screenshot UP + simulasi DOWN (matikan DB).
- **Sambungan (Minggu 8 — Validation):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Actuator/health/metrics**: panel/sehat/angka

---

## Ringkasan

Minggu 9 dari 10: **Dasbor Sehat** (Level: Menengah). Mati ketahuan duluan. Minggu depan: **Messaging** — pesan antar dapur.
