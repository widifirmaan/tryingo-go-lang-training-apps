package main

import (
	"context"
	"fmt"
	"sync"
	"syscall/js"
	"time"
)

type CounterWrap struct{ Value int }

func (c *CounterWrap) Add(n int) *CounterWrap { c.Value += n; return c }

type AkunMutex struct {
	mu    sync.Mutex
	Saldo int
}

type Person struct {
	Name string
	Age  int
}

// Week 6 types
type Greeter interface{ Greet() string }

type IndoW struct{ Name string }

func (i IndoW) Greet() string { return "Halo, " + i.Name }

type EngW struct{ Name string }

func (e EngW) Greet() string { return "Hello, " + e.Name }

func main() {
	js.Global().Set("runTinyGoWeek", js.FuncOf(runWeek))
	js.Global().Set("tinyGoReady", js.ValueOf(true))
	<-make(chan struct{})
}

func runWeek(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return "missing week number"
	}
	week := args[0].Int()
	return run(week)
}

func run(week int) string {
	switch week {
	case 1:
		return week1()
	case 2:
		return week2()
	case 3:
		return week3()
	case 4:
		return week4()
	case 5:
		return week5()
	case 6:
		return week6()
	case 7:
		return week7()
	case 8:
		return week8()
	case 9:
		return week9()
	case 10:
		return week10()
	default:
		return fmt.Sprintf("Week %d not available in TinyGo", week)
	}
}

func week1() string {
	var out string
	out += "=== Week 1: Pengenalan Go ===\n"

	name := "Gopher"
	version := 1.24
	active := true
	year := 2009

	out += fmt.Sprintf("Name: %s\n", name)
	out += fmt.Sprintf("Version: %.2f\n", version)
	out += fmt.Sprintf("Active: %v\n", active)
	out += fmt.Sprintf("Year: %d\n", year)
	return out
}

func week2() string {
	var out string
	out += "=== Week 2: Variables & Control Flow ===\n"

	name := "Budi"
	age := 25
	height := 175.5
	out += fmt.Sprintf("Name: %s, Age: %d, Height: %.1f\n", name, age, height)

	for i := 1; i <= 5; i++ {
		out += fmt.Sprintf("%d ", i)
	}
	out += "\n"

	score := 85
	if score >= 90 {
		out += "Grade: A\n"
	} else if score >= 75 {
		out += "Grade: B\n"
	} else {
		out += "Grade: C\n"
	}

	day := "Monday"
	switch day {
	case "Saturday", "Sunday":
		out += "Weekend\n"
	default:
		out += "Weekday\n"
	}

	return out
}

func week3() string {
	var out string
	out += "=== Week 3: Functions & Errors ===\n"

	out += fmt.Sprintf("10 + 5 = %d\n", add(10, 5))
	result, err := divide(10, 2)
	if err != nil {
		out += fmt.Sprintf("Error: %v\n", err)
	} else {
		out += fmt.Sprintf("10 / 2 = %v\n", result)
	}
	_, err = divide(5, 0)
	if err != nil {
		out += fmt.Sprintf("Error: %v\n", err)
	}

	sum := sumAll(1, 2, 3, 4, 5)
	out += fmt.Sprintf("Sum: %d\n", sum)

	return out
}

func add(a, b int) int { return a + b }

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("cannot divide by zero")
	}
	return a / b, nil
}

