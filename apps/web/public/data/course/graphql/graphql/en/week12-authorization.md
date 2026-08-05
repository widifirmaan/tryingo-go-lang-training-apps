# Authorization & Security

> GraphQL | Module 12

## Learning Objectives

- Implement authentication in GraphQL
- Use context for user information
- Apply authorization at resolver level
- Use directives for permission checks

---

## Program: Secure API

```graphql
const resolvers = {
  Query: {
    user: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new ForbiddenError('Admin only');
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

Module 12 of 16: **Authorization & Security**. GraphQL is a flexible and efficient API query language. Next week: **Performance & Caching**.
