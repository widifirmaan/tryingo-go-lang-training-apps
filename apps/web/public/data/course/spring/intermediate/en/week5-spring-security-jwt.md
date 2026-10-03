# Enterprise Security: Spring Security 6, Stateless JWT & RBAC

> **Kategori:** Spring Boot & Java | **Level:** Intermediate | **Minggu 5:** Enterprise Security: Spring Security 6, Stateless JWT & RBAC
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Spring Security 6 architecture (migration from `WebSecurityConfigurerAdapter` to `SecurityFilterChain`).
- Configure stateless authentication with JSON Web Tokens (JWT).
- Implement Role-Based Access Control (RBAC) at both URL and method levels (`@PreAuthorize`).
- Disable CSRF and session storage for cloud-native stateless REST microservices.

---

## Program: SecurityFilterChain Configuration & Bank Role-Based Authorization

```java
package com.tryngo.banking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Mengaktifkan @PreAuthorize pada method
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF untuk Stateless REST API
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/actuator/health").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/public/**").permitAll()
                .requestMatchers("/api/v1/compliance/**").hasRole("COMPLIANCE_OFFICER")
                .requestMatchers("/api/v1/transfers/**").hasAnyRole("TELLER", "CUSTOMER")
                .anyRequest().authenticated()
            );

        return http.build();
    }
}

// Controller dengan Pengamanan Berlapis di Tingkat Method
@RestController
@RequestMapping("/api/v1/compliance")
class ComplianceAuditController {

    @GetMapping("/flagged-accounts")
    @PreAuthorize("hasRole('COMPLIANCE_OFFICER') and hasAuthority('SCOPE_audit:read')")
    public String getHighRiskAccounts() {
        return "[SECURE] 3 rekening sedang dibekukan oleh unit Anti-Pencucian Uang (AML).";
    }
}
```

---

## Key Concepts

Security represents the most critical pillar in financial infrastructure. Spring Security 6 introduces functional component paradigms, retiring legacy inheritance adapters.

### The SecurityFilterChain Bean
In Spring Security 6, all security rules reside within a `SecurityFilterChain` bean. Utilizing an expressive lambda DSL, developers designate open public routes (`/api/v1/auth/**`), authenticated endpoints, and role-based policies (`hasRole('COMPLIANCE_OFFICER')`).

### Stateless Session Management
Monolithic web architectures traditionally retained login sessions in server RAM (HttpSession). In containerized microservices spanning distributed clusters, servers enforce `SessionCreationPolicy.STATELESS`. Every incoming HTTP call carries a JWT within `Authorization: Bearer <token>`, verified independently at each hop.

### Method-Level Security with @PreAuthorize
Beyond URL route filtering, `@PreAuthorize` empowers fine-grained authorization directly atop business methods. Leveraging Spring Expression Language (SpEL), developers enforce rich multi-condition rules blending roles, OAuth scopes, and entity ownership parameters.


---

---

## Beginner Friendly Explanation

Think of a bank corporate headquarters. At the main lobby (SecurityFilterChain), security guards verify visitor badges (Authentication). However, accessing the subterranean bullion vault (Method Security @PreAuthorize) requires biometric authorization granted solely to compliance directors.

## Experiments

- Access `/api/v1/compliance/flagged-accounts` without credentials and observe the HTTP 403 response.
- Register a custom `JwtAuthenticationFilter` ahead of `UsernamePasswordAuthenticationFilter`.
- Test a `@PreAuthorize("#accountId == authentication.principal.username")` expression for account ownership.

---

## Challenge

Configure Spring Security as an OAuth2 Resource Server that automatically validates JWT signatures using JWKS public keys from an external auth server (Keycloak / Auth0).

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `var x int / x := 42`
- **Core Functionality:** Type-safe variable declaration and short assignment.
- **Parameters / Attributes:** `Identifier, Type / Value`.
- **System Behavior & Return:** `:=` infers concrete types dynamically in function bodies; `var` sets deterministic zero values.
- **Practical Code Example:**
```javascript
counter := 10
fmt.Println("Counter:", counter)
```
- **Expected Execution Output:**
```text
Counter: 10
```

### 2. `func (r Receiver) Method() ReturnType`
- **Core Functionality:** Struct receiver method binding.
- **Parameters / Attributes:** `Receiver instance, Parameters`.
- **System Behavior & Return:** Associates behaviors directly with struct types without classical inheritance hierarchies.
- **Practical Code Example:**
```javascript
type Point struct { X, Y int }
func (p Point) Sum() int {
  return p.X + p.Y
}
```
- **Expected Execution Output:**
```text
Evaluates method computation over struct fields
```

### 3. `go func() { ... }()`
- **Core Functionality:** Lightweight concurrent Goroutine dispatch.
- **Parameters / Attributes:** `Anonymous / Named function`.
- **System Behavior & Return:** Launches asynchronous task execution scheduled cooperatively by the Go runtime (~2KB stack footprint).
- **Practical Code Example:**
```javascript
go func() {
  fmt.Println("Running asynchronously!")
}()
```
- **Expected Execution Output:**
```text
Executes concurrently without blocking the main OS thread
```

### 4. `ch := make(chan int); ch <- 1; v := <-ch`
- **Core Functionality:** Thread-safe CSP Channel pipeline.
- **Parameters / Attributes:** `Element Type, Buffer capacity`.
- **System Behavior & Return:** Transmits values synchronously between Goroutines with zero manual mutex or lock synchronization.
- **Practical Code Example:**
```javascript
ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)
```
- **Expected Execution Output:**
```text
42
```


---

## Common Pitfalls & Debugging Tips

### 1. Circular Bean Dependencies
- **Symptom / Issue:** Application fails startup with `BeanCurrentlyInCreationException`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Refactor dependencies using mediator patterns or apply `@Lazy` as a stopgap.

### 2. Self-Invocation Bypassing `@Transactional`
- **Symptom / Issue:** Internal method calls within the same class bypass the Spring AOP proxy.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Invoke transactional methods through an injected bean reference.

### 3. N+1 Hibernate Query Problem
- **Symptom / Issue:** Loads relational collections with hundreds of sequential database trips.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `JOIN FETCH` queries or annotate repository methods with `@EntityGraph`.

---

## Summary

You have mastered Spring Security 6, stateless JWT, and RBAC authorization. Next week we explore atomic transaction management and database locking.
