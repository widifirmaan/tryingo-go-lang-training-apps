# Error Handling & Validation

> GraphQL | Module 11

## Learning Objectives

- Handle errors in GraphQL
- Use custom error types
- Implement input validation
- Use middleware for error handling

---

## Program: Validation Logic

```graphql
const resolvers = {
  Query: {
    user: (_, { id }) => {
      if (!id) {
        throw new UserInputError('ID is required', { invalidArgs: ['id'] });
      }
      return getUser(id);
    },
  },
};
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

Module 11 of 16: **Error Handling & Validation**. GraphQL is a flexible and efficient API query language. Next week: **Authorization & Security**.
