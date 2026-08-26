# Context & Sync — Alarm Batal

> **Kategori:** Go | **Level:** Menengah | **Minggu 9:** Context & Sinkronisasi

## Tujuan Pembelajaran

- `context.WithTimeout` alarm batal, `sync.WaitGroup` tunggu semua kasir selesai

---

## Program

```go
package main
import ("context"; "fmt"; "time"; "sync")

func kerja(ctx context.Context, id int, wg *sync.WaitGroup){
  defer wg.Done()
  select {
  case <-time.After(200*time.Millisecond):
    fmt.Printf("Kerja %d selesai\n", id)
  case <-ctx.Done():
    fmt.Printf("Kerja %d batal\n", id)
  }
}

func main(){
  ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
  defer cancel()
  var wg sync.WaitGroup
  for i:=1; i<=2; i++ { wg.Add(1); go kerja(ctx, i, &wg) }
  wg.Wait()
  fmt.Println("Semua selesai/batal")
}
```

---

## Ringkasan

Minggu 9: **Alarm & Tunggu** — context batal, WaitGroup tunggu. Selesai Menengah!
