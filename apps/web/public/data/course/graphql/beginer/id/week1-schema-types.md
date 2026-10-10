# Schema & Tipe Dasar

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 1:** Schema & Tipe Dasar

## Tujuan Pembelajaran

- Memahami Schema Definition Language
- Tipe dasar: String, Int, Float, Boolean, ID
- Tipe non-null dengan !
- Tipe list dengan []
- Enum dan Scalar

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **GraphQL: Language Feature Support** (`graphql.vscode-graphql`): Syntax highlighting, validasi schema .graphql, dan autocomplete query

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension graphql.vscode-graphql
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

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

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v20.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** GraphQL server dapat dibangun di atas runtime Node.js, Go, Python, maupun Java.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-graphql-api && cd my-graphql-api
npm init -y
npm install @apollo/server graphql
npm install -D typescript tsx @types/node
npx tsc --init
```
- **Keterangan:** Menyiapkan Apollo Server v4 standalone dengan eksekusi TypeScript instan.
- **Pindah ke direktori project:**
```bash
cd my-graphql-api
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npx tsx src/index.ts
```
Akses di browser atau terminal: `http://localhost:4000`

> ℹ️ Buka http://localhost:4000 untuk mengakses Apollo Sandbox IDE.

**File Titik Masuk Utama (`src/index.ts`):**
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
Apollo Server standalone lengkap dengan typeDefs dan resolvers.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-graphql-api/
├── src/
│   ├── schema.ts        # TypeDefs definisi SDL
│   ├── resolvers.ts     # Query & Mutation handlers
│   └── index.ts         # Bootstrap Apollo Server
├── tsconfig.json
└── package.json
```
Struktur modular pemisahan SDL Schema dan Resolvers.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan tag template `#graphql` agar ekstensi VS Code mengaktifkan syntax highlighting di dalam string.
- Gunakan Dataloader untuk mencegah masalah query N+1 pada resolver relasi.

---

## Program: GraphQL Schema Pertama

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

## Konsep Kunci

### SDL
Schema Definition Language untuk mendefinisikan tipe data.

### Tipe Dasar
String, Int, Float, Boolean, ID.

### Non-null
! berarti wajib ada, tidak boleh null.

### List
[Type] untuk array. [Type!]! berarti array non-null berisi non-null.

### Enum
Nilai terbatas yang bisa dipilih.

---

## Eksperimen

- Tambah tipe baru
- Buat enum lain
- Scalar custom
- Interface

---

## Tantangan

Schema e-commerce: Product, User, Category, Order.

---

## Ringkasan

Minggu 1 dari 10: **Schema & Tipe Dasar** (Pemula).
