# DataLoader & N+1 Problem

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 7:** DataLoader & N+1 Problem

## Learning Objectives

- N+1 problem explained
- DataLoader setup
- Batch loading
- Per-request caching
- Multiple loaders

---

## Program: Query Optimization

```javascript
// DataLoader: solve N+1 problem
const DataLoader = require('dataloader');

// N+1 Problem (BAD)
// Setiap product query category terpisah
const resolversBad = {
  Product: {
    category: async (product) => {
      return db.categories.findById(product.categoryId);  // 1 query per product!
    }
  }
};

// Dengan DataLoader (GOOD)
const createLoaders = () => ({
  categoryLoader: new DataLoader(async (categoryIds) => {
    // Batch load: 1 query untuk semua IDs
    const categories = await db.categories.findByIds(categoryIds);
    const categoryMap = new Map(categories.map(c => [c.id, c]));
    return categoryIds.map(id => categoryMap.get(id));
  }),
  
  productLoader: new DataLoader(async (productIds) => {
    const products = await db.products.findByIds(productIds);
    const productMap = new Map(products.map(p => [p.id, p]));
    return productIds.map(id => productMap.get(id));
  }),
  
  ordersByUserLoader: new DataLoader(async (userIds) => {
    const orders = await db.orders.findByUserIds(userIds);
    const grouped = {};
    orders.forEach(o => {
      if (!grouped[o.userId]) grouped[o.userId] = [];
      grouped[o.userId].push(o);
    });
    return userIds.map(id => grouped[id] || []);
  }),
});

// Gunakan di context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    loaders: createLoaders(),
  }),
});

// Resolver dengan loader
const resolvers = {
  Product: {
    category: (product, _, { loaders }) =>
      loaders.categoryLoader.load(product.categoryId),
  },
  User: {
    orders: (user, _, { loaders }) =>
      loaders.ordersByUserLoader.load(user.id),
  },
  Query: {
    products: () => db.products.findAll(),
  },
};
```

---

## Key Concepts

### N+1 Problem
1 query for parent + N queries for children.

### DataLoader
Batch and cache database calls.

### Batching
Collect IDs, query all at once.

### Caching
Cache per request (not shared).

### Setup
Create loaders in context, call .load(id).

---

## Experiments

- Prime loaders
- Clear caches
- Custom cache keys
- Loader composition

---

## Challenge

Optimize: implement DataLoader for all relations.

---

## Summary

Week 7 of 10: **DataLoader & N+1** (Intermediate).
