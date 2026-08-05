# Microservices Architecture

> Spring Boot | Module 14

## Learning Objectives

- Understand microservices architecture
- Use Spring Cloud
- Implement service discovery
- Use API Gateway

---

## Program: Distributed System

```java
// Service Discovery with Eureka
@EnableEurekaClient
public class ServiceApplication { }

// API Gateway
@EnableGateway
public class GatewayApplication {
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r
                .path("/api/users/**")
                .uri("lb://user-service"))
            .build();
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

Module 14 of 16: **Microservices Architecture**. Spring Boot is a Java framework for building enterprise applications. Next week: **Deployment & Docker**.
