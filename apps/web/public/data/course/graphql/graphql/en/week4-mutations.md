# Mutations & Writing Data

> GraphQL | Module 4

## Learning Objectives

- Write mutations for create, update, delete
- Understand input types for mutation arguments
- Return newly created/updated data
- Understand mutation return types

---

## Program: Write Operations

```graphql
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}

mutation UpdateUser($id: ID!, $name: String) {
  updateUser(id: $id, name: $name) {
    id
    name
    email
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

Module 4 of 16: **Mutations & Writing Data**. GraphQL is a flexible and efficient API query language. Next week: **Resolvers & Data Sources**.
