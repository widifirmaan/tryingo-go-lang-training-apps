# Testing dengan pytest

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 9:** Testing dengan pytest

## Tujuan Pembelajaran

- TestCase: class untuk test
- setUp: setup data sebelum test
- Assertions: assertEqual, assertTrue
- Test runner: python manage.py test
- Code coverage: pytest --cov

---

## Program: Test Suite

```python
# tests.py
print("=== Django Testing ===")
print("from django.test import TestCase")
print("from .models import Product")
print("")
print("class ProductTestCase(TestCase):")
print("    def setUp(self):")
print("        Product.objects.create(name='Laptop', price=1000)")
print("")
print("    def test_product_creation(self):")
print("        product = Product.objects.get(name='Laptop')")
print("        self.assertEqual(product.price, 1000)")
print("")
print("    def test_product_str(self):")
print("        product = Product.objects.get(name='Laptop')")
print("        self.assertEqual(str(product), 'Laptop')")
print("")
print("=== Test Simulation ===")
tests = [("test_creation", "PASS"), ("test_str", "PASS"), ("test_price", "PASS")]
for name, result in tests:
    print(f"  {result}: {name}")
print("")
print("=== Test Runner ===")
print("python manage.py test")
print("pytest --cov")

```

---

## Konsep Kunci

### TestCase
Class untuk test. `setUp()` - setup data sebelum test.

### Assertions
`assertEqual(a, b)`, `assertTrue(x)`, `assertFalse(x)`.

### Test Runner
`python manage.py test` - jalankan semua test.

### Coverage
`pytest --cov` - lihat code coverage.

---

## Eksperimen

- Buat TestCase untuk Product
- Test CRUD operations
- Test views dengan Client
- Test API endpoints
- Coba Factory Boy

---

## Tantangan

Buat test suite untuk Product: test creation, retrieval, update, deletion.

---

## Ringkasan

Minggu 9 dari 12: **Testing** (Level: Lanjutan). Minggu depan: **Caching**.
