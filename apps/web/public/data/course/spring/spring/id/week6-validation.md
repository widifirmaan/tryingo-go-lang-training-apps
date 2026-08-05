# Validation & DTOs

> Spring Boot | Modul 6

## Tujuan Pembelajaran

- Menggunakan @Valid untuk validasi
- Membuat DTO (Data Transfer Object)
- Menggunakan Bean Validation annotations
- Mengembalikan error messages yang jelas

---

## Program: Request Validation

```java
public class CreatePostRequest {
    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 200)
    private String title;

    @NotBlank(message = "Body is required")
    @Size(min = 10)
    private String body;

    // getters and setters
}

@PostMapping
public ResponseEntity<Post> create(
    @Valid @RequestBody CreatePostRequest request
) {
    Post post = new Post();
    post.setTitle(request.getTitle());
    post.setBody(request.getBody());
    return ResponseEntity.ok(postService.save(post));
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

Modul 6 dari 16: **Validation & DTOs**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **7. Spring Security & JWT**.
