# Deployment — Buka Cabang Warung Spring

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 13:** Deployment
> **Prasyarat:** Minggu 12 — **Async & Scheduling**.

## Tujuan Pembelajaran

- `./mvnw package` jadi `warung-1.0.jar` 1 kardus, `java -jar` jalan di mana saja (sumber: docs.spring.io/spring-boot/deployment)
- `Dockerfile` peti + `SPRING_PROFILES_ACTIVE=prod` bedakan dev/prod

---

## Kenapa Ini Penting Buat Kamu?

Lokal `localhost:8080` hanya di laptop. Deploy = sewa ruko online (`Railway`/`VPS`) agar HP pelanggan bisa buka. Tanpa profil, password dev ikut ke produksi (bocor!).

---

## Program: Kardus & Peti Warung

```bash
# 1. Bungkus 1 kardus
./mvnw clean package -DskipTests
ls target/warung-1.0.jar
java -jar target/warung-1.0.jar
```

```dockerfile
# 2. Peti (Dockerfile)
FROM eclipse-temurin:17-jre
COPY target/warung-1.0.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
docker build -t warung:1.0 .
docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/warung warung:1.0
```

```properties
# application-prod.properties — rahasia produksi (jangan commit!)
spring.datasource.password=${DB_PASSWORD}
```

---

## Konsep Kunci

### `jar` = Kardus Jadi
`mvn package` → 1 `jar` berisi app + Tomcat di dalam. `java -jar` jalan tanpa install Tomcat.

### `Dockerfile` = Peti
`FROM eclipse-temurin:17-jre` (ringan, tanpa Maven) + `COPY jar`.

### Profil `prod` = Aturan Cabang
`SPRING_PROFILES_ACTIVE=prod` → baca `application-prod.properties` (password dari env, bukan file!).

---

## Penjelasan untuk Pemula

### Analogi: Kardus & Peti Kemas
- **jar = kardus**: semua + mesin di dalam.
- **Docker = peti kemas**: kardus + alamat, kirim ke server mana saja.

### Langkah 0 — Siapkan Device
- JDK 17 + Docker + akun `Railway`/`VPS`.

### Cara Komputer Membaca
1. `mvn package` → compile + test + bungkus `jar`.
2. `docker run` → Java dalam peti → app dengar 8080.

### 3 Istilah Wajib
1. **jar/package**: kardus/bungkus
2. **Dockerfile/profil**: peti/aturan-cabang

---

## Eksperimen

- **Hijau:** `java -jar` tanpa `mvn` ulang setelah ubah kode → versi lama? (Harus `package` lagi!)
- **Kuning:** `docker run` tanpa `-p` → tidak bisa buka? Tambah `-p`.
- **Merah:** Commit password di `application.properties` → bocor di GitHub? Pindah ke env!

---

## Tantangan

**Cabang Online:** `package` + `Dockerfile` + `docker run` lokal lulus + deploy `Railway` (`railway up`) + buka URL publik.
- **Sambungan (Minggu 12 — Async & Scheduling):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **jar/Docker/profil**: kardus/peti/cabang

---

## Ringkasan

Minggu 13 dari 14: **Buka Cabang** (Level: Lanjutan). Online! Minggu depan: **Capstone**.
