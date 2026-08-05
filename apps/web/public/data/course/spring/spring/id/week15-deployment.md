# Deployment & Docker

> Spring Boot | Modul 15

## Tujuan Pembelajaran

- Mempersiapkan deployment
- Membuat Docker container
- Menggunakan Docker Compose
- Memahami production configuration

---

## Program: Containerize App

```java
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
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

Modul 15 dari 16: **Deployment & Docker**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **16. Capstone: Spring Boot API**.
