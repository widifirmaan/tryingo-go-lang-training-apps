# Resolver Execution Tree & Context Autentikasi

> **Kategori:** GraphQL | **Level:** Fondasi Skema & Eksekusi Query/Mutation | **Minggu 3:** Resolver Execution Tree & Context Autentikasi

## Tujuan Pembelajaran

- Memahami cara kerja pohon eksekusi resolver hierarkis (*Resolver Execution Tree*)
- Menguasai empat parameter resolver: parent (root), args, context, dan info
- Menginjeksikan metadata request (token JWT, session, connection) ke dalam GraphQL Context
- Melempar exception terstruktur dengan GraphQLError dan extension code

---

## Program: Pohon Eksekusi Resolver Bertingkat dengan Validasi JWT Context

```typescript
import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String!
    author: User! # Nested relational field resolved independently!
  }

  type Item {
    id: ID!
    name: String!
    price: Float!
    reviews: [Review!]! # Nested array resolver
  }

  type Query {
    item(id: ID!): Item
  }
`;

// Context Interface injected per request
interface GraphQLContext {
  currentUser: { id: string; username: string; role: string } | null;
}

// 4-Tier Resolver Architecture: (parent, args, context, info)
const resolvers = {
  Query: {
    item: (_parent: unknown, args: { id: string }) => {
      // Root level query resolver fetches the Item
      return { id: args.id, name: 'Pro Wireless Keyboard', price: 890000.0 };
    },
  },
  Item: {
    // Nested resolver for Item.reviews: 'parent' is the Item object resolved above!
    reviews: (parent: { id: string }, _args: unknown, context: GraphQLContext) => {
      // Guard sensitive data with request context
      if (!context.currentUser) {
        throw new GraphQLError('Authentication required to view item reviews.', {
          extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
        });
      }

      return [
        { id: 'rev_1', rating: 5, comment: 'Tactile switches feel incredible!', authorId: 'usr_88' },
        { id: 'rev_2', rating: 4, comment: 'Great battery life.', authorId: 'usr_99' },
      ];
    },
  },
  Review: {
    // Nested resolver for Review.author: 'parent' is the Review object!
    author: (parent: { authorId: string }) => {
      const USERS_DB: Record<string, { id: string; username: string; email: string }> = {
        usr_88: { id: 'usr_88', username: 'keyboard_enthusiast', email: 'ke@example.com' },
        usr_99: { id: 'usr_99', username: 'coder_budi', email: 'budi@example.com' },
      };
      return USERS_DB[parent.authorId];
    },
  },
};

export { typeDefs, resolvers, GraphQLContext };
```

---

## Konsep Kunci

### Anatomi Empat Parameter Resolver
Setiap fungsi resolver di GraphQL menerima 4 parameter universal:
1. `parent` (atau `root`): Hasil data kembalian dari resolver satu tingkat di atasnya dalam pohon query hierarkis.
2. `args`: Parameter argumen yang dikirimkan oleh klien dalam query SDL (`args: { id: "..." }`).
3. `context`: Objek bersama (*shared object*) yang dibuat baru untuk setiap permintaan HTTP masuk. Tempat ideal menyimpan informasi otentikasi token JWT, koneksi database, atau loader.
4. `info`: Metadata AST (*Abstract Syntax Tree*) internal mengenai query yang sedang dieksekusi.

### Pohon Eksekusi Resolver (Execution Tree)
Resolver di GraphQL bekerja secara bertingkat seperti struktur pohon (*tree traversal*):
1. Query meminta: `item -> reviews -> author -> username`.
2. Pertama, resolver `Query.item` dieksekusi dan mengembalikan objek `{ id, name, price }`.
3. Kedua, GraphQL mengecek apakah field `reviews` meminta data. Resolver `Item.reviews` dipanggil dengan menerima objek `item` tadi sebagai parameter `parent`.
4. Ketiga, untuk setiap review di dalam array, resolver `Review.author` dipanggil secara mandiri dengan menerima review individual sebagai `parent`.

### Keamanan Berbasis Context
Otentikasi tidak boleh di-hardcode di tiap resolver. Middleware HTTP memvalidasi header `Authorization: Bearer <jwt>`, meng-decode payload pengguna, dan menyematkannya ke dalam `context.currentUser`. Resolver mana pun dalam pohon dapat memeriksa `context.currentUser` untuk otorisasi hak akses.

---

---

## Penjelasan untuk Pemula

Bayangkan pohon eksekusi resolver seperti silsilah keluarga. 
Kakek (`Query.item`) memanggil Ayah (`Item.reviews`). Saat Ayah berbicara, ia membawa nama Kakek sebagai `parent`. Lalu Ayah memanggil Cucu (`Review.author`). 

Context seperti udara di dalam ruangan rumah: semua orang dari Kakek, Ayah, hingga Cucu bisa menghirup udara yang sama. Jika udaranya beracun (token JWT tidak sah), seluruh anggota keluarga tahu saat itu juga!

## Eksperimen

- Uji query tanpa header otentikasi dan verifikasi kemunculan error UNAUTHENTICATED
- Kirim header otentikasi valid pada Context dan amati ulasan produk berhasil dimuat
- Cetak parameter parent di console pada resolver Review.author untuk melihat data review yang diteruskan
- Periksa struktur parameter info untuk melihat field AST yang diminta klien

---

## Tantangan

Buat directive kustom `@auth(requires: ADMIN)` atau middleware context guard yang memblokir akses ke field email pengguna jika peran (`role`) di dalam JWT bukan administrator.

---

## Ringkasan

Anda telah menguasai arsitektur pohon eksekusi resolver bertingkat, empat parameter utama (parent, args, context, info), serta penegakan keamanan autentikasi melalui GraphQL Context.
