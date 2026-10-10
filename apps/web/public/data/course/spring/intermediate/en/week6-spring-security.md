# Spring Security

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 6:** Spring Security

## Learning Objectives

- Spring Security: authentication and authorization
- SecurityFilterChain configuration
- JWT (JSON Web Token) for stateless auth
- Login and register endpoints
- Role-based access control: @PreAuthorize

---

## Program: Auth & JWT

```java
// File: SecurityConfig.java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/products/**").authenticated()
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

// File: JwtUtil.java (konseptual)
/*
@Component
public class JwtUtil {
    private String SECRET_KEY = "rahasia";

    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY)
            .parseClaimsJws(token).getBody().getSubject();
    }
}
*/

// File: AuthController.java
/*
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Validasi credentials
        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Simpan user baru
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered");
    }
}
*/

// Dependencies (pom.xml):
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
*/
```

---

## Key Concepts

### Spring Security
Authentication and authorization framework.

### SecurityFilterChain
Configure security rules and filters.

### JWT
Stateless token-based authentication.

### Flow
Login → JWT → Validate → Access control.

### Role-Based Access
Restrict endpoints by user roles.

---

## Experiments

- Create endpoint with role-based access
- Experiment with JWT expiration
- Try refresh token flow
- Create custom UserDetailsService
- Experiment with method-level security

---

## Challenge

Build a complete auth system: register, login, JWT, role-based access (USER, ADMIN). Protect endpoints.

---

## Summary

Week 6 of 14: **Spring Security** (Level: Intermediate). Web application security. Next week: **Testing**.
