# Authentication & Authorization

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 7:** Authentication & Authorization

## Tujuan Pembelajaran

- Password hashing dengan bcrypt (salt + hash)
- JSON Web Tokens (JWT): header.payload.signature
- Middleware auth: verify token di setiap request
- Role-Based Access Control (RBAC)
- Session vs Token authentication

---

## Program: JWT Auth

```javascript
const crypto = require("crypto");

console.log("=== Password Hashing ===");
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return salt + ":" + hash;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return testHash === hash;
}

const stored = hashPassword("rahasia123");
console.log("Stored:", stored.substring(0, 40) + "...");
console.log("Verify correct:", verifyPassword("rahasia123", stored));
console.log("Verify wrong:", verifyPassword("salah", stored));

console.log("\n=== JWT Simulation ===");
function createJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64");
  const data = encode(header) + "." + encode(payload);
  const signature = crypto.createHmac("sha256", secret).update(data).digest("base64");
  return data + "." + signature;
}

const token = createJWT({ userId: 1, role: "admin" }, "secret-key");
console.log("Token:", token.substring(0, 50) + "...");

console.log("\n=== Role-Based Access ===");
function checkPermission(userRole, requiredRole) {
  const roles = { admin: 3, editor: 2, viewer: 1 };
  return (roles[userRole] || 0) >= (roles[requiredRole] || 0);
}
console.log("Admin can edit:", checkPermission("admin", "editor"));
console.log("Viewer can edit:", checkPermission("viewer", "editor"));
```

---

## Konsep Kunci

### Password Hashing
Bcrypt: salt + hash. Never store plain password.

### JWT
Header (algorithm) + Payload (claims) + Signature. Stateless auth.

### RBAC
Role hierarchy: admin > editor > viewer.

### Middleware
verifyToken middleware sebelum route handler.

---

## Eksperimen

- Buat register dan login flow lengkap
- Implementasikan refresh token mechanism
- Tambah middleware untuk role checking
- Buat password reset flow

---

## Tantangan

Buat sistem auth lengkap: register, login, JWT, role-based access, password hashing.

---

## Ringkasan

Minggu 7 dari 12: **Authentication & Authorization** (Level: Menengah). Minggu depan: **Database & ORM**.
