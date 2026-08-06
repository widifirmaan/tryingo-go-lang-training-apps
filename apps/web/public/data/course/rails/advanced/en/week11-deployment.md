# Deployment & DevOps

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 11:** Deployment & DevOps

## Learning Objectives

- Production checklist: env vars, database, assets
- Asset precompile: rails assets:precompile
- Deployment platforms: Heroku, Render, Fly.io, AWS
- Docker: containerize Rails app
- Monitoring: New Relic, Sentry, Lograge

---

## Program: Production Deploy

```ruby
#!/usr/bin/env ruby
puts "=== Rails Deployment ==="
puts ""
puts "=== Production Checklist ==="
puts "1. RAILS_ENV=production"
puts "2. SECRET_KEY_BASE set"
puts "3. Database configured"
puts "4. Asset precompile"
puts "5. SSL/TLS enabled"
puts ""
puts "=== Environment Variables ==="
puts "RAILS_ENV=production"
puts "RAILS_MASTER_KEY=xxx"
puts "DATABASE_URL=postgresql://user:pass@host/db"
puts "REDIS_URL=redis://localhost:6379"
puts "SECRET_KEY_BASE=xxx"
puts ""
puts "=== Asset Precompile ==="
puts "rails assets:precompile"
puts "RAILS_ENV=production rails assets:precompile"
puts ""
puts "=== Database ==="
puts "rails db:migrate RAILS_ENV=production"
puts "rails db:seed RAILS_ENV=production"
puts ""
puts "=== Deployment Platforms ==="
platforms = [
  "Heroku: git push heroku main",
  "Render: auto-deploy from GitHub",
  "Fly.io: fly launch",
  "AWS: EC2, ECS, Elastic Beanstalk",
  "DigitalOcean: App Platform",
]
platforms.each { |p| puts "  - #{p}" }
puts ""
puts "=== Docker ==="
puts "FROM ruby:3.2"
puts "RUN apt-get update && apt-get install -y nodejs postgresql-client"
puts "WORKDIR /app"
puts "COPY Gemfile* .⁄"
puts "RUN bundle install"
puts "COPY . ."
puts "RUN rails assets:precompile"
puts "CMD ["rails", "server", "-b", "0.0.0.0"]"
puts ""
puts "=== Capistrano ==="
puts "gem 'capistrano', group: :development"
puts "cap production deploy"
puts ""
puts "=== Monitoring ==="
puts "New Relic: APM"
puts "Sentry: Error tracking"
puts "Lograge: Structured logging"
puts "Skylight: Rails performance"
puts ""
puts "=== Security ==="
puts "force_ssl = true"
puts "config.action_dispatch.default_headers = {"
puts "  'X-Frame-Options' => 'DENY',"
puts "  'X-Content-Type-Options' => 'nosniff',"
puts "}"

```

---

## Key Concepts

### Production Checklist
Set env vars, configure DB, precompile assets, enable SSL.

### Asset Precompile
`rails assets:precompile` compiles CSS/JS for production.

### Platforms
Heroku: `git push heroku main`. Render: auto-deploy. Fly.io: `fly launch`.

### Docker
Containerize app. Multi-stage builds optimize image size.

### Monitoring
New Relic: APM. Sentry: error tracking. Lograge: structured logs.

### Security
`force_ssl = true`. Security headers: X-Frame-Options, X-Content-Type-Options.

---

## Experiments

- Deploy to Heroku or Render
- Setup Docker for Rails app
- Implement CI/CD pipeline
- Setup monitoring with Sentry
- Try zero-downtime deployment

---

## Challenge

Deploy Rails app to production: setup env vars, precompile assets, configure database, enable SSL, setup monitoring.

---

## Summary

Week 11 of 12: **Deployment & DevOps** (Level: Advanced). Go live! Next week: **Capstone Project**!
