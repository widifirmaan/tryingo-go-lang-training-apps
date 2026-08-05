# Authentication & Sessions

> Rails | Module 8

## Learning Objectives

- Create authentication system
- Use has_secure_password
- Create sessions and cookies
- Implement login/logout

---

## Program: Login System

```ruby
class SessionController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Logged in!"
    else
      flash.now[:alert] = "Invalid email or password"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Logged out!"
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

Module 8 of 16: **Authentication & Sessions**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **Authorization & Roles**.
