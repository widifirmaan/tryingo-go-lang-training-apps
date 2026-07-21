# System Design

Prepare for system design interviews for Go engineering roles.

## Framework

```go
type SystemDesign struct {
    Requirements    Requirements
    Estimation      Estimation
    DataModel       DataModel
    HighLevelDesign HighLevelDesign
    DeepDive        DeepDive
}

type Requirements struct {
    Functional    []string
    NonFunctional []string
}
```

## URL Shortener Design

```go
type URLShortener struct {
    storage    map[string]string
    counter    int64
    baseURL    string
    cache      *redis.Client
}

func (s *URLShortener) Shorten(original string) string {
    s.counter++
    short := s.encode(s.counter)
    s.storage[short] = original
    s.cache.Set(context.Background(), short, original, 24*time.Hour)
    return fmt.Sprintf("%s/%s", s.baseURL, short)
}

func (s *URLShortener) Resolve(short string) (string, error) {
    // Check cache first
    if val, err := s.cache.Get(context.Background(), short).Result(); err == nil {
        return val, nil
    }
    if val, ok := s.storage[short]; ok {
        return val, nil
    }
    return "", ErrNotFound
}

// Capacity estimation
func (s *URLShortener) estimate() Estimation {
    return Estimation{
        ReadsPerDay:    100_000_000,
        WritesPerDay:   1_000_000,
        StoragePerYear: 365 * 1_000_000 * 500, // 500 bytes per entry
        Bandwidth:      100_000_000 * 500,     // 500 bytes per read
    }
}
```

## Design a Chat System

```go
type ChatSystem struct {
    rooms      map[string]*ChatRoom
    presence   *PresenceService
    history    *MessageHistory
}

type ChatRoom struct {
    ID      string
    users   map[string]*User
    messages chan Message
}

func (c *ChatRoom) Broadcast(msg Message) {
    for _, user := range c.users {
        select {
        case user.Send <- msg:
        default:
            // Drop message for slow consumer
        }
    }
}
```

## Practice
1. Design a rate limiter system
2. Design a distributed key-value store
3. Design a real-time notification system
