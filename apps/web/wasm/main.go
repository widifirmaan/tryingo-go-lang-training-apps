//go:build wasm
// +build wasm

package main

import (
	"bytes"
	"fmt"
	"os"
	"strings"
	"syscall/js"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
	"github.com/traefik/yaegi/stdlib/unsafe"
)

func main() {
	c := make(chan struct{}, 0)

	js.Global().Set("__tryngo_execute_go__", js.FuncOf(executeGo))
	js.Global().Get("console").Call("log", "[Tryngo] Go WASM interpreter loaded")

	<-c
}

func executeGo(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return js.ValueOf(map[string]interface{}{
			"ok":     false,
			"output": "",
			"error":  "No code provided",
		})
	}

	code := args[0].String()

	i := interp.New(interp.Options{
		GoPath: "/go",
	})

	i.Use(stdlib.Symbols)
	i.Use(unsafe.Symbols)

	var stdoutBuf bytes.Buffer
	var stderrBuf bytes.Buffer

	stdoutWriter := nopWriteCloser{&stdoutBuf}
	stderrWriter := nopWriteCloser{&stderrBuf}

	i.Eval(fmt.Sprintf(`import "fmt"`))
	i.Eval(fmt.Sprintf(`import "os"`))

	_, err := i.Eval(code)

	if err != nil {
		return js.ValueOf(map[string]interface{}{
			"ok":     false,
			"output": stdoutBuf.String(),
			"error":  fmt.Sprintf("Line %d: %s", err.(interp.ProtocolError).Line(), err.Error()),
		})
	}

	return js.ValueOf(map[string]interface{}{
		"ok":     true,
		"output": stdoutBuf.String(),
		"error":  stderrBuf.String(),
	})
}

type nopWriteCloser struct {
	*bytes.Buffer
}

func (nopWriteCloser) Close() error { return nil }
