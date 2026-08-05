# Building REST APIs

> Spring Boot | Modul 5

## Tujuan Pembelajaran

- Membangun REST API dengan Spring Boot
- Menggunakan @PathVariable dan @RequestParam
- Mengimplementasi CRUD operations
- Menggunakan ResponseEntity untuk status codes

---

## Program: API Endpoints

```java
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @GetMapping
    public List<Post> list() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> get(@PathVariable Long id) {
        return postService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Post> create(@Valid @RequestBody Post post) {
        Post saved = postService.save(post);
        return ResponseEntity.created(
            URI.create("/api/posts/" + saved.getId())
        ).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> update(
        @PathVariable Long id,
        @RequestBody Post post
    ) {
        return postService.findById(id)
            .map(p -> {
                p.setTitle(post.getTitle());
                p.setBody(post.getBody());
                return ResponseEntity.ok(postService.save(p));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
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

Modul 5 dari 16: **Building REST APIs**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **6. Validation & DTOs**.
