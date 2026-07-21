# Relations

Defining and querying model relationships with GORM.

## Has Many

```go
type User struct {
    gorm.Model
    Name    string
    Posts   []Post `gorm:"foreignKey:UserID"`
}

type Post struct {
    gorm.Model
    Title   string
    Content string
    UserID  uint
}
```

## Belongs To

```go
type Profile struct {
    gorm.Model
    UserID uint
    User   User `gorm:"foreignKey:UserID"`
    Bio    string
}
```

## Many to Many

```go
type Student struct {
    gorm.Model
    Name    string
    Courses []Course `gorm:"many2many:student_courses;"`
}

type Course struct {
    gorm.Model
    Title    string
    Students []Student `gorm:"many2many:student_courses;"`
}
```

## Working with Associations

```go
// Create with associations
user := User{Name: "John", Posts: []Post{
    {Title: "First Post", Content: "Hello!"},
    {Title: "Second Post", Content: "World!"},
}}
db.Create(&user)

// Append associations
db.Model(&user).Association("Posts").Append(&Post{Title: "Third Post"})

// Replace associations
db.Model(&user).Association("Posts").Replace([]Post{post1, post2})

// Delete association
db.Model(&user).Association("Posts").Delete(post1)

// Clear all associations
db.Model(&user).Association("Posts").Clear()

// Count associations
count := db.Model(&user).Association("Posts").Count()
```

## Preloading

```go
// Eager load associations
var users []User
db.Preload("Posts").Find(&users)

// Nested preloading
db.Preload("Posts.Comments").Preload("Profile").Find(&users)

// Preload with conditions
db.Preload("Posts", "published = ?", true).Find(&users)

// Preload with function
db.Preload("Posts", func(db *gorm.DB) *gorm.DB {
    return db.Order("created_at DESC").Limit(5)
}).Find(&users)
```

## Practice

1. Define a Comment model that belongs to Post and User
2. Create records with nested associations
3. Write queries with nested preloading
4. Implement polymorphic associations (e.g., Imageable)
