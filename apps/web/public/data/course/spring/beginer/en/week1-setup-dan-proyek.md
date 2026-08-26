# Setup Spring Boot — Pabrik Warung Enterprise

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 1:** Setup & Proyek

## Tujuan Pembelajaran

- Buat proyek di `start.spring.io`: pilih `Maven`, `Java 17`, `Spring Web` → Download → `mvn spring-boot:run` di `8080`
- Paham `Spring Boot` = **pabrik warung enterprise**: banyak mesin, tapi `starter` sudah rakit

---

## Kenapa Ini Penting Buat Kamu?

Spring untuk perusahaan besar: warung yang mau jadi 1000 cabang butuh pabrik. Non-IT tidak perlu detail, cukup tahu `start.spring.io` klik-klik jadi.

---

## Program: Pabrik Hello

```bash
# Buka start.spring.io → Project Maven, Java 17, Dependencies: Spring Web → Generate
# Unzip, buka di VS Code
./mvnw spring-boot:run
# Buka http://localhost:8080
```

```java
// src/main/java/com/warung/WarungApplication.java
@SpringBootApplication
public class WarungApplication { public static void main(String[] args){ SpringApplication.run(WarungApplication.class, args); } }

// src/main/java/com/warung/HelloController.java
@RestController
public class HelloController {
  @GetMapping("/hello")
  public String hello(){ return "Halo Warung Spring!"; }
}
```

Buka `http://localhost:8080/hello` → "Halo Warung Spring!"

---

## Ringkasan

Minggu 1: **Pabrik Spring** — `start.spring.io` klik jadi. Minggu depan: **DI**.
