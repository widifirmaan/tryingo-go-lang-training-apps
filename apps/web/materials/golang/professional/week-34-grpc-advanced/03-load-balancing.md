# gRPC Load Balancing

Configure client-side load balancing for gRPC services.

## Client-Side Load Balancing

```go
func main() {
    resolver.SetDefaultScheme("dns")
    conn, err := grpc.Dial(
        "dns:///orderservice:50051",
        grpc.WithDefaultServiceConfig(`{
            "loadBalancingConfig": [
                { "round_robin": {} }
            ]
        }`),
        grpc.WithInsecure(),
        grpc.WithBlock(),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer conn.Close()
}
```

## Custom Name Resolver

```go
type ConsulResolverBuilder struct{}

func (b *ConsulResolverBuilder) Build(target resolver.Target, cc resolver.ClientConn,
    opts resolver.BuildOptions) (resolver.Resolver, error) {
    r := &ConsulResolver{
        target: target,
        cc:     cc,
        addrsCh: make(chan []string),
    }
    go r.watch()
    return r, nil
}

func (b *ConsulResolverBuilder) Scheme() string {
    return "consul"
}

type ConsulResolver struct {
    target  resolver.Target
    cc      resolver.ClientConn
    addrsCh chan []string
}

func (r *ConsulResolver) watch() {
    for addrs := range r.addrsCh {
        var endpoints []resolver.Endpoint
        for _, addr := range addrs {
            endpoints = append(endpoints, resolver.Endpoint{
                Addresses: []resolver.Address{{Addr: addr}},
            })
        }
        r.cc.UpdateState(resolver.State{Endpoints: endpoints})
    }
}

func init() {
    resolver.Register(&ConsulResolverBuilder{})
}
```

## gRPC with Kubernetes

```go
func connectToK8sService() (*grpc.ClientConn, error) {
    conn, err := grpc.Dial(
        "order-svc.namespace.svc.cluster.local:50051",
        grpc.WithInsecure(),
        grpc.WithDefaultServiceConfig(`{
            "loadBalancingConfig": [{ "round_robin": {} }],
            "methodConfig": [{
                "name": [{"service": "OrderService"}],
                "timeout": "5s",
                "retryPolicy": {
                    "maxAttempts": 3,
                    "initialBackoff": "0.1s",
                    "maxBackoff": "1s",
                    "backoffMultiplier": 2,
                    "retryableStatusCodes": ["UNAVAILABLE"]
                }
            }]
        }`),
    )
    return conn, err
}
```

## Service Configuration

```go
type LBConfig struct {
    LoadBalancingPolicy string            `json:"loadBalancingPolicy"`
    MethodConfig        []MethodConfig    `json:"methodConfig"`
}

type MethodConfig struct {
    Name      []ServiceName `json:"name"`
    Timeout   string        `json:"timeout"`
    RetryPolicy *RetryPolicy `json:"retryPolicy,omitempty"`
}

type ServiceName struct {
    Service string `json:"service"`
}

type RetryPolicy struct {
    MaxAttempts       int      `json:"maxAttempts"`
    InitialBackoff    string   `json:"initialBackoff"`
    MaxBackoff        string   `json:"maxBackoff"`
    BackoffMultiplier float64  `json:"backoffMultiplier"`
    RetryableStatusCodes []string `json:"retryableStatusCodes"`
}
```

## Practice
1. Set up gRPC load balancing with Kubernetes
2. Implement a custom etcd-based resolver
3. Configure retry policy for transient failures
