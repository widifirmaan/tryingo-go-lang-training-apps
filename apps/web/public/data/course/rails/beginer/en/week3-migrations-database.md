# Migrations — Safe Rails Rack Blueprints

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 3:** Migrations & Database

## Learning Objectives

- `rails generate migration AddCategoryToProducts category:string` writes blueprints, `rails db:migrate` builds, `rails db:rollback` cancels (source: guides.rubyonrails.org/active_record_migrations)
- `rails db:migrate:status` checks, `schema.rb` latest rack photo

---

## Why This Matters (Non-IT)

Adding a `category` column via direct production SQL → 10,000 rows could vanish on mistakes. With migrations, changes are recorded + `rollback`-able — like `git` for databases.

---

## Program: Safe Column Add

```bash
# 1. Write blueprint
rails generate migration AddCategoryToProducts category:string
# → db/migrate/20260825000000_add_category_to_products.rb:
#    def change
#      add_column :products, :category, :string
#    end

# 2. Check status (up = ran, down = pending)
rails db:migrate:status

# 3. Build
rails db:migrate

# 4. Model auto-gains category (no model edit!)
rails console
>> Product.column_names
>> p = Product.first
>> p.update(category: "Staples")

# 5. Cancel when wrong
rails db:rollback  # removes column again
rails db:migrate   # rebuilds
```

---

## Key Concepts

### `generate migration` + `migrate` + `rollback` = Write/Build/Cancel
- `generate` writes `db/migrate/xxx_...rb` files.
- `migrate` runs `down` ones.
- `rollback` cancels the last.

### `schema.rb` = Rack Photo
Auto-updated every `migrate` — never hand-edit.

---

## Beginner Friendly Explanation

### Analogy: Shop Renovation with Blueprints
- **Migration = renovation drawing**: "add category rack".
- **migrate = builder builds**, **rollback = demolish again**.

### Step 0 — Prepare Device
- Same as W1: `rails db:migrate:status` ensures all `up` first.

### How the Computer Reads It
1. `rails db:migrate` → finds `down` files → runs `change` → records in `schema_migrations`.
2. `rollback` → runs reverse of `change` (drops column).

### 3 Must-Know Terms
1. **Migration**: DB blueprint
2. **migrate/rollback**: build/cancel
3. **schema.rb**: latest photo

---

## Experiments

- **Green:** `rails generate migration AddStockToProducts stock:integer` → `migrate` → `Product.column_names` has `stock`?
- **Yellow:** `rails db:migrate:status` → all `up`?
- **Red:** Hand-edit `schema.rb` → `migrate` overwrites? (Never hand-edit!)

---

## Challenge

**Shop Renovation:** `AddDiscountToProducts discount:integer` (default 0 via `change` + `add_column :products, :discount, :integer, default: 0`) → `migrate` → `update` 1 product → `rollback` → verify gone → `migrate` again.

---

## Mini Glossary

- **migration/migrate/rollback**: blueprint/build/cancel
- **schema.rb**: rack photo

---

## Summary

Week 3 of 4: **Safe Blueprints** (Level: Beginner). Change racks fearlessly. Next: **ERB Views** — real showcase.
