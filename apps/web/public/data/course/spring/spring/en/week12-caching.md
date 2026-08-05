# Caching & Performance

> Spring Boot | Module 12

## Learning Objectives

- Use Spring Cache abstraction
- Implement caching with Caffeine/Redis
- Use @Cacheable, @CacheEvict
- Optimize DB queries with caching

---

## Program: Optimize Performance

```java
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "posts");
    }
}

@Service
public class UserService {
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @CacheEvict(value = "users", key = "#user.id")
    public void update(User user) {
        userRepository.save(user);
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

Module 12 of 16: **Caching & Performance**. Spring Boot is a Java framework for building enterprise applications. Next week: **Messaging & Async Processing**.
