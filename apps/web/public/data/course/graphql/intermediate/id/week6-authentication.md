# Authentication — KTP Restoran GraphQL

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 6:** Authentication & Authorization
> **Prasyarat:** Minggu 5 — **Apollo Server**.

## Tujuan Pembelajaran

- `login(email, password)` mutation → JWT `token`, `context: { user }` KTP tiap request, tolak jika bukan pemilik (sumber: apollographql.com/docs/apollo-server/security/authentication)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa auth, siapa saja `mutation { hapusProduk }` hapus semua. Dengan JWT di `Authorization: Bearer`, server tahu siapa + tolak yang bukan pemilik.

---

## Program: KTP Warung GraphQL

```javascript
const jwt = require("jsonwebtoken");
const SECRET = "rahasia-warung";

// 1. Login → token
const resolvers = {
  Mutation: {
    login: (_, { email, password }) => {
      if (email === "admin@warung.com" && password === "123") {
        const token = jwt.sign({ email, role: "admin" }, SECRET);
        return { token };
      }
      throw new Error("Salah");
    },
    tambahProduk: (_, { input }, context) => {
      if (!context.user) throw new Error("Login dulu!"); // satpam
      return { id: "9", ...input };
    },
  },
};

// 2. Server baca KTP tiap request
const server = new ApolloServer({
  typeDefs, resolvers,
  context: ({ req }) => {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    try {
      return { user: jwt.verify(token, SECRET) }; // KTP sah?
    } catch { return {}; } // tanpa KTP
  },
});
```

Test GraphiQL: `mutation { login(email:"admin@warung.com", password:"123") { token } }` → Headers `{"Authorization": "Bearer TOKEN"}` → `tambahProduk` lolos. Tanpa header → "Login dulu!".


```graphql
# Auth = gelang konser: intip 1 produk (tempel di playground → Run)
query {
  product(id: "2") { name price inStock }
}
```
---

## Konsep Kunci

### `login` → JWT → `context.user` = KTP
Login 1x dapat token, tiap request bawa token, server isi `context.user`.

### Satpam di Resolver
`if (!context.user) throw` — tolak sebelum masak.

---

## Penjelasan untuk Pemula

### Analogi: Gelang Konser
- **Login = tukar tiket jadi gelang (JWT)**, **context = periksa gelang** tiap pintu.

### 3 Istilah Wajib
1. **JWT/context/Bearer**: gelang/periksa/bawa

---

## Eksperimen

- **Hijau:** Tanpa header → "Login dulu!"?
- **Kuning:** Token palsu → ditolak?
- **Merah:** `tambahProduk` tanpa cek `context.user` → bebas tanpa login? (Jangan! Pasang.)

---

## Tantangan

**Restoran Ber-KTP:** `login` + `tambahProduk` (wajib login) + `produk` (bebas) + GraphiQL 3 test (tanpa/palsu/asli).
- **Sambungan (Minggu 5 — Apollo Server):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **JWT/Bearer/context**: gelang/bawa/periksa

---

## Ringkasan

Minggu 6 dari 10: **KTP Restoran** (Level: Menengah). Pintu terjaga. Minggu depan: **DataLoader**.
