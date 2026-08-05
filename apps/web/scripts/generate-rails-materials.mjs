import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/rails/rails');

const MODULES = [
  { id: 1, f: 'pengenalan-rails', lid: 'Pengenalan Rails & Setup', len: 'Introduction to Rails & Setup', pid: 'Hello Rails', pen: 'Hello Rails' },
  { id: 2, f: 'mvc-pattern', lid: 'MVC & Routing', len: 'MVC Pattern & Routing', pid: 'Routes & Controllers', pen: 'Routes & Controllers' },
  { id: 3, f: 'active-record', lid: 'Active Record & Migrations', len: 'Active Record & Migrations', pid: 'Database Setup', pen: 'Database Setup' },
  { id: 4, f: 'models-queries', lid: 'Models & Querying', len: 'Models & Querying', pid: 'Data Queries', pen: 'Data Queries' },
  { id: 5, f: 'views-templates', lid: 'Views & ERB Templates', len: 'Views & ERB Templates', pid: 'Rendering Views', pen: 'Rendering Views' },
  { id: 6, f: 'forms-handling', lid: 'Forms & Validations', len: 'Forms & Validations', pid: 'User Registration', pen: 'User Registration' },
  { id: 7, f: 'associations', lid: 'Associations & Relationships', len: 'Associations & Relationships', pid: 'Blog Posts & Comments', pen: 'Blog Posts & Comments' },
  { id: 8, f: 'authentication', lid: 'Authentication & Sessions', len: 'Authentication & Sessions', pid: 'Login System', pen: 'Login System' },
  { id: 9, f: 'authorization', lid: 'Authorization & Roles', len: 'Authorization & Roles', pid: 'Admin Panel', pen: 'Admin Panel' },
  { id: 10, f: 'apis-json', lid: 'REST APIs & JSON', len: 'REST APIs & JSON', pid: 'API Endpoints', pen: 'API Endpoints' },
  { id: 11, f: 'testing', lid: 'Testing with Minitest', len: 'Testing with Minitest', pid: 'Test Suite', pen: 'Test Suite' },
  { id: 12, f: 'assets-pipeline', lid: 'Assets & Pipeline', len: 'Assets & Pipeline', pid: 'CSS & JS Assets', pen: 'CSS & JS Assets' },
  { id: 13, f: 'deployment', lid: 'Deployment & Production', len: 'Deployment & Production', pid: 'Deploy to Production', pen: 'Deploy to Production' },
  { id: 14, f: 'security', lid: 'Security Best Practices', len: 'Security Best Practices', pid: 'Secure App', pen: 'Secure App' },
  { id: 15, f: 'performance', lid: 'Performance & Caching', len: 'Performance & Caching', pid: 'Optimize App', pen: 'Optimize App' },
  { id: 16, f: 'capstone', lid: 'Capstone: Blog App', len: 'Capstone: Blog Application', pid: 'Full Blog App', pen: 'Full Blog App' },
];

