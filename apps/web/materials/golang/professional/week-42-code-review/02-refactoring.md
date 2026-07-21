# Refactoring

Refactor Go code safely using proven techniques.

## Extract Function

```go
// Before
func ProcessOrder(w http.ResponseWriter, r *http.Request) {
    // 50 lines of mixed concerns
}

// After
func ProcessOrder(w http.ResponseWriter, r *http.Request) {
    req, err := decodeOrderRequest(r)
    if err != nil {
        writeError(w, err)
        return
    }
    order, err := processOrderLogic(r.Context(), req)
    if err != nil {
        writeError(w, err)
        return
    }
    writeOrderResponse(w, order)
}
```

## Replace Conditional with Polymorphism

```go
// Before
func CalculateShipping(order Order) float64 {
    switch order.ShippingMethod {
    case "standard":
        return 5.99
    case "express":
        return 14.99
    case "overnight":
        return 29.99
    default:
        return 0
    }
}

// After
type ShippingStrategy interface {
    Calculate(order Order) float64
}

type StandardShipping struct{}
func (s StandardShipping) Calculate(order Order) float64 {
    return 5.99 + order.Weight * 0.5
}

type ExpressShipping struct{}
func (e ExpressShipping) Calculate(order Order) float64 {
    return 14.99 + order.Weight * 1.0
}
```

## Introduce Parameter Object

```go
// Before
func FindUsers(name string, email string, role string, page int, limit int) ([]User, error)

// After
type UserFilter struct {
    Name   string
    Email  string
    Role   string
    Page   int
    Limit  int
}

func FindUsers(filter UserFilter) ([]User, error)
```

## Testing Refactoring

```go
// Golden file testing for refactoring
func TestProcessOrder(t *testing.T) {
    input := loadFixture("order_input.json")
    expected := loadFixture("order_expected.json")

    result, err := ProcessOrder(input)
    if err != nil {
        t.Fatal(err)
    }
    if !reflect.DeepEqual(result, expected) {
        t.Errorf("result mismatch")
        updateFixture = true // for -update flag
    }
}
```

## Practice
1. Refactor a large function into smaller pieces
2. Replace a switch statement with interfaces
3. Use golden files to verify refactoring
