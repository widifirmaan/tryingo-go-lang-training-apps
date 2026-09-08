# Performance Optimization

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 9:** Performance Optimization

## Learning Objectives

- N+1 queries: detect and solve with eager loading
- Bullet gem: auto-detect N+1 and unused eager loading
- Database indexing: add_index for fast queries
- Caching: fragment, Russian doll, low-level caching
- Background jobs: perform_later for async processing

---

## Why This Matters (Non-IT)

1000 products without `includes` = 1001 queries (10 seconds). With eager loading + `counter_cache` + index = 0.1 seconds.

---

## Program: Optimization

```ruby
#!/usr/bin/env ruby
puts "=== Rails Performance Optimization ==="
puts ""
puts "=== N+1 Query Problem ==="
puts "# Bad: N+1 queries"
puts "Post.all.each { |p| puts p.author.name }  # N+1 queries"
puts ""
puts "# Good: Eager loading"
puts "Post.includes(:author).each { |p| puts p.author.name }  # 2 queries"
puts ""
puts "=== Bullet Gem ==="
puts "gem 'bullet', group: :development"
puts "Bullet.enable = true"
puts "Bullet.alert = true"
puts "Bullet.add_footer = true"
puts ""
puts "=== Database Indexing ==="
puts "add_index :posts, :user_id"
puts "add_index :posts, :created_at"
puts "add_index :posts, [:user_id, :created_at]"
puts "add_index :users, :email, unique: true"
puts ""
puts "=== Caching ==="
puts "# Fragment caching"
puts "<% cache post do %>"
puts "  <%= post.title %>"
puts "<% end %>"
puts ""
puts "=== Pagination ==="
puts "# Gemfile: gem 'kaminari'"
puts "Post.page(1).per(10)"
puts "Post.order(:created_at).page(params[:page])"
puts ""
puts "=== Russian Doll Caching ==="
puts "<% cache @posts do %>"
puts "  <%= render @posts %>"
puts "<% end %>"
puts ""
puts "=== Low-Level Caching ==="
puts "Rails.cache.fetch('recent_posts', expires_in: 1.hour) do"
puts "  Post.recent.to_a"
puts "end"
puts ""
puts "=== Background Jobs ==="
puts "class SendEmailJob < ApplicationJob"
puts "  queue_as :default"
puts "  def perform(user)"
puts "    UserMailer.welcome(user).deliver_now"
puts "  end"
puts "end"
puts "SendEmailJob.perform_later(user)"
```

---

## Key Concepts

### Eager Loading
`includes(:author)` - preload associations. Solves N+1.

### Bullet
Auto-detect N+1 in development with footer alerts.

### Indexing
`add_index :posts, :user_id` - speeds up WHERE queries. Unique index for uniqueness.

### Caching
Fragment: caches partials. Russian doll: nested cache. Low-level: `Rails.cache.fetch`.

### Background Jobs
`perform_later` - enqueues jobs. Sidekiq/Resque for processing.

### Pagination
`kaminari` or `pagy` - limits records per page.

---

## Experiments

- Detect N+1 with Bullet and solve it
- Add an index and benchmark the query
- Implement fragment caching
- Build a background job with Sidekiq
- Try pagination with kaminari

---

## Challenge

Optimize a blog: detect N+1, add indexes, implement caching, add pagination. Benchmark before/after.


---

## Beginner Friendly Explanation

### Analogy: Speedy Rails Shop
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Rails W1: `rails server` on `3000` (+ `redis` for W10).

### How the Computer Reads It
- `includes` 2 queries; `counter_cache` counts without queries; `EXPLAIN` checks.

### 3 Must-Know Terms
- 1. **includes/counter_cache**: bulk/counter

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9 of 12: **Performance Optimization** (Level: Advanced). Speed matters. Next: **Background Jobs**.
