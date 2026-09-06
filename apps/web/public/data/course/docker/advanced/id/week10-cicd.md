# CI/CD Pipeline — Pabrik Otomatis Warung

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 10:** CI/CD Pipeline

## Tujuan Pembelajaran

- `.github/workflows/docker.yml` (`on: push`, `build`, `push` ke GHCR) pabrik tiap `git push` (sumber: docs.github.com/actions + docker/build-push-action)
- `trivy` scan di pabrik → gagal jika CRITICAL

---

## Kenapa Ini Penting Buat Kamu?

Tanpa CI/CD, deploy = `build` + `push` + `ssh` + `pull` manual 15 menit + lupa test. Dengan pabrik, `git push` → test → scan → push registry otomatis 3 menit. Lupa scan? Pabrik tolak.

---

## Program: Pabrik Docker Warung

```yaml
# .github/workflows/docker.yml — pabrik
name: Warung CI/CD
on:
  push:
    branches: [main]

jobs:
  bangun:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build
        run: docker build -t ghcr.io/warung/app:${{ github.sha }} .

      - name: Scan (tolak jika CRITICAL!)
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ghcr.io/warung/app:${{ github.sha }}
          exit-code: "1"
          severity: "CRITICAL"

      - name: Push
        run: |
          echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u warung --password-stdin
          docker push ghcr.io/warung/app:${{ github.sha }}
```

`git push` → Actions tab hijau? → image di `ghcr.io`.

---

## Konsep Kunci

### `on: push` + `jobs` = Pemicu + Mesin
Push → mesin `ubuntu` jalan step berurutan.

### `trivy exit-code: 1` = Tolak Berbahaya
CRITICAL → pabrik merah, tidak push.

### GHCR = Gudang GitHub
`ghcr.io/warung/app:sha` tiap commit versi unik.

---

## Penjelasan untuk Pemula

### Analogi: Pabrik Roti Otomatis
- **push = order masuk**, **build = panggang**, **trivy = QC**, **push registry = kirim toko**.

### Langkah 0 — Siapkan Device
- Repo GitHub + Actions aktif (gratis) + `Dockerfile` ada.

### Cara Komputer Membaca
1. `git push` → GitHub baca YAML → sewa `ubuntu` → step 1-2-3.
2. Trivy CRITICAL → `exit 1` → merah, stop.

### 3 Istilah Wajib
1. **CI/CD/workflow**: pabrik/resep-pabrik
2. **GHCR/secret**: gudang/kunci

---

## Eksperimen

- **Hijau:** Push ubah README → Actions hijau?
- **Kuning:** Sengaja base image tua → Trivy merah? Update base.
- **Merah:** Hapus `exit-code` → CRITICAL lolos? (Jangan! Pasang.)

---

## Tantangan

**Pabrik Lengkap:** YAML `build` + `trivy` + `push GHCR` → `git push` hijau + image muncul di `ghcr.io` + screenshot.

---

## Glosarium Mini

- **Actions/workflow/GHCR**: pabrik/resep/gudang
- **Trivy/exit-code**: QC/tolak

---

## Ringkasan

Minggu 10 dari 12: **Pabrik Otomatis** (Level: Lanjutan). Push = deploy. Minggu depan: **Orchestration**.
