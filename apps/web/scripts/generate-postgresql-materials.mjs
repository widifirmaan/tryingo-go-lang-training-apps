import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/postgresql/postgresql');

const MODULES = [
  { id: 1, f: 'pengenalan-postgresql', lid: 'Pengenalan PostgreSQL & Setup', len: 'Introduction to PostgreSQL & Setup', pid: 'Hello PostgreSQL', pen: 'Hello PostgreSQL' },
  { id: 2, f: 'data-types', lid: 'Data Types & Schema Design', len: 'Data Types & Schema Design', pid: 'Schema Design', pen: 'Schema Design' },
  { id: 3, f: 'crud-operations', lid: 'CRUD Operations', len: 'CRUD Operations', pid: 'Basic Queries', pen: 'Basic Queries' },
  { id: 4, f: 'filtering-sorting', lid: 'Filtering & Sorting', len: 'Filtering & Sorting', pid: 'Advanced Queries', pen: 'Advanced Queries' },
  { id: 5, f: 'joins', lid: 'JOINs & Relationships', len: 'JOINs & Relationships', pid: 'Multi-table Queries', pen: 'Multi-table Queries' },
  { id: 6, f: 'aggregations', lid: 'Aggregations & Group By', len: 'Aggregations & Group By', pid: 'Analytics Queries', pen: 'Analytics Queries' },
  { id: 7, f: 'subqueries', lid: 'Subqueries & CTEs', len: 'Subqueries & CTEs', pid: 'Complex Queries', pen: 'Complex Queries' },
  { id: 8, f: 'indexing', lid: 'Indexing & Performance', len: 'Indexing & Performance', pid: 'Query Optimization', pen: 'Query Optimization' },
  { id: 9, f: 'transactions', lid: 'Transactions & ACID', len: 'Transactions & ACID', pid: 'Data Integrity', pen: 'Data Integrity' },
  { id: 10, f: 'views-functions', lid: 'Views & Functions', len: 'Views & Functions', pid: 'Stored Logic', pen: 'Stored Logic' },
  { id: 11, f: 'json-document', lid: 'JSON & Document Queries', len: 'JSON & Document Queries', pid: 'Flexible Data', pen: 'Flexible Data' },
  { id: 12, f: 'security', lid: 'Security & Roles', len: 'Security & Roles', pid: 'Access Control', pen: 'Access Control' },
  { id: 13, f: 'backup-restore', lid: 'Backup & Restore', len: 'Backup & Restore', pid: 'Data Protection', pen: 'Data Protection' },
  { id: 14, f: 'partitioning', lid: 'Partitioning & Scaling', len: 'Partitioning & Scaling', pid: 'Large Data', pen: 'Large Data' },
  { id: 15, f: 'extensions', lid: 'Extensions & Tools', len: 'Extensions & Tools', pid: 'PostGIS & pg_trgm', pen: 'PostGIS & pg_trgm' },
  { id: 16, f: 'capstone', lid: 'Capstone: E-commerce DB', len: 'Capstone: E-commerce Database', pid: 'Full Database Design', pen: 'Full Database Design' },
];

