# Performance Optimization

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 9:** Performance Optimization

## Learning Objectives

- N+1 queries: detect and solve with eager loading
- Bullet gem: auto-detect N+1 and unused eager loading
- Database indexing: add_index for fast queries
- Caching: fragment, Russian doll, low-level caching
- Background jobs: perform_later for async processing

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
puts "# Russian doll caching"
puts "<% cache @posts do %>"
puts "  <%= render @posts %>"
puts "<% end %>"
puts ""
puts "# Low-level caching"
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
puts ""
puts "=== Pagination ==="
puts "# Gemfile: gem 'kaminari'"
puts "Post.page(1).per(10)"
puts "Post.order(:created_at).page(params[:page])"
puts ""
puts "=== Database Optimization ==="
puts "# EXPLAIN query"
puts "Post.where(user_id: 1).explain"
puts ""
puts "# Counter cache"
puts "belongs_to :user, counter_cache: true"
puts "# users.posts_count column"

```

---

## Key Concepts

### N+1 Problem
Loop with relations = N+1 queries. Solve: `includes(:author)`.

### Bullet
Auto-detects N+1, unused eager loading, missing counter cache.

### Indexing
`add_index :posts, :user_id` speeds up WHERE queries.

### Caching
Fragment: cache partials. Russian doll: nested cache. Low-level: `Rails.cache.fetch`.

### Background Jobs
`perform_later` enqueues jobs. Sidekiq/Resque for processing.

### Pagination
`kaminari` or `pagy` limits records per page.

---

## Experiments

- Detect N+1 with Bullet and solve
- Add index and benchmark query
- Implement fragment caching
- Create background job with Sidekiq
- Try pagination with kaminari

---

## Challenge

Optimize a blog: detect N+1, add indexes, implement caching, add pagination. Benchmark before/after.

---

## Summary

Week 9 of 12: **Performance Optimization** (Level: Advanced). Speed matters. Next week: **Background Jobs**.
