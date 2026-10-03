# Event-Driven Architecture: Events, Listeners & Background Queues with Redis

> **Kategori:** Laravel Framework | **Level:** Intermediate | **Minggu 6:** Event-Driven Architecture: Events, Listeners & Background Queues with Redis

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

## Summary

You have mastered Event-Driven Architecture, ShouldQueue, and Redis queues in Laravel. Next week we explore Stripe payment processing and Laravel Cashier.
