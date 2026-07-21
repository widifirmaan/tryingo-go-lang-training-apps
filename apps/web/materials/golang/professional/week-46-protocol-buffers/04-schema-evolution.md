# Schema Evolution

Design Protocol Buffer schemas that evolve safely over time.

## Evolution Rules

```protobuf
// RULE 1: Never change field numbers
message User {
    string id = 1;  // Always 1
    string email = 2; // Always 2
    // string old_name = 3 [deprecated = true]; // Retired
    string full_name = 6; // New field, new number
}

// RULE 2: Use reserved for deleted fields
message Order {
    reserved 3, 4, 7 to 10;
    reserved "legacy_flag", "temp_field";
}

// RULE 3: Add new fields with defaults
message Config {
    string name = 1;
    int32 version = 2;
    bool feature_x = 3; // New field - defaults to false
    bool feature_y = 4; // New field - defaults to false
}
```

## Forward/Backward Compatibility

```go
type SchemaVersion int

const (
    V1 SchemaVersion = 1
    V2 SchemaVersion = 2
)

type SchemaEvolution struct {
    version SchemaVersion
}

func (e *SchemaEvolution) Migrate(data []byte, from, to SchemaVersion) ([]byte, error) {
    current := from
    for current < to {
        var err error
        data, err = e.upgrade(current, data)
        if err != nil {
            return nil, err
        }
        current++
    }
    return data, nil
}

func (e *SchemaEvolution) upgrade(version SchemaVersion, data []byte) ([]byte, error) {
    switch version {
    case V1:
        return e.upgradeV1ToV2(data)
    default:
        return data, nil
    }
}
```

## Compatibility Testing

```go
func TestBackwardCompatibility(t *testing.T) {
    // Old client, new server
    oldRequest := &pbV1.CreateOrderRequest{
        UserId: "user-1",
        Items: []*pbV1.Item{
            {ProductId: "prod-1", Quantity: 1},
        },
    }
    oldData, _ := proto.Marshal(oldRequest)

    // New server can still read old data
    var newRequest pbV2.CreateOrderRequest
    err := proto.Unmarshal(oldData, &newRequest)
    if err != nil {
        t.Fatal("backward compatibility broken:", err)
    }
    if newRequest.UserId != "user-1" {
        t.Error("field value mismatch")
    }
}
```

## Wire Compatibility

```json
{
    "compatibility_rules": {
        "do_not_change_field_numbers": true,
        "new_fields_must_have_defaults": true,
        "use_reserved_for_deleted_fields": true,
        "oneof_cannot_be_changed_to_regular_field": true,
        "field_types_cannot_be_changed": true
    }
}
```

## Practice
1. Evolve a schema through 3 versions
2. Test backward compatibility between versions
3. Create a schema migration tool
