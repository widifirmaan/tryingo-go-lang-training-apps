# Secure Forms: ModelForm, CSRF Protection & Django Authentication

> **Kategori:** Django Web Framework | **Level:** Beginner | **Minggu 4:** Secure Forms: ModelForm, CSRF Protection & Django Authentication

## Learning Objectives

- Understand `ModelForm` bridging HTML form elements directly to database models.
- Enforce Cross-Site Request Forgery (CSRF) defense using the `{% csrf_token %}` tag.
- Author custom form sanitization and validation using `clean_<field>()` methods.
- Shield private views using `@login_required` decorators and Django's built-in authentication system.

---

## Program: Course Review Form & Student Registration Flow with ModelForm

```python
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
# from .models import Course, Review

# 1. ModelForm Otomatis dengan Validasi Bawaan
class CourseReviewForm(forms.Form):
    rating = forms.ChoiceField(
        choices=[(1, "1 - Buruk"), (2, "2 - Cukup"), (3, "3 - Baik"), (4, "4 - Sangat Baik"), (5, "5 - Luar Biasa")],
        widget=forms.Select(attrs={"class": "form-select"})
    )
    comment = forms.CharField(
        widget=forms.Textarea(attrs={"class": "form-control", "rows": 4, "placeholder": "Tulis ulasan Anda..."}),
        min_length=10,
        max_length=1000
    )

    def clean_comment(self):
        comment = self.cleaned_data.get("comment", "")
        if "spam" in comment.lower():
            raise forms.ValidationError("Ulasan memuat kata yang dilarang (spam).")
        return comment

# 2. View dengan Proteksi Autentikasi @login_required
@login_required(login_url="/accounts/login/")
def submit_review_view(request, course_slug):
    # course = get_object_or_404(Course, slug=course_slug)

    if request.method == "POST":
        form = CourseReviewForm(request.POST)
        if form.is_valid():
            # Proses penyimpanan aman
            rating = form.cleaned_data["rating"]
            comment = form.cleaned_data["comment"]
            print(f"[NEW REVIEW] User: {request.user.username} | Rating: {rating} | Comment: {comment}")
            return redirect(f"/courses/{course_slug}/")
    else:
        form = CourseReviewForm()

    return render(request, "courses/submit_review.html", {"form": form, "course_slug": course_slug})

# Snippet Template dengan Token CSRF Wajib:
CSRF_FORM_TEMPLATE = """
<form method="POST" action="">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit" class="btn btn-primary">Kirim Ulasan</button>
</form>
"""

print("=== MODELFORM & SISTEM AUTENTIKASI DJANGO TERKONFIGURASI ===")
```

---

## Key Concepts

Manually handling browser form submissions invites security oversights. Django Forms abstracts HTML rendering, data validation, payload sanitization, and security defenses into a cohesive architecture.

### Mandatory CSRF Tokens ({% csrf_token %})
A **CSRF (Cross-Site Request Forgery)** exploit occurs when malicious sites trick an authenticated user's browser into transmitting unauthorized mutations. Django enforces `{% csrf_token %}` within every POST form. This cryptographic token is validated by middleware; mismatched tokens fail immediately with HTTP 403 Forbidden.

### Custom Sanitization via clean_<field>()
Invoking `form.is_valid()` triggers systematic validation pipelines. Defining `clean_comment()` allows engineers to enforce domain constraints (like spam keyword filtering). Validated attributes populate the type-safe `form.cleaned_data` dictionary.

### Built-in Authentication (django.contrib.auth)
Django ships with production-grade `User` models, cryptographic password hashing (PBKDF2 with SHA-256), session management, and permission matrices. The `@login_required` decorator restricts private views to authenticated users.


---

---

## Beginner Friendly Explanation

Think of a bank transfer slip. You must affix an official anti-counterfeiting holographic seal (`{% csrf_token %}`). The bank clerk (`clean_comment`) inspects the slip for missing signatures or illegible entries. If you have not presented your verified photo ID (`@login_required`), you are directed to the authentication counter first.

## Experiments

- Omit the `{% csrf_token %}` tag and observe the HTTP 403 CSRF Verification Failed rejection.
- Submit a review containing the keyword "spam" and observe the inline validation error message.
- Deploy `django.contrib.auth.views.LoginView` to provision a complete login flow in five lines of code.

---

## Challenge

Build a new student registration form `StudentSignUpForm` extending `UserCreationForm`, adding mandatory `full_name` and `phone_number` fields.

---

## Summary

You have mastered ModelForm, data validation, CSRF defense, and Authentication. Level 1 complete! Level 2 covers Django REST Framework and ORM optimization.
