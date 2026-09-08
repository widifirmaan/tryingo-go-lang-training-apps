# ERB Views — Real Rails Shop Showcase

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 4:** Views & ERB Templates

## Learning Objectives

- `<%= %>` displays (XSS-safe), `<% %>` logic, `<%# %>` comments (source: guides.rubyonrails.org/layouts_and_rendering)
- `render 'shared/header'` partial `_header.html.erb`, `layouts/application.html.erb` + `yield` frame
- `link_to`, `form_with`, `posts_path` path helpers

---

## Why This Matters (Non-IT)

Without partials/layouts, headers written in 10 files — changing the WA number edits 10x. Without `link_to`, hardcoded `/posts/1` URLs — route changes break all. Path helpers follow routes automatically.

---

## Program: Real Shop Showcase

```erb
<!-- app/views/layouts/application.html.erb — frame -->
<!DOCTYPE html>
<html lang="en">
<head><title>Shop</title></head>
<body>
  <%= render 'shared/header' %>
  <%= yield %>
  <%= render 'shared/footer' %>
</body>
</html>
```

```erb
<!-- app/views/shared/_header.html.erb — partial (underscore _) -->
<nav><%= link_to "Home", root_path %> | <%= link_to "Products", products_path %></nav>

<!-- app/views/products/index.html.erb — content -->
<h1>Catalog (<%= @products.count %> items)</h1>
<% @products.each do |p| %>
  <div>
    <%= link_to p.name, product_path(p) %> - Rp<%= p.price %>
    <%= link_to "Edit", edit_product_path(p) %>
  </div>
<% end %>

<%= form_with model: @product do |f| %>
  <%= f.label :name %> <%= f.text_field :name %>
  <%= f.label :price %> <%= f.number_field :price %>
  <%= f.submit "Add" %>
<% end %>
```

---

## Key Concepts

### `<%= %>` vs `<% %>` vs `<%# %>`
Display / logic / comment.

### Partial `_name.html.erb` + `render`
`render 'shared/header'` finds `_header.html.erb` — no underscore in `render`.

### Layout + `yield` = Frame
`application.html.erb` auto-wraps everything (except `layout false`).

### Path Helper = Automatic URLs
`products_path` → `/products`, `product_path(p)` → `/products/1` — follows `routes.rb`.

---

## Beginner Friendly Explanation

### Analogy: Modular Showcase
- **Layout = store frame**, **partial = header board** used by 10 pages, **yield = hole** for content.

### Step 0 — Prepare Device
- Same as W1: `rails server` on `3000`, `resources :products` routes present.

### How the Computer Reads It
1. `render 'shared/header'` → finds `_header.html.erb` → pastes.
2. `link_to "Edit", edit_product_path(p)` → asks routes → `/products/1/edit`.

### 3 Must-Know Terms
1. **ERB/partial/layout**: template/piece/frame
2. **link_to/path helper**: link/auto-URL
3. **form_with**: connected form

---

## Experiments

- **Green:** `<%= 2 + 3 %>` → 5? `<%# comment %>` → gone?
- **Yellow:** Swap `product_path(p)` for manual `/products/#{p.id}` → works but brittle?
- **Red:** `render 'shared/header'` without `_header` file → `Missing partial` error? Create it.

---

## Challenge

**Complete Showcase Shop:** `application.html.erb` + `_header` (nav `link_to`) + `index` (`each` + `link_to` show/edit + `form_with`) + `_product.html.erb` per-item partial (`render @products`). **Beginner Rails DONE!**

---

## Mini Glossary

- **ERB/partial/yield**: template/piece/hole
- **link_to/path**: link/URL

---

## Summary

Week 4 of 4: **Real Showcase** (Level: Beginner). **Beginner Rails DONE!** Next: **Authentication** (Intermediate).
