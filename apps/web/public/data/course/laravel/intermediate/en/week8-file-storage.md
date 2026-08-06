# File Storage & Upload

> **Kategori:** Laravel | **Level:** undefined | **Minggu 8:** File Storage & Upload

## Learning Objectives

- Storage Facade: local, public, S3 disks
- File upload: store, storeAs, move
- File validation: image, mimes, max size
- Storage operations: exists, get, delete, url
- Symbolic link: php artisan storage:link

---

## Program: Upload System

```php
<?php
echo "=== Laravel File Storage ===<br><br>";

echo "=== Storage Facade ===<br>";
echo "Storage::disk('local')->put('file.txt', $contents);<br>";
echo "Storage::disk('public')->put('avatar.jpg', $file);<br>";
echo "Storage::disk('s3')->put('backup.zip', $contents);<br><br>";

echo "=== File Upload ===<br>";
echo "class PhotoController extends Controller {<br>";
echo "    public function store(Request $request) {<br>";
echo "        $path = $request->file('photo')->store('photos', 'public');<br>";
echo "        $url = asset('storage/' . $path);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== File Validation ===<br>";
echo "$request->validate([<br>";
echo "    'photo' => 'required|image|mimes:jpg,png|max:2048',<br>";
echo "]);<br><br>";

echo "=== Upload Simulation ===<br>";
$files = [
    ["name" => "avatar.jpg", "size" => 1024000, "type" => "image/jpeg", "valid" => true],
    ["name" => "document.pdf", "size" => 5120000, "type" => "application/pdf", "valid" => false],
    ["name" => "photo.png", "size" => 2048000, "type" => "image/png", "valid" => true],
];

foreach ($files as $file) {
    $status = $file['valid'] ? "OK" : "REJECTED";
    $sizeKB = round($file['size'] / 1024);
    echo "{$file['name']} ({$sizeKB}KB, {$file['type']}) — $status<br>";
}

echo "<br>=== Storage Operations ===<br>";
echo "Storage::exists('file.txt');     // Check file<br>";
echo "Storage::get('file.txt');        // Read file<br>";
echo "Storage::delete('file.txt');     // Delete file<br>";
echo "Storage::url('file.txt');        // Get URL<br>";
echo "Storage::size('file.txt');       // Get size<br>";
echo "Storage::lastModified('file.txt'); // Get date<br><br>";

echo "=== Symbolic Link ===<br>";
echo "php artisan storage:link<br>";
echo "public/storage → storage/app/public<br><br>";

echo "=== Disks Config ===<br>";
echo "// config/filesystems.php<br>";
echo "'disks' => [<br>";
echo "    'local' => ['driver' => 'local', 'root' => storage_path('app')],<br>";
echo "    'public' => ['driver' => 'local', 'root' => storage_path('app/public')],<br>";
echo "    's3' => ['driver' => 's3', ...],<br>";
echo "],<br>";
>
```

---

## Key Concepts

### Storage Facade
File system abstraction. Disks: `local`, `public`, `s3`.

### Upload
`$file->store('folder', 'disk')`. Auto-generates unique filename.

### Validation
`image`, `mimes:jpg,png`, `max:2048` (MB).

### Operations
`Storage::exists()`, `get()`, `delete()`, `url()`.

### Symbolic Link
`php artisan storage:link` links public to storage.

---

## Experiments

- Upload file and save to public disk
- Try multiple file upload
- Create custom disk for cloud storage
- Implement image resize before saving
- Try temporary URLs for private files

---

## Challenge

Build a profile photo upload system: validation (image, max 2MB), save to public disk, display preview, delete old photo on replace.

---

## Summary

Week 8 of 12: **File Storage & Upload** (Level: Intermediate). Intermediate phase complete! Next week: **Testing** (Advanced).
