# Deployment — Open Spring Shop Branch

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 13:** Deployment
> **Prerequisites:** Week 12 — **Async & Scheduling**.

## Learning Objectives

- `./mvnw package` becomes 1-box `shop-1.0.jar`, `java -jar` runs anywhere (source: docs.spring.io/spring-boot/deployment)
- `Dockerfile` box + `SPRING_PROFILES_ACTIVE=prod` separates dev/prod

---

## Why This Matters (Non-IT)

Local `localhost:8080` lives only on the laptop. Deploy = rent an online shophouse (`Railway`/`VPS`) so customer phones can open it. Without profiles, dev passwords ship to production (leak!).

---

## Program: Shop Box & Crate

```bash
# 1. Pack 1 crate
./mvnw clean package -DskipTests
ls target/shop-1.0.jar
java -jar target/shop-1.0.jar
```

```dockerfile
# 2. Box (Dockerfile)
FROM eclipse-temurin:17-jre
COPY target/shop-1.0.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
docker build -t shop:1.0 .
docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/shop shop:1.0
```

```properties
# application-prod.properties — production secrets (never commit!)
spring.datasource.password=${DB_PASSWORD}
```

---

## Key Concepts

### `jar` = Finished Crate
`mvn package` → 1 `jar` holding app + embedded Tomcat. `java -jar` runs without installing Tomcat.

### `Dockerfile` = Box
`FROM eclipse-temurin:17-jre` (slim, no Maven) + `COPY jar`.

### Profiles = Branch Rules
`prod` profile → production secrets via env.

---

## Beginner Friendly Explanation

### Analogy: Crate & Branch
- **`jar` = finished crate**: everything inside. **`Dockerfile` = shipping box**. **Profile = branch rules**.

### Step 0 — Prepare Device
- JDK 17 + Maven wrapper + Docker for the box step.

### How the Computer Reads It
1. `mvn package` → compiles + tests + wraps `jar`.
2. `docker run` → Java in box → app listens on 8080.

### 3 Must-Know Terms
1. **jar/package**: crate/pack
2. **Dockerfile/profile**: box/branch-rules

---

## Experiments

- **Green:** `java -jar` without re-`mvn` after code edit → old version? (Must `package` again!)
- **Yellow:** `docker run` without `-p` → unreachable? Add `-p`.
- **Red:** Password committed in `application.properties` → leaked on GitHub? Move to env!

---

## Challenge

**Online Branch:** `package` + `Dockerfile` + passing local `docker run` + `Railway` deploy (`railway up`) + public URL.
- **Link-up (Week 12 — Async & Scheduling):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **jar/Docker/profile**: crate/box/branch

---

## Summary

Week 13 of 14: **Online Branch** (Level: Advanced). Jar + Docker + profiles. Next: **Capstone**.
