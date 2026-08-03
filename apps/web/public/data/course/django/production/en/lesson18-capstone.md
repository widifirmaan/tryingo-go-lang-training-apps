# Capstone: Blog API + Admin

> Django | Production & Capstone | Lesson 18

## Learning Objectives

- Combine ALL track concepts in one project
- Build an API with JWT + ownership permissions
- Enforce per-user data via perform_create & get_queryset
- Close the project: tests, README, deployment

---

## Program: Capstone: Blog API + Admin

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ..models import Artikel
from ..permissions import IsOwnerOrReadOnly
from ..serializers import ArtikelSerializer


class ArtikelViewSet(viewsets.ModelViewSet):
    queryset = Artikel.objects.select_related('pemilik').all()
    serializer_class = ArtikelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filterset_fields = ['status', 'pemilik']
    search_fields = ['judul', 'isi']
    ordering_fields = ['dibuat', 'diupdate', 'judul']

    def perform_create(self, serializer):
        # pemilik di-set dari request.user - TIDAK bisa dipalsukan client
        serializer.save(pemilik=self.request.user)

    def get_queryset(self):
        # Filter default: hanya terbit untuk pengunjung
        qs = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            qs = qs.filter(status='terbit')
        return qs
```

---

## Explanation

## The Capstone: All Lessons Become One Project
This Blog API sums up: models & migrations (Artikel + FK User) → admin (fast management) → DRF serializers (two-way JSON) → viewsets & routers (CRUD + automatic URLs) → JWT (login/refresh) → permissions (ownership) → filtering/search/pagination → testing (APITestCase) → production-ready (settings + Docker from lessons 15-17). If you can explain every file without notes, you own the track.
## Ownership: Security in Three Layers
1) perform_create: the owner is TAKEN from request.user - clients cannot forge it. 2) get_queryset: visitors only see status='terbit'. 3) IsOwnerOrReadOnly (has_object_permission): only owners modify/delete their objects. Three independent layers - if one fails, the other two still protect. The same pattern across all tracks: rules in the backend, not the UI.
## IsAuthenticatedOrReadOnly: A Public API That Is Safe
Reads (GET) work without login - for visitors/public blogs. Writes need a token. Combined with IsOwnerOrReadOnly = the standard REST blog API pattern. JWT provides identity (request.user from the token), permissions provide authority - stacked, evaluated in order.
## Closing the Project Like a Professional
What separates bootcamp graduates: (1) tests covering critical flows (401 without token, automatic ownership, 403 for non-owners), (2) a README: how to run, env, endpoints, curl examples, (3) deployment (Render/Railway/Fly + PostgreSQL + Redis), (4) a CI pipeline. One finished, deployed project > five half-finished ones.

---

## Experiments

1. **The Capstone: All Lessons Become One Project**
2. **Ownership: Security in Three Layers**
3. **IsAuthenticatedOrReadOnly: A Public API That Is Safe**
4. **Closing the Project Like a Professional**

---

## Challenge

Take the capstone to production level: (1) add a /api/artikel/statistik custom action with per-status counts, (2) add comments: a Komentar model (artikel FK, isi, penulis, dibuat) + serializer + CRUD endpoints with the same permissions, (3) write 5 more tests: non-owner comments rejected, status filter, title search, pagination, refresh token success, (4) deploy to a free platform (Render/Railway + PostgreSQL + Redis) and share the URL.

---

## Summary

The capstone ties it together: models → admin → DRF → JWT → permissions → tests. Three-layer ownership. A safe public API. You are Django-ready!
