# checkStatus()

> **Stability:** stable · **Since:** 0.1.0 · **Category:** Transaction

Poll the status of an in-flight or completed transaction by `eventId`. Useful after process restarts or network blips to resume tracking.

## Parameters

| Name | Type | Required | Constraints | Description |
|------|------|----------|-------------|-------------|
| `eventId` | `String` | ✅ | UUID v4 | The eventId returned by `doTransaction()`. |

## Returns

| Type | Description | Possible Values |
|------|-------------|-----------------|
| `TransactionStatus` | Current state of the transaction. | `PENDING`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `UNKNOWN` |

## Code Examples

### Kotlin

```kotlin
val status = sdk.checkStatus("550e8400-e29b-41d4-a716-446655440000")
```

### Swift

```swift
let status = try sdk.checkStatus(eventId: "550e8400-e29b-41d4-a716-446655440000")
```

### Python

```python
status = sdk.check_status("550e8400-e29b-41d4-a716-446655440000")
```

### Node.js

```javascript
const status = await sdk.checkStatus('550e8400-e29b-41d4-a716-446655440000');
```

### Java

```java
TransactionStatus status = sdk.checkStatus("550e8400-e29b-41d4-a716-446655440000");
```

### C

```c
pl_txn_status_t status;
pl_sdk_check_status(sdk, "550e8400-e29b-41d4-a716-446655440000", &status);
```

## Response Handling

### Kotlin

```kotlin
when (status) {
    TransactionStatus.PENDING     -> println("Still pending...")
    TransactionStatus.IN_PROGRESS -> println("Processing...")
    TransactionStatus.SUCCESS     -> println("Payment successful!")
    TransactionStatus.FAILED      -> println("Payment failed.")
    TransactionStatus.UNKNOWN     -> println("Transaction not found.")
}
```

### Python

```python
if status == TransactionStatus.SUCCESS:
    print("Payment successful!")
elif status == TransactionStatus.PENDING:
    print("Still pending...")
elif status == TransactionStatus.FAILED:
    print("Payment failed.")
```

## Errors

| Variant | When | Recoverable |
|---------|------|-------------|
| `NotInitialized` | `init()` was not called. | ✕ |
| `InvalidInput` | eventId is not a valid UUIDv4. | ✕ |
| `EventNotFound` | The terminal/cloud has no record of this eventId. | ✕ |
| `TransportUnavailable` | No transport available to reach the terminal. | ↻ |

## See Also

- [doTransaction](/pinelabs-docs/api/do-transaction)
