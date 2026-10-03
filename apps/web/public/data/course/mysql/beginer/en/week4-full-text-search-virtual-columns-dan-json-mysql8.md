# Full-Text Search, Virtual Columns & JSON in MySQL 8+

> **Kategori:** MySQL | **Level:** Relational Foundations & InnoDB Engine | **Minggu 4:** Full-Text Search, Virtual Columns & JSON in MySQL 8+
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Implement Full-Text Search (MATCH ... AGAINST) in Natural Language and Boolean Mode
- Differentiate VIRTUAL vs STORED Generated Columns in MySQL 8+
- Index arbitrary JSON document attributes via Virtual Generated Columns
- Operate native JSON functions and operators: ->, ->>, JSON_EXTRACT, and JSON_CONTAINS

---

## Program: Product Catalog with Boolean Full-Text Search and JSON Virtual Column Indexing

```sql
-- 1. Create modern catalog table with JSON attributes and Full-Text index
CREATE TABLE catalog_products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    sku VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    specifications JSON NOT NULL,
    -- Generated Virtual Column extracting brand from JSON without consuming disk space
    brand VARCHAR(100) GENERATED ALWAYS AS (specifications->>'$.brand') VIRTUAL,
    -- Generated Stored Column extracting weight for physical range filtering
    weight_kg DECIMAL(6, 2) GENERATED ALWAYS AS (CAST(specifications->>'$.weight_kg' AS DECIMAL(6,2))) STORED,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_catalog_sku (sku),
    -- Index on virtual generated column!
    KEY idx_product_brand (brand),
    -- Full-Text search index covering title and description
    FULLTEXT KEY ft_catalog_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample product data with nested JSON payloads
INSERT INTO catalog_products (sku, title, description, specifications) VALUES
('LAP-PRO-16', 'MacBook Pro 16 M3 Max', 'Powerful laptop for software developers and machine learning engineering with extreme battery life.', 
 '{"brand": "Apple", "weight_kg": 2.14, "specs": {"ram": "64GB", "storage": "1TB SSD"}}'),
('LAP-AIR-15', 'MacBook Air 15 M3', 'Ultra-thin lightweight laptop ideal for digital nomads and daily productivity.', 
 '{"brand": "Apple", "weight_kg": 1.51, "specs": {"ram": "16GB", "storage": "512GB SSD"}}'),
('LAP-THINK-X1', 'Lenovo ThinkPad X1 Carbon', 'Rugged business flagship ultrabook with military grade carbon fiber durability.', 
 '{"brand": "Lenovo", "weight_kg": 1.12, "specs": {"ram": "32GB", "storage": "1TB SSD"}}');

-- 2. Boolean Mode Full-Text Search with Relevance Scoring
SELECT 
    id, title, brand, weight_kg,
    MATCH(title, description) AGAINST('+laptop +developer -gaming' IN BOOLEAN MODE) AS relevance_score
FROM catalog_products
WHERE MATCH(title, description) AGAINST('+laptop +developer -gaming' IN BOOLEAN MODE)
ORDER BY relevance_score DESC;

-- 3. Query JSON directly using JSON operators and virtual index
EXPLAIN
SELECT id, title, brand, specifications->'$.specs.ram' AS ram_size
FROM catalog_products
WHERE brand = 'Apple';
```

---

## Key Concepts

### InnoDB Full-Text Indexing: Boolean Mode
Pattern matching with `LIKE '%keyword%'` triggers disastrous full table scans because leading wildcards invalidate B+Tree traversals. InnoDB **Full-Text Indexes** construct an inverted index mapping tokens to document positions. Under **Boolean Mode**, developers formulate expressive search queries:
- `+word`: Mandatory inclusion.
- `-word`: Strict exclusion.
- `word*`: Prefix wildcard matching.
- Statements compute relevance scores based on Term Frequency-Inverse Document Frequency (TF-IDF).

### Generated Columns: VIRTUAL vs STORED
MySQL 8+ features generated columns evaluated from deterministic expressions:
- **VIRTUAL**: Evaluated dynamically during read operations, consuming zero disk storage. Crucially, InnoDB permits creating B+Tree secondary indexes on Virtual columns!
- **STORED**: Evaluated and durably written to physical disk blocks upon INSERT/UPDATE. Ideal when referenced in table partitioning schemes.

### High-Speed Indexing of JSON Payloads
Traditionally, JSON attributes could not be traversed via B+Trees. By declaring a Virtual Generated Column `brand GENERATED ALWAYS AS (specifications->>'$.brand') VIRTUAL` and placing an index `KEY (brand)`, MySQL accelerates nested JSON queries to sub-millisecond B+Tree lookups.

---

---

## Beginner Friendly Explanation

Think of a JSON column like a sealed cardboard box containing miscellaneous gadgets. Finding a specific brand requires opening every box individually.

A Virtual Column is like affixing an external label tag on the outside of the box indicating the brand. The tag adds zero physical weight (zero disk space), yet warehouse staff can spot it instantly from down the aisle!

## Experiments

- Test Boolean Full-Text queries with various combinations of + and - operators and inspect relevance sorting
- Run EXPLAIN on WHERE brand = 'Apple' to confirm secondary index usage on the virtual column
- Apply JSON_SEARCH() to locate the exact path of a given string inside nested JSON structures
- Experiment with MySQL 8 multi-valued indexes on JSON arrays using CAST(... AS UNSIGNED ARRAY)

---

## Challenge

Build a product tag autocomplete engine: store tags within a JSON array, generate a Multi-Valued Index, and craft queries utilizing `MEMBER OF()` or `JSON_CONTAINS()`.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. Legacy `utf8` Instead of `utf8mb4`
- **Symptom / Issue:** Throws `Incorrect string value` when saving 4-byte Unicode characters (emojis).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Set default database and table character set to `utf8mb4` with `utf8mb4_unicode_ci`.

### 2. TIMESTAMP 2038 Boundary & Timezone Shifts
- **Symptom / Issue:** Epoch overflow bugs on older tables or unexpected timezone conversions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Store UTC explicitly or choose `DATETIME` for timezone-neutral timestamps.

### 3. Failing to Batch Inserts
- **Symptom / Issue:** Per-row autocommit causes massive disk write bottlenecks on large imports.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap batch imports in a single `START TRANSACTION; ... COMMIT;` block.

---

## Summary

You have mastered InnoDB Boolean Full-Text Search, Generated Columns (VIRTUAL vs STORED), and high-performance JSON document indexing in MySQL 8+.
