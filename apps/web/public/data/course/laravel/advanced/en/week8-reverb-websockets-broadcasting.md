# Real-Time Communication: Laravel Reverb WebSockets & Event Broadcasting

> **Kategori:** Laravel Framework | **Level:** Advanced | **Minggu 8:** Real-Time Communication: Laravel Reverb WebSockets & Event Broadcasting
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Laravel's first-party WebSocket server: Laravel Reverb (high-throughput, thousands of concurrent sockets).
- Implement `ShouldBroadcast` and `ShouldBroadcastNow` on native Laravel Event classes.
- Differentiate Broadcasting Channel types: Public, Private, and Presence Channels.
- Wire frontend browser interfaces reactively utilizing client-side `laravel-echo`.

---

## Program: Real-Time Flash Sale Stock Ticker with Laravel Reverb & Laravel Echo

```php
<?php
// app/Events/StockUpdatedEvent.php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

// ShouldBroadcastNow: Langsung siarkan ke WebSocket detik ini juga tanpa antrean queue
class StockUpdatedEvent implements ShouldBroadcastNow {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int $productId,
        public string $sku,
        public int $remainingStock
    ) {}

    // Channel Publik yang didengarkan oleh ribuan pembeli di browser
    public function broadcastOn(): array {
        return [
            new Channel('marketplace.flash-sale'),
        ];
    }

    public function broadcastAs(): string {
        return 'stock.ticker.updated';
    }
}

// Client-Side Frontend (JavaScript dengan Laravel Echo):
$frontendEchoSnippet = <<<'JS'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

// Dengarkan pembaruan stok real-time tanpa reload halaman!
window.Echo.channel('marketplace.flash-sale')
    .listen('.stock.ticker.updated', (event) => {
        console.log(`[LIVE UPDATE] Stok SKU ${event.sku} berkurang menjadi: ${event.remainingStock} unit!`);
        document.getElementById(`stock-${event.productId}`).textContent = event.remainingStock;
    });
JS;

echo "=== LARAVEL REVERB REAL-TIME EVENT BROADCASTING TERKONFIGURASI ===\n";
```

---

## Key Concepts

Historically, Laravel developers relied on expensive third-party hosted providers (Pusher) or spun up standalone Node.js socket microservices to achieve real-time reactivity. Laravel 11 transforms this landscape via **Laravel Reverb**: an ultra-fast, first-party native WebSocket server tailored for Laravel.

### The Power of Laravel Reverb
Reverb executes directly within your hosting cluster, sustaining tens of thousands of concurrent WebSocket connections with minimal resource utilization and sub-millisecond dispatch times.

### Event Broadcasting Pipeline
1. When flash-sale checkout transactions commit, controllers trigger `StockUpdatedEvent::dispatch()`.
2. Laravel inspects the event's `broadcastOn()` payload targeting `new Channel('marketplace.flash-sale')`.
3. Events dispatch into the Reverb WebSocket daemon.
4. Reverb broadcasts JSON frames to all connected browser clients via **Laravel Echo**, decrementing stock indicators on customer viewports without browser reloads.


---

---

## Beginner Friendly Explanation

Imagine a high-stakes auction room. When the auctioneer raises the bidding hammer (the Event), they do not place 500 individual phone calls. They speak into the hall loudspeaker (Laravel Reverb), and every bidder holding wireless earpieces (Laravel Echo) hears the new bid instantaneously.

## Experiments

- Start the Reverb WebSocket daemon in your terminal via `php artisan reverb:start`.
- Open two browser windows side-by-side observing mutations in window A reflecting instantaneously in window B.
- Deploy `PrivateChannel` configurations auditing authorization rules inside `routes/channels.php`.

---

## Challenge

Deploy a Presence Channel (`new PresenceChannel("store.live-shoppers." . $storeId)`) rendering live counts of active concurrent shoppers on store pages.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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

You have mastered Laravel Reverb WebSockets and real-time Event Broadcasting. Next week we cover Full-Text Search with Laravel Scout and Horizon optimization.
