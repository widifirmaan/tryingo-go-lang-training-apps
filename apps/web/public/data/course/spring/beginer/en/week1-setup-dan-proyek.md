# Spring Boot Setup — Enterprise Shop Factory

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 1:** Setup & Proyek
> **Prerequisites:** None — start from zero.

## Learning Objectives

- Create a project at `start.spring.io`: pick `Maven`, `Java 17`, `Spring Web` → Download → `mvn spring-boot:run` on `8080`
- Understand `Spring Boot` = **enterprise shop factory**: many machines, but `starter`s pre-assembled

---

## Why This Matters (Non-IT)

Spring is for big companies: shops growing to 1000 branches need a factory. Non-IT learners skip details, just know `start.spring.io` click-click-done.

---

## Program: Hello Factory

```bash
# Open start.spring.io → Maven Project, Java 17, Dependencies: Spring Web → Generate
# Unzip, open in VS Code
./mvnw spring-boot:run
# Open http://localhost:8080
```

```java
// src/main/java/com/shop/ShopApplication.java
@SpringBootApplication
public class ShopApplication { public static void main(String[] args){ SpringApplication.run(ShopApplication.class, args); } }

// src/main/java/com/shop/HelloController.java
@RestController
public class HelloController {
  @GetMapping("/hello")
  public String hello(){ return "Hello Spring Shop!"; }
}
```

Open `http://localhost:8080/hello` → "Hello Spring Shop!"

---

## Key Concepts

### `start.spring.io` = Click Factory
Pick stack → download → run. No manual XML.

### `@RestController` / `@GetMapping`
`@GetMapping("/hello")` → GET door returning text/JSON.

---

## Beginner Friendly Explanation

### Analogy: Factory Kit
- **start.spring.io = factory catalog**: check boxes, receive assembled factory.

### Step 0 — Prepare Device
- JDK 17 + VS Code + `start.spring.io` project unzipped.

### How the Computer Reads It
1. `./mvnw spring-boot:run` → downloads deps → starts Tomcat on 8080.
2. `GET /hello` → `hello()` → returns string.

### 3 Must-Know Terms
1. **starter/run/hello**: kit/run/greet

---

## Experiments

- **Green:** `/hello` → greeting text?
- **Yellow:** Change text → restart → new text?
- **Red:** Wrong Java version → build fails? Match Java 17.

---

## Challenge

**Hello Factory:** start.spring.io project + `HelloController` + `/hello` in browser screenshot.

---

## Mini Glossary

- **starter/mvn**: kit/runner

---

## Summary

Week 1: **Spring Factory** — `start.spring.io` click-done. Next: **DI**.