const OBJ = {
  1: { id: ['Mengenal Rails sebagai framework web Ruby', 'Menginstall Ruby dan Rails', 'Memahami struktur proyek Rails', 'Membuat aplikasi Rails pertama'], en: ['Understand Rails as a Ruby web framework', 'Install Ruby and Rails', 'Understand Rails project structure', 'Create your first Rails application'] },
  2: { id: ['Memahami pola MVC: Model, View, Controller', 'Mengatur routes di config/routes.rb', 'Membuat controller dan actions', 'Menghubungkan routes ke controller'], en: ['Understand MVC pattern: Model, View, Controller', 'Configure routes in config/routes.rb', 'Create controllers and actions', 'Connect routes to controllers'] },
  3: { id: ['Memahami Active Record ORM', 'Membuat dan menjalankan migrations', 'Mengenal schema.rb', 'Membuat model pertama'], en: ['Understand Active Record ORM', 'Create and run migrations', 'Understand schema.rb', 'Create your first model'] },
  4: { id: ['Melakukan CRUD dengan Active Record', 'Menggunakan where, find, first, all', 'Memahami query chaining', 'Menggunakan validations di model'], en: ['Perform CRUD with Active Record', 'Use where, find, first, all', 'Understand query chaining', 'Use validations in models'] },
  5: { id: ['Memahami ERB templates', 'Menggunakan layout dan partials', 'Mengirim data dari controller ke view', 'Menggunakan helper methods'], en: ['Understand ERB templates', 'Use layouts and partials', 'Pass data from controller to view', 'Use helper methods'] },
  6: { id: ['Membuat form dengan form_with', 'Menggunakan validations di model', 'Menampilkan error messages', 'Memahami strong parameters'], en: ['Create forms with form_with', 'Use model validations', 'Display error messages', 'Understand strong parameters'] },
  7: { id: ['Memahami has_many, belongs_to', 'Membuat association antara models', 'Menggunakan joins dan includes', 'Membuat nested resources'], en: ['Understand has_many, belongs_to', 'Create associations between models', 'Use joins and includes', 'Create nested resources'] },
  8: { id: ['Membuat sistem autentikasi', 'Menggunakan has_secure_password', 'Membuat session dan cookies', 'Mengimplementasi login/logout'], en: ['Create authentication system', 'Use has_secure_password', 'Create sessions and cookies', 'Implement login/logout'] },
  9: { id: ['Memahami authorization dengan roles', 'Menggunakan before_action untuk kontrol akses', 'Membuat admin dan user roles', 'Mengimplementasi permission checks'], en: ['Understand authorization with roles', 'Use before_action for access control', 'Create admin and user roles', 'Implement permission checks'] },
  10: { id: ['Membuat REST API endpoints', 'Menggunakan respond_to untuk JSON', 'Memahami status codes', 'Mengimplementasi API versioning'], en: ['Create REST API endpoints', 'Use respond_to for JSON', 'Understand status codes', 'Implement API versioning'] },
  11: { id: ['Menulis test dengan Minitest', 'Menggunakan fixtures dan factories', 'Testing models, controllers, dan integration', 'Memahami test-driven development'], en: ['Write tests with Minitest', 'Use fixtures and factories', 'Test models, controllers, and integration', 'Understand test-driven development'] },
  12: { id: ['Mengelola assets dengan pipeline', 'Menggunakan Sass/SCSS untuk styling', 'Mengintegrasikan JavaScript', 'Memahami asset compilation'], en: ['Manage assets with pipeline', 'Use Sass/SCSS for styling', 'Integrate JavaScript', 'Understand asset compilation'] },
  13: { id: ['Mempersiapkan deployment', 'Menggunakan Heroku atau Render', 'Mengatur environment variables', 'Memahami production configuration'], en: ['Prepare for deployment', 'Use Heroku or Render', 'Configure environment variables', 'Understand production configuration'] },
  14: { id: ['Memahami SQL injection dan XSS', 'Menggunakan parameterized queries', 'Implementing CSRF protection', 'Menggunakan Content Security Policy'], en: ['Understand SQL injection and XSS', 'Use parameterized queries', 'Implement CSRF protection', 'Use Content Security Policy'] },
  15: { id: ['Menggunakan caching dengan Redis', 'Optimasi database queries with eager loading', 'Memahami N+1 query problem', 'Implementing background jobs'], en: ['Use caching with Redis', 'Optimize DB queries with eager loading', 'Understand N+1 query problem', 'Implement background jobs'] },
  16: { id: ['Menggabungkan semua konsep Rails', 'Membangun blog full-stack', 'Mengimplementasi CRUD lengkap', 'Deployment dan final polish'], en: ['Combine all Rails concepts', 'Build a full-stack blog', 'Implement complete CRUD', 'Deployment and final polish'] },
};

