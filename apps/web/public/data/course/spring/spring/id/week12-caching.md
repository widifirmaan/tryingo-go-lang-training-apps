# Caching & Performance

> Spring Boot | Modul 12

## Tujuan Pembelajaran

- Menggunakan Spring Cache abstraction
- Mengimplementasi caching dengan Caffeine/Redis
- Menggunakan @Cacheable, @CacheEvict
- Mengoptimasi query database dengan caching

---

## Program: Optimize Performance

```java
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "posts");
    }
}

@Service
public class UserService {
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @CacheEvict(value = "users", key = "#user.id")
    public void update(User user) {
        userRepository.save(user);
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

Modul 12 dari 16: **Caching & Performance**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **13. Messaging & Async Processing**.
