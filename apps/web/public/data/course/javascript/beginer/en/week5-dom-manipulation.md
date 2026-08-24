# DOM Manipulation — Remote for HTML Page

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 5:** DOM Manipulation

## Learning Objectives

- Understand **DOM**: HTML read by browser as tree (family tree)
- Get element: `document.getElementById`, `querySelector` (find item by label)
- Change content: `textContent`, `innerHTML`, `classList.add/remove`
- Create & attach new: `createElement` + `appendChild`
- Listen: `addEventListener("click", ...)` to make button alive

---

## Why This Matters (Non-IT)

Up to now JS only in `console.log`. Shop needs **Add to Cart button that really adds number on screen**, not in black console. DOM = **bridge JS ↔ HTML**. Without, JS and HTML disconnected.

---

## Program: Interactive Shop (Browser)

HTML + `script.js`

```html
<input id="input-product" placeholder="Product name" />
<button id="btn-add">Add</button>
<ul id="list"></ul>
<p id="total">Total: 0</p>
```
```javascript
const input = document.getElementById("input-product");
const btn = document.getElementById("btn-add");
const list = document.getElementById("list");
const totalEl = document.getElementById("total");

let data = [{ name: "Rice", price: 62000 }, { name: "Spinach", price: 5000 }];

function render() {
  list.innerHTML = "";
  let total = 0;
  for (const item of data) {
    const li = document.createElement("li");
    li.textContent = `${item.name} — Rp ${item.price.toLocaleString("en-US")}`;
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => { data = data.filter(d => d !== item); render(); });
    li.appendChild(del);
    list.appendChild(li);
    total += item.price;
  }
  totalEl.textContent = `Total: Rp ${total.toLocaleString("en-US")} | Count: ${data.length}`;
  totalEl.classList.toggle("expensive", total > 50000);
}

btn.addEventListener("click", () => {
  const name = input.value.trim();
  if (!name) return;
  data.push({ name, price: 10000 });
  input.value = "";
  render();
});

render();
console.log("DOM ready — try Add in browser");
```

**For Tryngo playground (no real DOM):**
```javascript
let data2 = ["Rice", "Spinach"];
function add(name) { data2.push(name); }
function remove(name) { data2 = data2.filter(d => d !== name); }
add("Eggs"); remove("Spinach");
console.log(data2); // ["Rice","Eggs"]
```

---

## Key Concepts

### DOM = HTML Family Tree
Browser reads `<ul><li>Rice</li></ul>` as object `document` → `ul` has `children` `[li]`. JS can touch each branch.

### Get Element
- `getElementById("list")` — fastest, by id
- `querySelector(".product")` / `querySelectorAll("li")` — CSS selector

### Change Content
- `el.textContent = "Safe text"`
- `el.innerHTML = "<b>Bold</b>"` (parses HTML, careful)
- `el.classList.add("active")` / `remove` / `toggle`

### Create & Append
`const li = document.createElement("li"); li.textContent = "New"; list.appendChild(li);`

### Event = Ears
`btn.addEventListener("click", () => { ... })` → when click, run function.

---

## Beginner Friendly Explanation

### Analogy: TV Remote

- **HTML = TV**: shows picture
- **DOM = remote + channel list**: each remote button linked to 1 channel
- **`getElementById` = pick labeled remote**: `getElementById("list")` = remote for `<ul>`
- **`createElement` = buy new TV**, `appendChild` = plug to power
- **`addEventListener` = ears**: "If Add pressed, do this"

---

## Experiments

- **Green:** Change `50000` in `classList.toggle("expensive", total > 50000)` to `30000` → when color changes?
- **Yellow:** Add second `inputPrice`, on `Add` use real price `parseInt(inputPrice.value)`.
- **Red:** Change `textContent` to `innerHTML` and try `name = "<b>Bold</b>"` → see difference.

---

## Challenge

**Interactive Shop Todo:** HTML has `input`, `button Add`, `ul`, `p total`, `select filter (All/Done/Pending)`. JS: array `todos = [{id, text, done}]`, `render()` filters per select, each `<li>` has checkbox `toggle` and `Delete`. All via DOM API, no framework.

Done: `getElementById`/`querySelector` + `createElement` + `appendChild` + `addEventListener` used, and `render()` called each data change.

---

## Mini Glossary

- **DOM**: tree of HTML objects
- **getElementById/querySelector**: get element
- **createElement/appendChild**: create & attach
- **textContent/innerHTML/classList**: change content & style
- **addEventListener**: attach click action

---

## Summary

Week 5 of 14: **DOM Manipulation** (Level: Beginner). You connected JS to HTML — button not poster. **Beginner JS done!** Next: **Events & Handling** — handle form, keyboard, delegation.
