# Orchestration — Mandor 100 Peti Docker

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 11:** Orchestration

## Tujuan Pembelajaran

- `docker compose --scale web=3` 3 peti + Kubernetes `Deployment replicas: 3` + `Service` pintu (sumber: kubernetes.io/docs/concepts)
- `kubectl apply/get/logs/scale` perintah mandor

---

## Kenapa Ini Penting Buat Kamu?

Promo 12.12 → 1 web peti antre panjang. Butuh 3 peti + mati 1 diganti otomatis. Manual `docker run` 3x + cek mati tiap jam = tidak tidur. Orchestrator = mandor 24 jam.

---

## Program: Mandor Warung

```bash
# Ringan: Compose scale (coba dulu!)
docker compose up -d --scale web=3
docker compose ps  # 3 web jalan
```

```yaml
# Berat: Kubernetes Deployment (k8s)
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: warung }
spec:
  replicas: 3  # selalu 3 peti!
  selector: { matchLabels: { app: warung } }
  template:
    metadata: { labels: { app: warung } }
    spec:
      containers:
        - name: web
          image: warung:1.0
          ports: [{ containerPort: 80 }]
```

```bash
kubectl apply -f k8s/
kubectl get pods          # 3 RUNNING?
kubectl scale deployment warung --replicas=5
kubectl delete pod <nama> # mati 1 → otomatis ganti baru!
kubectl logs -l app=warung
```

---

## Konsep Kunci

### `replicas: 3` = Selalu 3
Mati 1 → buat baru otomatis (self-healing).

### `Service` = Pintu Tetap
Pod IP berubah-ubah → Service 1 pintu stabil + bagi beban.

### Compose Scale vs K8s = Warung vs Mal
`--scale` cukup untuk 1 server. K8s untuk banyak server.

---

## Penjelasan untuk Pemula

### Analogi: Mandor Pabrik
- **Orchestrator = mandor**: "selalu 3 kasir!" → kasir pingsan → ganti baru.
- **Service = resepsionis**: pelanggan ke 1 pintu, dibagi ke kasir kosong.

### Langkah 0 — Siapkan Device
- Docker + `minikube start` (K8s lokal) atau `kind`.

### Cara Komputer Membaca
1. `apply` → K8s catat "mau 3" → buat 3 Pod.
2. Pod mati → controller lihat 2 ≠ 3 → buat 1.

### 3 Istilah Wajib
1. **Pod/Deployment/Service**: peti/mandor/pintu
2. **replicas/scale**: jumlah/tambah

---

## Eksperimen

- **Hijau:** `scale --replicas=1` → 1 Pod?
- **Kuning:** `delete pod` → Pod baru muncul otomatis?
- **Merah:** Tanpa `Service`, akses Pod langsung via IP → IP berubah setelah restart? (Itulah gunanya Service!)

---

## Tantangan

**Mal Terorkestrasi:** `Deployment replicas: 3` + `Service` + `scale 5` + `delete` 1 Pod buktikan ganti otomatis + screenshot `get pods`.

---

## Glosarium Mini

- **Pod/Deployment/Service**: peti/mandor/pintu
- **kubectl/scale**: perintah/tambah

---

## Ringkasan

Minggu 11 dari 12: **Mandor 24 Jam** (Level: Lanjutan). Mati diganti otomatis. Minggu depan: **Capstone**.
