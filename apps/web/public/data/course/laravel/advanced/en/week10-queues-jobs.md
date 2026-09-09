# Queues & Jobs — Laravel Shop Queue

> **Kategori:** Laravel | **Level:** Advanced | **Minggu 10:** Queues & Jobs
> **Prerequisites:** Week 9 — **Testing**.

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
- **Sending WA in-request = cashier delivering 5 seconds personally**: customers stare at loading.
- **`dispatch()` = call courier**: replies OK in 0.1s, courier delivers in background. `queue:work` = the courier; fails? `failed_jobs` records + retries!

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `Job::dispatch()` queues; `queue:work` takes; `failed` after 3 failures.

### 3 Must-Know Terms
- 1. **dispatch/queue:work**: queue/take

### Bonus: Mail + Auto Schedule (docs: Mail & Task Scheduling!)

Jobs sending real email + running every morning WITHOUT manual cron:

```bash
php artisan make:mail ReceiptMail --markdown=emails.receipt
```

```php
// app/Mail/ReceiptMail.php — render() shows receipt
public function content() {
  return new Content(markdown: 'emails.receipt', with: ['total' => 62000]);
}
// Send from Job: Mail::to($user->email)->send(new ReceiptMail());
```

```php
// routes/console.php — schedule (replaces manual cron!)
use Illuminate\Support\Facades\Schedule;
Schedule::job(new SendPromo)->dailyAt("07:00"); // every 7am
// Server: 1 cron only → * * * * * php artisan schedule:run
```

---

## Experiments

- **Green:** Run the Program as-is; note the first output line.
- **Yellow:** Change 1 number/string in the Program → predict first, then run.
- **Red:** Delete 1 line in the Program → what is the first error? Restore it.

## Challenge

**Queues & Jobs in Your Shop:** use `content`, `Job` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `content`, `Job`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Testing** (Week 9): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 10: **Queue** — Jobs don't wait. Next: **REST API**.
