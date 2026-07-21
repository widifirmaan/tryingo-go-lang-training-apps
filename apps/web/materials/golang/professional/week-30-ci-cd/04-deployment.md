# Deployment

Deploy Go applications with various strategies and environments.

## Deployment Workflow

```yaml
name: Deploy

on:
  workflow_run:
    workflows: ["CI"]
    branches: [main]
    types:
      - completed

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy myapp \
            --image gcr.io/${{ secrets.GCP_PROJECT }}/myapp:${{ github.sha }} \
            --platform managed \
            --region us-central1 \
            --allow-unauthenticated
```

## Blue/Green Deployment

```go
package main

import (
    "encoding/json"
    "net/http"
    "os"
)

func main() {
    color := os.Getenv("DEPLOY_COLOR")
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"color": color})
    })
    http.ListenAndServe(":8080", nil)
}
```

## Canary Release

```yaml
jobs:
  canary:
    steps:
      - name: Deploy Canary
        run: |
          kubectl set image deployment/myapp-canary myapp=gcr.io/project/myapp:${{ github.sha }}
          kubectl scale deployment/myapp-canary --replicas=1

      - name: Wait for stability
        run: sleep 300

      - name: Promote
        if: success()
        run: |
          kubectl set image deployment/myapp-stable myapp=gcr.io/project/myapp:${{ github.sha }}
          kubectl scale deployment/myapp-canary --replicas=0
```

## Rollback Strategy

```go
package deploy

import (
    "context"
    "fmt"
    "time"
)

type RollbackManager struct {
    versions []string
    index    int
}

func (r *RollbackManager) Rollback(ctx context.Context, steps int) error {
    target := r.index - steps
    if target < 0 {
        return fmt.Errorf("cannot rollback beyond initial version")
    }
    version := r.versions[target]
    return deployVersion(ctx, version)
}
```

## Practice
1. Set up a blue/green deployment pipeline
2. Implement canary release with metrics monitoring
3. Create a deployment rollback script
