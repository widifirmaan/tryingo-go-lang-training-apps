# Multi-Stage Build — Peti Diet Warung

> **Kategori:** Docker | **Level:** Menengah | **Minggu 8:** Multi-Stage Build
> **Prasyarat:** Minggu 7 — **Docker Compose**.

## Tujuan Pembelajaran

- `FROM ... AS build` + `COPY --from=build` — masak di dapur besar, saji di piring kecil (sumber: docs.docker.com/build/building/multi-stage)
- Kecilkan image Go `800MB → 15MB` (buang compiler)

---

## Kenapa Ini Penting Buat Kamu?

Image Go dengan compiler = 800MB (upload 10 menit, bayar storage). Dengan multi-stage, compiler hanya saat build → hasil 15MB (upload 10 detik). Deploy 10x sehari = hemat jam.

---

## Program: Diet Peti Go Warung

```dockerfile
# Dockerfile — 2 tahap
# Tahap 1: DAPUR (besar, ada compiler)
FROM golang:1.22 AS build
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o warung .

# Tahap 2: PIRING (kecil, hanya hasil!)
FROM alpine:3.19
COPY --from=build /app/warung /warung
EXPOSE 8080
CMD ["/warung"]
```

```bash
docker build -t warung:1.0 .
docker images warung  # ~15MB! (vs golang:1.22 ~800MB)
docker run -p 8080:8080 warung:1.0
```

---

## Konsep Kunci

### `AS build` + `COPY --from=build` = Dapur + Saji
Tahap 1 masak (compiler), tahap 2 hanya bawa hasil. Peralatan dapur tidak ikut.

### `CGO_ENABLED=0` = Statis
Binary tanpa butuh libc — jalan di `alpine`/`scratch` kosong.

---

## Penjelasan untuk Pemula

### Analogi: Dapur & Piring Saji
- **Tahap build = dapur**: kompor + panci (besar).
- **Tahap akhir = piring**: hanya makanan (kecil). Dapur tidak ikut ke meja!

### Langkah 0 — Siapkan Device
- Docker + proyek Go kecil (`main.go` hello).

### Cara Komputer Membaca
1. `FROM golang AS build` → compile → `/app/warung`.
2. `FROM alpine` → salin binary saja → image akhir kecil.

### 3 Istilah Wajib
1. **Multi-stage/AS**: 2-tahap/dapur
2. **COPY --from**: bawa-hasil

---

## Eksperimen

- **Hijau:** Bandingkan `docker images` 1-stage vs multi → beda MB?
- **Kuning:** Hapus `CGO_ENABLED=0` + base `scratch` → error `not found`? (Butuh libc!)
- **Merah:** `COPY . .` sebelum `go mod download` → ubah kode = download ulang (lambat)? Urutkan mod dulu (cache!).

---

## Tantangan

**Peti Diet Lengkap:** Go/Node warung multi-stage + `docker images` <50MB + `run` lulus. **Selesai Menengah Docker!**
- **Sambungan (Minggu 7 — Docker Compose):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Multi-stage/scratch**: diet/kosong
- **CGO_ENABLED**: statis

---

## Ringkasan

Minggu 8 dari 12: **Peti Diet** (Level: Menengah). 800MB → 15MB. **Selesai Menengah Docker!** Lanjut: **Security** (Lanjutan).
