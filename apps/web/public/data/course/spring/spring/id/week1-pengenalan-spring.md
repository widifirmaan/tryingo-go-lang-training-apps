# Pengenalan Spring Boot & Setup

> Spring Boot | Modul 1

## Tujuan Pembelajaran

- Mengenal Spring Boot sebagai framework Java
- Menginstall Java JDK dan Spring Boot
- Memahami struktur proyek Spring Boot
- Membuat aplikasi Spring Boot pertama

---

## Program: Hello Spring

```java
@SpringBootApplication
public class HelloSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloSpringApplication.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
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

Modul 1 dari 16: **Pengenalan Spring Boot & Setup**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **2. Spring MVC & Controllers**.
