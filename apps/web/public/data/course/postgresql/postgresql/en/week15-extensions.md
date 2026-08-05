# Extensions & Tools

> PostgreSQL | Module 15

## Learning Objectives

- Install and use PostGIS
- Use pg_trgm for fuzzy search
- Use uuid-ossp
- Use hstore for key-value storage

---

## Program: PostGIS & pg_trgm

```sql
-- PostGIS: spatial queries
CREATE EXTENSION postgis;
SELECT ST_Distance(geom1, geom2) FROM locations;

-- pg_trgm: fuzzy search
CREATE EXTENSION pg_trgm;
SELECT name FROM products WHERE name % 'laptop';

-- UUID
CREATE EXTENSION uuid-ossp;
INSERT INTO orders (id, total) VALUES (uuid_generate_v4(), 100000);
```

---

## Explanation

PostgreSQL is an open-source relational database that supports standard SQL and advanced features.
PostgreSQL supports JSON, advanced indexing, ACID transactions, and extensions like PostGIS.
Use psql to interact with the database from the command line.

---

## Experiments

- Change the query above and see the results
- Add a new table and create a relationship
- Try using EXPLAIN for query analysis

---

## Challenge

Build a database schema for a simple application using this weeks concepts.
Run queries and verify results in psql or pgAdmin.

---

## Summary

Module 15 of 16: **Extensions & Tools**. PostgreSQL is a powerful open-source RDBMS with JSON support, indexing, and extensions. Next week: **Capstone: E-commerce Database**.
