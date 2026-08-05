# Messaging & Async Processing

> Spring Boot | Modul 13

## Tujuan Pembelajaran

- Memahami async processing dengan @Async
- Menggunakan CompletableFuture
- Mengimplementasi scheduled tasks
- Memahami message queues

---

## Program: Async Tasks

```java
@Service
public class AsyncService {
    @Async
    public CompletableFuture<String> sendNotification(String message) {
        // Simulate async processing
        return CompletableFuture.completedFuture("Sent: " + message);
    }

    @Scheduled(fixedRate = 60000)
    public void cleanup() {
        // Run every minute
        System.out.println("Cleanup job executed");
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

Modul 13 dari 16: **Messaging & Async Processing**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **14. Microservices Architecture**.
