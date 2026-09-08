# PHP Security — Anti-Hijack Shop Guard

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 7:** Keamanan PHP

## Learning Objectives

- `htmlspecialchars()` anti-XSS, `PDO prepare` anti-SQL-injection, `password_hash()` vault, `session_regenerate_id()` anti-session-hijack (source: php.net/security)

---

## Why This Matters (Non-IT)

Shops without guards: hackers submit `<script>` in names → admin opens → passwords stolen (XSS). Typing `' OR 1=1` in login → entry without password (SQL injection). 2 functions stop 90% of attacks.

---

## Program: PHP Shop Guard

```php
<?php
// 1. XSS: wash output
$name = '<script>alert("hijack")</script>Budi';
echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); // shows raw, never runs!

// 2. SQL injection: NEVER glue strings!
// $sql = "SELECT * FROM user WHERE name = '$name'"; // DANGER!
$pdo = new PDO("mysql:host=localhost;dbname=shop", "root", "");
$stmt = $pdo->prepare("SELECT * FROM user WHERE name = ?"); // ? = safe hole
$stmt->execute([$name]); // sent separately, can't inject

// 3. Password: NEVER md5/sha1!
$hash = password_hash("secret123", PASSWORD_DEFAULT); // $2y$... random
var_dump(password_verify("secret123", $hash)); // true
var_dump(password_verify("wrong", $hash));      // false

// 4. Session: swap keys after login
session_start();
$_SESSION["user"] = "Budi";
session_regenerate_id(true); // new key, old key dead
?>
```

---

## Key Concepts

### `htmlspecialchars` = Wash Output
Turns `<` into `&lt;` — scripts never run. Use on ALL user-data `echo`s.

### `prepare` + `?` = Safe Holes
Query + data sent separately — injections become plain text.

### `password_hash`/`verify` = Vault
`PASSWORD_DEFAULT` (bcrypt) random per hash. Verify with `verify`, not `==`.

---

## Beginner Friendly Explanation

### Analogy: 3-Layer Guard
- **htmlspecialchars = wash hands**: clean before serving.
- **prepare = glass counter**: money passes a small hole, robbers can't enter.
- **hash = vault**: passwords become random.

### Step 0 — Prepare Device
- Same as W1 + running MySQL for the PDO test.

### How the Computer Reads It
1. `prepare("... ? ...")` → MySQL compiles the pattern.
2. `execute([$name])` → sends data separately → can't reshape the pattern.

### 3 Must-Know Terms
1. **XSS/SQLi**: script-injection/SQL-injection
2. **prepare/hash**: hole/vault

---

## Experiments

- **Green:** `htmlspecialchars('<b>x</b>')` → `&lt;b&gt;`?
- **Yellow:** Login `' OR '1'='1` via prepare → fails (safe)?
- **Red:** `md5("123")` always `202cb9...` (same → easy brute force)? `password_hash` twice differs?

---

## Challenge

**Guarded Shop:** Login form (`htmlspecialchars` display + `prepare` check + `password_verify` + `session_regenerate_id`) → hijack yourself 3 ways, all fail.

---

## Mini Glossary

- **XSS/SQLi/CSRF**: script/SQL/fake-request injection
- **prepare/hash/session**: hole/vault/key

---

## Summary

Week 7 of 12: **Anti-Hijack Guard** (Level: Intermediate). 90% of attacks stopped. Next: **PDO** — database driver.
