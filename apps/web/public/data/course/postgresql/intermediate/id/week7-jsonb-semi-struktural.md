# JSONB & Semi-Structured Data

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 7:** JSONB & Semi-Structured Data

## Tujuan Pembelajaran

- Tipe JSONB
- Operator -> dan ->>
- @> containment operator
- jsonb_set dan ||
- GIN index

---

## Program: Dokument di PostgreSQL

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

## Konsep Kunci

### JSONB
Format binary untuk JSON di PostgreSQL.

### Operator Akses
-> JSON object, ->> text.

### Operator Query
@>: containment, ?: key exists.

### Update JSONB
||: merge, jsonb_set: replace at path.

### GIN Index
Index khusus untuk JSONB.

---

## Eksperimen

- Filter nested JSON
- jsonb_array_elements
- Agregasi JSONB
- CHECK validation

---

## Tantangan

Tabel produk dengan atribut fleksibel (JSONB).

---

## Ringkasan

Minggu 7 dari 10: **JSONB & Semi-Structured Data** (Menengah).
