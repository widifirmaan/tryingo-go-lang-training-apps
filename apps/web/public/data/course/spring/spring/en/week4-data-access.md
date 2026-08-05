# Data Access with JPA/Hibernate

> Spring Boot | Module 4

## Learning Objectives

- Understand JPA and Hibernate
- Create entity and repository
- Use Spring Data JPA
- Configure database connection

---

## Program: Database Access

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    // getters and setters
}

@Repository
public interface UserRepository
    extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
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

Module 4 of 16: **Data Access with JPA/Hibernate**. Spring Boot is a Java framework for building enterprise applications. Next week: **Building REST APIs**.
