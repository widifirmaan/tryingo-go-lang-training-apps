# Async & Scheduling — Spring Shop Routine Alarms

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 12:** Async & Scheduling
> **Prerequisites:** Week 11 — **Caching**.

## Learning Objectives

- `@Scheduled(cron = "0 0 7 * * *")` alarm every 7am + `@EnableScheduling` switch (source: docs.spring.io/spring-framework/integration/scheduling)
- `fixedRate` every X vs `cron` exact times

---

## Why This Matters (Non-IT)

Daily reports + 7am stock checks without `@Scheduled` = manual laptop opening every morning. With cron, servers work alone. Without `@EnableScheduling`, alarms totally dead (silently!).

---

## Program: Shop Alarm Clock

```java
// Enable on main: @EnableScheduling + @EnableAsync

import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Component;

@Component
public class ShopAlarm {

  @Scheduled(cron = "0 0 7 * * *") // every 07:00:00
  public void morningReport() {
    System.out.println("Report: " + repo.count() + " products");
  }

  @Scheduled(fixedRate = 60000) // every 60 seconds
  public void checkStock() {
    repo.findByStockLessThan(5).forEach(p ->
      System.out.println("THIN STOCK: " + p.getName()));
  }

  @Async // runs in background (needs @EnableAsync!)
  public void sendReport() { /* ... */ }
}
```

Cron `second minute hour day month weekday`: `0 0 7 * * *` = 07:00 daily.

---

## Key Concepts

### `@Scheduled` + `@EnableScheduling` = Alarm + Switch
Without the master switch, all alarms dead.

### `cron` vs `fixedRate` = Exact Time vs Every X
`cron "0 0 7 * * *"` exactly 7. `fixedRate = 60000` every 60 seconds from start.

---

## Beginner Friendly Explanation

### Analogy: Alarm Clock
- **@Scheduled = alarm**, **cron = exact time**, **@EnableScheduling = master switch**.

### Step 0 — Prepare Device
- Same as W1 + scheduling enabled on main.

### How the Computer Reads It
1. 07:00:00 → Spring calls `morningReport()`.
2. Every 60000ms → `checkStock()` runs.

### 3 Must-Know Terms
1. **Scheduled/cron**: alarm/schedule
2. **EnableScheduling**: switch

---

## Experiments

- **Green:** `fixedRate = 5000` → log every 5 seconds?
- **Yellow:** Remove `@EnableScheduling` → no logs? (Switch off!)
- **Red:** cron `0 * * * * *` (minute 0 every minute) → every minute?

---

## Challenge

**Automatic Shop:** `morningReport` cron 07:00 + `checkStock` every 60s + 2-log screenshot.
- **Link-up (Week 11 — Caching):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Scheduled/cron/fixedRate**: alarm/schedule/every-X

---

## Summary

Week 12 of 14: **Routine Alarms** (Level: Advanced). Works alone. Next: **Deployment**.
