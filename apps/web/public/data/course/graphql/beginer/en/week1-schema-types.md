# Schema & Basic Types

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 1:** Schema & Basic Types

## Why This Matters

GraphQL replaces REST's "one endpoint, one data shape" with a single flexible query - used by GitHub, Shopify, and many payload-sensitive mobile apps. Great for products where the frontend keeps changing what data it needs.

Practice program: *"First GraphQL Schema"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand Schema Definition Language
- Basic types: String, Int, Float, Boolean, ID
- Non-null types with !
- List types with []
- Enums and Scalars


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Node.js LTS (v20+))
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

> **Prerequisite Note:** GraphQL servers can be hosted on Node.js, Go, Python, or Java backends.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npx tsx src/index.ts
```
Open in browser or terminal: `http://localhost:4000`

> ℹ️ Open http://localhost:4000 to launch Apollo Sandbox IDE.

**Initial Entry File (`src/index.ts`):**
```javascript
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
console.log(`GraphQL Server siap di ${url}`);
```
Complete standalone Apollo Server with typeDefs and resolvers.

---

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
- Prefix strings with `#graphql` for inline VS Code syntax highlighting.
- Use Dataloader to batch and eliminate N+1 database queries in nested resolvers.

---

## Playground: GraphQL Operations

```graphql
# Week 1 - Introspection: tampilkan semua type yang didefinisikan server
query AllTypes {
  __schema {
    types {
      name
      kind
    }
  }
}
```

---

## Program: First GraphQL Schema

```sdl
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
