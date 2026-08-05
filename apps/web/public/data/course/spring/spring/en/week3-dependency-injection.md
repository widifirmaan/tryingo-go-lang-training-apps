# Dependency Injection & Beans

> Spring Boot | Module 3

## Learning Objectives

- Understand Dependency Injection and IoC
- Use @Autowired and constructor injection
- Understand bean scope (singleton, prototype)
- Use @Component, @Service, @Repository

---

## Program: Spring IoC

```java
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}

@Component
public class EmailService {
    public void sendWelcomeEmail(String to) {
        System.out.println("Welcome email sent to " + to);
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

Module 3 of 16: **Dependency Injection & Beans**. Spring Boot is a Java framework for building enterprise applications. Next week: **Data Access with JPA/Hibernate**.
