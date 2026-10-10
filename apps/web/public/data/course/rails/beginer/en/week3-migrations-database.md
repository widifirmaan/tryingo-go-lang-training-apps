# Migrations & Database

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 3:** Migrations & Database

## Learning Objectives

- Migrations: create_table, add_column, remove_column
- Rails generate migration: naming conventions
- Schema: db/schema.rb as database snapshot
- Seeds: populate initial data with db/seeds.rb
- Model validations: validates :title, presence: true

---

## Program: Database Schema

```ruby
#!/usr/bin/env ruby
puts "=== Rails Migrations ==="
puts ""
puts "=== Generate Migration ==="
puts "rails generate migration CreatePosts title:string body:text"
puts "rails generate migration AddAuthorToPosts author:string"
puts "rails db:migrate"
puts ""
puts "=== Migration Class ==="
class CreatePosts < Struct.new(:migrate)
  def up
    puts "  create_table :posts do |t|"
    puts "    t.string :title"
    puts "    t.text :body"
    puts "    t.references :user, foreign_key: true"
    puts "    t.timestamps  # created_at, updated_at"
    puts "  end"
  end
  def down
    puts "  drop_table :posts"
  end
end
migration = CreatePosts.new(nil)
migration.up
migration.down
puts ""
puts "=== Schema (db/schema.rb) ==="
puts "ActiveRecord::Schema.define(version: 1) do"
puts "  create_table 'posts', force: :cascade do |t|"
puts "    t.string 'title'"
puts "    t.text 'body'"
puts "    t.datetime 'created_at', null: false"
puts "    t.datetime 'updated_at', null: false"
puts "  end"
puts "end"
puts ""
puts "=== Seeds (db/seeds.rb) ==="
posts = [
  {title: "First Post", body: "Hello Rails", author: "Budi"},
  {title: "Second Post", body: "MVC is great", author: "Siti"},
  {title: "Third Post", body: "ActiveRecord", author: "Andi"},
]
posts.each_with_index do |p, i|
  puts "Post.create(title: '#{p[:title]}', body: '#{p[:body]}')"
end
puts "rails db:seed"
puts ""
puts "=== Model with Validation ==="
class Post
  attr_accessor :title, :body, :author
  def initialize(attrs = {})
    @title = attrs[:title]
    @body = attrs[:body]
    @author = attrs[:author]
  end
  def valid?
    @title && !@title.empty? && @body && !@body.empty?
  end
end
p1 = Post.new({title: "Valid", body: "Content"})
p2 = Post.new({title: "", body: "No title"})
puts "Valid post: #{p1.valid?}"
puts "Invalid post: #{p2.valid?}"

```

---

## Key Concepts

### Migrations
Version control for databases. `create_table`, `add_column`.

### Generate
`rails g migration CreatePosts title:string` - auto-generates.

### Schema
`db/schema.rb` - current snapshot. `rails db:schema:load` for new setup.

### Seeds
`db/seeds.rb` - populate data. `rails db:seed`.

### Validations
`validates :title, presence: true, length: { minimum: 3 }`.

### Commands
`rails db:migrate`, `db:rollback`, `db:reset`.

---

## Experiments

- Create migration for posts, comments, users
- Add and remove column with migration
- Create seeder with 10 records
- Implement model validation
- Try migration rollback

---

## Challenge

Create complete migration: users, posts, comments. Models with validation. Seeder with dummy data.

---

## Summary

Week 3 of 12: **Migrations & Database** (Level: Beginner). Data layer of Rails. Next week: **Views & ERB**.
