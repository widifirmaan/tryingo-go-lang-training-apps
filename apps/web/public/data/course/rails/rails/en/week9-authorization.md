# Authorization & Roles

> Rails | Module 9

## Learning Objectives

- Understand authorization with roles
- Use before_action for access control
- Create admin and user roles
- Implement permission checks

---

## Program: Admin Panel

```ruby
class ApplicationController < ActionController::Base
  before_action :require_login

  private

  def require_login
    unless current_user
      redirect_to login_path, alert: "Please log in"
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user
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

Module 9 of 16: **Authorization & Roles**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **REST APIs & JSON**.
