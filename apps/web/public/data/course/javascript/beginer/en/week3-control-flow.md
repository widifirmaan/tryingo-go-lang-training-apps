# Control Flow — If Out of Stock, What To Do?

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 3:** Control Flow

## Learning Objectives

- Decide with `if / else if / else` — like fork in road
- Short with **ternary** `score >= 70 ? "Pass" : "Fail"`
- Many fixed choices with `switch` (Monday-Friday)
- Repeat with **loops**: `for`, `while`, `for...of` (list), `for...in` (card)
- Stop/skip with `break` & `continue`

---

## Why This Matters (Non-IT)

Shop: **if out of stock → show "Out", else "Buy"**. Teacher: **if 85 → B, 90 → A**. Without `if`/`loop`, you write each case manually. With control flow, computer decides thousands of times.

---

## Program: Grades & Stock Auto

```javascript
const score = 85;
if (score >= 90) console.log("Grade: A");
else if (score >= 80) console.log("Grade: B");
else if (score >= 70) console.log("Grade: C");
else console.log("Grade: D");

const status = score >= 70 ? "Pass ✅" : "Fail ❌";
console.log("Status:", status);

const day = "Friday";
switch (day) {
  case "Monday": console.log("Monday hustle!"); break;
  case "Friday": console.log("Almost weekend!"); break;
  case "Saturday": case "Sunday": console.log("Holiday 🎉"); break;
  default: console.log("Workday");
}

console.log("\n=== For 1-5 ===");
for (let i = 1; i <= 5; i++) console.log("Count:", i);

const stock = ["rice", "oil", "sugar"];
console.log("\n=== For...Of ===");
for (const item of stock) console.log("Check:", item);

const profile = { name: "Budi", age: 25, city: "Jakarta" };
console.log("\n=== For...In ===");
for (const key in profile) console.log(key + ":", profile[key]);

console.log("\n=== While ===");
let left = 3;
while (left > 0) { console.log("Left:", left); left--; }

console.log("\n=== Break & Continue ===");
for (let i = 1; i <= 10; i++) {
  if (i === 5) { console.log("Stop at 5 (break)"); break; }
  if (i % 2 === 0) continue;
  console.log("Odd before 5:", i);
}

const cart = [{ name: "Rice", price: 62000, inStock: true }, { name: "Sugar", price: 15000, inStock: false }, { name: "Oil", price: 34000, inStock: true }];
let total = 0;
for (const item of cart) { if (!item.inStock) continue; total += item.price; }
console.log("\nTotal buyable: Rp", total.toLocaleString("en-US"));
```

---

## Key Concepts

### `if / else if / else` = Fork
Check top, stop at first `true`. `else` = last road if all fail.

### Ternary = Mini If
`condition ? ifYes : ifNo` — for 1 line.

### `switch` = Many Doors with Labels
Good for 1 variable vs many fixed values. Don't forget `break`.

### Loop = Stamping Repeatedly
- `for (let i=1; i<=5; i++)` — known count
- `while (left > 0)` — while condition
- `for...of` — for array, `for...in` — for object

### `break` / `continue`
- `break` = **exit** loop
- `continue` = **skip** 1 round

---

## Beginner Friendly Explanation

### Analogy

- **`if` = shop guard**: "If stock >0, please buy. Else sorry out."
- **`switch` = day board**: Monday do A, Friday do B.
- **`for` = stamping**: stamp 5x with number `i=1..5`.
- **`for...of` = check shelf one by one**
- **`break` = emergency brake**, `continue` = skip 1 stair.

---

## Experiments

- **Green:** Change `score = 95` → grade? Change `day = "Sunday"` → ?
- **Yellow:** Make `for` 10 to 1 descending `for(let i=10; i>=1; i--)`
- **Red:** Remove `break` in `switch` Friday → see "leak" prints 2 lines. Put back.

---

## Challenge

**Shop Guess:** Computer picks `secret = 7`. Loop 5 tries from array `[3,9,7]`, each: if `guess === secret` → `break` "Correct!", if `guess < secret` → "Too small", else "Too big". If loop ends without correct → "Failed 5x". Use `continue` if `guess is null`.

---

## Mini Glossary

- **if/else**: branch
- **switch**: many choices
- **loop**: repeat
- **for...of/in**: list/card loop
- **break/continue**: stop/skip

---

## Summary

Week 3 of 14: **Control Flow** (Level: Beginner). You can decide and repeat automatically. Next week: **Functions** — recipes reusable without rewrite.
