# Testing — Automatic Spring Shop Taste

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 7:** Testing
> **Prerequisites:** Week 6 — **Spring Security**.

## Learning Objectives

- `@SpringBootTest` + `MockMvc` `perform(get("/products")).andExpect(status().isOk())` tests doors without opening a server (source: docs.spring.io/spring-framework/testing)
- `@DataJpaTest` tests racks + `assertEquals` tastes

---

## Why This Matters (Non-IT)

Editing `ProductController` untested → `/products` 500s found by customers. With `MockMvc`, edit → red `FAIL` before deploy. `@DataJpaTest` uses a temporary DB (H2) — real data safe.

---

## Program: Taste Doors & Racks

```java
// ProductControllerTest.java — tastes doors (no real server!)
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

  @Autowired MockMvc mvc; // mock waiter

  @Test
  void listReplies200() throws Exception {
    mvc.perform(get("/products"))
       .andExpect(status().isOk());
  }

  @Test
  void addThenPresent() throws Exception {
    mvc.perform(post("/products")
      .contentType("application/json")
      .content("{\"name\":\"Coffee\",\"price\":12000}"))
      .andExpect(status().isOk());
  }
}
```

```bash
./mvnw test
# Tests run: 2, Failures: 0, Errors: 0 — GREEN
```

---

## Key Concepts

### `MockMvc` = Mock Waiter
`perform(get(...))` pretends to be a browser, `andExpect(status().isOk())` tastes status.

### `@SpringBootTest` = Mock Shop Opening
Starts Spring without a port — fast for tests.

### Mini TDD = Write Tests First
Red test → write code → green. 2 minutes for 1 function.

---

## Beginner Friendly Explanation

### Analogy: Taste Dishes
- **Test = taste**: cook `add` → taste `GET` present? → serve.
- **MockMvc = fake food critic**: visits, orders, scores — no real customers.

### Step 0 — Prepare Device
- Same as W1 + `./mvnw test` (Maven auto-downloads JUnit).

### How the Computer Reads It
1. `./mvnw test` → finds `*Test.java` → runs each `@Test`.
2. Failed `andExpect` → red `FAIL` + wrong line.

### 3 Must-Know Terms
1. **MockMvc/perform**: mock-waiter/order
2. **andExpect/assert**: taste

---

## Experiments

- **Green:** Deliberate `expected 200` as `201` → red FAIL? Fix it.
- **Yellow:** Add product then `GET` verifies present?
- **Red:** Remove `@SpringBootTest` → context error? Reattach.

---

## Challenge

**Tested Shop:** Test `GET /products` 200 + `POST` add + `GET` count +1. `./mvnw test` GREEN 3/3.

---

## Mini Glossary

- **MockMvc/Test**: mock/test
- **andExpect**: taste

---

## Summary

Week 7 of 10: **Automatic Taste** (Level: Intermediate). Edit boldly. Next: **Validation** — input guard.
