# Deployment & Capstone

> Laravel | Testing & Production | Lesson 20

## Learning Objectives

- Assemble the capstone: auth + CRUD + validation + owner authorization
- Write a safe production deployment checklist
- Understand development vs production environment differences
- Judge project quality: what makes it production-ready

---

## Program: Deployment & Capstone

```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return view('posts.index', ['posts' => Post::with('penulis')->latest()->get()]);
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string'],
        ]);

        Post::create($data + ['penulis_id' => auth()->id()]);

        return redirect('/posts')->with('sukses', 'Postingan dibuat!');
    }

    public function show(Post $post)
    {
        return view('posts.show', compact('post'));
    }

    public function edit(Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        return view('posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        $data = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string'],
        ]);

        $post->update($data);

        return redirect('/posts/'.$post->id)->with('sukses', 'Postingan diperbarui!');
    }

    public function destroy(Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        $post->delete();

        return redirect('/posts')->with('sukses', 'Postingan dihapus.');
    }
}

```

---

## Explanation

## The Capstone: Every Concept in One App
20 lessons summarized here: session auth (Hash, regenerate), validation, route model binding, Eloquent relations, blade (auth/guest, forelse, session), and owner authorization. Production patterns used: redirect()->intended() (user experience), abort_unless 403 (security), delete buttons with confirmation (UI). Notice HOW MUCH work that used to be manual is now free.
## Owner Authorization: Two Layers
abort_unless($post->penulis_id === auth()->id(), 403) in the controller = real security. @if ($post->penulis_id === auth()->id()) in blade = UI convenience. Remember lesson 10: this is the inline version of a Policy. For larger scale, move it to a proper Policy.
## Deployment: Environment Differences
Production: APP_DEBUG=false (never leak stack traces!), a generated APP_KEY, cached config+route (speed), migrate --force, a running worker, HTTPS, backups. Development: everything is flexible. The CODE does not change between environments - the configuration does.
## When Is a Project Ready?
Not when the feature is done - but when: (1) tests cover the critical paths, (2) a stranger can follow the README, (3) deployment is repeatable (CI/CD), (4) failures are observable (logs, monitoring). One finished, deployed project is worth more than five half-finished ones.

---

## Experiments

1. **The Capstone: Every Concept in One App**
2. **Owner Authorization: Two Layers**
3. **Deployment: Environment Differences**
4. **When Is a Project Ready?**

---

## Challenge

Take the capstone further: (1) add a profile page showing all of a user's posts + a post count, (2) add comments: a Komentar model (post_id FK, isi, author name) + CRUD with the same authorization, (3) write 5 feature tests: guests are barred from creating posts (login redirect), non-owners get 403 on edit, owners update successfully, missing posts 404, judul validation is required, (4) deploy to a free platform (Fly.io/Render + MySQL/PostgreSQL + Redis) and share the URL in the README.

---

## Summary

The capstone ties it together: auth, CRUD, validation, authorization, deployment. Same code, different environments. You are Laravel-ready!
