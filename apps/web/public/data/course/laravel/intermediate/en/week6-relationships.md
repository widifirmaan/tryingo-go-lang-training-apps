# Database Relationships

> **Kategori:** Laravel | **Level:** undefined | **Minggu 6:** Database Relationships

## Learning Objectives

- One to One: hasOne and belongsTo
- One to Many: hasMany and belongsTo
- Many to Many: belongsToMany with pivot table
- Eager Loading: with() to solve N+1 problem
- Polymorphic: morphTo for multi-model relations

---

## Program: Eloquent Relations

```php
<?php
echo "=== Eloquent Relationships ===<br><br>";

echo "=== One to One ===<br>";
echo "class User extends Model {<br>";
echo "    public function profile() {<br>";
echo "        return $this->hasOne(Profile::class);<br>";
echo "    }<br>";
echo "}<br>";
echo "$user->profile;  // Get user profile<br><br>";

echo "=== One to Many ===<br>";
echo "class Post extends Model {<br>";
echo "    public function comments() {<br>";
echo "        return $this->hasMany(Comment::class);<br>";
echo "    }<br>";
echo "}<br>";
echo "$post->comments;  // All comments<br>";
echo "Comment::whereBelongsTo($post)->get();<br><br>";

echo "=== Many to Many ===<br>";
echo "class User extends Model {<br>";
echo "    public function roles() {<br>";
echo "        return $this->belongsToMany(Role::class);<br>";
echo "    }<br>";
echo "}<br>";
echo "$user->roles()->attach($roleId);<br>";
echo "$user->roles()->detach($roleId);<br>";
echo "$user->roles()->sync([1, 2, 3]);<br><br>";

echo "=== Has Many Through ===<br>";
echo "class Country extends Model {<br>";
echo "    public function posts() {<br>";
echo "        return $this->hasManyThrough(Post::class, User::class);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Polymorphic ===<br>";
echo "class Comment extends Model {<br>";
echo "    public function commentable() {<br>";
echo "        return $this->morphTo();<br>";
echo "    }<br>";
echo "}<br>";
echo "$post->comments;  // Polymorphic comments<br><br>";

echo "=== Eager Loading ===<br>";
echo "Post::with('user', 'comments')->get();<br>";
echo "Post::withCount('comments')->get();<br>";
echo "Post::whereHas('comments', fn($q) => $q->where('approved', true))->get();<br>";
>
```

---

## Key Concepts

### One to One
`hasOne()` — user has one profile. `belongsTo()` — profile belongs to user.

### One to Many
`hasMany()` — post has many comments. `belongsTo()` — comment belongs to post.

### Many to Many
`belongsToMany()` — user has many roles via pivot table.

### Eager Loading
`with('user')` loads relation in 1 query. Without = N+1 problem.

### Polymorphic
`morphTo()` — comment can belong to post OR video.

---

## Experiments

- Create One to One relation and try accessing
- Implement Many to Many with pivot data
- Try Lazy Eager Loading: load()
- Create Polymorphic relation for images
- Use whereHas to filter by relation

---

## Challenge

Build a blog system with relations: User hasMany Post, Post hasMany Comment, Post belongsToMany Tag. Use eager loading.

---

## Summary

Week 6 of 12: **Database Relationships** (Level: Intermediate). Eloquent's power. Next week: **Validation & Form Requests**.
