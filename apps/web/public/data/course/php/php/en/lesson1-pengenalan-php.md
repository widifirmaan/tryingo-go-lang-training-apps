# Introduction to PHP & Syntax

> PHP | Lesson 1

## Learning Objectives

- Understand PHP: the popular server-side scripting language\n- Learn the PHP file structure (opening tag, code, closing tag)\n- Run PHP via the built-in server and view output in the browser\n- Understand the difference between PHP (server-side) and HTML (client-side)

---

## Program: Introduction to PHP & Syntax

```php
<?php

echo "Hello, Tryngo!";

```

---

## Explanation

## Basic Syntax
Every PHP file starts with `<?php` and ends with `?>`. Code between those tags is executed by the server. `echo` prints text to HTML output.
## Opening & Closing Tags
`<?php` is required for every PHP code block. `?>` is optional — omitting it avoids accidental whitespace in output.
## Running PHP
`php -S 0.0.0.0:3000` starts PHP's built-in development server. Open http://localhost:3000.

---

## Experiments

1. **## Basic Syntax
Every PHP file starts with `<?php` and ends with `?>`. Code between those tags is executed by the server. `echo` prints text to HTML output.
## Opening & Closing Tags
`<?php` is required for every PHP code block. `?>` is optional — omitting it avoids accidental whitespace in output.
## Running PHP
`php -S 0.0.0.0:3000` starts PHP's built-in development server. Open http://localhost:3000.**

---

## Challenge

Explore: (1) change "Hello, Tryngo!" to "Selamat datang di PHP!" using a $selamat variable, (2) add 3 echo lines printing your name, age, and city, (3) try removing the closing tag ?> and observe whether output changes, (4) add // comments above each echo.

---

## Summary

echo = print output. <?php = opening tag. Server = PHP runs server-side. Next: variables & types.
