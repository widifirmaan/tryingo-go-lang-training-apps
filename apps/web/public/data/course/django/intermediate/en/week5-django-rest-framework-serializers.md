# Django REST Framework: Serializers, ModelViewSet & RESTful API

> **Kategori:** Django Web Framework | **Level:** Intermediate | **Minggu 5:** Django REST Framework: Serializers, ModelViewSet & RESTful API

## Learning Objectives

- Understand Django REST Framework (DRF) decoupling backend services from frontend clients.
- Deploy `ModelSerializer` serializing models into JSON and deserializing inputs.
- Leverage `ModelViewSet` to provision standard CRUD RESTful routes with zero boilerplate.
- Inject custom route actions using the `@action(detail=True)` decorator.

---

## Program: Course & Lesson RESTful API with ModelSerializer & ViewSets

```python
# Demonstrasi Django REST Framework (DRF)
# pip install djangorestframework

from rest_framework import serializers, viewsets, routers
from rest_framework.response import Response
from rest_framework.decorators import action
# from .models import Course, Lesson

# 1. Nested Serializer untuk Data Relasional Pelajaran
class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Lesson
        fields = ["id", "order", "title", "video_url"]

# 2. ModelSerializer Kursus dengan Nested Lessons & Computed Fields
class CourseDetailSerializer(serializers.ModelSerializer):
    # Menyertakan array pelajaran di dalam respons kursus (Nested Relationship)
    lessons = LessonSerializer(many=True, read_only=True)
    level_label = serializers.CharField(source="get_level_display", read_only=True)
    is_free = serializers.SerializerMethodField()

    class Meta:
        # model = Course
        fields = ["id", "title", "slug", "description", "price", "level", "level_label", "is_free", "lessons"]

    def get_is_free(self, obj) -> bool:
        return obj.price == 0

# 3. ModelViewSet: Menyediakan CRUD Lengkap Otomatis (GET, POST, PUT, DELETE)
class CourseViewSet(viewsets.ModelViewSet):
    # queryset = Course.objects.filter(is_published=True).prefetch_related("lessons")
    serializer_class = CourseDetailSerializer
    lookup_field = "slug"

    # Custom Action Endpoint: GET /api/v1/courses/{slug}/stats/
    @action(detail=True, methods=["get"])
    def stats(self, request, slug=None):
        return Response({
            "status": "success",
            "enrolled_students": 420,
            "completion_rate": "87.5%"
        })

# 4. Registrasi Router Otomatis
router = routers.DefaultRouter()
# router.register(r'courses', CourseViewSet, basename='course')

print("=== DJANGO REST FRAMEWORK MODELVIEWSET & SERIALIZERS TERKONFIGURASI ===")
```

---

## Key Concepts

When your LMS expands to support mobile iOS/Android applications or React/Next.js frontends, standard RESTful APIs become mandatory. **Django REST Framework (DRF)** provides the gold standard API toolkit for Python.

### The Role of DRF Serializers
Serializers function as bidirectional data converters:
1. **Serialization**: Translates complex Django model instances and QuerySets into standard Python dictionaries serializable to JSON.
2. **Deserialization & Validation**: Inspects incoming JSON payloads on POST/PUT calls, enforcing schema validation rules prior to persisting to databases.

### ModelViewSet & DefaultRouter
Rather than authoring five distinct controller views for list, create, retrieve, update, and delete actions, `ModelViewSet` provisions full CRUD mechanics automatically. Paired with `DefaultRouter()`, DRF synthesizes canonical RESTful URLs (`/api/v1/courses/`) alongside an interactive Browsable API testing GUI.


---

---

## Beginner Friendly Explanation

Imagine a dine-in restaurant expanding into delivery apps (Mobile Apps). Django Templates represent patrons dining in the dining hall. A DRF Serializer acts as the packing station boxing orders into standardized labeled containers (JSON) ready for dispatch couriers.

## Experiments

- Navigate to `/api/v1/courses/` in your browser and inspect DRF's interactive Browsable API interface.
- Send a GET request with `Accept: application/json` via cURL and inspect the raw JSON payload.
- Deploy `SerializerMethodField` computing total aggregated lesson durations in minutes dynamically.

---

## Challenge

Author a nested writable serializer empowering instructors to create a new Course alongside three initial Lesson entities within a single POST transaction.

---

## Summary

You have mastered DRF Serializers, ModelViewSet, and DefaultRouter. Next week we cover API Authentication with SimpleJWT and Custom Permissions.
