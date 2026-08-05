# Performance & Caching

> GraphQL | Module 13

## Learning Objectives

- Use DataLoader for batching
- Implement caching layer
- Understand N+1 query problem
- Optimize resolver performance

---

## Program: Optimization

```graphql
const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (keys) => {
  const users = await db.users.findMany({ where: { id: { in: keys } } });
  return keys.map(key => users.find(u => u.id === key));
});
```

---

## Explanation

GraphQL is a query language for APIs that allows clients to specify exactly what data they need.
Schema defines the data types and operations available.
Resolvers connect schema fields to data sources.
GraphQL replaces REST with a single endpoint and query flexibility.

---

## Experiments

- Change the query and see the response change
- Add a new type to the schema
- Try nested query for hierarchical data

---

## Challenge

Build a complete GraphQL API with queries, mutations, and subscriptions.
Implement authentication and pagination.

---

## Summary

Module 13 of 16: **Performance & Caching**. GraphQL is a flexible and efficient API query language. Next week: **Federation & Microservices**.
