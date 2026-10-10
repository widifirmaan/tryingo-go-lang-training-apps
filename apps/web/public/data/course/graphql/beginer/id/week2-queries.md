# Queries

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 2:** Queries

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

# Get semua produk
query GetAllProducts {
  products {
    id
    name
    price
    inStock
  }
}

# Get produk by ID
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price
    stock
    category {
      name
      slug
    }
  }
}

# Search produk
query SearchProducts($keyword: String!) {
  searchProducts(keyword: $keyword) {
    id
    name
    price
    inStock
  }
}

# Fragment untuk reuse field
fragment ProductFields on Product {
  id
  name
  price
  stock
  inStock
}

query GetProductsWithFragment {
  products {
    ...ProductFields
    category {
      name
    }
  }
}

# Variables
# {
#   "id": "1",
#   "keyword": "laptop"
# }
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
