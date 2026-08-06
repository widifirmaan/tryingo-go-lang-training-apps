# Setup & First Project

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 1:** Setup & First Project

## Learning Objectives

- Understand Spring Boot as a Java framework for enterprise applications
- Set up projects with Spring Initializr or CLI
- Understand annotations: @SpringBootApplication, @RestController, @GetMapping
- Project structure: src/main/java, src/main/resources, pom.xml
- Run applications: mvn spring-boot:run

---

## Program: Hello, Spring Boot!

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

## Key Concepts

### Spring Boot
Java framework for production-ready applications with auto-configuration.

### @SpringBootApplication
Combines configuration, auto-configuration, and component scanning.

### @RestController
Returns data directly as JSON.

### @GetMapping
Maps HTTP GET requests to handler methods.

### Project Structure
Standard Maven layout with src/main/java and resources.

### CLI
Run with mvn spring-boot:run.

---

## Experiments

- Create new endpoint with @GetMapping("/hello")
- Change port in application.properties
- Add @PostMapping endpoint
- Try @PathVariable for dynamic URLs
- Create JSON response with Map

---

## Challenge

Build a simple REST API: endpoint /products (GET), /products/{id} (GET), /products (POST). Use in-memory List.

---

## Summary

Week 1 of 14: **Setup & First Project** (Level: Beginner). Spring Boot enables rapid development. Next week: **Dependency Injection**.
