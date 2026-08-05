# Spring Security & JWT

> Spring Boot | Modul 7

## Tujuan Pembelajaran

- Memahami Spring Security
- Mengimplementasi JWT authentication
- Menggunakan role-based authorization
- Mengkonfigurasi CORS dan CSRF

---

## Program: Auth & Security

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
        HttpSecurity http
    ) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtFilter(),
                UsernamePasswordAuthenticationFilter.class
            );
        return http.build();
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

Modul 7 dari 16: **Spring Security & JWT**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **8. Service Layer & Transactions**.
