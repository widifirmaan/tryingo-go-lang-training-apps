# Models & Database

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 4:** Models & Database

## Learning Objectives

- CI4 Model: extends Model with $table, $primaryKey
- CRUD: findAll, find, insert, update, delete
- Allowed fields: $allowedFields for mass assignment
- Timestamps: automatic created_at and updated_at
- Query builder: where, orderBy, get

---

## Program: CRUD Model

```php
<?php
echo "=== CI4 Models ===<br><br>";

echo "=== Basic Model ===<br>";
echo "namespace App\Models;<br>";
echo "use CodeIgniter\Model;<br>";
echo "class UserModel extends Model {<br>";
echo "    protected $table = 'users';<br>";
echo "    protected $primaryKey = 'id';<br>";
echo "    protected $allowedFields = ['name', 'email'];<br>";
echo "    protected $useTimestamps = true;<br>";
echo "}<br><br>";

echo "=== CRUD Operations ===<br>";
$users = [
    ["id" => 1, "name" => "Budi", "email" => "budi@mail.com"],
    ["id" => 2, "name" => "Siti", "email" => "siti@mail.com"],
    ["id" => 3, "name" => "Andi", "email" => "andi@mail.com"],
];

echo "// Find All<br>";
foreach ($users as $u) {
    echo "  {$u['id']}: {$u['name']} ({$u['email']})<br>";
}

echo "<br>// Find by ID<br>";
echo "  Found: Budi (id: 1)<br>";

echo "<br>// Insert<br>";
$newId = 4;
echo "  Added: Dewi (id: $newId)<br>";

echo "<br>// Update<br>";
echo "  Updated: Budi → Budi Updated<br>";

echo "<br>// Delete<br>";
$remaining = 3;
echo "  Remaining: $remaining users<br><br>";

echo "=== Query Builder ===<br>";
echo "$builder = $this->db->table('users');<br>";
echo "$builder->where('active', 1)->orderBy('name', 'ASC')->get();<br><br>";

echo "=== Model Methods ===<br>";
echo "findAll()      // All records<br>";
echo "find($id)      // By primary key<br>";
echo "where($where)  // With condition<br>";
echo "first()        // First record<br>";
echo "insert($data)  // Insert<br>";
echo "update($id, $data) // Update<br>";
echo "delete($id)    // Delete<br><br>";

echo "=== Timestamps ===<br>";
echo "protected $useTimestamps = true;<br>";
echo "protected $createdField = 'created_at';<br>";
echo "protected $updatedField = 'updated_at';<br>";
>
```

---

## Key Concepts

### Model
`class UserModel extends Model`. Properties: `$table`, `$primaryKey`.

### CRUD
`findAll()`, `find($id)`, `insert()`, `update()`, `delete()`.

### Allowed Fields
`$allowedFields` — fields allowed for mass assignment.

### Timestamps
`$useTimestamps = true` auto-manages `created_at`/`updated_at`.

### Query Builder
`$builder->where()->orderBy()->get()`.

---

## Experiments

- Create model with migration and try CRUD
- Use where with multiple conditions
- Implement soft delete
- Create manual model relation
- Try paginate with model

---

## Challenge

Create Post model with migration. Implement full CRUD: create, read (all, by id), update, delete.

---

## Summary

Week 4 of 10: **Models & Database** (Level: Beginner). Data layer of CI4. Next week: **Migrations & Seeds**.
