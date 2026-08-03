# Queues & Jobs

> Laravel | APIs & Real-time | Lesson 15

## Learning Objectives

- Move heavy work out of the request with Jobs (ShouldQueue)
- Understand queues: sync vs database + the worker (queue:work)
- Configure retries: $tries and $backoff
- Handle failures: the failed_jobs table and queue:retry

---

## Program: Queues & Jobs

```php
<?php

namespace App\Jobs;

use App\Models\Pesanan;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class KirimEmailPesananJob implements ShouldQueue
{
    use Queueable;

    public $tries = 3;

    public $backoff = 5;

    public function __construct(public Pesanan $pesanan)
    {
    }

    public function handle(): void
    {
        sleep(2);

        logger('Email konfirmasi dikirim ke '.$this->pesanan->email.' untuk '.$this->pesanan->produk);

        $this->pesanan->update(['status' => 'terkirim']);
    }
}

```

---

## Explanation

## Why Queues?
HTTP requests have timeouts; clients wait for responses. Email/SMS/PDF/image resizing = slow. Queues separate concerns: the request stores the ORDER (fast), other work (send email) runs LATER on a worker. Users do not wait for non-essential things.
## Sync vs Real Queues
QUEUE_CONNECTION=sync: jobs run inline in the request (for development/tests - simple but the same code path). database: jobs land in the jobs table, a worker (php artisan queue:work) picks and runs them. The app code does NOT change - only the configuration.
## ShouldQueue & handle()
class ... implements ShouldQueue = the "run later" flag. handle() holds the actual work. dispatch() enqueues it. The constructor holds the job data (must be serializable) - never pass resources/connections. public $tries = 3: if handle() throws, retry up to 3 times with a backoff gap.
## Failure: Not a Vanishing Act
After retries are exhausted the job moves to failed_jobs with the full exception. queue:failed (list), queue:retry (re-run), queue:forget (drop one), queue:flush (clean all). Failures = data, not lost events.

---

## Experiments

1. **Why Queues?**
2. **Sync vs Real Queues**
3. **ShouldQueue & handle()**
4. **Failure: Not a Vanishing Act**

---

## Challenge

Practice queues with real scenarios: (1) make the job count $this->attempt() and log "Attempt N" - then add a random exception (if ($this->attempt() < 3) throw) and watch retries + failed_jobs, (2) delay delivery: KirimEmailPesananJob::dispatch($pesanan)->delay(now()->addSeconds(30)) and prove it via log timestamps, (3) create a second KirimWhatsappJob and run them in sequence with Bus::chain([...])->dispatch(), (4) document a failed-job runbook in the README: queue:retry all and explain the payment scenario that needs idempotency.

---

## Summary

Queues = fast requests, deferred work. Workers = the executors. failed_jobs = the safety net. Next: broadcasting & WebSockets.
