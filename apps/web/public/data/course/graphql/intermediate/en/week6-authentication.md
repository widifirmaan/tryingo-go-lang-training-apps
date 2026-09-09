# Authentication — GraphQL Restaurant ID

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 6:** Authentication & Authorization
> **Prerequisites:** Week 5 — **Apollo Server**.

## Learning Objectives

- `login(email, password)` mutation → JWT `token`, `context: { user }` ID per request, reject non-owners (source: apollographql.com/docs/apollo-server/security/authentication)

---

## Why This Matters (Non-IT)

Without auth, anyone `mutation { deleteProduct }` wipes everything. With JWT in `Authorization: Bearer`, the server knows who + rejects non-owners.

---

## Program: GraphQL Shop ID

```javascript
const jwt = require("jsonwebtoken");
const SECRET = "shop-secret";

// 1. Login → token
const resolvers = {
  Mutation: {
    login: (_, { email, password }) => {
      if (email === "admin@shop.com" && password === "123") {
        const token = jwt.sign({ email, role: "admin" }, SECRET);
        return { token };
      }
      throw new Error("Wrong");
    },
    addProduct: (_, { input }, context) => {
      if (!context.user) throw new Error("Login first!"); // guard
      return { id: "9", ...input };
    },
  },
};

// 2. Server reads ID every request
const server = new ApolloServer({
  typeDefs, resolvers,
  context: ({ req }) => {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    try {
      return { user: jwt.verify(token, SECRET) }; // valid ID?
    } catch { return {}; } // no ID
  },
});
```

Test GraphiQL: `mutation { login(email:"admin@shop.com", password:"123") { token } }` → Headers `{"Authorization": "Bearer TOKEN"}` → `addProduct` passes. No header → "Login first!".

---

## Key Concepts

### `login` → JWT → `context.user` = ID
Login once for a token, carry it every request, server fills `context.user`.

### Guard in Resolver
`if (!context.user) throw` — rejects before cooking.

---

## Beginner Friendly Explanation

### Analogy: Concert Wristband
- **Login = swap ticket for wristband (JWT)**, **context = wristband check** at every door.

### Step 0 — Prepare Device
- Apollo Server from W5 + `npm install jsonwebtoken`, test in GraphiQL.

### How the Computer Reads It
1. `login` returns `token` → client stores it.
2. Request with `Bearer TOKEN` → `context.user` filled → guard passes.

### 3 Must-Know Terms
1. **JWT/context/Bearer**: wristband/check/carry

---

## Experiments

- **Green:** No header → "Login first!"?
- **Yellow:** Fake token → rejected?
- **Red:** `addProduct` without `context.user` check → free without login? (Don't! Add it.)

---

## Challenge

**ID-Protected Restaurant:** `login` + `addProduct` (login mandatory) + `products` (free) + GraphiQL 3 tests (none/fake/real).

---

## Mini Glossary

- **JWT/Bearer/context**: wristband/carry/check

---

## Summary

Week 6 of 10: **Restaurant ID** (Level: Intermediate). Doors guarded. Next: **DataLoader**.
