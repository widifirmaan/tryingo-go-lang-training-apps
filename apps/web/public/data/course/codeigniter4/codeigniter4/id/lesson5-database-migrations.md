# Database Setup & Migrations

> CodeIgniter 4 | Pelajaran 5

## Tujuan Pembelajaran

- Memahami migrasi database: version control untuk schema\n- Membuat migration dengan $this->forge->addField()\n- Menambahkan primary key, unique key, dan foreign key\n- Menggunakan SQLite3 untuk development (tanpa server database)

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePosts extends Migration
{
    public function up(): void
    {
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 5, 'unsigned' => true, 'auto_increment' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 255],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 255],
            'body' => ['type' => 'TEXT', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('posts');
    }

    public function down(): void
    {
        $this->forge->dropTable('posts');
    }
}

```

---

## Penjelasan

## Migration Workflow
php spark migrate — jalankan semua migration yang belum. php spark migrate rollback — batalkan migration terakhir. Setiap migration file memiliki method up() (buat) dan down() (hapus). Nama file dimulai dengan nomor urut (001_, 002_).
## Forge Methods
$this->forge->addField([]) — definisikan kolom. $this->forge->addKey('id', true) — primary key. $this->forge->addUniqueKey('slug') — unique constraint. $this->forge->createTable('posts') — buat tabel. $this->forge->addForeignKey() — foreign key constraint.
## SQLite3
DBDriver = 'SQLite3' — tanpa perlu install server database. Database disimpan di writable/db.sqlite. Cocok untuk development dan prototyping.

---

## Eksperimen

1. **## Migration Workflow
php spark migrate — jalankan semua migration yang belum. php spark migrate rollback — batalkan migration terakhir. Setiap migration file memiliki method up() (buat) dan down() (hapus). Nama file dimulai dengan nomor urut (001_, 002_).
## Forge Methods
$this->forge->addField([]) — definisikan kolom. $this->forge->addKey('id', true) — primary key. $this->forge->addUniqueKey('slug') — unique constraint. $this->forge->createTable('posts') — buat tabel. $this->forge->addForeignKey() — foreign key constraint.
## SQLite3
DBDriver = 'SQLite3' — tanpa perlu install server database. Database disimpan di writable/db.sqlite. Cocok untuk development dan prototyping.**

---

## Tantangan

Kembangkan migrasi: (1) buat migration ketiga untuk tabel categories dengan kolom name dan slug, (2) tambah foreign key posts.category_id -> categories.id, (3) jalankan php spark migrate dan verifikasi tabel created di SQLite, (4) coba php spark migrate rollback dan lihat tabel dihapus.

---

## Ringkasan

Migration = version control schema. up() = buat, down() = hapus. Forge = schema builder. SQLite3 = dev DB. Lanjut: models.
