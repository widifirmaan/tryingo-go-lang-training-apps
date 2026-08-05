# Deployment & Docker

> Spring Boot | Module 15

## Learning Objectives

- Prepare for deployment
- Create Docker container
- Use Docker Compose
- Understand production configuration

---

## Program: Containerize App

```java
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
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

Module 15 of 16: **Deployment & Docker**. Spring Boot is a Java framework for building enterprise applications. Next week: **Capstone: Spring Boot API Project**.
