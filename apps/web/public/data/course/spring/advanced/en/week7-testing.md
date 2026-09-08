# Testing — Spring Factory Test

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 7:** Testing

## Learning Objectives

- `@SpringBootTest` + `MockMvc` `perform(get("/products")).andExpect(status().isOk())`

---

## Why This Matters (Non-IT)

Without `MockMvc`, controller edits → 500s found by customers. With 2 tests, edit → red → fix. `MockMvc` without a real server (fast!).

---

## Program

```java
@SpringBootTest
@AutoConfigureMockMvc
class ProductTest {
  @Autowired MockMvc mvc;
  @Test
  void testList() throws Exception {
    mvc.perform(get("/products"))
      .andExpect(status().isOk());
  }
}
```

`./mvnw test` → PASS.


---

## Beginner Friendly Explanation

### Analogy: Spring Test Factory
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Spring W1 + `./mvnw test` for W7.

### How the Computer Reads It
- `perform(get(...))` pretends browser; `andExpect(status().isOk())` tastes status.

### 3 Must-Know Terms
- 1. **MockMvc/andExpect**: pretend/taste

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 7: **Factory Test** — `MockMvc`. Next: **Validation**.
