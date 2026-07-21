# Feature Flags

Implement feature flags for gradual rollouts and A/B testing.

## Basic Feature Flag System

```go
type FeatureFlag struct {
    Name    string
    Enabled bool
    Percentage int // 0-100
    Rules   []Rule
}

type Rule struct {
    Attribute string
    Operator  string // eq, neq, in, contains
    Value     string
}

type FeatureManager struct {
    flags map[string]*FeatureFlag
    mu    sync.RWMutex
}

func (fm *FeatureManager) IsEnabled(name string, ctx FeatureContext) bool {
    fm.mu.RLock()
    flag, ok := fm.flags[name]
    fm.mu.RUnlock()
    if !ok || !flag.Enabled {
        return false
    }
    for _, rule := range flag.Rules {
        if !rule.Matches(ctx) {
            return false
        }
    }
    if flag.Percentage < 100 {
        hash := fnv.New32a()
        hash.Write([]byte(ctx.UserID))
        if int(hash.Sum32()%100) >= flag.Percentage {
            return false
        }
    }
    return true
}
```

## Integration with Middleware

```go
func FeatureFlagMiddleware(flags *FeatureManager) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            ctx := r.Context()
            if flags.IsEnabled("new-checkout", FeatureContext{
                UserID:    r.Header.Get("X-User-ID"),
                UserAgent: r.UserAgent(),
            }) {
                ctx = context.WithValue(ctx, "feature_new_checkout", true)
            }
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}
```

## Remote Feature Flags (LaunchDarkly)

```go
import (
    ld "github.com/launchdarkly/go-server-sdk/v6"
    "github.com/launchdarkly/go-server-sdk/v6/lduser"
)

func main() {
    client, _ := ld.MakeClient("sdk-key-123", 5*time.Second)
    defer client.Close()

    user := lduser.NewUser("user-123")
    flagValue, _ := client.BoolVariation("new-checkout-flow", user, false)

    if flagValue {
        log.Println("Using new checkout flow")
    }
}
```

## Practice
1. Build a feature flag dashboard API
2. Implement gradual rollout by user percentage
3. Add A/B testing variant assignment
