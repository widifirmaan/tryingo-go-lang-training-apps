# Setup & Proyek Pertama

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 1:** Setup & Proyek Pertama

## Tujuan Pembelajaran

- Memahami Spring Boot sebagai framework Java untuk enterprise application
- Setup proyek dengan Spring Initializr atau CLI
- Memahami anotasi: @SpringBootApplication, @RestController, @GetMapping
- Struktur proyek: src/main/java, src/main/resources, pom.xml
- Menjalankan aplikasi: mvn spring-boot:run

---

## Program: Halo, Spring Boot!

```java
// File: src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("Spring Boot berjalan di port 8080!");
    }

    @GetMapping("/")
    public String hello() {
        return "Selamat datang di Spring Boot!";
    }

    @GetMapping("/info")
    public String info() {
        return "Spring Boot 3.x + Java 17 + Spring Framework 6";
    }
}

// File: pom.xml (konseptual)
/*
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
*/

// File: src/main/resources/application.properties
/*
server.port=8080
spring.application.name=demo-app
*/

// CLI Commands:
// mvn spring-boot:run
// curl http://localhost:8080/
// curl http://localhost:8080/info
```

---

## Konsep Kunci

### Spring Boot
Framework Java untuk build production-ready applications. Auto-configuration, embedded server, opinionated defaults.

### @SpringBootApplication
Gabungan dari @Configuration, @EnableAutoConfiguration, @ComponentScan.

### @RestController
Gabungan @Controller + @ResponseBody. Return data langsung (JSON).

### @GetMapping
Mapping HTTP GET ke method. Bisa spesifik path.

### Struktur Proyek
- src/main/java: source code
- src/main/resources: config, static files
- pom.xml: Maven dependencies

### CLI
`mvn spring-boot:run` atau `./mvnw spring-boot:run`

---

## Eksperimen

- Buat endpoint baru dengan @GetMapping("/hello")
- Ubah port di application.properties
- Tambah @PostMapping endpoint
- Coba @PathVariable untuk dynamic URL
- Buat response JSON dengan Map

---

## Tantangan

Buat REST API sederhana: endpoint /products (GET), /products/{id} (GET), /products (POST). Gunakan List in-memory.

---

## Ringkasan

Minggu 1 dari 14: **Setup & Proyek Pertama** (Level: Pemula). Spring Boot memberikan rapid development. Minggu depan: **Dependency Injection**.
