# Associations & Relationships

> **Kategori:** Ruby on Rails | **Level:** Intermediate | **Minggu 6:** Associations & Relationships

## Learning Objectives

- belongs_to: model has foreign key
- has_many: model has many other records
- has_many :through: many-to-many with join model
- Eager loading: includes, eager_load, preload
- Nested resources: nested routes

---

## Program: Model Relations

```ruby
#!/usr/bin/env ruby
puts "=== Rails Associations ==="
puts ""
puts "=== One to Many (has_many / belongs_to) ==="
class User
  attr_accessor :name, :posts
  def initialize(name)
    @name = name
    @posts = []
  end
  def add_post(post)
    post.author = self
    @posts << post
  end
end
class Post
  attr_accessor :title, :author, :comments
  def initialize(title)
    @title = title
    @comments = []
  end
end
budi = User.new("Budi")
p1 = Post.new("First Post")
p2 = Post.new("Second Post")
budi.add_post(p1)
budi.add_post(p2)
puts "=== One to Many Simulation ==="
puts "#{budi.name}'s posts:"
budi.posts.each { |p| puts "  - #{p.title}" }
puts ""
puts "=== Many to Many (has_many :through) ==="
class Post2
  attr_accessor :title, :tags
  def initialize(title)
    @title = title
    @tags = []
  end
end
class Tag
  attr_accessor :name, :posts
  def initialize(name)
    @name = name
    @posts = []
  end
end
post = Post2.new("Rails Guide")
tag1 = Tag.new("Ruby")
tag2 = Tag.new("Rails")
post.tags << tag1
post.tags << tag2
tag1.posts << post
tag2.posts << post
puts "#{post.title} tags:"
post.tags.each { |t| puts "  - #{t.name}" }
puts ""
puts "=== Eager Loading ==="
puts "Post.includes(:author, :comments).all"
puts "Post.eager_load(:comments).where(comments: { approved: true })"
puts "Post.preload(:author).limit(10)"
puts ""
puts "=== Nested Resources ==="
puts "resources :posts do"
puts "  resources :comments"
puts "end"
puts "# /posts/1/comments, /posts/1/comments/new"
puts ""
puts "=== Delegates ==="
puts "class Comment < ApplicationRecord"
puts "  belongs_to :post"
puts "  delegate :author, to: :post"
puts "end"

```

---

## Key Concepts

### belongs_to
Model has foreign key. `belongs_to :user` - has `user_id`.

### has_many
Model has many records. `has_many :posts`.

### has_many :through
Many-to-many via join table.

### Eager Loading
`includes(:comments)` loads relation in 1-2 queries. Without = N+1.

### Nested Routes
`resources :posts do resources :comments end` -> `/posts/1/comments`.

---

## Experiments

- Create has_many/belongs_to relation
- Implement has_many :through
- Try eager loading vs lazy loading
- Create nested resources routes
- Implement polymorphic association

---

## Challenge

Create a blog with relations: User has_many Posts, Post has_many Comments, Post has_many Tags through Taggings.

---

## Summary

Week 6 of 12: **Associations & Relationships** (Level: Intermediate). ActiveRecord's power. Next week: **Testing**.
