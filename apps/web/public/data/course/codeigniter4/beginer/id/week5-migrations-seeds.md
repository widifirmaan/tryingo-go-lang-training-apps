# Migrations & Seeds

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 5:** Migrations & Seeds

## Tujuan Pembelajaran

- Migration: up() untuk create/modify, down() untuk rollback
- Field types: INT, VARCHAR, TEXT, DATETIME, DATE
- Forge: addField, addKey, createTable, dropTable
- Seeds: populate database dengan data awal
- Foreign keys: addForeignKey dengan cascade

---

## Program: Database Schema

```php
<?php
echo "=== CI4 Migrations ===<br><br>";

echo "=== Create Migration ===<br>";
echo "php spark make:migration CreateUsersTable<br>";
echo "php spark migrate<br>";
echo "php spark migrate:rollback<br>";
echo "php spark migrate:status<br><br>";

echo "=== Migration Class ===<br>";
echo "class Migration_CreateUsersTable extends Migration {<br>";
echo "    public function up() {<br>";
echo "        $this->forge->addField([<br>";
echo "            'id' => ['type' => 'INT', 'constraint' => 11, 'auto_increment' => true],<br>";
echo "            'name' => ['type' => 'VARCHAR', 'constraint' => 255],<br>";
echo "            'email' => ['type' => 'VARCHAR', 'constraint' => 255, 'unique' => true],<br>";
echo "            'created_at' => ['type' => 'DATETIME', 'null' => true],<br>";
echo "        ]);<br>";
echo "        $this->forge->addKey('id', true);<br>";
echo "        $this->forge->createTable('users');<br>";
echo "    }<br>";
echo "    public function down() {<br>";
echo "        $this->forge->dropTable('users');<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Field Types ===<br>";
echo "INT, VARCHAR, TEXT, DATETIME, DATE, FLOAT, BOOLEAN<br>";
echo "Options: constraint, unsigned, null, default, unique, auto_increment<br><br>";

echo "=== Seeds ===<br>";
echo "php spark make:seed UserSeeder<br>";
echo "class UserSeeder extends Seeder {<br>";
echo "    public function run() {<br>";
echo "        $data = [<br>";
echo "            ['name' => 'Budi', 'email' => 'budi@mail.com'],<br>";
echo "            ['name' => 'Siti', 'email' => 'siti@mail.com'],<br>";
echo "        ];<br>";
echo "        $this->db->table('users')->insertBatch($data);<br>";
echo "    }<br>";
echo "}<br>";
echo "php spark db:seed UserSeeder<br><br>";

echo "=== Foreign Keys ===<br>";
echo "$this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');<br>";
>
```

---

## Konsep Kunci

### Migration
Version control untuk database. `up()` apply changes, `down()` rollback.

### Field
`addField(['id' => ['type' => 'INT', 'auto_increment' => true]])`. Options: constraint, null, default.

### Seeds
Populate data awal. `insertBatch()` untuk multiple rows.

### Foreign Key
`addForeignKey('col', 'ref_table', 'ref_col', 'on_delete', 'on_update')`.

### Commands
`migrate`, `migrate:rollback`, `migrate:status`, `db:seed`.

---

## Eksperimen

- Buat migration untuk posts table
- Tambah dan hapus column dengan migration
- Buat seeder dengan 10 data
- Implementasikan foreign key constraint
- Coba rollback migration

---

## Tantangan

Buat migration lengkap: users, posts, comments table dengan foreign keys. Buat seeder untuk populasi data dummy.

---

## Ringkasan

Minggu 5 dari 10: **Migrations & Seeds** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Validation** (Intermediate).
