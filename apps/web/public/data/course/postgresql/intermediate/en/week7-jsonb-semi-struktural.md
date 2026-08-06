# JSONB & Semi-Structured Data

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 7:** JSONB & Semi-Structured Data

## Learning Objectives

- JSONB type
- Operators -> and ->>
- @> containment
- jsonb_set and ||
- GIN index

---

## Program: Documents in PostgreSQL

```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50),
    payload JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO events (event_type, payload) VALUES
    ('user_signup', '{"user_id":101,"name":"Budi","email":"budi@mail.com","tags":["premium","mobile"]}'),
    ('purchase', '{"user_id":101,"items":[{"product":"Laptop","price":12500000}],"total":12500000,"payment":"credit_card"}'),
    ('page_view', '{"user_id":101,"page":"/products","duration_ms":45000,"referrer":"google.com"}');

SELECT id, payload->>'name' AS nama, payload->>'email' AS email
    FROM events WHERE event_type = 'user_signup';

SELECT id, jsonb_array_elements_text(payload->'tags') AS tag
    FROM events WHERE event_type = 'user_signup';

SELECT * FROM events WHERE payload @> '{"user_id":101}';
SELECT * FROM events WHERE payload->>'payment' = 'credit_card';
SELECT * FROM events WHERE payload ? 'referrer';

UPDATE events SET payload = payload || '{"status":"processed"}'::jsonb
    WHERE event_type = 'purchase';

UPDATE events SET payload = jsonb_set(payload, '{name}', '"Budi Santoso"')
    WHERE event_type = 'user_signup';

CREATE INDEX idx_events_payload ON events USING GIN (payload);

SELECT event_type, COUNT(*) AS total,
    SUM((payload->>'total')::numeric) AS revenue
    FROM events GROUP BY event_type;
```

---

## Key Concepts

### JSONB
Binary format for JSON.

### Access Operators
-> JSON object, ->> text.

### Query Operators
@>: containment, ?: key exists.

### JSONB Updates
||: merge, jsonb_set: replace.

### GIN Index
Special index for JSONB.

---

## Experiments

- Filter nested JSON
- jsonb_array_elements
- JSONB aggregation
- CHECK validation

---

## Challenge

Products table with flexible attributes (JSONB).

---

## Summary

Week 7 of 10: **JSONB & Semi-Structured Data** (Intermediate).
