# Functions — Reusable Recipes

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 4:** Fungsi

## Learning Objectives

- Make recipes with `function` and arrow `=>` — write once, use 100x
- Send ingredients via **parameter**, get result via **return**
- Default `name = "Guest"` and rest `...nums`
- Function as gift: **callback** `process(data, fn)` and **closure** (function remembers outer box)

---

## Why This Matters (Non-IT)

Shop recipe "total + discount + delivery" used 30x a day. Without function, write formula 30x. With `calcTotal(cart, discount)` write once, call `calcTotal(cartA)` and `calcTotal(cartB)` — **no copy-paste, no mistake**.

---

## Program: Shop Functions Kitchen

```javascript
function greet(name) { return `Hello, ${name}!`; }
console.log(greet("Budi"));
console.log(greet("Siti"));

const add = function(a, b) { return a + b; };
const mul = (a, b) => a * b;
const divide = (a, b) => { if (b === 0) return "Error: divide by 0"; return a / b; };
console.log("\nMul 4*3:", mul(4, 3));
console.log("Divide 10/0:", divide(10, 0));

const greetDefault = (name = "Guest") => `Hello, ${name}!`;
console.log(greetDefault());
console.log(greetDefault("Siti"));

const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log("Sum:", sumAll(1, 2, 3, 4, 5));

function process(list, work) { return list.map(work); }
console.log("\nProcess:", process([1, 2, 3], n => n * n));

function makeCounter() {
  let count = 0;
  return function() { return ++count; };
}
const shopCounter = makeCounter();
console.log("\n=== Closure Counter ===");
console.log(shopCounter()); // 1
console.log(shopCounter()); // 2
console.log(shopCounter()); // 3

function calcTotal(cart, discountPercent = 0) {
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
  return total - total * (discountPercent / 100);
}
const cart = [{ price: 62000, qty: 1 }, { price: 5000, qty: 2 }];
console.log("\nTotal no discount:", calcTotal(cart));
console.log("10% off:", calcTotal(cart, 10));
```

---

## Key Concepts

### 3 Ways to Write Function
- `function greet(name){ return ... }` — hoisted
- `const greet = function(name){...}` — expression
- `const greet = (name) => ...` — arrow, shortest

### Parameter & Return
- `function calc(a,b)` → `a,b` in, `return` out. No `return` → `undefined`.
- Default: `(name = "Guest")`, Rest: `(...args)` collect all into array.

### Callback & Closure
- **Callback**: function sent as argument `process(data, n => n*2)`
- **Closure**: inner function remembers outer `let count` even after outer done — for counter, private data.

---

## Beginner Friendly Explanation

### Analogy: Cooking Recipe

- **Function = recipe**: write "Soto: chicken, spice → boil" once, cook 100 bowls `soto(chicken)`.
- **Parameter = ingredients**, **Return = dish**
- **Callback = delegate**: "Please chop veggies *this way*" → way is another function.
- **Closure = safe vault**: counter remembers `count` in vault, can't peek from outside, only via function.

---

## Experiments

- **Green:** `const shopGreet = name => `Welcome to Shop, ${name}`` → call 2x.
- **Yellow:** `sumAll(10,20,30)` → ? Try `calcTotal(cart, 20)` 20% off.
- **Red:** Forget `return` in `divide` → `undefined`. Add `return` → correct.

---

## Challenge

**Auto Shop:** Make 3 functions:
1. `subtotal(cart)` → total no discount
2. `delivery(weight, distance)` → `weight*5000 + distance*2000`
3. `printReceipt(cart, distance)` → combine 1+2, use `greet(name)` and return full string
Call with 2 different carts to prove reuse.

Bonus closure: `makeDiscount(10)` returns `price => price*0.9` — use `cart.map(makeDiscount(10))`.

---

## Mini Glossary

- **Function**: reusable block
- **Parameter/argument**: input
- **Return**: output
- **Callback**: function passed
- **Closure**: remembers outer var

---

## Summary

Week 4 of 14: **Functions** (Level: Beginner). You have recipes reusable 100x. Next week: **DOM Manipulation** — connect JS to HTML page you built in HTML/CSS (make button really click).
