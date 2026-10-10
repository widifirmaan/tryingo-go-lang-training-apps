# Capstone: E-Commerce Platform

> **Kategori:** Django | **Level:** Advanced | **Minggu 12:** Capstone: E-Commerce Platform

## Learning Objectives

- Combine all concepts: MVT, forms, auth, admin, REST
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

## Key Concepts

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

## Experiments

- Add payment webhook
- Implement coupon system
- Create product review
- Add real-time notifications
- Create admin dashboard

---

## Challenge

Create complete e-commerce platform: auth, products CRUD, cart, orders, payment, API, testing.

---

## Summary

Week 12 of 12: **Capstone** (Level: Advanced). Complete! You've mastered Django.
