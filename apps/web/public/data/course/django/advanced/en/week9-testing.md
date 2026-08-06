# Testing with pytest

> **Kategori:** Django | **Level:** Advanced | **Minggu 9:** Testing with pytest

## Learning Objectives

- TestCase: class for tests
- setUp: setup data before tests
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

## Key Concepts

### TestCase
Class for tests. `setUp()` - setup data before tests.

### Assertions
`assertEqual(a, b)`, `assertTrue(x)`, `assertFalse(x)`.

### Test Runner
`python manage.py test` - run all tests.

### Coverage
`pytest --cov` - view code coverage.

---

## Experiments

- Create TestCase for Product
- Test CRUD operations
- Test views with Client
- Test API endpoints
- Try Factory Boy

---

## Challenge

Create test suite for Product: test creation, retrieval, update, deletion.

---

## Summary

Week 9 of 12: **Testing** (Level: Advanced). Next week: **Caching**.
