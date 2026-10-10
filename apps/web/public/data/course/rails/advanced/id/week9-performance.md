# Performance Optimization

> **Kategori:** Ruby on Rails | **Level:** Lanjutan | **Minggu 9:** Performance Optimization

## Tujuan Pembelajaran

- N+1 queries: detect dan solve dengan eager loading
- Bullet gem: auto-detect N+1 dan unused eager loading
- Database indexing: add_index untuk query cepat
- Caching: fragment, Russian doll, low-level caching
- Background jobs: perform_later untuk async processing

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

## Konsep Kunci

### N+1 Problem
Loop dengan relasi = N+1 query. Solve: `includes(:author)`.

### Bullet
Auto-detect N+1, unused eager loading, missing counter cache.

### Indexing
`add_index :posts, :user_id` - speed up WHERE queries. Unique index untuk uniqueness.

### Caching
Fragment: cache partial. Russian doll: nested cache. Low-level: `Rails.cache.fetch`.

### Background Jobs
`perform_later` - enqueue job. Sidekiq/Resque untuk processing.

### Pagination
`kaminari` atau `pagy` - limit records per page.

---

## Eksperimen

- Detect N+1 dengan Bullet dan solve
- Add index dan benchmark query
- Implementasikan fragment caching
- Buat background job dengan Sidekiq
- Coba pagination dengan kaminari

---

## Tantangan

Optimasi blog: detect N+1, add indexes, implement caching, add pagination. Benchmark before/after.

---

## Ringkasan

Minggu 9 dari 12: **Performance Optimization** (Level: Lanjutan). Speed matters. Minggu depan: **Background Jobs**.
