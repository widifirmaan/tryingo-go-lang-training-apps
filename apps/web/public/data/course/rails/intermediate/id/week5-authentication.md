# Authentication — KTP Rails

> **Kategori:** Ruby on Rails | **Level:** Menengah | **Minggu 5:** Authentication

## Tujuan Pembelajaran

- `has_secure_password` KTP, `session[:user_id]` stempel, `before_action :require_login`

---

## Program

```ruby
# Gemfile: gem 'bcrypt'
# User model: has_secure_password
# rails generate controller Sessions new create destroy

class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to "/produks"
    else
      flash[:alert] = "Salah"
      render :new
    end
  end
end

# ApplicationController
def require_login
  redirect_to "/login" unless session[:user_id]
end
```

---

## Ringkasan

Minggu 5: **KTP Rails** — `has_secure_password` + `session`.
