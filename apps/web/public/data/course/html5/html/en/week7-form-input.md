# Forms & Input — Shop Orders

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 7:** Form & Input
> **Prerequisites:** Week 6 — **Tables**.

## Learning Objectives

- `<form>` + `<label for="name">` + `<input id="name" name="name" required>` — `for` links label & input (click label focuses input, a11y)
- `type="text/email/number"` + `placeholder` + `required` + `name` to send data
- `button type="submit"` sends, `method="get/post"` (MDN Forms)

---

## Why This Matters (Non-IT)

Without `label for`, clicking "Name" doesn't focus the input — hard on phones. Without `name`, data never reaches the server. `required` blocks empty submits.

---

## Program: Shop Order Form

```html
<form action="/order" method="post">
  <div>
    <label for="name">Customer Name</label>
    <input id="name" name="name" type="text" placeholder="Budi" required>
  </div>
  <div>
    <label for="wa">WA</label>
    <input id="wa" name="wa" type="tel" placeholder="0812..." required>
  </div>
  <div>
    <label for="qty">Quantity (kg)</label>
    <input id="qty" name="qty" type="number" min="1" max="100" value="1" required>
  </div>
  <button type="submit">Order</button>
</form>
```

**Mandatory:** `label for="name"` matches `id="name"`, `name="name"` for server, `required` mandatory.

### Extra Program: All Input Types (à la freeCodeCamp Registration Form)

```html
<form action="/register" method="post">
  <fieldset>
    <legend>Account</legend>
    <label for="email2">Email</label>
    <input id="email2" name="email" type="email" required>
    <label for="pass">Password</label>
    <input id="pass" name="pass" type="password" minlength="6" required>
  </fieldset>

  <fieldset>
    <legend>Order</legend>
    <p>Pickup or delivery?</p>
    <label><input type="radio" name="way" value="pickup" checked> Pickup</label>
    <label><input type="radio" name="way" value="delivery"> Delivery</label>
    <p>Toppings (many allowed):</p>
    <label><input type="checkbox" name="topping" value="eggs" checked> Eggs</label>
    <label><input type="checkbox" name="topping" value="crackers"> Crackers</label>
    <label for="date">Delivery date</label>
    <input id="date" name="date" type="date">
    <label for="proof">Transfer proof</label>
    <input id="proof" name="proof" type="file" accept="image/*">
  </fieldset>
</form>
```

- `radio` one name = pick 1 (`checked` default). `checkbox` one name = many allowed.
- `fieldset` + `legend` = box + title (mandatory for radio/checkbox accessibility — freeCodeCamp stresses this!).
- `select` alternative when options >5: `<select name="city"><option>Jakarta</option>...</select>`.

---

## Key Concepts

### `label for` + `input id`
`for="name"` links to `id="name"` — clicking label = focuses input.

### `name` + `required` + `type`
`name` send key, `required` mandatory, `type="email"` email validation.

### Radio / Checkbox / Fieldset
- `type="radio" name="way"` shared = 1 choice. `checked` = default.
- `type="checkbox"` = many choices. `fieldset` + `legend` wraps + titles (screen readers read the title first).

---

## Beginner Friendly Explanation

### Analogy: Paper Form
- **`form` = paper form**, **`label` = column title**, **`input` = fill box**, **`button submit` = hand to cashier**.

### Step 0 — Prepare Device
- VS Code + browser, `order.html`, click each label → does the input focus?

### How the Computer Reads It
1. Click `<label for="name">` → browser focuses `id="name"`.
2. Submit → browser packs `name=value` pairs (needs `name`!) → sends to `action`.

### 3 Must-Know Terms
1. **label/input/button**: title/box/hand-in

---

## Experiments

- **Green:** Click "Customer Name" label → input focuses?
- **Yellow:** Remove `name` → submitted data has no key?
- **Red:** Remove `for` → clicking label does nothing? Restore it.

---

## Challenge

**Complete Shop Form:** `name` text `required`, `wa` tel, `qty` number, `notes` textarea, `method` select `COD/Transfer`, `label for` all, `required` + `name`.

---

## Mini Glossary

- **form/label/input**: form/title/box

---

## Summary

Week 7 of 14: **Forms** — shop orders. Next: **Validation**.
