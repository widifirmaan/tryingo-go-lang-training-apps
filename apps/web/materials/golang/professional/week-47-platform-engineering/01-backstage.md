# Backstage

Set up Backstage as an internal developer portal.

## Service Entity Definition

```yaml
# catalog-info.yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: order-service
  description: Order management microservice
  annotations:
    github.com/project-slug: myorg/order-service
    backstage.io/techdocs-ref: dir:.
    backstage.io/view-url: https://github.com/myorg/order-service
spec:
  type: service
  lifecycle: production
  owner: team-orders
  system: ecommerce-platform
  dependsOn:
    - component:user-service
    - resource:order-database
  providesApis:
    - order-service-api
```

## Backstage Plugin in Go

```go
package main

import (
    "encoding/json"
    "net/http"
)

type ServiceEntity struct {
    API         string `json:"apiVersion"`
    Kind        string `json:"kind"`
    Metadata    Metadata `json:"metadata"`
    Spec        Spec     `json:"spec"`
}

type Metadata struct {
    Name        string            `json:"name"`
    Description string            `json:"description"`
    Annotations map[string]string `json:"annotations"`
    Labels      map[string]string `json:"labels,omitempty"`
}

type Spec struct {
    Type       string   `json:"type"`
    Lifecycle  string   `json:"lifecycle"`
    Owner      string   `json:"owner"`
    System     string   `json:"system"`
    DependsOn  []string `json:"dependsOn"`
}

func generateCatalogInfo() ServiceEntity {
    return ServiceEntity{
        API:  "backstage.io/v1alpha1",
        Kind: "Component",
        Metadata: Metadata{
            Name:        "order-service",
            Description: "Order management microservice",
        },
        Spec: Spec{
            Type:      "service",
            Lifecycle: "production",
            Owner:     "team-orders",
        },
    }
}
```

## Go Backstage API Client

```go
type BackstageClient struct {
    baseURL    string
    token      string
    httpClient *http.Client
}

func (c *BackstageClient) ListServices(ctx context.Context) ([]ServiceEntity, error) {
    req, _ := http.NewRequestWithContext(ctx, "GET",
        c.baseURL+"/api/catalog/entities", nil)
    req.Header.Set("Authorization", "Bearer "+c.token)

    resp, err := c.httpClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var entities []ServiceEntity
    json.NewDecoder(resp.Body).Decode(&entities)
    return entities, nil
}
```

## Practice
1. Set up Backstage with Docker Compose
2. Create entity definitions for your services
3. Build a Backstage plugin in Go
