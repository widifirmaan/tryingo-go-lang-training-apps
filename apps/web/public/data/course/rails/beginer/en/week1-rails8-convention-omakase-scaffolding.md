# Modern Rails 8: Omakase Conventions, Propshaft & Project Structure

> **Kategori:** Ruby on Rails 8 | **Level:** Beginner | **Minggu 1:** Modern Rails 8: Omakase Conventions, Propshaft & Project Structure
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand "Convention over Configuration" and "The Rails Doctrine" (The Omakase Stack).
- Master Rails 8 directory structure and modern Propshaft asset pipeline (omitting Node.js build tools).
- Declare nested RESTful resources with the `shallow: true` optimization.
- Automate SEO slug generation via `before_validation` model lifecycle callbacks.

---

## Program: Collaborative Project Workspace Domain Model with Rails 8 Conventions

```ruby
# config/routes.rb (Rails 8: Ramping & Elegan)
Rails.application.routes.draw do
  root "workspaces#index"

  resources :workspaces do
    resources :projects, shallow: true do
      resources :tasks, only: [:create, :update, :destroy]
    end
  end
end

# app/models/workspace.rb
class Workspace < ApplicationRecord
  # Konvensi Rails: nama tabel otomatis 'workspaces', primary key otomatis 'id'
  has_many :projects, dependent: :destroy
  has_many :tasks, through: :projects

  validates :name, presence: true, length: { minimum: 3, maximum: 80 }
  validates :slug, presence: true, uniqueness: { case_sensitive: false }

  before_validation :generate_slug, on: :create

  private

  def generate_slug
    self.slug = name.parameterize if name.present?
  end
end

# app/controllers/workspaces_controller.rb
class WorkspacesController < ApplicationController
  def index
    # Konvensi: otomatis render 'app/views/workspaces/index.html.erb'
    @workspaces = Workspace.order(created_at: :desc)
  end

  def show
    @workspace = Workspace.find_by!(slug: params[:id])
    @projects = @workspace.projects.includes(:tasks)
  end
end

puts "=== RUBY ON RAILS 8 OMAKASE ARCHITECTURE INITIALIZED ==="
```

---

## Key Concepts

Ruby on Rails stands as the landmark framework that pioneered modern web engineering paradigms (MVC, RESTful conventions, database migrations). In **Rails 8**, the framework doubles down on **"Omakase"**: packaging the definitive developer toolset (database persistence, queues, WebSockets, caching) pre-configured out of the box.

### Convention over Configuration (CoC)
Rails eradicates XML/YAML mapping configurations. Declaring a `Workspace` model instructs Rails that the PostgreSQL table is named `workspaces`, its relational foreign key is `workspace_id`, and its HTTP dispatcher is `WorkspacesController`.

### Propshaft: Retiring Complex Bundlers
Rails 8 replaces bloated Webpack asset tooling with **Propshaft**. Taking advantage of native browser ES modules and HTTP/2 multiplexing, Propshaft delivers asset pipelines with zero Node.js compilation friction.


---

---

## Beginner Friendly Explanation

Imagine ordering an authentic Omakase dinner at a world-class sushi bar. You do not dictate fish varieties or soy sauce ratios; the master chef selects and presents the finest delicacies directly to your plate. Rails 8 is the Omakase of web development: every premier tool is pre-selected and harmonized for you.

## Experiments

- Execute `bin/rails routes` in your terminal to inspect generated RESTful endpoints.
- Spin up `bin/rails console` creating experimental Workspace records interactively.
- Test `shallow: true` observing how nested task routes simplify to `/projects/:id/tasks`.

---

## Challenge

Deploy the Rails generator `bin/rails generate model Task title:string status:integer priority:integer due_date:date` auditing the generated migration file.

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

You have mastered Rails 8 conventions, Propshaft, and nested resources. Next week we explore Active Record associations, scopes, and validations.
