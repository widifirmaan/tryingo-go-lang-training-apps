# Fragments & Interfaces

> GraphQL | Module 8

## Learning Objectives

- Create fragments for reusable query pieces
- Use interfaces and union types
- Understand inline fragments
- Organize queries with fragments

---

## Program: Reusable Queries

```graphql
fragment UserFields on User {
  id
  name
  email
}

query GetUsers {
  users {
    ...UserFields
  }
}

interface Node {
  id: ID!
}

union SearchResult = User | Post | Comment
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

Module 8 of 16: **Fragments & Interfaces**. GraphQL is a flexible and efficient API query language. Next week: **Subscriptions & Realtime**.
