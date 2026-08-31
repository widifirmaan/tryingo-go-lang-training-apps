# Spring Security — Satpam Pabrik

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 6:** Spring Security

## Tujuan Pembelajaran

- `SecurityFilterChain` satpam, `HttpSecurity` atur `/admin` perlu login, `PasswordEncoder` enkripsi

---

## Program

```java
@Bean
public SecurityFilterChain filter(HttpSecurity http) throws Exception {
  http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/admin/**").authenticated()
    .anyRequest().permitAll()
  ).formLogin(withDefaults());
  return http.build();
}
```

`application.properties`: `spring.security.user.name=admin`.

---

## Ringkasan

Minggu 6: **Satpam Pabrik** — Security.
