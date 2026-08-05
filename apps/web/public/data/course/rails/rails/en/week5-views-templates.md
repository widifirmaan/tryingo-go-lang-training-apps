# Views & ERB Templates

> Rails | Module 5

## Learning Objectives

- Understand ERB templates
- Use layouts and partials
- Pass data from controller to view
- Use helper methods

---

## Program: Rendering Views

```ruby
<h1><%= @post.title %></h1>
<p><%= @post.body %></p>
<p>By <%= @post.user.name %> on <%= @post.created_at.strftime("%B %d, %Y") %></p>
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

Module 5 of 16: **Views & ERB Templates**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Forms & Validations**.
