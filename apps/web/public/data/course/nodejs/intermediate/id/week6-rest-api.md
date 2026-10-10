# REST API Design

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 6:** REST API Design

## Tujuan Pembelajaran

- Resource-based URLs: /resources, /resources/:id
- HTTP methods mapping: GET, POST, PUT, DELETE
- Status codes: 200, 201, 400, 404, 500
- Request/Response format: JSON structure
- Pagination, sorting, filtering untuk collection endpoints

---

## Program: API Produk

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

## Konsep Kunci

### Resource Naming
Nama resource plural (/products), nested (/products/123/reviews).

### HTTP Methods
GET baca, POST buat, PUT update, DELETE hapus.

### Status Codes
200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.

### Response Format
Konsisten: { status, data, message }.

---

## Eksperimen

- Buat nested resource: /users/:id/orders
- Implementasikan pagination dengan query ?page=1&limit=10
- Buat standardized error response format
- Tambah HATEOAS links di response

---

## Tantangan

Buat REST API lengkap untuk E-Commerce: products, categories, orders dengan pagination dan filtering.

---

## Ringkasan

Minggu 6 dari 12: **REST API Design** (Level: Menengah). Minggu depan: **Authentication & Authorization**.
