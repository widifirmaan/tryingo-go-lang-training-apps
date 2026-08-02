# Project: Recipe App

> React | Effects & Data | Lesson 12

## Learning Objectives

- Combine fetching + controlled inputs
- Re-trigger fetches when the query changes
- Render a results grid with request states
- Handle external API data (CORS)

---

## Program: Project: Recipe App

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

## Explanation

## Search on Type
The query state is the effect dependency: every keystroke changes state -> effect re-runs -> fetch with the new query. This simple "no debounce" pattern is enough for learning.

## Complete Request States
This project uses all four conditions: loading (spinner/text), error (message), empty ("no recipes"), and success (grid). Research sources (GreatFrontend) call this a core project for job-readiness.

## APIs & CORS
The external API (themealdb) allows CORS so it can be called from the browser. In production, fetches usually go through a backend/proxy to hide keys and avoid rate limits.

## Cleanup in Every Effect
Note the `cancelled` flag — when the query changes quickly, stale responses are discarded so they never overwrite newer results (race condition).

---

## Experiments

1. **Search on Type**
2. **Request States Lengkap**
3. **API & CORS**
4. **Cleanup di Setiap Effect**

---

## Challenge

Add a detail view: clicking a recipe opens a card with ingredients (loop strIngredient1..20, skipping empty ones) and instructions (strInstructions). Add a "Clear" button to reset the query.

---

## Summary

Recipe App = data milestone: fetch + controlled inputs + 4 request states + race handling. Next: Context API.
