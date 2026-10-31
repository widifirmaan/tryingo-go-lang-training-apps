# Queries

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 2:** Queries

## Kenapa Materi Ini Penting

GraphQL menggantikan pola "satu endpoint satu bentuk data" REST dengan satu query fleksibel — dipakai GitHub, Shopify, dan banyak aplikasi mobile hemat payload. Bagus untuk project yang frontend-nya sering berubah bentuk data.

Di minggu ke-2 — bertajuk **"Queries"** — program latihan utamanya adalah *"Membuat Query"*. Kerjakan programnya di Playground dulu, ubah sedikit demi sedikit, lalu baca penjelasan konsepnya.


## Tujuan Pembelajaran

- Query dasar
- Query dengan parameter
- Variabel ($variable)
- Fragment untuk reuse
- Nested query

---

## Program: Membuat Query

```graphql
# Query: baca data (GET)

# Fragment untuk reuse field
fragment ProductFields on Product {
  id
  name
  price
  inStock
}

# Get semua produk (dengan fragment)
query GetAllProducts {
  products {
    ...ProductFields
    category
  }
}

# Get satu employee
query GetEmployee {
  employee(id: "1") {
    id
    name
    department
    skills
  }
}

# Search produk (argument)
query SearchProducts {
  searchProducts(keyword: "keyboard") {
    id
    name
    price
    inStock
  }
}

# Dengan variables (isi panel Variables):
# query GetProductById($id: ID!) {
#   product(id: $id) { id name price inStock }
# }
# { "id": "1" }
```

---

## Konsep Kunci

### Query
Operasi baca data. Seperti GET di REST.

### Parameter
Query bisa terima parameter dengan tipe.

### Variabel
Kirim variables terpisah dari query.

### Fragment
Reuse set of fields.

### Nested Query
Query relasi dalam satu request.

---

## Eksperimen

- Alias fields
- Directives @skip/@include
- Multiple queries
- Inline fragments

---

## Tantangan

Query lengkap: produk dengan kategori dan filter.

---

## Ringkasan

Minggu 2 dari 10: **Queries** (Pemula).
