@echo off
REM Build Go WASM interpreter for Tryngo
REM Requires: Go 1.24+ and git

echo Downloading Yaegi dependencies...
go mod tidy

echo Building WASM binary...
set GOOS=js
set GOARCH=wasm
go build -o ..\public\wasm\go-exec.wasm main.go

echo Copying wasm_exec.js runtime...
copy /Y "%GOROOT%\lib\wasm\wasm_exec.js" ..\public\wasm\wasm_exec.js

echo Done! Built go-exec.wasm and copied wasm_exec.js
