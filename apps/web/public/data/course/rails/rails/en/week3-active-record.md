# Active Record & Migrations

> Rails | Module 3

## Learning Objectives

- Understand Active Record ORM
- Create and run migrations
- Understand schema.rb
- Create your first model

---

## Program: Database Setup

```ruby
class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.references :user, foreign_key: true
      t.timestamps
    end
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

Module 3 of 16: **Active Record & Migrations**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Models & Querying**.
