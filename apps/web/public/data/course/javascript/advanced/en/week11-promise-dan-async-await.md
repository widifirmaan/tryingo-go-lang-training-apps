# Promises and Async/Await

> **Category:** JavaScript | **Level:** Asynchronous, Storage & Final Project | **Week 11:** Promises and Async/Await
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master the Promise lifecycle: 3 states (pending, fulfilled, rejected)
- Construct custom Promises via new Promise((resolve, reject) => ...)
- Handle resolution and rejections via .then(), .catch(), and .finally()
- Write synchronous-looking asynchronous control flows with async and await
- Implement structured error boundaries using try...catch blocks

---

## 1. What is a Promise?

A Promise represents the eventual completion or failure of an asynchronous operation:

```text
                 ┌───► Fulfilled (Success: resolve(data)) ──► .then() / await
[ PENDING ] ─────┤
 (Processing)    └───► Rejected (Error: reject(error))   ──► .catch() / try-catch
```

---

## 2. Custom Promise Instantiation

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Budi Santoso" });
      else reject(new Error("Invalid ID"));
    }, 1000);
  });
}
```

---

## 3. Modern Syntactic Standard: `async` & `await`

`async/await` straightens out nested `.then()` promise chains into linear control structures:

```javascript
async function loadProfile() {
  try {
    const data = await fetchUser(10);
    console.log("Result:", data.name);
  } catch (error) {
    console.error("Caught error:", error.message);
  } finally {
    console.log("Completed execution.");
  }
}
```

---

## Program: Authentication Flow Simulator with Network Delay and Error Handling

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Promise dan Async Await</title>
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
      max-width: 480px;
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

    .form-group {
      margin-bottom: 12px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-login {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }

    .btn-login:disabled {
      background-color: #A0AEC0;
      cursor: not-allowed;
    }

    .status-panel {
      margin-top: 16px;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 13px;
      display: none;
      line-height: 1.5;
    }

    .status-loading {
      background-color: #EBF8FF;
      color: #2B6CB0;
      border: 1px solid #BEE3F8;
    }

    .status-success {
      background-color: #E2F2E9;
      color: #2E5B44;
      border: 1px solid #C6E6D5;
    }

    .status-error {
      background-color: #FFF5F5;
      color: #C53030;
      border: 1px solid #FEB2B2;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Simulasi Login Asinkron (Promise)</h3>

    <div class="form-group">
      <label>Username (Gunakan: admin):</label>
      <input type="text" id="username-input" value="admin">
    </div>

    <div class="form-group">
      <label>Password (Gunakan: rahasia123):</label>
      <input type="password" id="password-input" value="rahasia123">
    </div>

    <button id="btn-submit" class="btn-login" onclick="prosesLogin()">Masuk Akun</button>

    <div id="status-box" class="status-panel"></div>
  </div>

  <script>
    // 1. Fungsi Penghasil Promise (Simulasi API Jaringan dengan Delay 1.5 Detik)
    function panggilApiLogin(username, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin" && password === "rahasia123") {
            resolve({
              token: "auth_token_9988aabb",
              user: "Administrator Nusa",
              peran: "SuperAdmin"
            });
          } else {
            reject(new Error("Kredensial salah: Username atau password tidak cocok!"));
          }
        }, 1500);
      });
    }

    // 2. Fungsi Asinkron Konsumen dengan async/await dan try-catch
    async function prosesLogin() {
      const u = document.getElementById("username-input").value;
      const p = document.getElementById("password-input").value;
      const statusBox = document.getElementById("status-box");
      const btn = document.getElementById("btn-submit");

      // Set state loading UI
      btn.disabled = true;
      statusBox.style.display = "block";
      statusBox.className = "status-panel status-loading";
      statusBox.textContent = "⏳ Menghubungi server otorisasi (menunggu 1,5 detik)...";

      try {
        // Eksekusi Promise dengan await
        const hasil = await panggilApiLogin(u, p);

        // Berhasil (Fulfilled)
        statusBox.className = "status-panel status-success";
        statusBox.innerHTML = `
          <strong>✓ Login Berhasil!</strong><br>
          Selamat datang, ${hasil.user} (${hasil.peran}).<br>
          Token Sesi: <code>${hasil.token}</code>
        `;
      } catch (err) {
        // Gagal (Rejected)
        statusBox.className = "status-panel status-error";
        statusBox.innerHTML = `
          <strong>✕ Terjadi Kesalahan:</strong><br>
          ${err.message}
        `;
      } finally {
        // Blok finally SELALU dijalankan (kembalikan tombol aktif)
        btn.disabled = false;
      }
    }
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `new Promise((resolve, reject) => ...)`: Instantiates an asynchronous deferred contract resolving or rejecting explicitly.
- `async function`: Flags functions as asynchronous scopes enabling inline `await` keywords.
- `await panggilApiLogin(...)`: Suspends execution of current function non-blockingly until Promise resolves.
- `try ... catch (err)`: Structured exception boundary capturing rejections without crashing runtime executions.
- `finally`: Guaranteed teardown block resetting interactive UI states (reenabling buttons) regardless of outcome.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 11 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Using await outside async functions: Triggers a SyntaxError: await is only valid in async functions.
- Omitting try-catch around await: Unhandled rejections log Uncaught (in promise) exceptions to the browser.
- Misunderstanding thread concurrency: await does not spawn background OS threads; it pauses execution at the function boundary within the single thread.
- Unresolved promise closures: Forgetting to invoke either resolve or reject hangs promises in perpetual pending state.

---

## Summary

- Week 11 (Promises and Async/Await) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
