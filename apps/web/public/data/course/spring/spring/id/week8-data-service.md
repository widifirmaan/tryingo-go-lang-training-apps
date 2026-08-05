# Service Layer & Transactions

> Spring Boot | Modul 8

## Tujuan Pembelajaran

- Membuat service layer untuk business logic
- Menggunakan @Transactional
- Mengimplementasi service pattern
- Memisahkan concerns (controller vs service)

---

## Program: Business Logic

```java
@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}

@Transactional(readOnly = true)
public List<Post> findPublishedPosts() {
    return postRepository.findByPublishedTrue();
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

Modul 8 dari 16: **Service Layer & Transactions**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **9. Exception Handling & Global Errors**.
