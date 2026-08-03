# File Storage & Uploads

> Laravel | Auth & Middleware | Lesson 12

## Learning Objectives

- Upload files from a form (enctype multipart, file input)
- Store files with $request->file()->store() on the public disk
- Validate uploads (image, mimes, max size)
- Serve files with Storage::url() and understand storage:link

---

## Program: File Storage & Uploads

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    public function edit()
    {
        $user = auth()->user();

        return view('profil.edit', [
            'user' => $user,
            'avatarUrl' => $user->avatar ? Storage::disk('public')->url($user->avatar) : null,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('avatar', 'public');
        }

        $user->update($data);

        return back()->with('sukses', 'Profil berhasil diperbarui.');
    }
}

```

---

## Explanation

## The Form: Three Upload Requirements
enctype="multipart/form-data" (form), input type="file" (element), method POST/PUT. Without enctype the browser sends only the file NAME, not its contents. The 'image' rule checks the real MIME (not the extension), 'max:2048' means kilobytes, 'mimes' is an extension whitelist.
## store(): One Line to Save
$request->file('avatar')->store('avatar', 'public') = upload, assign a unique name, save under storage/app/public/avatar/. Two arguments: target folder + disk. hasFile() checks a file was actually sent (not for validation!).
## Disks & Public
The 'public' disk (storage/app/public) is publicly accessible. storage:link creates the symlink public/storage -> storage/app/public. File URL: Storage::disk('public')->url($path) = /storage/avatar/abc.jpg. Symlinks may not work in webcontainers - just understand the flow for real deployments.
## Production Strategy
Local: the public disk. Production: S3/Cloudflare R2 with the s3 driver - the SAME code, just change FILESYSTEM_DISK in .env. This is the power of abstraction: the app never knows where files live.

---

## Experiments

1. **The Form: Three Upload Requirements**
2. **store(): One Line to Save**
3. **Disks & Public**
4. **Production Strategy**

---

## Challenge

Build a photo gallery: (1) create a Foto model + migration (judul, path, user_id FK) and a /galeri page showing all photos, (2) a gallery upload form: the validator must accept up to 5 files at once (name="fotos[]", validate as 'array' with each item image), (3) add a per-photo delete button that removes the file from disk AND the row from the database (Storage::delete), (4) add a dimensions rule (dimensions:min_width=200) to reject tiny images.

---

## Summary

Uploads = multipart + validation + store(). Public disk = published files. S3 = the same disk. Next: Sanctum API tokens.
