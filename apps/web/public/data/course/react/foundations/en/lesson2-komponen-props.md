# Components & Props

> React | Foundations | Lesson 2

## Learning Objectives

- Understand props as read-only component inputs
- Use children for composition
- Create reusable components with props
- Distinguish props vs state

---

## Program: Components & Props

```jsx
function Card({ title, level, children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem', margin: '0.5rem 0' }}>
      <h3>{title} <span style={{ color: '#666', fontWeight: 'normal' }}>({level})</span></h3>
      <p>{children}</p>
    </div>
  );
}

function Badge({ label }) {
  return <span style={{ background: '#e7f5ee', color: '#2E5B44', padding: '0.15rem 0.6rem', borderRadius: 999, fontWeight: 'bold' }}>{label}</span>;
}

export default function App() {
  return (
    <div>
      <h1>Props & Composition</h1>
      <Card title="Frontend" level="Beginner">
        React, Vue, Svelte. Fokus pada <Badge label="UI" /> dan interaksi.
      </Card>
      <Card title="Backend" level="Intermediate">
        Node.js, Go, Rust. Fokus pada <Badge label="API" /> dan data.
      </Card>
      <Card title="Database" level="Advanced">
        PostgreSQL, MongoDB. Fokus pada <Badge label="Storage" /> dan query.
      </Card>
    </div>
  );
}

```

---

## Explanation

## Props
Props are function component parameters — data passed from parent to child. Props are read-only: a child must never mutate them. `function Card({ title, level })` destructures props directly.

## Children
Anything between a component's tags (`<Card>...</Card>`) is received as `children`. This enables HTML-like composition where components wrap other content.

## Reusability
With props, one component renders many times with different data. `<Badge label="UI" />` is used in many places without code duplication.

## Props vs State
Props = external data (read-only, owned by parent). State = internal changing data (owned by the component itself, covered in the next phase). Rule: data flows down via props.

---

## Experiments

1. **Props**
2. **Children**
3. **Reusability**
4. **Props vs State**

---

## Challenge

Create a reusable ProductCard component: accept name, price, and category props. Render 4 product cards with different data. Add a PriceTag component used inside ProductCard.

---

## Summary

Props = read-only component inputs. children enables composition. Components are reusable via props. Data flows down. Next: lists & conditional rendering.
