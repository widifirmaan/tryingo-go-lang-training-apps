# Capstone: Full-Stack API

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 12:** Capstone: Full-Stack API

## Tujuan Pembelajaran

- Menggabungkan semua konsep: Express, JWT, Database, Testing
- Arsitektur berlapis: Routes -> Controllers -> Services -> Models
- API versioning: /api/v1/resources
- Comprehensive testing: unit, integration, e2e
- Deployment: Docker, CI/CD, monitoring

---

## Program: E-Commerce API

```javascript
console.log("=== Capstone: E-Commerce API ===");
console.log("Menggabungkan semua konsep: Express, JWT, Database, Testing, Docker");
console.log("");

const app = {
  name: "E-Commerce API",
  version: "1.0.0",
  features: [
    "User registration & login (JWT)",
    "Product catalog (CRUD)",
    "Shopping cart",
    "Order management",
    "Role-based access (admin, customer)",
    "Pagination & filtering",
    "Input validation",
    "Error handling",
    "Unit & integration tests",
    "Docker deployment",
  ],
};

console.log("Features:");
for (const f of app.features) console.log("  - " + f);

console.log("\n=== Architecture ===");
console.log("Routes -> Controllers -> Services -> Models -> Database");
console.log("");
console.log("Routes:    /api/v1/users, /api/v1/products, /api/v1/orders");
console.log("Controllers: Handle request/response");
console.log("Services:  Business logic");
console.log("Models:    Data access layer");

console.log("\n=== API Endpoints ===");
const endpoints = [
  { method: "POST", path: "/api/v1/auth/register", desc: "Register new user" },
  { method: "POST", path: "/api/v1/auth/login", desc: "Login, get JWT" },
  { method: "GET", path: "/api/v1/products", desc: "List products (paginated)" },
  { method: "POST", path: "/api/v1/orders", desc: "Create order (auth)" },
  { method: "GET", path: "/api/v1/orders/:id", desc: "Get order detail (auth)" },
];
for (const e of endpoints) console.log("  " + e.method + " " + e.path + " -> " + e.desc);

console.log("\n=== Project Structure ===");
console.log("  src/");
console.log("    controllers/");
console.log("    services/");
console.log("    models/");
console.log("    middleware/");
console.log("    routes/");
console.log("    config/");
console.log("    utils/");
console.log("  tests/");
console.log("  Dockerfile");
```

---

## Konsep Kunci

### Arsitektur Berlapis
Routes (definisikan endpoint) -> Controllers (handle HTTP) -> Services (business logic) -> Models (data access).

### API Versioning
/api/v1/ untuk backward compatibility.

### Testing Pyramid
Unit tests (banyak) > Integration tests > E2E tests (sedikit).

### Deployment
Docker container, CI/CD pipeline, monitoring dengan PM2/APM.

---

## Eksperimen

- Tambah fitur: product reviews dan ratings
- Implementasikan caching dengan Redis
- Buat WebSocket untuk real-time notifications
- Tambah file upload untuk product images

---

## Tantangan

Buat E-Commerce API lengkap: auth, products, cart, orders, tests, Docker. Production-ready!

---

## Ringkasan

Minggu 12 dari 12: **Capstone: Full-Stack API** (Level: Lanjutan). Selesai! Anda sudah menguasai Node.js dari nol hingga production-ready.
