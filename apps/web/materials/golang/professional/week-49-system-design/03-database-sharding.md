# Database Sharding

Design and implement database sharding strategies.

## Sharding Strategies

```go
type ShardStrategy int

const (
    HashShard ShardStrategy = iota
    RangeShard
    DirectoryShard
    GeoShard
)

type ShardConfig struct {
    Strategy    ShardStrategy
    ShardCount  int
    ShardMap    map[string]int
}
```

## Hash-Based Sharding

```go
type HashShardManager struct {
    shards []*sql.DB
    count  int
}

func (m *HashShardManager) GetShard(key string) *sql.DB {
    h := fnv.New64a()
    h.Write([]byte(key))
    idx := int(h.Sum64() % uint64(m.count))
    return m.shards[idx]
}

func (m *HashShardManager) GetUserByID(ctx context.Context, userID string) (*User, error) {
    shard := m.GetShard(userID)
    row := shard.QueryRowContext(ctx, "SELECT * FROM users WHERE id = $1", userID)
    var user User
    err := row.Scan(&user.ID, &user.Name, &user.Email)
    return &user, err
}
```

## Range-Based Sharding

```go
type RangeShardManager struct {
    shards  []*sql.DB
    ranges  []ShardRange
}

type ShardRange struct {
    Start string
    End   string
    Shard *sql.DB
}

func (m *RangeShardManager) GetShard(key string) *sql.DB {
    for _, r := range m.ranges {
        if key >= r.Start && key < r.End {
            return r.Shard
        }
    }
    return m.shards[len(m.shards)-1] // default to last
}
```

## Sharded Repository

```go
type ShardedUserRepository struct {
    shardManager *HashShardManager
}

func (r *ShardedUserRepository) Create(ctx context.Context, user *User) error {
    shard := r.shardManager.GetShard(user.ID)
    _, err := shard.ExecContext(ctx,
        "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
        user.ID, user.Name, user.Email)
    return err
}

// Cross-shard query
func (r *ShardedUserRepository) FindAll(ctx context.Context) ([]*User, error) {
    var users []*User
    for _, shard := range r.shardManager.shards {
        rows, err := shard.QueryContext(ctx, "SELECT id, name, email FROM users")
        if err != nil {
            return nil, err
        }
        defer rows.Close()
        for rows.Next() {
            var user User
            rows.Scan(&user.ID, &user.Name, &user.Email)
            users = append(users, &user)
        }
    }
    return users, nil
}
```

## Resharding

```go
type Resharder struct {
    oldShards []*sql.DB
    newShards []*sql.DB
}

func (r *Resharder) Migrate(ctx context.Context, table string) error {
    for _, oldShard := range r.oldShards {
        rows, _ := oldShard.QueryContext(ctx, "SELECT * FROM "+table)
        for rows.Next() {
            // Read row
            // Determine new shard
            // Insert into new shard
        }
    }
    return nil
}
```

## Practice
1. Implement hash-based user sharding
2. Design a range sharding for time-series data
3. Plan a resharding strategy
