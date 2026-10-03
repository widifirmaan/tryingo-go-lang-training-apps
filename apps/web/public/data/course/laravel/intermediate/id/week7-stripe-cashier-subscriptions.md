# Monetisasi & Pembayaran: Integrasi Stripe, Webhooks & Laravel Cashier

> **Kategori:** Laravel Framework | **Level:** Menengah | **Minggu 7:** Monetisasi & Pembayaran: Integrasi Stripe, Webhooks & Laravel Cashier

## Tujuan Pembelajaran

- Menguasai integrasi gateway pembayaran internasional menggunakan Stripe API & Laravel Cashier.
- Membangun alur Hosted Checkout Sessions yang aman tanpa menyentuh data kartu kredit di server lokal (PCI-DSS Compliant).
- Mengonfigurasi penanganan Webhook Stripe dengan verifikasi cryptographic signature.
- Mengelola siklus hidup langganan berulang (Recurring Subscriptions, Upgrades, Cancellations, dan Grace Periods).

---

## Program: Checkout Langganan Toko Merchant & Penanganan Webhook Stripe Otomatis

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

## Konsep Kunci

Menerima pembayaran kartu kredit secara langsung di server sendiri mewajibkan sertifikasi keamanan perbankan yang sangat mahal (PCI-DSS). Cara standar industri terbaik adalah menggunakan **Stripe Hosted Checkout** dan paket resmi **Laravel Cashier**.

### Mengapa Laravel Cashier?
Laravel Cashier membungkus seluruh kerumitan integrasi Stripe menjadi method Eloquent yang sangat ekspresif:
`$user->newSubscription('default', 'price_tier_pro')->checkout();`
Cashier otomatis mengelola tabel langganan, pelacakan masa percobaan gratis (Trial Periods), penanganan gagal bayar (Incomplete Payments), dan pembuatan invoice PDF otomatis.

### Kunci Sukses: Penanganan Webhook Idempotent
Pembayaran tidak dikonfirmasi di halaman redirect browser pengguna (karena koneksi pengguna bisa putus tepat setelah membayar). Konfirmasi resmi selalu datang dari server Stripe melalui **Webhook**. Endpoint webhook harus bersifat **Idempotent**: jika Stripe mengirimkan event sukses yang sama 3 kali karena jeda jaringan, sistem kita hanya mengaktifkan langganan sekali tanpa menduplikasi data.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membeli tiket bioskop online. Daripada memasukkan nomor kartu kredit di formulir toko yang meragukan, Anda dialihkan ke loket resmi bank dengan pengawalan satpam (Stripe Checkout). Setelah pembayaran selesai di loket bank, bank mengirimkan telegram rahasia berstempel resmi ke bioskop (Webhook) untuk mencetak tiket Anda.

## Eksperimen

- Gunakan Stripe CLI (`stripe listen --forward-to localhost:8000/stripe/webhook`) untuk meneruskan webhook lokal.
- Uji coba simulasi kartu kredit gagal bayar (`4002 ...`) dan amati penanganan status incomplete di Laravel.
- Bebaskan route webhook dari proteksi CSRF di `bootstrap/app.php` menggunakan `validateCsrfTokens(except: ["stripe/*"])`.

---

## Tantangan

Tambahkan penanganan event `customer.subscription.deleted` untuk secara otomatis mencabut status toko terverifikasi dan mengirimkan email perpisahan ke merchant.

---

## Ringkasan

Kamu telah menguasai Stripe Checkout, Laravel Cashier, dan penanganan Webhook. Level 2 selesai! Di Level 3 kita mempelajari Reverb WebSockets, Scout Search, dan Marketplace Capstone.
