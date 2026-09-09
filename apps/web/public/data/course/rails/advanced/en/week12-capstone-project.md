# Capstone: E-Commerce Platform

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 12:** Capstone: E-Commerce Platform
> **Prerequisites:** Week 11 — **Deployment & DevOps**.

## Learning Objectives

- Combine all concepts: MVC, auth, associations, testing, API
- E-commerce domain: products, orders, cart, payments
- Service objects: extract business logic from controllers
- Background jobs: async processing for email and payment
- Full-stack deployment: Docker, PostgreSQL, Redis, Sidekiq

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: auth + API + jobs + deploy become a store. Rails portfolio.

---

## Program: E-Commerce Rails

```ruby
#!/usr/bin/env ruby
puts "=== Capstone: E-Commerce Platform ==="
puts ""
puts "=== Architecture ==="
puts "Models: User, Product, Order, OrderItem, Category, Cart, Review"
puts "Controllers: ProductsController, OrdersController, AuthController"
puts "Services: OrderService, PaymentService, CartService"
puts "Jobs: SendOrderConfirmationJob, ProcessPaymentJob"
puts ""
puts "=== Features ==="
features = [
  "User authentication (Devise)",
  "Product catalog with search & filter",
  "Shopping cart (session-based)",
  "Order processing with state machine",
  "Payment integration (Stripe)",
  "Admin dashboard",
  "Background jobs (Sidekiq)",
  "API endpoints (JSON)",
  "Testing (RSpec + Factory Bot)",
  "Performance optimization",
  "Docker deployment",
]
features.each { |f| puts "  \u2713 #{f}" }
puts ""
puts "=== API Endpoints ==="
endpoints = [
  "POST /api/register" => "Register",
  "POST /api/login" => "Login",
  "GET /api/products" => "List products",
  "GET /api/products/:id" => "Product detail",
  "POST /api/orders" => "Create order",
  "GET /api/orders" => "List orders",
  "GET /api/orders/:id" => "Order detail",
  "POST /api/admin/products" => "Create product (admin)",
]
endpoints.each { |ep, desc| puts "  #{ep} - #{desc}" }
puts ""
puts "=== Order Flow ==="
puts "1. User browses products (GET /api/products)"
puts "2. Add to cart (session-based)"
puts "3. Checkout (POST /api/orders)"
puts "4. Process payment (Stripe)"
puts "5. Create order + order items"
puts "6. Reduce product stock"
puts "7. SendOrderConfirmationJob.perform_later(order)"
puts "8. Return order with 201 status"
puts ""
puts "=== Testing Strategy ==="
puts "Model specs: validations, associations, scopes"
puts "Request specs: all API endpoints"
puts "System specs: critical user flows"
puts "Job specs: background job processing"
puts ""
puts "=== Deployment ==="
puts "Docker + Docker Compose"
puts "PostgreSQL + Redis"
puts "Nginx + SSL"
```

---

## Key Concepts

### Architecture
MVC + services + jobs + API — production e-commerce.

### Deployment
Docker + Compose. PostgreSQL + Redis. Nginx + SSL.

---

## Experiments

- Add a payment webhook handler
- Implement a coupon/discount system
- Build product reviews and ratings
- Add real-time notifications with ActionCable
- Build an admin dashboard with Blazer

---

## Challenge

Build a complete e-commerce platform: auth, products CRUD, cart, orders, payment, admin, API, testing, deployment.


---

## Beginner Friendly Explanation

### Analogy: Rails Store Grand Opening
- **11 weeks = building a mall**: showcase (views), kitchen (models), IDs (auth), ropes (associations), couriers (jobs), drive-thru (API).
- **Capstone = grand opening**: auth + payment + email + admin + deploy RUNNING TOGETHER. Service objects = split kitchens so controllers stay skinny (fat = hard to test!).

### Step 0 — Prepare Device
- Same as Rails W1: `rails server` on `3000` (+ `redis` for W10).

### How the Computer Reads It
- CHECKLIST (auth + API + test + deploy) then URL + video.

### 3 Must-Know Terms
- 1. **Capstone/deploy**: combine/open

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 12 of 12: **Capstone: E-Commerce Platform** (Level: Advanced). Done! You now master Ruby on Rails from basics to production.
