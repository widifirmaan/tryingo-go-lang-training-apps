# REST API Design

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 6:** REST API Design

## Learning Objectives

- Resource-based URLs: /resources, /resources/:id
- HTTP methods mapping: GET, POST, PUT, DELETE
- Status codes: 200, 201, 400, 404, 500
- Request/Response format: JSON structure
- Pagination, sorting, filtering for collection endpoints

---

## Program: Product API

```javascript
console.log("=== REST API Design Principles ===");

const resources = [
  { resource: "/products", description: "Koleksi produk" },
  { resource: "/products/123", description: "Produk spesifik" },
  { resource: "/products/123/reviews", description: "Review produk" },
];
console.log("Resource Naming:");
for (const r of resources) console.log("  " + r.resource + " -> " + r.description);

console.log("\n=== HTTP Methods ===");
const methods = [
  { method: "GET", action: "Baca resource", idempotent: "Ya" },
  { method: "POST", action: "Buat baru", idempotent: "Tidak" },
  { method: "PUT", action: "Update seluruh", idempotent: "Ya" },
  { method: "DELETE", action: "Hapus", idempotent: "Ya" },
];
for (const m of methods) console.log("  " + m.method + ": " + m.action);

console.log("\n=== Status Codes ===");
const codes = [
  { code: 200, meaning: "OK - sukses" },
  { code: 201, meaning: "Created" },
  { code: 400, meaning: "Bad Request" },
  { code: 404, meaning: "Not Found" },
  { code: 500, meaning: "Server Error" },
];
for (const c of codes) console.log("  " + c.code + ": " + c.meaning);

console.log("\n=== Response Format ===");
const response = { status: "success", data: { id: 1, nama: "Laptop" }, message: "OK" };
console.log(JSON.stringify(response, null, 2));
```

---

## Key Concepts

### Resource Naming
Plural resources, nested resources.

### HTTP Methods
CRUD mapping.

### Status Codes
Common HTTP status codes.

### Response Format
Consistent JSON structure.

---

## Experiments

- Create nested resource: /users/:id/orders
- Implement pagination with query ?page=1&limit=10
- Create standardized error response format
- Add HATEOAS links in response

---

## Challenge

Build a complete REST API for E-Commerce: products, categories, orders with pagination and filtering.

---

## Summary

Week 6 of 12: **REST API Design** (Level: Intermediate). Next week: **Authentication & Authorization**.
