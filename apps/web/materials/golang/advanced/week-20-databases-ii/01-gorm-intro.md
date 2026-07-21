# GORM Introduction

GORM is a full-featured ORM for Go.

## Installation

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
```

## Connecting to Database

```go
import (
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

func main() {
    dsn := "host=localhost user=app password=secret dbname=mydb port=5432 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        panic(err)
    }
}
```

## Defining Models

```go
type User struct {
    gorm.Model
    Name    string `gorm:"size:255;not null"`
    Email   string `gorm:"uniqueIndex;size:255"`
    Age     int
    Active  bool      `gorm:"default:true"`
    Salary  float64
    JoinedAt time.Time
}
```

## Auto Migration

```go
db.AutoMigrate(&User{}, &Product{}, &Order{})
```

## CRUD Operations

```go
// Create
user := User{Name: "John", Email: "john@example.com"}
result := db.Create(&user)
fmt.Println(user.ID, result.Error, result.RowsAffected)

// Read
var user User
db.First(&user, 1)                      // by primary key
db.First(&user, "email = ?", "john@example.com")
db.Take(&user)                          // first record without order
db.Last(&user)                          // last record

// Update
db.Model(&user).Update("name", "Jane")
db.Model(&user).Updates(User{Name: "Jane", Age: 30})
db.Model(&user).Updates(map[string]interface{}{"name": "Jane", "age": 30})

// Delete
db.Delete(&user)                        // soft delete (sets deleted_at)
db.Unscoped().Delete(&user)             // permanent delete
```

## Practice

1. Create models for Product, Category, and Inventory
2. Implement auto-migration with custom table names
3. Write CRUD operations for a Task model
4. Use hooks (BeforeCreate, AfterUpdate) for timestamps
