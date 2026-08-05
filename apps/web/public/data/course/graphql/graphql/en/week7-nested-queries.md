# Nested Queries & Aliases

> GraphQL | Module 7

## Learning Objectives

- Write nested queries for hierarchical data
- Use aliases for multiple queries at once
- Understand query depth and complexity
- Optimize nested queries with DataLoader

---

## Program: Complex Fetching

```graphql
query GetUserWithPosts {
  user(id: "1") {
    name
    posts {
      title
      comments {
        body
        author {
          name
        }
      }
    }
  }
}

query GetUserAndName {
  userDetails: user(id: "1") {
    name
  }
  userName: user(id: "1") {
    name
  }
}
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

Module 7 of 16: **Nested Queries & Aliases**. GraphQL is a flexible and efficient API query language. Next week: **Fragments & Interfaces**.
