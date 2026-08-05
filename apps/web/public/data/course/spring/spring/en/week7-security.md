# Spring Security & JWT

> Spring Boot | Module 7

## Learning Objectives

- Understand Spring Security
- Implement JWT authentication
- Use role-based authorization
- Configure CORS and CSRF

---

## Program: Auth & Security

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
        HttpSecurity http
    ) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtFilter(),
                UsernamePasswordAuthenticationFilter.class
            );
        return http.build();
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

Module 7 of 16: **Spring Security & JWT**. Spring Boot is a Java framework for building enterprise applications. Next week: **Service Layer & Transactions**.
