# MVC Pattern & Routing

> Rails | Module 2

## Learning Objectives

- Understand MVC pattern: Model, View, Controller
- Configure routes in config/routes.rb
- Create controllers and actions
- Connect routes to controllers

---

## Program: Routes & Controllers

```ruby
Rails.application.routes.draw do
  root "hello#index"
  get "about", to: "pages#about"
  resources :posts
  resources :comments, only: [:create, :destroy]
end
```

---

## Explanation

Rails uses the MVC (Model-View-Controller) pattern. The Model manages data, the View renders HTML, and the Controller handles requests.
Active Record is Rails built-in ORM for database interaction.
Rails convention over configuration means you dont need to write excessive configuration.

---

## Experiments

- Change the code above and see the changes in the browser
- Add a new method in the controller and a new route
- Try using Rails console to query data

---

## Challenge

Build a small application using this weeks concepts. Make sure to use MVC pattern and Active Record.
Run with: rails server and open http://localhost:3000.

---

## Summary

Module 2 of 16: **MVC Pattern & Routing**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Active Record & Migrations**.
