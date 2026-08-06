# Capstone: E-Commerce Platform

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 12:** Capstone: E-Commerce Platform

## Tujuan Pembelajaran

- Menggabungkan semua konsep: MVT, forms, auth, admin, REST
- E-commerce domain: products, orders, cart, payments
- Service layer: extract business logic
- Testing: model, view, API tests
- Deployment: Docker, Gunicorn, Nginx

---

## Program: E-Commerce Django

```python
# capstone
print("=== Capstone: E-Commerce Platform ===")
print("=== Architecture ===")
print("Models: User, Product, Order, OrderItem, Category, Cart")
print("Views: ProductViewSet, OrderViewSet, AuthViewSet")
print("Services: OrderService, PaymentService")
print("Tests: Model, View, API tests")
print("")
print("=== Features ===")
features = [
    "User authentication",
    "Product catalog",
    "Shopping cart",
    "Order processing",
    "Payment integration",
    "Admin dashboard",
    "REST API (DRF)",
    "Testing (pytest)",
    "Docker deployment",
]
for f in features:
    print(f"  - {f}")
print("")
print("=== API Endpoints ===")
endpoints = [
    "POST /api/register - Register",
    "POST /api/login - Login",
    "GET /api/products - List products",
    "POST /api/orders - Create order",
]
for ep in endpoints:
    print(f"  {ep}")

```

---

## Konsep Kunci

### Architecture
MVT + Service Layer. View -> Service -> Model.

### E-Commerce Flow
Browse -> Add to cart -> Checkout -> Payment -> Order created.

### Service Layer
Extract logic: `OrderService.create(user, cart)`.

### Testing
Model tests, API tests, integration tests.

### Deployment
Docker + Compose. PostgreSQL + Redis.

---

## Eksperimen

- Tambah payment webhook
- Implementasikan coupon system
- Buat product review
- Tambah real-time notifications
- Buat admin dashboard

---

## Tantangan

Buat e-commerce platform lengkap: auth, products CRUD, cart, orders, payment, API, testing.

---

## Ringkasan

Minggu 12 dari 12: **Capstone** (Level: Lanjutan). Selesai! Anda sudah menguasai Django.
