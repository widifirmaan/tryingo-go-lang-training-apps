# Orchestration

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 11:** Orchestration

## Tujuan Pembelajaran

- Kubernetes concepts: Pod, Deployment, Service
- kubectl: get, apply, logs, exec, scale
- Deployment YAML: replicas, resources, probes
- Service: ClusterIP, NodePort, LoadBalancer
- Docker Swarm sebagai alternatif ringan

---

## Program: Kubernetes Basics

```bash
# ─────────────────────────────────────────────────────────
# KUBERNETES ORCHESTRATION — Basics
# ─────────────────────────────────────────────────────────

# Kubernetes Concepts:
# Pod = smallest unit (1+ containers)
# Deployment = manage Pod replicas
# Service = network endpoint
# Namespace = logical grouping
# ConfigMap/Secret = configuration

# kubectl basics
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl get pods
kubectl get services
kubectl get deployments

# File: deployment.yml
cat << 'EOF' > deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: myapp:1.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
EOF

# Apply dan manage
kubectl apply -f deployment.yml
kubectl get pods -w                    # Watch pods
kubectl logs my-app-xxx               # Pod logs
kubectl exec -it my-app-xxx -- bash    # Exec di pod
kubectl scale deployment my-app --replicas=5
kubectl rollout status deployment/my-app
kubectl rollout undo deployment/my-app

# Docker Swarm (alternative)
docker swarm init
docker service create --name web --replicas 3 -p 80:80 nginx
docker service ls
docker service scale web=5
docker stack deploy -c docker-compose.yml myapp
```

---

## Konsep Kunci

### Kubernetes
Container orchestration platform. Manage deployment, scaling, dan operations.

### Pod
Smallest deployable unit. Bisa berisi 1+ container.

### Deployment
Manage Pod replicas. Rolling update, rollback.

### Service
Network endpoint untuk akses Pod. Types: ClusterIP, NodePort, LoadBalancer.

### Probes
- Liveness: restart jika unhealthy
- Readiness: mulai terima traffic jika ready

### Docker Swarm
Lighter alternative. Built into Docker. Less features dari K8s.

---

## Eksperimen

- Deploy app ke Minikube atau kind
- Eksperimen dengan scaling
- Coba rolling update
- Buat Service dengan LoadBalancer
- Eksperimen dengan ConfigMap

---

## Tantangan

Deploy multi-service app ke Kubernetes: frontend, backend, database. Gunakan Deployment dan Service.

---

## Ringkasan

Minggu 11 dari 12: **Orchestration** (Level: Lanjutan). Kubernetes dan Swarm. Minggu depan: **Capstone Project**!
