# Keamanan Enterprise: Spring Security 6, Stateless JWT & RBAC

> **Kategori:** Spring Boot & Java | **Level:** Menengah | **Minggu 5:** Keamanan Enterprise: Spring Security 6, Stateless JWT & RBAC

## Tujuan Pembelajaran

- Memahami evolusi Spring Security 6 (migrasi dari `WebSecurityConfigurerAdapter` ke `SecurityFilterChain`).
- Mengonfigurasi autentikasi Stateless menggunakan JSON Web Token (JWT).
- Menerapkan Role-Based Access Control (RBAC) pada level URL dan method (`@PreAuthorize`).
- Mematikan CSRF dan session state untuk arsitektur cloud microservices REST.

---

## Program: Konfigurasi SecurityFilterChain & Autorisasi Berbasis Peran Bank

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

## Konsep Kunci

Keamanan adalah pilar paling sensitif dalam arsitektur perbankan dan fintech. Spring Security 6 mengusung paradigma modern berbasis komponen fungsional yang sepenuhnya menggantikan adapter lama.

### SecurityFilterChain Bean
Di Spring Security 6, seluruh aturan keamanan didefinisikan melalui bean `SecurityFilterChain`. Melalui lambda DSL yang intuitif, developer mengonfigurasi endpoint mana saja yang terbuka untuk publik (`/api/v1/auth/**`), endpoint mana yang memerlukan autentikasi, serta aturan berbasis peran pengguna (`hasRole('COMPLIANCE_OFFICER')`).

### Stateless Session Policy
Aplikasi monolitik klasik menyimpan sesi login pengguna di memori server (HttpSession). Pada arsitektur microservices terdistribusi yang dijalankan di banyak container pod Kubernetes, server tidak boleh menyimpan state sesi (`SessionCreationPolicy.STATELESS`). Klien menyertakan token JWT pada header `Authorization: Bearer <token>`, dan setiap request divalidasi secara independen.

### Method Security dengan @PreAuthorize
Selain pengamanan URL di `SecurityFilterChain`, anotasi `@PreAuthorize` memungkinkan pengamanan granular langsung di atas method bisnis atau controller. Dengan Spring Expression Language (SpEL), kita dapat mengevaluasi kombinasi peran, scopes token, bahkan kepemilikan data akun.


---

---

## Penjelasan untuk Pemula

Bayangkan gedung kantor pusat bank. Di lobi utama (SecurityFilterChain), satpam memeriksa apakah tamu memiliki kartu tanda pengenal (Autentikasi). Namun untuk masuk ke ruang brankas penyimpanan emas (Method Security @PreAuthorize), hanya orang dengan otorisasi khusus Direktur yang sidik jarinya bisa membuka pintu.

## Eksperimen

- Coba akses `/api/v1/compliance/flagged-accounts` tanpa token dan amati respons HTTP 403 Forbidden.
- Tambahkan filter custom `JwtAuthenticationFilter` sebelum `UsernamePasswordAuthenticationFilter`.
- Uji ekspresi `@PreAuthorize("#accountId == authentication.principal.username")` untuk pengamanan kepemilikan rekening.

---

## Tantangan

Konfigurasikan Spring Security sebagai OAuth2 Resource Server yang memvalidasi JWT secara otomatis menggunakan public key JWKS dari server otentikasi eksternal (Keycloak / Auth0).

---

## Ringkasan

Kamu telah menguasai Spring Security 6, stateless JWT, dan pengamanan RBAC. Minggu depan kita mempelajari manajemen transaksi atomik dan locking database.
