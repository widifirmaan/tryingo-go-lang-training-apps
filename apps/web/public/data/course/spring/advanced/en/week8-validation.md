# Validation — Advanced Spring Guard

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 8:** Validation

## Learning Objectives

- `@Valid` + `@NotBlank` `message = "Name required"` on `Product`, `BindingResult` checks

---

## Why This Matters (Non-IT)

Without `@Valid`, blank names + negative prices enter the DB → broken reports. With stamps + `BindingResult`, neat 400 rejects before saving.

---

## Program

```java
public class Product {
  @NotBlank(message = "Name required") String name;
  @Min(1) Integer price;
}

@PostMapping("/products")
public String add(@Valid @ModelAttribute Product p, BindingResult br){
  if(br.hasErrors()) return "form";
  repo.save(p);
  return "redirect:/products";
}
```

View: `<span th:errors="*{name}"></span>`.


---

## Beginner Friendly Explanation

### Analogy: Spring Stamp Guard
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Spring W1 + `./mvnw test` for W7.

### How the Computer Reads It
- `@NotBlank` stamps; `@Valid` triggers; `BindingResult` holds; fail → 400.

### 3 Must-Know Terms
- 1. **NotBlank/Valid**: stamp/trigger

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 8: **Advanced Guard** — `@Valid`. Next: **Caching**.
