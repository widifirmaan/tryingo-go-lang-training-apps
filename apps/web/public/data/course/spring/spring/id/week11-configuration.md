# Configuration & Profiles

> Spring Boot | Modul 11

## Tujuan Pembelajaran

- Menggunakan application.properties/yml
- Mengimplementasi multi-profile configuration
- Menggunakan @Value dan @ConfigurationProperties
- Memahami environment variables

---

## Program: App Config

```java
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
---
spring:
  profiles: prod
  datasource:
    url: jdbc:postgresql://localhost:5432/proddb
```

---

## Penjelasan

Spring Boot adalah framework Java yang menyederhanakan pengembangan aplikasi enterprise.
Spring Boot menggunakan konsep Dependency Injection dan auto-configuration.
Spring MVC menangani request HTTP dan mengembalikan response JSON.
Spring Data JPA menyederhanakan operasi database dengan repository pattern.

---

## Eksperimen

- Ubah endpoint dan jalankan aplikasi
- Tambah entity baru dengan relasi
- Coba tambah Spring Security untuk authentication

---

## Tantangan

Buat aplikasi Spring Boot REST API lengkap dengan CRUD, validation, dan authentication.
Jalankan dengan: ./mvnw spring-boot:run

---

## Ringkasan

Modul 11 dari 16: **Configuration & Profiles**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **12. Caching & Performance**.
