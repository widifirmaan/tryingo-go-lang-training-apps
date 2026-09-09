# Advanced Patterns — Neat Shop Patterns

> **Kategori:** React | **Level:** Advanced | **Minggu 9:** Advanced Patterns
> **Prerequisites:** Week 8 — **Custom Hooks & Patterns**.

## Learning Objectives

- `Compound Components` — `Card.Header` + `Card.Body`, `Render Props` and `HOC` — neat blueprints

---

## Why This Matters (Non-IT)

Without patterns, `Card` 5 variants = 5 files 80% duplicated. With Compound (`Card.Header`), 1 card + free assembly. Render Props/HOC share logic without duplicates.

---

## Program: Compound Pattern

```jsx
function Card({ children }){ return <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>{children}</div>; }
Card.Header = ({ children }) => <h3>{children}</h3>;
Card.Body = ({ children }) => <p>{children}</p>;

export default function App(){
  return (
    <Card>
      <Card.Header>Rice 5kg</Card.Header>
      <Card.Body>Rp 62,000 — Stock 10</Card.Body>
    </Card>
  );
}
```


---

## Beginner Friendly Explanation

### Analogy: Lego Technic
- **5 Card variants = 5 files 80% identical**: change a border → edit 5 places, forget 1 = divergent.
- **Compound (`Card.Header`) = LEGO Technic**: 1 brick set + free assembly per page. Render Props/HOC = borrow engines without photocopying code!

### Step 0 — Prepare Device
- Same as React W1: `npm run dev` on `5173` (+ `vitest` for W10).

### How the Computer Reads It
- `Card.Header = ...` attaches a sub-component to the parent; `children` fills the slot.

### 3 Must-Know Terms
- 1. **Compound/children**: assemble/slot

---

## Experiments

- **Green:** Run as-is, then change `Card`'s value → does the output follow?
- **Yellow:** Change the case of `Card` → still runs or error?
- **Red:** Mistype 1 letter in `Card` → what error message? Fix it.

## Challenge

**Advanced Patterns in Your Shop:** use `Card` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `Card`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Custom Hooks & Patterns** (Week 8): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9: **Compound Pattern** — split cards into Header/Body. Next week: **Testing React**.
