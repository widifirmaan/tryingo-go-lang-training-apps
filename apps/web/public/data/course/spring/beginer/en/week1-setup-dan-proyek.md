# Setup & First Project

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 1:** Setup & First Project

## Learning Objectives

- Understand Spring Boot as a Java framework for enterprise applications
- Set up projects with Spring Initializr or CLI
- Understand annotations: @SpringBootApplication, @RestController, @GetMapping
- Project structure: src/main/java, src/main/resources, pom.xml
- Run applications: mvn spring-boot:run

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Extension Pack for Java** (`vscjava.vscode-java-pack`): Complete Java support package from Microsoft
- **Spring Boot Tools** (`vmware.vscode-spring-boot`): Spring properties autocomplete, bean navigation, and symbols

Or install all recommended extensions at once via terminal:
```bash
code --install-extension vscjava.vscode-java-pack --install-extension vmware.vscode-spring-boot
```

---

### 2. Runtime & Dependency Installation (JDK 21 (Eclipse Temurin / OpenJDK))
Make sure the required runtime or SDK is installed on your machine:

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

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
java -version
```

Expected output:
```output
openjdk version "21.0.x" ...
```

> 💡 **Prerequisite Note:** Spring Boot 3 requires Java 17 minimum; Java 21 LTS is strongly recommended.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
curl https://start.spring.io/starter.zip -d type=maven-project -d language=java -d bootVersion=3.4.0 -d dependencies=web,actuator -o my-spring-app.zip
tar -xf my-spring-app.zip
cd my-spring-app
```
- **Details:** Downloads official Spring Boot starter with Maven wrapper and Spring Web pre-configured.
- **Navigate to the project directory:**
```bash
cd my-spring-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
./mvnw spring-boot:run # Windows: .\mvnw.cmd spring-boot:run
```
Open in browser or terminal: `http://localhost:8080`

> ℹ️ Embedded Tomcat server starts on port 8080.

**Initial Entry File (`src/main/java/com/example/demo/HelloController.java`):**
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
Simple REST Controller returning JSON response via Jackson.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

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
Standard Maven directory structure for Spring Boot.

---

### 6. Beginner Tips & Best Practices
- Always use the Maven Wrapper (`./mvnw`) to guarantee uniform build tools across your team.
- Include `Spring Boot DevTools` in pom.xml for instant automatic restarts during local development.

---

## Program: Hello, Spring Boot!

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

## Key Concepts

### Spring Boot
Java framework for production-ready applications with auto-configuration.

### @SpringBootApplication
Combines configuration, auto-configuration, and component scanning.

### @RestController
Returns data directly as JSON.

### @GetMapping
Maps HTTP GET requests to handler methods.

### Project Structure
Standard Maven layout with src/main/java and resources.

### CLI
Run with mvn spring-boot:run.

---

## Experiments

- Create new endpoint with @GetMapping("/hello")
- Change port in application.properties
- Add @PostMapping endpoint
- Try @PathVariable for dynamic URLs
- Create JSON response with Map

---

## Challenge

Build a simple REST API: endpoint /products (GET), /products/{id} (GET), /products (POST). Use in-memory List.

---

## Summary

Week 1 of 14: **Setup & First Project** (Level: Beginner). Spring Boot enables rapid development. Next week: **Dependency Injection**.
