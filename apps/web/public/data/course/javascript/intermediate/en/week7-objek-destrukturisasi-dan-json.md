# Objects, Destructuring, and JSON

> **Category:** JavaScript | **Level:** Data Structures & DOM Interaction | **Week 7:** Objects, Destructuring, and JSON
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master Object Literals (key-value pairs) and dot vs bracket access notation
- Inspect object properties using Object.keys(), Object.values(), and Object.entries()
- Deploy Object and Array Destructuring syntax for clean, concise binding
- Deploy the Spread Operator (...) for shallow copying and immutability
- Parse and serialize JSON payloads via JSON.stringify() and JSON.parse()

---

## 1. Object Literal Anatomy

Objects organize structured datasets as **key-value pairs**:

```javascript
const user = {
  id: 1042,
  name: "Alex Pratama",
  role: "Developer",
  active: true
};

console.log(user.name);     // Dot notation
console.log(user["role"]);  // Bracket notation
```

---

## 2. Destructuring Assignment

Unpack properties directly into discrete local variables:

```javascript
const { name, role, status = "Active" } = user;
console.log(name, role, status);
```

---

## 3. The Spread Operator (`...`) for Immutability

Clone and extend properties without mutating the source reference:

```javascript
const updatedUser = {
  ...user,
  role: "Lead Engineer",
  location: "Jakarta"
};
```

---

## 4. Working with JSON

JSON is the universal serialization protocol between clients and backends:

- **`JSON.stringify(object)`**: Serializes object into JSON text string.
- **`JSON.parse(string)`**: Deserializes JSON text back into a live JavaScript object.

```javascript
const jsonString = JSON.stringify(updatedUser);
const parsedObj = JSON.parse(jsonString);
```

---

## Program: User Profile Manager with Destructuring and JSON Serializer

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Objek dan JSON</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .container {
      max-width: 540px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .profile-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      background-color: #F7FAFC;
    }

    .profile-card h4 {
      color: #1A202C;
      margin-bottom: 8px;
    }

    .profile-meta {
      font-size: 13px;
      color: #4A5568;
      line-height: 1.6;
    }

    .btn-update {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      margin-right: 8px;
    }

    .json-preview {
      background-color: #1A202C;
      color: #A0AEC0;
      font-family: "Courier New", Courier, monospace;
      font-size: 12px;
      padding: 14px;
      border-radius: 8px;
      margin-top: 16px;
      white-space: pre;
      overflow-x: auto;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Manajemen Data Objek & JSON</h3>

    <div class="profile-card">
      <h4 id="user-name">Memuat nama...</h4>
      <div id="user-meta" class="profile-meta"></div>
    </div>

    <div>
      <button class="btn-update" onclick="naikkanJabatan()">Promosikan Jabatan (Spread)</button>
      <button class="btn-update" style="background-color: #4A5568;" onclick="resetProfil()">Reset Data</button>
    </div>

    <div style="margin-top: 20px; font-size: 13px; font-weight: 600; color: #4A5568;">
      Serialisasi JSON Payload (String):
    </div>
    <div id="json-box" class="json-preview"></div>
  </div>

  <script>
    // 1. Objek Awal
    const profilAsal = {
      id: 204,
      nama: "Nadia Safitri",
      email: "nadia@tryngo.id",
      departemen: "Teknologi",
      jabatan: "Junior Engineer",
      keahlian: ["HTML5", "CSS3", "JavaScript"],
      aktif: true
    };

    let profilAktif = { ...profilAsal };

    function tampilkanProfil() {
      // 2. Destructuring Assignment: Ekstrak properti ke variabel
      const { nama, email, departemen, jabatan, keahlian, aktif } = profilAktif;

      document.getElementById("user-name").textContent = nama;
      document.getElementById("user-meta").innerHTML = `
        <strong>Email:</strong> ${email}<br>
        <strong>Departemen:</strong> ${departemen}<br>
        <strong>Jabatan:</strong> ${jabatan}<br>
        <strong>Keahlian:</strong> ${keahlian.join(", ")}<br>
        <strong>Status:</strong> ${aktif ? "Aktif Bekerja" : "Nonaktif"}
      `;

      // 3. Serialisasi JSON dengan indentasi 2 spasi
      const jsonString = JSON.stringify(profilAktif, null, 2);
      document.getElementById("json-box").textContent = jsonString;
    }

    function naikkanJabatan() {
      // 4. Spread Operator: Update tanpa mengubah objek lama secara langsung
      profilAktif = {
        ...profilAktif,
        jabatan: "Senior Fullstack Engineer",
        keahlian: [...profilAktif.keahlian, "Node.js"]
      };
      tampilkanProfil();
    }

    function resetProfil() {
      profilAktif = { ...profilAsal };
      tampilkanProfil();
    }

    tampilkanProfil();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `const { nama, ... } = profilAktif`: Destructuring assigns properties directly to readable local identifiers.
- `{ ...profilAktif, jabatan: ... }`: Spread operators produce immutable clones overriding targeted fields safely.
- `[...keahlian, "Node.js"]`: Appends new skill elements non-destructively through array spread mechanics.
- `JSON.stringify(profilAktif, null, 2)`: Serializes runtime objects into formatted JSON strings indented by 2 spaces.
- `JSON.parse()`: Converts incoming JSON text from network APIs back into live mutable JavaScript objects.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 7 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Copying objects via assignment (b = a): Copies memory references rather than cloning; mutating b alters a directly.
- Shallow spread limitations: Spread clones only the top-level surface; nested arrays or objects retain shared memory references.
- Malformed JSON syntax: JSON specifications require double quotes ("key": "val"); single quotes throw SyntaxErrors.
- Uncaught JSON.parse exceptions: Malformed JSON strings crash applications; wrap external network parsing inside try-catch blocks.

---

## Summary

- Week 7 (Objects, Destructuring, and JSON) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
