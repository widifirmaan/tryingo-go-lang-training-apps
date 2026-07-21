# Proto3 Advanced

Advanced Protocol Buffer patterns and best practices.

## Advanced Schema

```protobuf
syntax = "proto3";

package ecommerce.v1;

import "google/protobuf/timestamp.proto";
import "google/protobuf/wrappers.proto";
import "google/type/money.proto";
import "validate/validate.proto";

option go_package = "github.com/example/ecommerce/pb;pb";

message Order {
    string id = 1 [(validate.rules).string.uuid = true];
    string user_id = 2 [(validate.rules).string = {min_len: 1, max_len: 100}];
    repeated OrderItem items = 3;
    google.type.Money total = 4;
    OrderStatus status = 5;
    google.protobuf.Timestamp created_at = 6;
    google.protobuf.Timestamp updated_at = 7;
    map<string, string> metadata = 8;
    oneof payment {
        CreditCard credit_card = 10;
        BankTransfer bank_transfer = 11;
        CryptoTx crypto = 12;
    }
}

message OrderItem {
    string product_id = 1;
    int32 quantity = 2 [(validate.rules).int32 = {gt: 0, lte: 100}];
    google.type.Money price = 3;
}

enum OrderStatus {
    ORDER_STATUS_UNSPECIFIED = 0;
    ORDER_STATUS_PENDING = 1;
    ORDER_STATUS_CONFIRMED = 2;
    ORDER_STATUS_SHIPPED = 3;
    ORDER_STATUS_DELIVERED = 4;
    ORDER_STATUS_CANCELLED = 5;
}

message CreditCard {
    string last_four = 1;
    string brand = 2;
}

message BankTransfer { string reference = 1; }
message CryptoTx { string tx_hash = 1; string currency = 2; }
```

## Migration Patterns

```protobuf
// Field-level deprecation
message User {
    string id = 1;
    string email = 2;
    string name = 3;
    // Deprecated: Use full_name instead
    string old_name = 4 [deprecated = true];
    string full_name = 5;
}

// Reserved fields
message Request {
    reserved 2, 5, 10 to 15;
    reserved "old_field", "deprecated_param";
}
```

## Options and Customization

```protobuf
package options;

import "google/protobuf/descriptor.proto";

extend google.protobuf.FieldOptions {
    string db_column = 50001;
    bool sensitive = 50002;
    string description = 50003;
}

message User {
    string id = 1 [(options.db_column) = "user_id"];
    string email = 2 [(options.db_column) = "email_address"];
    string password_hash = 3 [(options.sensitive) = true];
}
```

## Practice
1. Design a proto schema with oneof and maps
2. Add validation rules using proto-validate
3. Create reserved fields for future use
