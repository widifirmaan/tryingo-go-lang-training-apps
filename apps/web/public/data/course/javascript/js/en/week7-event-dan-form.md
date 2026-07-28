# Events & Forms

> JavaScript | Module 7

## Learning Objectives

- Listen to events with addEventListener
- Learn event types: click, submit, input, keydown
- Access the event object and target
- Prevent default form behavior
- Understand event bubbling and delegation

---

## Program: Smart Form

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Event & Form</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input,select,textarea{padding:.4rem;border:1px solid #ccc;border-radius:4px;width:100%;box-sizing:border-box;margin-bottom:.5rem}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer}.error{border-color:#e63946!important;background:#ffe5e5}.success{border-color:#2ecc71!important}.toast{position:fixed;top:20px;right:20px;background:#333;color:#fff;padding:.8rem 1.2rem;border-radius:8px;opacity:0;transition:opacity .3s;z-index:999}</style></head>
<body>
<h1>Form Cerdas</h1>
<div class="card">
  <form id="myForm">
    <label>Nama Lengkap <span style="color:red">*</span></label>
    <input type="text" id="name" required placeholder="Min. 3 karakter">
    <label>Email <span style="color:red">*</span></label>
    <input type="email" id="email" required placeholder="contoh@email.com">
    <label>Umur</label>
    <input type="number" id="age" min="1" max="150" placeholder="1-150">
    <label>Kategori</label>
    <select id="category">
      <option value="">Pilih...</option>
      <option value="student">Pelajar</option>
      <option value="worker">Pekerja</option>
      <option value="other">Lainnya</option>
    </select>
    <label>Pesan</label>
    <textarea id="message" rows="3" placeholder="Tulis pesan..."></textarea>
    <div style="display:flex;gap:8px;margin-top:.5rem">
      <button type="submit">Kirim</button>
      <button type="reset" style="background:#ccc">Reset</button>
    </div>
  </form>
</div>
<div id="log" class="card">
  <h2>Event Log</h2>
  <pre id="eventLog" style="background:#1e1e1e;color:#f8f8f2;padding:.5rem;border-radius:4px;max-height:150px;overflow-y:auto"></pre>
</div>
<div id="toast" class="toast"></div>
<script>
  function showToast(msg) {
    let t = document.getElementById("toast");
    t.textContent = msg; t.style.opacity = 1;
    setTimeout(() => t.style.opacity = 0, 2000);
  }
  function log(evt) {
    let el = document.getElementById("eventLog");
    el.textContent += `[${evt.type}] ${evt.target.id || evt.target.tagName}\n`;
    el.scrollTop = el.scrollHeight;
  }
  document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    if (name.length < 3) {
      document.getElementById("name").classList.add("error");
      return showToast("Nama minimal 3 karakter!");
    }
    document.getElementById("name").classList.remove("error");
    showToast(`Data terkirim! Nama: ${name}, Email: ${email}`);
    console.log("Form submitted:", { name, email });
  });
  document.getElementById("myForm").addEventListener("reset", function() {
    showToast("Form direset");
    document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
  });
  document.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("focus", log);
    el.addEventListener("blur", log);
    el.addEventListener("input", function() { this.classList.remove("error"); });
  });
  // EVENT DELEGATION
  document.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON" && e.target.type === "submit") {
      console.log("Tombol submit diklik (delegation)");
    }
  });
</script>
</body>
</html>
```

---

## Explanation

### Event Listener
`element.addEventListener("click", handler)` — modern way to register events. Can have multiple listeners on one element.

### Event Object
The first parameter contains event info: `type`, `target`, `preventDefault()`, etc.

### Event Bubbling
Events bubble from child to parent elements. Can be stopped with `stopPropagation()`.

### Event Delegation
Attach one listener on a parent to handle events from many children. Efficient for dynamic elements.

---

## Experiments

1. **Add validation: email must contain @**
1. **Implement a click counter on the submit button**
1. **Use event delegation to handle clicks on all buttons**
1. **Create a registration form with 5 different fields**

---

## Challenge

Create an "Event Registration" form with full validation: name (min 3 chars), email (valid format), phone (digits, 10-13 digits), date of birth (date picker). Show data summary before submit. Use event delegation for tooltips.

---

## Summary

Events make web pages interactive. With event listeners, form validation, and delegation, you can handle user interactions efficiently. Next module: **Modern JavaScript** — ES6+ features that make code cleaner.
