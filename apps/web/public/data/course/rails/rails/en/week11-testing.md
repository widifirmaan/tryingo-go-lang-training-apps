# Testing with Minitest

> Rails | Module 11

## Learning Objectives

- Write tests with Minitest
- Use fixtures and factories
- Test models, controllers, and integration
- Understand test-driven development

---

## Program: Test Suite

```ruby
require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "valid post with title and body" do
    post = Post.new(title: "Hello", body: "World")
    assert post.valid?
  end

  test "invalid post without title" do
    post = Post.new(body: "World")
    assert_not post.valid?
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

Module 11 of 16: **Testing with Minitest**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Assets & Pipeline**.
