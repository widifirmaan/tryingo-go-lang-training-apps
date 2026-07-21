# Service Catalog

Build and maintain a comprehensive service catalog.

## Service Metadata

```go
type ServiceMetadata struct {
    Name            string   `json:"name"`
    Description     string   `json:"description"`
    Domain          string   `json:"domain"`
    Team            string   `json:"team"`
    Slack           string   `json:"slack"`
    PagerDuty       string   `json:"pagerduty"`
    RepoURL         string   `json:"repo_url"`
    DocURL          string   `json:"doc_url"`
    APIURL          string   `json:"api_url"`
    DashboardURL    string   `json:"dashboard_url"`
    Language        string   `json:"language"`
    Framework       string   `json:"framework"`
    Dependencies    []string `json:"dependencies"`
    OwnedBy         string   `json:"owned_by"`
    Lifecycle       string   `json:"lifecycle"` // experimental, production, deprecated
    Tier            int      `json:"tier"`      // 1=critical, 2=important, 3=best-effort
}
```

## Catalog Discovery

```go
type CatalogDiscovery struct {
    basePath string
}

func (d *CatalogDiscovery) DiscoverServices() ([]ServiceMetadata, error) {
    var services []ServiceMetadata

    // Find all go.mod files
    err := filepath.Walk(d.basePath, func(path string, info os.FileInfo, err error) error {
        if info.Name() != "service.yaml" && info.Name() != "service.json" {
            return nil
        }
        svc, err := parseServiceFile(path)
        if err != nil {
            return err
        }
        services = append(services, svc)
        return nil
    })
    return services, err
}

func parseServiceFile(path string) (ServiceMetadata, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return ServiceMetadata{}, err
    }
    var svc ServiceMetadata
    err = yaml.Unmarshal(data, &svc)
    return svc, err
}
```

## Catalog API

```go
type CatalogServer struct {
    services map[string]*ServiceMetadata
    mu       sync.RWMutex
}

func (s *CatalogServer) RegisterService(svc ServiceMetadata) {
    s.mu.Lock()
    s.services[svc.Name] = &svc
    s.mu.Unlock()
}

func (s *CatalogServer) GetService(name string) (*ServiceMetadata, error) {
    s.mu.RLock()
    svc, ok := s.services[name]
    s.mu.RUnlock()
    if !ok {
        return nil, fmt.Errorf("service %s not found", name)
    }
    return svc, nil
}
```

## Practice
1. Create service metadata files for all services
2. Build a catalog API server
3. Implement automated discovery
