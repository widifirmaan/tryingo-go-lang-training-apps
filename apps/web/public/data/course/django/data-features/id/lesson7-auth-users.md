# Authentication: Login, Signup & Permissions

> Django | Data & Fitur | Pelajaran 7

## Tujuan Pembelajaran

- Menjelaskan auth bawaan Django: User, sesi, password hash
- Membuat signup dengan UserCreationForm + login otomatis
- Melindungi view dengan @login_required
- Mengelola data per-user (OneToOne profil)

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

## Penjelasan

## Auth Bawaan: Jangan Bangun dari Nol
Django mengirim SEMUA yang dibutuhkan auth: model User (username, email, password, permissions), hashing password (PBKDF2/argon2), sesi via cookie, form login/logout/signup, decorators. Yang TIDAK boleh Anda lakukan: menyimpan password plain text atau menulis hashing sendiri. UserCreationForm membuat user dengan password1/password2 (konfirmasi + strength validation).
## Sesi: State untuk "Tanpa State"
HTTP stateless, tapi Django memberi sesi: cookie berisi session id, server menyimpan data sesi. login(request, user) menulis sesi; request.user tersedia di view & template (context processor auth). Logout menghapusnya. Di produksi multi-server, sesi dipindah ke Redis (pelajaran 12) - tapi API-nya sama.
## @login_required: Gerbang View
Decorator memeriksa request.user.is_authenticated; belum login → redirect ke LOGIN_URL (dengan ?next= URL asal). Dekorator lain: @permission_required('katalog.tambah_produk') untuk izin model. Tingkat keamanan: halaman publik vs halaman login-only vs halaman admin - setiap lapisan butuh gerbangnya sendiri.
## Data Per-User
OneToOneField(User, related_name='profil') = satu profil per user; user.profil.kota mengaksesnya (get_or_create saat belum ada). Aturan keamanan yang sama seperti track lain: selalu ambil data MILIK user ini (filter(user=request.user)), jangan menebak dari URL.

---

## Eksperimen

1. **Auth Bawaan: Jangan Bangun dari Nol**
2. **Sesi: State untuk "Tanpa State"**
3. **@login_required: Gerbang View**
4. **Data Per-User**

---

## Tantangan

Perluas sistem user: (1) tambah @permission_required di view yang hanya boleh diakses staff (buat permission via Meta permissions di model), (2) tambah halaman ganti password (django.contrib.auth.views.PasswordChangeView + template), (3) tampilkan pesan "5 menit terakhir" jika user baru login, (4) buat UserProfilePage yang menampilkan daftar aksi user (buat model Aksi dengan FK user + waktu + deskripsi, catat setiap login via signal).

---

## Ringkasan

Auth bawaan: User, hash, sesi. UserCreationForm + login otomatis. @login_required = gerbang. Data per-user via OneToOne. Lanjut: class-based views.
