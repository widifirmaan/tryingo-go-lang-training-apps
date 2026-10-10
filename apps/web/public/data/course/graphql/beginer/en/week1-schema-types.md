# Schema & Basic Types

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 1:** Schema & Basic Types

## Learning Objectives

- Understand Schema Definition Language
- Basic types: String, Int, Float, Boolean, ID
- Non-null types with !
- List types with []
- Enums and Scalars

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **GraphQL: Language Feature Support** (`graphql.vscode-graphql`): Schema validation, syntax highlighting, and query autocomplete

Or install all recommended extensions at once via terminal:
```bash
code --install-extension graphql.vscode-graphql
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v20.x.x
10.x.x
```

> 💡 **Prerequisite Note:** GraphQL servers can be hosted on Node.js, Go, Python, or Java backends.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-graphql-api && cd my-graphql-api
npm init -y
npm install @apollo/server graphql
npm install -D typescript tsx @types/node
npx tsc --init
```
- **Details:** Sets up Apollo Server v4 standalone powered by TypeScript.
- **Navigate to the project directory:**
```bash
cd my-graphql-api
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npx tsx src/index.ts
```
Open in browser or terminal: `http://localhost:4000`

> ℹ️ Open http://localhost:4000 to launch Apollo Sandbox IDE.

**Initial Entry File (`src/index.ts`):**
```graphql
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: () => [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Bob', email: 'bob@example.com' }
    ],
    user: (_: unknown, args: { id: string }) => ({
      id: args.id,
      name: 'Alice',
      email: 'alice@example.com'
    })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 GraphQL Server siap di ${url}`);
```
Complete standalone Apollo Server with typeDefs and resolvers.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-graphql-api/
├── src/
│   ├── schema.ts        # TypeDefs definisi SDL
│   ├── resolvers.ts     # Query & Mutation handlers
│   └── index.ts         # Bootstrap Apollo Server
├── tsconfig.json
└── package.json
```
Clean separation of GraphQL Schema Definition and Resolver functions.

---

### 6. Beginner Tips & Best Practices
- Prefix strings with `#graphql` for inline VS Code syntax highlighting.
- Use Dataloader to batch and eliminate N+1 database queries in nested resolvers.

---

## Program: First GraphQL Schema

```graphql
# Schema Definition Language (SDL)
type Query {
  # Get all products
  products: [Product!]!
  
  # Get product by ID
  product(id: ID!): Product
  
  # Search products
  searchProducts(keyword: String!): [Product!]!
  
  # Get current user
  me: User
}

type Product {
  id: ID!
  name: String!
  price: Float!
  stock: Int!
  category: Category!
  tags: [String!]
  inStock: Boolean!
}

type User {
  id: ID!
  name: String!
  email: String!
  role: UserRole!
}

type Category {
  id: ID!
  name: String!
  slug: String!
  products: [Product!]!
}

enum UserRole {
  ADMIN
  USER
  SELLER
}

scalar DateTime
```

---

## Key Concepts

### SDL
Schema Definition Language for defining data types.

### Basic Types
String, Int, Float, Boolean, ID.

### Non-null
! means required, cannot be null.

### Lists
[Type] for arrays. [Type!]! means non-null array of non-null.

### Enums
Limited set of allowed values.

---

## Experiments

- Add new types
- Create other enums
- Custom scalars
- Interfaces

---

## Challenge

E-commerce schema: Product, User, Category, Order.

---

## Summary

Week 1 of 10: **Schema & Basic Types** (Beginner).
