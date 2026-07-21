# Advanced Queries

Advanced query patterns with GORM: scopes, smart select, and complex queries.

## Scopes

```go
func Active(db *gorm.DB) *gorm.DB {
    return db.Where("active = ?", true)
}

func Recent(days int) func(db *gorm.DB) *gorm.DB {
    return func(db *gorm.DB) *gorm.DB {
        return db.Where("created_at > ?", time.Now().AddDate(0, 0, -days))
    }
}

func Paginate(page, pageSize int) func(db *gorm.DB) *gorm.DB {
    return func(db *gorm.DB) *gorm.DB {
        offset := (page - 1) * pageSize
        return db.Offset(offset).Limit(pageSize)
    }
}

db.Scopes(Active, Recent(7), Paginate(1, 20)).Find(&users)
```

## Chainable Query API

```go
var users []User

db.Where("age > ?", 18).
    Where("active = ?", true).
    Or("name LIKE ?", "%john%").
    Not("email IS NULL").
    Order("age DESC, name ASC").
    Limit(10).
    Offset(20).
    Find(&users)
```

## Joins

```go
type Result struct {
    UserName   string
    PostTitle  string
}

var results []Result
db.Model(&User{}).
    Select("users.name as user_name, posts.title as post_title").
    Joins("left join posts on posts.user_id = users.id").
    Scan(&results)
```

## Aggregations

```go
type Stats struct {
    Count   int64
    AvgAge  float64
    MaxAge  int
    MinAge  int
}

var stats Stats
db.Model(&User{}).
    Select("COUNT(*) as count, AVG(age) as avg_age, MAX(age) as max_age, MIN(age) as min_age").
    Scan(&stats)

// Group by
type GroupCount struct {
    Name  string
    Count int
}

var results []GroupCount
db.Model(&User{}).
    Select("name, COUNT(*) as count").
    Group("name").
    Having("COUNT(*) > 1").
    Scan(&results)
```

## Practice

1. Create a reusable pagination scope
2. Write a query with multiple joins and aggregations
3. Implement search functionality using ILIKE
4. Use subqueries in WHERE clauses
