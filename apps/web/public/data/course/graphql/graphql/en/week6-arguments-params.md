# Arguments & Parameters

> GraphQL | Module 6

## Learning Objectives

- Use arguments in queries and mutations
- Create arguments with different data types
- Use default values for arguments
- Validate arguments in resolver

---

## Program: Parameterized Queries

```graphql
type Query {
  user(id: ID!): User
  users(limit: Int = 10, offset: Int = 0): [User!]!
  searchUsers(query: String!): [User!]!
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

Module 6 of 16: **Arguments & Parameters**. GraphQL is a flexible and efficient API query language. Next week: **Nested Queries & Aliases**.
