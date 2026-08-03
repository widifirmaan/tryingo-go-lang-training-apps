# Testing: TestCase, Client & APITestCase

> Django | Testing & Keamanan | Pelajaran 12

## Tujuan Pembelajaran

- Menulis TestCase untuk model (unit test)
- Memakai Django test client untuk view
- Menulis APITestCase untuk endpoint DRF
- Menjalankan test suite dan membaca hasilnya

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

## Penjelasan

## Django Test Runner: Bawaan, Gratis, Cepat
python manage.py test menemukan tests.py, membuat DATABASE TEST terpisah (tidak menyentuh data asli!), menjalankan tiap test, lalu menghapusnya. setUp() menyiapkan data sebelum tiap test - setiap test dimulai dari keadaan bersih, tidak bergantung urutan. Ini yang membuat suite test Django sangat mudah dimulai: tidak butuh framework tambahan.
## TestCase: Unit untuk Model & Logika
ModelTestCase menguji model: __str__, relasi, validasi, method. Test model = test tercepat dan paling banyak jumlahnya (piramida test). Aturan: setiap logika yang bisa salah (harga negatif, relasi, method bisnis) layak diuji - jangan sampai bug model baru ketahuan di produksi.
## APITestCase: HTTP Sungguhan
self.client.get/post/put/delete() menjalankan HTTP melawan test server in-memory. force_authenticate(user) meniru login untuk endpoint terproteksi. Assertion: status_code (200/201/400), response.data (body JSON), database state. Test API = kontrak yang DILIHAT frontend - kualitas tertinggi untuk uang Anda.
## Red-Green-Refactor di Praktik
Pola bootcamp: tulis test DULU (merah), buat fitur (hijau), rapikan (refactor). Test memaksa Anda berpikir "bagaimana ini dipakai?" sebelum menulis implementasi. Di CI (pelajaran 17), test yang gagal menghentikan deploy - kode rusak tidak pernah sampai produksi.

---

## Eksperimen

1. **Django Test Runner: Bawaan, Gratis, Cepat**
2. **TestCase: Unit untuk Model & Logika**
3. **APITestCase: HTTP Sungguhan**
4. **Red-Green-Refactor di Praktik**

---

## Tantangan

Perkuat suite: (1) tulis test untuk PUT /api/produk/<id>/ (update) dan DELETE (hapus + 204), (2) tulis test validasi: judul kosong, stok negatif, kategori tidak ada (FK validasi) - semua harus 400, (3) tulis test untuk custom @action terlaris dari pelajaran 10 (buat 3 produk, cek urutan), (4) tambahkan factory sederhana: method bantu buat_produk(nama, harga) di setUp untuk mengurangi duplikasi.

---

## Ringkasan

Test runner bawaan + test DB terpisah. TestCase = model, APITestCase = HTTP. setUp = bersih tiap test. Merah-hijau-refactor. Lanjut: security.
