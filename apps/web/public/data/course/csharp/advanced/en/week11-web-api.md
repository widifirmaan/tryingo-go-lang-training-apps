# Web API — Online C# Shop

> **Kategori:** C# | **Level:** Advanced | **Minggu 11:** Web API

## Learning Objectives

- `dotnet new webapi` + `[ApiController]` + `[HttpGet/Post/Delete]` JSON doors (source: Microsoft Learn web-api)
- `[FromBody]` envelopes, `Results.Ok/NotFound` replies (minimal API alternative)

---

## Why This Matters (Non-IT)

Phones need JSON, not console. Web API = `console` becomes `http://localhost:5000/products` — 1 C# codebase serves phones + web.

---

## Program: C# Shop API

```bash
dotnet new webapi -n ShopApi
cd ShopApi
dotnet run  # https://localhost:7000/swagger !
```

```csharp
// Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")] // → api/products
public class ProductsController : ControllerBase {
  private static List<Product> list = new() {
    new() { Id = 1, Name = "Rice", Price = 62000 }
  };

  [HttpGet]
  public ActionResult<List<Product>> All() => list;

  [HttpGet("{id}")]
  public ActionResult<Product> One(int id) {
    var p = list.FirstOrDefault(x => x.Id == id);
    return p is null ? NotFound() : p;
  }

  [HttpPost]
  public ActionResult<Product> Add(Product p) { // [FromBody] automatic!
    p.Id = list.Count + 1;
    list.Add(p);
    return CreatedAtAction(nameof(One), new { id = p.Id }, p);
  }

  [HttpDelete("{id}")]
  public IActionResult Remove(int id) {
    list.RemoveAll(x => x.Id == id);
    return NoContent();
  }
}
```

Open `https://localhost:7000/swagger` → try straight from the browser! `curl` works too.

---

## Key Concepts

### `[ApiController]` + `[Route]` = JSON Waiter
Automatic validation + JSON (no `View`).

### `[HttpGet/Post/Delete]` = Door per Action
`[HttpGet("{id}")]` `:id` door, `[HttpPost]` add door.

---

## Beginner Friendly Explanation

### Analogy: JSON Drive-Thru
- **ApiController = drive-thru waiter**: takes JSON orders, serves JSON.

### Step 0 — Prepare Device
- `.NET SDK` + `dotnet new webapi` + `dotnet run` + open `/swagger`.

### How the Computer Reads It
1. `POST /api/products` JSON → `[FromBody]` (automatic!) → `Add` → `201 + Location`.
2. `GET /api/products/99` → null → `404`.

### 3 Must-Know Terms
1. **ApiController/Route**: JSON-waiter/door
2. **Swagger/FromBody**: try/envelope

---

## Experiments

- **Green:** Swagger tries POST → 201 + `Location` header?
- **Yellow:** GET 99 → 404 JSON?
- **Red:** Remove `[ApiController]` → automatic validation gone? Reattach.

---

## Challenge

**Complete Online Shop:** 4-door CRUD + Swagger screenshot + 5 passing `curl` commands.

---

## Mini Glossary

- **ApiController/FromBody**: JSON-waiter/envelope

---

## Summary

Week 11 of 12: **Online API** (Level: Advanced). Phones served. Next: **Capstone**.
