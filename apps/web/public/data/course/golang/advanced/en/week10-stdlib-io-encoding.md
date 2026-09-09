# Stdlib: I/O & Encoding — Read Write Warehouse

> **Kategori:** Go | **Level:** Advanced | **Minggu 10:** Stdlib: I/O, Time & Encoding
> **Prerequisites:** Week 9 — **Context & Sync**.

## Learning Objectives

- `io.Reader`/`Writer` like water hoses, `bufio.Scanner` reads lines, `time.Now().Format("2006-01-02")` stamp, `json.Marshal` wraps JSON

---

## Why This Matters (Non-IT)

Shops save receipts to `receipt.json` and read them again tomorrow — needs `json` + `os.WriteFile`.

---

## Program: JSON Receipt

```go
package main
import ("encoding/json"; "fmt"; "os"; "time")

type Receipt struct {
  ID int `json:"id"`
  Name string `json:"name"`
  Total int `json:"total"`
  Date string `json:"date"`
}

func main(){
  r := Receipt{ID:1, Name:"Budi", Total:62000, Date: time.Now().Format("2006-01-02")}
  data, _ := json.MarshalIndent(r, "", "  ")
  os.WriteFile("receipt.json", data, 0644)
  fmt.Println(string(data))

  // Read back
  b, _ := os.ReadFile("receipt.json")
  var n Receipt
  json.Unmarshal(b, &n)
  fmt.Printf("Read: %+v\n", n)
}
```

`go run receipt.go` → creates `receipt.json` → reads back.

---

## Key Concepts

### `json.Marshal`/`Unmarshal` + Tags
`json:"name"` label in JSON.

### `time.Now().Format("2006-01-02")` = Stamp
Go formats use reference date `2006-01-02 15:04:05`.

---

## Beginner Friendly Explanation

### Analogy: Warehouse Ledger
- **`Marshal` = pack box to JSON text**, **`Unmarshal` = unpack back**, **`os.WriteFile` = store in warehouse**.

### Step 0 — Prepare Device
- Go installed, empty folder, `go run receipt.go`, inspect `receipt.json`.

### How the Computer Reads It
1. `json.MarshalIndent(r)` → struct becomes pretty JSON bytes.
2. `os.ReadFile` + `Unmarshal` → bytes become struct again.

### 3 Must-Know Terms
1. **marshal/unmarshal/tag**: pack/unpack/label

---

## Experiments

- **Green:** Open `receipt.json` → pretty JSON?
- **Yellow:** Change tag `json:"name"` → JSON key changes?
- **Red:** Corrupt the JSON file → `Unmarshal` error? Restore.

---

## Challenge

**Receipt Warehouse:** Save 3 receipts to `receipts.json` (array), read back, print totals + today's date stamp.

---

## Mini Glossary

- **marshal/json/tag**: pack/format/label

---

## Summary

Week 10: **I/O & JSON** — write & read receipts. Next: **HTTP Server**.
