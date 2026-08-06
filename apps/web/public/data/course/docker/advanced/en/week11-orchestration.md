# Orchestration

> **Kategori:** Docker | **Level:** Advanced | **Minggu 11:** Orchestration

## Learning Objectives

- Kubernetes concepts: Pods, Deployments, Services
- kubectl: get, apply, logs, exec, scale
- Deployment YAML: replicas, resources, probes
- Services: ClusterIP, NodePort, LoadBalancer
- Docker Swarm as lightweight alternative

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

## Key Concepts

### Kubernetes
Container orchestration for deployment, scaling, and operations.

### Pods
Smallest deployable units containing one or more containers.

### Deployments
Manage Pod replicas with rolling updates.

### Services
Network endpoints for Pod access.

### Probes
Health checks for liveness and readiness.

### Docker Swarm
Lightweight alternative built into Docker.

---

## Experiments

- Deploy app to Minikube or kind
- Experiment with scaling
- Try rolling updates
- Create Service with LoadBalancer
- Experiment with ConfigMap

---

## Challenge

Deploy multi-service app to Kubernetes: frontend, backend, database. Use Deployments and Services.

---

## Summary

Week 11 of 12: **Orchestration** (Level: Advanced). Kubernetes and Swarm. Next week: **Capstone Project**!
