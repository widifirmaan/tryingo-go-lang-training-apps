# Resolvers & Data Sources

> GraphQL | Module 5

## Learning Objectives

- Understand resolver functions
- Connect resolvers to data sources
- Use resolver chaining for nested data
- Understand resolver context

---

## Program: Resolver Logic

```graphql
const resolvers = {
  Query: {
    user: (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id);
    },
  },
  User: {
    posts: (user, _, { dataSources }) => {
      return dataSources.postAPI.getPostsByUserId(user.id);
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

Module 5 of 16: **Resolvers & Data Sources**. GraphQL is a flexible and efficient API query language. Next week: **Arguments & Parameters**.
