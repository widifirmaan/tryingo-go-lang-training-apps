# Advanced Active Record: Complex Associations, Scopes & Enums

> **Kategori:** Ruby on Rails 8 | **Level:** Beginner | **Minggu 2:** Advanced Active Record: Complex Associations, Scopes & Enums
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Active Record: the software industry's most expressive and elegant ORM.
- Declare complex associations: `belongs_to :assignee, class_name: "User"` and `has_one :through`.
- Utilize modern Rails 8 `enum :status` syntax unlocking automated helpers (`task.status_completed!`).
- Construct chainable query scopes compiling down to optimized SQL clauses.

---

## Program: Team Task Management Model with Status Enums & Fast Query Scopes

```ruby
# app/models/task.rb
class Task < ApplicationRecord
  belongs_to :project
  belongs_to :assignee, class_name: "User", optional: true
  has_one :workspace, through: :project

  # Rails 7.1 / 8: Enum Tersintaksis Modern
  enum :status, {
    backlog: 0,
    in_progress: 1,
    in_review: 2,
    completed: 3
  }, default: :backlog, prefix: true

  enum :priority, {
    low: 0,
    medium: 1,
    high: 2,
    urgent: 3
  }, default: :medium

  # Active Record Validations
  validates :title, presence: true, length: { minimum: 3, maximum: 120 }
  validates :due_date, comparison: { greater_than_or_equal_to: -> { Date.current } }, allow_nil: true

  # Reusable Query Scopes (Kueri SQL Bersih & Rantaiable)
  scope :overdue, -> { where("due_date < ? AND status != ?", Date.current, statuses[:completed]) }
  scope :urgent_tasks, -> { where(priority: :urgent) }
  scope :assigned_to_user, ->(user_id) { where(assignee_id: user_id) }
  scope :recently_updated, -> { order(updated_at: :desc).limit(10) }

  # Business Methods
  def mark_as_done!
    status_completed! # Built-in method otomatis dari deklarasi enum!
    touch(:completed_at)
  end
end

puts "=== ACTIVE RECORD TASK MODEL WITH SCOPES & ENUMS CONFIGURED ==="
```

---

## Key Concepts

Rails Active Record remains the benchmark ORM paradigm that inspired frameworks across the global software industry (including Laravel Eloquent and Django ORM).

### Modern Rails 8 Enum Capabilities
Declaring `enum :status, { backlog: 0, in_progress: 1, completed: 3 }, prefix: true` synthesizes an array of domain methods automatically:
- Predicates: `task.status_completed?` (yielding booleans).
- State Bang Mutations: `task.status_in_progress!` (persisting transitions atomically).
- Built-in Scopes: `Task.status_completed` (compiling `SELECT * FROM tasks WHERE status = 3`).

### Chainable Scopes & Lazy Evaluation
Scopes encapsulate relational SQL predicates into composable methods:
`Task.urgent_tasks.overdue.assigned_to_user(current_user.id)`
Active Record employs **Lazy Evaluation**, chaining SQL WHERE clauses into a single compiled query dispatched only when view rendering begins.


---

---

## Beginner Friendly Explanation

Imagine an office wall task board holding 100 cards. Rather than manually inspecting each card to find overdue tasks, cards possess color-coded tags (Enums: Red = Urgent, Green = Done). Flipping a master switch (Scope: overdue) illuminates only cards that have breached their target deadlines.

## Experiments

- Test enum bang mutations like `task.status_completed!` in `bin/rails console`.
- Chain dual scopes `Task.urgent_tasks.recently_updated` and examine compiled SQL in terminal logs.
- Instantiate a task with a past due date and observe the `comparison` validator rejecting the record.

---

## Challenge

Add a custom validation `validate :assignee_must_belong_to_workspace` ensuring assignees belong to the workspace organization.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. N+1 Active Record Queries
- **Symptom / Issue:** Iterating through associations fires repeated queries per record.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Eager load required associations using `includes(:association)`.

### 2. Irreversible Database Migrations
- **Symptom / Issue:** Running `rails db:rollback` fails when migration direction is ambiguous.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Write explicit `up` and `down` migration methods for complex column changes.

### 3. Checking Secrets into Public Version Control
- **Symptom / Issue:** Third-party tokens and database credentials get leaked.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use encrypted credentials via `rails credentials:edit`.

---

## Summary

You have mastered Active Record associations, modern enums, and chainable scopes. Next week we cover Action Controller and Strong Parameters.
