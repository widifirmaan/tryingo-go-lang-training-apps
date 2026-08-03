# CI/CD & Deployment

> Django | Produksi & Capstone | Pelajaran 17

## Tujuan Pembelajaran

- Menulis workflow GitHub Actions untuk Django
- Menjalankan test di PostgreSQL nyata (services)
- Menggunakan manage.py check --deploy untuk audit
- Build & push image Docker ke registry (GHCR)

---

## Program: CI/CD & Deployment

```python
name: CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: tryngo_test
          POSTGRES_USER: tryngo
          POSTGRES_PASSWORD: rahasia
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U tryngo"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    env:
      DJANGO_SETTINGS_MODULE: myproject.settings.test
      POSTGRES_DB: tryngo_test
      POSTGRES_USER: tryngo
      POSTGRES_PASSWORD: rahasia
      POSTGRES_HOST: 127.0.0.1
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - run: pip install -r requirements.txt
      - run: python manage.py migrate --noinput
      - run: python manage.py test
      - run: python manage.py check --deploy
      # Build image + push ke registry (CD dimulai dari sini)
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

---

## Penjelasan

## CI: Reviewer yang Tidak Pernah Lelah
Setiap push ke git → workflow dijalankan: pip install → migrate → test → check --deploy. Build rusak atau test merah = alur berhenti, kode tidak pernah sampai produksi. Ini melindungi tim: kesalahan ditemukan dalam menit, bukan setelah insiden. Workflow yang sama yang Anda jalankan lokal, dijalankan di lingkungan yang sama persis untuk semua orang.
## Services: Test Melawan Database Nyata
Django test default memakai SQLite - berbeda dari produksi (PostgreSQL). GitHub Actions services: menjalankan postgres:16-alpine SEBAGAI container pendamping dengan healthcheck - test dijalankan melawan PostgreSQL SUNGGAH (settings/test.py dengan env). Bug yang hanya muncul di PostgreSQL tertangkap SEBELUM produksi. Ini praktik 2026: "test on what you ship on".
## check --deploy: Audit Satu Perintah
python manage.py check --deploy memeriksa settings produksi: SECRET_KEY tidak aman, DEBUG=True, ALLOWED_HOSTS kosong, header keamanan mati - semua terdeteksi dengan peringatan jelas. Masukkan ke CI: audit otomatis tiap push, bukan checklist manual yang mudah terlupakan. Gabungkan dengan test = dua pintu gerbang sebelum deploy.
## CD: Dari Image ke Produksi
Setelah test hijau: buildx build + push image ke GHCR (ghcr.io/<user>/<repo>:latest) dengan cache lapisan (type=gha). Produksi menarik image yang SAMA yang diuji - tidak ada "di laptop saya jalan". Deploy target: PaaS (Render/Railway/Fly menarik image), VPS (docker compose pull + up), atau K8s. Image + tag = artefak yang bisa di-audit dan di-rollback.

---

## Eksperimen

1. **CI: Reviewer yang Tidak Pernah Lelah**
2. **Services: Test Melawan Database Nyata**
3. **check --deploy: Audit Satu Perintah**
4. **CD: Dari Image ke Produksi**

---

## Tantangan

Selesaikan pipeline: (1) tambah branch protection: workflow hanya jalan di push ke main, (2) tambah job deploy terpisah (needs: test) yang menarik image di server VPS via SSH (atau tulis rencana deploy Render/Railway), (3) tambah caching pip di workflow (actions/cache atau setup-python cache) dan ukur percepatannya, (4) tulis POST-MORTEM singkat: buat bug sengaja (test gagal), dorong, dokumentasikan alur merah → hijau.

---

## Ringkasan

CI = test + audit tiap push. Services = DB nyata. check --deploy = audit otomatis. CD = image yang sama ke produksi. Lanjut: capstone.
