# Deployment

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 13:** Deployment

## Learning Objectives

- Dockerfile to containerize Spring Boot apps
- Multi-stage builds to optimize image size
- Docker Compose for multi-container setup
- Environment variables for configuration
- Production profiles and health checks

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

    // Health endpoint for container orchestration & load balancers
    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
            "status", "UP",
            "service", "demo",
            "profile", "prod"
        );
    }

    // Build info surfaced for monitoring dashboards
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

### Deployment Files

```dockerfile
# File: Dockerfile
# Build stage - compile the jar inside Maven, not on the host
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage - smaller image, JRE only
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
# Deployment Commands:
mvn clean package -DskipTests
docker build -t myapp .
docker run -p 8080:8080 myapp
docker-compose up -d
```

---

## Key Concepts

### Dockerfile
Define container images with multi-stage builds.

### Multi-Stage Build
Compile in Maven stage, run in JRE stage for smaller images.

### Docker Compose
Orchestrate app, database, and cache containers.

### Environment Variables
Externalized configuration for different environments.

### Production
Validate schema, health checks for monitoring.

---

## Experiments

- Create Dockerfile with multi-stage build
- Experiment with Docker Compose
- Try environment-specific profiles
- Create health check endpoints
- Experiment with Kubernetes deployment

---

## Challenge

Build Docker setup for Spring Boot app: Dockerfile, docker-compose with database, environment config.

---

## Summary

Week 13 of 14: **Deployment** (Level: Advanced). Production deployment. Next week: **Capstone Project**!
