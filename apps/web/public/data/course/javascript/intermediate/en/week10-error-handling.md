# Error Handling

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 10:** Error Handling

## Learning Objectives

- Custom error classes with extends Error
- try/catch/finally for error handling
- instanceof to check error type
- Promise.allSettled for multiple async error handling
- Global error handlers: window.onerror, unhandledrejection

---

## Program: Robust Error Handling

```javascript
// Custom Error Classes
class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "NetworkError";
        this.status = status;
    }
}

// Try/Catch/Finally
function validateUser(data) {
    if (!data.email) throw new ValidationError("email", "Email wajib");
    if (!data.email.includes("@")) throw new ValidationError("email", "Email tidak valid");
    if (!data.nama) throw new ValidationError("nama", "Nama wajib");
    if (data.umur < 0 || data.umur > 150) throw new ValidationError("umur", "Umur tidak valid");
    return true;
}

// Demo
console.log("=== Error Handling ===");

const testCases = [
    { email: "", nama: "Budi", umur: 25 },
    { email: "invalid", nama: "Siti", umur: 30 },
    { email: "budi@mail.com", nama: "", umur: 25 },
    { email: "budi@mail.com", nama: "Budi", umur: -5 },
    { email: "budi@mail.com", nama: "Budi", umur: 25 }
];

testCases.forEach((data, i) => {
    try {
        validateUser(data);
        console.log(`Test ${i+1}: ✓ Valid`);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(`Test ${i+1}: ✗ ${error.field} - ${error.message}`);
        } else {
            console.log(`Test ${i+1}: ✗ Unexpected: ${error.message}`);
        }
    } finally {
        console.log(`  (test ${i+1} completed)`);
    }
});

// Async Error Handling
async function fetchUser(id) {
    if (id <= 0) throw new NetworkError(400, "Invalid ID");
    if (id > 100) throw new NetworkError(404, "User not found");
    return { id, name: "User " + id };
}

console.log("\n=== Async Error Handling ===");
async function loadUsers() {
    const ids = [1, -5, 50, 200];
    const results = await Promise.allSettled(
        ids.map(id => fetchUser(id))
    );

    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(`User ${ids[i]}: ✓ `, result.value);
        } else {
            console.log(`User ${ids[i]}: ✗ `, result.reason.message);
        }
    });
}

loadUsers();

// Global Error Handler
// window.addEventListener("error", (e) => { ... });
// window.addEventListener("unhandledrejection", (e) => { ... });
```

---

## Key Concepts

### Custom Errors
`class MyError extends Error` — add custom properties like field, status.

### Try/Catch/Finally
`try` execute, `catch` handle error, `finally` always runs.

### instanceof
`error instanceof ValidationError` — check error type for different handling.

### Async Errors
`Promise.allSettled` — doesn't stop when one fails, returns all results.

### Global Handlers
`window.onerror` for sync errors, `unhandledrejection` for Promises.

---

## Experiments

- Create custom error for each form field
- Try error wrapping: throw new Error("context", { cause: original })
- Experiment error boundary pattern
- Create retry logic with exponential backoff
- Try global error logging

---

## Challenge

Build a form validator: custom errors per field, async validation, error aggregation, and user-friendly messages.

---

## Summary

Week 10 of 14: **Error Handling** (Level: Intermediate). Intermediate phase complete! Next week: **Design Patterns** (Advanced).
