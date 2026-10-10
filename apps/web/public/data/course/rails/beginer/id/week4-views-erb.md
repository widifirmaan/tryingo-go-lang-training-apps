# Views & ERB Templates

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 4:** Views & ERB Templates

## Tujuan Pembelajaran

- ERB: <%= %> untuk output, <% %> untuk logic
- Partials: render reusable template components
- Layouts: application.html.erb sebagai master template
- Form helpers: form_with, text_field, submit
- Path helpers: post_path, posts_path, edit_post_path

---

## Program: Template Engine

```ruby
#!/usr/bin/env ruby
puts "=== Rails Views (ERB) ==="
puts ""
puts "=== ERB Syntax ==="
posts = [
  {id: 1, title: "First Post", body: "Hello Rails"},
  {id: 2, title: "Second Post", body: "MVC is great"},
  {id: 3, title: "Third Post", body: "ERB templates"},
]
puts "=== Loop with each ==="
puts "<% @posts.each do |post| %>"
posts.each do |post|
  puts "  <h2>#{post[:title]}</h2>"
  puts "  <p>#{post[:body]}</p>"
end
puts "<% end %>"
puts ""
puts "=== If/Else ==="
posts.each do |post|
  status = post[:id] == 1 ? "active" : "inactive"
  puts "  #{post[:title]}: #{status}"
end
puts ""
puts "=== Link & Path Helpers ==="
puts "<%= link_to 'Show', post_path(post) %>"
puts "<%= link_to 'Edit', edit_post_path(post) %>"
puts "<%= link_to 'Delete', post_path(post), method: :delete %>"
puts "<%= link_to 'Back', posts_path %>"
puts ""
puts "=== Form Helpers ==="
puts "<%= form_with model: @post do |f| %>"
puts "  <%= f.label :title %>"
puts "  <%= f.text_field :title %>"
puts "  <%= f.label :body %>"
puts "  <%= f.text_area :body %>"
puts "  <%= f.submit 'Save' %>"
puts "<% end %>"
puts ""
puts "=== Layout & Partials ==="
puts "<!-- app/views/layouts/application.html.erb -->"
puts "<html>"
puts "  <head><title><%= yield :title %></title></head>"
puts "  <body>"
puts "    <%= render 'shared/header' %>"
puts "    <%= yield %>"
puts "    <%= render 'shared/footer' %>"
puts "  </body>"
puts "</html>"
puts ""
puts "=== Render Partial ==="
puts "<%= render @posts %>"
puts "=> renders _post.html.erb for each post"
puts ""
puts "=== Instance Variables ==="
puts "Controller: @posts = Post.all"
puts "View: <% @posts.each do |post| %>"

```

---

## Konsep Kunci

### ERB Tags
`<%= %>` output, `<% %>` logic only. `<%# %>` comment.

### Partials
`<%= render 'shared/header' %>` - render partial file `_header.html.erb`.

### Layout
`application.html.erb` - master template. `yield` untuk content.

### Form Helpers
`form_with model: @post` - auto-detect create/edit. `f.text_field`, `f.submit`.

### Path Helpers
`posts_path` -> /posts, `post_path(post)` -> /posts/1, `edit_post_path(post)` -> /posts/1/edit.

---

## Eksperimen

- Buat view dengan loop each dan conditional
- Buat partial untuk post card
- Implementasikan form_with untuk create/edit
- Buat custom layout untuk admin
- Coba content_for untuk custom section

---

## Tantangan

Buat view lengkap untuk blog: layout, partial header/footer, list posts dengan each, form create post.

---

## Ringkasan

Minggu 4 dari 12: **Views & ERB Templates** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Authentication** (Intermediate).
