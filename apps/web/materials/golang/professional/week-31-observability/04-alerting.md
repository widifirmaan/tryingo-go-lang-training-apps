# Alerting

Configure alerting rules and notification channels for Go applications.

## Prometheus Alerting Rules

```yaml
# alerts.yml
groups:
  - name: myapp
    rules:
      - alert: HighErrorRate
        expr: |
          rate(http_requests_total{status=~"5.."}[5m])
          /
          rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High HTTP error rate ({{ $value | humanizePercentage }})"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95,
            rate(http_request_duration_seconds_bucket[5m])
          ) > 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "P95 latency above 1s"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical

      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes > 500 * 1024 * 1024
        for: 5m
        labels:
          severity: warning
```

## Alert Manager Configuration

```yaml
# alertmanager.yml
route:
  receiver: "slack-critical"
  routes:
    - match:
        severity: critical
      receiver: "slack-critical"
      repeat_interval: 1h
    - match:
        severity: warning
      receiver: "slack-warnings"

receivers:
  - name: "slack-critical"
    slack_configs:
      - api_url: "https://hooks.slack.com/services/T000000/B000000/XXXXXXXX"
        channel: "#alerts-critical"
        title: '{{ template "slack.title" . }}'
        text: '{{ template "slack.text" . }}'

  - name: "email"
    email_configs:
      - to: "team@example.com"
        from: "alerts@example.com"
        smarthost: "smtp.example.com:587"
        auth_username: "alerts"
        auth_password: "secret"
```

## Health Check Endpoints

```go
type HealthStatus int

const (
    Healthy HealthStatus = iota
    Degraded
    Unhealthy
)

type HealthCheck struct {
    checks []Check
}

type Check struct {
    Name   string
    Check  func(context.Context) error
}

func (h *HealthCheck) Handler(w http.ResponseWriter, r *http.Request) {
    status := Healthy
    results := make(map[string]string)
    for _, check := range h.checks {
        if err := check.Check(r.Context()); err != nil {
            results[check.Name] = fmt.Sprintf("unhealthy: %v", err)
            status = Unhealthy
        } else {
            results[check.Name] = "healthy"
        }
    }
    w.Header().Set("Content-Type", "application/json")
    if status != Healthy {
        w.WriteHeader(http.StatusServiceUnavailable)
    }
    json.NewEncoder(w).Encode(map[string]interface{}{
        "status": status.String(),
        "checks": results,
    })
}
```

## Practice
1. Set up Alertmanager with Slack integration
2. Create alerting rules for business metrics
3. Build a custom alert notification webhook
