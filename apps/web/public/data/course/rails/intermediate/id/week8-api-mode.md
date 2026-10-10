# Rails API Mode

> **Kategori:** Ruby on Rails | **Level:** Menengah | **Minggu 8:** Rails API Mode

## Tujuan Pembelajaran

- API mode: rails new --api untuk skip views
- Namespaced routes: api/v1/posts
- JSON responses: render json: dengan status codes
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

## Konsep Kunci

### API Mode
`rails new name --api` - skip views, assets, cookies. Lighter stack.

### Namespaced Routes
`namespace :api do namespace :v1 do resources :posts end end` -> `/api/v1/posts`.

### JSON Response
`render json: posts, status: :ok`. Status: :ok (200), :created (201), :not_found (404).

### Serializers
`ActiveModel::Serializer` atau `blueprinter` untuk format JSON.

### CORS
`rack-cors` gem untuk allow cross-origin requests.

### Auth
Token-based: `Authorization: Bearer <token>` header.

---

## Eksperimen

- Buat API project dengan --api flag
- Implementasikan namespaced routes
- Buat serializer untuk Post model
- Coba API versioning
- Implementasikan JWT authentication

---

## Tantangan

Buat REST API lengkap untuk blog: CRUD posts, comments, auth dengan JWT, serializers, CORS.

---

## Ringkasan

Minggu 8 dari 12: **Rails API Mode** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Performance** (Advanced).
