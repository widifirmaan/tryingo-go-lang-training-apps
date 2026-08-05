# Pagination & Connections

> GraphQL | Module 10

## Learning Objectives

- Understand cursor-based pagination
- Use Relay Connection specification
- Implement pageInfo and edges
- Compare offset vs cursor pagination

---

## Program: Cursor Pagination

```graphql
type Query {
  users(first: Int!, after: String): UserConnection!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  cursor: String!
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
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

Module 10 of 16: **Pagination & Connections**. GraphQL is a flexible and efficient API query language. Next week: **Error Handling & Validation**.
