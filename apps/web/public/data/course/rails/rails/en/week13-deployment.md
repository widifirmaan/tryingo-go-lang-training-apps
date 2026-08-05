# Deployment & Production

> Rails | Module 13

## Learning Objectives

- Prepare for deployment
- Use Heroku or Render
- Configure environment variables
- Understand production configuration

---

## Program: Deploy to Production

```ruby
# Deploy to Heroku
heroku create
heroku run rails db:migrate
heroku open

# Deploy to Render
# Add render.yaml with build command: bundle exec rails server -p $PORT
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

Module 13 of 16: **Deployment & Production**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Security Best Practices**.
