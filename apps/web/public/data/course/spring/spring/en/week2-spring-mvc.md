# Spring MVC & Controllers

> Spring Boot | Module 2

## Learning Objectives

- Understand MVC pattern in Spring
- Create controller with @RestController
- Use @GetMapping, @PostMapping, etc.
- Return JSON response

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

Module 2 of 16: **Spring MVC & Controllers**. Spring Boot is a Java framework for building enterprise applications. Next week: **Dependency Injection & Beans**.
