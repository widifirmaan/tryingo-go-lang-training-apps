# DOM Manipulation

> JavaScript | Module 6

## Learning Objectives

- Select elements with querySelector and getElementById
- Create and insert new elements
- Modify content, attributes, and styles
- Manage classes with classList
- Remove elements from the DOM

---

## Program: Page Modifier

```html
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>DOM Manipulation</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;padding:0 1rem}h2{color:#B8860B}.card{background:#f5f5f5;padding:1rem;border-radius:8px;margin:.5rem 0}input{padding:.4rem;border:1px solid #ccc}button{background:#F7DF1E;color:#000;border:none;padding:.4rem 1rem;border-radius:6px;cursor:pointer;margin:2px}.highlight{background:#fff3cd;border:2px solid #F7DF1E}.box{width:80px;height:80px;background:#F7DF1E;margin:5px;display:inline-flex;align-items:center;justify-content:center;font-weight:bold;border-radius:8px}#targetArea{min-height:60px;border:2px dashed #ccc;padding:.5rem;margin:.5rem 0;border-radius:8px}</style></head>
<body>
<h1>Pengubah Halaman</h1>
<div class="card">
  <button onclick="tambahElemen()">Tambah Elemen</button>
  <button onclick="ubahJudul()">Ubah Judul</button>
  <button onclick="toggleClass()">Toggle Class</button>
  <button onclick="gantiWarna()">Ganti Warna Latar</button>
  <button onclick="hapusElemen()">Hapus Elemen Terakhir</button>
</div>
<div id="targetArea">
  <p class="item">Elemen awal</p>
</div>
<div id="infoPanel" class="card">
  <p><strong>Jumlah elemen:</strong> <span id="jumlahElemen">1</span></p>
</div>
<script>
  function tambahElemen() {
    let div = document.createElement("div");
    div.className = "box";
    div.textContent = "Baru";
    document.getElementById("targetArea").appendChild(div);
    hitungElemen();
  }
  function ubahJudul() {
    let h1 = document.querySelector("h1");
    h1.textContent = "DOM Diubah!";
    h1.style.color = "#e63946";
  }
  function toggleClass() {
    document.getElementById("targetArea").classList.toggle("highlight");
  }
  function gantiWarna() {
    document.body.style.backgroundColor =
      document.body.style.backgroundColor === "lightblue" ? "" : "lightblue";
  }
  function hapusElemen() {
    let area = document.getElementById("targetArea");
    let anak = area.querySelectorAll(".box");
    if (anak.length > 0) area.removeChild(anak[anak.length - 1]);
    hitungElemen();
  }
  function hitungElemen() {
    let total = document.querySelectorAll("#targetArea > *").length;
    document.getElementById("jumlahElemen").textContent = total;
  }
</script>
</body>
</html>
```

---

## Explanation

### DOM Selectors
`document.querySelector("#id")` — CSS selector. `document.getElementById("id")` — faster.

### Manipulation
`createElement("tag")` — create new element. `appendChild(el)` — add to DOM. `textContent` — change text. `classList.add/remove/toggle` — manage classes.

### Style
Set style via `element.style.property = "value"`. For multiple changes, use classes instead.

### Performance
Batch DOM changes for better performance. Avoid repeated DOM manipulation in loops.

---

## Experiments

1. **Replace `querySelector` with `getElementById` and compare**
1. **Implement a button that changes an image (src)**
1. **Create a function that removes all elements in targetArea**
1. **Simple animation: change opacity gradually with setInterval**

---

## Challenge

Create a "Gallery Builder" page: users can add images (via URL), add captions, set sizes, and delete. All elements are created and manipulated through the DOM. Use classList for hover effects.

---

## Summary

DOM manipulation enables JavaScript to dynamically change web pages. You have learned to create, modify, and delete elements. Next module: **Events & Forms** — how to respond to user interactions.
