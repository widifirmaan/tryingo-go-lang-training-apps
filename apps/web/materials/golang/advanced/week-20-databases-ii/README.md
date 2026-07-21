# Week 20: Databases II

Using ORMs and advanced database patterns in Go. This week focuses on GORM, the most popular Go ORM, along with relationships, advanced queries, and raw SQL.

## Topics

- GORM ORM fundamentals
- Model definitions and associations
- Advanced querying with scopes and preloading
- Raw SQL and query building

## Goals

- Set up GORM with auto-migration
- Define models with relationships (has many, belongs to, many2many)
- Write complex queries using GORM's chainable API
- Use raw SQL when ORM falls short

## Key Concepts

| Concept | Description |
|---------|-------------|
| GORM | Feature-rich ORM for Go |
| AutoMigrate | Automatic schema migration |
| Association | Model relationships (Has Many, Belongs To, Many2Many) |
| Preloading | Eager loading of related data |
| Scopes | Reusable query fragments |

## Practice Exercises

1. Define models for a blog (User, Post, Comment, Tag)
2. Create records with nested associations
3. Write queries using preloading and scopes
4. Compare GORM vs raw SQL performance
