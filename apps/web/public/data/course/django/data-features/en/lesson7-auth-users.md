# Authentication: Login, Signup & Permissions

> Django | Data & Features | Lesson 7

## Learning Objectives

- Explain Django built-in auth: User, sessions, password hashing
- Build signup with UserCreationForm + auto login
- Protect views with @login_required
- Manage per-user data (OneToOne profiles)

---

## Program: Authentication: Login, Signup & Permissions

```python
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required, permission_required
from django.shortcuts import redirect, render

from .forms import DaftarForm
from .models import Profil


def daftar(request):
    """Signup: buat user + login langsung."""
    if request.method == 'POST':
        form = DaftarForm(request.POST)
        if form.is_valid():
            # create_user: password DI-HASH, bukan plain text
            user = form.save()
            login(request, user)  # sesi dimulai
            messages.success(request, f'Selamat datang, {user.username}!')
            return redirect('dashboard')
    else:
        form = DaftarForm()
    return render(request, 'katalog/daftar.html', {'form': form})


@login_required  # belum login -> dialihkan ke LOGIN_URL
def dashboard(request):
    return render(request, 'katalog/dashboard.html', {
        'user': request.user,
        'is_admin': request.user.is_staff,
    })


@login_required
def kota(request):
    if request.method == 'POST':
        kota_baru = request.POST.get('kota', '')
        # get_or_create: buat profil kalau belum ada
        profil, _ = Profil.objects.get_or_create(user=request.user)
        profil.kota = kota_baru
        profil.save()
        messages.success(request, 'Kota disimpan.')
        return redirect('dashboard')
    return redirect('dashboard')
```

---

## Explanation

## Built-in Auth: Do Not Build From Scratch
Django ships EVERYTHING auth needs: the User model (username, email, password, permissions), password hashing (PBKDF2/argon2), cookie sessions, login/logout/signup forms, decorators. What you must NEVER do: store plain-text passwords or write your own hashing. UserCreationForm creates users with password1/password2 (confirmation + strength validation).
## Sessions: State for "Statelessness"
HTTP is stateless, but Django provides sessions: a cookie holds the session id, the server stores session data. login(request, user) writes the session; request.user is available in views & templates (the auth context processor). Logout removes it. In multi-server production, sessions move to Redis (lesson 12) - but the API stays the same.
## @login_required: The View Gate
The decorator checks request.user.is_authenticated; unauthenticated → redirect to LOGIN_URL (with ?next= the original URL). Other decorators: @permission_required('katalog.tambah_produk') for model permissions. Security tiers: public pages vs login-only pages vs admin pages - every layer needs its own gate.
## Per-User Data
OneToOneField(User, related_name='profil') = one profile per user; user.profil.kota accesses it (get_or_create when missing). The same security rule as other tracks: always fetch data OWNED BY this user (filter(user=request.user)), never guess from the URL.

---

## Experiments

1. **Built-in Auth: Do Not Build From Scratch**
2. **Sessions: State for "Statelessness"**
3. **@login_required: The View Gate**
4. **Per-User Data**

---

## Challenge

Extend the user system: (1) add @permission_required to a staff-only view (create the permission via Meta permissions on a model), (2) add a password change page (django.contrib.auth.views.PasswordChangeView + template), (3) show a "last 5 minutes" message if the user just logged in, (4) build a user activity page (an Aksi model with FK user + time + description, logging every login via a signal).

---

## Summary

Built-in auth: User, hashing, sessions. UserCreationForm + auto login. @login_required = the gate. Per-user data via OneToOne. Next: class-based views.
