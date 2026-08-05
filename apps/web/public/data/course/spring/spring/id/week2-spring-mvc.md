# Spring MVC & Controllers

> Spring Boot | Modul 2

## Tujuan Pembelajaran

- Memahami pola MVC di Spring
- Membuat controller dengan @RestController
- Menggunakan @GetMapping, @PostMapping, dll
- Mengembalikan JSON response

---

## Program: REST Controllers

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        User saved = userService.save(user);
        return ResponseEntity
            .created(URI.create("/api/users/" + saved.getId()))
            .body(saved);
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

Modul 2 dari 16: **Spring MVC & Controllers**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **3. Dependency Injection & Beans**.
