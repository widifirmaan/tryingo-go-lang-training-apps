# Testing & Errors — Taste-Test GraphQL Restaurant

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 9:** Testing & Error Handling

## Learning Objectives

- Test resolvers directly (no server): `Query.products()` + `expect` (vitest)
- Neat errors: `throw new GraphQLError("...", { extensions: { code: "NOT_FOUND" } })` (not raw `Error`)

---

## Why This Matters (Non-IT)

Without tests, resolver edits → phone crashes found by customers. Without error codes, phones can't tell "missing" vs "server dead" (different messages!).

---

## Program: Taste-Test GraphQL Kitchen

```javascript
// resolvers.test.js
import { test, expect } from "vitest";
import { resolvers } from "./resolvers.js";

test("2 products present", async () => {
  const result = await resolvers.Query.products();
  expect(result.length).toBe(2);
});

test("nameless add rejected", async () => {
  await expect(resolvers.Mutation.addProduct(null, {}))
    .rejects.toThrow("Name required");
});
```

```javascript
// Coded errors (not raw!)
const { GraphQLError } = require("graphql");
if (!product) {
  throw new GraphQLError("Product missing", {
    extensions: { code: "NOT_FOUND", id },
  });
}
// Phone reads: errors[0].extensions.code === "NOT_FOUND" → shows "gone"
```

---

## Key Concepts

### Test Resolver = Taste Kitchen
Call functions directly + `expect` — no `node server.js`.

### `GraphQLError` + `extensions.code` = Coded Alarm
Phones distinguish `NOT_FOUND` (show gone) vs `SERVER_DOWN` (retry).

---

## Beginner Friendly Explanation

### Analogy: Taste + Fire Alarm
- **Test = taste**: cook → machine tastes.
- **extensions.code = alarm kind**: fire vs door.

### Step 0 — Prepare Device
- `resolvers.js` from W4 + `npm install -D vitest`, run `npx vitest run`.

### How the Computer Reads It
1. `test(...)` calls resolver directly → asserts result.
2. `GraphQLError` with `code` → client reads `errors[0].extensions.code`.

### 3 Must-Know Terms
1. **vitest/GraphQLError**: taste/coded-alarm

---

## Experiments

- **Green:** Break resolver → test red?
- **Yellow:** Raw `Error` vs `GraphQLError` → does phone receive `extensions`?
- **Red:** Test without `await` → fake pass? (Promise unawaited!)

---

## Challenge

**Tested Restaurant:** 4 tests (2 Queries + 1 Mutation + 1 error) GREEN + 2 different `extensions.code`s.

---

## Mini Glossary

- **vitest/GraphQLError**: taste/alarm

---

## Summary

Week 9 of 10: **Coded Tasting** (Level: Intermediate). Edit boldly. Next: **Capstone**.
