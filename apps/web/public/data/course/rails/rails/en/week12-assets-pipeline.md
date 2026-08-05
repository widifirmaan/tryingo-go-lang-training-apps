# Assets & Pipeline

> Rails | Module 12

## Learning Objectives

- Manage assets with pipeline
- Use Sass/SCSS for styling
- Integrate JavaScript
- Understand asset compilation

---

## Program: CSS & JS Assets

```ruby
/* app/assets/stylesheets/application.css */
body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
header { background: #CC0000; color: white; padding: 10px 20px; }
nav a { color: white; margin-right: 15px; text-decoration: none; }
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

Module 12 of 16: **Assets & Pipeline**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Deployment & Production**.
