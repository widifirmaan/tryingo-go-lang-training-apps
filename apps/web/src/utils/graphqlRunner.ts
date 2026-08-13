import { buildSchema, execute, parse, validate, getIntrospectionQuery, getOperationAST, type GraphQLSchema, type ExecutionResult } from 'graphql';

// --- In-memory data stores ---

interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  skills: string[];
  active: boolean;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  tags: string[];
  inStock: boolean;
}

interface OrderItem {
  product: string;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  total: number;
  status: string;
  date: string;
}

let employees: Employee[] = [
  { id: '1', name: 'Andi Wijaya', department: 'Engineering', salary: 15000000, skills: ['Go', 'Docker', 'Kubernetes'], active: true },
  { id: '2', name: 'Siti Rahayu', department: 'Engineering', salary: 14000000, skills: ['TypeScript', 'React', 'Node.js'], active: true },
  { id: '3', name: 'Budi Santoso', department: 'Product', salary: 13000000, skills: ['Product Management', 'Analytics'], active: true },
  { id: '4', name: 'Dewi Lestari', department: 'Design', salary: 12000000, skills: ['Figma', 'CSS', 'UX Research'], active: true },
  { id: '5', name: 'Rudi Hartono', department: 'Engineering', salary: 16000000, skills: ['Rust', 'Go', 'Systems'], active: false },
  { id: '6', name: 'Maya Putri', department: 'Marketing', salary: 11000000, skills: ['SEO', 'Content', 'Analytics'], active: true },
  { id: '7', name: 'Joko Widodo', department: 'Engineering', salary: 15500000, skills: ['Python', 'ML', 'Data'], active: true },
  { id: '8', name: 'Lisa Permata', department: 'Product', salary: 13500000, skills: ['Agile', 'Scrum', 'JIRA'], active: true },
];

let products: Product[] = [
  { id: '1', name: 'Mechanical Keyboard', category: 'Electronics', price: 1200000, tags: ['keyboard', 'mechanical', 'gaming'], inStock: true },
  { id: '2', name: 'USB-C Hub', category: 'Electronics', price: 450000, tags: ['usb', 'hub', 'connector'], inStock: true },
  { id: '3', name: 'Monitor Stand', category: 'Accessories', price: 350000, tags: ['stand', 'monitor', 'ergonomic'], inStock: true },
  { id: '4', name: 'Webcam HD', category: 'Electronics', price: 800000, tags: ['webcam', 'camera', 'video'], inStock: false },
  { id: '5', name: 'Desk Lamp LED', category: 'Accessories', price: 250000, tags: ['lamp', 'led', 'desk'], inStock: true },
  { id: '6', name: 'Noise Cancelling Headphones', category: 'Electronics', price: 2500000, tags: ['headphones', 'audio', 'noise'], inStock: true },
  { id: '7', name: 'Ergonomic Mouse', category: 'Electronics', price: 600000, tags: ['mouse', 'ergonomic', 'wireless'], inStock: false },
];

let orders: Order[] = [
  {
    id: 'ORD-001', customer: 'Andi Wijaya',
    items: [{ product: 'Mechanical Keyboard', qty: 1 }, { product: 'USB-C Hub', qty: 2 }],
    total: 2100000, status: 'completed', date: '2026-07-15',
  },
  {
    id: 'ORD-002', customer: 'Siti Rahayu',
    items: [{ product: 'Monitor Stand', qty: 1 }, { product: 'Desk Lamp LED', qty: 1 }],
    total: 600000, status: 'processing', date: '2026-07-20',
  },
  {
    id: 'ORD-003', customer: 'Budi Santoso',
    items: [{ product: 'Noise Cancelling Headphones', qty: 1 }],
    total: 2500000, status: 'completed', date: '2026-07-22',
  },
  {
    id: 'ORD-004', customer: 'Dewi Lestari',
    items: [{ product: 'Ergonomic Mouse', qty: 1 }, { product: 'Webcam HD', qty: 1 }],
    total: 1400000, status: 'pending', date: '2026-07-25',
  },
];

let nextEmployeeId = 9;
let nextOrderId = 5;

// --- Sample Schema ---

