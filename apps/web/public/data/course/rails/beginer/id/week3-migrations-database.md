# Migrations & Database

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 3:** Migrations & Database

## Tujuan Pembelajaran

- Migration: create_table, add_column, remove_column
- Rails generate migration: naming conventions
- Schema: db/schema.rb sebagai snapshot database
- Seeds: populasi data awal dengan db/seeds.rb
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

## Konsep Kunci

### Migration
Version control database. `create_table`, `add_column`, `rename_column`.

### Generate
`rails g migration CreatePosts title:string` - auto-generate timestamped migration.

### Schema
`db/schema.rb` - snapshot terkini. `rails db:schema:load` untuk setup baru.

### Seeds
`db/seeds.rb` - populate data. `rails db:seed`.

### Validations
`validates :title, presence: true, length: { minimum: 3 }`.

### Commands
`rails db:migrate`, `db:rollback`, `db:reset`

---

## Eksperimen

- Buat migration untuk posts, comments, users
- Tambah dan hapus column dengan migration
- Buat seeder dengan 10 data
- Implementasikan model validation
- Coba rollback migration

---

## Tantangan

Buat migration lengkap: users, posts, comments. Model dengan validasi. Seeder dengan data dummy.

---

## Ringkasan

Minggu 3 dari 12: **Migrations & Database** (Level: Pemula). Data layer Rails. Minggu depan: **Views & ERB**.
