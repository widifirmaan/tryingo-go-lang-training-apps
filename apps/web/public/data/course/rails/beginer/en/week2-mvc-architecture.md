# MVC — Rails Kitchen, Waiter, Showcase

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 2:** MVC Architecture
> **Prerequisites:** Week 1 — **Rails Setup**.

## Learning Objectives

- Split `Model` (data kitchen, `app/models/product.rb`), `View` (showcase, `index.html.erb`), `Controller` (waiter) — official Rails MVC pattern (source: guides.rubyonrails.org/getting_started)
- `validates :name, presence: true` rejects blanks, `<%= %>` displays, `form_with` forms

---

## Why This Matters (Non-IT)

Without MVC, 1 file mixes SQL + HTML + logic 500 lines — price edits fear breaking display. With MVC, kitchen (Model), waiter (Controller), showcase (View) separate — 20 lines each, safe to edit.

---

## Program: Rails MVC Shop

```ruby
# model: app/models/product.rb — kitchen (data rules)
class Product < ApplicationRecord
  validates :name, presence: true
  validates :price, numericality: { greater_than: 0 }
end

# controller: app/controllers/products_controller.rb — waiter
class ProductsController < ApplicationController
  def index
    @products = Product.all
    @product = Product.new
  end

  def create
    @product = Product.new(params.require(:product).permit(:name, :price))
    if @product.save
      redirect_to products_path
    else
      @products = Product.all
      render :index
    end
  end
end
```

```erb
<!-- view: app/views/products/index.html.erb — showcase -->
<h1>Catalog</h1>
<% @products.each do |p| %>
  <div><%= p.name %> - Rp<%= p.price %></div>
<% end %>
<%= form_with model: @product do |f| %>
  <%= f.text_field :name, placeholder: "Name" %>
  <%= f.number_field :price, placeholder: "Price" %>
  <%= f.submit "Add" %>
<% end %>
```

---

## Key Concepts

### Model = Kitchen + Rules
`validates :name, presence: true` rejects blanks before saving.

### Controller = Waiter
`index` fetches `@products`, `create` saves + `redirect` or re-`render` on failure.

### View `<%= %>` = Showcase
`<%= p.name %>` displays (auto XSS-safe), `form_with` model-connected form.

---

## Beginner Friendly Explanation

### Analogy: 3-Room Restaurant
- **Model = kitchen**: cooks + tastes (`validates`).
- **Controller = waiter**: delivers orders kitchen ↔ table.
- **View = table + showcase**: displays.

### Step 0 — Prepare Device
- Same as W1: `rails server` on `3000`, `rails generate scaffold` done (or hand-make 3 files).

### How the Computer Reads It
1. `GET /products` → routes → `index` → `@products = Product.all` → `index.html.erb`.
2. Submit form → `POST /products` → `create` → `save` passes? `redirect` : `render :index` + errors.

### 3 Must-Know Terms
1. **MVC**: kitchen/waiter/showcase
2. **validates**: kitchen rules
3. **form_with**: connected form

---

## Experiments

- **Green:** Submit blank name → fails + error? Fill → redirect?
- **Yellow:** `validates :price, numericality: { greater_than: 0 }` → price -5 rejected?
- **Red:** Remove `permit(:price)` → price unsaved (strong params)? Reattach.

---

## Challenge

**Complete MVC Shop:** `Customer(name, email)` + `validates :email, uniqueness: true` + `index/create` + `index.html.erb` list + form. Duplicate email submit → error?
- **Link-up (Week 1 — Rails Setup):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Model/View/Controller**: kitchen/showcase/waiter
- **validates/permit**: rules/permit
- **redirect/render**: move/show

---

## Summary

Week 2 of 4: **MVC Split** (Level: Beginner). Kitchen/waiter/showcase separated. Next: **Migrations**.
