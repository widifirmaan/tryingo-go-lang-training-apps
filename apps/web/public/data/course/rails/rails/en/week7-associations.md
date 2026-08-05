# Associations & Relationships

> Rails | Module 7

## Learning Objectives

- Understand has_many, belongs_to
- Create associations between models
- Use joins and includes
- Create nested resources

---

## Program: Blog Posts & Comments

```ruby
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
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

Module 7 of 16: **Associations & Relationships**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Authentication & Sessions**.
