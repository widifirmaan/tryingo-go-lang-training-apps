# Introduction to Spring Boot & Setup

> Spring Boot | Module 1

## Learning Objectives

- Understand Spring Boot as a Java framework
- Install Java JDK and Spring Boot
- Understand Spring Boot project structure
- Create your first Spring Boot application

---

## Program: Hello Spring

```java
@SpringBootApplication
public class HelloSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloSpringApplication.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

---

## Explanation

Spring Boot is a Java framework that simplifies enterprise application development.
Spring Boot uses Dependency Injection and auto-configuration concepts.
Spring MVC handles HTTP requests and returns JSON responses.
Spring Data JPA simplifies database operations with the repository pattern.

---

## Experiments

- Change the endpoint and run the application
- Add a new entity with relationships
- Try adding Spring Security for authentication

---

## Challenge

Build a complete Spring Boot REST API with CRUD, validation, and authentication.
Run with: ./mvnw spring-boot:run

---

## Summary

Module 1 of 16: **Introduction to Spring Boot & Setup**. Spring Boot is a Java framework for building enterprise applications. Next week: **Spring MVC & Controllers**.
