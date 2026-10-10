# Background Jobs & Sidekiq

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 10:** Background Jobs & Sidekiq

## Learning Objectives

- Active Job: framework-agnostic job interface
- Sidekiq: Redis-backed job processing
- Dispatch: perform_later, perform_now, set options
- Job chaining: multiple jobs in sequence
- Error handling: retry_on, discard_on

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
puts "    Rails.logger.info "Email sent to #{user.email}""
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
puts "=== Job Chaining ==="
puts "class OnboardingFlow"
puts "  def self.start(user)"
puts "    SendWelcomeEmailJob.perform_later(user)"
puts "    SetupAccountJob.perform_later(user)"
puts "    NotifyAdminJob.perform_later(user)"
puts "  end"
puts "end"
puts ""
puts "=== Error Handling ==="
puts "class SendEmailJob < ApplicationJob"
puts "  retry_on StandardError, wait: :exponentially_longer, attempts: 3"
puts "  discard_on ActiveRecord::RecordNotFound"
puts "end"
puts ""
puts "=== Monitoring ==="
puts "Sidekiq Web UI: /sidekiq"
puts "Sidekiq::Queue.new.size"
puts "Sidekiq::RetrySet.new.size"

```

---

## Key Concepts

### Active Job
Interface for background jobs. Adapters: Sidekiq, Resque, Delayed Job.

### Sidekiq
Redis-based. Fast, efficient. `bundle exec sidekiq` starts worker.

### Dispatch
`perform_later` async, `perform_now` sync, `set(wait:)` delay.

### Chaining
Multiple jobs in sequence.

### Error Handling
`retry_on` retries with backoff. `discard_on` skips job.

### Monitoring
Sidekiq Web UI at `/sidekiq`. Monitor queues, retries, dead jobs.

---

## Experiments

- Create job and dispatch to Sidekiq
- Implement job with retry_on
- Try scheduled jobs with cron
- Create batch jobs
- Monitor jobs with Sidekiq Web UI

---

## Challenge

Build an email notification system: queue email sending, retry 3x on failure, batch send, monitor with Sidekiq.

---

## Summary

Week 10 of 12: **Background Jobs & Sidekiq** (Level: Advanced). Async processing. Next week: **Deployment**.
