# Metrics

Export application metrics with Prometheus in Go.

## Basic Metrics

```go
import "github.com/prometheus/client_golang/prometheus"

var (
    httpRequestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total number of HTTP requests",
        },
        []string{"method", "path", "status"},
    )

    httpRequestDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name:    "http_request_duration_seconds",
            Help:    "HTTP request duration in seconds",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "path"},
    )

    activeConnections = prometheus.NewGauge(
        prometheus.GaugeOpts{
            Name: "active_connections",
            Help: "Current number of active connections",
        },
    )
)

func init() {
    prometheus.MustRegister(httpRequestsTotal)
    prometheus.MustRegister(httpRequestDuration)
    prometheus.MustRegister(activeConnections)
}
```

## HTTP Metrics Middleware

```go
func MetricsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        wrapped := &responseWriter{ResponseWriter: w, statusCode: http.StatusOK}
        next.ServeHTTP(wrapped, r)
        duration := time.Since(start).Seconds()

        httpRequestsTotal.WithLabelValues(
            r.Method, r.URL.Path, strconv.Itoa(wrapped.statusCode),
        ).Inc()

        httpRequestDuration.WithLabelValues(
            r.Method, r.URL.Path,
        ).Observe(duration)
    })
}
```

## Metrics Server

```go
func main() {
    mux := http.NewServeMux()
    mux.Handle("/metrics", promhttp.Handler())
    mux.Handle("/", MetricsMiddleware(handlers()))
    http.ListenAndServe(":8080", mux)
}

// prometheus.yml
scrape_configs:
  - job_name: "myapp"
    static_configs:
      - targets: ["localhost:8080"]
```

## Custom Business Metrics

```go
type OrderMetrics struct {
    created    prometheus.Counter
    revenue    prometheus.Counter
    latency    prometheus.Histogram
    cancellations prometheus.Counter
}

func NewOrderMetrics() *OrderMetrics {
    m := &OrderMetrics{
        created: promauto.NewCounter(prometheus.CounterOpts{
            Name: "orders_created_total",
        }),
        revenue: promauto.NewCounter(prometheus.CounterOpts{
            Name: "orders_revenue_total",
        }),
        latency: promauto.NewHistogram(prometheus.HistogramOpts{
            Name: "orders_processing_seconds",
        }),
    }
    return m
}

func (m *OrderMetrics) RecordOrder(amount float64, duration time.Duration) {
    m.created.Inc()
    m.revenue.Add(amount)
    m.latency.Observe(duration.Seconds())
}
```

## Practice
1. Create a custom histogram for API response sizes
2. Add business metrics for your application domain
3. Build a Grafana dashboard from Prometheus metrics
