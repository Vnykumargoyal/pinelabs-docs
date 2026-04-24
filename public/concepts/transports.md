# Transport Layer

The Pine Labs SDK communicates with payment terminals over **transports** — pluggable communication channels that abstract away the physical or network protocol.

When calling `init()`, you supply a `transportPreference` list ranked by priority. The SDK will attempt each transport in order until one connects successfully.

## Available Transports

| Transport | Constant    | Platform       | Notes                                                                           |
| --------- | ----------- | -------------- | ------------------------------------------------------------------------------- |
| TCP/IP    | `TCP`       | All            | Default. Requires terminal and POS on same network.                             |
| Bluetooth | `BLUETOOTH` | Android, iOS   | Pair terminal first via OS settings.                                            |
| USB       | `USB`       | Windows, Linux | HID-class connection; no driver needed on most OS.                              |
| Cloud     | `CLOUD`     | All            | Routes through Pine Labs cloud relay; higher latency but works across networks. |

## Fallback Behavior

If the first transport in `transportPreference` fails to connect within 5 seconds, the SDK moves to the next entry. You can observe transport switches via the `onTransportChange` callback if your platform supports listeners.

```
config.transportPreference = [TCP, BLUETOOTH, CLOUD]
// Tries TCP → if unavailable → Bluetooth → if unavailable → Cloud
```

## Cloud Result Mode

When using the `CLOUD` transport, set `cloudResultMode` in `SdkConfig`:

- **`PUSH`** — The SDK keeps a WebSocket open and the cloud pushes the transaction result.
- **`MANUAL_POLL`** — Your code calls `checkStatus()` to poll for the result.

Push mode is recommended for mobile apps; manual poll suits server-side integrations.

## Configuration Example

```kotlin
val sdk = PinelabsSdk.init(SdkConfig(
    transportPreference = listOf(
        TransportKind.TCP,
        TransportKind.BLUETOOTH,
        TransportKind.CLOUD
    ),
    cloudResultMode = CloudResultMode.PUSH,
    logLevel = LogLevel.INFO
))
```

## See Also

- [Getting Started](/pinelabs-docs/concepts/getting-started)
- [Error Handling](/pinelabs-docs/concepts/error-handling)
