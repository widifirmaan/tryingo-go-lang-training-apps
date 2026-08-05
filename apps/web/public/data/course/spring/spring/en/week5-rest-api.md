# Building REST APIs

> Spring Boot | Module 5

## Learning Objectives

- Build REST API with Spring Boot
- Use @PathVariable and @RequestParam
- Implement CRUD operations
- Use ResponseEntity for status codes

---

## Program: API Endpoints

```java
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @GetMapping
    public List<Post> list() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> get(@PathVariable Long id) {
        return postService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Post> create(@Valid @RequestBody Post post) {
        Post saved = postService.save(post);
        return ResponseEntity.created(
            URI.create("/api/posts/" + saved.getId())
        ).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> update(
        @PathVariable Long id,
        @RequestBody Post post
    ) {
        return postService.findById(id)
            .map(p -> {
                p.setTitle(post.getTitle());
                p.setBody(post.getBody());
                return ResponseEntity.ok(postService.save(p));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
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

Module 5 of 16: **Building REST APIs**. Spring Boot is a Java framework for building enterprise applications. Next week: **Validation & DTOs**.