const OBJ = {
  1: { id: ['Mengenal PostgreSQL sebagai RDBMS open-source', 'Menginstall PostgreSQL dan pgAdmin', 'Memahami konsep database relasional', 'Membuat database dan tabel pertama'], en: ['Understand PostgreSQL as an open-source RDBMS', 'Install PostgreSQL and pgAdmin', 'Understand relational database concepts', 'Create your first database and table'] },
  2: { id: ['Mengenal tipe data: integer, varchar, text, boolean, date, timestamp', 'Merancang schema yang efisien', 'Memahami normalisasi (1NF, 2NF, 3NF)', 'Membuat tabel dengan constraints'], en: ['Learn data types: integer, varchar, text, boolean, date, timestamp', 'Design efficient schemas', 'Understand normalization (1NF, 2NF, 3NF)', 'Create tables with constraints'] },
  3: { id: ['Melakukan INSERT, SELECT, UPDATE, DELETE', 'Memahami WHERE clause', 'Menggunakan LIMIT dan OFFSET', 'Memahami operator LIKE dan IN'], en: ['Perform INSERT, SELECT, UPDATE, DELETE', 'Understand WHERE clause', 'Use LIMIT and OFFSET', 'Understand LIKE and IN operators'] },
  4: { id: ['Menggunakan ORDER BY untuk sorting', 'Memahami WHERE dengan AND, OR, NOT', 'Menggunakan BETWEEN dan IS NULL', 'Membuat query filtering yang efisien'], en: ['Use ORDER BY for sorting', 'Understand WHERE with AND, OR, NOT', 'Use BETWEEN and IS NULL', 'Create efficient filtering queries'] },
  5: { id: ['Memahami INNER JOIN, LEFT JOIN, RIGHT JOIN', 'Menggunakan JOIN untuk multi-table queries', 'Memahami self-join', 'Menggunakan alias untuk kejelasan'], en: ['Understand INNER JOIN, LEFT JOIN, RIGHT JOIN', 'Use JOIN for multi-table queries', 'Understand self-join', 'Use aliases for clarity'] },
  6: { id: ['Menggunakan COUNT, SUM, AVG, MIN, MAX', 'Memahami GROUP BY', 'Menggunakan HAVING untuk filter grup', 'Membuat laporan agregasi'], en: ['Use COUNT, SUM, AVG, MIN, MAX', 'Understand GROUP BY', 'Use HAVING for group filtering', 'Create aggregation reports'] },
  7: { id: ['Memahami subqueries', 'Menggunakan CTE (Common Table Expressions)', 'Menggabungkan subquery dan JOIN', 'Membuat query berlapis'], en: ['Understand subqueries', 'Use CTE (Common Table Expressions)', 'Combine subqueries with JOINs', 'Create layered queries'] },
  8: { id: ['Memahami B-tree indexes', 'Membuat index pada kolom frequently queried', 'Memahami covering indexes', 'Menganalisis query dengan EXPLAIN'], en: ['Understand B-tree indexes', 'Create indexes on frequently queried columns', 'Understand covering indexes', 'Analyze queries with EXPLAIN'] },
  9: { id: ['Memahami ACID properties', 'Menggunakan BEGIN, COMMIT, ROLLBACK', 'Memahami isolation levels', 'Mengimplementasi transfer antar rekening'], en: ['Understand ACID properties', 'Use BEGIN, COMMIT, ROLLBACK', 'Understand isolation levels', 'Implement inter-account transfer'] },
  10: { id: ['Membuat views untuk query yang sering digunakan', 'Membuat fungsi SQL', 'Menggunakan stored procedures', 'Memahami materialized views'], en: ['Create views for frequently used queries', 'Create SQL functions', 'Use stored procedures', 'Understand materialized views'] },
  11: { id: ["Menyimpan data JSON di PostgreSQL", "Menggunakan operator JSON (->, ->>, #>)", "Querying JSON data", "Memahami kapan gunakan JSON vs relational"], en: ["Store JSON data in PostgreSQL", "Use JSON operators (->, ->>, #>)", "Query JSON data", "Understand when to use JSON vs relational"] },
  12: { id: ['Membuat user dan role', 'Memberikan GRANT dan REVOKE', 'Memahami row-level security', 'Mengimplementasi schema isolation'], en: ['Create users and roles', 'Grant and revoke permissions', 'Understand row-level security', 'Implement schema isolation'] },
  13: { id: ['Melakukan pg_dump untuk backup', 'Menggunakan pg_restore untuk restore', 'Memahami point-in-time recovery', 'Mengatur automated backup'], en: ['Use pg_dump for backup', 'Use pg_restore for restore', 'Understand point-in-time recovery', 'Set up automated backup'] },
  14: { id: ['Memahami table partitioning', 'Menggunakan range dan list partitioning', 'Optimasi query pada tabel besar', 'Memahami tablespaces'], en: ['Understand table partitioning', 'Use range and list partitioning', 'Optimize queries on large tables', 'Understand tablespaces'] },
  15: { id: ['Menginstall dan menggunakan PostGIS', 'Menggunakan pg_trgm untuk fuzzy search', 'Menggunakan uuid-ossp', 'Menggunakan hstore untuk key-value storage'], en: ['Install and use PostGIS', 'Use pg_trgm for fuzzy search', 'Use uuid-ossp', 'Use hstore for key-value storage'] },
  16: { id: ['Merancang database e-commerce lengkap', 'Menggabungkan semua konsep SQL', 'Mengoptimasi schema untuk performa', 'Mempersiapkan deployment database'], en: ['Design a complete e-commerce database', 'Combine all SQL concepts', 'Optimize schema for performance', 'Prepare database for deployment'] },
};

