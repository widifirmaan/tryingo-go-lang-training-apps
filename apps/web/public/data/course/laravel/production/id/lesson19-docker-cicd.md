# Docker & CI/CD

> Laravel | Testing & Produksi | Pelajaran 19

## Tujuan Pembelajaran

- Membangun image Laravel multi-stage dengan Dockerfile
- Mengorkestrasi app + MySQL dengan docker-compose
- Menulis pipeline CI: test otomatis di setiap push
- Menjaga secret: variabel lingkungan bukan file hardcode

---

## Program: Docker & CI/CD

```php
FROM composer:2 AS build

WORKDIR /app

COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-interaction --prefer-dist

FROM php:8.3-cli

RUN apt-get update && apt-get install -y libzip-dev unzip     && docker-php-ext-install pdo pdo_mysql zip bcmath

COPY --from=build /app/vendor /var/www/html/vendor
COPY . /var/www/html

WORKDIR /var/www/html

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

```

---

## Penjelasan

## Dockerfile: Image yang Reproducible
Image = resep lingkungan yang persis sama di laptop, CI, dan server. Tahap 1 'build': Composer meng-install vendor (dengan composer:2 image). Tahap 2 'runtime': PHP CLI + ekstensi (pdo_mysql untuk MySQL), lalu COPY vendor dari tahap 1 - hasil: image kecil, cache layer optimal, tidak ada kunci SSH di dalam image.
## docker-compose: Satu Perintah, Banyak Service
compose mendefinisikan app (build dari Dockerfile) + db (mysql:8.4). Service app memakai ${APP_KEY} dari file .env HOST - secret tidak pernah masuk file project. Volumes: ./storage dipasang dari host (data persisten). depends_on: app menunggu db.
## CI: Gerbang Otomatis
Workflow GitHub Actions: checkout -> setup php -> composer install -> migrate -> phpunit. Setiap push/pull request dijalankan ulang. Pipeline gagal = kode tidak boleh masuk main. Inilah 'quality gate' yang bisa diandalkan - bukan janji manual.
## 12-Factor Mindset
Konfigurasi = lingkungan (env), bukan kode: APP_DEBUG=false + APP_KEY di env produksi. Kode yang sama jalan di development (sqlite, debug on) dan produksi (mysql, debug off) - bedanya hanya variabel. CI/CD + container = deployment berulang yang aman.

---

## Eksperimen

1. **Dockerfile: Image yang Reproducible**
2. **docker-compose: Satu Perintah, Banyak Service**
3. **CI: Gerbang Otomatis**
4. **12-Factor Mindset**

---

## Tantangan

Naikkan level produksi: (1) tambah service redis di docker-compose dan set CACHE_STORE=redis, QUEUE_CONNECTION=redis di app, (2) tambah healthcheck di service db (mysqladmin ping) dan depends_on dengan condition: service_healthy, (3) tulis job deploy kedua di ci.yml (needs: test) yang mem-build image dan push ke GitHub Container Registry, (4) batasi port: jalankan artisan serve hanya di 127.0.0.1 dan letakkan nginx reverse-proxy (add nginx service) - jelaskan kenapa.

---

## Ringkasan

Dockerfile = lingkungan reproducible. Compose = banyak service. CI = gerbang otomatis. Env = konfigurasi. Lanjut: deployment & capstone.
