import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/mysql/mysql');

const MODULES = [
  { id: 1, f: 'pengenalan-mysql', lid: 'Pengenalan MySQL & Setup', len: 'Introduction to MySQL & Setup', pid: 'Hello MySQL', pen: 'Hello MySQL' },
  { id: 2, f: 'data-types', lid: 'Data Types & Schema Design', len: 'Data Types & Schema Design', pid: 'Schema Design', pen: 'Schema Design' },
  { id: 3, f: 'crud-operations', lid: 'CRUD Operations', len: 'CRUD Operations', pid: 'Basic Queries', pen: 'Basic Queries' },
  { id: 4, f: 'filtering-sorting', lid: 'Filtering & Sorting', len: 'Filtering & Sorting', pid: 'Advanced Queries', pen: 'Advanced Queries' },
  { id: 5, f: 'joins', lid: 'JOINs & Relationships', len: 'JOINs & Relationships', pid: 'Multi-table Queries', pen: 'Multi-table Queries' },
  { id: 6, f: 'aggregations', lid: 'Aggregations & Group By', len: 'Aggregations & Group By', pid: 'Analytics Queries', pen: 'Analytics Queries' },
  { id: 7, f: 'subqueries', lid: 'Subqueries & CTEs', len: 'Subqueries & CTEs', pid: 'Complex Queries', pen: 'Complex Queries' },
  { id: 8, f: 'indexing', lid: 'Indexing & Performance', len: 'Indexing & Performance', pid: 'Query Optimization', pen: 'Query Optimization' },
  { id: 9, f: 'transactions', lid: 'Transactions & ACID', len: 'Transactions & ACID', pid: 'Data Integrity', pen: 'Data Integrity' },
  { id: 10, f: 'views-functions', lid: 'Views & Functions', len: 'Views & Functions', pid: 'Stored Logic', pen: 'Stored Logic' },
  { id: 11, f: 'json-data', lid: 'JSON Data Type', len: 'JSON Data Type', pid: 'Flexible Data', pen: 'Flexible Data' },
  { id: 12, f: 'security', lid: 'Security & Access Control', len: 'Security & Access Control', pid: 'Access Control', pen: 'Access Control' },
  { id: 13, f: 'backup-restore', lid: 'Backup & Restore', len: 'Backup & Restore', pid: 'Data Protection', pen: 'Data Protection' },
  { id: 14, f: 'partitioning', lid: 'Partitioning & Scaling', len: 'Partitioning & Scaling', pid: 'Large Data', pen: 'Large Data' },
  { id: 15, f: 'stored-procedures', lid: 'Stored Procedures & Triggers', len: 'Stored Procedures & Triggers', pid: 'Automation', pen: 'Automation' },
  { id: 16, f: 'capstone', lid: 'Capstone: E-commerce DB', len: 'Capstone: E-commerce Database', pid: 'Full Database Design', pen: 'Full Database Design' },
];

