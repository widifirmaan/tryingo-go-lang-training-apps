# Models & Querying

> Rails | Module 4

## Learning Objectives

- Perform CRUD with Active Record
- Use where, find, first, all
- Understand query chaining
- Use validations in models

---

## Program: Data Queries

```ruby
class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  validates :title, presence: true, length: { minimum: 5 }
  validates :body, presence: true
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

Module 4 of 16: **Models & Querying**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Views & ERB Templates**.
