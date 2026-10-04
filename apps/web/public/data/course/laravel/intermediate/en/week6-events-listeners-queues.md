# Event-Driven Architecture: Events, Listeners & Background Queues with Redis

> **Kategori:** Laravel Framework | **Level:** Intermediate | **Minggu 6:** Event-Driven Architecture: Events, Listeners & Background Queues with Redis
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Event-Driven Architecture (decoupling domain operations from secondary side-effects).
- Implement the `ShouldQueue` interface converting synchronous listeners into background jobs.
- Configure high-throughput Redis queue drivers within `config/queue.php`.
- Govern fault tolerance: configuring `$tries`, `$backoff`, and managing `failed_jobs` tables.

---

## Program: Asynchronous Order Processing Pipeline with Events & Redis Queues

```php
<?php
// app/Events/OrderPlaced.php
namespace App\Events;

use App\Models\Order;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderPlaced {
    use Dispatchable, SerializesModels;

    public function __construct(public Order $order) {}
}

// app/Listeners/SendOrderInvoiceNotification.php
namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

// Interface ShouldQueue memberitahu Laravel untuk menjalankan listener ini di Background Worker!
class SendOrderInvoiceNotification implements ShouldQueue {
    use InteractsWithQueue;

    public int $tries = 3;             // Coba ulang maksimal 3 kali jika gagal
    public int $timeout = 60;          // Batas waktu eksekusi 60 detik
    public int $backoff = 15;          // Jeda waktu 15 detik sebelum mencoba ulang

    public function handle(OrderPlaced $event): void {
        $order = $event->order;
        echo "[BACKGROUND QUEUE WORKER] Memproses pengiriman kwitansi PDF untuk Pesanan #{$order->id}...\n";
        
        // Simulasi pengiriman email asinkron tanpa memblokir koneksi browser pembeli
        // Mail::to($order->buyer_email)->send(new OrderInvoiceMail($order));
        
        echo "[QUEUE WORKER SUCCESS] Email kwitansi berhasil dikirim ke {$order->buyer_email}!\n";
    }

    public function failed(OrderPlaced $event, \Throwable $exception): void {
        echo "[QUEUE JOB FAILED] Seluruh percobaan habis. Catat ke tabel failed_jobs: " . $exception->getMessage() . "\n";
    }
}

// Memicu Event di Controller (Hanya memakan waktu 3ms):
// OrderPlaced::dispatch($newOrder);

echo "=== LARAVEL QUEUED EVENT-DRIVEN ARCHITECTURE TERKONFIGURASI ===\n";
```

---

## Key Concepts

When shoppers click "Place Order" on a marketplace checkout, numerous downstream actions trigger: inventory reservation, invoice PDF generation, push alerts to dispatch couriers, and SMS pings to merchants. Executing these synchronously forces browsers to hang for ten seconds.

### Event-Driven Dynamics in Laravel
1. The Controller focuses strictly on primary transactional boundaries: committing the order and dispatching the domain event:
   `OrderPlaced::dispatch($order);`
   The HTTP action returns an order confirmation receipt within 5 milliseconds.
2. Any event listener implementing **`ShouldQueue`** serializes into an asynchronous job pushed to **Redis**.
3. Dedicated **Queue Worker Processes** (`php artisan queue:work redis`) consuming queues concurrently execute emails and downstream integrations without starving web threads.


---

---

## Beginner Friendly Explanation

Imagine ordering at a coffee house. The cashier hands you a receipt buzzer in ten seconds (Controller completed). They do not force you to stand blocking the cash register for 20 minutes while baristas roast beans and steam milk. The ticket queues on the kitchen order board (Redis Queue), and servers deliver it when prepared (Queue Worker).

## Experiments

- Launch an active worker in your terminal via `php artisan queue:work redis --queue=default`.
- Dispatch an event and observe job execution logs appearing asynchronously in the worker terminal.
- Raise an exception inside the listener and observe the worker retrying three times as configured by `$tries`.

---

## Challenge

Deploy Job Chaining (`Bus::chain([...])`) guaranteeing PDF invoice rendering finishes successfully prior to dispatching the delivery email job.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ALUR KERJA SIKLUS LARAVEL                                │
│                                                          │
│ HTTP Request ──► index.php ──► HTTP Kernel               │
│                                     │                    │
│                                     ▼                    │
│                                Middleware                │
│                                     │                    │
│                                     ▼                    │
│                           Router (web.php/api.php)       │
│                                     │                    │
│                                     ▼                    │
│                           Controller / Action            │
│                            │              │              │
│                            ▼              ▼              │
│                   Eloquent ORM (Model)  Blade Template   │
│                            │              │              │
│                            ▼              ▼              │
│                         Database     HTTP Response       │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `Route::get('/users', [UserController::class, 'index'])`
- **Core Functionality:** Pendaftaran rute HTTP deklaratif.
- **Parameters / Attributes:** `URI pattern, Action Controller array`.
- **System Behavior & Return:** Mengarahkan permintaan HTTP GET yang masuk ke method controller yang relevan..
- **Practical Code Example:**
```php
<?php
use App\Http\Controllers\ProductController;
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
```
- **Expected Execution Output:**
```output
Rute terdaftar dan siap diakses pengguna
```

### 2. `class Product extends Model { protected $fillable = [...]; }`
- **Core Functionality:** Model Eloquent ORM & Mass Assignment Guard.
- **Parameters / Attributes:** `$fillable array`.
- **System Behavior & Return:** Mendefinisikan entitas database dengan relasi aktif dan perlindungan injeksi mass assignment..
- **Practical Code Example:**
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model {
    protected $fillable = ['title', 'price', 'in_stock'];
}
```
- **Expected Execution Output:**
```output
Model Product siap untuk operasi CRUD Eloquent
```

### 3. `$request->validate(['email' => 'required|email|unique:users'])`
- **Core Functionality:** Validasi HTTP request terpusat.
- **Parameters / Attributes:** `Rules array`.
- **System Behavior & Return:** Memvalidasi input data pengguna secara otomatis dan mengembalikan error jika tidak memenuhi syarat..
- **Practical Code Example:**
```php
<?php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'price' => 'required|numeric|min:0'
]);
```
- **Expected Execution Output:**
```output
Data lolos seleksi atau redirect dengan error session
```

### 4. `return view('products.index', compact('products'))`
- **Core Functionality:** Rendering tampilan Blade Template.
- **Parameters / Attributes:** `View path, Data array / compact`.
- **System Behavior & Return:** Mengirimkan data dari controller ke template Blade untuk dirender menjadi antarmuka HTML..
- **Practical Code Example:**
```php
<?php
public function index() {
    $products = Product::where('in_stock', true)->paginate(10);
    return view('products.index', compact('products'));
}
```
- **Expected Execution Output:**
```output
Tampilan daftar produk berhasil disajikan
```

---

## Common Pitfalls & Debugging Tips

### 1. Mass Assignment Exception
- **Symptom / Issue:** Model throws error preventing mass creation when columns are unprotected.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Define safe assignable attributes inside `protected $fillable = [...]` on the model.

### 2. Overstuffed Controllers (Fat Controllers)
- **Symptom / Issue:** Controllers become untestable and violate single-responsibility guidelines.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Extract domain logic into Action classes, Form Requests, and Service layers.

### 3. Skipping Production Cache Optimization
- **Symptom / Issue:** Repeated file system lookups drag down production response latency.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Run `php artisan config:cache`, `route:cache`, and `view:cache` in production deployments.

---

## Summary

You have mastered Event-Driven Architecture, ShouldQueue, and Redis queues in Laravel. Next week we explore Stripe payment processing and Laravel Cashier.
