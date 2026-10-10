# Capstone: Aplikasi Blog

> **Kategori:** PHP | **Level:** Menengah | **Minggu 12:** Capstone: Aplikasi Blog

## Tujuan Pembelajaran

- Menggabungkan semua konsep: OOP, PDO, Composer, Testing
- Repository Pattern: pemisahan data access dan business logic
- CRUD lengkap: Create, Read, Update, Delete dengan validasi
- Search functionality dengan filtering
- Clean architecture: separation of concerns

---

## Program: Blog System

```php
<?php
echo "=== Capstone: Blog Application ===<br><br>";

class BlogPost {
    public int $id;
    public string $title;
    public string $content;
    public string $author;
    public string $created_at;

    public function __construct(int $id, string $title, string $content, string $author) {
        $this->id = $id;
        $this->title = $title;
        $this->content = $content;
        $this->author = $author;
        $this->created_at = date("Y-m-d H:i:s");
    }

    public function excerpt(int $len = 100): string {
        return strlen($this->content) > $len
            ? substr($this->content, 0, $len) . "..."
            : $this->content;
    }
}

class BlogRepository {
    private array $posts = [];
    private int $nextId = 1;

    public function create(string $title, string $content, string $author): BlogPost {
        $post = new BlogPost($this->nextId++, $title, $content, $author);
        $this->posts[] = $post;
        return $post;
    }

    public function find(int $id): ?BlogPost {
        foreach ($this->posts as $p) {
            if ($p->id === $id) return $p;
        }
        return null;
    }

    public function all(): array {
        return array_reverse($this->posts);
    }

    public function delete(int $id): bool {
        foreach ($this->posts as $i => $p) {
            if ($p->id === $id) {
                array_splice($this->posts, $i, 1);
                return true;
            }
        }
        return false;
    }

    public function search(string $query): array {
        return array_filter($this->posts, fn($p) =>
            stripos($p->title, $query) !== false ||
            stripos($p->content, $query) !== false
        );
    }
}

$blog = new BlogRepository();
$blog->create("Belajar PHP", "PHP adalah bahasa server-side yang populer...", "Budi");
$blog->create("OOP di PHP", "Object-Oriented Programming di PHP...", "Siti");
$blog->create("Keamanan Web", "XSS, CSRF, dan SQL Injection...", "Budi");

echo "=== All Posts ===<br>";
foreach ($blog->all() as $post) {
    echo "<b>{$post->title}</b> by {$post->author}<br>";
    echo $post->excerpt(50) . "<br><br>";
}

echo "=== Search: PHP ===<br>";
$results = $blog->search("PHP");
foreach ($results as $post) {
    echo "- {$post->title}<br>";
}
echo "<br>Found: " . count($results) . " posts<br>";
>
```

---

## Konsep Kunci

### Repository Pattern
Pemisahan data access (query DB) dan business logic (validasi, transformasi).

### CRUD Lengkap
Create: validasi input, insert. Read: fetch single/all. Update: find + modify. Delete: find + remove.

### Search
Filter posts berdasarkan title/content dengan `stripos` (case-insensitive).

### Architecture
Controller (handle request) → Service (business logic) → Repository (data access).

---

## Eksperimen

- Tambah method Update untuk BlogPost
- Implementasikan pagination untuk list posts
- Buat kategori dan tagging system
- Tambah comment system dengan relasi
- Buat API endpoint untuk blog posts

---

## Tantangan

Buat aplikasi blog lengkap: CRUD posts, kategori, komentar, search, pagination. Gunakan semua konsep yang dipelajari.

---

## Ringkasan

Minggu 12 dari 12: **Capstone: Aplikasi Blog** (Level: Menengah). Selesai! 🎉 Anda sudah menguasai PHP dari dasar hingga produksi.
