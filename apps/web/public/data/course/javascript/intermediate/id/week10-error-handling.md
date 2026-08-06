# Error Handling

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 10:** Error Handling

## Tujuan Pembelajaran

- Custom error classes dengan extends Error
- try/catch/finally untuk handle error
- instanceof untuk cek tipe error
- Promise.allSettled untuk handle multiple async errors
- Global error handler: window.onerror, unhandledrejection

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

## Konsep Kunci

### Custom Error
`class MyError extends Error` — tambah property custom seperti field, status.

### Try/Catch/Finally
`try` jalankan, `catch` handle error, `finally` selalu jalan.

### instanceof
`error instanceof ValidationError` — cek tipe error untuk handling berbeda.

### Async Errors
`Promise.allSettled` — tidak berhenti saat satu gagal, return semua hasil.

### Global Handler
`window.onerror` untuk sync errors, `unhandledrejection` untuk Promise.

---

## Eksperimen

- Buat custom error untuk setiap field form
- Coba error wrapping: throw new Error("context", { cause: original })
- Eksperimen error boundary pattern
- Buat retry logic dengan exponential backoff
- Coba global error logging

---

## Tantangan

Buat form validator: custom errors per field, async validation, error aggregation, dan user-friendly messages.

---

## Ringkasan

Minggu 10 dari 14: **Error Handling** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Design Patterns** (Advanced).
