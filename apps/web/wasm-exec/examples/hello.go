package main

import "fmt"

func main() {
	name := "TinyGo"
	fmt.Println("Hello,", name)
	for i := 0; i < 3; i++ {
		fmt.Println(i)
	}
}
