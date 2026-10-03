import { buildSchema, parse, validate, execute, getOperationAST } from 'graphql';

const SAMPLE_SCHEMA = `
type Employee {
  id: ID!
  name: String!
  department: String!
  salary: Int!
  skills: [String!]!
  active: Boolean!
}

type Product {
  id: ID!
  name: String!
  category: String!
  price: Int!
  tags: [String!]!
  inStock: Boolean!
}

type Order {
  id: ID!
  customer: String!
  items: [OrderItem!]!
  total: Int!
  status: String!
  date: String!
}

type OrderItem {
  product: String!
  qty: Int!
}

input OrderItemInput {
  product: String!
  qty: Int!
}

type Query {
  employees: [Employee!]!
  employee(id: ID!): Employee
  employeesByDepartment(department: String!): [Employee!]!
  products: [Product!]!
  product(id: ID!): Product
  orders: [Order!]!
  ordersByStatus(status: String!): [Order!]!
  searchProducts(keyword: String!): [Product!]!
}

type Mutation {
  hireEmployee(name: String!, department: String!, salary: Int!, skills: [String!]!): Employee!
  deactivateEmployee(id: ID!): Employee!
  createOrder(customer: String!, items: [OrderItemInput!]!): Order!
}
`;

const schema = buildSchema(SAMPLE_SCHEMA);

const queries = {
  week1: `# Week 1: Query Pertama - Mengambil Katalog Produk
query GetProductsCatalog {
  products {
    id
    name
    category
    price
    inStock
  }
}`,

  week2: `# Week 2: Mutation & Fragments - Membuat Pesanan Baru
mutation CreateNewOrder {
  createOrder(
    customer: "Alex Iskandar"
    items: [
      { product: "Mechanical Keyboard", qty: 1 }
      { product: "USB-C Hub", qty: 2 }
    ]
  ) {
    id
    customer
    total
    status
    date
  }
}`,

  week3: `# Week 3: Resolver Arguments - Profil Karyawan Berdasarkan ID
query GetEmployeeProfile {
  employee(id: "1") {
    id
    name
    department
    salary
    skills
    active
  }
}`,

  week4: `# Week 4: Multi-Entity Queries - Daftar Seluruh Pesanan
query GetAllOrders {
  orders {
    id
    customer
    total
    status
    date
    items {
      product
      qty
    }
  }
}`,

  week5: `# Week 5: Filtering & Department Queries
query GetEngineeringTeam {
  employeesByDepartment(department: "Engineering") {
    id
    name
    department
    salary
    skills
    active
  }
}`,

  week6: `# Week 6: Search & Selection
query SearchProductsCatalog {
  searchProducts(keyword: "keyboard") {
    id
    name
    category
    price
    tags
    inStock
  }
}`,

  week7: `# Week 7: Federated Multi-Entity Overview
query OrganizationAndInventory {
  employees {
    id
    name
    department
  }
  products {
    id
    name
    price
    inStock
  }
}`,

  week8: `# Week 8: Capstone Unified Operations
query UnifiedEcommerceStorefront {
  products {
    id
    name
    category
    price
    inStock
  }
  orders {
    id
    customer
    total
    status
  }
  employees {
    id
    name
    department
  }
}`
};

let allOk = true;
for (const [w, q] of Object.entries(queries)) {
  const doc = parse(q);
  const errors = validate(schema, doc);
  if (errors.length) {
    console.error('FAILED:', w, errors.map(e => e.message));
    allOk = false;
  } else {
    console.log('VALID:', w);
  }
}
if (allOk) console.log('ALL 8 WEEKS VALIDATED SUCCESSFULLY!');
