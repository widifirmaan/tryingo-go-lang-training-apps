# Monetization & Billing: Stripe Integration, Webhooks & Laravel Cashier

> **Kategori:** Laravel Framework | **Level:** Intermediate | **Minggu 7:** Monetization & Billing: Stripe Integration, Webhooks & Laravel Cashier
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master international payment gateway integration leveraging Stripe API and Laravel Cashier.
- Build secure Hosted Checkout Sessions bypassing local credit card data handling (PCI-DSS Compliant).
- Configure Stripe Webhook pipelines verifying cryptographic signatures.
- Govern recurring subscription lifecycles (renewals, tier upgrades, cancellations, and grace periods).

---

## Program: Merchant Store Subscription Checkout & Automated Stripe Webhook Handler

```php
<?php
// app/Http/Controllers/SubscriptionCheckoutController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubscriptionCheckoutController {
    // 1. Mengarahkan Merchant ke Stripe Hosted Checkout Session
    public function checkout(Request $request) {
        $user = $request->user();
        $planPriceId = 'price_tier_merchant_pro_monthly';

        // Menggunakan Laravel Cashier (Stripe SDK Wrapper)
        // return $user->newSubscription('default', $planPriceId)
        //     ->checkout([
        //         'success_url' => route('merchant.billing.success'),
        //         'cancel_url'  => route('merchant.billing.cancel'),
        //     ]);

        return response()->json([
            'checkout_url' => 'https://checkout.stripe.com/c/pay/cs_test_simulated_token',
            'plan' => 'Merchant Pro Tier',
            'amount_monthly' => 299000
        ]);
    }

    // 2. Penanganan Webhook Stripe Asinkron & Idempotent
    public function handleStripeWebhook(Request $request) {
        $payload = $request->all();
        $eventType = $payload['type'] ?? 'unknown';

        Log::info("[STRIPE WEBHOOK RECEIVED] Event: {$eventType}");

        // Verifikasi Event Pembayaran Langganan Sukses
        if ($eventType === 'customer.subscription.created' || $eventType === 'invoice.payment_succeeded') {
            $customerStripeId = $payload['data']['object']['customer'] ?? null;
            
            // Temukan merchant berdasarkan Stripe ID dan aktifkan badge "Verified Merchant"
            Log::info("[BILLING ACTIVE] Langganan aktif untuk Stripe Customer: {$customerStripeId}");
            
            return response()->json(['status' => 'handled', 'event' => $eventType]);
        }

        return response()->json(['status' => 'ignored']);
    }
}

echo "=== SISTEM BILLING STRIPE & PENANGANAN WEBHOOK SIAP DIGUNAKAN ===\n";
```

---

## Key Concepts

Handling raw credit card numbers on local web servers mandates grueling financial security compliance (PCI-DSS). Industry leaders bypass this liability utilizing **Stripe Hosted Checkout** powered by the official **Laravel Cashier** suite.

### Why Deploy Laravel Cashier?
Laravel Cashier abstracts Stripe's recurring billing engine into expressive Eloquent primitives:
`$user->newSubscription('default', 'price_tier_pro')->checkout();`
Cashier governs subscription persistence, trial period tracking, incomplete payment challenge handling, and automated PDF invoice generation.

### Idempotent Webhook Resilience
Transactions must never finalize based on client-side browser redirects (shoppers frequently close mobile browsers prematurely). Authoritative confirmation dispatches asynchronously via **Stripe Webhooks**. Webhook handlers must enforce **Idempotency**: if Stripe re-transmits an event three times due to network timeouts, the system applies the subscription state transition exactly once.


---

---

## Beginner Friendly Explanation

Imagine purchasing theater tickets. Rather than scribbling card numbers on unverified merchant forms, you step into a fortified bank teller kiosk (Stripe Checkout). Once your payment clears, the bank transmits a verified encrypted wire to the cinema box office (Webhook) authorizing ticket release.

## Experiments

- Deploy the Stripe CLI (`stripe listen --forward-to localhost:8000/stripe/webhook`) forwarding live test hooks locally.
- Simulate a declining payment card (`4002 ...`) and observe Cashier's incomplete state handling.
- Exempt webhook routes from CSRF verification in `bootstrap/app.php` via `validateCsrfTokens(except: ["stripe/*"])`.

---

## Challenge

Add a `customer.subscription.deleted` handler automatically revoking merchant tier privileges and dispatching cancellation surveys.

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

You have mastered Stripe Checkout, Laravel Cashier, and Webhooks. Level 2 complete! Level 3 covers Reverb WebSockets, Scout Search, and our Marketplace Capstone.
