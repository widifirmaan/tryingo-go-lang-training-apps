# Data Types & Structures — Shopping List and Customer Card

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 2:** Tipe Data & Struktur Data

## Learning Objectives

- Make **list** with `array`: `["apple","mango"]`, add/remove `push`/`pop`, `length`
- Transform list with `map` (change each), `filter` (pick), `reduce` (sum)
- Make **card** with `object`: `{ name: "Budi", age: 25 }`, access `obj.name` / `obj["name"]`
- Unpack with **destructuring**: `const { name } = customer`
- Merge with **spread**: `[...fruits, "durian"]`

---

## Why This Matters (Non-IT)

Shop has 30 products and 100 customers. Without array/object, you write 30 variables `product1, product2...` — tired. With structures, **1 list for all**, filter "only out of stock" or sum total.

---

## Program: Product List & Customer Card

```javascript
const fruits = ["apple", "mango", "banana"];
console.log("Start:", fruits, "len:", fruits.length);
console.log("First:", fruits[0], "last:", fruits[fruits.length - 1]);
fruits.push("orange");
console.log("After push orange:", fruits);
fruits.pop();
console.log("After pop:", fruits);
fruits.unshift("grape");
console.log("After unshift grape:", fruits);

const prices = [10000, 15000, 20000, 25000];
const up10 = prices.map(p => p * 1.1);
const cheap = prices.filter(p => p < 20000);
const total = prices.reduce((s, p) => s + p, 0);
console.log("\nPrices:", prices);
console.log("Up 10%:", up10);
console.log("Cheap (<20k):", cheap);
console.log("Total:", total);

const customer = { name: "Budi", age: 25, member: true, address: "Melati 12" };
console.log("\nName:", customer.name, "| Age:", customer["age"]);
customer.phone = "08123456789";
delete customer.member;
console.log("After update:", customer);

const { name, address } = customer;
console.log("\nDestructuring:", name, "-", address);

const allFruits = [...fruits, "durian", "mangosteen"];
console.log("\nSpread fruits:", allFruits);
const newCustomer = { ...customer, points: 120 };
console.log("Spread + points:", newCustomer);
```

---

## Key Concepts

### Array = List (Order Matters)
`fruits[0]` apple. `push`/`pop` end, `unshift`/`shift` start, `length` count.

### `map` / `filter` / `reduce` = Shelf Machines
- `map` = **change each** (raise price 10%)
- `filter` = **pick passing** (only cheap)
- `reduce` = **collect to 1** (total)
- `find` = first match.

### Object = Card (Label Matters)
`{ name: "Budi", age: 25 }` → `customer.name`. Add `customer.phone = ...`, delete `delete customer.member`.

### Destructuring & Spread
- Unpack: `const { name, age } = customer`
- Merge: `[...old, "new"]`, `{...old, new: 123}`

---

## Beginner Friendly Explanation

### Analogy

- **Array = fruit shelf in order**: `push` put at end, `pop` take end.
- **Object = member card**: label `name`, `age`.
- **`map` = price stamp**: stamp each fruit new price.
- **`filter` = sieve**: only cheap passes.
- **`spread` = photocopy shelf**: `[...fruits, "durian"]` copy old + add durian (original not damaged).

---

## Experiments

- **Green:** `const veg = ["spinach","kale"]`, `push` "cabbage", `length`?
- **Yellow:** From `prices`, `expensive = prices.filter(p => p >= 20000)` and `discountedTotal = prices.map(p=>p*0.9).reduce((a,b)=>a+b,0)`
- **Red:** `const a = [...fruits]; a.push("x"); console.log(fruits)` → original unchanged? Yes, spread is copy.

---

## Challenge

**Shop Contacts:** `contacts = [{name:"Budi", phone:"081", category:"customer"}, ... 5 ]`. Then:
1. `filter` only `customer`
2. `map` to `["Budi - 081", ...]`
3. `reduce` count
4. Add 1 new via `[...contacts, newOne]`, not `push`

Bonus: `const {name, category} = contacts[0]`

---

## Mini Glossary

- **Array**: ordered list
- **Object**: label-value pairs
- **map/filter/reduce**: list processors
- **Destructuring**: unpack to variables
- **Spread `...`**: copy + add

---

## Summary

Week 2 of 14: **Data Types & Structures** (Level: Beginner). You can organize lists (array) and cards (object), process with map/filter. Next week: **Control Flow** — decide "if out of stock, don't sell" (`if`, `switch`, `loop`).
