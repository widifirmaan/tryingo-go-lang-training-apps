# Actuator & Monitoring

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 9:** Actuator & Monitoring

## Tujuan Pembelajaran

- Spring Boot Actuator untuk monitoring dan management
- Health check endpoint dengan HealthIndicator
- Custom metrics dengan Micrometer
- Prometheus integration untuk metrics
- Info endpoint dan environment exposure

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

## Konsep Kunci

### Actuator
Production-ready features: health, metrics, info, env.

### Health Check
`HealthIndicator` — custom health check. Return Health.up() atau Health.down().

### Metrics
Micrometer — metrics facade. Counter, Timer, Gauge, DistributionSummary.

### Prometheus
`micrometer-registry-prometheus` — export metrics ke Prometheus format.

### Endpoints
`/actuator/health`, `/actuator/metrics`, `/actuator/info`.

---

## Eksperimen

- Buat custom health indicator
- Tambah custom metrics counter
- Eksperimen dengan Timer untuk measure duration
- Coba Prometheus scraping
- Buat custom actuator endpoint

---

## Tantangan

Buat monitoring dashboard: custom health check, metrics untuk order creation, Prometheus integration.

---

## Ringkasan

Minggu 9 dari 14: **Actuator & Monitoring** (Level: Menengah). Observability di production. Minggu depan: **Messaging**.
