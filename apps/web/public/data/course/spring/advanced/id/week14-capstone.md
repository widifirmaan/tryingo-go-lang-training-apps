# Capstone: E-Commerce API

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 14:** Capstone: E-Commerce API

## Tujuan Pembelajaran

- Menggabungkan semua konsep: Security, JPA, REST, Testing, Caching
- Layered architecture: Controller → Service → Repository
- Event-driven: OrderCreated → Email Notification
- Docker deployment dengan multi-container
- Production-ready: monitoring, health checks, caching

---

## Program: Full Stack Backend

```java
// Capstone: E-Commerce REST API
// Features: Auth, Products, Orders, Payment, Notifications

// File: Project Structure
/*
src/main/java/com/example/ecommerce/
├── ECommerceApplication.java
├── config/
│   ├── SecurityConfig.java
│   ├── CacheConfig.java
│   └── AsyncConfig.java
├── controller/
│   ├── AuthController.java
│   ├── ProductController.java
│   ├── OrderController.java
│   └── PaymentController.java
├── service/
│   ├── UserService.java
│   ├── ProductService.java
│   ├── OrderService.java
│   └── PaymentService.java
├── repository/
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   └── OrderRepository.java
├── model/
│   ├── User.java
│   ├── Product.java
│   ├── Order.java
│   └── Payment.java
├── dto/
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── ProductDTO.java
│   └── OrderDTO.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   └── ProductNotFoundException.java
└── event/
    ├── OrderEvent.java
    └── OrderEventListener.java
*/

// File: OrderController.java (capstone example)
/*
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<OrderDTO> getUserOrders(Authentication auth) {
        return orderService.getOrdersByCustomer(auth.getName());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<OrderDTO> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Authentication auth) {
        OrderDTO order = orderService.createOrder(auth.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public OrderDTO getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
*/

// Capstone Checklist:
// ✅ Spring Security + JWT
// ✅ CRUD REST API
// ✅ Validation
// ✅ Exception Handling
// ✅ Caching (Redis)
// ✅ Async + Events
// ✅ Testing (Unit + Integration)
// ✅ Docker + Docker Compose
// ✅ Actuator + Monitoring
// ✅ Production Config
```

---

## Konsep Kunci

### Capstone
Aplikasi lengkap yang menggabungkan semua konsep yang dipelajari.

### Architecture
Layered architecture dengan separation of concerns.

### Security
JWT authentication, role-based access control.

### Performance
Caching dengan Redis, async processing.

### Deployment
Docker containerization, production config.

---

## Eksperimen

- Tambah fitur search dan filter products
- Implementasikan payment integration
- Buat admin dashboard endpoint
- Tambah unit test untuk semua layer
- Deploy ke cloud platform

---

## Tantangan

Buat E-Commerce API lengkap: Auth, Products, Orders, Payment, Notifications. Docker + Testing + Monitoring.

---

## Ringkasan

Minggu 14 dari 14: **Capstone: E-Commerce API** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Spring Boot dari nol hingga production-ready.
