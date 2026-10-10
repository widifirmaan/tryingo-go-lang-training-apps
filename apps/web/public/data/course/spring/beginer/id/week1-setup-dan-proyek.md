# Setup & Proyek Pertama

> **Kategori:** Spring Boot | **Level:** Pemula | **Minggu 1:** Setup & Proyek Pertama

## Tujuan Pembelajaran

- Memahami Spring Boot sebagai framework Java untuk enterprise application
- Setup proyek dengan Spring Initializr atau CLI
- Memahami anotasi: @SpringBootApplication, @RestController, @GetMapping
- Struktur proyek: src/main/java, src/main/resources, pom.xml
- Menjalankan aplikasi: mvn spring-boot:run

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Extension Pack for Java** (`vscjava.vscode-java-pack`): Paket lengkap Java dari Microsoft (LSP, debugger, test runner, maven)
- **Spring Boot Tools** (`vmware.vscode-spring-boot`): Autocomplete properti application.properties, simbol bean, dan navigasi controller

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension vscjava.vscode-java-pack --install-extension vmware.vscode-spring-boot
```

---

### 2. Instalasi Runtime & Dependency (JDK 21 (Eclipse Temurin / OpenJDK))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install EclipseAdoptium.Temurin.21.JDK
```

**macOS (Terminal / Homebrew):**
```bash
brew install openjdk@21
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install openjdk-21-jdk
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
java -version
```

Output yang diharapkan:
```output
openjdk version "21.0.x" ...
```

> 💡 **Tips Prasyarat:** Spring Boot 3 mewajibkan minimal Java versi 17, sangat direkomendasikan menggunakan Java 21 LTS.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
curl https://start.spring.io/starter.zip -d type=maven-project -d language=java -d bootVersion=3.4.0 -d dependencies=web,actuator -o my-spring-app.zip
tar -xf my-spring-app.zip
cd my-spring-app
```
- **Keterangan:** Mengunduh starter resmi Spring Boot dengan Maven wrapper dan dependensi Spring Web terpasang.
- **Pindah ke direktori project:**
```bash
cd my-spring-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
./mvnw spring-boot:run # Windows: .\mvnw.cmd spring-boot:run
```
Akses di browser atau terminal: `http://localhost:8080`

> ℹ️ Embedded Tomcat server aktif di port 8080.

**File Titik Masuk Utama (`src/main/java/com/example/demo/HelloController.java`):**
```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public Map<String, Object> hello() {
        return Map.of(
            "status", "success",
            "message", "Halo dari Spring Boot 3 & Java 21!",
            "framework", "Spring Web"
        );
    }
}
```
REST Controller sederhana mengembalikan respon Map JSON otomatis.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-spring-app/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   └── DemoApplication.java # @SpringBootApplication
│   │   └── resources/
│   │       └── application.properties # Konfigurasi port & DB
│   └── test/java/
├── mvnw & mvnw.cmd      # Maven wrapper (tanpa perlu install maven)
└── pom.xml              # Definisi dependensi Maven
```
Struktur Maven standar Java untuk Spring Boot.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan Maven Wrapper (`./mvnw`) agar rekan tim tidak perlu menginstal Maven secara manual di komputer mereka.
- Tambahkan ekstensi `Spring Boot DevTools` di pom.xml untuk restart otomatis saat kode Java berubah.

---

## Program: Halo, Spring Boot!

```java
// File: src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("Spring Boot berjalan di port 8080!");
    }

    @GetMapping("/")
    public String hello() {
        return "Selamat datang di Spring Boot!";
    }

    @GetMapping("/info")
    public String info() {
        return "Spring Boot 3.x + Java 17 + Spring Framework 6";
    }
}

// File: pom.xml (konseptual)
/*
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
*/

// File: src/main/resources/application.properties
/*
server.port=8080
spring.application.name=demo-app
*/

// CLI Commands:
// mvn spring-boot:run
// curl http://localhost:8080/
// curl http://localhost:8080/info
```

---

## Konsep Kunci

### Spring Boot
Framework Java untuk build production-ready applications. Auto-configuration, embedded server, opinionated defaults.

### @SpringBootApplication
Gabungan dari @Configuration, @EnableAutoConfiguration, @ComponentScan.

### @RestController
Gabungan @Controller + @ResponseBody. Return data langsung (JSON).

### @GetMapping
Mapping HTTP GET ke method. Bisa spesifik path.

### Struktur Proyek
- src/main/java: source code
- src/main/resources: config, static files
- pom.xml: Maven dependencies

### CLI
`mvn spring-boot:run` atau `./mvnw spring-boot:run`

---

## Eksperimen

- Buat endpoint baru dengan @GetMapping("/hello")
- Ubah port di application.properties
- Tambah @PostMapping endpoint
- Coba @PathVariable untuk dynamic URL
- Buat response JSON dengan Map

---

## Tantangan

Buat REST API sederhana: endpoint /products (GET), /products/{id} (GET), /products (POST). Gunakan List in-memory.

---

## Ringkasan

Minggu 1 dari 14: **Setup & Proyek Pertama** (Level: Pemula). Spring Boot memberikan rapid development. Minggu depan: **Dependency Injection**.
