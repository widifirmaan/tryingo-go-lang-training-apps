# Session Authentication

> Laravel | Auth & Middleware | Lesson 9

## Learning Objectives

- Build session-based registration & login with the Auth facade
- Protect passwords with Hash::make (bcrypt)
- Secure pages with the auth middleware and redirect()->intended()
- Understand session regeneration and safe logout

---

## Program: Session Authentication

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $kredensial = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($kredensial, $request->boolean('ingat'))) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

```

---

## Explanation

## The Auth Facade: Who Is In?
Auth::login($user) stores the user's identity in the session (the 'web' guard). Auth::attempt() checks credentials and creates the session in one call. auth()->user() returns the logged-in model - available in controllers, routes, and blade. $hidden = the password never leaks to JSON/serialization.
## Hash::make: Never Store Plain Passwords
Hash::make() uses bcrypt - one way. Login does not compare strings: Auth::attempt() runs Hash::check() behind the scenes. The min:8 rule comes from validation; never validate a password against a literal string.
## The auth Middleware: An Automatic Gate
->middleware('auth') on a route: guests are redirected to the login page (the named 'login' route), logged-in users pass through. redirect()->intended() takes users back to the page they originally wanted - the correct UX.
## Session Security
After login: $request->session()->regenerate() prevents session fixation (stealing an old session ID). After logout: invalidate() wipes all session data and regenerateToken() invalidates the old CSRF token.

---

## Experiments

1. **The Auth Facade: Who Is In?**
2. **Hash::make: Never Store Plain Passwords**
3. **The auth Middleware: An Automatic Gate**
4. **Session Security**

---

## Challenge

Harden the authentication: (1) add a profile page with a "Change Password" link (current password required + confirmation, verify with Hash::check), (2) show a "Last login" badge by storing a timestamp in the session on login, (3) add rate limiting on the login route: ->middleware('throttle:5,1') and watch error 429 after 5 failed attempts, (4) build an EnsureEmailVerified middleware that blocks the dashboard until the user "verifies" the email (simulate with an email_verified_at column).

---

## Summary

Auth facade + Hash = secure identity. auth middleware = the gate. Session regenerate = anti-fixation. Next: middleware & policies.