const OBJ = {
  1: { id: ['Mengenal MySQL sebagai RDBMS open-source paling populer', 'Menginstall MySQL dan MySQL Workbench', 'Memahami konsep database relasional', 'Membuat database dan tabel pertama'], en: ['Understand MySQL as the most popular open-source RDBMS', 'Install MySQL and MySQL Workbench', 'Understand relational database concepts', 'Create your first database and table'] },
  2: { id: ['Mengenal tipe data: INT, VARCHAR, TEXT, BOOLEAN, DATE, DATETIME', 'Merancang schema yang efisien', 'Memahami normalisasi (1NF, 2NF, 3NF)', 'Membuat tabel dengan constraints'], en: ['Learn data types: INT, VARCHAR, TEXT, BOOLEAN, DATE, DATETIME', 'Design efficient schemas', 'Understand normalization (1NF, 2NF, 3NF)', 'Create tables with constraints'] },
  3: { id: ['Melakukan INSERT, SELECT, UPDATE, DELETE', 'Memahami WHERE clause', 'Menggunakan LIMIT dan OFFSET', 'Memahami operator LIKE dan IN'], en: ['Perform INSERT, SELECT, UPDATE, DELETE', 'Understand WHERE clause', 'Use LIMIT and OFFSET', 'Understand LIKE and IN operators'] },
  4: { id: ['Menggunakan ORDER BY untuk sorting', 'Memahami WHERE dengan AND, OR, NOT', 'Menggunakan BETWEEN dan IS NULL', 'Membuat query filtering yang efisien'], en: ['Use ORDER BY for sorting', 'Understand WHERE with AND, OR, NOT', 'Use BETWEEN and IS NULL', 'Create efficient filtering queries'] },
  5: { id: ['Memahami INNER JOIN, LEFT JOIN, RIGHT JOIN', 'Menggunakan JOIN untuk multi-table queries', 'Memahami self-join', 'Menggunakan alias untuk kejelasan'], en: ['Understand INNER JOIN, LEFT JOIN, RIGHT JOIN', 'Use JOIN for multi-table queries', 'Understand self-join', 'Use aliases for clarity'] },
  6: { id: ['Menggunakan COUNT, SUM, AVG, MIN, MAX', 'Memahami GROUP BY', 'Menggunakan HAVING untuk filter grup', 'Membuat laporan agregasi'], en: ['Use COUNT, SUM, AVG, MIN, MAX', 'Understand GROUP BY', 'Use HAVING for group filtering', 'Create aggregation reports'] },
  7: { id: ['Memahami subqueries', 'Menggunakan CTE (Common Table Expressions)', 'Menggabungkan subquery dan JOIN', 'Membuat query berlapis'], en: ['Understand subqueries', 'Use CTE (Common Table Expressions)', 'Combine subqueries with JOINs', 'Create layered queries'] },
  8: { id: ['Memahami B-tree indexes', 'Membuat index pada kolom frequently queried', 'Memahami covering indexes', 'Menganalisis query dengan EXPLAIN'], en: ['Understand B-tree indexes', 'Create indexes on frequently queried columns', 'Understand covering indexes', 'Analyze queries with EXPLAIN'] },
  9: { id: ['Memahami ACID properties', 'Menggunakan START TRANSACTION, COMMIT, ROLLBACK', 'Memahami isolation levels', 'Mengimplementasi transfer antar rekening'], en: ['Understand ACID properties', 'Use START TRANSACTION, COMMIT, ROLLBACK', 'Understand isolation levels', 'Implement inter-account transfer'] },
  10: { id: ['Membuat views untuk query yang sering digunakan', 'Membuat fungsi SQL', 'Menggunakan stored procedures', 'Memahami triggers'], en: ['Create views for frequently used queries', 'Create SQL functions', 'Use stored procedures', 'Understand triggers'] },
  11: { id: ['Menyimpan data JSON di MySQL', 'Menggunakan fungsi JSON_EXTRACT, JSON_SET', 'Querying JSON data', 'Memahami kapan gunakan JSON vs relational'], en: ['Store JSON data in MySQL', 'Use JSON_EXTRACT, JSON_SET functions', 'Query JSON data', 'Understand when to use JSON vs relational'] },
  12: { id: ['Membuat user dan role', 'Memberikan GRANT dan REVOKE', 'Memahami row-level security', 'Mengimplementasi schema isolation'], en: ['Create users and roles', 'Grant and revoke permissions', 'Understand row-level security', 'Implement schema isolation'] },
  13: { id: ['Melakukan mysqldump untuk backup', 'Menggunakan mysql untuk restore', 'Memahami point-in-time recovery', 'Mengatur automated backup'], en: ['Use mysqldump for backup', 'Use mysql for restore', 'Understand point-in-time recovery', 'Set up automated backup'] },
  14: { id: ['Memahami table partitioning', 'Menggunakan range dan list partitioning', 'Optimasi query pada tabel besar', 'Memahami tablespaces'], en: ['Understand table partitioning', 'Use range and list partitioning', 'Optimize queries on large tables', 'Understand tablespaces'] },
  15: { id: ['Membuat stored procedures', 'Membuat triggers untuk automation', 'Menggunakan events scheduler', 'Memahami cursor dan looping'], en: ['Create stored procedures', 'Create triggers for automation', 'Use events scheduler', 'Understand cursors and looping'] },
  16: { id: ['Merancang database e-commerce lengkap', 'Menggabungkan semua konsep SQL', 'Mengoptimasi schema untuk performa', 'Mempersiapkan deployment database'], en: ['Design a complete e-commerce database', 'Combine all SQL concepts', 'Optimize schema for performance', 'Prepare database for deployment'] },
};

