# Performance & Caching

> Rails | Module 15

## Learning Objectives

- Use caching with Redis
- Optimize DB queries with eager loading
- Understand N+1 query problem
- Implement background jobs

---

## Program: Optimize App

```ruby
# config/environments/production.rb
config.cache_store = :redis_cache_store, { url: ENV["REDIS_URL"] }

# In controller
class PostsController < ApplicationController
  caches_action :index, expires_in: 1.hour
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

Module 15 of 16: **Performance & Caching**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Capstone: Blog Application**.
