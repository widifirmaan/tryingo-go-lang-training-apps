# Dependency Injection & Beans

> Spring Boot | Modul 3

## Tujuan Pembelajaran

- Memahami Dependency Injection dan IoC
- Menggunakan @Autowired dan constructor injection
- Memahami bean scope (singleton, prototype)
- Menggunakan @Component, @Service, @Repository

---

## Program: Spring IoC

```java
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}

@Component
public class EmailService {
    public void sendWelcomeEmail(String to) {
        System.out.println("Welcome email sent to " + to);
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

Modul 3 dari 16: **Dependency Injection & Beans**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **4. Data Access with JPA/Hibernate**.
