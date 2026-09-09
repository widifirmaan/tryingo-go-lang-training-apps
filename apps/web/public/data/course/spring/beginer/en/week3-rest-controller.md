# REST Controller — Spring Door Waiters

> **Kategori:** Spring Boot | **Level:** Beginner | **Minggu 3:** REST Controller
> **Prerequisites:** Week 2 — **Dependency Injection**.

## Learning Objectives

- `@RestController` + `@RequestMapping("/products")` + `@GetMapping/@PostMapping/@DeleteMapping("/{id}")` REST doors (source: docs.spring.io/spring-framework/reference/web/webmvc)
- `@PathVariable` takes `{id}`, `@RequestParam` takes `?find=`, `@RequestBody` JSON envelopes

---

## Why This Matters (Non-IT)

Phones need list-`GET /products` + add-`POST` + `DELETE /products/1`. Without `@RestController`, returned `String`s are treated as HTML filenames (confusing 404s!). With `@RestController`, automatic JSON.

---

## Program: Shop CRUD Doors

```java
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController // automatic JSON (not HTML)!
@RequestMapping("/products")
public class ProductController {
  private List<Map<String, Object>> list = new ArrayList<>(List.of(
    Map.of("id", 1, "name", "Rice", "price", 62000)
  ));

  @GetMapping
  public List<?> all(@RequestParam(required = false) String find) {
    if (find == null) return list;
    return list.stream().filter(p -> p.get("name").toString().contains(find)).toList();
  }

  @GetMapping("/{id}")
  public Object one(@PathVariable int id) {
    return list.stream().filter(p -> (int) p.get("id") == id).findFirst().orElse(Map.of("error", "Missing"));
  }

  @PostMapping
  public Object add(@RequestBody Map<String, Object> body) {
    body.put("id", list.size() + 1);
    list.add(body);
    return body;
  }

  @DeleteMapping("/{id}")
  public Object remove(@PathVariable int id) {
    list.removeIf(p -> (int) p.get("id") == id);
    return Map.of("ok", true);
  }
}
```

Test: `curl localhost:8080/products` → `curl -X POST -H "Content-Type: application/json" -d '{"name":"Sugar","price":15000}' localhost:8080/products`.

---

## Key Concepts

### `@RestController` = JSON Waiter
`@Controller` returns view names (HTML), `@RestController` returns JSON directly.

### `@GetMapping/@PostMapping/@DeleteMapping` = Door per Action
`@GetMapping("/{id}")` + `@PathVariable int id` takes from URL.

### `@RequestParam` vs `@RequestBody` = Paper vs Envelope
`?find=rice` pasted paper (`@RequestParam`), JSON body envelope (`@RequestBody`).

---

## Beginner Friendly Explanation

### Analogy: 4-Door Waiter
- **GET = view showcase**, **POST = deposit goods**, **DELETE = discard**.

### Step 0 — Prepare Device
- Same as W1 + `curl` or Postman for POST tests.

### How the Computer Reads It
1. `POST /products` + JSON → `@RequestBody Map` → `list.add` → replies new JSON.
2. `GET /products/99` → not found → `{"error": ...}`.

### 3 Must-Know Terms
1. **RestController/RequestMapping**: JSON-waiter/door
2. **PathVariable/RequestParam**: from-URL/from-?
3. **RequestBody**: JSON envelope

---

## Experiments

- **Green:** `GET /products/1` → Rice? `/products/99` → error JSON?
- **Yellow:** POST without `Content-Type: application/json` → 415 error? Add header.
- **Red:** Swap `@RestController` for `@Controller` → JSON return treated as view name → error? Revert.

---

## Challenge

**Complete CRUD Shop:** `GET` + `?find` + `GET {id}` + `POST` + `DELETE` → 5 passing `curl` commands.
- **Link-up (Week 2 — Dependency Injection):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **RestController/GetMapping**: JSON-waiter/fetch-door
- **PathVariable/RequestBody**: URL/envelope

---

## Summary

Week 3 of 5: **JSON Doors** (Level: Beginner). Full CRUD via annotations. Next: **JPA** — automatic racks.
