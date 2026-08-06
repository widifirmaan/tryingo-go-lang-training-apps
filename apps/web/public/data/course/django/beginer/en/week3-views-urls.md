# Views & URL Routing

> **Kategori:** Django | **Level:** Beginner | **Minggu 3:** Views & URL Routing

## Learning Objectives

- Function-Based Views
- HttpResponse and render
- URL routing: path() and urlpatterns
- URL parameters: <int:pk>
- name parameter for URL reversing

---

## Program: First View

```python
# Views
print("=== Django Views ===")
print("def home(request):")
print("    return HttpResponse('Hello, Django!')")
print("")
print("def product_list(request):")
print("    products = Product.objects.all()")
print("    return render(request, 'products/list.html', {'products': products})")
print("")
print("def product_detail(request, pk):")
print("    product = Product.objects.get(pk=pk)")
print("    return render(request, 'products/detail.html', {'product': product})")
print("")
print("=== URL Configuration ===")
print("urlpatterns = [")
print("    path('', views.home, name='home'),")
print("    path('products/', views.product_list, name='product_list'),")
print("    path('products/<int:pk>/', views.product_detail, name='product_detail'),")
print("]")

```

---

## Key Concepts

### Function-Based Views
def view(request): return HttpResponse('...'). `render()` for templates.

### URL Routing
`path('url/', view_function, name='name')`.

### URL Parameters
`<int:pk>` captures integer as `pk`.

### URL Reversing
`{% url 'name' %}` in templates.

---

## Experiments

- Create 3 views with different URLs
- Try URL parameters
- Use render with context
- Create view handling GET and POST
- Implement redirect

---

## Challenge

Create views for: home, product list, product detail. Define URLs.

---

## Summary

Week 3 of 12: **Views & URL Routing** (Level: Beginner). Next week: **Templates**.
