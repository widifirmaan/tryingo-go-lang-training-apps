# Associations & Relationships

> **Kategori:** Ruby on Rails | **Level:** Menengah | **Minggu 6:** Associations & Relationships

## Tujuan Pembelajaran

- belongs_to: model memiliki foreign key
- has_many: model memiliki banyak record lain
- has_many :through: many-to-many dengan join model
- Eager loading: includes, eager_load, preload
- Nested resources: routes bersarang

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

## Konsep Kunci

### belongs_to
Model memiliki foreign key. `belongs_to :user` - punya `user_id`.

### has_many
Model memiliki banyak record. `has_many :posts` - user punya banyak post.

### has_many :through
Many-to-many via join table. `has_many :tags, through: :taggings`.

### Eager Loading
`includes(:comments)` - load relasi di 1-2 query. Tanpa ini = N+1 problem.

### Nested Routes
`resources :posts do resources :comments end` -> `/posts/1/comments`.

---

## Eksperimen

- Buat relasi has_many/belongs_to
- Implementasikan has_many :through
- Coba eager loading vs lazy loading
- Buat nested resources routes
- Implementasikan polymorphic association

---

## Tantangan

Buat blog dengan relasi: User has_many Posts, Post has_many Comments, Post has_many Tags through Taggings.

---

## Ringkasan

Minggu 6 dari 12: **Associations & Relationships** (Level: Menengah). Kekuatan ActiveRecord. Minggu depan: **Testing**.
