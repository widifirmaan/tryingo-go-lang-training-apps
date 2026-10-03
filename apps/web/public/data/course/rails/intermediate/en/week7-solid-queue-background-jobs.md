# Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job

> **Kategori:** Ruby on Rails 8 | **Level:** Intermediate | **Minggu 7:** Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job

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

## Summary

You have mastered Active Job and Rails 8 Solid Queue. Level 2 complete! Level 3 covers Solid Cache, Native Auth, and our Workspace Capstone.