const CODE = {
  1: `-- Connect to MySQL\nmysql -u root -p\n\n-- Create a database\nCREATE DATABASE mydb;\nUSE mydb;\n\n-- Create a table\nCREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Insert data\nINSERT INTO users (name, email) VALUES ('Budi', 'budi@example.com');\n\n-- Query all\nSELECT * FROM users;`,
  2: `CREATE TABLE products (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(200) NOT NULL,\n    price DECIMAL(10, 2) NOT NULL,\n    stock INT DEFAULT 0,\n    is_active BOOLEAN DEFAULT TRUE,\n    created_at DATE DEFAULT (CURRENT_DATE)\n);\n\n-- Normalization: separate categories\nCREATE TABLE categories (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);`,
  3: `-- INSERT\nINSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');\n\n-- SELECT\nSELECT * FROM users WHERE active = TRUE;\n\n-- UPDATE\nUPDATE users SET email = 'new@example.com' WHERE id = 1;\n\n-- DELETE\nDELETE FROM users WHERE id = 1;`,
  4: `SELECT * FROM orders\nWHERE total > 100000\n  AND status = 'completed'\n  AND created_at BETWEEN '2025-01-01' AND '2025-12-31'\nORDER BY created_at DESC\nLIMIT 10;`,
  5: `SELECT o.id, u.name, o.total\nFROM orders o\nINNER JOIN users u ON o.user_id = u.id\nLEFT JOIN payments p ON o.id = p.order_id\nWHERE o.status = 'completed';`,
  6: `SELECT category_id, COUNT(*) as total_products,\n       AVG(price) as avg_price,\n       SUM(stock) as total_stock\nFROM products\nGROUP BY category_id\nHAVING COUNT(*) > 5\nORDER BY avg_price DESC;`,
  7: `WITH monthly_sales AS (\n    SELECT DATE_FORMAT(created_at, '%Y-%m') as month,\n           SUM(total) as revenue\n    FROM orders\n    GROUP BY DATE_FORMAT(created_at, '%Y-%m')\n)\nSELECT * FROM monthly_sales\nWHERE revenue > 1000000;`,
  8: `-- Create index\nCREATE INDEX idx_orders_user_id ON orders(user_id);\n\n-- Analyze query\nEXPLAIN SELECT * FROM orders WHERE user_id = 1;`,
  9: `START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 500000 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500000 WHERE id = 2;\n\nCOMMIT;\n-- If error: ROLLBACK;`,
  10: `CREATE VIEW active_users AS\nSELECT id, name, email, created_at\nFROM users\nWHERE active = TRUE;\n\nDELIMITER //\nCREATE FUNCTION get_user_order_count(p_user_id INT)\nRETURNS INT\nBEGIN\n    DECLARE cnt INT;\n    SELECT COUNT(*) INTO cnt FROM orders WHERE user_id = p_user_id;\n    RETURN cnt;\nEND //\nDELIMITER ;`,
  11: `INSERT INTO products (name, metadata)\nVALUES ('Laptop', '{\"brand\": \"Dell\", \"ram\": \"16GB\", \"ssd\": \"512GB\"}');\n\nSELECT name, JSON_EXTRACT(metadata, '$.brand') as brand\nFROM products\nWHERE JSON_EXTRACT(metadata, '$.ram') = '16GB';`,
  12: `CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_pass';\nGRANT SELECT ON mydb.* TO 'app_user'@'localhost';\nREVOKE INSERT, UPDATE, DELETE ON mydb.* FROM 'app_user'@'localhost';`,
  13: `-- Backup\nmysqldump -u root -p mydb > backup.sql\n\n-- Restore\nmysql -u root -p mydb < backup.sql\n\n-- Backup with single transaction\nmysqldump -u root -p --single-transaction mydb > backup.sql`,
  14: `CREATE TABLE sales (\n    id INT,\n    sale_date DATE NOT NULL,\n    amount DECIMAL(12, 2),\n    PRIMARY KEY (id, sale_date)\n) PARTITION BY RANGE (YEAR(sale_date)) (\n    PARTITION p2025 VALUES LESS THAN (2026),\n    PARTITION p2026 VALUES LESS THAN (2027)\n);`,
  15: `DELIMITER //\nCREATE PROCEDURE update_stock(IN p_product_id INT, IN p_quantity INT)\nBEGIN\n    UPDATE products SET stock = stock - p_quantity\n    WHERE id = p_product_id AND stock >= p_quantity;\nEND //\nDELIMITER ;\n\n-- Trigger example\nCREATE TRIGGER after_order_insert\nAFTER INSERT ON order_items\nFOR EACH ROW\nBEGIN\n    UPDATE products SET stock = stock - NEW.quantity\n    WHERE id = NEW.product_id;\nEND;`,
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
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. MySQL adalah RDBMS open-source paling populer dengan fitur JSON, indexing, dan stored procedures. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. MySQL is the most popular open-source RDBMS with JSON support, indexing, and stored procedures. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> MySQL | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```sql\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'MySQL adalah database relasional open-source paling populer di dunia.\nMySQL mendukung JSON, indexing lanjutan, stored procedures, dan triggers.\nGunakan mysql client atau MySQL Workbench untuk berinteraksi dengan database.'
      : 'MySQL is the most popular open-source relational database in the world.\nMySQL supports JSON, advanced indexing, stored procedures, and triggers.\nUse the mysql client or MySQL Workbench to interact with the database.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah query di atas dan lihat hasilnya' : 'Change the query above and see the results') + '\n'
    + '- ' + (isId ? 'Tambah tabel baru dan buat relasi' : 'Add a new table and create a relationship') + '\n'
    + '- ' + (isId ? 'Coba gunakan EXPLAIN untuk analisis query' : 'Try using EXPLAIN for query analysis') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.\nJalankan query dan verifikasi hasilnya di mysql client atau MySQL Workbench.'
      : 'Build a database schema for a simple application using this weeks concepts.\nRun queries and verify results in mysql client or MySQL Workbench.')
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

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' MySQL curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);