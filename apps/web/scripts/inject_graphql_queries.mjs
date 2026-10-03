import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queries = {
  1: {
    idTitle: 'Uji Coba Query di Playground',
    idDesc: 'Jalankan query GraphQL berikut langsung pada panel playground di samping untuk mengamati bagaimana GraphQL hanya mengembalikan field yang Anda minta tanpa over-fetching:',
    idCode: `# Week 1: Query Pertama - Mengambil Katalog Produk
query GetProductsCatalog {
  products {
    id
    name
    category
    price
    inStock
  }
}`,
    enTitle: 'Interactive Playground Query',
    enDesc: 'Run the following GraphQL query directly in the playground panel on the right to see how GraphQL returns only the exact fields requested without over-fetching:',
    enCode: `# Week 1: First Query - Fetching Product Catalog
query GetProductsCatalog {
  products {
    id
    name
    category
    price
    inStock
  }
}`,
  },
  2: {
    idTitle: 'Uji Coba Mutation di Playground',
    idDesc: 'Jalankan operasi Mutation berikut di panel playground untuk menambahkan pesanan baru ke sistem dengan input payload terstruktur:',
    idCode: `# Week 2: Mutation & Payload - Membuat Pesanan Baru
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
    enTitle: 'Interactive Playground Mutation',
    enDesc: 'Run the following Mutation operation in the playground panel to add a new order to the system with structured input payload:',
    enCode: `# Week 2: Mutation & Payload - Create New Order
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
  },
  3: {
    idTitle: 'Uji Coba Resolver Parameter di Playground',
    idDesc: 'Jalankan query berparameter ID berikut di playground untuk melihat bagaimana fungsi resolver menangkap argumen spesifik:',
    idCode: `# Week 3: Resolver Arguments - Profil Karyawan Berdasarkan ID
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
    enTitle: 'Interactive Playground Resolver Arguments',
    enDesc: 'Run the following parameterized ID query in the playground to observe how resolver functions capture specific arguments:',
    enCode: `# Week 3: Resolver Arguments - Employee Profile by ID
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
  },
  4: {
    idTitle: 'Uji Coba Query Relasi di Playground',
    idDesc: 'Jalankan query relasi pesanan dan item berikut di playground untuk mengamati eksekusi struktur data bertingkat:',
    idCode: `# Week 4: Multi-Entity Queries - Daftar Seluruh Pesanan
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
    enTitle: 'Interactive Playground Nested Query',
    enDesc: 'Run the following nested order & items relation query in the playground to inspect nested multi-entity resolution:',
    enCode: `# Week 4: Multi-Entity Queries - Fetch All Orders
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
  },
  5: {
    idTitle: 'Uji Coba Filter Kategori di Playground',
    idDesc: 'Jalankan query penyaringan departemen berikut di playground untuk melihat pemfilteran data terarah:',
    idCode: `# Week 5: Filtering & Department Queries
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
    enTitle: 'Interactive Playground Filter Query',
    enDesc: 'Run the following department filter query in the playground to observe targeted data filtering:',
    enCode: `# Week 5: Filtering & Department Queries
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
  },
  6: {
    idTitle: 'Uji Coba Pencarian di Playground',
    idDesc: 'Jalankan query pencarian kata kunci berikut di playground untuk menguji filter pencarian dan pembatasan field:',
    idCode: `# Week 6: Search & Selection
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
    enTitle: 'Interactive Playground Search Query',
    enDesc: 'Run the following keyword search query in the playground to test catalog filtering and field restrictions:',
    enCode: `# Week 6: Search & Selection
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
  },
  7: {
    idTitle: 'Uji Coba Multi-Domain di Playground',
    idDesc: 'Jalankan query gabungan domain inventaris dan organisasi berikut di playground:',
    idCode: `# Week 7: Federated Multi-Entity Overview
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
    enTitle: 'Interactive Playground Multi-Domain Query',
    enDesc: 'Run the following combined organization and inventory domain query in the playground:',
    enCode: `# Week 7: Federated Multi-Entity Overview
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
  },
  8: {
    idTitle: 'Uji Coba Capstone Gateway di Playground',
    idDesc: 'Jalankan query orkestrasi lengkap toko daring (produk, pesanan, staf) berikut pada gateway:',
    idCode: `# Week 8: Capstone Unified Operations
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
}`,
    enTitle: 'Interactive Playground Capstone Gateway Query',
    enDesc: 'Run the following comprehensive storefront orchestration query (products, orders, employees) on the gateway:',
    enCode: `# Week 8: Capstone Unified Operations
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
}`,
  },
};

const graphqlDir = path.resolve(__dirname, '../public/data/course/graphql');

function walkAndInject(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkAndInject(full);
    } else if (ent.name.endsWith('.md')) {
      const isId = full.includes(path.sep + 'id' + path.sep);
      const weekMatch = ent.name.match(/week(\d+)/);
      if (!weekMatch) continue;
      const weekNum = parseInt(weekMatch[1], 10);
      const q = queries[weekNum];
      if (!q) continue;

      let content = fs.readFileSync(full, 'utf8');
      
      // If file already has ```graphql block, skip or replace
      if (content.includes('```graphql')) {
        console.log(`Skipping already injected: ${ent.name}`);
        continue;
      }

      const sectionTitle = isId ? q.idTitle : q.enTitle;
      const sectionDesc = isId ? q.idDesc : q.enDesc;
      const sectionCode = isId ? q.idCode : q.enCode;

      const injection = `\n---\n\n## ${sectionTitle}\n\n${sectionDesc}\n\n\`\`\`graphql\n${sectionCode}\n\`\`\`\n`;

      // Insert before "## Konsep Kunci" or "## Key Concepts"
      const targetHeader = isId ? '## Konsep Kunci' : '## Key Concepts';
      const targetIdx = content.indexOf(targetHeader);
      if (targetIdx !== -1) {
        content = content.slice(0, targetIdx) + injection + '\n' + content.slice(targetIdx);
      } else {
        // Fallback: append before ## Summary / ## Ringkasan
        const fallbackHeader = isId ? '## Ringkasan' : '## Summary';
        const fbIdx = content.indexOf(fallbackHeader);
        if (fbIdx !== -1) {
          content = content.slice(0, fbIdx) + injection + '\n' + content.slice(fbIdx);
        } else {
          content += injection;
        }
      }

      fs.writeFileSync(full, content, 'utf8');
      console.log(`Updated ${isId ? 'ID' : 'EN'} Week ${weekNum}: ${ent.name}`);
    }
  }
}

walkAndInject(graphqlDir);
console.log('Finished injecting GraphQL playground queries.');
