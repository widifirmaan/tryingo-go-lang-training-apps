# Rails 8 Native Authentication, CurrentAttributes & Kamal 2 Deployment

> **Kategori:** Ruby on Rails 8 | **Level:** Advanced | **Minggu 9:** Rails 8 Native Authentication, CurrentAttributes & Kamal 2 Deployment

## Learning Objectives

- Master Rails 8's new native authentication generator (`bin/rails generate authentication`).
- Understand `ActiveSupport::CurrentAttributes` for thread-isolated session state management.
- Deploy cryptographically signed HTTP-only cookies (`cookies.signed.permanent`).
- Configure zero-downtime containerized deployments via **Kamal 2** targeting standard Linux VPS instances.

---

## Program: Rails 8 Native Authentication System & Kamal 2 Deployment Configuration

```ruby
# Rails 8: Autentikasi Native Tanpa Gem Pihak Ketiga (Selamat Tinggal Devise!)
# bin/rails generate authentication

# app/models/user.rb
class User < ApplicationRecord
  has_secure_password # Menggunakan BCrypt cryptographic hashing
  has_many :sessions, dependent: :destroy

  validates :email_address, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  normalizes :email_address, with: ->(e) { e.strip.downcase }
end

# app/models/current.rb (Thread-Isolated Context)
class Current < ActiveSupport::CurrentAttributes
  attribute :session
  attribute :user

  def user
    session&.user
  end
end

# app/controllers/concerns/authentication.rb
module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
    helper_method :authenticated?
  end

  private

  def authenticated?
    resume_session.present?
  end

  def require_authentication
    resume_session || request_authentication
  end

  def resume_session
    Current.session ||= find_session_by_cookie
  end

  def find_session_by_cookie
    Session.find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
  end

  def start_new_session_for(user)
    user.sessions.create!(user_agent: request.userAgent, ip_address: request.remote_ip).tap do |session|
      Current.session = session
      cookies.signed.permanent[:session_id] = { value: session.id, httponly: true, same_site: :lax }
    end
  end
end

# config/deploy.yml (Kamal 2: Zero-Downtime Docker Deployment ke VPS Server Apa Saja)
KAMAL_CONFIG_SAMPLE = <<-'YAML'
service: tryngo-workspace-app
image: tryngo/workspace:latest
servers:
  web:
    - 192.168.1.100
proxy:
  ssl: true
  host: workspace.tryngo.io
env:
  secret:
    - RAILS_MASTER_KEY
YAML

puts "=== RAILS 8 NATIVE AUTH & KAMAL 2 DEPLOYMENT PIPELINE CONFIGURED ==="
```

---

## Key Concepts

For over fifteen years, the Rails ecosystem leaned on heavyweight third-party authentication gems: notably **Devise**. Devise contained layers of opaque metaprogramming that complicated bespoke modifications.

### Rails 8 Native Authentication
Rails 8 ships with a native authentication generator:
`bin/rails generate authentication`
It synthesizes transparent, readable Ruby code directly into your application directory:
- Leverages `has_secure_password` backed by BCrypt cryptographic key stretching.
- Persists explicit `Session` records, enabling users to audit active login devices and revoke sessions remotely.
- Utilizes **CurrentAttributes** resolving `Current.user` cleanly across application contexts.

### Containerized Deployments via Kamal 2
**Kamal 2** represents Rails' official open-source container orchestrator. Kamal ships Docker images to plain Linux VPS instances (Hetzner, DigitalOcean, AWS) delivering true **Zero-Downtime** rolling restarts without Kubernetes complexity.


---

---

## Beginner Friendly Explanation

Imagine moving into a new home. Legacy auth was like hiring an external security firm whose master key you were forbidden to inspect. Rails 8 native auth is like hand-crafting your own vault deadbolt whose tumblers you understand completely. And Kamal 2 acts like a heavy-lift cargo helicopter landing your house onto any plot of land worldwide without rattling a single glass on the kitchen counter.

## Experiments

- Execute `bin/rails generate authentication` inspecting the pristine generated controller code.
- Log in from two separate browser windows and audit the database `sessions` table capturing unique IPs.
- Execute `kamal envify` to encrypt and synchronize production environment secrets.

---

## Challenge

Build a Token-Based Password Reset subsystem: create a 15-minute expiring `PasswordResetToken` dispatching reset links via background jobs.

---

## Summary

You have mastered Rails 8 Native Auth, CurrentAttributes, and Kamal 2 deployments. Next week is our Final Capstone: Full-Scale Real-Time Collaborative Team Workspace Platform!
