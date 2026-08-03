# Testing: TestCase, Client & APITestCase

> Django | Testing & Security | Lesson 12

## Learning Objectives

- Write TestCases for models (unit tests)
- Use the Django test client for views
- Write APITestCases for DRF endpoints
- Run the test suite and read the results

---

## Program: Testing: TestCase, Client & APITestCase

```python
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Kategori, Produk


class ModelTestCase(TestCase):
    """Test model: fast, tanpa HTTP."""

    def setUp(self):
        # setUp dijalankan SEBELUM tiap test - database test bersih
        self.kategori = Kategori.objects.create(nama='Minuman')
        self.produk = Produk.objects.create(
            nama='Kopi', harga=45000, stok=10, kategori=self.kategori,
        )

    def test_string_representation(self):
        self.assertEqual(str(self.produk), 'Kopi')

    def test_relasi(self):
        # related_name='produk' bekerja di arah sebaliknya
        self.assertEqual(self.kategori.produk.count(), 1)


class ApiTestCase(APITestCase):
    """Test API: HTTP sungguhan terhadap test database."""

    def setUp(self):
        self.kategori = Kategori.objects.create(nama='Minuman')
        self.admin = User.objects.create_superuser(
            username='admin', password='rahasia123', email='a@a.co',
        )

    def test_list_produk_kosong(self):
        response = self.client.get('/api/produk/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 0)  # pagination

    def test_buat_produk_valid(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post('/api/produk/', {
            'nama': 'Teh', 'harga': '25000', 'stok': 5, 'kategori': self.kategori.id,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Produk.objects.count(), 1)

    def test_buat_produk_harga_negatif_ditolak(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post('/api/produk/', {
            'nama': 'Teh', 'harga': '-5', 'stok': 5, 'kategori': self.kategori.id,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
```

---

## Explanation

## The Django Test Runner: Built-in, Free, Fast
python manage.py test discovers tests.py, creates a SEPARATE test database (never touching real data!), runs each test, then deletes it. setUp() prepares data before each test - every test starts clean, never depending on order. This is why starting a Django test suite is so easy: no extra framework needed.
## TestCase: Units for Models & Logic
ModelTestCase tests models: __str__, relations, validation, methods. Model tests are the fastest and most numerous (the test pyramid). Rule: any logic that can break (negative prices, relations, business methods) deserves a test - never let model bugs surface in production.
## APITestCase: Real HTTP
self.client.get/post/put/delete() runs real HTTP against an in-memory test server. force_authenticate(user) simulates login for protected endpoints. Assertions: status_code (200/201/400), response.data (the JSON body), database state. API tests = the contract the FRONTEND sees - the highest quality for your money.
## Red-Green-Refactor in Practice
The bootcamp pattern: write the test FIRST (red), build the feature (green), tidy up (refactor). Tests force you to think "how is this used?" before writing the implementation. In CI (lesson 17), failing tests stop the deployment - broken code never reaches production.

---

## Experiments

1. **The Django Test Runner: Built-in, Free, Fast**
2. **TestCase: Units for Models & Logic**
3. **APITestCase: Real HTTP**
4. **Red-Green-Refactor in Practice**

---

## Challenge

Strengthen the suite: (1) write tests for PUT /api/produk/<id>/ (update) and DELETE (delete + 204), (2) write validation tests: empty name, negative stock, missing category (FK validation) - all must be 400, (3) write a test for the terlaris custom @action from lesson 10 (create 3 products, check the order), (4) add a simple factory: a buat_produk(nama, harga) helper in setUp to reduce duplication.

---

## Summary

Built-in runner + isolated test DB. TestCase = models, APITestCase = HTTP. setUp = clean per test. Red-green-refactor. Next: security.
