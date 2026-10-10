# Rails API Mode

> **Kategori:** Ruby on Rails | **Level:** Intermediate | **Minggu 8:** Rails API Mode

## Learning Objectives

- API mode: rails new --api to skip views
- Namespaced routes: api/v1/posts
- JSON responses: render json: with status codes
- Serializers: format JSON output
- CORS: cross-origin resource sharing

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
puts "render json: { errors: post.errors }, status: :unprocessable_entity"
puts "render json: { error: 'Not found' }, status: :not_found"
puts ""
puts "=== Serializers (ActiveModel::Serializer) ==="
puts "class PostSerializer < ActiveModel::Serializer"
puts "  attributes :id, :title, :body, :created_at"
puts "  belongs_to :user"
puts "  has_many :comments"
puts "end"
puts ""
puts "=== CORS ==="
puts "# Gemfile: gem 'rack-cors'"
puts "config.middleware.insert_before 0, Rack::Cors do"
puts "  allow do"
puts "    origins '*'"
puts "    resource '*', headers: :any, methods: [:get, :post, :put, :delete]"
puts "  end"
puts "end"
puts ""
puts "=== API Authentication ==="
puts "# Token-based"
puts "before_action :authenticate_user!"
puts "token = request.headers['Authorization']"

```

---

## Key Concepts

### API Mode
`rails new name --api` - skips views, assets, cookies.

### Namespaced Routes
`namespace :api do namespace :v1 do resources :posts end end`.

### JSON Response
`render json: posts, status: :ok`. Status: :ok (200), :created (201).

### Serializers
`ActiveModel::Serializer` or `blueprinter` for JSON formatting.

### CORS
`rack-cors` gem allows cross-origin requests.

### Auth
Token-based: `Authorization: Bearer <token>` header.

---

## Experiments

- Create API project with --api flag
- Implement namespaced routes
- Create serializer for Post model
- Try API versioning
- Implement JWT authentication

---

## Challenge

Build a complete REST API for a blog: CRUD posts, comments, auth with JWT, serializers, CORS.

---

## Summary

Week 8 of 12: **Rails API Mode** (Level: Intermediate). Intermediate phase complete! Next week: **Performance** (Advanced).
