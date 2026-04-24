# init()

> **Stability:** stable · **Since:** 0.1.0 · **Category:** Lifecycle

Initialize the SDK with configuration. Creates a singleton SDK instance. Must be called exactly once per process before any other API.

## Parameters

| Name     | Type        | Required | Description                                                         |
| -------- | ----------- | -------- | ------------------------------------------------------------------- |
| `config` | `SdkConfig` | ✅       | SDK infrastructure configuration (transports, logging, cloud mode). |

**Example config:**

```json
{
  "transportPreference": ["TCP", "BLUETOOTH"],
  "logLevel": "INFO",
  "cloudResultMode": "MANUAL_POLL"
}
```

## Returns

| Type          | Description               |
| ------------- | ------------------------- |
| `PinelabsSdk` | The singleton SDK handle. |

## Code Examples

### Kotlin

```kotlin
val sdk = PinelabsSdk.init(SdkConfig(transportPreference = listOf(TransportKind.TCP)))
```

### Swift

```swift
let sdk = try PinelabsSdk.init(config: SdkConfig(transportPreference: [.tcp]))
```

### Python

```python
sdk = PinelabsSdk.init(SdkConfig(transport_preference=[TransportKind.TCP]))
```

### Node.js

```javascript
const sdk = PinelabsSdk.init({
  transportPreference: ["TCP"],
  logLevel: "INFO",
});
```

### Java

```java
PinelabsSdk sdk = PinelabsSdk.init(new SdkConfig.Builder()
    .transportPreference(Arrays.asList(TransportKind.TCP))
    .build());
```

### C

```c
pl_sdk_config_t cfg = { .transport = PL_TRANSPORT_TCP };
pl_sdk_handle_t sdk;
pl_sdk_init(&cfg, &sdk);
```

## Errors

| Variant              | When                                                | Recoverable |
| -------------------- | --------------------------------------------------- | ----------- |
| `AlreadyInitialized` | `init()` called more than once in the same process. | ✕           |
| `InvalidConfig`      | Any config field fails validation.                  | ✕           |

## See Also

- [doTransaction](/pinelabs-docs/api/do-transaction)
- [checkStatus](/pinelabs-docs/api/check-status)
