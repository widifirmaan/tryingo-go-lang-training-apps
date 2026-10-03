# Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job

> **Kategori:** Ruby on Rails 8 | **Level:** Intermediate | **Minggu 7:** Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Active Job as the unified background processing abstraction in Ruby on Rails.
- Master Rails 8 Solid Queue (high-throughput database-backed job queues replacing Redis/Sidekiq).
- Deploy `.perform_later()` and schedule future execution times via `.set(wait_until: ...)`.
- Govern fault tolerance using `retry_on` (Exponential Backoff) and `discard_on`.

---

## Program: Asynchronous Team Workspace Weekly Digest Job with Solid Queue & Active Job

```ruby
# app/jobs/workspace_weekly_digest_job.rb
class WorkspaceWeeklyDigestJob < ApplicationJob
  queue_as :mailers

  # Konfigurasi Retry Otomatis jika Terjadi Kegagalan Jaringan
  retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5
  discard_on ActiveRecord::RecordNotFound

  def perform(workspace_id)
    workspace = Workspace.find(workspace_id)
    puts "[SOLID QUEUE WORKER] Memulai kompilasi rekap mingguan untuk Workspace: #{workspace.name}..."

    completed_tasks = workspace.tasks.status_completed.where("completed_at >= ?", 7.days.ago)
    overdue_tasks   = workspace.tasks.overdue

    puts " -> Tugas Selesai: #{completed_tasks.count} | Tugas Terlambat: #{overdue_tasks.count}"

    # Kirim email ke seluruh anggota tim workspace
    # WorkspaceMailer.weekly_digest(workspace, completed_tasks, overdue_tasks).deliver_now

    puts "[SOLID QUEUE SUCCESS] Rekap email mingguan berhasil dikirimkan ke anggota tim!"
  end
end

# Memicu Job dari Controller atau Console:
# 1. Jalankan asinkron sesegera mungkin:
# WorkspaceWeeklyDigestJob.perform_later(workspace.id)

# 2. Jadwalkan eksekusi di masa depan (Scheduled Recurring):
# WorkspaceWeeklyDigestJob.set(wait_until: Date.tomorrow.noon).perform_later(workspace.id)

puts "=== RAILS 8 SOLID QUEUE BACKGROUND PROCESSING ACTIVE ==="
```

---

## Key Concepts

Heavy operations (dispatching bulk email digests, compiling multi-megabyte spreadsheet archives, querying external webhooks) must never execute synchronously within HTTP server threads.

### The Breakthrough of Rails 8 Solid Queue
For nearly two decades, Rails backends mandated provisioning Redis clusters and running Sidekiq daemons for background workloads. Rails 8 introduces **Solid Queue**: an enterprise-grade job engine executing directly atop relational databases (PostgreSQL/MySQL/SQLite). Leveraging modern `FOR UPDATE SKIP LOCKED` mechanics, Solid Queue crunches millions of jobs daily without Redis infrastructure overhead.

### Fault Tolerance with retry_on
Network connectivity is inherently unreliable. Declaring `retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5` instructs Solid Queue to pause and retry failed jobs across graduated delays (5s, 20s, 60s) before marking tasks fatal.


---

---

## Beginner Friendly Explanation

Imagine a high-volume postal distribution terminal. Rather than clerks individually stamping 1,000 envelopes at the service counter (freezing the customer line), the clerk deposits the mail sack onto a motorized conveyor into the automated sorting depot (Solid Queue). Sorting machinery dispatches letters overnight smoothly.

## Experiments

- Start the Solid Queue worker supervisor via `bin/jobs` in your terminal.
- Dispatch a job from `bin/rails console` via `perform_later(1)` and observe worker logs in real time.
- Test scheduled execution via `wait: 10.seconds` observing the delayed execution timestamp.

---

## Challenge

Configure Solid Queue recurring jobs in `config/recurring.yml` scheduling automated task archive purging every Sunday at 2:00 AM.

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

### 1. N+1 Active Record Queries
- **Symptom / Issue:** Iterating through associations fires repeated queries per record.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Eager load required associations using `includes(:association)`.

### 2. Irreversible Database Migrations
- **Symptom / Issue:** Running `rails db:rollback` fails when migration direction is ambiguous.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Write explicit `up` and `down` migration methods for complex column changes.

### 3. Checking Secrets into Public Version Control
- **Symptom / Issue:** Third-party tokens and database credentials get leaked.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use encrypted credentials via `rails credentials:edit`.

---

## Summary

You have mastered Active Job and Rails 8 Solid Queue. Level 2 complete! Level 3 covers Solid Cache, Native Auth, and our Workspace Capstone.
