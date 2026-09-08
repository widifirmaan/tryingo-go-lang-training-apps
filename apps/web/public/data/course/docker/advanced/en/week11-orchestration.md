# Orchestration — Foreman of 100 Docker Boxes

> **Kategori:** Docker | **Level:** Advanced | **Minggu 11:** Orchestration

## Learning Objectives

- `docker compose --scale web=3` 3 boxes + Kubernetes `Deployment replicas: 3` + `Service` door (source: kubernetes.io/docs/concepts)
- `kubectl apply/get/logs/scale` foreman commands

---

## Why This Matters (Non-IT)

12.12 promo → 1 web box, endless queue. Needs 3 boxes + auto-replacement when 1 dies. Manual 3x `docker run` + hourly death-checks = no sleep. Orchestrator = 24-hour foreman.

---

## Program: Shop Foreman

```bash
# Light: Compose scale (try first!)
docker compose up -d --scale web=3
docker compose ps  # 3 web running
```

```yaml
# Heavy: Kubernetes Deployment (k8s)
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: shop }
spec:
  replicas: 3  # always 3 boxes!
  selector: { matchLabels: { app: shop } }
  template:
    metadata: { labels: { app: shop } }
    spec:
      containers:
        - name: web
          image: shop:1.0
          ports: [{ containerPort: 80 }]
```

```bash
kubectl apply -f k8s/
kubectl get pods          # 3 RUNNING?
kubectl scale deployment shop --replicas=5
kubectl delete pod <name> # kill 1 → auto-replaced with new!
kubectl logs -l app=shop
```

---

## Key Concepts

### `replicas: 3` = Always 3
1 death → new one auto-created (self-healing).

### `Service` = Fixed Door
Pod IPs keep changing → Service 1 stable door + load balancing.

### Compose Scale vs K8s = Shop vs Mall
`--scale` suffices for 1 server. K8s for many servers.

---

## Beginner Friendly Explanation

### Analogy: Factory Foreman
- **Orchestrator = foreman**: "always 3 cashiers!" → cashier faints → new replacement.
- **Service = receptionist**: customers use 1 door, routed to empty cashiers.

### Step 0 — Prepare Device
- Docker + `minikube start` (local K8s) or `kind`.

### How the Computer Reads It
1. `apply` → K8s records "want 3" → creates 3 Pods.
2. Pod dies → controller sees 2 ≠ 3 → creates 1.

### 3 Must-Know Terms
1. **Pod/Deployment/Service**: box/foreman/door
2. **replicas/scale**: count/add

---

## Experiments

- **Green:** `scale --replicas=1` → 1 Pod?
- **Yellow:** `delete pod` → new Pod auto-appears?
- **Red:** No `Service`, direct Pod IP access → IP changes after restart? (That's why Services!)

---

## Challenge

**Scaled Shop:** Compose `--scale web=3` + K8s manifest `replicas: 3` + kill-1-pod survival proof.

---

## Mini Glossary

- **K8s/Pod/Service**: foreman/box/door

---

## Summary

Week 11 of 12: **Foreman** (Level: Advanced). Always-N boxes. Next: **Capstone**.
