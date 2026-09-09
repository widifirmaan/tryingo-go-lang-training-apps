# Apollo Server — Open GraphQL Restaurant

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 5:** Apollo Server & Client
> **Prerequisites:** Week 4 — **Resolvers**.

## Learning Objectives

- `npm install @apollo/server graphql` + `startStandaloneServer(server, { listen: { port: 4000 } })` opens on `localhost:4000` (source: apollographql.com/docs)
- Combine `typeDefs` (W1 menu) + `resolvers` (W4 kitchen) → finished restaurant

---

## Why This Matters (Non-IT)

Menu + kitchen without a restaurant = can't order. Apollo Server = restaurant building: 1 command gets `GraphiQL` playground + `/` endpoint ready for phone `fetch`.

---

## Program: Finished Shop Restaurant

```bash
npm init -y
npm install @apollo/server graphql
```

```javascript
// index.js — building (menu + kitchen)
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `#graphql
  type Product { id: ID!, name: String!, price: Int!, stock: Int }
  type Query { products: [Product!]!, productById(id: ID!): Product }
  type Mutation { addProduct(name: String!, price: Int!): Product! }
`;

let products = [
  { id: "1", name: "Rice", price: 62000, stock: 10 },
  { id: "2", name: "Spinach", price: 5000, stock: 20 },
];

const resolvers = {
  Query: {
    products: () => products,
    productById: (_, { id }) => products.find(p => p.id === id),
  },
  Mutation: {
    addProduct: (_, { name, price }) => {
      const fresh = { id: String(Date.now()), name, price, stock: 0 };
      products.push(fresh);
      return fresh;
    },
  },
};

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`Restaurant open at ${url}`);
}
start();
```

Open `http://localhost:4000` → GraphiQL → try `query { products { name price } }` + `mutation { addProduct(name:"Sugar", price:15000) { id } }`.

---

## Key Concepts

### `typeDefs` + `resolvers` = Menu + Kitchen
`ApolloServer({ typeDefs, resolvers })` combines → restaurant.

### `startStandaloneServer` = Open Doors
`listen: { port: 4000 }` → `http://localhost:4000`.

---

## Beginner Friendly Explanation

### Analogy: Open Restaurant
- **typeDefs = menu**, **resolvers = cooks**, **ApolloServer = building**, **port 4000 = address**.

### Step 0 — Prepare Device
- `node -v` 20+, `shop-graphql` folder, `npm init -y`, install 2 packages.

### How the Computer Reads It
1. `node index.js` → server listens on 4000.
2. Browser sends `query` → server calls resolver → JSON `{ data }`.

### 3 Must-Know Terms
1. **ApolloServer/typeDefs**: building/menu
2. **startStandaloneServer**: open doors

---

## Experiments

- **Green:** `query { products { name } }` in GraphiQL → 2 names?
- **Yellow:** Change port `4001` → opens `:4001`?
- **Red:** Delete 1 resolver → that query errors? Reattach.

---

## Challenge

**Complete Restaurant:** `typeDefs` + `resolvers` (2 Queries + 2 Mutations) + `node index.js` + GraphiQL screenshot adding a product. **Beginner GraphQL DONE!**

---

## Mini Glossary

- **Apollo/typeDefs/resolvers**: building/menu/kitchen
- **GraphiQL**: playground

---

## Summary

Week 5 of 5: **Finished Restaurant** (Level: Beginner). **Beginner GraphQL DONE!** Next: **Auth & Client** (Intermediate).
