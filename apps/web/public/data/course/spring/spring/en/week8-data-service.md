# Service Layer & Transactions

> Spring Boot | Module 8

## Learning Objectives

- Create service layer for business logic
- Use @Transactional
- Implement service pattern
- Separate concerns (controller vs service)

---

## Program: Business Logic

```java
@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}

@Transactional(readOnly = true)
public List<Post> findPublishedPosts() {
    return postRepository.findByPublishedTrue();
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

Module 8 of 16: **Service Layer & Transactions**. Spring Boot is a Java framework for building enterprise applications. Next week: **Exception Handling & Global Errors**.
