# Capstone: E-Commerce Platform

> **Kategori:** Ruby on Rails | **Level:** Lanjutan | **Minggu 12:** Capstone: E-Commerce Platform
> **Prasyarat:** Minggu 11 — **Deployment & DevOps**.

## Tujuan Pembelajaran

- Menggabungkan semua konsep: MVC, auth, associations, testing, API
- E-commerce domain: products, orders, cart, payments
- Service objects: extract business logic dari controllers
- Background jobs: async processing untuk email dan payment
- Full-stack deployment: Docker, PostgreSQL, Redis, Sidekiq

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: auth + API + job + deploy jadi toko. Portfolio Rails.

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

## Konsep Kunci

### Architecture
MVC + Service Layer. Controller -> Service -> Model. Jobs untuk async.

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

## Eksperimen

- Tambah payment webhook handler
- Implementasikan coupon/discount system
- Buat product review dan rating
- Tambah real-time notifications dengan ActionCable
- Buat admin dashboard dengn Blazer

---

## Tantangan

Buat e-commerce platform lengkap: auth, products CRUD, cart, orders, payment, admin, API, testing, deployment.


---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Toko Rails
- **11 minggu = bangun mal**: etalase (views), dapur (models), KTP (auth), tali (associations), kurir (jobs), drive-thru (API).
- **Capstone = grand opening**: auth + bayar + email + admin + deploy JALAN BARENG. Service objects = bagi dapur agar controller kurus (gemuk = susah uji!).

### Langkah 0 — Siapkan Device
- Sama Rails W1: `rails server` di `3000` (+ `redis` untuk W10).

### Cara Komputer Membaca
- CHECKLIST (auth + API + test + deploy) lalu URL + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 12 dari 12: **Capstone: E-Commerce Platform** (Level: Lanjutan). Selesai! Anda sudah menguasai Ruby on Rails dari dasar hingga produksi.
