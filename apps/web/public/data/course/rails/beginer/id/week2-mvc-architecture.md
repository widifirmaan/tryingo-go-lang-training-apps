# MVC Architecture

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 2:** MVC Architecture

## Tujuan Pembelajaran

- MVC pattern: Model (data), View (UI), Controller (logic)
- Routes: resources :posts untuk RESTful routing
- Controller: action methods (index, show, new, create)
- Model: ActiveRecord pattern, query methods
- View: ERB templates dengan instance variables

---

## Program: MVC in Action

```ruby
#!/usr/bin/env ruby
puts "=== Rails MVC Architecture ==="
puts ""
puts "=== Routes (config/routes.rb) ==="
puts "Rails.application.routes.draw do"
puts "  root 'posts#index'"
puts "  resources :posts"
puts "end"
puts ""
puts "=== Controller (app/controllers/posts_controller.rb) ==="
class PostsController
  def index
    @posts = Post.all
    puts "  Action: index, Found #{@posts.length} posts"
  end
  def show
    @post = Post.find(1)
    puts "  Action: show, Post: #{@post[:title]}"
  end
  def new
    @post = Post.new
    puts "  Action: new, Form ready"
  end
  def create
    @post = Post.new({title: "New Post", body: "Content"})
    puts "  Action: create, Title: #{@post[:title]}"
  end
end
puts "=== Model (app/models/post.rb) ==="
class Post
  attr_accessor :title, :body
  def initialize(attrs = {})
    @title = attrs[:title]
    @body = attrs[:body]
  end
  def self.all
    [
      {id: 1, title: "First Post", body: "Hello Rails"},
      {id: 2, title: "Second Post", body: "MVC is great"},
    ]
  end
  def self.find(id)
    {id: id, title: "Post ##{id}", body: "Content"}
  end
end
puts "=== MVC Flow Simulation ==="
puts "1. Request: GET /posts"
puts "2. Router: routes to PostsController#index"
puts "3. Controller: fetches Post.all from Model"
puts "4. Model: returns data to Controller"
puts "5. Controller: passes @posts to View"
puts "6. View: renders HTML with posts"
puts ""
controller = PostsController.new
controller.index
controller.show
controller.new
controller.create

```

---

## Konsep Kunci

### MVC Pattern
- Model: data & business logic
- View: presentation layer (ERB)
- Controller: handle request, coordinate M & V

### Routes
`resources :posts` generate 7 RESTful routes.

### Controller
Actions: `index`, `show`, `new`, `create`, `edit`, `update`, `destroy`.

### Model
ActiveRecord: `Post.all`, `Post.find(id)`, `Post.where(...)`.

### View
`<%= @post.title %>` - ERB tags. Instance variables dari controller.

---

## Eksperimen

- Buat controller dengan scaffold
- Jelajari routes dengan rails routes
- Buat custom action di controller
- Coba params di controller
- Buat view dengan instance variables

---

## Tantangan

Buat CRUD posts: scaffold atau manual. Routes, controller actions, model, views. Deploy ke local.

---

## Ringkasan

Minggu 2 dari 12: **MVC Architecture** (Level: Pemula). Heart of Rails. Minggu depan: **Migrations & Database**.
