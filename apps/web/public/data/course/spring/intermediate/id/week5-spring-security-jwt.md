# Keamanan Enterprise: Spring Security 6, Stateless JWT & RBAC

> **Kategori:** Spring Boot & Java | **Level:** Menengah | **Minggu 5:** Keamanan Enterprise: Spring Security 6, Stateless JWT & RBAC
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan deklarasi pendek (Short Declaration).
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.
- **Contoh Penggunaan Praktis:**
```javascript
age := 25
name := "Alex Iskandar"
fmt.Printf("%s berusia %d tahun
", name, age);
```
- **Hasil Output yang Diharapkan:**
```text
Alex Iskandar berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.
- **Contoh Penggunaan Praktis:**
```javascript
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / fungsi bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).
- **Contoh Penggunaan Praktis:**
```javascript
go func() {
  fmt.Println("Berjalan konkuren di goroutine terpisah!")
}()
```
- **Hasil Output yang Diharapkan:**
```text
Dieksekusi asinkron tanpa memblokir alur utama program
```

### 4. `ch := make(chan string); ch <- val; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.
- **Contoh Penggunaan Praktis:**
```javascript
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result);
```
- **Hasil Output yang Diharapkan:**
```text
Diterima: 100
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Circular Dependency antar Service Bean
- **Gejala / Masalah:** Aplikasi Spring Boot gagal start dengan pesan `BeanCurrentlyInCreationException`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Rancang ulang arsitektur menggunakan mediator pattern, atau gunakan `@Lazy` sebagai solusi transisi.

### 2. Transaksi Database Tidak Berjalan pada Panggilan Internal
- **Gejala / Masalah:** Anotasi `@Transactional` diabaikan saat dipanggil dari method dalam class yang sama.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pahami bahwa Spring bekerja melalui AOP Proxy; panggil method transaksional melalui bean terinjeksi.

### 3. N+1 Query Problem pada JPA Hibernate
- **Gejala / Masalah:** Database menerima ratusan query SQL individual saat mengambil entitas relasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `JOIN FETCH` pada JPQL query atau tentukan `@EntityGraph` pada repository interface.

---

## Ringkasan

Kamu telah menguasai Spring Security 6, stateless JWT, dan pengamanan RBAC. Minggu depan kita mempelajari manajemen transaksi atomik dan locking database.
