# Promises, Async/Await & HTTP REST API Consumption via Fetch

> **Kategori:** JavaScript | **Level:** Asynchronous, Storage & Kanban Project | **Minggu 10:** Promises, Async/Await & HTTP REST API Consumption via Fetch

## Learning Objectives

- Master the three Promise states: Pending, Fulfilled, and Rejected
- Deploy async/await for clear and maintainable asynchronous code
- Understand that fetch() does not reject on HTTP 404/500 errors
- Always validate response.ok before parsing JSON data
- Deploy try-catch-finally for robust network resilience

---

## Program: Resilient GitHub Public API Client with Comprehensive Error Handling

```javascript
async function ambilProfilGithub(username) {
  const url = "https://api.github.com/users/" + encodeURIComponent(username);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Gagal dengan status: " + response.status);
    }
    const data = await response.json();
    console.log("Nama Pengguna:", data.name || data.login);
    console.log("Repositori   :", data.public_repos, "repositori");
    return data;
  } catch (error) {
    console.error("[ERROR]", error.message);
    return null;
  } finally {
    console.log("[SELESAI] Request jaringan ditutup.");
  }
}

ambilProfilGithub("torvalds");
```

---

## Key Concepts

### Async/Await & Fetch API
The `async` keyword ensures a function returns a Promise, while `await` pauses execution non-blockingly until resolution.
Remember: `fetch()` only rejects on total network failure, not on HTTP 404 or 500 responses. Always verify `response.ok`!

---

---

## Beginner Friendly Explanation

### Analogy: The Coffee Pager Disc
A Promise is the wireless buzzer handed to you at a cafe: while waiting it is **Pending**, when ready it buzzes (**Fulfilled**), and if out of stock it is cancelled (**Rejected**).

## Experiments

- Query a nonexistent username to inspect the 404 error message.
- Use Promise.all to fetch two profiles in parallel.
- Disconnect network to observe TypeError in the catch block.
- Confirm that the finally block runs in all scenarios.

---

## Challenge

Build a `cariRepo(keyword)` function that retrieves top repositories from GitHub API and returns the top 3 projects.

---

## Summary

You have mastered network API consumption with async/await and Fetch API. Next week, we examine browser local data storage.
