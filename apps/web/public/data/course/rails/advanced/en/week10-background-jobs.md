# Background Jobs & Sidekiq

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 10:** Background Jobs & Sidekiq
> **Prerequisites:** Week 9 — **Performance Optimization**.

## Learning Objectives

- Active Job: framework-agnostic job interface
- Sidekiq: Redis-backed job processing
- Dispatch: perform_later, perform_now, set options
- Job chaining: multiple jobs in sequence
- Error handling: retry_on, discard_on

---

## Why This Matters (Non-IT)

5-second WA sends in-request → customers wait on loading. With Sidekiq, save replies instantly, background WA.

---

## Program: Async Processing

```ruby
#!/usr/bin/env ruby
puts "=== Rails Background Jobs ==="
puts ""
puts "=== Active Job ==="
puts "class SendWelcomeEmailJob < ApplicationJob"
puts "  queue_as :default"
puts ""
puts "  def perform(user)"
puts "    UserMailer.welcome(user).deliver_now"
puts "    Rails.logger.info \"Email sent to #{user.email}\""
puts "  end"
puts "end"
puts ""
puts "=== Dispatch Jobs ==="
puts "SendWelcomeEmailJob.perform_later(user)    # Async"
puts "SendWelcomeEmailJob.perform_now(user)      # Sync"
puts "SendWelcomeEmailJob.set(wait: 5.minutes).perform_later(user)  # Delayed"
puts "SendWelcomeEmailJob.set(queue: :high).perform_later(user)     # Priority"
puts ""
puts "=== Sidekiq ==="
puts "gem 'sidekiq'"
puts "bundle exec sidekiq"
puts "config.active_job.queue_adapter = :sidekiq"
puts ""
puts "=== Sidekiq Worker ==="
puts "class ProcessImageWorker"
puts "  include Sidekiq::Worker"
puts ""
puts "  def perform(image_id)"
puts "    image = Image.find(image_id)"
puts "    image.process!"
puts "  end"
puts "end"
puts ""
puts "=== Job Simulation ==="
jobs = [
  {id: 1, name: "SendWelcomeEmail", status: "completed", duration: "0.5s"},
  {id: 2, name: "ProcessImage", status: "completed", duration: "2.3s"},
  {id: 3, name: "GenerateReport", status: "processing", duration: "..."},
  {id: 4, name: "CleanupOld", status: "queued", duration: "..."},
]
puts "ID | Job | Status | Duration"
puts "---|-----|--------|----------"
jobs.each do |j|
  puts "#{j[:id]} | #{j[:name]} | #{j[:status]} | #{j[:duration]}"
end
puts ""
puts "=== Error Handling ==="
puts "retry_on StandardError, wait: 5.seconds, attempts: 3"
puts "discard_on ActiveJob::DeserializationError"
puts ""
puts "=== Monitoring ==="
puts "Sidekiq Web UI at /sidekiq"
```

---

## Key Concepts

### Active Job
Framework-agnostic interface: `perform_later` vs `perform_now`.

### Dispatch
`perform_later` async, `perform_now` sync, `set(wait: 5.minutes)` delay.

### Chaining
Multiple jobs: `Job1.perform_later.then { Job2.perform_later }`.

### Error Handling
`retry_on` retries with backoff. `discard_on` skips jobs.

### Monitoring
Sidekiq Web UI at `/sidekiq`. Monitors queues, retries, dead jobs.

---

## Experiments

- Build a job and dispatch it to Sidekiq
- Implement a job with retry_on
- Try scheduled jobs with cron
- Build batch jobs
- Monitor jobs with the Sidekiq Web UI

---

### Bonus: Action Mailer — Automatic Newsletter (Action Mailer chapter, guides.rubyonrails.org!)

Jobs + email = mandatory pair (receipts sent in background!). Mailers look like controllers:

```ruby
# app/mailers/receipt_mailer.rb — postman
class ReceiptMailer < ApplicationMailer
  def receipt(user, total)
    @user, @total = user, total
    mail(to: user.email, subject: "Receipt Rp#{total}")
  end
end
```

```erb
<!-- app/views/receipt_mailer/receipt.html.erb — letter body -->
<h1>Hello <%= @user.name %>!</h1>
<p>Total: Rp<%= @total %>. Thank you.</p>
```

```ruby
# Send from a Job (never from controller — 5s loading!)
ReceiptMailer.receipt(user, 62000).deliver_later # queue via Sidekiq!
# deliver_now = send at once (wait). deliver_later = queue (fast)!
```

---

## Challenge

Build an email notification system: queue email sending, retry 3x on failure, batch send, monitor with Sidekiq.


---

## Beginner Friendly Explanation

### Analogy: Rails Motorbike Courier
- **Email in-request = cashier cooking + delivering 5 seconds**: customers stare blankly.
- **Sidekiq = courier fleet**: `perform_later` drops the package → replies instantly → couriers deliver via Redis. `retry_on` = retries when dropped, `discard_on` = discards when stale. `/sidekiq` Web UI = fleet monitor!

### Step 0 — Prepare Device
- Same as Rails W1: `rails server` on `3000` (+ `redis` for W10).

### How the Computer Reads It
- `perform_later` queues; workers take; `redis` as the queue.

### 3 Must-Know Terms
- 1. **Sidekiq/perform_later**: courier/queue

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 10 of 12: **Background Jobs & Sidekiq** (Level: Advanced). Async processing. Next: **Deployment**.
