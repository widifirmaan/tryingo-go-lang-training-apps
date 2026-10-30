# Deployment

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 13:** Deployment

## Tujuan Pembelajaran

- Dockerfile untuk containerize Spring Boot app
- Multi-stage build untuk optimize image size
- Docker Compose untuk multi-container setup
- Environment variables untuk configuration
- Production profile dan health checks

---

## Program: Docker & Cloud

```java
// File: src/main/java/com/example/demo/DeploymentController.java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping
public class DeploymentController {

    // Endpoint health untuk orkestrasi container & load balancer
    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
            "status", "UP",
            "service", "demo",
            "profile", "prod"
        );
    }

    // Info build untuk dashboard monitoring
    @GetMapping("/info")
    public Map<String, Object> info() {
        return Map.of(
            "app", "Spring Boot Capstone",
            "build", "mvn clean package -DskipTests",
            "run", "docker run -p 8080:8080 myapp"
        );
    }
}
```

### File Deployment

```dockerfile
# File: Dockerfile
# Build stage — kompilasi jar di dalam Maven, bukan di host
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage — image lebih kecil, hanya JRE
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```yaml
# File: docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
      - SPRING_REDIS_HOST=redis
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

```ini
# File: application-prod.properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
server.port=8080
management.endpoints.web.exposure.include=health
```

```bash
# Perintah Deployment:
mvn clean package -DskipTests
docker build -t myapp .
docker run -p 8080:8080 myapp
docker-compose up -d
```

---

## Konsep Kunci

### Dockerfile
Define container image. Multi-stage: build di maven, run di JRE.

### Multi-Stage Build
Stage 1: compile dengan Maven. Stage 2: run dengan JRE. Image lebih kecil.

### Docker Compose
Orchestrasi multiple container: app, database, redis.

### Environment Variables
Config via env vars. Different values untuk dev/staging/prod.

### Production
`ddl-auto=validate` — tidak auto-create table. Health check untuk monitoring.

---

## Eksperimen

- Buat Dockerfile dengan multi-stage build
- Eksperimen dengan Docker Compose
- Coba environment-specific profiles
- Buat health check endpoint
- Eksperimen dengan Kubernetes deployment

---

## Tantangan

Buat Docker setup untuk Spring Boot app: Dockerfile, docker-compose dengan database, environment config.

---

## Ringkasan

Minggu 13 dari 14: **Deployment** (Level: Lanjutan). Production deployment. Minggu depan: **Capstone Project**!
