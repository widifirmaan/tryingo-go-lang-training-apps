# Event Architecture: Bubbling, Capturing & Event Delegation

> **Kategori:** JavaScript | **Level:** DOM, Events & Object Architecture | **Minggu 7:** Event Architecture: Bubbling, Capturing & Event Delegation

## Learning Objectives

- Master the three Event phases: Capturing, Target, and Bubbling
- Architect Event Delegation for maximal heap memory conservation
- Deploy Element.closest() to resolve target nodes accurately
- Halt event propagation using event.stopPropagation()
- Intercept browser defaults with event.preventDefault()

---

## Program: E-Commerce Filter Tag Board via Event Delegation Architecture

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Delegation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; padding: 32px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 24px; border-radius: 16px; border: 1px solid #E2E8F0; }
    .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
    .tag-btn { background: #E2E8F0; border: none; padding: 6px 14px; border-radius: 999px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; }
    .tag-btn.active { background: #2E5B44; color: white; }
    .log-panel { background: #0F172A; color: #38BDF8; font-family: monospace; padding: 16px; border-radius: 8px; font-size: 0.8rem; min-height: 100px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Filter Tag Produk (Event Delegation)</h2>
    <div id="tag-container" class="tag-cloud">
      <button class="tag-btn" data-kategori="backend">Golang</button>
      <button class="tag-btn" data-kategori="backend">Rust</button>
      <button class="tag-btn" data-kategori="frontend">React</button>
      <button class="tag-btn" data-kategori="database">PostgreSQL</button>
    </div>
    <div class="log-panel" id="log-output">Klik salah satu tag di atas...</div>
  </div>

  <script>
    const tagContainer = document.getElementById("tag-container");
    const logOutput = document.getElementById("log-output");

    tagContainer.addEventListener("click", (event) => {
      const targetTombol = event.target.closest(".tag-btn");
      if (!targetTombol) return;

      targetTombol.classList.toggle("active");
      logOutput.textContent = "Tag: " + targetTombol.textContent + " | Status: " + (targetTombol.classList.contains("active") ? "AKTIF" : "NONAKTIF");
    });
  </script>
</body>
</html>
```

---

## Key Concepts

### Event Bubbling & Delegation
Click events bubble upward from child targets through ancestral layers. Event Delegation binds a solitary listener on the parent container, conserving heap allocations while supporting dynamic children seamlessly.

---

---

## Beginner Friendly Explanation

### Analogy: Hotel Front Desk Switchboard
Event Delegation is a central hotel switchboard: regardless of which guest rings, the alert registers at the master reception desk.

## Experiments

- Click tags to observe dynamic log changes.
- Click the empty space between tags to verify safe null checks.
- Inject a new button and confirm it works immediately via delegation.
- Test event.stopPropagation() to halt event bubbling.

---

## Challenge

Build an e-commerce table where delete buttons on all rows are managed via a single listener on `<tbody>`.

---

## Summary

You have mastered browser event architectures and event delegation. Next week, we examine Object-Oriented Programming with ES6 classes.
