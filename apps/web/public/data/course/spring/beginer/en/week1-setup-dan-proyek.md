# Setup & First Project

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 1:** Setup & First Project

## Learning Objectives

- Understand Spring Boot as a Java framework for enterprise applications
- Set up projects with Spring Initializr or CLI
- Understand annotations: @SpringBootApplication, @RestController, @GetMapping
- Project structure: src/main/java, src/main/resources, pom.xml
- Run applications: mvn spring-boot:run


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language — learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running — fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly — great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write — errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs — more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies — they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live — the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations — it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (JDK 21 (Eclipse Temurin / OpenJDK))
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

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
