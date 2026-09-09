# Capstone: Production Pipeline — Warung Docker Grand Opening

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 12:** Capstone: Production Pipeline
> **Prasyarat:** Minggu 11 — **Orchestration**.

## Tujuan Pembelajaran

- Gabung W1-W11: `Dockerfile` diet + `compose` rakit + `CI/CD` pabrik + `security` gembok + `volume` lemari jadi pipeline produksi warung

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung jadi pipeline: `git push` → test → scan → deploy → monitor. Ini portfolio "Docker production-ready".

---

## Program: Pipeline Warung Lengkap (Checklist)

```dockerfile
# Dockerfile — diet + aman (W4+W8+W9)
FROM golang:1.22 AS build
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o warung .
FROM alpine:3.19
RUN adduser -S warung
USER warung
COPY --from=build /app/warung /warung
CMD ["/warung"]
```

```yaml
# docker-compose.yml — rakit (W7) + lemari (W5)
services:
  web: { build: ., ports: ["8080:80"] }
  db: { image: postgres:15, environment: { POSTGRES_PASSWORD: rahasia }, volumes: [data:/var/lib/postgresql/data] }
volumes: { data: }
```

```yaml
# .github/workflows/docker.yml — pabrik (W10)
# on: push → build → trivy → push GHCR
```

```bash
# Grand opening checklist:
trivy image warung:1.0        # 0 CRITICAL? (W9)
docker compose up -d          # UP semua? (W7)
curl localhost:8080/actuator/health  # UP? (pantau)
docker images warung          # <50MB? (W8 diet)
```

**Tugas capstone:** Repo publik + pipeline hijau + image <50MB + 0 CRITICAL + deploy + video 2 menit. **Selesai Docker 0→Ahli!** 🎉

---

## Konsep Kunci

### Pipeline = Gabung 11 Minggu
Diet + rakit + pabrik + gembok + lemari = produksi.

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Pabrik
- **W1-W4 fondasi** + **W5-W8 mesin** + **W9-W11 pengaman** = pabrik. **W12 = buka**.

### 3 Istilah Wajib
1. **Capstone/pipeline**: gabung/alur-produksi

---

## Eksperimen

- **Hijau:** Buka `/warung` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Grand Opening:** Semua checklist hijau + URL publik + video. **Selesai Docker 0→Ahli!** 🎉

---

## Glosarium Mini

- **Capstone/pipeline**: gabung/alur

---

## Ringkasan

Minggu 12 dari 12: **Grand Opening** (Level: Lanjutan). **Selesai Docker 0→Ahli dari nol!** 🎉
