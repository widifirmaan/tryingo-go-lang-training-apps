# Security Best Practices

> Rails | Module 14

## Learning Objectives

- Understand SQL injection and XSS
- Use parameterized queries
- Implement CSRF protection
- Use Content Security Policy

---

## Program: Secure App

```ruby
# Security Checklist
# 1. Use strong parameters (permit only allowed fields)
# 2. Use CSRF tokens (Rails includes by default)
# 3. Use bcrypt for passwords (has_secure_password)
# 4. Use parameterized queries (Active Record does this)
# 5. Set Content-Security-Policy header
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

Module 14 of 16: **Security Best Practices**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Performance & Caching**.
