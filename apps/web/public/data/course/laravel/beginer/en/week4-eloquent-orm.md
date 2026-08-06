# Eloquent ORM

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 4:** Eloquent ORM

## Learning Objectives

- Eloquent Model: database table representation as class
- CRUD: create, find, where, update, delete
- Mass assignment: fillable and guarded properties
- Query builder: where, orderBy, limit, get, first
- Timestamps: automatic created_at and updated_at

---

## Program: Database with Eloquent

```php
<?php
echo "=== Eloquent ORM ===<br><br>";

echo "=== Model & Migration ===<br>";
echo "// app/Models/Post.php<br>";
echo "class Post extends Model {<br>";
echo "    protected $fillable = ['title', 'body', 'user_id'];<br>";
echo "    public function user() { return $this->belongsTo(User::class); }<br>";
echo "}<br><br>";

echo "=== CRUD Operations ===<br>";
$posts = [
    ["id" => 1, "title" => "Belajar Laravel", "body" => "...", "user_id" => 1],
    ["id" => 2, "title" => "Eloquent Dasar", "body" => "...", "user_id" => 2],
    ["id" => 3, "title" => "Blade Template", "body" => "...", "user_id" => 1],
];

echo "// Create<br>";
echo "Post::create(['title' => 'New Post', 'body' => 'Content', 'user_id' => 1]);<br><br>";

echo "// Read<br>";
echo "Post::all();           // All posts<br>";
echo "Post::find(1);         // By primary key<br>";
echo "Post::where('user_id', 1)->get();  // With condition<br>";
echo "Post::first();         // First record<br><br>";

echo "// Update<br>";
echo "$post = Post::find(1);<br>";
echo "$post->title = 'Updated';<br>";
echo "$post->save();<br>";
echo "Post::where('id', 1)->update(['title' => 'Updated']);<br><br>";

echo "// Delete<br>";
echo "$post->delete();<br>";
echo "Post::destroy(1);<br><br>";

echo "=== Query Builder ===<br>";
echo "Post::where('user_id', 1)<br>";
echo "    ->where('published', true)<br>";
echo "    ->orderBy('created_at', 'desc')<br>";
echo "    ->limit(10)<br>";
echo "    ->get();<br><br>";

echo "=== Mass Assignment ===<br>";
echo "protected $fillable = ['title', 'body'];<br>";
echo "protected $guarded = ['is_admin'];<br><br>";

echo "=== Timestamps ===<br>";
echo "public $timestamps = true;  // created_at & updated_at<br>";
echo "const CREATED_AT = 'created_at';<br>";
echo "const UPDATED_AT = 'updated_at';<br>";
>
```

---

## Key Concepts

### Models
Each table has a model. Convention: model `Post` → table `posts`.

### CRUD
`Model::create()`, `Model::find()`, `Model::where()->get()`, `$model->save()`, `$model->delete()`.

### Mass Assignment
`$fillable` — fields allowed for mass assignment. `$guarded` — fields protected.

### Query Builder
Chain methods: `where()`, `orderBy()`, `limit()`, `get()`, `first()`.

### Timestamps
Auto-manages `created_at` and `updated_at`.

---

## Experiments

- Create model with migration and try CRUD
- Use firstOrCreate to avoid duplicates
- Try chunk for large data processing
- Implement soft delete
- Create query scope with local scope

---

## Challenge

Create Post model with migration. Implement full CRUD: create, read (all, by id, by user), update, delete. Use mass assignment.

---

## Summary

Week 4 of 12: **Eloquent ORM** (Level: Beginner). Beginner phase complete! Next week: **Authentication** (Intermediate).
