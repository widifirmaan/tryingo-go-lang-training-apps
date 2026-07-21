# Table-Driven Tests

## What is a Table Test?
A table test defines inputs and expected outputs as test cases in a slice, then iterates over them.

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive", 2, 3, 5},
        {"negative", -1, -2, -3},
        {"zero", 0, 5, 5},
        {"mixed", -1, 1, 0},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, result, tt.expected)
            }
        })
    }
}
```

## Testing Multiple Return Values

```go
func TestDivide(t *testing.T) {
    tests := []struct {
        name      string
        a, b      float64
        expected  float64
        wantErr   bool
    }{
        {"normal", 10, 2, 5, false},
        {"by zero", 10, 0, 0, true},
        {"fraction", 7, 2, 3.5, false},
        {"negative", -10, 2, -5, false},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result, err := Divide(tt.a, tt.b)
            if tt.wantErr && err == nil {
                t.Error("expected error, got nil")
            }
            if !tt.wantErr && err != nil {
                t.Errorf("unexpected error: %v", err)
            }
            if result != tt.expected {
                t.Errorf("Divide(%v, %v) = %v; want %v",
                    tt.a, tt.b, result, tt.expected)
            }
        })
    }
}
```

## Testing String Operations

```go
func TestToUpper(t *testing.T) {
    tests := []struct {
        name     string
        input    string
        expected string
    }{
        {"lowercase", "hello", "HELLO"},
        {"uppercase", "HELLO", "HELLO"},
        {"mixed", "GoLang", "GOLANG"},
        {"empty", "", ""},
        {"with numbers", "abc123", "ABC123"},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := ToUpper(tt.input)
            if result != tt.expected {
                t.Errorf("ToUpper(%q) = %q; want %q",
                    tt.input, result, tt.expected)
            }
        })
    }
}
```

## Testing Map Operations

```go
func TestFilterEven(t *testing.T) {
    tests := []struct {
        name     string
        input    []int
        expected []int
    }{
        {"mixed", []int{1, 2, 3, 4, 5, 6}, []int{2, 4, 6}},
        {"all odd", []int{1, 3, 5}, []int{}},
        {"all even", []int{2, 4, 6}, []int{2, 4, 6}},
        {"empty", []int{}, []int{}},
        {"nil", nil, []int{}},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := FilterEven(tt.input)
            if !reflect.DeepEqual(result, tt.expected) {
                t.Errorf("FilterEven(%v) = %v; want %v",
                    tt.input, result, tt.expected)
            }
        })
    }
}
```

## Golden File Tests

```go
func TestGenerateReport(t *testing.T) {
    tests := []struct {
        name           string
        data           ReportData
        goldenFile     string
    }{
        {"simple", ReportData{Name: "Test"}, "testdata/simple.golden"},
        {"complex", ReportData{Name: "Complex", Values: []int{1, 2, 3}}, "testdata/complex.golden"},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := GenerateReport(tt.data)
            expected, _ := os.ReadFile(tt.goldenFile)
            if result != string(expected) {
                t.Errorf("report mismatch for %s", tt.name)
            }
        })
    }
}
```

## Exercises

1. **Palindrome Tests**: Write table tests for `IsPalindrome(s string) bool` with various inputs.

2. **FizzBuzz Tests**: Test a `FizzBuzz(n int) string` function with at least 10 table entries.

3. **Student Grade**: Test a `CalculateGrade(score int) string` function with boundary values (0, 59, 60, 69, 70, 79, 80, 89, 90, 100).

4. **URL Parser**: Write table tests for `ParseURL(raw string) (URL, error)` covering valid, invalid, and edge case URLs.
