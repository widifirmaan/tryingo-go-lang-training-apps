# CI4 Setup — Lightweight Shop with Composer

> **Kategori:** CodeIgniter | **Level:** Beginner | **Minggu 1:** Setup CI4
> **Prerequisites:** None — start from zero.

## Learning Objectives

- Prepare your device: check `php -v` (≥8.1), `composer --version` (≥2.0.14), enable `php.ini` `extension=intl, curl` (source: codeigniter.com/user_guide/installation)
- Official install: `composer create-project codeigniter4/appstarter shop-ci` (app starter, not manual download)
- Set `cp env .env` and `php spark serve` on `http://localhost:8080` (source: running.html)

---

## Why This Matters (Non-IT)

CodeIgniter 4 = lightweight shop without heavy SOP — perfect for small businesses whose PHP already runs on cheap `cPanel` hosting. Without the right `composer` (2.0.14+), install fails. Without `intl`, `spark serve` errors. This week you set up a proper kitchen, not random `download & go`.

---

## Program: 5-Minute CI4 Shop (Official)

```bash
# 1. Check device (mandatory before install)
php -v          # must be 8.1+ (codeigniter.com: requirements)
composer --version # must be 2.0.14+
php -m | grep intl   # check intl active (Windows: findstr intl)
# If intl missing: open php.ini, remove ; from ;extension=intl → extension=intl, restart

# 2. Create official project (app starter)
composer create-project codeigniter4/appstarter shop-ci
cd shop-ci

# 3. Set env (safety)
cp env .env   # Windows: copy env .env
# Open .env, change CI_ENVIRONMENT = development

# 4. Run
php spark serve
# → http://localhost:8080 → "Welcome to CodeIgniter 4!"

# 5. Change port/host when 8080 is taken
php spark serve --port 8081
php spark serve --host 192.168.1.10
```

**Official structure (user_guide):**
- `app/Controllers` waiters, `app/Views` showcase, `public/` document root, `writable/` logs/cache.

---

## Key Concepts

### `composer create-project codeigniter4/appstarter`
Skeleton + latest `vendor/codeigniter4/framework`. `composer install --no-dev` for production (drops dev).

### `php spark serve` = `php -S` with CI4 routing
Use the built-in server for dev, not Apache at first.

### `env → .env` + `intl`/`curl`
Without `.env`, `CI_ENVIRONMENT` stays `production` (safety). Without `intl`, errors.

---

## Beginner Friendly Explanation

### Analogy: Ready-to-Use Light Shop
- **Composer = ingredient store**: `create-project` orders a complete shop package.
- **`appstarter` = shop package**: stove (`spark`), racks (`app/`) included, no assembly from zero.
- **`php spark serve` = trial opening**: no need to rent a shophouse (Apache) yet.

### Step 0 — Prepare Device (Research-Based)

1. **PHP 8.1+**: `php -v` → `PHP 8.2.x`. When `8.0`, update at `php.net` or latest XAMPP.
2. **Composer 2.0.14+**: `composer --version` → `2.7`. When `1.x` → `composer self-update`.
3. **Extensions**: `php -m` must list `intl`, `curl`, `mbstring`. When missing: `php.ini` → `extension=intl` (drop `;`).
4. **Test**: `php spark phpini:check` (CI4 4.7) checks requirements.

### How the Computer Reads It

1. `composer create-project` → downloads `appstarter` + `framework` into `vendor/`.
2. `php spark serve` → reads `.env` → `CI_ENVIRONMENT=development` → runs `public/index.php` → route `/` → `Home::index` → `welcome_message`.

### 3 Must-Know Terms

1. **Composer**: PHP ingredient store
2. **AppStarter**: ready shop package
3. **spark serve**: trial door

---

## Experiments

- **Green:** `php spark serve --port 8081` → `http://localhost:8081` runs?
- **Yellow:** Change `CI_ENVIRONMENT = production` in `.env` → detailed errors gone?
- **Red:** Disable `extension=intl` to `;extension=intl` → `php spark serve` `intl` error? Re-enable.

---

## Challenge

**Live CI4 Shop:** `composer create-project` + `.env` + `php spark serve` → change `app/Views/welcome_message.php` to `Hello Siti's Shop` → `http://localhost:8080` shows? Screenshot.

---

## Mini Glossary

- **Composer/appstarter/vendor**: store/package/ingredient-warehouse
- **spark serve**: trial server
- **.env**: secret address book

---

## Summary

Week 1 of 5: **Official CI4 Setup** (Level: Beginner). Device ready, light shop lit on 8080. Next: **Controllers & Routing** — `Routes.php` doors.
