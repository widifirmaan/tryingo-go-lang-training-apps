# Actuator & Monitoring — Spring Shop Health Dashboard

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 9:** Actuator & Monitoring
> **Prerequisites:** Week 8 — **Validation**.

## Learning Objectives

- `spring-boot-starter-actuator` + `/actuator/health` health checks, `/actuator/metrics` numbers (source: docs.spring.io/spring-boot/reference/actuator)
- `management.endpoints.web.exposure.include` opens only needed doors

---

## Why This Matters (Non-IT)

Dead server at 2am unnoticed → customers flee. With `/actuator/health` + monitoring (Prometheus), phones ring when `DOWN`. Without it, you learn from complaints.

---

## Program: Shop Health Dashboard

```properties
# application.properties — open only needed doors!
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
info.app.name=Siti's Shop
info.app.version=1.0.0
```

```bash
curl http://localhost:8080/actuator/health
# {"status":"UP","components":{"db":{"status":"UP"},"diskSpace":{"status":"UP"}}}

curl http://localhost:8080/actuator/info
# {"app":{"name":"Siti's Shop","version":"1.0.0"}}

curl http://localhost:8080/actuator/metrics/http.server.requests
```

Kill the DB → `/health` turns `DOWN` (living proof!).

---

## Key Concepts

### `/health` / `/info` / `/metrics` = Healthy/Info/Numbers
`health` UP/DOWN, `info` app info, `metrics` numbers (requests, JVM).

### `exposure.include` = Open Sparingly
Never `*` in production (leaks password-bearing `env`!). `health,info` suffices.

---

## Beginner Friendly Explanation

### Analogy: Shop Health Panel
- **Actuator = wall panel**: green UP light, red DOWN.
- **Metrics = speedometer**: requests/second.

### Step 0 — Prepare Device
- Add `spring-boot-starter-actuator` + restart + open `/actuator/health`.

### How the Computer Reads It
1. `/actuator/health` → aggregates DB + disk checks → UP/DOWN JSON.
2. Monitoring scrapes it every 15s → alerts on DOWN.

### 3 Must-Know Terms
1. **health/metrics/info**: healthy/numbers/info

---

## Experiments

- **Green:** Kill DB → `health` DOWN? Restart → UP?
- **Yellow:** `exposure.include=*` → `/actuator/env` visible (danger!)? Revert.
- **Red:** `show-details=never` → details gone (production-safe)?

---

## Challenge

**Monitored Shop:** `health` + custom `info` + `metrics` + UP screenshot + DOWN simulation (kill DB).
- **Link-up (Week 8 — Validation):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Actuator/health/metrics**: panel/healthy/numbers

---

## Summary

Week 9 of 10: **Health Dashboard** (Level: Intermediate). Death known first. Next: **Messaging** — kitchen-to-kitchen messages.
