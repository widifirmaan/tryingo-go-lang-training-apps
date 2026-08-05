# Form Handling & Validation

> CodeIgniter 4 | Lesson 7

## Learning Objectives

- Use $this->validate() with rule strings\n- Display validation errors in view with session("errors")\n- Use csrf_field() for CSRF protection\n- Use old() to repopulate form after validation failure

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

use App\Models\PostModel;

class Blog extends BaseController
{
    public function store(): string
    {
        $model = new PostModel();

        if (!$this->validate([
            'title' => 'required|min_length[3]|max_length[255]',
            'slug' => 'required|alpha_dash|is_unique[posts.slug]',
            'body' => 'required',
        ])) {
            return view('blog/create', [
                'validation' => $this->validator,
            ]);
        }

        $model->save([
            'title' => $this->request->getPost('title'),
            'slug' => $this->request->getPost('slug'),
            'body' => $this->request->getPost('body'),
        ]);

        return redirect()->to('/blog')->with('message', 'Post berhasil disimpan!');
    }
}

```

---

## Explanation

## Validation Rules
'required' — field must not be empty. 'min_length[X]' — minimum X characters. 'max_length[X]' — maximum X characters. 'alpha_dash' — letters, numbers, dash, underscore only. 'is_unique[posts.slug]' — slug must be unique in posts table.
## CSRF Protection
csrf_field() — adds hidden input with CSRF token. CI4 auto-validates POST token. Without csrf_field(), POST form is rejected with 403 error.
## Flash Data
redirect()->to('/blog')->with('message', 'Success!') — stores message in session flash. In view: session()->get('message') — retrieves and deletes flash data after reading.

---

## Experiments

1. **## Validation Rules
'required' — field must not be empty. 'min_length[X]' — minimum X characters. 'max_length[X]' — maximum X characters. 'alpha_dash' — letters, numbers, dash, underscore only. 'is_unique[posts.slug]' — slug must be unique in posts table.
## CSRF Protection
csrf_field() — adds hidden input with CSRF token. CI4 auto-validates POST token. Without csrf_field(), POST form is rejected with 403 error.
## Flash Data
redirect()->to('/blog')->with('message', 'Success!') — stores message in session flash. In view: session()->get('message') — retrieves and deletes flash data after reading.**

---

## Challenge

Level up form: (1) add validation for image upload (image|max_size[1024]|is_image]), (2) create custom validation rule for slug that checks duplicates via AJAX, (3) add form preview showing data before submit, (4) use form helper form_open() and form_input() as alternative form writing.

---

## Summary

validate() = rules. csrf_field() = CSRF protection. old() = repopulate form. Flash data = success message. Next: sessions.
