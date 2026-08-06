# Views & URL Routing

> **Kategori:** Django | **Level:** Pemula | **Minggu 3:** Views & URL Routing

## Tujuan Pembelajaran

- Function-Based Views
- HttpResponse dan render
- URL routing: path() dan urlpatterns
- URL parameters: <int:pk>
- name parameter untuk URL reversing

---

## Program: View Pertama

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

## Konsep Kunci

### Function-Based View
def view(request): return HttpResponse('...'). `render()` untuk template.

### URL Routing
`path('url/', view_function, name='name')`.

### URL Parameters
`<int:pk>` - capture integer sebagai `pk`.

### URL Reversing
`{% url 'name' %}` di template.

---

## Eksperimen

- Buat 3 views dengan URL berbeda
- Coba URL parameters
- Gunakan render dengan context
- Buat view handle GET dan POST
- Implementasikan redirect

---

## Tantangan

Buat views untuk: home, product list, product detail. Definisikan URLs.

---

## Ringkasan

Minggu 3 dari 12: **Views & URL Routing** (Level: Pemula). Minggu depan: **Templates**.
