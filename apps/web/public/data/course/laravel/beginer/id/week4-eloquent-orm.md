# Eloquent ORM

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 4:** Eloquent ORM

## Tujuan Pembelajaran

- Eloquent Model: representasi tabel database sebagai class
- CRUD: create, find, where, update, delete
- Mass assignment: fillable dan guarded properties
- Query builder: where, orderBy, limit, get, first
- Timestamps: created_at dan updated_at otomatis

---

## Program: Database dengan Eloquent

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

## Konsep Kunci

### Model
Setiap tabel punya model. Convention: model `Post` → tabel `posts`.

### CRUD
`Model::create($data)`, `Model::find($id)`, `Model::where()->get()`, `$model->save()`, `$model->delete()`.

### Mass Assignment
`$fillable` — field yang boleh diisi mass. `$guarded` — field yang dilarang.

### Query Builder
Chain methods: `where()`, `orderBy()`, `limit()`, `get()`, `first()`, `count()`.

### Timestamps
Otomatis manage `created_at` dan `updated_at`. Set `public $timestamps = false` untuk disable.

---

## Eksperimen

- Buat model dengan migration dan coba CRUD
- Gunakan firstOrCreate untuk avoid duplicate
- Coba chunk untuk proses data besar
- Implementasikan soft delete
- Buat scope query dengan local scope

---

## Tantangan

Buat model Post dengan migration. Implementasikan CRUD lengkap: create, read (all, by id, by user), update, delete. Gunakan mass assignment.

---

## Ringkasan

Minggu 4 dari 12: **Eloquent ORM** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Authentication** (Intermediate).
