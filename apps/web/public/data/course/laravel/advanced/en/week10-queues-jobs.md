# Queues & Jobs — Laravel Shop Queue

> **Kategori:** Laravel | **Level:** Advanced | **Minggu 10:** Queues & Jobs

## Learning Objectives

- `php artisan make:job SendEmail` queue, `dispatch` sends, `queue:work` processes

---

## Why This Matters (Non-IT)

5-second WA sends in-request → 5-second loading. With `dispatch()` + `queue:work`, instant reply, background WA.

---

## Program

```bash
php artisan make:job SendEmail
```

```php
// app/Jobs/SendEmail.php
public function handle(){ Mail::to($this->user->email)->send(new ReceiptMail()); }

// Controller
SendEmail::dispatch($user); // queued, no waiting
```

`php artisan queue:work` → processes queue.


---

## Beginner Friendly Explanation

### Analogy: Laravel Courier Queue
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `Job::dispatch()` queues; `queue:work` takes; `failed` after 3 failures.

### 3 Must-Know Terms
- 1. **dispatch/queue:work**: queue/take

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 10: **Queue** — Jobs don't wait. Next: **REST API**.
