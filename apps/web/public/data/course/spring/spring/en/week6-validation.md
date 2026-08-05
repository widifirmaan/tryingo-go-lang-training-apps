# Validation & DTOs

> Spring Boot | Module 6

## Learning Objectives

- Use @Valid for validation
- Create DTO (Data Transfer Object)
- Use Bean Validation annotations
- Return clear error messages

---

## Program: Request Validation

```java
public class CreatePostRequest {
    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 200)
    private String title;

    @NotBlank(message = "Body is required")
    @Size(min = 10)
    private String body;

    // getters and setters
}

@PostMapping
public ResponseEntity<Post> create(
    @Valid @RequestBody CreatePostRequest request
) {
    Post post = new Post();
    post.setTitle(request.getTitle());
    post.setBody(request.getBody());
    return ResponseEntity.ok(postService.save(post));
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

Module 6 of 16: **Validation & DTOs**. Spring Boot is a Java framework for building enterprise applications. Next week: **Spring Security & JWT**.
