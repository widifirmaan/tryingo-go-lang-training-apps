# Messaging — Messages Between Spring Kitchens

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 10:** Messaging

## Learning Objectives

- `ApplicationEventPublisher` + `@EventListener` messages inside the shop (no RabbitMQ yet)
- `@Async` + `@EnableAsync` background work (WA sends without waiting)

---

## Why This Matters (Non-IT)

Checkout sending 5-second WA → customers stare at loading 5 seconds. With events + `@Async`, save the order replying "OK" instantly, WA sends in background. Without it, 10 joint orders = 50-second queue.

---

## Program: Background Shop Messages

```java
// 1. Event = letter
public record OrderCreated(Long id, String name) {}

// 2. Publisher in order service
import org.springframework.context.ApplicationEventPublisher;

@Service
public class OrderService {
  private final ApplicationEventPublisher publisher;
  public OrderService(ApplicationEventPublisher p) { publisher = p; }

  public Order create(String name) {
    Order s = repo.save(new Order(name)); // fast save
    publisher.publishEvent(new OrderCreated(s.getId(), name)); // send letter
    return s; // reply instantly (no WA wait!)
  }
}

// 3. Listener sends WA in background
import org.springframework.scheduling.annotation.Async;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class Notifications {
  @Async // runs in background!
  @EventListener
  public void sendWA(OrderCreated e) throws Exception {
    Thread.sleep(5000); // simulate 5s WA
    System.out.println("WA sent for order " + e.id());
  }
}

// 4. Enable async
// @EnableAsync on main class!
```

---

## Key Concepts

### Events + Listeners = Letters + Couriers
`publishEvent` sends, `@EventListener` receives — decoupled.

### `@Async` = Background
Needs `@EnableAsync` switch, else runs blocking!

---

## Beginner Friendly Explanation

### Analogy: Letters & Couriers
- **Event = letter**: "order 5 done".
- **@EventListener = courier**: takes letter, delivers WA.
- **@Async = motorbike courier**: skips the cashier queue.

### Step 0 — Prepare Device
- Same as W1 + `@EnableAsync` on main.

### How the Computer Reads It
1. `create()` → saves → `publishEvent` → HTTP replies instantly.
2. Background thread → `sendWA` → 5 seconds → log.

### 3 Must-Know Terms
1. **Event/Listener**: letter/receiver
2. **Async**: background

---

## Experiments

- **Green:** POST order → reply <1s though WA takes 5s?
- **Yellow:** Remove `@Async` → 5s reply? (Blocking! Reattach.)
- **Red:** Remove `@EnableAsync` → `@Async` dead? (Needs master switch!)

---

## Challenge

**Fast Shop:** `create()` + event + `@Async` WA + reply-time log <1s. **Intermediate Spring DONE!**

---

## Mini Glossary

- **Event/Async**: letter/background

---

## Summary

Week 10 of 10: **Background Messages** (Level: Intermediate). **Intermediate Spring DONE!** Next: **Caching** (Advanced).