const CODE = {
  1: `class HelloController < ApplicationController\n  def index\n    @message = "Hello, Rails!"\n    @framework = "Ruby on Rails"\n  end\nend`,
  2: `Rails.application.routes.draw do\n  root "hello#index"\n  get "about", to: "pages#about"\n  resources :posts\n  resources :comments, only: [:create, :destroy]\nend`,
  3: `class CreatePosts < ActiveRecord::Migration[7.0]\n  def change\n    create_table :posts do |t|\n      t.string :title\n      t.text :body\n      t.references :user, foreign_key: true\n      t.timestamps\n    end\n  end\nend`,
  4: `class Post < ApplicationRecord\n  belongs_to :user\n  has_many :comments, dependent: :destroy\n  validates :title, presence: true, length: { minimum: 5 }\n  validates :body, presence: true\nend`,
  5: `<h1><%= @post.title %></h1>\n<p><%= @post.body %></p>\n<p>By <%= @post.user.name %> on <%= @post.created_at.strftime("%B %d, %Y") %></p>`,
  6: `<%= form_with model: @post, local: true do |form| %>\n  <%= form.label :title %>\n  <%= form.text_field :title %>\n  <%= form.label :body %>\n  <%= form.text_area :body %>\n  <%= form.submit "Publish" %>\n<% end %>`,
  7: `class User < ApplicationRecord\n  has_many :posts, dependent: :destroy\n  has_many :comments, dependent: :destroy\nend\n\nclass Post < ApplicationRecord\n  belongs_to :user\n  has_many :comments, dependent: :destroy\nend`,
  8: `class SessionController < ApplicationController\n  def new\n  end\n\n  def create\n    user = User.find_by(email: params[:email])\n    if user&.authenticate(params[:password])\n      session[:user_id] = user.id\n      redirect_to root_path, notice: "Logged in!"\n    else\n      flash.now[:alert] = "Invalid email or password"\n      render :new\n    end\n  end\n\n  def destroy\n    session[:user_id] = nil\n    redirect_to root_path, notice: "Logged out!"\n  end\nend`,
  9: `class ApplicationController < ActionController::Base\n  before_action :require_login\n\n  private\n\n  def require_login\n    unless current_user\n      redirect_to login_path, alert: "Please log in"\n    end\n  end\n\n  def current_user\n    @current_user ||= User.find(session[:user_id]) if session[:user_id]\n  end\n  helper_method :current_user\nend`,
  10: `class PostsController < ApplicationController\n  def index\n    @posts = Post.all\n    render json: @posts\n  end\n\n  def show\n    @post = Post.find(params[:id])\n    render json: @post\n  end\n\n  def create\n    @post = Post.new(post_params)\n    if @post.save\n      render json: @post, status: :created\n    else\n      render json: @post.errors, status: :unprocessable_entity\n    end\n  end\n\n  private\n\n  def post_params\n    params.require(:post).permit(:title, :body)\n  end\nend`,
  11: `require "test_helper"\n\nclass PostTest < ActiveSupport::TestCase\n  test "valid post with title and body" do\n    post = Post.new(title: "Hello", body: "World")\n    assert post.valid?\n  end\n\n  test "invalid post without title" do\n    post = Post.new(body: "World")\n    assert_not post.valid?\n  end\nend`,
  12: `/* app/assets/stylesheets/application.css */\nbody { font-family: Arial, sans-serif; margin: 0; padding: 20px; }\nheader { background: #CC0000; color: white; padding: 10px 20px; }\nnav a { color: white; margin-right: 15px; text-decoration: none; }`,
  13: `# Deploy to Heroku\nheroku create\nheroku run rails db:migrate\nheroku open\n\n# Deploy to Render\n# Add render.yaml with build command: bundle exec rails server -p $PORT`,
  14: `# Security Checklist\n# 1. Use strong parameters (permit only allowed fields)\n# 2. Use CSRF tokens (Rails includes by default)\n# 3. Use bcrypt for passwords (has_secure_password)\n# 4. Use parameterized queries (Active Record does this)\n# 5. Set Content-Security-Policy header`,
  15: `# config/environments/production.rb\nconfig.cache_store = :redis_cache_store, { url: ENV["REDIS_URL"] }\n\n# In controller\nclass PostsController < ApplicationController\n  caches_action :index, expires_in: 1.hour\nend`,
  16: `# Blog App Features\n# - User authentication (login/logout/register)\n# - CRUD posts with associations\n# - Comments on posts\n# - Admin dashboard\n# - REST API endpoints\n# - Testing with Minitest\n# - Deployment ready`,
};

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. Rails uses MVC pattern and Active Record to build web applications efficiently. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> Rails | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```ruby\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'Rails menggunakan pola MVC (Model-View-Controller). Model mengelola data, View menampilkan HTML, Controller menangani request.\nActive Record adalah ORM bawaan Rails untuk berinteraksi dengan database.\nRails convention over configuration berarti Anda tidak perlu menulis konfigurasi berlebihan.'
      : 'Rails uses the MVC (Model-View-Controller) pattern. The Model manages data, the View renders HTML, and the Controller handles requests.\nActive Record is Rails built-in ORM for database interaction.\nRails convention over configuration means you dont need to write excessive configuration.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah kode di atas dan lihat perubahannya di browser' : 'Change the code above and see the changes in the browser') + '\n'
    + '- ' + (isId ? 'Tambah method baru di controller dan route baru' : 'Add a new method in the controller and a new route') + '\n'
    + '- ' + (isId ? 'Coba gunakan Rails console untuk query data' : 'Try using Rails console to query data') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat aplikasi kecil menggunakan konsep minggu ini. Pastikan menggunakan MVC pattern dan Active Record.\nJalankan dengan: rails server dan buka http://localhost:3000.'
      : 'Build a small application using this weeks concepts. Make sure to use MVC pattern and Active Record.\nRun with: rails server and open http://localhost:3000.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' Rails curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);