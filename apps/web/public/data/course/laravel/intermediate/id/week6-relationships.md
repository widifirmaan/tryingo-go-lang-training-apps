# Database Relationships

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 6:** Database Relationships

## Tujuan Pembelajaran

- One to One: hasOne dan belongsTo
- One to Many: hasMany dan belongsTo
- Many to Many: belongsToMany dengan pivot table
- Eager Loading: with() untuk solve N+1 problem
- Polymorphic: morphTo untuk relasi multi-model

---

## Program: Relasi Eloquent

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

## Konsep Kunci

### One to One
`hasOne()` — user punya satu profile. `belongsTo()` — profile milik satu user.

### One to Many
`hasMany()` — post punya banyak comment. `belongsTo()` — comment milik satu post.

### Many to Many
`belongsToMany()` — user punya banyak role via pivot table `role_user`.

### Eager Loading
`with('user')` load relasi di 1 query. Tanpa ini = N+1 problem.

### Polymorphic
`morphTo()` — comment bisa milik post ATAU video. Tabel: `commentable_id`, `commentable_type`.

---

## Eksperimen

- Buat relasi One to One dan coba akses
- Implementasikan Many to Many dengan pivot data
- Coba Lazy Easing Load: load()
- Buat Polymorphic relation untuk image
- Gunakan whereHas untuk filter by relation

---

## Tantangan

Buat sistem blog dengan relasi: User hasMany Post, Post hasMany Comment, Post belongsToMany Tag. Gunakan eager loading.

---

## Ringkasan

Minggu 6 dari 12: **Database Relationships** (Level: Menengah). Kekuatan Eloquent. Minggu depan: **Validation & Form Requests**.