func sumAll(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

func week4() string {
	var out string
	out += "=== Week 4: Arrays, Slices & Maps ===\n"

	fruits := []string{"apple", "mango", "banana"}
	fruits = append(fruits, "orange", "grape")
	out += fmt.Sprintf("Fruits: %v\n", fruits)
	out += fmt.Sprintf("Len: %d, Cap: %d\n", len(fruits), cap(fruits))
	out += fmt.Sprintf("[1:3]: %v\n", fruits[1:3])

	scores := map[string]int{"Alice": 90, "Bob": 78, "Eve": 85}
	for name, s := range scores {
		out += fmt.Sprintf("  %s: %d\n", name, s)
	}
	if s, ok := scores["Alice"]; ok {
		out += fmt.Sprintf("Alice: %d\n", s)
	}
	delete(scores, "Bob")

	for i, f := range fruits {
		out += fmt.Sprintf("%d:%s ", i, f)
	}
	out += "\n"
	return out
}

func week5() string {
	var out string
	out += "=== Week 5: Structs, Methods & Pointers ===\n"

	type User struct {
		ID       int
		Name     string
		IsActive bool
	}

	u := User{ID: 1, Name: "Alice", IsActive: true}
	out += fmt.Sprintf("User: %+v\n", u)
	out += fmt.Sprintf("Active: %v\n", u.IsActive)
	u.IsActive = false
	out += fmt.Sprintf("After deactivate: %v\n", u.IsActive)

	x := 42
	p := &x
	out += fmt.Sprintf("x=%d, *p=%d\n", x, *p)
	*p = 21
	out += fmt.Sprintf("After *p=21: x=%d\n", x)

	c := &CounterWrap{}
	c.Add(5).Add(10).Add(3)
	out += fmt.Sprintf("Counter chaining: %d\n", c.Value)
	return out
}

func week6() string {
	var out string
	out += "=== Week 6: Interfaces & Packages ===\n"

	var g Greeter
	g = IndoW{Name: "Budi"}
	out += g.Greet() + "\n"
	g = EngW{Name: "John"}
	out += g.Greet() + "\n"

	return out
}

func week7() string {
	var out string
	out += "=== Week 7: Defer, Panic & File I/O ===\n"

	out += "Start\n"
	defer func() { out += "1. defer: first\n" }()
	defer func() { out += "2. defer: second\n" }()
	func() { out += "3. defer: third\n" }()
	out += "End -- defers run:\n"

	result := safeDivide(10, 2)
	out += fmt.Sprintf("10 / 2 = %d\n", result)

	result = safeDivide(10, 0)
	out += fmt.Sprintf("10 / 0 = %d\n", result)

	out += "Program finished!\n"
	return out
}

func safeDivide(a, b int) (r int) {
	defer func() {
		if rec := recover(); rec != nil {
			r = 0
		}
	}()
	return a / b
}

func week8() string {
	var out string
	out += "=== Week 8: Goroutines & WaitGroup ===\n"

	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			out := fmt.Sprintf("Worker %d done\n", id)
			_ = out
		}(i)
	}
	wg.Wait()
	out += "All workers done!\n"

	akun := &AkunMutex{}
	var wg2 sync.WaitGroup
	for i := 0; i < 5; i++ {
		wg2.Add(1)
		go func() {
			defer wg2.Done()
			akun.mu.Lock()
			akun.Saldo += 100
			akun.mu.Unlock()
		}()
	}
	wg2.Wait()
	out += fmt.Sprintf("Balance: %d\n", akun.Saldo)
	return out
}

func week9() string {
	var out string
	out += "=== Week 9: Channels, Select & Context ===\n"

	ch := make(chan string)
	go func() { ch <- "message from goroutine" }()
	msg := <-ch
	out += fmt.Sprintf("Received: %s\n", msg)

	buf := make(chan int, 3)
	buf <- 10; buf <- 20; buf <- 30
	close(buf)
	for v := range buf {
		out += fmt.Sprintf("%d ", v)
	}
	out += "\n"

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
	defer cancel()
	select {
	case <-time.After(100 * time.Millisecond):
		out += "Completed on time\n"
	case <-ctx.Done():
		out += "Context timeout!\n"
	}

	return out
}

func week10() string {
	var out string
	out += "=== Week 10: Testing & Standard Library ===\n"

	out += fmt.Sprintf("2 + 3 = %d\n", add(2, 3))
	out += fmt.Sprintf("7 + 12 = %d\n", add(7, 12))

	r, err := divide(10, 3)
	if err == nil {
		out += fmt.Sprintf("10 / 3 = %.2f\n", r)
	}

	p := Person{Name: "Alice", Age: 30}
	out += fmt.Sprintf("Person: %+v\n", p)

	nums := []int{3, 1, 4, 1, 5, 9, 2, 6}
	sum := 0
	for _, n := range nums {
		sum += n
	}
	out += fmt.Sprintf("Sum: %d, Count: %d\n", sum, len(nums))

	return out
}
