# Security — Gembok Peti Docker

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 9:** Security
> **Prasyarat:** Minggu 8 — **Multi-Stage Build**.

## Tujuan Pembelajaran

- `USER appuser` jangan root, `--read-only` + `--cap-drop ALL` kurangi senjata, `trivy image` scan (sumber: docs.docker.com/security + aquasec Trivy)
- `--memory`/`--cpus` batasi, secret via env/file (jangan di image!)

---

## Kenapa Ini Penting Buat Kamu?

Peti jalan sebagai `root` + hacker masuk → kuasai host! Tanpa scan, image `postgres:15` lama berisi CVE kritis. Tanpa limit, 1 peti makan RAM → server mati semua.

---

## Program: Peti Bergembok Warung

```dockerfile
# Dockerfile aman
FROM alpine:3.19
RUN addgroup -S app && adduser -S warung -G app
USER warung
COPY --chown=warung:app index.html /web/
CMD ["httpd", "-f", "-h", "/web"]
```

```bash
# Jalan minimal senjata + baca-saja + limit
docker run -d --name web \
  --read-only --tmpfs /tmp \
  --cap-drop ALL \
  --memory 256m --cpus 0.5 \
  -p 8080:80 warung:1.0

# Scan sebelum deploy!
trivy image warung:1.0
# → HIGH/CRITICAL? Update base image!

# Siapa jalan? (bukan root!)
docker exec web whoami  # warung
```

---

## Konsep Kunci

### `USER` non-root = Bukan Bos
Hacker masuk sebagai `warung` (bukan `root`) → damage terbatas.

### `--read-only` + `--cap-drop` = Tangan Diikat
Tidak bisa tulis + tidak bisa `mount`/`reboot`.

### `trivy` = Rontgen
Scan CVE sebelum deploy. `--memory/--cpus` = jatah.

---

## Penjelasan untuk Pemula

### Analogi: Peti dengan Gembok
- **USER = kartu akses karyawan** (bukan kunci master).
- **read-only = etalase kaca**: lihat, tidak utak-atik.
- **trivy = rontgen bea cukai**: scan sebelum masuk.

### Langkah 0 — Siapkan Device
- Docker + `trivy` (`brew install trivy` / binary).

### Cara Komputer Membaca
1. `USER warung` → proses UID non-0.
2. `--cap-drop ALL` → kernel tolak `mount`, `reboot`.

### 3 Istilah Wajib
1. **USER/root**: karyawan/bos
2. **read-only/cap-drop**: kaca/ikat
3. **Trivy/CVE**: rontgen/lubang

---

## Eksperimen

- **Hijau:** `whoami` di peti root vs `USER warung`?
- **Kuning:** `touch /x` di `--read-only` → `Read-only file system`?
- **Merah:** `trivy image nginx:latest` → CVE? Ganti `alpine` + scan lagi (turun?).

---

## Tantangan

**Peti Aman Lengkap:** `USER` + `--read-only` + `--cap-drop ALL` + `--memory 256m` + `trivy` 0 CRITICAL + screenshot.
- **Sambungan (Minggu 8 — Multi-Stage Build):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **USER/cap-drop/read-only**: karyawan/ikat/kaca
- **Trivy/CVE**: rontgen/lubang

---

## Ringkasan

Minggu 9 dari 12: **Gembok Peti** (Level: Lanjutan). Bukan root + scan. Minggu depan: **CI/CD** — pabrik otomatis.
