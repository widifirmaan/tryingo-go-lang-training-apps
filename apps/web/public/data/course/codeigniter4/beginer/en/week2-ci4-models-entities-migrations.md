# Data Persistence: CI4 Models, Model Entities & Database Forge

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 2:** Data Persistence: CI4 Models, Model Entities & Database Forge

## Learning Objectives

- Differentiate CI4 Models (table persistence) from Entities (object-oriented row representation).
- Deploy `$returnType = StudentEntity::class` for automatic object hydration.
- Enforce centralized validation rules via `$validationRules` directly on models.
- Govern schema lifecycle programmatically using Database Migrations (`php spark migrate`).

---

## Program: Student Entity & Academic Score Model with Casting & Centralized Validation

```php
<?php
// app/Entities/StudentEntity.php
namespace App\Entities;

use CodeIgniter\Entity\Entity;

// Model Entity: Mewakili satu baris data siswa dengan business methods
class StudentEntity extends Entity {
    protected $dates = ['created_at', 'updated_at', 'birth_date'];

    protected $casts = [
        'id'        => 'integer',
        'nisn'      => 'string',
        'gpa'       => 'float',
        'is_active' => 'boolean',
    ];

    // Computed Attribute: Predikat Kelulusan Otomatis
    public function getGraduationHonors(): string {
        $gpa = (float) ($this->attributes['gpa'] ?? 0.0);
        return match (true) {
            $gpa >= 3.90 => 'Summa Cum Laude',
            $gpa >= 3.75 => 'Magna Cum Laude',
            $gpa >= 3.50 => 'Cum Laude',
            default      => 'Lulus Memuaskan',
        };
    }
}

// app/Models/StudentModel.php
namespace App\Models;

use CodeIgniter\Model;
use App\Entities\StudentEntity;

class StudentModel extends Model {
    protected $table            = 'students';
    protected $primaryKey       = 'id';
    protected $returnType       = StudentEntity::class; // Otomatis return objek Entity!
    protected $useTimestamps    = true;
    protected $allowedFields    = ['nisn', 'full_name', 'grade_class', 'gpa', 'is_active', 'birth_date'];

    // Aturan Validasi Terpusat di Tingkat Model
    protected $validationRules = [
        'nisn'        => 'required|alpha_numeric|min_length[7]|max_length[10]|is_unique[students.nisn,id,{id}]',
        'full_name'   => 'required|min_length[3]|max_length[120]',
        'grade_class' => 'required|max_length[20]',
        'gpa'         => 'required|decimal|greater_than_equal_to[0.0]|less_than_equal_to[4.0]',
    ];

    protected $validationMessages = [
        'nisn' => [
            'is_unique' => 'NISN ini sudah terdaftar di sistem buku induk!',
        ],
    ];
}

echo "=== CODEIGNITER 4 MODEL & ENTITY DENGAN VALIDASI ATRIBUT TERKONFIGURASI ===\n";
```

---

## Key Concepts

A major architectural leap in CodeIgniter 4 is the introduction of **Model Entities**. In legacy CI3, models returned raw associative arrays devoid of domain encapsulation.

### The Power of CI4 Model Entities
An Entity (`CodeIgniter\Entity\Entity`) represents an intelligent object-oriented data carrier:
- Hydrates and casts database attributes dynamically via `$casts = ['gpa' => 'float']`.
- Encapsulates domain logic methods directly, such as `getGraduationHonors()`.
- Tracks dirty state: calling `$model->save($entity)` persists only modified attributes, optimizing SQL bandwidth.

### Centralized Model-Level Validation
Rather than scattering validation assertions across multiple controllers, CI4 embeds `$validationRules` inside the Model class. Calling `$studentModel->save($data)` invokes automated validation; if assertions fail, `$studentModel->errors()` exposes localized failure messages.


---

---

## Beginner Friendly Explanation

Think of a student report card. In legacy CI3, it behaved like a static photocopy sheet. In CI4 with Entities, the report card acts as an intelligent digital pad: entering student scores causes the sheet to automatically calculate honors standings without teachers manually punching numbers into desk calculators.

## Experiments

- Execute `php spark make:migration CreateStudentsTable` and declare table schemas with `$this->forge`.
- Attempt persisting a student with GPA 4.5 and verify `less_than_equal_to[4.0]` rejects the record.
- Deploy `$studentModel->paginate(10)` to render automated pagination slices.

---

## Challenge

Add a `setPassword(string $pass)` mutator on the Entity hashing incoming strings via `password_hash($pass, PASSWORD_ARGON2ID)` prior to persistence.

---

## Summary

You have mastered CI4 Models, Model Entities, and Database Migrations. Next week we explore View Layouts and View Cells.
