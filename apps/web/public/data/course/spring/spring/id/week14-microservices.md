# Microservices Architecture

> Spring Boot | Modul 14

## Tujuan Pembelajaran

- Memahami microservices architecture
- Menggunakan Spring Cloud
- Mengimplementasi service discovery
- Menggunakan API Gateway

---

## Program: Distributed System

```java
// Service Discovery with Eureka
@EnableEurekaClient
public class ServiceApplication { }

// API Gateway
@EnableGateway
public class GatewayApplication {
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r
                .path("/api/users/**")
                .uri("lb://user-service"))
            .build();
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

Modul 14 dari 16: **Microservices Architecture**. Spring Boot adalah framework Java untuk membangun aplikasi enterprise. Minggu depan: **15. Deployment & Docker**.
