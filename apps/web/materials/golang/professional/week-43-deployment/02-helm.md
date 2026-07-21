# Helm Charts

Package and deploy Go applications with Helm.

## Chart Structure

```
myapp-chart/
├── Chart.yaml
├── values.yaml
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   ├── hpa.yaml
│   ├── pdb.yaml
│   ├── serviceaccount.yaml
│   └── _helpers.tpl
└── charts/
```

## Chart.yaml

```yaml
apiVersion: v2
name: myapp
description: Go application Helm chart
type: application
version: 0.1.0
appVersion: "1.16.0"
keywords:
  - go
  - api
maintainers:
  - name: Developer
    email: dev@example.com
dependencies:
  - name: postgresql
    version: "~12.0"
    repository: "https://charts.bitnami.com/bitnami"
    condition: postgresql.enabled
```

## values.yaml

```yaml
replicaCount: 3

image:
  repository: ghcr.io/myorg/myapp
  tag: latest
  pullPolicy: Always

imagePullSecrets:
  - name: ghcr-secret

service:
  type: ClusterIP
  port: 8080
  metricsPort: 9090

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: api.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: myapp-tls
      hosts:
        - api.example.com

resources:
  limits:
    cpu: 500m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

env:
  - name: LOG_LEVEL
    value: "info"
  - name: ENVIRONMENT
    value: "production"

postgresql:
  enabled: true
  auth:
    database: myapp
    username: myapp
```

## Template helpers

```yaml
{{- define "myapp.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "myapp.selectorLabels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
```

## Practice
1. Create a Helm chart for your Go application
2. Add conditional features with values
3. Deploy with Helm to different environments
