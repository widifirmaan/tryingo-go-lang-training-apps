# Actuator & Monitoring

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 9:** Actuator & Monitoring

## Learning Objectives

- Spring Boot Actuator for monitoring and management
- Health check endpoints with HealthIndicator
- Custom metrics with Micrometer
- Prometheus integration for metrics
- Info endpoint and environment exposure

---

## Program: Health & Metrics

```java
// File: application.properties (Actuator config)
/*
management.endpoints.web.exposure.include=health,info,metrics,env
management.endpoint.health.show-details=always
management.info.env.enabled=true

info.app.name=My Spring Boot App
info.app.version=1.0.0
info.app.description=Demo Spring Boot Actuator
*/

// File: HealthCheck.java
/*
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Cek koneksi database, external service, dll
        boolean isHealthy = checkDatabaseConnection();

        if (isHealthy) {
            return Health.up()
                .withDetail("database", "Connected")
                .withDetail("timestamp", LocalDateTime.now())
                .build();
        } else {
            return Health.down()
                .withDetail("database", "Disconnected")
                .build();
        }
    }

    private boolean checkDatabaseConnection() {
        // Simulasi cek database
        return true;
    }
}
*/

// File: MetricsConfig.java
/*
@Component
public class OrderMetrics {

    private final MeterRegistry meterRegistry;

    public OrderMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    public void recordOrderCreated() {
        meterRegistry.counter("orders.created").increment();
    }

    public void recordOrderTotal(double amount) {
        meterRegistry.summary("orders.total").record(amount);
    }
}
*/

// Actuator Endpoints:
// GET /actuator/health — health check
// GET /actuator/info — app info
// GET /actuator/metrics — metrics
// GET /actuator/env — environment
// GET /actuator/beans — Spring beans
// GET /actuator/mappings — URL mappings

// Dependencies:
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
*/
```

---

## Key Concepts

### Actuator
Production-ready monitoring and management features.

### Health Checks
Custom health indicators for database, external services.

### Metrics
Micrometer for application metrics.

### Prometheus
Export metrics in Prometheus format.

### Endpoints
Health, metrics, info endpoints for monitoring.

---

## Experiments

- Create custom health indicator
- Add custom metrics counter
- Experiment with Timer for duration measurement
- Try Prometheus scraping
- Create custom actuator endpoint

---

## Challenge

Build a monitoring dashboard: custom health check, metrics for order creation, Prometheus integration.

---

## Summary

Week 9 of 14: **Actuator & Monitoring** (Level: Intermediate). Production observability. Next week: **Messaging**.
