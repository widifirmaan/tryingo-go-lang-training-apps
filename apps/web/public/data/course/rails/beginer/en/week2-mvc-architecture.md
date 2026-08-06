# MVC Architecture

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 2:** MVC Architecture

## Learning Objectives

- MVC pattern: Model (data), View (UI), Controller (logic)
- Routes: resources :posts for RESTful routing
- Controller: action methods (index, show, new, create)
- Model: ActiveRecord pattern, query methods
- View: ERB templates with instance variables

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

## Key Concepts

### MVC Pattern
- Model: data & business logic
- View: presentation layer (ERB)
- Controller: handle request, coordinate M & V

### Routes
`resources :posts` generates 7 RESTful routes.

### Controller
Actions: `index`, `show`, `new`, `create`, `edit`, `update`, `destroy`.

### Model
ActiveRecord: `Post.all`, `Post.find(id)`, `Post.where(...)`.

### View
`<%= @post.title %>` - ERB tags. Instance variables from controller.

---

## Experiments

- Create controller with scaffold
- Study routes with rails routes
- Create custom action in controller
- Try params in controller
- Create view with instance variables

---

## Challenge

Create CRUD posts: scaffold or manual. Routes, controller actions, model, views. Deploy to local.

---

## Summary

Week 2 of 12: **MVC Architecture** (Level: Beginner). Heart of Rails. Next week: **Migrations & Database**.
