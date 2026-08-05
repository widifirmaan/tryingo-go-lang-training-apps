# Introduction to Rails & Setup

> Rails | Module 1

## Learning Objectives

- Understand Rails as a Ruby web framework
- Install Ruby and Rails
- Understand Rails project structure
- Create your first Rails application

---

## Program: Hello Rails

```ruby
class HelloController < ApplicationController
  def index
    @message = "Hello, Rails!"
    @framework = "Ruby on Rails"
  end
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

Module 1 of 16: **Introduction to Rails & Setup**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **MVC Pattern & Routing**.
