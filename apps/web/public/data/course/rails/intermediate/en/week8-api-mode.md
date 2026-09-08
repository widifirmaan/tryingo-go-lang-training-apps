# Rails API Mode

> **Kategori:** Ruby on Rails | **Level:** Intermediate | **Minggu 8:** Rails API Mode

## Learning Objectives

- API mode: rails new --api to skip views
- Namespaced routes: api/v1/posts
- JSON responses: render json: with status codes
- Serializers: format JSON output
- CORS: cross-origin resource sharing

---

## Why This Matters (Non-IT)

Phones need JSON, not HTML. `rails new --api` is slim (no views) + `jbuilder`/serializers for neat JSON.

---

## Program: REST API

```ruby
#!/usr/bin/env ruby
puts "=== Rails API Mode ==="
puts ""
puts "=== Create API Project ==="
puts "rails new my_api --api"
puts "# --api: skip views, skip assets, API-only middleware"
puts ""
puts "=== Routes ==="
puts "Rails.application.routes.draw do"
puts "  namespace :api do"
puts "    namespace :v1 do"
puts "      resources :posts, except: [:new, :edit]"
puts "    end"
puts "  end"
puts "end"
puts ""
puts "=== API Controller ==="
class Api::V1::PostsController
  def index
    posts = [
      {id: 1, title: "First Post", body: "Hello"},
      {id: 2, title: "Second Post", body: "API"},
    ]
    puts "GET /api/v1/posts"
    posts.each { |p| puts "  #{p[:id]}: #{p[:title]}" }
  end
  def show
    puts "GET /api/v1/posts/1"
    puts "  {id: 1, title: 'First Post', body: 'Hello'}"
  end
  def create
    puts "POST /api/v1/posts"
    puts "  {id: 3, title: 'New Post', body: 'Created'}"
  end
end
controller = Api::V1::PostsController.new
controller.index
controller.show
controller.create
puts ""
puts "=== JSON Response ==="
puts "render json: posts, status: :ok"
puts ""
puts "=== Serializers ==="
puts "ActiveModel::Serializer or blueprinter for JSON format"
puts ""
puts "=== CORS ==="
puts "rack-cors gem for cross-origin requests"
puts ""
puts "=== Auth ==="
puts "Token-based: Authorization: Bearer <token> header"
```

---

## Key Concepts

### API Mode
`rails new name --api` - skip views, assets, cookies. Lighter stack.

### Namespaced Routes
`namespace :api do namespace :v1 do resources :posts end end` -> `/api/v1/posts`.

### JSON Response
`render json: posts, status: :ok`. Status: :ok (200), :created (201), :not_found (404).

### Serializers
`ActiveModel::Serializer` or `blueprinter` for JSON format.

### CORS
`rack-cors` gem to allow cross-origin requests.

### Auth
Token-based: `Authorization: Bearer <token>` header.

---

## Experiments

- Build an API project with the --api flag
- Implement namespaced routes
- Build a serializer for the Post model
- Try API versioning
- Implement JWT authentication

---

## Challenge

Build a complete REST API for a blog: CRUD posts, comments, auth with JWT, serializers, CORS.


---

## Beginner Friendly Explanation

### Analogy: Rails JSON Drive-Thru
- **`--api` = shop without dining room**: drops views/assets/cookies → light for phones.
- **`namespace :api :v1` = version boards**: v1 keeps running even after v2 is born. Serializers = pretty wrapping (hide `password_digest`!), CORS = permits out-of-domain guests!

### Step 0 — Prepare Device
- Same as Rails W1: `rails server` on `3000` (+ `redis` for W10).

### How the Computer Reads It
- `--api` skips views/assets; controllers `render json:` directly.

### 3 Must-Know Terms
- 1. **--api/render-json**: slim/reply

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 8 of 12: **Rails API Mode** (Level: Intermediate). Intermediate phase done! Next: **Performance** (Advanced).
