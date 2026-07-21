# Fuzzing

Fuzzing automatically generates random inputs to find bugs and edge cases.

## Basic Fuzz Test

```go
func FuzzHexDecode(f *testing.F) {
    // Seed corpus
    f.Add([]byte("48656c6c6f"))
    f.Add([]byte(""))
    f.Add([]byte("ff"))

    f.Fuzz(func(t *testing.T, data []byte) {
        decoded := make([]byte, hex.DecodedLen(len(data)))
        _, err := hex.Decode(decoded, data)
        if err != nil {
            return // Invalid input is expected
        }

        // Verify round-trip
        encoded := hex.EncodeToString(decoded)
        if len(encoded) != len(data) {
            t.Errorf("length mismatch: got %d, want %d", len(encoded), len(data))
        }
    })
}
```

## Fuzzing JSON Parsing

```go
func FuzzJSONParse(f *testing.F) {
    testCases := []string{
        `{"name":"John"}`,
        `{"age": 30}`,
        `[]`,
        `null`,
    }
    for _, tc := range testCases {
        f.Add([]byte(tc))
    }

    f.Fuzz(func(t *testing.T, data []byte) {
        var v interface{}
        err := json.Unmarshal(data, &v)
        if err != nil {
            return
        }

        // Marshal should always succeed if unmarshal did
        output, err := json.Marshal(v)
        if err != nil {
            t.Fatalf("marshal failed after successful unmarshal: %v", err)
        }

        // Re-unmarshal the output
        var v2 interface{}
        if err := json.Unmarshal(output, &v2); err != nil {
            t.Fatalf("re-unmarshal failed: %v", err)
        }
    })
}
```

## Fuzzing HTTP Parsing

```go
func FuzzHTTPRequest(f *testing.F) {
    f.Add([]byte("GET / HTTP/1.1\r\nHost: example.com\r\n\r\n"))
    f.Add([]byte("POST /api/users HTTP/1.1\r\nContent-Length: 10\r\n\r\n"))

    f.Fuzz(func(t *testing.T, data []byte) {
        req, err := http.ReadRequest(bufio.NewReader(bytes.NewReader(data)))
        if err != nil {
            return
        }
        defer req.Body.Close()

        // Basic sanity checks
        if req.Method != "" && req.URL != nil {
            if req.ContentLength < 0 && req.ContentLength > 10_000_000 {
                t.Errorf("suspicious content length: %d", req.ContentLength)
            }
        }
    })
}
```

## Running Fuzz Tests

```bash
# Run fuzz test with default time
go test -fuzz=FuzzHexDecode

# Run for specific duration
go test -fuzz=FuzzHexDecode -fuzztime=30s

# Run specific fuzz test
go test -fuzz=FuzzJSONParse -fuzztime=1m

# Re-run with specific seed corpus
go test -fuzz=FuzzHexDecode -fuzztime=10s ./pkg/hexutil
```

## Fuzzing Best Practices

```go
func FuzzMyFunction(f *testing.F) {
    // Add meaningful seed corpus
    f.Add("valid-input")
    f.Add("edge-case")
    f.Add("")

    f.Fuzz(func(t *testing.T, input string) {
        // Ensure function doesn't panic
        result, err := MyFunction(input)

        // If no error, result must be valid
        if err == nil {
            if result == "" {
                t.Errorf("expected non-empty result for valid input: %q", input)
            }
        }

        // Input that should always succeed
        if IsAlwaysValid(input) && err != nil {
            t.Errorf("expected success for input: %q", input)
        }
    })
}
```

## Practice

1. Write a fuzz test for a CSV parser
2. Fuzz test a URL validation function
3. Create fuzz tests for a binary protocol parser
4. Find edge cases in a string manipulation library
