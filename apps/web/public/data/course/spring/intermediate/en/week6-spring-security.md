# Spring Security — Shop Factory Guards

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 6:** Spring Security
> **Prerequisites:** Week 5 — **REST API Best Practices**.

## Learning Objectives

- `SecurityFilterChain` guard chain: `/admin/**` login mandatory, `/products` free (source: docs.spring.io/spring-security)
- `formLogin` automatic login page, `PasswordEncoder` (`BCrypt`) password encryption (never MD5!)

---

## Why This Matters (Non-IT)

Without guards, anyone `POST /products` edits prices + `DELETE`s everything. Without `BCrypt`, DB leaks expose passwords. Security = 5 config lines protecting the whole shop.

---

## Program: Spring Shop Guard

```bash
# start.spring.io check: Spring Web + Spring Security
```

```java
// SecurityConfig.java — guard post
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filter(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/admin/**").authenticated() // guarded door
        .requestMatchers("/products/**").permitAll()    // free showcase
        .anyRequest().permitAll()
      )
      .formLogin(withDefaults())   // automatic /login page
      .csrf(csrf -> csrf.disable()); // off for API tests (on + token in production!)
    return http.build();
  }
}
```

```properties
# application.properties — 1 emergency admin
spring.security.user.name=admin
spring.security.user.password=admin123
spring.security.user.roles=ADMIN
```

Open `/admin` → kicked to `/login` → login `admin/admin123` → in. `/products` free.

---

## Key Concepts

### `SecurityFilterChain` = Guard-Post Chain
`authorizeHttpRequests` rules per door: `authenticated()` login mandatory, `permitAll()` free.

### `formLogin` = Automatic Login Door
Spring builds `/login` + checks — no HTML writing.

### `BCrypt` = Password Vault
`new BCryptPasswordEncoder().encode("123")` → random `$2a$...`. Compare with `matches()`, never `==`.

---

## Beginner Friendly Explanation

### Analogy: Mall Guards
- **FilterChain = guard post**: checks IDs per door per list.
- **formLogin = registration desk**: register → wristband (`session`).
- **BCrypt = vault**: passwords become unreadable random.

### Step 0 — Prepare Device
- Same as W1 + `Spring Security` dependency (or add to `pom.xml` + restart).

### How the Computer Reads It
1. `GET /admin` → filter checks session → missing → `302` to `/login`.
2. Correct login → session created → `/admin` passes.

### 3 Must-Know Terms
1. **FilterChain/authorize**: post/rules
2. **formLogin/session**: registration/wristband
3. **BCrypt**: vault

---

## Experiments

- **Green:** Open `/admin` logged-out → to `/login`?
- **Yellow:** `permitAll()` for `/admin/**` → free without login? (Never in production!)
- **Red:** Re-enable csrf (remove disable) → `POST /products` without token → 403? (That's its job!)

---

## Challenge

**Doored Mall:** `/` + `/products` free, `/admin/**` login, `/api/**` free `GET` but login for `POST` (`requestMatchers(HttpMethod.POST, "/api/**").authenticated()`).

---

## Mini Glossary

- **FilterChain/permitAll**: post/free
- **formLogin/BCrypt**: registration/vault

---

## Summary

Week 6 of 10: **Factory Guard** (Level: Intermediate). Doors guarded. Next: **Testing** — automatic tests.
