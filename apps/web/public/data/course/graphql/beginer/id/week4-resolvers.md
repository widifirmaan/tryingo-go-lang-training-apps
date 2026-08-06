# Resolvers

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 4:** Resolvers

## Tujuan Pembelajaran

- Query resolver
- Mutation resolver
- Field resolver
- Resolver args (parent, args, context, info)
- Error handling di resolver

---

## Program: Implementasi Resolver

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

---

## Konsep Kunci

### Resolver
Fungsi yang return data untuk field tertentu.

### Signature
(parent, args, context, info) => data.

### Field Resolver
Resolve field computed (inStock, category).

### Context
Object shared semua resolvers (auth, db).

### Error
Throw error untuk gagal.

---

## Eksperimen

- Pagination resolver
- File upload resolver
- Data loader
- Custom directive

---

## Tantangan

Implementasi resolvers lengkap untuk e-commerce.

---

## Ringkasan

Minggu 4 dari 10: **Resolvers** (Pemula).
