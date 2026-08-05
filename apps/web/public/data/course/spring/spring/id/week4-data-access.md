# Data Access with JPA/Hibernate

> Spring Boot | Modul 4

## Tujuan Pembelajaran

- Memahami JPA dan Hibernate
- Membuat entity dan repository
- Menggunakan Spring Data JPA
- Mengkonfigurasi database connection

---

## Program: Database Access

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    // getters and setters
}

@Repository
public interface UserRepository
    extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
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

Modul 4 dari 16: **Data Access with JPA/Hibernate**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **5. Building REST APIs**.
