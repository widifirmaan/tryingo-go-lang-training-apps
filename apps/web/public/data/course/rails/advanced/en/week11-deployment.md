# Deployment & DevOps

> **Kategori:** Ruby on Rails | **Level:** Advanced | **Minggu 11:** Deployment & DevOps
> **Prerequisites:** Week 10 — **Background Jobs & Sidekiq**.

## Learning Objectives

- Production checklist: env vars, database, assets
- Asset precompile: rails assets:precompile
- Deployment platforms: Heroku, Render, Fly.io, AWS
- Docker: containerize Rails app
- Monitoring: New Relic, Sentry, Lograge

---

## Why This Matters (Non-IT)

Local `localhost:3000` is laptop-only. Kamal/Docker + safe `RAILS_MASTER_KEY` secrets → public URL.

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
puts "COPY Gemfile* ./"
puts "RUN bundle install"
puts "COPY . ."
puts "RUN rails assets:precompile"
puts "CMD [\"rails\", \"server\", \"-b\", \"0.0.0.0\"]"
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
puts "Security headers: X-Frame-Options, X-Content-Type-Options"
```

---

## Key Concepts

### Production Checklist
Env vars, database, assets, SSL — all green before launch.

### Docker
Containerized Rails: ruby base, bundle install, precompile, serve.

### Monitoring
New Relic APM, Sentry errors, Lograge structured logs.

### Security
`force_ssl = true`. Security headers: X-Frame-Options, X-Content-Type-Options.

---

## Experiments

- Deploy to Heroku or Render
- Set up Docker for a Rails app
- Implement a CI/CD pipeline
- Set up monitoring with Sentry
- Try zero-downtime deployment

---

## Challenge

Deploy a Rails app to production: set up env vars, precompile assets, configure database, enable SSL, set up monitoring.
- **Link-up (Week 10 — Background Jobs & Sidekiq):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Beginner Friendly Explanation

### Analogy: Open Rails Branch
- **`localhost` = cart in front of the house**: only neighbors can buy.
- **Deploy = renting a shophouse**: `RAILS_ENV=production` + `assets:precompile` (packs showcase) + encrypted `credentials` (keys, NOT in git!) + Kamal/Docker delivers boxes. Monitoring (Sentry) = shophouse CCTV!

### Step 0 — Prepare Device
- Same as Rails W1: `rails server` on `3000` (+ `redis` for W10).

### How the Computer Reads It
- `kamal deploy` / Docker build; encrypted `credentials`, never in git!

### 3 Must-Know Terms
- 1. **Kamal/credentials**: open/encrypted-keys

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11 of 12: **Deployment & DevOps** (Level: Advanced). Go live! Next: **Capstone Project**!
