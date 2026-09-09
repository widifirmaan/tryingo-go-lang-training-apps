# Authentication — Rails ID

> **Kategori:** Ruby on Rails | **Level:** Intermediate | **Minggu 5:** Authentication
> **Prerequisites:** Week 4 — **ERB Views**.

## Learning Objectives

- `has_secure_password` ID, `session[:user_id]` stamp, `before_action :require_login`

---

## Why This Matters (Non-IT)

Without auth, anyone opens `/admin`. `has_secure_password` + `session` = 5-line ID + wristband (Devise for production).

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
      redirect_to "/products"
    else
      flash[:alert] = "Wrong"
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

## Beginner Friendly Explanation

### Analogy: Rails Concert Wristband
- **`has_secure_password` = vault on the user card**: raw passwords NEVER stored — only `password_digest` hash. `authenticate` matches without opening the vault.
- **`session[:user_id]` = concert wristband**: login → wristband, every request checks wristbands. `before_action :require_login` = guards checking ALL doors except the login counter!

### Step 0 — Prepare Device
- Same as Rails W1: `rails server` on `3000` (+ `redis` for W10).

### How the Computer Reads It
- `has_secure_password` needs a `password_digest` column; `authenticate` checks; `session[:user_id]` remembers.

### 3 Must-Know Terms
- 1. **has_secure_password/session**: vault/wristband

---

## Experiments

- **Green:** Open `/products` → what shows? Try `/login` → what differs?
- **Yellow:** Change the case of `create` and `require_login` → still runs or error?
- **Red:** Mistype 1 letter in `create` → what error message? Fix it.

## Challenge

**Authentication in Your Shop:** use `/products`, `/login`, `create` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/products`, `/login`, `create`; predict the output BEFORE running, then compare.
- **Red:** Combine with **ERB Views** (Week 4): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 5: **Rails ID** — `has_secure_password` + `session`. Next: **Associations**.
