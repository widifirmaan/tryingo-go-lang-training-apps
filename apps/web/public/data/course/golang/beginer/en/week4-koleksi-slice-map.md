# Collections: Slice, Map & String — Dynamic Shelves and Address Book

> **Kategori:** Go | **Level:** Beginner | **Minggu 4:** Koleksi: Slice, Map & String

## Learning Objectives

- `array [3]int` vs `slice []int` dynamic — use slice for shop
- `append`, `make`, `len`, `cap`, slicing `nums[1:4]`
- `map[string]int` address book, check `val, ok := m["Budi"]`
- String `strings` and `range` for lists

---

## Why This Matters (Non-IT)

Price list 30 products not fit in `var a,b,c` manual. **Slice = sliding shelf**, **Map = price address book**. Shop needs both.

---

## Program: Shelves and Price Book

```go
package main
import ("fmt"; "strings")

func main() {
	fruits := []string{"apple", "mango", "banana"}
	fruits = append(fruits, "orange")
	fmt.Println("Fruits:", fruits, "len:", len(fruits), "cap:", cap(fruits))

	nums := []int{10, 20, 30, 40, 50}
	fmt.Println("Slice [1:4]:", nums[1:4])

	stock := make(map[string]int)
	stock["Rice"] = 10
	stock["Sugar"] = 5
	stock["Rice"] = 12

	price, ok := stock["Rice"]
	if ok {
		fmt.Printf("Rice stock: %d\n", price)
	}

	if _, ok := stock["Coffee"]; !ok {
		fmt.Println("Coffee not yet")
	}

	delete(stock, "Sugar")
	fmt.Println("After delete Sugar:", stock)

	text := "Siti's Shop"
	fmt.Println("Upper:", strings.ToUpper(text))
	fmt.Println("Contains 'Shop':", strings.Contains(text, "Shop"))

	fmt.Println("\nFruits:")
	for i, v := range fruits {
		fmt.Printf("%d: %s\n", i, v)
	}
	for k, v := range stock {
		fmt.Printf("%s → %d\n", k, v)
	}
}
```

---

## Key Concepts

### Slice vs Array
`[3]int` fixed 3, `[]int` sliding. Use `[]int` 99% time. `append`, `make([]int,0,10)`, `len`, `cap`.

### Map + `ok`
`val, ok := m["key"]` → `ok` true if exists. Don't `m["key"]` directly to check (could be 0).

### `strings` & `range`
`strings.ToUpper`, `Contains`, `TrimSpace`. `for i, v := range fruits` loop shelf and book.

---

## Beginner Friendly Explanation

### Analogy

- **Slice = IKEA sliding shelf**: can add `append` without new shelf. `cap` shelf capacity, `len` filled.
- **Map = address book**: find "Budi" → `081`, not found → `ok==false`.
- **`range` = check shelf one by one**.

---

## Experiments

- **Green:** `fruits = append(fruits, "durian","mangosteen")` → len?
- **Yellow:** `stock["Coffee"]=7; delete(stock,"Coffee")`
- **Red:** `nums[1:4]` change `nums[1]=99` → `nums` original changes? Yes, slice shares memory.

---

## Challenge

**Shop Inventory:** `map[string]int` stock, `slice` shopping list, `range` find stock <3 → show "Almost out". Use `ok` check exists.

---

## Mini Glossary

- **Slice/Map**: shelf/book
- **append/make**: add/make
- **ok**: check exists

---

## Summary

Week 4: **Slice & Map** (Level: Beginner). Can sliding shelf & address book. Next: **Struct** — product card.
