# Authentication with Devise

> **Kategori:** Ruby on Rails | **Level:** Intermediate | **Minggu 5:** Authentication with Devise

## Learning Objectives

- Devise gem: full authentication solution
- Install devise: generate, migrate
- Devise helpers: user_signed_in?, current_user
- Authenticate: before_action :authenticate_user!
- Registration, login, logout, password reset

---

## Program: Login System

```ruby
#!/usr/bin/env ruby
puts "=== Rails Authentication (Devise) ==="
puts ""
puts "=== Install Devise ==="
puts "gem 'devise'"
puts "bundle install"
puts "rails generate devise:install"
puts "rails generate devise User"
puts "rails db:migrate"
puts ""
puts "=== User Model ==="
class User
  attr_accessor :email, :password, :role
  def initialize(attrs = {})
    @email = attrs[:email]
    @password = attrs[:password]
    @role = attrs[:role] || :user
  end
  def admin?
    @role == :admin
  end
end
users = [
  User.new({email: "admin@mail.com", password: "secret123", role: :admin}),
  User.new({email: "user@mail.com", password: "pass456", role: :user}),
]
puts "=== Login Simulation ==="
input_email = "admin@mail.com"
input_password = "secret123"
user = users.find { |u| u.email == input_email }
if user && user.password == input_password
  puts "Login success! Welcome, #{user.email}"
  puts "Admin? #{user.admin?}"
else
  puts "Login failed!"
end
puts ""
puts "=== Devise Helpers ==="
puts "user_signed_in?     - Is user logged in?"
puts "current_user        - Current user object"
puts "user_session        - Access session"
puts ""
puts "=== Routes ==="
puts "devise_for :users"
puts "new_user_session_path    - Login form"
puts "destroy_user_session_path - Logout"
puts "new_user_registration_path - Register"
puts ""
puts "=== Controller Auth ==="
puts "class PostsController < ApplicationController"
puts "  before_action :authenticate_user!"
puts "  before_action :set_post, only: [:show, :edit, :update, :destroy]"
puts "end"
puts ""
puts "=== Conditional Display ==="
puts "<% if user_signed_in? %>"
puts "  Welcome, <%= current_user.email %>"
puts "  <%= link_to 'Logout', destroy_user_session_path, method: :delete %>"
puts "<% else %>"
puts "  <%= link_to 'Login', new_user_session_path %>"
puts "<% end %>"

```

---

## Key Concepts

### Devise
Full auth solution: register, login, logout, password reset, email confirmation.

### Install
`gem 'devise'`, `bundle install`, `rails g devise:install`, `rails g devise User`, `rails db:migrate`.

### Helpers
`user_signed_in?` - boolean, `current_user` - user object.

### Protect Routes
`before_action :authenticate_user!` redirects to login if unauthenticated.

### Customization
Override views: `rails g devise:views`. Override controllers: `rails g devise:controllers users`.

---

## Experiments

- Install Devise and setup User model
- Customize Devise views
- Add username field to Devise
- Implement role-based access
- Try omniauth for social login

---

## Challenge

Build a complete auth system: register, login, logout, role-based access (admin/user), protected routes.

---

## Summary

Week 5 of 12: **Authentication with Devise** (Level: Intermediate). Application security. Next week: **Associations**.
