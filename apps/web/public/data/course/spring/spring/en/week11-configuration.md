# Configuration & Profiles

> Spring Boot | Module 11

## Learning Objectives

- Use application.properties/yml
- Implement multi-profile configuration
- Use @Value and @ConfigurationProperties
- Understand environment variables

---

## Program: App Config

```java
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
---
spring:
  profiles: prod
  datasource:
    url: jdbc:postgresql://localhost:5432/proddb
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

Module 11 of 16: **Configuration & Profiles**. Spring Boot is a Java framework for building enterprise applications. Next week: **Caching & Performance**.
