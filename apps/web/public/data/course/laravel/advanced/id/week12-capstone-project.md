# Capstone: E-Commerce API

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 12:** Capstone: E-Commerce API

## Tujuan Pembelajaran

- Menggabungkan semua konsep: auth, relationships, validation, queues, API
- E-commerce domain: products, orders, cart, users
- Role-based access: admin vs customer
- Order processing: stock validation, order items, queue jobs
- API Resources: transform complex data structures

---

## Program: E-Commerce Backend

```php
<?php
echo "=== Capstone: E-Commerce API ===<br><br>";

echo "=== Architecture ===<br>";
echo "Models: User, Product, Order, OrderItem, Category, Cart<br>";
echo "Controllers: ProductController, OrderController, AuthController<br>";
echo "Resources: ProductResource, OrderResource, UserResource<br>";
echo "Middleware: auth:sanctum, throttle, role:admin<br><br>";

echo "=== Models & Relationships ===<br>";
echo "User hasMany Order, hasOne Cart<br>";
echo "Product belongsTo Category, hasMany OrderItem<br>";
echo "Order belongsTo User, hasMany OrderItem<br>";
echo "OrderItem belongsTo Order, belongsTo Product<br><br>";

echo "=== API Endpoints ===<br>";
$endpoints = [
    "POST /api/register" => "Register user",
    "POST /api/login" => "Login & get token",
    "GET /api/products" => "List products",
    "GET /api/products/{id}" => "Product detail",
    "POST /api/orders" => "Create order",
    "GET /api/orders" => "List user orders",
    "GET /api/orders/{id}" => "Order detail",
    "POST /api/admin/products" => "Create product (admin)",
    "PUT /api/admin/products/{id}" => "Update product (admin)",
];

foreach ($endpoints as $endpoint => $desc) {
    echo "  $endpoint — $desc<br>";
}

echo "<br>=== Order Processing ===<br>";
echo "1. User adds products to cart<br>";
echo "2. User creates order (POST /api/orders)<br>";
echo "3. Validate stock availability<br>";
echo "4. Create order + order items<br>";
echo "5. Reduce product stock<br>";
echo "6. Dispatch SendOrderConfirmation job<br>";
echo "7. Return order with 201 status<br><br>";

echo "=== Features ===<br>";
echo "✓ Authentication (Sanctum)<br>";
echo "✓ CRUD Products (admin only)<br>";
echo "✓ Shopping cart<br>";
echo "✓ Order processing<br>";
echo "✓ Queue jobs (email confirmation)<br>";
echo "✓ API Resources<br>";
echo "✓ Validation (Form Requests)<br>";
echo "✓ Testing (Feature + Unit)<br>";
echo "✓ Rate limiting<br>";
echo "✓ Search & filter products<br>";
>
```

---

## Konsep Kunci

### Architecture
MVC + Service Layer. Controller → Service → Repository → Model.

### E-Commerce Flow
User browse → add to cart → checkout → order created → stock reduced → email sent.

### Role-Based
Admin: CRUD products. Customer: browse, order, view own orders.

### Order Processing
1. Validasi stock 2. Create order 3. Create order items 4. Reduce stock 5. Queue email.

### API Resources
Transform model ke JSON dengan format konsisten. Nested resources untuk relasi.

---

## Eksperimen

- Tambah payment integration (Midtrans/Stripe)
- Implementasikan coupon/discount system
- Buat product review dan rating
- Tambah notification system
- Buat admin dashboard API

---

## Tantangan

Buat e-commerce API lengkap: auth, products CRUD, cart, orders, payment webhook, queue jobs, testing. Deploy ke production.

---

## Ringkasan

Minggu 12 dari 12: **Capstone: E-Commerce API** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Laravel dari dasar hingga produksi.
