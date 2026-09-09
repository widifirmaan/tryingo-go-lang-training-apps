# Spring Security — Satpam Pabrik Warung

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 6:** Spring Security
> **Prasyarat:** Minggu 5 — **REST API Best Practices**.

## Tujuan Pembelajaran

- `SecurityFilterChain` rantai satpam: `/admin/**` wajib login, `/produk` bebas (sumber: docs.spring.io/spring-security)
- `formLogin` halaman login otomatis, `PasswordEncoder` (`BCrypt`) enkripsi password (jangan MD5!)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa satpam, siapa saja `POST /produk` ubah harga + `DELETE` hapus semua. Tanpa `BCrypt`, bocor DB = password terlihat. Security = 5 baris config lindungi seluruh warung.

---

## Program: Satpam Warung Spring

```bash
# start.spring.io centang: Spring Web + Spring Security
```

```java
// SecurityConfig.java — pos satpam
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
        .requestMatchers("/admin/**").authenticated() // satpam jaga
        .requestMatchers("/produk/**").permitAll()    // etalase bebas
        .anyRequest().permitAll()
      )
      .formLogin(withDefaults())   // halaman /login otomatis
      .csrf(csrf -> csrf.disable()); // matikan untuk API test (aktifkan + token di produksi!)
    return http.build();
  }
}
```

```properties
# application.properties — 1 admin darurat
spring.security.user.name=admin
spring.security.user.password=admin123
spring.security.user.roles=ADMIN
```

Buka `/admin` → tendang ke `/login` → login `admin/admin123` → masuk. `/produk` bebas.

---

## Konsep Kunci

### `SecurityFilterChain` = Rantai Pos Satpam
`authorizeHttpRequests` aturan per pintu: `authenticated()` wajib login, `permitAll()` bebas.

### `formLogin` = Pintu Login Otomatis
Spring buatkan `/login` + cek — tanpa tulis HTML.

### `BCrypt` = Brankas Password
`new BCryptPasswordEncoder().encode("123")` → `$2a$...` acak. Bandingkan pakai `matches()`, jangan `==`.

---

## Penjelasan untuk Pemula

### Analogi: Satpam Mal
- **FilterChain = pos satpam**: cek KTP tiap pintu sesuai daftar.
- **formLogin = meja registrasi**: daftar → dapat gelang (`session`).
- **BCrypt = brankas**: password jadi acak tak terbaca.

### Langkah 0 — Siapkan Device
- Sama W1 + dependency `Spring Security` (atau tambah ke `pom.xml` + restart).

### Cara Komputer Membaca
1. `GET /admin` → filter cek session → tidak ada → `302` ke `/login`.
2. Login benar → session dibuat → `/admin` lolos.

### 3 Istilah Wajib
1. **FilterChain/authorize**: pos/aturan
2. **formLogin/session**: registrasi/gelang
3. **BCrypt**: brankas

---

## Eksperimen

- **Hijau:** Buka `/admin` tanpa login → ke `/login`?
- **Kuning:** `permitAll()` untuk `/admin/**` → bebas tanpa login? (Jangan di produksi!)
- **Merah:** Matikan `csrf.disable` (aktifkan) → `POST /produk` tanpa token → 403? (Itulah gunanya!)

---

## Tantangan

**Mal Berpintu:** `/` + `/produk` bebas, `/admin/**` login, `/api/**` bebas `GET` tapi login untuk `POST` (`requestMatchers(HttpMethod.POST, "/api/**").authenticated()`).
- **Sambungan (Minggu 5 — REST API Best Practices):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **FilterChain/permitAll**: pos/bebas
- **formLogin/BCrypt**: registrasi/brankas

---

## Ringkasan

Minggu 6 dari 10: **Satpam Pabrik** (Level: Menengah). Pintu terjaga. Minggu depan: **Testing** — uji otomatis.
