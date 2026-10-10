# Fetch API and HTTP Requests

> **Category:** JavaScript | **Level:** Asynchronous, Storage & Final Project | **Week 12:** Fetch API and HTTP Requests
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand HTTP fundamentals and REST APIs: GET methods, endpoint URLs, and JSON responses
- Deploy the native fetch() API to consume remote network endpoints
- Deserialize incoming response streams using response.json()
- Evaluate HTTP transport status via response.ok and manage 404/500 failures
- Construct a live catalog interface coordinating loading, success, and error states

---

## 1. REST APIs and the Fetch Protocol

- **REST APIs**: Web services exposing raw data payloads (typically JSON) across standardized HTTP endpoints.
- **Fetch API**: Modern browser native interface for dispatching and receiving HTTP network traffic without third-party dependencies.

---

## 2. The Two-Step Fetch Pipeline

Consuming data requires awaiting two sequential promises:

```javascript
async function fetchData() {
  // Step 1: Dispatch HTTP request & receive response headers
  const response = await fetch("https://api.example.com/products");
  
  // Check HTTP transport validity (200-299)
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  // Step 2: Stream and parse JSON body into JavaScript object
  const data = await response.json();
  console.log("Payload:", data);
}
```

---

## 3. The 3 Essential UI States

Production data consumers must handle:
1. **Loading State**: Visual feedback during in-flight network transit.
2. **Success State**: Rendered UI presentation of incoming datasets.
3. **Error State**: User-friendly messaging during network dropouts or server failures.

---

## Program: Live Product Catalog Consumer with Fetch API and State Management

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Fetch API dan HTTP</title>
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
      max-width: 560px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
    }

    .btn-fetch {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }

    .status-alert {
      padding: 12px;
      border-radius: 6px;
      font-size: 13px;
      margin-bottom: 16px;
      display: none;
    }

    .alert-loading { background-color: #EBF8FF; color: #2B6CB0; border: 1px solid #BEE3F8; }
    .alert-error { background-color: #FFF5F5; color: #C53030; border: 1px solid #FEB2B2; }

    .posts-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .post-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 14px 16px;
      background: #FAFAFA;
    }

    .post-card h4 {
      font-size: 15px;
      color: #1A202C;
      margin-bottom: 6px;
      text-transform: capitalize;
    }

    .post-card p {
      font-size: 13px;
      color: #4A5568;
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header-bar">
      <h3>Data Live dari REST API</h3>
      <button class="btn-fetch" onclick="ambilDataPosts()">Muat Ulang Data</button>
    </div>

    <div id="status-box" class="status-alert"></div>
    <div id="posts-container" class="posts-grid"></div>
  </div>

  <script>
    async function ambilDataPosts() {
      const statusBox = document.getElementById("status-box");
      const postsContainer = document.getElementById("posts-container");

      // 1. STATE: LOADING
      statusBox.style.display = "block";
      statusBox.className = "status-alert alert-loading";
      statusBox.textContent = "⏳ Sedang mengambil data dari jsonplaceholder.typicode.com...";
      postsContainer.innerHTML = "";

      try {
        // 2. STATE: FETCHING DATA
        // Mengambil 3 artikel dari API publik
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");

        // Pemeriksaan status HTTP
        if (!response.ok) {
          throw new Error(`Gagal memuat data dari server. Kode Status HTTP: ${response.status}`);
        }

        // Parsing stream JSON ke objek JavaScript
        const daftarPost = await response.json();

        // 3. STATE: SUCCESS (Render ke DOM)
        statusBox.style.display = "none";

        postsContainer.innerHTML = daftarPost.map(item => `
          <article class="post-card">
            <h4>${item.id}. ${item.title}</h4>
            <p>${item.body}</p>
          </article>
        `).join("");

      } catch (error) {
        // 4. STATE: ERROR
        statusBox.style.display = "block";
        statusBox.className = "status-alert alert-error";
        statusBox.textContent = `✕ Terjadi kendala jaringan: ${error.message}`;
      }
    }

    // Eksekusi otomatis saat halaman dibuka
    ambilDataPosts();
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `fetch(...)`: Dispatches an asynchronous HTTP GET request to public mock endpoints.
- `if (!response.ok)`: Audits HTTP status boundaries (200-299); intercepts 404 and 500 error scenarios.
- `await response.json()`: Streams and parses raw byte payloads into native JavaScript collections.
- `daftarPost.map(...).join("")`: Transforms remote JSON records into semantic HTML card markup.
- Network fault tolerance: The `try-catch` boundary shields the application when clients lose internet connectivity.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 12 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Omitting await on response.json(): response.json() returns a Promise; forgetting await leaves you with an unfulfilled Promise object.
- Fetch does not reject on HTTP 404 or 500: Network fetch only rejects on physical network failure; always verify response.ok manually.
- CORS security blocks: Fetching endpoints that lack Access-Control-Allow-Origin headers causes browsers to reject requests.
- Failing to flush previous data: Appending without resetting container contents duplicates previous records on successive fetches.

---

## Summary

- Week 12 (Fetch API and HTTP Requests) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
