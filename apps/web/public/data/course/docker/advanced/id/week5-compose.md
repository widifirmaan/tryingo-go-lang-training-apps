# Docker Compose — Rakit Warung Sekali Jalan

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 5:** Docker Compose

## Tujuan Pembelajaran

- `docker-compose.yml` rakit `web` + `db` + `volume` 1 perintah `docker compose up -d`

---

## Program: Rakit Warung

```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports: ["8080:80"]
    depends_on: [db]
  db:
    image: postgres:15
    environment: { POSTGRES_PASSWORD: rahasia }
    volumes: [warung-data:/var/lib/postgresql/data]
volumes:
  warung-data:
```

```bash
docker compose up -d
docker compose logs
docker compose down
```

---

## Ringkasan

Minggu 5: **Rakit Sekali Jalan** — Compose.
