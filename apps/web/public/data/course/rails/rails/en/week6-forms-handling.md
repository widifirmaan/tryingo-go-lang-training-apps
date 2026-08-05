# Forms & Validations

> Rails | Module 6

## Learning Objectives

- Create forms with form_with
- Use model validations
- Display error messages
- Understand strong parameters

---

## Program: User Registration

```ruby
<%= form_with model: @post, local: true do |form| %>
  <%= form.label :title %>
  <%= form.text_field :title %>
  <%= form.label :body %>
  <%= form.text_area :body %>
  <%= form.submit "Publish" %>
<% end %>
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

Module 6 of 16: **Forms & Validations**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Associations & Relationships**.