const CODE = {
  1: `-- Connect to PostgreSQL\npsql -U postgres -d mydb\n\n-- Create a table\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Insert data\nINSERT INTO users (name, email) VALUES ('Budi', 'budi@example.com');\n\n-- Query all\nSELECT * FROM users;`,
  2: `CREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(200) NOT NULL,\n    price DECIMAL(10, 2) NOT NULL,\n    stock INTEGER DEFAULT 0,\n    is_active BOOLEAN DEFAULT true,\n    created_at DATE DEFAULT CURRENT_DATE\n);\n\n-- Normalization: separate categories\nCREATE TABLE categories (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);`,
  3: `-- INSERT\nINSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');\n\n-- SELECT\nSELECT * FROM users WHERE active = true;\n\n-- UPDATE\nUPDATE users SET email = 'new@example.com' WHERE id = 1;\n\n-- DELETE\nDELETE FROM users WHERE id = 1;`,
  4: `SELECT * FROM orders\nWHERE total > 100000\n  AND status = 'completed'\n  AND created_at BETWEEN '2025-01-01' AND '2025-12-31'\nORDER BY created_at DESC\nLIMIT 10;`,
  5: `SELECT o.id, u.name, o.total\nFROM orders o\nINNER JOIN users u ON o.user_id = u.id\nLEFT JOIN payments p ON o.id = p.order_id\nWHERE o.status = 'completed';`,
  6: `SELECT category_id, COUNT(*) as total_products,\n       AVG(price) as avg_price,\n       SUM(stock) as total_stock\nFROM products\nGROUP BY category_id\nHAVING COUNT(*) > 5\nORDER BY avg_price DESC;`,
  7: `WITH monthly_sales AS (\n    SELECT DATE_TRUNC('month', created_at) as month,\n           SUM(total) as revenue\n    FROM orders\n    GROUP BY DATE_TRUNC('month', created_at)\n)\nSELECT * FROM monthly_sales\nWHERE revenue > 1000000;`,
  8: `-- Create index\nCREATE INDEX idx_orders_user_id ON orders(user_id);\n\n-- Analyze query\nEXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1;`,
  9: `BEGIN;\n\nUPDATE accounts SET balance = balance - 500000 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500000 WHERE id = 2;\n\nCOMMIT;\n-- If error: ROLLBACK;`,
  10: `CREATE VIEW active_users AS\nSELECT id, name, email, created_at\nFROM users\nWHERE active = true;\n\nCREATE FUNCTION get_user_order_count(p_user_id INTEGER)\nRETURNS INTEGER AS $$\nBEGIN\n    RETURN (SELECT COUNT(*) FROM orders WHERE user_id = p_user_id);\nEND;\n$$ LANGUAGE plpgsql;`,
  11: `INSERT INTO products (name, metadata)\nVALUES ('Laptop', '{"brand": "Dell", "ram": "16GB", "ssd": "512GB"}');\n\nSELECT name, metadata->>'brand' as brand\nFROM products\nWHERE metadata->>'ram' = '16GB';`,
  12: `CREATE ROLE app_readonly WITH LOGIN PASSWORD 'secure_pass';\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;\nREVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM app_readonly;`,
  13: `-- Backup\npg_dump -U postgres -d mydb -f backup.sql\n\n-- Restore\npsql -U postgres -d mydb -f backup.sql\n\n-- Backup with format\npg_dump -U postgres -d mydb -Fc -f backup.dump`,
  14: `CREATE TABLE sales (\n    id SERIAL,\n    sale_date DATE NOT NULL,\n    amount DECIMAL(12, 2),\n    PRIMARY KEY (id, sale_date)\n) PARTITION BY RANGE (sale_date);\n\nCREATE TABLE sales_2025 PARTITION OF sales\n    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');`,
  15: `-- PostGIS: spatial queries\nCREATE EXTENSION postgis;\nSELECT ST_Distance(geom1, geom2) FROM locations;\n\n-- pg_trgm: fuzzy search\nCREATE EXTENSION pg_trgm;\nSELECT name FROM products WHERE name % 'laptop';\n\n-- UUID\nCREATE EXTENSION uuid-ossp;\nINSERT INTO orders (id, total) VALUES (uuid_generate_v4(), 100000);`,
  16: `-- E-commerce Database Schema\n-- Tables: users, products, categories, orders, order_items, payments, reviews, addresses\n-- All concepts combined: constraints, indexes, views, functions, JSON, security`,
};

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. PostgreSQL adalah RDBMS open-source yang kuat dengan fitur JSON, indexing, dan ekstensi. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> PostgreSQL | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```sql\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'PostgreSQL adalah database relasional open-source yang mendukung SQL standar dan fitur lanjutan.\nPostgreSQL mendukung JSON, indexing lanjutan, transaksi ACID, dan ekstensi seperti PostGIS.\nGunakan psql untuk berinteraksi dengan database dari command line.'
      : 'PostgreSQL is an open-source relational database that supports standard SQL and advanced features.\nPostgreSQL supports JSON, advanced indexing, ACID transactions, and extensions like PostGIS.\nUse psql to interact with the database from the command line.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah query di atas dan lihat hasilnya' : 'Change the query above and see the results') + '\n'
    + '- ' + (isId ? 'Tambah tabel baru dan buat relasi' : 'Add a new table and create a relationship') + '\n'
    + '- ' + (isId ? 'Coba gunakan EXPLAIN untuk analisis query' : 'Try using EXPLAIN for query analysis') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.\nJalankan query dan verifikasi hasilnya di psql atau pgAdmin.'
      : 'Build a database schema for a simple application using this weeks concepts.\nRun queries and verify results in psql or pgAdmin.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' PostgreSQL curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);