export const SAMPLE_SCHEMA = `
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

// --- Sample Resolvers ---

interface ResolverContext {
  employees: Employee[];
  products: Product[];
  orders: Order[];
}

const resolvers = {
  Query: {
    employees: () => employees,
    employee: (_: unknown, { id }: { id: string }) => employees.find(e => e.id === id),
    employeesByDepartment: (_: unknown, { department }: { department: string }) =>
      employees.filter(e => e.department.toLowerCase() === department.toLowerCase()),
    products: () => products,
    product: (_: unknown, { id }: { id: string }) => products.find(p => p.id === id),
    orders: () => orders,
    ordersByStatus: (_: unknown, { status }: { status: string }) =>
      orders.filter(o => o.status.toLowerCase() === status.toLowerCase()),
    searchProducts: (_: unknown, { keyword }: { keyword: string }) =>
      products.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(keyword.toLowerCase()))
      ),
  },
  Mutation: {
    hireEmployee: (_: unknown, args: { name: string; department: string; salary: number; skills: string[] }) => {
      const newEmp: Employee = {
        id: String(nextEmployeeId++),
        name: args.name,
        department: args.department,
        salary: args.salary,
        skills: args.skills,
        active: true,
      };
      employees.push(newEmp);
      return newEmp;
    },
    deactivateEmployee: (_: unknown, { id }: { id: string }) => {
      const emp = employees.find(e => e.id === id);
      if (!emp) throw new Error(`Employee with id ${id} not found`);
      emp.active = false;
      return emp;
    },
    createOrder: (_: unknown, args: { customer: string; items: OrderItem[] }) => {
      const total = args.items.reduce((sum, item) => {
        const product = products.find(p => p.name === item.product);
        return sum + (product ? product.price * item.qty : 0);
      }, 0);
      const order: Order = {
        id: `ORD-${String(nextOrderId++).padStart(3, '0')}`,
        customer: args.customer,
        items: args.items,
        total,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      };
      orders.push(order);
      return order;
    },
  },
};

// --- Sample Queries ---

export const SAMPLE_QUERIES = [
  {
    name: 'All Employees',
    query: `query {
  employees {
    id
    name
    department
    salary
    active
  }
}`,
  },
  {
    name: 'Employee by ID',
    query: `query {
  employee(id: "1") {
    id
    name
    department
    skills
  }
}`,
  },
  {
    name: 'Employees by Department',
    query: `query GetByDept($dept: String!) {
  employeesByDepartment(department: $dept) {
    id
    name
    salary
  }
}`,
    variables: { dept: 'Engineering' },
  },
  {
    name: 'Search Products',
    query: `query Search($keyword: String!) {
  searchProducts(keyword: $keyword) {
    id
    name
    price
    inStock
  }
}`,
    variables: { keyword: 'keyboard' },
  },
  {
    name: 'All Orders',
    query: `query {
  orders {
    id
    customer
    total
    status
    items {
      product
      qty
    }
  }
}`,
  },
  {
    name: 'Hire Employee (Mutation)',
    query: `mutation Hire($name: String!, $dept: String!, $salary: Int!, $skills: [String!]!) {
  hireEmployee(name: $name, department: $dept, salary: $salary, skills: $skills) {
    id
    name
    department
    active
  }
}`,
    variables: { name: 'New Hire', dept: 'Engineering', salary: 10000000, skills: ['Go', 'Docker'] },
  },
  {
    name: 'Create Order (Mutation)',
    query: `mutation CreateOrder($customer: String!, $items: [OrderItemInput!]!) {
  createOrder(customer: $customer, items: $items) {
    id
    customer
    total
    status
  }
}`,
    variables: { customer: 'Test User', items: [{ product: 'Mechanical Keyboard', qty: 1 }] },
  },
];

// --- Runner ---

export interface RunQueryResult {
  data: any;
  errors: string[];
  introspection?: any;
}

let cachedSchema: GraphQLSchema | null = null;
let cachedSchemaString: string = '';

function getSchema(schemaStr: string): GraphQLSchema {
  if (cachedSchema && cachedSchemaString === schemaStr) {
    return cachedSchema;
  }
  cachedSchema = buildSchema(schemaStr);
  cachedSchemaString = schemaStr;
  return cachedSchema;
}

export async function runQuery(
  schema: string,
  query: string,
  variables?: Record<string, any>,
  customResolvers?: Record<string, any>,
): Promise<RunQueryResult> {
  try {
    const graphqlSchema = getSchema(schema);
    const document = parse(query);

    const validationErrors = validate(graphqlSchema, document);
    if (validationErrors.length > 0) {
      return {
        data: null,
        errors: validationErrors.map(e => e.message),
      };
    }

    const activeResolvers = customResolvers || resolvers;
    const operation = getOperationAST(document);
    const rootValue = operation?.operation === 'mutation'
      ? activeResolvers.Mutation
      : (activeResolvers.Query || activeResolvers);
    const result = await execute({
      schema: graphqlSchema,
      document,
      variableValues: variables,
      rootValue,
      contextValue: { employees, products, orders } as ResolverContext,
    });

    const output: RunQueryResult = {
      data: result.data || null,
      errors: (result.errors || []).map(e => e.message),
    };

    return output;
  } catch (err) {
    return {
      data: null,
      errors: [err instanceof Error ? err.message : String(err)],
    };
  }
}

export async function runIntrospection(schema: string): Promise<any> {
  try {
    const graphqlSchema = getSchema(schema);
    const result = await execute({
      schema: graphqlSchema,
      document: parse(getIntrospectionQuery()),
    });
    return result.data || null;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export function getSampleSchema(): string {
  return SAMPLE_SCHEMA;
}

export function resetData(): void {
  employees = [
    { id: '1', name: 'Andi Wijaya', department: 'Engineering', salary: 15000000, skills: ['Go', 'Docker', 'Kubernetes'], active: true },
    { id: '2', name: 'Siti Rahayu', department: 'Engineering', salary: 14000000, skills: ['TypeScript', 'React', 'Node.js'], active: true },
    { id: '3', name: 'Budi Santoso', department: 'Product', salary: 13000000, skills: ['Product Management', 'Analytics'], active: true },
    { id: '4', name: 'Dewi Lestari', department: 'Design', salary: 12000000, skills: ['Figma', 'CSS', 'UX Research'], active: true },
    { id: '5', name: 'Rudi Hartono', department: 'Engineering', salary: 16000000, skills: ['Rust', 'Go', 'Systems'], active: false },
    { id: '6', name: 'Maya Putri', department: 'Marketing', salary: 11000000, skills: ['SEO', 'Content', 'Analytics'], active: true },
    { id: '7', name: 'Joko Widodo', department: 'Engineering', salary: 15500000, skills: ['Python', 'ML', 'Data'], active: true },
    { id: '8', name: 'Lisa Permata', department: 'Product', salary: 13500000, skills: ['Agile', 'Scrum', 'JIRA'], active: true },
  ];
  products = [
    { id: '1', name: 'Mechanical Keyboard', category: 'Electronics', price: 1200000, tags: ['keyboard', 'mechanical', 'gaming'], inStock: true },
    { id: '2', name: 'USB-C Hub', category: 'Electronics', price: 450000, tags: ['usb', 'hub', 'connector'], inStock: true },
    { id: '3', name: 'Monitor Stand', category: 'Accessories', price: 350000, tags: ['stand', 'monitor', 'ergonomic'], inStock: true },
    { id: '4', name: 'Webcam HD', category: 'Electronics', price: 800000, tags: ['webcam', 'camera', 'video'], inStock: false },
    { id: '5', name: 'Desk Lamp LED', category: 'Accessories', price: 250000, tags: ['lamp', 'led', 'desk'], inStock: true },
    { id: '6', name: 'Noise Cancelling Headphones', category: 'Electronics', price: 2500000, tags: ['headphones', 'audio', 'noise'], inStock: true },
    { id: '7', name: 'Ergonomic Mouse', category: 'Electronics', price: 600000, tags: ['mouse', 'ergonomic', 'wireless'], inStock: false },
  ];
  orders = [
    { id: 'ORD-001', customer: 'Andi Wijaya', items: [{ product: 'Mechanical Keyboard', qty: 1 }, { product: 'USB-C Hub', qty: 2 }], total: 2100000, status: 'completed', date: '2026-07-15' },
    { id: 'ORD-002', customer: 'Siti Rahayu', items: [{ product: 'Monitor Stand', qty: 1 }, { product: 'Desk Lamp LED', qty: 1 }], total: 600000, status: 'processing', date: '2026-07-20' },
    { id: 'ORD-003', customer: 'Budi Santoso', items: [{ product: 'Noise Cancelling Headphones', qty: 1 }], total: 2500000, status: 'completed', date: '2026-07-22' },
    { id: 'ORD-004', customer: 'Dewi Lestari', items: [{ product: 'Ergonomic Mouse', qty: 1 }, { product: 'Webcam HD', qty: 1 }], total: 1400000, status: 'pending', date: '2026-07-25' },
  ];
  nextEmployeeId = 9;
  nextOrderId = 5;
  cachedSchema = null;
  cachedSchemaString = '';
}
