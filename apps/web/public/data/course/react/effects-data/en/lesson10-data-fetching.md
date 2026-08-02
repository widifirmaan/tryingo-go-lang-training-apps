# Data Fetching

> React | Effects & Data | Lesson 10

## Learning Objectives

- Fetch data inside useEffect
- Manage 3 statuses: loading, error, ready
- Handle the empty state
- Prevent race conditions with a cancelled flag

---

## Program: Data Fetching

```jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | ready

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) { setPosts(data); setStatus('ready'); }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, []);

  if (status === 'loading') return <p style={{ color: '#666' }}>Loading posts...</p>;
  if (status === 'error') return <p style={{ color: '#b00020' }}>Failed to load data. Check your connection.</p>;

  return (
    <div>
      <h1>Data Fetching</h1>
      <h2>Posts</h2>
      {posts.length === 0
        ? <p>No posts found.</p>
        : <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map((p) => (
              <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.8rem', margin: '0.4rem 0' }}>
                <strong>{p.title}</strong>
                <p style={{ margin: '0.2rem 0 0', color: '#666' }}>{p.body}</p>
              </li>
            ))}
          </ul>}
    </div>
  );
}

```

---

## Explanation

## Fetch inside useEffect
The standard pattern: a `useEffect` with `[]` dependency contains the fetch, then updates state when the response arrives. State, not variables, holds fetched data.

## 3 Request States
The UI must handle loading, error, and ready — each with its own view. Professionals call these "request states" and it is one of the most sought-after skills in interviews.

## Empty State
Empty data is not an error: show a "no results" message. A successful fetch with an empty array still lands in the ready state.

## Race Conditions & Cleanup
If a component unmounts before the response arrives, setting state on an unmounted component warns. Use a `cancelled` flag in cleanup. Also check `res.ok` — fetch does not throw on 404/500 statuses.

---

## Experiments

1. **Fetch dalam useEffect**
2. **3 Request States**
3. **Empty State**
4. **Race Condition & Cleanup**

---

## Challenge

Build a page with 2 sections: a users list (10 items) and a "Load More" button increasing the limit (10 -> 20 -> 30). Handle per-action loading and show a simple skeleton while loading.

---

## Summary

Fetch in useEffect + 3 request states + empty state + cancelled flag = correct production pattern. Next: React Router.
