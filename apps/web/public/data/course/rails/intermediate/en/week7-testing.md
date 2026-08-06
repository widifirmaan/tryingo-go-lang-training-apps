# Testing with RSpec

> **Kategori:** Ruby on Rails | **Level:** Intermediate | **Minggu 7:** Testing with RSpec

## Learning Objectives

- RSpec: testing framework for Rails
- Model specs: test validations and business logic
- Request specs: test HTTP endpoints
- Factory Bot: test data generation
- System specs: browser-like integration tests

---

## Program: Test Suite

```ruby
#!/usr/bin/env ruby
puts "=== Rails Testing (RSpec) ==="
puts ""
puts "=== Setup ==="
puts "group :development, :test do"
puts "  gem 'rspec-rails'"
puts "  gem 'factory_bot_rails'"
puts "  gem 'faker'"
puts "end"
puts "rails generate rspec:install"
puts ""
puts "=== Model Spec ==="
class Post
  attr_accessor :title, :body
  def initialize(attrs = {})
    @title = attrs[:title]
    @body = attrs[:body]
  end
  def valid?
    @title && !@title.empty? && @body && !@body.empty?
  end
end
puts "RSpec Model Tests:"
tests = [
  {title: "Valid", body: "Content", expected: true},
  {title: "No title", body: "", expected: false},
  {title: "", body: "Content", expected: false},
  {title: "A", body: "B", expected: true},
]
tests.each do |t|
  p = Post.new({title: t[:title], body: t[:body]})
  status = p.valid? == t[:expected] ? "PASS" : "FAIL"
  puts "  #{status}: title='#{t[:title]}' body='#{t[:body]}' => #{p.valid?}"
end
puts ""
puts "=== Request Spec ==="
puts "RSpec.describe 'Posts', type: :request do"
puts "  describe 'GET /posts' do"
puts "    it 'returns all posts' do"
puts "      get posts_path"
puts "      expect(response).to have_http_status(:ok)"
puts "    end"
puts "  end"
puts "end"
puts ""
puts "=== Factory Bot ==="
puts "FactoryBot.define do"
puts "  factory :post do"
puts "    title { Faker::Lorem.sentence }"
puts "    body { Faker::Lorem.paragraph }"
puts "    association :user"
puts "  end"
puts "end"
puts ""
puts "=== Test Helpers ==="
puts "let(:user) { create(:user) }"
puts "let(:post) { create(:post, user: user) }"
puts "before { sign_in user }"
puts ""
puts "=== System Tests ==="
puts "RSpec.describe 'Post management', type: :system do"
puts "  it 'creates a post' do"
puts "    visit new_post_path"
puts "    fill_in 'Title', with: 'Test Post'"
puts "    click_button 'Create'"
puts "    expect(page).to have_text('Test Post')"
puts "  end"
puts "end"

```

---

## Key Concepts

### RSpec Setup
`gem 'rspec-rails'`, `rails g rspec:install`.

### Model Spec
Test validations, methods, scopes. `expect(post).to be_valid`.

### Request Spec
Test HTTP: `get posts_path`, `expect(response).to have_http_status(:ok)`.

### Factory Bot
Define factories for test data. `create(:post)`, `build(:post)`.

### System Spec
Capybara-based: `visit`, `fill_in`, `click_button`.

### Helpers
`let(:user) { create(:user) }`, `before { sign_in user }`.

---

## Experiments

- Create model spec with validations
- Test controller with request spec
- Create factory with Faker
- Implement system test
- Try test with mocking

---

## Challenge

Create a complete test suite for Post: model spec (validations), request spec (CRUD), factory. Min 10 test cases.

---

## Summary

Week 7 of 12: **Testing with RSpec** (Level: Intermediate). Code quality guaranteed. Next week: **API Mode**.
