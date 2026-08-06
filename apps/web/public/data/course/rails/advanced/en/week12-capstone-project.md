# Capstone: E-Commerce Platform

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 12:** Capstone: E-Commerce Platform

## Learning Objectives

- Combine all concepts: MVC, auth, associations, testing, API
- E-commerce domain: products, orders, cart, payments
- Service objects: extract business logic from controllers
- Background jobs: async processing for email and payment
- Full-stack deployment: Docker, PostgreSQL, Redis, Sidekiq

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
features.each { |f| puts "  ✓ #{f}" }
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
puts "Sidekiq for background jobs"
puts "Nginx reverse proxy"
puts "SSL with Let's Encrypt"

```

---

## Key Concepts

### Architecture
MVC + Service Layer. Controller -> Service -> Model. Jobs for async.

### E-Commerce Flow
Browse -> Add to cart -> Checkout -> Payment -> Order created -> Email sent.

### Service Objects
Extract logic: `OrderService.create(user, cart)`. Thin controllers.

### Background Jobs
`SendOrderConfirmationJob.perform_later(order)`. Sidekiq processing.

### Testing
Model specs, request specs, system specs, job specs.

### Deployment
Docker + Compose. PostgreSQL + Redis. Nginx + SSL.

---

## Experiments

- Add payment webhook handler
- Implement coupon/discount system
- Create product review and rating
- Add real-time notifications with ActionCable
- Create admin dashboard with Blazer

---

## Challenge

Build a complete e-commerce platform: auth, products CRUD, cart, orders, payment, admin, API, testing, deployment.

---

## Summary

Week 12 of 12: **Capstone: E-Commerce Platform** (Level: Advanced). Complete! You've mastered Ruby on Rails from basics to production.
