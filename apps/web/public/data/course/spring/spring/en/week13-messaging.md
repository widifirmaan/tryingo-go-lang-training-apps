# Messaging & Async Processing

> Spring Boot | Module 13

## Learning Objectives

- Understand async processing with @Async
- Use CompletableFuture
- Implement scheduled tasks
- Understand message queues

---

## Program: Async Tasks

```java
@Service
public class AsyncService {
    @Async
    public CompletableFuture<String> sendNotification(String message) {
        // Simulate async processing
        return CompletableFuture.completedFuture("Sent: " + message);
    }

    @Scheduled(fixedRate = 60000)
    public void cleanup() {
        // Run every minute
        System.out.println("Cleanup job executed");
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

Module 13 of 16: **Messaging & Async Processing**. Spring Boot is a Java framework for building enterprise applications. Next week: **Microservices Architecture**.
