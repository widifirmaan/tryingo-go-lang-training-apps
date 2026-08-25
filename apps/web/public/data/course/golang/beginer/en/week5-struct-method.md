# Struct & Method — Product Card and Its Stamp

> **Kategori:** Go | **Level:** Beginner | **Minggu 5:** Struct & Method

## Learning Objectives

- `type Product struct { Name string; Price int }` — product card
- Method `func (p Product) Info() string` vs `func (p *Product) Discount()` — when to use `*`
- Embedding `type Electronic struct { Product; Warranty int }` — inheritance without hassle
- `NewProduct()` constructor and tag `json:"name"`

---

## Why This Matters (Non-IT)

50 products if using separate `map[string]int` — messy. **Struct = unified card** (name+price+stock 1 card). Method = stamp on card (`Info()`, `Discount(10)`). Embedding = Electronic inherits Product card.

---

## Program: Shop Product Cards

```go
package main
import "fmt"

type Product struct {
	Name  string
	Price int
	Stock int
}

func (p Product) Info() string {
	return fmt.Sprintf("%s: Rp%d (stock %d)", p.Name, p.Price, p.Stock)
}

func (p *Product) Discount(percent int) {
	p.Price = p.Price - p.Price*percent/100
}

type Electronic struct {
	Product
	Warranty int
}

func NewProduct(name string, price int) *Product {
	return &Product{Name: name, Price: price, Stock: 0}
}

func main() {
	p1 := Product{Name: "Rice", Price: 62000, Stock: 10}
	fmt.Println(p1.Info())
	p1.Discount(10)
	fmt.Println("After discount:", p1.Info())

	laptop := Electronic{Product: Product{Name: "Laptop", Price: 15000000, Stock: 5}, Warranty: 3}
	fmt.Println(laptop.Info())
	fmt.Printf("Warranty: %d years\n", laptop.Warranty)

	p2 := NewProduct("Sugar", 15000)
	fmt.Println(p2.Info())
}
```

---

## Key Concepts

### Struct = Card
`type Product struct { Name string; Price int }` → `Product{Name:"Rice", Price:62000}`

### Method ` (p Product)` vs ` (p *Product)`
- ` (p Product)` **copy** — change not affect original (for read `Info`)
- ` (p *Product)` **original** — change `Price` permanent (for `Discount`)

### Embedding = Inheritance
`Electronic struct { Product; Warranty int }` → `laptop.Info()` auto exists.

### Constructor `NewProduct`
Go no `new` class, use function `NewProduct(...) *Product` returning pointer.

---

## Beginner Friendly Explanation

### Analogy: Card & Stamp

- **Struct = member card**: 1 card 3 lines.
- **Method = stamp on card**: `Info()` write stamp, `Discount()` cut price stamp.
- **`*` = original vs photocopy**: `*Product` changes original, `Product` changes copy.

---

## Experiments

- **Green:** `p1.Discount(20)` → price?
- **Yellow:** Change `Info()` to `*Product` → still works? Difference if `Info` changes field?
- **Red:** `Electronic` without `Product` → `laptop.Info()` error?

---

## Challenge

**Mini Shop:** `type Cart struct { Items []Product }` + method `Add(p Product)`, `Total() int`, `Pay(discount int)`. Use `*Cart` to change.

---

## Mini Glossary

- **Struct**: card
- **Method**: stamp
- **Pointer `*`**: original vs copy
- **Embedding**: inheritance

---

## Summary

Week 5: **Struct** (Level: Beginner). **Beginner Go done!** Next: **Interface & Generics** (Intermediate).
