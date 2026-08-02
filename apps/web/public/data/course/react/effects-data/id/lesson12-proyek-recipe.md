# Proyek: Recipe App

> React | Efek & Data | Pelajaran 12

## Tujuan Pembelajaran

- Menggabungkan fetching + controlled input
- Memicu fetch ulang saat query berubah
- Menampilkan grid hasil dengan request states
- Menangani data dari API eksternal (CORS)

---

## Program: Proyek: Recipe App

```jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('chicken');
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!query.trim()) return;
    let cancelled = false;
    setStatus('loading');
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) { setRecipes(data.meals || []); setStatus('ready'); }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div>
      <h1>Recipe Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipe (e.g. chicken, rice)..."
        style={{ width: '100%', boxSizing: 'border-box' }}
      />

      {status === 'loading' && <p style={{ color: '#666' }}>Searching recipes...</p>}
      {status === 'error' && <p style={{ color: '#b00020' }}>Failed to fetch recipes.</p>}

      {status === 'ready' && recipes.length === 0 && <p>No recipes found for "{query}".</p>}

      {status === 'ready' && recipes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem', marginTop: '1rem' }}>
          {recipes.map((r) => (
            <div key={r.idMeal} style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem' }}>
              <img src={r.strMealThumb} alt={r.strMeal} style={{ width: '100%', borderRadius: 8 }} />
              <h3 style={{ margin: '0.5rem 0 0.2rem' }}>{r.strMeal}</h3>
              <p style={{ margin: 0, color: '#666' }}>{r.strCategory} · {r.strArea}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

```

---

## Penjelasan

## Search on Type
State query menjadi dependency effect: setiap ketikan mengubah state -> effect jalan ulang -> fetch dengan query baru. Ini pola "debounce-free" yang sederhana dan cukup untuk pembelajaran.

## Request States Lengkap
Proyek ini memakai keempat kondisi: loading (spinner/teks), error (pesan), empty ("no recipes"), dan success (grid). Sumber riset (GreatFrontend) menyebut ini proyek inti untuk job-readiness.

## API & CORS
API eksternal (themealdb) mengizinkan CORS sehingga bisa dipanggil dari browser. Di produksi, fetch biasanya lewat backend/server proxy untuk menyembunyikan key dan menghindari rate limit.

## Cleanup di Setiap Effect
Perhatikan `cancelled` flag — saat query cepat berubah, response lama dibuang sehingga tidak menimpa hasil baru (race condition).

---

## Eksperimen

1. **Search on Type**
2. **Request States Lengkap**
3. **API & CORS**
4. **Cleanup di Setiap Effect**

---

## Tantangan

Tambah halaman detail: klik resep membuka kartu berisi ingredients (loop strIngredient1..20 yang tidak kosong) dan petunjuk (strInstructions). Tambahkan tombol "Clear" untuk mengosongkan query.

---

## Ringkasan

Recipe App = milestone data: fetch + controlled input + 4 request states + race condition handling. Lanjut: Context API.
