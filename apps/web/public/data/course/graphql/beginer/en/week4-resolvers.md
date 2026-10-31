# Resolvers

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 4:** Resolvers

## Why This Matters

GraphQL replaces REST's "one endpoint, one data shape" with a single flexible query — used by GitHub, Shopify, and many payload-sensitive mobile apps. Great for products where the frontend keeps changing what data it needs.

Week 4 — themed **"Resolvers"** — centers on the practice program *"Resolver Implementation"*. Run the program in the Playground first, tweak it little by little, then read through the key concepts.


## Learning Objectives

- Query resolvers
- Mutation resolvers
- Field resolvers
- Resolver args (parent, args, context, info)
- Error handling in resolvers

---

## Program: Resolver Implementation

```javascript
// Apollo Server Resolvers
const { ApolloServer, gql } = require('apollo-server');

// Mock database
const products = [
  { id: '1', name: 'Laptop ASUS', price: 12500000, stock: 15, categoryId: '1', tags: ['laptop'] },
  { id: '2', name: 'Mouse Logitech', price: 350000, stock: 50, categoryId: '2', tags: ['mouse'] },
];
const categories = [
  { id: '1', name: 'Elektronik', slug: 'elektronik' },
  { id: '2', name: 'Aksesoris', slug: 'aksesoris' },
];

// Resolvers
const resolvers = {
  // Query resolvers
  Query: {
    products: () => products,
    product: (_, { id }) => products.find(p => p.id === id),
    searchProducts: (_, { keyword }) =>
      products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase())),
    me: (_, __, context) => context.currentUser,
  },

  // Field resolvers
  Product: {
    category: (product) => categories.find(c => c.id === product.categoryId),
    inStock: (product) => product.stock > 0,
  },

  Category: {
    products: (category) => products.filter(p => p.categoryId === category.id),
  },

  // Mutation resolvers
  Mutation: {
    createProduct: (_, { input }, context) => {
      // Auth check
      if (!context.currentUser) throw new Error('Unauthorized');
      
      const product = {
        id: String(products.length + 1),
        ...input,
      };
      products.push(product);
      return product;
    },

    updateProduct: (_, { id, input }) => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      products[index] = { ...products[index], ...input };
      return products[index];
    },

    deleteProduct: (_, { id }) => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return false;
      products.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
```


## Playground: GraphQL Operations

```graphql
# Week 4 — Resolver operations: Query + Argument + Field resolution + Errors
# (Nama field diselesaikan oleh field resolver di sisi server)
query ResolverDemo {
  employee(id: "1") {
    id
    name
    department
    skills
  }
  products {
    id
    name
    price
    inStock
  }
  searchProducts(keyword: "monitor") {
    id
    name
  }
}
# Coba juga ID yang tidak ada -> employee(id: "999") mengembalikan null
```

---

## Key Concepts

### Resolvers
Functions that return data for specific fields.

### Signature
(parent, args, context, info) => data.

### Field Resolvers
Resolve computed fields (inStock, category).

### Context
Object shared across all resolvers (auth, db).

### Errors
Throw errors for failures.

---

## Experiments

- Pagination resolvers
- File upload resolvers
- Data loaders
- Custom directives

---

## Challenge

Complete resolver implementation for e-commerce.

---

## Summary

Week 4 of 10: **Resolvers** (Beginner).
