# Associations — Ropes Between Rails Racks

> **Kategori:** Ruby on Rails | **Level:** Intermediate | **Minggu 6:** Associations

## Learning Objectives

- `has_many`, `belongs_to`, `has_many :through` — ropes

---

## Why This Matters (Non-IT)

Without ropes, `order.customer` = manual query + slow N+1. With `has_many/belongs_to`, 1 line + `includes` anti-N+1.

---

## Program

```ruby
class Customer < ApplicationRecord
  has_many :orders
  has_many :products, through: :orders
end
class Order < ApplicationRecord
  belongs_to :customer
  belongs_to :product
end

customer.orders.count
product.orders.map(&:customer)
```


---

## Beginner Friendly Explanation

### Analogy: Ropes Between Racks
- **`has_many`/`belongs_to` = two-way ropes**: customers pull their `orders`, orders know their `customer` — no hand-written JOIN SQL.
- **`includes` = group haul**: without it 1 + N queries (101x to DB!). `has_many :through` = relay ropes (customer → order → product).

### Step 0 — Prepare Device
- Same as Rails W1: `rails server` on `3000` (+ `redis` for W10).

### How the Computer Reads It
- `customer.orders` auto-`WHERE customer_id = ?`; `includes(:orders)` 2 queries (not 101).

### 3 Must-Know Terms
- 1. **has_many/belongs_to**: owns/belongs

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 6: **Rack Ropes** — associations. Next: **Testing**.
